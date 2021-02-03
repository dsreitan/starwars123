import "../styles/timeline.css"
import React from "react"
import { useSearch } from "../hooks/useSearch"

const TimelineItem = ({ timelineItem }) => {
  const imdb = null;//useSearch(timelineItem.id)

  if (!imdb) {
    return (
      <div className={"container " + timelineItem.pos}>
        <div className="content">
          loading...
        </div>
      </div>
    )
  }

  return (
    <div className={"container " + timelineItem.pos}>
      <div className="content">
        <h2>{imdb.Title}</h2>
        <p>imdb rating {imdb.imdbRating}</p>
        <p>released {imdb.Released}</p>
        <p>runtime {imdb.Runtime}</p>
        <img width="20%" src={imdb.Poster} />
        <pre>{JSON.stringify(imdb, null, 2)}</pre>
      </div>
    </div>
  )
}

export default TimelineItem
