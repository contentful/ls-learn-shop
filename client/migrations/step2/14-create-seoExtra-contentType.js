module.exports = function(migration) {
    const seoExtra = migration
        .createContentType("seoExtra")
        .name("SEO Extra")
        .displayField("internalName");

    const internalName = seoExtra
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");
    const name = seoExtra
        .createField("name")
        .name("Name")
        .type("Symbol")
        .required(true);
    const value = seoExtra
        .createField("value")
        .name("Value")
        .type("Symbol")
        .required(true);
    const key = seoExtra.createField("key").name("Key").type("Symbol");
    const relativeUrl = seoExtra
        .createField("relativeUrl")
        .name("Relative URL ?")
        .type("Boolean");
};