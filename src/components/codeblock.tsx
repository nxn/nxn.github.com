import React from 'react'
import styled from '@emotion/styled';
import Highlight, { Language, Prism } from 'prism-react-renderer';
import theme from '../themes/main/prism';

import { useDispatch } from 'react-redux';

import { asHideable } from "./hideable";
import { alert } from "../state/snackbar";
import Button from './controls/button';
import { CopyIcon } from "./graphics/icons";

const Pre = styled.pre(({ theme }) => ({
    ...theme.styles.misc.pre,

    // Following properties are reset and applied by the wrapping element instead
    padding:    0,
    margin:     0,
    border:     0
}));

const CodeWrap = styled.div(({theme}) =>({
    position:   'relative',
    overflow:   'hidden',
    margin:     theme.styles.misc.pre.margin,
    border:     theme.styles.misc.pre.border
}));

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

const Tools = styled.span({
    position:           'absolute',
    top:                0,
    right:              0,
    padding:            '0.25rem',
    backgroundColor:    'rgba(5,7,11,0.8)'
});

const HideableTools = asHideable(Tools, { animation: 'slide', direction: 'right' });

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
    const [toolsVisible, setToolsVisible] = React.useState(false);

    const language = (props.className || '').replace(/language-/, '').toLowerCase();
    const code = props.children.trim();

    const showTools = () => {
        setToolsVisible(true);
    }

    const hideTools = () => {
        setToolsVisible(false);
    }

    const copySuccess   = () => dispatch(alert({ type: "success", message: "Copied!" }));
    const copyError     = () => dispatch(alert({ type: "error", message: "Could not copy" }));
    const copy = (code: string) => {
        navigator.clipboard.writeText(code).then(copySuccess, copyError);
    }
    
    return (
        <CodeWrap>
            <Highlight Prism={ Prism } theme={ theme } code={ code } language={ language as Language }>
                { ({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={ className } style={ style } onMouseEnter={ showTools } onMouseLeave={ hideTools }>
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
            <HideableTools visible={ toolsVisible } onMouseEnter={ showTools } onMouseLeave={ hideTools }>
                <CopyButton onClick={ () => copy(code) }>
                    <CopyIcon />
                </CopyButton>
            </HideableTools>
        </CodeWrap>
    );
}