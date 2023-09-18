import React, { Component } from 'react'
import { GetCareerProfile, updateCareerProfile } from '@/action/CandidateAction';
import constant from 'constant';
import swal from 'sweetalert';
import noSearchFound from '../../src/assets/images/no-results.png'
import EditCareerProfileModal from 'components/EditProfileModal/careerProfileModal';
import Link from 'next/link';
import ModalWindow from 'components/common/common/ModalWindow';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import CareerProfileLoader from 'components/common/EditProfileLoader/CareerProfileLoader'
export default class CareerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            careerProfileList: {},
            careerProfileDetails: {},
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            error: {},
            showLoader:false
        }
    }

    componentDidMount() {
        this.getCareerProfile()
    }

    getCareerProfile = () => {
        this.setState({showLoader:true})
        GetCareerProfile().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    careerProfileList: res.result
                })
            }
        });
    }

    validateCareerProfile = (model) => {
        let data = model
        let error = {}
        let isValid = true
        if (!data["CurrentIndustry"]) {
            error["CurrentIndustry"] = "Please Select Current Industry"
            isValid = false
        }
        // if (!data["DesiredEmployementTypes"]) {
        //     error["DesiredEmployementTypes"] = "Please Select Desired Employment Type"
        //     isValid = false
        // }
        // if (!data["DesiredJobTypes"]) {
        //     error["DesiredJobTypes"] = "Please Select Desired Job Type"
        //     isValid = false
        // }
        if (!data["ExpectedSalaryCurrency"]) {
            error["ExpectedSalaryCurrency"] = "Please Select Expected Salary Currency"
            isValid = false
        }
        if (!data["ExpectedSalaryLacs"].toString()) {
            error["ExpectedSalaryLacs"] = "Please Select Expected Salary in Lakhs"
            isValid = false
        }
        if (!data["ExpectedSalaryThousands"].toString()) {
            error["ExpectedSalaryThousands"] = "Please Select expected Salary in Thousands"
            isValid = false
        }
        if (!data["PreferredShift"]) {
            error["PreferredShift"] = "Please Select Preferred shift"
            isValid = false
        }
        // if (!data["PreferredWorkLocations"]) {
        //     error["PreferredWorkLocations"] = "Please Select Preferred Location"
        //     isValid = false
        // }
        if (!data["Role"]) {
            error["Role"] = "Please Select Role"
            isValid = false
        }
        if (!data["RoleCategory"]) {
            error["RoleCategory"] = "Please Select Role Category"
            isValid = false
        }
        if (!data["TotalExperienceYear"]) {
            error["TotalExperienceYear"] = "Please Select TotalExperienceYear"
            isValid = false
        }
        if (!data["TotalExperienceMonth"]) {
            error["TotalExperienceMonth"] = "Please Select TotalExperienceMonth"
            isValid = false
        }
        this.setState({
            error: error
        })
        return isValid
    }

    AddUpdateCareerProfile = (model) => {
        let status = this.validateCareerProfile(model)
        if (status) {
            updateCareerProfile(model).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.onhideModal()
                    this.getCareerProfile()
                    this.props.getCareerProfile()
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


    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true, careerProfileDetails: data, type: type })
    }


    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }
    render() {
        const { showModal, careerProfileList,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Career Profile <Link href={''} className='pofileupdatetext' onClick={(e) => { this.onShowModal(careerProfileList, e, 'ADD') }}>{careerProfileList && careerProfileList.INDUSTRY ? 'EDIT CAREER PROFILE' : 'ADD CAREER PROFILE'}</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details mb-3'>
                            <div className='grid03'>
                                <div style={{ overflowX: 'auto' }} className='text-left'>
                                    <table>
                                        {
                                            showLoader?<CareerProfileLoader/>:
                                            careerProfileList.INDUSTRY != null || careerProfileList.ROLE_CATEGORY_NAME != null ?
                                                <>
                                                    <tr>
                                                        <td>
                                                            <h5>Current Industry</h5>
                                                            {careerProfileList.INDUSTRY ?
                                                                <p className='mt-1'>{careerProfileList.INDUSTRY}</p>
                                                                :
                                                                <p className='mt-1'> - - - </p>

                                                            }                                                        </td>
                                                        <td>
                                                            <h5 >Role Category</h5>
                                                            {careerProfileList.ROLE_CATEGORY_NAME ?
                                                                <p className='mt-1'>{careerProfileList.ROLE_CATEGORY_NAME}</p>
                                                                :
                                                                <p className='mt-1'> - - - </p>

                                                            }                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td>
                                                            <h5 >Job Role</h5>
                                                            {careerProfileList.ROLE_NAME ?
                                                                <p className='mt-1'>{careerProfileList.ROLE_NAME}</p>
                                                                :
                                                                <p className='mt-1'> - - - </p>

                                                            }                                                        </td>
                                                        <td>
                                                            <h5 >Desired Job Type</h5>
                                                            <p className='mt-1'>{careerProfileList.DesiredJobTypes && careerProfileList.DesiredJobTypes.length > 0 ? careerProfileList.DesiredJobTypes.map((d, i) => {
                                                                return (
                                                                    <span className='key-skills-box'>{d?.JOB_TYPE && d?.JOB_TYPE.length > 0 ? d?.JOB_TYPE : ""}
                                                                    </span>
                                                                )

                                                            })
                                                                : <p className='mt-1'> - - - </p>
                                                            }
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 >Desired Employment Type</h5>
                                                            <p className='mt-1'>{  careerProfileList.DesiredEmployementTypes.length>0? careerProfileList.DesiredEmployementTypes.map((d, i) => {
                                                                return <span className='key-skills-box'>{d.EMPLOYMENT_TYPE && d.EMPLOYMENT_TYPE.length > 0 ? d.EMPLOYMENT_TYPE : ""}
                                                                </span>
                                                            })
                                                                :
                                                                <p className='mt-1'> - - - </p>
                                                            }</p>
                                                        </td>
                                                        <td>
                                                            <h5 >Preferred Shift</h5>
                                                            <p className='mt-1'>{careerProfileList.PREFERRED_SHIFT == 'D' ? 'DAY' : careerProfileList.PREFERRED_SHIFT == 'N' ? 'NIGHT' : careerProfileList.PREFERRED_SHIFT == 'F' ? 'FLEXIBLE' : ''}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 >Preferred Work Location</h5>
                                                            <p>{careerProfileList.PreferredWorkLocations.length > 0 ? careerProfileList.PreferredWorkLocations.map((d, i) => {
                                                                return <span className='key-skills-box'>{d.WORK_LOCATION}
                                                                </span>
                                                            })
                                                                : <p className='mt-1'> - - - </p>
                                                            }</p>
                                                        </td>
                                                        <td>
                                                            <h5 >Expected Salary</h5>
                                                            {careerProfileList.EXPECTED_SALARY_LACS ?
                                                                <p>{careerProfileList.EXPECTED_SALARY_LACS ? `Rs ${careerProfileList.EXPECTED_SALARY_LACS} Lacs ${careerProfileList.EXPECTED_SALARY_THOUSANDS} Thousands` : `Rs ${(careerProfileList.EXPECTED_SALARY_THOUSANDS)} Thousands`} </p>
                                                                :
                                                                <p className='mt-1'> - - - </p>
                                                            }                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h5 >Total Experience Years</h5>
                                                            {careerProfileList.TOTAL_EXP_YEAR ?
                                                                <p>{careerProfileList.TOTAL_EXP_YEAR ? `${careerProfileList.TOTAL_EXP_YEAR} Year` : `0 Year`}</p>
                                                                :
                                                                <p className='mt-1'> - - - </p>
                                                            }                                                        </td>
                                                        <td>
                                                            <h5 >Total Experience Months</h5>
                                                            {careerProfileList.TOTAL_EXP_MONTH ?
                                                                <p>{careerProfileList.TOTAL_EXP_MONTH ? `${careerProfileList.TOTAL_EXP_MONTH} Month` : `0 Month`}</p>
                                                                :
                                                                <p className='mt-1'> - - - </p>
                                                            }                                                        </td>
                                                    </tr>
                                                </>
                                                : <div >
                                                    <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                                    <h6 className='text-center text-danger'>No Career Profile  Added </h6>
                                                    <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(careerProfileList, e, 'ADD') }}> Please Add Career Profile <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                                </div>}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                className="upd-title-mod"
                    title={careerProfileList && careerProfileList.PREFERRED_SHIFT ? "Update Career Profile" : "Add Career Profile"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditCareerProfileModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateCareerProfile}
                        onCancel={this.onhideModal}
                        careerProfileDetails={this.state.careerProfileDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}

