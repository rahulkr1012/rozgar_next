import axios from "axios";

export const interviewByCompany = (EMPLOYER_ID) =>{
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/by-Company-Questions?EMPLOYER_ID=${EMPLOYER_ID}`;
    return axios.get(url).then((res)=>{
        return res.data;
    })
};
export const CompanyQuestionSearch = (body) =>{
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/search-company-question-answer`;
    return axios.post(url,body).then((res)=> {
        return res.data
    })
}
export const KeywordSearch = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/keyword-search-interview?KEYWORD=${KEYWORD.replaceAll("'","''")}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const IQITSkillList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-it-jobs-by-skill-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const IQNonITSkillList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-non-it-jobs-by-skill-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const IQDesignationList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-jobs-by-designation-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const IQcompanyList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-jobs-by-company-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};


export const getInterviewQuestionId = (interview_url) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get-interview-question-id/${interview_url}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
    

    
    
