import React    from "react";
import Link     from '../controls/link';

import {
    HomeIcon,
    BookIcon,
    DocIcon,
    MailIcon,
} from "../graphics";

export function createNavMenu(
    ListComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>>,
    ItemComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>>,
) {
    return (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
        return (
            <nav { ...props } aria-label="Main Navigation">
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