import React, { useEffect, useState } from "react";
import constant from "constant";
import { withRouter } from "next/router";
// import Loader from 'components/Loader'

import dynamic from "next/dynamic";
import Head from "next/head";
import logo from "src/assets/images/logo.png";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from 'components/Filtered_Header'
const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const Dashboard = dynamic(() => import("components/Dashboard/Dashboard"), {
  loading: () => <Loader />,
  ssr: true,
});

function index(props) {
  const [state, setstate] = useState({
    ud: props.ud
  })
  useEffect(() => {

    document.title = constant.title.AllJobs;
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <FilteredHeader ud={state.ud} />
      <Head>
        <title>
          Search Jobs By Location, Industry, and Skills - Rozgar.com
        </title>
        <meta name="HandheldFriendly" content="True" />
        <meta
          name="description"
          content={
            "Apply for your jobs in India at Rozgar.com. Search your jobs in 2023 according to the location, company, category, designation, and skills at Rozgar.com."
          }
        />

        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          name="viewport"
          content="width=device-wi/create-job-alertdth, initial-scale=1"
        ></meta>
        <meta
          property="og:site_name"
          content="Apply for your jobs in India at Rozgar.com. Search your jobs in 2023 according to the location, company, category, designation, and skills at Rozgar.com."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={
            "Search Jobs By Location, Industry, and Skills - Rozgar.com"
          }
        />
        <meta
          property="og:description"
          content={
            "Apply for your jobs in India at Rozgar.com. Search your jobs in 2023 according to the location, company, category, designation, and skills at Rozgar.com."
          }
        />
        <meta
          property="og:url"
          content={"https://rozgar.com/browse-jobs"}
        />
        <meta property="og:image" content={logo} />
        <meta
          property="article:published_time"
          content="2022-10-18T06:04:34.000Z"
        />
        <meta
          property="article:modified_time"
          content="2022-10-18T06:04:37.000Z"
        />
        <meta property="article:tag" content="Career Advice" />
        <meta property="article:tag" content="Career Insights" />
        <meta
          property="article:publisher"
          content={"https://rozgar.com/browse-jobs"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            "Search Jobs By Location, Industry, and Skills - Rozgar.com"
          }
        />
        <meta
          name="twitter:description"
          content={
            "Apply for your jobs in India at Rozgar.com. Search your jobs in 2023 according to the location, company, category, designation, and skills at Rozgar.com."
          }
        />
        <meta
          name="twitter:url"
          content={"https://rozgar.com/browse-jobs"}
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href={"https://rozgar.com/browse-jobs"} />
      </Head>
      <Dashboard props={props.router} />
    </React.Fragment>
  );
}





export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req)

  return {
    props: {
      ud: ud
    }
  }

}






export default withRouter(index);
