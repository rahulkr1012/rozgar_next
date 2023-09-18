import { topCompanyImages } from '@/action/dashboard';
import { VideoJDJob } from '@/action/jobsByActions';
import constant from 'constant';
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

const Joblists = dynamic(() => import("components/Joblists/Joblists"), {
  loading: () => <Loader />,
  ssr: false,
});
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JOB_LIST: [],
            JOB_COUNT: undefined,
            CURRENT_PAGE: 1,
            aboutJobName: 'India',
            isLocation: false,
            CITIES: [],
            TOP_COMPANY_IMAGES: [],
            locatlities: [],
            ud:this.props.ud
        }

    }
    componentDidMount() {
        this.setState({ aboutJobName: 'HotSectors Video JD Jobs' })
        document.title = constant.title.HotSectorVideoJdJob
        window.scrollTo(0, 0)
        this.joblist(this.state.CURRENT_PAGE, {})
        // isLocationUrl(this.props.match.params.url).then(res => {
        //     if (res.status) {
        //         this.setState({ isLocation: res.result.status, CITIES: res.result.cities, locatlities: res.result.locatlities })
        //     }
        //     else {
        //         alert(res.error)
        //     }
        // }).catch(err => {
        //     
        //     alert(err)
        // })

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
    joblist = (page, data) => {
        this.setState({ JOB_COUNT: undefined })
        this.setState({JOB_LIST: [],})
        VideoJDJob({ limit: 25, page: page, filter: data}).then(res => {
            if (res.status) {
                this.setState({ JOB_LIST: res.result.count ? res.result.list : undefined, JOB_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }

        }).catch(err => {
            alert(err)
        })
    }
    filterData = (data) => {

        this.joblist(1, data)
    }
  render() {
    const { JOB_LIST, JOB_COUNT, CURRENT_PAGE, aboutJobName, isLocation, CITIES, TOP_COMPANY_IMAGES, locatlities,latestfresherjobs } = this.state
    return (
    <React.Fragment>
        <Head>
        <title data-react-helmet="true">Browse Hot Sector Video JD Jobs List - Rozgar.com </title> 
                <meta name="HandheldFriendly" content="True" />
                <meta name="description" content={"Apply for hot sector video JD jobs in different cities of India. Rozgar.com provides the best video JD jobs for employees who are looking for jobs." } />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:site_name" content="Rozgar.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:title"content={"Browse Hot Sector Video JD Jobs List - Rozgar.com"} />
                <meta property="og:description" content={  "Apply for hot sector video JD jobs in different cities of India. Rozgar.com provides the best video JD jobs for employees who are looking for jobs."} />
                <meta property="og:image:width" content="4000" />
                <meta property="og:image:height" content="6000" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={"Browse Hot Sector Video JD Jobs List - Rozgar.com"} />
                <meta name="twitter:description"  content={  "Apply for hot sector video JD jobs in different cities of India. Rozgar.com provides the best video JD jobs for employees who are looking for jobs."} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Smita Nag" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content="Career Advice, Career Insights" />
                <meta name="twitter:site" content="@rozgar_india" />
                <link rel="canonical" href={"https://rozgar.com/hot-sector-video-jd-jobs"} />

        </Head>
         
        <FilteredHeader ud={this.state.ud} />
        
        <Joblists
                    hideExperience={true}
                    JOB_LIST={JOB_LIST}
                    JOB_COUNT={JOB_COUNT}
                    joblist={(page, data) => { this.joblist(page, data) }}
                    CURRENT_PAGE={CURRENT_PAGE}
                    aboutJobName={aboutJobName}
                    isLocation={isLocation}
                    CITIES={CITIES}
                    TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
                    locatlities={locatlities}
                    filterData={(data) => this.filterData(data)}
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
