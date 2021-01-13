import React from "react";
import styled from "@emotion/styled"

import { Logo, GatsbyLogo } from "../../../src/components/graphics/logo";

export function Logos() {
    return (
        <LogoContainer>
            <LogoIcon />
            <LogoText variant="text" />
        </LogoContainer>
    );
}

export function Gatsby() {
    return (
        <LogoContainer>
            <GatsbyLogoStyled />
        </LogoContainer>
    )
}

const logoBase = (fill: string) => ({
    fill,
    height: 'auto',
    margin: '2rem 1rem 4rem 1rem',
    verticalAlign: 'middle'
})

const LogoIcon = styled(Logo)(({theme}) => ({
    ...logoBase(theme.palette.accents.light),
    width: '6rem',
}));

const LogoText = styled(Logo)(({theme}) => ({
    ...logoBase(theme.palette.accents.light),
    width: '5rem',
}));

const GatsbyLogoStyled = styled(GatsbyLogo)(({theme}) => ({
    fill: theme.palette.accents.light,
    width: '14rem',
    height: 'auto',
    margin: '1.5rem 1.5rem 0rem 1.5rem',
    verticalAlign: 'middle'
}));

const LogoContainer = styled.div({
    textAlign: 'center',
})

export default Logos;