import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

type MDXData = {
    site: {
        siteMetadata: {
            title: string,
            author: string,
            description: string
        }
    }
    mdx: {
        id:     string,
        body:   string,
        frontmatter: {
            title?:  string,
        },
        fields: {
            summaryText?: string
        }
    }
}

type MDXPageProps = {
    className?: string,
    data:       MDXData
}

// Note about Helmet and MDX provided Layouts: If the MDX component that is being rendered here exports its own layout,
// that layout's Helmet component will take precedence over this one. This is due to the fact the Layout will be nested
// within the `MDXPage` and is therefore more specific than the one defined here. This behavior is opposite that of the
// other templates as they explicitly provide a layout as their root child.
export function MDXPage(props: MDXPageProps) {
    const mdx = props.data.mdx;
    const meta = props.data.site.siteMetadata;

    const title = mdx.frontmatter.title 
        ? `${ mdx.frontmatter.title } · ${ meta.title }`
        : meta.title;

    const description = mdx.fields.summaryText 
        ? mdx.fields.summaryText 
        : meta.description;
    
    return (
        <React.Fragment>
            <Helmet>
                <title>{ title }</title>
                <meta name="description" content={ description } />
                <meta name="author" content={ meta.author } />
            </Helmet>
        
            <MDXRenderer title={ mdx.frontmatter.title }>
                { mdx.body }
            </MDXRenderer>
        </React.Fragment>
    );
}

export default MDXPage;

export const query = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                title,
                author,
                description
            }
        }
        mdx(slug: { eq: $slug }) {
            id
            body
            frontmatter {
                title
            }
            fields {
                summaryText
            }
        }
    }
`;