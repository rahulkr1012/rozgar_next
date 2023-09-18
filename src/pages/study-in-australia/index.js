import React from 'react'
import StudyInAustarlia from 'components/StudyAbroad/StudyInAustarlia'
import Head from 'next/head'
import constant from 'constant'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'

export default function index(props) {
    const [state, setstate] = React.useState({
        ud:props.ud
      }) 

  return (
<React.Fragment>
    <Head>
    <title >{constant.title.studyInAustralia}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ "Want to study in Australia? Rozgar.com offers opportunities to study in Australia at top universities. "} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ "Study in Australia - Rozgar.com"} />
<meta property="og:description" content={ "Want to study in Australia? Rozgar.com offers opportunities to study in Australia at top universities. "} />
<meta property="og:url" content= {"https://rozgar.com/study-in-australia"}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Study in Australia - Rozgar.com"} />
<meta name="twitter:description"  content={ "Want to study in Australia? Rozgar.com offers opportunities to study in Australia at top universities. "} />
<meta name="twitter:url"content= {"https://rozgar.com/study-in-australia"} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical" href={"https://rozgar.com/study-in-australia"} />


    </Head>
     <FilteredHeader  ud={state.ud} />
    <StudyInAustarlia/>
</React.Fragment>
    )
}



export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
    
    return {
      props: {
        ud: ud
      }
    }
  }

