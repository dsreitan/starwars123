import "../styles/timeline.css"
import React from "react"

const TimelineItem = ({ value }) => {
  if (!value) {
    return (
      <div className={"container"}>
        <div className="content">
          loading...
        </div>
      </div>
    )
  }

  return (
    <div className={"container " + value.pos}>
      <div className="content">
        <h2>{value.Title}</h2>
        <p>imdb rating {value.imdbRating}</p>
        <p>released {value.Released}</p>
        <p>runtime {value.Runtime}</p>
        <img width="20%" src={value.Poster} />
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  )
}

export default TimelineItem
