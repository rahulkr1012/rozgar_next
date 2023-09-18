import React, { Component } from 'react'
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'

const CareerReport3Year = dynamic( () => import('components/CareerAstrology/CareerReport3Year'), { loading:()=><Loader /> ,   ssr: false });

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


<title>{"Career Report 3 Year - Rozgar.com"}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={"Career Report 3 Year - Rozgar.com" + " - Want to know your career scenarios for the next 3 years? Find the solution here with our Career Report 3 Year, you would be guided with the best astrological suggestions and predictions for the next 3 years on quarterly basis regarding the favourable & unfavourable outcomes along with the apt Remedies to improve career scenarios or reduce the hindrances."} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1" />


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title" content={"Career Report 3 Year - Rozgar.com"} />
<meta property="og:description" content={"Career Report 3 Year - Rozgar.com" + " - Want to know your career scenarios for the next 3 years? Find the solution here with our Career Report 3 Year, you would be guided with the best astrological suggestions and predictions for the next 3 years on quarterly basis regarding the favourable & unfavourable outcomes along with the apt Remedies to improve career scenarios or reduce the hindrances."} />
<meta property="og:url" content={"https://rozgar.com/career-report-5-year"} />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Career Report 3 Year - Rozgar.com"} />
<meta name="twitter:description" content={"Career Report 3 Year - Rozgar.com" + " - Want to know your career scenarios for the next 3 years? Find the solution here with our Career Report 3 Year, you would be guided with the best astrological suggestions and predictions for the next 3 years on quarterly basis regarding the favourable & unfavourable outcomes along with the apt Remedies to improve career scenarios or reduce the hindrances."} />
<meta name="twitter:url" content={"https://rozgar.com/career-report-5-year"} />
<meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical" href={"https://rozgar.com/career-report-5-year"} />
</Head>
<FilteredHeader ud={this.state.ud} />
 <CareerReport3Year />
</React.Fragment>    )
  }
}

