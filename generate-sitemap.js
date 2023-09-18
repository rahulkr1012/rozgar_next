const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');
const path = require('path');


sitemap({
    alternateUrls: {
      en: "https://rozgar.en",
      es: "https://rozgar.es",
      ja: "https://rozgar.jp",
      fr: "https://rozgar.fr",
    }, 
    baseUrl: "https://rozgar.com",
    ignoredPaths: ["admin"],
    extraPaths: ["/extraPath"],
    pagesDirectory: __dirname + "\\pages",
    targetDirectory: "static/",
    sitemapFilename: "sitemap.xml",
    nextConfigPath: __dirname + "\\next.config.js",
    ignoredExtensions: ["png", "jpg"],
    pagesConfig: {
      "/login": {
        priority: "0.5",
        changefreq: "daily",
      },
    },
    sitemapStylesheet: [
      {
        type: "text/css",
        styleFile: "/test/styles.css",
      },
      {
        type: "text/xsl",
        styleFile: "test/test/styles.xls",
      },
    ],
  });