import React, { Component } from 'react'
import VisaCoverLetter from 'components/StudyAbroad/VisaCoverLetter'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'

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
        <title>Cover Letter For Visa Application - Rozgar.com</title>
        <link rel="canonical" href={"https://rozgar.com/visa-cover-letter.js"} />
        <meta name="HandheldFriendly" content="True" />
        <meta name="Keywords" content={"Study in UK " + ", Jobs in India, Jobs in Noida, Search & Apply Job"} />
        <meta name="description" content={"Apply for a visa application? Rozgar.com helps to provide a cover letter for visa applications. Write a cover letter for the visa application with Rozgar.com."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />


        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={"Cover Letter For Visa Application - Rozgar.com"} />
        <meta property="og:description" content={"Apply for a visa application? Rozgar.com helps to provide a cover letter for visa applications. Write a cover letter for the visa application with Rozgar.com."} />
        <meta property="og:url" content={"https://rozgar.com/visa-cover-letter.js"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Cover Letter For Visa Application - Rozgar.com"} />
        <meta name="twitter:description" content={"Apply for a visa application? Rozgar.com helps to provide a cover letter for visa applications. Write a cover letter for the visa application with Rozgar.com."} />
        <meta name="twitter:url" content={"https://rozgar.com/visa-cover-letter.js"} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
      </Head>
      <FilteredHeader ud={this.state.ud} />
      <VisaCoverLetter />
    </React.Fragment>    )
  }
}
