import axios from "axios";
 

export const premiumCityList = () => {

try{ 
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-premium-city-list`;
     return axios.get(url).then((res) => {
    
        return res.data;
    })
     
 }catch(err) {     
    return err
 }
 
}




export const jobCountByTopCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-job-count-by-top-category`;
    return axios.get(url).then((res) => {
        return res.data;
    }).catch(err=>{
         return err 
    })
};


export const topPremiumFeaturedCompanyList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-premium-featured-company-list`;
    return axios.get(url).then((res) => {
        return res.data;
    }).catch(err=>{
        return err 
    })
};



export const topCompanyImages = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rzg-top-company-images`;
    return axios.get(url).then((res) => {
       
        return res.data;
    }).catch(err=>{
        return err 
    })
};



