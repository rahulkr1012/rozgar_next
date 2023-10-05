import React, { Component } from 'react'
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead'
import swal from 'sweetalert';
import { getStorage } from '../../utils';
import constant from '../../constant';
// import SignInForSaveUnsave from "../signin/SignInForSaveUnsave";
import ReactModal from "react-modal";
import { AddInterviewUpdate } from '@/action/ShareInterviewAction';

export default class ShareAnInterview extends Component {
    state ={
        SKILLS: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: true },
        COMPANY: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: true },
        singleSelections:undefined,
        setSingleSelections:undefined,
        departmentChange:undefined,
        jobTitle:undefined,
        interviewQuestionAnswer:[{department:"" ,question:"" ,answer:""}],
        filterSkill:undefined,
        filterCompany:undefined,
        Anonymous:false,
        check:false,
        openModal:false
    }
    DepartmentChange =(e,index)=>{
        const {interviewQuestionAnswer} = this.state
        const {name,value} = e.target 
        interviewQuestionAnswer[index][name] = value
        this.setState({interviewQuestionAnswer}) 
    }
    AnswerChange = (e,index) => {
        const {interviewQuestionAnswer} = this.state
        const {name} = e.target
        const value = e.target.value.trimStart()
        interviewQuestionAnswer[index][name] = value
        this.setState({interviewQuestionAnswer}) 
    }
    QuestionChange = (e,index) => {
        const {interviewQuestionAnswer} = this.state
        const {name} = e.target 
        const value = e.target.value.trimStart()
        interviewQuestionAnswer[index][name] = value
        this.setState({interviewQuestionAnswer}) 
    }
    onClickChange =() => {
        this.setState({ interviewQuestionAnswer: [...this.state.interviewQuestionAnswer, { department: "", question: "", answer: ""}] })
    }
    ondeleteChange = () =>{
        const {interviewQuestionAnswer} = this.state
        interviewQuestionAnswer.pop()
        this.setState({interviewQuestionAnswer})
    }
    setMultipleSelections = (data) => {
        this.setState({filterSkill:data})
    }
    companySelections = (data) => {
       console.log("data1",data)

        this.setState({filterCompany:data})
    }
    onFormSubmit = ()=>{
        this.setState({check:true})
        const detail = getStorage(constant.keys.cd)
        const CANDIDATE_ID = detail?detail.CANDIDATE_ID:""
        const {filterSkill,filterCompany,interviewQuestionAnswer,jobTitle,Anonymous} = this.state
        const Dept=interviewQuestionAnswer.map(i=>i.department)
        const Que=interviewQuestionAnswer.map(i=>i.question)
        const Ans =interviewQuestionAnswer.map(i=>i.answer)
        const modal = {
            filterSkill,filterCompany,interviewQuestionAnswer,jobTitle,Anonymous,CANDIDATE_ID:CANDIDATE_ID
        }
        if(filterSkill && jobTitle && filterCompany && CANDIDATE_ID){
            if(Dept.includes("") ||Dept.includes(" ")|| Que.includes("") || Que.includes("")  ||Ans.includes("") || Ans.includes(" ")){
                // this.setState({check:true})
                swal({
                    icon: 'warning',
                    text: 'please fill required fields',
                    timer: 3000,
                  })
            }
            else{
        AddInterviewUpdate(modal).then((res)=>{
            swal({
                icon: 'success',
                text: 'Question Added Successfully',
                timer: 3000,
              })
              window.location.reload();
            }).catch(err=>alert(err))
            }
        
    }
    else if(!CANDIDATE_ID){
        this.setState({openModal:true})
    }
    else if(!filterSkill || !jobTitle || !filterCompany){
        swal({
            icon: 'warning',
            text: 'please fill required fields',
            timer: 3000,
          })
    }
    }
    onCloseModal = ()=>{
        this.setState({openModal:false})
    }
  render() {
    const {skill_list,Company_list,departments,totalCount} =this.props
    const {interviewQuestionAnswer,jobTitle,filterCompany,check,filterSkill} = this.state
    return (
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
            <div className="rg-share-your-interview  rg-haslayout pt-0">
                <div className="rozgar-interviewShare">
                    <div className="container">
                        <div className="row">
                             <div className="col-12 col-sm-12 col-md-4">
                                <div className="fxt-bg-img interviewsformbox-left-box" data-bg-image={'./assets/images/share-jobs.png'}
										style={{
											background: "rgb(255 229 229) url(" + "./assets/images/share-jobs.png" + ")",
											backgroundPosition: 'bottom 30px center',
											backgroundSize: '75%',
											backgroundRepeat: 'no-repeat'
										}}>
                                        <h4 className='interview-titles-bx text-uppercase'>Share your<br/><span className='font-weight-normal sharintervtext'>interview questions</span> & help people get their<br/><span className='font-weight-normal sharintervtext'>dream job!</span></h4>
                                </div>      
                            </div>

                            <div className="col-12 col-sm-12 col-md-8">
                                <div className='interviewsformbox'>
                                    <div className='tob-Bling-box'>
                                        {/* {console.log("test",totalCount)} */}
                                         <h5><span><img src={'./assets/images/sare-user.png'} alt='img description' /> {totalCount?totalCount.total + 82:82} people</span> shared their advice in the last 24 hours! So can you!</h5>
                                    </div>
                                 
                                    <div className='interviewShare-form-box'>
                                           <div>
                                                <div className='row'>
                                                    <div className='field col-md-6'>
                                                        <label for='comname'>Company*</label>
                                                       
                                                         <AsyncTypeahead
          id="typeahead"
          delay={500}
          emptyLabel="No se encontraron resultados"
          ignoreDiacritics={true}
          labelKey="COMPANY_NAME"
          minLength={1}
          onSearch={(e)=>this.companySelections(e)}
          onChange={(e)=>this.companySelections(e)}
          placeholder="Select Company"
          promptText="Searching"
          searchText={Company_list}
          options={Company_list}
        />

                                                        {!filterCompany?<span style={{color:'red'}}>This Field is Required</span>:null}
                                                    </div>
                                                    <div className='field col-md-6'>
                                                        <label for='jobtitle'>Job Title*</label>
                                                        <input type='text' name='jobtitle' id='jobtitle' value={jobTitle} onChange={(e)=>this.setState({jobTitle:e.target.value})} placeholder='Title' />
                                                        {!jobTitle?<span style={{color:'red'}}>This Field is Required</span>:null}
                                                    </div>
                                                    <div className='field col-md-12 pt-2'>
                                                        <label for='skillsname'>Skills*</label>
                                                        
                                                        {skill_list && <Typeahead
                                                        style={{height:'45px',border:'1px solid lightgrey',borderRadius:'5px',padding:'10px 20px'}}
                                                        id="basic-typeahead-single"
                                                        labelKey="SKILL"
                                                        multiple
                                                        onChange={(e)=>this.setMultipleSelections(e)}
                                                        options={skill_list}
                                                        placeholder="Skills..."
                                                        />}
                                                        {!filterSkill?<span style={{color:'red'}}>This Field is Required</span>:null}
                                                    </div>
                                                </div>
                                                {interviewQuestionAnswer.map((item,index)=>{
                                                return(
                                                <div className='row'>
                                                     <div className='field col-md-12'>
                                                        <div className='inter-process-heading'>
                                                            <h5>Share details of your interview process <img src={'./assets/images/interview-process.png'} alt='img description' /></h5>
                                                        </div>
                                                        <div className='inter-process-round-head mb-3'>
                                                            <h5>What was question {index+1} ?</h5>
                                                        </div>
                                                        <div className='interview-round-chips-list'>
                                                            <select name="department" value={item.department} onChange={(e)=>this.DepartmentChange(e,index)}>
                                                                {console.log("test",item.department,interviewQuestionAnswer[index].department)}
                                                                <option value="">Select Department</option>
                                                                {departments && departments.map((i)=>{
                                                                    return(
                                                                        <option value={i.EMPLOYER_ROLE_ID}>{i.EMPLOYER_ROLE}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {interviewQuestionAnswer[index].department?null:<p><span style={{color:'red'}}>This Field is Required</span></p>}
                                                            <div>
                                                                <div className='row'>
                                                                    <div className='field col-md-12 mb-2'>
                                                                    <label for='fullname'>Add Question *</label>
                                                                    <input type='text' name='question' value={item.question} onChange={(e)=>this.QuestionChange(e,index)} placeholder='Question' contenteditable='true' data-placeholder='' spellcheck='false' class='input-chip' />
                                                                    {interviewQuestionAnswer[index].question?null:<p><span style={{color:'red'}}>This Field is Required</span></p>}
                                                                   
                                                                    </div>
                                                                    <div className='field col-md-12'>   
                                                                    <label for='fullname'>Add Answer *</label>
                                                                    <input type='text' name='answer' value={item.answer} onChange={(e)=>this.AnswerChange(e,index)} placeholder='Answer' contenteditable='true' data-placeholder='' spellcheck='false' class='input-chip' />
                                                                    {interviewQuestionAnswer[index].answer?null:<p><span style={{color:'red'}}>This Field is Required</span></p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                                })
                                                }
                                                 <div className='text-right'>
                                                     { interviewQuestionAnswer.length > 1 &&  <a href='javascript:void(0);' className='qaaddmore'onClick={(e)=>this.ondeleteChange(e)}><i class="lnr lnr-circle-minus"></i> Remove question</a>}
                                                        <a href='javascript:void(0);' className='qaaddmore'onClick={(e)=>this.onClickChange(e)}><i class="lnr lnr-plus-circle"></i> Add more question</a>
                                                  </div>
                                                <div className='row'>
                                                     <div className='field col-md-12'>
                                                     <div className='field'>
                                                        <div class='checkbox'>
                                                           <label className='lablecheckbox'><input type='checkbox' value='' onClick={(e)=>this.setState({Anonymous:e.target.checked})}/> Keep this interview anonymous</label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                </div>
                                               
                                                <div className='row'>
                                                     <div className='field col-md-12'>
                                                     <div className='field'>
                                                     <button class="interview-Submit-btn" onClick={this.onFormSubmit}>Submit</button>
                                                      </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                     <div className='field col-md-12'>
                                                     <div className='field-para-interview'>
                                                       <p>By submitting I agree to the <a href={constant.component.privacyPolicy.url}>Privacy policy </a> , <a href={constant.component.termsConditions.url}>Terms & conditions</a> and <a href=''>Community guidelines</a> of Rozgar.com</p>
                                                      </div>
                                                    </div>
                                                </div>          
                                                    
                                                    
                                            </div>


                                    </div>    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ReactModal
            isOpen={this.state.openModal}
            style={{
              content: {
                top: "5%",
                left: "30%",
                right: "auto",
                bottom: "auto",
              },
              overlay: { backgroundColor: "rgba(15,29,45,0.70)" },
            }}
            onRequestClose={this.onCloseModal}
            backdrop="static"
          >
            {/* <SignInForSaveUnsave
              leftBar={this.state.leftBar}
              history={this.props.router}
              onCloseModal={this.onCloseModal}
            /> */}
          {/* </ReactModal> */} 
    </main> 
    )
  }
}
