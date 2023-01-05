import get from "lodash/get";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FlexibleFieldResolver } from "../components/FlexibleFieldResolver";
import Head from "next/head";

import MainLayout from "@layouts/MainLayout";

import { getEntriesByContentType } from "../lib/helpers";

// const MainLayout = dynamic(() => import("@layouts/MainLayout"), {
//   ssr: false,
// });

const LANDINPAGE_CONTENT_TYPE_NAME = "landingPage";

const Xray = dynamic(() => import("../components/Xray"), { ssr: false });

const Home = (props) => {
  const router = useRouter(); //https://nextjs.org/docs/api-reference/next/router#userouter

  const { locale, locales, defaultLocale } = router; // locale data from next js router

  const preview = get(props, "preview"); // preview mode? https://nextjs.org/docs/advanced-features/preview-mode

  const initialPage = get(props, "page"); // from getStaticProps

  // using swr (state-while-revalidate)   https://swr.vercel.app/docs/with-nextjs
  const { data: page, error } = useSWR(
    preview
      ? { contentType: LANDINPAGE_CONTENT_TYPE_NAME, locale, preview }
      : null,
    fetcher,
    { refreshInterval: 1000, fallbackData: initialPage }
  );

  const sections = get(page, "fields.sections");
  const headline = get(page, "fields.headline");

  const entryId = get(page, "sys.id");
  const contentTypeFromSysId = get(page, "sys.contentType.sys.id");
  const contentType = contentTypeFromSysId
    ? contentTypeFromSysId
    : get(page, "sys.type");
  const entryTitle = headline ? headline : get(page, "fields.internalName");

  const seoTitle = initialPage?.fields?.seo?.fields?.title;
  const seoDescription = initialPage?.fields?.seo?.fields?.description;
  const seoOgImage =
    initialPage?.fields?.seo?.fields?.ogImage?.fields?.file?.url;

  const seoTwitterCardStyle =
    initialPage?.fields?.seo?.fields?.twitterCardStyle || "summary_large_image";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {seoOgImage && (
          <meta property="og:image" content={`https:${seoOgImage}`} />
        )}

        <meta property="twitter:card" content={seoTwitterCardStyle} />
      </Head>
      {/* {JSON.stringify(seoOgImage)} */}

      <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
        <FlexibleFieldResolver field={sections} />
      </Xray>
    </>
  );
};

export async function getStaticProps(context) {
  const locales = get(context, "locales");
  const locale = get(context, "locale");
  const preview = get(context, "preview");
  console.log("context", preview, context);

  const defaultLocale = get(context, "defaultLocaledefaultLocale");

  const pageEntries = await getEntriesByContentType(
    LANDINPAGE_CONTENT_TYPE_NAME,
    {
      "fields.slug": "home-page",
    },
    locale,
    preview
  ); // get homepage entry from Contentful

  let homepageEntry = get(pageEntries, "items[0]"); // extract first item.

  return {
    props: {
      page: homepageEntry ? homepageEntry : {},
      locales,
      locale,
      preview: preview ? preview : false,
    },
  };
}

const fetcher = async ({ contentType, locale, preview = false }) => {
  const pageEntries = await getEntriesByContentType(
    contentType,
    {
      "fields.slug": "home-page",
    },
    locale,
    preview
  );

  let homepageEntry = get(pageEntries, "items[0]");
  return homepageEntry;
};

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
