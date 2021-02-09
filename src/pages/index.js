import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import ContentList from "../components/contentList"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <ContentList />

    <div>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
