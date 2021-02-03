import React from "react"
import TimelineItem from "./timelineItem"
import "../styles/timeline.css"

const Timeline = ({ timelineItems }) => (
  <div className="timeline">
    {timelineItems && timelineItems.map(x =>
      <TimelineItem key={x.id} timelineItem={x} />
    )}
  </div>
)

export default Timeline
