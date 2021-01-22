import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from 'react-redux';

import Link from "./controls/link";
import { open } from "../state/viewer";

type GalleryProps = {
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
    const dispatch = useDispatch();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const { title, dzi } = event.currentTarget.dataset;

        if (!dzi) { return; }

        event.preventDefault();
        dispatch(open({ title, image: dzi }));
    }

    return (
        <Link 
            className   = { props.className } 
            to          = { props.image }
            data-dzi    = { props.dzi } 
            data-title  = { props.title } 
            onClick     = { handleClick }>
            { props.children }
        </Link>
    );
}

export const Gallery = styled(GalleryUnstyled)({
    display:                'grid',
    gridTemplateColumns:    'repeat(auto-fit, minmax(16rem, 1fr))',
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