import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import clsx from "clsx";

import { Link, LinkButton } from "../components/controls";
import { ChevronIcon } from "../components/graphics/icons";

type PostData = {
    allFile: {
        nodes: {
            childMdx: {
                id: "string",
                slug: "string",
                frontmatter: {
                    title: string,
                    date: string
                }
            }
        }[]
    }
};

type BlurbProps = {
    className?:     string,
    title:          string,
    date:           string,
    style?:         string,
    children?:      React.ReactNode
};

export function Blurb(props: BlurbProps) {
    return (
        <Article className={ clsx(props.className, props.style) }>
            <Header>
                <Heading>{ props.title }</Heading>
            </Header>
            <Description>
                { props.children }
            </Description>
        </Article>
    );
}

export function LatestPostsBlurb({ className, style }: { className?: string, style?: string }) {
    const { allFile: { nodes: posts }}: PostData = useStaticQuery(graphql`query {
        allFile(
            filter: {sourceInstanceName: {eq: "content"}, relativeDirectory: {eq: "posts"}}, 
            sort: {
                fields: [
                    childMdx___frontmatter___date
                ],
                order: [DESC, DESC]
            },
            limit: 5
        ) {
            nodes {
                childMdx {
                    id
                    slug
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    }`);
    
    return (
        <PostList className={ clsx(className, style) }>
            <Header>
                <Heading>Latest Posts</Heading>
                <FoldedCorner />
            </Header>
            <List>
                { posts.map(({ childMdx: post }) => (
                    <ListItem key={ post.id }>
                        <PostLink to={ `/${ post.slug }` }>
                            { post.frontmatter.title }
                        </PostLink>
                    </ListItem>
                ))}
            </List>
            <Actions>
                <ViewMore to="/posts" color="primary">More <ChevronIcon /></ViewMore>
            </Actions>
        </PostList>
    );
}

const ViewMore = styled(LinkButton)({
    border: `0.0625rem solid rgba(255,255,255,0.1)`,
    // TODO: Yeesh, pass icon is as either a `startIcon` or `endIcon` which determines which margins to use
    '& > svg.icon': {
        marginLeft: '0.25rem',
        marginRight: '-0.75rem'
    }
});

const Actions = styled.div(() => ({
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
}));

const List = styled.ul(() => ({
    padding: '0 0.5rem'
}));

const ListItem = styled.li(() => ({
    padding: '0.5rem 0',
    borderBottom: '0.0625rem solid rgba(255,255,255,0.1)'
}));

const PostLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.actions.primary.main,
    display: 'block',
    borderRadius: '0.25rem',
    padding: '0.25rem 0.5rem',

    //textTransform: 'uppercase',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    
    '&:hover': {
        color: theme.palette.actions.primary.light,
        backgroundColor: theme.palette.bgs.primary.light
    }
}));

const Header = styled.header(() => ({
    minHeight:  '12rem',
    position:   'relative',
    overflow:   'hidden',
    background: 'rgba(0,0,0,0.25)'
}));

const Heading = styled.h2(({theme}) => ({
    fontFamily:         '"Oswald", sans-serif',
    fontSize:           '1.2rem',
    color:              theme.palette.accents.blue,
    padding:            '0.5rem 1rem',
    width:              'calc(100% - 2rem)',
    position:           'absolute',
    top:                0,
    left:               0,
    backgroundColor:    theme.palette.bgs.standard.dark,
    opacity:            '0.9',
    whiteSpace:         'nowrap',
    overflow:           'hidden',
    textOverflow:       'ellipsis'
}));

const Description = styled.div(() => ({
    margin: '1rem'
}))

const Article = styled.article(({theme}) => ({
    //border:             `0.0625rem solid ${ theme.palette.bgs.standard.light }`,
    color:              theme.palette.text.standard.light,
    backgroundColor:    theme.palette.bgs.standard.main,
    borderRadius:       '0.25rem',
    overflow:           'hidden',
    '&:nth-of-type(even)': {
        color:              theme.palette.text.standard.main,
        backgroundColor:    theme.palette.bgs.standard.dark
    }
}));

const PostList = styled.div(({theme}) => ({
    color:              theme.palette.text.standard.light,
    backgroundColor:    theme.palette.bgs.primary.main,
    position:           'relative',
    borderRadius:       '0.25rem',
    overflow:           'hidden',
    paddingBottom:      '4.5rem',
    clipPath:           'polygon(0 0, calc(100% - 5.5rem) 0, 100% 5.5rem, 100% 100%, 0 100%)'
}));

const FoldedCorner = styled.div(({theme}) => ({
    position:               'absolute',
    top:                    0,
    right:                  0,
    width:                  '5.5rem',
    height:                 '5.5rem',
    backgroundColor:        theme.palette.bgs.primary.light,
    borderBottomLeftRadius: '1rem',

    boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.3), -0.0625rem 0.0625rem 0.0625rem rgba(0,0,0,0.1)'
}));

export const BlurbContainer = styled.div({
    display:                'grid',
    gridTemplateColumns:    '1fr',
    gridAutoFlow:           'dense',
    gap:                    '1rem',

    borderRadius:           '1rem',
    overflow:               'hidden',
    filter:                 'drop-shadow(0 0.125rem 0.125rem rgba(0,0,0, 0.33))',

    '@media (min-width: 41.5rem)': {
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',

        '& .full-row':      { gridColumn: '1 / -1' },
        '& .middle':        { gridColumn: '2 / -2' },
        '& .right-large':   { gridColumn: '2 / -1' },
        '& .left-large':    { gridColumn: '1 / -2' },
        '& .right-small':   { gridColumn: '-3 / -1' },
        '& .left-small':    { gridColumn: '1 / 3' }
    }
})

export default Blurb;