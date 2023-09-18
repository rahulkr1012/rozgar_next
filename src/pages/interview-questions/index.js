import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import constant from 'constant'
import { IQcompanyList, IQDesignationList, IQITSkillList, IQNonITSkillList } from '@/action/CompanyQuestionAction'
import JobsByLoader from 'components/JobsByLoader/JobsByLoader'
import { useRouter } from 'next/router'
import All from '../../../components/InterviewQuestions/All'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'
import Loader from 'components/Loader'

import dynamic from 'next/dynamic'
const SearchBar = dynamic( () => import('components/common/common/searchbar'), { loading:()=><Loader /> ,   ssr: false });


export default function InterviewQuestions(props) {
    const router = useRouter()
    const [ud, setud]  = useState(props.ud)

    const [IT_SKILL_LIST, setIT_SKILL_LIST] = useState([])
    const [NON_IT_SKILL_LIST, setNON_IT_SKILL_LIST] = useState([])
    const [IT_SKILL_LIST_COUNT, setIT_SKILL_LIST_COUNT] = useState(0)
    const [NON_IT_SKILL_LIST_COUNT, setNON_IT_SKILL_LIST_COUNT] = useState(0)

    const [DesignationList, setDesignationList] = useState([])
    const [DESIGNATION_LIST_COUNT, setDESIGNATION_LIST_COUNT] = useState(0)
    const [FUNCTIONAL_AREA_LIST, setFUNCTIONAL_AREA_LIST] = useState([])
    const [FUNCTIONAL_AREA_LIST_COUNT, setFUNCTIONAL_AREA_LIST_COUNT] = useState(0)
    const [INDUSTRY_LIST, setINDUSTRY_LIST] = useState([])
    const [INDUSTRY_LIST_COUNT, setINDUSTRY_LIST_COUNT] = useState(0)
    const [COMPANY_LIST, setCOMPANY_LIST] = useState([])
    const [COMPANY_LIST_COUNT, setCOMPANY_LIST_COUNT] = useState(0)
    const [LOCATION_LIST, setLOCATION_LIST] = useState([])
    const [TOP_LOCATION, setTOP_LOCATION] = useState(null)

     
    useEffect(() => {

        IQNonITSkillList().then(res => {
            if (res.status) {
                setNON_IT_SKILL_LIST(res.result.list)
                setNON_IT_SKILL_LIST_COUNT(res.result.count)
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
        IQITSkillList().then(res => {
            if (res.status) {
                setIT_SKILL_LIST(res.result.list)
                setIT_SKILL_LIST_COUNT(res.result.count)
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        IQDesignationList().then(res => {
            if (res.status) {
                setDesignationList(res.result.list)
                setDESIGNATION_LIST_COUNT(res.result.count)
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
        IQcompanyList().then(res => {
            if (res.status) {
                setCOMPANY_LIST(res.result.list)
                setCOMPANY_LIST_COUNT(res.result.count)
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }, [])
    return (
        <React.Fragment>
         
             <Head>

             <title>Interview Questions by Skills, Designation, and Company - Rozgar.com</title>
             <meta name="HandheldFriendly" content="True" />
             <meta name="description" content={"Interview-Question " + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
             <link  href={"https://rozgar.com/interview-questions"} />
             <meta name="referrer" content="no-referrer-when-downgrade" />
             <meta name="viewport" content="width=device-width, initial-scale=1"/>
             
             <meta property="og:site_name" content="Rozgar.com" />
             <meta property="og:title" content={"Interview Questions by Skills, Designation, and Company - Rozgar.com"} />
             <meta property="og:description" content={"Interview-Question" + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
             <meta property="og:url" content={"https://rozgar.com/interview-questions"} />
             <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
             
             <meta name="twitter:card" content="summary_large_image" />
             <meta name="twitter:title" content={"Interview Questions by Skills, Designation, and Company - Rozgar.com"} />
             <meta name="twitter:description" content={"Interview-Question" + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
             <meta name="twitter:url" content={"https://rozgar.com/interview-questions"} />
             <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
             <meta name="twitter:label1" content="Written by" />
             <meta name="twitter:data1" content="Smita Nag" />
             <meta name="twitter:label2" content="Filed under" />
             <meta name="twitter:data2" content="Career Advice, Career Insights" />
             <meta name="twitter:site" content="@rozgar_india" />
             <meta property="og:image:width" content="4000" />
             <meta property="og:image:height" content="6000" />
             <link rel="canonical" href={"https://rozgar.com/interview-questions"} />
              
              </Head>
                  

         <FilteredHeader  ud={ud} />

            <main id="rg-main" className="rg-main rg-haslayout pt-0">
                <div className="rg-sectionspace rg-haslayout pt-0">
                    <div className="rozgar-jobbylocsearch">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">
                                    <SearchBar
                                    />
                                    <ul className='jobsbylocation-top jobsbylocation-list'>
                                        <li><Link style={{ background: 'none', color: 'white' }} href={constant.component.interviewQuestion.url}>Browse Interview Questions</Link></li>
                                        <li><Link href={constant.component.interviewQuestionBySkills.url} className={router.pathname === constant.component.interviewQuestionBySkills.url && 'active'}>By Skill</Link></li>
                                        <li><Link href={constant.component.interviewQuestionByCompany.url} className={router.pathname === constant.component.interviewQuestionByCompany.url && 'active'}>By Company</Link></li>
                                        <li><Link href={constant.component.interviewQuestionByDesignation.url} className={router.pathname === constant.component.interviewQuestionByDesignation.url && 'active'}>By Designation</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={router.pathname === constant.component.interviewQuestion.url ? 'rozgar-browseJobs' : 'rozgar-profile-main-content'}>
                        <div className='container'>
                            <div className='row'>
                                <div className={router.pathname !== constant.component.interviewQuestion.url ? 'col-md-9' : 'col-md-12'}>





                                    {router.pathname === constant.component.interviewQuestion.url &&
                                        DesignationList.length > 0 &&
                                        IT_SKILL_LIST.length > 0 && NON_IT_SKILL_LIST.length > 0 && <All
                                            DesignationList={DesignationList}
                                            IT_SKILL_LIST={IT_SKILL_LIST}
                                            NON_IT_SKILL_LIST={NON_IT_SKILL_LIST}
                                        />
                                    }

                                    {router.pathname === constant.component.interviewQuestion.url &&
                                        FUNCTIONAL_AREA_LIST.length == 0 && INDUSTRY_LIST && DesignationList.length == 0 &&
                                        IT_SKILL_LIST.length == 0 && NON_IT_SKILL_LIST.length == 0 && <><JobsByLoader />
                                            <JobsByLoader /></>
                                    }

                                </div>
                                {router.pathname !== constant.component.interviewQuestion.url && <div className='col-md-3'>

                                    <div className='rightform'>
                                        <h3>Popular Searches</h3>
                                        <ul className='popuraljobIncity'>
                                            <li><a href='https://rozgar.com/search-job?keyword=PHP%20Developer&location=Noida'>Latest PHP Jobs in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=noida">Full Stack Developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=React%20JS&location=noida">React Js Developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=JavaScript&location=noida">JavaScript Developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=UI%20Developer&location=noida">UI developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=mern%20developer&location=noida">Mern Developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=cloud%20computing&location=noida">Cloud Computing in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=IT&location=Noida">IT Jobs in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Python&location=noida">Python Developer in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=React%20JS&location=delhi">React Js Developer in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=JavaScript&location=delhi">JavaScript Developer in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=UI%20Developer&location=delhi">UI developer in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=cloud%20computing&location=delhi">Cloud Computing in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=delhi">Latest PHP Jobs in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=delhi">Full Stack Developer in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=IT&location=delhi">IT Jobs in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Python&location=delhi">Python Developer in Delhi</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=JavaScript&location=pune">JavaScript Developer in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=UI%20Developer&location=pune">UI developer in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=cloud%20computing&location=pune">Cloud Computing in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=pune">Latest PHP Jobs in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=pune">Full Stack Developer in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=pune">IT Jobs in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Python&location=pune">Python Developer in Pune</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=JavaScript&location=gurugram">JavaScript Developer in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=UI%20Developer&location=gurugram">UI developer in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=cloud%20computing&location=gurugram">Cloud Computing in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=gurugram">Latest PHP Jobs in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=gurugram">Full Stack Developer in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=IT&location=gurugram">IT Jobs in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Python&location=gurugram">Python Developer in Gurugram</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=aws&location=noida">AWS in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Machine%20Learning&location=noida">Machine Learning in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=blockchain&location=noida">BlockChain in Noida</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=Java">Java Developer</a></li>
                                            <li><a href="https://rozgar.com/search-job?keyword=NLP">Natural Language Processing</a></li>
                                        </ul>
                                    </div>
                                </div>
                             }
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </React.Fragment>
    )
}


export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    
    return {
        props: {
            ud: ud
        }
    }
  
  }
  
  


 
