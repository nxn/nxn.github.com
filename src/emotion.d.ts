import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        main: {
            breakpoints: number[];
            mediaQueries: string[];
            palette: {
                body: {
                    text: string;
                    background: string;
                };
                page: {
                    text: string;
                    background: string;
                    border: string;
                    link: {
                        text: string;
                        hover: string;
                    };
                };
                header: {
                    text: string;
                    background: string;
                    siteName: string;
                    link: {
                        text: string;
                        hover: string;
                    }
                },
                footer: {
                    text: string;
                    background: string;
                    link: {
                        text: string;
                        hover: string;
                    }
                },
                banner: {
                    logo: string;
                },
                box: {
                    text: string;
                    background: string;
                    backgroundAlt: string;
                    border: string;
                },
                accent: {
                    standard: string;
                    alt: string;
                    subtle: string;
                    error: string;
                },
                button: {
                    primary: {
                        text: string;
                        background: string;
                        hover: {
                            text: string;
                            background: string;
                        }
                    },
                    secondary: {
                        text: string;
                        background: string;
                        hover: {
                            text: string;
                            background: string;
                        }
                    }
                }
            }
    
        },
        resume: {
            palette: {
                page: {
                    text: string;
                    background: string;
                };
                header: {
                    text: string;
                    link: {
                        text: string;
                        hover: string;
                    };
                };
                item: {
                    text:       string;
                    background: string;
                };
                icon: {
                    fill: string;
                    hover: string;
                };
                accent: {
                    subtle: string;
                };
                gray: string;
                white: string;
                black: string;
            }
        }
    }
}