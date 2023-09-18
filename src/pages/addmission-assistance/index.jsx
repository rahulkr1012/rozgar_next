import React, { Component } from 'react'
import AdmissionAssistance from 'components/StudyAbroad/AdmissionAssistance'
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
          <title>Admission Assistance - Rozgar.com</title>
          <link rel="canonical" href={"https://rozgar.com/addmission-assistance"} />
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Want to take admitted to any top university at any location? Rozgar.com helps you to give admission assistance in any university."} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Admission Assistance - Rozgar.com"} />
          <meta property="og:description" content={"Want to take admitted to any top university at any location? Rozgar.com helps you to give admission assistance in any university."} />
          <meta property="og:url" content={"https://rozgar.com/addmission-assistance"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Admission Assistance - Rozgar.com "} />
          <meta name="twitter:description" content={"Want to take admitted to any top university at any location? Rozgar.com helps you to give admission assistance in any university."} />
          <meta name="twitter:url" content={"https://rozgar.com/addmission-assistance"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />

        </Head>
        <FilteredHeader ud={this.state.ud} />
        <AdmissionAssistance />
      </React.Fragment>)
  }
}
