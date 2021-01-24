import '@emotion/react'

declare module '@emotion/react' {
    // TODO: Look through React/Emotion to see if a suitable type definition can be used here
    export type CSSProperties = any;

    export interface Margins {
        horizontal?:    string,
        vertical?:      string,
    }

    export interface AlertTypeColors {
        info?:      string,
        success?:   string,
        warning?:   string,
        error?:     string,
    }

    export interface ColorVariants {
        main?:  string;
        light?: string;
        dim?:   string;
        dark?:  string;
    }
    
    export interface Palette {
        bgs: {
            standard:   ColorVariants,
            primary:    ColorVariants,
            secondary:  ColorVariants,
            disabled:   ColorVariants,
            alerts:     AlertTypeColors
        },

        text: {
            standard:   ColorVariants,
            alternate:  ColorVariants
        },

        nav: ColorVariants,

        actions: {
            primary:    ColorVariants,
            secondary:  ColorVariants,
            disabled:   ColorVariants
        },

        error: ColorVariants,
        accents: ColorVariants & { [ key: string ]: string }
    }

    export interface Typography {
        main: CSSProperties,
        mono: CSSProperties,
        slab: CSSProperties,
        sans: CSSProperties,

        lineLength: {
            short?:     string,
            regular?:   string,
            long?:      string,
        },
        lineHeight: {
            dense?:     string,
            regular?:   string,
            sparse?:    string,
            entity?:    string,
        },
    }

    export interface Spacing {
        margins: Margins & { [P in keyof MediaQueries]?: Margins | Record<string, number> }, 
    }
    
    export interface Styles {
        body: CSSProperties;
        headings: {
            page:    CSSProperties,
            section: CSSProperties,
            content: CSSProperties,
            sub1:    CSSProperties,
            sub2:    CSSProperties,
            sub3:    CSSProperties
        };
        text: {
            bold:       CSSProperties,
            italic:     CSSProperties,
            code:       CSSProperties,
            anchor:     CSSProperties,
            paragraph:  CSSProperties,
            blockquote: CSSProperties
        };
        controls: {
            textbox:    CSSProperties,
            button:     CSSProperties
        },
        lists: {
            ordered:    CSSProperties,
            unordered:  CSSProperties,
            item:       CSSProperties
        };
        misc: {
            hr:     CSSProperties
            pre:    CSSProperties
        }
    }

    export interface Transitions {
        click: {
            on?:     CSSProperties,
            off?:    CSSProperties
        }
    }

    export interface ZIndex {
        snackbar?:      number,
        imageViewer?:   number,
    }

    export interface BreakPoints {
        standard:   number,
        sidePanel?: number,
    }

    export type MediaQueries = { [P in keyof BreakPoints]: string } & {
        print: string
    }
    
    export interface Theme {
        breakPoints:    BreakPoints,
        mediaQueries:   MediaQueries,
        palette:        Palette,
        typography:     Typography,
        styles:         Styles,
        transitions:    Transitions,
        zIndex:         ZIndex,
        spacing:        Spacing,
    }
}