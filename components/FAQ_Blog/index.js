import { FAQOurBlog } from '@/action/FAQAction'
import React from 'react'
import Link  from 'next/link'
import constant from 'constant'
import Parser from 'html-react-parser';
import authImage from 'src/assets/images/author/blogAuthor.png'
import Image from 'next/image';

function index(props) {
     
    let {FAQ_Blog_List }  = props
     
    let  blogList  = FAQ_Blog_List.result.list
console.log(blogList);
       
   return (
     
    <React.Fragment>
       <section className="rg-haslayout rg-sectionspace">
           <div className="container">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="rg-sectionhead pb-4">
                        <h2 className="blogheadline">Latest Blogs</h2>
                        <a target='_blank' className="rg-btnviewall" href={constant.component.blog.url}>View All</a>
                    </div>
                </div>
                <div className="rg-topcompaniesholder">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="rg-topcompaniesslider rg-topcompanies blogheighbox">
                            {
                                 blogList ?
                                    blogList.map((item, index) => {
                                        return (
                                            <div className="rg-faqsourblog linefix item col-md-4 p-0 m-1">
                                                <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                    <img style={{ height: "200px", objectFit: "cover" }} src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/Picture/${item.BLOG_IMAGE}`} alt="image description" />
                                                </a>
                                                <div className='p-4'>
                                                    <div target='_blank' className="rg-bglight blogtihead" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                        <h3 className=''>
                                                            <Link href={constant.component.blogDetail.url.replace(':url', item.URL)}>{item.BLOG_TITLE}</Link>
                                                        </h3>
                                                    </div>
                                                    <div className="rg-bglight">
                                                        <p className='pb-5' style={{ textAlign: "left" }}>{Parser(item.BLOG_DETAILS.slice(0, 250))}...
                                                            <span style={{ color: "#55acee" }}><a href={constant.component.blogDetail.url.replace(':url', item.URL)}>Read More</a></span></p>
                                                    </div>
                                                </div>
                                                <div className='autharname'>
                                                    <div className='authimag pl-4'>
                                                        <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                            <Image style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "contain" }} src={authImage} />
                                                        </a>
                                                    </div>

                            
                                                     <div className='authorname-p'>
                                                     
                                                        <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                            <p style={{ fontWeight: "500", padding: "10px 20px" }}>{item.AUTHOR}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    ) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>  
  </React.Fragment> 
  )
}




export default index
