import React from "react";
import { PageProps } from "gatsby";


import { WelcomeBanner } from "../components/layouts/nxn.io/banner";
import Layout from "../components/layouts/nxn.io/layout";


export default function IndexPage(props: PageProps) {
    return (
        <Layout banner={ <WelcomeBanner /> }>
            Hello World
        </Layout> 
    );
}