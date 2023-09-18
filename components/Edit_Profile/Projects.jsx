import React, { Component } from 'react'
import nl2br from 'react-nl2br';
import { addProjectCandidate, deleteProjectCandidate, listProjectCandidate, updateProjectCandidate } from '@/action/CandidateAction';
import swal from 'sweetalert';
import constant from 'constant';
import noSearchFound from '../../src/assets/images/no-results.png'
import Link from 'next/link';
import EditProjectsModal from 'components/EditProfileModal/ProjectsModal';
import ModalWindow from 'components/common/common/ModalWindow';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import ProjectLoader from 'components/common/EditProfileLoader/ProjectLoader'
export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            projectList: [],
            error: {},
            projectDetails: {},
            type: "ADD",
            showLoader:false
        }
    }

    componentDidMount() {
        this.getCandidateProjectsLists()
    }

    getCandidateProjectsLists = () => {
        this.setState({showLoader:true})
        listProjectCandidate().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    projectList: res.result
                })
            }
        });
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true
        if (!data["ProjectTitle"]) {
            error["ProjectTitle"] = "Please Select Project title"
            isValid = false
        }

        if (!data["RoleDetails"]) {
            error["RoleDetails"] = "Please Enter Role Details"
            isValid = false
        }
        if (!data["Role"]) {
            error["Role"] = "Please Select Role"
            isValid = false
        }

        if (!data["NatureOfEmployement"]) {
            error["NatureOfEmployement"] = "Please Select Nature of Employment"
            isValid = false
        }

        if (!data["ProjectDetails"]) {
            error["ProjectDetails"] = "Please Enter Project Details"
            isValid = false
        }
        if (!data["WorkFromMonth"]) {
            error["WorkFromMonth"] = "Please Enter Project Start Month"
            isValid = false
        }
        if (!data["WorkedFromYear"]) {
            error["WorkedFromYear"] = "Please Enter Project Start Year"
            isValid = false
        }


        // if (!data["EmployerId"]) {
        //     error["EmployerId"] = "Please Select Employer"
        //     isValid = false
        // }
        if (!data["ProjectStaus"]) {
            error["ProjectStaus"] = "Please Select Project Status"
            isValid = false
        }
        if (data["ProjectStaus"] == "C") {
            if (!data["WorkTillMonth"]) {
                error["WorkTillMonth"] = "Please Enter Project End Month"
                isValid = false
            }
            if (data["WorkTillYear"] < data["WorkedFromYear"]) {
                error["WorkTillYear"] = "Value Must be Greater than or Equal to Start Year"
                isValid = false
            }

            if (data["WorkTillYear"] == data["WorkedFromYear"]) {
                if (data["WorkTillMonth"] < data["WorkFromMonth"]) {
                    error["WorkTillMonth"] = "End Month Must be Greater than Start Month"
                    isValid = false
                }
            }
            if (!data["WorkTillYear"]) {
                error["WorkTillYear"] = "Please Enter Project End Year"
                isValid = false
            }
        }
        if (data['addMoreDetails'] == true) {
            if (!data["ProjectSite"]) {
                error["ProjectSite"] = "Please Select Project Site"
                isValid = false
            }
            if (!data["SkillsUsed"]) {
                error["SkillsUsed"] = "Please Enter Skills"
                isValid = false
            }
            if (!data["TeamSize"]) {
                error["TeamSize"] = "Please Enter Team Size"
                isValid = false
            }
            if (!data["ProjectLocation"]) {
                error["ProjectLocation"] = "Please Enter Project Location"
                isValid = false
            }
        }
        this.setState({
            error: error
        })
        return isValid
    }

    AddUpdateProject = (model) => {
        let status = this.validateForm(model)
        if (status) {
            if (model.type == "ADD") {
                addProjectCandidate(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateProjectsLists()
                        this.props.getCandidateProjectsLists()
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
                updateProjectCandidate(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateProjectsLists()
                        this.props.getCandidateProjectsLists()
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
        deleteProjectCandidate({ PROJECT_ID: data.PROJECT_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getCandidateProjectsLists()
                this.props.getCandidateDetail()
            }
        })
    }

    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true, projectDetails: data, type: type })
    }

    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }

    render() {
        const { showModal, projectList,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Projects <Link href='' className='pofileupdatetext' onClick={(e) => { this.onShowModal(null, e, 'ADD') }}>ADD PROJECT</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details'>
                            {showLoader?<ProjectLoader/>:
                                projectList && projectList.length > 0 ? projectList.map((data, index) => {
                                    return (
                                        <div className='grid03'>
                                            <div className='font-weight-600 font-17 pb-1'>{data.PROJECT_TITLE} <i onClick={(e) => { this.onShowModal(data, e, 'UPDATE') }} class="ti-pencil" title='Edit'></i> <i style={{ cursor: 'pointer' }} title='Delete' class="ti-trash font-weight-500 font-15" onClick={(e) => { this.removeSkills(data, e) }}></i></div>
                                            {/* <div className='font-weight-500 font-17 pb-1' style={{display:'flex', flexWrap:'wrap'}}><h4>{data.PROJECT_TITLE} </h4><i onClick={(e) => { this.onShowModal(data,e, 'UPDATE') }} class="ti-pencil"></i> <i class="ti-trash font-weight-500 font-15" onClick={(e)=>{this.removeSkills(data,e)}}></i></div> */}
                                            {/* <h6>{data.CURRENT_COMPANY} ({data.PROJECT_SITE == "ON" ? 'On-Site' : 'Off-Site'})</h6> */}
                                            <h6>{data.CURRENT_COMPANY} {data.PROJECT_SITE === '' ? '' : `(${data.PROJECT_SITE === "ON" ? "On-Site" : "Off-Site"})`}</h6>
                                            <p className='mb-1'>{data.WORKED_FROM_MONTH_NAME} {data.WORKED_FROM_YEAR} to {data.WORKED_TILL_MONTH_NAME} {data.WORKED_TILL_YEAR} {data.PROJECT_STATUS === "I" ? "(Present)" : ""} </p>
                                            <p>{nl2br(data.PROJECT_DETAILS)}</p>
                                        </div>
                                    )
                                })
                                    : <div>
                                        <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                        <h6 className='text-center text-danger'>No project Added</h6>
                                        <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(null, e, 'ADD') }} > Please Add Projects  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                    </div>}

                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title={this.state.type === 'ADD' ? "Add Project" : "Update Project"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditProjectsModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateProject}
                        onCancel={this.onhideModal}
                        projectDetails={this.state.projectDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}