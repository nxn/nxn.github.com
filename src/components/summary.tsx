import React from "react";
import clsx from "clsx";

type SummaryProps = {
    className?: string,
    children?:  React.ReactNode,
    hidden?:    boolean
}

export function Summary(props: SummaryProps) {
    return (
        <span id="summary" className={ clsx(props.className, props.hidden && 'no-display') }>
            { props.children }
        </span>
    );
}

export default Summary;