import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import React, { Component } from 'react'
import { getLoggedInUserData } from 'nextCookie'
import dynamic from 'next/dynamic'
import Loader from 'components/Loader'

const CompanyBrandings = dynamic( () => import('components/employerServices/CompanyBrandings'), { loading:()=><Loader /> ,   ssr: false });

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
          <title >Company Branding Services | Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Explore the best and most professional company branding services for your startups. Rozgar.com provides the best company branding solutions in India."} />
          
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Company Branding Services | Rozgar.com"} />
          <meta property="og:description" content={"Explore the best and most professional company branding services for your startups. Rozgar.com provides the best company branding solutions in India."} />
          <meta property="og:url" content={"https://rozgar.com/company-brandings"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Company Branding Services | Rozgar.com"} />
          <meta name="twitter:description" content={"Explore the best and most professional company branding services for your startups. Rozgar.com provides the best company branding solutions in India."} />
          <meta name="twitter:url" content={"https://rozgar.com/company-brandings"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <link rel="canonical" href={"https://rozgar.com/company-brandings"} />
        </Head>
        <FilteredHeader ud={ud} />

        <CompanyBrandings />
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