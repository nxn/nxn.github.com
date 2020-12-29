import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import transitions  from './transitions';

export const theme: Theme = {
    palette,
    styles,
    transitions,
    breakpoints: [48]
}

export default theme;