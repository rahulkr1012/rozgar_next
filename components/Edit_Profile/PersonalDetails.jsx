import React, { Component } from 'react'
import swal from 'sweetalert';
import { AddPersonalDetail, GetPersonalDetail, UpdatePersonalDetails } from '@/action/CandidateAction';
import constant from 'constant';
import noSearchFound from '../../src/assets/images/no-results.png'
import EditPersonalDetailsModal from 'components/EditProfileModal/EditPersonalDetailsModal';
import ModalWindow from 'components/common/common/ModalWindow';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Head from 'next/head';
import PersonalDetailsLoader from 'components/common/EditProfileLoader/PersonalDetailsLoader'



export default class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            personalDetails: {},
            personalData: [],
            type: "ADD",
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            showLoader:false
        }
    }

    componentDidMount() {
        this.getPersonalDetail()
    }

    getPersonalDetail = () => {
        this.setState({showLoader:true})
        GetPersonalDetail().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
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
        if (!data["MobileNo"]) {
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
        // if (!data["WorkPermitForUSA"]) {
        //     error["WorkPermitForUSA"] = "Please Select Work Permit for USA"
        //     isValid = false
        // }
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
        if (!data["Languages"]) {
            error["Languages"] = "Please Select Languages"
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
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
                    this.onhideModal()
                    this.getPersonalDetail()
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


    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true, personalDetails: data, type: type })
    }


    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }





    render() {
        const { showModal, personalData,showLoader } = this.state
        const { Language, WorkPermitForOtherCountries } = personalData ? personalData : [];
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Personal Details <Link href='' className='pofileupdatetext' onClick={(e) => { this.onShowModal(personalData, e, 'ADD') }}>{personalData && personalData.FIRST_NAME ? 'EDIT PERSONAL DETAILS' : 'ADD PERSONAL DETAILS'}</Link></div>
                    <div className='edprofilerightsideinner bb-01'>
                        {showLoader?<PersonalDetailsLoader/>:
                        <div className='pro-job-details pro-job-details-mob mb-3'>
                            {personalData.FIRST_NAME != null || personalData.SECOND_NAME != null ?
                                <div className='grid03'>
                                    <div style={{ overflowX: 'auto' }} className='text-left'>
                                        <table>

                                            <tr>
                                                <td>
                                                    <h5 >First Name</h5>
                                                    {personalData.FIRST_NAME ?
                                                        <p className='mt-1'>{personalData.FIRST_NAME}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }                                                </td>
                                                <td>
                                                    <h5 >Last Name</h5>
                                                    {personalData.FIRST_NAME ?
                                                        <p className='mt-1'>{personalData.SECOND_NAME}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 >Date of Birth</h5>
                                                    {personalData.DOB ?
                                                        <p className='mt-1'>{personalData.DOB}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }                                                </td>
                                                <td>
                                                    <h5 >Permanent Address</h5>
                                                    {personalData.PERMANENT_ADDRESS ?
                                                        <p className='mt-1'>{personalData.PERMANENT_ADDRESS}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 >Gender</h5>
                                                    {personalData.GENDER ?
                                                        <p className='mt-1'>{personalData.GENDER}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                                </td>
                                                <td>
                                                    <h5 >Area Pin Code</h5>
                                                    {personalData.PINCODE ?
                                                        <p className='mt-1'>{personalData.PINCODE}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 >Marital Status</h5>
                                                    {personalData.MARITAL_STATUS ?
                                                        <p className='mt-1'>{personalData.MARITAL_STATUS}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                                </td>
                                                <td>
                                                    <h5 >Hometown</h5>
                                                    {personalData.HOME_TOWN ?
                                                        <p className='mt-1'>{personalData.HOME_TOWN}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 >Category</h5>
                                                    {personalData.CAST_CATEGORY ?
                                                        <p className='mt-1'>{personalData.CAST_CATEGORY}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                                </td>
                                                <td>
                                                    <h5 >Work permit for USA</h5>
                                                    {personalData.WORK_PERMIT_USA ?
                                                        <p className='mt-1'>{personalData.WORK_PERMIT_USA}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <h5 >Work permit of other countries</h5>
                                                    {
                                                        WorkPermitForOtherCountries && WorkPermitForOtherCountries.length > 0 ? WorkPermitForOtherCountries.map((data, index) => {
                                                            return <span className='key-skills-box mt-1'>{data.COUNTRY}
                                                                    </span>
                                                            
                                                        }) 
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                            </td>
                                                <td>
                                                    <h5 >Differently Abled</h5>
                                                    {personalData.DIFFERENTLY_ABLED ?
                                                        <p className='mt-1'>{personalData.DIFFERENTLY_ABLED == 'Y' ? 'YES' : 'NO'}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5 >Current Location</h5>
                                                    {personalData.CURRENT_LOCATION ?
                                                        <p className='mt-1'>{personalData.CURRENT_LOCATION}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>
                                                    }                                                </td>
                                                <td>
                                                    <h5 >Mobile Number</h5>
                                                    {personalData.PHONENO ?
                                                        <p className='mt-1'>{personalData.PHONENO}</p>
                                                        :
                                                        <p className='mt-1'> - - - </p>

                                                    }                                                </td>
                                            </tr>
                                            <tr><td>
                                                <h5>Email</h5>
                                                {personalData.EMAIL_ID ?
                                                    <p className='mt-1'>{personalData.EMAIL_ID}</p>
                                                    :
                                                    <p className='mt-1'> - - - </p>

                                                }                                            </td>

                                            </tr>
                                        </table>
                                    </div>

                                    <div style={{ overflowX: 'auto' }} className='text-left'>
                                        <table className='table-language'>
                                            <tr>
                                                <th>Languages</th>
                                                <th>Proficiency</th>
                                                <th>Read</th>
                                                <th>Write</th>
                                                <th>Speak</th>
                                            </tr>
                                            {
                                                Language && Language.length > 0 ? Language.map((d, i) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{d.LANGUAGE==""?<h5 style={{marginLeft:"6px"}}className=''>You have not added any languages. <Link href={''} style={{color:"chocolate"}} onClick={(e) => { this.onShowModal(personalData, e, 'ADD') }}>Click here </Link> to add languages.</h5>:d.LANGUAGE}</td>
                                                                <td>{d.PROFICIENCY}</td>
                                                                <td>{d.READ_SKILL == "Y" ? <i class="ti-check"></i> : <i class="fa fa-times"></i>}</td>
                                                                <td>{d.WRITE_SKILL == "Y" ? <i class="ti-check"></i> : <i class="fa fa-times"></i>}</td>
                                                                <td>{d.SPEAK_SKILL == "Y" ? <i class="ti-check"></i> : <i class="fa fa-times"></i>}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                                : 
                                                
                                                
                                                <h5 style={{marginLeft:"6px"}}className=''>You have not added any languages. <Link href={''} style={{color:"chocolate"}} onClick={(e) => { this.onShowModal(personalData, e, 'ADD') }}>Click here </Link> to add languages.</h5>
                                            }
                                        </table>
                                    </div>

                                </div> : <div >
                                    <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                    <h6 className='text-center text-danger'>No Personal Details  Added </h6>
                                    <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(personalData, e, 'ADD') }}> Please Add Personal Details <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                </div>}
                        </div>}
                    </div>
                </div>
                {showModal && <ModalWindow
                className='upd-per-detail'
                    title={personalData && personalData.DIFFERENTLY_ABLED ? "Update Personal Details" : "Add Personal Details"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditPersonalDetailsModal
                        error={this.state.error}
                        onSubmit={this.AddUpdatePersonelDetail}
                        onCancel={this.onhideModal}
                        personalDetails={this.state.personalDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}


