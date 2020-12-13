import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { palette } from "./theme";
import graphics from "../../../images/graphics.svg";
import { LinkButton, ButtonGroup } from "../../button";


type BannerProps = {
    children?: React.ReactNode,
    className?: string,
    logo?: boolean
};

export function BannerUnstyled(props: BannerProps) {
    return (
        <div className={ props.className }>
            { props.logo &&
                <div id="banner-logo">
                    <svg id="logo"><use href={ `${ graphics }#logo-no-outline` } /></svg>
                </div>
            }
            
            <article id="banner-content">
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
                Sorry, the page you're looking for doesn't exist. Check that you typed the address correctly, return to the home page, or go back to your previous page.
            </p>
            <ButtonGroup className="nav-buttons">
                <LinkButton className="primary" href="/">Go Home</LinkButton>
                <LinkButton className="primary" href="/">Go Back</LinkButton>
            </ButtonGroup>
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

    '& #banner-content': {
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
            margin:    '1.5rem 0'
        },
            
        '#page.error & *': {
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