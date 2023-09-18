import React, { Component } from 'react'
import { Jobskeywordsearchindia } from '../../action/jobDetail'
import Jobssearchindia from 'components/JobSearchIndia/index'
import constant from 'constant'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react'
import Loading from 'components/Loader'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import FilteredHeader from "components/Filtered_Header";
import { getLoggedInUserData } from 'nextCookie';

let JobSearchIndiaa = dynamic(() => import('components/JobSearchIndia/index'), { loading: () => <Loading />, ssr: false })


export default class Jobsearchindia extends Component {
  constructor(props){
    super(props)
    this.state={
      list:[],
      showLoader: false,
      ud : props.ud

    }
  }
  
  componentDidMount(){
    document.title=constant.title.JobSearchIndia
    this.getAllJobSearchIndia()
  }

  getAllJobSearchIndia(){
    this.setState({ showLoader: true })
    Jobskeywordsearchindia().then(res=>{
      this.setState({ showLoader: false })
      this.setState({list:res.result})
    }).catch(err=>{
      console.log(err);
    })
  }

  render() {
    const {list} = this.state
    return (
    <React.Fragment>

<Head >


<title >Search Your Latest Jobs In India - Rozgar.com</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ "Search for the latest job vacancies in India at Rozgar.com. Search and apply for various jobs available in India in different profiles. Search Jobs in India."} />

<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>

<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ "Search Your Latest Jobs In India - Rozgar.com"} />
<meta property="og:description" content={ "Search for the latest job vacancies in India at Rozgar.com. Search and apply for various jobs available in India in different profiles. Search Jobs in India."} />
<meta property="og:url" content= {"https://rozgar.com/job-search-india"}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Search Your Latest Jobs In India - Rozgar.com"} />
<meta name="twitter:description"  content={ "Search for the latest job vacancies in India at Rozgar.com. Search and apply for various jobs available in India in different profiles. Search Jobs in India."} />
<meta name="twitter:url"content= {"https://rozgar.com/job-search-india"} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />

<link rel="canonical" href={"https://rozgar.com/job-search-india"} />
</Head>
      			{this.state.showLoader &&
					<div style={{
						position: "fixed",
						zIndex: "999",
						left: "0",
						top: " 0",
						width: " 100%",
						height: " 100vh",
						overflow: "auto",
						padding: "210px",
						backgroundColor: "rgba(0, 0, 0, 0.4)"
					}}>
						<LoadingOverlay

							active={true}
							spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
						>
						</LoadingOverlay></div>}
            <FilteredHeader ud={this.state.ud} />

      <JobSearchIndiaa getAllJobSearchIndia={this.getAllJobSearchIndia} List={list}/>
    </React.Fragment>
    )
  }
}
export async function getServerSideProps(Jobsearchindia){
  const {req}  = Jobsearchindia
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }