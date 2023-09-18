import React, { Component } from 'react'
import GovernmentResultState from 'components/GovernmentResultState'
import { getLoggedInUserData } from 'nextCookie'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loading from 'components/Loader'
import { getCentralJobCount, getGovermentList } from '@/action/dashboard';
import { withRouter } from 'next/router';
import Loader from 'components/Loader'

const GovernmentStates = dynamic( () => import('components/GovernmentResultState'), {  ssr: false });

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ud: this.props.ud,
      gorvList: '',
      count: '',
      showLoader: false
    }
  }

  componentDidMount() {
    this.GovermentList()
    getCentralJobCount().then(res => {
      if (res.status) {
        this.setState({ count: res.result.city.centraljobpost })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })
  }


  GovermentList = () => {
    this.setState({ showLoader: true })
    getGovermentList().then(res => {
      // this.setState({ showLoader: true })
      //console.log(res,"result");
      if (res.status) {
        this.setState({ gorvList: res.result.city })
        this.setState({ showLoader: false })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { gorvList, count, showLoader } = this.state
    return (
      <React.Fragment>
        <FilteredHeader ud={this.state.ud} />

        <GovernmentStates
          count={count}
          showLoader={showLoader}
         GovermentList={gorvList}
        />
        <Head>
          <title >Get Government Jobs Results - Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Find your results of government jobs on Rozgar.com. Get government jobs results by Rozgar.com. Government Jobs Result. Result of Govenment Jobs."} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content='Get Government Jobs Results - Rozgar.com' />
          <meta property="og:description" content={"Find your results of government jobs on Rozgar.com. Get government jobs results by Rozgar.com. Government Jobs Result. Result of Govenment Jobs."} />
          <meta property="og:url" content={"https://rozgar.com/" + this.props.router.asPath} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content='Get Government Jobs Results - Rozgar.com' />
          <meta name="twitter:description" content={"Find your results of government jobs on Rozgar.com. Get government jobs results by Rozgar.com. Government Jobs Result. Result of Govenment Jobs."} />
          <meta name="twitter:url" content={"https://rozgar.com/" + this.props.router.asPath} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <link rel="canonical" href={"https://rozgar.com" + this.props.router.asPath} />
        </Head>
      </React.Fragment>
    )
  }
}
export default withRouter(index)

export async function getServerSideProps(index) {
  const { req } = index
  let ud = getLoggedInUserData(req)

  return {
    props: { ud }
  }
}