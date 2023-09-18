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
import { getBannerList } from "@/action/CandidateAction";

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
      BannerSkill:[],
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
    getBannerList().then((res) => {
      this.setState({BannerSkill: res.result.list.map((item)=>{
       if(item.PAGE_LOCATION=="Jobs_by_location"){
          return item
       }
      })});
    }).catch((err) => {
        console.log(err)
    })
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
      BannerSkill
    } = this.state;

    
    const title = includeJobsInTitle
      ? `Jobs in  ${capitalizeWords(
          this.props.router.query?.url[0]?.split("-")
        ).join(" ")} - Rozgar.com`
      : `Jobs In ${capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(
        " "
      )} - Apply For ${capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(
        " "
      )} Jobs - Rozgar.com`;

      const description= `Apply To Jobs In ${capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(
        " "
      )} at Rozgar.com. Search your ${capitalizeWords(this.props.router.query?.url[0]?.split("-")).join(
        " "
      )} Jobs in top MNCs. Explore the Latest Job Vacancies Across Top Companies Now!` 
    

    return (
       
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta
            name="description"
            content={ description} />
          <link rel="canonical" href={"https://rozgar.com" + this.props.router.asPath} />
          <meta name="referrer" content="no-referrer-when-downgrade" />

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content={ description}
          />
          <meta
            property="og:url"
            content={"https://rozgar.com/" + this.props.router.asPath}
          />
          <meta
            property="og:image"
            content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
          />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content={ description}
          />
          <meta
            name="twitter:url"
            content={"https://rozgar.com/" + this.props.router.asPath}
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
          BannerSkill={BannerSkill}
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