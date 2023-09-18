import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { qaCommentByThreadId, qaCommentReplyByCommentId, qaDiscussionThreadList, qaThreadbyId, ViewCountThread } from '@/action/discussionFormAction';
import DiscussionForumDetails from 'components/DiscussionForumDetails';
import constant from 'constant';
import { capFirstLetterInSentence, getStorage } from '@/utils';
import { SpinnerCircular } from 'spinners-react';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { getLoggedInUserData } from 'nextCookie';
import Loading from 'components/Loader'
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import FilteredHeader from 'components/Filtered_Header'


let DiscussionForumDetail = dynamic(() => import('components/DiscussionForumDetails'), { loading: () => <Loading />, ssr: false })



class discussionForumDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: undefined,
            ThreadDetail: undefined,
            detail: getCookie(constant.keys.cd),
            commentbyId: undefined,
            commentReplyById: undefined,
            loader: false,
            path: undefined,
            ud: this.props.ud
        }
    }
    componentDidMount() {
        window.scroll(0, 0)
        this.setState({ path: this.props.router.query.url })
        const { id } = this.props.router.query
        this.ThreadbyId()
        this.DiscussionThreadList()
        this.CommentByThreadId()
        this.CountThread()
    }
    CommentReplyByCommentId = () => {
        this.setState({ loader: true })
        qaCommentReplyByCommentId().then((res) => {
            this.setState({ commentReplyById: res.result, loader: false })
        }).catch((err) => {
            alert(err)
        })
    }
    DiscussionThreadList = () => {
        this.setState({ loader: true })
        qaDiscussionThreadList().then((res) => {
            this.setState({ list: res.result, loader: false })
        }).catch((err) => {
            alert(err)
        })
    }

    ThreadbyId = async () => {
        this.setState({ loader: true })
        let arr  = this.props.router.query.url.split('-')
        let id=arr[arr.length-1]
        qaThreadbyId(id).then((res) => {
            this.setState({ ThreadDetail: res.result })
        }).catch((err) => {
            alert(err)
        })
        this.setState({ loader: false })
    }
    CommentByThreadId = () => {
        this.setState({ loader: true })
        let arr = this.props.router.query.url.split('-')
        let id = arr[arr.length - 1]
        qaCommentByThreadId(id).then((res) => {
            this.setState({ commentbyId: res.result, loader: false })
        }).catch((err) => {
            alert(err)
        })
        this.CommentReplyByCommentId()
    }

    CountThread = () => {
        let arr = this.props.router.query.url.split('-')
        let id = arr[arr.length - 1]
        const model = {
            DISCUSSION_THREAD_ID: id,
            VIEW_COUNT: +1
        }
        ViewCountThread(model).then((res) => {
        }).catch((err) => {
            alert(err)
        })
    }

    render() {
        const { path } = this.state
        if (path !== this.props.router.query.url) {
            this.DiscussionThreadList()
            this.ThreadbyId()
            this.CommentByThreadId()
            // this.CountThread()
            this.setState({ path: this.props.router.query.url })
        }

        let arr = this.props.router.query.url.split('-')
        arr.pop()
        let title = arr.join(' ')
        title = title + ' | Discussion Thread | Rozgar.com'
        return (
            <React.Fragment>
                <Head >


                    <title >{capFirstLetterInSentence(title)}</title>
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="Keywords" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " , By Skill , By Company, By Designations"}></meta>
                    <meta name="description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta property="og:url" content={this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " An environment where participants can pose issues for discussion and respond to any contribution, thus creating threaded discussions that can spawn a discussion tree where the discussion branches out in many directions or subthreads."} />
                    <meta name="twitter:url" content={this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />
                    <link rel="canonical" href={this.props.router.asPath} />
                </Head>
                <FilteredHeader ud={this.state.ud} />
                <DiscussionForumDetail
                    router={this.props.router}
                    List={this.state.list}
                    ThreadDetail={this.state.ThreadDetail}
                    commentbyId={this.state.commentbyId}
                    commentReplyById={this.state.commentReplyById}
                    DiscussionThreadList={this.DiscussionThreadList}
                    CommentByThreadId={this.CommentByThreadId}
                    ThreadbyId={this.ThreadbyId}
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

export default withRouter(discussionForumDetails)

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }
    }

}