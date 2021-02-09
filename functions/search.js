const { search } = require("./services/elastic-search")

var getSearchBodyWithQuery = ({ q, type }) => {

    let query = {
        bool: null
    };

    if (type) {
        const types = type.split(",")
        query.bool = {
            ...query.bool,
            "filter": [{
                "terms": {
                    "Type": types
                }
            }]
        }
    }

    if (q && q !== "undefined") {
        query.bool = {
            ...query.bool,
            "must": {
                "simple_query_string": {
                    "query": q,
                    "fields": ["Title^5", "Actors", "Director"],
                },
            },
        }
    }

    if (query.bool) {
        searchBody.query = query;
    }

    return searchBody;
}

let searchBody = {
    size: 1000,
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
exports.handler = async ({ queryStringParameters }) => {
    console.log("query params", queryStringParameters)
    return await search(getSearchBodyWithQuery(queryStringParameters));
};
