const { ERA_REPUBLIC } = require("./eras")

const MOVIES = [
    {
        id: "tt0120915",
        name: "Phantom Menace",
        eraId: ERA_REPUBLIC.id,
    },
    {
        id: "tt1185834",
        name: "Clone Wars movie",
        eraId: ERA_REPUBLIC.id,
    },
]

exports.MOVIES = MOVIES.map(x => {
    return { imdbID: x.id, ...x }
});
