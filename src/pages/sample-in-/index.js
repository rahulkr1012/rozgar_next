import { useRouter } from 'next/router'
import React from 'react'

function index() {
   let router = useRouter()

  
       
     return (
        <div>
         
         d ynamic keyword                             hi
         
          </div>
     )
   
}


export async function getServerSideProps(context) {


 return {
      props:{
           data:"sata "
      }
 }     
}

export default index
