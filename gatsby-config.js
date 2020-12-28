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
        name: "content",
        path: "./src/content/",
      },
      __key: "content",
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          pages: require.resolve("./src/components/layout/layout.tsx"),
          //default: require.resolve("./src/components/default-page-layout.js"),
        },
        gatsbyRemarkPlugins: [{
          resolve: "gatsby-remark-autolink-headers",
            options: {
              //offsetY: '100',
              isIconAfterHeader: true
            },
        }]
      },
    },
  ],
};
