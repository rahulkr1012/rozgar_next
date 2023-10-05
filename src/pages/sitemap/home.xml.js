// pages/sitemap.xml.js

import React from 'react';
import { jobCountByTopCategory, topCompanyImages, topPremiumFeaturedCompanyList } from '@/action/dashboard';
import { getPrmiumJobsandfe } from '@/action/CandidateAction';
import { ToSeoUrl } from 'utils';
import moment from 'moment';
import { premiumCityList } from '@/actions/jobsByAction';

const Sitemap = () => { };

export async function getServerSideProps({ res }) {
  const date = new Date();

  let company_hiring = await topCompanyImages()
  const jobCountByTopCategoryRes = await jobCountByTopCategory()

  const PremiumFeaturedJobs = await getPrmiumJobsandfe()
  const premiumCityListRes = await premiumCityList()
  console.log(premiumCityListRes.result.city, "premiumCityListRes")
  const topPremiumFeaturedCompanyListRes = await topPremiumFeaturedCompanyList()
  const premiumCityListResList = premiumCityListRes.result.city
  const premiumjob = topPremiumFeaturedCompanyListRes.result.premium
  const featuredjob = topPremiumFeaturedCompanyListRes.result.featured


  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const baseUrl = 'https://rozgar.com/'; // Replace with your website URL
  const baseUrl2 = 'https://rozgar.com/job/'
  const companybaseurl = 'https://rozgar.com/company/'

  const CityListItem = premiumCityListResList.map((item) => {
    return `
      <url>
        <loc>${baseUrl}jobs-in-${item.URL}</loc>
<lastmod>${formattedDate}</lastmod>
      </url>
    `;
  }).join('');

  const jobCountByTopCategoryres = jobCountByTopCategoryRes.result.map((item, index) => {
    if (index < 10) {
      for (const [key, value] of Object.entries(item)) {
        return `<url>
        <loc>${baseUrl}${value.url}-jobs</loc>
<lastmod>${formattedDate}</lastmod>
      </url>
    `;
      }
    }
  }).join('');

  const featuredjobItem = featuredjob.map((item) => {
    const URL = item.URL
      ? item.URL + "-" + item.EMPLOYER_ID
      : "rozgar" + "-" + item.EMPLOYER_ID;
    return `
      <url>
        <loc>${companybaseurl}${URL}</loc>
<lastmod>${formattedDate}</lastmod>
      </url>
    `;
  }).join('');
  const premiumjobItem = premiumjob.map((item) => {
    const URL = item.URL
      ? item.URL + "-" + item.EMPLOYER_ID
      : "rozgar" + "-" + item.EMPLOYER_ID;
    return `
      <url>
        <loc>${companybaseurl}${URL}</loc>
<lastmod>${formattedDate}</lastmod>
      </url>
    `;
  }).join('');

  const sitemapItems = PremiumFeaturedJobs.result.premiumJobList.map((item) => {
    var a = item.CREATED_ON
      ? moment([
        parseInt(
          moment(item.CREATED_ON).format("YYYY")
        ),
        parseInt(
          moment(item.CREATED_ON).format("MM")
        ),
        parseInt(
          moment(item.CREATED_ON).format("DD")
        ),
      ])
      : "";
    var b = moment([
      parseInt(moment().format("YYYY")),
      parseInt(moment().format("MM")),
      parseInt(moment().format("DD")),
    ]);
    var days = b.diff(a, "days");
    const URL = item.COMPANY_NAME
      ? item.COMPANY_NAME + "-" + item.EMPLOYER_ID
      : "rozgar" + "-" + item.EMPLOYER_ID;

    let dynamicURLOne =
      ToSeoUrl(item.JOB_TITLE) +
      "-" +
      ToSeoUrl(item.COMPANY_NAME) +
      "-" +
      item.CITY?.toLowerCase().split(",").join("-") +
      "-" +
      item.JOB_ID;

    dynamicURLOne = dynamicURLOne.replace(/ /g, "");
    return `
      <url>
        <loc>${baseUrl2}${dynamicURLOne}</loc>
<lastmod>${formattedDate}</lastmod>
      </url>
    `;
  }).join('');

  const sitemapItem = company_hiring.result.images.map((item) => {
    return `
        <url>
          <loc>${baseUrl}${item.URL}-jobs</loc>
	<lastmod>${formattedDate}</lastmod>
        </url>
      `;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://rozgar.com/jobs-by-skill</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/jobs-by-designation</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/jobs-by-company</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/jobs-by-category</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/jobs-by-location</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/create-job-alert</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/fresher-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/remote-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/work-from-home-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/walk-in-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/part-time-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/most-popluar-video-jd-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/hot-sector-video-jd-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/most-liked-video-jd-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/list/companies</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/top-companies</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/resume-making</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/upgrade-skills</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/study-abroad</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/work-abroad</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/career-explorer</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/career-astrology</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/loans-advances</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/company-brandings</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/sponsored-jds</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/contractual-staffing</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/hrms</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/full-time-hiring</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/hr-technology-solutions</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/rewards</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/government-jobs</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/personal-recruiter</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
${sitemapItem} 
${sitemapItems}
${premiumjobItem}
${jobCountByTopCategoryres}
${featuredjobItem}
<url>
  <loc>https://rozgar.com/interview-questions/designations/software-engineer</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/designations/machine-learning-engineer</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/designations/devops-manager</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/designations/front-end-developer</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/skills/java</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/skills/python</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/skills/php</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/skills/networking</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/company/accenture</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/company/-cognizant</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/company/tata-consultancy-service</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
<url>
  <loc>https://rozgar.com/interview-questions/company/byju-s</loc>
  <lastmod>${formattedDate}</lastmod>
</url>
${CityListItem}
    </urlset> 
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
