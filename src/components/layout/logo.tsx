import React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

import LogoGraphic from "../graphics/logo";
import Link from "../controls/link";

type LogoProps = {
    className?: string,
    title?:     string,
    variant?:   'standard' | 'outlined'
}
export function Logo(props: LogoProps) {
    const { site: { siteMetadata: meta } } = useStaticQuery(graphql`query {
        site {
            siteMetadata {
                title
            }
        }
    }`);

    return (
        <LogoLink 
            to          = "/" 
            role        = "img" 
            aria-label  = { `${ meta.title } Logo` } 
            title       = { props.title || meta.title } 
            className   = { props.className }>

            <LogoGraphic className="icon" variant={ props.variant } />
            <LogoGraphic className="text" variant="text" />
        </LogoLink>
    );
}

const LogoLink = styled(Link)(({theme}) => ({
    '& svg': {
        width:  '3rem',
        height: '2.5rem',
        fill:   theme.palette.text.alternate.main
    },

    '& .icon': {
        marginRight:    '1.5rem',
    }
}));

export default Logo;