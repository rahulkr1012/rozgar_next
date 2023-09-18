import React, { Component } from 'react'
import { topPremiumFeaturedCompanyList } from '../../../action/dashboard';
import { InterviewQuestionSearch } from '../../../action/SkillsQuestionAction';
import constant from 'constant'
import { capFirstLetterInSentence } from '@/utils';
import Shimmer from 'components/common/Shimmer/index';
import { SpinnerCircular } from 'spinners-react';
import LoadingOverlay from 'react-loading-overlay';
import Head from 'next/head';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'

import Router,{ withRouter } from 'next/router';
export default withRouter(class CommonSearchQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: getCookie(constant.keys.cd),
            submited: false,
            inputChange: this.props.query.keyword,
            id: undefined,
            urlDetail: undefined,
            detailList: undefined,
            shimmer: false,
            List: undefined,
            path: "",
            PREMIUM_COMPANIES: undefined,
            change: false,
            loader: false
        }
    }
    onInputClick = (e) => {
        const { inputChange } = this.state
        if (inputChange && inputChange != undefined && inputChange != "") {
            this.InterviewQuestion(inputChange)
            this.setState({ change: false })
            Router.push({
                pathname: constant.component.commonSearchQuestion.url.replace(':Keyword', inputChange),
                state: { SearchQuestion: inputChange }
            })
        } else {
            this.setState({ change: true })
        }
    }
    componentDidMount() {
        this.setState({ path: this.props.url })
        this.TopPremiumFeaturedCompanyList()

    }

    InterviewQuestion = (SearchQuestion = "") => {
        this.setState({ loader: true })

        InterviewQuestionSearch(SearchQuestion).then((res) => {
            this.setState({ List: res.result.list, loader: false })
            
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
    render() {
        const { List, PREMIUM_COMPANIES } = this.state
        const SearchQuestion = this.props.query.keyword
        if(this.state.path !== this.props.query.url){
        this.setState({path:this.props.query.url})
        this.InterviewQuestion(SearchQuestion)
        }
        return (
            <React.Fragment>
                <Head >

                    <title >{constant.title.commonInterviewAnswer.replace('Questions',SearchQuestion)}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="description" content={capFirstLetterInSentence(this.props.pathName.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.pathName.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.pathName.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta property="og:url" content={this.props.url} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.pathName.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.pathName.replace('/', '').split('/').pop().split('-').join(' ')) + "The most common job interview questions that employers ask, examples of the best answers for each question, and tips for how to prepare and respond."} />
                    <meta name="twitter:url" content={this.props.url} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
                </Head>
                <FilteredHeader ud={this.props.ud} />
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-jobbylocsearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                        <div className="rozgar-jobbylocsearchbox">
                                            <div className="rozgar-formbox">
                                                <div className="rozgar-jobbylocsearchcontent">
                                                    <div className="form-group">
                                                        <i className="lnr lnr-magnifier"></i>
                                                        <input type="text" name="keyword"
                                                            value={this.state.inputChange ? this.state.inputChange : ''}
                                                            className="form-control" placeholder="Search by Questions"
                                                            onKeyDown={(e) => {
                                                                if (e.key == 'Enter') {
                                                                    this.onInputClick()
                                                                }
                                                            }}
                                                            onChange={(e) => this.setState({ inputChange: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="rozgar-jobbylocsearchbtn" onClick={this.onInputClick} style={{ cursor: 'pointer' }}>
                                                    <a style={{ color: 'white' }}><i className="lnr lnr-magnifier"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.change ? <span style={{ color: 'red' }}>Please Insert Some Value</span> : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='breadcrumb-section'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='breadcrumbF'>
                                            <ul>
                                                <li><a href='/'>Home</a></li>
                                                <li><a href='/interview-questions'>Interview Question</a></li>
                                                {SearchQuestion && <li className='active' style={{ cursor: 'pointer' }}> Search Result <a href=''>"{SearchQuestion.charAt(0).toUpperCase() + SearchQuestion.slice(1).replace(/ /g, " ")}"</a> </li>}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='interview-questions-company'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className='company-header-main'>
                                            <div className='company-info-box skillsinfo-box'>
                                                <div className='aboutCom-Main'>
                                                    <div className='companyNameBox'>
                                                        <h3>{SearchQuestion.charAt(0).toUpperCase() + SearchQuestion.slice(1).replace(/ /g, " ")}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className='interviw-tab-company'>
                                            <ul>
                                                <li><a href='javascript:void(0)' className='active'>Interviews
                                                </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='SectionDetailsBox'>
                                            <div className='simple-header bold-title-l company-header'>
                                            </div>
                                            <div className='company-interview-section'>
                                                <div className='PopularJoblistBox'>
                                                    <div className='totalcountinterviews' style={{ marginTop: '5px' }}>
                                                        <div className='cont-filter-box'>
                                                            {List?.length ?
                                                                <span className='total-count-interview' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                                    {
                                                                        <p>{List.length} result found</p>
                                                                    }
                                                                </span>
                                                                : <span className='total-count-interview' style={{ fontSize: '16px', fontWeight: 'bold' }}>

                                                                </span>}
                                                        </div>
                                                    </div>
                                                    {List ? List.map((i, index) => {
                                                        return (
                                                            <div className='card-company-interviews' style={{ marginTop: '5px', padding: '20px 20px 5px 20px' }}>
                                                                <div className='rg-company-name-box'>
                                                                </div>
                                                                <div className='data-wrapper'>
                                                                    <ul>
                                                                        <li>
                                                                            <p style={{ marginTop: '0.8em' }}><span style={{ color: '#e62e2d' }}>Q{index + 1}. </span>{i.QUESTION_TITLE.charAt(0).toUpperCase() + i.QUESTION_TITLE.slice(1)} <span className='detail-links-box' style={{ marginLeft: '0.7em' }}><Link style={{ cursor: 'pointer' }} href={{
                                                                                pathname: constant.component.commonSearchAnswer.url.replace(':url', i.URL),
                                                                                // query: { INTERVIEW_QUESTIONS_ID: i.INTERVIEW_QUESTIONS_ID, QUESTION_TITLE: i.QUESTION_TITLE }
                                                                            }}><i class='fa fa-external-link' value={i.INTERVIEW_QUESTIONS_ID}></i></Link></span></p>

                                                                            <Link className='answer-link-view' style={{ cursor: 'pointer' }} href={{
                                                                                pathname: constant.component.commonSearchAnswer.url.replace(':url', i.URL),
                                                                                // query: { INTERVIEW_QUESTIONS_ID: i.INTERVIEW_QUESTIONS_ID, QUESTION_TITLE: i.QUESTION_TITLE }

                                                                            }}>Add Answer ({i?.answerCount?.total ? i?.answerCount?.total - 1 : 0})</Link>
                                                                        </li>

                                                                    </ul>

                                                                </div>

                                                            </div>
                                                        )
                                                    }) : <Shimmer />
                                                    }
                                                </div>
                                                <div className='company-interview-right-section'>
                                                    <div className='questions-top-designations-Box'>
                                                        <h5> Interview Question's by Top Skills</h5>
                                                        <ul>
                                                            <li>
                                                                <Link className='rg-backgroundHover' href={{
                                                                    pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'php'),
                                                                    // query: { skillId: 11 }
                                                                }}>PHP</Link></li>
                                                            <li>
                                                                <Link className='rg-backgroundHover' href={{
                                                                    pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'software-testing'),
                                                                    // query: { skillId: 2 }
                                                                }}>Software Testing</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'networking'),
                                                                // query: { skillId: 1 }
                                                            }}>Networking</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'java'),
                                                                // query: { skillId: 13 }
                                                            }}>Java</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'aws'),
                                                                // query: { skillId: 960 }
                                                            }}>AWS</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'apache-web-server'),
                                                                // query: { skillId: 194 }
                                                            }}>Apache Web Server</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'linux'),
                                                                // query: { skillId: 27 }
                                                            }}>Linux</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'tally'),
                                                                // query: { skillId: 35 }
                                                            }}>Tally</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', '-net'),
                                                                // query: { skillId: 9 }
                                                            }}>.NET</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'video-editing'),
                                                                // query: { skillId: 50 }
                                                            }}>Video Editing</Link></li>
                                                            <li><Link className='rg-backgroundHover' href={{
                                                                pathname: constant.component.interviewQuestionBySkillsId.url.replace(':id', 'web-designing'),
                                                                // query: { skillId: 24 }
                                                            }}>Web Designing</Link></li>
                                                        </ul>
                                                        <Link href={constant.component.interviewQuestionBySkills.url} target="_blank"><div className='more-item-box'><a className='rg-onHoverButton'>Explore more skills</a> </div></Link>
                                                    </div>


                                                    <div className='SimilarCompanies-Box'>
                                                        <h5>Popular Companies</h5>
                                                        {PREMIUM_COMPANIES && PREMIUM_COMPANIES.length > 0 && PREMIUM_COMPANIES.map((item) => (
                                                            <div className='SimilarCompanies-item'>
                                                                <div className='SimilarCompanies-img'>
                                                                    {item.COMPANY_LOGO && item.COMPANY_LOGO != 'NA' ?
                                                                        <img src={`${process.env.REACT_APP_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} /> :
                                                                        <h3> {item.COMPANY_NAME.split(' ')[0]}</h3>
                                                                    }
                                                                </div>
                                                                <div className='SimilarCompaniesContent'>
                                                                    <Link target="_blank" href={constant.component.companydetails.url.replace(":url", `${item.URL}-${item.EMPLOYER_ID}`)}>
                                                                        <h4 className="rg-onMouseHover">{item.COMPANY_NAME}</h4>
                                                                    </Link>
                                                                    <div className='companyReviews'>
                                                                        <i className='fa fa-star' style={{ color: '#f3c618' }}></i>
                                                                        <p class="companytotalReviews" style={{ color: '#e62e2d', paddingLeft: "3px" }}>
                                                                            0 reviews
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className='viewallbox'><a href={constant.component.companieslist.url} target="_blank" className='rg-onHoverButton'>View all</a></div>

                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    {this.state.loader &&
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
                        </div>
                    }
                </main>
            </React.Fragment>
        )
    }
})




export async function getServerSideProps(
    { req, query, resolvedUrl }
    // context
) {
    let ud = getLoggedInUserData(req)
    let url = req.headers.host + resolvedUrl
    return {
        props: {
            ud: ud,
            pathName: resolvedUrl,
            url,
            query
        }
    }

}
