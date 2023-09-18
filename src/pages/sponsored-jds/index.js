import Head from 'next/head'
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie';
import dynamic from "next/dynamic";

const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const SponsoredJDs = dynamic(() => import("components/employerServices/SponsoredJDs"), {
  loading: () => <Loader />,
  ssr: true,
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
          <title >Sponsored Job Description For Employers  - Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Sponsored Job descriptions are also available on Rozgar.com. It provides the best sponsored JDs for its clients."} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Sponsored Job Description For Employers  - Rozgar.com"} />
          <meta property="og:description" content={"Sponsored Job descriptions are also available on Rozgar.com. It provides the best sponsored JDs for its clients."} />
          <meta property="og:url" content={"https://rozgar.com/sponsored-jds"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Sponsored Job Description For Employers  - Rozgar.com"} />
          <meta name="twitter:description" content={"Sponsored Job descriptions are also available on Rozgar.com. It provides the best sponsored JDs for its clients."} />
          <meta name="twitter:url" content={"https://rozgar.com/sponsored-jds"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <link rel="canonical" href="https://rozgar.com/sponsored-jds" />

        </Head>

        <FilteredHeader ud={ud} />

        <SponsoredJDs />
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