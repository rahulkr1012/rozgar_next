import React from 'react'
import Loader from 'components/Loader'
import dynamic from 'next/dynamic'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'
let LoansAndAdvances  =dynamic(()=> import('components/loans_advances') ,  { 
    loading:()=> <Loader /> , 
    ssr:false 
} ) 

function index(props) {
   
  const [state, setstate] = React.useState({
    ud:props.ud
  })
   
  return (
    <React.Fragment>

  <Head>
  
  <title >Apply For Education Loan - Rozgar.com</title>
  <meta name="HandheldFriendly" content="True" />
    <meta name="description" content={ "Loans & Advances" + " - You've done almost all the hard work to turn your dream into reality. We can help you cross the finish line. With an Rozgar education loan in India, you can focus on your course in the institute of your dreams and we'll take care of all the finances. From college tuition to living expenses, we'll help you deal with all the costs!"} />
    <meta name="referrer" content="no-referrer-when-downgrade" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <meta property="og:site_name" content="Rozgar.com" />
    <meta property="og:title"content={ "Apply For Education Loan - Rozgar.com"} />
    <meta property="og:description" content={ "Education-Loan" + " - You've done almost all the hard work to turn your dream into reality. We can help you cross the finish line. With an Rozgar education loan in India, you can focus on your course in the institute of your dreams and we'll take care of all the finances. From college tuition to living expenses, we'll help you deal with all the costs!"} />
    <meta property="og:url" content= {"https://rozgar.com/loans-and-advances"}  />
    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
    <meta property="og:image:width" content="4000" />
    <meta property="og:image:height" content="6000" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={"Apply For Education Loan - Rozgar.com"} />
    <meta name="twitter:description"  content={ "Loans & Advances" + " - You've done almost all the hard work to turn your dream into reality. We can help you cross the finish line. With an Rozgar education loan in India, you can focus on your course in the institute of your dreams and we'll take care of all the finances. From college tuition to living expenses, we'll help you deal with all the costs!"} />
    <meta name="twitter:url"content= {"https://rozgar.com/loans-and-advances"} />
    <meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
    <meta name="twitter:label1" content="Written by" />
    <meta name="twitter:data1" content="Smita Nag" />
    <meta name="twitter:label2" content="Filed under" />
    <meta name="twitter:data2" content="Career Advice, Career Insights" />
    <meta name="twitter:site" content="@rozgar_india" />
    <link rel="canonical" href="https://rozgar.com/loans-and-advances" /> 
    </Head>
     
      <FilteredHeader ud={state.ud}  />
       
      <LoansAndAdvances />
     
    </React.Fragment>
  )
}

export default index

export async function getServerSideProps({ req }) {
  
  let ud = getLoggedInUserData(req)
  return {
    props: {
       ud
    }
  }


}


