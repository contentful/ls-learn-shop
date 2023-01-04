/*

a dynaamic SEO component using NextSeo

*/

import React from "react";
import { NextSeo, ProductJsonLd } from "next-seo";
import _ from "lodash";

const metaGenerator = (extras) => {
  let openGraph = {};
  let twitter = {};
  try {
    if (Array.isArray(extras)) {
      extras.map((extra, ex) => {
        const name = _.get(extra, "fields.name");
        const value = _.get(extra, "fields.value");
        const key = _.get(extra, "fields.key");

        switch (name) {
          case "og:title":
            openGraph.title = `Mena achu ${value}`;
            break;
          case "og:description":
            openGraph.description = value;
            break;
          case "og:url":
            openGraph.url = value;
            break;
          case "og:image":
            openGraph.images = [
              {
                url: value,
              },
            ];
            break;

          default:
            break;
        }
      });
    }
  } catch (error) {}

  return { openGraph, twitter };
};

export default function SeoComponent({
  seo,
  title,
  description,
  product,
  images,
  asPath,
}) {
  const titleCMS = _.get(seo, "fields.title");
  const descriptionCMS = _.get(seo, "fields.description");
  const extras = _.get(seo, "fields.extras");

  return (
    <>
      {/* {JSON.stringify(product?.short_description || product?.description)} */}

      <NextSeo
        title={titleCMS ? titleCMS : title}
        description={descriptionCMS ? descriptionCMS : description}
        openGraph={metaGenerator(extras).openGraph}
      />
      {product ? (
        <ProductJsonLd
          productName={product.name}
          images={
            Array.isArray(images)
              ? images.map((img) => {
                  return _.get(img, "fields.asset.fields.file.url");
                })
              : []
          }
          description={product?.short_description || product?.description}
          brand="Contentful Learning Services"
          material="ceramic"
          disambiguatingDescription={
            product?.short_description || product?.description
          }
          //   releaseDate="2014-02-05T08:00:00+08:00"
          //   productionDate="2015-02-05T08:00:00+08:00"
          //   purchaseDate="2015-02-06T08:00:00+08:00"
          //   award="Best Executive Anvil Award."
          reviews={[]}
          aggregateRating={{
            ratingValue: product.reviews.average_rating,
            reviewCount: product.reviews.total,
          }}
          offers={[
            {
              price: product.price,
              priceCurrency: product.currencyCode,
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/InStock",
              url: `${process.env.NEXT_PUBLIC_BASE_PATH}${asPath}`,
            },
          ]}
          sku={product.sku}
          mpn={product.slug}
        />
      ) : (
        ""
      )}
    </>
  );
}
