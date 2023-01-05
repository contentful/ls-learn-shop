import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import get from "lodash/get";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import Skeleton from "../../components/Skeleton.jsx";
import Spacing from "../../layouts/Spacing.jsx";
import { getEntriesByContentType } from "../../lib/helpers.js";

import SeoComponent from "../../components/SeoComponent/SeoComponent.jsx";
import {
  getProductDataBySlug,
  getShopifyProductByHandle,
  getShopifyProducts,
} from "../../lib/product/helpers.js";

import dynamic from "next/dynamic.js";
import { FlexibleFieldResolver } from "../../components/FlexibleFieldResolver";
import ImageComponent from "../../components/ImageComponent";
import ImageGallery from "../../components/ImageGallery";
import StarRating from "../../components/StarRating.jsx";
import richtextRenderOptions from "../../lib/richtextRenderOptions";
import MainLayout from "@layouts/MainLayout";

const Xray = dynamic(() => import("../../components/Xray.jsx"), { ssr: false });

const ProductPage = (props) => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { slug } = router.query;

  // initial data from getStaticProps
  const productData = get(props, "productData");

  const preview = get(props, "preview");
  const initialProduct = get(productData, "productDataCommerce"); // data from commerce platform
  const initialProductContent = get(productData, "productContentCMS.items[0]"); // data from contentful

  // if in preview mode refresh data from Contentful at intervals to mimic near realtime updates
  const { data: productContent, error } = useSWR(
    preview ? { contentType: "productPage", slug, locale, preview } : null,
    fetcher,
    { refreshInterval: 1000, fallbackData: initialProductContent }
  );

  //  refreshes data from content platform on page load (just incase price has changed)
  const { data: product, error: productError } = useSWR(slug, Shopifyfetcher, {
    // refreshInterval: 10000,
    fallbackData: initialProduct,
  });

  console.log("shopify product", product);

  // safely extract fields [Shopify/commerce platform] using lodash/get
  const productName = get(product, "name");
  const productSku = get(product, "sku");
  const productPrice = get(product, "price");
  const productFormattedPrice = get(product, "formated_price");
  const productReviews = get(product, "reviews");
  const productInStock = get(product, "in_stock");
  const productAltShortDescription = get(product, "short_description");

  // safely extract Contentful fields using lodash/get
  const contentType = get(productContent, "sys.contentType.sys.id");
  const productId = get(productContent, "sys.id");
  const fields = get(productContent, "fields");
  const productContentDescription = get(fields, "productDetail"); //richtext field
  const title = get(productContent, "fields.title");
  const image = get(productContent, "fields.image");
  const images = get(productContent, "fields.images"); //new images field

  const productSeo = get(productContent, "fields.seo");
  const editorialSection = get(productContent, "fields.editorialSection"); // components

  const entryId = get(productContent, "sys.id");
  const contentTypeFromSysId = get(productContent, "sys.contentType.sys.id");

  const entryTitle = title ? title : get(productContent, "fields.internalName");

  if (!productName) {
    return <Skeleton />;
  }

  return (
    <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
      <div className="relative h-full ">
        {/* --{JSON.stringify(editorialSection)} -- */}
        <SeoComponent
          seo={productSeo}
          title={productName}
          description={"A short description goes here."}
          product={product}
          images={images}
          asPath={router.asPath}
        />
        <div className="p-20x flex flex-col space-y-4 h-screenx items-center">
          {/* --{JSON.stringify(productContent)}-- */}
          <div className="bg-gray-50 w-full px-10x">
            {images ? (
              <ImageGallery images={images} />
            ) : (
              <div className="w-full rounded shadow-xl ">
                <ImageComponent image={image} />
              </div>
            )}
          </div>
          <Spacing>
            {" "}
            <div className="flex flex-col md:flex-row md:space-x-6 w-full py-4 px-10 bg-gray-50">
              <div className="md:w-1/2 flex flex-col">
                {/* <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            /> */}
                <div className="">
                  {productContentDescription
                    ? documentToReactComponents(
                        productContentDescription,
                        richtextRenderOptions
                      )
                    : productAltShortDescription}
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col space-y-2  px-4 pb-4x">
                <h1 className="text-3xl mb-4 font-bold">{productName}</h1>
                <p className=" text-xl text-blau">{productFormattedPrice}</p>
                <div className="flex flex-row space-x-2">
                  <p className=""> Reviews ({productReviews.total})</p>

                  <StarRating rating={productReviews.average_rating} />
                </div>

                <button
                  onClick={() => alert("product fake added to cart")}
                  className=" max-w-fit  rounded-xl bg-blau text-white p-2 shadow-md hover:bg-blau5"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </Spacing>

          <div className="w-full">
            <FlexibleFieldResolver field={editorialSection} />
          </div>
        </div>
      </div>
    </Xray>
  );
};

export async function getStaticPaths({ locales }) {
  //  get all product paths

  try {
    const productPathsFromCommercePlatform = await getShopifyProducts();

    // const paths = [{ params: { slug: "" } }];
    let paths = [];

    productPathsFromCommercePlatform.map((prd) => {
      // paths.push({ params: { slug: prd.handle } });
      for (const locale of locales) {
        paths.push({ params: { slug: prd.handle }, locale });
      }
    });

    if (!paths || paths.length < 1) {
      throw new Error("no paths");
    }

    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    throw error;
  }
}

export async function getStaticProps(context) {
  // get product from ecommerce platfrom as well as corresponding editorial content
  const locales = get(context, "locales");
  const locale = get(context, "locale");
  const preview = get(context, "preview");

  console.log("LL", context.req);

  const defaultLocale = get(context, "defaultLocaledefaultLocale");
  const slug = get(context, "params.slug");

  try {
    const productData = await getProductDataBySlug(slug, locale); // fetches data from commerce platform and contentful

    if (!productData) {
      return { notFound: true };
    }

    return {
      props: {
        productData: productData ? productData : {},
        locales,
        locale,
        preview: preview ? preview : false,
      },

      revalidate: 10,
    };
  } catch (error) {
    throw error;
  }
}

// fetcher for shopify products
const Shopifyfetcher = async (slug) => {
  const product = await getShopifyProductByHandle(slug);

  return product;
};

// fetcher for content - used only when in preview mode
const fetcher = async ({ contentType, locale, slug, preview = false }) => {
  console.log("SWR 2", locale);
  const pageEntries = await getEntriesByContentType(
    contentType,
    {
      "fields.slug": slug,
    },
    locale,
    preview
  );

  let homepageEntry = get(pageEntries, "items[0]");
  return homepageEntry;
};

ProductPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default ProductPage;
