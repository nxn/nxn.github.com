const path              = require('path');
const {createCompiler}  = require('@mdx-js/mdx');
const toHtml            = require('hast-util-to-html');

const extractSummary = () => (tree, file) => {
    const start = tree.children.findIndex(node => node.type === 'jsx' && node.value === '<Summary>');
    const end   = tree.children.findIndex(node => node.type === 'jsx' && node.value === '</Summary>');

    if (start < 0 || end < 0) { return; }

    file.data.summary = toHtml(tree.children.slice(start + 1, end));
}

const mdxCompiler = createCompiler({
    rehypePlugins: [ extractSummary ]
});

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type !== 'Mdx') {
        return;
    }

    const file = await mdxCompiler.process(
        getNode(node.parent).internal.content
    );

    if (!file.data.summary) {
        return;
    }

    createNodeField({
        node,
        name: 'summary',
        value: file.data.summary
    });
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