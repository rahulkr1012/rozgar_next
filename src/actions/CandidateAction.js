import axios from "axios";
import { getCandidateAuthHeader, setsessionStorage, setStorage } from "utils";
import CONSTANT from "constant";

export const candidateRegister = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CandidateRegistration`;
    return axios.post(url, data).then((res) => {
        if (res.data.status) {
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setStorage(CONSTANT.keys.cd, res.data.result);
        }
        return res.data;
    })
};

export const LoginwithMobile = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CandidateLoginWithMob`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};


export const LoginMobileOtpVerify = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CandidateLoginOtpVerify`;
    
    return axios.post(url, data).then((res) => {
        console.log(res)
        if (res.data.status) {
            setStorage(CONSTANT.keys.cd, res.data.result);
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setsessionStorage(CONSTANT.keys.ctoken, res.data.result.token);
        }
        return res.data;
    })
};


export const candidateLogin = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CandidateLogin`;
    return axios.post(url, data).then((res) => {
        if (res.data.status) {
            setStorage(CONSTANT.keys.cd, res.data.result);
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setsessionStorage(CONSTANT.keys.ctoken, res.data.result.token);
            // setStorage(CONSTANT.keys.cLoggedIn, moment().format('X'));
            // setStorage(CONSTANT.keys.c_remeber_me, data.Remember);
        }
        return res.data;
    })
};

export const googleLoginAuth = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-login`;
    return axios.post(url, data).then((res) => {
        if (res.data.status) {
            setStorage(CONSTANT.keys.cd, res.data.result);
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setsessionStorage(CONSTANT.keys.ctoken, res.data.result.token);
            // setStorage(CONSTANT.keys.cLoggedIn, moment().format('X'));
            // setStorage(CONSTANT.keys.c_remeber_me, data.Remember);
        }
        return res.data;
    })
};

export const phoneVerification = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/phoneVerification`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const forgotPassword = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const resetPassword = (data) => {
    const header = {
        headers: { Authorization: "Bearer " + data.token }
    };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password-candidate`;
    return axios.post(url, data, header).then((res) => {
        return res.data;
    })
};

export const changePassword = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/update-candidate-password`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const uploadDocument = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UploadDocuments`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const reMobSendOTP = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/resend-mobile-otp`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const resendVerificationEmail = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ResendVerificationMail`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const googleLogin = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-login`;
    return axios.post(url, data).then((res) => {
        if (res.status) {
            setStorage(CONSTANT.keys.loginData, res.data.result.token);
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setStorage(CONSTANT.keys.cd, res.data.result);
            return res.data;
        }
    })
};

//Resume Headline
export const getResumeHeadLine = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetResumeHeadline`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const addUpdateResumeHeadLine = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateResumeHeadline`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//Profile Summary
export const getProfileSummary = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetProfileSummary`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const addUpdateProfileSummary = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdatePofileSummary`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};
export const AddEmployerReview = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddEmployerReview`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const updateEmployerReview = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/update-employer-review`;
    return axios.put(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const getCompanyReview = (CANDIDATE_ID, CANDIDATE_EMPLOYER_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employer-review-byId?CANDIDATE_ID=${CANDIDATE_ID}&CANDIDATE_EMPLOYER_ID=${CANDIDATE_EMPLOYER_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Get Candidate Detail
export const getCandidateDetail = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetCandidateData`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//Personal Detail
export const getPersonalDetail = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetPersonalDetails`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//Upload Resume
export const uploadResume = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UploadResume`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const deleteResume = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteResume`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const getFileDetail = (file) => {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/resume/${file.fileName}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};


//key Skills

export const getMasterSkillsList = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/skills-list`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const addKeySkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-add-skills`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const keySkillsList = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-skills-list`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const deleteKeySkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/delete-candidate-skill`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//Employment

export const getNoticePeriod = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/notice-period-list`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const CreateEmployment = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CreateEmployment`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const ListEmployment = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ListEmployment`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const UpdateEmployment = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateEmployment`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const DeleteEmployment = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteEmployment`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//IT skills

export const getITSkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ListItSkills`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const addITSkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddItSkills`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const updateITSkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateItSkills`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const deleteITSkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteItSkill`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

export const getITMasterSkills = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetItSkills`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
};

//Education
export const getQualificationTypeListsForJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/education`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getEduQualificationTypeListsForJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/course`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getCourseSpeczListForJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/specialization`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getEducationCourseType = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/course-type-list`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getGrading = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/grading-system-list`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const addEducationCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddEducation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const updateEducationCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateEducation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const listEducationCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ListEducation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const deleteEducationCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteEducation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Projects
export const getProjectRole = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetProjectRole`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const addProjectCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddProjects`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const updateProjectCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateProjects`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const listProjectCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetProjects`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const deleteProjectCandidate = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteProjects`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const employmentTypeLists = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employment-type`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const employmerLists = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/EmploymentDropdown`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Accomplishment

//onLine Profile

export const getOnlineProfileList = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetOnlineProfileList`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const AddOnlineProfile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddOnlineProfile`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const UpdateOnlineProfile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateOnlineProfile`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const DeleteOnlineProfile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteOnlineProfile`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

// Presentaion

export const GetPresentation = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetPresentation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const AddPresentation = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddPresentation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const UpdatePresentation = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdatePresentation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const DeletePresentation = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeletePresentation`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Certificate

export const AddCertifications = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddCertifications`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const UpdateCertifications = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateCertifications`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const DeleteCertifications = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteCertifications`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const GetCertifications = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetCertifications`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
//Career Profile

//Career Profile


//Work Sample

export const AddWorkSample = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddWorkSample`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const UpdateWorkSample = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateWorkSample`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const DeleteWorkSample = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteWorkSample`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const GetWorkSample = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetWorkSample`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const RecommendedJobs = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/recommended-jobs`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Personal Detail

export const AddPersonalDetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/AddPersonalDetails`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const UpdatePersonalDetails = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdatePersonalDetails`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

// export const  DeletePersonalDetail= (model) => {
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
//     return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
//         return res.data;
//     })
// };

export const GetPersonalDetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetPersonalDetails`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const GenderDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GenderDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const MaritalStatusDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/MaritalStatusDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const WorkPermitUSADropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/WorkPermitUSADropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const CastCategoryDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CastCategoryDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const CountryListDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CountryListDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//Career Profile

export const CityListDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CityListDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const JobTypeDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/JobTypeDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const EmploymentTypeDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/EmploymentTypeDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const JobIndustryDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/JobIndustryDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const FunctionalAreaDropdown = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/FunctionalAreaDropdown`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const RoleDropdown = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/RoleDropdown`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const updateCareerProfile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/updateCareerProfile`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const GetCareerProfile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetCareerProfile`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

//getResume

export const GetResume = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetResume`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getAllRecommendedJobs = (page) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/all-recommended-jobs?limit=20&page=${page}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getRecommendedJobs = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/recommended-jobs`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const getSimilarJobs = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SimilarJobs`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getapplicantsCount = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/applicants`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const getFeaturedJobs = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/FeaturedJobsList?web=true`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const FeaturedJobs = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/FeaturedJobsList?web=true`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};
export const getPremiumJobs = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/PremiumJobsList`;
    return axios.post(url, data, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const SaveJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SaveJobs`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const getPrmiumJobsandfe = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/PremiumJobsListSparckle`;
    return axios.get(url, data ).then((res) => {
        return res.data;
    })
};
export const getSaveJobList = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetSaveJobsList`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const appliedJobCount = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/applied-job-count`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


// ProfilePicture
export const uploadProfilePic = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UploadProfilePic`;
    return axios.post(url, body, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const getProfilePic = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetProfilePic`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

//ProfilePicture
export const myApplicationStatus = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/MyApplicationStatus`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}
export const deleteProfilePic = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/DeleteProfilePic`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const courseList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-course-list`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}
export const LoiList = (JOB_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/loi-form-data?JOB_ID=${JOB_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const acceptLetter = (OFFER_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-offer?OFFER_ID=${OFFER_ID}`;
    return axios.put(url, {}, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}


export const courseListById = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-course-by-id?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}
export const qaCourseCirculam = (COURSE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-course-circulam?COURSE_ID=${COURSE_ID}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}
export const qaFqaList = (COURSE_FAQS) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-fqa-list?COURSE_FAQS=${COURSE_FAQS}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}


export const stateList = (COUNTRY_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-state-list?COUNTRY_ID=${COUNTRY_ID}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}

export const cityList = (STATE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-city-list?STATE_ID=${STATE_ID}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
}


export const startcoursetransaction = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/start-course-transaction`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
}

export const savePaymentDetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/save-payment-details`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
}

export const coursepaymentdetails = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/course-payment-title`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
}

export const WriteResume = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/WriteResume`;
    return axios.post(url, model).then((res) => {
        if (res.data.status) {
            setStorage(CONSTANT.keys.ctoken, res.data.result.token);
            setStorage(CONSTANT.keys.cd, res.data.result);
        }
        return res.data
    })
};

export const CandidateMessage = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/send-candidate-message`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}




export const CandidateToRecruiterMessage = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/send-candidate-to-recruiter-message`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}


export const CommunicationListByJob = (model) => {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/communication-list-byjob`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const getMessage = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get-messages-candidate-employee`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}




export const getCollegeList = (pageNumber, KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/lyc-all-clg-list?pageNumber=${pageNumber}&KEYWORD=${KEYWORD}`
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const getSimilarCollegeList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/lyc-random-clg`
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const getCollegeDetail = (ENTITY_ALIAS) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/lyc-clg-details-by-url?ENTITY_ALIAS=${ENTITY_ALIAS}`
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        if (res.status) {
            return res.data;
        }
    })
}

export const getResumeData = (CANDIDATE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/GetResumeById?CANDIDATE_ID=${CANDIDATE_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const getSkillResume = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/skills-list-resume`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const checkCandidateEmail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CheckCandidateEmail`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const checkCandidateMobile = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/CheckCandidateMobile`
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const UpdateResume = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/UpdateResume`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data
    })
};
export const courseDetails = (COLLEGE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get-course-detailbyUrl?COLLEGE_ID=${COLLEGE_ID}`
    return axios.get(url).then((res) => {
        return res.data;
    })
}
