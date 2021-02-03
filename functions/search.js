const { INDEX_NAME, client } = require("./services/elastic-search")

const query = {
    index: INDEX_NAME,
    body: {
        size: 1000,
        // query: {
        //     bool: {
        //         "must": [
        //             { "match": { "parentId": "tt0458290" } },
        //         ],
        //     },
        // },
        sort: {
            releasedOn: { order: "asc" },
        },
        aggs: {
            totalLengthInMinutes: {
                sum: {
                    field: "lengthInMinutes",
                },
            },
        },
    }
};

// https://www.joshwcomeau.com/gatsby/using-netlify-functions-with-gatsby/
exports.handler = async (event) => {
    try {
        const searchResult = await client.search(query);
        console.log(`${searchResult.body.hits.total.value} hits`);

        const hits = searchResult.body.hits.hits;
        const aggs = searchResult.body.aggregations;

        return {
            statusCode: 200,
            body: JSON.stringify({ aggs, hits }, null, 2),
        };

    } catch (error) {
        console.log(error.meta.body.error);
    }

    return {
        statusCode: 500,
        body: "check log for error",
    };
};
