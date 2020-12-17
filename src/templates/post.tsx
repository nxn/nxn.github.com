import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout";

type PostData = {
    data: {
        mdx: {
            id: string,
            body: string,
            tableOfContents: any,
            frontmatter: {
                title: string,
                date: string
            }
        }
    }
}
export default function({ data: { mdx: data } }: PostData) {
    return (
        <Layout>
            <MDXRenderer 
                title   = { data.frontmatter.title } 
                date    = { data.frontmatter.date } 
                toc     = { data.tableOfContents }>
                { data.body }
            </MDXRenderer>
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            id
            body
            tableOfContents
            frontmatter {
                title
                date
            }
        }
    }
`;