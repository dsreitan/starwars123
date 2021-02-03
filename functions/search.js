const { search } = require("./services/elastic-search")

var searchBody = {
    size: 1000,
    // query: {
    //     bool: {
    //         "must": [
    //             { "match": { "parentId": "tt0458290" } },
    //         ],
    //     },
    // },
    sort: {
        boxOfficeInDollars: { order: "desc" },
    },
    aggs: {
        totalLengthInMinutes: {
            sum: {
                field: "lengthInMinutes",
            },
        },
        totalBoxOfficeInDollars: {
            sum: {
                field: "boxOfficeInDollars",
            },
        },
    },
}

// https://www.joshwcomeau.com/gatsby/using-netlify-functions-with-gatsby/
exports.handler = async (event) => {

    const searchResult = await search(searchBody);

    return searchResult;
};
