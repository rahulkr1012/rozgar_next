import React from 'react'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic'
import Head from 'next/head';
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const WorkinIreland = dynamic(() => import('components/InterNationalWorkVisa/WorkinIreland'), { loading: () => <Loader />, ssr: true });
export default function index(props) {
  const { ud } = props;
  return (
    <React.Fragment>
      <Head>
  <title>Work in Ireland - Rozgar.com</title>
  <link
    rel="canonical"
    href="https://rozgar.com/work-in-ireland"
    data-react-helmet="true"
  />
  <meta name="HandheldFriendly" content="True" data-react-helmet="true" />
  <meta
    name="Keywords"
    content="Work In Ireland, Jobs in India, Jobs in Noida, Search & Apply Job"
    data-react-helmet="true"
  />
  <meta
    name="description"
    content="Work In Ireland Ireland is a popular destination for persons looking for work outside of their home country. Working and residing in Ireland also entitles you to free European Union membership. Another advantage is that after five years in Ireland, you can apply for citizenship."
    data-react-helmet="true"
  />
  <meta
    name="referrer"
    content="no-referrer-when-downgrade"
    data-react-helmet="true"
  />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
    data-react-helmet="true"
  />
  <meta property="og:site_name" content="Rozgar.com" data-react-helmet="true" />
  <meta
    property="og:title"
    content="Work In Ireland"
    data-react-helmet="true"
  />
  <meta
    property="og:description"
    content="Work In Ireland Ireland is a popular destination for persons looking for work outside of their home country. Working and residing in Ireland also entitles you to free European Union membership. Another advantage is that after five years in Ireland, you can apply for citizenship."
    data-react-helmet="true"
  />
  <meta
    property="og:url"
    content="https://rozgar.com/work-in-ireland"
    data-react-helmet="true"
  />
  <meta
    property="og:image"
    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
    data-react-helmet="true"
  />
  <meta property="og:image:width" content={4000} data-react-helmet="true" />
  <meta property="og:image:height" content={6000} data-react-helmet="true" />
  <meta
    name="twitter:card"
    content="summary_large_image"
    data-react-helmet="true"
  />
  <meta
    name="twitter:title"
    content="Work In Ireland"
    data-react-helmet="true"
  />
  <meta
    name="twitter:description"
    content="Work In Ireland Ireland is a popular destination for persons looking for work outside of their home country. Working and residing in Ireland also entitles you to free European Union membership. Another advantage is that after five years in Ireland, you can apply for citizenship."
    data-react-helmet="true"
  />
  <meta
    name="twitter:url"
    content="https://rozgar.com/work-in-ireland"
    data-react-helmet="true"
  />
  <meta
    name="twitter:image"
    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
    data-react-helmet="true"
  />
  <meta name="twitter:label1" content="Written by" data-react-helmet="true" />
  <meta name="twitter:data1" content="Smita Nag" data-react-helmet="true" />
  <meta name="twitter:label2" content="Filed under" data-react-helmet="true" />
  <meta
    name="twitter:data2"
    content="Career Advice, Career Insights"
    data-react-helmet="true"
  />
  <meta name="twitter:site" content="@rozgar_india" data-react-helmet="true" />

      </Head>
        <FilteredHeader ud={ud} />
   <WorkinIreland/>
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