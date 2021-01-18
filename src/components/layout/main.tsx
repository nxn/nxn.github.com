import React from "react";
import styled from "@emotion/styled";

type MainProps = {
    children?:  React.ReactNode,
    unpadded?:  boolean,
}

export function Main(props: MainProps) {
    return (
        <MainContainer unpadded={ props.unpadded }>
            { props.children }
        </MainContainer>
    )
}

const MainContainer = styled.main<MainProps>(({unpadded, theme}) => ({
    gridArea:           'main',
    padding:            unpadded ? 0 : '1rem',
    backgroundColor:    theme.palette.bgs.primary.dim,
    border:             `0.0625rem solid ${ theme.palette.accents.cyan }`,
    borderLeft:         0,
    borderRight:        0,

    // This is to pad the top of the footer; simpler than adding a new row or padding multiple footer columns
    marginBottom: '1rem',

    [theme.mediaQueries.standard]: {
        padding: unpadded ? 0 : `${ theme.spacing.margins.vertical } ${ theme.spacing.margins.horizontal }`,
        marginBottom: '2rem',
    }
}));

export default Main;