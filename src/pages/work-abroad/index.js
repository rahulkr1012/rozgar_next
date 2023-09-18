import React from 'react'
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'

const Loader = dynamic(() => import('components/Loader'), { ssr: false });

import dynamic from 'next/dynamic'
const InternalWorkVisas = dynamic(() => import('components/InterNationalWorkVisa/InternalWorkVisas'), { loading: () => <Loader />, ssr: true });

export default function index(props) {
  const { ud } = props;
  return (
    <React.Fragment>
      <Head >
        <title >Work Abroad in Top Companies - Rozgar.com</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="Keywords" content={"Work Abroad " + ", Jobs in India, Jobs in Noida, Search & Apply Job"} />
        <meta name="description" content={"Want to work abroad or want to settle abroad? register on Rozgar.com. Rozgar.com provides the best opportunities to work abroad.   "} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={"Work Abroad in Top Companies - Rozgar.com"} />
        <meta property="og:description" content={"Want to work abroad or want to settle abroad? register on Rozgar.com. Rozgar.com provides the best opportunities to work abroad. "} />
        <meta property="og:url" content={"https://rozgar.com/work-abroad"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Work Abroad in Top Companies - Rozgar.com"} />
        <meta name="twitter:description" content={"Want to work abroad or want to settle abroad? register on Rozgar.com. Rozgar.com provides the best opportunities to work abroad."} />
        <meta name="twitter:url" content={"https://rozgar.com/work-abroad"} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <link rel="canonical" href="https://rozgar.com/work-abroad" />

      </Head>
      <FilteredHeader ud={ud} />

      <InternalWorkVisas />
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