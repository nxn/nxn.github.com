import React from "react";
import { PageProps, graphql } from "gatsby";
import styled from "@emotion/styled";
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Layout, Variant } from "../components/layout";
import { WelcomeBanner } from "../components/banner";
import { Blurb, RecentPostsBlurb, BlurbContainer } from "../components/blurb";

type IndexPageData = {
    allFile: {
        nodes: {
            childMdx: {
                id: string,
                frontmatter: {
                    title:      string,
                    date:       string,
                    priority:   number,
                    style?:     string
                },
                body: string
            }
        }[]
    }
};

export function IndexPage(props: PageProps<IndexPageData>) {
    const head = props.data.allFile.nodes.slice(0,1).pop()?.childMdx;
    const tail = props.data.allFile.nodes.slice(1);
    return (
        <Layout variant={ Variant.Unpadded }>
            <Content>
                <WelcomeBanner id="welcome-banner" />
                <BlurbContainer>
                    <Blurb
                        key = { head?.id }
                        title = { head?.frontmatter.title || "" }
                        date = { head?.frontmatter.date || "" }
                        style = "left-large">

                        <MDXRenderer>{ head.body }</MDXRenderer>
                    </Blurb>
                    
                    <RecentPostsBlurb />

                    { tail.map(({ childMdx: mdx }) => (
                        <Blurb 
                            key     = { mdx.id } 
                            title   = { mdx.frontmatter.title }
                            date    = { mdx.frontmatter.date }
                            style   = { mdx.frontmatter.style }>

                            <MDXRenderer>{ mdx.body }</MDXRenderer>
                        </Blurb>
                    )) }
                </BlurbContainer>
            </Content>
        </Layout> 
    );
}

const Content = styled.div({
    padding: '1rem',
    '& #welcome-banner': {
        padding: '0rem 1rem'
    },
    '@media (min-width: 41.5rem)': {
        padding: '1rem var(--content-margin)',
        paddingBottom: 'min(5rem, var(--content-margin))', 
        '& #welcome-banner': { padding: 0 }
    },
});

export default IndexPage;

export const query = graphql`
    query {
        allFile(
            filter: {sourceInstanceName: {eq: "content"}, relativeDirectory: {eq: "blurbs"}}, 
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
                        style
                    }
                    body
                }
            }
        }
    }
`;

