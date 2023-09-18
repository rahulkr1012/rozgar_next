import axios from "axios";
import { getCandidateAuthHeader } from "utils";

export const ITSkillList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-it-jobs-by-skill-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const NonITSkillList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-non-it-jobs-by-skill-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const getAllJobList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/all-jobs-url`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
export const Couponlist = (page) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-rewards-list?page=${page}&limit=${10}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};


export const DesignationList = async (type) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-jobs-by-designation-list?KEYWORD=${type?type:""}`;
    return  axios.get(url).then((res) => {
        return res.data  ;
    })
};


export const FunctionalAreaList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-jobs-by-functional-area-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};


export const IndustryList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-jobs-by-industry-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const companyList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-jobs-by-company-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const locationList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-jobs-by-location-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};

export const jobsearchByFunctionalArea = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-find-job-by-functional-area`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};

export const searchJobBy = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-search-job-by`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};


export const premiumCityList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-premium-city-list`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};



export const inquiryForm = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-maintanance-enquiry`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};


export const searchJobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/job-search`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};

export const rozgarcompanydetail = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-company-detail`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};


export const latestfresherjobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/latest-frehser-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const remotejobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/remote-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const walkInjobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/walk-in-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const workFromHomejobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/work-from-home-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const VideoJDJob = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/video-jd-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};
export const partTimejobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/part-time-jobs`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};

export const hiringfresherjobs = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/hiring-frehser-job`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};


export const PersonalRecruiterEnquiry = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-personal-recruiter`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};

export const InternationalEnquiryForm = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/international-visa-enquiry-form`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};

export const CandidateHiringEnquiryForm = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-hiring-enquiry-form`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};

export const EducationLoanEnquiry = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/education-loan`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};

export const createJobAlert = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/create-job-alert`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    
    })
};

export const AddBannerAnalytics = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/add-banner-analytics`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};
export const AddAffliateAnalytics = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/add-affliate-analytics`;
    return axios.post(url , model ).then((res) => {
        return res.data;
    })
};

export const selectCountry = () => {
    return axios.get("https://geolocation-db.com/json/").then((res) => {
        return res.data;
    })
};