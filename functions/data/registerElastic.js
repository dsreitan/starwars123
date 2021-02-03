const elastic = require("@elastic/elasticsearch")
const isDev = process.env.NODE_ENV === "development";

if (!process.env.ELASTIC_SEARCH_URL) {
    console.error("process.env.ELASTIC_SEARCH_URL not set")
}

exports.INDEX_NAME = "data-03-02-2021";
exports.client = new elastic.Client({ node: process.env.ELASTIC_SEARCH_URL });