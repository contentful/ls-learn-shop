import _ from "lodash";
import ProductHandler from "../../commerce/utils/handlers/product-handler";
import axios from "axios";
import errorHandler from "../../lib/errorHandler";

const bagisto_products_url = "http://127.0.0.1:8000/api/products";
const shopify_products_url = `http://localhost:9020/api/shopify/product`;
const useShopify = process.env.NEXT_PUBLIC_USE_SHOPIFY;

const fetcher = (...args) => {
    return axios.get(...args);
};

export const getAllProductPaths = async(config) => {
    // make request

    try {
        const productHandler = new ProductHandler({
            fetcher,
        });
        let paths = [];
        const allProducts = await productHandler.getAllProducts();
        // let products = _.get(allProducts, "data.data");

        let products = allProducts;
        if (Array.isArray(products)) {
            paths = products.map((product) => {
                let slugVal = _.get(product, "url_key") ?
                    _.get(product, "url_key") :
                    _.get(product, "slug");
                const sku = _.get(product, "sku");
                return { params: { slug: slugVal } };
            });
        } else {
            return false;
        }

        return paths;
    } catch (error) {
        errorHandler(error);
        return false;
    }
};
export const getProduct = async(config) => {
    try {
        let productHandler = new ProductHandler({
            fetcher,
        });

        if (!config) {
            return false;
        }
        if (!config.slug) return false;

        const productDetail = await productHandler.getProductBySlug(config.slug);

        return productDetail;
    } catch (error) {
        console.log("omahlay error", error);
        return false;
    }
};