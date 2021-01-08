import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

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
    autoHide?:  number;
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
        const { visible, autoHide, className, ...other } = props;

        //const [isVisible, setVisibility] = React.useState(true);

        const componentRef = React.useRef<HTMLElement | null>(null);

        // React.useEffect(() => {
        //     if (props.visible !== isVisible) {
        //         if (isVisible) {
        //             // hide
        //         }
        //         else {
        //             // show
        //         }
        //     }

        //     if (isVisible && props.autoHide) {
        //         // setTimeout
        //     }
        // }, [ props.visible ]);

        

        return (
            <HideableComponent 
                className   = { clsx(className, !visible && 'hide') } 
                ref         = { componentRef } 
                { ...other as P } />
        );
    }
}

const hideableStyles = (config: HideableConfig) => {
    switch (config.animation) {
        case 'slide': return slideStyles(config);
        default: {
            return {
                transition: `opacity ${ config.duration }ms`,
                '&.hide': {
                    opacity: 0
                }
            };
        }
    }
};

const slideStyles = (config: SlideAnimationConfig & HideableConfig) => {
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
            transitionDuration: `${ config.duration }ms`,
            transitionTimingFunction: 'ease-out',
            '&.hide': {
                top: 0,
                marginTop: 0,
                transform: 'translateY(-100%)',
                transitionTimingFunction: 'ease-in',
            }
        };
        case 'bottom': return {
            transitionProperty: 'bottom, margin, transform',
            transitionDuration: `${ config.duration }ms`,
            transitionTimingFunction: 'ease-out',
            '&.hide': {
                bottom: 0,
                marginBottom: 0,
                transform: 'translateY(100%)',
                transitionTimingFunction: 'ease-in',
            }
        };
        case 'left': return {
            transitionProperty: 'left, margin, transform',
            transitionDuration: `${ config.duration }ms`,
            transitionTimingFunction: 'ease-out',
            '&.hide': {
                left: 0,
                marginLeft: 0,
                transform: 'translateX(-100%)',
                transitionTimingFunction: 'ease-in',
            }
        };
        case 'right': return {
            transitionProperty: 'right, margin, transform',
            transitionDuration: `${ config.duration }ms`,
            transitionTimingFunction: 'ease-out',
            '&.hide': {
                right: 0,
                marginRight: 0,
                transform: 'translateX(100%)',
                transitionTimingFunction: 'ease-in',
            }
        };
    }
}

export function Hideable(props: HideableProps) {

}