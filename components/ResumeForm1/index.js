import styles from "@/styles/resume.module.css";
import Image from "next/image";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import FileInput from "components/FileInput";
import { ToastContainer , toast } from "react-toastify";
import {
  getCourseSpeczListForJobs,
  getEduQualificationTypeListsForJobs,
  getGrading,
  getQualificationTypeListsForJobs,
  getEducationCourseType,
  getMasterSkillsList,
  getITMasterSkills,
  getSkillResume,
  checkCandidateEmail,
  checkCandidateMobile,
  listEducationCandidate,
} from "@/action/CandidateAction";

import pic01is from "src/assets/img/test-img/1.jpg";
import { Typeahead } from "react-bootstrap-typeahead";
import Loader from "components/Loader";
import ProfilePicture from "components/Edit_Profile/ProfilePicture";
 
// import constant from "../../../constant";


export default class ResumeForm extends Component {
  constructor(props) {
    super(props);
    const candidateDetail = this.props.details;
    this.state = {
      PARA_LIMIT:{
        BIO_LENGTH:1500,
        DISC_LENGTH:500,
        PROJ_DISC_LENGTH:1000
      },
      file: candidateDetail ? candidateDetail.PROFILE_IMAGE:undefined,
      PROFILE_PICTURE: candidateDetail ? candidateDetail.PROFILE_IMAGE : "",
      FIRST_NAME: candidateDetail ? candidateDetail.FIRST_NAME : "",
      LAST_NAME: candidateDetail ? candidateDetail.SECOND_NAME : "",
      JOB_TITLE: candidateDetail ? candidateDetail.RESUME_HEADLINE : "",
      ADDRESS: candidateDetail ? candidateDetail.PERMANENT_ADDRESS : "",
      EMAIL: candidateDetail ? candidateDetail.EMAIL_ID : "",
      PHONE: candidateDetail ? candidateDetail.PHONENO : "",
      BIO: candidateDetail ? candidateDetail.PROFILE_SUMMARY : "",
      Education_List: undefined ,
      EDUCATION:
        candidateDetail && candidateDetail.Education.length !== 0
          ? candidateDetail.Education.map((item, index) => {
          
              return {
                DEGREE: {...item['DEGREE'], DEGREE_ID: item.QUALIFICATION_ID ,DEGREE_VALUE:item.QUALIFICATION_NAME  , DEGREE_ERROR:false    },
                FIELD_OF_STUDY: {...item['FIELD_OF_STUDY'] ,FIELD_OF_STUDY_ID:item.EDUCATION_QUALIFICATION_ID , FIELD_OF_STUDY_VALUE:item.COURSE_STREAM ,FIELD_OF_STUDY_ERROR:false   },
                COURSE_SPECIALIZATION: {...item['COURSE_SPECIALIZATION'],COURSE_SPECIALIZATION_ID: item.SPECIALIZATION_ID , COURSE_SPECIALIZATION_VALUE:item.SPECIALIZATION  , COURSE_SPECIALIZATION_ERROR:false   },
                SCHOOL: item.UNIVERSITY_INSTITUTE,
                EDUCATION_FROM_YEAR: item.START_YEAR,
                EDUCATION_TO_YEAR: item.PASSING_OUT_YEAR,
                MARKS: item.MARKS,
                GRADE_SYSTEM: item.GRADING_SYSTEM_ID,
                COURSE_TYPE: item.COURSE_TYPE_ID,
              };
            })
          : [
              {
                DEGREE: {
                  DEGREE_ID: "" ,
                  DEGREE_VALUE: "" ,
                  DEGREE_ERROR:false
                },
                FIELD_OF_STUDY: {
                  FIELD_OF_STUDY_ID: "",
                  FIELD_OF_STUDY_VALUE: "",
                  FIELD_OF_STUDY_OPTIONS: [],
                  FIELD_OF_STUDY_ERROR:false
                },

                COURSE_SPECIALIZATION: {
                  COURSE_SPECIALIZATION_ID: "",
                  COURSE_SPECIALIZATION_VALUE: "",
                  COURSE_SPECIALIZATION_OPTIONS: [],
                  COURSE_SPECIALIZATION_ERROR:false
                },

                SCHOOL: "",
                EDUCATION_FROM_YEAR: "",
                EDUCATION_TO_YEAR:"",
                MARKS: "0",
                GRADE_SYSTEM: "1",
                COURSE_TYPE: "1",
              },

            ],

      EXPERIENCE:
        candidateDetail && candidateDetail.Experience.length !== 0
          ? candidateDetail.Experience.map((item, index) => {
              return {
                EXPERIENCE_TITLE: item.CURRENT_DESIGNATION,
                EXPERIENCE_COMPANY: item.CURRENT_COMPANY,
                CURRENT_COMPANY: item.IS_THIS_YOUR_CURRENT_COMPANY,
                EXPERIENCE_DESCRIPTION: item.JOB_PROFILE,
                EXPERIENCE_FROM_YEAR: item.JOINING_DATE_YEAR,
                EXPERIENCE_FROM_MONTH: item.JOINING_DATE_MONTH,
                EXPERIENCE_TO_YEAR: item.WORKING_TILL_DATE_YEAR,
                EXPERIENCE_TO_MONTH: item.WORKING_TILL_DATE_MONTH,
              };
            })
          : [
              // {
              //   EXPERIENCE_TITLE: "",
              //   EXPERIENCE_COMPANY: "",
              //   EXPERIENCE_DESCRIPTION: "",
              //   CURRENT_COMPANY: "",
              //   EXPERIENCE_FROM_YEAR: "",
              //   EXPERIENCE_TO_YEAR: "",
              //   EXPERIENCE_TO_MONTH: "",
              // },
            ],
      PROJECT:
        candidateDetail && candidateDetail.Projects.length !== 0
          ? candidateDetail.Projects.map((item) => {
              return {
                PROJECT_NAME: item.PROJECT_TITLE,
                PROJECT_DESCRIPTION: item.PROJECT_DETAILS,
                PROJECT_STATUS: item.PROJECT_STATUS,
              };
            })
          : [
              // {
              //   PROJECT_NAME: "",
              //   PROJECT_DESCRIPTION: "",
              //   PROJECT_STATUS: "I",
              // },
            ],

      SKILL:
        candidateDetail && candidateDetail.Skills.length !== 0
          ? candidateDetail.Skills.map((item) => {
              return {
                SKILL_NAME: item.SKILL,
                SKILL_ID: item.SKILL_ID,
                SKILL_LEVEL: item.SKILL_PROFICIENT,
              };
            })
          : [
              // { SKILL_LEVEL: "", SKILL_ID: "", SKILL_NAME: "" }
            ],
      LANGUAGE:
        candidateDetail && candidateDetail.Language.length !== 0
          ? candidateDetail.Language.map((item) => {
              return {
                LANGUAGE_NAME: item.LANGUAGE,
                LANGUAGE_LEVEL: item.PROFICIENCY,
                READ: item.READ_SKILL,
                WRITE: item.WRITE_SKILL,
                SPEAK: item.SPEAK_SKILL,
              };
            })
          : [
              // {
              //   LANGUAGE_NAME: "",
              //   LANGUAGE_LEVEL: "",
              //   READ: "N",
              //   WRITE: "N",
              //   SPEAK: "N",
              // },
            ],
      SOCIAL:
        candidateDetail && candidateDetail.OnlineProfile.length !== 0
          ? candidateDetail.OnlineProfile.map((item) => {
              return {
                SOCIAL_NAME: item.SOCIAL_PROFILE,
                SOCIAL_LINK: item.URL,
              };
            })
          : [
              // { SOCIAL_NAME: "", SOCIAL_LINK: "" }
            ],
      INTRESTS:
        candidateDetail && candidateDetail.Interest.length !== 0
          ? candidateDetail.Interest.map((item) => {
              return {
                INTRESTS_NAME: item.INTEREST,
              };
            })
          : [
              // { INTRESTS_NAME: "" }
            ],
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
    };
  }

  componentDidMount() {
    this.getEducationList();
    this.getGradingSystemList();
    this.getCourseTypeList();
    this.getSkillLists();

    if (this.props.details != undefined) this.getCandidateEducationList();
  }

  getCandidateEducationList = () => {
    listEducationCandidate().then((res) => {
      if (res.status) {
        let d = res.result.map((data, index) => {
          return {
            CANDIDATE_EDUCATION_ID: data.CANDIDATE_EDUCATION_ID,
            CANDIDATE_ID: data.CANDIDATE_ID,
            COURSE_TYPE: data.COURSE_TYPE,
            COURSE_TYPE_ID: data.COURSE_TYPE_ID,
            EDUCATION_QUALIFICATION:
              data.EDUCATION_QUALIFICATION &&
              data.EDUCATION_QUALIFICATION.map((d, i) => {
                return {
                  EDUCATION_QUALIFICATION_ID: d.EDUCATION_QUALIFICATION_ID,
                  COURSE_STREAM: d.COURSE_STREAM,
                  label: d.COURSE_STREAM,
                };
              }),
            EDUCATION_QUALIFICATION_ID: data.EDUCATION_QUALIFICATION_ID,
            GRADING_SYSTEM_ID: data.GRADING_SYSTEM_ID,
            GRADING_SYSTEM_TYPE: data.GRADING_SYSTEM_TYPE,
            MARKS: data.MARKS,
            PASSING_OUT_YEAR: data.PASSING_OUT_YEAR,
            QUALIFICATION: [
              {
                ...data.QUALIFICATION,
                label: data.QUALIFICATION.QUALIFICATION_NAME,
              },
            ],
            QUALIFICATION_ID: data.QUALIFICATION_ID,
            SPECIALIZATION:
              data.SPECIALIZATION &&
              data.SPECIALIZATION.map((d, i) => {
                return {
                  SPECIALIZATION: d.SPECIALIZATION,
                  SPECIALIZATION_ID: d.SPECIALIZATION_ID,
                  label: d.SPECIALIZATION,
                };
              }),
            SPECIALIZATION_ID: data.SPECIALIZATION_ID,
            UNIVERSITY_INSTITUTE: data.UNIVERSITY_INSTITUTE,
          };
        });


        this.setState(
          {
            ...this.state,
            Education_List: d,
          },
          () => {}
        );
      }
    });
  };

  //---------------------VALIDATION CODE STARTS-------------------------------//
  validateForm = () => {
    let data = this.state;
    let error = {};
    let isValid = true;

    // if (this.state.file == undefined) {
    //   if (!data["PROFILE_PICTURE"]) {
    //     error.PROFILE_PICTURE = "Please upload your profile picture";
    //     isValid = false;
    //   }
    // }
    // if (!data["FIRST_NAME"]) {
    //   error.FIRST_NAME = "Please enter your first name";
    //   isValid = false;
    // }
    // if (!data["LAST_NAME"]) {
    //   error.LAST_NAME = "Please enter your last name";
    //   isValid = false;
    // }
    // if (!data["JOB_TITLE"]) {
    //   error.JOB_TITLE = "Please enter your job title";
    //   isValid = false;
    // }
    // if (!data["ADDRESS"]) {
    //   error.ADDRESS = "Please enter your address";
    //   isValid = false;
    // }
    // if (!data["EMAIL"]) {
    //   error.EMAIL = "Please enter your email";
    //   isValid = false;
    // }
    // if (!data["PHONE"]) {
    //   error.PHONE = "Please enter your phone number";
    //   isValid = false;
    // }
    // if (!data["BIO"]) {
    //   error.BIO = "Please enter bio for your resume";
    //   isValid = false;
    // }

    // data.EDUCATION.map((item) => {
    //   if (
    //     item.FIELD_OF_STUDY.length === 0 ||
    //     item.DEGREE.length === 0 ||
    //     item.COURSE_SPECIALIZATION.length === 0 ||
    //     item.SCHOOL.length === 0 ||
    //     //item.EDUCATION_FROM_YEAR.length === 0 ||
    //     item.MARKS.length === 0 ||
    //     item.GRADE_SYSTEM.length === 0 ||
    //     item.COURSE_TYPE.length === 0
    //   ) {
    //     error.EDUCATION = "Please field is required";
    //     isValid = false;
    //     // this.setState({ error: error });
    //   }
    // });

     
    this.setState({ error: error });
    return isValid;
  };
  //---------------------VALIDATION CODE ENDS-------------------------------//

  //---------------------API CALLING STARTS-------------------------------//
  getEducationList = () => {
    getQualificationTypeListsForJobs()
      .then((res) => {
        if (res.status) {
          this.setState({ educationList: res.result });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  getCourse = (index, e) => {
    let EDUCATION = this.state.EDUCATION;
    EDUCATION[index][e.target.name] = e.target.value;

    this.setState({ EDUCATION });
    const QUALIFICATION_ID = e.target.value;

    getEduQualificationTypeListsForJobs({ QUALIFICATION_ID: QUALIFICATION_ID })
      .then((res) => {
        if (res.status) {
          let edited_res = this.state.Education_List.map((ele, ind) => {
            if (ind == index) {
              return {
                ...ele,
                EDUCATION_QUALIFICATION: [
                  {
                    ...this.state.Education_List.EDUCATION_QUALIFICATION,
                    COURSE_STREAM: " please select field of study ",
                  },
                ],
              };
            } else {
              return { ...ele };
            }
          });


          this.setState(
            {
              ...this.state,
              Education_List: edited_res,
            },
            () => {
              this.setState({ ...this.state, courseList: res.result });
            }
          );
        }
      })

      .catch((err) => {
        alert(err);
      });
  };

  getSpecializeCourse = (index, e) => {
    const EDUCATION_QUALIFICATION_ID = e.target.value;

    return getCourseSpeczListForJobs({
      EDUCATION_QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID,
    })
      .then((res) => {
        if (res.status) {
          return res.result;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

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
            gradingList: d,
          });
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
          });
          this.setState({
            courseTypeList: d,
          });
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
          let d =
            res.result &&
            res.result.map((data, index) => {
              return {
                SKILL_ID: data.SKILL_ID,
                SKILL: data.SKILL,
                label: data.SKILL,
              };
            });
          this.setState({
            skillList: d || [],
            searchKey: true,
          });
        }
      });
    } else {
      this.setState({
        skillList: [],
        searchKey: false,
      });
    }
  };

  getSkillLists = () => {
    getSkillResume()
      .then((res) => {
        if (res.status) {
          this.setState({ skillList: res.result });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //---------------------API CALLING ENDS-------------------------------//


    validateSummary(state) {
       const { BIO , EXPERIENCE ,  PROJECT , PARA_LIMIT , EDUCATION,FIRST_NAME,LAST_NAME,PROFILE_PICTURE,ADDRESS,JOB_TITLE ,EMAIL,PHONE}  = state 
       let status = true 
       const errorCallback = (data) =>{
        toast.error(` "${data}" field missing  `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

       }

      if (this.state.file==undefined) {
        toast.error(`Please upload your profile picture`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
    }

       if(FIRST_NAME.length==0){
        toast.error(`please Enter First Name `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
       if(LAST_NAME.length==0){
        toast.error(`please Enter Last Name `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }

       if(ADDRESS.length==0){
        toast.error(`Please enter your address `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
      
       if(JOB_TITLE.length==0){
        toast.error(`Please enter your job title `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
       if(BIO.length==0){
        toast.error(`Please enter bio for your resume `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
       if(EMAIL.length==0){
        toast.error(`Please enter your email`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
       if(PHONE.length==0){
        toast.error(`Please enter your phone number`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return
       }
       

       if(BIO.length>PARA_LIMIT.BIO_LENGTH){
        toast.error(`please reduce the Bio Para. Length up to ${PARA_LIMIT.BIO_LENGTH} `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          status=false 
         return 
       }





        if(EDUCATION.length>0) {
          
          EDUCATION.forEach((ele , index )=> {
             
              
               if( ele.DEGREE.DEGREE_VALUE == ""  || ele.DEGREE.DEGREE_VALUE==null  )
               {
                errorCallback("Degree")
                  status=false
                  
               } 
               

               if( ele.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE == ""  || ele.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE ==null  )
               {
                errorCallback("Field of Study ")
                  status=false
                  
               } 

               if( ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE == ""  || ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE ==null  )
               {
                errorCallback("specialization ")
                  status=false
               
               } 

               
               if( ele.SCHOOL == ""  || ele.SCHOOL ==null  )
               {
                errorCallback("School/College/University")
                  status=false
               
               } 
               
               if( ele.EDUCATION_FROM_YEAR== ""  || ele.EDUCATION_FROM_YEAR==null  )
               {
                errorCallback("Year from" )
                  status=false
                  
               } 

                 
           if( ele.EDUCATION_TO_YEAR == ""  || ele.EDUCATION_TO_YEAR==null  )
           {
            errorCallback("Till Year " )
              status=false
              
           } 


          } )

        }





       EXPERIENCE.forEach((ele ,index)=>{
          if(ele.EXPERIENCE_DESCRIPTION.length>=PARA_LIMIT.DISC_LENGTH){
             toast.error(`please provide the required length for "${ele.EXPERIENCE_COMPANY}" company `, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
             status=false
             return 
          }
       })

       
       PROJECT.forEach((ele ,index)=>{
        if(ele.PROJECT_DESCRIPTION.length>=PARA_LIMIT.PROJ_DISC_LENGTH){
          toast.error(`please provide the required length for "${ele.PROJECT_NAME}" project `, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
           });
           status=false
            return 
         }


       })







                  

  return status 

    
  }
  
  onSubmit = (e) => {

    e.preventDefault();
   
    let status = this.validateForm();
    
     if(!status) {
      return 
     }
      
    if(!this.validateSummary(this.state)){
      window.scroll(0, 0);
      return 
     }
    

    if (status) {
      const {
        PROFILE_PICTURE,
        FIRST_NAME,
        LAST_NAME,
        JOB_TITLE,
        ADDRESS,
        EMAIL,
        PHONE,
        BIO,
        EDUCATION,
        SOCIAL,
        EXPERIENCE,
        PROJECT,
        LANGUAGE,
        INTRESTS,
        SKILL,
      } = this.state;

      const formData = new FormData();

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
        WHATSAPP_UPDATES: true,
      };
      if (this.state.file != undefined)
        formData.append("PROFILE_IMAGE", this.state.file);
      else formData.append("PROFILE_IMAGE", this.state.PROFILE_PICTURE);
      
      formData.append("data", JSON.stringify(modal));
    this.props.onSubmit(formData);
    }
    window.scroll(0, 0);
  };

  handleEducationChange = (index, e) => {
    let EDUCATION = this.state.EDUCATION;
    EDUCATION[index][e.target.name] = e.target.value;
    this.setState({ EDUCATION });
  };

  addMoreEducations = () => {
    this.setState({
      EDUCATION: [
        ...this.state.EDUCATION,

        {
          DEGREE: {
            DEGREE_ID: "",
            DEGREE_VALUE: "",
          },
          FIELD_OF_STUDY: {
            FIELD_OF_STUDY_ID: "",
            FIELD_OF_STUDY_VALUE: "",
            FIELD_OF_STUDY_OPTIONS: [],
          },

          COURSE_SPECIALIZATION: {
            COURSE_SPECIALIZATION_ID: "",
            COURSE_SPECIALIZATION_VALUE: "",
            COURSE_SPECIALIZATION_OPTIONS: [],
          },

          SCHOOL: "",
          EDUCATION_FROM_YEAR: "",
          MARKS: "0",
          GRADE_SYSTEM: "1",
          COURSE_TYPE: "1",
        },
      ],
    });
  };

  removeEducation(index) {
    let EDUCATION = this.state.EDUCATION;
    EDUCATION.splice(index, 1);
    this.setState({ EDUCATION });
  }

  handleExprienceChange = (index, e) => {
     
    let EXPERIENCE = this.state.EXPERIENCE;
      EXPERIENCE[index][e.target.name] = e.target.value;
      this.setState({ EXPERIENCE });

   };

  addMoreExprience = () => {
    this.setState({
      EXPERIENCE: [
        ...this.state.EXPERIENCE,
        {
          EXPERIENCE_TITLE: "",
          EXPERIENCE_COMPANY: "",
          EXPERIENCE_DESCRIPTION: "",
          CURRENT_COMPANY: "",
          EXPERIENCE_FROM_YEAR: "",
          EXPERIENCE_FROM_MONTH: "",
          EXPERIENCE_TO_YEAR: "",
          EXPERIENCE_TO_MONTH: "",
        },
      ],
    });
  };

  removeExprience(index) {
    let EXPERIENCE = this.state.EXPERIENCE;
    EXPERIENCE.splice(index, 1);
    this.setState({ EXPERIENCE });
  }

  handleProjectChange = (index, e) => {
    let PROJECT = this.state.PROJECT;
    PROJECT[index][e.target.name] = e.target.value;
    this.setState({ PROJECT });
  };

  addMoreProjects = () => {
    this.setState({
      PROJECT: [
        ...this.state.PROJECT,
        { PROJECT_NAME: "", PROJECT_DESCRIPTION: "", PROJECT_STATUS: "I" },
      ],
    });
  };

  removeProjects(index) {
    let PROJECT = this.state.PROJECT;
    PROJECT.splice(index, 1);
    this.setState({ PROJECT });
  }

  handleSkillChange = (index, e) => {
    let SKILL = this.state.SKILL;
    SKILL[index][e.target.name] = e.target.value;
    this.setState({ SKILL });
  };

  handleSkillChange2 = (index, e) => {
    let name = "SKILL_ID";
    let SKILL = this.state.SKILL;
    SKILL[index][name] = e[0]?.SKILL_ID;
    this.setState({ SKILL });
  };

  addMoreSkills = () => {
    this.setState({
      SKILL: [...this.state.SKILL, { SKILL_LEVEL: "", SKILL_ID: "" }],
    });
  };

  removeSkills(index) {
    let SKILL = this.state.SKILL;
    SKILL.splice(index, 1);
    this.setState({ SKILL });
  }

  handleLanguageChange = (index, e) => {
    let LANGUAGE = this.state.LANGUAGE;
    LANGUAGE[index][e.target.name] = e.target.value;
    this.setState({ LANGUAGE });
  };

  addMoreLangauages = () => {
    this.setState({
      LANGUAGE: [
        ...this.state.LANGUAGE,
        {
          LANGUAGE_NAME: "",
          LANGUAGE_LEVEL: "",
          READ: "N",
          WRITE: "N",
          SPEAK: "N",
        },
      ],
    });
  };

  removeLanguages(index) {
    let LANGUAGE = this.state.LANGUAGE;
    LANGUAGE.splice(index, 1);
    this.setState({ LANGUAGE });
  }

  handleSocialLinksChange = (index, e) => {
    let SOCIAL = this.state.SOCIAL;
    SOCIAL[index][e.target.name] = e.target.value;
    this.setState({ SOCIAL });
  };

  addMoreSocialLinks = () => {
    this.setState({
      SOCIAL: [...this.state.SOCIAL, { SOCIAL_NAME: "", SOCIAL_LINK: "" }],
    });
  };

  removeSocialLinks(index) {
    let SOCIAL = this.state.SOCIAL;
    SOCIAL.splice(index, 1);
    this.setState({ SOCIAL });
  }

  handleIntrestsChange = (index, e) => {
    let INTRESTS = this.state.INTRESTS;
    INTRESTS[index][e.target.name] = e.target.value;
    this.setState({ INTRESTS });
  };

  addMoreIntrests = (e) => {
    this.setState({
      INTRESTS: [...this.state.INTRESTS, { INTRESTS_NAME: "" }],
    });
  };

  removeIntrests(index) {
    let INTRESTS = this.state.INTRESTS;
    INTRESTS.splice(index, 1);
    this.setState({ INTRESTS });
  }

  validateEmail = () => {
    let EMAIL = this.state.EMAIL;
    checkCandidateEmail({ EmailId: EMAIL })
      .then((res) => {
        if (res.status) {
          this.setState({ emailAvailable: res.result.res });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  validateMobileNumber = () => {
    let PHONE = this.state.PHONE;
    checkCandidateMobile({ Mobile: PHONE })
      .then((res) => {
        if (res.status) {
          this.setState({ mobileNumberAvailable: res.result.res });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  async getEducation(e, active_index) {
    ;

    const { name, value } = e.target;

    let EDUCATION_QUALIFICATION_ID = Number(value.split("-")[0]);
    const {
      result: field_of_study_list,
    } = await getEduQualificationTypeListsForJobs({
      QUALIFICATION_ID: EDUCATION_QUALIFICATION_ID,
    });

    let fiter_education = this.state.EDUCATION.map((ele, ind) => {
      if (name == "DEGREE") {
        if (ind == active_index) {
          return {
            ...ele,
            [name]: {
              ...ele[name],
              DEGREE_ID: EDUCATION_QUALIFICATION_ID,
              DEGREE_VALUE: value.split("-")[1],
            },
          };
        } else {
          return ele;
        }
      }
    });

    this.setState({ ...this.state, EDUCATION: fiter_education }, () => {
      let update_field_of_study = this.state.EDUCATION.map((ele, ind) => {
        if (name == "DEGREE") {
          if (ind == active_index) {
            return {
              ...ele,
              ["FIELD_OF_STUDY"]: {
                ...ele["FIELD_OF_STUDY"],
                FIELD_OF_STUDY_OPTIONS: field_of_study_list,
              },
            };
          } else {
            return ele;
          }
        }
      });

      this.setState({ ...this.state, EDUCATION: update_field_of_study }, () => {
       
      });
    });
  }

  async getEpecialization(e, active_index) {
    const { name, value } = e.target;

    const { result: specialisation_list } = await getCourseSpeczListForJobs({
      EDUCATION_QUALIFICATION_ID: Number(value.split("-")[0]),
    });

    let fiter_specializaition = this.state.EDUCATION.map((ele, ind) => {
      if (name == "FIELD_OF_STUDY") {
        if (ind == active_index) {
          return {
            ...ele,
            [name]: {
              ...ele[name],
              FIELD_OF_STUDY_VALUE: value.split("-")[1],
              FIELD_OF_STUDY_ID: Number(value.split("-")[0]),
            },
            ["COURSE_SPECIALIZATION"]: {
              ...ele["COURSE_SPECIALIZATION"],
              COURSE_SPECIALIZATION_OPTIONS: specialisation_list,
            },
          };
        } else {
          return ele;
        }
      }
    });

    this.setState(
      {
        ...this.state,
        EDUCATION: fiter_specializaition,
      },
      () => {
        //  console.log("fiter_specializaition" , fiter_specializaition);
      }
    );
  }

  setSpecialisation(e, active_index) {
    const { name, value } = e.target;
    let spcilaisation_id = Number(value.split("-")[0]);
    let spcilaisation_value = value.split("-")[1];

    let specializaition_set = this.state.EDUCATION.map((ele, ind) => {
      if (name == "COURSE_SPECIALIZATION") {
        if (ind == active_index) {
          return {
            ...ele,
            [name]: {
              ...ele[name],
              COURSE_SPECIALIZATION_VALUE: spcilaisation_value,
              COURSE_SPECIALIZATION_ID: spcilaisation_id,
            },
          };
        } else {
          return ele;
        }
      }
    });

    this.setState(
      {
        ...this.state,
        EDUCATION: specializaition_set,
      },
      () => {
        // console.log("final set " , this.state.EDUCATION);
      }
    );
  }

  setUniversityAndYearHandler(e, active_index) {
    const { name, value } = e.target;

    let set_university = this.state.EDUCATION.map((ele, ind) => {
      if (
        name == "SCHOOL" ||
        name == "EDUCATION_FROM_YEAR" ||
        name == "EDUCATION_TO_YEAR"
      ) {
        if (ind == active_index) {
          return {
            ...ele,
            [name]: value,
          };
        } else {
          return ele;
        }
      }
    });

    this.setState(
      {
        ...this.state,
        EDUCATION: set_university,
      },
      () => {
      }
    );
  }


  deleteEducationField (arr,  active_index ) {
    
    let filtered_edu  =arr.filter((ele , index)=> index!=active_index )  
    this.setState({...this.state , EDUCATION:filtered_edu })

  }

  render() {
    const {
      PROFILE_PICTURE,
      FIRST_NAME,
      LAST_NAME,
      JOB_TITLE,
      ADDRESS,
      EMAIL,
      PHONE,
      BIO,
      EDUCATION,
      EXPERIENCE,
      SKILL,
      LANGUAGE,
      SOCIAL,
      INTRESTS,
      PROJECT,
      error,
      educationList,
      courseList,
      gradingList,
      courseTypeList,
      specializationList,
      skillList,
      DEGREE,
      FIELD_OF_STUDY,
      candidateDetail,
      Education_List,
      PARA_LIMIT
    } = this.state;

    const detail = this.props.details;
    //  const {EDUCATION_QUALIFICATION_STATUS : EDUCATION_QUALIFICATION}  = Education_List


    return (
      <React.Fragment>
        {/*this.props.showLoader && <Loader /> */}
        <form className="resume-making-forms-bx">
          <div className="mt-20  page-section" id="1">
            <h2>Personal Info</h2>
            <div className="block-container">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-4 col-4">
                  {!detail && (
                    <Image
                      src={
                        this.state.file != undefined
                          ? this.state.file
                          : // : detail
                            // ? `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${detail.CANDIDATE_ID}/${PROFILE_PICTURE}`
                            pic01is
                      }
                      className="d-block"
                      alt=""
                      accept="image/jpg, image/png,image/jpeg"
                      width={90}
                      height={90}
                      style={{
                        borderRadius: "50%",
                        maxHeight: "90px",
                        maxWidth: "90px",
                      }}
                    />
                  )}

                  {detail && (
                    <Image
                      src={
                        PROFILE_PICTURE
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${detail.CANDIDATE_ID}/${PROFILE_PICTURE}`
                          : this.state.file
                          ? this.state.file
                          : pic01is
                      }
                      className="d-block"
                      alt=""
                      accept="image/jpg, image/png,image/jpeg"
                      width={90}
                      height={90}
                      style={{
                        borderRadius: "50%",
                        height: "85px",
                        width: "85px",
                        //objectFit: "contain",
                      }}
                    />
                  )}
                </div>
                <div className="col-lg-5 col-md-8 col-8 mt-s mob-view-bx">
                  <h6 className="img-had">Upload your picture</h6>
                  <p className="text-muted img-para mb-0">
                    For best results, use image 300px by 300px in either .jpg or
                    .png
                  </p>
                </div>
                <div
                  className="col-lg-5 col-md-12 mt-s"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                  }}
                >
                  <label
                    htmlFor="profile-pidcture1"
                    className="btn-upcv btn-primary-upcv"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    accept="image/jpg, image/png,image/jpeg"
                    id="profile-pidcture1"
                    name="user[image]"
                    ref="file"
                    multiple="true"
                    hidden
                    onChange={(e) => {
                      ;
                      var file = this.refs.file.files[0];
                      const imageUrl = URL.createObjectURL(file);
                      this.setState({
                        ...this.state,
                        file: imageUrl,
                        PROFILE_PICTURE: false,
                      });

                      // this.setState({ ...this.state , PROFILE_PICTURE: e.target.files[0] });
                    }}
                  />
                  {/* <a href="javascript:void(0)" className="btn-upcv btn-soft-primary ms-2" style={PROFILE_PICTURE == '' ? { display: 'none' } : { display: 'block' }} onClick={this.handleRemovePicture}>Remove</a> */}
                </div>
              </div>
              {error && !PROFILE_PICTURE && (
                <span className="text-danger">{error.PROFILE_PICTURE}</span>
              )}
              <div className="">
                <div className="row">
                  <div className="col-lg-6">
                    <label>First Name <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    <input
                      type="text"
                      name="FIRST_NAME"
                      value={FIRST_NAME}
                      onChange={(e) =>
                        this.setState({ FIRST_NAME: e.target.value })
                      }
                      className="form-control"
                      placeholder="First name"
                    />
                    {error && !FIRST_NAME && (
                      <span className="text-danger">{error.FIRST_NAME}</span>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <label>Last Name <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    <input
                      type="text"
                      name="LAST_NAME"
                      value={LAST_NAME}
                      onChange={(e) =>
                        this.setState({ LAST_NAME: e.target.value })
                      }
                      className="form-control"
                      placeholder="Last name"
                    />
                    {error && !LAST_NAME && (
                      <span className="text-danger">{error.LAST_NAME}</span>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <label>Job Title <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    <input
                      type="text"
                      name="JOB_TITLE"
                      value={JOB_TITLE}
                      onChange={(e) =>
                        this.setState({ JOB_TITLE: e.target.value })
                      }
                      className="form-control"
                      placeholder="Job title"
                    />
                    {error && !JOB_TITLE && (
                      <span className="text-danger">{error.JOB_TITLE}</span>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label>Your Address <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    <input
                      type="text"
                      name=" ADDRESS"
                      value={ADDRESS}
                      onChange={(e) =>
                        this.setState({ ADDRESS: e.target.value })
                      }
                      className="form-control"
                      placeholder="Address"
                    />
                    {error && !ADDRESS && (
                      <span className="text-danger">{error.ADDRESS}</span>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <label>Email <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    {detail ? (
                      <input
                        type="text"
                        name="EMAIL"
                        value={EMAIL}
                        onChange={(e) => {
                          this.setState({ EMAIL: e.target.value });
                          this.validateEmail();
                        }}
                        className="form-control"
                        placeholder="Email"
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        name="EMAIL"
                        value={EMAIL}
                        onChange={(e) => {
                          this.setState({ EMAIL: e.target.value });
                          this.validateEmail();
                        }}
                        className="form-control"
                        placeholder="Email"
                      />
                    )}
                    {error && !EMAIL && (
                      <span className="text-danger">{error.EMAIL}</span>
                    )}
                    {this.state.emailAvailable == 1 && (
                      <span className="text-danger">
                        This email is already registered please login
                      </span>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <label>Phone No <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    {detail ? (
                      <NumberFormat
                        maxLength={10}
                        minLength={10}
                        name="PHONE"
                        value={PHONE}
                        onChange={(e) => {
                          this.setState({ PHONE: e.target.value });
                          this.validateMobileNumber();
                        }}
                        readOnly
                        className="form-control"
                        placeholder="Phone No"
                      />
                    ) : (
                      <NumberFormat
                        maxLength={11}
                        minLength={10}
                        name="PHONE"
                        value={PHONE}
                        onChange={(e) => {
                          this.setState({ PHONE: e.target.value });
                          this.validateMobileNumber();
                        }}
                        className="form-control"
                        placeholder="Phone No"
                      />
                    )}
                    {error && !PHONE && (
                      <span className="text-danger">{error.PHONE}</span>
                    )}
                    {this.state.mobileNumberAvailable == 1 && (
                      <span className="text-danger">
                        This mobile number is already registered please login
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <label>Bio Here <span style={{color:"red", verticalAlign:"middle"}}> * </span> </label>
                    <textarea
                      name="BIO"
                      id="comments"
                      rows="4"
                      value={BIO}
                      onChange={(e) =>  this.setState({...this.state ,   BIO: e.target.value } ) }
                      className="form-control mb-2"
                      placeholder="Bio Here"
                      style={{
                        resize: "vertical",
                        overflow: "auto"
                            }}
                    ></textarea>
                     
                     {(PARA_LIMIT.BIO_LENGTH -  ( BIO?this.state.BIO.length:0) ) <0?<span style={{color:"red"}}> {BIO.length} </span> : <span style={{color:"green"}} > {BIO.length} </span> } / { PARA_LIMIT.BIO_LENGTH }  
                     
                     {error && !BIO && (
                      <span className="text-danger ml-2">{error.BIO}</span>
                    )}
                      { BIO.length>PARA_LIMIT.BIO_LENGTH && <span className="text-danger" style={{marginLeft:"8px"}}>Error: Bio Content Exceeds Limit.&nbsp;{PARA_LIMIT.BIO_LENGTH} Please shorten your input to 1500 characters.</span>}

                  </div>
                </div>
              </div>
            </div>
          </div>


          <h2>Add Education </h2>
          {this.state.EDUCATION.map((ele, index , arr  ) => {
            return (
              
              <div className="all-edus">
              <i className="ti-trash pull-right" onClick={()=> this.deleteEducationField(arr, index)} style={{color: "red", fontSize: "18px",  fontWeight: "500" , padding: "0px 5px 0px 0px",  cursor: "pointer" }}></i>
              <div className="row mobile-row">
                  <div className="col-lg-6">
                    <label>Degree <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>
                    <select
                      name="DEGREE"
                      onChange={(e) => this.getEducation(e, index)}
                      style={{ width: "100%", padding: "10px 6px" }}
                   
                      // onBlur={  (e )=>{
                      //   if(e.target.value.trim()==0) {
                      //     let updated_obj = this.state.EDUCATION.map((item , ind)=>{
                      //        if(ind==index) {
                      //          return {
                      //            ...ele , DEGREE: {
                      //               ...ele.DEGREE , 
                      //             DEGREE_ERROR:true
                      //           }, 
                      //          }

                      //        } else{
                      //         return item 
                      //        }
                      //     })


                      //      this.setState( {
                      //        ...this.state , EDUCATION: updated_obj  
                      //      })
                      //    }
                      // }}


                       
                    >
                       {ele.DEGREE.DEGREE_VALUE!=""?"":
                       <option selected hidden disabled>
                        Select education 
                      </option>
                      } 
                      
                       <option value="8-10th"
                       selected={ele.DEGREE.DEGREE_VALUE=="10th"} 
                        // disabled={ele.DEGREE.DEGREE_VALUE=="10th"}  
                        // hidden={ele.DEGREE.DEGREE_VALUE=="10th"} 
                         >10th</option>
                           <option value="9-12th" 
                      selected={ele.DEGREE.DEGREE_VALUE=="12th"} 
                      //  disabled={ele.DEGREE.DEGREE_VALUE=="12th"} 
                        // hidden={ele.DEGREE.DEGREE_VALUE=="12th"}
                          >12th</option>
                           <option value="7-Diploma" 
                      selected={ele.DEGREE.DEGREE_VALUE=="Diploma"}
                      //  disabled={ele.DEGREE.DEGREE_VALUE=="Diploma"}
                      //  hidden={ele.DEGREE.DEGREE_VALUE=="Diploma"} 
                       >Diploma</option>
                         <option value="1-Graduate"   
                      selected={ele.DEGREE.DEGREE_VALUE=="Graduate"} 
                      //  disabled={ele.DEGREE.DEGREE_VALUE=="Graduate"}
                        // hidden={ele.DEGREE.DEGREE_VALUE=="Graduate"}
                        >  Graduate  </option>

                      <option value="2-Post Graduate" 
                      selected={ele.DEGREE.DEGREE_VALUE=="Post Graduate"}  
                      // disabled={ele.DEGREE.DEGREE_VALUE=="Post Graduate"}
                      //  hidden={ele.DEGREE.DEGREE_VALUE=="Post Graduate"}
                        >Post Graduate</option>
                         <option value="3-Doctral/Ph.D" 
                      selected={ele.DEGREE.DEGREE_VALUE=="Doctral/Ph.D"}
                      // disabled={ele.DEGREE.DEGREE_VALUE=="Doctral/Ph.D"}
                      //  hidden={ele.DEGREE.DEGREE_VALUE=="Doctral/Ph.D"}
                       >Doctral/Ph.D</option>

                     
                    
                      
                    

                    </select>

                    {ele.DEGREE_ERROR  && (
                      <span className="text-danger"> please fill the required field  </span>
                    )}

                  </div>

                  <div className="col-lg-6">
                    <label>Field of study <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>
                    <select
                      name="FIELD_OF_STUDY"
                      style={{ width: "100%", padding: "10px 6px" }}
                      onChange={(e) => this.getEpecialization(e, index)}
                    >
                      { ele.FIELD_OF_STUDY.FIELD_OF_STUDY_OPTIONS && ele.FIELD_OF_STUDY.FIELD_OF_STUDY_OPTIONS.length>0?
                        ele.FIELD_OF_STUDY.FIELD_OF_STUDY_OPTIONS.map(
                          (item, index) => {
                            return (
                              <option
                                value={
                                  item.EDUCATION_QUALIFICATION_ID +
                                  "-" +
                                  item.COURSE_STREAM
                                }
                              >
                                {" "}
                                {item.COURSE_STREAM}
                              </option>
                            );
                          }
                        
                          ):
                        ele.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE!=""?<option value={ele.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE}> {ele.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} </option> : <option selected disabled hidden > select field of study  </option>
                        }
                    </select>
                  </div>

                  <div className="col-lg-6">
                    <label>Specialization <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>
                    <select
                      className=""
                      id="level"
                      name="COURSE_SPECIALIZATION"
                      style={{ width: "100%", padding: "10px 6px" }}
                      onChange={(e) => this.setSpecialisation(e, index)}
                    >
                      {ele.COURSE_SPECIALIZATION
                        .COURSE_SPECIALIZATION_OPTIONS &&  ele.COURSE_SPECIALIZATION
                        .COURSE_SPECIALIZATION_OPTIONS.length>0 ?
                        ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_OPTIONS.map(
                          (item, index) => {
                            return (
                              <option
                                value={
                                  item.SPECIALIZATION_ID +
                                  "-" +
                                  item.SPECIALIZATION
                                }
                              >
                                {" "}
                                {item.SPECIALIZATION}
                              </option>
                            );
                          }
                        ):

                        ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE!=""?<option value={ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}> {ele.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE} </option> :

                        <option selected disabled hidden> select specialization </option> 
                        
                        }
                    </select>

                  </div>
                  <div className="col-lg-6">
                    <label>School/College/University</label>
                    <input
                      type="text"
                      name="SCHOOL"
                      className="form-control"
                      placeholder="School/College/University name"
                      value={ele.SCHOOL}
                      onChange={(e) =>
                        this.setUniversityAndYearHandler(e, index)
                      }
                    />
                  </div>
                  <div className="col-lg-6" style={{ display: "none" }}>
                    <label>Course Type <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>
                    <select
                      id="course_type"
                      name="COURSE_TYPE"
                      style={{ width: "100%", padding: "10px 6px" }}
                    >
                      <option value="1">Select Course Type</option>
                      <option value="1">Full Time</option>
                      <option value="2">Part Time</option>
                      <option value="3">
                        Correspondence/Distance learning
                      </option>
                    </select>
                  </div>
                  <div className="col-lg-6">
                    <label>From year <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>

                    <select
                      name="EDUCATION_FROM_YEAR"
                      style={{ width: "100%", padding: "10px 6px" }}
                      onChange={(e) =>
                        this.setUniversityAndYearHandler(e, index)
                      }
                    >
                      {ele.EDUCATION_FROM_YEAR?<option value={ele.EDUCATION_FROM_YEAR}>{ele.EDUCATION_FROM_YEAR} </option> : <option selected disabled hidden>
                        -- Year From --
                      </option> } 

                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                      <option value="1997">1997</option>
                      <option value="1996">1996</option>
                      <option value="1995">1995</option>
                      <option value="1994">1994</option>
                      <option value="1993">1993</option>
                      <option value="1992">1992</option>
                      <option value="1991">1991</option>
                      <option value="1990">1990</option>
                      <option value="1989">1989</option>
                      <option value="1988">1988</option>
                      <option value="1987">1987</option>
                      <option value="1986">1986</option>
                      <option value="1985">1985</option>
                      <option value="1984">1984</option>
                      <option value="1983">1983</option>
                      <option value="1982">1982</option>
                      <option value="1981">1981</option>
                      <option value="1980">1980</option>
                      <option value="1979">1979</option>
                      <option value="1978">1978</option>
                      <option value="1977">1977</option>
                      <option value="1976">1976</option>
                      <option value="1975">1975</option>
                      <option value="1974">1974</option>
                    </select>
                  </div>
                  <div className="col-lg-6">
                    <label>Till year <span style={{color:"red", verticalAlign:"middle"}}> * </span></label>

                    <select
                      name="EDUCATION_TO_YEAR"
                      style={{ width: "100%", padding: "10px 6px" }}
                      onChange={(e) =>
                        this.setUniversityAndYearHandler(e, index)
                      }
                    >

                    {ele.EDUCATION_TO_YEAR?<option value={ele.EDUCATION_TO_YEAR}>{ele.EDUCATION_TO_YEAR} </option> :   
                     <option >--Till year -- </option>} 
                     {/* <option value={''}>--Till year --</option> */}
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                      <option value="1997">1997</option>
                      <option value="1996">1996</option>
                      <option value="1995">1995</option>
                      <option value="1994">1994</option>
                      <option value="1993">1993</option>
                      <option value="1992">1992</option>
                      <option value="1991">1991</option>
                      <option value="1990">1990</option>
                      <option value="1989">1989</option>
                      <option value="1988">1988</option>
                      <option value="1987">1987</option>
                      <option value="1986">1986</option>
                      <option value="1985">1985</option>
                      <option value="1984">1984</option>
                      <option value="1983">1983</option>
                      <option value="1982">1982</option>
                      <option value="1981">1981</option>
                      <option value="1980">1980</option>
                      <option value="1979">1979</option>
                      <option value="1978">1978</option>
                      <option value="1977">1977</option>
                      <option value="1976">1976</option>
                      <option value="1975">1975</option>
                      <option value="1974">1974</option>
                    </select>
                  </div>
                  <div className="col-lg-6" style={{ display: "none" }}>
                    <label>Grading System</label>
                    <select
                      id="level"
                      name="GRADE_SYSTEM"
                      style={{ width: "100%", padding: "10px 6px" }}
                    >
                      <option value="1">Select Grading Type</option>
                      <option value="1">Scale 10 Grading System</option>
                      <option value="2">Scale 4 Grading System</option>
                      <option value="3">% Marks of 100 Maximum</option>
                    </select>
                  </div>
                  <div className="col-lg-6" style={{ display: "none" }}>
                    <label>Grades</label>
                    <input
                      type="text"
                      name="MARKS"
                      className="form-control"
                      placeholder="Grades"
                      value="0"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="add-blk btn-cv btn-info-cv"
            id="add-edu"
            onClick={(e) => this.addMoreEducations(e)}
          >
            <i className="fa fa-plus"></i>
            <span> Education </span>
          </div>



          {/* EDUCATION.map((item, index) => (
              <>
                <div className="all-edus">
                  {EDUCATION.length > 1 && (
                    <i
                      className="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeEducation(index)}
                    ></i>
                  )}

                  <div className="row mobile-row">
                    <div className="col-lg-6">
                      <label>Degree:</label>

                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="DEGREE"
                        value={item.DEGREE}
                        onChange={(e) => this.getCourse(index, e)}
                      >
                        <option value=""> Select education </option>

                        {educationList &&
                          educationList.map((data, index) => {
                            return (
                              <option value={data.QUALIFICATION_ID}>
                                {data.QUALIFICATION_NAME}
                              </option>
                            );
                          })}
                      </select>

                      {error.EDUCATION && item?.DEGREE?.length === 0 && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <label>Field of study:</label>

                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="FIELD_OF_STUDY"
                        value={item.FIELD_OF_STUDY}
                      
                        onChange={(e) => this.getSpecializeCourse(index, e)}
                      >
                        {Education_List != undefined &&
                        Education_List[index] ? (
                          <option
                            value={
                              Education_List[index]
                                ? Education_List[index]
                                    ?.EDUCATION_QUALIFICATION[0]?.COURSE_STREAM
                                : data[index].EDUCATION_QUALIFICATION_ID
                            }
                          >
                            {Education_List[index]
                              ? Education_List[index]
                                  ?.EDUCATION_QUALIFICATION[0]?.COURSE_STREAM
                              : data[index].COURSE_STREAM}
                          </option>
                        ) : (
                          <option value={""}> select field of study </option>
                        )}

                     

                        {courseList &&
                          courseList.map((data, index) => {
                            return (
                              <option value={data.EDUCATION_QUALIFICATION_ID}>
                                {data.COURSE_STREAM}
                              </option>
                            );
                          })}
                      </select>

                      {error.EDUCATION &&
                        !item?.FIELD_OF_STUDY?.length === 0 && (
                          <span className="text-danger ml-1">
                            {error.EDUCATION}
                          </span>
                        )}
                    </div>
                    <div className="col-lg-6">
                      <label>Specialization</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        className=""
                        id="level"
                        name="COURSE_SPECIALIZATION"
                        value={item.COURSE_SPECIALIZATION}
                        onChange={(e) => this.handleEducationChange(index, e)}
                      >
                        {Education_List != undefined &&
                        Education_List[index] ? (
                          <option
                            value={
                              Education_List[index]
                                ? Education_List[index]?.SPECIALIZATION[0]
                                    ?.SPECIALIZATION
                                : data[index].SPECIALIZATION
                            }
                          >
                            {Education_List[index]
                              ? Education_List[index]?.SPECIALIZATION[0]
                                  ?.SPECIALIZATION
                              : data[index].COURSE_STREAM}
                          </option>
                        ) : (
                          <option value="">Select Specialization</option>
                        )}

                        {specializationList &&
                          specializationList.map((item, index) => {
                            return (
                              <option value={item.SPECIALIZATION_ID}>
                                {item.SPECIALIZATION}
                              </option>
                            );
                          })}
                      </select>
                      {error.EDUCATION &&
                        !item?.COURSE_SPECIALIZATION?.length && (
                          <span className="text-danger ml-1">
                            {error.EDUCATION}
                          </span>
                        )}
                    </div>

                    <div className="col-lg-6">
                      <label>School/College/University:</label>
                      <input
                        type="text"
                        name="SCHOOL"
                        value={item.SCHOOL}
                        onChange={(e) => this.handleEducationChange(index, e)}
                        className="form-control"
                        placeholder="School/College/University name"
                      />
                      {error.EDUCATION && !item?.SCHOOL?.length && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6" style={{ display: "none" }}>
                      <label>Course Type</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        id="course_type"
                        name="COURSE_TYPE"
                        value={item.COURSE_TYPE}
                        onChange={(e) => this.handleEducationChange(index, e)}
                      >
                        <option value="1">Select Course Type</option>
                        {courseTypeList.map((item, index) => {
                          return (
                            <option value={item.COURSE_TYPE_ID}>
                              {item.COURSE_TYPE}
                            </option>
                          );
                        })}
                      </select>
                      {error.EDUCATION && !item?.COURSE_TYPE?.length && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6">
                      <label>From year:</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EDUCATION_FROM_YEAR"
                        value={item.EDUCATION_FROM_YEAR}
                        onChange={(e) => this.handleEducationChange(index, e)}
                      >
                        <option value="">--Please Select Year--</option>
                        {Array.from({ length: 50 }, (_, i) => (
                          <option value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </select>
                      {error.EDUCATION &&
                        !item?.EDUCATION_FROM_YEAR?.length && (
                          <span className="text-danger ml-1">
                            {error.EDUCATION}
                          </span>
                        )}
                    </div>

                    <div className="col-lg-6">
                      <label>Till year:</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EDUCATION_TO_YEAR"
                        value={item.EDUCATION_TO_YEAR}
                        onChange={(e) => this.handleEducationChange(index, e)}
                      >
                        <option value="">--Please Select Year--</option>
                        {Array.from({ length: 50 }, (_, i) => (
                          <option value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </select>
                      {error.EDUCATION && !item?.EDUCATION_TO_YEAR?.length && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6" style={{ display: "none" }}>
                      <label>Grading System</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        id="level"
                        name="GRADE_SYSTEM"
                        value={item.GRADE_SYSTEM}
                        onChange={(e) => this.handleEducationChange(index, e)}
                      >
                        <option value="1">Select Grading Type</option>
                        {gradingList &&
                          gradingList.map((item, index) => {
                            return (
                              <option value={item.GRADING_SYSTEM_ID}>
                                {item.GRADING_SYSTEM_TYPE}
                              </option>
                            );
                          })}
                      </select>
                      {error.EDUCATION && !item?.GRADE_SYSTEM?.length && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6" style={{ display: "none" }}>
                      <label>Grades</label>
                      <input
                        type="text"
                        name="MARKS"
                        value={0}
                        onChange={(e) => this.handleEducationChange(index, e)}
                        className="form-control"
                        placeholder="Grades"
                      />
                      {error.EDUCATION && !item?.MARKS?.length && (
                        <span className="text-danger ml-1">
                          {error.EDUCATION}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {EDUCATION.length - 1 === index && (
                  <div
                    className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                    id="add-edu"
                    onClick={(e) => this.addMoreEducations(e)}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Education</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  { EDUCATION.length - 1 === index && (
                    <div
                      className="add-blk btn-cv btn-info-cv"
                      id="add-edu"
                      onClick={(e) => this.addMoreEducations(e)}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Education</span>
                    </div>
                  )}
                </div>
              </>
                  )) */}

          <div className="clearfix"></div>
          <div className="form-group add-exp mt-s  page-section" id="3">
            <h2>Add Experiences</h2>

            {EXPERIENCE.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreExprience(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Experience</span>
              </div>
            )}

            <div className="mobile-view-block">
              {EXPERIENCE.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreExprience(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Experience</span>
                </div>
              )}
            </div>

            {EXPERIENCE.map((item, index) => (
              <>
                <div className="all-exps">
                  {(EXPERIENCE.length > 1 || EXPERIENCE.length <= 1) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeExprience(index)}
                    ></i>
                  )}
                  <div className="row mobile-row">
                    <div className="col-lg-12">
                      <label>Title  </label>
                      <input
                        type="text"
                        name="EXPERIENCE_TITLE"
                        value={item.EXPERIENCE_TITLE}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                        className="form-control"
                        placeholder="Ex: Web Developer"
                      />
                    </div>

                    <div className="col-lg-6">
                      <label>Company</label>
                      <input
                        type="text"
                        name="EXPERIENCE_COMPANY"
                        value={item.EXPERIENCE_COMPANY}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                        className="form-control"
                        placeholder="Ex: ProgressSoft"
                      />
                    </div>
                    <div className="col-lg-6">
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

                    <div className="col-lg-6">
                      <label>From year</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EXPERIENCE_FROM_YEAR"
                        value={item.EXPERIENCE_FROM_YEAR}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                      >
                        <option value="">--Please Select Year--</option>
                        {Array.from({ length: 50 }, (_, i) => (
                          <option value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="">Form Month</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EXPERIENCE_FROM_MONTH"
                        value={item.EXPERIENCE_FROM_MONTH}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                      >
                        <option value="">--Select Month--</option>
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
                      <label>Work Till year</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EXPERIENCE_TO_YEAR"
                        value={item.EXPERIENCE_TO_YEAR}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                      >
                        <option value="">--Please Select Year--</option>
                    
                        {Array.from({ length: 50 }, (_, i) => (
                          <option value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="">Work Till Month</label>
                      <select
                        style={{ width: "100%", padding: "10px 6px" }}
                        name="EXPERIENCE_TO_MONTH"
                        value={item.EXPERIENCE_TO_MONTH}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                      >
                        <option value="">--Select Month--</option>
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
                    <div className="col-lg-12">
                      <label>Description (optional)</label>
                      <textarea
                        rows={5}
                        name="EXPERIENCE_DESCRIPTION"
                        minLength={PARA_LIMIT.DISC_LENGTH}
                        value={item.EXPERIENCE_DESCRIPTION}
                        onChange={(e) => this.handleExprienceChange(index, e)}
                        className="form-control mb-2"
                        style={{
                          resize: "vertical",
                          overflow: "auto"
                              }}

                      ></textarea>
                          
                          {(PARA_LIMIT.DISC_LENGTH-item.EXPERIENCE_DESCRIPTION.length)<0?<span style={{color:"red"}}> {item.EXPERIENCE_DESCRIPTION.length} </span> :
                            <span style={{color:"green"}} > {item.EXPERIENCE_DESCRIPTION.length} 
                            </span> }/{PARA_LIMIT.DISC_LENGTH} 

                            { item.EXPERIENCE_DESCRIPTION.length>PARA_LIMIT.DISC_LENGTH && <span className="text-danger" style={{marginLeft:"8px"}}>Error: Description Content Exceeds Limit.&nbsp;{PARA_LIMIT.DISC_LENGTH} Please shorten your input to 500 characters.</span>}

                      </div>
                  </div>
                </div>



                {EXPERIENCE.length !== 0 && EXPERIENCE.length - 1 === index && (
                  <div
                    className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                    id="add-exp"
                    onClick={(e) => this.addMoreExprience(e)}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Experience</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {EXPERIENCE.length !== 0 && EXPERIENCE.length - 1 === index && (
                    <div
                      className="add-blk btn-cv btn-info-cv"
                      id="add-exp"
                      onClick={(e) => this.addMoreExprience(e)}
                    >
                      <i className="fa fa-plus"></i>
                      <span> Experience</span>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>

          <div className="clearfix"></div>
          <div className="form-group add-exp mt-s  page-section" id="4">
            <h2>Add Project</h2>
            {PROJECT.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreProjects(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Project</span>
              </div>
            )}
            <div className="mobile-view-block">
              {PROJECT.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreProjects(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Project</span>
                </div>
              )}
            </div>
            {PROJECT.map((item, index) => (
              <>
                <div className="all-exps">
                  {(PROJECT.length > 1 || PROJECT.length <= 1 ) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeProjects(index)}
                    ></i>
                  )}

                  <div className="row">
                    <div className="col-lg-12">
                      <label>Project Title</label>
                      <input
                        type="text"
                        name="PROJECT_NAME"
                        value={item.PROJECT_NAME}
                        onChange={(e) => this.handleProjectChange(index, e)}
                        className="form-control"
                        placeholder="Project title"
                      />
                    </div>
                    <div className="col-lg-12" style={{ display: "none" }}>
                      <label>Project Status</label>
                      <div style={{ display: "flex" }}>
                        <div
                          class=""
                          style={{ display: "flex", alignItems: "baseline" }}
                        >
                          <input
                            class=""
                            type="radio"
                            name="ProjectStaus"
                            id="flexRadioDefault1"
                            value={"I"}
                            onChange={(e) => {
                              this.setState({
                                ProjectStaus: "I",
                                WorkTillYear: "",
                                WorkTillMonth: "",
                              });
                            }}
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            In Progress
                          </label>
                        </div>
                        <div
                          class=""
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            marginLeft: "40px",
                          }}
                        >
                          <input
                            class=""
                            type="radio"
                            name="ProjectStaus"
                            id="flexRadioDefault2"
                            value={"C"}
                            onChange={(e) => {
                              this.setState({
                                ProjectStaus: "C",
                                WorkTillYear: "",
                                WorkTillMonth: "",
                              });
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Finished
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label>Project Description</label>
                      <textarea
                        name="PROJECT_DESCRIPTION"
                        value={item.PROJECT_DESCRIPTION}
                        onChange={(e) => this.handleProjectChange(index, e)}
                        className="form-control mb-2"
                        style={{
                          resize: "vertical",
                          overflow: "auto"
                              }}


                      ></textarea>
                      
                      
                      { (PARA_LIMIT.PROJ_DISC_LENGTH-item.PROJECT_DESCRIPTION.length )<0?<span style={{color:"red"}}> {item.PROJECT_DESCRIPTION.length} </span> : <span style={{color:"green"}} > {item.PROJECT_DESCRIPTION.length} </span> }/{PARA_LIMIT.PROJ_DISC_LENGTH} 


                      { item.PROJECT_DESCRIPTION.length>PARA_LIMIT.PROJ_DISC_LENGTH && <span className="text-danger" style={{marginLeft:"8px"}}>Error: Project Description Content Exceeds Limit.&nbsp;{PARA_LIMIT.PROJ_DISC_LENGTH} Please shorten your input to 1000 characters.</span>}

                    </div>
                  </div>
                </div>

                {PROJECT.length !== 0 && PROJECT.length - 1 === index && (
                  <div
                    className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                    id="add-exp"
                    onClick={(e) => this.addMoreProjects(e)}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Project</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {PROJECT.length !== 0 && PROJECT.length - 1 === index && (
                    <div
                      className="add-blk btn-cv btn-info-cv"
                      id="add-exp"
                      onClick={(e) => this.addMoreProjects(e)}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Project</span>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>

          <div className="clearfix"></div>

          <div className="form-group add-skill mt-s  page-section" id="5">
            <h2>Add Skills</h2>
            {SKILL.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreSkills(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Skills</span>
              </div>
            )}
            <div className="mobile-view-block">
              {SKILL.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreSkills(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Add Skills</span>
                </div>
              )}
            </div>

            {SKILL.map((item, index) => (
              <div className="block-container" key={index}>
                <div className="all-skills">
                  {(SKILL.length > 1 || SKILL.length <= 1) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeSkills(index)}
                    ></i>
                  )}

                  <div className="row mobile-row">
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
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

                {SKILL.length !== 0 && SKILL.length - 1 === index && (
                  <div
                    className="add-blk add-skills btn-cv btn-info-cv mt-50 mobile-view-block-none"
                    onClick={(e) => this.addMoreSkills(e)}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Skill</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {SKILL.length !== 0 && SKILL.length - 1 === index && (
                    <div
                      className="add-blk add-skills btn-cv btn-info-cv mt-50"
                      onClick={(e) => this.addMoreSkills(e)}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Add Skill</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="clearfix"></div>
          <div className="form-group add-skill mt-s  page-section" id="6">
            <h2>Add Language</h2>
            {LANGUAGE.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreLangauages(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Languages</span>
              </div>
            )}
            <div className="mobile-view-block">
              {LANGUAGE.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreLangauages(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Languages</span>
                </div>
              )}
            </div>

            {LANGUAGE.map((item, index) => (
              <div className="block-container" key={index}>
                <div className="all-skills">
                  {(LANGUAGE.length > 1 || LANGUAGE.length <= 1) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeLanguages(index)}
                    ></i>
                  )}

                  <div className="row mobile-row">
                    <div className="col-lg-6">
                      <label>Language</label>
                      <input
                        type="text"
                        name="LANGUAGE_NAME"
                        value={item.LANGUAGE_NAME}
                        onChange={(e) => this.handleLanguageChange(index, e)}
                        className="form-control"
                        placeholder="Language"
                      />
                    </div>
                    <div className="col-lg-6">
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
                    <div
                      className="col-lg-12 pt-3"
                      style={{
                        display: "none",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <input
                          // class="form-control"
                          value={item.READ}
                          type="checkbox"
                          name="READ"
                          onChange={(e) => this.handleLanguageChange(index, e)}
                          id="flexRadioDefault1"
                        />
                        <label class="" for="flexRadioDefault1">
                          Read
                        </label>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <input
                          // class="form-control"
                          value={item.WRITE}
                          type="checkbox"
                          name="WRITE"
                          onChange={(e) => this.handleLanguageChange(index, e)}
                          id="flexRadioDefault2"
                        />
                        <label class="" for="flexRadioDefault2">
                          Write
                        </label>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <input
                          // class="form-control"
                          value={item.SPEAK}
                          type="checkbox"
                          name="SPEAK"
                          onChange={(e) => this.handleLanguageChange(index, e)}
                          id="flexRadioDefault3"
                        />
                        <label class="" for="flexRadioDefault3">
                          Speak
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {LANGUAGE.length !== 0 && LANGUAGE.length - 1 === index && (
                  <div
                    className="add-blk add-skills btn-cv btn-info-cv mt-50 mobile-view-block-none"
                    onClick={(e) => this.addMoreLangauages(e)}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Language</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {LANGUAGE.length !== 0 && LANGUAGE.length - 1 === index && (
                    <div
                      className="add-blk add-skills btn-cv btn-info-cv mt-50"
                      onClick={(e) => this.addMoreLangauages(e)}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Language</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="clearfix"></div>

          <div className="form-group add-social mt-s  page-section" id="7">
            <h2>Add Social Links</h2>
            {SOCIAL.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreSocialLinks(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Social Links</span>
              </div>
            )}
            <div className="mobile-view-block">
              {SOCIAL.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreSocialLinks(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Social Links</span>
                </div>
              )}
            </div>
            {this.state.SOCIAL.map((item, index) => (
              <div className="block-container" key={index}>
                <div className="all-socials">
                  {(SOCIAL.length > 1 || SOCIAL.length <= 1) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeSocialLinks(index)}
                    ></i>
                  )}
                  <div className="row mobile-row">
                    <div className="col-lg-6">
                      <label>Social Name</label>
                      <select
                        style={{ width: "100%", paddingLeft: "6px" }}
                        name="SOCIAL_NAME"
                        value={item.SOCIAL_NAME}
                        onChange={(e) => this.handleSocialLinksChange(index, e)}
                      >
                        <option value="" >Select social name</option>
                        <option value="I">Instagram</option>
                        <option value="F">Facebook</option>
                        <option value="L">Linkedin</option>
                        <option value="G">Git</option>
                        <option value="T">Twitter</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label>Social Link</label>
                      <input
                        type="text"
                        name="SOCIAL_LINK"
                        value={item.SOCIAL_LINK}
                        onChange={(e) => this.handleSocialLinksChange(index, e)}
                        className="form-control"
                        placeholder="Social links"
                      />
                    </div>
                  </div>
                </div>

                {SOCIAL.length !== 0 && SOCIAL.length - 1 === index && (
                  <div
                    className="add-blk add-socials btn-cv btn-info-cv mt-50 mobile-view-block-none"
                    onClick={this.addMoreSocialLinks}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Social Link</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {SOCIAL.length !== 0 && SOCIAL.length - 1 === index && (
                    <div
                      className="add-blk add-socials btn-cv btn-info-cv mt-50"
                      onClick={this.addMoreSocialLinks}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Social Link</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="clearfix"></div>

          <div className="form-group add-interest mt-s  page-section" id="8">
            <h2>Add Interests</h2>
            {INTRESTS.length === 0 && (
              <div
                className="add-blk btn-cv btn-info-cv mobile-view-block-none"
                id="add-exp"
                onClick={(e) => this.addMoreIntrests(e)}
              >
                <i className="fa fa-plus"></i>
                <span>Add Interests</span>
              </div>
            )}
            <div className="mobile-view-block">
              {INTRESTS.length === 0 && (
                <div
                  className="add-blk btn-cv btn-info-cv"
                  id="add-exp"
                  onClick={(e) => this.addMoreIntrests(e)}
                >
                  <i className="fa fa-plus"></i>
                  <span>Interests</span>
                </div>
              )}
            </div>
            {INTRESTS.map((item, index) => (
              <div className="block-container" key={index}>
                <div className="all-socials">
                  {(INTRESTS.length > 1 || INTRESTS.length <= 1) && (
                    <i
                      class="ti-trash pull-right"
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "0 5px 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => this.removeIntrests(index)}
                    ></i>
                  )}

                  <div className="row mobile-row">
                    <div className="col-lg-12">
                      <label>Interests </label>
                      <input
                        type="text"
                        name="INTRESTS_NAME"
                        value={item.INTRESTS_NAME}
                        onChange={(e) => this.handleIntrestsChange(index, e)}
                        className="form-control"
                        placeholder="Interest"
                      />
                    </div>
                  </div>
                </div>

                {INTRESTS.length !== 0 && INTRESTS.length - 1 === index && (
                  <div
                    className="add-blk add-socials btn-cv btn-info-cv mt-50 mobile-view-block-none"
                    onClick={this.addMoreIntrests}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add Another Interests</span>
                  </div>
                )}
                <div className="mobile-view-block">
                  {INTRESTS.length !== 0 && INTRESTS.length - 1 === index && (
                    <div
                      className="add-blk add-socials btn-cv btn-info-cv mt-50"
                      onClick={this.addMoreIntrests}
                    >
                      <i className="fa fa-plus"></i>
                      <span>Interests</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <hr className="mt-100" />
          <input
            type="button"
            name="submit"
            value="Choose Template"
            className="btn-sub"
            style={{ textAlign: "center", padding: "10px 15px" }}
            onClick={(e) => this.onSubmit(e)}
          />
          {/* <a href={constant.component.ResumeChooseTemplate.url}>
          <button
            
            className="btn-sub"
            style={{ textAlign: "center", padding: "10px 0" }}
            
            >
            Choose Template
          </button></a> */}
        </form>

        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"  />

      </React.Fragment>
    );
  }
}
