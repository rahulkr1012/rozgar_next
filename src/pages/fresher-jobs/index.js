import { topCompanyImages } from '@/action/dashboard';
import { latestfresherjobs } from '@/action/jobsByActions';
import constant from 'constant';
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
import { jobFaq } from '@/actions/jobsByAction';
import { withRouter } from 'next/router';
const Loader = dynamic(() => import("components/Loader"), {
    ssr: false,
});
const Joblists = dynamic(() => import("components/Joblists/Joblists"), {
    loading: () => <Loader />,
    ssr: true,
});
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JOB_LIST: props.JOB_LIST ? props.JOB_LIST : [],
            JOB_COUNT: props.JOB_COUNT ? props.JOB_COUNT : undefined,
            CURRENT_PAGE: 1,
            aboutJobName: 'India',
            Job_FAQ_List:'',
            isLocation: false,
            CITIES: [],
            TOP_COMPANY_IMAGES: [],
            locatlities: [],
            ud: this.props.ud
        }
    }

    componentDidMount() {
        this.setState({ aboutJobName: 'Fresher Jobs' })
        document.title = constant.title.FresherJoblist
        window.scrollTo(0, 0)
        jobFaq({KEYWORD:'fresher'}).then((res) => {
            this.setState({
                Job_FAQ_List: res.result.list});
        }).catch((err) => {
            console.log(err)
        })
        // this.setState({ JOB_LIST: this.props.JOB_LIST, JOB_COUNT: this.props.JOB_COUNT })

        // this.joblist(this.state.CURRENT_PAGE, {})

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
        this.setState({ JOB_LIST: [], })
        latestfresherjobs({ limit: 25, page: page, filter: data }).then(res => {
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
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date()
        const { JOB_LIST, JOB_COUNT, CURRENT_PAGE, aboutJobName, isLocation, CITIES, TOP_COMPANY_IMAGES, locatlities ,Job_FAQ_List} = this.state
        const description = `Apply To ${JOB_COUNT} Fresher Jobs On Rozgar.com, #1 Job Portal In India. Explore Fresher Job Openings In Your Desired Locations Now!`
        const title = `Fresher Jobs, ${JOB_COUNT} Fresher Job Vacancies In  ${monthNames[d.getMonth()]} ${new Date().getFullYear()} - Rozgar.com`
        return (
            <React.Fragment>
                <Head>


                    <title title={title}>{title}</title>
                    <meta name="description" content={description} />
                    <link rel="canonical" href={"https://rozgar.com/fresher-jobs"} />
                    <meta name="atdlayout" content="jobsearch" />
                    <meta name="robots" content="ALL" />
                    <meta name="classification" content="Jobs &amp; Career Opportunities: Job Posting, Job Search, Apply Jobs, Career Explorer, Free CV" />
                    <meta name="pragma" content="no-cache" />
                    <meta name="rating" content="general" />
                    <meta name="revisit-after" content="1 day" />
                    <meta name="distribution" content="GLOBAL" />
                    <meta name="resource-type" content="document" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta name="author" content="rozgar.com" />
                    <meta name="content-language" content="EN" />
                    <meta name="copyright" content={`${new Date()} Rozgar.com`} />

                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={"https://rozgar.com/fresher-jobs"} />
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={description} />
                    <meta property="og:title" content={title} />
                </Head>

                <FilteredHeader ud={this.props.ud} />
                <Joblists
                    hideExperience={true}
                    Job_FAQ_List={Job_FAQ_List}
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

export default withRouter(index)

export async function getServerSideProps({ req }) {
    const res = await latestfresherjobs({ limit: 25, page: 1, filter: {} })
    let ud = getLoggedInUserData(req)
    const JOB_LIST = res.result.count ? res.result.list : undefined
    const JOB_COUNT = res.result.count
    return {
        props: {
            ud: ud,
            JOB_LIST: JOB_LIST,
            JOB_COUNT: JOB_COUNT
        }
    }

}