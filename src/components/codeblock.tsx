import React from 'react'
import styled from '@emotion/styled';
import Highlight, { Language, Prism } from 'prism-react-renderer';
import theme from '../themes/main/prism';

import { useDispatch } from 'react-redux';

import { alert } from "../state/snackbar";
import Button from './controls/button';
import { CopyIcon } from "./graphics/icons";

const Pre = styled.pre(({ theme }) => ({
    ...theme.styles.misc.pre,
    padding: 0,
}));

const CodeWrap = styled.div({
    position: 'relative',

    '&:hover .code-tools': {
        display: 'block'
    }
});

const Line = styled.div({
    display:                'table-row',
    '&:first-of-type > *':  { paddingTop:       '0.5rem' },
    '&:last-of-type > *':   { paddingBottom:    '0.5rem' }
});

const LineNo = styled.span(({theme}) => ({
    display:            'table-cell',
    textAlign:          'right',
    padding:            '0 0.75rem',
    userSelect:         'none',
    color:              theme.palette.text.alternate.main,
    backgroundColor:    theme.palette.bgs.standard.main
}));

const LineContent = styled.span({
    display: 'table-cell',
    padding: '0 1rem'
});

const Tools = styled.span(({theme}) => ({
    display:            'none',
    position:           'absolute',
    top:                '0.0625rem',
    right:              '0.0625rem',
    padding:            '0.25rem',
    backgroundColor:    'rgba(5,7,11,0.8)'
}));

const CopyButton = styled.button(({theme}) => ({
    width:              '2.25rem',
    height:             '2.25rem',
    color:              theme.palette.actions.secondary.main,
    backgroundColor:    'transparent',
    textAlign:          'center',
    padding:            0,
    border:             0,
    borderRadius:       '0.25rem',

    '& > .icon': {
        width:          '1.25rem',
        height:         '1.25rem',
        verticalAlign:  'middle'
    },
    '&:hover': {
        color: theme.palette.actions.secondary.light,
        backgroundColor: theme.palette.bgs.secondary.dim
    },
    '&:focus': {
        outline: 0,
        border: `0.125rem solid ${ theme.palette.bgs.secondary.main }`,
        backgroundColor: theme.palette.bgs.secondary.dim
    },

    ...theme.transitions.click.off,
    '&:focus:active': theme.transitions.click.on,
}));

type CodeBlockProps = {
    children:   string,
    className?: string,
}

export default (props: CodeBlockProps) => {
    const dispatch = useDispatch();
    const language = (props.className || '').replace(/language-/, '').toLowerCase();
    const code = props.children.trim();

    const copySuccess   = () => dispatch(alert({ type: "success", message: "Copied!" }));
    const copyError     = () => dispatch(alert({ type: "error", message: "Could not copy" }));
    const copy = (code: string) => {
        navigator.clipboard.writeText(code).then(copySuccess, copyError);
    }
    
    return (
        <CodeWrap>
            <Highlight Prism={ Prism } theme={ theme } code={ code } language={ language as Language }>
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
            <Tools className="code-tools">
                <CopyButton onClick={ () => copy(code) }>
                    <CopyIcon />
                </CopyButton>
            </Tools>
        </CodeWrap>
    );
}