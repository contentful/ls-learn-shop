import get from "lodash/get";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MediaWrapper from "../MediaWrapper";

import {
  getShopifyProductByHandle,
  getShopifyProductByGid,
} from "../../lib/product/helpers";

const ProductTile = ({ product }) => {
  const id = product?.sys?.id;
  const slug = product?.fields?.slug;
  const gid = product?.fields?.gid;
  const images = product?.fields?.images;

  const [productDetail, setProductDetail] = useState(""); //from e-commerce platform

  useEffect(() => {
    (async () => {
      if (!slug) {
        return;
      }
      try {
        let productDetailFromCommercePlatform;
        if (gid) {
          productDetailFromCommercePlatform = await getShopifyProductByGid(gid);
        } else {
          productDetailFromCommercePlatform = await getShopifyProductByHandle(
            slug
          );
        }
        setProductDetail(productDetailFromCommercePlatform);
      } catch (error) {
        console.log("productDetailFromCommercePlatform error", error);
      }
    })();
    return () => {};
  }, [slug]);

  const productName = get(productDetail, "name");
  const productHandle = get(productDetail, "slug");
  const productSku = get(productDetail, "sku");
  const productPrice = get(productDetail, "price");
  const productFormattedPrice = get(productDetail, "formated_price");
  const productReviews = get(productDetail, "reviews");
  const productInStock = get(productDetail, "in_stock");
  const productAltShortDescription = get(productDetail, "short_description");
  const descriptionHtml = get(productDetail, "descriptionHtml");

  return (
    <div>
      <Link href={`/products/${slug || productHandle}`}>
        <div
          itemScope
          itemType={"https://schema.org/Product"}
          className="flex w-full flex-col space-y-4 max-w-fit"
        >
          {/* <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> */}
          <div className=" w-52 h-52 md:h-56 md:w-56 lg:h-64 lg:w-64  flex flex-row items-center justify-items-center  border-2 rounded-lg">
            <div className="hover:scale-125 trasition-all  ease-in-out delay-300 delay-200x">
              <MediaWrapper {...images[0]} />
            </div>
          </div>
          <div className="flex flex-col w-60">
            <div className="flex flex-col space-y-2">
              <h4 itemProp={"name"} className="font-bold text-lgx  ">
                {productName}
              </h4>
              <div
                itemProp={"offers"}
                itemScope
                itemType={"https://schema.org/Offer"}
              >
                <span itemProp={"price"} className=" text-base text-blau">
                  {productFormattedPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

function ProductTile2(product) {
  const id = get(product, "sys.id");
  const slug = get(product, "fields.slug");

  // let gid = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcxMDEzNDcxMzU2NjQ=";
  const gid = get(product, "fields.gid");

  const images = get(product, "fields.images"); //new images field
  const [productDetail, setProductDetail] = useState(""); //from e-commerce platform

  // const slideIndex = get(product, "slideIndex");
  // const index = get(product, "index");

  const productName = get(productDetail, "name");
  const productHandle = get(productDetail, "slug");
  const productSku = get(productDetail, "sku");
  const productPrice = get(productDetail, "price");
  const productFormattedPrice = get(productDetail, "formated_price");
  const productReviews = get(productDetail, "reviews");
  const productInStock = get(productDetail, "in_stock");
  const productAltShortDescription = get(productDetail, "short_description");
  const descriptionHtml = get(productDetail, "descriptionHtml");

  useEffect(async () => {
    if (!slug) {
      return;
    }
    let productDetailFromCommercePlatform;
    try {
      // if (gid) {
      //   productDetailFromCommercePlatform = await getShopifyProductByGid(gid);
      // } else {
      //   productDetailFromCommercePlatform = await getShopifyProductByHandle(
      //     slug
      //   );
      // }
      // setProductDetail(productDetailFromCommercePlatform);
    } catch (error) {
      console.log("productDetailFromCommercePlatform error", error);
    }

    return () => {};
  }, [slug]);

  if (!productName) {
    return "";
  }

  return "test";
  return (
    <Link href={`/products/${slug || productHandle}`}>
      <div className="flex w-full flex-col space-y-4 max-w-fit">
        {/* <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> */}
        <div className=" w-52 h-52 md:h-56 md:w-56 lg:h-64 lg:w-64  flex flex-row items-center justify-items-center  border-2 rounded-lg">
          <div className="hover:scale-125 trasition-all  ease-in-out delay-300 delay-200x">
            <MediaWrapper {...images[0]} />
          </div>
        </div>
        <div className="flex flex-col w-60">
          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lgx  ">{productName}</h4>
            <span className=" text-base text-blau">
              {productFormattedPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductTile;
