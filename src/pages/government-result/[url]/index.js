import React, { Component } from 'react'
import GovernmentResult from 'components/GovernmentResult'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import { GovtDeptbyState, getGovermentDeptResult, getGovermentStateURL } from '@/action/dashboard'
import { withRouter } from 'next/router'
import Loading from 'components/Loader'
import Head from 'next/head'
import { capFirstLetterInSentence } from '@/utils'

class index extends Component {
    constructor(props){
        super(props)
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
      this.deptResultList()
      //.getDeptbyStateList()
      this.getDeptStatebyURL()

}
getDeptStatebyURL=()=>{
  const url=this.props.router.query.url=="central"?"CENTRAL":this.props.router.query.url
  const category=this.props.router.query.url=="central"?"CENTRAL":"STATE"
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

    deptResultList = () => {
      const url =this.props.router.query.url
        getGovermentDeptResult(url,this.state.page).then(res => {
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
    const {stateResultList,deptList,resultlist,showLoader,Central,stateURLList}=this.state
    const title =`${capFirstLetterInSentence(this.props.router.query.url.split("-").join(" "))} Government Jobs Result - Rozgar.com`;
    const description =`Check the result of the latest government jobs in 
   ${capFirstLetterInSentence(this.props.router.query.url.split("-").join(" ")) } on Rozgar.com. it provides results of government jobs in ${capFirstLetterInSentence(this.props.router.query.url.split("-").join(" "))}.`;
    return (
<React.Fragment>
<FilteredHeader ud={this.state.ud} />
<Head>
         <title >{title}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={"Search the latest government jobs in 2023 in the state and central govt at Rozgar.com. Apply for govt job opportunities in central and state government."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={"Govt Jobs in India | Search Central And State Jobs - Rozgar.com"} />
                    <meta property="og:description" content={"Search the latest government jobs in 2023 in the state and central govt at Rozgar.com. Apply for govt job opportunities in central and state government."} />
                    <meta property="og:url" content={"https://rozgar.com/government-jobs"} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={"Govt Jobs in India | Search Central And State Jobs - Rozgar.com"} />
                    <meta name="twitter:description" content={"Search the latest government jobs in 2023 in the state and central govt at Rozgar.com. Apply for govt job opportunities in central and state government."} />
                    <meta name="twitter:url" content={"https://rozgar.com/government-jobs"} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <link rel="canonical" href="https://rozgar.com/government-jobs" />
         </Head>
    <GovernmentResult
    stateResultList={stateResultList}
         resultlist={resultlist}
         deptList={deptList}
         Central={Central}
         stateURLList={stateURLList} />
    
    {         showLoader  &&<Loading />}
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