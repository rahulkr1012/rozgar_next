// pages/sitemap.xml.js

import React from 'react';
import { ITSkillList, NonITSkillList } from '@/actions/jobsByAction';
const Sitemap = () => {};

export async function getServerSideProps({ res }) {
  const date = new Date();

  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  
  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/'; // Replace with your website URL
  let jobs_by_ITskills = await ITSkillList();
  let jobs_by_NonITskills = await NonITSkillList(); 
  const sitemapItems = jobs_by_ITskills.result.list.map((item) => {
    return `
        <url>
          <loc>${baseUrl}${item.URL}-jobs</loc>
	<lastmod>${formattedDate}</lastmod>
        </url>
      `;
    }).join('');
    const sitemapItem = jobs_by_NonITskills.result.list.map((item) => {
        return `
            <url>
              <loc>${baseUrl}${item.URL}-jobs</loc>
        <lastmod>${ formattedDate}</lastmod>
            </url>
          `;
        }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItems}
      ${sitemapItem}
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
