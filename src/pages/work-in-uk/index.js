import React from 'react'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic'
import Head from 'next/head';
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const WorkinUK = dynamic(() => import('components/InterNationalWorkVisa/WorkinUK'), { loading: () => <Loader />, ssr: true });
export default function index(props) {
  const { ud } = props;
  return (
    <React.Fragment>
      <Head>
      <>
  <title>Work in UK - Rozgar.com</title>
  <link
    rel="canonical"
    href="https://rozgar.com/work-in-uk"
    data-react-helmet="true"
  />
  <meta name="HandheldFriendly" content="True" data-react-helmet="true" />
  <meta
    name="Keywords"
    content="Work In Uk, Jobs in India, Jobs in Noida, Search & Apply Job"
    data-react-helmet="true"
  />
  <meta
    name="description"
    content="Work In Uk In order to retain its competitive edge, the UK invites skilled professionals to work in the UK under the Tier 2 visa program. Under this program, workers whose occupations are listed on the Tier 2 Shortage Occupation List can apply to work in the UK on a long term basis. Among the popular professions on the list are IT, finance, teaching, healthcare and engineering. Rozgar can help you take advantage of this talent shortage in the UK and position yourself to gain a work permit to the UK."
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
  <meta property="og:title" content="Work In Uk" data-react-helmet="true" />
  <meta
    property="og:description"
    content="Work In Uk In order to retain its competitive edge, the UK invites skilled professionals to work in the UK under the Tier 2 visa program. Under this program, workers whose occupations are listed on the Tier 2 Shortage Occupation List can apply to work in the UK on a long term basis. Among the popular professions on the list are IT, finance, teaching, healthcare and engineering. Rozgar can help you take advantage of this talent shortage in the UK and position yourself to gain a work permit to the UK."
    data-react-helmet="true"
  />
  <meta
    property="og:url"
    content="https://rozgar.com/work-in-uk"
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
  <meta name="twitter:title" content="Work In Uk" data-react-helmet="true" />
  <meta
    name="twitter:description"
    content="Work In Uk In order to retain its competitive edge, the UK invites skilled professionals to work in the UK under the Tier 2 visa program. Under this program, workers whose occupations are listed on the Tier 2 Shortage Occupation List can apply to work in the UK on a long term basis. Among the popular professions on the list are IT, finance, teaching, healthcare and engineering. Rozgar can help you take advantage of this talent shortage in the UK and position yourself to gain a work permit to the UK."
    data-react-helmet="true"
  />
  <meta
    name="twitter:url"
    content="https://rozgar.com/work-in-uk"
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
</>

      </Head>
                  <FilteredHeader ud={ud} />
        <WorkinUK/>
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