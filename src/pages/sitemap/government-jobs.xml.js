// pages/sitemap.xml.js

import { getGovermentList } from '@/action/dashboard';
import React from 'react';
const Sitemap = () => {};

export async function getServerSideProps({ res }) {
  const date = new Date();

  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0'); 
  const formattedDate = `${year}-${month}-${day}`;
  
  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/government-jobs/'; // Replace with your website URL
  let gorvList = await getGovermentList();
  const sitemapItems = gorvList.result.city.map((item) => {
    return `
        <url>
          <loc>${baseUrl}${item.URL}</loc>
	<lastmod>${formattedDate}</lastmod>
        </url>
      `;
    }).join('');

 

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItems}
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
