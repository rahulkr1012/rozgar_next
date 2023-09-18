import React, { Component } from 'react'
import { getCandidateDetail, GetPersonalDetail, getPersonalDetail, phoneVerification, reMobSendOTP, resendVerificationEmail, UpdatePersonalDetails } from '@/action/CandidateAction'
import constant from 'constant';
import OtpInput from 'react-otp-input';
import swal from 'sweetalert';
import EditPersonalDetailsModal from './EditPersonalDetailsModal';
import touchPic from '@/assets/images/touch.png'
import { getCookie } from 'cookies-next';
import ModalWindow from 'components/common/common/ModalWindow';
import Image from 'next/image';

// import touch from '../../assets/images/touch.png'
export default class VerifyEmailMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            candidateDetail: {},
            showModalMobile: false,
            mob_otp: '',
            openModal: false,
            personalData: '',
            otp: '',
            email: '',
            phone: '',
            CANDIDATE_ID: '',
            personalDetails: {},
            PHONENO: '',
            error: {},
            showModal: false,
            // loginData: localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null,
            IS_EMAIL_VERIFIED: '',
            IS_PHONE_VERIFIED: '',
            showModelUpdate: false
        }
    }

    getPersonalDetail = () => {

        const { CANDIDATE_ID } = this.state.detail
        GetPersonalDetail({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
            if (res.status) {
                this.setState({
                    personalData: res.result
                })
            }
        });
    }

    validatePersonalDetail = (model) => {

        let data = model
        let error = {}
        let isValid = true
        if (!data["Gender"]) {
            error["Gender"] = "Please Select Gender"
            isValid = false
        }
        if (!data["FirstName"]) {
            error["FirstName"] = "Please Enter First Name"
            isValid = false
        }
        if (!data["SecondName"]) {
            error["SecondName"] = "Please Enter Last Name"
            isValid = false
        }
        if (!data["MobileNo"]) {
            error["MobileNo"] = "Please Enter Mobile Number"
            isValid = false
        }
        if (data["MobileNo"] !== "") {
            const regexExp = /^[6789][0-9]{9}/
            if (regexExp.test(data.MobileNo)) { } else {
                error["MobileNo"] = "Please enter valid Mobile Number";
                isValid = false;
            }
        }
        if (!data["EmailId"]) {
            error["EmailId"] = "Please Enter Email"
            isValid = false
        }

        if (!data["MaritalStatus"]) {
            error["MaritalStatus"] = "Please Select Martial Status"
            isValid = false
        }
        if (!data["Category"]) {
            error["Category"] = "Please Select Category"
            isValid = false
        }
        // if (!data["WorkPermitForOtherCountries"] || data["WorkPermitForOtherCountries"].length == 0) {
        //     error["WorkPermitForOtherCountries"] = "Please Select Work Permit for Other Country"
        //     isValid = false
        // }
        if (!data["WorkPermitForUSA"]) {
            error["WorkPermitForUSA"] = "Please Select Work Permit for USA"
            isValid = false
        }
        // if (!data["Languages"] || data["Languages"].length == 0) {
        //     error["Languages"] = "Please Select Language"
        //     isValid = false
        // }
        if (!data["DifferentlyAbled"]) {
            error["DifferentlyAbled"] = "Please Select Differently Abled"
            isValid = false
        }
        if (!data["PermanentAddress"]) {
            error["PermanentAddress"] = "Please Select Permanent Address"
            isValid = false
        }
        if (!data["HomeTown"]) {
            error["HomeTown"] = "Please Select Home Town"
            isValid = false
        }
        if (!data["Pincode"]) {
            error["Pincode"] = "Please Select Pincode"
            isValid = false
        }
        if (!data["DOB"]) {
            error["DOB"] = "Please Select DOB"
            isValid = false
        }
        if (!data["CurrentLocation"]) {
            error["CurrentLocation"] = "Please Select Current Location"
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
    }


    phoneVerification = (mob_otp) => {
        const { CANDIDATE_ID } = this.state.detail
        phoneVerification({ CANDIDATE_ID: CANDIDATE_ID, mob_otp: this.state.otp }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.setState({
                    showModal: false
                })
                this.getCandidateDetail()
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

    reSendOTP = () => {
        const { CANDIDATE_ID } = this.state.detail
        if (this.state.IS_PHONE_VERIFIED == 'N') {
            reMobSendOTP({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "OTP has been sent to your registered Mobile number",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
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
    MobileSendOTP = () => {
        const { CANDIDATE_ID } = this.state.detail
        if (this.state.IS_PHONE_VERIFIED == 'N') {
            reMobSendOTP({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
                if (res.status) {
                    // swal({
                    //     icon: "success",
                    //   text: "OTP has been sent to your registered Mobile number",
                    //     timer: 2000,
                    //     showCancelButton: false,
                    //     showConfirmButton: false,
                    // });
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
    resendVerificationEmail = () => {
        const { CANDIDATE_ID } = this.state.detail
        if (this.state.IS_EMAIL_VERIFIED == 'N') {
            resendVerificationEmail({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Mail has been sent successfully",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
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
    onShowModal = (data, e, type) => {
        const st = this.state
        this.MobileSendOTP()
        this.resendVerificationEmail()
        this.setState({ showModal: true, })
    }

    onhideModalUpdate = () => {
        this.setState({ showModalMobile: false, error: {} })
    }

    onShowModalUpdate = (data, e, type) => {
        const st = this.state
        this.setState({ showModalMobile: true, personalDetails: data, type: type })
    }
    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }

    handleChange = (otp) => {
        this.setState({ otp })
    }
    componentDidMount() {
        this.getCandidateDetail()
        this.getPersonalDetail()

    }

    AddUpdatePersonelDetail = (model) => {
        let status = this.validatePersonalDetail(model)
        if (status) {
            UpdatePersonalDetails(model).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.onhideModalUpdate()
                    this.getPersonalDetail()
                    this.getCandidateDetail()
                    //  this.props.getPersonalDetail()
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



    getCandidateDetail = () => {
        const { CANDIDATE_ID } = this.state.detail
        getCandidateDetail({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {

            if (res.status) {
                this.setState({
                    candidateDetail: res.result,
                    IS_EMAIL_VERIFIED: res.result.IS_EMAIL_VERIFIED,
                    IS_PHONE_VERIFIED: res.result.IS_PHONE_VERIFIED,
                    PHONENO: res.result.PHONENO

                })
            }

        }).catch((err) => {

            alert(err)
        })
    }

    verifyOTP = (otp) => {
        this.setState({
            mob_otp: otp
        })
        this.phoneVerification(otp)
    }

    render() {
        let { name, email, phone, checkTermsAndCondition, password, work_status, resume, error, isMobValid, isSpaceNotAllow } = this.state
        const { candidateDetail, PIN_CODE, careerProfile, projectList, workSampleList, certificateLists, onlineProfileLists, openModal } = this.state
        return (

            <div className='VerifyEmailBox' style={{ background: "rgb(251 193 193)" }}>
                {this.state.showModalMobile &&
                    <ModalWindow
                        title={this.state.personalData && this.state.personalData.DIFFERENTLY_ABLED ? "Update Personal Details" : "Add Personal Details"}
                        backdrop="static"
                        toggleModal={this.onhideModalUpdate}
                    >
                        <EditPersonalDetailsModal
                            error={this.state.error}
                            onSubmit={this.AddUpdatePersonelDetail}
                            onCancel={this.onhideModalUpdate}
                            personalDetails={this.state.personalDetails}
                            type={this.state.type}
                        />
                    </ModalWindow>}
                {this.state.showModal && this.state.IS_PHONE_VERIFIED == 'N' && <ModalWindow
                    title="OTP"
                    className='toppoup btn-close'
                    headerClassName='opthead'
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <form>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='otpimg'>
                                    <Image src={touchPic ? touchPic :''} />
                                </div>
                                <h3>Verification</h3>
                                <p>You will receive an OTP via Mobile</p>
                            </div>
                            <div class="col-12 justify-content-center">

                                <OtpInput
                                    value={this.state.otp}
                                    onChange={this.handleChange}
                                    numInputs={6}
                                    isInputNum={true}
                                    separator={<span style={{ visibility: 'hidden' }}>-</span>}
                                    inputStyle={{ width: '55px', padding: '3px' }}
                                    containerStyle={{ justifyContent: 'center' }}
                                />

                            </div>
                        </div>

                        <div className='row'>
                            <div class="col-12 text-center pb-3 pt-3" >
                                <button type='button' className='rg-btn rg-active btn-primary mr-2' onClick={this.verifyOTP}>VERIFY</button>
                            </div>
                            <p>Didn't receive the verification OTP?<span style={{ color: '#e81c28', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.reSendOTP}> Resend again</span></p>
                        </div>
                    </form>
                </ModalWindow>}
                <div className='container'>
                    <div className="row">
                        <div className="col-md-12">
                            {candidateDetail.IS_PHONE_VERIFIED == "N" || candidateDetail.IS_EMAIL_VERIFIED == "N" || candidateDetail.PHONENO == ''
                                ?
                                <h5>{this.state.IS_EMAIL_VERIFIED == 'N' && this.state.IS_PHONE_VERIFIED == 'N' ? <h5 style={{ textAlign: "center", padding: "6px 0px", margin: '0px' }}>Your email & phone have not  been verified yet. <a onClick={(e) => { this.onShowModal(candidateDetail, e) }} style={{ color: "#e74c3c", cursor: 'pointer', textDecoration: 'underline' }}>click here </a> to send verification email & OTP</h5> : this.state.PHONENO == '' ? <h5 style={{ textAlign: "center", padding: "6px 0px", margin: '0px' }}>You have not updated your mobile no. yet.<a onClick={(e) => { this.onShowModalUpdate(this.state.personalData, e) }} style={{ color: "#e74c3c", cursor: 'pointer', textDecoration: 'underline' }}>Click here</a>  to update and verify the same</h5> : this.state.IS_PHONE_VERIFIED == 'N' ? <h5 style={{ textAlign: "center", padding: "6px 0px", margin: '0px' }}>Your  phone has not  been verified yet. <a onClick={(e) => { this.onShowModal(candidateDetail, e) }} style={{ color: "#e74c3c", cursor: 'pointer', textDecoration: 'underline' }}>click here </a> send  OTP</h5> : <h5 style={{ textAlign: "center", padding: "6px 0px", margin: '0px' }}>Your email  has not  been verified yet. <a onClick={(e) => { this.onShowModal(candidateDetail, e) }} style={{ color: "#e74c3c", cursor: 'pointer', textDecoration: 'underline' }}>click here </a> send verification email</h5>}</h5>

                                :
                                ''
                            }

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
