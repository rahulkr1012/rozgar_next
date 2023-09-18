import React, { Component } from 'react'
import NumericFormat from 'react-number-format';
import {
    getCourseSpeczListForJobs, getEduQualificationTypeListsForJobs, getGrading,
    getQualificationTypeListsForJobs, getEducationCourseType, getMasterSkillsList, getITMasterSkills, getSkillResume, checkCandidateEmail, checkCandidateMobile
} from '@/action/CandidateAction';

import pic01is from 'src/assets/img/test-img/1.jpg'
import { Typeahead } from 'react-bootstrap-typeahead';
import Loader from 'components/Loader'
// import Loader from '../../common/Loader';

export default class index extends Component {
     
    constructor( props ) {
        super(props)
        const candidateDetail = this.props.details
        this.state = {
            PROFILE_PICTURE: '',
            FIRST_NAME: candidateDetail ? candidateDetail.FIRST_NAME : '',
            LAST_NAME: candidateDetail ? candidateDetail.SECOND_NAME : '',
            JOB_TITLE: candidateDetail ? candidateDetail.RESUME_HEADLINE : '',
            ADDRESS: candidateDetail ? candidateDetail.PERMANENT_ADDRESS : '',
            EMAIL: candidateDetail ? candidateDetail.EMAIL_ID : '',
            PHONE: candidateDetail ? candidateDetail.PHONENO : '',
            BIO: candidateDetail ? candidateDetail.PROFILE_SUMMARY : '',
            EDUCATION: candidateDetail && candidateDetail.Education.length !== 0 ? candidateDetail.Education.map((item, index) => {
                return {
                    DEGREE: item.QUALIFICATION_ID,
                    FIELD_OF_STUDY: item.EDUCATION_QUALIFICATION_ID,
                    COURSE_SPECIALIZATION: item.SPECIALIZATION_ID,
                    SCHOOL: item.UNIVERSITY_INSTITUTE,
                    EDUCATION_FROM_YEAR: item.START_YEAR,
                    EDUCATION_TO_YEAR: item.PASSING_OUT_YEAR,
                    MARKS: item.MARKS,
                    GRADE_SYSTEM: item.GRADING_SYSTEM_ID,
                    COURSE_TYPE: item.COURSE_TYPE_ID,
                }
            }) : [
                { FIELD_OF_STUDY: "", DEGREE: "", COURSE_SPECIALIZATION: '', SCHOOL: "", EDUCATION_FROM_YEAR: '', MARKS: '0', GRADE_SYSTEM: '1', COURSE_TYPE: '1', },
            ],
            EXPERIENCE: candidateDetail && candidateDetail.Experience.length !== 0 ? candidateDetail.Experience.map((item, index) => {
                return {
                    EXPERIENCE_TITLE: item.CURRENT_DESIGNATION,
                    EXPERIENCE_COMPANY: item.CURRENT_COMPANY,
                    CURRENT_COMPANY: item.IS_THIS_YOUR_CURRENT_COMPANY,
                    EXPERIENCE_DESCRIPTION: item.JOB_PROFILE,
                    EXPERIENCE_FROM_YEAR: item.JOINING_DATE_YEAR,
                    EXPERIENCE_FROM_MONTH: item.JOINING_DATE_MONTH,
                    EXPERIENCE_TO_YEAR: item.WORKING_TILL_DATE_YEAR,
                    EXPERIENCE_TO_MONTH: item.WORKING_TILL_DATE_MONTH,
                }
            }) : [
                { EXPERIENCE_TITLE: '', EXPERIENCE_COMPANY: '', EXPERIENCE_DESCRIPTION: '', CURRENT_COMPANY: '', EXPERIENCE_FROM_YEAR: '', EXPERIENCE_TO_YEAR: '', EXPERIENCE_TO_MONTH: '' },
            ],
            PROJECT: candidateDetail && candidateDetail.Projects.length !== 0 ? candidateDetail.Projects.map((item) => {
                return {
                    PROJECT_NAME: item.PROJECT_TITLE,
                    PROJECT_DESCRIPTION: item.PROJECT_DETAILS,
                    PROJECT_STATUS: item.PROJECT_STATUS
                }
            }) :
                [{ PROJECT_NAME: '', PROJECT_DESCRIPTION: '', PROJECT_STATUS: 'I' }],

            SKILL: candidateDetail && candidateDetail.Skills.length !== 0 ? candidateDetail.Skills.map((item) => {
                return {
                    SKILL_NAME: item.SKILL,
                    SKILL_ID: item.SKILL_ID,
                    SKILL_LEVEL: item.SKILL_PROFICIENT
                }
            }) : [{ SKILL_LEVEL: '', SKILL_ID: '', SKILL_NAME: '' }],
            LANGUAGE: candidateDetail && candidateDetail.Language.length !== 0 ? candidateDetail.Language.map((item) => {
                return {
                    LANGUAGE_NAME: item.LANGUAGE,
                    LANGUAGE_LEVEL: item.PROFICIENCY,
                    READ: item.READ_SKILL,
                    WRITE: item.WRITE_SKILL,
                    SPEAK: item.SPEAK_SKILL
                }
            }) : [
                { LANGUAGE_NAME: '', LANGUAGE_LEVEL: '', READ: 'N', WRITE: 'N', SPEAK: 'N' },
            ],
            SOCIAL: candidateDetail && candidateDetail.OnlineProfile.length !== 0 ? candidateDetail.OnlineProfile.map((item) => {
                return {
                    SOCIAL_NAME: item.SOCIAL_PROFILE,
                    SOCIAL_LINK: item.URL
                }
            }) : [
                { SOCIAL_NAME: '', SOCIAL_LINK: '' },
            ],
            INTRESTS: candidateDetail && candidateDetail.Interest.length !== 0 ? candidateDetail.Interest.map((item) => {
                return {
                    INTRESTS_NAME: item.INTEREST
                }
            }) : [{ INTRESTS_NAME: '' }],
            resumeSubmit: false,
            error: {},
            educationList: [],
            courseList: [],
            specializationList: [],
            gradingList: [],
            courseTypeList: [],
            skillList: [],
            awards: [],
            emailAvailable: false,
            mobileNumberAvailable: false,
        }
    }


    componentDidMount() {
        this.getEducationList()
        this.getGradingSystemList()
        this.getCourseTypeList()
        this.getSkillLists()
    }


    //---------------------VALIDATION CODE STARTS-------------------------------//
    validateForm = () => {

        let data = this.state
        let error = {}
        let isValid = true
        if (!data['PROFILE_PICTURE']) {
            error.PROFILE_PICTURE = "please upload your profile picture"
            isValid = false
        }
        if (!data['FIRST_NAME']) {
            error.FIRST_NAME = "Please enter your first name"
            isValid = false
        }
        if (!data['LAST_NAME']) {
            error.LAST_NAME = "Please enter your last name"
            isValid = false
        }
        if (!data['JOB_TITLE']) {
            error.JOB_TITLE = "Please enter your job title"
            isValid = false
        }
        if (!data['ADDRESS']) {
            error.ADDRESS = "Please enter your address"
            isValid = false
        }
        if (!data['EMAIL']) {
            error.EMAIL = "Please enter your email"
            isValid = false
        }
        if (!data['PHONE']) {
            error.PHONE = "Please enter your phone number"
            isValid = false
        }
        if (!data['BIO']) {
            error.BIO = "Please enter bio for your resume"
            isValid = false
        }
        this.setState({ error: error })
        return isValid
    }
    //---------------------VALIDATION CODE ENDS-------------------------------//

    //---------------------API CALLING STARTS-------------------------------//
    getEducationList = () => {
        getQualificationTypeListsForJobs().then((res) => {
            if (res.status) {
                this.setState({ educationList: res.result })
            }
        }).catch((err) => {
            alert(err);
        });
    };


     
    getCourse = (index, e) => {
        let EDUCATION = this.state.EDUCATION
        EDUCATION[index][e.target.name] = e.target.value;
        this.setState({ EDUCATION })
        const QUALIFICATION_ID = e.target.value
        getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: QUALIFICATION_ID }).then((res) => {
            if (res.status) {
                this.setState({ courseList: res.result })
            }
        }).catch((err) => {
            alert(err);
        });
    }

    getSpecializeCourse = (index, e) => {
        let EDUCATION = this.state.EDUCATION
        EDUCATION[index][e.target.name] = e.target.value
        this.setState({ EDUCATION })
        const EDUCATION_QUALIFICATION_ID = e.target.value
        getCourseSpeczListForJobs({ EDUCATION_QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID }).then((res) => {

            if (res.status) {
                this.setState({ specializationList: res.result })
            }
        }).catch((err) => {
            alert(err);
        })

    }

    getGradingSystemList = () => {
        getGrading()
            .then((res) => {
                if (res.status) {
                    let d = res.result.map((data, index) => {
                        return {
                            GRADING_SYSTEM_ID: data.GRADING_SYSTEM_ID,
                            GRADING_SYSTEM_TYPE: data.GRADING_SYSTEM_TYPE,
                            label: data.GRADING_SYSTEM_TYPE,
                        };
                    });
                    this.setState({
                        gradingList: d
                    })
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    getCourseTypeList = () => {


        getEducationCourseType()
            .then((res) => {
                if (res.status) {
                    let d = res.result.map((data, index) => {
                        return {
                            COURSE_TYPE_ID: data.COURSE_TYPE_ID,
                            COURSE_TYPE: data.COURSE_TYPE,
                            label: data.COURSE_TYPE,
                        };
                    })
                    this.setState({
                        courseTypeList: d
                    })
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    getSkillList = (KEYWORD) => {

        if (KEYWORD && KEYWORD.length > 1) {
            getMasterSkillsList({ KEYWORD: KEYWORD }).then((res) => {

                if (res.status) {
                    let d = res.result && res.result.map((data, index) => {
                        return {
                            SKILL_ID: data.SKILL_ID,
                            SKILL: data.SKILL,
                            label: data.SKILL
                        }
                    })
                    this.setState({
                        skillList: d || [],
                        searchKey: true
                    })
                }
            });
        } else {
            this.setState({
                skillList: [],
                searchKey: false
            })
        }
    }

    getSkillLists = () => {
        getSkillResume().then((res) => {
            if (res.status) {
                this.setState({ skillList: res.result })
            }
        }).catch((err) => {
            alert(err)
        })
    }

    //---------------------API CALLING ENDS-------------------------------//

    onSubmit = (e) => {
        e.preventDefault()
        let status = this.validateForm()
        if (status) {
            const { PROFILE_PICTURE, FIRST_NAME, LAST_NAME, JOB_TITLE, ADDRESS, EMAIL, PHONE, BIO, EDUCATION, SOCIAL, EXPERIENCE, PROJECT, LANGUAGE, INTRESTS, SKILL }
                = this.state
            const formData = new FormData()

            const modal = {
                firstName: FIRST_NAME,
                secondName: LAST_NAME,
                JobTitle: JOB_TITLE,
                PermanentAddress: ADDRESS,
                EmailId: EMAIL,
                MobileNo: PHONE,
                Bio: BIO,
                Education: EDUCATION,
                SocialProfile: SOCIAL,
                Experience: EXPERIENCE,
                PROJECT: PROJECT,
                Languages: LANGUAGE,
                Interest: INTRESTS,
                Skills: SKILL,
            }

            formData.append('PROFILE_IMAGE', PROFILE_PICTURE)
            formData.append('data', JSON.stringify(modal))
            this.props.onSubmit(formData)
        }
        window.scroll(0, 0)
    }

    handleEducationChange = (index, e) => {
        let EDUCATION = this.state.EDUCATION
        EDUCATION[index][e.target.name] = e.target.value
        this.setState({ EDUCATION })
    }

    addMoreEducations = () => {
        this.setState({ EDUCATION: [...this.state.EDUCATION, { FIELD_OF_STUDY: "", DEGREE: "", COURSE_SPECIALIZATION: '', SCHOOL: "", EDUCATION_FROM_YEAR: '', EDUCATION_TO_YEAR: '', MARKS: '0', GRADE_SYSTEM: '1', COURSE_TYPE: '1' }] })
    }

    removeEducation(index) {
        let EDUCATION = this.state.EDUCATION;
        EDUCATION.splice(index, 1);
        this.setState({ EDUCATION });
    }

    handleExprienceChange = (index, e) => {
        let EXPERIENCE = this.state.EXPERIENCE
        EXPERIENCE[index][e.target.name] = e.target.value
        this.setState({ EXPERIENCE })
    }

    addMoreExprience = () => {
        this.setState({ EXPERIENCE: [...this.state.EXPERIENCE, { EXPERIENCE_TITLE: '', EXPERIENCE_COMPANY: '', EXPERIENCE_DESCRIPTION: '', CURRENT_COMPANY: '', EXPERIENCE_FROM_YEAR: '', EXPERIENCE_FROM_MONTH: '', EXPERIENCE_TO_YEAR: '', EXPERIENCE_TO_MONTH: '' }] })
    }

    removeExprience(index) {
        let EXPERIENCE = this.state.EXPERIENCE;
        EXPERIENCE.splice(index, 1);
        this.setState({ EXPERIENCE });
    }

    handleProjectChange = (index, e) => {
        let PROJECT = this.state.PROJECT
        PROJECT[index][e.target.name] = e.target.value
        this.setState({ PROJECT })
    }

    addMoreProjects = () => {
        this.setState({ PROJECT: [...this.state.PROJECT, { PROJECT_NAME: '', PROJECT_DESCRIPTION: '', PROJECT_STATUS: 'I' }] })
    }

    removeProjects(index) {
        let PROJECT = this.state.PROJECT;
        PROJECT.splice(index, 1);
        this.setState({ PROJECT });
    }

    handleSkillChange = (index, e) => {
        let SKILL = this.state.SKILL
        SKILL[index][e.target.name] = e.target.value
        this.setState({ SKILL })
    }

    handleSkillChange2 = (index, e) => {
        let name = 'SKILL_ID'
        let SKILL = this.state.SKILL
        SKILL[index][name] = e[0]?.SKILL_ID
        this.setState({ SKILL })
    }

    addMoreSkills = () => {
        this.setState({ SKILL: [...this.state.SKILL, { SKILL_LEVEL: '', SKILL_ID: '' }] })
    }

    removeSkills(index) {
        let SKILL = this.state.SKILL;
        SKILL.splice(index, 1);
        this.setState({ SKILL });
    }

    handleLanguageChange = (index, e) => {
        let LANGUAGE = this.state.LANGUAGE
        LANGUAGE[index][e.target.name] = e.target.value
        this.setState({ LANGUAGE })
    }

    addMoreLangauages = () => {
        this.setState({ LANGUAGE: [...this.state.LANGUAGE, { LANGUAGE_NAME: '', LANGUAGE_LEVEL: '', READ: 'N', WRITE: 'N', SPEAK: 'N' }] })
    }

    removeLanguages(index) {
        let LANGUAGE = this.state.LANGUAGE;
        LANGUAGE.splice(index, 1);
        this.setState({ LANGUAGE });
    }

    handleSocialLinksChange = (index, e) => {
        let SOCIAL = this.state.SOCIAL
        SOCIAL[index][e.target.name] = e.target.value
        this.setState({ SOCIAL })
    }

    addMoreSocialLinks = () => {
        this.setState({ SOCIAL: [...this.state.SOCIAL, { SOCIAL_NAME: "", SOCIAL_LINK: "" }] })
    }

    removeSocialLinks(index) {
        let SOCIAL = this.state.SOCIAL;
        SOCIAL.splice(index, 1);
        this.setState({ SOCIAL });
    }

    handleIntrestsChange = (index, e) => {
        let INTRESTS = this.state.INTRESTS;
        INTRESTS[index][e.target.name] = e.target.value;
        this.setState({ INTRESTS });
    }

    addMoreIntrests = (e) => {
        this.setState({ INTRESTS: [...this.state.INTRESTS, { INTRESTS_NAME: '' }] })
    }

    removeIntrests(index) {
        let INTRESTS = this.state.INTRESTS;
        INTRESTS.splice(index, 1);
        this.setState({ INTRESTS });
    }

    validateEmail = () => {
        let EMAIL = this.state.EMAIL
        checkCandidateEmail({ EmailId: EMAIL }).then((res) => {
            if (res.status) {
                this.setState({ emailAvailable: res.result.res })
            }

        }).catch((err) => {
            console.log('err', err)
        })
    }

    validateMobileNumber = () => {
        let PHONE = this.state.PHONE
        checkCandidateMobile({ Mobile: PHONE }).then((res) => {
            if (res.status) {
                this.setState({ mobileNumberAvailable: res.result.res })
            }
        }).catch((err) => {
            console.log('err', err)
        })
    }
    render() {
         
        const { PROFILE_PICTURE, FIRST_NAME, LAST_NAME, JOB_TITLE, ADDRESS, EMAIL, PHONE, BIO, EDUCATION, EXPERIENCE, SKILL, LANGUAGE, SOCIAL, INTRESTS, PROJECT, error, educationList, courseList, gradingList, courseTypeList, specializationList, skillList, DEGREE, FIELD_OF_STUDY, candidateDetail } = this.state
        const detail = this.props.details
         
        return (
            <React.Fragment>
                
               {this.props.showLoader && <Loader />}
                
                 <form>
                    <div className="mt-20">
                        <h2>Personal Info</h2>
                        <div className="block-container">
                            <div className="row align-items-center">
                                <div className="col-lg-2 col-md-4">
                                    <img src={PROFILE_PICTURE ? URL.createObjectURL(PROFILE_PICTURE) : detail ? `${process.env.REACT_APP_BASE_URL}/candidate/pic/${detail.CANDIDATE_ID}/${detail.PROFILE_IMAGE}` : pic01is} className="d-block" alt="" style={{
                                         borderRadius: "50%",
                                        //objectFit: "contain",
                                        width: '102px',
                                        height: "102px",
                                    }} />
                                </div>
                                <div className="col-lg-5 col-md-8 mt-s">
                                    <h6 className="">Upload your picture</h6>
                                    <p className="text-muted mb-0">For best results, use image 300px by 300px in either .jpg or .png</p>
                                </div>
                                <div className="col-lg-5 col-md-12 mt-s" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                    <label htmlFor="profile-pidcture1" className="btn-upcv btn-primary-upcv" style={{ cursor: "pointer" }} >Upload</label>
                                    <input type="file" accept="image/*" id="profile-pidcture1" name="choose-file" hidden onChange={(e) => { this.setState({ PROFILE_PICTURE: e.target.files[0] }) }} />
                                    {/* <a href="javascript:void(0)" className="btn-upcv btn-soft-primary ms-2" style={PROFILE_PICTURE == '' ? { display: 'none' } : { display: 'block' }} onClick={this.handleRemovePicture}>Remove</a> */}
                                </div>
                            </div>
                            {error && !PROFILE_PICTURE && (
                                <span className='text-danger'>{error.PROFILE_PICTURE}</span>
                            )}
                            <div className="">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>First Name:</label>
                                        <input
                                            type="text"
                                            name="FIRST_NAME"
                                            value={FIRST_NAME}
                                            onChange={(e) => this.setState({ FIRST_NAME: e.target.value })}
                                            className="form-control"
                                            placeholder="First name"
                                        />
                                        {error && !FIRST_NAME && (
                                            <span className='text-danger'>{error.FIRST_NAME}</span>
                                        )}
                                    </div>

                                    <div className="col-lg-6">
                                        <label>Last Name:</label>
                                        <input
                                            type="text"
                                            name="LAST_NAME"
                                            value={LAST_NAME}
                                            onChange={(e) => this.setState({ LAST_NAME: e.target.value })}
                                            className="form-control"
                                            placeholder="Last name"
                                        />
                                        {error && !LAST_NAME && (
                                            <span className='text-danger'>{error.LAST_NAME}</span>
                                        )}
                                    </div>

                                    <div className="col-lg-6">
                                        <label>Job Title:</label>
                                        <input
                                            type="text"
                                            name="JOB_TITLE"
                                            value={JOB_TITLE}
                                            onChange={(e) => this.setState({ JOB_TITLE: e.target.value })}
                                            className="form-control"
                                            placeholder="Job title"
                                        />
                                        {error && !JOB_TITLE && (
                                            <span className='text-danger'>{error.JOB_TITLE}</span>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Your Address:</label>
                                        <input
                                            type="text"
                                            name=" ADDRESS"
                                            value={ADDRESS}
                                            onChange={(e) => this.setState({ ADDRESS: e.target.value })}
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                        {error && !ADDRESS && (
                                            <span className='text-danger'>{error.ADDRESS}</span>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <label>Email:</label>
                                        {
                                            detail ? <input
                                                type="text"
                                                name="EMAIL"
                                                value={EMAIL}
                                                onChange={(e) => {
                                                    this.setState({ EMAIL: e.target.value })
                                                    this.validateEmail()
                                                }}
                                                className="form-control"
                                                placeholder="Email"
                                                readOnly
                                            /> : <input
                                                type="text"
                                                name="EMAIL"
                                                value={EMAIL}
                                                onChange={(e) => {
                                                    this.setState({ EMAIL: e.target.value })
                                                    this.validateEmail()
                                                }}
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                        }
                                        {error && !EMAIL && (
                                            <span className='text-danger'>{error.EMAIL}</span>
                                        )}
                                        {this.state.emailAvailable == 1 && (
                                            <span className='text-danger'>This email is already registered please login</span>
                                        )}
                                    </div>

                                    <div className="col-lg-6">
                                        <label>Phone No:</label>
                                        {
                                            detail ?
                                                <NumericFormat
                                                    maxLength={10}
                                                    minLength={10}
                                                    name="PHONE"
                                                    value={PHONE}
                                                    onChange={(e) => {
                                                        this.setState({ PHONE: e.target.value })
                                                        this.validateMobileNumber()
                                                    }}
                                                    readOnly
                                                    className="form-control"
                                                    placeholder="Phone No"
                                                /> : <NumericFormat
                                                    maxLength={11}
                                                    minLength={10}
                                                    name="PHONE"
                                                    value={PHONE}
                                                    onChange={(e) => {
                                                        this.setState({ PHONE: e.target.value })
                                                        this.validateMobileNumber()
                                                    }}
                                                    className="form-control"
                                                    placeholder="Phone No"
                                                />
                                        }
                                        {error && !PHONE && (
                                            <span className='text-danger'>{error.PHONE}</span>
                                        )}
                                        {this.state.mobileNumberAvailable == 1 && (
                                            <span className='text-danger'>This mobile number is already registered please login</span>
                                        )}
                                    </div>
                                    <div className="col-lg-12">
                                        <label>Bio Here</label>
                                        <textarea
                                            name="BIO"
                                            id="comments"
                                            rows="4"
                                            value={BIO}
                                            onChange={(e) => this.setState({ BIO: e.target.value })}
                                            className="form-control"
                                            placeholder="Bio Here"
                                        ></textarea>
                                        {error && !BIO && (
                                            <span className='text-danger'>{error.BIO}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group add-edu">
                        <h2>Add Educations</h2>
                        {
                            EDUCATION.map((item, index) => (
                                <>
                                    <div className="all-edus">
                                        {
                                            EDUCATION.length > 1 &&
                                            (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeEducation(index)}></i>
                                            )
                                        }

                                        <div className="row">
                                            <div className='col-lg-12'>
                                                <label>Degree:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="DEGREE"
                                                    value={item.DEGREE}
                                                    onChange={(e) => this.getCourse(index, e)}>
                                                    <option value="" > Select education</option>
                                                    {
                                                        educationList && educationList.map((data, index) => {
                                                            return <option value={data.QUALIFICATION_ID}>{data.QUALIFICATION_NAME}</option>
                                                        })
                                                    }
                                                </select>
                                                {
                                                    error.DEGREE && !this.state.DEGREE.length && <span className="text-danger ml-1">{error.DEGREE}</span>
                                                }
                                            </div>
                                            <div className='col-lg-12'>
                                                <label>Field of study:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name='FIELD_OF_STUDY'
                                                    value={item.FIELD_OF_STUDY}
                                                    onChange={(e) => this.getSpecializeCourse(index, e)}
                                                >
                                                    <option value="" > Select field of study </option>
                                                    {
                                                        courseList && courseList.map((data, index) => {
                                                            return <option value={data.EDUCATION_QUALIFICATION_ID}>{data.COURSE_STREAM}</option>
                                                        })
                                                    }
                                                </select>
                                                {error && EDUCATION.FIELD_OF_STUDY?.trim().length === 0 && <span className='text-danger'>This field is required</span>}
                                            </div>
                                            <div className='col-lg-6'>
                                                <label>Specialization</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    className=""
                                                    id="level"
                                                    name="COURSE_SPECIALIZATION"
                                                    value={item.COURSE_SPECIALIZATION}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                >
                                                    <option value="">Select Specialization</option>
                                                    {
                                                        specializationList && specializationList.map((item, index) => {
                                                            return <option value={item.SPECIALIZATION_ID
                                                            }>{item.SPECIALIZATION}
                                                            </option>
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className='col-lg-6'>
                                                <label>School/College/University:</label>
                                                <input
                                                    type="text"
                                                    name="SCHOOL"
                                                    value={item.SCHOOL}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                    className="form-control"
                                                    placeholder="School/College/University name"
                                                />

                                            </div>
                                            <div className='col-lg-6' style={{ display: 'none' }}>
                                                <label>Course Type</label>
                                                <select
                                                    style={{ width: "100%", padding: "10px 6px" }}
                                                    id="course_type"
                                                    name="COURSE_TYPE"
                                                    value={item.COURSE_TYPE}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                >
                                                    <option value="1">Select Course Type</option>
                                                    {
                                                        courseTypeList.map((item, index) => {
                                                            return <option value={item.COURSE_TYPE_ID}>
                                                                {item.COURSE_TYPE}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            {/* <div className='col-lg-6'>
                                                                        <label>Pursuing Education?</label>
                                                                        <select
                                                                            style={{ width: "100%", paddingLeft: "6px" }}

                                                                            name="IS_PRESENT"
                                                                            value={item.IS_PRESENT}
                                                                            onChange={(e) => this.handleEducationChange(index, e)}
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option value="Y">Yes</option>
                                                                            <option value="N">No</option>
                                                                        </select>
                                                                    </div> */}
                                            <div className="col-lg-6">
                                                <label>From year:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EDUCATION_FROM_YEAR"
                                                    value={item.EDUCATION_FROM_YEAR}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                >
                                                    <option value="" >--Please Select Year--</option>
                                                    {
                                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label>Till year:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EDUCATION_TO_YEAR"
                                                    value={item.EDUCATION_TO_YEAR}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                >
                                                    <option value="" >--Please Select Year--</option>
                                                    {
                                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-lg-6' style={{ display: 'none' }}>
                                                <label>Grading System</label>
                                                <select
                                                    style={{ width: "100%", padding: "10px 6px" }}
                                                    id="level"
                                                    name="GRADE_SYSTEM"
                                                    value={item.GRADE_SYSTEM}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                >
                                                    <option value="1">Select Grading Type</option>
                                                    {
                                                        gradingList && gradingList.map((item, index) => {
                                                            return <option value={item.GRADING_SYSTEM_ID}>
                                                                {item.GRADING_SYSTEM_TYPE}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-lg-6' style={{ display: 'none' }}>
                                                <label>Grades</label>
                                                <input
                                                    type="text"
                                                    name='MARKS'
                                                    value={0}
                                                    onChange={(e) => this.handleEducationChange(index, e)}
                                                    className='form-control'
                                                    placeholder='Grades'
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    {
                                        EDUCATION.length - 1 === index &&
                                        (
                                            <div className="add-blk btn-cv btn-info-cv" id="add-edu" onClick={(e) => this.addMoreEducations(e)}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another education</span>
                                            </div>
                                        )
                                    }
                                </>
                            ))
                        }

                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group add-exp mt-s">
                        <h2>Add Experiences</h2>
                        {
                            EXPERIENCE.map((item, index) => (
                                <>
                                    <div className="all-exps">
                                        {
                                            EXPERIENCE.length > 1 &&
                                            (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeExprience(index)}></i>
                                            )
                                        }
                                        <div className="row">
                                            <div className='col-lg-12'>
                                                <label>Title:</label>
                                                <input
                                                    type="text"
                                                    name="EXPERIENCE_TITLE"
                                                    value={item.EXPERIENCE_TITLE}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Ex: Web Developer"
                                                />
                                            </div>

                                            <div className='col-lg-12'>
                                                <label>Company:</label>
                                                <input
                                                    type="text"
                                                    name="EXPERIENCE_COMPANY"
                                                    value={item.EXPERIENCE_COMPANY}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                    className="form-control"
                                                    placeholder="Ex: ProgressSoft"
                                                />
                                            </div>
                                            <div className='col-lg-12'>
                                                <label>Is This Your Current Company?</label>
                                                <select
                                                    style={{ width: "100%", paddingLeft: "6px" }}
                                                    id="level"
                                                    name="CURRENT_COMPANY"
                                                    value={item.CURRENT_COMPANY}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Y">Yes</option>
                                                    <option value="N">No</option>
                                                </select>
                                            </div>
                                            {/* <div className='col-lg-6'>
                                                                        <label>From year:</label>
                                                                        <input
                                                                            type="date"
                                                                            id="fromyear"
                                                                            name="EXPERIENCE_FROM_YEAR"
                                                                            value={item.EXPERIENCE_FROM_YEAR}
                                                                            style={{ width: "100%" }}
                                                                            onChange={(e) => this.handleExprienceChange(index, e)}
                                                                        />
                                                                    </div> */}
                                            {/* <div className='col-lg-6'>
                                                                        <label>Till year:</label>
                                                                        <input
                                                                            type="date"
                                                                            id="tillyear"
                                                                            name="EXPERIENCE_TO_YEAR"
                                                                            value={item.EXPERIENCE_TO_YEAR}
                                                                            style={{ width: "100%" }}
                                                                            onChange={(e) => this.handleExprienceChange(index, e)}
                                                                        />
                                                                    </div> */}
                                            <div className="col-lg-6">
                                                <label>From year:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EXPERIENCE_FROM_YEAR"
                                                    value={item.EXPERIENCE_FROM_YEAR}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                >
                                                    <option value="" >--Please Select Year--</option>
                                                    {
                                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-lg-6'>
                                                <label htmlFor="">Form Month:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EXPERIENCE_FROM_MONTH"
                                                    value={item.EXPERIENCE_FROM_MONTH}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                >
                                                    <option value=''>--Select Month--</option>
                                                    <option value="1">January</option>
                                                    <option value="2">February</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                <label>Work Till year:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EXPERIENCE_TO_YEAR"
                                                    value={item.EXPERIENCE_TO_YEAR}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                >
                                                    <option value="" >--Please Select Year--</option>
                                                    {
                                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className='col-lg-6'>
                                                <label htmlFor="">Work Till Month:</label>
                                                <select style={{ width: "100%", padding: "10px 6px" }}
                                                    name="EXPERIENCE_TO_MONTH"
                                                    value={item.EXPERIENCE_TO_MONTH}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                >
                                                    <option value=''>--Select Month--</option>
                                                    <option value="1">January</option>
                                                    <option value="2">February</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </select>
                                            </div>
                                            <div className='col-lg-12'>
                                                <label>Description (optional):</label>
                                                <textarea
                                                    rows={4}
                                                    name="EXPERIENCE_DESCRIPTION"
                                                    value={item.EXPERIENCE_DESCRIPTION}
                                                    onChange={(e) => this.handleExprienceChange(index, e)}
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        EXPERIENCE.length - 1 === index &&
                                        (
                                            <div className="add-blk btn-cv btn-info-cv" id="add-exp" onClick={(e) => this.addMoreExprience(e)}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another experience</span>
                                            </div>
                                        )
                                    }
                                </>
                            ))
                        }

                    </div>

                    <div className="clearfix"></div>
                    <div className="form-group add-exp mt-s">
                        <h2>Add Project</h2>
                        {
                            PROJECT.map((item, index) => (
                                <>
                                    <div className="all-exps">
                                        {
                                            PROJECT.length > 1 &&
                                            (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeProjects(index)}></i>
                                            )
                                        }
                                        <div className="row">
                                            <div className='col-lg-12'>
                                                <label>Project Title</label>
                                                <input
                                                    type="text"
                                                    name="PROJECT_NAME"
                                                    value={item.PROJECT_NAME}
                                                    onChange={(e) => this.handleProjectChange(index, e)}
                                                    className="form-control"
                                                    placeholder='Project title'
                                                />
                                            </div>
                                            <div className='col-lg-12' style={{ display: 'none' }}>
                                                <label>Project Status</label>
                                                <div style={{ display: "flex" }}>
                                                    <div  style={{ display: 'flex', alignItems: 'baseline' }}>
                                                        <input  type="radio" name="ProjectStaus" id="flexRadioDefault1" value={"I"} onChange={(e) => { this.setState({ ProjectStaus: "I", WorkTillYear: '', WorkTillMonth: '' }) }} checked />
                                                        <label class="form-check-label" for="flexRadioDefault1">In Progress</label>
                                                    </div>
                                                    <div  style={{ display: 'flex', alignItems: 'baseline', marginLeft: '40px' }}>
                                                        <input  type="radio" name="ProjectStaus" id="flexRadioDefault2" value={"C"} onChange={(e) => { this.setState({ ProjectStaus: "C", WorkTillYear: '', WorkTillMonth: '' }) }} />
                                                        <label class="form-check-label" for="flexRadioDefault2">Finished</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <label>Project Description:</label>
                                                <textarea
                                                    name="PROJECT_DESCRIPTION"
                                                    value={item.PROJECT_DESCRIPTION}
                                                    onChange={(e) => this.handleProjectChange(index, e)}
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        PROJECT.length - 1 === index &&
                                        (
                                            <div className="add-blk btn-cv btn-info-cv" id="add-exp" onClick={(e) => this.addMoreProjects(e)}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another project</span>
                                            </div>
                                        )
                                    }
                                </>
                            ))
                        }

                    </div>

                    <div className="clearfix"></div>

                    <div className="form-group add-skill mt-s">
                        <h2>Add Skills</h2>


                        {
                            SKILL.map((item, index) => (
                                <div className="block-container" key={index}>
                                    <div className="all-skills">
                                        {
                                            SKILL.length > 1 &&

                                            (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeSkills(index)}></i>
                                            )

                                        }

                                        <div className="row">
                                            <div className='col-lg-6'>
                                                <label>Skill</label>
                                                <Typeahead
                                                    id="basic-typeahead-single"
                                                    labelKey={(item) => item.SKILL}
                                                    onChange={(e) => this.handleSkillChange2(index, e)}
                                                    options={skillList}
                                                    placeholder="Select skill"
                                                    selected={item.SKILL}
                                                    defaultInputValue={item.SKILL_NAME}
                                                />
                                            </div>
                                            <div className='col-lg-6'>
                                                <label>Proficiency</label>
                                                <select
                                                    style={{ width: "100%", paddingLeft: "6px" }}
                                                    id="level"
                                                    name="SKILL_LEVEL"
                                                    value={item.SKILL_LEVEL}
                                                    onChange={(e) => this.handleSkillChange(index, e)}
                                                >
                                                    <option value="">Select Proficiency</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermidiate">Intermidiate</option>
                                                    <option value="Proficient">Proficient</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        SKILL.length - 1 === index &&
                                        (
                                            <div className="add-blk add-skills btn-cv btn-info-cv mt-50" onClick={(e) => this.addMoreSkills(e)}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another Skill</span>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }

                    </div>

                    <div className="form-group add-skill mt-s">
                        <h2>Add Language</h2>
                        {
                            LANGUAGE.map((item, index) => (
                                <div className="block-container" key={index}>
                                    <div className="all-skills">
                                        {
                                            LANGUAGE.length > 1 &&
                                            (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeLanguages(index)}></i>
                                            )
                                        }

                                        <div className="row">
                                            <div className='col-lg-6'>
                                                <label>Language</label>
                                                <input
                                                    type="text"
                                                    name="LANGUAGE_NAME"
                                                    value={item.LANGUAGE_NAME}
                                                    onChange={(e) => this.handleLanguageChange(index, e)}
                                                    className="form-control"
                                                    placeholder='Language'
                                                />
                                            </div>
                                            <div className='col-lg-6'>
                                                <label>Proficiency</label>
                                                <select
                                                    style={{ width: "100%", paddingLeft: "6px" }}
                                                    name="LANGUAGE_LEVEL"
                                                    value={item.LANGUAGE_LEVEL}
                                                    onChange={(e) => this.handleLanguageChange(index, e)}
                                                    id="level"
                                                >
                                                    <option value="">Select Proficiency</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermidiate">Intermidiate</option>
                                                    <option value="Proficient">Proficient</option>
                                                </select>
                                            </div>
                                            <div className='col-lg-12 pt-3' style={{ display: 'none', justifyContent: "space-between" }}>
                                                <div style={{ textAlign: "center" }}>
                                                    <input
                                                        // class="form-control"
                                                        value={item.READ}
                                                        type="checkbox"
                                                        name="READ"
                                                        onChange={(e) => this.handleLanguageChange(index, e)}
                                                        id="flexRadioDefault1" />
                                                    <label  for="flexRadioDefault1">Read</label>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <input
                                                        // class="form-control"
                                                        value={item.WRITE}
                                                        type="checkbox"
                                                        name="WRITE"
                                                        onChange={(e) => this.handleLanguageChange(index, e)}
                                                        id="flexRadioDefault2" />
                                                    <label  for="flexRadioDefault2">Write</label>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <input
                                                        // class="form-control"
                                                        value={item.SPEAK}
                                                        type="checkbox"
                                                        name="SPEAK"
                                                        onChange={(e) => this.handleLanguageChange(index, e)}
                                                        id="flexRadioDefault3" />
                                                    <label  for="flexRadioDefault3">Speak</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    {
                                        LANGUAGE.length - 1 === index &&
                                        (
                                            <div className="add-blk add-skills btn-cv btn-info-cv mt-50" onClick={(e) => this.addMoreLangauages(e)}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another Language</span>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }

                    </div>

                    <div className="clearfix"></div>

                    <div className="form-group add-social mt-s">
                        <h2>Add social Links</h2>
                        {
                            this.state.SOCIAL.map((item, index) => (
                                <div className="block-container" key={index}>
                                    <div className="all-socials">
                                        {
                                            SOCIAL.length > 1 && (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeSocialLinks(index)}></i>
                                            )
                                        }
                                        <div className="row">
                                            <div className='col-lg-6'>
                                                <label>Social Name</label>
                                                <select
                                                    style={{ width: "100%", paddingLeft: "6px" }}
                                                    name="SOCIAL_NAME"
                                                    value={item.SOCIAL_NAME}
                                                    onChange={(e) => this.handleSocialLinksChange(index, e)}
                                                >
                                                    <option value="">Select social name</option>
                                                    <option value="I">Instagram</option>
                                                    <option value="F">Facebook</option>
                                                    <option value="L">Linkedin</option>
                                                    <option value="G">Git</option>
                                                    <option value="T">Twitter</option>
                                                    <option value="O">Other</option>
                                                </select>
                                            </div>
                                            <div className='col-lg-6'>
                                                <label>Social Link</label>
                                                <input
                                                    type="text"
                                                    name="SOCIAL_LINK"
                                                    value={item.SOCIAL_LINK}
                                                    onChange={(e) => this.handleSocialLinksChange(index, e)}
                                                    className="form-control"
                                                    placeholder='Social links'
                                                />
                                            </div>
                                        </div>

                                    </div>


                                    {
                                        SOCIAL.length - 1 === index &&
                                        (
                                            <div className="add-blk add-socials btn-cv btn-info-cv mt-50" onClick={this.addMoreSocialLinks}>
                                                <i className="fa fa-plus"></i>
                                                <span>Add another social</span>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }

                    </div>

                    <div className="clearfix"></div>

                    <div className="form-group add-interest mt-s">
                        <h2>Add Intrests</h2>
                        {
                            INTRESTS.map((item, index) => (
                                <div className="block-container" key={index}>
                                    <div className="all-socials">
                                        {
                                            INTRESTS.length > 1 && (
                                                <i class="ti-trash pull-right" style={{
                                                    color: "red",
                                                    fontSize: "18px",
                                                    fontWeight: "500",
                                                    padding: "0 5px 0 0",
                                                    cursor: "pointer"
                                                }} onClick={() => this.removeIntrests(index)}></i>
                                            )
                                        }

                                        <div className="row">
                                            <div className='col-lg-12'>
                                                <label>Intrests </label>
                                                <input
                                                    type="text"
                                                    name="INTRESTS_NAME"
                                                    value={item.INTRESTS_NAME}
                                                    onChange={(e) => this.handleIntrestsChange(index, e)}
                                                    className="form-control"
                                                    placeholder='Interest'
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {
                                        INTRESTS.length - 1 === index &&
                                        (<div className="add-blk add-socials btn-cv btn-info-cv mt-50" onClick={this.addMoreIntrests}>
                                            <i className="fa fa-plus"></i>
                                            <span>Add another Intrests</span>
                                        </div>)
                                    }

                                </div>
                            ))
                        }

                    </div>
                    <hr className="mt-100" />
                    <input type="" name="submit" value="Create Resume" className="btn-sub" style={{ textAlign: "center", padding: "10px 0" }} onClick={(e) => this.onSubmit(e)} />
                </form>
            </React.Fragment>
        )
    }

}

