import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import Head from 'next/head'
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const ResumeMakings = dynamic(() => import("components/ResumeMaking/ResumeMaking"), {
  loading: () => <Loader />,
  ssr: true,
});



export default function index({ ud }) {
  const [state, setstate] = React.useState({
    ud: ud
  });

  return (
    <React.Fragment>

      <Head>
        <title> Online Resume Maker | Create Free CV 2023 - Rozgar.com </title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content="Create a perfect resume in 2023 and get your dream job using the online resume maker. Choose a template. Customize it and get more interviews." />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* og meta tag */}
        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content="Online Resume Maker | Create Free CV 2023 - Rozgar.com" />
        <meta property="og:description" content="Create a perfect resume in 2023 and get your dream job using the online resume maker. Choose a template. Customize it and get more interviews." />
        <meta property="og:url" content={"https://rozgar.com/resume-making"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        {/* Twitter Meta Tag */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Online Resume Maker | Create Free CV 2023 - Rozgar.com"} />
        <meta name="twitter:description" content={" Create a perfect resume in 2023 and get your dream job using the online resume maker. Choose a template. Customize it and get more interviews."} />
        <meta name="twitter:url" content={"https://rozgar.com/resume-making"} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <link rel="canonical" href="https://rozgar.com/resume-making" />
      </Head>

      <FilteredHeader ud={state.ud} />
      <ResumeMakings ud={state.ud} />

    </React.Fragment>
  )
}


export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req)
  return {
    props: {
      ud
    }

  }

}
