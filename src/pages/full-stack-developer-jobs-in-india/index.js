import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { Jobskeywordinindia } from '../../action/jobDetail';
// import JobsinIndia from 'components/FullStackJobsInIndia/index';
import constant from 'constant';
// import { capFirstLetterInSentence } from 'utils';
import Loading from 'components/Loader'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import FilteredHeader from "components/Filtered_Header";

let FullStackJobsInIndia = dynamic(() => import('components/FullStackJobsInIndia/index'), { loading: () => <Loading />, ssr: false })

export default class jobsinIndia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: 0,
            currentPage: 1,
            showLoader: false,
            ud : props.ud

        }
    }
    componentDidMount() {
        window.scroll(0, 0)
        document.title = constant.title.jobsinIndia
        this.getAllJobInIndia(this.state.currentPage)
       
    }

    getAllJobInIndia(page) {
        this.setState({ showLoader: true })
        Jobskeywordinindia(page).then(res => {
            console.log(res.result.count,"count");
            this.setState({ showLoader: false })
            this.setState({ list: res.result.list })
            this.setState({ count: res.result.count.total })
            window.scroll(0, 0)
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { list } = this.state
        return (
            <React.Fragment>

                <Head >


                    <title >Search And Apply Full Stack Developer Jobs - Rozgar.com</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Full Stack Developer Jobs In India " + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <link rel="canonical"  href={"https://rozgar.com/full-stack-developer-jobs-in-india"} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Search And Apply Full Stack Developer Jobs - Rozgar.com"} />
                    <meta property="og:description" content={"Full Stack Developer Jobs In India " + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta property="og:url" content={"https://rozgar.com/full-stack-developer-jobs-in-india"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Search And Apply Full Stack Developer Jobs - Rozgar.com"} />
                    <meta name="twitter:description" content={"Full Stack Developer Jobs In India " + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta name="twitter:url" content={"https://rozgar.com/full-stack-developer-jobs-in-india"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
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

                <FullStackJobsInIndia
                    getAllJobInIndia={(page) => this.getAllJobInIndia(page)}
                    List={list}
                    currentPage={this.state.currentPage}
                    count={this.state.count}
                />
            </React.Fragment>
        )
    }
}
