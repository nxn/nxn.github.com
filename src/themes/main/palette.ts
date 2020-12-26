import type { Palette } from '@emotion/react';

export const palette: Palette = {
    bgs: {
        // Black
        standard: {
            main:   '#1b1a22',
            light:  '#2e343e',
            dark:   '#05070b'
        },
        // Purple
        primary: {
            main:   '#28192b',
            light:  '#312437',
            dark:   '#130c17'
        },
        // Teal
        secondary: {
            main:   '#141b22',
            light:  '#18252d',
            dark:   '#0c1317'
        },
        disabled: {
            main: '#1b1a22',
            light: '#25242c'
        }
    },
    
    text: {
        // Warm White
        standard: {
            main:   '#c2c2a8',
            light:  '#dbdac1'
        },

        // Cool Gray
        alternate: {
            main:   '#767D75',
            light:  '#94B1A3'
        },
    },

    // Primary and Secondary should be paired with their corresponding 'main' bg variant. Use light variant for
    // hover state. 
    actions: {
        primary: {
            main:   '#D7D0C7',
            light:  '#F0E5DF'
        },
        secondary: {
            main:   '#94B1A3',
            light:  '#B0D0C1'
        },
        disabled: {
            main: '#777'
        }
    },

    nav: {
        main: '#ea7d93',
        dark: '#EF545F'
    },

    error: {
        main:   '#da2840'
    },
    
    accents: {
        // Use for contrast 
        light:  '#9DA69E',
        dark:   '#29302d',

        // Use for color contrast
        red:    '#CD7860',
        green:  '#A5AF86',
        blue:   '#94B1A3',
        purple: '#917f86',
        cyan:   '#7a9388'
    },
}

export default palette;