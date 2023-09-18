import React, { Component } from 'react'
import { AddEmployerReview, CreateEmployment, DeleteEmployment, getCompanyReview, ListEmployment, UpdateEmployment } from '@/action/CandidateAction';
import swal from 'sweetalert';
import constant from 'constant';
import noSearchFound from '../../src/assets/images/no-results.png';
import nl2br from 'react-nl2br';
import Link from 'next/link';
import ModalWindow from 'components/common/common/ModalWindow';
import EditEmploymentModal from 'components/EditProfileModal/EmploymentModal';
import CompanyReview from './CompanyReview';
import EmploymentLoader from 'components/common/EditProfileLoader/Employmentloader'
import { getCookie } from 'cookies-next';
import Image from 'next/image';
export default class Employment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            employmentList: [],
            employmentDetails: {},
            type: "",
            showModalReview: false,
            CANDIDATE_EMPLOYER_ID: '',
            reviewData: {},
            showLoader:false
        }
    }

    componentDidMount() {
        this.getEmploymentList()
    }

    getEmploymentList = () => {
        this.setState({showLoader:true})
        ListEmployment().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                setTimeout(() => {
                    this.setState({ showShimmer: false })
                }, 1000)
                this.setState({
                    employmentList: res.result,
                })
            }
        });
    }

    validateForm = (model) => {

        let data = model
        let error = {}
        let isValid = true
        if (!data["CurrentDesignation"]) {
            error["CurrentDesignation"] = "Please Enter Current Designation"
            isValid = false
        }

        if (!data["CurrentCompany"]) {
            error["CurrentCompany"] = "Please Enter Current Company"
            isValid = false
        }

        if (!data["JoiningDateYear"]) {
            error["JoiningDateYear"] = "Please Select Joining Year"
            isValid = false
        }
        if (!data["JoiningDateMonth"]) {
            error["JoiningDateMonth"] = "Please Select Joining Month"
            isValid = false
        }
        if (data["IsThisYourCurrentCompany"] == 'N') {
            
            if (!data["WorkingTillDateYear"]) {
                error["WorkingTillDateYear"] = "Please Select Working Till Date Year"
                isValid = false
            }
            if (data["WorkingTillDateYear"] < data["JoiningDateYear"]) {
                error["WorkingTillDateYear"] = "Value Must be Greater than or Equal to Start Year "
                isValid = false
            }
            if (data["WorkingTillDateYear"] == data["JoiningDateYear"]) {
                if (+data["WorkingTillDateMonth"] < +data["JoiningDateMonth"]) {
                    error["WorkingTillDateMonth"] = "End Month Must be Greater than Start Month"
                    isValid = false
                }
            }


            if (!data["WorkingTillDateMonth"]) {
                error["WorkingTillDateMonth"] = "Please Select Working Till Month"
                isValid = false
            }
        }

        if (data["Skills"].length == 0) {
            error["SkillsUsed"] = "Please Select Skills"
            isValid = false
        }

        if (!data["JobProfile"]) {
            error["JobProfile"] = "Please Enter Job Profile"
            isValid = false
        }

        if (!data["CurrentAnnualSalaryLacs"].toString()) {
            error["CurrentAnnualSalaryLacs"] = "Please Enter Current Annual Salary In Lakhs"
            isValid = false
        }

        if (!data["CurrentAnnualSalaryThousands"].toString()) {
            error["CurrentAnnualSalaryThousands"] = "Please enter current annual salary in thousands"
            isValid = false
        }

        if (!data["IsThisYourCurrentCompany"]) {
            error["IsThisYourCurrentCompany"] = "Please Enter Is This Your CurrentCompany"
            isValid = false
        }

        if (!data["NoticePeriod"] && data['IsThisYourCurrentCompany'] == 'Y') {
            error["NoticePeriod"] = "Please Select NoticePeriod"
            isValid = false
        }
        if (data["NoticePeriod"] == '5' && data['IsThisYourCurrentCompany'] == 'Y') {

            if (!data["ExpectedLastWorkingDayYear"] || !data["ExpectedLastWorkingDayMonth"] || !data["ExpectedLastWorkingDayDay"]
            ) {
                error["ExpectedLastWorkingDay"] = "Please Select Last Working Day in Current Company."
                isValid = false
            }
        }

        this.setState({
            error: error
        })

        return isValid
    }


    diff_year_month_day = (dt1, dt2) => {
        var time = (dt2.getTime() - dt1.getTime()) / 1000;
        var year = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25));
        var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
        var days = Math.abs(Math.round(time / (3600 * 24)));

        let years = Math.floor(month / 12)
        let months = Math.floor(month % 12)
        return years + " " + "Years" + " " + months + " " + " Months"

    }

    createEmployment = (model) => {
        let status = this.validateForm(model)
        if (status) {
            if (model.type == 'ADD') {
                CreateEmployment(model).then((res) => {

                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getEmploymentList()
                        this.props.getEmploymentDetails()
                        this.props.getCandidateDetail()
                    } else {
                        swal({
                            icon: "error",
                            text: res.error,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                    }
                });
            } else {
                UpdateEmployment(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getEmploymentList()
                        this.props.getEmploymentDetails()
                        this.props.getCandidateDetail()
                    } else {
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
    }

    removeSkills = (data, e) => {
        const { CANDIDATE_ID } = this.state.detail
        DeleteEmployment({ CANDIDATE_ID: CANDIDATE_ID, CANDIDATE_EMPLOYER_ID: data.CANDIDATE_EMPLOYER_ID }).then((res) => {

            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getEmploymentList()
                this.props.getCandidateDetail()
                this.props.getEmploymentDetails()
            }
        })
    }

    getReviewDetails = (data, e, type) => {
        const { CANDIDATE_ID } = this.state.detail
        const { CANDIDATE_EMPLOYER_ID } = data
        getCompanyReview(CANDIDATE_ID, CANDIDATE_EMPLOYER_ID).then((res) => {
            if (res.status) {
                this.setState({ reviewData: res.result.list })
                this.setState({ showModalReview: true, employmentDetails: data, type: type })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    diff_year_month_day = (dt1, dt2) => {
        var time = (dt2.getTime() - dt1.getTime()) / 1000;
        var year = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25));
        var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
        var days = Math.abs(Math.round(time / (3600 * 24)));

        let years = Math.floor(month / 12)
        let months = Math.floor(month % 12)
        return years + " " + "Years" + " " + months + " " + " Months"

    }

    onShowModal = (data = {}, e, type) => {
        const st = this.state
        this.setState({ showModal: true, employmentDetails: data, type: type })
    }
    onShowModalReview = (data = {}, e, type) => {
        const st = this.state
        // this.setState({ showModalReview: true, employmentDetails: data, type: type })
        this.getReviewDetails(data, e, type)
    }
    onhideModalReview = () => {
        this.setState({ showModalReview: false, error: {} })
    }

    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }
    render() {
        const { showModal, employmentList, showModalReview, CANDIDATE_EMPLOYER_ID,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Employment <Link href='' className='pofileupdatetext' onClick={(e) => { this.onShowModal({}, e, 'ADD') }}>ADD EMPLOYMENT</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        {showLoader? <EmploymentLoader/>:
                            employmentList && employmentList.length > 0 ? employmentList.map((data, index) => {
                                return (

                                    <div className='pro-job-details mb-3' key={index}>
                                        <div className='grid03 '>
                                            <div className='font-weight-500 font-17 pb-1'>{data.CURRENT_DESIGNATION} <i onClick={(e) => { this.onShowModal(data, e, 'UPDATE') }} title='Edit' className="ti-pencil font-weight-500 font-17"></i> <i title='Delete' style={{ cursor: 'pointer' }} className="ti-trash font-weight-500 font-17" onClick={(e) => { this.removeSkills(data, e) }} aria-hidden="true"></i></div>
                                            <div className='font-weight-500 font-15'>
                                                {data.CURRENT_COMPANY}
                                                <span className='write-review-box' style={{ marginLeft: "10px", cursor: "pointer" }}><span className='review-status-bx' style={{color:"#f30d1d",marginLeft:"-3px"}}>| Review Status</span>
                                                    {data.reviewStatus == "Pending"
                                                        ?
                                                        <span>
                                                         
                                                            <a 
                                                            className='my-2 mx-2'
                                                            style={{ backgroundColor: "#ff9600", color: '#ffffff', padding: "3px 8px 3px 8px", borderRadius: '5px', fontSize: '10px' }}
                                                               
                                                            > Pending </a>
                                                             <i className="ti-pencil"  onClick={(e) => {
                                                                    this.onShowModalReview(data, e, 'UPDATE')
                                                                    // this.getReviewDetails(data, e)
                                                                }}></i>
                                                        </span>
                                                        :
                                                        <span className='write-review-btn'>{data.rating == null
                                                            ?
                                                            <a onClick={(e) => this.onShowModalReview(data, e, 'ADD')} style={{ backgroundColor: "#e81c28", color: '#fff', padding: "3px 8px", borderRadius: '5px', fontSize: '10px', }}>  Write a Review </a>
                                                            :
                                                            <span style={{ backgroundColor: "#33ae4f", color: '#fff', padding: "3px 8px 3px 8px", borderRadius: '5px', fontSize: '10px', }} className='ml-2'><i style={{ marginRight: '5px' }} className="fa fa-star"></i>{data.rating}</span>
                                                        }
                                                        </span>
                                                    }
                                                </span>
                                            </div>
                                            <div className='font-weight-500'>{data.JOINING_DATE_MONTH_NAME} {data.JOINING_DATE_YEAR} to {data.IS_THIS_YOUR_CURRENT_COMPANY == 'Y' ? `Present ( ${this.diff_year_month_day(new Date(), new Date(`${data.JOINING_DATE_YEAR}-${data.JOINING_DATE_MONTH}-31`))})` : `${data.WORKING_TILL_DATE_MONTH_NAME} ${data.WORKING_TILL_DATE_YEAR} ( ${this.diff_year_month_day(new Date(`${data.WORKING_TILL_DATE_YEAR}-${data.WORKING_TILL_DATE_MONTH}-01`), new Date(`${data.JOINING_DATE_YEAR}-${data.JOINING_DATE_MONTH}-31`))})`} </div>
                                            <div className='my-2'> {data.NOTICE_PERIOD ? <span>Notice Period : {data.NOTICE_PERIOD}</span> : ""}</div>
                                            <div className=''>{nl2br(data.JOB_PROFILE)}</div>
                                            <div className=''><span className='font-weight-600 '>Top Key Skills : {data.SKILL_USED && data.SKILL_USED.split(',').map((d, i) => { return <span className='btn-keys-kills-sm mt-5'>{d}</span> })}</span></div>
                                        </div>
                                        {employmentList.length > 1 ?
                                            <div style={{ height: "2px", background: '#CCCCCC' }}></div> : ""}

                                    </div>

                                )
                            }) : <div>
                                <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                <h6 className='text-center text-danger'>No Employment Added</h6>
                                <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal({}, e, 'ADD') }} > Please Add Employment  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                            </div>
                        }

                    </div>
                </div>
                {showModalReview && <ModalWindow
                    backdrop="static"
                    toggleModal={this.onhideModalReview}>
                    <CompanyReview
                        error={this.state.error}
                        employmentDetails={this.state.employmentDetails}
                        onCancel={this.onhideModalReview}
                        getEmploymentList={() => this.getEmploymentList()}
                        onSubmit={this.onSubmit}
                        type={this.state.type}
                        reviewDetail={this.state.reviewData}
                    />
                </ModalWindow>}



                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title={this.state.type == 'ADD' ? 'Add Employment' : 'Update Employment'}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditEmploymentModal
                        error={this.state.error}
                        onSubmit={this.createEmployment}
                        onCancel={this.onhideModal}
                        employmentDetails={this.state.employmentDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}
