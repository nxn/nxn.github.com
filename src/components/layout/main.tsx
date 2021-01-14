import React from "react";
import styled from "@emotion/styled";

type MainProps = {
    className?: string,
    children?:  React.ReactNode,
    unpadded?:  boolean,
}

export function MainUnstyled(props: MainProps) {
    return (
        <main className={ props.className }>
            { props.children }
        </main>
    )
}

export default styled(MainUnstyled)(({unpadded, theme}) => ({
    padding:            unpadded ? 0 : '1rem',
    backgroundColor:    theme.palette.bgs.primary.dim,
    [theme.mediaQueries.standard]: {
        padding: unpadded ? 0 : `${ theme.spacing.margins.vertical } ${ theme.spacing.margins.horizontal }`,
    }
}));