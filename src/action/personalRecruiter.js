import axios from "axios";
import { getCandidateAuthHeader } from "../utils";

export const PersonalRecruiterServices = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-personal-recruiter-services`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const PersonalRecruiterPackages = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-personal-recruiter-packages`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const purchasePersonalRecruiterService = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-purchase-personal-recruiter-package`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const savePersonalRecruiterPaymentDetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-save-personal-recruiter-payment-detail`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const PaymentDetail = (TXN_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-personal-recruiter-payment-detail?TXN_ID=${TXN_ID}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};



export const purchaseResume = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-purchase-resume`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const saveResumePaymentDetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-save-resume-payment-detail`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};