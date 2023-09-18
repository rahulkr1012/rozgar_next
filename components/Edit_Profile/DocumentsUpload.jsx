import React, { Component } from 'react'
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react'
import {  uploadDocument } from '@/action/CandidateAction';

export default class DocumentUpload extends Component {
    constructor(props) {
        super(props);
        const detail = props.detail;
        this.state = {
            remark: '',
            APPLICATION_ID: this.props.APPLICATION_ID,
            DOC_FILE: {},
            showLoader:false,
        }
    }




    onCancel = () => {
        this.props.onCancel()
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true
        if (!data["DOC_FILE"].name.match(/\.(zip)$/)) {
            swal({
                icon: "error",
                text: "Please upload zip file",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
            });
            isValid = false
        }
        this.setState({
            error: error
        })

        return isValid
    }

    

    onSubmit = (e) => {
        e.preventDefault()
        const { DOC_FILE, remark, APPLICATION_ID } = this.state
        const formData = new FormData();
        formData.append('APPLICATION_ID',APPLICATION_ID );
        formData.append('DOC_FILE',DOC_FILE );
        formData.append('remark',remark)
        let model={
            DOC_FILE:DOC_FILE
        }
        let status=this.validateForm(model)
        if(status){
            this.setState({ showLoader: true })
        uploadDocument(formData).then((res) => {
            this.setState({ showLoader: true })
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.props.onCancel()
                this.setState({ showLoader: false })
                this.props.getJobApplicant()  
                //window.location.reload();  

            } else {
                this.setState({showLoader:false})
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
            }
        });
    }
    }
  


  


    render() {
        return (
            <React.Fragment>
                <form >
                {this.state.showLoader &&
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
                        </LoadingOverlay></div>}
                    <div className="row">
                        <div className="col-lg-12 form-group">
                            <label>Upload Document <span className='text-danger'>*</span></label>
                            <input type="file" name="DOC_FILE"  
                            style={{height: "31px"}}
                            className="form-control "
                            accept=".zip"
                            onChange={(e) => { this.setState({ DOC_FILE: e.target.files[0] }) }}
                                                         />
                            <p className='text-danger pt-4 DocumentUploadp' >Note: Attach zip file including ID Proof (Aadhar Card, PAN Card, Voter ID), Address Proof (Aadhar Card, Voter ID, Electricity Bill etc), 3 Months Salary Slip, Educational Certificates (Graduation - Marksheet & Degree Certificate) , Photograph, Cancelled Cheque / Passbook, Pervious Employment Documents, any other documents if any.</p>
                        </div>
                        <div className="col-lg-12 form-group">
                            <label>Remark</label>
                            <input
                                type="text"
                                name='remark'
                                value={this.state.remark}
                                onChange={(e) => { this.setState({ remark: e.target.value }) }}
                                className="form-control p-1"
                                placeholder="Remark"

                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 text-right pb-3 pt-3">
                            <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel}>CANCEL</button>
                            <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={this.onSubmit} >SAVE</button>
                        </div>
                    </div>
                </form >

            </React.Fragment>
        )
    }
}
