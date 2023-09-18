import { GovtDeptbyState, getGovermentDeptJob, getGovermentStateURL, getGovtDeptResult } from '@/action/dashboard';
import Filtered_Header from 'components/Filtered_Header';
import dynamic from 'next/dynamic';
import Head from 'next/head'
import { withRouter } from 'next/router';
import { getLoggedInUserData } from 'nextCookie';
import React, { Component } from 'react'
import LoadingOverlay from "react-loading-overlay";
import { SpinnerCircular } from 'spinners-react'
import { capFirstLetterInSentence, capitalizeWords } from '@/utils';
const GovtDeptResult = dynamic( () => import('components/GovtDeptResult/index'), { ssr: false ,});

class index extends Component {
    constructor(props){
        super(props);
        this.state = {
         ud:this.props.ud,
         stateResultList:"",
         page:1,
         CATEGORY:'',
         STATE_ID:''  ,
        deptList:'' ,
        resultlist:'',
        showLoader:false,
        deptcount:'',
        stateURLList:''
       }
    }
    componentDidMount(){
      this.deptJobList()
      //.getDeptbyStateList()
      this.getDeptStatebyURL()

}
getDeptStatebyURL=()=>{
  const url=this.props.router.query.state=="central"?"CENTRAL":this.props.router.query.state
  const category=this.props.router.query.state=="central"?"CENTRAL":"STATE"
  this.setState({showLoader:true})
  getGovermentStateURL(url,category).then(res => {
    this.setState({showLoader:true})
       if (res.status) {
        this.setState({showLoader:false})
           this.setState({stateURLList:res.result.res,resultlist:res.result.res1})
       }
       else {
           console.log(res.error)
       }
      
 
   }).catch(err => {
     console.log(err)
   })
}

    deptJobList = () => {
        const url=this.props.router.query.url
        const id= this.props.router.query.id
        this.setState({showLoader:true})
        getGovtDeptResult(url,id,this.state.page).then(res => {
          this.setState({showLoader:true})
             if (res.status) {
              this.setState({showLoader:false})
                 this.setState({stateResultList:res.result.res,resultlist:res.result.res1})
                 this.getDeptbyStateList(res.result.res[0].CATEGORY,res.result.res[0].STATE_ID)
             }
             else {
                 console.log(res.error)
             }
            
       
         }).catch(err => {
           console.log(err)
         })
       }


    getDeptbyStateList= (CATEGORY,STATE_ID) => {
        this.setState({showLoader:true})
        GovtDeptbyState(CATEGORY,STATE_ID).then(res => {
             if (res.status) {
              this.setState({showLoader:false})
                 this.setState({deptList:res.result.res})
             }
             
             else {
                 console.log(res.error)
             }
       
         }).catch(err => {
           console.log(err)
         })
       }
  render() {
    const {stateResultList,deptList,resultlist,showLoader,Central,stateURLList,stateresultList}=this.state
    const title =`Government Jobs In ${capFirstLetterInSentence(this.props.router.query.url.split("-").join(" "))}- Rozgar.com`;
      const description =`Search for government jobs in ${(
        this.props.router.query?.url?.split("-")
      ).join(" ")}  at Rozgar.com. Apply for Government Jobs in different departments available here. Apply Now!`;

    return (
     <React.Fragment>
        <Head>
        <title >{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="Keywords" content={"Full-Time-Hiring " + ", Jobs in India, Jobs in Noida, Search & Apply Job"}></meta>
                    <meta name="description" content={description} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} /> 
                    <meta property="og:url" content={"https://rozgar.com/"+this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:url" content={"https://rozgar.com/"+this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
        </Head>
        <Filtered_Header ud={this.state.ud} />
        <GovtDeptResult
         stateResultList={stateResultList}
         resultlist={resultlist}
         deptList={deptList}
         Central={Central}
         stateURLList={stateURLList}
        />
          {showLoader && 
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
                             margin
                            active={true}
                            spinner={<SpinnerCircular  color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay></div>
                        
                        }
     </React.Fragment>
    )
  }
}
export default withRouter(index)

export async function getServerSideProps(index){
    const {req}  = index
  let ud = getLoggedInUserData(req) 
  
     return {
       props:{ud}
   }
   }