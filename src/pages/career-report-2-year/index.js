import React, { Component } from 'react'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic';
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'

const CareerReport2Year = dynamic( () => import('components/CareerAstrology/CareerReport2Year'), { loading:()=><Loader /> ,   ssr: false });

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
<Head>


<title>Career Report 2 Year - Rozgar.com</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={"Are you looking forward to your career scenarios/planning for the next 2 years? You can order Career Report 2 Year Astrology Services on Rozgar.com."} />
<link rel="canonical" href={"https://rozgar.com/career-report-2-year"} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1" />


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title" content={"Career Report 2 Year - Rozgar.com"} />
<meta property="og:description" content={"Are you looking forward to your career scenarios/planning for the next 2 years? You can order Career Report 2 Year Astrology Services on Rozgar.com."} />
<meta property="og:url" content={"https://rozgar.com/career-report-2-year"} />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Career Report 2 Year - Rozgar.com "} />
<meta name="twitter:description" content={"Are you looking forward to your career scenarios/planning for the next 2 years? You can order Career Report 2 Year Astrology Services on Rozgar.com."} />
<meta name="twitter:url" content={"https://rozgar.com/career-report-2-year"} />
<meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
</Head>
<FilteredHeader ud={this.state.ud} />
    <CareerReport2Year/>
</React.Fragment>    )
  }
}
