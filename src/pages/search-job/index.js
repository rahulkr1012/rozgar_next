import constant from 'constant'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { capFirstLetterInSentence } from 'utils'
import Loader from 'components/Loader'
let MainSearch = dynamic(() => import('components/JobList/mainSearch'), { loading: () => <Loader />, ssr: false })
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import dynamic from 'next/dynamic'

const index = (props) => {

    const [state, setstate] = React.useState({
        ud: props.ud
    });

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="HandheldFriendly" content="True" />
             
                <link rel="canonical" href={"https://rozgar.com" + props.url} />
                <meta name="referrer" content="no-referrer-when-downgrade" />

                <meta property="og:site_name" content="Rozgar.com" />
                <meta property="og:title" content={props.title} />
               
                <meta
                    property="og:url"
                    content={"https://rozgar.com" + props.url}
                />
                <meta
                    property="og:image"
                    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
                />
                <meta property="og:image:width" content="4000" />
                <meta property="og:image:height" content="6000" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.title} />
              
                <meta
                    name="twitter:url"
                    content={"https://rozgar.com" + props.url}
                />
                <meta
                    name="twitter:image"
                    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
                />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Smita Nag" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content="Career Advice, Career Insights" />
                <meta name="twitter:site" content="@rozgar_india" />
            </Head>

            <FilteredHeader ud={state.ud} />
            <MainSearch />
        </React.Fragment>
    )
}

export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)
    let url = context.req.headers.host + context.resolvedUrl
    let qParam = context.query
    let title = ''
    const LOCATION = qParam?.location ? qParam?.location.split(',') : null
    if (LOCATION) {
        title = `${qParam.keyword} Jobs in ${LOCATION} - Rozgar.com`
    } else {
        title = `${qParam.keyword} Jobs - Rozgar.com`
    }
    return {
        props: {
            url,
            title,
            ud
        }
    }

}
export default index
