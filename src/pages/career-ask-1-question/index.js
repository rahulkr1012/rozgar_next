import React, { Component } from 'react'
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'

const CareerAsk1Question = dynamic( () => import('components/CareerAstrology/CareerAsk1Question'), { loading:()=><Loader /> ,   ssr: false });

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


<title>Career Ask 1 Question - Rozgar.com</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={"Career Ask 1 Question - Rozgar.com" + " - Career Ask 1 Question and its answer given by expert astrologer, Pt. Umesh Chandra Pant will open the various avenues for growth, promotion and success in your chosen career endeavor. Question related to what underscores the problematic point of your professional activity can be asked to our astrologer"} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1" />


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title" content={ "Career Ask 1 Question - Rozgar.com"} />
<meta property="og:description" content={"Career Ask 1 Question - Rozgar.com" + " - Career Ask 1 Question and its answer given by expert astrologer, Pt. Umesh Chandra Pant will open the various avenues for growth, promotion and success in your chosen career endeavor. Question related to what underscores the problematic point of your professional activity can be asked to our astrologer"} />
<meta property="og:url" content={"https://rozgar.com/career-ask-1-question"} />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Career Ask 1 Question - Rozgar.com"} />
<meta name="twitter:description" content={"Career Ask 1 Question - Rozgar.com - Rozgar.com" + " - Career Ask 1 Question and its answer given by expert astrologer, Pt. Umesh Chandra Pant will open the various avenues for growth, promotion and success in your chosen career endeavor. Question related to what underscores the problematic point of your professional activity can be asked to our astrologer"} />
<meta name="twitter:url" content={"https://rozgar.com/career-ask-1-question"} />
<meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical" href={"https://rozgar.com/career-ask-1-question"} />

</Head>
<FilteredHeader ud={this.state.ud} />

    <CareerAsk1Question/>
</React.Fragment>    )
  }
}
