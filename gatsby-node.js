const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allFile(filter: {sourceInstanceName: {eq: "content"}, relativeDirectory: {eq: "posts"}}) {
                nodes {
                    childMdx {
                        slug
                    }
                }
            }
        }
    `);

    result.data.allFile.nodes.forEach(({ childMdx: node }) => {
        createPage({
            path:       node.slug,
            component:  path.resolve('./src/templates/mdxpage.tsx'),
            context:    { slug: node.slug },
        })
    });
}