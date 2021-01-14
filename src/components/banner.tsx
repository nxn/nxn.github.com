import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { PageHeading } from "./common";

import { Logo } from "../components/graphics";

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
                    <Logo id="logo" variant="standard" />
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
    paddingBottom:      '2rem',

    '& .accent': {
        color: theme.palette.accents.green
    },

    '& #logo': {
        width:      '10rem',
        height:     'auto',
        padding:    '4rem',
        fill:       theme.palette.accents.light
    },

    '& #banner-content': {
        textAlign: 'left',
        padding: '0 1rem',
        paddingRight: 0,
        '& .intro': {
            maxWidth:   '48rem',
            marginTop:  '1.5rem'
        }
    },

    [theme.mediaQueries.standard]: {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingBottom:  theme.spacing.margins.vertical,
        '& #logo': {
            padding:        '2rem 4rem',
        },
    },
});

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);

export default Banner;