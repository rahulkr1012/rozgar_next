import React, { Component } from 'react'
import swal from 'sweetalert';
import { deleteResume, getFileDetail, GetResume, uploadResume } from '@/action/CandidateAction';
import constant from 'constant';
import { getCandidateAuthHeader, getStorage } from '../../utils';
import moment from 'moment'
import FileSaver from 'file-saver';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

export default class ResumeFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            file:{},
            error:{},
            resumeLink:'',
            resumeDetails:{},
        }
    } 
     
    componentDidMount(){
        this.getResume()
        this.props.getResume()
    }
    // shouldComponentUpdate(prevProps, prevState , snapshot){
    //     if(this.state.resumeDetails.RESUME_FILE !== prevState.resumeDetails.RESUME_FILE){
    //         console.log("prevState.resumeDetails.RESUME_FILE" , prevState.resumeDetails.RESUME_FILE , this.state );
    //     }
    //     return true 
    // }
    getResume=()=>{
        GetResume().then((res) => {
            if (res.status) {
              this.setState({
                resumeDetails:res.result
              })
              this.props.getResume()
            }
          });
  
        }

    getFileDetail=()=>{
        getFileDetail({fileName:this.props.resume}).then((res) => {
            if (res.status) {
              this.setState({
                resumeLink:res.result
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
          if (data['file'].size > 2e6) {
            swal({
                icon: "error",
                text:"Please upload a file smaller than 2 MB",
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
                      this.props.getResume()
                      this.props.getCandidateDetail()
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

    removeResume=(data, e)=>{
        const {CANDIDATE_ID}=this.state.detail
        deleteResume({CANDIDATE_ID :CANDIDATE_ID}).then((res)=>{
            if (res.status) {
                this.getResume()
                this.props.getResume()   
                this.props.getCandidateDetail()
            }
        })
  }

   saveFile = (model,filename) => {
    const {RESUME_FILE, CANDIDATE_ID}=model
    FileSaver.saveAs(
        `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-resume/${CANDIDATE_ID}/${RESUME_FILE}`,
        RESUME_FILE
    );
    }

    render() {
        const {CANDIDATE_ID}=this.state.detail ?  this.state.detail :''
        let model={
            RESUME_FILE: this.state.resumeDetails.RESUME_FILE,
            CANDIDATE_ID:CANDIDATE_ID
        }
        return (
            <React.Fragment>
                
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Resume</div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details'>
                            <div className='grid03'>
                                <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
                            </div>
                            {
                                this.state.resumeDetails && this.state.resumeDetails.RESUME_FILE 
                                &&
                                <div className='grid03 row'>
                                <div className='cvtype'  ><Link href={''} className='cvdownload'><i  class="ti-download" onClick={(e) => {this.saveFile(model, this.state.resumeDetails.RESUME_FILE)}} style={{cursor:'pointer'}}></i></Link>&nbsp;&nbsp;&nbsp;&nbsp; <span> {this.state.resumeDetails && this.state.resumeDetails.RESUME_FILE } </span>- Uploaded on - <b>{" " + this.state.resumeDetails && moment(this.state.resumeDetails.RESUME_UPDATE_TIME).format('MMM Do YY') }</b> </div>
                                <div className='cvdeleted' onClick={this.removeResume} style={{cursor:'pointer'}}>DELETE RESUME</div>
                                 </div>
                            }
                           
                            <div className='gridgap'>
                                <div className='updateresume'>
                                    <div className="updateresume">
                                        <div className="cvcard">
                                            <div className="cvdrop_box">
                                                <p>Files Supported: PDF, DOC , DOCX</p>
                                                <div style={{ color:'#333' }}>{this.state.file.name?.length > 15 ? this.state.file.name?.slice(0, 15) + '...' : this.state.file.name}</div>
                                                <input type="file"  ref={(ref) => this.upload = ref} hidden accept=".doc,.docx,.pdf" id="fileID" style={{ display: 'none' }} onChange={this.onChangeFile} onClick={e=>{e.target.value=null}} />
                                                <button className="btncv" onClick={()=>{this.upload.click()}}>BROWSE RESUME</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btncv pull-right m-1" onClick={this.uploadResume}>UPLOAD RESUME</button> 
                </div>
            </React.Fragment>
        )
    }
}
