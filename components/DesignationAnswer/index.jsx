import React, { Component } from 'react'
import { SpinnerDiamond } from 'spinners-react'
import { addInterviewQuestionAnswer, answerById, interviewQuestionById } from '@/action/SkillsQuestionAction';
import constant from '../../constant'
import { getStorage } from '../../utils';
import moment from "moment";
import Picss from "src/assets/images/profilePic/secondary.jpg"
import swal from 'sweetalert'
import Link from 'next/link';
// import { withRouter } from 'next/router';
import Shimmer from '../common/Shimmer';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

export default class CompanyAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: undefined,
      textBox: '',
      detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
      sort: 4,
      status: 'A',
      questionId: undefined,
      userType: 'C',
      userId: undefined,
      // list1: undefined,
      searchData: undefined
    }
  }
  componentDidMount() {
    const question =this.props.router.query.url.split('-')
    const answersQuestion=question[question.length-1] 
    this.setState({ questionId: answersQuestion })
    // this.InterviewQuestionById(question)
    this.AnswerById(answersQuestion)
  }

  // InterviewQuestionById = (questionId) => {
  //   interviewQuestionById(questionId).then((res) => {
  //     this.setState({ list1: res.result })
  //   }).catch(err => {
  //     alert(err)
  //   })
  // }
   

  onInputChange = (e) => {

    const value = e.target.value
    this.setState({
      textBox: value
    })
  }
  onSubmit = () => {
    
    if (!this.state.detail) {
      swal({
        icon: "warning",
        text: "Please do Signin first",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });

    }
    const { CANDIDATE_ID } = this.state.detail
    const { questionId } = this.state
    // if(!this.state.detail && this.state.detail.CANDIDATE_ID && this.state.textBox.length>0 && this.state.textBox.trim().length){
    //     swal({
    //       icon: "success",
    //       text: "Answer Submitted Successfully",
    //       timer: 2000,
    //       showCancelButton: false,
    //       showConfirmButton: false,
    //     });
    // }
    if (this.state.textBox.length > 0 && this.state.textBox.trim().length) {
      const st = {
        INTERVIEW_QUESTIONS_ID: this.state.questionId,
        // ANSWER:this.state.textBox.replace(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g, "\\"),
        ANSWER: this.state.textBox,
        SORT_NUMBER: this.state.sort,
        CREATED_BY: CANDIDATE_ID,
        STATUS: this.state.status,
        USER_TYPE: this.state.userType,
        USER_ID: CANDIDATE_ID
      }
      addInterviewQuestionAnswer(st).then((res) => {
        
        if (res.status == true) {
          swal({
            icon: "success",
            text: "Answer Submitted Successfully",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        } else {
          swal({
            icon: "warning",
            text: 'You are trying to Submit data which is unacceptable by System ',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          })
        }
        this.AnswerById(questionId)
      }).catch(err => {
        alert(err)
      })

    }
    else {
      swal({
        icon: "warning",
        text: 'You are trying to Submit data which is unacceptable by System ',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      })
    }
  }

  AnswerById = (questionId) => {
    answerById(questionId).then((res) => {
      console.log(res.result,"result");
      this.setState({ list: res.result })
      // swal({
      //     icon: "success",
      //     text:res.messageCode,
      //     timer: 2000,
      //     showCancelButton: false,
      //     showConfirmButton: false,
      //   });
      this.setState({ textBox: '' })
    }).catch((err) => {
      alert(err);
    })
  }
  onSearchQuestions = () => {
    const { searchData } = this.state;
    const { skill_Name } = this.props.router.query
    const { DESIGNATION } = this.props.router.query.skill_Name
    const { DESIGNATION_ID } = this.props.router.DESIGNATION_ID
    const { INTERVIEW_QUESTIONS_ID } = this.props.router.query.INTERVIEW_QUESTIONS_ID
    // this.props.history.push({
    //   pathname: constant.component.interviewQuestionByDesignationId.url.replace(':id', DESIGNATION.replace(/ /g, "-")),
    //   state: { searchQuestion: searchData, DESIGNATION: DESIGNATION, DESIGNATION_ID: DESIGNATION_ID, INTERVIEW_QUESTIONS_ID: INTERVIEW_QUESTIONS_ID }
    // })
    this.props.history.push({
      pathname:constant.component.commonSearchQuestion.url.replace(':Keyword',searchData.replace( / /g,"-")),
      state:{SearchQuestion:searchData}
    })
  }

  render() {
    // console.log("detailllll", this.state.list);
    const { list } = this.state
    const {  list1 } = this.props
    const { jobList, PREMIUM_COMPANIES } = this.props
      const { DESIGNATION } = this.props.router.query
      

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
                            <input type="text" name="keyword" className="form-control" placeholder="Search by Questions"
                             onKeyDown={(e)=>{
                              if(e.key=='Enter'){
                                this.onSearchQuestions()
                              }
                              }}
                             onChange={(e) => this.setState({ searchData: e.target.value })} />
                          </div>
                        </div>
                        <div className="rozgar-jobbylocsearchbtn"
                          onClick={this.onSearchQuestions}>
                          <a style={{ color: 'white' }}><i className="lnr lnr-magnifier"></i></a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className='answer-main-box' style={{ display: 'block', width: '100%', position: 'relative', float: 'left' }}>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                    <div className='add-Answer-container'>
                      <div className='breadcrumb2'>

                        <ul>
                          <li> <Link href='/#'>Home</Link><span class="arrow bold-small-grey-text"> &gt;</span></li>
                          <li> <Link href='/interview-questions'>Interview Questions</Link><span class="arrow bold-small-grey-text"> &gt;</span></li>
                          <li> <span style={{ color: '#e62e2d' }}>Q. </span>
                            {list1 ? list1[0].QUESTION_TITLE?.charAt(0).toUpperCase() + list1[0].QUESTION_TITLE?.slice(1) : null}</li>
                          {/* <li> <Link href='/#' onClick={() => this.props.router.back()}>{DESIGNATION && DESIGNATION.toUpperCase()}</Link></li> 
                           <li> <Link href='/#' onClick={() => this.props.history.goBack()}>{this.props.skill_Name?this.props.skill_Name.toUpperCase():''}</Link></li> */}
                        </ul>

                      </div>
                      <div className='question-info-box'>
                        <p>
                          {list1 ? <>
                            <span style={{ color: '#e62e2d' }}>Q. </span>
                            {list1 ? list1[0].QUESTION_TITLE?.charAt(0).toUpperCase() + list1[0].QUESTION_TITLE?.slice(1) : null}
                          </> : <Shimmer />}
                        </p>
                      </div>
                      {/* <div className='hastags'>
                        <span className='hastag-item'>#{DESIGNATION?.toUpperCase()}</span> 
                         <span className='hastag-item'>#{this.props.skill_Name?this.props.skill_Name:''}</span>
                      </div> */}
                      {/* <div className='review_quality-box'>
                                         <div className='button-want-answer'>
                                             <button className='want-answer-btn'>Want Answer </button>
                                         
                                         </div>
                                         <div className='review_misc-answer'>
                                             <div className='review_views'>546 views</div>
                                             <div className='report-interview-bx'><a href='' className='' data-toggle='modal' data-target='#myModal'><i className='fa fa-flag-o' aria-hidden='true'></i></a></div>
                                         
                                         </div>
                                         
                                    </div> */}
                      <div className='answer-text' style={{ marginTop: '30px' }}>Answers <span id='answer-count' count='3'>({list ? list.length : '0'})</span></div>
                      {/* <hr class="hr_margin" />
                                    */}
                      {list !== undefined && list.length > 0 && list.map((item) => {
                        return (
                          <React.Fragment >
                            <hr className="hr_margin" />
                            <div >
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className='img' style={{ borderRadius: '25px', paddingRight: '2em' }}>
                                  <Image src={item.PROFILE_IMAGE ? item.PROFILE_IMAGE : Picss} alt="img description" width={100} height={80} />
                                </div>
                                <div className='contant' style={{ width: '85%' }} >
                                  <div className='header'>
                                    <div className='bio'>
                                      <div className=' intro-box semi-bold-text' style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{item.CANDIDATE_NAME}</div>
                                      <div className='meta-posted'><span style={{ fontWeight: 'lighter', color: '#b9bbbd' }}>
                                        {moment(item.CREATED_ON).format("MMMM Do YYYY")}
                                      </span></div>
                                    </div>
                                  </div>
                                  <div className='body'>
                                    <div className='sliced-answer-text'>
                                      <p>{item.ANSWER}</p>
                                    </div>
                                  </div>
                                  {/* <div className='actions'>
                                                 <ul>
                                                    <li><a href=''><i class='fa fa-thumbs-o-up' aria-hidden='true'></i></a></li>
                                                    <li><a href=''><i class='fa fa-thumbs-o-down' aria-hidden='true'></i></a></li>
                                                    <li><a href=''>Report</a></li>
                                                 </ul>
                                             </div> */}
                                </div>

                              </div>

                            </div>
                          </React.Fragment>
                        )
                      })}
                      <hr class="hr_margin" />
                      <div className='form-input-bx'>
                        <form
                          action='post' onSubmit={this.onSubmit}
                        >
                          <div className='row'>
                            <div className='field add-question-box col-md-12' style={{ marginTop: '16px' }}>
                              <label>Submit your answer</label>
                              <textarea style={{ padding: '10px' }} type='text' value={this.state.textBox} placeholder='' onChange={(e) => this.onInputChange(e)} />

                            </div>
                          </div>
                          <div className='row'>
                            <div className='field add-question-box col-md-12'>
                              <div class='submit-wrap'>
                                <button type='button' name='submit' value='submit'
                                  onClick={() => this.onSubmit()}
                                >Submit</button>
                                {/* <div class='d-inline-flex'><input id='anonymous' type='checkbox'/>
                                                        <label for="anonymous">Submit anonymously</label></div> */}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                    <div className='right-aside-calculator_wrapper'>
                      {/* <div className='salary_calculator_wrapper'>
                                         <h5>Calculate your In-hand salary</h5>
                                         <p>Confused about how your in-hand salary is calculated? Enter your annual salary (CTC) and get your in-hand salary</p>
                                         <div className='salary_calculator-form'>
                                            <input type='text' name='company'  value=''  placeholder='Enter annual Salary (CTC)' />
                                            <button  className='sal-continue-btn'>Continue</button>
                                         </div>
                                    </div> */}

                    </div>
                    <div className='questions-top-designations-Box'>
                      <h5>Interview Question's by Top Designations</h5>
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
                      <Link href={constant.component.interviewQuestionByDesignation.url}><div className='more-item-box'><a className='rg-onHoverButton'>Explore more Designation</a> </div></Link>
                    </div>
                    {/* <div className='SimilarCompanies-Box JobsatCompanies-Box'>

<h5> Latest Jobs </h5>
  {jobList && jobList.length>0 && jobList.map((item)=>(
<div className='SimilarCompanies-item' style={{display:'flex'}}>
  <div className='SimilarCompanies-img'>
    { item.COMPANY_LOGO && item.COMPANY_LOGO != 'NA'?
       <h3><Image src={`${process.env.REACT_APP_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} /></h3>:
      <h3> { item.COMPANY_NAME.split('')[0]}</h3>
    }
  </div>

  <div className='SimilarCompaniesContent jobCompaniesContent'>
    <h4>
      <Link href={constant.component.joblist.url.replace(":url",item.JOB_TITLE.toLowerCase().replace(/ /g ,'-'))}>
        {item.JOB_TITLE}
        </Link>
        </h4>
    <div className='companyReviews'>

      <p className='companytotaladdress'><i className="fa fa-map-marker" aria-hidden="true"></i> Bengaluru/Bangalore</p>


    </div>
    <div className='infojobSimilarCompanies'>
      <ul>
        <li><i className="ti-location-pin"></i> 5-10 Yrs</li>
        <li>
            <i className="ti-crown"></i> {item.LISTNING_TYPE == 1 ? ' REGULAR' : item.LISTNING_TYPE == 2 ? ' FEATURED' : ' PREMIUM'}
        </li>
      </ul>
    </div>
  </div>


</div>
))}
<div className='viewallbox'><a href={constant.component.latestfresherjob.url}>Explore more jobs</a></div>

                                </div> */}
                    <div className='SimilarCompanies-Box'>

                      <h5>Popular Companies</h5>
                      {PREMIUM_COMPANIES && PREMIUM_COMPANIES.length > 0 && PREMIUM_COMPANIES.map((item) => (
                        <div className='SimilarCompanies-item'>
                          <div className='SimilarCompanies-img'>
                            {/* <Image src={'https://cp-api.rozgar.com/company/logo/Infosys.png'} alt="img description" /> */}
                            {item.COMPANY_LOGO && item.COMPANY_LOGO != 'NA' ?
                              <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={60} height={40} /> :
                              <h3> {item.COMPANY_NAME.split(' ')[0]}</h3>
                            }
                          </div>
                          <div className='SimilarCompaniesContent'>
                            {/* <Link to ={{
                                pathname:constant.component.interviewQuestionByCompanyId.url.replace(":id",`${item.URL}`),
                                state:{EMPLOYER_ID:item.EMPLOYER_ID}
                              }}>
                                <h4>{item.COMPANY_NAME}</h4>
                              </Link> */}
                            <Link target="_blank" href={constant.component.companydetails.url.replace(":url", `${item.URL}-${item.EMPLOYER_ID}`)}>
                              <h4 className='rg-onMouseHover'>{item.COMPANY_NAME}</h4>
                            </Link>
                            <div className='companyReviews'>
                              <i className='fa fa-star' style={{ color: '#f3c618' }}></i>
                              <p class="companytotalReviews" style={{ color: '#e62e2d', paddingLeft: '3px' }}>
                                {/* {item.rating.toFixed(1)} */}
                                {/* 19 Questions */}
                                0 reviews
                              </p>

                            </div>
                          </div>
                        </div>
                      ))}

                      <div className='viewallbox'><a className='rg-onHoverButton' href={constant.component.companieslist.url}>View all</a></div>

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

