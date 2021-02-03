if (!process.env.ELASTIC_SEARCH_URL) {
    console.error("process.env.ELASTIC_SEARCH_URL not set")
}

const { Client } = require("@elastic/elasticsearch")
const client = new Client({ node: process.env.ELASTIC_SEARCH_URL });
const index = "data-03-02-2021";

exports.index = async (id, body) => {
    try {
        await client.index({
            index,
            id,
            body,
        });
    } catch (error) {
        console.log("indexing failed", id, error);
    }
}

exports.search = async (body) => {
    const query = {
        index,
        body
    }

    try {
        const searchResult = await client.search(query);
        console.log(`${searchResult.body.hits.total.value} hits`);

        const hits = searchResult.body.hits.hits.map(x => x._source);
        const aggs = searchResult.body.aggregations;

        return {
            statusCode: 200,
            body: JSON.stringify({ aggs, hits }, null, 2),
        };
    } catch (error) {
        console.log(error.meta.body.error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.meta.body.error, null, 2),
        };
    }
}
