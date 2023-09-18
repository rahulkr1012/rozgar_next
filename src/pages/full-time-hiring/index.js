import Head from 'next/head'
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'

const Fulltimehiring = dynamic(() => import('components/employerServices/Fulltimehiring'), {
    loading: () => <Loader />,
    ssr: false
});

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { ud } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title >Full-Time Hiring Services in India - Rozgar.com</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Rozgar.com provides full-time hiring services for its clients. Contact Rozgar.com to hire talented employees for your organization."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Full Time Hiring | Rozgar.com"} />
                    <meta property="og:description" content={"Rozgar.com provides full-time hiring services for its clients. Contact Rozgar.com to hire talented employees for your organization."} />
                    <meta property="og:url" content={"https://rozgar.com/full-time-hiring"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Full Time Hiring | Rozgar.com"} />
                    <meta name="twitter:description" content={"Rozgar.com provides full-time hiring services for its clients. Contact Rozgar.com to hire talented employees for your organization."} />
                    <meta name="twitter:url" content={"https://rozgar.com/full-time-hiring"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href="https://rozgar.com/full-time-hiring" />

                </Head>
                <FilteredHeader ud={ud} />

                <Fulltimehiring />

            </React.Fragment>

        )
    }
}



export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)

    return {
        props: {
            ud: ud
        }
    }


}
