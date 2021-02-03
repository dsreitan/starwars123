import { useState, useEffect } from 'react';

export const useSearch = () => {
    const [searchData, setSearchData] = useState(null);

    if (searchData === null) {
        search().then(x => {
            console.debug("search data", x)
            setSearchData(x)
        })
    }

    useEffect(() => { })

    return searchData;
}


const search = async () => {
    var response = await fetch(`/.netlify/functions/search`)
    var json = await response.json();
    return json;
}