import React from "react";
import { PageProps, graphql } from "gatsby";
import styled from "@emotion/styled";

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

export function IndexPageUnstyled(props: IndexPageProps & PageProps<IndexPageData>) {
    return (
        <Layout>
            <div className={ props.className }>
                <WelcomeBanner />
                { props.data.allMarkdownRemark.edges.map(({ node }, index) => (
                    <Blurb 
                        key     = { node.id } 
                        title   = { node.frontmatter.title } 
                        image   = { null } 
                        summary = { node.frontmatter.desc } 
                        slug    = { node.fields.slug } 
                        alt     = { !(index % 2) } />
                )) }
            </div>
        </Layout> 
    );
}

export const IndexPage = styled(IndexPageUnstyled)(({theme: { main: theme }}) => ({
    padding: '2rem',
    '@media (min-width: 41.5rem)': {
        padding: '2rem var(--content-margin)',
    },
}));

export default IndexPage;

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

