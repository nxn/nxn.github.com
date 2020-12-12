export const palette = {
    page: { 
        text:           '#C2C2A8',
        background:     '#130c17',
        link: {
            text:       '#ea7d93',
            hover:      '#EF545F'
        }
    },
    header: {
        text:           '#767D75',
        background:     '#05070b',
        border:         '#7A9388',
        siteName:       '#29302d',
        link: {
            text:       '#767D75',
            hover:      '#94B1A3'
        }
    },
    banner: {
        logo:           '#9DA69E'
    },
    article: {
        text:           '#DBDAC1',
        background:     '#1b1a22',
        backgroundAlt:  '#05070b',
        border:         '#2e343e'
    },
    accent: {
        standard:       '#A5AF86',
        alt:            '#94B1A3',
        subtle:         '#917f86',
        error:          '#da2840'
    }
}

export const breakpoints = [41.5];
export const mediaQueries = breakpoints.map(bp => `@media (min-width: ${bp}rem)`);

