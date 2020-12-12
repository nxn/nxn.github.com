import React from "react";
import { Global, Interpolation, Theme } from "@emotion/react";

export function withGlobal<P>(Component: React.ComponentType<P>, styles: Interpolation<Theme>) {
    return (props: P) => <>
        <Global styles={ styles } />
        <Component { ... props } />
    </>;
}