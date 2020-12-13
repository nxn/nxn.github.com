import React from "react";
import { PageProps } from "gatsby";


import { Error404Banner } from "../components/banner";
import Layout from "../components/layouts/nxn.io/layout";


export default function Error404Page(props: PageProps) {
    return <Layout variant="error" banner={ <Error404Banner /> } />;
}