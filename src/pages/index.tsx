import React from "react";
import { PageProps, graphql } from "gatsby";
import { FluidObject, FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Layout, Variant } from "../components/layout";
import { WelcomeBanner } from "../components/banner";
import { Blurb, LatestPostsBlurb, BlurbContainer } from "../components/blurb";

import { getFilename } from "../util";

type IndexPageData = {
    allFile: {
        nodes: {
            childMdx: {
                id: string,
                frontmatter: {
                    title:      string,
                    date:       string,
                    priority:   number,
                    style?:     string,
                    graphic: {
                        sources: {
                            image: {
                                childImageSharp: {
                                    fixed: FixedObject
                                }
                            }
                            media?: string
                        }[],
                        position?: string
                    },
                    images?: {
                        childImageSharp: {
                            fluid: FluidObject
                        }
                    }[]
                },
                body: string
            }
        }[]
    }
};

function imageData(embedded?: { childImageSharp: { fluid: FluidObject; } }[]) {
    if (!embedded) { return undefined; }

    let result: { [key: string]: FluidObject } = { };

    embedded.forEach(({ childImageSharp: { fluid: data }}) => { 
        const filename = getFilename(data.src);
        if (filename) {
            result[filename] = data;
        }
    });

    return result;
}

export function IndexPage(props: PageProps<IndexPageData>) {
    if (!props.data.allFile.nodes.length) {
        throw new Error("IndexPage: Page query returned no data!");
    }

    const [ { childMdx: head }, ...tail ] = props.data.allFile.nodes;

    return (
        <Layout variant={ Variant.Unpadded }>
            <Content>
                <WelcomeBanner id="welcome-banner" />
                <BlurbContainer>
                    <Blurb
                        key     = { head.id }
                        title   = { head.frontmatter.title }
                        date    = { head.frontmatter.date }
                        style   = "left-large"
                        image   = {{
                            position: head.frontmatter.graphic.position,
                            data: head.frontmatter.graphic.sources.map(
                                source => ({ ...source.image.childImageSharp.fixed, media: source.media })
                            )
                        }}>

                        <MDXRenderer images={ imageData(head.frontmatter.images) }>
                            { head.body }
                        </MDXRenderer>
                    </Blurb>
                    
                    <LatestPostsBlurb />

                    { tail.map(({ childMdx: blurb }) => (
                        <Blurb 
                            key     = { blurb.id } 
                            title   = { blurb.frontmatter.title }
                            date    = { blurb.frontmatter.date }
                            style   = { blurb.frontmatter.style }
                            image   = {{
                                position: blurb.frontmatter.graphic.position,
                                data: blurb.frontmatter.graphic.sources.map(
                                    source => ({ ...source.image.childImageSharp.fixed, media: source.media })
                                )
                            }}>

                            <MDXRenderer images={ imageData(blurb.frontmatter.images) }>
                                { blurb.body }
                            </MDXRenderer>
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
            filter: { 
                sourceInstanceName: { eq: "content" }, 
                relativePath: { regex: "/^blurbs/i" }, 
                name: { eq: "index" }
            }, 
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
                    body
                    frontmatter {
                        title
                        date
                        priority
                        style
                        graphic {
                            position
                            sources {
                                media
                                image {
                                    childImageSharp {
                                        fixed(height: 192, quality: 90) {
                                            ...GatsbyImageSharpFixed_withWebp
                                        }
                                    }
                                }
                            }
                        }
                        images {
                            childImageSharp {
                                fluid(maxWidth: 528, quality: 90) {
                                    ...GatsbyImageSharpFluid_withWebp
                                    ...GatsbyImageSharpFluidLimitPresentationSize
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

