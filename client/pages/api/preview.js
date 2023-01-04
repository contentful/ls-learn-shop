import { getProductDataBySlug } from "../../lib/product/helpers";
import { getEntriesByContentType } from "../../lib/helpers";
import _ from "lodash";

const setPreview = (res, url) => {
    console.log("Preview set");
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});
    res.setHeader("Content-Type", "text/html");
    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
    );
    res.end();
};

export default async function preview(req, res) {
    const { secret, slug, type } = req.query;

    if (secret !== process.env.NEXT_PUBLIC_PREVIEW_SECRET) {
        return res.status(401).json({ message: "Invalid preview secret" });
    }

    let url = "/";

    if (!type) {
        throw new Error("Wrong preview type");
    }

    switch (type) {
        case "landingPage":
            url = `/`;

            return setPreview(res, url);

        case "productPage":
            // Fetch the headless CMS to check if the provided `slug` exists
            // const productData = await getProductDataBySlug(slug);
            const productContentCMS = await getEntriesByContentType(
                "productPage", {
                    "fields.slug": slug,
                },
                undefined,
                true
            );
            const productSlug = _.get(productContentCMS, "items[0].fields.slug");
            // const post = await getPreviewPostBySlug(slug);
            console.log("preview secret", productSlug);
            // If the slug doesn't exist prevent preview mode from being enabled

            if (!productSlug) {
                return res.status(401).json({ message: "Invalid slug" });
            }
            url = `/products/${productSlug}`;

            return setPreview(res, url);

            break;

        default:
            break;
    }
}