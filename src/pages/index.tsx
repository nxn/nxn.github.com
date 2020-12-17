import React from "react";
import { PageProps, graphql } from "gatsby";
import styled from "@emotion/styled";
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Layout, Variant } from "../components/layout";
import { WelcomeBanner } from "../components/banner";
import Blurb from "../components/blurb";


type IndexPageProps = {
    className?: string
};

type IndexPageData = {
    allFile: {
        nodes: {
            childMdx: {
                id: string,
                frontmatter: {
                    title: string,
                    date: string,
                    priority: number
                },
                body: string
            }
        }[]
    }
};

export function IndexPageUnstyled(props: IndexPageProps & PageProps<IndexPageData>) {
    return (
        <Layout variant={ Variant.Unpadded }>
            <div className={ props.className }>
                <WelcomeBanner id="welcome-banner" />
                { props.data.allFile.nodes.map(({ childMdx: mdx }) => (
                    <Blurb 
                        key     = { mdx.id } 
                        title   = { mdx.frontmatter.title }
                        date    = { mdx.frontmatter.date }>

                        <MDXRenderer>{ mdx.body }</MDXRenderer>
                    </Blurb>
                )) }
            </div>
        </Layout> 
    );
}

export const IndexPage = styled(IndexPageUnstyled)(({theme: { main: theme }}) => ({
    padding: '1rem',
    '& #welcome-banner': {
        padding: '0rem 1rem'
    },
    '@media (min-width: 41.5rem)': {
        padding: '1rem var(--content-margin)',
        '& #welcome-banner': { padding: 0 }
    },
}));

export default IndexPage;

export const query = graphql`
    query {
        allFile(
            filter: {sourceInstanceName: {eq: "data"}, relativeDirectory: {eq: "blurbs"}}, 
            sort: {
                fields: [
                    childMdx___frontmatter___priority, 
                    childMdx___frontmatter___date
                ],
                order: [DESC, DESC]
            }
        ) {
            nodes {
                childMdx {
                    id
                    frontmatter {
                        title
                        date
                        priority
                    }
                    body
                }
            }
        }
    }
`;

