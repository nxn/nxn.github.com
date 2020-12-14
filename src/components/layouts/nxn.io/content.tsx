import React from "react";
import styled from "@emotion/styled";

import { palette } from "../../theme";

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
    // padding: '2rem',
    // '@media (min-width: 41.5rem)': {
    //     padding: 'var(--content-margin)',
    //     paddingTop: '2rem',
    //     paddingBottom: '2rem',
    // }
});

export default Content;