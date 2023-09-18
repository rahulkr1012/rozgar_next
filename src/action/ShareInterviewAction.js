import axios from "axios"
import { getCandidateAuthHeader } from "../utils";

export const SkillsForInterview = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/skillsforinterview`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const CompanyLists = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/skillsforinterview-companyList`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const DepartmentLists = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/interview-departmentList`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const AddInterviewUpdate = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/iq-addinterview-update`;
    return axios.post(url,data,getCandidateAuthHeader()).then((res) => {
       return res.data
    })
};
export const totalCount = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/share-last-interview-questions`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};