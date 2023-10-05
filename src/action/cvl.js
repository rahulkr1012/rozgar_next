import  axios from "axios";
import { getCandidateAuthHeader } from "utils";

export const deleteCvl = (CVL_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/delete-cover-letter-by-id?CVL_ID=${CVL_ID}`;
    return axios.get(url ,getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};
export const updateCvlByCvlId = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/update-cover-letter-by-id`;
    return axios.post(url, model , getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};
 
export const adsuserregistrationstep2 = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rza-create-ads-user-step-two`;
    return axios.post(url,model).then((res) => {
        return res.data;
    })
};

export const parseAndUpdateResume = (file_url) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/download-and-parse`;
    return axios.post(url,{ path:file_url} , getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};


export const generate_candidate_summary = (model) => {
    debugger
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/generate-summary`;
    return axios.post(url, {model} , getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};

export const setCurrentSummary = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/set-primary-summary`;
    return axios.post(url,model, getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};



export const saveForLaterSummary = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/save-for-later-summary`;
    return axios.post(url,model, getCandidateAuthHeader() ).then((res) => {
        return res.data;
    })
};