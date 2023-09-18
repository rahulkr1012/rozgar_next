import axios from "axios";

export const interviewBySkill = (setSkillId) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/by-Skills?setSkillId=${setSkillId}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
 
export const interviewQuestionById = (questionId) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/questions-by-Skills?questionId=${questionId}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
 
export const CommonQuestionById = (questionId) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/common-questions-by-id?questionId=${questionId}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
 
export const addInterviewQuestionAnswer = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/add-Question-Answer`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
 
export const answerById  = (questionId) => {
    // console.log("questionId", questionId);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/answers-by-questionId?questionId=${questionId}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
     
};
export const latestjobs = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/latestJobs-bySkill`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const skillQuestionAnswer = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search-skills-question-answer`;
    return axios.post(url, body).then((res) => {
        return res.data
    })
}
export const DesignationQuestionSearch = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search-designation-question-answer`;
    return axios.post(url, body).then((res) => {
        return res.data
    })
}
export const CompanyQuestionAnswer = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search-company-question-answer`;
    return axios.post(url, body).then((res) => {
        return res.data
    })
}
export const interviewByDesignation = (DESIGNATION_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/by-Designation-Questions?DESIGNATION_ID=${DESIGNATION_ID}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const InterviewQuestionSkillByUrl = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-skills-by-url-list?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const InterviewQuestionSearch = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-search-by-keyword?KEYWORD=${KEYWORD}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const InterviewQuestionCompanyByUrl = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-Company-by-url-list?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const InterviewQuestionRolesByUrl = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-Roles-by-url-list?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const InterviewQuestionDesignationByUrl = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-designation-by-url-list?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
