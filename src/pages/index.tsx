import React from "react";
import { PageProps, graphql } from "gatsby";
import { FluidObject, FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Layout, Variant } from "../components/layout";
import { WelcomeBanner } from "../components/banner";
import { Blurb, LatestPostsBlurb, BlurbContainer } from "../components/blurb";

import { getFilename } from "../util";

type BlurbData = {
    id: string,
    body: string,
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
    }
};

type IndexPageData = {
    allFile: {
        nodes: { childMdx: BlurbData }[]
    }
};

export function IndexPage(props: PageProps<IndexPageData>) {
    if (!props.data.allFile.nodes.length) {
        throw new Error("IndexPage: Page query returned no data!");
    }

    const [ { childMdx: head }, ...tail ] = props.data.allFile.nodes;
    head.frontmatter.style = "left-large";

    return (
        <Layout variant={ Variant.Unpadded }>
            <Content>
                <WelcomeBanner id="welcome-banner" />
                <BlurbContainer>
                    { makeBlurb(head) }
                    <LatestPostsBlurb />
                    { tail.map( ({ childMdx: data }) => makeBlurb(data) ) }
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

const makeBlurb = (data: BlurbData) => (
    <Blurb 
        key     = { data.id } 
        title   = { data.frontmatter.title }
        date    = { data.frontmatter.date }
        style   = { data.frontmatter.style }
        image   = {{
            position: data.frontmatter.graphic.position,
            data: data.frontmatter.graphic.sources.map(
                source => ({ ...source.image.childImageSharp.fixed, media: source.media })
            )
        }}>

        <MDXRenderer images={ imageData(data.frontmatter.images) }>
            { data.body }
        </MDXRenderer>
    </Blurb>
);

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

