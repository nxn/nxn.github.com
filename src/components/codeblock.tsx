import React from 'react'
import styled from '@emotion/styled';
import Highlight, { Language, Prism } from 'prism-react-renderer';
import theme from '../themes/main/prism';

const Pre = styled.pre(({ theme }) => ({
    ...theme.styles.misc.pre, 
    padding: 0
}));

const Line = styled.div({
    display: 'table-row'
});

const LineNo = styled.span(({theme}) => ({
    display:            'table-cell',
    textAlign:          'right',
    padding:            '0 0.5rem',
    userSelect:         'none',
    color:              theme.palette.text.alternate.main,
    backgroundColor:    theme.palette.bgs.standard.main
}));

const LineContent = styled.span({
    display: 'table-cell',
    padding: '0 0.5rem'
});

type CodeBlockProps = {
    children:   string,
    className?: string,
}

export default (props: CodeBlockProps) => {
    const language = (props.className || '').replace(/language-/, '').toLowerCase();
    return (
        <Highlight Prism={ Prism } theme={ theme } code={ props.children.trim() } language={ language as Language }>
            { ({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={ className } style={ style }>
                    { tokens.map((line, i) => (
                        <Line key={ i } { ...getLineProps({ line, key: i }) }>
                            <LineNo>{ i + 1 }</LineNo>
                            <LineContent>
                                { line.map((token, key) => (
                                    <span key={key} { ...getTokenProps({token, key}) } />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                </Pre>
            ) }
        </Highlight>
    );
}