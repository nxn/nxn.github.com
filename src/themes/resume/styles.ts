import { Styles } from '@emotion/react';
import palette from './palette';
import typography from './typography';
import { mediaQueries } from './mediaqueries';

import bullet from '../../images/bullet.svg';

const empty = { };

export const styles: Styles = {
    body: {
        color:              palette.text.standard.main,
        backgroundColor:    palette.bgs.standard.dim,
        fontFamily:         typography.main.fontFamily,
        fontSize:           '1rem',
        lineHeight:         '1.5rem',
        [mediaQueries.print]: { backgroundColor: palette.bgs.standard.light }
    },
    headings: {
        page: {
            color:          palette.text.standard.light,
            fontFamily:     typography.sans.fontFamily,
            fontSize:       '3rem',
            lineHeight:     '1.0em',
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        section: {
            color:          palette.text.standard.light,
            fontFamily:     typography.slab.fontFamily,
            fontSize:       '2rem',
            textAlign:      'center' as 'center',
            margin:         '2rem 0 1rem 0',
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        content: {
            color:          palette.text.standard.light,
            fontFamily:     typography.sans.fontFamily,
            fontSize:       '1.5rem',
            lineHeight:     '1.5em',
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        sub1: {
            color:          palette.text.standard.light,
            fontFamily:     typography.slab.fontFamily,
            fontWeight:     700,
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        sub2: {
            color:          palette.text.standard.light,
            fontFamily:     typography.slab.fontFamily,
            fontWeight:     700,
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        sub3: {
            color:          palette.text.standard.light,
            fontFamily:     typography.slab.fontFamily,
            fontSize:       '1.25rem',
            lineHeight:     '2rem',
            [mediaQueries.print]: { color: palette.text.standard.main }
        }
    },
    text: {
        bold: {
            color:      palette.text.standard.light,
            fontFamily: typography.slab.fontFamily,
            fontWeight: 700,
            [mediaQueries.print]: { color: palette.text.standard.main }
        },
        italic: {
            fontWeight: 400
        },
        anchor: {
            color:          palette.nav.light,
            textDecoration: 'none',
            '&:hover': {
                color: palette.nav.dim
            },
            // Auto-Generated anchors for headings
            '&.anchor': {                
                display:        'none',
                lineHeight:     0,
                verticalAlign:  'text-top',
                margin:         '0.125rem 0 0 0.75rem',
                '& > *': {
                    fill:               palette.accents.dim,
                    opacity:            0.75,
                    width:              '1rem',
                    height:             '1rem',
                    padding:            '0.25rem',
                    borderRadius:       '0.25rem',
                    border:             `0.125rem solid ${ palette.accents.light }`,
                },
                '&:hover > *': {
                    fill:               palette.nav.dim,
                    borderColor:        palette.nav.light,
                    backgroundColor:    palette.accents.white,
                    opacity: 1
                }
            },
            // Only show them for h3s and only when viewing on screen
            ['@media screen']: {
                'h3 > &.anchor': {
                    display: 'inline-block',
                },
            }
        },
        paragraph: {
            marginBottom: '1.0rem'
        },
        blockquote: empty,
        code: empty,
    },
    lists: {
        ordered: empty,
        unordered: {
            listStyleType:      'none',
            listStylePosition:  'inside',
            '& li::before': {
                content:        `url(${ bullet})`,
                display:        'inline-block',
                verticalAlign:  'text-top',
                width:          '1rem',
                height:         '1rem',
                marginRight:    '0.5rem',
            }
        },
        item: {
            paddingTop:  '0.5rem',
            breakInside: 'avoid',
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