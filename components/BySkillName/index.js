import React, { Component } from 'react'
import Link from 'next/link';
import { InterviewQuestionSkillByUrl } from '@/action/SkillsQuestionAction' ;
import constant from 'constant'
// import addAnswer from '../../pages/InterviewQuestions/AddAnswer'
// import { getStorage } from 'utils';

  import Shimmer from 'components/common/Shimmer';
import { withRouter } from 'next/router';
import Image from 'next/image';



export default  withRouter(class BySkill extends Component {
   constructor(props) {
     super(props);
      this.state = {
    // detail:getStorage(constant.keys.cd),
     submited:false,
     inputChange:'',
    // inputChange:this.props.history.location.state.searchQuestion,
     id:undefined,
     urlDetail:undefined,
     detailList:undefined,
     shimmer:false
    

   }
    

} 


onInputClick = () =>{
  const {inputChange} = this.state
  // const {searchQuestion} = this.props.history.location.state
//  var Value = e.target.value
//  this.setState({inputChange:Value})
//  if(inputChange && inputChange !=undefined){
  // this.props.onInputSearch(inputChange)
  this.props.router.push({
    pathname:constant.component.commonSearchQuestion.url.replace(':Keyword',inputChange.replace( / /g,"-")),
    state:{SearchQuestion:inputChange}
  })
//  }
}

componentDidMount(){
  // const {skillId} = this.props.history.location.state
  // this.setState({id:skillId })
  this.setState({urlDetail:this.props.router.asPath})
  this.InterviewQuestionSkill()
}
componentDidUpdate(){
  if(this.props.router.asPath !== this.state.urlDetail){
  this.InterviewQuestionSkill()
  this.setState({urlDetail:this.props.router.asPath})
  }
}

InterviewQuestionSkill = () =>{
  const data = this.props.router.asPath
  const d1 = data.split('/skills/')
  const URL = d1[1]
  InterviewQuestionSkillByUrl(URL).then((res)=>{
    this.setState({detailList:res.result})
  }).catch(err => {
    alert(err)
  })
}
  render() {

    // window.scroll(0,0)
    const {COMPANY_ID,id,shimmer} = this.state
    const {jobList,PREMIUM_COMPANIES} = this.props
    // const {skillId} = this.props.history.location.state
    // this.setState({id:skillId})
    const URL = this.props.router.asPath
    const d1 = URL.split('/skills/')
    const skill_Name = d1[1]
    const data = skill_Name.toUpperCase()
    // const {searchQuestion} = this.props.history.location.state
   
    // if(skillId != id){
    //   this.setState({inputChange:undefined})
    //   this.setState({id:skillId})
    // }
     

    return (
      <React.Fragment>
       
       <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-jobbylocsearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                        <form className="rozgar-jobbylocsearchbox">
                                            <div className="rozgar-formbox">
                                                <div className="rozgar-jobbylocsearchcontent">
                                                    <div className="form-group">
                                                        <i className="lnr lnr-magnifier"></i>
                                                        <input type="text" name="keyword" onKeyDown={(e)=>{
                                                            if(e.key=='Enter'){
                                                              this.onInputClick()
                                                            }
                                                            }} value={this.state.inputChange ? this.state.inputChange : ''} className="form-control" placeholder="Search by Questions" onChange={(e)=>this.setState({inputChange:e.target.value})} />
                                                    </div>
                                                </div>
                                                <div className="rozgar-jobbylocsearchbtn"onClick={this.onInputClick} style={{cursor:'pointer'}}>
                                                    <a style={{color:'white'}}><i className="lnr lnr-magnifier"></i></a>
                                                </div>
                                            </div>
                                        </form>
                                      
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
                                            {/* <h3>{data.replaceAll("-"," ")} </h3> */}
                                            <h3>{this.state.detailList && this.state.detailList[0].SKILL} </h3>
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
                        {/* <li><a href='#.'>Salaries <spna>9.6k</spna></a></li> */}
                        <li><a href='javascript:void(0)' className='active'>Interviews 
                        {/* <spna>1k</spna> */}
                        </a></li>
                        <li><Link target="_blank" href={constant.component.joblist.url.replace(":url",`${skill_Name}-jobs`)}>Jobs 
                        {/* <spna>1.6k</spna> */}
                        </Link></li>
                        {/* <li><a href='#.'>Q&A  */}
                        {/* <spna>3</spna> */}
                        {/* </a></li> */}

                      </ul>
                    </div>
                  </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='SectionDetailsBox'>
                          <div className='simple-header bold-title-l company-header'>
                            {/* <h3 style={{textTransform:'capitalize'}}>{skill_Name.replaceAll("-"," ")} Interview Questions</h3> */}
                            <h3 style={{textTransform:'capitalize'}}>{this.state.detailList && this.state.detailList[0].SKILL} Interview Questions</h3>

                          </div>
                          <div className='company-interview-section'>
                            <div className='PopularJoblistBox'>
                           
                          <div className='totalcountinterviews' style={{marginTop:'5px'}}>
                            <div className='cont-filter-box'>
                              {/* {this.props.List.length?<span className='total-count-interview' style={{fontSize:'16px',fontWeight:'bold'}}>{this.props.List ? this.props.List.length > 0?<p>{this.props.List.length} result found</p>
                              :<p style={{color:'#e62e2d',textTransform:'capitalize'}}>No Interview question available in {skill_Name.replaceAll("-"," ")} .</p> :<p style={{color:'#e62e2d',textTransform:'capitalize'}}>No Interview question available in {skill_Name.replaceAll("-"," ")} .</p>}</span>
                              :null} */}
                               {this.props.List?.length?
                               <span className='total-count-interview' style={{fontSize:'16px',fontWeight:'bold'}}>
                                {
                                   <p>{this.props.List.length} result found</p>
                                }
                                </span>
                              :<span className='total-count-interview' style={{fontSize:'16px',fontWeight:'bold'}}>
                              {
                                 <p style={{color:'#e62e2d',textTransform:'capitalize'}}>No Interview question available in {skill_Name.replaceAll("-"," ")}</p>
                              }
                              </span>}
                            </div>
                          </div>
                        
                        { this.props.List ? this.props.List.map((i,index)=>{
                          return(
                          <div className='card-company-interviews' style={{marginTop:'5px',padding:'20px 20px 5px 20px'}}>
                               <div className='rg-company-name-box'>
                                 {i.COMPANY_LOGO ?<div className='company-icon-box'>
                                  { i.COMPANY_LOGO && i.COMPANY_LOGO != 'NA'?
                                    <Image 
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${i.COMPANY_LOGO}`} alt={i.COMPANY_NAME}
                                    
                                     height={1000}
                                     width={1000}
                                    />:
                                    null
                                  }
                                  </div>:null
                                  }
                                  {i.COMPANY_NAME?
                                  <div className='company-text-box'>
                                    <Link target='_blank' href={constant.component.companydetails.url.replace(":url",`${i.URL}-${i.EMPLOYER_ID}`)}>
                                    <span  className="rg-onMouseHover">{i.COMPANY_NAME}</span>
                                  </Link></div>
                                   :null}
                                    </div>
                               <div className='data-wrapper'>
                                   
                                    
                                    <ul>
                                        <li>
                                            <p style={{marginTop:'0.8em'}}><span style={{color:'#e62e2d'}}>Q{index +1}. </span>{i.QUESTION_TITLE.charAt(0).toUpperCase() + i.QUESTION_TITLE.slice(1)} <span className='detail-links-box' style={{marginLeft:'0.7em'}}><Link style={{cursor:'pointer'}} href ={{
                                               pathname:constant.component.interviewAnswer.url.replace(':url', `${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`),
                                               query:{INTERVIEW_QUESTIONS_ID:i.INTERVIEW_QUESTIONS_ID,QURL:i.QURL, COMPANY_NAME:i.COMPANY_NAME,skill_Name:skill_Name}
                                            }}
                                            as={`/interview-Answer/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                            ><i class='fa fa-external-link' value={i.INTERVIEW_QUESTIONS_ID}></i></Link></span></p>
                                            {/* <a href={constant.component.AddAnswer.url} className='answer-link-view'>Add Answer</a> */}

                                            {i.answer.map((item)=>{
                                                                                return<span><span className='answer-text'> Answer :</span> <p>{item.ANSWER}</p><hr className='hr_margin'></hr></span> 
                                                                            })}
                                              {i?.answerCount?.total==0?    <Link className='answer-link-view' style={{cursor:'pointer'}} href={{
                                              pathname: constant.component.interviewAnswer.url.replace(':url', `${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`),
                                              query:{INTERVIEW_QUESTIONS_ID:i.INTERVIEW_QUESTIONS_ID, QURL:i.QURL, COMPANY_NAME:i.COMPANY_NAME,skill_Name:skill_Name}
                                              
                                            }}
                                            as={`/interview-Answer/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                            >Add Answer ({i?.answerCount?.total?i?.answerCount?.total:0})</Link>:
                                            <Link className='answer-link-view' style={{cursor:'pointer'}} href={{
                                              pathname: constant.component.interviewAnswer.url.replace(':url', `${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`),
                                              query:{INTERVIEW_QUESTIONS_ID:i.INTERVIEW_QUESTIONS_ID, QURL:i.QURL, COMPANY_NAME:i.COMPANY_NAME,skill_Name:skill_Name}
                                              
                                            }}
                                            as={`/interview-Answer/${i.QURL}${i.INTERVIEW_QUESTIONS_ID}`}
                                            >View All / Add New Answer ({i?.answerCount?.total?i?.answerCount?.total:0})</Link>}
                                        </li>
                                        
                                    </ul>  

                               </div>
                               
                          </div> 
                    )
                    }):<Shimmer/>
                  }                                               
                          </div>
                          <div className='company-interview-right-section'>
                                <div className='questions-top-designations-Box'>
                                    <h5> Interview Question's by Top Skills</h5>
                                    <ul>
                                    <li>
                                    <Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'php'),
                                    state:{skillId:11}
                                      }}>PHP</Link></li>
                                        <li>
                                    <Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'software-testing'),
                                    state:{skillId:2}
                                      }}>Software Testing</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'networking'),
                                    state:{skillId:1}
                                      }}>Networking</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'java'),
                                    state:{skillId:13} 
                                      }}>Java</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'aws'),
                                    state:{skillId:960}
                                      }}>AWS</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'apache-web-server'),
                                    state:{skillId:194}
                                      }}>Apache Web Server</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'linux'),
                                    state:{skillId:27}
                                      }}>Linux</Link></li>
                                       <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'tally'),
                                    state:{skillId:35}
                                      }}>Tally</Link></li>
                                      <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', '-net'),
                                    state:{skillId:9}
                                      }}>.NET</Link></li>
                                        <li><Link className='rg-backgroundHover' href ={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'video-editing'),
                                    state:{skillId:50}
                                      }}>Video Editing</Link></li>
                                      <li><Link className='rg-backgroundHover' href = {{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', 'web-designing'),
                                    state:{skillId:24}
                                      }}>Web Designing</Link></li>
                                    
                                    </ul>
                                    <Link href={constant.component.interviewQuestionBySkills.url} target="_blank"><div className='more-item-box'><a className='rg-onHoverButton'>Explore more skills</a> </div></Link>
                                </div> 

                                
                          <div className='SimilarCompanies-Box'>

                            <h5>Popular Companies</h5>
                        {PREMIUM_COMPANIES && PREMIUM_COMPANIES.length>0 && PREMIUM_COMPANIES.map((item)=>(
                            <div className='SimilarCompanies-item'>
                              <div className='SimilarCompanies-img'>
                                {/* <img src={'https://cp-api.rozgar.com/company/logo/Infosys.png'} alt="img description" /> */}
                                { item.COMPANY_LOGO && item.COMPANY_LOGO != 'NA'?
                                    <Image
                                     width={1000} 
                                     height={1000}
                                    
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />:
                                  <h3> { item.COMPANY_NAME.split(' ')[0]}</h3>
                                }
                                </div>
                              <div className='SimilarCompaniesContent'>
                              <Link target="_blank" href={constant.component.companydetails.url.replace(":url",`${item.URL}-${item.EMPLOYER_ID}`)}>
                                <h4  className="rg-onMouseHover">{item.COMPANY_NAME}</h4>
                              </Link>
                                <div className='companyReviews'>
                                  <i className='fa fa-star' style={{color:'#f3c618'}}></i>
                                  <p class="companytotalReviews" style={{color:'#e62e2d' ,paddingLeft:"3px"}}>
                                    {/* {item.rating.toFixed(1)} */}
                                     0 reviews
                                    {/* 19 Questions */}
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
                </main>        
      </React.Fragment>
    )
  }
})

