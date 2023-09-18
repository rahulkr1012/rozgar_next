import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import { getCourseSpeczListForJobs, getResumeData } from '@/action/CandidateAction';
import ResumeViewTwo from 'components/ResumeViewTwo'
import constant from 'constant';
import { capFirstLetterInSentence, getStorage } from 'utils';
import Head from 'next/head';
import FilteredHeader from 'components/Filtered_Header'
import { browserName } from "react-device-detect"
import { connect } from 'react-redux';
import { getEduQualificationTypeListsForJobs } from '@/action/CandidateAction';



class resumeViewTwo extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      ud: this.props.ud,
      candidateList: this.props.resume_data?{...this.props.resume_data.result , PROFILE_IMAGE:this.props.resume_data.PROFILE_IMAGE}:undefined, 
      cd_list: undefined,
      detail: this.props.ud != null ? JSON.parse(this.props.ud[constant.keys.cd]) : '',
      mobileView: false
    }

  }




  componentDidMount() {
    // document.title = constant.title.ResumeViewTwo
    this.getDetailsByResume()
    if (window.location.href.includes('mobile=true') || browserName.includes('Chrome WebView')) {
      this.setState({ mobileView: true })
    }


  }


  getDetailsByResume = () => {

    const CANDIDATE_ID = this.state.detail.CANDIDATE_ID
    if (CANDIDATE_ID) {
      getResumeData(CANDIDATE_ID).then((res) => {
        this.setState({ candidateList: res.result })
      }).catch((err) => {
        alert(err)
      })
    }
  }




  getCourse = ( QUALIFICATION_ID ) => {

    return getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: QUALIFICATION_ID })
      .then((res) => {
        if (res.status) {
          return res.result
        }

      })
      .catch((err) => {
        alert(err);
      });

  };



  getSpecializeCourse = (EDUCATION_QUALIFICATION_ID) => {

    return getCourseSpeczListForJobs({
      EDUCATION_QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID,
    })
      .then((res) => {
        if (res.status) {
          return res.result
        }
      })
      .catch((err) => {
        alert(err);
      });
  };



  getDetailsByResume = () => {
    const CANDIDATE_ID = this.state.detail.CANDIDATE_ID
    if (CANDIDATE_ID) {
      getResumeData(CANDIDATE_ID).then((res) => {
        this.setState({ ...this.state, cd_list: res.result },  async () => {
 
    

       

            let social = this.state.candidateList.SocialProfile.map((ele, index)=>{
                    if(ele.SOCIAL_NAME=='linked in ')
                      return {...ele,SOCIAL_PROFILE:'L' } 
                      if(ele.SOCIAL_NAME=='I')
                      return {...ele,SOCIAL_PROFILE:'I' } 
                      if(ele.SOCIAL_NAME=='F')
                      return {...ele,SOCIAL_PROFILE:'F' } 
                      if(ele.SOCIAL_NAME=='L')
                      return {...ele,SOCIAL_PROFILE:'L' } 
                      if(ele.SOCIAL_NAME=='G')
                      return {...ele,SOCIAL_PROFILE:'G' } 
                      if(ele.SOCIAL_NAME=='G')
                      return {...ele,SOCIAL_PROFILE:'G' } 
                      if(ele.SOCIAL_NAME=='T')
                      return {...ele,SOCIAL_PROFILE:'T' } 
                      if(ele.SOCIAL_NAME=='O')
                      return {...ele,SOCIAL_PROFILE:'O' } 
            })
              
            

          this.setState({
            ...this.state , candidateList:{...this.state.candidateList } ,
            SocialProfile:social
          })
        })
      }).catch((err) => {
        alert(err)
      })
    }
  }





  render() {
    return (
      <React.Fragment>
        <Head >

          {<title title={" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}>{" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}</title>}

          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
          <link rel="canonical" href={this.props.router.asPath} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* og meta tag */}
          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta property="og:description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
          <meta property="og:url" content={"https://rozgar.com" + this.props.router.asPath} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          {/* Twitter Meta Tag */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta name="twitter:description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
          <meta name="twitter:url" content={"https://rozgar.com" + this.props.router.asPath} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
        </Head>

        <FilteredHeader ud={this.state.ud} />

        <ResumeViewTwo
         cd_list={this.state.cd_list}
         cd_id={this.state.detail.CANDIDATE_ID}
          candidateLists={this.state.candidateList}
          mobileView={this.state.mobileView}
        />


      </React.Fragment>
    )
  }
}



let mapStateToProps = (state) => {

  const { resumeData } = state
  return {
    resume_data: { result: JSON.parse(resumeData.result.data ), PROFILE_IMAGE:resumeData.result.PROFILE_IMAGE },
  };
};


let mapDispatchToProps = (dispatch) => {

  return {

  };
   
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(resumeViewTwo))



export async function getServerSideProps(context) {
  let { req } = context
  let ud = getLoggedInUserData(req)

  return {
    props: {
      ud
    }
  }

}

