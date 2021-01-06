import React from "react";
import styled from "@emotion/styled";

import Link from "./controls/link";

type GalleryProps = {
    maxWidth?:  string,
    className?: string,
    children?:  React.ReactNode
}

export function GalleryUnstyled(props: GalleryProps) {
    return (
        <div className={ props.className }>
            { props.children }
        </div>
    );
}

type GalleryItemProps = {
    image:      string,
    title?:     string,
    dzi?:       string,
    className?: string,
    children?:  React.ReactNode
}

export function GalleryItemUnstyled(props: GalleryItemProps) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
    }

    return (
        <Link className={ props.className } to={ props.image } target="_blank" onClick={ handleClick }>
            { props.children }
        </Link>
    );
}

export const Gallery = styled(GalleryUnstyled)({
    display:                'grid',
    gridTemplateColumns:    'repeat(auto-fill, minmax(16rem, 1fr))',
    gap:                    '1rem',
});

export const GalleryItem = styled(GalleryItemUnstyled)({
    borderRadius:   '0.25rem',
    overflow:       'hidden',
    filter:         'brightness(0.8) saturate(0.8)',
    transition:     'filter 500ms',
    '&:hover':      { filter: 'none' }
});

export default Gallery;