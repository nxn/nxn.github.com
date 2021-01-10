import React from "react";
import { PageProps, graphql } from "gatsby";

import styled from "@emotion/styled";

import { Mdx } from "../components/mdx";
import { Layout } from "../components/layout";
import { LinkButton } from "../components/controls/button";
import { ChevronIcon } from "../components/graphics/icons";
import { PageHeading, SectionHeading, ThematicBreak as Divider } from "../components/common";

type SummaryData = {
    id:         string,
    slug:       string,
    excerpt:    string,
    fields?:    { summary: string }
    frontmatter: {
        title:  string,
        date:   string
    }
}

type PostPageData = {
    allFile: {
        nodes: {
            childMdx: SummaryData
        }[]
    }
}

export function PostsPage(props: PageProps<PostPageData>) {
    const data = props.data.allFile.nodes;

    
    return (
        <Layout>
            <Content>
                <PageHeading>Many Ramblings:</PageHeading>

                { data.map(({ childMdx: post }) => (
                    <PostSummary key={ post.id }>
                        <SectionHeading>{ post.frontmatter.title }</SectionHeading>

                        { getSummary(post) }

                        <LinkButton to={ `/${ post.slug }` } endIcon={ <ChevronIcon /> }>
                            Continue
                        </LinkButton>
                    </PostSummary>
                ))}

            </Content>
        </Layout>
    );
}

function getSummary(data: SummaryData) {
    if (data.fields && data.fields.summary) {
        return <Mdx>{ data.fields.summary }</Mdx>;
    }

    const excerpt = data.excerpt.replace(data.frontmatter.title, '');
    return <div>{ excerpt }</div>;
}

const Content = styled.div(({theme}) => ({
    
}));

const PostSummary = styled.div(({theme}) => ({

}));

export default PostsPage;

export const query = graphql`
    query {
        allFile(
            filter: {
                sourceInstanceName: {eq: "content"}, 
                relativePath: {regex: "/^posts/i"}, 
                name: {eq: "index"}
            }, 
            sort: {
                fields: [childMdx___frontmatter___date], 
                order: [DESC]
            }
        ) {
            nodes {
                childMdx {
                    id
                    slug
                    excerpt(pruneLength: 320)
                    fields { summary }
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    }
`;