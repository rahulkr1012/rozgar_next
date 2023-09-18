import { all_blog_list, blogList } from '@/actions/jobsByAction';
import Link from 'next/link';
import styles from  '../../styles/Home.module.css'
import React ,{useState} from 'react'
import Head from 'next/head';
import ListGroup from 'react-bootstrap/ListGroup';
 
function index({blogs}) {
   const [state, setstate] = useState({
    PageNo:1
   });

 
  return (   
    <React.Fragment>
  
    <ListGroup>
   { 
      blogs.map((ele,i)=>{
         return  <ListGroup.Item key={i} > <Link  href={"/blog/"+ele.URL} > {ele.BLOG_TITLE} </Link>  </ListGroup.Item>
      })
   }
    

    
     </ListGroup>
                
     
    </React.Fragment>

     
  )
}


export async function getServerSideProps(context) {
   
   
   let blogs =await all_blog_list({ KEYWORD: "" , page: 1 })
   return {
    props: {
       blogs:blogs.result.list
       }, // will be passed to the page component as props
    }
   
}
export default index

