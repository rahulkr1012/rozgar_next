import React, { Component } from 'react'
import dynamic from "next/dynamic";
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const StrengthReadingForCareer = dynamic(() => import("components/CareerAstrology/StrengthReadingForCareer"), {
  loading: () => <Loader />,
  ssr: true,
});
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ud: this.props.ud
    }
  }
  render() {
    return (
      <React.Fragment>
        <Head >


          <title >Strength Reading For Career - Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Strength Reading for Career is our astrological offering to help you know your strengths through your Career Horoscope. "} />
          <link rel="canonical" href={"https://rozgar.com/strength-reading-for-career"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Strength Reading For Career - Rozgar.com"} />
          <meta property="og:description" content={"Strength Reading for Career is our astrological offering to help you know your strengths through your Career Horoscope.  "} />
          <meta property="og:url" content={"https://rozgar.com/strength-reading-for-career"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Strength Reading For Career  - Rozgar.com"} />
          <meta name="twitter:description" content={"Strength Reading for Career is our astrological offering to help you know your strengths through your Career Horoscope. "} />
          <meta name="twitter:url" content={"https://rozgar.com/strength-reading-for-career"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
        </Head>
        <FilteredHeader ud={this.state.ud} />

        <StrengthReadingForCareer />
      </React.Fragment>)
  }
}

