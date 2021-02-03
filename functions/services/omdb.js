const fetch = require('node-fetch')

if (!process.env.OMDB_API_KEY) {
    console.error("process.env.OMDB_API_KEY not set")
}

exports.fetchOmdbData = async (imdbID, season) => {
    try {
        const omdbUrl = new URL("https://www.omdbapi.com");
        omdbUrl.searchParams.append("apikey", process.env.OMDB_API_KEY);
        omdbUrl.searchParams.append("i", imdbID);
        if (season) {
            omdbUrl.searchParams.append("season", season);
        }

        var response = await fetch(omdbUrl)

        var json = await response.json();

        json = parseFields(json);

        console.log("fetched from omdb", imdbID, season, json.Response)

        return json;
    } catch (error) {
        console.log("fetched failed", imdbID, error);
    }
}

const parseFields = (json) => {
    return {
        releasedOn: new Date(json.Released),
        lengthInMinutes: parseInt(`${json.Runtime}`),
        boxOfficeInDollars: parseInt(`${json.BoxOffice}`.replace(/[$,\,]/g, "")),
        ...json
    };
}