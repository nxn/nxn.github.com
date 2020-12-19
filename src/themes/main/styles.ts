import { Styles } from '@emotion/react';
import palette from './palette';

export const styles: Styles = {
    body: {
        color:              palette.text.standard.main,
        backgroundColor:    palette.bgs.secondary.dark,
        fontFamily:         '"Open Sans", sans-serif',
        fontSize:           '1rem',
        lineHeight:         '1.75rem'
    },
    headings: {
        page: {
            fontFamily: '"Roboto Slab", serif',
            fontSize:   '2rem',
            lineHeight: '1.2em',
            color:      palette.text.standard.light
        },
        section: {
            fontFamily: '"Oswald", sans-serif',
            fontSize:   '1.5rem',
            margin:     '2.5rem 0',
            color:      palette.accents.purple
        },
        content: {

        },
        sub1: {

        },
        sub2: {

        },
        sub3: {

        }
    },
    text: {
        bold: {
            color:      palette.text.standard.light,
            fontWeight: 'bold'
        },
        italic: {
            fontStyle: 'italic'
        },
        anchor: {
            color:          palette.nav.main,
            textDecoration: 'none',
            '&:hover': {
                color: palette.nav.dark
            },
            // Auto-Generated anchors for headings
            '&.anchor': {
                //fill: "currentcolor",
                display: 'none',
                fill: palette.text.standard.main,
                marginLeft: '1rem',
                '&:hover': {
                    fill: palette.text.standard.light
                }
            },
            // Display only when parent is hovered over
            '*:hover > &.anchor': {
                display: 'inline-block'
            },
        },
        paragraph: {
            margin: '1rem 0rem'
        },
        code: {
            color: palette.accents.green,
            backgroundColor: palette.bgs.standard.main,
            //border: `0.0625rem solid ${ theme.palette.box.border }`,
            padding: '0.2rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.9rem',
            fontFamily: '"JetBrains Mono", monospace'
        }
    },
    lists: {
        ordered: {
            counterReset: 'item',
            '& > li': {
                counterIncrement:   'item',
                position:           'relative',

                '&:before': {
                    width:      '3rem',
                    color:      palette.text.standard.light,
                    lineHeight: '1.75rem',
                    textAlign:  'right',
                    position:   'absolute',
                    left:       '-3.5rem',
                    fontWeight: 'bold',
                    content:    'counter(item) "."'
                }
            }
        },
        unordered: {
            listStyleType:  'disc',
        },
        item: {
            margin:     '3rem 0 1rem 2rem',

            '& li': {
                margin:     '0.25rem 0 0.25rem 2rem',
                fontSize:   '0.9rem',
            }
        }
    },
    misc: {
        hr: {
            borderTop:      0,
            // TODO: use an alpha function on existing palette color
            borderBottom:   `0.0625rem dashed rgba(194, 194, 168, 0.5)`,
            margin:         '2.5rem 0'
        },
        pre: {
            margin:             '1rem 0',
            color:              palette.text.alternate.light,
            backgroundColor:    palette.bgs.standard.dark,
            fontSize:           '0.9rem',
            fontFamily:         '"JetBrains Mono", monospace',
            padding:            '0.5rem 0.75rem',
            border:             `0.0625rem solid ${ palette.bgs.standard.light }`,
            overflowX:          'auto',
        },
        button: {
            fontFamily:     '"Open Sans", sans-serif',
            fontSize:       '0.8rem',
            fontWeight:     'bold',
            textTransform:  'uppercase',
            textDecoration: 'none',
            textAlign:      'center !important' as 'center',
            lineHeight:     '2.5rem',
            display:        'inline-block',
            padding:        '0rem 1.5rem',
            border:         0,
            borderRadius:   '2.5rem',
            boxSizing:      'border-box',
            cursor:         'pointer',
        
            '&.primary': {
                color:                  palette.actions.primary.main,
                backgroundColor:        palette.bgs.primary.main,
                '&:hover': {
                    color:              palette.actions.primary.light,
                    backgroundColor:    palette.bgs.primary.light
                }
            },
        
            '&.secondary': {
                color:                  palette.actions.secondary.main,
                backgroundColor:        palette.bgs.secondary.main,
                '&:hover': {
                    color:              palette.actions.secondary.light,
                    backgroundColor:    palette.bgs.secondary.light
                }
            }
        }
    }
}

export default styles;