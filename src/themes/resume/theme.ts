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
        margins: {
            standard: {
                min:        1.25,
                percent:    6.5
            },
            print: {
                vertical:   0.5,
                horizontal: 0.5,
            },
        }
    },
    zIndex: { }
}

export default theme;