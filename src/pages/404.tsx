import React from "react";
import Helmet from "react-helmet";
import { graphql, PageProps } from "gatsby";

import { Layout } from "../components/layout";
// import { Button, LinkButton, ButtonGroup } from "../components/controls/button";
// import { PageHeading } from "../components/common";

import { Error404Banner } from "../components/banner";

import styled from "@emotion/styled";

// import morpheus_png from "../images/morpheus.png";
// import morpheus_webp from "../images/morpheus.webp";

// function wonderland() { }

type Error404PageData = {
    site: {
        siteMetadata: {
            title: string
        }
    }
}

export function Error404Page(props: PageProps<Error404PageData>) {
    const meta = props.data.site.siteMetadata;
    return (
        <Layout>
            <Helmet>
                <title>Page not found · { meta.title }</title>
            </Helmet>
            <Error404Banner />
        </Layout>
    );
}

// export function Error404Page(props: PageProps<Error404PageData>) {
//     const meta = props.data.site.siteMetadata;
//     return (
//         <Layout variant={ Variant.Unpadded }>
//             <Helmet>
//                 <title>Page not found · { meta.title }</title>
//             </Helmet>
//             <Content>
//                 <div id="matrix-morpheus">
//                     <div id="matrix-text">
//                         <PageHeading id="heading">Page not found <span className="error">404</span></PageHeading>
//                         <span id="quote-intro">
//                             <span>This is your last chance. <br />After this, there is no turning back. </span>
//                         </span>
//                         <span id="quote-blue">
//                             <span><span className="blue">You take the blue pill </span><br />— the story ends, you wake up in your bed and believe whatever you want to believe. </span>
//                         </span>
//                         <span id="quote-red">
//                             <span><span className="red">You take the red pill </span><br />— you stay in Wonderland, and I show you how deep the rabbit hole goes. </span>
//                         </span>
//                         <span id="quote-outro">
//                             <span>Remember: all I'm offering is the truth. <br />Nothing more. </span>
//                         </span>
//                     </div>
//                     <ButtonGroup id="choice">
//                         <LinkButton color="secondary" to="/">Blue</LinkButton>
//                         <Button     color="primary"   onClick={ wonderland }>Red</Button>
//                     </ButtonGroup>
//                 </div>
//             </Content>
//         </Layout>
//     );
// }

// const Content = styled.div(({theme}) => ({
//     display:        'flex',
//     flexFlow:       'column nowrap',
//     alignItems:     'center',

//     '& .error': {
//         color: theme.palette.error.main
//     },

//     '& #matrix-morpheus': {
//         padding:            '0 2rem',
//         marginTop:          '1rem',
//         backgroundImage:    `url("${ morpheus_webp }")`,
//         backgroundSize:     'contain',
//         backgroundRepeat:   'no-repeat',
//         backgroundPosition: 'bottom center',
//     },

//     '& #matrix-text': {
//         color:              theme.palette.text.standard.main,
//         maxWidth:           '48rem',
//         padding:            '0.5rem 1rem',
//         margin:             '0 -1rem',
//         marginBottom:       '1rem',
//         borderRadius:       '0.5rem',
//         backgroundColor:    'rgba(5,7,11,0.8)',

//         '& #heading': { paddingBottom: '1rem' },
//         '& br': { display: 'none' },
//     },

//     '& #choice': {
//         paddingBottom:  '1rem',
//         '& > *':        { width: '5rem' },
//     },

//     [theme.mediaQueries.standard]: {
//         '& #matrix-morpheus': {
//             padding: `0 ${ theme.spacing.margins.horizontal }`,
//         },

//         '& #choice':                { paddingBottom: '2rem' },

//         '& #matrix-text': {
//             display:                'grid',
//             gap:                    '2rem',
            
//             justifyContent:         'space-between',
//             alignItems:             'center',
//             gridTemplateColumns:    '1fr 1fr',
//             padding:                0,
//             borderRadius:           0,
//             marginBottom:           '2rem',
//             backgroundColor:        'initial',

//             '& #quote-intro > span, & #quote-outro > span, & #quote-red > span, & #quote-blue > span': {
//                 display:            'inline-block',
//                 padding:            '0.5rem 1rem',
//                 borderRadius:       '0.5rem',
//                 backgroundColor:    'rgba(5,7,11,0.8)',
//                 textAlign:          'center'
//             },

//             '& #heading': {
//                 gridArea:           'heading',
//                 justifySelf:        'flex-start',
//                 padding:            '0.5rem 1rem',
//                 borderRadius:       '0.5rem',
//                 backgroundColor:    'rgba(19,12,23,0.8)'
//             },

//             '& br':                 { display: 'initial' },

//             '& #quote-intro': {
//                 gridArea:           'quote-intro',
//                 fontSize:           '0.9rem',
//                 justifySelf:        'flex-end'
//             },
//             '& #quote-outro': {
//                 gridArea:           'quote-outro',
//                 fontSize:           '0.9rem',
//                 justifySelf:        'center'
//             },
//             '& #quote-red': { 
//                 gridArea: 'quote-red',
//                 color: theme.palette.text.standard.light
//             },
//             '& #quote-blue': { 
//                 gridArea: 'quote-blue',
//                 color: theme.palette.text.standard.light
//             },

//             '& #quote-red .red':    { color: theme.palette.accents.red },
//             '& #quote-blue .blue':  { color: theme.palette.accents.blue },

//             gridTemplateAreas: `
//                 "heading        heading"
//                 "quote-intro    quote-intro"
//                 "quote-blue     quote-red"
//                 "quote-outro    quote-outro"
//             `,
//         }
//     }
// }));

export default Error404Page;

export const query = graphql`query {
    site {
        siteMetadata {
            title
        }
    }
}`;