import React, { Component } from "react";
import dynamic from "next/dynamic";
import { isLocationUrl } from "@/action/jobDetail";
import { topCompanyImages } from "@/action/dashboard";
import { searchJobBy } from "@/action/jobsByActions";
import Head from "next/head";
import { capitalizeWords, toSeoUrl } from "@/utils";
import { withRouter } from "next/router";
import Loader from "@/pages/loader";
import { getLoggedInUserData } from "nextCookie";
import FilteredHeader from 'components/Filtered_Header'
import { getBannerList, getProduct } from "@/action/CandidateAction";
import { ToSeoUrl, capFirstLetterInSentence } from "utils";
import constant from "constant";
import { jobFaq } from "@/actions/jobsByAction";

const JobLists = dynamic(() => import("components/Joblists/Joblists"), {
    loading: () => <Loader />,
    ssr: true,
});


class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JOB_LIST: [],
            JOB_COUNT: undefined,
            CURRENT_PAGE: 1,
            aboutJobName: "India",
            locationJobName: '',
            isLocation: false,
            BannerSkill: [],
            CITIES: [],
            TOP_COMPANY_IMAGES: [],
            locatlities: [],
            includeJobsInTitle: false,
            Job_FAQ_List: ''
        };

    }

    componentDidMount() {

        let KEYWORD = this.props.router.asPath.split("-")
        KEYWORD.pop()
        KEYWORD = KEYWORD.join('-')
        KEYWORD = KEYWORD.slice(1)
        let location_KEYWORD = this.props.router.query.url.slice("jobs-in")[0].split('jobs-in-')[1]

        jobFaq({ KEYWORD: location_KEYWORD == undefined ? KEYWORD : location_KEYWORD }).then((res) => {
            this.setState({
                Job_FAQ_List: res.result.list
            });
        }).catch((err) => {
            console.log(err)
        })

        let urlspace = this.props.uppercaseLetters.replace('/', '')
        if (urlspace.length > 0) {
            this.props.router.push('/404')
        }
        if (this.props.propurl == true ? this.props.propurl == true : this.props.propsurls == true) { }
        else {
            this.props.router.push('/404')
        }
        let url = this.props.router.asPath.split("-")
        url.pop()
        url = url.join('-')
        url = url.slice(1)
        let location = this.props.router.query.url.slice("jobs-in")[0].split('jobs-in-')[1]
        this.setState({ locationJobName: location?.split("-").join(" ") })
        this.setState({
            aboutJobName: capitalizeWords(
                url?.split("-")
            ).join(" "),
        });
        document.title =
            capitalizeWords(url?.split("-")).join(" ") +
            " Jobs - Rozgar.com";

        getBannerList().then((res) => {
            this.setState({
                BannerSkill: res.result.list.map((item) => {
                    if (item.PAGE_LOCATION == "Job_by_skill") {
                        return item
                    }
                })
            });
        }).catch((err) => {
            console.log(err)
        })


        window.scrollTo(0, 0);
        this.joblist(this.state.CURRENT_PAGE, {});
        let url_location = this.props.router.query.url.slice("jobs-in")[0].split('jobs-in-')[1]
        isLocationUrl(url_location)
            .then((res) => {
                if (res.status) {
                    this.setState({
                        isLocation: res.result.status,
                        CITIES: res.result.cities,
                        locatlities: res.result.locatlities,
                    });

                    if (res.result.status) {

                        // document.title = `Jobs in  ${capitalizeWords(
                        //   this.props.router.query?.url[0]?.split("-")
                        // ).join(" ")} - Rozgar.com`;
                        this.setState({ includeJobsInTitle: true });
                    } else {
                        document.title =
                            capitalizeWords(this.props.router.query?.split("-")).join(
                                " "
                            ) + " Jobs - Rozgar.com";
                    }
                } else {
                    alert(res.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        topCompanyImages()
            .then((res) => {
                if (res.status) {
                    this.setState({ TOP_COMPANY_IMAGES: res.result.images });
                } else {
                    alert(res.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    joblist = (page, data) => {
        let url = this.props.router.asPath.split("-")
        url.pop()
        url = url.join('-')
        url = url.slice(1)
        const location = this.props.router.query.url.slice("jobs-in")[0].split('jobs-in-')[1]

        this.setState({ JOB_LIST: [], JOB_COUNT: undefined });
        searchJobBy({
            LIMIT: 25,
            URL: location == undefined ? url : location,
            page: page,
            filter: data,
        })
            .then((res) => {
                if (res.status) {
                    this.setState({
                        JOB_LIST: res.result.count ? res.result.list : undefined,
                        JOB_COUNT: res.result.count,
                    });
                } else {
                    alert(res.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    filterData = (data) => {
        this.joblist(1, data);
    };




    render() {
        const {
            includeJobsInTitle,
            JOB_LIST,
            JOB_COUNT,
            CURRENT_PAGE,
            aboutJobName,
            isLocation,
            CITIES,
            TOP_COMPANY_IMAGES,
            locatlities,
            BannerSkill,
            locationJobName,
            Job_FAQ_List
        } = this.state;

        const title = includeJobsInTitle
            ? ` ${capitalizeWords(
                this.props.router.query?.url[0]?.split("-")
            ).join(" ")} Jobs  , ${capitalizeWords(
                this.props.router.query?.url[0]?.split("-")
            ).join(" ")} Job Openings - Rozgar.com`
            : `${capitalizeWords(
                this.props.router.query?.url[0]?.split("-")
            ).join(" ")}   , ${capitalizeWords(
                this.props.router.query?.url[0]?.split("-")
            ).join(" ")}  Openings - Rozgar.com`;
        const description = `Apply To ${capitalizeWords(
            this.props.router.query?.url[0]?.split("-")
        ).join(" ")} Jobs On Rozgar.com. ${capitalizeWords(
            this.props.router.query?.url[0]?.split("-")
        ).join(" ")} Jobs Openings In Your Desired Locations Now!`
        console.log(Job_FAQ_List, "Job_FAQ_List");
        return (

            <React.Fragment>
                <Head>
                    <title>{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta
                        name="description"
                        content={description}
                    />
                    <link rel="canonical" href={"https://rozgar.com" + this.props.router.asPath} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={title} />
                    <meta
                        property="og:description"
                        content={description}
                    />
                    <meta
                        property="og:url"
                        content={"https://rozgar.com" + this.props.router.asPath}
                    />
                    <meta
                        property="og:image"
                        content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
                    />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta
                        name="twitter:description"
                        content={description}
                    />
                    <meta
                        name="twitter:url"
                        content={"https://rozgar.com" + this.props.router.asPath}
                    />
                    <meta
                        name="twitter:image"
                        content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
                    />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                </Head>

                <FilteredHeader ud={this.props.ud} />

                <JobLists
                    JOB_LIST={JOB_LIST}
                    JOB_COUNT={JOB_COUNT}
                    joblist={(page, data) => {
                        this.joblist(page, data);
                    }}
                    CURRENT_PAGE={CURRENT_PAGE}
                    aboutJobName={aboutJobName}
                    locationJobName={locationJobName}
                    isLocation={isLocation}
                    BannerSkill={BannerSkill}
                    CITIES={CITIES}
                    TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
                    locatlities={locatlities}
                    filterData={(data) => this.filterData(data)}
                    props={this.props}
                    Job_FAQ_List={Job_FAQ_List}
                />
            </React.Fragment>
        );
    }
}
export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)
    let propurl = context.resolvedUrl.split("jobs")[1] == ""
    let propsurls = context.resolvedUrl.split('/jobs-in-')[0] == ""
    let urlspace = context.resolvedUrl.replace(/-/g, ' ')
    let uppercaseLetters = "";
    for (let i = 0; i < urlspace.length; i++) {
        if (urlspace[i] === urlspace[i].toUpperCase() && isNaN(urlspace[i])) {
            uppercaseLetters += urlspace[i];
        }
    }
    let urlspaceremove = uppercaseLetters.replace(/ /g, "")
    return {
        props: {
            propurl: propurl,
            ud: ud,
            propsurls: propsurls,
            uppercaseLetters: urlspaceremove
        },
        // will be passed to the page component as props
    }

}

export default withRouter(index)
