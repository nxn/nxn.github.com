import React from "react";
import styled from "@emotion/styled";

import graphics from "../../../images/graphics.svg";

type HeaderProps = {
    className?: string
};

export function HeaderUnstyled(props: HeaderProps) {
    return (
        <header id="resume-header" className={ props.className }>
            <div>
                <h1>Ernie Wieczorek</h1>
                <div className="sub-title">Computer Software Developer</div>
            </div>
            <ul id="contact">
                <li className="doc">
                    <a className="pdf" href="<%= require('./downloads/ewieczorek.pdf').default %>" target="_blank">
                        <svg className="icon">
                            <use href={ `${ graphics }#icon-doc` } />
                        </svg>
                        Download PDF
                    </a>
                </li>
                <li className="email">
                    <svg className="icon"><use href={ `${ graphics }#icon-mail` } /></svg>
                    <svg className="address"><use href={ `${ graphics }#mail-address` } /></svg>
                </li>
                <li className="web">
                    <a href="/">
                        <svg className="icon">
                            <use href={ `${ graphics }#icon-web` } />
                        </svg>
                        www.nxn.io
                    </a>
                </li>
                <li className="location">
                    <svg className="icon">
                        <use href={ `${ graphics }#icon-geo` } />
                    </svg>
                    Philadelphia, PA
                </li>
            </ul>
        </header>
    );
};

export const Header = styled(HeaderUnstyled)({

});

export default Header;