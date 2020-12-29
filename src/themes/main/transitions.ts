import type { Transitions } from "@emotion/react";

export const transitions: Transitions = {
    click: {
        on: {
            transform: 'scale(.95)',
            opacity: 0.8,

            transitionProperty: 'transform, opacity',
            transitionDuration: '60ms',
            transitionTimingFunction: 'ease-in'
        },
        off: {
            transitionProperty: 'transform, opacity',
            transitionDuration: '60ms',
            transitionTimingFunction: 'ease-out',
        }
    }
}

export default transitions;