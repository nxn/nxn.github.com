import React from "react";
import { useDispatch } from 'react-redux';

import { Layout } from "../components/layout";
import { Button, ButtonGroup } from "../components/controls/button";
import { PageHeading, SectionHeading, ThematicBreak as Divider } from "../components/common";


import { alert, SnackbarItemType } from "../state/snackbar";

import styled from "@emotion/styled";

export function TestPage() {
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const type = event.currentTarget.dataset.type as SnackbarItemType;
        const minimal = !!event.currentTarget.dataset.minimal;

        const actions = [];
        let message = "Some Alert Text";
        //let message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

        if (!minimal) {
            actions.push({ name: "Ok", action: null })
        }

        dispatch(alert({
            type,
            message,
            duration: 10000,
            actions
        }));
    }
    return (
        <Layout>
            <Content>
                <PageHeading>Test &amp; Demo Page</PageHeading>
                
                <Divider />

                <SectionHeading>Minimal</SectionHeading>
                <ButtonGroup>
                    <Button onClick={ handleClick } data-type="info"    data-minimal="true">Info</Button>
                    <Button onClick={ handleClick } data-type="success" data-minimal="true">Success</Button>
                    <Button onClick={ handleClick } data-type="warning" data-minimal="true">Warning</Button>
                    <Button onClick={ handleClick } data-type="error"   data-minimal="true">Error</Button>
                </ButtonGroup>

                <Divider />

                <SectionHeading>Multi-Choice</SectionHeading>
                <ButtonGroup>
                    <Button onClick={ handleClick } data-type="info"    color="secondary">Info</Button>
                    <Button onClick={ handleClick } data-type="success" color="secondary">Success</Button>
                    <Button onClick={ handleClick } data-type="warning" color="secondary">Warning</Button>
                    <Button onClick={ handleClick } data-type="error"   color="secondary">Error</Button>
                </ButtonGroup>
            </Content>
        </Layout>
    );
}

const Content = styled.div(({theme}) => ({
    
}));

export default TestPage;