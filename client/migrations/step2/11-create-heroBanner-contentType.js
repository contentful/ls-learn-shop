module.exports = function(migration) {
    const heroBanner = migration
        .createContentType("heroBanner")
        .name("Hero Banner")
        .displayField("internalName");

    const internalName = heroBanner
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    const headline = heroBanner
        .createField("headline")
        .name("Headline")
        .localized(true)
        .type("Symbol");

    const subline = heroBanner
        .createField("subline")
        .name("subline")
        .localized(true)
        .type("Symbol");

    const ctaText = heroBanner
        .createField("ctaText")
        .name("CTA Text")
        .type("Symbol");

    const image = heroBanner
        .createField("image")
        .name("Image")
        .type("Link")
        .linkType("Entry")
        .validations([{ linkContentType: ["mediaWrapper"] }])
        .required(true);

    const targetPage = heroBanner
        .createField("targetPage")
        .name("Target Page")
        .type("Link")
        .linkType("Entry")
        .validations([{ linkContentType: ["productPage", "landingPage"] }]);
};