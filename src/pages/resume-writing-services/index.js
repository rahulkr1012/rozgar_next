import Head from 'next/head';
import React, { Component } from 'react'
import ResumeWritingServices from 'components/ResumeWritingServices';
import constant from 'constant';
import { capFirstLetterInSentence } from 'utils';

export default class resumeWritingServices extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        document.title = constant.title.resumeWritingServices
    }
  render() {
    return (
      <React.Fragment>
        <Head >


<title> Create Free CV - Template-01 -Rozgar.com  </title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content=" A well-written and informative resume acts as the best medium through which you can highlight your whole professional and academic career, so as to make a good impression on the employer. So, let’s dig deeper into what is a Resume? What is a CV? How to write an effective resume and the best resume writing services in India?"/>
<link rel="canonical"  href={"https://rozgar.com/resume-writing-services"} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


og meta tag
<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content= "Create Free CV - Template-01 -Rozgar.com" />
<meta property="og:description" content=" A well-written and informative resume acts as the best medium through which you can highlight your whole professional and academic career, so as to make a good impression on the employer. So, let’s dig deeper into what is a Resume? What is a CV? How to write an effective resume and the best resume writing services in India?" />
<meta property="og:url" content= {"https://rozgar.com/resume-writing-services"}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

Twitter Meta Tag
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Create Free CV - Template-01 -Rozgar.com"} />
<meta name="twitter:description"  content={"A well-written and informative resume acts as the best medium through which you can highlight your whole professional and academic career, so as to make a good impression on the employer. So, let’s dig deeper into what is a Resume? What is a CV? How to write an effective resume and the best resume writing services in India?"} />
<meta name="twitter:url"content= {"https://rozgar.com/resume-writing-services"} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />

</Head>
        <ResumeWritingServices/>
      </React.Fragment>
    )
  }
}
