import React from 'react'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'    
import constant from 'constant'
import Head from 'next/head'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
let InboxMessage  =dynamic(()=> import('components/RecruiterChat/MessageInbox') ,  { 
 loading:()=> <Loader /> , 
    ssr:false 
} ) 

export default function index(props) {
    const {ud}  = props 

    const [data, setData] = React.useState({
         ud_id : JSON.parse(ud[constant.keys.cd])
    })
     
  return (
<React.Fragment>

     <Head >


                    <title>{constant.title.InboxMessage}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Inbox Message | Rozgar.com" + constant.metaDescription} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Inbox Message | Rozgar.com"} />
                    <meta property="og:description" content={"Inbox Message | Rozgar.com" + constant.metaDescription} />
                    <meta property="og:url" content={"https://rozgar.com/recruiter-message"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Inbox Message | Rozgar.com"} />
                    <meta name="twitter:description" content={"Inbox Message | Rozgar.com" + constant.metaDescription} />
                    <meta name="twitter:url" content={"https://rozgar.com/recruiter-message"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />

                </Head> 
   
  
   <FilteredHeader ud={ud} /> 
  
    <InboxMessage ud={data.ud_id}/>
</React.Fragment>
    )
}

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    
    return {
       props:{
         ud:ud   
       }
    }
  
  }