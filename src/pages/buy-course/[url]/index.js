import React, { Component } from 'react'
import { courseListById } from '@/action/CandidateAction';
import { withRouter } from 'next/router';
import { capFirstLetterInSentence } from '@/utils';
import Loading from 'components/Loader'
import FilteredHeader from 'components/Filtered_Header'

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getLoggedInUserData } from 'nextCookie';


let BuyCourses = dynamic(() => import("components/BuyCourse/index"), { loading: () => <Loading />, ssr: false })

class buyCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: undefined
        }
    }

    componentDidMount() {
        const url = this.props.router.query.url;
        courseListById(url).then((res) => {
            if (res.status) {
                this.setState({ details: res.result });
                document.title = res.result
                    ? `${res.result?.COURSE_TITLE} || Learning Hub || Rozgar.com`
                    : `Learning Hub || Rozgar.com`;
            }
        });
    }
    render() {
        const { ud } = this.props;
        return (
            <React.Fragment>
                <Head >


                    <title title={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <link rel="canonical" href={this.props.router.asPath} />

                </Head>
                <FilteredHeader ud={ud} />
                <BuyCourses
                    details={this.state.details}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(buyCourse);

export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)

    return {
        props: { ud }
    }
}