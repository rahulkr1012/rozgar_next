import React from 'react'
// import PersonalRecruiter from 'components/PersonalRecruiter/PersonalRecruiter'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

import { withRouter } from 'next/router';
import FilteredHeader from 'components/Filtered_Header'
import constant from 'constant';
import { getLoggedInUserData } from 'nextCookie';
import Head from 'next/head';

 
let PersonalRecruiter = dynamic(
    () => import("components/PersonalRecruiter/PersonalRecruiter"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );
 
    


 function index(props) {
    const { ud } = props
  return (


    <React.Fragment>
    
      <Head>
     

<title> Personal recruiter Services in India - Rozgar.com </title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={"Get various personal recruiter services in India with Rozgar.com. Offers premium services to create a professional presence on the web with professionals."} />
<link rel="canonical" href={"https://rozgar.com/personal-recruiter"} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>

<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title" content={"Personal recruiter Services in India - Rozgar.com"} />
<meta property="og:description" content={"Get various personal recruiter services in India with Rozgar.com. Offers premium services to create a professional presence on the web with professionals."} />
<meta property="og:url" content={"https://rozgar.com/personal-recruiter"} />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Personal recruiter Services in India - Rozgar.com"} />
<meta name="twitter:description" content={"Get various personal recruiter services in India with Rozgar.com. Offers premium services to create a professional presence on the web with professionals."} />
<meta name="twitter:url" content={"https://rozgar.com/personal-recruiter"} />
<meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />
      </Head>

         <FilteredHeader ud={ud} />
        <PersonalRecruiter />
    </React.Fragment>
  )
}
  
export default withRouter(index)

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)

    return {
        props: {
            ud: ud
        }
    }

}
