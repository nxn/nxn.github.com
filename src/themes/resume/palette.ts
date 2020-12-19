import type { Palette } from '@emotion/react';

const empty = { };

export const palette: Palette = {
    bgs: {
        standard: {
            main: '#f7f7f7'
        },
        primary:    empty,
        secondary:  empty
    },
    text: {
        standard: {
            main: '#000'
        },
        alternate: empty
    },
    actions: {
        primary:    empty,
        secondary:  empty
    },
    nav: {
        main:   '#000',
        light:  '#EF545F',
        dark:   '#CD546C'
    },
    accents: {
        dark:   '#222',
        light:  '#c6c6c6',

        gray:   '#666',
        white:  '#fff',
        black:  '#000'
    },
    error: empty
}

export default palette;