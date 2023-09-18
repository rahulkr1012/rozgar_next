import { blogList } from '@/action/BlogAction';
import { recentblogList } from '@/action/BlogAction';
import { blogCategory } from '@/actions/jobsByAction';
import { useRouter } from 'next/router';
import React ,{useState,useEffect} from 'react'
import logo from 'src/assets/images/logo.png'
import dynamic from 'next/dynamic';
import Head from 'next/head'; 
import Loader from 'components/Loader'
const BlogDetail = dynamic( () => import('components/blog_detail/BlogDetail'), { loading:()=><Loader /> ,   ssr: false });



function index(props) {
    const [showShimmer, setShowShimmer] = React.useState(true);
    const {b_tags, recent_blog_list , blog_category , b_list , all_blog ,b_count , b_curentPage    } = props 
      let router = useRouter()
     const [state, setState] = useState({
      tags : JSON.parse(b_tags) , list:	JSON.parse(b_list) , recentList: JSON.parse(recent_blog_list) , blogCategory :JSON.parse(blog_category) 
      , count:Number(b_count)  , keyword:"" , currentPage:Number(b_curentPage) 
     })
       
     const {tags  , list , recentList , blogCategory , count ,   all_blog_list , currentPage       } = state 
      
       return (
  
      <React.Fragment>
       
      <Head>
      <title > Rozgar-Blog-page -{currentPage} </title>
      <meta name="HandheldFriendly" content="True" />
      
      <meta name="description" content={ "Blog" + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
      <link rel="canonical" href={"https://rozgar.com/blog"} />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="viewport" content="width=device-wi/create-job-alertdth, initial-scale=1"></meta>
      
      <meta property="og:site_name" content="Rozgar Official Blog" />
      <meta property="og:type" content="article" />
      <meta property="og:title"content={ "Blog"} />
      <meta property="og:description" content={ "Blog" + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
      <meta property="og:url" content= {"https://rozgar.com/blog"}  />
      <meta property="og:image" content={logo} />
      <meta property="article:published_time" content="2022-10-18T06:04:34.000Z" />
      <meta property="article:modified_time" content="2022-10-18T06:04:37.000Z" />
      <meta property="article:tag" content="Career Advice" />
      <meta property="article:tag" content="Career Insights" />
      
      <meta property="article:publisher" content= {"https://rozgar.com/blog"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={"Blog"} />
      <meta name="twitter:description"  content={ "Blog" + " ? Here are  8 tips for you to go about applying for your dream job abroad!"} />
      <meta name="twitter:url"content= {"https://rozgar.com/blog"} />
      <meta name="twitter:image"  content={logo}  />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Smita Nag" />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content="Career Advice, Career Insights" />
      <meta name="twitter:site" content="@rozgar_india" />
      <meta property="og:image:width" content="4000" />
      <meta property="og:image:height" content="6000" />
      </Head>
      
      <BlogDetail
        list={list}
        blogLists={ (page) => getBlogLists(page) }
        count={count }
        setPage={currentPage }
        recentList={recentList }
        blogCategory={blogCategory }
        keyword={(key) => { this.setState({ ...state , keyword:key }) }}
        // showShimmer={this.state.showShimmer} 
        currentPage={currentPage}
        tags={tags}
        />
        </React.Fragment>
        )
}


// export async function getStaticPaths() {
    
//     let blog_list = await all_blog_list({ KEYWORD: "" , page: 1 })
//      let all_blog_url = blog_list.result.list.map((ele ,index)=> {
//         return{
//             params:{
//                 page:String(index+1)   
//             } 
//         }
//      })
//     //  console.log(all_blog_url);

// return{
//     paths:all_blog_url,
//     fallback:false
// }
// }



export async function getServerSideProps(context) {
 
    let { page } = context.params
 
     
    let finalTag =[]
    let blog_list = await blogList(  {  KEYWORD: "" ,  page:page  }  )
     
   //  let all_blog = await all_blog_list({ KEYWORD: "" , page: 1 })
   
     blog_list.result.list.map((ele, index) => {
       if (ele.TAG.includes(",")) {
         let arr = ele.TAG.split(",")
         arr.map((tg) => {
           if (tg != "") {
             finalTag.push(tg)
           }
         })
       }
       else {
         finalTag.push(ele.TAG)
       }
     })

     finalTag = [...new Set(finalTag)]
      
    let  recent_blog_list=  await recentblogList()
    let blog_category=  await blogCategory() 

    return{
       props:{
          b_list:JSON.stringify(blog_list.result.list)  ,  
         b_tags:JSON.stringify(finalTag) , recent_blog_list:JSON.stringify(recent_blog_list.result.list)  ,
         blog_category:JSON.stringify(blog_category.result.list) ,
        //  all_blog :JSON.stringify(all_blog.result.list) ,
         b_count:String(blog_list.result.count) ,
         b_curentPage:  String(page)
       }
    }
    
    }


 
export default index
