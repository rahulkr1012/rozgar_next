import React, { Component } from 'react'
import { AddCertifications, AddOnlineProfile, AddWorkSample, DeleteCertifications, DeleteOnlineProfile, deleteProjectCandidate, DeleteWorkSample, GetCertifications, getOnlineProfileList, GetWorkSample, UpdateCertifications, UpdateOnlineProfile, UpdateWorkSample } from '@/action/CandidateAction';
import swal from 'sweetalert';
import nl2br from 'react-nl2br'
import constant from 'constant';
import noSearchFound from '../../src/assets/images/no-results.png'
import EditAccomplishmentsModal from 'components/EditProfileModal/AccomplishmentModal';
import EditAccomplishmentsWorkSampleModal from 'components/EditProfileModal/AccomplishmentWorkSampleModal';
import EditAccomplishmentsCertificateModal from 'components/EditProfileModal/AccomplishmentsCertificateModal';
import Link from 'next/link';
import ModalWindow from 'components/common/common/ModalWindow';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import OnlineProfileLoader from 'components/common/EditProfileLoader/OnlineProfileLoader'
export default class Accomplishments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            onlineProfileLists: [],
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            error: {},
            onlineProfileDetails: {},
            type: "",
            showWorkSampleModel: false,
            workSampleList: [],
            workSample: {},
            certificateDetails: {},
            certificateLists: [],
            showCertificateModel: false,
            showLoader:false
        }
    }

    componentDidMount() {
        this.getOnlineProfileLists()
        this.getWorkSampleLists()
        this.getCertificateLists()
    }

    getCertificateLists = () => {
        this.setState({showLoader:true})
        GetCertifications().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    certificateLists: res.result
                })
            }
        });
    }

    getOnlineProfileLists = () => {
        getOnlineProfileList().then((res) => {
            if (res.status) {
                this.setState({
                    onlineProfileLists: res.result
                })
            }
        });
    }

    getWorkSampleLists = () => {
        this.setState({showLoader:true})
        GetWorkSample().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                this.setState({
                    workSampleList: res.result
                })
            }
        });
    }

    validateOnlineProfileForm = (model) => {
        let data = model
        let error = {}
        let isValid = true
        if (!data["SocialProfileName"]) {
            error["SocialProfileName"] = "Please Enter Social Profile Name"
            isValid = false
        }
        if (!data["URL"]) {
            error["URL"] = "Please Enter URL"
            isValid = false
        }
        if (data["URL"]) {
            let url = data["URL"]
            let urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            let result = urlRegex.test(url);
            if (result == false) {
                error["URL"] = "Please provide Valid URL"
                isValid = false
            }
        }
        this.setState({
            error: error
        })

        return isValid
    }

    validateWorkSampleForm = (model) => {
        let data = model
        let error = {}
        let isValid = true


        if (!data["WorkTitle"]) {
            error["WorkTitle"] = "Please Enter Work Title"
            isValid = false
        }
        if (!data["URL"]) {
            error["URL"] = "Please Enter url"
            isValid = false
        }
        if (data["URL"]) {
            let url = data["URL"]
            let urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            let result = urlRegex.test(url);
            if (result == false) {
                error["URL"] = "Please provide Valid URL"
                isValid = false
            }
        }



        if (!data["DurationFromYear"]) {
            error["DurationFromYear"] = "Please Select Work Sample Start Year"
            isValid = false
        }
        if (!data["DurationFromMonth"]) {
            error["DurationFromMonth"] = "Please Select Work Sample Start Month"
            isValid = false
        }
        if (!data["IsCurrentlyWorkingOnThisWork"]) {
            error["IsCurrentlyWorkingOnThisWork"] = "Please Enter Work Sample Current Status"
            isValid = false
        }
        if(data["IsCurrentlyWorkingOnThisWork"] == 'N'){
          if (!data["DurationToMonth"]) {
            error["DurationToMonth"] = "Please Enter Work Sample End Month"
            isValid = false
        }
        if (!data["DurationToYear"]) {
            error["DurationToYear"] = "Please Enter Work Sample End Year"
            isValid = false
        }
            if (data["DurationToYear"] < data["DurationFromYear"]) {
                error["DurationToYear"] = "Value Must be Greater than or Equal to Start Year"
                isValid = false
            }
            
            if(data["DurationToYear"] == data["DurationFromYear"]){
                if(data["DurationToMonth"] <  data["DurationFromMonth"]){
                    error["DurationToMonth"] = "End Month Must be Greater than Start Month"
                    isValid = false
                }
            }
    
        }
    
      
        this.setState({
            error: error
        })

        return isValid
    }

    validateCertificateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true

        if (!data["CertifictionName"]) {
            error["CertifictionName"] = "Please Enter Certificate Name"
            isValid = false
        }
        // if(!data["CertifictionID"]){
        //     error["CertifictionID"]="Please enter certificate ID"
        //     isValid=false
        // }
        // if (!data["IsNotExpired"]) {
        //     error["IsNotExpired"] = "Please Select Certificate Status"
        //     isValid = false
        // }
         

        if (!data["ValidFromMonth"]) {
            error["ValidFromMonth"] = "Please Select Certificate Start Month"
            isValid = false
        }
        if (!data["ValidFromYear"]) {
            error["ValidFromYear"] = "Please Enter Certificate Start Year"
            isValid = false
        }
        // if (!data["CertificationURL"]) {
        //     error["CertificationURL"] = "Please Provide URL"
        //     isValid = false
        // }
        // if (data["CertificationURL"]) {
        
        //     let url = data["CertificationURL"]
        //     let urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        //     let result = urlRegex.test(url);
        //     if (result == false) {
        //         error["CertificationURL"] = "Please provide Valid URL"
        //         isValid = false
        //     }
        // }
       
       if(data["IsNotExpired"] == 'N'){

        if(data["ValidToYear"] < data["ValidFromYear"]){
            error["ValidToYear"]="End year must be greater than or equal to start year "
            isValid=false
        }
        if(!data["ValidToMonth"]){
            error["ValidToMonth"]="Please select certificate end month"
            isValid=false
        }
        if(!data["ValidToYear"]){
            error["ValidToYear"]="Please select certificate end Year"
            isValid=false
        }
        if(data["ValidToYear"] == data["ValidFromYear"]){
            if(data["ValidToMonth"] <  data["ValidFromMonth"]){
                error["ValidToMonth"] = "End month must be greater than start Month"
                isValid = false
            }
        }

    }


        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateOnlineProfile = (model) => {
        let status = this.validateOnlineProfileForm(model)
        if (status) {
            if (model.type == "ADD") {
                AddOnlineProfile(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getOnlineProfileLists()
                        this.props.getOnlineProfileLists()
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
                UpdateOnlineProfile(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getOnlineProfileLists()
                        this.props.getOnlineProfileLists()
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

    AddUpdateWorkSample = (model) => {
        let status = this.validateWorkSampleForm(model)
        if (status) {
            if (model.type == "ADD") {
                AddWorkSample(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getWorkSampleLists()
                        this.props.getWorkSampleLists()
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
                UpdateWorkSample(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getWorkSampleLists()
                        this.props.getWorkSampleLists()
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

    AddUpdateCertificates = (model) => {
        let status = this.validateCertificateForm(model)
        if (status) {
            if (model.type == "ADD") {
                AddCertifications(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCertificateLists()
                        this.props.getCertificateLists()
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
                UpdateCertifications(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.onhideModal()
                        this.getCertificateLists()
                        this.props.getCertificateLists()
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

    removeOnlineProfile = (data, e) => {
        const { CANDIDATE_ID } = this.state.detail
        DeleteOnlineProfile({ CANDIDATE_ID: CANDIDATE_ID, SOCIAL_PROFILE_ID: data.SOCIAL_PROFILE_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getOnlineProfileLists()
                this.props.getCandidateDetail()
                this.props.getOnlineProfileLists()
            }
        })
    }

    removeWorkSample = (data, e) => {
        const { CANDIDATE_ID } = this.state.detail
        DeleteWorkSample({ CANDIDATE_ID: CANDIDATE_ID, WORK_SAMPLE_ID: data.WORK_SAMPLE_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getWorkSampleLists()
                this.props.getCandidateDetail()
                this.props.getWorkSampleLists()

            }
        })
    }

    removeCertificate = (data, e) => {
        const { CANDIDATE_ID } = this.state.detail
        DeleteCertifications({ CANDIDATE_ID: CANDIDATE_ID, CERTIFICATION_ID: data.CERTIFICATION_ID }).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                this.getCertificateLists()
                this.props.getCandidateDetail()
                this.props.getCertificateLists()

            }
        })
    }
    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true, onlineProfileDetails: data, type: type })
    }


    onhideModal = () => {
        this.setState({ showModal: false, showWorkSampleModel: false, showCertificateModel: false ,error:{} })
    }

    onShowWorkSampleModal = (data, e, type) => {
        const st = this.state
        this.setState({ showWorkSampleModel: true, workSample: data, type: type })
    }

    onShowCertificateModal = (data, e, type) => {
        const st = this.state
        this.setState({ showCertificateModel: true, certificateDetails: data, type: type })
    }
    render() {
        const { showModal, showWorkSampleModel, showCertificateModel, onlineProfileLists, workSampleList, certificateLists ,showLoader} = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Accomplishments</div>
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details mb-3'>
                            <div className='grid03'>
                                <div style={{ overflowX: 'auto' }} className='text-left'>
                                    <table>
                                        {/* <tr>
                                            <td>
                                                <h4>Google The Digital Garage UK Certified</h4>
                                                <p>Google Inc</p>
                                                <p>Valid from Jan '20</p>
                                            </td>
                                            <td><Link className='pofileupdatetext' onClick={() => { this.onShowModal() }}>ADD</Link></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Business Strategy & Marketing Management IIT Delhi (BSMM)</h4>
                                                <p>Indian Institute of Technologies Delhi</p>
                                                <p>Valid from Jan '20</p>
                                            </td>
                                            <td><Link className='pofileupdatetext' onClick={() => { this.onShowModal() }}>ADD</Link></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Certified Scrum Product Owner® (CSPO®)</h4>
                                                <p>Scrum Alliance</p>
                                                <p>Valid from Jan '19</p>
                                            </td>
                                            <td><Link className='pofileupdatetext'>ADD</Link></td>
                                        </tr> */}
                                        <tr>
                                            <td>
                                                <h4>Certifications</h4>
                                                {
                                                    certificateLists && certificateLists.length == 0 &&
                                                    <p>Add certifications to show your skills.</p>
                                                }                                              {
                                                   showLoader?< OnlineProfileLoader/>:
                                                    certificateLists && certificateLists.length > 0 ? certificateLists.map((data, index) => {
                                                        return <div className='col-12 mt-2'>
                                                            <p style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                <b>
                                                                    {data.CERTIFICATION_TITLE}
                                                                </b>
                                                                <i onClick={(e) => { this.onShowCertificateModal(data, e, 'UPDATE') }} title='Edit' class="ti-pencil"></i> <i style={{cursor:'pointer'}} title='Delete' class="ti-trash font-weight-500 font-15" onClick={(e) => { this.removeCertificate(data, e) }}></i>
                                                            </p>
                                                            <p>{nl2br(data.DESCRIPTION)}</p>
                                                            {/* condition to handle StartDate and EndDate */}
                                                            <p>{data.VALID_FROM_MONTH_NAME} {data.VALID_FROM_YEAR} { data.VALID_FROM_MONTH_NAME && data.VALID_TO_MONTH_NAME ? "-": data.VALID_FROM_YEAR && data.VALID_TO_YEAR?"-":'' } {data.VALID_TO_MONTH_NAME} {data.VALID_TO_YEAR}</p>
                                                            <p><a href={data.CERTIFICATION_URL} target="_blank" style={{ color: '#009BC8', textDecoration: 'none', cursor: "pointer" }}>{data.CERTIFICATION_URL}</a></p>

                                                        </div>
                                                    })
                                                        : <div >
                                                            <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                                            <h6 className='text-center text-danger'>No Certifications Added </h6>
                                                            <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowCertificateModal(null, e, 'ADD') }}> Please Add Certifications  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                                        </div>}
                                            </td>
                                            <td><Link href={''} className='pofileupdatetext' onClick={(e) => { this.onShowCertificateModal(null, e, 'ADD') }}>ADD</Link></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>Work Sample</h4>
                                                {
                                                    workSampleList && workSampleList.length == 0 &&
                                                    <p>Add work sample to get noticed faster.</p>
                                                }
                                                {
                                                    showLoader?< OnlineProfileLoader/>:
                                                    workSampleList && workSampleList.length > 0 ? workSampleList.map((data, index) => {
                                                        return <div className='col-12 mt-2'>
                                                            <p style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                <b>
                                                                    {data.WORK_SAMPLE_TITLE}
                                                                </b>
                                                                <i onClick={(e) => { this.onShowWorkSampleModal(data, e, 'UPDATE') }} class="ti-pencil" title='Edit'></i> <i title='Delete' style={{cursor:'pointer'}} class="ti-trash font-weight-500 font-15" onClick={(e) => { this.removeWorkSample(data, e) }}></i>
                                                            </p>
                                                            <p>{nl2br(data.WORK_DETAILS)}</p>
                                                            <p>
                                                                {data.DURATION_FROM_MONTH_NAME} {data.DURATION_FROM_YEAR} - {data.DURATION_TO_MONTH_NAME} {data.DURATION_TO_YEAR}
                                                            </p>
                                                            <p><a href={data.URL} target="_blank" style={{ color: '#009BC8', textDecoration: 'none', cursor: "pointer" }}>{data.URL}</a></p>

                                                        </div>
                                                    })
                                                        : <div >
                                                            <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                                            <h6 className='text-center text-danger'>No Work Sample  Added </h6>
                                                            <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowWorkSampleModal(null, e, 'ADD') }}> Please Add Work Sample <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                                        </div>}
                                            </td>
                                            <td><Link href={''} className='pofileupdatetext' onClick={(e) => { this.onShowWorkSampleModal(null, e, 'ADD') }}>ADD</Link></td>
                                        </tr>
                                        {/* <tr>
                                            <td>
                                                <h4>Online Profile</h4>
                                                {
                                                    onlineProfileLists && onlineProfileLists.length == 0 &&
                                                    <p>Add link to Online profiles (e.g. Linkedin, Facebook etc.).</p>
                                                }
                                                {
                                                    onlineProfileLists && onlineProfileLists.length > 0 ? onlineProfileLists.map((data, index) => {
                                                        return <div className='col-12 mt-2'>
                                                            <p style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                <b>
                                                                    {data.SOCIAL_PROFILE}
                                                                </b>
                                                                <i onClick={(e) => { this.onShowModal(data, e, 'UPDATE') }} class="ti-pencil" title='Edit'></i> <i title='Delete' style={{cursor:'pointer'}} class="ti-trash font-weight-500 font-15" onClick={(e) => { this.removeOnlineProfile(data, e) }}></i>
                                                            </p>
                                                            <p><a href={data.URL} target="_blank" style={{ color: '#009BC8', textDecoration: 'none', cursor: "pointer" }}>{data.URL}</a></p>
                                                            <p>{nl2br(data.PROFILE_DESCRITION)}</p>
                                                        </div>
                                                    })
                                                        : <div >
                                                            <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                                            <h6 className='text-center text-danger'>No Online Profile  Added </h6>
                                                            <p style={{ textAlign: "center" }}> <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={(e) => { this.onShowModal(null, e, 'ADD') }}> Please Add Online Profile <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link></p>
                                                        </div>}
                                            </td>
                                            <td><Link href={''} className='pofileupdatetext' onClick={(e) => { this.onShowModal(null, e, 'ADD') }}>ADD</Link></td>
                                        </tr> */}
                                        {/* <tr>
                                            <td>
                                                <h4>Presentation</h4>
                                                <p>Add links to your Online presentations (e.g. Slideshare presentation links etc.).</p>
                                            </td>
                                            <td><Link className='pofileupdatetext' >ADD</Link></td>
                                        </tr> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ModalWindow
                    title={this.state.type == "ADD" ? "Add Online Profiles" : "Update Online Profile"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditAccomplishmentsModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateOnlineProfile}
                        onCancel={this.onhideModal}
                        onlineProfileDetails={this.state.onlineProfileDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}

                {showWorkSampleModel && <ModalWindow
                    title={this.state.type == "ADD" ? "Add Work Sample" : "Update Work Sample"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditAccomplishmentsWorkSampleModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateWorkSample}
                        onCancel={this.onhideModal}
                        workSample={this.state.workSample}
                        type={this.state.type}
                    />
                </ModalWindow>}

                {showCertificateModel && <ModalWindow
                className = "upd-title-mod"
                    title={this.state.type == "ADD" ? "Add Certificate" : "Update Certificate"}
                    backdrop="static"
                    toggleModal={this.onhideModal}>
                    <EditAccomplishmentsCertificateModal
                        error={this.state.error}
                        onSubmit={this.AddUpdateCertificates}
                        onCancel={this.onhideModal}
                        certificateDetails={this.state.certificateDetails}
                        type={this.state.type}
                    />
                </ModalWindow>}
            </React.Fragment>
        )
    }
}

