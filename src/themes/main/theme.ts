import { Theme }    from '@emotion/react';
import palette      from './palette';
import styles       from './styles';
import typography   from './typography';
import transitions  from './transitions';
import { 
    breakPoints, 
    mediaQueries 
} from './mediaqueries';

export const theme: Theme = {
    palette,
    styles,
    transitions,
    typography,
    breakPoints,
    mediaQueries,
    spacing: {
        margins: {
            // These are calculated based on viewport size and saved as CSS var; see layout.tsx
            vertical: 'var(--content-v-margin)',
            horizontal: 'var(--content-h-margin)'
        }
    },
    zIndex: {
        imageViewer: 1000,
        snackbar: 2000
    }
}

export default theme;