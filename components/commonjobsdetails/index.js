import React, { Component } from "react";
import constant from "constant";
import dynamic from "next/dynamic";
import { isLocationUrl } from "@/action/jobDetail";
import { topCompanyImages } from "@/action/dashboard";
import { searchJobBy } from "@/action/jobsByActions";
import Head from "next/head";
import { capitalizeWords } from "@/utils";
import { withRouter } from "next/router";
import Loader from "@/pages/loader";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from 'components/Filtered_Header'

const JobLists = dynamic(() => import("components/Joblists/Joblists"), {
  loading: () => <Loader />,
  ssr: false,
});

 
class index extends Component  {
   
  constructor(props) {
      super(props);
      this.state = {
      JOB_LIST: [],
      JOB_COUNT: undefined,
      CURRENT_PAGE: 1,
      aboutJobName: "India",
      isLocation: false,
      CITIES: [],
      TOP_COMPANY_IMAGES: [],
      locatlities: [],
      includeJobsInTitle: false,
      };
       
  }

  componentDidMount() {
    this.setState({
      aboutJobName: capitalizeWords(
        this.props.router.query?.url[0]?.split("-")
      ).join(" "),
    });

    document.title =
      capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(" ") +
      " Jobs - Rozgar.com";
    window.scrollTo(0, 0);
    this.joblist(this.state.CURRENT_PAGE, {});
    isLocationUrl(this.props.router.query)
      .then((res) => {
        if (res.status) {
          this.setState({
            isLocation: res.result.status,
            CITIES: res.result.cities,
            locatlities: res.result.locatlities,
          });
          
          if (res.result.status) {

            // document.title = `Jobs in  ${capitalizeWords(
            //   this.props.router.query?.url[0]?.split("-")
            // ).join(" ")} - Rozgar.com`;
            this.setState({ includeJobsInTitle: true });
          } else {
            document.title =
              capitalizeWords(this.props.router.query?.split("-")).join(
                " "
              ) + " Jobs - Rozgar.com";
          }
        } else {
          alert(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    topCompanyImages()
      .then((res) => {
        if (res.status) {
          this.setState({ TOP_COMPANY_IMAGES: res.result.images });
        } else {
          alert(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  joblist = (page, data) => {
    this.setState({ JOB_LIST: [], JOB_COUNT: undefined });
    searchJobBy({
      LIMIT: 25,
      URL: this.props.router.query?.url[0],
      page: page,
      filter: data,
    })
      .then((res) => {
        if (res.status) {
          this.setState({
            JOB_LIST: res.result.count ? res.result.list : undefined,
            JOB_COUNT: res.result.count,
          });
        } else {
          alert(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filterData = (data) => {
    this.joblist(1, data);
  };

   
  
   
  render() {
    const {
      includeJobsInTitle,
      JOB_LIST,
      JOB_COUNT,
      CURRENT_PAGE,
      aboutJobName,
      isLocation,
      CITIES,
      TOP_COMPANY_IMAGES,
      locatlities,
    } = this.state;

    
    // const title = includeJobsInTitle
    //   ? `Jobs in  ${capitalizeWords(
    //       this.props.router.query?.url[0]?.split("-")
    //     ).join(" ")} - Rozgar.com`
    //   : `${capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(
    //       " "
    //     )} Jobs - Rozgar.com`;



    return (
       
      <React.Fragment>
        <Head>
          <title>Search Job | Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta
            name="Keywords"
            content={
              "Search-Job" +
              ", Jobs in India, Jobs in Noida, Search & Apply Job"
            }
          ></meta>
          <meta
            name="description"
            content={
              "Search Job" +
              "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
            }
          />
          <link href={"https://rozgar.com/search-job?keyword=React.JS"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Search Job | Rozgar.com"} />
          <meta
            property="og:description"
            content={
              "Search Job" +
              "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
            }
          />
          <meta
            property="og:url"
            content={"https://rozgar.com/search-job?keyword=React.JS"}
          />
          <meta
            property="og:image"
            content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
          />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Search Job | Rozgar.com"} />
          <meta
            name="twitter:description"
            content={
              "Search Job" +
              "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
            }
          />
          <meta
            name="twitter:url"
            content={"https://rozgar.com/search-job?keyword=React.JS"}
          />
          <meta
            name="twitter:image"
            content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
          />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
        </Head>

        <FilteredHeader ud={this.props.ud} />
        
        <JobLists
          JOB_LIST={JOB_LIST}
          JOB_COUNT={JOB_COUNT}
          joblist={(page, data) => {
            this.joblist(page, data);
          }}
          CURRENT_PAGE={CURRENT_PAGE}
          aboutJobName={aboutJobName}
          isLocation={isLocation}
          CITIES={CITIES}
          TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
          locatlities={locatlities}
          filterData={(data) => this.filterData(data)}
          props={this.props}
        />
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
   const {req}   = context
    let ud = getLoggedInUserData(req)
  // let jobs_by_ITskills = await ITSkillList()    

  //  let jobs_by_NonITskills = await NonITSkillList()    
  return {
      props: {
         ud:ud
       }, // will be passed to the page component as props
  }

}

export default withRouter(index)