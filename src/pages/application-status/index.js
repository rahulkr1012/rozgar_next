import React from 'react'
// import ApplicationStatus from 'components/Edit_Profile/ApplicationStatus'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

import constant from 'constant'
import Head from 'next/head'
import { withRouter } from 'next/router'

const ApplicationStatus = dynamic(
    () => import("components/Edit_Profile/ApplicationStatus"),
    {
      loading: () => <Loader />,
      ssr: false,
    }
  );
 function index(props) {
    const { ud } = props
    const [data, setData] = React.useState({
        ud_id: JSON.parse(ud[constant.keys.cd])
    })


    return (
        <React.Fragment>
            <Head>
                <title>{constant.title.ApplicationStatus}</title>
                <meta name="HandheldFriendly" content="True" />
                <meta name="description" content={"Application Status | Rozgar.com" + constant.metaDescription} />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />


                <meta property="og:site_name" content="Rozgar.com" />
                <meta property="og:title" content={"Application Status | Rozgar.com"} />
                <meta property="og:description" content={"Application Status |Rozgar.com" + constant.metaDescription} />
                <meta property="og:url" content={"https://rozgar.com/application-status"} />
                <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                <meta property="og:image:width" content="4000" />
                <meta property="og:image:height" content="6000" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={"Application Status | Rozgar.com"} />
                <meta name="twitter:description" content={"Application Status | Rozgar.com" + constant.metaDescription} />
                <meta name="twitter:url" content={"https://rozgar.com/application-status"} />
                <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Smita Nag" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content="Career Advice, Career Insights" />
                <meta name="twitter:site" content="@rozgar_india" />
                <link rel="canonical" href={"https://rozgar.com/application-status"} />
            </Head>
            <FilteredHeader ud={ud} />

            <ApplicationStatus ud={data.ud_id} />
        </React.Fragment>
    )
}
export default withRouter(index)


export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
     
    if(ud==null) {
         
        return {
            redirect:{
                destination:"/?alert=true" ,
                permanent:false 
                
            }
        }    
       }    
     
    return {
        props: {
            ud: ud
        }
    }

}
