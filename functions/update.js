const fetch = require('node-fetch')
const elastic = require("./data/registerElastic")

// https://www.joshwcomeau.com/gatsby/using-netlify-functions-with-gatsby/
exports.handler = async (event) => {
    if (event.queryStringParameters.password !== process.env.UPDATE_PASSWORD) {
        return {
            statusCode: 403,
            body: "Authentication failed"
        };
    }

    let dataSources = [];

    if (event.queryStringParameters.eras) {
        const { ERAS } = require("./data/eras")

        dataSources = [...dataSources, ...ERAS]
        console.log("added eras")
    }
    if (event.queryStringParameters.movies) {
        const { MOVIES } = require("./data/movies")

        dataSources = [...dataSources, ...MOVIES]
        console.log("added movies")
    }
    if (event.queryStringParameters.series) {
        const { SERIES } = require("./data/series")

        dataSources = [...dataSources, ...SERIES]
        console.log("added series")
    }
    if (event.queryStringParameters.episodes) {
        console.log("added episodes")
    }

    console.log("indexing data..")

    for (let item of dataSources) {
        if (item.imdbID) {
            const omdbResult = await fetchImdbData(item.id)
            item = { ...item, ...omdbResult }
        }

        await indexDocument(item.id, item)

        if (item.totalSeasons && event.queryStringParameters.episodes) {
            const lastSeason = parseInt(item.totalSeasons)
            for (let currentSeason = 1; currentSeason <= lastSeason; currentSeason++) {
                const omdbResult = await fetchImdbData(item.id, currentSeason)

                for (let episode of omdbResult.Episodes) {

                    episode.id = episode.imdbID;
                    episode.parentId = item.id;

                    //TODO: fetch imdb ep
                    await indexDocument(episode.id, episode)
                }
            }
        }
    }

    console.log("indexing finished")

    return {
        statusCode: 200,
        body: "OK"
    };
};

const indexDocument = async (id, body) => {
    try {
        await elastic.client.index({
            index: elastic.INDEX_NAME,
            id,
            body,
        });
    } catch (error) {
        console.log("indexing failed", id, error);
    }
}

const fetchImdbData = async (id, season) => {
    try {
        if (!process.env.OMDB_API_KEY) {
            console.error("process.env.OMDB_API_KEY not set")
        }

        let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`;
        if (season) {
            url = `${url}&Season=${season}`
        }

        var response = await fetch(url)

        var json = await response.json();

        json = parseFields(json);

        console.log("fetched from omdb", id, season, json.Response)

        return json;
    } catch (error) {
        console.log("fetched failed", id, error);
    }
}

const parseFields = (json) => {
    return {
        releasedOn: new Date(json.Released),
        lengthInMinutes: parseInt(`${json.Runtime}`),
        ...json
    };
}


    // // Query params
    // // `?hi=5` -> { hi: 5 }
    // console.log(event.queryStringParameters);
    // // HTTP method (GET, POST, etc)
    // console.log(event.httpMethod);
    // // Request body (for non-GET requests)
    // // In object form, no need to JSON.parse
    // console.log(event.body);
    // // Headers
    // // Includes cookie, referer, origin, and all the typical
    // // stuff you'd expect.
    // console.log(event.headers);