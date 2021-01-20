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
            standard: { }
        }
    },
    zIndex: { }
}

export default theme;