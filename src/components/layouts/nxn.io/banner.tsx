import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { palette } from "./theme";
import graphics from "../../../images/graphics.svg";


type BannerProps = {
    children?: React.ReactNode,
    className?: string,
    logo?: boolean
};

export function BannerUnstyled(props: BannerProps) {
    return (
        <div id="banner" className={ props.className }>
            { props.logo &&
                <div id="banner-logo" className="banner">
                    <svg id="logo"><use href={ `${ graphics }#logo-no-outline` } /></svg>
                </div>
            }
            
            <article id="banner-text" className="banner">
                { props.children }
            </article>
        </div>
    );
}

export function WelcomeBannerUnstyled(props: BannerProps) {
    return (
        <BannerUnstyled logo { ...props }>
            <h1>Hello, I'm <span className="accent">Ernie</span>.</h1>
            <p className="text">
                I am a Philadelphia based software developer who specializes in full stack web application 
                development. You can find a few samples of my recent personal projects below.
            </p>
        </BannerUnstyled>
    )
}

export function Error404BannerUnstyled(props: BannerProps) {
    return (
        <BannerUnstyled logo { ...props }>
            <h1>Page not found <span className="accent">404</span></h1>
            <p className="text">
                Sorry, there are no documents located at this URL. Check that you typed the address correctly,
                go back to your previous page, or <a href="/">follow this link to return to the main page</a>.
            </p>
        </BannerUnstyled>
    )
}

const bannerStyles: Interpolation<Theme> = {
    backgroundColor: palette.page.background,
    color:          palette.page.text,
    textAlign:      'center',
    verticalAlign:  'middle',
    paddingTop:     '4rem',

    '@media (min-width: 41.5rem)': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        margin:         '0 var(--content-margin)',
    },
    
    '#page.error & .accent': {
        color: palette.accent.error
    },

    '& #logo': {
        width:      '10rem',
        height:     '15rem',
        padding:    '2rem 5rem',
        fill:       palette.banner.logo
    },

    '#page.error & #logo': {
        padding: '2rem 3rem'
    },

    '& #banner-text': {
        padding: '2rem',
        paddingTop: 0,
        textAlign: 'left',

        '@media (min-width: 41.5rem)': {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: '2rem'
        },
        
        '& h1': {
            fontFamily: '"Roboto Slab", serif',
            fontSize: '2rem',
            lineHeight: '1.2em'
        },

        '& .text': {
            maxWidth:     '48rem',
            marginTop:    '1.5rem'
        },
            
        '#page.error & h1, #page.error & .text': {
            textAlign: 'center',
            '@media (min-width: 41.5rem)': {
                textAlign: 'left'
            }
        }
    }
};

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);
export const Error404Banner = styled(Error404BannerUnstyled)(bannerStyles);

export default Banner;