import { companylist } from '@/action/companyAction';
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

const CompanyList = dynamic(() => import("components/company_list/CompanyList"), {
  loading: () => <Loader />,
  ssr: false,
});



export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        COMPANY_LIST: undefined,
        COUNT: 0,
        page: 1,
        filterdata: {
            LOCATION: [],
            CATEGORY: [],
            COMPANY_TYPE: []
        },
        KEYWORD: '' ,
        ud:this.props.ud
    }
}

componentDidMount() {
  this.list(this.state.page, this.state.filterdata)

}
filterData = (data) => {
  this.list(1, data)
}
list = (page, data) => {
  companylist({
      page: page,
      KEYWORD: this.state.KEYWORD,
      filter: data
  }).then(res => {
      if (res.status) {
          this.setState({ COMPANY_LIST: res.result.list, COUNT: res.result.count })
      }
      else {
          alert(res.error)
      }
  }).catch(err => {
      alert(err)
  })
}
onSearch = (page, filter, input) => {
  this.setState({ KEYWORD: input })
  companylist({
      page: page,
      KEYWORD: input,
      filter: filter
  }).then(res => {
      if (res.status) {
          this.setState({ COMPANY_LIST: res.result.list, COUNT: res.result.count })
      }
      else {
          alert(res.error)
      }
  }).catch(err => {
      alert(err)
  })
}
  render() {
    const { COMPANY_LIST, COUNT } = this.state
    return (
      <React.Fragment>
        
       <Head>
        <title > Apply for Jobs  in Top Companies - Rozgar.com</title>
                    <meta name="description" content={ "Search and apply for the latest job vacancies in top MNCs in India. Find your jobs in top companies and apply directly on Rozgar.com."} />
                    <meta name="atdlayout" content="jobsearch" />
                    <meta name="robots" content="ALL" />
                    <meta name="classification" content="Jobs &amp; Career Opportunities: Job Posting, Job Search, Apply Jobs, Career Explorer, Free CV" />
                    <meta name="pragma" content="no-cache" />
                    <meta name="rating" content="general" />
                    <meta name="revisit-after" content="1 day" />
                    <meta name="distribution" content="GLOBAL" />
                    <meta name="resource-type" content="document" />
                    <meta name="author" content="rozgar.com" />
                    <meta name="content-language" content="EN" />
                    <meta name="copyright" content="2022 Rozgar.com" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={"https://rozgar.com/list/companies" }/>
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={ "Search and apply for the latest job vacancies in top MNCs in India. Find your jobs in top companies and apply directly on Rozgar.com."} />
                    <meta property="og:title" content={"Apply for Jobs  in Top Companies - Rozgar.com"} />
                    <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={"Apply for Jobs  in Top Companies - Rozgar.com"} />
                <meta name="twitter:description"  content={"Search and apply for the latest job vacancies in top MNCs in India. Find your jobs in top companies and apply directly on Rozgar.com."} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:url"content= {"https://rozgar.com/list/companies"} />
                <meta name="twitter:data1" content="Smita Nag" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content="Career Advice, Career Insights" />
                <meta name="twitter:site" content="@rozgar_india" /> 
                <link rel="canonical" href="https://rozgar.com/list/companies" />             
           </Head>

        <FilteredHeader ud={this.state.ud}  />
         
 <CompanyList
  COMPANY_LIST={COMPANY_LIST}
  COUNT={COUNT}
  list={(page, filter) => { this.list(page, filter) }}
  filterData={(data) => { this.filterData(data) }}
  onSearch={(page, filter, input) => { this.onSearch(page, filter, input) }}
 
 />
      </React.Fragment>
    
    )
  }
}




export async function getServerSideProps(context) {

  const {req}  = context     
  let ud = getLoggedInUserData(req)

   return {
       props:{
           ud:ud
       }
  }
  
}
