import React from "react";
import Link from '../controls/link';

import {
    HomeIcon,
    BookIcon,
    DocIcon,
    MailIcon,
} from "../graphics";

export function createNavMenu(
    ListComponent: React.ComponentType,
    ItemComponent: React.ComponentType,
) {
    return (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
        return (
            <nav { ...props }>
                <ListComponent>
                    <ItemComponent>
                        <Link to="/"><HomeIcon />Home</Link>
                    </ItemComponent>
                    <ItemComponent>
                        <Link to="/posts"><BookIcon />Posts</Link>
                    </ItemComponent>
                    <ItemComponent>
                        <Link to="/contact"><MailIcon />Contact</Link>
                    </ItemComponent>
                    <ItemComponent>
                        <Link to="/resume"><DocIcon />Resume</Link>
                    </ItemComponent>
                </ListComponent>
            </nav>
        );
    }
}

export default createNavMenu;