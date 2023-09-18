import React, { Component } from 'react'
import constant from 'constant';
import swal from 'sweetalert';
import noSearchFound from '../../src/assets/images/no-results.png'
import { addITSkills, deleteITSkills, getITSkills, updateITSkills } from '@/action/CandidateAction';
import EditItSkillsModal from 'components/EditProfileModal/ITSkillsModal';
import ModalWindow from 'components/common/common/ModalWindow';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import ITSkillsLoader from 'components/common/EditProfileLoader/ITSkillLoader'



export default class ITSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            itSkillsList: [],
            error: {},
            itSkillsDetails: {},
            type: "",
            showLoader:false
        }
    }

    componentDidMount() {
        this.getCandidateITSkillsList()
    }

    getCandidateITSkillsList = () => {
        this.setState({showLoader:true})
        getITSkills().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    itSkillsList: res.result
                })
            }
        });
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true

        if (data["ITSkills"].length == 0) {
            error["ITSkills"] = "Please Enter IT Skills"
            isValid = false
        }
        // if (!data["Version"]) {
        //     error["Version"] = "Please Enter Version"
        //     isValid = false
        // }
        // if (!data["LastUsed"]) {
        //     error["LastUsed"] = "Please Select last Used Year"
        //     isValid = false
        // }
        // if (!data["ExperienceYear"]) {
        //     error["ExperienceYear"] = "Please Select Experience in Year"
        //     isValid = false
        // }
        // if (!data["ExperienceMonth"]) {
        //     error["ExperienceMonth"] = "Please Select Experience in Month"
        //     isValid = false
        // }
        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateITSkills = (model) => {
        let status = this.validateForm(model)
        if (status) {
            if (model.type == "ADD") {
                addITSkills(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateITSkillsList()
                        this.props.getCandidateITSkillsList()
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
            } else {
                updateITSkills(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCandidateITSkillsList()
                        this.props.getCandidateITSkillsList()
                        this.props.getCandidateDetail()

                        //   this.props.getProfileSummary()
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

    }

    removeSkills = (data, e) => {
        const { CANDIDATE_ID } = this.state.detail
        deleteITSkills({ CANDIDATE_ID: CANDIDATE_ID, IT_SKILLS_ID: data.IT_SKILLS_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getCandidateITSkillsList()
                this.props.getCandidateDetail()
                this.props.getCandidateITSkillsList()
            }
        })
    }

    onShowModal = (data, e, type) => {

        const st = this.state
        this.setState({ showModal: true, itSkillsDetails: data, type: type })
    }


    onhideModal = () => {
        this.setState({ showModal: false,error:{} })
    }
    render() {
        const { showModal, itSkillsList ,showLoader} = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>IT Skills <Link href='' className='pofileupdatetext' onClick={(e) => { this.onShowModal(null, e, 'ADD') }}>ADD DETAILS</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details mb-3'>
                            <div className='grid03'>
                                <div style={{ overflowX: 'auto' }} className='text-left'>
                                    {
                                    showLoader?<ITSkillsLoader/>:
                                    itSkillsList.length > 0 ?
                                        <table>
                                            <tr>
                                                <th>Skills</th>
                                                <th>Version</th>
                                                <th>Last Used</th>
                                                <th>Experience In Year</th>
                                                <th>Experience In Month</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>

                                            </tr>
                                            {
                                                itSkillsList && itSkillsList.length > 0 ? itSkillsList.map((data, index) => {
                                                    return <tr>
                                                        <td>{data.IT_SKILLS}</td>
                                                        <td>{data.SOFTWARE_VERSION}</td>
                                                        <td>{data.LAST_USED}</td>
                                                        <td>{data.EXP_YEAR}</td>
                                                        <td>{data.EXP_MONTH}</td>

                                                        <td><i onClick={(e) => { this.onShowModal(data, e, 'UPDATE') }} title='Edit' className="ti-pencil"></i></td>
                                                        <td><i className="ti-trash font-weight-500 font-15" title='Delete' style={{cursor:'pointer'}} onClick={(e) => { this.removeSkills(data, e) }}></i></td>
                                                    </tr>
                                                }) :
                                                    ""
                                            }



                                        </table> : <div>
                                            <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                            <h6 className='text-center text-danger'>No IT Skill Added</h6>
                                            <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(null, e, 'ADD') }} > Please Add IT Skill  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                        </div>}
                                    {/* <div>
                                        <img src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                        <h6 className='text-center text-danger'>No Skill Added</h6>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title={this.state.type == "ADD" ? "Add IT Skills" : "Update IT Skills"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditItSkillsModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateITSkills}
                        onCancel={this.onhideModal}
                        itSkills={this.state.itSkillsDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}