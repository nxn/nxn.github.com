import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { PageHeading } from "./common";
import graphics from "../images/graphics.svg";


type BannerProps = {
    children?: React.ReactNode,
    className?: string,
    logo?: boolean
};

// Should probably do this via ref instead
export function BannerUnstyled(props: BannerProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { children, logo, ...remaining } = props;
    return (
        <div { ...remaining }>
            { logo &&
                <div id="banner-logo">
                    <svg id="logo"><use href={ `${ graphics }#logo-no-outline` } /></svg>
                </div>
            }
            
            <article id="banner-content">
                { children }
            </article>
        </div>
    );
}

export function WelcomeBannerUnstyled(props: BannerProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <BannerUnstyled logo { ...props }>
            <PageHeading>Hello, I'm <span className="accent">Ernie</span>.</PageHeading>
            <div className="intro">
                I am a Philadelphia based software developer who specializes in full stack web application 
                development. You can find a few samples of my recent personal projects below.
            </div>
        </BannerUnstyled>
    )
}

const bannerStyles: Interpolation<BannerProps & { theme: Theme }> = ({theme}) => ({
    //backgroundColor:    theme.palette.page.background,
    color:              theme.palette.text.standard.main,
    textAlign:          'center',
    verticalAlign:      'middle',

    '& .accent': {
        color: theme.palette.accents.green
    },

    '@media (min-width: 41.5rem)': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
    },

    '& #logo': {
        width:      '10rem',
        height:     '15rem',
        padding:    '2rem 5rem',
        fill:       theme.palette.accents.light
    },

    '& #banner-content': {
        textAlign: 'left',

        '& .intro': {
            maxWidth:   '48rem',
            margin:     '1.5rem 0'
        }
    }
});

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);

export default Banner;