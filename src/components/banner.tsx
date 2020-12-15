import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import graphics from "../images/graphics.svg";


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

const bannerStyles: Interpolation<BannerProps & { theme: Theme }> = ({theme: { main: theme }}) => ({
    backgroundColor:    theme.palette.page.background,
    color:              theme.palette.page.text,
    textAlign:          'center',
    verticalAlign:      'middle',

    '@media (min-width: 41.5rem)': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
    },

    '& #logo': {
        width:      '10rem',
        height:     '15rem',
        padding:    '2rem 5rem',
        fill:       theme.palette.banner.logo
    },

    '& #banner-content': {
        textAlign: 'left',

        '& .text': {
            maxWidth:   '48rem',
            margin:     '1.5rem 0'
        }
    }
});

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);

export default Banner;