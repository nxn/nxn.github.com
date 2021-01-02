import React from "react";
import { Link as GatsbyLink } from "gatsby";

// Internal links must start with exactly one slash `/`
const internalUrlRx = /^\/(?!\/)/;
const fragmentUrlRx = /^\#[0-9a-z\-]+$/i;
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
        return <a { ...other }>{ children }</a> 
    }

    if (externalUrlRx.test(url)) {
        return (
            // if `other` specifies `target` or `rel` attributes they will be used; otherwise "_blank" and "noreferrer"
            // will serve as defaults.
            <a href={ url } target="_blank" rel="noreferrer" { ...other }>
                { children }
            </a>
        );
    }

    if (internalUrlRx.test(url) && !fileRx.test(url)) {
        return (
            <GatsbyLink
                to              = { url }
                activeClassName = { activeClassName }
                partiallyActive = { partiallyActive }
                { ...other }>
                
                { children }
            </GatsbyLink>
        )
    }

    if (fragmentUrlRx.test(url)) {
        return (
            // If `other.onClick` exists it will replace the `smoothScroll` handler. This behavior may be desireable 
            // since it will prevent smooth scrolling from interfering with whatever the provided `onClick` handler is 
            // intended to do. The alternative is to combine the handlers and perform both actions. I'm leaving this as
            // it is for now since there is no existing use-case which prefers one behavior over the other.
            <a href={ url } onClick={ smoothScroll } { ...other }>
                { children }
            </a>
        )
    }

    // things like files, mailto:, etc
    return (
        <a href={ url } { ...other }>
            { children }
        </a>
    )
}

function smoothScroll(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const anchor = event.currentTarget as HTMLAnchorElement;
    const element = window.document.querySelector<HTMLElement>(anchor.hash);
    if (element) {
        event.preventDefault();
        element.scrollIntoView({ 
            behavior: 'smooth' 
        });
        element.focus();
    }
}


export default Link;