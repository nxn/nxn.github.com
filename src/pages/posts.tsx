import React from "react";
import Helmet from "react-helmet";
import { PageProps, graphql } from "gatsby";

import styled from "@emotion/styled";

import { Mdx } from "../components/mdx";
import { Layout, Variant } from "../components/layout";
import { LinkHeader } from "../components/linkheader";
import { Anchor, Paragraph } from "../components/common";
import { ChevronIcon } from "../components/graphics/icons";
import { 
    Timeline, 
    TimelineHeading, 
    TimelineItem, 
    TimelineDate, 
    TimelineEntry
} from "../components/timeline"

import { getOrdinalIndicator } from "../util";

const months: { [ key: number ]: string } = {
    1:  'January',
    2:  'February',
    3:  'March',
    4:  'April',
    5:  'May',
    6:  'June',
    7:  'July',
    8:  'August',
    9:  'September',
    10: 'October',
    11: 'November',
    12: 'December'
};

type PostData = {
    id:         string,
    slug:       string,
    excerpt:    string,
    fields:     { 
        day:            number,
        month:          number,
        year:           number,
        summaryMdx?:    string,
        summaryText?:   string
    }
    frontmatter: {
        title:  string
    }
}

type PostPageData = {
    site: {
        siteMetadata: {
            title: string
        }
    },
    allFile: {
        group: {
            fieldValue: "string",
            totalCount: number,
            nodes: {
                childMdx: PostData
            }[]
        }[]
    }
}

export function PostsPage(props: PageProps<PostPageData>) {
    const meta = props.data.site.siteMetadata;
    const data = [ ...props.data.allFile.group ].reverse();

    return (
        <Layout>
            <Helmet>
                <title>Ernie Wieczorek: Post History · { meta.title }</title>
            </Helmet>
            <Content>
                <Timeline>{ data.map(year => (
                    <React.Fragment key={ year.fieldValue }>
                        <TimelineHeading>{ year.fieldValue }</TimelineHeading>

                        { year.nodes.map(({ childMdx: post }, index) => (
                        <React.Fragment key={ post.id }>
                            <TimelineItem className={ index % 2 ? 'right' : 'left' }>
                                <TimelineDate>{ getPostDate(post) }</TimelineDate>

                                <TimelineEntry>
                                    <LinkHeader component="h2" to={ `/${ post.slug }` } endIcon={ <ChevronIcon /> }>
                                        { post.frontmatter.title }
                                    </LinkHeader>
                                    <PostSummary>
                                        { getPostSummary(post) }
                                    </PostSummary>
                                    <Anchor to={`/${ post.slug }` }>
                                        Read more ...
                                    </Anchor>
                                </TimelineEntry>
                            </TimelineItem>
                            
                            {
                                // Offsets TimelineItems in the right column so that they're one row lower than the left
                                // column
                                !index && <div /> 
                            }
                        </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}</Timeline>
            </Content>
        </Layout>
    );
}

const Content = styled.div(({theme}) => ({
}));

const PostSummary = styled.div({ margin: '1rem 0' });

function getPostDate(data: PostData) {
    return `${ months[data.fields.month] } ${ data.fields.day + getOrdinalIndicator(data.fields.day) }`;
}

function getPostSummary(data: PostData) {
    if (data.fields) {
        if (data.fields.summaryMdx) {
            return <Mdx>{ data.fields.summaryMdx }</Mdx>;
        }
    
        if (data.fields.summaryText) {
            return <Paragraph>{ data.fields.summaryMdx }</Paragraph>;
        }
    }

    // If there are no summary fields, use the excerpt instead. The excerpt will contain the page's <h1> content, which
    // will most likely be the title text. Attempt to trim out the title for these cases since it is already being
    // shown. 
    const excerpt = data.excerpt.replace(data.frontmatter.title, '');
    return <Paragraph>{ excerpt }</Paragraph>;
}

export default PostsPage;

export const query = graphql`query {
    site {
        siteMetadata {
            title
        }
    }
    allFile(
        filter: {sourceInstanceName: {eq: "content"}, 
            relativePath: {regex: "/^posts/i"}, 
            name: {eq: "index"}}
        sort: {
            fields: [childMdx___frontmatter___date]
            order: [DESC]
        }
    ) {
        group(field: childrenMdx___fields___year) {
            fieldValue
            totalCount
            nodes {
                childMdx {
                    id
                    slug
                    excerpt(pruneLength: 320)
                    fields {
                        day
                        month
                        year
                        summaryMdx
                        summaryText
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
}`;