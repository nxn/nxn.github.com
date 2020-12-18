import React from "react";
import styled from "@emotion/styled";

export const Post = styled('div')(({theme: { main: theme }}) => ({
    '& h1': {
        fontFamily: '"Roboto Slab", serif',
        fontSize:   '2rem',
        lineHeight: '1.2em',
        color: theme.palette.box.text
    },

    '& h2': {
        fontFamily: '"Oswald", sans-serif',
        fontSize:   '1.5rem',
        margin:     '2.5rem 0',
        color: theme.palette.accent.subtle
    },

    '& hr': {
        borderTop: 0,
        borderBottom: `0.0625rem dashed rgba(194, 194, 168, 0.5)`,
        margin: '2.5rem 0'
    },

    '& strong': {
        color: theme.palette.box.text,
        fontWeight: 'bold'
    },

    '& em': {
        fontStyle: 'italic'
    },

    '& p': {
        margin: '1rem 0rem'
    },

    '& a': {
        color: theme.palette.page.link.text,
        textDecoration: 'none'
    },

    '& a.anchor': {
        //fill: "currentcolor",
        fill: theme.palette.page.text,
        marginLeft: '1rem',
        '&:hover': {
            fill: theme.palette.box.text
        }
    },

    '& a:hover': {
        color: theme.palette.page.link.hover
    },


    '& ul, & ol': {
        margin: '1rem 0 1rem 2rem',
        fontSize: '0.9rem'
    },

    // Make direct lists have large spacing between items and undo smaller font
    '& > ul > li, & > ol > li': {
        margin: '3rem 0 1rem 2rem',
        fontSize: '1rem',
    },

    // Custom number format
    '& ol': {
        counterReset: 'item',
        '& > li': {
            counterIncrement: 'item',
            position: 'relative',
            '&:before': {
                width: '3rem',
                fontSize: '1rem',
                color: theme.palette.box.text,
                lineHeight: '1.75rem',
                textAlign: 'right',
                position: 'absolute',
                left: '-3.5rem',
                fontWeight: 'bold',
                content: 'counter(item) "."'
            }
        }
    },

    '& ul': {
        listStyleType: 'disc'
    },

    '& code': {
        color: theme.palette.accent.standard,
        backgroundColor: theme.palette.box.background,
        //border: `0.0625rem solid ${ theme.palette.box.border }`,
        padding: '0.2rem 0.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.9rem',
        fontFamily: '"JetBrains Mono", monospace'
    },

    '& pre': {
        margin: '1rem 0',
        color: theme.palette.footer.link.hover,
        // TODO: Figure out how to theme prism and undo the importants
        backgroundColor: `${ theme.palette.box.backgroundAlt } !important`,
        fontSize: '0.9rem',
        fontFamily: '"JetBrains Mono", monospace',
        padding: '0.5rem 0.75rem',
        border: `0.0625rem solid ${ theme.palette.box.border }`,
        borderRadius: '0.25rem',
        overflowX: 'auto',
        
        // '& code': {
        //     color: theme.palette.footer.link.hover,
        //     border: 'none',
        //     background: 'none',
        //     padding: 0
        // }
    },


}));

export default Post;