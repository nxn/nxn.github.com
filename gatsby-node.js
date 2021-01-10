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
    const start = tree.children.findIndex(node => node.type === 'jsx' && node.value === '<Summary>');
    const end   = tree.children.findIndex(node => node.type === 'jsx' && node.value === '</Summary>');

    if (start < 0 || end < 0) {
        // Can't seem to find any other way to abort compiling if there is no summary
        return Error("No Summary");
    }

    // Removes everything except the contents/children of Summary. Probably not the correct way of doing this.
    tree.children = tree.children.slice(start + 1, end);
}

const options = {
    remarkPlugins: [ extractSummary ],
    skipExport: true
};

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type !== 'Mdx') {
        return;
    }

    try {
        const fileNode = getNode(node.parent);
        const jsx = await mdx(fileNode.internal.content, options);

        createNodeField({
            node,
            name: 'summary',
            value: transform(jsx)
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