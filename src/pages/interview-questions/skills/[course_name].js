import { getLoggedInUserData } from 'nextCookie'
import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { withRouter } from 'next/router'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import { InterviewQuestionSkillByUrl } from '@/action/SkillsQuestionAction';
import { topPremiumFeaturedCompanyList } from '@/actions/action'; 
import { interviewBySkill } from '@/action/SkillsQuestionAction';
import { latestjobs } from '@/action/SkillsQuestionAction';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
import { capitalizeWords } from '@/utils';
let BySkill  =  dynamic(()=> import('components/BySkillName') , {ssr:false , Loading:()=><Loader />  } )
 
 
class Index extends React.Component {
    
   constructor(props){
        super(props);
       this.state = {
        // detail:getStorage(constant.keys.cd),
        submited:false,
        inputChange:'',
        // inputChange:this.props.history.location.state.searchQuestion,
        id:undefined,
        urlDetail:undefined,
        detailList:undefined,
        shimmer:false ,
        ud:this.props.ud
       }
       
    }




    componentDidMount(){
        // const {searchQuestion} = this.props.history.location.state
          this.setState({path:this.props.router.asPath })
          this.InterviewQuestionSkill(this.props.router.asPath)
          this.TopPremiumFeaturedCompanyList()
            this.LatestJobs()
          // document.title = constant.title.interviewQuestion
          // this.InterviewQuestionSkill()
          // this.InterviewBySkill()
          // this.LatestJobs()
          // this.TopPremiumFeaturedCompanyList()
          // // if (searchQuestion){
          //   this.onInputSearch(searchQuestion)
          // // }
          
      }
      //done 
       
      InterviewBySkill = (skillId) =>{
        this.setState({loader:true})
        // const skillId = this.props.location.state.skillId
        interviewBySkill(skillId).then((res)=>{
          this.setState({list:res.result,loader:false})
        }).catch(err => {
          alert(err)
        })
      }
  
      onInputSearch = (value = "") =>{
        const skillId = this.props.location.state.skillId
        const modal = {
          setSkillId:skillId,
          KEYWORD:value,
        }

        skillQuestionAnswer(modal).then((res)=>{
          this.setState({list:res.result})
        }).catch(err =>{
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
  
      InterviewQuestionSkill = (url) =>{
   
        const data = url
        const d1 = data.split('/skills/')
        const URL = d1[1]
        InterviewQuestionSkillByUrl(URL).then((res)=>{
          this.setState({detailList:res.result})
          this.InterviewBySkill(res.result[0].SKILL_ID)
        }).catch(err => {
          alert(err)
        })
     }
     

  
  
  


render() {
     
//  if( this.props.router.asPath !==this.state.path  ){
//       this.InterviewQuestionSkill(this.props.router.asPath)
//       this.LatestJobs()
//       this.TopPremiumFeaturedCompanyList()
//       // this.onInputSearch()
//       this.setState({path:this.props.router.asPath})
//  }
const title=`Interview Questions For Skills ${ capitalizeWords(this.props.router.query.course_name.split("-")).join(
  " "
)}  | Rozgar.com`

const description=`Interview questions for the skills of ${ capitalizeWords(this.props.router.query.course_name.split("-")).join(
  " "
)} . Rozgar.com provides interview questions for students who are interested in ${ capitalizeWords(this.props.router.query.course_name.split("-")).join(
  " "
)} . `

 const {list,jobList,PREMIUM_COMPANIES} = this.state
 const URL = this.props.router.asPath
 const d1 = URL.split('/skills/')
 const skill_Name = d1[1]



         return ( 
        <React.Fragment>
   
           <Head>

<title >{title}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={description} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>

{/* og meta tag */}
<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={'https://rozgar.com'+this.props.router.asPath} />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />
{/* Twitter Meta Tag */}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:url" content={'https://rozgar.com'+this.props.router.asPath} />
<meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />

           </Head>
            
         <FilteredHeader  ud={this.state.ud}   />


       <BySkill
       jobList={jobList}
       PREMIUM_COMPANIES={PREMIUM_COMPANIES}
       List={list}
       history={this.props.history}
       //  InterviewBySkill={()this.InterviewBySkill()}
       onInputSearch = {(value)=>this.onInputSearch(value)}

         /> 




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



export async function getServerSideProps(context) {
     const {req }  = context
    //    console.log(context);
    //  let url = context.resolvedUrl
       let ud = getLoggedInUserData(req)
        
    //    let interViewQUestionList = await  InterviewQuestionSkill(url)
      
    return {
         props:{
             ud
         }
    }
     
}


const InterviewQuestionSkill = (url) =>{
         
     
    const data  =  url
    const d1 = data.split('/skills/')
    const URL = d1[1] 
     
    InterviewQuestionSkillByUrl(URL).then((res)=>{
      this.setState({detailList:res.result})
      this.InterviewBySkill(res.result[0].SKILL_ID)
    }).catch(err => {
      alert(err)
    })
     

  }

export default withRouter(Index)