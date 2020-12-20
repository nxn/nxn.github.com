import { Styles } from '@emotion/react';
import palette from './palette';
import chevron from '../../images/chevron.svg';

const empty = { };

export const styles: Styles = {
    body: {
        color:              palette.text.standard.main,
        backgroundColor:    palette.bgs.standard.main,
        fontFamily:         '"Open Sans", sans-serif',
        fontSize:           '1rem',
        lineHeight:         '1.5rem',
        padding:            '6.5%',

        '@media print': {
            color:              palette.accents.black,
            backgroundColor:    palette.accents.white,
            // Padding needed otherwise list bullets (chevrons) not printed
            padding:            '0 0 0 1rem'
        },

        '@media screen and (min-width: 48rem)': {
            padding: '3.125rem'
        }
    },
    headings: {
        page: {
            color:          palette.accents.dark,
            fontFamily:     '"Oswald", sans-serif',
            fontSize:       '3rem',
            lineHeight:     '1.0em'
        },
        section: {
            color:          palette.accents.dark,
            fontFamily:     '"Roboto Slab", serif',
            fontSize:       '2rem',
            marginTop:      '2rem',
            textAlign:      'center' as 'center'
        },
        content: {
            color:          palette.accents.dark,
            fontFamily:     '"Oswald", sans-serif',
            fontSize:       '1.5rem',
            lineHeight:     '1.5em',
            marginTop:      '1.5rem',
        },
        sub1: {
            color:          palette.accents.dark,
            fontFamily:     '"Roboto Slab", serif',
            fontWeight:     700
        },
        sub2: {
            color:          palette.accents.dark,
            fontFamily:     '"Roboto Slab", serif',
            fontWeight:     700,
            marginBottom:   '0.5rem',
        },
        sub3: {
            color:          palette.accents.dark,
            fontFamily:     '"Roboto Slab", serif',
            fontSize:       '1.25rem',
            lineHeight:     '2rem',
            marginBottom:   '1rem'
        }
    },
    text: {
        bold: {
            color:      palette.accents.dark,
            fontFamily: '"Roboto Slab", serif',
            fontWeight: 700
        },
        italic: {
            fontWeight: 400
        },
        anchor: {
            color:          palette.nav.light,
            textDecoration: 'none',
            '&:hover': {
                color: palette.nav.dark
            },
            // Auto-Generated anchors for headings
            '&.anchor': {
                marginLeft: '1rem',
                display: 'none'
            },
            // Only show them for h3s when they're hovered over
            'h3:hover > &.anchor': {
                display: 'inline-block'
            },
        },
        paragraph: {
            marginBottom: '1.0rem'
        },
        code: empty,
    },
    lists: {
        ordered: empty,
        unordered: {
            listStyleType:  'disc',
            listStyleImage: `url("${ chevron }")`,
        },
        item: {
            paddingBottom:  '0.5rem',
            breakInside:    'avoid' as 'avoid'
        }
    },
    controls: {
        textbox:    empty,
        button:     empty
    },
    misc: {
        hr: {
            margin:             '0.5rem 0',
            borderStyle:        'solid',
            borderBottomWidth:  '0.25rem',
            borderTop:          0,
            borderLeft:         0,
            borderRight:        0,
            borderImage: 
                `linear-gradient(to right, ${ palette.accents.light }, rgba(247, 247, 247, 0)) 100% 1;`
        },
        pre: empty
    }
}

export default styles;