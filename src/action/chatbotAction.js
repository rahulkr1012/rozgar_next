import  axios from "axios";

export const chatbot = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-chatbot`;
    return axios.post(url,body).then((res) => {
        return res.data;
    })
};