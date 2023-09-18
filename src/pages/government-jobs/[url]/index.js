import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import { GovtDeptbyCount, getGovermentStateJob, getGovermentStateURL } from '@/action/dashboard';
import { withRouter } from 'next/router';
import { GovtDeptbyState } from '@/action/dashboard';
import { capitalizeWords } from '@/utils';
import Loader from 'components/Loader/index'


const GovernmentJobsList = dynamic( () => import('components/GovernmentJobsList/index'),  {
  loading: () => <Loader />,
  ssr: false,
});

class index extends Component {
  constructor(props){
    super(props);
    this.state = {
     ud:this.props.ud,
     stateJobList:"",
     page:1,
     CATEGORY:'',
     STATE_ID:''  ,
    deptList:'' ,
    joblist:'',
    showLoader:false,
    deptcount:'',
    stateURLList:'',
    DeptshowLoader:false
   }
}
componentDidMount(){
  this.StateJobList()
this.getDeptStatebyURL()

  
 }
getDeptStatebyURL=()=>{
  const url=this.props.router.query.url.split('-')[0]=="central"?"CENTRAL":this.props.router.query.url
  const category=this.props.router.query.url.split('-')[0]=="central"?"CENTRAL":"STATE"
  this.setState({showLoader:true})
  getGovermentStateURL(url,category).then(res => {
    this.setState({showLoader:true})
       if (res.status) {
        this.setState({showLoader:false})
           this.setState({stateURLList:res.result.res,joblist:res.result.res1})
       }
       else {
           console.log(res.error)
       }
      
 
   }).catch(err => {
     console.log(err)
   })
}


 StateJobList = () => {
  const url=this.props.router.query.url
  this.setState({showLoader:true})
  getGovermentStateJob(url,this.state.page).then(res => {
    this.setState({showLoader:true})
       if (res.status) {
        this.setState({showLoader:false})
           this.setState({stateJobList:res.result.res,joblist:res.result.res1})
           this.getDeptbyStateList(res.result.res[0].CATEGORY,res.result.res[0].STATE_ID)
       }
       else {
           console.log(res.error)
       }
      
 
   }).catch(err => {
     console.log(err)
   })
 }




 getDeptbyStateList= (CATEGORY,STATE_ID) => {
  this.setState({DeptshowLoader:true})
  GovtDeptbyState(CATEGORY,STATE_ID).then(res => {
       if (res.status) {
        this.setState({DeptshowLoader:false})
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
   const {stateJobList,deptList,joblist,showLoader,stateURLList,DeptshowLoader}=this.state
   const title =  `Govt Jobs in  ${capitalizeWords(
     this.props.router.query?.url.split("-")
   ).join(" ")} | Search ${capitalizeWords(
     this.props.router.query?.url?.split("-")
   ).join(" ")} Govt Jobs -  Rozgar.com`;


 const description=`Search Latest Government Jobs in ${capitalizeWords(
       this.props.router.query?.url?.split("-")
     ).join(" ")} state  at Rozgar.com. 
     latest govt job opportunities in ${capitalizeWords(
      this.props.router.query?.url?.split("-")
    ).join(" ")}. Search ${capitalizeWords(
      this.props.router.query?.url?.split("-")
    ).join(" ")} govt jobs in different departments`
const result=this.props.router.query.url.split('-')[0]

    return (
      <React.Fragment>
         <Head>
         <title >{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={description} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:url" content={"https://rozgar.com"+this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
         </Head>
         <FilteredHeader ud={this.state.ud} />
       
        <GovernmentJobsList
         stateJobList={stateJobList}
         showLoader={showLoader}
         joblist={joblist}
         deptList={deptList}
         DeptshowLoader={DeptshowLoader}
         stateURLList={stateURLList}
        />
      </React.Fragment>
    )
  }
}
export default  withRouter(index)

export async function getServerSideProps(index){
  const {req}  = index
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }
