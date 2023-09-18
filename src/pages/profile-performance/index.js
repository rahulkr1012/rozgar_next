import React, { Component } from "react";
import { profilePreview, recruitorAction } from "@/action/profilePreviewAction";
import constant from "constant";
import { getCookie } from 'cookies-next'
import Head from "next/head";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from 'components/Filtered_Header'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
let ProfilePerformance  =dynamic(()=> import('../../../components/Edit_Profile/ProfilePerformance') ,  { 
 loading:()=> <Loader /> , 
    ssr:false 
} ) 

export default class ProfilePerformances extends Component {
     
     
    constructor(props) {
        super(props);
        this.state = {
            count: undefined,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            list: undefined,
            status: undefined
        };
    }
    Preview = () => {
        const { detail } = this.state;
        const { CANDIDATE_ID } = detail ? detail : "";
        if (CANDIDATE_ID) {
            profilePreview(CANDIDATE_ID)
                .then((res) => {
                    this.setState({ count: res.result.count.total, list: res.result.res, status: res.result.status.total });
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };
    Recruit = () => {
        const { detail } = this.state;
        const { CANDIDATE_ID } = detail ? detail : "";
        if (CANDIDATE_ID) {
            recruitorAction(CANDIDATE_ID)
                .then((res) => {
                    this.setState({ list1: res.result.res, status: res.result.status.total });
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }
     

    componentDidMount() {

        this.Preview();
        this.Recruit();
    }
     
    render() {
        const {ud}  = this.props 
        const { list, count, status, list1 } = this.state
        return (
            <React.Fragment>

                <Head>
                    <title title={'Profile Performance | Rozgar.com'}>{'Profile Performance | Rozgar.com'}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={'Profile Performance' + constant.metaDescription} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={'Profile Performance'} />
                    <meta property="og:description" content={'Profile Performance' + constant.metaDescription} />
                    <meta property="og:url" content={'https://rozgar.com/profile-performance'} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={'Profile Performance'} />
                    <meta name="twitter:description" content={'Profile Performance' + constant.metaDescription} />
                    <meta name="twitter:url" content={'https://rozgar.com/profile-performance'} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                </Head>
                 
                <FilteredHeader  ud={ud} />
                   
                <ProfilePerformance List={list}
                    List1={list1}
                    Count={count}
                    Status={status}
                />
            </React.Fragment>
        );
    }
}



export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
     
  if(ud==null) {
   return {
         redirect:{
            
             destination:"/?alert=true" ,
             permanent:false 

            }
         }    
      }

  return {
     props:{
       ud:ud   
     }
  }

}
