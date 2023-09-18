import React from 'react'
import ResumeViewOne from 'components/ResumeViewOne'
import { useRouter, withRouter } from 'next/router'
import { getLoggedInUserData } from 'nextCookie'
import constant from 'constant'
import { getResumeData } from '@/action/CandidateAction'
import ResumeTemplateOne from 'components/ResumeTemplate1'

import ResumeTemplateTwo from 'components/ResumeTemplate2';
import { mobile_view_resume_data } from '@/action/resume_mobile_app'

 class index extends React.Component{
  
     
   constructor(props){
   
    super(props)
     
    
     this.state  = {
           candidateList: { ...this.props.payload.data      , PROFILE_IMAGE:"Snapchat-2021291259.jpg" }, 
           cd_list: undefined,
           detail: this.props.payload.data.detail,
           mobileView: false
         }    

      
      
   }

   componentDidMount() {


    this.getDetailsByResume()



   }



   

  getDetailsByResume = () => {
    const CANDIDATE_ID = this.state.detail?.CANDIDATE_ID
    if (CANDIDATE_ID) {

      
      getResumeData(CANDIDATE_ID).then((res) => {
        this.setState({ ...this.state, cd_list: res.result },  async () => {
 
              

              
 
            var social =  this.state.candidateList.SocialProfile.map((ele, index)=>{
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
         <div>
          <Head><meta name="viewport"  /></Head>
        <ResumeTemplateOne 
        cd_list={this.state.cd_list}
        cd_id={this.state.detail?.CANDIDATE_ID}
        candidateLists={this.state.candidateList}
        mobileView={this.state.mobileView} 
        />
     
      </div>
      )
     
     }

    }





export default  withRouter(index) 



export async function getServerSideProps(context) {
  const res = await mobile_view_resume_data(context.query.data)
  let payload = {
    mobile: context.query.mobile,
    data: JSON.parse(res.result)
  }
  return {
    props: {
      payload
    }
  }
}
