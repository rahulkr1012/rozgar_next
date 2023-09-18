import React, { Component } from 'react'

import ResumeViewOne from 'components/ResumeViewOne'
// import '../../../../src/assets/css/rmaking/pillar-1.css'
import constant from 'constant'
import { getResumeData } from '@/action/CandidateAction'
import { capFirstLetterInSentence, getStorage } from 'utils';
import { getLoggedInUserData } from 'nextCookie';
import { withRouter } from 'next/router';
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { browserName } from "react-device-detect"
import { connect } from 'react-redux';
import { getEduQualificationTypeListsForJobs } from '@/action/CandidateAction';
import { getCourseSpeczListForJobs } from '@/action/CandidateAction';


class resumeViewOne extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      ud: this.props.ud,
      candidateList:
        this.props.router.query.mobile ? { ...JSON.parse(this.props.router.query.data), PROFILE_IMAGE: "Snapchat-2021291259.jpg" } :

          this.props.resume_data ? { ...this.props.resume_data.result, PROFILE_IMAGE: this.props.resume_data.PROFILE_IMAGE } : undefined,

      cd_list: undefined,
      detail: this.props.ud != null ? JSON.parse(this.props.ud[constant.keys.cd]) : '',
      mobileView: false
    }

  }


  componentDidMount() {

    this.getDetailsByResume()
    if (window.location.href.includes('mobile=true') || browserName.includes('Chrome WebView')) {
      this.setState({ mobileView: true })
    }
  }



  getCourse = (QUALIFICATION_ID) => {

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
        this.setState({ ...this.state, cd_list: res.result }, async () => {

          



          var social = this.state.candidateList.SocialProfile.map((ele, index) => {
            if (ele.SOCIAL_NAME == 'linked in ')
              return { ...ele, SOCIAL_PROFILE: 'L' }
            if (ele.SOCIAL_NAME == 'I')
              return { ...ele, SOCIAL_PROFILE: 'I' }
            if (ele.SOCIAL_NAME == 'F')
              return { ...ele, SOCIAL_PROFILE: 'F' }
            if (ele.SOCIAL_NAME == 'L')
              return { ...ele, SOCIAL_PROFILE: 'L' }
            if (ele.SOCIAL_NAME == 'G')
              return { ...ele, SOCIAL_PROFILE: 'G' }
            if (ele.SOCIAL_NAME == 'G')
              return { ...ele, SOCIAL_PROFILE: 'G' }
            if (ele.SOCIAL_NAME == 'T')
              return { ...ele, SOCIAL_PROFILE: 'T' }
            if (ele.SOCIAL_NAME == 'O')
              return { ...ele, SOCIAL_PROFILE: 'O' }
          })


          this.setState({
            ...this.state, candidateList: { ...this.state.candidateList },
            SocialProfile: social
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
          <title title={" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}>{" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={" View your resume after filling in all the details. Rozgar.com have the option to preview your resume by the template. "} />
          <link rel="canonical" href={"https://rozgar.com" + this.props.router.asPath} />

          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />


          {/* og meta tag */}
          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta property="og:description" content={" View your resume after filling in all the details. Rozgar.com have the option to preview your resume by the template. "} />
          <meta property="og:url" content={"https://rozgar.com" + this.props.router.asPath} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          {/* Twitter Meta Tag */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta name="twitter:description" content={" View your resume after filling in all the details. Rozgar.com have the option to preview your resume by the template. "} />
          <meta name="twitter:url" content={"https://rozgar.com" + this.props.router.asPath} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />

        </Head>

        <FilteredHeader ud={this.state.ud} />

        <ResumeViewOne
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
    resume_data: { result: JSON.parse(resumeData.result.data), PROFILE_IMAGE: resumeData.result.PROFILE_IMAGE },
  };


};


let mapDispatchToProps = (dispatch) => {

  return {

  };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(resumeViewOne))

export async function getServerSideProps(context) {
  let { req } = context
  let ud = getLoggedInUserData(req)


  return {
    props: {
      ud
    }
  }

}


