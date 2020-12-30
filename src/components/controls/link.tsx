import React from "react";

import { Link as GatsbyLink } from "gatsby";

// Internal links must start with exactly one slash `/`
const internalUrlRx = /^\/(?!\/)/;
const externalUrlRx = /^(?:[a-z]+:)?\/\//i;
const fileRx        = /\.[0-9a-z]+$/i;

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children:           React.ReactNode, 
    to?:                string, 
    activeClassName?:   string, 
    partiallyActive?:   boolean
};

export function Link({ children, to, href, activeClassName, partiallyActive, ...other }: LinkProps) {
    // To provide compatibility with components that expect to use this as an HTMLAnchor replacement, we need to check
    // the `href` prop when `to` is not available.
    const url = to || href;

    if (!url) { 
        return <a { ... other }>{children}</a> 
    }

    if (externalUrlRx.test(url)) {
        const { target, rel, ...remaining } = other as React.AnchorHTMLAttributes<HTMLAnchorElement>;

        return (
            <a href={url} target="_blank" rel="noreferrer" { ...remaining }>
                {children}
            </a>
        );
    }

    if (internalUrlRx.test(url) && !fileRx.test(url)) {
        return (
            <GatsbyLink
                to={url}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}>
                
                {children}
            </GatsbyLink>
        )
    }

    // things like files, mailto:, anchors to ids `#elementId`, etc
    return (
        <a href={url} {...other}>
            {children}
        </a>
    )
}


export default Link;