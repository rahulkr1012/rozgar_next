import { topCompanyImages } from '@/action/dashboard'
import { jobDetail, similarJobs } from '@/action/jobDetail'
import { capFirstLetterInSentence } from '@/utils'
import constant from 'constant'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter, withRouter } from 'next/router'
import { getLoggedInUserData } from 'nextCookie'
import React, { useEffect, useState } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import { getCookie, setCookie } from 'cookies-next'
import ReactModal from 'react-modal'
import { getBannerList, getSaveJobList, SaveJobs } from '@/action/CandidateAction'
import { generateTitle } from '@/utils'
import Loader from 'components/Loader'
const SignInForApplyJobs =  dynamic(() => import('components/signin/signInForApplyJobs'), { ssr: false   , loading:()=> <Loader /> })
const Jobdetails =  dynamic(() => import('components/job_detail/jobDetail'), { ssr: false   ,loading:()=> <Loader /> })

const index = (props) => {
 
  const { ud, detail, cities, TOP_COMPANY_IMAGES, similarJobList, companyDetail, url } = props
  const [detail1, setDetail1] = React.useState(getCookie(constant.keys.cd)
    ? JSON.parse(getCookie(constant.keys.cd))
    : '')
  const [openModal, setOpenModal] = useState(false)
  const [leftBar, setLeftBar] = useState(false)
  const [list, setList] = useState([])
  const [banner,setBanner]=useState()
  let router = useRouter();

  
  useEffect(()=>{
    const { CANDIDATE_ID } = detail1 ? detail1 : ''
    if(CANDIDATE_ID){
      getSaveJobLists()
    }
    getBannerList().then((res) => {
        setBanner(res.result.list)
    }).catch((err) => {
        console.log(err)
    })
  },[])

  const getSaveJobLists = () => {
    const { CANDIDATE_ID } = detail1 ? detail1 : ''
    getSaveJobList({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
        setList(res.result.list)
    }).catch((err) => {
        console.log(err)
    })
}


  // if (props.wrongUrl) {
  //   router.push(constant.component.homepage.url)
  // }
   
  const applyJobs = () => {
    const { CANDIDATE_ID } = detail1 ? detail1 : ''
    const { token } = detail1 ? detail1 : ''
    const { JOB_ID } = detail
    const model = {
      CANDIDATE_ID: CANDIDATE_ID,
      JOB_ID: JOB_ID
    }
    
    setCookie(constant.keys.addAndUpdate, model)
    // setCookie("JobUrl", `${url}`)
    if (CANDIDATE_ID && token) {
      router.push(constant.component.recommendedJobs.url);
    } else {
      onOpenModal()
    }
    
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setLeftBar(true)
}

const onOpenModal = () => {
    setOpenModal(true)
}
  return (

    <React.Fragment>
      <Head>

        <title > {detail.JOB_TITLE} </title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={ detail.JOB_DETAILS}  />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={detail.JOB_TITLE  } />
        <meta property="og:description" content={detail.JOB_DETAILS} />
        <meta property="og:url" content={"https://rozgar.com"+router.asPath} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="2000" />
        <meta property="og:image:height" content="3000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={detail.JOB_TITLE} />
        <meta name="twitter:description" content={detail.JOB_DETAILS} />
        <meta name="twitter:url" content={props.url} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />
        <link rel="canonical" href={"https://rozgar.com" + props.router.asPath} />
      </Head>

      <FilteredHeader ud={ud} />
      
       <Jobdetails
        detail={detail}
        cities={cities}
        TOP_COMPANY_IMAGES={TOP_COMPANY_IMAGES}
        companyDetail={companyDetail}
        similarJobList={similarJobList}
        ApplyJobs={applyJobs}
        banner={banner}
        // saveState={saveState}
        getSaveJobLists={()=>getSaveJobLists()}
        list={list}
        props={props.router}
      />
       

      {
        detail === null && <h1>Something Went Wrong</h1>
      }



                <ReactModal
                    isOpen={openModal}
                    style={{ content: { top: "5%", left: '30%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                    onRequestClose={()=>onCloseModal()}
                >
                    <SignInForApplyJobs
                        leftBar={leftBar}
                        history={props.router}
                        onCloseModal={()=>onCloseModal()}
                    />

                </ReactModal>
    </React.Fragment>
  )
}


export async function getServerSideProps(context) {
  const { req } = context
  let ud = getLoggedInUserData(req)
  let wrongUrl=null
  let detail=null
  let cities=null
  let companyDetail=null
  let title=null
  let similarJobsRes=null
  let similarJobList=null
  let url = context.req.headers.host + context.resolvedUrl
  const jobDetailRes = await jobDetail({ URL: context.params.url, QUERY: Object.keys(context.query)[0] })
  if(jobDetailRes.result){
     wrongUrl = jobDetailRes.result ? false : true
     detail = jobDetailRes.result.detail
     cities = jobDetailRes.result.cities
     companyDetail = jobDetailRes.result.companyDetail
     title = jobDetailRes.result.detail.JOB_TITLE + '- Rozgar.com'
     similarJobsRes = await similarJobs(jobDetailRes.result.detail.KEYWORDS)
     similarJobList = similarJobsRes.result ? similarJobsRes.result.similarJobList :''
  }


  // getSaveJobLists()
  let topCompanyImagesRes = await topCompanyImages()
  let TOP_COMPANY_IMAGES = topCompanyImagesRes.result.images
   
  return {
    props: {
      wrongUrl,
      detail,
      cities,
      companyDetail,
      title,
      similarJobsRes,
      similarJobList,
      TOP_COMPANY_IMAGES,
      url,
      ud: ud,
    }
  }


}
export default withRouter(index)
