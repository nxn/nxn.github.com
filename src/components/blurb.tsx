import React from "react";
import styled from "@emotion/styled";

import theme from "./theme";

type BlurbProps = {
    className?: string,
    title:      string,
    image:      string,
    summary:    string,
    slug?:      string,
    alt?:       boolean
};

export function BlurbUnstyled(props: BlurbProps) {
    return (
        <article>
            <header>
                <h2>{ props.title }</h2>
            </header>
            <div className="description">
                { props.summary }
            </div>
            { props.slug && 
                <a href={ props.slug }>Read more...</a>
            }
        </article>
    );
}

export const Blurb = styled(BlurbUnstyled)(({theme: { main: theme }}) => ({

}));

export default Blurb;