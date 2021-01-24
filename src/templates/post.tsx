import React from "react";
import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout";
import { PageToC, SideToC } from "../components/toc";
import { Helmet } from "react-helmet";

type PostData = {
    site: {
        siteMetadata: {
            title: string
        }
    }
    mdx: {
        id:                 string,
        body:               string,
        tableOfContents:    any,
        frontmatter: {
            title?: string,
            style?: string,
            date?:  string,
            toc?:   boolean
        },
        fields: {
            summaryText?: string
        }
    }
}

type PostPageProps = {
    className?: string,
    data:       PostData
}

export function PostPage(props: PostPageProps) {
    const post = props.data.mdx;
    const meta = props.data.site.siteMetadata;
    const toc  = post.frontmatter.toc;

    const styles = (post.frontmatter.style || "").split(' ');
    const width = styles.find(v => v === 'wide' || v === 'narrow') || 'regular';
    return (
        <Layout>
            <Helmet>
                { post.frontmatter.title &&
                    <title>{ post.frontmatter.title } · { meta.title }</title>
                }
                { post.fields.summaryText &&
                    <meta name="description" content={ post.fields.summaryText } />
                }
            </Helmet>
            <Content toc={ !!toc } width={ width }>
                <Post className={ post.frontmatter.style }>
                    <MDXRenderer 
                        title   = { post.frontmatter.title } 
                        date    = { post.frontmatter.date } 
                        toc     = { toc && <PageToC id="page-toc" data={ post.tableOfContents } /> }>
                        { post.body }
                    </MDXRenderer>
                </Post>
                
                { toc && <SideToC id="side-toc" data={ post.tableOfContents } highlight /> }
            </Content>
        </Layout>
    );
}

type ContentProps = {
    toc: boolean, 
    width: string,
}

const widthToRem = (width: string, theme: Theme) => {
    switch (width) {
        case 'wide':    return parseInt(theme.typography.lineLength.long    || '48');
        case 'narrow':  return parseInt(theme.typography.lineLength.short   || '32');
        default:        return parseInt(theme.typography.lineLength.regular || '40');
    }
}

export const Content = styled.div<ContentProps>(({theme, toc, width}) => ({
    display:                'grid',
    gridTemplateColumns:    'auto',
    alignItems:             'self-start',
    justifyContent:         'center',
    gap:                    theme.spacing.margins.horizontal,
    
    '& #page-toc': {
        display: toc ? 'block' : 'none'
    },
    '& #side-toc': {
        display: 'none'
    },

    // Hides the on-page table of contents and shows the sidepanel version if there is enough space for it. If the
    // table of contents is turned off off this media query equates to false.
    [`@media (min-width: ${ widthToRem(width, theme) * 1.66 }rem)`]: toc && {
        gridTemplateColumns: 'max-content auto',
        '& #page-toc': { display: 'none' },
        '& #side-toc': { display: 'initial' }
    }
}));

const Post = styled.div(({theme}) => ({
    overflow: 'hidden',
    maxWidth: theme.typography.lineLength.regular,
    minWidth: '18rem',

    '&.centered-title': {
        '& h1': { textAlign: 'center' }
    },

    '&.narrow': { maxWidth: theme.typography.lineLength.short },
    '&.wide':   { maxWidth: theme.typography.lineLength.long }
}));

export default PostPage;

export const query = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        mdx(slug: { eq: $slug }) {
            id
            body
            tableOfContents
            frontmatter {
                title
                date
                style
                toc
            }
            fields {
                summaryText
            }
        }
    }
`;