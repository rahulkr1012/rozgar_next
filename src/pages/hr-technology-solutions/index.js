import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'
import React ,{Component} from 'react'
import dynamic from 'next/dynamic'
import Loader from 'components/Loader'

let HrTechSolutions  = dynamic(()=>import('components/HRTechnologySolutions/index') ,{
     ssr:false ,
     loading:()=> <Loader />
  })

export default class HrTechnologySolutionss extends Component {

   constructor(props) {
     super(props)
     this.state = {
              ud:this.props.ud 
           }
      }
   
    render() {
      return (
        <React.Fragment>
          <Head >
              <title >HR Technology Solutions Services | Rozgar.com</title>
              <meta name="HandheldFriendly" content="True" />
              <meta name="description" content={"Rozgar.com provides HR technology solutions for its clients. Rozgar.com offers various types of HR tech solutions for your business growth.."} />
              <meta name="referrer" content="no-referrer-when-downgrade" />
              <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

              <meta property="og:site_name" content="Rozgar.com" />
              <meta property="og:title"content={ "HR Technology Solutions Services | Rozgar.com"} />
              <meta property="og:description" content={ "Rozgar.com provides HR technology solutions for its clients. Rozgar.com offers various types of HR tech solutions for your business growth.."} />
              <meta property="og:url" content= {"https://rozgar.com/hr-technology-solutions"}  />
              <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
              <meta property="og:image:width" content="4000" />
              <meta property="og:image:height" content="6000" />
  
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={"HR Technology Solutions Services | Rozgar.com"} />
              <meta name="twitter:description"  content={"Rozgar.com provides HR technology solutions for its clients. Rozgar.com offers various types of HR tech solutions for your business growth.."} />
              <meta name="twitter:url"content= {"https://rozgar.com/hr-technology-solutions"} />
              <meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
              <meta name="twitter:label1" content="Written by" />
              <meta name="twitter:data1" content="Smita Nag" />
              <meta name="twitter:label2" content="Filed under" />
              <meta name="twitter:data2" content="Career Advice, Career Insights" />
              <meta name="twitter:site" content="@rozgar_india" />
              <link rel="canonical" href="https://rozgar.com/hr-technology-solutions" />
          </Head>
        

              <FilteredHeader  ud={this.state.ud} /> 
             <HrTechSolutions  />
           </React.Fragment>
      )
    }
  }




export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
    
    return {
      props: {
        ud: ud
      }
    }  

}
  
  
