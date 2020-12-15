import React from "react";
import { PageProps, graphql } from "gatsby";

import { WelcomeBanner } from "../components/banner";
import Layout from "../components/layouts/nxn.io/layout";

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
            { props.data.allMarkdownRemark.edges.map(({ node }) => (
                <article key={ node.id }>
                    <header>
                        <h2>{ node.frontmatter.title }</h2>
                    </header>
                    <div className="description">
                        { node.frontmatter.desc }
                    </div>
                    <a href={ node.fields.slug }>Read more...</a>
                </article>
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

