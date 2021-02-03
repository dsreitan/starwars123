const { ERA_REPUBLIC } = require("./eras")

const SERIES = [
    {
        id: "tt0458290",
        name: "Clone Wars series",
        eraId: ERA_REPUBLIC.id,
    }
]

exports.SERIES = SERIES.map(x => {
    return { imdbID: x.id, ...x }
});
