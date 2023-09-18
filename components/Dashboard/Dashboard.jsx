import React, { Component } from 'react'
import constant from 'constant'
import { companyList, DesignationList, FunctionalAreaList, IndustryList, ITSkillList, locationList, NonITSkillList, premiumCityList } from '@/action/jobsByActions'

import Link from 'next/link';
import SearchBar from 'components/common/common/searchbar';
import Skills from 'components/JobsByskills/JobsBySkills';
import Designation from 'components/JobsByDesignations/JobsByDesignation'
import JobsByLoader from 'components/JobsByLoader/JobsByLoader';
import Company from 'components/JobsByCompany/JobsByCompany';
import Category from 'components/JobsByCategory/JobsByCategory';
import Location from 'components/JobsByLocation/JobsByLocation';
import Head from 'next/head';
import { withRouter } from 'next/router';
import All from 'components/AllJobs/AllJobs';

 class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TYPES: "",
            IT_SKILL_LIST: [],
            NON_IT_SKILL_LIST: [],
            IT_SKILL_LIST_COUNT: undefined,
            NON_IT_SKILL_LIST_COUNT: undefined,
            DESIGNATION_LIST: [],
            DESIGNATION_LIST_COUNT: undefined,
            FUNCTIONAL_AREA_LIST: [],
            FUNCTIONAL_AREA_LIST_COUNT: undefined,
            INDUSTRY_LIST: [],
            INDUSTRY_LIST_COUNT: undefined,
            COMPANY_LIST: [],
            COMPANY_LIST_COUNT: undefined,
            LOCATION_LIST: null,
            TOP_LOCATION: null,

            
           
        }

        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        ITSkillList().then(res => {
            if (res.status) {
                this.setState({ IT_SKILL_LIST: res.result.list, IT_SKILL_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })


        NonITSkillList().then(res => {
            if (res.status) {
                this.setState({ NON_IT_SKILL_LIST: res.result.list, NON_IT_SKILL_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        
        DesignationList().then(res => {

            if (res.status) {
                this.setState({ DESIGNATION_LIST: res.result.list, DESIGNATION_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        FunctionalAreaList().then(res => {

            if (res.status) {
                this.setState({ FUNCTIONAL_AREA_LIST: res.result.list, FUNCTIONAL_AREA_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        IndustryList().then(res => {
            if (res.status) {
                this.setState({ INDUSTRY_LIST: res.result.list, INDUSTRY_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
        companyList().then(res => {
            if (res.status) {
                this.setState({ COMPANY_LIST: res.result.list, COMPANY_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        locationList().then(res => {
            if (res.status) {
                this.setState({ LOCATION_LIST: res.result })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        premiumCityList().then(res => {

            if (res.status) {
                this.setState({ TOP_LOCATION: res.result.city })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

    }
    //     componentDidUpdate(props) {
    // 
    //         switch (this.props.router.pathname) {

    //             case constant.component.jobsByLocation.url:
    //                 document.title = constant.title.JobsByLocation
    //                 break;
    //             case constant.component.jobsByCompany.url:
    //                 document.title = constant.title.JobsByCompany
    //                 break;
    //             case constant.component.jobsByCategory.url:
    //                 document.title = constant.title.JobsByCategory
    //                 break;
    //             case constant.component.jobsByDesignation.url:
    //                 document.title = constant.title.JobsByDesignation
    //                 break;
    //             case constant.component.jobsBySkill.url:
    //                 document.title = constant.title.JobsBySkill
    //                 break;
    //             default:
    //                 document.title = 'Rozgar.com'
    //         }
    //     }


    getData(type) {
        this.setState({ TYPES: type })
    }

  

    render() {
        const { IT_SKILL_LIST, IT_SKILL_LIST_COUNT, NON_IT_SKILL_LIST, NON_IT_SKILL_LIST_COUNT, DESIGNATION_LIST, DESIGNATION_LIST_COUNT,
            INDUSTRY_LIST, INDUSTRY_LIST_COUNT, FUNCTIONAL_AREA_LIST, FUNCTIONAL_AREA_LIST_COUNT, COMPANY_LIST, COMPANY_LIST_COUNT, LOCATION_LIST, TOP_LOCATION } = this.state;
            const { KEYWORD } = this.state;

        //     switch (this.props.router.pathname) {
        //     case constant.component.jobsByLocation.url:
        //         document.title = constant.title.JobsByLocation
        //         break;
        //     case constant.component.jobsByCompany.url:
        //         document.title = constant.title.JobsByCompany
        //         break;
        //     case constant.component.jobsByCategory.url:
        //         document.title = constant.title.JobsByCategory
        //         break;
        //     case constant.component.jobsByDesignation.url:
        //         document.title = constant.title.JobsByDesignation
        //         break;
        //     case constant.component.jobsBySkill.url:
        //         document.title = constant.title.JobsBySkill
        //         break;
        //     case constant.component.AllJobs.url:
        //         document.title = constant.title.AllJobs
        //         break;
        //     default:
        //         document.title = 'Rozgar.com'
        // }
        return (
            <React.Fragment>
                <Head>
                 <title > Browse Jobs by Company, Location, Skills, Designation & Industry | Rozgar.com Overview  – Jobs, Work Culture - Rozgar.com</title>
                 <meta name="Keywords" content={ "Browse Jobs by Company, Location, Skills, Designation & Industry" + " Overview – Know more about job opportunities, employee feedback and Ratings, work culture, immediate hirings etc at Rozgar.com."}></meta>
                 <meta name="description" content={"Browse Jobs by Company, Location, Skills, Designation & Industry" + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
                   <link rel="canonical"  href={"https://rozgar.com/jobs-by-skill"} />
                    <meta name="atdlayout" content="jobsearch" />
                    <meta name="robots" content="ALL" />
                    <meta name="classification" content="Jobs &amp; Career Opportunities: Post a job , Career Explorer, Job Search, Apply Jobs, Create Free CV" />
                    <meta name="pragma" content="no-cache" />
                    <meta name="rating" content="general" />
                    <meta name="revisit-after" content="1 day" />
                    <meta name="distribution" content="GLOBAL" />
                    <meta name="resource-type" content="document" />
                    <meta name="author" content="rozgar.com" />
                    <meta name="content-language" content="EN" />
                    <meta name="copyright" content="2022 Rozgar.com" />

                    <meta property="fb:app_id" content="2077422969016028" />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:url" content={"https://rozgar.com/jobs-by-skill" }/>
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:description" content={"Browse Jobs by Company, Location, Skills, Designation & Industry" + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
                    <meta property="og:title" content={"Browse Jobs by Company, Location, Skills, Designation & Industry | Rozgar.com Overview  – Jobs, Work Culture - Rozgar.com"} />

                </Head>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-jobbylocsearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">
                                        <SearchBar props={this.props.router}/>
                                        <ul className='jobsbylocation-top jobsbylocation-list'>
                                            <li>Browse Jobs</li>
                                            <li><Link href={constant.component.AllJobs.url} className={this.props.router.pathname === constant.component.AllJobs.url && 'active'}>All Jobs</Link></li>
                                            <li><Link href={constant.component.jobsByLocation.url} className={this.props.router.pathname === constant.component.jobsByLocation.url && 'active'}>Jobs by Location</Link></li>
                                            <li><Link href={constant.component.jobsByCompany.url} className={this.props.router.pathname === constant.component.jobsByCompany.url && 'active'}>Jobs by Company</Link></li>
                                            <li><Link href={constant.component.jobsByCategory.url} className={this.props.router.pathname === constant.component.jobsByCategory.url && 'active'}>Jobs by Category</Link></li>
                                            <li><Link href={constant.component.jobsByDesignation.url} className={this.props.router.pathname === constant.component.jobsByDesignation.url && 'active'}>Jobs by Designation</Link></li>
                                            <li><Link href={constant.component.jobsBySkill.url} className={this.props.router.pathname === constant.component.jobsBySkill.url && 'active'}>Jobs by Skill</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.router.pathname === constant.component.AllJobs.url ? 'rozgar-browseJobs' : 'rozgar-profile-main-content'}>

                            <div className='container p-0'>
                                <div className='row'>
                                    <div className={'col-md-12 p-0'}>
                                        {this.props.router.pathname === constant.component.jobsBySkill.url && (!IT_SKILL_LIST.length || !NON_IT_SKILL_LIST.length) && <JobsByLoader />}
                                        {this.props.router.pathname === constant.component.jobsBySkill.url && IT_SKILL_LIST.length > 0 && NON_IT_SKILL_LIST.length > 0 &&

                                            <Skills
                                                IT_SKILL_LIST={IT_SKILL_LIST}
                                                IT_SKILL_LIST_COUNT={IT_SKILL_LIST_COUNT}
                                                NON_IT_SKILL_LIST={NON_IT_SKILL_LIST}
                                                NON_IT_SKILL_LIST_COUNT={NON_IT_SKILL_LIST_COUNT}
                                            />
                                        }

                                        {this.props.router.pathname === constant.component.jobsByDesignation.url && !DESIGNATION_LIST.length && <JobsByLoader />}


                                        {
                                            this.props.router.pathname === constant.component.jobsByDesignation.url && DESIGNATION_LIST.length > 0 &&

                                            <Designation

                                                ONCHANGE={this.getData}
                                                DESIGNATION_LIST={DESIGNATION_LIST}
                                                DESIGNATION_LIST_COUNT={DESIGNATION_LIST_COUNT}
                                            />
                                        }


                                        {/* <div className={DESIGNATION_LIST.length > 0 ? 'jobsbylocationColumn colCount_four' : 'jobsbylocationColumn'}>
                                            { DESIGNATION_LIST.length > 0 ? DESIGNATION_LIST.map((item, index) => {
                                                return (<Link href={{
                                                        pathname: constant.component.joblist.url.replace(':url', item.URL),
                                                        state: [{ KEYWORD: item.DESIGNATION }]
                                                    }}> {item.DESIGNATION} </Link>)
                                                }) : 
                                                <Spinner animation="border" role="status">
                                                <span className="visually-hidden"> Loading...</span>
                                            </Spinner>
                                            }

                                        </div> */}



                                        {this.props.router.pathname === constant.component.jobsByCompany.url &&
                                            !COMPANY_LIST.length && <JobsByLoader />
                                        }
                                        {this.props.router.pathname === constant.component.jobsByCompany.url &&
                                            COMPANY_LIST.length > 0 && < Company
                                                COMPANY_LIST={COMPANY_LIST}
                                                COMPANY_LIST_COUNT={COMPANY_LIST_COUNT}
                                            />
                                        }

                                        {this.props.router.pathname == constant.component.jobsByCategory.url &&
                                            (!FUNCTIONAL_AREA_LIST.length || !INDUSTRY_LIST) &&
                                            <JobsByLoader />
                                        }
                                        {this.props.router.pathname == constant.component.jobsByCategory.url &&
                                            FUNCTIONAL_AREA_LIST.length > 0 && INDUSTRY_LIST &&

                                            <Category
                                                FUNCTIONAL_AREA_LIST={FUNCTIONAL_AREA_LIST}
                                                FUNCTIONAL_AREA_LIST_COUNT={FUNCTIONAL_AREA_LIST_COUNT}
                                                INDUSTRY_LIST={INDUSTRY_LIST}
                                                INDUSTRY_LIST_COUNT={INDUSTRY_LIST_COUNT}
                                            />

                                        }
                                        {this.props.router.pathname === constant.component.jobsByLocation.url &&
                                            (!LOCATION_LIST || !TOP_LOCATION) &&
                                            <JobsByLoader />
                                        }
                                        {this.props.router.pathname === constant.component.jobsByLocation.url &&
                                            LOCATION_LIST && TOP_LOCATION &&
                                            <Location
                                                LOCATION_LIST={LOCATION_LIST}
                                                TOP_LOCATION={TOP_LOCATION}
                                            />
                                        }

                                        {this.props.router.pathname === constant.component.AllJobs.url &&
                                            FUNCTIONAL_AREA_LIST.length > 0 && INDUSTRY_LIST && DESIGNATION_LIST.length > 0 &&
                                            IT_SKILL_LIST.length > 0 && NON_IT_SKILL_LIST.length > 0 && <All
                                                FUNCTIONAL_AREA_LIST={FUNCTIONAL_AREA_LIST}
                                                INDUSTRY_LIST={INDUSTRY_LIST}
                                                DESIGNATION_LIST={DESIGNATION_LIST}
                                                IT_SKILL_LIST={IT_SKILL_LIST}
                                                NON_IT_SKILL_LIST={NON_IT_SKILL_LIST}
                                            />
                                        }



                                        {this.props.router.pathname === constant.component.AllJobs.url &&
                                            FUNCTIONAL_AREA_LIST.length == 0 && INDUSTRY_LIST && DESIGNATION_LIST.length == 0 &&
                                            IT_SKILL_LIST.length == 0 && NON_IT_SKILL_LIST.length == 0 && <React.Fragment>
                                                <JobsByLoader /></React.Fragment>
                                        }

                                    </div>

                                    {this.props.router.pathname !== constant.component.AllJobs.url && <div className='col-md-3'>
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
                                        {/* <div className='rightform'>
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
                                        </div> */}
                                        {/* <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <a href="javascript:void(0);" title="">
                                                <figure>
                                                    <img src="./assets/images/adds-05.jpg" alt="img description" />
                                                </figure>
                                            </a>
                                            <span>Ad</span>
                                        </div> */}

                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(Dashboard)