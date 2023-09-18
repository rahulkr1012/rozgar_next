import Head from 'next/head';
import React, { Component } from 'react'
import LorWritingServices from 'components/LorWritingServices';
import constant from 'constant';
// import { capFirstLetterInSentence } from 'utils';
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie';

export default class lorWritingServices extends Component {
    constructor(props){
        super(props);
        this.state={
            ud:props.ud

        }
    }
    componentDidMount(){
        document.title = constant.title.lorWritingServices
    }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Letter Of Recommendation Writing Services - Rozgar.com</title>
        <link rel="canonical" href={"https://rozgar.com/lor-writing-services"} />
        </Head>
      {/* <Head >


<title title={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="Keywords" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + ", Jobs in India, Jobs in Noida, Search & Apply Job"}></meta>
<meta name="description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + "Just like all the other documents like CV, Resume or SOP, helping you secure your admissions in a University or job in a company, a Letter of Recommendation also carries some huge significance of its own. Just as the name suggest, a LOR is a letter that your previous employer or institution or professor or college issues for you, which acts as a sort of recommendation of your application for the upcoming studies or job."} />
<link rel="canonical"  href={window.location.href} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta property="og:description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + "Just like all the other documents like CV, Resume or SOP, helping you secure your admissions in a University or job in a company, a Letter of Recommendation also carries some huge significance of its own. Just as the name suggest, a LOR is a letter that your previous employer or institution or professor or college issues for you, which acts as a sort of recommendation of your application for the upcoming studies or job."} />
<meta property="og:url" content= {window.location.href}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta name="twitter:description"  content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + "Just like all the other documents like CV, Resume or SOP, helping you secure your admissions in a University or job in a company, a Letter of Recommendation also carries some huge significance of its own. Just as the name suggest, a LOR is a letter that your previous employer or institution or professor or college issues for you, which acts as a sort of recommendation of your application for the upcoming studies or job."} />
<meta name="twitter:url"content= {window.location.href} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
</Head> */}
     <FilteredHeader  ud={this.state.ud} />

        <LorWritingServices/>
      </React.Fragment>
    )
  }
}
