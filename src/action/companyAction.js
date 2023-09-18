import  axios from "axios";
import { getAuthHeader, getCandidateAuthHeader } from "../utils";

export const companylist = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-list?page=${data.page}`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const companyDetail = (Link) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-detail`;
    return axios.post(url, { LINK: Link }).then((res) => {
        return res.data;
    })
};

export const nonregularcompanylist = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-non-regular-company-list?page=${data.page}`;
    return axios.post(url, data).then((res) => {
        return res.data;
    })
};

export const companyFilterData = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-filter-data`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const FollowCompany = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-follow`;
    return axios.put(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

 

export const isFollowedByMe = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-is-followed-by-me`;
    return axios.put(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};

export const companykeyword = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-keyword?KEYWORD=${KEYWORD}`;
    return axios.post(url).then((res) => {
        return res.data;
    })
};

