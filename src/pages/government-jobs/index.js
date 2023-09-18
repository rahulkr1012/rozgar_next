import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import LoadingOverlay from "react-loading-overlay";
import { SpinnerCircular } from 'spinners-react'
import Loader from 'components/Loader'
import { getCentralJobCount, getGovermentList } from '@/action/dashboard';

const GovernmentState = dynamic( () => import('components/GovernmentJobsList/GovernmentState'), { loading: () => <Loader />, ssr: false });

export default class index extends Component {
  constructor(props){
    super(props);
    this.state = {
     ud:this.props.ud,
     gorvList:'',
     count:'',
     showLoader:false

    }
}

componentDidMount(){
 this.GovermentList()
 getCentralJobCount().then(res => {
     if (res.status) {
         this.setState({count:res.result.city.centraljobpost})
     }
     else {
         console.log(res.error)
     }

 }).catch(err => {
   console.log(err)
 })
}


GovermentList = () => {
  this.setState({showLoader:true})
  getGovermentList().then(res => {
   //console.log(res,"result");
      if (res.status) {
          this.setState({gorvList:res.result.city})
          this.setState({showLoader:false})
      }
      else {
          console.log(res.error)
      }

  }).catch(err => {
    console.log(err)
    this.setState({showLoader:false})
  })
}

  render() {
    const {gorvList,count,showLoader}=this.state
    return (
      <React.Fragment>
         <Head>
         <title >Government Jobs 2023 | Latest Government Jobs India</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Latest govt job vacancies in states and central government. Details of government jobs in 2023. Search & apply for govt Job vacancies & openings."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Government Jobs 2023 | Latest Government Jobs India"} />
                    <meta property="og:description" content={"Latest govt job vacancies in states and central government. Details of government jobs in 2023. Search & apply for govt Job vacancies & openings."} />
                    <meta property="og:url" content={"https://rozgar.com/government-jobs"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Government Jobs 2023 | Latest Government Jobs India"} />
                    <meta name="twitter:description" content={"Latest govt job vacancies in states and central government. Details of government jobs in 2023. Search & apply for govt Job vacancies & openings."} />
                    <meta name="twitter:url" content={"https://rozgar.com/government-jobs"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href="https://rozgar.com/government-jobs" />
         </Head>
         <FilteredHeader ud={this.state.ud} />
      
        <GovernmentState
        showLoader={showLoader}
        count={count}
        GovermentList={gorvList}
        />
        
      </React.Fragment>
    )
  }
}

export async function getServerSideProps(index){
  const {req}  = index
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }