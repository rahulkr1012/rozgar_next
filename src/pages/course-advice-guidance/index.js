import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'

const CourseAdviceGuidance = dynamic( () => import('components/StudyAbroad/CourseAdviceGuidance'), { loading:()=><Loader /> ,   ssr: false });
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ud: props.ud

    }
  }
  render() {
    return (
      <React.Fragment>
      <Head>
        <title>Course Advice Guidance Service - Rozgar.com</title>
      <link rel="canonical" href={"https://rozgar.com/course-advice-guidance"} />
      </Head>
      <FilteredHeader ud={this.state.ud} />
        <CourseAdviceGuidance/>
    </React.Fragment>    )
  }
}


