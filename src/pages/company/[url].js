import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import { companyDetail, FollowCompany, isFollowedByMe } from '@/action/companyAction';
import { topCompanyImages } from '@/action/dashboard';
import constant from 'constant';
import { capFirstLetterInSentence } from 'utils';
import Loader from 'components/Loader'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
const Companydetail = dynamic(() => import('../../../components/Companies/companyDetail'), { loading: () => <Loader />, ssr: false });


class Companydetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: props.detail,
            jobs: props.jobs,
            TOP_COMPANY_IMAGES: props.TOP_COMPANY_IMAGES,
            isFollowedByMe: props.is_followed_by_me
        }
    }

    componentDidMount() {

        isFollowedByMe({ EMPLOYER_ID: this.props.detail.EMPLOYER_ID }).then(response => {
            if (response.status) {
                this.setState({ isFollowedByMe: response.result })
            }
        })

    }

    follow = (EMPLOYER_ID) => {

        FollowCompany({ EMPLOYER_ID: EMPLOYER_ID }).then(res => {
            if (res.status) {
                isFollowedByMe({ EMPLOYER_ID: EMPLOYER_ID }).then(response => {
                    if (response.status) {
                        this.setState({ isFollowedByMe: response.result })
                    }
                })
            }
        })
    }
    render() {
        const { detail, jobs, TOP_COMPANY_IMAGES, isFollowedByMe } = this.state
        const { url, ud, pathName, params } = this.props
        return (
            <React.Fragment>
                <Head>

                    <title title={`${detail.COMPANY_NAME} Overview - Work Culture, Jobs - Rozgar.com`}>{detail.COMPANY_NAME} Overview - Work Culture, Jobs - Rozgar.com</title>
                    <meta name="description" content={`Browse latest jobs in ${detail.COMPANY_NAME} . Apply for Job vacancies in ${detail.COMPANY_NAME} at Rozgar.com. Get details about ${detail.COMPANY_NAME} Jobs in India.`} />
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
                    <link rel="canonical" href={'https://rozgar.com' + this.props.router.asPath} />
                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={url} />
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={`Browse latest jobs in ${detail.COMPANY_NAME} . Apply for Job vacancies in ${detail.COMPANY_NAME} at Rozgar.com. Get details about ${detail.COMPANY_NAME} Jobs in India.`} />
                    <meta property="og:title" content={`Search latest Jobs in ${detail.COMPANY_NAME} - Rozgar.com`} />

                </Head>
                <FilteredHeader ud={ud} />

                

                <Companydetail
                    detail={detail}
                    isFollowedByMe={isFollowedByMe}
                    jobs={jobs}
                    follow={this.follow}
                    TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
                />

            </React.Fragment >
        )
    }
}

export default withRouter(Companydetails)

export async function getServerSideProps(context) {

    const { req } = context
    let ud = getLoggedInUserData(req)
    let detail = null;
    let jobs = null;
    let is_followed_by_me = false;
    let TOP_COMPANY_IMAGES = null;
    let companyDetailRes = await companyDetail(context.params.url)

    if (companyDetailRes.status) {
        detail = companyDetailRes.result.detail
        jobs = companyDetailRes.result.jobs
        if (ud) {
            // let isFollowedByMeRes = await isFollowedByMe({ EMPLOYER_ID: companyDetailRes.result.detail.EMPLOYER_ID })
            // console.log("isFollowedByMeRes",isFollowedByMeRes);
            // is_followed_by_me = isFollowedByMeRes.result
        }
    }
    else {
        return {
            redirect: "/",
            permanent: false
        }
    }

    let topCompanyImagesRes = await topCompanyImages()
    TOP_COMPANY_IMAGES = topCompanyImagesRes.result.images

    return {
        props: {
            url: context.req.headers.host + context.resolvedUrl,
            params: context.params,
            pathName: context.resolvedUrl,
            ud: ud,
            detail: detail,
            jobs: jobs,
            is_followed_by_me: is_followed_by_me,
            TOP_COMPANY_IMAGES: TOP_COMPANY_IMAGES

        }, // will be passed to the page component as props
    }
}