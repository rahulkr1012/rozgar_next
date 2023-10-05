import { authorBlogs } from '@/action/BlogAction'
import { getLoggedInUserData } from 'nextCookie'
import Page from 'components/authorBlogs'
import React from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'
import { useRouter } from 'next/router';


export default function index(props) {
  let { ud} = props
  let router=useRouter ()
  let title= `Know More About Author (${props.authorDetail.AUTHOR_NAME}) Of Rozgar.com`
  let description = props.authorDetail.ABOUT
  return (
    <React.Fragment>
        <Head>
<title>{title}</title>
<meta name="HandheldFriendly" content="True" />
<meta name="description" content={description} />
<link rel="canonical" href={"https://rozgar.com/" + router.asPath} />
<meta name="referrer" content="no-referrer-when-downgrade" />
<meta property="og:site_name" content="Rozgar Official Blog" />
<meta property="og:type" content="article" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={"https://rozgar.com/" +router.asPath} />
<meta property="og:image" content={process.env.NEXT_PUBLIC_BASE_URL + "/author-profile-image/" + props.authorDetail.PROFILE_IMAGE} />
<meta property="og:image:width" content="4000" />
<meta property="og:image:height" content="6000" />

<meta property="article:published_time" content="2022-10-18T06:04:34.000Z" />
<meta property="article:modified_time" content="2022-10-18T06:04:37.000Z" />
<meta property="article:tag" content="Career Advice" />
<meta property="article:tag" content="Career Insights" />

<meta property="article:publisher" content={"https://rozgar.com/" + router.asPath} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:url" content={"https://rozgar.com/" + router.asPath} />

<meta name="twitter:image" content={process.env.NEXT_PUBLIC_BASE_URL + "/author-profile-image/" + props.authorDetail.PROFILE_IMAGE} />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Smita Nag" />
<meta name="twitter:label2" content="Filed under" />
<meta name="twitter:data2" content="Career Advice, Career Insights" />
<meta name="twitter:site" content="@rozgar_india" />



</Head>
            <FilteredHeader ud={ud} />

      <Page
        blogList={props.blogList}
        count={props.count}
        authorDetail={props.authorDetail}

      />
    </React.Fragment>
  )
}


export async function getServerSideProps(context) {
  let { params, req } = context
  let ud = getLoggedInUserData(req)
  const res = await authorBlogs(params['author-profile'], 1)
  console.log(res)
  return {
    props: {
      ud: ud,
      blogList: res.result.list,
      count: res.result.count,
      authorDetail: res.result.authorDetail
    }
  }

}

