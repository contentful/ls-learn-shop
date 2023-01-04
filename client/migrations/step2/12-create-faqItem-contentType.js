module.exports = function(migration) {
    const faqItem = migration
        .createContentType("faqItem")
        .name("FAQ Item")
        .displayField("internalName");

    const internalName = faqItem
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    const question = faqItem
        .createField("question")
        .name("Question")
        .type("Symbol")
        .required(true);

    const answer = faqItem
        .createField("answer")
        .name("Answer")
        .type("Symbol")
        .required(true);
};