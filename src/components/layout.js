/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title} />
      <div
      >
        <main>{children}</main>
        <footer
        >
          {/* Sources:
    <ul>
            <li><a href="https://eu.usatoday.com/story/tech/reviewedcom/2020/02/27/how-watch-all-star-wars-order/4892088002/">usatoday.com - How to watch Star Wars</a></li>
            <li><a href="https://www.starwars.com/news/star-wars-the-clone-wars-chronological-episodeorder">starwars.com - Clone wars chronological episodelist</a></li>
            <li><a href="https://www.inafarawaygalaxy.com/2019/08/starwars-chronological-order.html">inafarawaygalaxy.com - Star wars chronological order</a></li>
          </ul> */}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
