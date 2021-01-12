import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import typography   from './typography';
import transitions  from './transitions';

export const theme: Theme = {
    palette,
    styles,
    transitions,
    typography,
    breakpoints: [41.5],
    zIndex: {
        imageViewer: 1000,
        snackbar: 2000
    }
}

export default theme;