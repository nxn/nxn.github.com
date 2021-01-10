
import React from "react"
import { mdx } from '@mdx-js/react';

type MdxProps = {
    children: React.ReactNode
}

export const Mdx = (props: MdxProps) => {
	const scope = { mdx };
	
    const fn = new Function(
        'React',
        ...Object.keys(scope),
        `${ props.children }; return React.createElement(MDXContent)`
	);

	return fn(React, ...Object.values(scope));
}

export default Mdx;