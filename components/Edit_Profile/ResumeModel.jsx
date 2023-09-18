import { Modal, ModalHeader, ModalBody } from "reactstrap";
import React, { Component } from "react";
import swal from "sweetalert";
import { deleteResume, GetResume, uploadResume } from '@/action/CandidateAction';
// import { getsessionStorage, getStorage } from "../../utils";
import constant from "../../constant";
import Link from "next/link";
import moment from 'moment';
import FileSaver from 'file-saver';
import { getCookie } from "cookies-next";

class ResumeModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error:false,
        showModal: false,
        addUpdate: getCookie(constant.keys.addAndUpdate)? JSON.parse(getCookie(constant.keys.addAndUpdate))
        : {},
        detail: getCookie(constant.keys.cd),
        file:{},
        resumeLink:'',
        resumeDetails:{},
        resume_file:null
    }
  }

  componentDidMount() {
    this.getResume()
  }

  onChange=(e,i)=>{
    let quest=this.state.question;
    quest[i].ANSWER=e.target.value;
    this.setState({
        question:quest
    })
  }
  
  validateQuestionAns =()=>{
    let error=this.state.error;
    let isValid=true;
    let resume_file=this.state.resume_file;


    if(!resume_file){
      isValid=false
      swal({
        icon: "error",
        text: "Please upload resume to apply Job",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
    return isValid
  }

  onSubmit=()=>{
    const { JOB_ID } = this.state.addUpdate ? this.state.addUpdate : "";
    if(this.validateQuestionAns()){
        this.props.apply(JOB_ID)
    }
  }

  getResume=()=>{
    const {CANDIDATE_ID}=this.state.detail ? this.state.detail :''
    GetResume({CANDIDATE_ID:CANDIDATE_ID}).then((res) => {
        if (res.status) {
          this.setState({
            resumeDetails:res.result,
            resume_file:res.result.RESUME_FILE 
          })
        }
      });

    }

  onChangeFile=(event)=> {
    event.preventDefault();
    var file = event.target.files[0];
    if(file){
        this.setState({file}); 
    }
}

validateForm=(model)=>{
  let data=model
  let error={}
  let isValid=true
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
  if( data["file"] && data["file"].name){}
  else{
      swal({
          icon: "error",
          text:"Please select file",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      isValid=false
  }

  this.setState({
      error:error
  })

  return isValid
}

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
  }

  removeResume=(data, e)=>{
    const {CANDIDATE_ID}=this.state.detail
    deleteResume({CANDIDATE_ID :CANDIDATE_ID}).then((res)=>{
        if (res.status) {
            this.getResume()
        }
    })
}

  render() {
    const {CANDIDATE_ID}=this.state.detail ?  this.state.detail :''
    let model={
        RESUME_FILE: this.state.resumeDetails.RESUME_FILE,
        CANDIDATE_ID:CANDIDATE_ID
    }
    return (
      <React.Fragment>
        <Modal
          size="lg"
          style={{ maxWidth: "800px", width: "100%", padding: "10px" }}
          isOpen={this.props.open}
          toggle={this.props.close}
        >
          <ModalHeader>{this.props.type}</ModalHeader>
          <ModalBody>
            <>
              <form>
               
                  <div className="row">
                    <div className="col-12">
                    <label class="input-label">Resume</label>
                    {
                                this.state.resumeDetails && this.state.resumeDetails.RESUME_FILE 
                                &&
                                <div className='grid03 row'>
                                <div className='cvtype'  ><Link href={''}  className='cvdownload'><i  class="ti-download" onClick={(e) => {this.saveFile(model, this.state.resumeDetails.RESUME_FILE)}} style={{cursor:'pointer'}}></i></Link>&nbsp;&nbsp;&nbsp;&nbsp; <span> {this.state.resumeDetails && this.state.resumeDetails.RESUME_FILE } </span>- Uploaded on - <b>{" " + this.state.resumeDetails && moment(this.state.resumeDetails.RESUME_UPDATE_TIME).format('MMM Do YY') }</b> </div>
                                {/* <div className='cvdeleted' onClick={this.removeResume} style={{cursor:'pointer'}}>DELETE RESUME</div> */}

                                 </div>
                            }
                    <div className='gridgap'>
                                <div className='updateresume'>
                                    <div className="updateresume">
                                        <div className="cvcard">
                                            <div className="cvdrop_box">
                                                <p>Files Supported: PDF, DOC , DOCX</p>
                                                <div style={{ color:'#333' }}>{this.state.file.name?.length > 15 ? this.state.file.name?.slice(0, 15) + '...' : this.state.file.name}</div>
                                                <input type="file"  ref={(ref) => this.upload = ref} hidden accept=".doc,.docx,.pdf" id="fileID" style={{ display: 'none' }} onChange={this.onChangeFile} />
                                                <button type="button" className="btncv" onClick={()=>{this.upload.click()}}>BROWSE RESUME</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    <button className="btncv pull-right m-1" type="button" onClick={this.uploadResume}>UPLOAD RESUME</button> 
                    </div>
                  </div>
                <div className="row">
                  <div class="col-12 text-right pb-3 pt-3">
                    <button
                      type="button"
                      className="rg-btn btn-primary mr-2"
                      style={{ border: "none", outline: "none" }}
                      onClick={this.props.close}
                    >
                      CANCEL
                    </button>
                    <button
                      type="button"
                      className="rg-btn rg-active btn-primary"
                      style={{ border: "none", outline: "none" }}
                      onClick={(e) => this.onSubmit(e)}
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </form>
            </>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ResumeModel;
