import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/resume/layout";

type ResumeData = {
    mdx: {
        id:     string,
        body:   string,
        frontmatter: {
            title:  string,
        }
    }
}

type ResumePageProps = {
    className?: string,
    data:       ResumeData
}

export function ResumePage(props: ResumePageProps) {
    const resume = props.data.mdx;
    return (
        <Layout>
            <MDXRenderer title={ resume.frontmatter.title }>
                { resume.body }
            </MDXRenderer>
        </Layout>
    );
}

export default ResumePage;

export const query = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            id
            body
            frontmatter {
                title
            }
        }
    }
`;