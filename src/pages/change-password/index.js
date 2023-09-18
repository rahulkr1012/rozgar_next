import React, { useState } from 'react'
import Head from 'next/head'
import constant from 'constant'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import { changePassword } from '@/action/CandidateAction'
import swal from 'sweetalert'
import Loader from 'components/Loader'

import dynamic from 'next/dynamic'
const ChanPassword = dynamic( () => import('components/ForgotPassword/ChangePassword'), { loading:()=><Loader /> ,   ssr: false });

export default function index(props) {

  const [showLoader, setShowLoader] = useState(false)

 const onSubmit = (model) => {
  setShowLoader(true)
    changePassword(model).then((res) => { 
      if (res.status) {
        setShowLoader(false)
        swal({
            icon: "success",
            text:"Password Successfully Changed",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          window.location.href = constant.component.editProfile.url;
      }
      else {
        setShowLoader(false)
        swal({
          icon: "error",
          text: res.error,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    });
  
}
    const { ud } = props
    const [data, setData] = React.useState({
        ud_id: JSON.parse(ud[constant.keys.cd])
    })

  
  

  return (
<React.Fragment>
    <Head>
         <title>{constant.title.changePassword}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"ChangePassword | Rozgar.com" + constant.metaDescription} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"ChangePassword | Rozgar.com"} />
          <meta property="og:description" content={"ChangePassword | Rozgar.com" + constant.metaDescription} />
          <meta property="og:url" content={"https://rozgar.com/change-password"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"ChangePassword | Rozgar.com"} />
          <meta name="twitter:description" content={"ChangePassword | Rozgar.com" + constant.metaDescription} />
          <meta name="twitter:url" content={"https://rozgar.com/change-password"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />    
          <meta name="twitter:site" content="@rozgar_india" />
    </Head>
    <FilteredHeader ud={ud} />
    <ChanPassword onSubmit={onSubmit}
    showLoader={showLoader}
    />
</React.Fragment>
    )
}

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    if (ud == null) {
      return {
          redirect: {
              destination: "/?alert=true",
              permanent: false

          }
      }
  }
    return {
        props: {
            ud: ud
        }
    }

}