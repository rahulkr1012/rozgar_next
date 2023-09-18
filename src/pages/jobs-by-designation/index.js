import React, { useEffect, useState } from "react";
import constant from "constant";
import { DesignationList } from "@/action/jobsByActions";
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
const Designation = dynamic(
  () => import("components/JobsByDesignations/JobsByDesignation"),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

const SearchBar = dynamic(
  () => import("components/common/common/searchbar"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

function index(props) {
  let { ud } = props
  const [DESIGNATION_LIST, setDESIGNATION_LIST] = useState(
    props?.jobs_by_designation?.list
  );
  const [DESIGNATION_LIST_COUNT, setDESIGNATION_LIST_COUNT] = useState(
    props?.jobs_by_designation?.count
  );
  const [TYPE, setTYPE] = useState("");

  useEffect(() => {
    document.title = constant.title.JobsByDesignation;
    window.scrollTo(0, 0);
  }, []);

  const getData = (type) => {
    setTYPE(type);
  };

  return (
    <React.Fragment>
      <Head>
        <title> Top Jobs by Designation - Professional Designation Jobs </title>
        <meta name="HandheldFriendly" content="True" />

        <meta name="description" content={"Search latest Jobs in top companies on the basis of your designation starting from Rozgar.com. Register and apply for jobs by designation in 2023"} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          name="viewport"
          content="width=device-wi/create-job-alertdth, initial-scale=1"
        ></meta>

        <meta property="og:site_name" content="Rozgar Jobs By Designation" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Top Jobs by Designation - Professional Designation Jobs"} />
        <meta property="og:description" content={"Search latest Jobs in top companies on the basis of your designation starting from Rozgar.com. Register and apply for jobs by designation in 2023"} />
        <meta
          property="og:url"
          content={"https://rozgar.com/jobs-by-designation"}
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
          content={"https://rozgar.com/jobs-by-designation"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Top Jobs by Designation - Professional Designation Jobs"} />
        <meta name="twitter:description" content={"Search latest Jobs in top companies on the basis of your designation starting from Rozgar.com. Register and apply for jobs by designation in 2023"} />
        <meta
          name="twitter:url"
          content={"https://rozgar.com/jobs-by-designation"}
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href={"https://rozgar.com/jobs-by-designation"} />

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
                  <Link href={constant.component.jobsByLocation.url}>
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
                  <Link
                    href={constant.component.jobsByDesignation.url}
                    className={"active"}
                  >
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
      {!DESIGNATION_LIST.length && <Loader />}

      {DESIGNATION_LIST.length > 0 && (
        <div className="rozgar-profile-main-content">
          <div className="container p-0">
            <div className="row">

              <div className={"col-md-12 p-0"}>
                {/* {DESIGNATION_LIST.map((item)=>{
                return(
                  <div>{`https://rozgar.com/${item.URL}-jobs`}</div>
                  // console.log(`https://rozgar.com/jobs/skill/${item.URL}`)
                )
              })} */}
                <Designation
                  ONCHANGE={() => getData()}
                  DESIGNATION_LIST={DESIGNATION_LIST}
                  DESIGNATION_LIST_COUNT={DESIGNATION_LIST_COUNT}
                  props={props}
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
  let jobs_by_designation = await DesignationList();


  let ud = getLoggedInUserData(req)




  return {
    props: {
      jobs_by_designation: jobs_by_designation.result,
      ud: ud
    }, // will be passed to the page component as props
  };
}

export default withRouter(index);
