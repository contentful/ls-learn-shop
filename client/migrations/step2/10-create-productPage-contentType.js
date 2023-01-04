module.exports = function(migration) {
    const productPage = migration
        .createContentType("productPage")
        .name("Product page")
        .displayField("internalName");

    const internalName = productPage
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    const seo = productPage
        .createField("seo")
        .name("SEO")
        .type("Link")
        .linkType("Entry")
        .validations([{ linkContentType: ["seo"] }]);
    const slug = productPage
        .createField("slug")
        .name("Slug")
        .type("Symbol")
        .required(true)
        .validations([{ unique: true }]);

    const sku = productPage
        .createField("sku")
        .name("SKU")
        .type("Symbol")
        .required(true)
        .validations([{ unique: true }]);
    const richContent = productPage
        .createField("richContent")
        .name("Rich Content")
        .type("RichText");

    const editorialModules = productPage
        .createField("editorialModules")
        .name("Editorial Modules")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{
                linkContentType: [
                    "faqItem",
                    "heroBanner",
                    "mediaWrapper",
                    "productSlider",
                ],
            }, ],
        });

    const images = productPage
        .createField("images")
        .name("Images")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["mediaWrapper"] }],
        });
};