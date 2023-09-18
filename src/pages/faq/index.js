import { FAQCategoryList, FAQList, FAQOurBlog } from '@/action/FAQAction'
import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'
import Loading from 'components/Loader'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
let FAQDetail  = dynamic(()=> import('components/FAQ_Details') , {loading:()=><Loading /> ,  ssr:false} ) 
 
function index( props ) {
     
     
    let data = props.faq_cat_list.list
    let list = props.faq_list.list
    let FAQ_Blog_List = props.FAQ_Blog_List
  
     return (
    <React.Fragment>
     
    <Head>
<title > Frequently Asked Questions - Rozgar.com  </title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={ "FAQ" + " - Learn how to create Job profile, Search and Apply jobs and many more on  Rozgar.com."} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>

<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ "Frequently Asked Questions - Rozgar.com"} />
<meta property="og:description" content={ "FAQ" + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
<meta property="og:url" content= {"https://rozgar.com/faq"}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Frequently Asked Questions - Rozgar.com"} />
<meta name="twitter:description"  content={ "FAQ" + " - Learn how to create Job profile, Search and Apply jobs and many more on   Rozgar.com."} />
<meta name="twitter:url"content= {"https://rozgar.com/faq"} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
<link rel="canonical"  href={"https://rozgar.com/faq"} />
  </Head>
   
  <FilteredHeader ud={props.ud} />
 
 <FAQDetail 
 list={list}
 data={data}
 FAQ_Blog_List={FAQ_Blog_List}
       // keyword={(e) => { this.updateKeyword(e) }}
      // showQuickShimmer={this.state.showQuickShimmer}
     // showBrowseShimmer={this.state.showBrowseShimmer}
   />
    
    </React.Fragment>
  )
}




export async function getServerSideProps(context) {
  const { req }  = context
    
    let faq_cat_list = await FAQCategoryList()
    let faq_list = await FAQList({ KEYWORD: "" }) 
     let  FAQ_Blog_List  = await FAQOurBlog()
     console.log(FAQ_Blog_List,"faqlist");
    let ud = getLoggedInUserData(req)
    
       return {
  props:{
    faq_cat_list:faq_cat_list.result ,
    faq_list : faq_list.result ,
    FAQ_Blog_List : FAQ_Blog_List.result.list ,
    ud
  }
 }

  }


 

export default index
