import '@emotion/react'

type CSSProperties = { };

declare module '@emotion/react' {
    export interface ColorVariants {
        main?:  string;
        light?: string;
        dark?:  string;
    }
    
    export interface Palette {
        bgs: {
            standard:   ColorVariants,
            primary:    ColorVariants,
            secondary:  ColorVariants
        },

        text: {
            standard:   ColorVariants,
            alternate:  ColorVariants
        },

        nav: ColorVariants,

        actions: {
            primary:    ColorVariants,
            secondary:  ColorVariants,
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
    
    export interface Theme {
        breakpoints?:   number[],
        palette:        Palette,
        styles:         Styles
    }
}