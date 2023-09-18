import Router from 'next/router';
import React, { Component } from 'react'
import { companyDetail ,FollowCompany, isFollowedByMe } from '@/action/companyAction';
import { topCompanyImages } from '@/action/dashboard';
import constant from 'constant';
import FilteredHeader from 'components/Filtered_Header'

import { capFirstLetterInSentence, getStorage } from 'utils';
import dynamic from 'next/dynamic';
import Loading from 'components/Loader'
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
let Swiggy = dynamic(()=> import('components/Swiggy') ,{ ssr:false , loading:()=> <Loading /> })  
let Greenlamindustries  = dynamic(()=> import('components/Greenlamindustries') ,{ ssr:false , loading:()=> <Loading /> })  ;
const Companydetail = dynamic( () => import('components/Companies/companyDetail'), { ssr: false ,loading:()=> <Loading />  });
  


export default withRouter ( class Companydetails extends Component {
    
     constructor(props) {
        super(props);
        this.state = {
            detail: this.props.ud?JSON.parse(this.props.ud[constant.keys.cd]) :undefined ,
            jobs: undefined,
            TOP_COMPANY_IMAGES: undefined,
            isFollowedByMe: false
        }
         
    }
    componentDidMount() {
 
            
        window.scrollTo(0, 0)
        const tk = this.state.detail?this.state.detail.token:null
       let params =this.props.router.asPath
        companyDetail(params.split('/company/')[1]).then(res => {
            if (res.status) {
                this.setState({ detail: res.result.detail, jobs: res.result.jobs })
                if (tk) {
                    isFollowedByMe({ EMPLOYER_ID: res.result.detail.EMPLOYER_ID }).then(response => {
                        if (response.status) {
                            this.setState({ isFollowedByMe: response.result })
                        }
                    })
                }
            }
            else {
                Router.push(constant.component.homepage.url)
            }
             
        })

        topCompanyImages().then(res => {
            if (res.status) {
                this.setState({ TOP_COMPANY_IMAGES: res.result.images })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }


    follow = (EMPLOYER_ID) => {
        
        const tk = this.state.detail?this.state.detail.token:null
         
        FollowCompany({ EMPLOYER_ID: EMPLOYER_ID }).then(res => {
            if (res.status) {
                companyDetail(this.props.match.params.url).then(res => {
                    if (res.status) {
                        this.setState({ detail: res.result.detail, jobs: res.result.jobs })
                        if (tk) {
                            isFollowedByMe({ EMPLOYER_ID: res.result.detail.EMPLOYER_ID }).then(response => {
                                if (response.status) {
                                    this.setState({ isFollowedByMe: response.result })
                                }
                            })
                        }
                    }
                    else {
                        alert(res.error);
                    }
                })
            }
        })
    }
    render() {
        const { detail, jobs, TOP_COMPANY_IMAGES, isFollowedByMe } = this.state
        let params =this.props.router.asPath
        const url = params.split('/company/')[1];

        return (
            <React.Fragment>
                
                    <title title={"Swiggy Overview  – Jobs, Work Culture - Rozgar.com"}>{"Swiggy Overview  – Jobs, Work Culture - Rozgar.com"}</title>
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " -Overview – Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
                    <link rel="canonical" href={this.props.router.asPath} />
                    <meta name="atdlayout" content="jobsearch" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

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

                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " -Overview – Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."} />
                    <meta property="og:title" content={constant.title.Companydetails + " Overview  – Jobs, Work Culture - Rozgar.com" + " Overview – Jobs, Work Culture - Rozgar.com"} />

            <FilteredHeader ud={this.props.ud} />

            
                    <Swiggy />
                      
                        <Companydetail
                            detail={detail}
                            isFollowedByMe={isFollowedByMe}
                            jobs={jobs}
                            follow={this.follow}
                            TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
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
