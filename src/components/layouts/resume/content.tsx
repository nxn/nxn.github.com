import React from "react";
import styled from "@emotion/styled";

type ContentProps = {
    children?: React.ReactNode,
    className?: string
}

export function ContentUnstyled(props: ContentProps) {
    if (!props.children) {
        return null;
    }

    return (
        <div className={ props.className }>
            { props.children }
        </div>
    );
}

export const Content = styled(ContentUnstyled)({

});

export default Content;