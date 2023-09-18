import dynamic from 'next/dynamic';
import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { topPremiumFeaturedCompanyList } from '@/action/dashboard';
import { interviewQuestionById, latestjobs } from '@/action/SkillsQuestionAction';
import constant from 'constant'
import { capFirstLetterInSentence } from 'utils';
import Loading from 'components/Loader'
import { getLoggedInUserData } from 'nextCookie';
import { withRouter } from 'next/router';
import Head from 'next/head';

let InterviewAnswerCompany = dynamic(() => import('components/CompanyAnswer/index'), { loading: () => <Loading />, ssr: false })


 class companyAnswer extends Component {
    constructor(props){
        super(props);
        this.state = {
          jobList:undefined,
          PREMIUM_COMPANIES:undefined,
          list1:undefined,
          loader:false
        }
    }
    componentDidMount(){
      window.scrollTo(0, 0);
        // document.title = constant.title.interviewAnswer.replace('Question',)
        this.LatestJobs()
        this.TopPremiumFeaturedCompanyList()
        const question =this.props.router.query.url.split('-')
        const answQuestion=question[question.length-1]
        this.InterviewQuestionById(answQuestion)
    }
    InterviewQuestionById = (questionId) =>{
      this.setState({loader:true})
      interviewQuestionById(questionId).then((res)=>{
        this.setState({list1:res.result,loader:false})
      }).catch(err => {
        alert(err)
      })
    }
    LatestJobs = () => {
      latestjobs().then((res)=>{
        this.setState({jobList:res.result})
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
    // console.log("loveeee",this.props);
    //  constant.title = constant.title.interviewAnswer.replace('Question',this.state.list1?this.state.list1[0].QUESTION_TITLE:'')
    const {jobList,PREMIUM_COMPANIES} = this.state
    return (
      <React.Fragment>
                {/* <Head >


<title title={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + " | Rozgar.com"}>{ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))  + " | Rozgar.com"}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="Keywords" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + ", Jobs in India, Jobs in Noida, Search & Apply Job"}></meta>
<meta name="description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<link rel="canonical"  href={window.location.href} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta property="og:description" content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<meta property="og:url" content= {window.location.href}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' '))} />
<meta name="twitter:description"  content={ capFirstLetterInSentence(window.location.pathname.replace('/','').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
<meta name="twitter:url"content= {window.location.href} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
</Head> */}
        <InterviewAnswerCompany 
        list1 = {this.state.list1}
        jobList={jobList}
        pathForId={this.props.router.query.url.INTERVIEW_QUESTIONS_ID}
        COMPANY_NAME={this.props.router.query.url.COMPANY_NAME} 
        skill_Name={this.props.router.query.SKILL_Name}
        PREMIUM_COMPANIES={PREMIUM_COMPANIES}
        router={this.props.router}/>

              { this.state.loader &&
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
              {/* <LoadingOverlay
								active={true}
								spinner={<SpinnerCircular   color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
							>
							</LoadingOverlay> */}
              </div>
              }
      </React.Fragment>
    )
  }
}
export default withRouter(companyAnswer)

export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)

    return {
        props: { ud }
    }
}