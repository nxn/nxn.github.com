import type { Typography } from "@emotion/react"

export const typography: Typography = {
    lineLength: {
        short:      '32rem', // ~65 characters per line (60-68 typical)
        regular:    '40rem', // ~80 characters per line
        long:       '48rem', // ~100 characters per line
    },
    
    lineHeight: {
        dense:      '1.75rem',
        regular:    '2.00rem',
        sparse:     '2.50rem',
        entity:     '2.50rem',
    },

    main: {
        fontFamily: '"Open Sans", sans-serif'
    },
    mono: {
        fontFamily: '"JetBrains Mono", monospace'
    },
    slab: {
        fontFamily: '"Roboto Slab", serif'
    },
    sans: {
        fontFamily: '"Oswald", sans-serif'
    }
}

export default typography;