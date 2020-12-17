import React from "react";
import styled from "@emotion/styled";

type Item = {
    title:  string,
    url:    string,
    items?:  Item[]
};

type ToCProps = {
    className?: string;
    data?: { items?: Item[] };
}

function ItemList(props: { items: Item[] }) {
    return (
        <ul>
        { props.items.map((item, index) => (
            <li key={ index }>
                <a  href={ item.url }>{ item.title }</a>
                { item.items && item.items.length > 0 && <ItemList items={ item.items } /> }
            </li>
        ))}
        </ul>
    )
}

export function ToCUnstyled(props: ToCProps) {
    return (
        <div className={ props.className }>
            { props.data && props.data.items && <ItemList items={ props.data.items } /> }
        </div>
    );
}

export const ToC = styled(ToCUnstyled)(({ theme: { main: theme }}) => ({

}));

export default ToC;