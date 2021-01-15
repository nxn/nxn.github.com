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
    padding:            unpadded ? 0 : '1rem',
    backgroundColor:    theme.palette.bgs.primary.dim,

    [theme.mediaQueries.standard]: {
        padding: unpadded ? 0 : `${ theme.spacing.margins.vertical } ${ theme.spacing.margins.horizontal }`,
    }
}));

export default Main;