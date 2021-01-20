import React from "react";
import clsx from "clsx";

type SummaryProps = {
    className?: string,
    children?:  React.ReactNode,
    component?: string,
    hidden?:    boolean
}

export function Summary(props: SummaryProps) {
    const { className, children, component, hidden, ...other } = props;

    return React.createElement(
        component || 'span',
        { className: clsx(className, hidden && 'no-display'), ...other },
        children
    );
}

export default Summary;