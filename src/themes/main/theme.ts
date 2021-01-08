import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import transitions  from './transitions';

export const theme: Theme = {
    palette,
    styles,
    transitions,
    breakpoints: [41.5],
    zIndex: {
        imageViewer: 1000,
        snackbar: 2000
    }
}

export default theme;