import { getLoggedInUserData } from 'nextCookie'
import React from 'react'
import FilteredHeader from 'components/Filtered_Header'

function index(props) {
     let {ud} = props 
     
  return (
    <React.Fragment>
  
     <FilteredHeader ud={ud}  />
     /template-update01
    </React.Fragment>
  )
   

}




export async function getServerSideProps({req}) {
    let ud = getLoggedInUserData(req)
    return {
       props:{
         ud:ud
       }
     }
  }
  



export default index
