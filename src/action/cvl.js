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