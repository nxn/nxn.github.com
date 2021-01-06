import styled from "@emotion/styled";

export default styled.div(({theme}) => ({
    display:                'grid',
    //gridTemplateColumns:    '1fr',
    gridTemplateColumns:    'repeat(auto-fit, minmax(16rem, 1fr))',
    gridAutoFlow:           'dense',
    gap:                    '1rem',
    justifyItems:           'center',
    maxWidth:               '45.5rem',
    margin:                 '0 auto',

    '& > *': {
        width: '100%'
    },
    '& img': {
        borderRadius: '0.25rem',
        //filter: 'brightness(0.8) contrast(1.1) saturate(75%)',
        '&:hover': {
            filter: 'none'
        }
    }
}));