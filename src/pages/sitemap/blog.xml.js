// pages/sitemap.xml.js

import React from 'react';
import { Allbloglist, blogList, blog_list } from '@/actions/jobsByAction';
const Sitemap = () => {};

export async function getServerSideProps({ res }) {  
const date = new Date();
// Format the date components
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(date.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

  const baseUrl = process.env.BASE_URL || 'https://rozgar.com/blog/'; // Replace with your website URL
  let blog_list = await Allbloglist()
  const sitemapItems = blog_list.result.list.map((url) => {
      return `
        <url>
          <loc>${baseUrl}${url.URL}</loc>
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
