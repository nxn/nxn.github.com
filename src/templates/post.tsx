import React from "react";
import { PageProps, graphql } from "gatsby";

import Layout from "../components/layouts/nxn.io/layout";

type PostPageProps = {
    className?: string
};

type PostPageData = {
    markdownRemark: {
        html: string,
        frontmatter: {
            title: string
        }
    }
}

export default function PostPage(props: PostPageProps & PageProps<PostPageData>) {
    const post = props.data.markdownRemark;
    return (
        <Layout>
            <article id="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
    );
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;