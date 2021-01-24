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
                horizontal: 'auto',
                vertical:   '0.25in',
            },
            print: {
                vertical:   '0.5in',
                horizontal: '0.5in',
            },
            horizontal: 'max(1rem, 6.5%)',
            vertical:   'max(1rem, 6.5%)',
        }
    },
    zIndex: { }
}

export default theme;