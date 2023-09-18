import axios from "axios";

export const unsubscribe = (CANDIDATE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe-candidate?CANDIDATE_ID=${CANDIDATE_ID}`;
    return axios.get(url)
};

export const emailClicked = (id) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/email-clicked?id=${id}`;
    return axios.get(url)
}