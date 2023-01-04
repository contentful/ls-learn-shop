module.exports = function(migration) {
    const productSlider = migration
        .createContentType("productSlider")
        .name("Product Slider")
        .displayField("internalName");

    const internalName = productSlider
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");
    const headline = productSlider
        .createField("headline")
        .name("Headline")
        .type("Symbol")
        .required(true);
    const alignment = productSlider
        .createField("alignment")
        .name("Alignment")
        .type("Boolean")
        .required(true);

    const products = productSlider
        .createField("products")
        .name("Products")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["productPage"] }],
        });
};