import React, { Component } from "react";
import constant from "constant";
import {
  RecommendedJobs,
  SaveJobs,
  getSaveJobList,
} from "@/action/CandidateAction";
import { topCompanyList } from "@/action/dashboard";
import { withRouter } from "next/router";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from "components/Filtered_Header";
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
import Head from "next/head";
let Dashboard  =dynamic(()=> import('components/Edit_Profile/Dashboard') ,  { 
 loading:()=> <Loader /> , 
    ssr:false 
} ) 

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      featuredList: [],
      totalCount: "",
      showShimmer: true,
      ud:this.props.ud
    };
  }

  componentDidMount() {
    // document.title = constant.title.MyRozgar;
    window.scrollTo(0, 0);
    this.RecommendedJobsList();
    this.FeaturedCompanyList();
  }

  RecommendedJobsList = () => {
    RecommendedJobs()
      .then((res) => {
        if (res.status) {
          setTimeout(() => {
            this.setState({ showShimmer: false });
          }, 1000);
        }
        this.setState({ totalCount: res.result.total });
        this.setState({ list: res.result.recommendedJobList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  FeaturedCompanyList = () => {
    topCompanyList()
      .then((res) => {
        this.setState({
          featuredList: [
            res.result.featured2darr[0].one,
            res.result.featured2darr[0].two,
            res.result.featured2darr[0].three,
            res.result.featured2darr[0].four,
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onProgress = () => {
    this.props.router.push(constant.component.editProfile.url);
  };

  render() {
    const {ud} = this.props
    return (
      <React.Fragment>
       

         <FilteredHeader ud={this.state.ud} />
         <Head>
          {/* <title title={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}>{ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))}</title> */}
          <title> My Rozgar , Rozgar.com </title>
          <meta name="HandheldFriendly" content="True" />
         
          <meta
            name="description"
            content={
              " Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
            }
          />
          <link rel="canonical" href={"https://rozgar.com/my-rozgar"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
        <Dashboard
          totalCount={this.state.totalCount}
          list={this.state.list}
          recommendedJobList={this.RecommendedJobsList}
          featuredList={this.state.featuredList}
          FeaturedCompanyList={this.FeaturedCompanyList}
          showShimmer={this.state.showShimmer}
          onProgress={this.onProgress}
        />
      </React.Fragment>
    );
  }
}




export async function getServerSideProps({ req }) {

  let ud = getLoggedInUserData(req)
   
  if (ud == null) {
      return {
          redirect: {
              destination: "/?alert=true",
              permanent: false

          }
      }
    } 

  return {
      props: {
          ud: ud
      }
  }


}


