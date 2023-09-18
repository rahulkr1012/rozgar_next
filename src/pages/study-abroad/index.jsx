import React from 'react'
import Image from 'next/image';
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie';
import Loader from 'components/Loader'
import dynamic from 'next/dynamic';

const StudyAbroad = dynamic(
  () => import("components/StudyAbroad"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

export default function StudyAbroads({ ud }) {
  const [state, setstate] = React.useState({
    ud: ud
  });

  return (
    <React.Fragment>
      <Head>
        <title >Study Abroad In Top Universities - Rozgar.com</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={"Rozgar.com helps to study in abrod. It provides opportunities to study in the best universities in other countries. It helps to find the perfect university for you."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={"Study Abroad | Rozgar.com"} />
        <meta property="og:description" content={"Rozgar.com helps to study in abrod. It provides opportunities to study in the best universities in other countries. It helps to find the perfect university for you."} />
        <meta property="og:url" content={"https://rozgar.com/study-abroad"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Study Abroad | Rozgar.com"} />
        <meta name="twitter:description" content={"Rozgar.com helps to study in abrod. It provides opportunities to study in the best universities in other countries. It helps to find the perfect university for you."} />
        <meta name="twitter:url" content={"https://rozgar.com/study-abroad"} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <link rel="canonical" href="https://rozgar.com/study-abroad" />
      </Head>
      <FilteredHeader ud={ud} />
      <StudyAbroad />
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
