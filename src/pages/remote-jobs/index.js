import { topCompanyImages } from '@/action/dashboard';
import { remotejobs } from '@/action/jobsByActions';
import constant from 'constant';
import Head from 'next/head'
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from "next/dynamic";
import { ToSeoUrl } from '@/utils';
import { getProduct } from '@/action/CandidateAction';
import { jobFaq } from '@/actions/jobsByAction';
const Loader = dynamic(() => import("components/Loader"), {
    ssr: false,
});
const Joblists = dynamic(() => import("components/Joblists/Joblists"), {
    loading: () => <Loader />,
    ssr: true,
});
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JOB_LIST: props.JOB_LIST ? props.JOB_LIST : [],
            JOB_COUNT: props.JOB_COUNT ? props.JOB_COUNT : undefined,
            productList:'',
            CURRENT_PAGE: 1,
            aboutJobName: 'India',
            isLocation: false,
            CITIES: [],
            TOP_COMPANY_IMAGES: [],
            locatlities: [],
            ud: this.props.ud,
            Job_FAQ_List:''
        }

    }

    componentDidMount() {
        this.setState({ aboutJobName: 'Remote Jobs' })
        // this.setState({ JOB_LIST: this.props.JOB_LIST, JOB_COUNT: this.props.JOB_COUNT })

        getProduct().then((ItemsResult) => {
            this.setState({
                productList:ItemsResult.ItemsResult.Items
            });
        }).catch((err) => {
            console.log(err)
        })
        document.title = constant.title.RemoteJoblist
        window.scrollTo(0, 0)
        jobFaq({KEYWORD:'remote'}).then((res) => {
            this.setState({
                Job_FAQ_List: res.result.list});
        }).catch((err) => {
            console.log(err)
        })
        // this.joblist(this.state.CURRENT_PAGE, {})
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
        this.setState({ JOB_LIST: [], })
        remotejobs({ limit: 25, page: page, filter: data }).then(res => {
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
        const { JOB_LIST, JOB_COUNT, CURRENT_PAGE, aboutJobName, isLocation, CITIES, TOP_COMPANY_IMAGES, locatlities, latestfresherjobs ,productList,Job_FAQ_List} = this.state

        return (
            <React.Fragment>
                <Head>
                    <title data-react-helmet="true">Remote Jobs - Remote Jobs Vacancies in 2023 </title>
                    <meta data-react-helmet="true" name="desccription" content="MY OTHER PAGE CONTENT" />


                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Apply for latest remote jobs on Rozgar.com. Search for full-time remote job openings in your favorite location. India`s latest remote job vacancies in 2023."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:url" content={"https://rozgar.com/remote-jobs"} />
                    <meta property="og:title" content={"Remote Jobs - Remote Jobs Vacancies in 2023 "} />
                    <meta property="og:description" content={"Apply for latest remote jobs on Rozgar.com. Search for full-time remote job openings in your favorite location. India`s latest remote job vacancies in 2023."} />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Remote Jobs - Remote Jobs Vacancies in 2023 "} />
                    <meta name="twitter:description" content={"Apply for latest remote jobs on Rozgar.com. Search for full-time remote job openings in your favorite location. India`s latest remote job vacancies in 2023."} />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:url" content={"https://rozgar.com/remote-jobs"} />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href="https://rozgar.com/remote-jobs" />
                </Head>

                <FilteredHeader ud={this.state.ud} />
                
                <Joblists
                    hideExperience={true}
                    JOB_LIST={JOB_LIST}
                    JOB_COUNT={JOB_COUNT}
                    productList={productList}
                    Job_FAQ_List={Job_FAQ_List}
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


export async function getServerSideProps({ req }) {
    const res = await remotejobs({ limit: 25, page: 1, filter: {} })
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


