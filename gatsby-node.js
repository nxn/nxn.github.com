const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const { data } = await graphql(`
        query {
            file(
                sourceInstanceName: { eq: "content" }, 
                relativePath: { regex: "/^resume/i" }, 
                name: { eq: "index" }
            ) {
                childMdx { slug }
            }
            allFile(
                filter: { 
                    sourceInstanceName: { eq: "content" }, 
                    relativePath: { regex: "/^posts/i" }, 
                    name: { eq: "index" }
                }
            ) {
                nodes { childMdx { slug } }
            }
        }
    `);

    createPage({
        path:       data.file.childMdx.slug,
        component:  path.resolve('./src/templates/resume.tsx'),
        context:    { slug: data.file.childMdx.slug },
    });

    data.allFile.nodes.forEach(({ childMdx: post }) => {
        createPage({
            path:       post.slug,
            component:  path.resolve('./src/templates/post.tsx'),
            context:    { slug: post.slug },
        })
    });
}