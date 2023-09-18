import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { qadiscussionSearchByInput, qaDiscussionThreadList, qaDiscussionThreadListBycategory } from '../../action/discussionFormAction';
import DiscussionForum from 'components/Discussion_forum/index'
import constant from 'constant'
import { SpinnerCircular } from 'spinners-react';
import { capFirstLetterInSentence } from '../../utils';
import Head from 'next/head';
import Loading from 'components/Loader'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getLoggedInUserData } from 'nextCookie';
import FilteredHeader from 'components/Filtered_Header'


let DisscussionForum = dynamic(() => import('components/Discussion_forum/index'), { loading: () => <Loading />, ssr: false })
class discussionForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: undefined,
      loader: false,
      ud:this.props.ud , 

    }
  }
  componentDidMount() {
    // console.log("history", this.props.history.location);
    // const { DISCUSSION_CATEGORY_ID } = this.props.history.location.state
    window.scroll(0, 0)
    document.title = constant.title.DiscussionForum
    // if (DISCUSSION_CATEGORY_ID) {
    //   this.DiscussionThreadListBycategory(DISCUSSION_CATEGORY_ID)
    // } else {
    this.DiscussionSearchByInput()
    // }
  }
  DiscussionSearchByInput = (Value = "") => {
    this.setState({ loader: true })
    qadiscussionSearchByInput(Value).then((res) => {
      this.setState({ list: res.result, loader: false })
    }).catch((err) => {
      alert(err);
    })
  }
  DiscussionSearchByInput1 = (Value = "") => {
    qadiscussionSearchByInput(Value).then((res) => {
      this.setState({ list: res.result })
    }).catch((err) => {
      alert(err);
    })
  }

  DiscussionThreadListBycategory = (data) => {
    qaDiscussionThreadListBycategory(data).then((res) => {
      this.setState({ list: res.result })
    }).catch((err) => {
      alert(err)
    })
    this.props.router.push({ state: '' })
  }
  render() {
    const { list } = this.state
    return (
      <React.Fragment>
        <Head >


          <title >{constant.title.DiscussionForum}</title>
          <meta name="HandheldFriendly" content="True" />
          <meta name="description" content={"Want to know more about your career or Rozgar.com? Discuss your queries about Rozgar.com through our discussion form."} />
          <link rel="canonical" href={"https://rozgar.com/discussion-forum"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Discussion Forum | Rozgar.com"} />
          <meta property="og:description" content={"Want to know more about your career or Rozgar.com? Discuss your queries about Rozgar.com through our discussion form."} />
          <meta property="og:url" content={"https://rozgar.com/discussion-forum"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Discussion Forum | Rozgar.com"} />
          <meta name="twitter:description" content={"Want to know more about your career or Rozgar.com? Discuss your queries about Rozgar.com through our discussion form."} />
          <meta name="twitter:url" content={"https://rozgar.com/discussion-forum"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />
        </Head>

        <FilteredHeader ud={this.state.ud} />

        <DisscussionForum
          List={list}
          DiscussionList={this.DiscussionThreadList}
          DiscussionSearchByInput1={(Value) => this.DiscussionSearchByInput1(Value)}
          DiscussionSearchByInput={(Value) => this.DiscussionSearchByInput(Value)}
          DiscussionThreadListBycategory={(data) => this.DiscussionThreadListBycategory(data)}
          history={this.props.history}
          ud={this.props.ud}
        />
        {this.state.loader &&
          <div style={{
            position: "fixed",
            zIndex: "999",
            left: "0",
            top: " 0",
            width: " 100%",
            height: " 100%",
            overflow: "auto",
            padding: "210px",
            backgroundColor: "rgba(0, 0, 0, 0.4)"
          }}>
            <LoadingOverlay
              active={true}
              spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
            >
            </LoadingOverlay>

          </div>
        }
      </React.Fragment>
    )
  }
}

export default withRouter(discussionForum)


export async function getServerSideProps(context){
  const {req}  = context
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }