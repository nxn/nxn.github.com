import { Styles } from '@emotion/react';
import palette from './palette';
import typography from './typography';
import transitions from './transitions';

export const styles: Styles = {
    body: {
        color:              palette.text.standard.main,
        backgroundColor:    palette.bgs.secondary.dim,
        fontFamily:         typography.main.fontFamily,
        fontSize:           '1rem',
        lineHeight:         '1.75rem'
    },
    headings: {
        page: {
            fontFamily: typography.slab.fontFamily,
            fontSize:   '2rem',
            lineHeight: '1.2em',
            color:      palette.text.standard.light
        },
        section: {
            fontFamily: typography.sans.fontFamily,
            fontSize:   '1.5rem',
            margin:     '3rem 0 1.5rem 0',
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
                color: palette.nav.dim
            },
            // Auto-Generated anchors for headings
            '&.anchor': {
                //fill: "currentcolor",
                display:    'none',
                fill:       palette.text.standard.main,
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
            color:              palette.text.alternate.light,
            backgroundColor:    palette.bgs.secondary.dark,
            border:             `0.0625rem solid ${ palette.bgs.standard.light }`,
            borderRadius:       '0.5rem',
            fontStyle:          'italic',
            position:           'relative',
            margin:             '2.5rem',
            '& code': {
                //color: palette.actions.primary.light,
                border:             `0.0625rem solid ${ palette.bgs.standard.main }`,
                backgroundColor:    palette.bgs.standard.dim
            },
            '& p': {
                textIndent: '2rem',
                margin:     '0.5rem 1rem'
            },
            '&::before, &::after': {
                quotes:     `"“" "”" "‘" "’"`,
                color:      palette.accents.purple,
                position:   'absolute',
                fontSize:   '2rem',
                fontStyle:  'normal',
                fontFamily: '"Roboto Slab", serif'
            },
            '&::before': {
                content:    'open-quote',
                top:        '0.5rem',
                left:       '0.75rem'
            },
            '&::after': {
                content:    'close-quote',
                bottom:     '-0.5rem',
                right:      '0.75rem'
            }
        },
        code: {
            color:              palette.accents.green,
            backgroundColor:    palette.bgs.standard.main,
            //border: `0.0625rem solid ${ theme.palette.box.border }`,
            padding:            '0.15rem 0.5rem',
            borderRadius:       '0.25rem',
            fontSize:           '0.9rem',
            fontFamily:         typography.mono.fontFamily,
            fontStyle:          'normal',
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
            fontFamily:         typography.main.fontFamily,
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
            '&.invalid': {
                borderColor: palette.error.main
            },

            // Firefox applies its own invalid field effect after the user updates a field value or attempts to submit
            // the form. The effect is associated with ':-moz-ui-invalid':
            '&:-moz-ui-invalid': {
                boxShadow: 'none'
            },

            // No browser actually supports this right now
            //'&:user-invalid': {
                //borderColor: palette.error.main,
            //}

            '&:disabled': {
                opacity:        0.66,
                userSelect:     'none',
                color:          palette.actions.disabled.main,
                borderColor:    palette.bgs.disabled.light,
                background: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 0.5rem,
                    ${ palette.bgs.standard.dim } 0.5rem,
                    ${ palette.bgs.standard.dim } 1rem
                ), linear-gradient(
                    to bottom, 
                    ${ palette.bgs.standard.dim }, 
                    rgba(0,0,0, 0.33)
                )`
            }
        },
        button: {
            fontFamily:     typography.main.fontFamily,
            fontSize:       '0.8rem',
            fontWeight:     'bold',
            textTransform:  'uppercase',
            textDecoration: 'none',
            textAlign:      'center !important' as 'center',
            // TODO: Line height actually messes the alignment up
            display:        'inline-block',
            boxSizing:      'border-box',
            height:         '2.5rem',
            lineHeight:     '1.5rem',
            border:         '0.0625rem solid transparent',
            padding:        '0.4375rem 1rem',
            
            cursor:         'pointer',
        
            '&:hover': { },
            '&:focus': { outline: 0 },

            ... transitions.click.off,
            '&:focus:active': transitions.click.on,
            
            '&.primary': {
                color:                  palette.actions.primary.main,
                backgroundColor:        palette.bgs.primary.main,
                '&:hover': {
                    color:              palette.actions.primary.light,
                    backgroundColor:    palette.bgs.primary.light,
                },
                '&:focus': {
                    borderColor:    palette.bgs.primary.light,
                    boxShadow:      `inset 0 0 0 0.25rem ${ palette.bgs.primary.light }`
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
                    borderColor: palette.bgs.secondary.light,
                    boxShadow: `inset 0 0 0 0.25rem ${ palette.bgs.secondary.light }`,
                }
            },

            '&:disabled, &:disabled:hover': {
                opacity:            0.66,
                cursor:             'default',
                color:              palette.actions.disabled.main,
                backgroundColor:    palette.bgs.disabled.main,
                '&:focus': {
                    borderColor: palette.bgs.disabled.light,
                    boxShadow: `inset 0 0 0 0.25rem ${ palette.bgs.disabled.light }`,
                }
            },

            '&.standard': {
                borderRadius:   '1.25rem',
            },

            '&.minimal': {
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.04)'
                },
                '&:focus': {
                    textDecoration: '0.125rem underline',
                    textUnderlineOffset: '0.4375rem',
                    boxShadow: 'none',
                    borderColor: 'transparent'
                },
                '&:active': {
                    textDecoration: 'none'
                }
            },

            '&.outlined': {
                borderColor: 'rgba(255,255,255,0.1)'
            },


            '& .button-icon-start, & .button-icon-end': {
                display:    'inline-block',
            },

            '& .button-icon-start': {
                marginRight:    '0.5rem',
                marginLeft:     '-0.5rem'
            },

            '& .button-icon-end': {
                marginRight:    '-0.5rem',
                marginLeft:     '0.5rem'
            },

            '& .icon': {
                fill:           'currentcolor',
                verticalAlign:  'top',
                height:         '1.5rem',
                width:          '1.5rem',
                display:        'inline-block'
            },
        }
    },
    misc: {
        hr: {
            borderTop:      0,
            // TODO: use an alpha function on existing palette color
            borderBottom:   `0.0625rem dashed rgba(194, 194, 168, 0.5)`,
            margin:         '3rem 0'
        },
        pre: {
            margin:             '1rem 0',
            color:              palette.text.alternate.light,
            backgroundColor:    palette.bgs.secondary.dark,
            fontSize:           '0.9rem',
            fontFamily:         typography.mono.fontFamily,
            padding:            '0.5rem 0.75rem',
            border:             `0.0625rem solid ${ palette.bgs.standard.light }`,
            overflowX:          'auto',
        },
    }
}

export default styles;