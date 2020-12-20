import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import { PageHeading } from "../components/common";
import { Button, ButtonGroup } from "../components/button";

export function ContactPage() {
    return (
        <Layout>
            <Content>
                <PageHeading>Send <span className="accent">Ernie</span> a message:</PageHeading>
                <br />
                <Email>
                    <Subject
                        type="text" 
                        name="subject" 
                        placeholder="Subject" />

                    <Message 
                        name="message" 
                        rows={ 5 } 
                        placeholder="Message" />

                    <Address
                        type="text" 
                        name="address" 
                        placeholder="Your email" />
                        
                    <Actions>
                        <Button color="primary">
                            Send
                        </Button>
                        <Button color="secondary">
                            Clear
                        </Button>
                    </Actions>
                </Email>
            </Content>
        </Layout>
    );
}

const Content = styled.div(({ theme }) => ({
    maxWidth:   '48rem',
    margin:     '0 auto',
    '& .accent': {
        color: theme.palette.accents.green
    },
}));

const Email = styled.form({
    display:    'grid',
    gap:        '1rem',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
        "subject subject"
        "message message"
        "address actions"
    `,
});

const Subject = styled.input(({ theme }) => ({
    gridArea: 'subject',
    ...theme.styles.controls.textbox
}));

const Message = styled.textarea(({ theme }) => ({
    gridArea:   'message',
    resize:     'vertical',
    minHeight:  '10rem',
    ...theme.styles.controls.textbox
}));

const Address = styled.input(({ theme }) => ({
    gridArea: 'address',
    ...theme.styles.controls.textbox
}));

const Actions = styled(ButtonGroup)({
    gridArea: 'actions',
    alignSelf: 'center'
});

export default ContactPage;