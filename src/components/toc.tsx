import React    from "react";
import Link     from "./controls/link";
import styled   from "@emotion/styled";

type Item = {
    title:  string,
    url:    string,
    items?:  Item[]
};

type ToCProps = {
    id?:                string,
    className?:         string,
    highlight?:         boolean,
    data?: { items?:    Item[] }
}

const selectURIs = (items: Item[], result: string[] = []) => {
    for (let item of items) {
        result.push(item.url);
        if (item.items) {
            selectURIs(item.items, result);
        }
    }
    return result;
}

export function ToC(props: ToCProps) {
    const items = props.data && props.data.items;

    let first = null;
    if (props.highlight && items && items.length > 0) {
        first = items[0].url;
    }

    const [current, setCurrent] = React.useState(first);

    React.useLayoutEffect(() => {
        if (!props.highlight || !items || !items.length) { return; }

        // Client font size based target margin; If scrolled within 3rem above the target's position, the ToC will mark 
        // the target as being the current one.
        // 
        // TODO: This should probably be determined via 'theme' or the margin/padding of the target in question.
        // Alternatively, the ideal behavior would be to match `gatsby-remark-autolink-headers`'s offsetY setting, as
        // then the ToC and anchor links would be in exact sync. Unfortunately, this setting doesn't appear to work at
        // the time of writing.
        const margin = 3 * parseFloat(window.getComputedStyle(window.document.documentElement).fontSize);
        const targets = window.document.querySelectorAll<HTMLElement>(selectURIs(items).join(', '));

        const end = targets.length - 1;
        let pending = false;
        
        const updateCurrent = () => {
            const scrollOffset = window.scrollY + margin;

            let index = 0;
            while (index < end && scrollOffset > targets[index + 1].offsetTop) index++;

            setCurrent(`#${ targets[index].id }`);
            pending = false;
        }

        const handleScroll = () => {
            if (!pending) {
                window.requestAnimationFrame(updateCurrent);
                pending = true;
            }
        }

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const renderItem = (item: Item) => {
        return (
            <ToCLink to={ item.url } className={ current === item.url ? 'current' : undefined }>
                { item.title }
            </ToCLink>
        )
    }

    return (
        <div id={ props.id } className={ props.className }>
            { items && items.length > 0 && <List items={ items } renderItem={ renderItem } /> }
        </div>
    );
}

type ListProps = {
    items: Item[],
    renderItem: (item: Item) => JSX.Element,
    className?: string
}

function ListUnstyled(props: ListProps) {
    return (
        <ul className={ props.className }>
        { props.items.map((item, index) => (
            <li key={ index }>
                { props.renderItem(item) }
                { item.items && item.items.length > 0 && <ListUnstyled items={ item.items } renderItem={ props.renderItem } /> }
            </li>
        ))}
        </ul>
    )
}

const List = styled(ListUnstyled)(({ theme }) => ({
    fontSize: '0.9rem',

    '& > li > a': {
        fontWeight: 'bold',
        color: theme.palette.accents.light,
    },

    '& li': {
        margin: '0.5rem 0',
    }
}));

const ToCLink = styled(Link)(({theme}) => ({
    color:          theme.palette.accents.purple,
    display:        'inline-block',
    lineHeight:     '1.5rem',
    boxSizing:      'border-box',
    textDecoration: 'none',
    padding:        '0.25rem 0rem',

    '&:hover': {
        color: theme.palette.actions.primary.main,
    },
}));

export const PageToC = styled(ToC)({
    marginTop: '2.5rem',
    '& li li': {
        paddingLeft: '1.5rem',
    }
});

export const SidepanelToC = styled(ToC)(({theme}) => ({
    position:           'sticky',
    top:                '3rem',
    width:              '16rem',
    overflow:           'hidden',

    '& li li': {
        paddingLeft: '1.0625rem',
    },

    '& a': {
        borderLeft: `0.0625rem solid transparent`,
        paddingLeft: '1.0rem'
    },

    '& a.current': {
        color: theme.palette.accents.green,
        borderLeft: `0.0625rem solid ${ theme.palette.accents.green }`
    }
}));

export default ToC;