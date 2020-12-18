import React from "react";
import styled from "@emotion/styled";

type ContentProps = {
    className?: string,
    children?:  React.ReactNode,
    unpadded?:  boolean,
}

export function ContentUnstyled(props: ContentProps) {
    return (
        <div id="content" className={ props.className }>
            { props.children }
        </div>
    )
}

export default styled(ContentUnstyled)(({unpadded, theme: { main: theme }}) => ({
    padding: unpadded ? 0 : '3rem var(--content-margin)',
    position: 'relative'
}));