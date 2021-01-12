import React from "react";
import { PageProps, graphql } from "gatsby";

import styled from "@emotion/styled";

import { Mdx } from "../components/mdx";
import { Layout, Variant } from "../components/layout";
import { Link } from "../components/controls";
import { Anchor, Paragraph } from "../components/common";
import { ChevronIcon } from "../components/graphics/icons";

import { getOrdinalIndicator } from "../util";

const timelineColor         = '#18252d';
const timelineDotColor      = '#7a9388';
const timelineDotRadius     = 0.75;
const timelineDotRadiusRem  = `${ timelineDotRadius }rem`;

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
                        <TimelineYear>{ year.fieldValue }</TimelineYear>

                        { year.nodes.map(({ childMdx: post }, index) => (
                        <React.Fragment key={ post.id }>
                            <TimelineItem className={ index % 2 ? 'right' : 'left' }>
                                <TimelineDate>{ getPostDate(post) }</TimelineDate>

                                <TimelineEntry>
                                    <LinkHeader to={ `/${ post.slug }` }>
                                        
                                        <Heading>{ post.frontmatter.title }</Heading>
                                        <ChevronIcon />
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

function TimelineDate(props: { children?: React.ReactNode }) {
    return (
        <TimelineDateContainer>
            <TimelineDateLine />
            <TimelineDateDot />
            <TimelineDateItem>
                { props.children }
            </TimelineDateItem>
        </TimelineDateContainer>
    );
}

const Content = styled.div({
    //padding: '1rem 0',
    '@media (min-width: 41.5rem)': {
        padding:  '3rem 0',
    }
});

const Timeline = styled.div({
    display:        'grid',
    alignItems:     'center',
    paddingBottom:  '1rem',

    '@media (min-width: 41.5rem)': {
        gridTemplateColumns: '1fr 1fr',

        backgroundImage: `linear-gradient(
            to bottom,
            ${ timelineColor } 0,
            ${ timelineColor } calc(100% - 16rem),
            transparent 100%
        )`,
        backgroundSize:     '0.5rem 100%',
        backgroundPosition: 'top center',
        backgroundRepeat:   'no-repeat',
    }
});

const TimelineYear = styled.div(({theme}) => ({
    gridColumn:         '1 / -1',
    marginBottom:       '4.5rem',
    marginTop:          '3rem',

    justifySelf:        'center',
    fontFamily:         theme.typography.sans.fontFamily,
    fontSize:           '2rem',
    color:              theme.palette.actions.secondary.light,
    
    padding:            '0.75rem 3rem',
    borderRadius:       '0.5rem',

    '@media (min-width: 41.5rem)': {
        backgroundColor:    timelineColor,
        marginBottom:       '3rem',
        marginTop:          '0rem',
    }
}));

const TimelineItem = styled.div(({theme}) => ({
    minWidth:   0,
    position:   'relative',

    // Following is specific to the mobile version of the timeline
    padding:        '2.5rem 0',
    margin:         '0 1rem',
    marginTop:      '-0.5rem',
    border:         '0.5rem solid transparent',
    borderRadius:   '2rem',
    boxSizing:      'border-box',

    '&.left': {
        paddingRight:   '1rem',
        background:     bgImageHalfFilledBorder('right', theme.palette.bgs.primary.dim, timelineColor)
    },
    '&.right': {
        paddingLeft:    '1rem',
        background:     bgImageHalfFilledBorder('left', theme.palette.bgs.primary.dim, timelineColor)
    },
    // end mobile

    '@media (min-width: 41.5rem)': {
        gridRow: 'span 2',

        // undo mobile
        margin: 0,
        border: 0,
        borderRadius: 0,
        '&.left, &.right': {
            background: 'none',
            padding: 0
        }
    }
}));

const TimelineEntry = styled.article({
    padding: '0 var(--content-margin)',

    '@media (min-width: 41.5rem)': {
        margin: '2rem 0'
    }
});

const TimelineDateContainer = styled.div({
    textAlign: 'center',

    // Following is specific to the mobile version of the timeline
    position:   'absolute',
    top:        '-0.25rem',
    left:       0,
    right:      0,
    transform: 'translateY(-50%)',
    // end mobile

    '@media (min-width: 41.5rem)': {
        position: 'relative',

        // undo mobile
        top: 0,
        transform: 'none'
    }
});

const TimelineDateDot = styled.div(({theme}) => ({
    '@media (min-width: 41.5rem)': {
        width:      `${ timelineDotRadius * 2 }rem`,
        position:   'absolute',
        top:        0,
        bottom:     0,

        '.left &': {
            right:  `-${ timelineDotRadiusRem }`
        },

        '.right &': {
            left:   `-${ timelineDotRadiusRem }`,
        },

        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center',
        backgroundImage:    bgImageCircle(
            timelineDotRadius,
            theme.palette.bgs.primary.dim,
            timelineDotColor,
            timelineDotRadiusRem
        ),
    }
}));

const TimelineDateLine = styled.div({
    '@media (min-width: 41.5rem)': {
        position:   'absolute',
        top:        0,
        bottom:     0,

        '.left &': {
            left:   '50%',
            right:  0
        },

        '.right &': {
            left:   0,
            right:  '50%'
        },

        backgroundRepeat:   'repeat-x',
        backgroundSize:     '1rem 0.5rem',
        backgroundPosition: 'center',
        backgroundImage:    bgImageCircle(
            0.25,
            timelineColor,
            timelineColor,
            '0.25rem 0.25rem'
        ),
    }
});

const TimelineDateItem = styled.div(({theme}) => ({
    display:    'inline-block',
    boxSizing:  'border-box',
    position:   'relative',

    fontSize:           '1.25rem',
    fontFamily:         theme.typography.sans.fontFamily,
    color:              theme.palette.actions.secondary.main,
    backgroundColor:    theme.palette.bgs.secondary.main,
    padding:            '0.5rem 2rem',
    border:             `0.25rem solid ${ timelineColor }`,
    borderRadius:       '0.5rem'
}));

const LinkHeader = styled(Link)(({theme}) => ({
    ...theme.styles.text.anchor,

    display:    'flex',
    width:      'min-content',
    maxWidth:   '100%',
    flexFlow:   'row nowrap',
    alignItems: 'flex-start',

    fontSize:   '1.5rem',
    fontFamily: theme.typography.slab.fontFamily,
    height:     '2.5rem',
    lineHeight: '2.5rem',
    //marginTop:  '2rem',

    '& > .icon': {
        width:              '2.5rem',
        height:             '2.5rem',
        padding:            '0.5rem',
        boxSizing:          'border-box',
        borderRadius:       '1.25rem',
        color:              theme.palette.actions.primary.main,
        backgroundColor:    theme.palette.bgs.primary.main,
        
    },

    '&:hover > .icon': {
        color:              theme.palette.actions.primary.light,
        backgroundColor:    theme.palette.bgs.primary.light
    },

    '&:hover': {
        color: theme.palette.actions.primary.main,
    }
}));

const Heading = styled.h2({
    whiteSpace:     'nowrap',
    overflow:       'hidden',
    textOverflow:   'ellipsis',
    boxSizing:      'border-box',
    marginRight:    '1rem',
});

const PostSummary = styled.div({
    margin:     '1rem 0'
});

function bgImageCircle(size: number, fillColor = 'currentcolor', strokeColor = 'currentcolor', position = 'center') {
    return `radial-gradient(
        circle at ${ position }, 
        ${ fillColor }      0, 
        ${ fillColor }      ${ size/2.0 - 0.0625 }rem,
        ${ strokeColor }    ${ size/2.0 }rem,
        ${ strokeColor }    ${ size - 0.0625 }rem,
        transparent         ${ size }rem
    )`;
}

function bgImageHalfFilledBorder(side: 'left' | 'right', fillColor = 'currentcolor', strokeColor = 'currentcolor') {
    return `linear-gradient(
        ${ fillColor },
        ${ fillColor }
    ) padding-box,
    linear-gradient(
        to ${ side },
        transparent,
        transparent 2rem,
        ${ strokeColor } 50%,
        ${ strokeColor } 50%,
        ${ strokeColor } 100%
    ) border-box`;
}

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