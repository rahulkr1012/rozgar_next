import axios from "axios"

export const mobile_view_resume_data = (input) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get-resume-json?encoded_string=${input}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};