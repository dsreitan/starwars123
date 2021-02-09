import React from "react"

const ContentListItem = ({ value }) => {
  console.log("item render", value?.id)

  if (!value) return (
    <details>
      <summary>Loading</summary>
    </details>
  )

  return (
    <details>
      <summary>{value.Title}</summary>
      <pre>{JSON.stringify(value)}</pre>
    </details>
  )
}

export default ContentListItem
