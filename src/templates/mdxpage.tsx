import React from "react";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout";
import Post from "../components/post";
import { PageToC, SidepanelToC } from "../components/toc";

type PostData = {
    mdx: {
        id: string,
        body: string,
        tableOfContents: any,
        frontmatter: {
            title: string,
            date: string,
            toc?: boolean
        }
    }
}

type PostPageProps = {
    className?: string,
    data: PostData
}
export function PostPageUnstyled(props: PostPageProps) {
    const post = props.data.mdx;
    const toc = post.frontmatter.toc;
    return (
        <Layout>
            <div className={ props.className }>
                <Post id="post">
                    <MDXRenderer 
                        title   = { post.frontmatter.title } 
                        date    = { post.frontmatter.date } 
                        toc     = { toc && <PageToC id="page-toc" data={ post.tableOfContents } /> }>
                        { post.body }
                    </MDXRenderer>
                </Post>
                
                { toc && <SidepanelToC id="side-toc" data={ post.tableOfContents } /> }
            </div>
        </Layout>
    );
}

export const PostPage = styled(PostPageUnstyled)(({ data: { mdx: { frontmatter: { toc }}}, theme: { main: theme }}) => ({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'baseline',
    
    '& #post': {
        overflow: 'hidden'
    },
    '& #side-toc': {
        display: 'none'
    },
    '& #page-toc': {
        display: toc ? 'block' : 'none'
    },

    '@media (min-width: 64rem)': {
        gap: toc ? 'var(--content-margin)' : 0,

        '& #page-toc': {
            display: 'none'
        },

        '& #side-toc': {
            display: toc ? 'block' : 'none'
        }
    }
}));

export default PostPage;

export const query = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            id
            body
            tableOfContents
            frontmatter {
                title
                date
                toc
            }
        }
    }
`;