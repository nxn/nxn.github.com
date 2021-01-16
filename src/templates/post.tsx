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
        case 'wide':    return theme.typography.lineLength.long;
        case 'narrow':  return theme.typography.lineLength.short;
        default:        return theme.typography.lineLength.regular;
    }
}

export const Content = styled.div<ContentProps>(({theme, toc, width}) => {
    const contentWidth  = parseInt(widthToRem(width, theme) || '40');
    const tocMinWidth   = 16;
    
    /*
        The following hack is necessary due to the following chrome/chromium bug:
            https://bugs.chromium.org/p/chromium/issues/detail?id=915190
            https://bugs.chromium.org/p/chromium/issues/detail?id=843584

        In order to determine whether the sidepanel table of contents should be displayed it is necessary to determine
        if there is enough room for it. The basic formula for doing so looks as follows:

            if (viewportWidth >= contentWidth + tocMinWidth + (3 * contentMargin)): showSideToC()

        The first issue is that the content margin is based on a percentage of the viewport size and is stored as a CSS
        variable rather than a JS value. CSS variables cannot be used within media query declarations, so the formula
        for calculating the margin size has to be inlined into the query.

        That alone would still be relatively OK since all the other values can be pre-calculated in JS -- however, due 
        to the linked 3 year old bug in chrome, media queries that use the css `calc()` function along with viewport 
        relative units (vh and vw) produce incorrect outputs.

        For this to have any chance of working in Chrome, the calculation is not allowed to refer to the viewport size 
        via `vh` or `vw`. The following mess gets around this: */

    // Percentage of free space to use as margin (default 7.5%)
    const additional = theme.spacing.margins.standard.additional || 0.075;

    // Minimum margin size (default 2rem)
    const minHorizontal = theme.spacing.margins.standard.minHorizontal || 2;

    // Calculates margin portion after breakpoint relative to 7.5% of viewport, since there's three margins (left, gap, 
    // and right) this needs to be multiplied by 3
    const margins = (theme.breakPoints.standard * additional - minHorizontal) * 3;

    // Converts values and margin portion to be relative to actual viewport width value. `additional` is based on margin
    // proportion so needs to be multiplied by 3 and converted to percent value.
    const sidepanelMinWidth = 100 / (100 - additional * 300) * (contentWidth + tocMinWidth - margins);

    return {
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
        [`@media (min-width: ${ sidepanelMinWidth }rem)`]: toc && {
            gridTemplateColumns: 'max-content auto',
            '& #page-toc': { display: 'none' },
            '& #side-toc': { display: 'initial' }
        }
    }
});

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