module.exports = function(migration) {
    const splitScreen = migration
        .createContentType("splitScreen")
        .name("Split Screen Component")
        .displayField("internalName");

    const internalName = splitScreen
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");
    const headline = splitScreen
        .createField("headline")
        .name("Headline")
        .type("Symbol")
        .required(true);
    const subline = splitScreen
        .createField("subline")
        .name("Subline")
        .type("Symbol");

    const ctaText = splitScreen
        .createField("ctaText")
        .name("CTA Button Text")
        .type("Symbol");
    const ctaTarget = splitScreen
        .createField("ctaTarget")
        .name("CTA Target URL")
        .type("Symbol");

    const contentAlignment = splitScreen
        .createField("contentAlignment")
        .name("Content Alignment")
        .type("Symbol")
        .required(true)
        .validations([{ in: ["left", "right", "default"] }]);

    const image = splitScreen
        .createField("image")
        .name("Image")
        .type("Link")
        .linkType("Entry")
        .validations([{ linkContentType: ["mediaWrapper"] }])
        .required(true);

    const additionalImage = splitScreen
        .createField("additionalImage")
        .name("Additional Image (Optional)")
        .type("Link")
        .linkType("Entry")
        .validations([{ linkContentType: ["mediaWrapper"] }]);

    splitScreen.changeFieldControl("contentAlignment", "builtin", "dropdown", {
        helpText: "How to align the component's Meta i.e the text content. default is middle for 2 images and left for 1 image",
        trueLabel: "Yes",
        falseLabel: "No",
    });
};