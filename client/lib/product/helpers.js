import _ from "lodash";
import errorHandler from "../errorHandler";
// import { StorefrontClient } from "@shopify/shopify-api/dist/clients/graphql/storefront_client";
import Client from "shopify-buy";

import axios from "axios";
import { getEntriesByContentType } from "../helpers";

const SHOPIFY_SHOP = process.env.NEXT_PUBLIC_SHOPIFY_SHOP;
const SHOPIFY_STOREFRONT_API_TOKEN =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;
const shopifyClient = Client.buildClient({
    storefrontAccessToken: SHOPIFY_STOREFRONT_API_TOKEN,
    domain: SHOPIFY_SHOP,
});

export const getProductDataBySlug = async(slug, locale = "en-US") => {
    try {
        const productContentCMS = await getEntriesByContentType(
            "productPage", {
                "fields.slug": slug,
            },
            locale
        ); // get product data with this slug from Contentful

        const productDataCommerce = await getShopifyProductByHandle(slug);

        return {
            productContentCMS,
            productDataCommerce: parseShopifyResponse(productDataCommerce),
        };
    } catch (error) {
        errorHandler(error);
    }
};

async function ShopifyData(query) {
    const URL = `https://${SHOPIFY_SHOP}/graphql.json`;

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    };

    try {
        const data = await fetch(URL, options).then((response) => {
            return response.json();
        });

        console.log("ERR!!!!!!!!-------------", data);

        return data;
    } catch (error) {
        console.log("777777777777777777", error);
        throw new Error("Products not fetched");
    }
}

const parseShopifyResponse = (response) => JSON.parse(JSON.stringify(response));
export const getShopifyProducts = async() => {
    // const URL = `${SHOPIFY_SHOP}/api/graphql.json`;

    const products = await shopifyClient.product.fetchAll();
    return parseShopifyResponse(products);
};

export const getShopifyProductByHandle = async(handle) => {
    try {
        const product = await shopifyClient.product.fetchByHandle(handle);

        const prd = parseShopifyResponse(product);

        return normalizeProduct(prd);
    } catch (error) {
        errorHandler(error);
    }
};
export const getShopifyProductByGid = async(gid) => {
    try {
        const product = await shopifyClient.product.fetch(gid);

        const prd = parseShopifyResponse(product);

        return normalizeProduct(prd);
    } catch (error) {
        errorHandler(error);
    }
};

const normalizeProduct = (product) => {
    let data = _.get(product, "node") ? _.get(product, "node") : product;

    try {
        const {
            title,
            descriptionHtml,
            sku,
            url_key,
            slug,
            handle,
            description,
            priceRange,
            short_description,
            variants,
        } = data;

        let name = _.get(data, "name") ? _.get(data, "name") : _.get(data, "title");

        let id = _.get(data, "id");

        let price = 0;
        let currencyCode = "";
        let formated_price = null;

        if (priceRange) {
            price = _.get(data, "price") ?
                _.get(data, "price") :
                _.get(priceRange, "maxVariantPrice.amount");
            formated_price = _.get(data, "formated_price") ?
                _.get(data, "formated_price") :
                `${_.get(priceRange, "maxVariantPrice.currencyCode")} ${_.get(
            priceRange,
            "maxVariantPrice.amount"
          )}`;
        }

        if (variants) {
            let priceV2 = _.get(variants, "[0].priceV2");
            price = _.get(priceV2, "amount");
            currencyCode = _.get(priceV2, "currencyCode");
            formated_price = _.get(data, "formated_price") ?
                _.get(data, "formated_price") :
                `${_.get(priceV2, "currencyCode")} ${_.get(priceV2, "amount")}`;
        }

        return {
            id: id ? id : "",
            sku: sku ? sku : "",
            name: title ? title : name,
            url_key: "test-product",
            slug: slug ? slug : handle,
            price: price ? price : 0,
            currencyCode,
            formated_price: formated_price,
            short_description: short_description ? short_description : "",
            description: description,
            descriptionHtml,
            reviews: {
                total: 0,
                total_rating: 0,
                average_rating: 0,
                percentage: [],
            },
            in_stock: true,
            is_saved: false,
            is_wishlisted: false,
            is_item_in_cart: false,
            show_quantity_changer: true,
            images: [],
            videos: [],
        };
    } catch (error) {
        errorHandler(error);
        return productSample;
    }
};

export const mediaWrapperFieldStripper = (wrapper) => {
    let imageUrl = _.get(wrapper, "fields.media.fields.file.url");
    if (!imageUrl) {
        imageUrl = _.get(wrapper, "fields.asset.fields.file.url");
    }
    let imageHeight = _.get(
        wrapper,
        "fields.media.fields.file.details.image.height"
    );
    let imageWidth = _.get(
        wrapper,
        "fields.media.fields.file.details.image.width"
    );

    if (!imageHeight) {
        imageHeight = _.get(
            wrapper,
            "fields.asset.fields.file.details.image.height"
        );
    }
    if (!imageWidth) {
        imageWidth = _.get(wrapper, "fields.asset.fields.file.details.image.width");
    }
    const imageAltText = _.get(wrapper, "fields.altTextAlternativeText");

    if (!imageUrl) {
        return false;
    }

    console.log("mediaWrapperFieldStripper imageAltText", imageWidth);
    return {
        url: `https:${imageUrl}`,
        height: imageHeight,
        width: imageWidth,
        altText: imageAltText,
    };
};