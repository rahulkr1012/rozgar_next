import  axios from "axios";
import { getCandidateAuthHeader } from "utils";

export const statistics = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-dashboard-statistics`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};


// export const KeywordSearch = (data) => {
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/keyword-search?KEYWORD=${data.KEYWORD}`;
//     return axios.get(url).then((res) => {
//         return res.data;
//     })
// };


 
export const jobCountByTopCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-job-count-by-top-category`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const topCompanyList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-company-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};


export const topPremiumFeaturedCompanyList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-premium-featured-company-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};



export const topCompanyImages = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-company-images`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};



export const KeywordSearch = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/keyword-search?KEYWORD=${KEYWORD.replaceAll("'","''")}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const LocationSearch = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/location-search?KEYWORD=${KEYWORD}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};



export const reportIssue = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-report-an-issue`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};

export const uploadIssueScreenShot = (file) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-issue-screenshot`;
    return axios.post(url, file).then((res) => {
        return res.data;
    })
};

export const searchJobs = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/job-search`;
    return axios.post(url, KEYWORD).then((res) => {
        return res.data;
    })
};

export const applyJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ApplyJobs`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const getJobQuestion = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/job-questions?JOB_ID=${model.JOB_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}
export const IQTotalSkillById = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/count-by-iq-skillid?SKILL_ID=${body.SKILL_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}
export const IQTotalCompanyById = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/count-by-iq-companyid?COMPANIES=${body.COMPANIES}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}
export const IQTotalDesignationById = (body) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/count-by-iq-designationid?ROLES=${body.ROLES}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
}

export const getGlobalSetting = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/global-settings-details`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};