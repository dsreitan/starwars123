const { index } = require("./services/elastic-search")
const { fetchOmdbData } = require("./services/omdb")

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
            const omdbResult = await fetchOmdbData(item.id)
            item = { ...item, ...omdbResult }
        }

        await index(item.id, item)

        // fetch each episode in a series
        if (item.totalSeasons && event.queryStringParameters.episodes) {
            const lastSeason = parseInt(item.totalSeasons)
            for (let currentSeason = 1; currentSeason <= lastSeason; currentSeason++) {
                const omdbSeasonResult = await fetchOmdbData(item.id, currentSeason)

                for (let episode of omdbSeasonResult.Episodes.slice(0, 1)) {

                    episode.id = episode.imdbID;
                    episode.parentId = item.id;

                    const episodeOmdbResult = await fetchOmdbData(episode.imdbID)

                    //TODO: fetch imdb ep
                    await index(episode.id, { ...episode, ...episodeOmdbResult })
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