import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import transitions  from './transitions';
import typography   from './typography';

export const theme: Theme = {
    palette,
    styles,
    typography,
    transitions,
    breakpoints: [48],
    zIndex: { }
}

export default theme;