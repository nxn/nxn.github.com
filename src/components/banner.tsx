import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { palette } from "./theme";
import graphics from "../images/graphics.svg";
import { Button, LinkButton, ButtonGroup } from "./button";


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

const bannerStyles: Interpolation<Theme> = {
    backgroundColor: palette.page.background,
    color:          palette.page.text,
    textAlign:      'center',
    verticalAlign:  'middle',

    '@media (min-width: 41.5rem)': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        margin:         '0 var(--content-margin)',
    },

    '& #logo': {
        width:      '10rem',
        height:     '15rem',
        padding:    '2rem 5rem',
        fill:       palette.banner.logo
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

        '& .text': {
            maxWidth:   '48rem',
            margin:     '1.5rem 0'
        }
    }
};

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);

export default Banner;