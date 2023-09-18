import { getLoggedInUserData } from 'nextCookie'
import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import constant from 'constant';
import resume02 from 'src/assets/img/demos/demo-view-3.png';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
 function index({ud}) {
    
      const [state, setstate] = React.useState({
        ud: ud!=null?JSON.parse(ud[constant.keys.cd]):false ,
        userDetail:ud  
      }); 
   
    const { candidateID } = state.ud 
 
    return (
    <React.Fragment>
     
    <Head>
    <title>  {"Template Preview02 - Rozgar.com"} </title> 
    <meta name="HandheldFriendly" content="True" />
    <meta name="description" content={" Create your Free CV Online - Use " + constant.title.TemplatePreview02 + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="referrer" content="no-referrer-when-downgrade" />

    {/* og meta tag */}
    <meta property="og:site_name" content="Rozgar.com" />
    <meta property="og:title" content={"Template Preview02 - Rozgar.com"} />
    <meta property="og:description" content={" Create your Free CV Online - Use " + "Template Preview02 - Rozgar.com"+ "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
    <meta property="og:url" content={"https://rozgar.com/template-preview02"} />
    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
    <meta property="og:image:width" content="4000" />
    <meta property="og:image:height" content="6000" />

    {/* Twitter Meta Tag */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={"https://rozgar.com/template-preview02"} />
    <meta name="twitter:description" content={" Create your Free CV Online - Use " + "Template Preview02 - Rozgar.com" + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
    <meta name="twitter:url" content={"Template Preview02 - Rozgar.com"} />
    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
    <meta name="twitter:label1" content="Written by" />
    <meta name="twitter:data1" content="Smita Nag" />
    <meta name="twitter:label2" content="Filed under" />
    <meta name="twitter:data2" content="Career Advice, Career Insights" />
    <meta name="twitter:site" content="@rozgar_india" />
    <link rel="canonical" href={"https://rozgar.com/template-preview02"} />
    </Head>

    <FilteredHeader ud={state.userDetail} />

       <section className="blog-area section-padding-150-100">
       <div className="container">
           <div className="section-heading text-center">
               <div className="dream-dots justify-content-center">
                   <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
               </div>
               <h2 className="bold">Template Preview</h2>
               <p>Wide selection of designs. Carefully optimised for clarity and impact. One click layouts - no formatting required.</p>
           </div>
           <div className="row">
               <div className="col-12 col-md-9">
                   <div>
                       <div className="blog_thumbnail">
                           <Image src={resume02} className="temp-img" alt=" template preview" />
                       </div>
                   </div>
               </div>
               <div className="col-12 col-md-3">
                   <div className="sidebar-area">
                       <div className="temp-summary mt-4">
                           <p>Standing out. Professional. Recruiter-approved. Ready in minutes with our step-by-step builder.</p>
                           <Link className="dream-btn width-100" href={candidateID ? constant.component.updateTemplate01.url : constant.component.TemplateEdit01.url}>Try This Template </Link>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </section>

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
