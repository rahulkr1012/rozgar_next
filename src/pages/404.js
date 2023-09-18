import React ,{useEffect , useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
 
function index() {
   
    let router  = useRouter()
    const [dateState, setDateState] = useState(5);
    
    useEffect(() =>  {
          setInterval(() => {
            if(dateState>0)   {  
              setDateState(dateState-1 )
              }else{
                if(router.route == "/404" ) {
                  router.push('/')
                  }   
              }
        }, 1000 );


    
    }, [dateState]  )
     

  return (
    <React.Fragment>
     
     <Head>
      
     <title >{" 404 page "}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="Keywords" content={ "404 Page "}/>
<meta name="description" content={ "404 Page"} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta property="og:site_name" content="Rozgar.com" />
<meta property="og:title"content={ "Study in USA - Rozgar.com"} />
<meta property="og:description" content={ "Study in USA" + " - United States of America, commonly known as the United States, or the US or the USA – the land of opportunity, the land of freedom and democracy and the most sought after country in the world, is a dream place for anyone wanting to study abroad. "} />
<meta property="og:url" content= {"https://rozgar.com/404"}  />
<meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={"Study in USA - Rozgar.com"} />
<meta name="twitter:description"  content={ "Study in USA" + " - United States of America, commonly known as the United States, or the US or the USA – the land of opportunity, the land of freedom and democracy and the most sought after country in the world, is a dream place for anyone wanting to study abroad. "} />
<meta name="twitter:url"content= {"https://rozgar.com/404"} />
<meta name="twitter:image"  content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"  />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />
    </Head>
      
       <main>
      

       <div className=" text-center alert alert-warning alert-dismissible fade show" role="alert">
        <strong>REDIRECTING IN </strong> {  dateState } 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

       <div id="error_page" className='pricing-area padding-top-100px padding-bottom-80px'>
           <div className="container">
             <div className="row justify-content-center text-center">
               <div className="col-xl-7 col-lg-9">
                 <h2>404 <i className="fa fa-exclamation-triangle"></i></h2>
                 <p>We're sorry, but the page you were looking for doesn't exist.</p>
                 <p>Go to <Link href='/' style={{textDecoration:'none', cursor:'pointer'}} className='text-danger'>Home Page </Link> </p>
               </div>
             </div>
           </div>
           </div>
       </main>
        
    </React.Fragment>
  )
}

 

export default index
