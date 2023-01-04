module.exports = function(migration) {
    const seo = migration
        .createContentType("seo")
        .name("SEO Metadata")
        .displayField("internalName");

    const internalName = seo
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");
    const title = seo
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(true)
        .validations([{
            size: {
                max: 60,
            },
        }, ]);
    const description = seo
        .createField("description")
        .name("Description")
        .type("Symbol")
        .validations([{
            size: {
                max: 160,
            },
        }, ]);

    // maybe add image and noindex/nofollow
    // noindex : hide page from search engines
    //  nofollow: exclude links from search ranking

    const extras = seo
        .createField("extras")
        .name("Extras")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["seoExtra"] }],
        });
};