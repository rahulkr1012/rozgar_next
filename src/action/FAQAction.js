import axios from "axios";

export const FAQList = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-faq-list?KEYWORD=${data.KEYWORD}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};


export const FAQbyId = (URL) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-faq-by-id?URL=${URL}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const FaqbyCategory = (URL, data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-faq-by-category?URL=${URL}&KEYWORD=${data.KEYWORD}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const FAQCategoryList = () => {
     
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-faq-category-list`;
     
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const FAQOurBlog = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-recent-blog-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const EnquirySubmit = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-enquiry`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
}



