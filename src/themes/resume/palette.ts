import type { Palette } from '@emotion/react';

const empty = { };

export const palette: Palette = {
    bgs: {
        standard: {
            main:   '#f7f7f7',
            dim:    '#ddd',
            dark:   '#222',
            light:  '#fff'
        },
        primary:    empty,
        secondary:  empty,
        disabled:   empty,
        alerts:     empty
    },
    text: {
        standard: {
            main:   '#000',
            light:  '#222'
        },
        alternate: empty
    },
    actions: {
        primary:    empty,
        secondary:  empty,
        disabled:   empty
    },
    nav: {
        main:   '#000',
        light:  '#EF545F',
        dim:    '#CD546C'
    },
    accents: {
        dim:    '#222',
        light:  '#bbb',

        white:  '#fff',
        black:  '#000'
    },
    error: empty
}

export default palette;