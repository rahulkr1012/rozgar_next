import { jobsearchIndiaDetail } from '@/action/JobSearchIndia';
import { Joblistfresher } from '@/action/jobDetail';
import Shimmer from 'components/common/Shimmer';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Component, Suspense } from 'react'
import Loading from 'components/Loader'
import { withRouter } from 'next/router';
import FilteredHeader from "components/Filtered_Header";
import { getLoggedInUserData } from 'nextCookie';
import { capitalizeWords } from '@/utils';


let JobsSearchDetail = dynamic(() => import('components/JobsSearchDetail/JobsSearchDetail'), { loading: () => <Loading />, ssr: false })

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityDetail: undefined,
            jobsCount: undefined,
            localities: [],
            jobs: [],
            showShimmer: true,
            jobslist:"",
            pageNumber:1,
            limit:12,
            filter:'',
            ud : props.ud
        }
        
    }
    componentDidMount() {
        const {limit,pageNumber,filter}=this.state;
        if(this.props.router.query.KEYWORD_URL){
        jobsearchIndiaDetail({KEYWORD_URL:this.props.router.query.KEYWORD_URL}).then(res => {
            if (res.status) {
                this.setState({cityDetail:res.result,showShimmer: false})
             document.title = res.result.KEYWORD_NAME + ' | Rozgar.com'
            }
            else {
                alert(res.error)
            }

        }).catch(err => {
            alert(err)
        })
    }
    Joblistfresher({page:pageNumber,limit:limit,filter:filter}).then(res => {
        if (res.status) {
            this.setState({jobslist:res.result})
        }
    }).catch(err => {
        alert(err)
    })

    }

"Search Abroad Consultancy Jobs in India  - Rozgar.com"

  render() {
    const title =  `Search  ${capitalizeWords(
        this.props.router.query?.KEYWORD_URL.split("-")
      ).join(" ")} Jobs in India -  Rozgar.com`;


      const description=`Search for the latest ${capitalizeWords(
        this.props.router.query?.KEYWORD_URL?.split("-")
      ).join(" ")} Jobs in India at Rozgar.com. Search and apply for ${capitalizeWords(
       this.props.router.query?.KEYWORD_URL?.split("-")
     ).join(" ")}.Jobs available in India.`
    const { cityDetail,
        jobsCount,
        localities,
        jobs,
        showShimmer,jobslist } = this.state

    return (
    <React.Fragment>
        <Head>
        <title >{title}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ description} />
<link  rel="canonical" href={"https://rozgar.com" +this.props.router.asPath} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>

<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ title} />
<meta property="og:description" content={ description} />
<meta property="og:url" content= {"https://rozgar.com" +this.props.router.asPath}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description"  content={ description} />
<meta name="twitter:url"content= {"https://rozgar.com" +this.props.router.asPath} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />

        </Head>
         <Suspense fallback={<div><Shimmer /></div>}></Suspense>
         <FilteredHeader ud={this.state.ud} />
         <JobsSearchDetail
            cityDetail={cityDetail}
            showShimmer={showShimmer}
            jobslist={jobslist}
           
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