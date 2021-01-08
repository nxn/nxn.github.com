import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

const HIDE_CLASS            = 'hide';
const HIDE_CLASS_PROPKEY    = '&.hide';

type Direction = 'top' | 'bottom' | 'left' | 'right';

interface SlideAnimationConfig {
    animation: 'slide',
    direction: Direction
}

interface FadeAnimationConfig {
    animation: 'fade'
}

type HideableConfig = (SlideAnimationConfig | FadeAnimationConfig) & {
    duration: number
}

type HideableProps = {
    visible?:   boolean;
    className?: string;
}

const defaults: HideableConfig = {
    animation:  'slide',
    direction:  'top',
    duration:   250
}

function getConfig<T>(defaults: T, options?: Partial<T>) {
    return { ...defaults, ...options };
}

export function asHideable<P>(Component: React.ComponentType<P>, options?: Partial<HideableConfig>) {
    const config = getConfig(defaults, options);
    const HideableComponent = styled(Component)(hideableStyles(config));

    return (props: P & HideableProps) => {
        const { visible, className, ...other } = props;

        return (
            <HideableComponent className={ clsx(className, !visible && HIDE_CLASS) } { ...other as P } />
        );
    }
}

const hideableStyles = (config: HideableConfig) => {
    const base = baseStyles(config);
    switch (config.animation) {
        case 'slide':   return mergeStyles(base, slideStyles(config));
        default:        return mergeStyles(base, fadeStyles(config));
    }
};

type Style = { [HIDE_CLASS_PROPKEY]: { } }
const mergeStyles = (style1: Style, style2: Style) => {
    return {
        ...style1,
        ...style2,
        [HIDE_CLASS_PROPKEY]: {
            ...style1[HIDE_CLASS_PROPKEY],
            ...style2[HIDE_CLASS_PROPKEY]
        }
    }
}

const baseStyles = (config: HideableConfig) => {
    return {
        transitionDuration: `${ config.duration }ms`,
        transitionTimingFunction: 'ease-out',
        [HIDE_CLASS_PROPKEY]: {
            transitionTimingFunction: 'ease-in',
        }
    };
}

const fadeStyles = (_config: FadeAnimationConfig) => {
    return {
        transitionProperty: 'opacity',
        [HIDE_CLASS_PROPKEY]: {
            opacity: 0
        }
    };
}

const slideStyles = (config: SlideAnimationConfig) => {
    // Each style needs to account for all aspects of an element's position along the axis of the animation. For
    // example, if moving an element upwards off of the screen:
    // - `margin-top` needs to be set 0 so that it will not cause the element to stick out when hidden
    // - Setting the `top` position property to 0, will position it on the top edge of the parent/screen
    // - The `translateY(-100%)` transformation will further move it up by its height so that it is not visible
    // - Finally, for elements with borders a `box-sizing: border-box` may need to be applied? This needs testing.

    // All of the above should be included in the transition so that the movement is not janky.
    switch(config.direction) {
        case 'top': return {
            transitionProperty: 'top, margin, transform',
            [HIDE_CLASS_PROPKEY]: {
                top:        0,
                marginTop:  0,
                transform:  'translateY(-100%)',
            }
        };

        case 'bottom': return {
            transitionProperty: 'bottom, margin, transform',
            [HIDE_CLASS_PROPKEY]: {
                bottom:         0,
                marginBottom:   0,
                transform:      'translateY(100%)',
            }
        };

        case 'left': return {
            transitionProperty: 'left, margin, transform',
            [HIDE_CLASS_PROPKEY]: {
                left:       0,
                marginLeft: 0,
                transform:  'translateX(-100%)',
            }
        };

        case 'right': return {
            transitionProperty: 'right, margin, transform',
            [HIDE_CLASS_PROPKEY]: {
                right:          0,
                marginRight:    0,
                transform:      'translateX(100%)',
            }
        };
    }
}

export function Hideable(props: HideableProps) {

}