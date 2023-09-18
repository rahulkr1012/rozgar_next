import React, { useEffect, useState } from "react";
import constant from "constant";
import { locationList, premiumCityList } from "@/action/jobsByActions";
import Link from "next/link";
import { withRouter } from "next/router";
// import Loader from 'components/Loader'
import dynamic from "next/dynamic";
import logo from "src/assets/images/logo.png";
import Head from "next/head";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from 'components/Filtered_Header'

const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const Location = dynamic(() => import("components/JobsByLocation/JobsByLocation"), {
  loading: () => <Loader />,
  ssr: true,
});

const SearchBar = dynamic(() => import("components/common/common/searchbar"), {
  loading: () => <Loader />,
  ssr: false,
});

function index(props) {
  const { ud } = props
  const [LOCATION_LIST, setLOCATION_LIST] = useState(props?.jobs_by_location);
  const [LOCATION_LIST_COUNT, setLOCATION_LIST_COUNT] = useState(
    props?.jobs_by_location?.count
  );
  const [TOP_LOCATION, setTOP_LOCATION] = useState(
    props?.jobs_by_top_location?.city
  );

  useEffect(() => {
    document.title = constant.title.JobsByLocation;
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title >Jobs by Location - Search Jobs by Cities/Town - Rozgar.com</title>
        <meta name="HandheldFriendly" content="True" />

        <meta name="description" content={"Search your jobs by location on Rozgar.com. It provides the best jobs by location in different cities of India. Location jobs are available on Rozgar.com."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-wi/create-job-alertdth, initial-scale=1"></meta>

        <meta property="og:site_name" content="Rozgar Jobs By Location" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Jobs by Location - Search Jobs by Cities/Town - Rozgar.com"} />
        <meta property="og:description" content={"Search your jobs by location on Rozgar.com. It provides the best jobs by location in different cities of India. Location jobs are available on Rozgar.com."} />
        <meta property="og:url" content={"https://rozgar.com/jobs-by-location"} />
        <meta property="og:image" content={logo} />
        <meta property="article:published_time" content="2022-10-18T06:04:34.000Z" />
        <meta property="article:modified_time" content="2022-10-18T06:04:37.000Z" />
        <meta property="article:tag" content="Career Advice" />
        <meta property="article:tag" content="Career Insights" />

        <meta property="article:publisher" content={"https://rozgar.com/jobs-by-location"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Jobs by Location - Search Jobs by Cities/Town - Rozgar.com"} />
        <meta name="twitter:description" content={"Search your jobs by location on Rozgar.com. It provides the best jobs by location in different cities of India. Location jobs are available on Rozgar.com."} />
        <meta name="twitter:url" content={"https://rozgar.com/jobs-by-location"} />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href="https://rozgar.com/jobs-by-location" />
      </Head>
      <FilteredHeader ud={ud} />
      <div className="rozgar-jobbylocsearch">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">
              <SearchBar props={props.router} />
              <ul className="jobsbylocation-top jobsbylocation-list">
                <li>Browse Jobs</li>
                <li>
                  <Link href={constant.component.AllJobs.url}>All Jobs</Link>
                </li>
                <li>
                  <Link
                    href={constant.component.jobsByLocation.url}
                    className={"active"}
                  >
                    Jobs by Location
                  </Link>
                </li>
                <li>
                  <Link href={constant.component.jobsByCompany.url}>
                    Jobs by Company
                  </Link>
                </li>
                <li>
                  <Link href={constant.component.jobsByCategory.url}>
                    Jobs by Category
                  </Link>
                </li>
                <li>
                  <Link href={constant.component.jobsByDesignation.url}>
                    Jobs by Designation
                  </Link>
                </li>
                <li>
                  <Link href={constant.component.jobsBySkill.url}>
                    Jobs by Skill
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {(!LOCATION_LIST || !TOP_LOCATION) && <Loader />}
      {LOCATION_LIST && TOP_LOCATION && (
        <div className="rozgar-profile-main-content">
          <div className="container p-0">
            <div className="row">
              <div className={"col-md-12 p-0"}>
                <Location
                  LOCATION_LIST={LOCATION_LIST}
                  TOP_LOCATION={TOP_LOCATION}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { req } = context
  let ud = getLoggedInUserData(req)

  let jobs_by_location = await locationList();
  let jobs_by_top_location = await premiumCityList();

  return {
    props: {
      jobs_by_location: jobs_by_location.result,
      jobs_by_top_location: jobs_by_top_location.result,
      ud: ud
    }, // will be passed to the page component as props
  };
}

export default withRouter(index);
