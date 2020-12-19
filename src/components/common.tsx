import React from "react";
import styled from "@emotion/styled";
import CodeBlock from "./codeblock";

export const PageHeading    = styled.h1(({theme})       => theme.styles.headings.page);
export const SectionHeading = styled.h2(({theme})       => theme.styles.headings.section);
export const ContentHeading = styled.h3(({theme})       => theme.styles.headings.content);
export const SubHeading1    = styled.h4(({theme})       => theme.styles.headings.sub1);
export const SubHeading2    = styled.h5(({theme})       => theme.styles.headings.sub2);
export const SubHeading3    = styled.h6(({theme})       => theme.styles.headings.sub3);

export const Bold           = styled.strong(({theme})   => theme.styles.text.bold);
export const Italic         = styled.em(({theme})       => theme.styles.text.italic);
export const Anchor         = styled.a(({theme})        => theme.styles.text.anchor);
export const Paragraph      = styled.p(({theme})        => theme.styles.text.paragraph);
export const InlineCode     = styled.code(({theme})     => theme.styles.text.code);

export const UnorderedList  = styled.ul(({theme})       => theme.styles.lists.unordered);
export const OrderedList    = styled.ol(({theme})       => theme.styles.lists.ordered);
export const ListItem       = styled.li(({theme})       => theme.styles.lists.item);

export const ThematicBreak  = styled.hr(({theme})       => theme.styles.misc.hr);
export const Pre            = styled.pre(({theme})      => theme.styles.misc.pre);

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
    inlineCode: InlineCode,
    ul:         UnorderedList,
    ol:         OrderedList,
    li:         ListItem,
    hr:         ThematicBreak,
    pre:        styled.div(({theme}) => theme.styles.misc.pre),
    code:       CodeBlock
}