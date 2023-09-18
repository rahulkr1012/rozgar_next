import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const getAllUrls = () => {
  const pagesDirectory = path.join(   __dirname , '/pages/');
  const fileNames = fs.readdirSync  (  pagesDirectory, { withFileTypes: true });

  const urls = fileNames
    .map((file) => {
      const filePath = path.join(pagesDirectory, file.name);
      const relativePath = path.relative(pagesDirectory, filePath);
      const urlPath = '/' + relativePath.replace(/\.js$/, '').replace(/index$/, '');
      return urlPath === '/index' ? '/' : urlPath;
    });

  return urls;
};

export default getAllUrls;
