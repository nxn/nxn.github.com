import React from "react";
import styled from "@emotion/styled";

import CodeBlock from "./codeblock";
import Link from "./controls/link";
import { Gallery, GalleryItem } from "./gallery";
import Summary from "./summary";

// CodeBlock (more specifically, prism-react-renderer) creates its own `pre` block. To prevent it from getting nested
// within the `pre` block created by MDXRenderer, this PassThrough component is used.
const PassThrough = (props: { children: React.ReactNode }) => props.children;

// Set Styles
export const PageHeading    = styled.h1(({theme})           => theme.styles.headings.page);
export const SectionHeading = styled.h2(({theme})           => theme.styles.headings.section);
export const ContentHeading = styled.h3(({theme})           => theme.styles.headings.content);
export const SubHeading1    = styled.h4(({theme})           => theme.styles.headings.sub1);
export const SubHeading2    = styled.h5(({theme})           => theme.styles.headings.sub2);
export const SubHeading3    = styled.h6(({theme})           => theme.styles.headings.sub3);

export const Bold           = styled.strong(({theme})       => theme.styles.text.bold);
export const Italic         = styled.em(({theme})           => theme.styles.text.italic);
export const Anchor         = styled(Link)(({theme})        => theme.styles.text.anchor);
export const Paragraph      = styled.p(({theme})            => theme.styles.text.paragraph);
export const Blockquote     = styled.blockquote(({theme})   => theme.styles.text.blockquote);
export const InlineCode     = styled.code(({theme})         => theme.styles.text.code);

export const UnorderedList  = styled.ul(({theme})           => theme.styles.lists.unordered);
export const OrderedList    = styled.ol(({theme})           => theme.styles.lists.ordered);
export const ListItem       = styled.li(({theme})           => theme.styles.lists.item);

export const ThematicBreak  = styled.hr(({theme})           => theme.styles.misc.hr);
export const Pre            = styled.pre(({theme})          => theme.styles.misc.pre);

// Default export is meant to be in a format that is consumable by an MDXProvider
export default {
    h1:         PageHeading,
    h2:         SectionHeading,
    h3:         ContentHeading,
    h4:         SubHeading1,
    h5:         SubHeading2,
    h6:         SubHeading3, 
    strong:     Bold,        
    em:         Italic,
    a:          Anchor,
    p:          Paragraph,
    blockquote: Blockquote,
    inlineCode: InlineCode,
    ul:         UnorderedList,
    ol:         OrderedList,
    li:         ListItem,
    hr:         ThematicBreak,
    pre:        PassThrough,
    code:       CodeBlock,

    Summary,
    Gallery,
    GalleryItem,
}