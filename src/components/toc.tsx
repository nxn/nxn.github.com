import React from "react";
import styled from "@emotion/styled";

type Item = {
    title:  string,
    url:    string,
    items?:  Item[]
};

type ToCProps = {
    id?: string,
    className?: string,
    data?: { items?: Item[] }
}

export function ToCUnstyled(props: ToCProps) {
    return (
        <div id={ props.id } className={ props.className }>
            <Header className="toc-header">Table of Contents</Header>
            { props.data && props.data.items && <ItemList items={ props.data.items } /> }
        </div>
    );
}

// Because this will be rendered within the post itself, external styles will be applied that should be undone here. Bit
// messy, but I don't see a better approach.
export const PageToC = styled(ToCUnstyled)(({ theme: { main: theme }}) => ({
    marginTop: '2.5rem',

    '& ul': {
        listStyle: 'none',
        margin: 0,
    },
    
    '& .toc-header': {
        borderBottom: 0
    }
}));

export const SidepanelToC = styled(ToCUnstyled)(({ theme: { main: theme }}) => ({
    position:           'sticky',
    top:                '3rem',
    width:              theme.tocWidth,
    overflow:           'hidden',
}));

const Header = styled.div(({ theme: { main: theme }}) => ({
    lineHeight: '2.5rem',
    textTransform: 'uppercase',
    //padding: '0 1rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    borderBottom: `0.0625rem dashed rgba(194, 194, 168, 0.5)`,
    //textAlign: 'center',
}));

function ItemListUnstyled(props: { items: Item[], className?: string }) {
    return (
        <ul className={ props.className }>
        { props.items.map((item, index) => (
            <li key={ index }>
                <a  href={ item.url }>{ item.title }</a>
                { item.items && item.items.length > 0 && <ItemListUnstyled items={ item.items } /> }
            </li>
        ))}
        </ul>
    )
}

const ItemList = styled(ItemListUnstyled)(({ theme: { main: theme }}) => ({
    margin:     0,
    //paddingLeft: '1rem',

    fontWeight: 'bold',
    '& ul': {
        paddingLeft: '2rem',
        fontWeight: 'normal',
    },
    

    '& li': {
        '& a': {
            color:          theme.palette.page.text,
            display:        'block',
            width:          'auto',
            height:         '2.5rem',
            lineHeight:     '2.5rem',
            boxSizing:      'border-box',
            //padding:        '0 1rem',
            overflow:       'hidden',
            whiteSpace:     'nowrap',
            textOverflow:   'ellipsis',
            textDecoration: 'none',
            fontSize:       '0.9rem',

            '&:hover': {
                color: theme.palette.box.text,
                //backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
        }
    }
}));

export default ToCUnstyled;