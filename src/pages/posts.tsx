import React from "react";

import { Layout } from "../components/layout";
import { PageHeading, SectionHeading, ThematicBreak as Divider } from "../components/common";


import styled from "@emotion/styled";

export function PostsPage() {
    return (
        <Layout>
            <Content>
                <PageHeading>Many Ramblings:</PageHeading>

                <SectionHeading>December 2020</SectionHeading>

            </Content>
        </Layout>
    );
}

const Content = styled.div(({theme}) => ({
    
}));

export default PostsPage;