import React, { Component, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import logo from 'src/assets/images/logo.png'
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const HeaderLoader = dynamic(() => import('components/common/HeaderLoader'), { ssr: false });
// import HeaderLoader from 'components/common/HeaderLoader'
import { getLoggedInUserData } from 'nextCookie';
const HomePage = dynamic(() => import('components/homepage/homepage'), { loading: () => <Loader />, ssr: true });
// import FilteredHeader from 'components/Filtered_Header'
const FilteredHeader = dynamic(() => import('components/Filtered_Header'), { loading: () => <HeaderLoader />, ssr: false });
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
// import { homepageData } from '@/action/dashboard';
import data from '../../components/JSON/homepage.json'

function Index(props) {
  let router = useRouter()
  // const [data, setData] = useState(JSON.parse(JSON.stringify(props.json)))

  const [state, setstate] = useState({ ud: props.ud })

  {
    router.query.alert ? toast.warn(' Please login first ! ', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }) : ""
  }


  const addJsonLd = () => {
    return {
      __html: `
      {
        "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "Rozgar.com",
      "url": "https://rozgar.com",
      "potentialAction": {
        "@type": "SearchAction",
      "target": "https://rozgar.com/search-job?keyword={search_term_string}",
      "query-input": "required name=search_term_string"
}
}
      `
    }
  }

  return (
    <React.Fragment>
      <Head>

        <title >Search Jobs - Latest Job Vacancies in India - Employment - Rozgar.com </title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={"Apply for latest jobs in India at Rozgar.com. Search latest job vacancies in 2023 at India`s leading job-searching website. Post your jobs in different profiles."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta property="og:site_name" content="Rozgar Official Blog" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Search Jobs - Latest Job Vacancies in India - Employment - Rozgar.com"} />
        <meta property="og:description" content={"Apply for latest jobs in India at Rozgar.com. Search latest job vacancies in 2023 at India`s leading job-searching website. Post your jobs in different profiles."} />
        <meta property="og:url" content={"https://rozgar.com"} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Search Jobs - Latest Job Vacancies in India - Employment - Rozgar.com"} />
        <meta name="twitter:description" content={"Apply for latest jobs in India at Rozgar.com. Search latest job vacancies in 2023 at India`s leading job-searching website. Post your jobs in different profiles."} />
        <meta name="twitter:url" content={"https://rozgar.com"} />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <meta name="google-site-verification" content="yO06Q372LiHtmyP4SHjvA455ckf-ZFA6aED7Uy0r8Hw" />
        <link rel="canonical" href="https://rozgar.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="item-jsonld"
        />
      </Head>


      <FilteredHeader ud={state.ud} />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />
      {data && <HomePage
        data={data}
        props={router}
      />}

    </React.Fragment>)
}

export async function getServerSideProps({ req, res }) {

  let ud = getLoggedInUserData(req)
  // const json = await homepageData()
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  return {
    props: {
      ud: ud,
      // json: json.result
    }
  }
}

export default Index



