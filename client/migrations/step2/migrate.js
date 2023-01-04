"use strict";

require("dotenv").config();

const { runMigration } = require("contentful-migration");

// uses options
const options = {
    spaceId: process.env.NEXT_PUBLIC_SPACE_ID,
    accessToken: process.env.CMA_TOKEN,
    environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT,
    yes: true,
};

console.log("PATH!!", __dirname);

const errorLog = (error) => {
    console.log("ERROR!!", error);
};

// run all migrations one after the other - skips to the next if error occurs
const migrations = async() => {
    console.log("RUNNING MIGRATIONS with these options --> ", options);
    let statusCode = 0;
    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/10-create-productPage-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/11-create-heroBanner-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/12-create-faqItem-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/13-create-SeoMetadata-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/14-create-seoExtra-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/15-create-productSlider-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    try {
        await runMigration({
            ...options,
            ... {
                filePath: `${__dirname}/16-edit-landingPage-contentType.js`,
            },
        });
    } catch (error) {
        errorLog(error);
    }

    process.exit(statusCode);
};

try {
    migrations();
} catch (error) {
    errorLog(error);
}