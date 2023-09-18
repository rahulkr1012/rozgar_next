import React from 'react'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic'
import Head from 'next/head';
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const WorkinMalaysia = dynamic(() => import('components/InterNationalWorkVisa/WorkinMalaysia'), { loading: () => <Loader />, ssr: true });
export default function index(props) {
  const { ud } = props;
  return (
   <React.Fragment>
    <Head>
  <title>Work in Malaysia - Rozgar.com</title>
  <link
    rel="canonical"
    href="https://rozgar.com/work-in-malaysia"
    data-react-helmet="true"
  />
  <meta name="HandheldFriendly" content="True" data-react-helmet="true" />
  <meta
    name="Keywords"
    content="Work In Malaysia, Jobs in India, Jobs in Noida, Search & Apply Job"
    data-react-helmet="true"
  />
  <meta
    name="description"
    content="Work In Malaysia Many international firms have their Asian headquarters in Malaysia. Malaysia attracts an increasing number of foreigners due to its diversified workforce and amicable integration of natives and expats. Aside from job prospects, Malaysian businesses provide competitive salaries and benefits to their employees, keeping them happy."
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
    content="Work In Malaysia"
    data-react-helmet="true"
  />
  <meta
    property="og:description"
    content="Work In Malaysia Many international firms have their Asian headquarters in Malaysia. Malaysia attracts an increasing number of foreigners due to its diversified workforce and amicable integration of natives and expats. Aside from job prospects, Malaysian businesses provide competitive salaries and benefits to their employees, keeping them happy."
    data-react-helmet="true"
  />
  <meta
    property="og:url"
    content="https://rozgar.com/work-in-malaysia"
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
    content="Work In Malaysia"
    data-react-helmet="true"
  />
  <meta
    name="twitter:description"
    content="Work In Malaysia Many international firms have their Asian headquarters in Malaysia. Malaysia attracts an increasing number of foreigners due to its diversified workforce and amicable integration of natives and expats. Aside from job prospects, Malaysian businesses provide competitive salaries and benefits to their employees, keeping them happy."
    data-react-helmet="true"
  />
  <meta
    name="twitter:url"
    content="https://rozgar.com/work-in-malaysia"
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
    <WorkinMalaysia/>
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
