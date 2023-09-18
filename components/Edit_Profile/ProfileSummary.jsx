import React, { Component } from 'react'
import nl2br from 'react-nl2br'
import constant from 'constant';
import swal from 'sweetalert';
import noSearchFound from '../../src/assets/images/no-results.png'
import { addUpdateProfileSummary, getProfileSummary } from '@/action/CandidateAction';
import EditProfileSummaryModal from 'components/EditProfileModal/ProfileSummaryModal';
import ModalWindow from 'components/common/common/ModalWindow';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import ProfileSummaryLoader from 'components/common/EditProfileLoader/ProfileSummaryLoader'
export default class ProfileSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            profileSummary: '',
            error: {},
            showLoader:false
        }
    }

    componentDidMount() {
        this.getProfileSummary()
    }

    getProfileSummary = () => {
        this.setState({showLoader:true})
        getProfileSummary().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    profileSummary: res.result.PROFILE_SUMMARY || ''
                })
            }
        });
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true

        if (!data["profileSummary"]) {
            error["profileSummary"] = "Profile Summary cannot be empty"
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateProfileSummary = (model) => {
        let status = this.validateForm(model)
        if (status) {
            addUpdateProfileSummary({ ProfileSummary: model.profileSummary }).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.onhideModal()
                    this.getProfileSummary()
                    this.props.getProfileSummary()
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
        this.setState({ showModal: false,error:[] })
    }
    render() {
        const { showModal, profileSummary,showLoader } = this.state

        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Profile Summary <small> &nbsp;  &nbsp;</small> <Link href={''} className='pofileupdatetext' onClick={() => { this.onShowModal() }}>{profileSummary && profileSummary.length > 0 ? 'EDIT PROFILE SUMMARY' : 'ADD PROFILE SUMMARY'}</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details'>
                            <div className='grid03'>
                                {showLoader?<ProfileSummaryLoader/>:
                                profileSummary.length > 0 ?
                                    <p>
                                        {nl2br(profileSummary)}
                                    </p> : <div>
                                        <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                        <h6 className='text-center text-danger'>No profile Summary Added</h6>
                                        <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(null, e, 'ADD') }} > Please Add Profile Summary  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                    </div>}
                                {/* <p>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title={profileSummary && profileSummary.length > 0 ? "Updtae Profile Summary" : "Add Profile Summary"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditProfileSummaryModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateProfileSummary}
                        onCancel={this.onhideModal}
                        profileSummary={this.state.profileSummary}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}
