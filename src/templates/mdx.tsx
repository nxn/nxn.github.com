import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

type MDXData = {
    mdx: {
        id:     string,
        body:   string,
        frontmatter: {
            title:  string,
        }
    }
}

type MDXPageProps = {
    className?: string,
    data:       MDXData
}

export function MDXPage(props: MDXPageProps) {
    const { data: { mdx } } = props;
    return (
        <MDXRenderer title={ mdx.frontmatter.title }>
            { mdx.body }
        </MDXRenderer>
    );
}

export default MDXPage;

export const query = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            id
            body
            frontmatter {
                title
            }
        }
    }
`;