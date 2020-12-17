import React from 'react'
import Highlight, { Language, Prism } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/palenight';

type CodeBlockProps = {
    children:   string,
    className?: string,
}

export default (props: CodeBlockProps) => {
    const language = (props.className || '').replace(/language-/, '')
    return (
        <Highlight Prism={ Prism } theme={ theme } code={ props.children.trim() } language={ language as Language }>
            { ({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={ className } style={{ ...style }}>
                    { tokens.map((line, i) => (
                        <div key={i} { ...getLineProps({ line, key: i }) }>
                            {/* <span className="line-nr">{ i }: </span> */}
                            { line.map((token, key) => (
                                <span key={key} { ...getTokenProps({token, key}) } />
                            ))}
                        </div>
                    ))}
                </pre>
            ) }
        </Highlight>
    );
}