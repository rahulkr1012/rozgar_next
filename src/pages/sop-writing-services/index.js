import Head from 'next/head';
import React, { Component } from 'react'
import SopWritingServices from 'components/SopWritingServices';
import constant from 'constant';
import { capFirstLetterInSentence } from 'utils';
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie';

export default class sopWritingServices extends Component {
    constructor(props){
        super(props);
        this.state={
            ud:props.ud

        }
    }
    componentDidMount(){
        document.title = constant.title.sopWritingServices
    }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Statement of Purpose - Rozgar.com</title>
        <link rel="canonical"  href={"https://rozgar.com/sop-writing-services"} />
        </Head>
          {/* <Head >


<title >{ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="Keywords" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + ", Jobs in India, Jobs in Noida, Search & Apply Job"}></meta>
<meta name="description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + " A Statement of Purpose or SOP is kind of an admission essay that every student has to present to the University, along with all the other documents. It is a compulsory submission and presents a clear picture of your application in front of the University authorities in a transparent way."} />
<link rel="canonical"  href={window.location.href} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta property="og:description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + " A Statement of Purpose or SOP is kind of an admission essay that every student has to present to the University, along with all the other documents. It is a compulsory submission and presents a clear picture of your application in front of the University authorities in a transparent way."} />
<meta property="og:url" content= {window.location.href}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta name="twitter:description"  content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + " A Statement of Purpose or SOP is kind of an admission essay that every student has to present to the University, along with all the other documents. It is a compulsory submission and presents a clear picture of your application in front of the University authorities in a transparent way."} />
<meta name="twitter:url"content= {window.location.href} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
</Head> */}
     <FilteredHeader  ud={this.state.ud} />

        <SopWritingServices/>
      </React.Fragment>
    )
  }
}

export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
    
    return {
      props: {
        ud: ud
      }
    }
  }
