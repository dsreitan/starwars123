import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Timeline from "../components/timeline"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Timeline />

    <div>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
