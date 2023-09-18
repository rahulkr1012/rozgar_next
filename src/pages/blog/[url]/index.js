import { blogList, BlogListbyCategoryURL, all_blog_list } from '@/actions/jobsByAction';
import { blogCategory, blogCommentList, recentblogList } from '@/action/BlogAction';
import Head from 'next/head';
import React from 'react'
import { BlogbyURL } from '@/action/BlogAction';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'
import { FeaturedJobs, getFeaturedJobs } from '@/actions/CandidateAction';
let BlogDetail = dynamic(() => import('components/BlogDetails'), { ssr: true });

function index(props) {

  let { blogCommentList, blogCategory, recentList, data: blog, ud, relatedBlogs, FeaturedJob, jobListOne, jobListTwo } = props

  let router = useRouter()

  let share_blog = {
    border: "none",
    color: "black",
    padding: " 2px 2px",
    textAlign: "center",
    fontSize: "16px",
    margin: "4px 2px",
    transition: '0.3s',
    transitionDelay: "1sec",
    transform: "translateY(-10px)"
  }
  console.log(blog);

  let sharable_link = { url: router.asPath, style: share_blog, title: router.asPath.split('/blog/')[1] }


  return (
    <React.Fragment>

      <Head>


        <title>{blog.META_TITLE}</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={blog.META_DESCRIPTION} />
        <link rel="canonical" href={"https://rozgar.com/blog/" + blog.URL} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta property="og:site_name" content="Rozgar Official Blog" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.META_TITLE} />
        <meta property="og:description" content={blog.META_DESCRIPTION} />
        <meta property="og:url" content={"https://rozgar.com/blog/" + blog.URL} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_BASE_URL + "/blog/picture/" + blog.PICTURE} />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        <meta property="article:published_time" content="2022-10-18T06:04:34.000Z" />
        <meta property="article:modified_time" content="2022-10-18T06:04:37.000Z" />
        <meta property="article:tag" content="Career Advice" />
        <meta property="article:tag" content="Career Insights" />

        <meta property="article:publisher" content={"https://rozgar.com/blog/" + blog.URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.META_TITLE} />
        <meta name="twitter:description" content={blog.META_DESCRIPTION} />
        <meta name="twitter:url" content={"https://rozgar.com/blog/" + blog.URL} />

        <meta name="twitter:image" content={process.env.NEXT_PUBLIC_BASE_URL + "/blog/picture/" + blog.PICTURE} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />



      </Head>
      <FilteredHeader ud={ud} />
      <div>
        <BlogDetail
          jobListOne={jobListOne}
          jobListTwo={jobListTwo}
          blogCommentList={blogCommentList}
          blogCategory={blogCategory}
          recentList={recentList}
          blog={blog}
          relatedBlogs={relatedBlogs}
          FeaturedJob={FeaturedJob}
        // FeaturedJobs={FeaturedJobs}
        />

      </div>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {


  let { params, req } = context
  let ud = getLoggedInUserData(req)
  let url = params.url
  let Blog_by_URL = await BlogbyURL(url)  // data  
  let blog_Comment_List = await blogCommentList() //blogCommentList 
  let blog_Category = await blogCategory(url) //blogCategory
  let pageNumber = 1
  let FeaturedJob = await FeaturedJobs({ pageNumber: pageNumber })
  return {
    props: {
      data: Blog_by_URL.result.blogDetail,
      blogCommentList: blog_Comment_List.result.list,
      relatedBlogs: Blog_by_URL.result.relatedBlogs,
      blogCategory: blog_Category.result.list,
      FeaturedJob: FeaturedJob.result.featuredJobList,
      jobListOne: Blog_by_URL.result.jobListOne,
      jobListTwo: Blog_by_URL.result.jobListTwo,
      ud: ud
    },
  }

}






export default index
