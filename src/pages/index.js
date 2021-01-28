import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Timeline from "../components/timeline"
import Image from "../components/image"
import SEO from "../components/seo"

import { movies as data } from "../data"
/*
imdb scores?
 */
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Timeline timelineItems={data}></Timeline>

    {/*
    <div>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)

export default IndexPage
