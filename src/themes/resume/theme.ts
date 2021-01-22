import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import transitions  from './transitions';
import typography   from './typography';
import {
    breakPoints,
    mediaQueries
} from './mediaqueries';

export const theme: Theme = {
    palette,
    styles,
    typography,
    transitions,
    breakPoints,
    mediaQueries,
    spacing: {
        // TODO: Define and use this
        margins: {
            standard: {
                minHorizontal:  2,
                // Maximum vertical margin size (rem)
                maxVertical:    4,
                // Percentage of free space to use as margin after the `standard` breakpoint is met (wont use any
                // additional space beyond the `minHorizontal` value prior to that point)
                additional:     0.075
            },
            // These are calculated based on the above and the viewport size. Defined and saved in layout.tsx.
            vertical:   'var(--content-v-margin)',
            horizontal: 'var(--content-h-margin)',
        }
    },
    zIndex: { }
}

export default theme;