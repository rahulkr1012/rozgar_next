import React, { Component } from 'react'
import { getCandidateDetail, GetCareerProfile, GetCertifications, getCoverLetterDetail, getITSkills, getOnlineProfileList, GetPersonalDetail, getProfilePic, getProfileSummary, GetResume, getResumeHeadLine, GetWorkSample, keySkillsList, listEducationCandidate, ListEmployment, listProjectCandidate, uploadResume } from '@/action/CandidateAction'
import Pic from '../../public/assets/images/secondary.jpg'
// import Modal from 'react-modal';
import moment from 'moment'
import VerifyEmailMobile from '../EditProfileModal/VerifyEmailMobile'
import swal from 'sweetalert'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import ResumePicbro from '@/assets/images/resumepicpro.jpg'
import Adds05 from '@/assets/images/adds-05.jpg'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import constant from 'constant'
import ResumeFile from './ResumeFile';
import ResumeHeadLine from './ResumeHeadLine';
import KeySkills from './KeySkills';
import Employment from './Employment';
import Education from './Education';
import ITSkills from './ITSkills';
import Projects from './Projects';
import ProfileSummary from './ProfileSummary';
import Accomplishments from './Accomplishments';
import OnlineProfile from './OnlineProfile'
import CareerProfile from './CareerProfile';
import PersonalDetails from './PersonalDetails';
import Image from 'next/image';
import ProfilePicture from './ProfilePicture';
import { Modal } from 'reactstrap';
import CoverLetterList from './CoverLetter'
import ProfileSummariser from 'components/ProfileSummary'
// import { ResumeContext } from '../../MyProvider'


export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: 'Resume',
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : '',
            isResumeHeadLine: false,
            isProfileSummary: false,
            candidateDetail: {},
            isListEmployement: false,
            isItSkills: false,
            isEducation: false,
            isProjects: false,
            isWorkSample: false,
            isOnlineProfile: false,
            isCertificate: false,
            isResumeAvailable: false,
            getFile: undefined,
            openModal: false,
            isCareerProfile: false,
            isPersonalDetail: false,
            isCoverLetterDetail: false,
            resumeDetail: undefined,
            isProfileSummariser:undefined , 
            file: {}
        }
    }
    // static contextType = ResumeContext;

     
     showSection = (section) => {
           this.setState({ section: section })
      }

       

    componentDidMount() { 
        
        this.getResumeHeadLine()
        this.getProfileSummary()
        this.getCandidateKeySkillsList()
        this.getEmploymentDetails()
        this.getCandidateITSkillsList()
        this.getCandidateEducationList()
        this.getCandidateProjectsLists()
        this.getCertificateLists()
        this.getOnlineProfileLists()
        this.getWorkSampleLists()
        this.getPersonalDetail()
        this.getResume()
        this.state.detail && this.getCandidateDetail()
        this.state.detail && this.onGetFileChange()
        this.getCareerProfile()    
        
         this.state.detail && this.getCoverLetterDetail()
    
     }
     

     componentDidUpdate(prevProsp ,prevState  , snapshot ) {
           if(prevState.isCoverLetterDetail.length!=this.state.isCoverLetterDetail.length )
            {
                 
            }
           
     }

    getCoverLetterDetail() {
         
        getCoverLetterDetail({ CD_ID: this.state.detail.CANDIDATE_ID }).then((res) => {
            if (res.status && res.result && res.result.COVER_DETAIL ) {
                this.setState({
                ...this.state , 
                    isCoverLetterDetail:res.result.COVER_DETAIL
                })
            } else {
                this.setState({
                    isCoverLetterDetail: false
                })
            }
        });

         
    }


    getResume = () => {
        GetResume().then((res) => {
            if (res.status && res.result && res.result.RESUME_FILE) {
                this.setState({
                    isResumeAvailable: true,
                    resumeDetail: (res.result)
                })
            } else {
                this.setState({
                    isResumeAvailable: false
                })
            }
        });
    }


    getPersonalDetail = () => {
        GetPersonalDetail().then((res) => {
            if (res.status && res.result) {
                this.setState({
                    isPersonalDetail: true
                })
            } else {
                this.setState({
                    isPersonalDetail: false
                })
            }
        });
    }



    getCertificateLists = () => {
        GetCertifications().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isCertificate: true
                })
            } else {
                this.setState({
                    isCertificate: false
                })
            }
        });
    }




    getOnlineProfileLists = () => {
        getOnlineProfileList().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isOnlineProfile: true
                })
            } else {
                this.setState({
                    isOnlineProfile: false
                })
            }
        });
    }

    getWorkSampleLists = () => {
        GetWorkSample().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isWorkSample: true
                })
            } else {
                this.setState({
                    isWorkSample: false
                })
            }
        });
    }


    getResumeHeadLine = () => {
        getResumeHeadLine().then((res) => {
            if (res.status && res.result && res.result.RESUME_HEADLINE) {
                this.setState({
                    isResumeHeadLine: true
                })
            } else {
                this.setState({
                    isResumeHeadLine: false
                })
            }
        });
    }

    getProfileSummary = () => {
        getProfileSummary().then((res) => {
            if (res.status && res.result && res.result.PROFILE_SUMMARY) {
                this.setState({
                    isProfileSummary: true
                })
            } else {
                this.setState({
                    isProfileSummary: false
                })
            }
        });
    }

    getCandidateDetail = () => {
        getCandidateDetail().then((res) => {
            if (res.status) {
                this.setState({
                    candidateDetail: res.result
                })
            }
        });
    }

    getCandidateKeySkillsList = () => {
        keySkillsList().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isKeySkillsDetail: true
                })
            } else {
                this.setState({
                    isKeySkillsDetail: false
                })
            }
        });
    }

    getEmploymentDetails = () => {
        ListEmployment().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isListEmployement: true
                })
            } else {
                this.setState({
                    isListEmployement: false
                })
            }
        });
    }

    getCandidateITSkillsList = () => {
        getITSkills().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isItSkills: true
                })
            } else {
                this.setState({
                    isItSkills: false
                })
            }
        });
    }

    getCandidateEducationList = () => {
        listEducationCandidate().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isEducation: true
                })
            } else {
                this.setState({
                    isEducation: false
                })
            }
        });
    }

    getCandidateProjectsLists = () => {
        listProjectCandidate().then((res) => {
            if (res.status && res.result && res.result.length > 0) {
                this.setState({
                    isProjects: true
                })
            } else {
                this.setState({
                    isProjects: false
                })
            }
        });
    }

    getCareerProfile = () => {
        GetCareerProfile().then((res) => {

            if (res.status && res.result) {
                this.setState({
                    isCareerProfile: res.result
                })
            } else {
                this.setState({
                    isCareerProfile: false
                })
            }

        });
    }

    onGetFileChange = () => {
        getProfilePic().then((res) => {
            this.setState({ getFile: res.result })
        })
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
        this.onGetFileChange()
    }

    onOpenModal = () => {
        this.setState({ openModal: true })
    }

    validateForm = (model) => {
        let data = model
        let error = {}
        let isValid = true
        if (data["file"] && data["file"].name) { }
        else {
            swal({
                icon: "error",
                text: "Please select file",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
            });
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
    }

    onChangeFile = (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        if (file) {
            this.setState({ file });
        }
        this.uploadResume(file)
    }

    uploadResume = (file) => {

        const { CANDIDATE_ID } = this.state.detail
        // const {file}=this.state
        const formData = new FormData();
        formData.append('CANDIDATE_ID', CANDIDATE_ID);
        formData.append('RESUME_FILE', file);
        let model = {
            file: file
        }
        let status = this.validateForm(model)
        if (status) {
            uploadResume(formData).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.getResume()
                    // this.props.history.push(constant.component.editProfile.url)
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

    render() {
        const { section, candidateDetail, getFile, resumeDetail } = this.state
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ''
        const profilePreviewURL = candidateDetail.CANDIDATE_NAME ? candidateDetail.CANDIDATE_NAME.toLowerCase().replace(" ", "-").split(" ").join("-") : ""


        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <VerifyEmailMobile getCandidateDetail={this.getCandidateDetail} />
                        <div className="rozgar-editprofileimgarea">
                            <div className="container">
                                <div className="row">
                                    <div className='col-3 col-md-2'>
                                        <div className='profilepic' style={{ cursor: "pointer" }}
                                        >
                                            {getFile != undefined && getFile.PROFILE_IMAGE ?
                                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${CANDIDATE_ID}/${getFile.PROFILE_IMAGE}`} width={100} height={70} /> :
                                                <Image src={Pic} width={70} height={50} />
                                            }
                                             
                                            {/* <Image src={'./assets/images/author/profile_icon.jpg'} alt="image description" /> */}
                                            <div className='proimgedit' onClick={this.onOpenModal}>
                                                <i class="fa fa-camera"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-9 col-md-7'>
                                        <div className='proqaucontent'>
                                            <h3 className=''>{candidateDetail.CANDIDATE_NAME}</h3>
                                            <h5>{candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_COMPANY : 'Not Available'}</h5>
                                            <div className='profiledetails'>
                                                <div className='row'>
                                                    <div className='col-md-8'>
                                                        <ul>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-map-marker"></i></span>
                                                                <span>INDIA</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-phone"></i></span>
                                                                <span>{candidateDetail.PHONENO == null || undefined ? "Not Available" :

                                                                    // formatPhoneNumberIntl('+'+candidateDetail.PHONENO).replace(/\s+/g, '-')
                                                                    candidateDetail.PHONENO
                                                                }    </span>

                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-briefcase"></i></span>
                                                                <span>{candidateDetail.TOTAL_EXP_YEAR == null || undefined ? " " : candidateDetail.TOTAL_EXP_YEAR + ' ' + 'Years'} {candidateDetail.TOTAL_EXP_MONTH == null || undefined ? "Not Available" : candidateDetail.TOTAL_EXP_MONTH + ' ' + 'Months'}</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-envelope"></i></span>
                                                                <span>{candidateDetail.EMAIL_ID}</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-layers"></i></span>
                                                                <span>{candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_ANNUAL_SALARY_LACS / 100000 + ' ' + 'Lacs' : ""} {candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_ANNUAL_SALARY_THOUSANDS / 1000 + ' ' + 'Thousands' : "Not Available"}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='btnverifid'>
                                                            <ul>
                                                                <li><i
                                                                    className={candidateDetail.IS_PHONE_VERIFIED == "Y" ? 'epiconverified ti-check' : 'epiconnotverified ti-check'}
                                                                ></i></li>
                                                                <li><span className={candidateDetail.IS_EMAIL_VERIFIED == "Y" ? 'btnepverifyjob' : 'btnepnotverifyjob'}>{candidateDetail.IS_EMAIL_VERIFIED == "Y" ? 'Verified' : 'Verify'}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            {candidateDetail.ProfileWeigh > 60 ? <p className='pt-2 pb-0'>Profile Strength ({candidateDetail.ProfileWeigh}% Completed)</p> : <p className='pt-2 pb-0'>Profile Strength <span style={{ fontWeight: "500" }}>  (Critical Fields Missing)  </span> <div style={{ display: "contents" }}>{candidateDetail.ProfileWeigh}% </div>  </p>}

                                            <div class="progress profile">
                                                
                                                 {
                                                     
                                                 /* <div class="progress-done" data-done="60" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                                                  {candidateDetail.Profilewighage}  60%
                                                </div> */   }

                                                <progress max="100" value={candidateDetail.ProfileWeigh} style={{ width: '100%' }} ><span>{candidateDetail.ProfileWeigh}</span></progress>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3 posrel'>
                                        <div className='profileupdate'>

                                            {/* <a href="javascript:void(0)">Update Profile</a> */}

                                            <div className='awardbtnbox'>
                                                <i class="fa fa-trophy" aria-hidden = "true"></i>
                                                <span className='nubtext'>
                                                    <small>{candidateDetail.reward_points}</small> Rewards
                                                </span>
                                                <span className='use-reward'>Use Reward Points</span>
                                            </div>
                                        </div>
                                        <div className='profilepreview'>
                                            {profilePreviewURL.length > 0 &&
                                                <Link href={constant.component.profilePreview.url.replace(':URL', profilePreviewURL)}>Profile Preview</Link>
                                                // : <Link href={constant.component.profilePreviews.url}>Profile Preview</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rozgar-profile-main-content pt-4'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className='profileside'>
                                            <aside>

                                                <div className='resumearea'>
                                                    <Image src={ResumePicbro} width={50} height={30} />
                                                    <div className='resumeuploadbox'>
                                                        <h4>Resume</h4>
                                                        <p> Last Updated {resumeDetail ? moment(this.state.resumeDetail.RESUME_UPDATE_TIME).format('MMM Do YY') : ''}</p>
                                                        
                                                        {/* <a */}
                                                        {/* //  target='_blank'
                                                            href="javascript:void(0)" className='btnupload'> */}
                                                        {/* <input type="file" name="file" id="upload"  
                                                        accept=".doc,.docx,.pdf"
                                                         hidden
                                                         onChange={(e)=>this.onChangeFile(e)} 
                                                         /> */}
                                                        {/* <label htmlFor="upload" style={{ color: 'white', fontSize: '0.8em' }}   >Upload</label> */}
                                                        {/* </a> */}
                                                         
                                                    </div>
                                                </div>
                                                <nav >
                                                    <ul>
                                                        <a onClick={() => { this.showSection('Resume') }}><li className={section === 'Resume' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-file-add"></i> Resume </div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isResumeAvailable ? 'UPDATE' : 'ADD'}</div></li></a>

                                                       {/*  <a onClick={() => { this.showSection('profile-summariser') }}><li className={section === 'profile-summariser' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-file-add"></i> Profile summary   </div><div style={{ color: '#008AB2', fontSize: '12px' }} >{ this.state.isProfileSummariser ? 'UPDATE' : 'ADD'}</div></li></a> */}

                                                        <a onClick={() => { this.showSection('cover-letter') }}><li className={section === 'cover-letter' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-file-add"></i> Cover letter  </div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isCoverLetterDetail ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('Resume_Headline') }}><li className={section === 'Resume_Headline' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-license"></i> Resume Headline</div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isResumeHeadLine ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('KeySkills') }}><li className={section === 'KeySkills' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-star"></i> Key Skills</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isKeySkillsDetail ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('Employment') }}><li className={section === 'Employment' && 'active'}> <div style={{ width: '80%' }}><i class="lnr lnr-briefcase"></i> Employment</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isListEmployement ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('Education') }}><li className={section === 'Education' && 'active'}><div style={{ width: '80%' }}> <i style={{ fontSize: "19px" }} class="lnr lnr-graduation-hat"></i> Education</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isEducation ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('ItSkills') }}><li className={section === 'ItSkills' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-star"></i> IT Skills </div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isItSkills ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('Projects') }}><li className={section === 'Projects' && 'active'}><div style={{ width: '80%' }}><em class="lnr lnr-apartment"></em> Projects</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isProjects ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('ProfileSummary') }}><li className={section === 'ProfileSummary' && 'active'}><div style={{ width: '80%' }}><i class="fa fa-bars" aria-hidden="true"></i> Profile Summary</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isProfileSummary ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('OnlineProfile') }}><li className={section === 'OnlineProfile' && 'active'}><div style={{ width: '80%' }}><i class="fa fa-address-card-o" aria-hidden="true"></i> Online Profile</div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isOnlineProfile ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('Accomplishments') }}><li className={section === 'Accomplishments' && 'active'}><div style={{ width: '80%' }}><i class="lnr lnr-layers"></i> Accomplishments</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isCertificate || this.state.isWorkSample ? 'UPDATE' : 'ADD'}</div></li></a>
                                                        <a onClick={() => { this.showSection('CareerProfile') }}><li className={section === 'CareerProfile' && 'active'}><div style={{ width: '80%' }}><i className='lnr lnr-highlight'></i> Career Profile </div><div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isCareerProfile.INDUSTRY == null ? 'ADD' : 'UPDATE'}</div></li></a>
                                                        <a onClick={() => { this.showSection('PersonalDetails') }}><li className={section === 'PersonalDetails' && 'active'}><div style={{ width: '80%' }}><i className='lnr lnr-user'></i> Personal Details</div> <div style={{ color: '#008AB2', fontSize: '12px' }} >{this.state.isPersonalDetail ? 'UPDATE' : 'ADD'}</div></li></a>
                                                    </ul>
                                                </nav>
                                            </aside>
                                        </div>
                                        <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <a href="javascript:void(0);" title="">
                                                <figure>
                                                    <Image src={Adds05} alt="Image description"  />
                                                </figure>
                                            </a>
                                            <span>Ad</span>
                                        </div>
                                    </div>

                                    <div className='col-md-9'>
                                         {section === 'Resume' && <ResumeFile resumeDetails={this.state.resumeDetail} getResume={this.getResume} getCandidateDetail={this.getCandidateDetail} />}       
                                         {section === 'profile-summariser' && <ProfileSummariser coverDetails={this.state.isProfileSummariser} getResume={this.getResume} getCandidateDetail={this.getCandidateDetail}   />}
                                         {section === 'cover-letter' && <CoverLetterList coverDetails={this.state.isCoverLetterDetail} updateCvl={(cvl_list)=> { this.setState({...this.state , isCoverLetterDetail:cvl_list  }) } } getResume={this.getResume} getCandidateDetail={this.getCandidateDetail} />}
                                         {section === 'Resume_Headline' && <ResumeHeadLine getResumeHeadLine={this.getResumeHeadLine}  getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'KeySkills' && <KeySkills getCandidateKeySkillsList={this.getCandidateKeySkillsList} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'Employment' && <Employment getEmploymentDetails={this.getEmploymentDetails} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'Education' && <Education getCandidateEducationList={this.getCandidateEducationList} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'ItSkills' && <ITSkills getCandidateITSkillsList={this.getCandidateITSkillsList} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'Projects' && <Projects getCandidateProjectsLists={this.getCandidateProjectsLists} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'ProfileSummary' && <ProfileSummary getProfileSummary={this.getProfileSummary} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'OnlineProfile' && <OnlineProfile getOnlineProfileLists={this.getOnlineProfileLists} />}
                                        {section === 'Accomplishments' && <Accomplishments getCertificateLists={this.getCertificateLists} getOnlineProfileLists={this.getOnlineProfileLists} getWorkSampleLists={this.getWorkSampleLists} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'CareerProfile' && <CareerProfile getCareerProfile={this.getCareerProfile} getCandidateDetail={this.getCandidateDetail} />}
                                        {section === 'PersonalDetails' && <PersonalDetails getPersonalDetail={this.getPersonalDetail} getCandidateDetail={this.getCandidateDetail} />}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Modal
                                isOpen={this.state.openModal}
                                style={{ content: { top: "20%", left: '20%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                                onRequestClose={this.onCloseModal}
                            >
                                <ProfilePicture closeModal={this.onCloseModal} />
                            </Modal>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
