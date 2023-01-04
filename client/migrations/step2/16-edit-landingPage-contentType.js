/*

delete the image field!

*/

const _ = require("lodash");

module.exports = function(migration) {
    const landingPage = migration.editContentType("landingPage");

    const headline = landingPage.editField("headline").localized(true);

    const sections = landingPage
        .editField("sections")
        .name("Sections")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{
                linkContentType: [
                    "productSection",
                    "heroBanner",
                    "productSlider",
                    "splitScreen",
                ],
            }, ],
        });
};