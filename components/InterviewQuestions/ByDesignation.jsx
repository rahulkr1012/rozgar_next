import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { Component } from 'react'
import constant from '../../constant'
import Shimmer from '../common/Shimmer';
import Image from 'next/image'; 
export default withRouter (class ByDesignations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputChange: "",
      searchInput: undefined
    }
  }
  onInputChange = () => {
    const { inputChange } = this.state
    this.props.router.push({
      pathname: constant.component.commonSearchQuestion.url.replace(':Keyword', inputChange.replace(/ /g, "-")),
      state: { SearchQuestion: inputChange }
    })
  }
  

  render() {
    const { List } = this.props
    const { jobList, PREMIUM_COMPANIES } = this.props
    const URL = window.location.href
    const d1 = URL.split('/designations/')
    const skill_Name = d1[1]
    const data = skill_Name.toUpperCase()
    const { DESIGNATION } = this.props
    const { DESIGNATION_ID } = this.props
    // console.log("LOGGGG",this.props.List);

    return (
      <React.Fragment>
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
                            <input type="text" name="keyword" onKeyDown={(e) => {
                              if (e.key == 'Enter') {
                                this.onInputChange()
                              }
                            }}
                              value={this.state.inputChange ? this.state.inputChange : ''} className="form-control"
                              placeholder="Search by Questions" onChange={(e) => this.setState({ inputChange: e.target.value })} />
                          </div>
                        </div>
                        <div className="rozgar-jobbylocsearchbtn" onClick={this.onInputChange}>
                          <a><i className="lnr lnr-magnifier" style={{ color: 'white' }}></i></a>
                        </div>
                      </div>
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
                            <h3>{data.replaceAll("-", " ")} </h3>
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
                        <li><Link target="_blank" href={constant.component.joblist.url.replace(":url", `${skill_Name}-jobs`)}>Jobs
                        </Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='SectionDetailsBox'>
                      <div className='simple-header bold-title-l company-header'>
                        <h3 style={{ textTransform: 'capitalize' }}>{skill_Name.charAt(0).toUpperCase() + skill_Name.slice(1).replaceAll("-", " ")} Interview Questions</h3>
                      </div>
                      <div className='company-interview-section'>
                        <div className='PopularJoblistBox'>
                          <div className='totalcountinterviews'>
                            <div className='cont-filter-box'>
                              {this.props.List ? <span className='total-count-interview' style={{ fontSize: '16px', fontWeight: 'bold' }}>{this.props.List ? this.props.List.length > 0 ? <p>{this.props.List.length} result found</p> : <p style={{ color: '#e62e2d', textTransform: 'capitalize' }}>No Interview question available in {skill_Name.replaceAll("-", " ")} .</p> : <p style={{ color: '#e62e2d', textTransform: 'capitalize' }}>No Interview question available in {skill_Name.replaceAll("-", " ")} .</p>}</span>
                                : null}
                            </div>
                          </div>
                          {this.props.List ? this.props.List.map((i, index) => {
                            return (
                              <div className='card-company-interviews' style={{ marginTop: '5px', padding: '20px 20px 5px 20px' }} key={index}>
                                <div className='company-text-box'>
                                </div>
                                <div className='data-wrapper'>
                                  <ul>
                                  <li>
                                      <p style={{ marginTop: '0.8em' }}><span style={{ color: '#e62e2d' }}>Q{index + 1}. </span>{i.QUESTION_TITLE.charAt(0).toUpperCase() + i.QUESTION_TITLE.slice(1)}<span className='detail-links-box' style={{ marginLeft: '0.7em' }}><Link style={{ cursor: 'pointer' }} href={{
                                        pathname: "/interview-answers-designation/[INTERVIEW_QUESTIONS_ID]/",
                                        query: { INTERVIEW_QUESTIONS_ID: i.INTERVIEW_QUESTIONS_ID, QURL:i.QURL, skill_Name: skill_Name, DESIGNATION: DESIGNATION, DESIGNATION_ID: DESIGNATION_ID }
                                      }}
                                      as={`/interview-Answers-Designation/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                      >
                                        <i class='fa fa-external-link' value={i.INTERVIEW_QUESTIONS_ID}></i></Link>
                                      </span></p>
                                      {i.answer.map((item)=>{
                                                                                return<span><span className='answer-text'> Answer :</span> <p>{item.ANSWER}</p><hr className='hr_margin'></hr></span> 
                                                                            })}
                                      {i?.answerCount?.total==0?<Link className='answer-link-view' style={{ cursor: 'pointer' }} href={{
                                                                                pathname: "/interview-Answers/[INTERVIEW_QUESTIONS_ID]/",
                                                                                query: { INTERVIEW_QUESTIONS_ID: i.INTERVIEW_QUESTIONS_ID, QURL: i.QURL, skill_Name:i.SKILL_Name, DESIGNATION: DESIGNATION, DESIGNATION_ID: DESIGNATION_ID, COMPANY_NAME:i.COMPANY_NAME  }
                                                                            }}
                                                                                as={`/interview-Answers/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                                                            > Add New Answer ({i?.answerCount?.total ? i?.answerCount?.total  : 0})</Link>:<Link className='answer-link-view' style={{ cursor: 'pointer' }} href={{
                                                                                pathname: "/interview-Answers/[INTERVIEW_QUESTIONS_ID]/",
                                                                                query: { INTERVIEW_QUESTIONS_ID: i.INTERVIEW_QUESTIONS_ID, QURL: i.QURL, skill_Name:i.SKILL_Name, DESIGNATION: DESIGNATION, DESIGNATION_ID: DESIGNATION_ID, COMPANY_NAME:i.COMPANY_NAME  }
                                                                            }}
                                                                                as={`/interview-Answers/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                                                            >View All / Add New Answer ({i?.answerCount?.total ? i?.answerCount?.total  : 0})</Link>}
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
                            <h5> Interview Question's by Top Designation</h5>
                            <ul>
                              <li>
                                <Link className='rg-backgroundHover' href={{
                                  pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'software-engineer'),
                                  state: { DESIGNATION_ID: 2272, DESIGNATION: 'Software Engineer' }
                                }}>Software Engineer</Link></li>
                              <li>
                                <Link className='rg-backgroundHover' href={{
                                  pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'machine-learning-engineer'),
                                  state: { DESIGNATION_ID: 171, DESIGNATION: 'Machine Learning Engineer' }
                                }}>Machine Learning Engineer</Link></li>
                              <li><Link className='rg-backgroundHover' href={{
                                pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'back-end-developer'),
                                state: { DESIGNATION_ID: 253, DESIGNATION: 'Back End Developer' }
                              }}>Back End Developer</Link></li>
                              <li><Link className='rg-backgroundHover' href={{
                                pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'devops-manager'),
                                state: { DESIGNATION_ID: 226, DESIGNATION: 'DevOps Manager' }
                              }}>DevOps Manager</Link></li>
                              <li><Link className='rg-backgroundHover' href={{
                                pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'front-end-developer'),
                                state: { DESIGNATION_ID: 262, DESIGNATION: 'Front End Developer' }
                              }}>Front End Developer</Link></li>
                              <li><Link className='rg-backgroundHover' href={{
                                pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'software-development-other'),
                                state: { DESIGNATION_ID: 273, DESIGNATION: 'Software Development - Other' }
                              }}>Software Development - Other</Link></li>
                              <li><Link className='rg-backgroundHover' href={{
                                pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', 'service-engineer'),
                                state: { DESIGNATION_ID: 110, DESIGNATION: 'Service Engineer' }
                              }}>Service Engineer</Link></li>

                            </ul>
                            <Link href={constant.component.interviewQuestionByDesignation.url} target="_blank"><div className='more-item-box'><a className='rg-onHoverButton'>Explore more Designations</a> </div></Link>
                          </div>

                          <div className='SimilarCompanies-Box'>
                            <h5>Popular Companies</h5>\

                            {PREMIUM_COMPANIES && PREMIUM_COMPANIES.length > 0 && PREMIUM_COMPANIES.map((item, index) => (
                              <div className='SimilarCompanies-item' key={index}>
                                <div className='SimilarCompanies-img'>
                                  {item.COMPANY_LOGO && item.COMPANY_LOGO != 'NA' ?
                                    <Image
                                    height={1000}
                                    width={1000}
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} /> :
                                    <h3> {item.COMPANY_NAME.split(' ')[0]}</h3>
                                  }
                                </div>
                                <div className='SimilarCompaniesContent'>
                                  <Link target="_blank" href={constant.component.companydetails.url.replace(":url", `${item.URL}-${item.EMPLOYER_ID}`)}>
                                    <h4 className='rg-onMouseHover'>{item.COMPANY_NAME}</h4>
                                  </Link>
                                  <div className='companyReviews'>
                                    <i className='fa fa-star' style={{ color: '#f3c618' }}></i>
                                    <p class="companytotalReviews" style={{ color: '#e62e2d', paddingLeft: '3px' }}>
                                      {/* {item.rating.toFixed(1)} */}
                                      0 reviews
                                    </p>

                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className='viewallbox'><a className='rg-onHoverButton' href={constant.component.companieslist.url} target="_blank">View all</a></div>

                          </div>


                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </React.Fragment>
    )
  }
}
)