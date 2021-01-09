import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { FluidObject, FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import clsx from "clsx";

import workspace from "../images/workspace.svg";
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
                    date: string,
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
    children?:      React.ReactNode,
    image?: {
        data?:      FixedObject | FixedObject[],
        position?:  string
    }
};

export function Blurb(props: BlurbProps) {
    return (
        <Article className={ clsx(props.className, props.style) }>
            <Header>
                <Heading>{ props.title }</Heading>
                <ImageContainer>
                    { props.image && props.image.data && 
                    <Img 
                        fixed       = { props.image.data } 
                        style       = {{ height: '100%', width: '100%', display: 'block' }} 
                        imgStyle    = {{
                            objectFit:      "cover",
                            objectPosition: props.image.position ? props.image.position : "center center",
                        }} />
                    }
                    <Vignette />
                </ImageContainer>
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
            filter: { 
                sourceInstanceName: { eq: "content" }, 
                relativePath: { regex: "/^posts/i" }, 
                name: { eq: "index" }
            }, 
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
                <ImageContainer >
                    <LatestPostsImage src={ workspace } />
                </ImageContainer>
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
                <LinkButton to="/posts" color="primary" outlined endIcon={ <ChevronIcon /> }>More</LinkButton>
            </Actions>
        </PostList>
    );
}

const foldSize = '4.0rem';
const containerBorderRadius = '1.0rem';

export const BlurbContainer = styled.div({
    maxWidth: '71.75rem',
    //maxWidth: '74.9375rem',
    margin: '0 auto',

    display:                'grid',
    gridTemplateColumns:    '1fr',
    gridAutoFlow:           'dense',
    gap:                    '1rem',

    borderRadius:           containerBorderRadius,
    overflow:               'hidden',
    filter:                 'drop-shadow(0 0.125rem 0.125rem rgba(0,0,0, 0.33))',

    '@media (min-width: 41.5rem)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',

        '& .full-row':      { gridColumn: '1 / -1' },
        '& .middle':        { gridColumn: '2 / -2' },
        '& .right-large':   { gridColumn: '2 / -1' },
        '& .left-large':    { gridColumn: '1 / -2' },
        '& .right-small':   { gridColumn: '-3 / -1' },
        '& .left-small':    { gridColumn: '1 / 3' }
    }
});

const Article = styled.article(({theme}) => ({
    position:           'relative',
    borderRadius:       '0.33rem',
    overflow:           'hidden',

    color:              theme.palette.text.alternate.light,
    backgroundColor:    theme.palette.bgs.secondary.main,

    '&:nth-of-type(even)': {
        color:           theme.palette.text.standard.main,
        backgroundColor: theme.palette.bgs.secondary.dark,
    }
}));

const PostList = styled.div(({theme}) => ({
    color:              theme.palette.text.standard.light,
    backgroundColor:    theme.palette.bgs.primary.main,
    position:           'relative',
    borderRadius:       '0.33rem',
    overflow:           'hidden',
    paddingBottom:      '4.5rem',
    clipPath:           `polygon(0 0, calc(100% - ${ foldSize }) 0, 100% ${ foldSize }, 100% 100%, 0 100%)`,
    '& h2': {
        color: theme.palette.accents.light,
        backgroundColor: theme.palette.bgs.primary.dark
    }
}));

const Header = styled.header();

const ImageContainer = styled.div({
    position:   'relative',
    height:     '12rem',
    background: 'rgba(0,0,0,0.25)'
});

const LatestPostsImage = styled.img({
    width:  'calc(100% - 2rem)',
    height: 'calc(100% - 2rem)',
    margin: '1rem'
});

const Vignette = styled.div(({theme}) => ({
    width:      '100%',
    height:     '100%',
    position:   'absolute',
    top:        0,
    left:       0,
    boxShadow:  `inset 0 0 6rem ${ theme.palette.bgs.secondary.dark }`
}));

const FoldedCorner = styled.div(({theme}) => ({
    position:               'absolute',
    top:                    0,
    right:                  0,
    width:                  foldSize,
    height:                 foldSize,
    borderBottomLeftRadius: containerBorderRadius,

    backgroundColor: theme.palette.bgs.primary.main,
    backgroundImage: `linear-gradient(
        45deg,
        ${ theme.palette.bgs.primary.light },
        rgba(0,0,0,0.25) 50%
    )`,

    boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.33), -0.0625rem 0.0625rem 0.0625rem rgba(0,0,0,0.20)'
}));

const Heading = styled.h2(({theme}) => ({
    fontFamily:         '"Oswald", sans-serif',
    fontSize:           '1.2rem',
    padding:            '0.5rem 1rem',
    width:              'calc(100% - 2rem)',
    color:              theme.palette.accents.blue,
    backgroundColor:    theme.palette.bgs.secondary.dark,
    // position:           'absolute',
    // top:                0,
    // left:               0,
    //backgroundColor:    'rgba(5,7,11,0.95)',
    
    //opacity:            '0.95',
    whiteSpace:         'nowrap',
    overflow:           'hidden',
    textOverflow:       'ellipsis'
}));

const Description = styled.div(() => ({
    margin: '1rem'
}))

const List = styled.ul(() => ({
    padding: '0 0.5rem'
}));

const ListItem = styled.li(() => ({
    padding: '0.5rem 0',
    borderBottom: '0.0625rem solid rgba(255,255,255,0.1)'
}));

const PostLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color:          theme.palette.actions.primary.main,
    display:        'block',
    borderRadius:   '0.25rem',
    padding:        '0.25rem 0.5rem',

    //textTransform: 'uppercase',
    overflow:       'hidden',
    textOverflow:   'ellipsis',
    whiteSpace:     'nowrap',
    fontSize:       '0.9rem',
    fontWeight:     'bold',
    
    '&:hover': {
        color: theme.palette.actions.primary.light,
        backgroundColor: theme.palette.bgs.primary.light
    }
}));

const Actions = styled.div(() => ({
    position:   'absolute',
    bottom:     '1rem',
    left:       '50%',
    transform:  'translateX(-50%)'
}));


export default Blurb;