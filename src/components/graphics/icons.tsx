import React from "react";
import styled from "@emotion/styled";
import Svg, { SvgProps } from "./svg";
import clsx from "clsx";

export const MenuIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) } viewBox="0 0 32 24">
        <rect x="2" y="2" width="28" height="2"/>
        <rect x="2" y="11" width="28" height="2"/>
        <rect x="2" y="20" width="28" height="2"/>
    </Svg>
));

export const MailIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M18.6,4H5.4C3.5,4,2,5.5,2,7.4v9.2C2,18.5,3.5,20,5.4,20h13.2c1.9,0,3.4-1.5,3.4-3.4V7.4C22,5.5,20.5,4,18.6,4z M5.4,6h13.2
            c0.5,0,0.9,0.2,1.2,0.6l-7.2,4.8c-0.3,0.2-0.8,0.2-1.1,0L4.2,6.6C4.5,6.2,4.9,6,5.4,6z M18.6,18H5.4C4.6,18,4,17.4,4,16.6V8.9
            l6.3,4.2c0.5,0.3,1.1,0.5,1.7,0.5s1.2-0.2,1.7-0.5L20,8.9v7.7C20,17.4,19.4,18,18.6,18z"/>
    </Svg>
));

export const GeoIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M11.9,2.1c-4,0-8,3-8,8c0,6,8,12,8,12s8-6,8-12C19.9,5.2,15.9,2.1,11.9,2.1z M11.9,16.1c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6
            s6,2.7,6,6C17.9,13.4,15.2,16.1,11.9,16.1z"/>
        <circle cx="11.9" cy="10.1" r="2"/>
    </Svg>
));

export const DocIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M15.4,10.2c-2,0-3.6-1.6-3.6-3.6V2.1H7c-1.7,0-3.1,1.4-3.1,3.1V19c0,1.7,1.4,3.1,3.1,3.1h9.8c1.7,0,3.1-1.4,3.1-3.1v-8.8
            H15.4z M17.9,19c0,0.6-0.5,1.1-1.1,1.1H7c-0.6,0-1.1-0.5-1.1-1.1V5.2c0-0.6,0.5-1.1,1.1-1.1h2.8v2.5c0,3.1,2.5,5.6,5.6,5.6h2.5V19z"/>
        <path d="M15.2,8.4h4.5l-6.1-6.1v4.5C13.5,7.7,14.3,8.4,15.2,8.4z"/>
    </Svg>
));

export const LinkIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M12.8,17.8c-0.7,0-1.5-0.1-2.3-0.4l-0.1,0l-0.8,0.8c-0.5,0.5-1.2,0.8-2,0.8s-1.5-0.3-2-0.8c-0.5-0.5-0.8-1.2-0.8-2
            c0-0.8,0.3-1.5,0.8-2.1l2.8-2.8c0.4-0.4,0.9-0.6,1.5-0.7c0.7-0.1,1.3,0,1.9,0.3l0,0c0.2,0.1,0.5,0.2,0.6,0.4
            c0.2,0.2,0.3,0.4,0.5,0.7l0,0.1l0.1,0c0.2-0.1,0.4-0.1,0.5-0.3l1.2-1.2l-0.1-0.1c-0.2-0.3-0.4-0.6-0.6-0.8c-0.2-0.2-0.5-0.5-0.8-0.6
            c-0.6-0.4-1.3-0.7-2.1-0.8l0,0c-0.2,0-0.5-0.1-0.7-0.1C9.7,8.1,9,8.3,8.2,8.6c-0.6,0.3-1,0.6-1.4,1L4,12.5c-1,1-1.5,2.2-1.5,3.6
            c0,1.4,0.5,2.7,1.5,3.6c0.9,0.9,2.2,1.4,3.6,1.4c0,0,0,0,0,0c1.4,0,2.7-0.5,3.6-1.4l2-1.9L12.8,17.8C12.9,17.8,12.8,17.8,12.8,17.8z
            "/>
        <path d="M19.2,4.4L19.2,4.4c-1-1-2.3-1.5-3.6-1.5C14.2,3,13,3.5,12,4.4l-1.9,1.9l0.3,0c0,0,0,0,0.1,0c0.8,0,1.5,0.1,2.3,0.4l0.1,0
            L13.6,6c0.5-0.5,1.3-0.8,2-0.8c0,0,0,0,0,0c0.8,0,1.5,0.3,2,0.8c0.5,0.5,0.8,1.3,0.8,2s-0.3,1.5-0.8,2l-2.8,2.8
            c-0.4,0.4-0.8,0.6-1.5,0.7c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0.1-0.4,0.1c-0.4,0-0.9-0.1-1.3-0.4l0,0c-0.2-0.1-0.5-0.3-0.7-0.4
            c-0.2-0.2-0.3-0.4-0.4-0.6l-0.1-0.1l-0.1,0c-0.2,0.1-0.4,0.2-0.5,0.3l-1.2,1.2l0.1,0.1c0.2,0.3,0.4,0.6,0.7,0.8
            c0.2,0.2,0.5,0.5,0.8,0.6c0.6,0.4,1.3,0.6,2.2,0.7c0.2,0,0.4,0,0.7,0c0.8,0,1.5-0.2,2.2-0.5c0.6-0.3,1-0.6,1.4-1l2.8-2.8
            C21.2,9.7,21.2,6.4,19.2,4.4z"/>
    </Svg>
))

export const SendIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <polygon points="3 12 8.61 14.992 17 8 9 17.455 9 21 12.164 16.887 18 20 21 3 3 12"/>
    </Svg>
));

export const TrashIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) } viewBox="0 0 512 512">
        <path d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31
            h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13
            c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z"/>
        <path d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8
            l18.7-242.6C396.8,178.1,396,176,379.4,176z"/>
    </Svg>
));

export const GithubIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) } viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21
            1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
            2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0
            3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </Svg>
));

export const SuccessIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        {/* <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /> */}
    </Svg>
));

export const ErrorIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        {/* <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /> */}
    </Svg>
));

export const InfoIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        {/* <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /> */}
    </Svg>
));

export const WarnIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        {/* <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /> */}
    </Svg>
));

export const CopyIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
    </Svg>
));

export const HomeIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) } viewBox="0 0 32 32">
        <path stroke="currentcolor" strokeWidth="1" d="M18.12,2.88a3.08,3.08,0,0,0-4.24,0L1.29,15.46l1.42,1.42L5,14.59V27a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V14.59l2.29,2.29,1.42-1.42ZM14,28V21h4v7Zm11-1a1,1,0,0,1-1,1H20V19H12v9H8a1,1,0,0,1-1-1V12.59l8.29-8.3a1,1,0,0,1,1.42,0L25,12.59Z"/>
    </Svg>
));

export const BookIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path style={{fill:'none'}} stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"/>
    </Svg>
));

export const ChevronIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M9.6,18.9c-0.3,0-0.6-0.1-0.8-0.3c-0.5-0.5-0.5-1.2,0-1.6l5-5l-5-5c-0.5-0.5-0.5-1.2,0-1.6 c0.5-0.5,1.2-0.5,1.6,0L17,12l-6.6,6.6C10.2,18.8,9.9,18.9,9.6,18.9z"/>
    </Svg>
));

export const DownloadIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </Svg>
));

export const DownArrowIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M22,11.8h-5.7V3.2H7.7v8.6H2l10,10L22,11.8z"/>
    </Svg>
));

export const CloseIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <polygon points="19.8,5.6 18.4,4.2 12,10.6 5.6,4.2 4.2,5.6 10.6,12 4.2,18.4 5.6,19.8 12,13.4 18.4,19.8 19.8,18.4 13.4,12 "/>
    </Svg>
));

export const ZoomInIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M20.9,18.8l-2.1-2.1c0,0-0.1-0.1-0.2-0.1c0.9-1.3,1.4-2.9,1.4-4.5c0-4.4-3.6-8-8-8s-8,3.6-8,8c0,4.4,3.6,8,8,8
            c1.9,0,3.7-0.7,5.1-1.8c0,0,0,0,0,0.1l2.1,2.1c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3C21.3,19.9,21.3,19.2,20.9,18.8z M12,18
            c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18z"/>
        <polygon points="15,11 13,11 13,9 11,9 11,11 9,11 9,13 11,13 11,15 13,15 13,13 15,13 "/>
    </Svg>
));

export const ZoomOutIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M20.9,18.8l-2.1-2.1c0,0-0.1-0.1-0.2-0.1c0.9-1.3,1.4-2.9,1.4-4.5c0-4.4-3.6-8-8-8s-8,3.6-8,8c0,4.4,3.6,8,8,8
            c1.9,0,3.7-0.7,5.1-1.8c0,0,0,0,0,0.1l2.1,2.1c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3C21.3,19.9,21.3,19.2,20.9,18.8z M12,18
            c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18z"/>
        <rect x="11" y="9" transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 24 1.776357e-15)" width="2" height="6"/>
    </Svg>
));

export const ZoomToFitIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M4,15H2v2c0,1.6,1.3,3,3,3h3v-2H5c-0.6,0-1-0.5-1-1V15z M2,7v2h2V7.1C4,6.5,4.5,6,5.1,6H8V4H5C3.4,4,2,5.4,2,7z M20,15v2
            c0,0.6-0.4,1-1,1h-3v2h3.1c1.6,0,2.9-1.3,2.9-2.9V15H20z M16,4v2h2.9C19.5,6,20,6.5,20,7.1V9h2V7c0-1.6-1.3-3-3-3H16z"/>
        <polygon points="16,11 13,11 13,8 11,8 11,11 8,11 8,13 11,13 11,16 13,16 13,13 16,13 "/>
    </Svg>
));

export const FullscreenIcon = React.memo((props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) }>
        <path d="M14,4v2h4v4h2V4H14z M6,14H4v6h6v-2H6V14z"/>
        <rect x="15" y="4.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 10.3431 -8.9706)" width="2" height="7.1"/>
        <rect x="6.8" y="13.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 13.7604 -0.7206)" width="2" height="6.4"/>
    </Svg>
));

const Spinner = (props: SvgProps) => (
    <Svg { ...props } className={ clsx('icon', props.className) } viewBox="0 0 66 66">
        <circle fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="24"></circle>
    </Svg>
);

const SpinnerAnimated = styled(Spinner)(() => {
    const offset = 150;
    const duration = "1.4s";

    return {
        animation: `rotator ${ duration } linear infinite`,

        '@keyframes rotator': {
            '0%':   { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(270deg)' }
        },

        '& circle': {
            stroke:             'currentcolor',
            strokeDasharray:    offset,
            strokeDashoffset:   0,
            transformOrigin:    'center',
            animation:          `dash ${ duration } ease-in-out infinite`,
        },

        '@keyframes dash': {
            '0%': { strokeDashoffset: offset },
            '50%': {
                strokeDashoffset: offset/4,
                transform: 'rotate(135deg)'
            },
            '100%': {
                strokeDashoffset: offset,
                transform: 'rotate(450deg)'
            }
        }
    }
});

export const SpinnerIcon = React.memo(SpinnerAnimated);