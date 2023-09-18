import { Modal, ModalHeader, ModalBody } from "reactstrap";
import React, { Component } from "react";
import swal from "sweetalert";
import {
  deleteResume,
  GetResume,
  uploadResume,
} from "@/action/CandidateAction";
import constant from "../../constant";
import Link from "next/link";
import moment from "moment";
import FileSaver from "file-saver";
import { getCookie } from "cookies-next";
 
import CoverLetter from 'components/CoverLetter'
import { getCandidateAuthHeader } from "utils";
import axios from "axios";

class NoQuestionModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question ? this.props.question : [],
      error: false,
      showModal: false,
      detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : {},
      file: {},
      resumeLink: "",
      resumeDetails: {},
      resume_file: null,
      cover_letter_detail:null
    };
  }

  componentDidMount() {
    this.getResume();
  }

  onChange = (e, i) => {
    let quest = this.state.question;
    quest[i].ANSWER = e.target.value;
    this.setState({
      question: quest,
    });
  };

  validateQuestionAns = () => {
    let quest = this.state.question;
    let error = this.state.error;
    let isValid = true;
    let resume_file = this.state.resume_file;
    quest &&
      quest.length > 0 &&
      quest.map((data, index) => {
        if (!data["ANSWER"]) {
          isValid = false;
        }
      });
    if (isValid == false) {
      swal({
        icon: "error",
        text: "Please answer all question to apply Job",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }

    if (!resume_file) {
      isValid = false;
      swal({
        icon: "error",
        text: "Please upload resume to apply Job",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
    return isValid;
  };

  onSubmit = () => {
     
    let model = {
      quesData:
        this.state.question &&
        this.state.question.length > 0 &&
        this.state.question.map((d, i) => {
          return {
            question: d.QUESTION_ID,
            answer: d.ANSWER,
          };
        }),
    };
     
 
    if ( this.validateQuestionAns() ) {
      
      if(this.state.cover_letter_detail!=null) {
      const {
        attemp_left  ,
        JOB_ID ,
        COVER_LETTER,
        ai_generated,
        selected,
        saved_cvl_id 
      } = this.state.cover_letter_detail

      let model2 = { JOB_ID ,COVER_LETTER:COVER_LETTER , ai_generated: ai_generated , selected:selected  , saved_cvl_id  }
        
        if(saved_cvl_id!=null) { 
                  // modify at this id  
                  model2.modify= true 
                 this.props.apply(model , model2 );
          
              }else{
                 // new record save
                 model2.modify= false 
                 this.props.apply(model , model2 );
          }
      }
      else{
        this.props.apply(model  );
         
      }
     
     
      }
     
  };

  getResume = () => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    GetResume({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
      if (res.status) {
        this.setState({
          resumeDetails: res.result,
          resume_file: res.result.RESUME_FILE,
        });
      }
    });
  };

  onChangeFile = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  validateForm = (model) => {
    let data = model;
    let error = {};
    let isValid = true;
    if (!data["file"].name.match(/\.(pdf|doc|docx)$/)) {
      swal({
          icon: "error",
          text:"Please select PDF/DOC/DOCX file",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        isValid=false
    }
    if (data["file"] && data["file"].name) {
    } else {
      swal({
        icon: "error",
        text: "Please select file",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      isValid = false;
    }

    this.setState({
      error: error,
    });

    return isValid;
  };

  uploadResume=()=>{
    const {CANDIDATE_ID}=this.state.detail
    const {file}=this.state
    const formData = new FormData();
    formData.append('CANDIDATE_ID',CANDIDATE_ID );
    formData.append('RESUME_FILE',file );
    this.setState({file:''})
    let model={
        file:file
    }
  
    let status=this.validateForm(model)
    if(status){
        uploadResume(formData).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text:res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                  });
                  this.getResume()
                  // this.props.getResume()
                 // this.props.getCandidateDetail()
            } else {
              swal({
                icon: "error",
                text:"Something went wrong!!",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
              });
            }
          });
    } 
  }

saveFile = (model,filename) => {
  const {RESUME_FILE, CANDIDATE_ID}=model
  FileSaver.saveAs(
      `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-resume/${CANDIDATE_ID}/${RESUME_FILE}`,
      RESUME_FILE
    );
  };

  removeResume = (data, e) => {
    // const { CANDIDATE_ID } = this.state.detail ? this.state.detail :'';
    deleteResume({ CANDIDATE_ID: '' }).then((res) => {
      if (res.status) {
        this.getResume();
      }
    });
  };

  render() {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    let model = {
      RESUME_FILE: this.state.resumeDetails.RESUME_FILE,
      CANDIDATE_ID: CANDIDATE_ID,
    };
    return (
      <React.Fragment>
        <Modal
          size="lg"
          style={{ maxWidth: "800px", width: "100%", padding: "10px" }}
          isOpen={this.props.open}
          toggle={this.props.close}
        >
          <ModalHeader>{this.props.type} </ModalHeader>
          {/* <button type="button" onClick={()=>this.props.onCloseModal()} class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button> */}
              <button
                      type="button"
                      className="rg-btn btn-primary ml-2 header-close-btn"
                      style={{ border: "none", outline: "none" }}
                      onClick={this.props.close}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
          <ModalBody>
            
                     <CoverLetter cd_job_details={this.props.JOB_WITH_CD_DETAIL}  sendcvl_with_associatedJob={ (e)=>{
                         this.setState(({
                            ...this.state , cover_letter_detail:e 
                         }))
                      }} 
                   
                   />
                     
                    
              
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default NoQuestionModel;
