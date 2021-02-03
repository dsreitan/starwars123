const elastic = require("./data/registerElastic")

const query = {
    index: elastic.INDEX_NAME,
    body: {
        size: 1000,
        query: {
            bool: {
                "must": [
                    { "match": { "parentId": "tt0458290" } },
                ],
            },
        },
        sort: {
            releasedOn: { order: "asc" },
        },
    },
};

// https://www.joshwcomeau.com/gatsby/using-netlify-functions-with-gatsby/
exports.handler = async (event) => {
    try {
        const searchResult = await elastic.client.search(query);
        console.log(`Hits total: ${searchResult.body.hits.total.value}`);

        const hits = searchResult.body.hits.hits;

        return {
            statusCode: 200,
            body: JSON.stringify(hits, null, 2),
        };

    } catch (error) {
        console.log(error.meta.body.error);
    }

    return {
        statusCode: 500,
        body: "check log for error",
    };
};
