import * as contentful from "contentful";
import _ from "lodash";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

const generateClientOptions = (is_preview) => {
    //https://contentful.github.io/contentful.js/contentful/9.1.9/contentful.html#.createClient
    let options = {};
    options.space = space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = is_preview ? preview_token : access_token;
    options.environment = environment ? environment : "master";
    options.resolveLinks = true;

    return options;
};

export const getAllLocales = async() => {
    const options = generateClientOptions(false);
    const contentfulClient = contentful.createClient(options);
    try {
        let allLocales = await contentfulClient.getLocales();
        let dataType = _.get(allLocales, "sys.type");
        let items = _.get(allLocales, "items");
        if (dataType === "Array") {
            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.log("getAllLocales error ", error);
    }
};

export const getEntriesByContentType = async(
    content_type,
    filter = null,
    locale = "en-US",
    preview = false
) => {
    const options = generateClientOptions(preview);

    try {
        const contentfulClient = contentful.createClient(options); // https://contentful.github.io/contentful.js/contentful/9.1.9/contentful.html#.createClient
        if (contentfulClient) {
            let params = { content_type: content_type, include: 3, locale }; //include -> to retrieve related data(linked entries) in same request, number of levels is 3

            if (filter) {
                params = {...params, ...filter };
            }

            let entries = await contentfulClient.getEntries(params); // https://contentful.github.io/contentful.js/contentful/9.1.9/ContentfulClientAPI.html#.getEntries

            const items = _.get(entries, "items");

            return { items };
        } else {
            return false;
        }
    } catch (error) {
        console.log("any errors? ->", error);
        return false;
    }
};