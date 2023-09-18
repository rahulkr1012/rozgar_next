import React, { Component } from 'react'
import { addEducationCandidate, deleteEducationCandidate, listEducationCandidate, updateEducationCandidate } from '@/action/CandidateAction';
import swal from 'sweetalert';
import constant from 'constant';
import noSearchFound from '../../src/assets/images/no-results.png'
import ModalWindow from 'components/common/common/ModalWindow';
import EditEducationModal from 'components/EditProfileModal/EducationModal';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import EducationLoader from 'components/common/EditProfileLoader/EducationLoader'
 
export default class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            educationList: [],
            error: {},
            educationDetails: {},
            type: "",
            showLoader:false
        }
    }

    componentDidMount() {
        this.getCandidateEducationList()
         
        
    }

    getCandidateEducationList = () => {
        this.setState({showLoader:true})
        listEducationCandidate().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                let d = res.result.map((data, index) => {
                    return {
                        CANDIDATE_EDUCATION_ID: data.CANDIDATE_EDUCATION_ID,
                        CANDIDATE_ID: data.CANDIDATE_ID,
                        COURSE_TYPE: data.COURSE_TYPE,
                        COURSE_TYPE_ID: data.COURSE_TYPE_ID,
                        EDUCATION_QUALIFICATION: data.EDUCATION_QUALIFICATION && data.EDUCATION_QUALIFICATION.map((d, i) => { return { EDUCATION_QUALIFICATION_ID: d.EDUCATION_QUALIFICATION_ID, COURSE_STREAM: d.COURSE_STREAM, label: d.COURSE_STREAM } }),
                        EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
                        GRADING_SYSTEM_ID: data.GRADING_SYSTEM_ID,
                        GRADING_SYSTEM_TYPE: data.GRADING_SYSTEM_TYPE,
                        MARKS: data.MARKS,
                        PASSING_OUT_YEAR: data.PASSING_OUT_YEAR,
                        QUALIFICATION: [{ ...data.QUALIFICATION, label: data.QUALIFICATION.QUALIFICATION_NAME }],
                        QUALIFICATION_ID: data.QUALIFICATION_ID,
                        SPECIALIZATION: data.SPECIALIZATION && data.SPECIALIZATION.map((d, i) => { return { SPECIALIZATION: d.SPECIALIZATION, SPECIALIZATION_ID: d.SPECIALIZATION_ID, label: d.SPECIALIZATION } }),
                        SPECIALIZATION_ID: data.SPECIALIZATION_ID,
                        UNIVERSITY_INSTITUTE: data.UNIVERSITY_INSTITUTE
                    }; 
                    
                });
                this.setState({
                    educationList: d
                })
            }
        });
    }

    validateForm = (model) => {

        let data = model
        let error = {}
        let isValid = true

        if (!data["Course"] || data["Course"].length == 0) {
            error["Course"] = "Please Select Course"
            isValid = false
        }
        if (!data["Education"] || data["Education"].length == 0) {
            error["Education"] = "Please Select Education"
            isValid = false
        }
        if (!data["UniversityInstitute"]) {
            error["UniversityInstitute"] = "Please Enter University"
            isValid = false
        }
        if (!data["CourseType"] || data["CourseType"].length == 0) {
            error["CourseType"] = "Please Select Couse Type"
            isValid = false
        }
        // if (!data["PassingOutYear"]) {
        //     error["PassingOutYear"] = "Please Enter Passing Out Year"
        //     isValid = false
        // }
        if (!data["GradingSystem"] || data["GradingSystem"].length == 0) {
            error["GradingSystem"] = "Please Select Grading System"
            isValid = false
        }
        if (!data["marks"]) {
            error["marks"] = "Please Enter Marks"
            isValid = false
        }
        if (data["marks"]) {
            let marks = parseFloat(data["marks"])
            if (data["GradingSystem"] == 1) {
                if (marks > 10 || marks < 0.1) {
                    error["marks"] = "Grading must be between 0.1 and 10"
                    isValid = false
                }
            }
            if (data["GradingSystem"] == 2) {
                if (marks > 4 || marks < 0.1) {
                    error["marks"] = "Grading must be between 0.1 and 4"
                    isValid = false
                }
            }
            if (data["GradingSystem"] == 3) {
                if (marks > 100 || marks < 35) {
                    error["marks"] = "Percentage of marks must be between 35 to 100"
                    isValid = false
                }
            }
        }

        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateEducation = (model) => {
        let status = this.validateForm(model)
        if (status) {
            if (model.type == "ADD") {
                addEducationCandidate(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateEducationList()
                        this.props.getCandidateEducationList()
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
                updateEducationCandidate(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateEducationList()
                        this.props.getCandidateEducationList()
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
        deleteEducationCandidate({ CANDIDATE_EDUCATION_ID: data.CANDIDATE_EDUCATION_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getCandidateEducationList()
                this.props.getCandidateEducationList()
                this.props.getCandidateDetail()
            }
        })
    }

    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true, educationDetails: data, type: type })
    }


    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }

    render() {
        const { showModal, educationList,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Education <Link href={''} className='pofileupdatetext' onClick={(e) => { this.onShowModal(null, e, 'ADD') }}>ADD EDUCATION</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        {showLoader?<EducationLoader/>:
                            educationList && educationList.length > 0 ? educationList.map((data, index) => {
                                return (
                                    <div className='pro-job-details mb-3'>
                                        <div className='grid03'>
                                            <div className='font-weight-500 font-17 pb-1'>{data.EDUCATION_QUALIFICATION && data.EDUCATION_QUALIFICATION[0].COURSE_STREAM} - {data.SPECIALIZATION && data.SPECIALIZATION[0].SPECIALIZATION} <i onClick={(e) => { this.onShowModal(data, e, 'UPDATE') }} title='Edit' className="ti-pencil"></i> <i style={{ cursor: 'pointer' }} title='Delete
                                            ' className="ti-trash font-weight-500 font-15" onClick={(e) => { this.removeSkills(data, e) }}></i></div>
                                            <div className=''>{data.UNIVERSITY_INSTITUTE}</div>
                                            <div className=''>{data.PASSING_OUT_YEAR}  ({data.COURSE_TYPE})</div>
                                        </div>
                                    </div>
                                )
                            }) : <div>
                                <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                <h6 className='text-center text-danger'>No Education Detail Added</h6>
                                <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(null, e, 'ADD') }} > Please Add Education  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                            </div>
                        }
                    </div>
                </div>
                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title={this.state.type == "ADD" ? "Add Education" : "Update Education"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditEducationModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateEducation}
                        onCancel={this.onhideModal}
                        educationDetails={this.state.educationDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}
