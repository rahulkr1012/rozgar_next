// pages/sitemap.xml.js
import { Jobskeywordinindia, Jobskeywordsearchindia } from '@/action/jobDetail';
import React from 'react';
const Sitemap = () => { };

export async function getServerSideProps({ res }) {
  const date = new Date();
  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/full-stack-jobs/'; // Replace with your website URL
 const count= await Jobskeywordinindia(1)
  const totalPages = 500;
  const allData = [];
  for (let page = 1; page <= 250; page++) {
    const response = await Jobskeywordinindia(page);
    const responselist = response.result.list
    allData.push(...responselist); // Concatenate new data to existing data
  }
  const allDatalist = allData.map((item) => {
    return `
    <url>
      <loc>${baseUrl}${item.KEYWORD_URL}</loc>
      <lastmod>${formattedDate}</lastmod> 
    </url>
  `
  }) 
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allDatalist.join('')}
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
