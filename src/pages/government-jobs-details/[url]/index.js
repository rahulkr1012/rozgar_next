import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import { govJobDetail } from '@/action/jobDetail';
import { withRouter } from 'next/router';
import Loader from 'components/Loader'
import { GovtDeptbyState } from '@/action/dashboard';
import GovernmentSearch from 'components/JobList/GovernmentSearch';

const GovernmentJobsDetails = dynamic( () => import('components/GovernmentJobsList/GovernmentJobsDetails'), { loading: () => <Loader />, ssr: false });

class index extends Component {
  constructor(props){
    super(props);
    this.state = {
    GovtJobDetails:'' ,
    deptList:''    ,
    showLoader:false
    }
}
componentDidMount(){
      this.JobDetails()
      //.getDeptbyStateList()

}

JobDetails = () => {
  const url=this.props.router.query.url
  const Gov_Job_ID=this.props.router.asPath.split(`src-LIST-`)[1]
  this.setState({showLoader:true})
  govJobDetail(url,Gov_Job_ID).then(res => {
    this.setState({showLoader:true})
       if (res.status) {
           this.setState({GovtJobDetails:res.result})
           this.setState({showLoader:false})
           this.getDeptbyStateList(res.result.CATEGORY,res.result.STATE_ID)
       }
       else {
           console.log(res.error)
       }
      
   }).catch(err => {
     console.log(err)
   })
 }
 
 getDeptbyStateList= (CATEGORY,STATE_ID) => {
  this.setState({showLoader:true})
  GovtDeptbyState(CATEGORY,STATE_ID).then(res => {
    this.setState({showLoader:true})
       if (res.status) {
        this.setState({showLoader:false})
           this.setState({deptList:res.result.res})
       }
       else {
           console.log(res.error)
       }
 
   }).catch(err => {
     console.log(err)
   })
 }

 
  render() {
   const {GovtJobDetails,deptList,showLoader}=this.state
   const joburl= GovtJobDetails.STATE
   const GovtJobSJobTITLE=GovtJobDetails.JOB_TITLE
    return (
      <React.Fragment>
         <Head>
         <title >{GovtJobDetails.JOB_TITLE}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={GovtJobDetails.DESCRIPTION} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={GovtJobDetails.JOB_TITLE} />
                    <meta property="og:description" content={GovtJobDetails.DESCRIPTION} />
                    <meta property="og:url" content={"https://rozgar.com/"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={GovtJobDetails.JOB_TITLE} />
                    <meta name="twitter:description" content={GovtJobDetails.DESCRIPTION} />
                    <meta name="twitter:url" content={"https://rozgar.com/"+this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
         </Head>
         <FilteredHeader ud={this.state.ud} />
       
         {/* <GovernmentSearch 
         GovtJobSJobTITLE={GovtJobSJobTITLE}
         JobList={GovtJobDetails}
         joburl={joburl}
         /> */}
        <GovernmentJobsDetails
        showLoader={showLoader}
        GovtJobDetails={GovtJobDetails}
        deptList={deptList}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(index)

export async function getServerSideProps(index){
  const {req}  = index
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }