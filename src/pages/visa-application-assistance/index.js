import React, { Component } from 'react'
import VisaApplicationAssistance from 'components/StudyAbroad/VisaApplicationAssistance'
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'

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
     <title >Visa Application Assistance - Rozgar.com </title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={"Planning to apply for a visa? Get visa application assistance from India's trusted visa processing agents at Rozgar.com. "} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta property="og:site_name" content="Rozgar Official Blog" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Visa Application Assistance - Rozgar.com"} />
        <meta property="og:description" content={"Planning to apply for a visa? Get visa application assistance from India's trusted visa processing agents at Rozgar.com. "} />
        <meta property="og:url" content={"https://rozgar.com/visa-application-assistance"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Visa Application Assistance - Rozgar.com"} />
        <meta name="twitter:description" content={"Planning to apply for a visa? Get visa application assistance from India's trusted visa processing agents at Rozgar.com. "} />
        <meta name="twitter:url" content={"https://rozgar.com/visa-application-assistance"} />
        <meta name="twitter:image" content={"https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <meta name="google-site-verification" content="yO06Q372LiHtmyP4SHjvA455ckf-ZFA6aED7Uy0r8Hw" />

  <link rel="canonical" href={"https://rozgar.com/visa-application-assistance"} />

  </Head>
  <FilteredHeader ud={this.state.ud} />
    <VisaApplicationAssistance/>
</React.Fragment>    )
  }
}
