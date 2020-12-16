module.exports = {
  siteMetadata: {
    title: "Personal Portfolio: Ernie Wieczorek · nxn.io",
    siteUrl: "https://nxn.io/",
    description: "The personal portfolio of Ernie Wieczorek. Ernie is a Philadelphia based software developer who " +
      "specializes in full stack web application development. Contains summary of recent ventures, discoveries, and " +
      "guidance on technical matters."
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    //"gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blurbs",
        path: "./src/blurbs/",
      },
      __key: "blurbs",
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          pages: require.resolve("./src/components/layout.tsx"),
          //default: require.resolve("./src/components/default-page-layout.js"),
        },
      },
    },
  ],
};
