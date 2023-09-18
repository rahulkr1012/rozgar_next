import constant from 'constant'
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie'
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic'
import Loader from 'components/Loader'

const CreateJobAlert = dynamic(() => import('components/CreateJobAlert/CreateJobAlert'), { loading: () => <Loader />, ssr: false });

function index(props) {

  const { ud } = props

  return (
    <React.Fragment>
      <Head>
        <title >Create Free Job Alerts in 2023 - Rozgar.com</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={"Don`t forget to create free job alerts by Rozgar.com. It provides free job alerts on your mobile number, emails and WhatsApp. Register on Rozgar.com."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />


        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={"Create a Free Job Alert"} />
        <meta property="og:description" content={"Don`t forget to create free job alerts by Rozgar.com. It provides free job alerts on your mobile number, emails and WhatsApp. Register on Rozgar.com."} />
        <meta property="og:url" content={"https://rozgar.com/create-a-free-job-alert"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Create a Free Job Alert"} />
        <meta name="twitter:description" content={"Don`t forget to create free job alerts by Rozgar.com. It provides free job alerts on your mobile number, emails and WhatsApp. Register on Rozgar.com."} />
        <meta name="twitter:url" content={"https://rozgar.com/create-a-free-job-alert"} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href="https://rozgar.com/create-job-alert" />
      </Head>


      <FilteredHeader ud={ud} />
      <CreateJobAlert />
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


export default index 
