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
        blockquote: {
            color: palette.text.alternate.light,
            backgroundColor: palette.bgs.standard.dark,
            border: `0.0625rem solid ${ palette.bgs.standard.light }`,
            borderRadius: '0.5rem',
            fontStyle: 'italic',
            position: 'relative',
            margin: '2.5rem',
            '& code': {
                border: `0.0625rem solid ${ palette.bgs.standard.main }`,
                //color: palette.actions.primary.light,
                backgroundColor: palette.bgs.standard.dark
            },
            '& p': {
                textIndent: '2rem',
                margin: '0.5rem 1rem'
            },
            '&::before, &::after': {
                quotes: `"“" "”" "‘" "’"`,
                color: palette.accents.purple,
                position: 'absolute',
                fontSize: '2rem',
                fontStyle: 'normal',
                fontFamily: '"Roboto Slab", serif'
            },
            '&::before': {
                content: 'open-quote',
                top: '0.5rem',
                left: '0.75rem'
            },
            '&::after': {
                content: 'close-quote',
                bottom: '-0.5rem',
                right: '0.75rem'
            }
        },
        code: {
            color: palette.accents.green,
            backgroundColor: palette.bgs.standard.main,
            //border: `0.0625rem solid ${ theme.palette.box.border }`,
            padding: '0.15rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.9rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontStyle: 'normal',
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
            margin:     '3rem 0 3rem 2rem',

            '& li': {
                margin:     '0.25rem 0 0.25rem 2rem',
                fontSize:   '0.9rem',
            }
        }
    },
    controls: {
        textbox: {
            fontSize:           '1rem',
            fontFamily:         '"Open Sans", sans-serif',
            width:              '100%',
            lineHeight:         '1.75rem',
            color:              palette.text.standard.main,
            border:             `0.125rem solid ${ palette.bgs.standard.light }`,
            backgroundColor:    'rgba(0,0,0, 0.33)',
            padding:            '0.5rem 1rem',
            boxSizing:          'border-box',
    
            '&::placeholder': {
                color:          palette.accents.light,
                opacity:        1,
                textTransform:  'uppercase',
                fontSize:       '0.9rem',
                fontWeight:     'bold'
            },

            '&:focus, &:active': {
                color:          palette.text.standard.light,
                borderColor:    palette.accents.cyan,
                outline:        'none',

                '&::placeholder': {
                    opacity: 0.2
                }
            },

            // Firefox applies its own invalid field effect after the user updates a field value or attempts to submit
            // the form. The effect is associated with ':-moz-ui-invalid':
            '&:-moz-ui-invalid': {
                // Instead of using Firefox's red box-shadow glow, update the border color to reflect the error.
                boxShadow: 'none',
                borderColor: palette.error.main,
            },

            // No browser actually supports this right now
            '&:user-invalid': {
                borderColor: palette.error.main,
            }
        },
        button: {
            fontFamily:     '"Open Sans", sans-serif',
            fontSize:       '0.8rem',
            fontWeight:     'bold',
            textTransform:  'uppercase',
            textDecoration: 'none',
            textAlign:      'center !important' as 'center',
            height:         '2.5rem',
            lineHeight:     '2.5rem',
            display:        'inline-block',
            padding:        '0rem 1.5rem',
            border:         0,
            borderRadius:   '1.25rem',
            boxSizing:      'border-box',
            cursor:         'pointer',
        
            '&:hover': { },
            '&:focus': { outline: 0 },

            transitionProperty: 'transform, opacity',
            transitionDuration: '60ms',
            transitionTimingFunction: 'ease-out',

            '&:active': {
                transform: 'scale(.95)',
                opacity: 0.8,

                transitionProperty: 'transform, opacity',
                transitionDuration: '60ms',
                transitionTimingFunction: 'ease-in'
            },
            
            '&.primary': {
                color:                  palette.actions.primary.main,
                backgroundColor:        palette.bgs.primary.main,
                '&:hover': {
                    color:              palette.actions.primary.light,
                    backgroundColor:    palette.bgs.primary.light,
                },
                '&:focus': {
                    boxShadow: `inset 0 0 0 0.25rem ${ palette.bgs.primary.light }`,
                }
            },
        
            '&.secondary': {
                color:                  palette.actions.secondary.main,
                backgroundColor:        palette.bgs.secondary.main,
                '&:hover': {
                    color:              palette.actions.secondary.light,
                    backgroundColor:    palette.bgs.secondary.light,
                },
                '&:focus': {
                    boxShadow: `inset 0 0 0 0.25rem ${ palette.bgs.secondary.light }`,
                }
            },

            '& svg': {
                fill:           'currentcolor',
                verticalAlign:  'middle',
                height:         '2.5rem',
                width:          '1.5rem',
                marginTop:      '-0.0625rem',
                marginLeft:     '-0.75rem',
                marginRight:    '0.75rem',
            },
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
    }
}

export default styles;