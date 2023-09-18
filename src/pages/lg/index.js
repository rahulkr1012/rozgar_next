import { Button } from "react-bootstrap"
import { useCookies } from "react-cookie"
import { candidateLogin } from "@/action/CandidateAction"
import React from "react"
import CONSTANT from "constant"
import { Alert } from "react-bootstrap"
const Login = () => { 
     
    const [ cookie, setCookie] = useCookies(["ud.rozgar.com"])


const handleSignInx = async () => {

    let model = { 
            EmailId: "skntjee@gmail.com" ,
            Password :"sknt987"
          }
     
    try {
      const response = await candidateLogin(model) //handle API call to sign in here.
        const userData = response    
         
         setCookie(CONSTANT.keys.cd, JSON.stringify(userData.result), {
        path: "/",
        maxAge: 3600,     // Expires after 1hr
        sameSite: true,  
     }) 
     
     setCookie(CONSTANT.keys.ctoken , JSON.stringify(userData.result.token), {
      path: "/",
      maxAge: 3600,     // Expires after 1hr
      sameSite: true,  
   })

      
     alert("shashi kant logged in ")
      
    } catch (err) {
      console.log(err)
    }
  }
  
  const signout =()=>{

    res.removeHeader('Set-Cookie')
     alert("lgged out ")
     
  }


  

return (
    <React.Fragment>
      <label htmlFor="username">
         <Button  onClick={handleSignInx}   > login </Button> 
         <Button  onClick={signout}   > singout  </Button> 
      </label>
    </React.Fragment>
  )
}
export default Login