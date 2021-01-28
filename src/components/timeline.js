import "../styles/timeline.css"
import React from "react"

const Timeline = ({ timelineItems }) => (
  <div className="timeline">
    {timelineItems.map(x =>
      <div className={"container " + x.pos}>
        <div className="content">
          <h2>{x.name}</h2>
          <p>{x.description}</p>
        </div>
      </div>
    )}
  </div>
)

export default Timeline
