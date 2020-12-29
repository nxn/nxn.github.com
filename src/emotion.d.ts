import '@emotion/react'

declare module '@emotion/react' {
    export type CSSProperties = { };

    export interface AlertTypeColors {
        info?:      string,
        success?:   string,
        warning?:   string,
        error?:     string,
    }

    export interface ColorVariants {
        main?:  string;
        light?: string;
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
    
    export interface Theme {
        breakpoints?:   number[],
        palette:        Palette,
        styles:         Styles,
        transitions:    Transitions,
    }
}