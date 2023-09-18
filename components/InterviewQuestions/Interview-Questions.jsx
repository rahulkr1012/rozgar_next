import SearchBar from 'components/common/common/searchbar'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import constant from 'constant'
import { withRouter } from 'next/router'
import Designation from './Designation'
import { IQcompanyList, IQDesignationList, IQITSkillList } from '@/action/CompanyQuestionAction'
import JobsByLoader from 'components/JobsByLoader/JobsByLoader'
import { useRouter } from 'next/router'
import All from './All'

export default function InterviewQuestions() {
    const router = useRouter()

    const [IT_SKILL_LIST, setIT_SKILL_LIST] = useState([])
    const [NON_IT_SKILL_LIST, setNON_IT_SKILL_LIST] = useState([])
    const [IT_SKILL_LIST_COUNT, setIT_SKILL_LIST_COUNT] = useState(0)
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
        IQITSkillList().then(res => {
            if (res.status) {
                setIT_SKILL_LIST({ IT_SKILL_LIST: res.result.list, IT_SKILL_LIST_COUNT: res.result.count })
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
                setCOMPANY_LIST({ COMPANY_LIST: res.result.list, COMPANY_LIST_COUNT: res.result.count })
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

                                    {router.pathname === constant.component.interviewQuestionBySkills.url && (!IT_SKILL_LIST.length || !NON_IT_SKILL_LIST.length) && <JobsByLoader />}
                                    {router.pathname === constant.component.interviewQuestionBySkills.url && IT_SKILL_LIST.length > 0 && NON_IT_SKILL_LIST.length > 0 &&
                                        <Skills
                                            IT_SKILL_LIST={IT_SKILL_LIST}
                                            IT_SKILL_LIST_COUNT={IT_SKILL_LIST_COUNT}
                                            NON_IT_SKILL_LIST={NON_IT_SKILL_LIST}
                                            NON_IT_SKILL_LIST_COUNT={NON_IT_SKILL_LIST_COUNT}
                                        />
                                    }

                                    {router.pathname === constant.component.interviewQuestionByDesignation.url && !DesignationList.length && <JobsByLoader />}
                                    {
                                        router.pathname === constant.component.interviewQuestionByDesignation.url && DesignationList.length > 0 &&

                                        <Designation
                                            DesignationList={DesignationList}
                                            DESIGNATION_LIST_COUNT={DESIGNATION_LIST_COUNT}
                                        />
                                    }
                                    {router.pathname === constant.component.interviewQuestionByCompany.url &&
                                        !COMPANY_LIST.length && <JobsByLoader />
                                    }
                                    {router.pathname === constant.component.interviewQuestionByCompany.url &&
                                        COMPANY_LIST.length > 0 && < Company
                                            COMPANY_LIST={COMPANY_LIST}
                                            COMPANY_LIST_COUNT={COMPANY_LIST_COUNT}
                                        />
                                    }
                                    {/* {this.props.location.pathname == constant.component.jobsByCategory.url &&
                            (!FUNCTIONAL_AREA_LIST.length || !INDUSTRY_LIST) &&
                            <JobsByLoader />
                        }
                        {this.props.location.pathname == constant.component.jobsByCategory.url &&
                            FUNCTIONAL_AREA_LIST.length > 0 && INDUSTRY_LIST &&
                            <Category
                                FUNCTIONAL_AREA_LIST={FUNCTIONAL_AREA_LIST}
                                FUNCTIONAL_AREA_LIST_COUNT={FUNCTIONAL_AREA_LIST_COUNT}
                                INDUSTRY_LIST={INDUSTRY_LIST}
                                INDUSTRY_LIST_COUNT={INDUSTRY_LIST_COUNT}
                            />
                        } */}
                                    {/* {this.props.location.pathname === constant.component.jobsByLocation.url &&
                            (!LOCATION_LIST || !TOP_LOCATION) &&
                            <JobsByLoader />
                        }
                        {this.props.location.pathname === constant.component.jobsByLocation.url &&
                            LOCATION_LIST && TOP_LOCATION &&
                            <Location
                                LOCATION_LIST={LOCATION_LIST}
                                TOP_LOCATION={TOP_LOCATION}
                            />
                        } */}
                                    {router.pathname === constant.component.interviewQuestion.url &&
                                        // FUNCTIONAL_AREA_LIST.length > 0 && INDUSTRY_LIST &&
                                        DesignationList.length > 0 &&
                                        IT_SKILL_LIST.length > 0 && NON_IT_SKILL_LIST.length > 0 && <All
                                            // FUNCTIONAL_AREA_LIST={FUNCTIONAL_AREA_LIST}
                                            // INDUSTRY_LIST={INDUSTRY_LIST}
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
                                    {/* <div className='rightform'>
                            <h3>Register Now</h3>
                            <form className="roz-formtheme">
                                <div className="form-group">
                                    <input type="Name" name="Name" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <input type="mobile" name="mobile" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="form-group">
                                    <a href={constant.component.register.url}><button type="button" className="btnregister">Register</button></a>
                                </div>
                                <div className="form-group roz-signedcheck">
                                    <span>By registering with us you agree to our <a target='_blank' href={constant.component.Enquiry.url}>Terms & Conditions</a></span>
                                </div>
                            </form>
                        </div> */}
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
                                    {/* Sponsered Add */}
                                    {/* <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                            <a href="javascript:void(0);" title="">
                                <figure>
                                    <img src="./assets/images/adds-05.jpg" alt="img description" />
                                </figure>
                            </a>
                            <span>Ad</span>
                        </div> */}
                                    {/* Sponsered Add */}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}
