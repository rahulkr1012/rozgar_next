import { getPopularVideoJdJobs, getPrmiumJobsandfe } from "@/action/CandidateAction";
import { IQTotalCompanyById, IQTotalDesignationById, IQTotalSkillById, jobCountByTopCategory, topCompanyImages, topPremiumFeaturedCompanyList } from "@/action/dashboard";
import { premiumCityList } from "@/actions/jobsByAction";
import fs from 'fs'
import axios from "axios";

export default async function handler(req, res) {
   let QuestionDetails = [13, 58, 11, 1]
   let CompanyQuestionDetails = [6, 8, 17, 1]
   let RolesQuestionDetails = [2272, 171, 226, 262]
   let QIdRoleCountData = [];
   let QIdSkillCountData = [];
   let QIdCompanyCount = [];
   const premiumCityListRes = await premiumCityList()
   const topCompanyImagesRes = await topCompanyImages()
   const topPremiumFeaturedCompanyListRes = await topPremiumFeaturedCompanyList()
   const jobCountByTopCategoryRes = await jobCountByTopCategory()
   const PremiumFeaturedJobs = await getPrmiumJobsandfe()
   const PopularVideoJdJobsRes = await getPopularVideoJdJobs()
   await Promise.all(CompanyQuestionDetails.map(async (item) => {
      const modal = {
         COMPANIES: item
      }
      let res = await IQTotalCompanyById(modal)
      if (res.result.length > 0) {
         QIdCompanyCount.push(res.result[0])
      }

   }))


   await Promise.all(RolesQuestionDetails.map(async (item) => {
      const modal = {
         ROLES: item
      }

      let res = await IQTotalDesignationById(modal)
      if (res.result.length > 0) {
         QIdRoleCountData.push(res.result[0])
      }

   }))

   await Promise.all(QuestionDetails.map(async (item) => {
      const modal = {
         SKILL_ID: item
      }

      let res = await IQTotalSkillById(modal)
      if (res.result.length > 0) {
         QIdSkillCountData.push(res.result[0])
      }
   }))

   const result = {
      premiumCityListRes: premiumCityListRes.result,
      topCompanyImagesRes: topCompanyImagesRes.result,
      topPremiumFeaturedCompanyListRes: topPremiumFeaturedCompanyListRes.result,
      jobCountByTopCategoryRes: jobCountByTopCategoryRes.result,
      PremiumFeaturedJobs: PremiumFeaturedJobs.result.premiumJobList,
      QIdRoleCountData: QIdRoleCountData,
      QIdSkillCount: QIdSkillCountData,
      QIdCompanyCount: QIdCompanyCount,
      popularVideoJdJobs: PopularVideoJdJobsRes.result.premiumJobList
   }
   fs.writeFile("./components/JSON/homepage.json", JSON.stringify(result), (err) => {
      if (err)
         console.log(err);
   });
   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/update-homepage-data`;
   await axios.put(url, { json: result })

   res.status(200).json({ result: 'homepage data updated successfully' })

}