// pages/sitemap.xml.js

import React from 'react';
import { companyList } from "@/action/jobsByActions";
import { FunctionalAreaList, IndustryList, locationList, premiumCityList } from '@/actions/jobsByAction';
const Sitemap = () => {};

export async function getServerSideProps({ res }) {
  const date = new Date();

  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  
  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/'; // Replace with your website URL

  let jobs_by_location = await locationList();
  let jobs_by_top_location = await premiumCityList();
  const CITY_LIST = jobs_by_location.result.city
  const sitemapItems = jobs_by_location.result.state.map((item) => {
    return `
        <url>
          <loc>${baseUrl}jobs-in-${item.URL}</loc>
	<lastmod>${formattedDate}</lastmod>
        </url>
      `;
    }).join('');
 const sitemapItem  = CITY_LIST.length > 0 && CITY_LIST.map((item, index) => {
        for (const [key, value] of Object.entries(item)) {
            return (
                        value.length && value.map((item, index) => {
                            return `
                            <url>
                                      <loc>${baseUrl}jobs-in-${item.URL}</loc>
                            <lastmod>${formattedDate}</lastmod>
                                   </url>
                            
                            `
                        })

                   )
        }
    })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItem}
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
