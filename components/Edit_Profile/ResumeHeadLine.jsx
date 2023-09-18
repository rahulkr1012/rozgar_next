import React, { Component } from 'react'
import constant from 'constant';
import { addUpdateResumeHeadLine, getResumeHeadLine } from '@/action/CandidateAction';
import swal from 'sweetalert';
import noSearchFound from '@/assets/images/no-results.png'
import ModalWindow from 'components/common/common/ModalWindow';
import EditResumeHeadlineModal from 'components/EditProfileModal/ResumeHeadlineModal';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { withRouter } from 'next/router';
import Image from 'next/image';
import Loader from 'components/common/EditProfileLoader/ResumeHeadLineLoader';
class ResumeHeadLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            resumeHeadLine: '',
            error: {},
            showLoader:false

        }
    }

    componentDidMount() {
        this.getResumeHeadLine()
    }

    getResumeHeadLine = () => {
        this.setState({showLoader:true})
        getResumeHeadLine().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    resumeHeadLine: res.result.RESUME_HEADLINE
                })
            }
        });
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true

        if (!data["resumeHeadLine"]) {
            error["resumeHeadLine"] = "Resume Headline cannot be empty"
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateResumeHeadLine = (model) => {

        let status = this.validateForm(model)
        if (status) {
            addUpdateResumeHeadLine({ ResumeHeadline: model.resumeHeadLine }).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.onhideModal()
                    this.getResumeHeadLine()
                    this.props.getResumeHeadLine()
                    this.props.getCandidateDetail()
                } else {
                    swal({
                        icon: "error",
                        text: "Something went wrong!!",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                }
            });
        }
    }

    onShowModal = () => {
        const st = this.state
        this.setState({ showModal: true })
    }

    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }

    render() {
        const { showModal, resumeHeadLine,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Resume Headline <Link href='' className='pofileupdatetext' onClick={() => { this.onShowModal() }}>{this.state.resumeHeadLine && this.state.resumeHeadLine.length > 0 ? 'EDIT RESUME HEADLINE' : 'ADD RESUME HEADLINE'}</Link></div>
                    {showLoader&&<Loader/>}

                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details'>
                            <div className='grid03'>
                                {resumeHeadLine != null ?
                                    <p>{resumeHeadLine}</p> : <div>
                                        <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                        <h6 className='text-center text-danger'>No Resume Headline Added</h6>
                                        <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={() => { this.onShowModal() }} > Please Add Resume Headline  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title="Resume Headline"
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditResumeHeadlineModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateResumeHeadLine}
                        onCancel={this.onhideModal}
                        headline={this.state.resumeHeadLine}
                        props={this.props.router}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}

export default withRouter(ResumeHeadLine)