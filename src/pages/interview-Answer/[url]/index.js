import { withRouter } from 'next/router';
import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
// import { topPremiumFeaturedCompanyList } from '../../action/dashboard';
import { interviewQuestionById } from '@/action/SkillsQuestionAction';
import AddAnswer from 'components/InterviewQuestions/AddAnswer';
import { latestjobs } from '@/action/SkillsQuestionAction';
import constant from 'constant.js'
import { capFirstLetterInSentence } from 'utils';
import { getLoggedInUserData } from 'nextCookie';
import { topPremiumFeaturedCompanyList } from '@/action/dashboard';
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { getInterviewQuestionId } from '@/action/CompanyQuestionAction';
import dynamic from 'next/dynamic';
import Loading from 'components/Loader'

let InterviewAnswerSkills = dynamic(() => import("components/InterviewQuestions/AddAnswer/index"), { loading: () => <Loading />, ssr: false })


export default withRouter(class addAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobList: undefined,
            PREMIUM_COMPANIES: undefined,
            list1: undefined,
            loader: false,
            // INTERVIEW_QUESTIONS_ID: this.props.INTERVIEW_QUESTIONS_ID
        }
    }

    componentDidMount() {
        const question =this.props.router.query.url.split('-')
        const answersQuestion=question[question.length-1] 

        window.scrollTo(0, 0);
        // document.title = constant.title.interviewAnswer.replace('Question',)
        // const question = this.props.location.state.INTERVIEW_QUESTIONS_ID
        this.LatestJobs()
        this.TopPremiumFeaturedCompanyList()
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

        // document.title = constant.title.interviewAnswer.replace('Question',this.state.list1?this.state.list1[0].QUESTION_TITLE:'')
        const { jobList, PREMIUM_COMPANIES } = this.state
        let asPath = this.props.router.asPath
        let url=this.props.router.query.url
        // console.log("title",this.props.history.location)

        if (this.props.error) {
            return <h1> interview url not found </h1>
        }

        else {
            return (
                <React.Fragment>

                    <Head>
         
         
 <title >Interview Question - {url} </title> 
  <meta name="HandheldFriendly" content="True" />
  <meta name="description" content={ capFirstLetterInSentence(asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
  <link rel="canonical"  href={asPath} />
  <meta name="referrer" content="no-referrer-when-downgrade" />
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta property="og:site_name" content="Rozgar.com" />
  <meta property="og:title"content={ capFirstLetterInSentence(asPath.replace('/','').split('/').pop().split('-').join(' '))} />
  <meta property="og:description" content={ capFirstLetterInSentence(asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
  <meta property="og:url" content= {asPath}  />
  <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
  <meta property="og:image:width" content="4000" />
  <meta property="og:image:height" content="6000" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={capFirstLetterInSentence(asPath.replace('/','').split('/').pop().split('-').join(' '))} />
  <meta name="twitter:description"  content={ capFirstLetterInSentence(asPath.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
  <meta name="twitter:url"content= {asPath} />
  <meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
  <meta name="twitter:label1" content="Written by" />
  <meta name="twitter:data1" content="Smita Nag" />
  <meta name="twitter:label2" content="Filed under" />
  <meta name="twitter:data2" content="Career Advice, Career Insights" />
  <meta name="twitter:site" content="@rozgar_india" />
         </Head>

                    <FilteredHeader ud={this.props.ud} />

                    <InterviewAnswerSkills
                        jobList={jobList}
                        list1={this.state.list1}
                        router={this.props.router}

                        pathForId={this.props.router.query.INTERVIEW_QUESTIONS_ID}
                        COMPANY_NAME={this.props.router.query.url.COMPANY_NAME}
                        skill_Name={this.props.router.query.url.skill_Name}
                        PREMIUM_COMPANIES={PREMIUM_COMPANIES}
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
                        }} >
                            <LoadingOverlay
                                active={true}
                                spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                            >
                            </LoadingOverlay>
                        </div>
                    }

                </React.Fragment>
            )

        }

    }
})


export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)

    return {
        props: { ud },
    }
}

// export async function getServerSideProps(context) {
//     const { req, query } = context

//     let ud = getLoggedInUserData(req)
//     // let q_url = query.url
//     // let in_q_id = await getInterviewQuestionId(q_url)
//     // let { result: { INTERVIEW_QUESTIONS_ID } } = in_q_id

//     // if (in_q_id.result) {
//     //     return {
//     //         props: {
//     //             ud: ud,
//     //             INTERVIEW_QUESTIONS_ID
//     //         }, // will be passed to the page component as props
//     //     }

//     // } else {
//         return {
//             props: {
//                 ud, error: true
//             }
//         }
//     // }


// }

