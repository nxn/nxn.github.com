/// A very basic MDX component renderer.
/// The `MDXRenderer` component provided by Gatsby only works for MDX that has been compiled and processed through
/// Gatsby's own MDX integration code. MDX data that has been compiled separately/externally has to use its own means
/// of rendeing the content in React. For most common cases the following method should work just fine.
import React from "react"
import { mdx } from '@mdx-js/react';

type MdxProps = {
    children: React.ReactNode
}

export const Mdx = React.memo((props: MdxProps) => {
	const scope = { mdx };
	
    const fn = new Function(
        'React',
        ...Object.keys(scope),
        `${ props.children }; return React.createElement(MDXContent)`
	);

	return fn(React, ...Object.values(scope));
});

export default Mdx;