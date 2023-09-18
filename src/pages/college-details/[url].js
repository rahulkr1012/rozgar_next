import Head from 'next/head';
import React, { Component } from 'react'
import { courseDetails, getCollegeDetail, getSimilarCollegeList } from '@/action/CandidateAction';
import constant from 'constant';
import { capFirstLetterInSentence } from '@/utils';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic';
import Loader from 'components/Loader'
;
const CareerExplorerDetail = dynamic( () => import('../../../components/StudentsExplorer/CareerExplorerDetail'), { loading:()=><Loader /> ,   ssr: false });

export default class careerExplorerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarListData: [],
      detailList: [],
      showShimmer: true,
      courseList: [],
      ud:this.props.ud
    };
  }

  componentDidMount() {
    const URL = this.props.params.url
    this.getSimilarColleges()
    this.getCollegeDetails(URL)
  }

  getSimilarColleges = () => {
    getSimilarCollegeList().then((res) => {
      if (res.status) {
        setTimeout(() => {
          this.setState({ showShimmer: false })
        }, 1000)
        this.setState({ similarListData: res.result.list })
      }
    }).catch((err => {
      alert(err)
    }))
  }

  getCollegeDetails = (ENTITY_ALIAS) => {
    getCollegeDetail(ENTITY_ALIAS).then((res) => {
      if (res.status) {
        this.setState({ detailList: res.result.list })
        this.allCourses(res.result.list[0].COLLEGE_ID)
      }
    }).catch((err) => {
      alert(err)
    })
  }

  allCourses = (COLLEGE_ID) => {
    courseDetails(COLLEGE_ID).then((res) => {
      this.setState({ courseList: res.result })
    }).catch(err => alert(err))
  }

  render() {
    const { url,pathName } = this.props;
    return (
      <React.Fragment>

        <Head>


          <title title={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' '))}>{capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' '))}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
          <link rel="canonical" href={url} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta property="og:description" content={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' '))} />
          <meta name="twitter:description" content={capFirstLetterInSentence(pathName.replace('/', '').split('/').pop().split('-').join(' ')) + constant.metaDescription} />
          <meta name="twitter:url" content={url} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />
        </Head>
         <FilteredHeader ud={this.state.ud}   />
        <CareerExplorerDetail
          similarListData={this.state.similarListData}
          showShimmer={this.state.showShimmer}
          detailList={this.state.detailList}
          courseList={this.state.courseList}
        />
      </React.Fragment>
    )


  }
}

export async function getServerSideProps(context) {
  // console.log(context.params)
  const {req}  = context
     let ud = getLoggedInUserData(req)

     let url = context.req.headers.host + context.resolvedUrl

   
  return {
    props: {
      url: url,
      params: context.params,
      pathName: context.resolvedUrl ,
      ud
    }, // will be passed to the page component as props
  }
}