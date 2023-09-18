import {ITSkillList, searchJobBy } from '@/actions/jobsByAction';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import styles from '../../../styles/Home.module.css'


function index({jobs , title}) {

  let dynamic_title = title.split('-').join(" ")
  let disc = dynamic_title + "-Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"
    
  return (    
      <React.Fragment>
       
        <div className={styles.blogs} >
            <Head>
         <title> {dynamic_title+'Jobs - Rozgar.com'}  </title>
         <meta name="HandheldFriendly" content="True" />
         <meta name="description" content={ dynamic_title + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
         <meta name="referrer" content="no-referrer-when-downgrade" />
         <meta name="viewport" content="width=device-width, initial-scale=1"/>
         <meta property="og:site_name" content="Rozgar.com" />
         <meta property="og:title" content={dynamic_title} />
         <meta property="og:description" content={disc} />
         <meta property="og:image" itemprop="image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
         <meta property="og:type" content="website" />
         <meta property="og:updated_time" content="1440432930" />
         
         <meta property="og:site_name" content="Rozgar.com" />
         <meta property="og:title" content={ `Jobs in  ${dynamic_title} | Rozgar.com`} />
         <meta property="og:description" content={dynamic_title + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
         <meta property="og:url" content= {"https://rozgar.com/" + this.props.router.asPath}  />
         <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
         <meta property="og:image:width" content="4000" />
         <meta property="og:image:height" content="6000" />
         
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={`Jobs in  ${dynamic_title} | Rozgar.com`} />
         <meta name="twitter:description"  content={dynamic_title + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
         <meta name="twitter:url"content= {"https://rozgar.com/" + this.props.router.asPath} />
         <meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
         <meta name="twitter:label1" content="Written by" />
         <meta name="twitter:data1" content="Smita Nag" />
         <meta name="twitter:label2" content="Filed under" />
         <meta name="twitter:data2" content="Career Advice, Career Insights" />
         <meta name="twitter:site" content="@rozgar_india"  />
         <link rel="canonical" href={"https://rozgar.com" + this.props.router.asPath} />
        </Head>

         <h1> dynamc jobs  </h1>
          
        
        </div>

        
    </React.Fragment>
  )
}



// export const getStaticPaths = async ()=>{
    
//     let jobs_by_skills =await ITSkillList()
//      let urls = jobs_by_skills.result.list.map((ele,index)=> {return { params:{keyword: ele.URL }}})
//      console.log("urlsurlsurls" , urls );
    
//   return {
//         paths:urls,
//         fallback:false
//      }     
//   }

export async function getServerSideProps(context) {
 
  let { params } =  context
   
  let url = params.keyword
   
  let model = {
    LIMIT : 25 ,
    URL:  url ,
    page: 1 ,
    filter: {} 
   }

   let jobs_by_skill = await searchJobBy(model)
     
    return {
   props:{
       jobs:jobs_by_skill.result.list,
       title:url
    } ,
  }

}

 

export default index
