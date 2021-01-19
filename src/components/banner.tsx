import React from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";

import { PageHeading, Anchor as Link } from "./common";

//import { Logo } from "../components/graphics";
import welcomeGraphic from "../images/welcome.svg";
import notFoundGraphic from "../images/error.svg";

type BannerProps = {
    children?: React.ReactNode,
    className?: string,
    image?: React.ReactNode,
};

// Should probably do this via ref instead
export function BannerUnstyled(props: BannerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { children, image, ...remaining } = props;
    return (
        <div { ...remaining }>
            { image && <div id="image">{ image }</div> }
            
            <div id="banner-bg">
                <article id="banner-content">
                    { children }
                </article>
            </div>
        </div>
    );
}

export function WelcomeBannerUnstyled(props: BannerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <BannerUnstyled image={ <Graphic src={ welcomeGraphic } /> } { ...props }>
            <PageHeading>Hello, I'm <span className="accent">Ernie</span>.</PageHeading>
            <div className="intro">
                I am a Philadelphia based software developer who specializes in full stack web application 
                development. You can find a few samples of my recent personal projects below.
            </div>
        </BannerUnstyled>
    )
}

export function Error404BannerUnstyled(props: BannerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <BannerUnstyled image={ <Graphic src={ notFoundGraphic } /> } { ...props }>
            <PageHeading id="heading">Page not found <span className="error">404</span></PageHeading>
            <div className="intro">
                Sorry, there are no documents located at this URL. Check that you typed the address correctly, go back 
                to your previous page, or <Link to="/">follow this link to return to the main page</Link>.
            </div>
        </BannerUnstyled>
    )
}

const Graphic = styled.img({
    width: '16rem',
});

const bannerStyles: Interpolation<BannerProps & { theme: Theme }> = ({theme}) => ({
    color:              theme.palette.text.standard.main,
    textAlign:          'center',
    verticalAlign:      'middle',

    '& .accent': {
        color: theme.palette.accents.green
    },

    '& .error': {
        color: theme.palette.error.main
    },

    // backgroundImage: `url(${ welcomeGraphic })`,
    // backgroundSize: 'contain',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: '75%',

    '& #banner-bg': {

    },

    '& #image': {
        padding:        '2rem 0',
    },

    '& #banner-content': {
        textAlign: 'left',
        margin: '1rem',

        '& .intro': {
            maxWidth:   theme.typography.lineLength.short,
            padding:  '1rem 0rem',
            // paddingLeft: 0,
            // backgroundColor:    'rgba(19,12,23,0.8)',
            // borderRadius: '0.5rem',
        }
    },

    [theme.mediaQueries.standard]: {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',

        '& #banner-content': {
            paddingLeft: '2rem',
        }
    },
});

export const Banner         = styled(BannerUnstyled)(bannerStyles);
export const WelcomeBanner  = styled(WelcomeBannerUnstyled)(bannerStyles);
export const Error404Banner = styled(Error404BannerUnstyled)(bannerStyles);

export default Banner;