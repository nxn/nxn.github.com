import React from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/layouts/nxn.io/layout";
import { WelcomeBanner } from "../components/banner";
import Blurb from "../components/blurb";


type IndexPageProps = {
    className?: string
};

type IndexPageData = {
    allMarkdownRemark: {
        edges: {
            node: {
                id: string,
                frontmatter: {
                    title: string,
                    date: string,
                    desc: string
                },
                fields: {
                    slug: string
                }
            }
        }[]
    }
};

export default function IndexPage(props: IndexPageProps & PageProps<IndexPageData>) {
    return (
        <Layout banner={ <WelcomeBanner /> }>
            { props.data.allMarkdownRemark.edges.map(({ node }, index) => (
                <Blurb 
                    key     = { node.id } 
                    title   = { node.frontmatter.title } 
                    image   = { null } 
                    summary = { node.frontmatter.desc } 
                    slug    = { node.fields.slug } 
                    alt     = { !(index % 2) } />
            )) }
        </Layout> 
    );
}

export const query = graphql`
    query MyQuery {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    id
                    frontmatter {
                        date
                        title
                        desc
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

