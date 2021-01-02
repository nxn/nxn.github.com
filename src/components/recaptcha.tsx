import React, { MutableRefObject }  from "react";
import styled                       from "@emotion/styled";
import { Helmet }                   from "react-helmet";

const global = (window as { [key: string]: any });

type RecaptchaProps = {
    siteKey:            string,
    callback:           (recaptchaResponseToken: string) => void,
    expiredCallback?:   () => void,
    errorCallback?:     () => void,
    tabIndex?:          number,
    isolated?:          boolean,
    theme?:             'light' | 'dark',
    badge?:             'bottomleft' | 'bottomright' | 'inline',
    size?:              'invisible',
    onReady?:           (widgetId: number) => void;
}

export interface RecaptchaAPI {
    execute:        (widgetId?: number) => void;
    reset:          (widgetId?: number) => void;
    getResponse:    (widgetId?: number) => unknown;
}

export const Recaptcha = React.forwardRef<RecaptchaAPI, RecaptchaProps>((props: RecaptchaProps, ref) => {
    const apiRef = ref as MutableRefObject<RecaptchaAPI | null>;
    const containerRef  = React.useRef<HTMLDivElement | null>(null);

    global['recaptchaLoadHandler'] = function() {
        const api = global['grecaptcha'];

        if (apiRef) { apiRef.current = api; }

        const result = api.render(containerRef.current, {
            sitekey:            props.siteKey,
            callback:           props.callback,
            errorCallback:      props.errorCallback,
            expiredCallback:    props.expiredCallback,
            tabIndex:           props.tabIndex  || 0,
            isolated:           props.isolated  || false,
            theme:              props.theme     || "dark",
            badge:              props.badge     || "bottomleft",
            size:               props.size      || "invisible",
        });

        if (props.onReady) {
            props.onReady(result);
        }
    }

    return <>
        <Helmet>
            <script src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoadHandler&render=explicit" async defer></script>
        </Helmet>
        <BadgeContainer ref={ containerRef } />
    </>
});

const BadgeContainer = styled.div({
    '& .grecaptcha-badge': {
        boxShadow: 'rgba(0,0,0,0.66) 0px 0px 5px !important'
    }
});

export default Recaptcha;