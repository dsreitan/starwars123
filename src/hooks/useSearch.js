import { useState, useEffect } from 'react';

export const useSearch = (query) => {
    const [searchData, setSearchData] = useState(null);

    if (searchData === null) {
        console.debug("query", query)
        search(query).then(x => {
            console.debug("results", query, x)
            setSearchData(x)
        })
    }

    useEffect(() => { })

    return searchData;
}


const search = async (query) => {
    var response = await fetch(`/.netlify/functions/search?${new URLSearchParams(query)}`)
    var json = await response.json();
    return json;
}