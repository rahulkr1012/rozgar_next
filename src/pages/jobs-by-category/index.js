import React, { useEffect, useState } from "react";
import constant from "constant";
import { FunctionalAreaList, IndustryList } from "@/action/jobsByActions";
import Link from "next/link";
import { withRouter } from "next/router";
// import Loader from 'components/Loader'
import dynamic from "next/dynamic";
import logo from "src/assets/images/logo.png";
import Head from "next/head";
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from "nextCookie";
// import Loader from "components/Loader/index";

const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const Category = dynamic(
  () => import("components/JobsByCategory/JobsByCategory"), {
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
  const { ud } = props

  const [FUNCTIONAL_AREA_LIST, setFUNCTIONAL_AREA_LIST] = useState(
    props?.jobs_by_functionl_list?.list
  );

  const [FUNCTIONAL_AREA_LIST_COUNT, setFUNCTIONAL_AREA_LIST_COUNT] = useState(
    props?.jobs_by_functionl_list?.count
  );
  const [INDUSTRY_LIST, setINDUSTRY_LIST] = useState(
    props?.jobs_by_industry_list?.list
  );
  const [INDUSTRY_LIST_COUNT, setINDUSTRY_LIST_COUNT] = useState(
    props?.jobs_by_industry_list?.count
  );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <React.Fragment>
      <Head>
        <title> Search Jobs by Categories - Browse Jobs in Different Categories</title>
        <meta name="HandheldFriendly" content="True" />
        <meta
          name="description"
          content={"Browse your jobs by categories such as functional area/department on Rozgar.com. It provides thousands of jobs by categories in India in 2023."}
        />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          name="viewport"
          content="width=device-wi/create-job-alertdth, initial-scale=1"
        ></meta>
        <meta
          property="og:site_name"
          content="Rozgar Jobs By Category (Functional Area And Industry)"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={"Search Jobs by Categories - Browse Jobs in Different Categories"}
        />
        <meta
          property="og:description"
          content={"Browse your jobs by categories such as functional area/department on Rozgar.com. It provides thousands of jobs by categories in India in 2023."}
        />
        <meta
          property="og:url"
          content={"https://rozgar.com/jobs-by-category"}
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
          content={"https://rozgar.com/jobs-by-category"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={"Search Jobs by Categories - Browse Jobs in Different Categories"}
        />
        <meta
          name="twitter:description"
          content={"Browse your jobs by categories such as functional area/department on Rozgar.com. It provides thousands of jobs by categories in India in 2023."}
        />
        <meta
          name="twitter:url"
          content={"https://rozgar.com/jobs-by-category"}
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href="https://rozgar.com/jobs-by-category" />
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
                  <Link
                    href={constant.component.jobsByCategory.url}
                    className={"active"}
                  >
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
      {FUNCTIONAL_AREA_LIST.length > 0 && INDUSTRY_LIST && (
        <div className="rozgar-profile-main-content">
          <div className="container p-0">
            <div className="row">
              <div className={"col-md-12 p-0"}>
                {/* {INDUSTRY_LIST.map((item)=>{
                  return(
                    <div>{`https://rozgar.com/${item.URL}-jobs`}</div>
                  )
                })} */}
                <Category
                  FUNCTIONAL_AREA_LIST={FUNCTIONAL_AREA_LIST}
                  FUNCTIONAL_AREA_LIST_COUNT={FUNCTIONAL_AREA_LIST_COUNT}
                  INDUSTRY_LIST={INDUSTRY_LIST}
                  INDUSTRY_LIST_COUNT={INDUSTRY_LIST_COUNT}
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
  let ud = getLoggedInUserData(req)

  let jobs_by_functionl_list = await FunctionalAreaList();
  let jobs_by_industry_list = await IndustryList();

  return {
    props: {
      jobs_by_functionl_list: jobs_by_functionl_list.result,
      jobs_by_industry_list: jobs_by_industry_list.result,
      ud: ud
    }, // will be passed to the page component as props
  };
}

export default withRouter(index);
