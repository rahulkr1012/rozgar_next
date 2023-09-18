import React, { Component } from 'react'
import { rozgarcompanydetail } from '@/action/jobsByActions'
import constant from 'constant'
import { capFirstLetterInSentence } from 'utils'
import dynamic from 'next/dynamic'
import FilteredHeader from 'components/Filtered_Header'
import { withRouter } from 'next/router'
import { getLoggedInUserData } from 'nextCookie'

let SwiggyJob = dynamic(()=> import( 'components/Companies/Swiggy/SwiggyJobs') ,{ssr:false})

export default  withRouter( class SwiggyJobs extends Component {
  constructor(props){
    super(props);
    this.state = {
     swiggy:"",
     count:''
     }
 }

  componentDidMount() {
    window.scroll(0, 0)
    this.rozgarcompanydetails()
   }

   rozgarcompanydetails = () => {
     rozgarcompanydetail({ LINK: "swiggy-16264"}).then(res => {
         if (res.status) {
             this.setState({ swiggy:res.result ,count:res.result.jobs.count})
         }
         else {
             console.log(res.error)
         }

     }).catch(err => {
       console.log(err)
     })
 }
  render() {
    const{count}=this.state;
    return (
      <React.Fragment>
       
                 <title title={ capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " Overview  – Jobs, Work Culture - Rozgar.com"}>{capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " Overview  – Jobs, Work Culture - Rozgar.com"}</title>
                    <meta name="description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + " Overview – Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
                   <link rel="canonical"  href={this.props.router.asPath} />
                    <meta name="atdlayout" content="jobsearch" />
                    <meta name="robots" content="ALL" />
                    <meta name="classification" content="Jobs &amp; Career Opportunities: Job Posting, Job Search, Apply Jobs, Career Explorer, Free CV" />
                    <meta name="pragma" content="no-cache" />
                    <meta name="rating" content="general" />
                    <meta name="revisit-after" content="1 day" />
                    <meta name="distribution" content="GLOBAL" />
                    <meta name="resource-type" content="document" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <meta name="author" content="rozgar.com" />
                    <meta name="content-language" content="EN" />
                    <meta name="copyright" content="2022 Rozgar.com" />

                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={this.props.router.asPath }/>
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={ capFirstLetterInSentence(this.props.router.asPath.replace('/','').split('/').pop().split('-').join(' ')) + " Overview – Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
                    <meta property="og:title" content={" Overview – Jobs, Work Culture - Rozgar.com"} />

                     <FilteredHeader ud={this.props.ud} />

        <SwiggyJob
         swiggy={this.state.swiggy}
         count={count}
        />

         
      </React.Fragment>
    )
  }
})





export async function getServerSideProps(context) {
    const { req }  = context
    let ud = getLoggedInUserData(req)
         return {
                props:{
                   ud
                }  
   }
  
    }
