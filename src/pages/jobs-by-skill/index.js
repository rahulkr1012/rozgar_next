import { ITSkillList } from "@/actions/jobsByAction";
import React, { useEffect, useState } from "react";
import { NonITSkillList } from "@/action/jobsByActions";
import constant from "constant";
import Link from "next/link";
import { withRouter } from "next/router";
import Head from "next/head";
import logo from "src/assets/images/logo.png";
import dynamic from "next/dynamic";
// import Loader from 'components/Loader';
import FilteredHeader from 'components/Filtered_Header';
import { getLoggedInUserData } from "nextCookie";

const Loader = dynamic(() => import("components/Loader"), {
  ssr: false,
});
const Skills = dynamic(() => import("components/JobsByskills/JobsBySkills"), {
  loading: () => <Loader />,
  ssr: true,
});

const SearchBar = dynamic(
  () => import("components/common/common/searchbar"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);


function index(props) {
  const { ud } = props
  const [IT_SKILL_LIST, setIT_SKILL_LIST] = useState(
    props?.jobs_by_ITskills?.list
  );
  const [NON_IT_SKILL_LIST, setNON_IT_SKILL_LIST] = useState(
    props?.jobs_by_NonITskills?.list
  );
  const [IT_SKILL_LIST_COUNT, setIT_SKILL_LIST_COUNT] = useState(
    props?.jobs_by_ITskills?.count
  );

  const [NON_IT_SKILL_LIST_COUNT, setNON_IT_SKILL_LIST_COUNT] = useState(
    props?.jobs_by_NonITskills?.count
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });



  return (
    <React.Fragment>
      <Head>
        <title>Jobs by Skills - Employment Skills Jobs | Search Jobs by Top Skills </title>
        <meta name="HandheldFriendly" content="True" />

        <meta name="description" content={"Apply for the latest jobs by skills on Rozgar.com. Search vacancies for jobs by skills for fresher and experienced candidates at India`s leading job portal."} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          name="viewport"
          content="width=device-wi/create-job-alertdth, initial-scale=1"
        ></meta>

        <meta property="og:site_name" content="Rozgar Jobs By Skills" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Jobs by Skills - Employment Skills Jobs | Search Jobs by Top Skills"} />
        <meta property="og:description" content={"Apply for the latest jobs by skills on Rozgar.com. Search vacancies for jobs by skills for fresher and experienced candidates at India`s leading job portal."} />
        <meta
          property="og:url"
          content={"https://rozgar.com/jobs-by-skill"}
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
          content={"https://rozgar.com/jobs-by-skill"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Jobs by Skills - Employment Skills Jobs | Search Jobs by Top Skills"} />
        <meta name="twitter:description" content={"Apply for the latest jobs by skills on Rozgar.com. Search vacancies for jobs by skills for fresher and experienced candidates at India`s leading job portal."} />
        <meta
          name="twitter:url"
          content={"https://rozgar.com/jobs-by-skill"}
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />
        <link rel="canonical" href={"https://rozgar.com/jobs-by-skill"} />
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
                  <Link href={constant.component.jobsByDesignation.url}>
                    Jobs by Designation
                  </Link>
                </li>
                <li>
                  <Link
                    href={constant.component.jobsBySkill.url}
                    className={"active"}
                  >
                    Jobs by Skill
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {(!props?.jobs_by_ITskills?.list?.length > 0 || !props?.jobs_by_NonITskills?.list.length > 0) && <Loader />}
      {props?.jobs_by_ITskills?.list?.length > 0 > 0 && props?.jobs_by_NonITskills?.list.length > 0 && (
        <div className="rozgar-profile-main-content">
          <div className="container p-0">
            <div className="row">
              <div className={"col-md-12 p-0"}>
                {/* {  IT_SKILL_LIST !== undefined && IT_SKILL_LIST.length > 0 ? IT_SKILL_LIST.map((item)=>{
              return(
                <div>{`https://rozgar.com/${item.URL}-jobs`}</div>
                // console.log(`https://rozgar.com/jobs/skill/${item.URL}`)
              )
              
            }):''} */}
                <Skills
                  IT_SKILL_LIST={props?.jobs_by_ITskills?.list}
                  IT_SKILL_LIST_COUNT={props?.jobs_by_ITskills?.count}
                  NON_IT_SKILL_LIST={props?.jobs_by_NonITskills?.list}
                  NON_IT_SKILL_LIST_COUNT={props?.jobs_by_NonITskills?.count}
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

export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req)
  let jobs_by_ITskills = await ITSkillList();
  let jobs_by_NonITskills = await NonITSkillList();


  return {
    props: {
      jobs_by_ITskills: jobs_by_ITskills.result,
      jobs_by_NonITskills: jobs_by_NonITskills.result,
      ud: ud
    }, // will be passed to the page component as props
  };
}

export default withRouter(index);
