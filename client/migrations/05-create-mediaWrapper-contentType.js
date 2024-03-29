module.exports = function(migration) {
    const mediaWrapper = migration
        .createContentType("mediaWrapper")
        .name("Media Wrapper")
        .displayField("internalName");

    mediaWrapper
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(false);

    const internalName = mediaWrapper
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    mediaWrapper
        .createField("altText")
        .name("Alt Text")
        .type("Symbol")
        .required(true)
        .validations([]);
    mediaWrapper
        .createField("asset")
        .name("Asset")
        .type("Link")
        .required(true)
        .linkType("Asset");

    mediaWrapper.changeFieldControl("asset", "builtin", "assetLinkEditor", {});
};