// pages/sitemap.xml.js

import React from 'react';
import getAllUrls from '@/geturls';
const Sitemap = () => {};

export async function getServerSideProps({ res }) {
  const date = new Date();

  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Format the time zone offset
  const timeZoneOffsetHours = Math.floor(Math.abs(date.getTimezoneOffset()) / 60);
  const timeZoneOffsetMinutes = Math.abs(date.getTimezoneOffset() % 60);
  const timeZoneSign = date.getTimezoneOffset() < 0 ? '+' : '-';
  
  const formattedDate = `${year}-${month}-${day}`;
  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/sitemap'; // Replace with your website URL
  const urls=getAllUrls();
  console.log(urls,"urls");
  const sitemapItems = urls.map((url) => {
    if(url=='/remote-jobs'||url=='/walk-in-jobs'||url=='/work-from-home-jobs'||url=='/fresher-jobs'
    ||url=='/part-time-jobs'||url=='/jobs-by-location'||url=='/jobs-by-designation'||url=='/jobs-by-company'
    ||url=='/jobs-by-category'||url=='/jobs-by-skill'||url=='/government-jobs'||url=='/blog'||url=='/jobs'
   ||url=='/job-search-india' ){
      return `
        <url>
          <loc>${baseUrl}${url}.xml</loc>
	<lastmod>${formattedDate}</lastmod>
        </url>
      `;
    }}).join('');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItems}
      <url>
<loc>${baseUrl}/home.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-delhi.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-noida.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-chandigarh.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-mumbai.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-hyderabad.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-gurugram.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-chennai.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-pune.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-lucknow.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/full-stack-developer-jobs-in-india-one.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/full-stack-developer-jobs-in-india-two.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url> 
<loc>${baseUrl}/full-stack-developer-jobs-in-india-three.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/jobs-in-bangalore.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/interview-questions-by-role.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/interview-questions-by-skill.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
<url>
<loc>${baseUrl}/interview-question-by-company.xml</loc>
<lastmod>${formattedDate}</lastmod>
</url>
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
