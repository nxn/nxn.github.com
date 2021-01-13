import React from "react";
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
        day:        number,
        month:      number,
        year:       number,
        summary:    string 
    }
    frontmatter: {
        title:  string
    }
}

type PostPageData = {
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
    const data = [ ...props.data.allFile.group ].reverse();

    return (
        <Layout variant={ Variant.Unpadded }>
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

const Content = styled.div({
    //padding: '1rem 0',
    '@media (min-width: 41.5rem)': {
        padding:  '3rem 0',
    }
});

const PostSummary = styled.div({ margin: '1rem 0' });

function getPostDate(data: PostData) {
    return `${ months[data.fields.month] } ${ data.fields.day + getOrdinalIndicator(data.fields.day) }`;
}

function getPostSummary(data: PostData) {
    if (data.fields && data.fields.summary) {
        return <Mdx>{ data.fields.summary }</Mdx>;
    }

    const excerpt = data.excerpt.replace(data.frontmatter.title, '');
    return <Paragraph>{ excerpt }</Paragraph>;
}

export default PostsPage;

export const query = graphql`
query {
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
                        summary
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
}
`;