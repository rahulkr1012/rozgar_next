import React, { useEffect, useState } from "react";
import constant from "constant";
import { companyList } from "@/action/jobsByActions";
import Link from "next/link";
import { withRouter } from "next/router";
// import Loader from 'components/Loader'
import dynamic from "next/dynamic";
import logo from "src/assets/images/logo.png";
import Head from "next/head";
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from "nextCookie";
import JobsByLoader from "components/JobsByLoader/JobsByLoader";

const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const Company = dynamic(
  () => import("components/JobsByCompany/JobsByCompany"),
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
  let {ud}  = props
  const [COMPANY_LIST, setCOMPANY_LIST] = useState(
    props?.jobs_by_company_list?.list
  );
  const [COMPANY_LIST_COUNT, setCOMPANY_LIST_COUNT] = useState(
    props?.jobs_by_company_list?.count
  );

  useEffect(() => {
    document.title = constant.title.JobsByCompany;
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title> Browse Jobs by Company - Jobs in Top Companies </title>
        <meta name="HandheldFriendly" content="True" />

        <meta name="description" content={"Browse latest jobs by companies in India. Rozgar.com provides thousands of job opportunities in top MNCs. Apply for jobs by companies on Rozgar.com."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          name="viewport"
          content="width=device-wi/create-job-alertdth, initial-scale=1"
        ></meta>

        <meta property="og:site_name" content="Rozgar Jobs By Company" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Browse Jobs by Company - Jobs in Top Companies"} />
        <meta property="og:description" content={"Browse latest jobs by companies in India. Rozgar.com provides thousands of job opportunities in top MNCs. Apply for jobs by companies on Rozgar.com."} />
        <meta
          property="og:url"
          content={"https://rozgar.com/jobs-by-company"}
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
          content={"https://rozgar.com/jobs-by-company"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Browse Jobs by Company - Jobs in Top Companies"} />
        <meta name="twitter:description" content={"Browse latest jobs by companies in India. Rozgar.com provides thousands of job opportunities in top MNCs. Apply for jobs by companies on Rozgar.com."} />
        <meta
          name="twitter:url"
          content={"https://rozgar.com/jobs-by-company"}
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />

        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href={"https://rozgar.com/jobs-by-company"} />
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
                  <Link
                    href={constant.component.jobsByCompany.url}
                    className={"active"}
                  >
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
      {!COMPANY_LIST.length && <JobsByLoader />}
      {COMPANY_LIST.length > 0 && (
        <div className="rozgar-profile-main-content">
          <div className="container p-0">
            <div className="row">
              <div className={"col-md-12 p-0"}>
                <Company
                  COMPANY_LIST={COMPANY_LIST}
                  COMPANY_LIST_COUNT={COMPANY_LIST_COUNT}
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

   let { params  , req } =  context     
  // let ud = getLoggedInUserData(req) 

  let jobs_by_company_list = await companyList();

  return {
    props: {
      // jobs_by_company_list: {list:[]},
      jobs_by_company_list: jobs_by_company_list.result,
      ud:null
    }, // will be passed to the page component as props
  };
   
}

export default withRouter(index);
