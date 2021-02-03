import { useState, useEffect } from 'react';

export const useSearch = (id) => {
    const [imdbData, setImdbData] = useState(null);

    if (imdbData === null) {
        fetchImdbData(id, 1).then(x => {
            console.debug("imdb data", x)
            setImdbData(x)
        })
    }

    useEffect(() => { })

    return imdbData;
}

const fetchImdbData = async (id) => {
    var cachedData = sessionStorage[id];
    if (cachedData) return { isCached: true, ...JSON.parse(cachedData) };

    var response = await fetch(`/.netlify/functions/search`)
    var json = await response.json();

    sessionStorage[id] = JSON.stringify(json);
    return json;
}