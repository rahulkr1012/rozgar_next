import React, { Component } from 'react'
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
  ;
const EducationLoan = dynamic(() => import('components/EducationLoan/EducationLoan'), { loading: () => <Loader />, ssr: false });

export default class index extends Component {
  render() {
    const { ud } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Apply For Education Loan in India - Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Education-Loan " + " - Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Apply For Education Loan in India - Rozgar.com"} />
          <meta property="og:description" content={"Top Companies " + " - Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
          <meta property="og:url" content={"https://rozgar.com/education-loan"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Apply For Education Loan in India - Rozgar.com"} />
          <meta name="twitter:description" content={"Education-Loan " + " - Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
          <meta name="twitter:url" content={"https://rozgar.com/education-loan"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <link rel="canonical" href="https://rozgar.com/education-loan" />

        </Head>
        <FilteredHeader ud={ud} />

        <EducationLoan />

      </React.Fragment>
    )
  }
}
