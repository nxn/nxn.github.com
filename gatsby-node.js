const path      = require('path');
const mdx       = require('@mdx-js/mdx');
const babel     = require('@babel/core');

const transform = code => babel.transform(code, {
    plugins: [
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-proposal-object-rest-spread'
    ]
}).code;

const extractSummary = () => (tree, file) => {
    // Poor and relatively inefficient approach; it restricts Summaries to the top level of the file and most likely has
    // a million other problems.
    const start = tree.children.findIndex(node => node.type === 'jsx' && node.value === '<Summary>');
    const end   = tree.children.findIndex(node => node.type === 'jsx' && node.value === '</Summary>');

    if (start < 0 || end < 0) {
        // Can't seem to find any better way to stop compilation when there is no point in continuing
        return Error("No Summary");
    }

    // Removes everything except the nodes in-between the Summary. Probably not the correct way of doing this, but
    // neither is anything else in this function.
    tree.children = tree.children.slice(start + 1, end);
}

const extractOptions = {
    remarkPlugins: [ extractSummary ],
    skipExport: true
};

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type !== 'Mdx') {
        return;
    }

    // Store additional date fields -- useful for grouping, filtering, and creating JS Dates client-side
    if (node.frontmatter && node.frontmatter.date) {
        const date = new Date(node.frontmatter.date);

        if (date instanceof Date && !isNaN(date)) {
            const year          = date.getFullYear();
            const month         = date.getMonth()   + 1;
            const day           = date.getDate()    + 1;
            const year_month    = `${year}-${month}`;
            
            createNodeField({ node, name: "year",       value: year });
            createNodeField({ node, name: "month",      value: month });
            createNodeField({ node, name: "day",        value: day });
            createNodeField({ node, name: "year-month", value: year_month });
        }
    }

    // Create `summary` field if MDX contains `Summary` component
    // Must wrap in try catch due to use of deliberate "errors" to stop compilation early.
    try {
        const fileNode = getNode(node.parent);
        const summary = await mdx(fileNode.internal.content, extractOptions);

        createNodeField({
            node,
            name: 'summary',
            value: transform(summary)
        });
    }
    catch (error) { }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
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
        component:  path.resolve('./src/templates/mdx.tsx'),
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