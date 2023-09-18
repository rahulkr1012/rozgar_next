import { getLoggedInUserData } from 'nextCookie'
import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Loading from 'components/Loader'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { render } from 'react-dom'
let TemplateEdit  = dynamic(()=>import('components/Template-Edit' ) ,  { ssr:false , loading:()=> <Loading />  } )

export default class index  extends React.Component {
     constructor(props) {
          super(props)
          this.state ={
             ud:this.props.ud
          }
       }
      
       render() {

        return (
          <div>
      
            <Head>
          {/*  <title title={" Create Free CV - " + "" + "-Rozgar.com"}>{" Create Free CV - " +" "+ "-Rozgar.com"}</title>
            <meta name="HandheldFriendly" content="True" />
            <meta name="Keywords" content={ " " + " Create a CV in Minutes, Free CV Builder, Free CV Templates, Free Online CV Generator, Create Free Resume Online, Rozgar CV"}></meta>
            <meta name="description" content={" Create your Free CV Online - Use " + " " + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
       
            <meta property="og:site_name" content="Rozgar.com" />
            <meta property="og:title" content={router.asPath} />
            <meta property="og:description" content={" Create your Free CV Online - Use " + " " + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
            <meta property="og:url" content={router.asPath} />
            <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
            <meta property="og:image:width" content="4000" />
            <meta property="og:image:height" content="6000" />


            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={router.asPath} />
            <meta name="twitter:description" content={" Create your Free CV Online - Use " +" "+ "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
            <meta name="twitter:url" content={router.asPath} />
            <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content="Smita Nag" />
            <meta name="twitter:label2" content="Filed under" />
            <meta name="twitter:data2" content="Career Advice, Career Insights" />
            <meta name="twitter:site" content="@rozgar_india" />  */}      
            </Head>
          
          <FilteredHeader ud={this.state.ud} />
            <TemplateEdit /> 
                  
          </div>
         )
        }     
  }

export async function getServerSideProps({req}) {
    let ud = getLoggedInUserData(req)
    return {
       props:{
         ud:ud
       }
     }
  }



