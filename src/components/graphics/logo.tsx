import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Svg, { SvgProps } from "./svg";

type LogoProps = SvgProps & {
    variant?: "standard" | "outlined" | "text"
}

export const Logo = React.memo((props: LogoProps) => {
    let { variant, ...other } = props;

    const { site: { siteMetadata: meta } } = useStaticQuery(graphql`query {
        site {
            siteMetadata {
                title
            }
        }
    }`);

    if (variant === "outlined") {
        return (
            <Svg role="img" aria-label={ `${ meta.title } Outlined Logo` } { ...other } viewBox="0 0 706.7 578">
                <title>{ meta.title }</title>
                <desc>Outlined Logo</desc>
                <path d="M147.2,323l0-68l58.9,34L147.2,323z M29.4,527l0-476l559.5,323l0-170l-117.8,68l-29.4-17l147.2-85l0-34
                    L412.2,238l-29.4-17L677.2,51l0,476L117.8,204l0,170l117.8-68l29.4,17l-147.2,85l0,34l176.7-102l29.4,17L29.4,527z M353.3,374
                    l353.3,204l0-578L353.3,204L0,0l0,578L353.3,374z M559.5,255l0,68l-58.9-34L559.5,255z"/>
            </Svg>
        );
    }

    if (variant === "text") {
        return (
            <Svg  role="img" aria-label={ `${ meta.title } Text Logo` } { ...other } viewBox="0 0 472.1 191.3">
                <title>{ meta.title }</title>
                <desc>Text Logo</desc>
                <path d="M0,191.3V43C0,28.5,10.1,17.3,30.3,9.6c10.9-4.2,23.2-6.3,37-6.3c13.7,0,26,2.1,37,6.3c20.2,7.8,30.3,18.9,30.3,33.4v133.7
                    l-30.8,14.6h-1.6V48.6c0-5.4-3.4-9.5-10.1-12.2c-6.8-2.7-15-4.1-24.7-4.1c-9.7,0-18,1.4-24.7,4.1c-6.8,2.7-10.1,6.8-10.1,12.2
                    v128.1L1.6,191.3H0z"/>
                <path d="M196.2,191.3h-1.6L166.7,178L217,95.6l-50.3-82.2L195,0h1.6L236,64.4L275.3,0h1.6l28.2,13.4l-50.2,82l50.4,82.6l-28.2,13.3
                    h-1.6l-39.6-64.8L196.2,191.3z"/>
                <path d="M470.5,191.3l-30.8-14.6V48.6c0-5.4-3.4-9.5-10.1-12.2c-6.8-2.7-15-4.1-24.7-4.1s-18,1.4-24.7,4.1
                    c-6.8,2.7-10.1,6.8-10.1,12.2v142.7h-1.6l-30.8-14.6V43c0-14.5,10.1-25.6,30.3-33.4c10.9-4.2,23.2-6.3,37-6.3c13.7,0,26,2.1,37,6.3
                    c20.2,7.8,30.3,18.9,30.3,33.4v148.3H470.5z"/>
            </Svg>
        );
    }

    return (
        <Svg  role="img" aria-label={ `${ meta.title } Standard Logo` } { ...other } viewBox="0 0 647.8 476">
            <title>{ meta.title }</title>
            <desc>Standard Logo</desc>
            <polygon points="88.3,153 88.3,323 206.1,255 235.6,272 88.3,357 88.3,391 265,289 294.5,306 0,476 0,0 559.4,323 559.4,153 
                441.7,221 412.2,204 559.4,119 559.4,85 382.8,187 353.3,170 647.8,0 647.8,476 "/>
        </Svg>
    );
});

export default Logo;