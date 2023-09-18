import  axios from "axios";

export const adsuserregistrationstep1 = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rza-create-ads-user-step-one`;
    return axios.post(url,model).then((res) => {
        return res.data;
    })
};
export const reSendOTP = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/resend-otp`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const adsuserregistrationstep2 = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rza-create-ads-user-step-two`;
    return axios.post(url,model).then((res) => {
        return res.data;
    })
};