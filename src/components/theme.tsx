import { Theme } from "@emotion/react";

const breakpoints = [41.5];
const mediaQueries = breakpoints.map(bp => `@media (min-width: ${bp}rem)`);

export const theme: Theme = {
    main: {
        breakpoints:    breakpoints,
        mediaQueries:   mediaQueries,
        tocWidth:       '16rem',
        palette: {
            body: {
                text:               '#767D75',
                background:         '#0c1317',
            },
            page: {
                text:               '#C2C2A8',
                background:         '#130c17',
                border:             '#7A9388',
                link: { 
                    text:           '#ea7d93',
                    hover:          '#EF545F'
                }
            },
            header: {
                text:               '#767D75',
                background:         '#05070b',
                siteName:           '#29302d',
                link: { 
                    text:           '#767D75',
                    hover:          '#94B1A3'
                }
            },
            footer: {
                text:               '#767D75',
                background:         '#0c1317',
                link: {
                    text:           '#767D75',
                    hover:          '#94B1A3'
                }
            },
            banner: {
                logo:               '#9DA69E'
            },
            box: {
                text:               '#DBDAC1',
                background:         '#1b1a22',
                backgroundAlt:      '#05070b',
                border:             '#2e343e'
            },
            accent: {
                standard:           '#A5AF86',
                alt:                '#94B1A3',
                subtle:             '#917f86',
                error:              '#da2840'
            },
            button: {
                primary: {
                    text:           '#D7D0C7',
                    background:     '#28192b',
                    hover: {
                        text:       '#F0E5DF',
                        background: '#312437'
                    }
                },
                secondary: {
                    text:           '#94B1A3',
                    background:     '#141b22',
                    hover: {
                        text:       '#B0D0C1',
                        background: '#18252d'
                    }
                }
            }
        }
    },
    resume: {
        palette: {
            page: {
                text:               '#000',
                background:         '#f7f7f7'
            },
            header: {
                text:               '#222',
                link: {
                    text:           '#000',
                    hover:          '#CD546C'
                },
            },
            item: {
                text:               '#222',
                background:         '#fff'
            },
            icon: {
                fill:               '#c6c6c6',
                hover:              '#EF545F'
            },
            
            accent: {
                subtle:             '#c6c6c6'
            },
            gray:                   '#666',
            white:                  '#fff',
            black:                  '#000'
        }
    }
}

export default theme;

