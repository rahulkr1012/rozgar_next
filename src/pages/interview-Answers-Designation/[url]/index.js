import Head from 'next/head';
import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { topPremiumFeaturedCompanyList } from '@/action/dashboard';
import { interviewQuestionById, latestjobs } from '@/action/SkillsQuestionAction';
import DesignationAnswer from "components/DesignationAnswer/index"
import constant from 'constant'
import { capFirstLetterInSentence } from '@/utils';
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import dynamic from 'next/dynamic';
import Loading from 'components/Loader'
import FilteredHeader from 'components/Filtered_Header'

let InterviewAnswerDesignation = dynamic(() => import("components/DesignationAnswer/index"), { loading: () => <Loading />, ssr: false })

 class designationAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: undefined,
            PREMIUM_COMPANIES: undefined,
            list1: undefined,
            loader: false,

        }
    }
    componentDidMount() {
        const question =this.props.router.query.url.split('-')
        const answersQuestion=question[question.length-1] 
        window.scrollTo(0, 0);
        this.LatestJobs()
        this.TopPremiumFeaturedCompanyList()
        // const question = this.props.location.state.INTERVIEW_QUESTIONS_ID
        this.InterviewQuestionById(answersQuestion)
    }
   InterviewQuestionById = (questionId) => {
        this.setState({ loader: true })
        interviewQuestionById(questionId).then((res) => {
            this.setState({ list1: res.result, loader: false })
        }).catch(err => {
            alert(err)
        })
    }
    LatestJobs = () => {
        latestjobs().then((res) => {
            this.setState({ jobList: res.result })
        }).catch(err => {
            alert(err)
        })
    }

    TopPremiumFeaturedCompanyList = () => {
        topPremiumFeaturedCompanyList().then(res => {
            if (res.status) {
                this.setState({ PREMIUM_COMPANIES: res.result.premium })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        // document.title = constant.title.interviewAnswer.replace('Question', this.state.list1 ? this.state.list1[0].QUESTION_TITLE : '')
        // window.scroll(0, 0);
        const { jobList, PREMIUM_COMPANIES } = this.state
        return (
            <React.Fragment>
                <Head >


                    {/* <title title={capFirstLetterInSentence(window.location.asPath.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(window.location.asPath.replace('/', '').split('/').pop().split('-').join(' '))}</title> */}
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <link rel="canonical" href={this.props.router.asPath} />
                </Head>
                <FilteredHeader ud={this.props.ud} />

                 <InterviewAnswerDesignation
                    list1={this.state.list1}
                    jobList={jobList}
                    pathForId={this.props.router.query.url.INTERVIEW_QUESTIONS_ID}
                    COMPANY_NAME={this.props.router.query.url.COMPANY_NAME}
                    skill_Name={this.props.router.query.url.skill_Name}
                    PREMIUM_COMPANIES={PREMIUM_COMPANIES}
                    router={this.props.router}
                    
                    />

                {this.state.loader &&
                    <div style={{
                        position: "fixed",
                        zIndex: "999",
                        left: "0",
                        top: " 0",
                        width: " 100%",
                        height: " 100%",
                        overflow: "auto",
                        padding: "210px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}>
                        <LoadingOverlay
                            active={true}
                            spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay>
                    </div>}
            </React.Fragment>
        )
    }
}

export default withRouter(designationAnswer)

export async function getServerSideProps(context) {
    const { req } = context

    let ud = getLoggedInUserData(req)

    return {
        props: { ud },
    }
}