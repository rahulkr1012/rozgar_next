import React, { Component } from 'react'
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

const CareerAstrology = dynamic(() => import('components/CareerAstrology/CareerAstrology'), { loading: () => <Loader />, ssr: false });
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ud: props.ud

    }
  }
  render() {
    return (
      <React.Fragment>


        <Head>
          <title >Career Astrology – Guidance For Your Bright Career </title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Rozgar.com provides career astrology services for its users. It also provides career guidance for their users according to their skills, qualification, etc."} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Career Astrology | Rozgar.com"} />
          <meta property="og:description" content={"Rozgar.com provides career astrology services for its users. It also provides career guidance for their users according to their skills, qualification, etc."} />
          <meta property="og:url" content={"https://rozgar.com/career-astrology"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Career Astrology | Rozgar.com"} />
          <meta name="twitter:description" content={"Rozgar.com provides career astrology services for its users. It also provides career guidance for their users according to their skills, qualification, etc."} />
          <meta name="twitter:url" content={"https://rozgar.com/career-astrology"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <link rel="canonical" href="https://rozgar.com/career-astrology" />

        </Head>


        <FilteredHeader ud={this.state.ud} />
        <CareerAstrology />
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

