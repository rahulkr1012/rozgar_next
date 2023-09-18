import constant from 'constant'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import {capFirstLetterInSentence} from 'utils'
import Loader from 'components/Loader'
let VideoJds  = dynamic(()=> import('components/homepage/VideoJds') , {loading:()=><Loader /> ,   ssr:false } )  
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import dynamic from 'next/dynamic' 

const index = (props) => {
     const [state, setstate ] = React.useState({
          ud:props.ud
     });
      
    //  const {ud}  = props 
    const router = useRouter()
     
    return (
        <React.Fragment>
            
                <FilteredHeader ud={state.ud} />
                 <VideoJds />
           </React.Fragment>
      )
}

export async function getServerSideProps(context) {
      const {req}  = context
     let ud = getLoggedInUserData(req)
 
    return {
        props: {
            ud
        }
    }

}
export default index
