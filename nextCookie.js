import { cookies } from 'next/headers';
import constant from 'constant';
export  async function myCookie() {
  const nextCookies = cookies();
  const theme = nextCookies.get(constant.keys.cd);
  return theme
}

 
export  function getLoggedInUserData(req) {  
     let ud = null
    if(req.cookies) {
        if(req.cookies[constant.keys.cd]) {
           ud = {
            [constant.keys.cd] : req.cookies[constant.keys.cd],
            [constant.keys.ctoken] : req.cookies[constant.keys.ctoken]
           }
        }
     } 
    return ud 
}

