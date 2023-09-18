import Filtered_Header from 'components/Filtered_Header'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getLoggedInUserData } from 'nextCookie'
import React, { Component } from 'react'
import { getCentralJobCount, getGovermentList, searchGovtJobList } from '@/action/dashboard'
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
let SearchGovernmentJobList = dynamic(() => import('components/GovernmentJobsList/SearchGovernmentJobList'), { loading: () => <Loader />, ssr: false })

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ud: this.props.ud,
      gorvList: '',
      page: 1,
      searchjob: '',
      count: '',
      showLoader: false
    }
  }
  componentDidMount() {

    this.getSearchGovtJobList()
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

  getSearchGovtJobList = () => {
    const KEYWORD = this.props.router.query.keyword.split('=')[1]
    const Keywordurl = KEYWORD

    searchGovtJobList(Keywordurl, this.state.page).then(res => {
      this.setState({ showLoader: true })
      if (res.status) {
        this.setState({ showLoader: false })
        this.setState({ searchjob: res.result.res })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })

  }


  GovermentList = () => {

    getGovermentList().then(res => {
      this.setState({ showLoader: true })
      //console.log(res,"result");
      if (res.status) {
        this.setState({ showLoader: false })
        this.setState({ gorvList: res.result.city })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })
  }


  searchResults = (keyword, wholeUlr) => {
    searchGovtJobList(keyword, this.state.page).then(res => {
      this.setState({ showLoader: true })
      if (res.status) {
        this.setState({ showLoader: false })
        this.setState({ searchjob: res.result.res })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })



    getGovermentList().then(res => {
      this.setState({ showLoader: true })
      //console.log(res,"result");
      if (res.status) {
        this.setState({ showLoader: false })
        this.setState({ gorvList: res.result.city })
      }
      else {
        console.log(res.error)
      }

    }).catch(err => {
      console.log(err)
    })

  }

  render() {
    const { gorvList, searchjob, count, showLoader } = this.state
    const url = this.props.router.query.keyword.split('=')[1]


    return (
      <React.Fragment>
        <Filtered_Header ud={this.state.ud} />

        {/* <GovernmentSearch url={urlKeyword}
          onSearch={(keyword, wholeUlr) => this.searchResults(keyword, wholeUlr)}
        /> */}

        <SearchGovernmentJobList
          searchResults={(keyword, wholeUlr) => { this.searchResults(keyword, wholeUlr) }}
          count={count}
          gorvList={gorvList}
          searchjob={searchjob}
        />
        {showLoader && <Loading />}
      </React.Fragment>
    )
  }
}
export default withRouter(index)

export async function getServerSideProps(index) {
  const { req } = index
  let ud = getLoggedInUserData(req)

  return {
    props: {
      ud
    }
  }

}