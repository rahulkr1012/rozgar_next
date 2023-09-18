import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { FullStackDeveloperJobsInIndia } from '@/action/JobSearchIndia';
import { capFirstLetterInSentence } from 'utils'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import Loader from 'components/Loader'

let FullStackJob = dynamic(() => import('components/FullStackJobs/index'), {
    ssr: false,
    loading: () => <Loader />
})

class FullStackJobsIndia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullStackJobs: '',
        }

    }
    componentDidMount() {
        if (this.props.router.query.url) {
            FullStackDeveloperJobsInIndia({ KEYWORD_URL: this.props.router.query.url }).then(res => {
                if (res.status) {
                    this.setState({ fullStackJobs: res.result, showShimmer: false })
                    document.title = this.props.router.query.url + ' | Rozgar.com'
                }
                else {
                    alert(res.error)
                }

            }).catch(err => {
                alert(err)
            })
        }
    }
    render() {
        const { fullStackJobs } = this.state;

        let path = this.props.router.asPath
        return (
            <React.Fragment>
                {<Head >


                    <title title={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' '))}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <link rel="canonical" href={`https://rozgar.com`+this.props.router.asPath} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta property="og:url" content={`https://rozgar.com`+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(path.replace('/', '').split('/').pop().split('-').join(' ')) + " - Search &amp; Apply Premimum Full Stack Developer Jobs at Rozgar. Explore Full Stack Developer Jobs and Vacancies in your desired locations now!"} />
                    <meta name="twitter:url" content={path} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />

                </Head>}

                <FilteredHeader ud={this.props.ud} />

                <FullStackJob
                    fullStackJobs={fullStackJobs}
                    router={this.props.router}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(FullStackJobsIndia)

export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }
    }


}
