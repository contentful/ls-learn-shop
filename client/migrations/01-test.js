module.exports = async function(
    migration, { makeRequest, spaceId, accessToken }
) {
    const product = migration.editContentType("product");

    const contentType = await makeRequest({
        method: "GET",
        url: `/content_types/product`,
    });
    let existingCategories = contentType.fields.find(
        (f) => f.id === "categories"
    );
    let existingLinkContentType =
        existingCategories.items.validations[0].linkContentType;

    const categories = product
        .editField("categories")
        .name("Categories")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [
                { linkContentType: [...existingLinkContentType, "blog", "article"] },
            ],
        });
};