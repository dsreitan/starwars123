import React from "react"
import TimelineItem from "./timelineItem"
import { useSearch } from "../hooks/useSearch"
import "../styles/timeline.css"

const Timeline = () => {
  const searchData = useSearch();
  console.log("timeline", searchData)

  // TODO: dynamic components https://www.storyblok.com/tp/react-dynamic-component-from-json
  return (
    <div className="timeline">
      <p>Total runtime: {searchData && searchData.aggs.totalLengthInMinutes.value}</p>
      <p>Total box office: {searchData && currencyFormat(searchData.aggs.totalBoxOfficeInDollars.value)}</p>
      {
        searchData && searchData.hits.map(x =>
          <TimelineItem key={x.id} value={x} />
        )
      }
    </div>
  )
}

export default Timeline

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}