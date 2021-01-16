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

const logoBase = (theme) => ({
    fill: theme.palette.accents.light,
    height: 'auto',
    margin: `1rem 1rem 3rem 1rem`,
    verticalAlign: 'middle'
});

const LogoIcon = styled(Logo)(({theme}) => ({
    ...logoBase(theme),
    width: '6rem',
}));

const LogoText = styled(Logo)(({theme}) => ({
    ...logoBase(theme),
    width: '5rem',
}));

const GatsbyLogoStyled = styled(GatsbyLogo)(({theme}) => ({
    fill: theme.palette.accents.light,
    width: '14rem',
    height: 'auto',
    margin: `1rem 1rem 0 1rem`,
    verticalAlign: 'middle'
}));

const LogoContainer = styled.div({
    textAlign: 'center',
})

export default Logos;