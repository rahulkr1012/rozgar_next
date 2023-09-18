import { courseListById, qaCourseCirculam } from '@/action/CandidateAction'
import { qaFqaList } from '@/actions/CandidateAction'
import Head from 'next/head'
import Loader from 'components/Loader'
import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import FilteredHeader from 'components/Filtered_Header'

const JavaFullStack = dynamic(() => import('components/JavaFullStack'), { loading: () => <Loader />, ssr: false })

function indx(props) {
  let router = useRouter()
  let { course_listby_id, qa_fqa_list, qa_course_circulam,ud } = props

  let details = course_listby_id
  let qaFAQList = qa_fqa_list
  let courseDetail = qa_course_circulam

  return (

    <React.Fragment>

      <Head>
        <title title={details ? details.COURSE_TITLE : "" + " | Learning Hub - Rozgar.com"}>{details ? details.COURSE_TITLE : "" + " | Learning Hub - Rozgar.com"}</title>
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={details ? details.COURSE_TITLE : "" + " Developer course is designed to give you an essence of front-end, middleware, and back end  web developer technologies."} />
        <link rel="canonical" href={router.basePath} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* og meta tag */}
        <meta property="og:site_name" content="Rozgar.com" />
        <meta property="og:title" content={details ? details.COURSE_TITLE : ""} />
        <meta property="og:description" content={details ? details.COURSE_TITLE : "" + " Developer course is designed to give you an essence of front-end, middleware, and back end  web developer technologies."} />
        <meta property="og:url" content={router.basePath} />
        <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta property="og:image:width" content="4000" />
        <meta property="og:image:height" content="6000" />

        {/* Twitter Meta Tag */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={details ? details.COURSE_TITLE : ""} />
        <meta name="twitter:description" content={details ? details.COURSE_TITLE : "" + " Developer course is designed to give you an essence of front-end, middleware, and back end  web developer technologies."} />
        <meta name="twitter:url" content={router.basePath} />
        <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Smita Nag" />
        <meta name="twitter:label2" content="Filed under" />
        <meta name="twitter:data2" content="Career Advice, Career Insights" />
        <meta name="twitter:site" content="@rozgar_india" />

      </Head>
      <FilteredHeader ud={ud} />

      <JavaFullStack
        details={details}
        courseDetail={courseDetail}
        qaFAQList={qaFAQList}
      //  showShimmer={this.state.showShimmer}
      />

    </React.Fragment>
  )
}




// export async function getStaticPaths() {

//   let all_learning_hub = [{ params: { url: 'java-full-stack', courseid: '1' } }, { params: { url: 'python-full-stack', courseid: '2' } }, { params: { url: 'software-testing', courseid: '3' } }]

//   return {
//     paths: all_learning_hub,
//     fallback: false
//   }
// }

 


export async function getServerSideProps(context) {
  let { url, courseid } = context.params
  let course_listby_id = await courseListById(url)
  let qa_fqa_list = await qaFqaList(course_listby_id.result.COURSE_FAQS)
  let qa_course_circulam = await qaCourseCirculam(courseid)

  return {
    props: {
      course_listby_id: course_listby_id.result,
      qa_fqa_list: qa_fqa_list.result,
      qa_course_circulam: qa_course_circulam.result
    }
  }
   
}



export default indx
