import React                from 'react';
import { ThemeProvider }    from "@emotion/react";
import { MDXProvider }      from '@mdx-js/react';

import { theme }            from "./theme";
import CodeBlock            from "./codeblock";

const components = {
    pre:    (props: any) => <div { ...props } />,
    code:   CodeBlock
};

export default ({ element }: { element: any }) => (
    <ThemeProvider theme={ theme }>
        <MDXProvider components={ components }>
            { element }
        </MDXProvider>
    </ThemeProvider>
);