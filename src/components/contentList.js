import React from "react"
import ContentListItem from "./contentListItem"
import { useSearch } from "../hooks/useSearch"
import { withDefault, useQueryParams, NumberParam, StringParam, ArrayParam } from "use-query-params";

const ContentList = () => {
  //https://github.com/pbeshai/use-query-params
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    type: withDefault(ArrayParam, []),
  });
  const { q: searchQuery, type } = query;

  const searchData = useSearch(query);

  return (
    <div>
      <p>Total runtime: {searchData && searchData.aggs.totalLengthInMinutes.value}</p>
      <p>Total box office: {searchData && currencyFormat(searchData.aggs.totalBoxOfficeInDollars.value)}</p>
      <div>
        <h1>searchQuery is '{searchQuery}'</h1>
        <h1>There are {type.length} filters active.</h1>

        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(event) => setQuery({ q: event.target.value })}
        />
        <label htmlFor="movie">Movies</label>
        <input
          type="checkbox"
          id="movie"
          name="movie"
          checked={type.includes("movie")}
          onChange={(event) => setQuery({ type: event.target.checked ? [...type, event.target.name] : type.filter(x => x !== event.target.name) })}
        />
        <label htmlFor="series">Series</label>
        <input
          type="checkbox"
          id="series"
          name="series"
          checked={type.includes("series")}
          onChange={(event) => setQuery({ type: event.target.checked ? [...type, event.target.name] : type.filter(x => x !== event.target.name) })}
        />
        <label htmlFor="episode">Episodes</label>
        <input
          type="checkbox"
          id="episode"
          name="episode"
          checked={type.includes("episode")}
          onChange={(event) => setQuery({ type: event.target.checked ? [...type, event.target.name] : type.filter(x => x !== event.target.name) })}
        />
      </div>
      {
        searchData && searchData.hits.map(x =>
          <ContentListItem key={x.id} value={x} />
        )
      }
    </div>
  )
}

export default ContentList

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}