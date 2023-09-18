import React, { Component } from 'react'
import Modal from "react-modal"
import swal from 'sweetalert'
import { CommentInsertLike, CommentLikeList, LikeCountThread, LikeList, QACreateThread, qaDiscussionThreadlatestTopic, qaDiscussionThreadListView, QAsendThreadComment, QAsendThreadCommentReply } from '@/action/discussionFormAction'
import constant from '../../constant'
import { getDateParts, getDatePartsSecond, getStorage } from '../../utils'
import DiscussionForumModal from "components/DiscussionModal/DiscussionFormModel"
import Parser from 'html-react-parser';
import Link from 'next/link'
import DiscussionDetailModal from 'components/DiscussionModal/DiscussionDetailsModal'
import { getCookie } from 'cookies-next'
import { getLoggedInUserData } from 'nextCookie'
export default class DiscussionForumDetails extends Component {

    constructor(props){
        super(props)
       this.state = {
            openModal: false,
            openModal2: false,
            inputChange: undefined,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            THREAD_ID: undefined,
            FORUM_COMMENT_ID: undefined,
            COMMENT: undefined,
            commentbyId: undefined,
            FORUM_COMMENT: undefined,
            searchData: undefined,
            likeList: undefined,
            check: false,
            commentlikeList: undefined,
            COMMENT_REPLY_ID: undefined
    }
   
    }
    componentDidMount() {
        const ThreadComment = JSON.parse(sessionStorage.getItem("ThreadComment"))
        const ThreadCommentReply = JSON.parse(sessionStorage.getItem("ThreadCommentReply"))
        const ThreadData = JSON.parse(sessionStorage.getItem("ThreadData"))
        const { DISCUSSION_CATEGORY } = this.props.router.query
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        this.LikeList()
        this.CommentLikeList()
        this.DiscussionThreadList()
        this.DiscussionSearchByInput1(DISCUSSION_CATEGORY)

        if (ThreadComment && CANDIDATE_ID) {
            this.onCommentSubmit()
        }
        else if (ThreadCommentReply && CANDIDATE_ID) {
            this.ThreadCommentReply()
        }
        else if (ThreadData && CANDIDATE_ID) {
            this.CreateThread(ThreadData)
        }
    }
    onMouseClick = (COMMENT_REPLY_ID = 0, COMMENT_ID, COMMENT) => {
        if(this.props.ud!=null){
        this.setState({ openModal: true, FORUM_COMMENT_ID: COMMENT_ID, COMMENT: COMMENT, COMMENT_REPLY_ID: COMMENT_REPLY_ID })
        }else{
            this.props.router.push(constant.component.discussionForumSignIn.url)

        }
    }
    onCloseModal = () => {
        this.setState({ openModal: false })
        this.props.CommentByThreadId()
    }
    onCloseModal2 = () => {
        this.setState({ openModal2: false })
    }
    popUpFunction = () => {
        swal({
            icon: "warning",
            text: "Please Signin first to Submit Reply",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
    onCommentSubmit = () => {
        this.setState({ check: true })

        const ThreadComment = JSON.parse(sessionStorage.getItem("ThreadComment"))
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        const { inputChange } = this.state
        let arr = this.props.router.query.url.split('-')
        arr.pop()
        let title = arr.join(' ')
        title = title + ' | Discussion Thread | Rozgar.com'

        
        if (ThreadComment) {
            this.setState({ check: false })
            ThreadComment.CANDIDATE_ID = CANDIDATE_ID
            QAsendThreadComment(ThreadComment).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Success: Comment Sent.",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    })
                    this.props.CommentByThreadId()

                    this.setState({ inputChange: '' })
                    this.setState({ check: false })
                }

            }).catch((err) => {
                alert(err)
            })
            sessionStorage.removeItem("ThreadComment")
        }
        if (inputChange) {
            if (CANDIDATE_ID) {
                let arr  = this.props.router.query.url.split('-')
                let id=arr[arr.length-1]
                const st = {
                    COMMENT: inputChange,
                    CANDIDATE_ID: CANDIDATE_ID,
                    THREAD_ID: id
                }
                QAsendThreadComment(st).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: "Success: Comment Sent.",
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        })
                        this.props.CommentByThreadId()
                        this.setState({ inputChange: '' })
                        this.setState({ check: false })
                    }

                }).catch((err) => {
                    alert(err)
                })
            } else {
                let arr  = this.props.router.query.url.split('-')
                let id=arr[arr.length-1]
                const st = {
                    COMMENT: inputChange,
                    CANDIDATE_ID: CANDIDATE_ID,
                    THREAD_ID: id
                }
                sessionStorage.setItem('ThreadComment', JSON.stringify(st))
                this.props.router.push(constant.component.discussionForumSignIn.url)
            }
        }
    }
    onSearchQuestions = () => {
        const { searchData } = this.state
        if (searchData.trim()) {
            this.props.router.push({
                pathname: constant.component.discussionForum.url,
                state: { searchThreat: this.state.searchData }
            })
        }
    }
    LikeList = () => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        LikeList(CANDIDATE_ID).then((res) => {
            this.setState({ likeList: res.result })
        }).catch((err) => {
            alert(err)
        })
    }
    CommentLikeList = () => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        CommentLikeList(CANDIDATE_ID).then((res) => {
            this.setState({ commentlikeList: res.result })
        }).catch((err) => {
            alert(err)
        })
    }
    LikeCountThread = (Id, status) => {
        const { CANDIDATE_ID } = this.state.detail
        let arr  = this.props.router.query.url.split('-')
        let id=arr[arr.length-1]
        if(this.props.ud!=null){
        const model = {
            CANDIDATE_ID: CANDIDATE_ID,
            DISCUSSION_THREAD_ID: id,
            Status: status
        }
        LikeCountThread(model).then((res) => {
            this.props.ThreadbyId()
            this.LikeList()
            this.CommentLikeList()
        }).catch((err) => {

        })}else{
            this.props.router.push(constant.component.discussionForumSignIn.url)
        }
        
    }
    CommentLikeCount = (Id, status) => {
        
        const { CANDIDATE_ID } = this.state.detail
        if(this.props.ud!=null){
        const model = {
            CANDIDATE_ID: CANDIDATE_ID,
            COMMENT_ID: Id,
            Status: status
        }
        CommentInsertLike(model).then((res) => {
            
            this.props.ThreadbyId()
            this.props.CommentByThreadId()
            this.LikeList()
            this.CommentLikeList()
        }).catch((err) => {
        })}else{
            this.props.router.push(constant.component.discussionForumSignIn.url)
        }
    }
    CommentReplyLikeCount = (Id, status) => {
        const { CANDIDATE_ID } = this.state.detail
        const model = {
            CANDIDATE_ID: CANDIDATE_ID,
            REPLY_ID: Id,
            Status: status
        }
        CommentInsertLike(model).then((res) => {
            this.props.ThreadbyId()
            this.props.CommentByThreadId()
            this.LikeList()
            this.CommentLikeList()
        }).catch((err) => {

        })
    }
    DiscussionThreadList = () => {
        qaDiscussionThreadListView().then((res) => {
            this.setState({ list1: res.result })
        }).catch((err) => {
            alert(err)
        })
    }
    DiscussionSearchByInput1 = () => {
        qaDiscussionThreadlatestTopic().then((res) => {
            this.setState({ list2: res.result })
        }).catch((err) => {
            alert(err);
        })
    }
    closeOnSubmit = () => {
        this.setState({ openModal2: false })
    }

    onSubmit = () => {

    }
    ThreadCommentReply = () => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        const ThreadCommentReply = JSON.parse(sessionStorage.getItem("ThreadCommentReply"))
        ThreadCommentReply.CANDIDATE_ID = CANDIDATE_ID
        QAsendThreadCommentReply(ThreadCommentReply).then((res) => {
            this.setState({ commentReply: res.result })
            if (res.result) {
                swal({
                    icon: "success",
                    text: "Success: Reply Sent.",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                })
                this.props.CommentByThreadId()
            }
        }).catch((err) => {
            alert(err)
        })
        sessionStorage.removeItem("ThreadCommentReply")
    }

    CreateThread = (modal) => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        modal.CREATED_BY = CANDIDATE_ID
        QACreateThread(modal).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: res.messageCode,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                })
                // this.closeOnSubmit()
            }
        }).catch((err) => {
            swal({
                icon: "warning",
                text: err,
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
            })
        })
        sessionStorage.removeItem("ThreadData")
    }
    categoryWiseFilter = (DISCUSSION_CATEGORY_ID, DISCUSSION_CATEGORY_TITLE) => {
        this.props.router.push({
            pathname: constant.component.discussionForumCategory.url.replace(":category", DISCUSSION_CATEGORY_TITLE),
            state: { DISCUSSION_CATEGORY_ID: DISCUSSION_CATEGORY_ID, DISCUSSION_CATEGORY_TITLE: DISCUSSION_CATEGORY_TITLE }
        })
    }
    onTypeInputChange = (e) => {
        const Value = e.target.value.trim()
        this.setState({ inputChange: Value })
        // if (Value != "" && Value != undefined) {
        this.setState({ onCommentReply: true })
        // }
    }
    render() {
        const {  ThreadDetail, commentbyId, commentReplyById } = this.props
        console.log(this.props,"props");
        const { inputChange, FORUM_COMMENT_ID, COMMENT, searchData, likeList, list1, list2, check } = this.state
        let  Views  = this.props.router.query.url
        let arr  = this.props.router.query.url.split('-')
        let id=arr[arr.length-1]
        const lengthofComments = commentbyId ? commentbyId.length : 0
        if (this.props.ThreadDetail) {
            
            document.title = constant.title.Threadtitle.replace("Threadtitle", this.props.ThreadDetail.THREAD_TITLE.slice(0, 1).toUpperCase() + ThreadDetail.THREAD_TITLE.slice(1))
        }

        return (
            <main id="rg-main" className="rg-main rg-haslayout pt-0">
                <div className="rg-sectionspace rg-haslayout pt-0">
                    <div className="rozgar-jobbylocsearch">
                        <div className="container">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='discussions-title'>
                                        <h5>Start Your Discussions Here</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                    <form className="rozgar-jobbylocsearchbox">
                                        <div className="rozgar-formbox">
                                            <div className="rozgar-jobbylocsearchcontent">
                                                <div className="form-group">
                                                    <i className="lnr lnr-magnifier"></i>
                                                    <input type="text" name="keyword" className="form-control" placeholder="Search your forum of topics here..." value={searchData ? searchData : ''} onChange={(e) => this.setState({ searchData: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="rozgar-jobbylocsearchbtn" onClick={this.onSearchQuestions}>
                                                <a style={{ color: 'white', cursor: 'pointer' }}><i className="lnr lnr-magnifier"></i></a>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <div className='popular-topics-box'>
                                        <div className='header_search_keyword'>
                                            <span className='header-search-form__keywords-label'>Popular Topics:</span>
                                            <ul className='list-unstyled'>
                                                <li><a href=''>Careers,</a></li>
                                                <li><a href=''>Company,</a></li>
                                                <li><a href=''>Jobs Search,</a></li>
                                                <li><a href=''>Post a job,</a></li>
                                                <li><a href=''>Resume Making,</a></li>
                                                <li><a href=''>Helpdesk,</a></li>
                                                <li><a href=''>View All</a></li>
                                            </ul>
                                        </div>

                                    </div> */}

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='breadcrumb-section'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='breadcrumbF'>
                                        <ul>
                                            <li><a href='/'>Home</a></li>
                                            <li><a href='/discussion-forum'>Forum</a></li>
                                            <li className='active'><a href=''>{ThreadDetail && ThreadDetail.THREAD_TITLE.slice(0, 1).toUpperCase() + ThreadDetail.THREAD_TITLE.slice(1)}</a></li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='discussion-Form-section'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-9 col-lg-9'>
                                    <div className='discussion-filter-top-box'>
                                        {ThreadDetail &&
                                            <div className='tt-topic-list details-dis-form'>

                                                <div className='dis-hed-section'>
                                                    <h6 className='tt-title' style={{ margin: '0', paddingLeft: '30px', paddingTop: '14px', fontSize: '15px', display: 'block' }}><a style={{ textTransform: 'capitalize' }}>
                                                        {ThreadDetail.THREAD_TITLE}
                                                        {/* {ThreadDetail.THREAD_TITLE?.length >40?Parser(ThreadDetail.THREAD_TITLE.slice(0,40))+'...':Parser(ThreadDetail.THREAD_TITLE)} */}

                                                    </a></h6>
                                                    <div className='tt-item details-tt-item'>
                                                     
                                                        <div className='tt-col-description'>

                                                            <div className='row align-items-center no-gutters'>
                                                                <div className='col-11'>
                                                                    <p className='by-forum-update'>Posted by: <span>{ThreadDetail.CANDIDATE_NAME}</span></p>
                                                                    <p className='fourm-cat-box'>Category: <span>{ThreadDetail.DISCUSSION_CATEGORY_TITLE}</span></p>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        {/* <div className='tt-col-value2 hide-mobile'><i className='fa fa-thumbs-o-up'></i> {Likes}</div> */}
                                                        {likeList?.map((item => item.DISCUSSION_THREAD_ID))?.includes(ThreadDetail.DISCUSSION_THREAD_ID) ?
                                                            <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.LikeCountThread(ThreadDetail.DISCUSSION_THREAD_ID, 'U')}><i style={{ color: 'red' }} className='fa fa-thumbs-o-up'></i> {ThreadDetail.likeCount.total}</div>
                                                            : <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.LikeCountThread(ThreadDetail.DISCUSSION_THREAD_ID, 'A')}><i className='fa fa-thumbs-o-up'></i> {ThreadDetail.likeCount.total}</div>
                                                        }
                                                        <div className='tt-col-value2 tt-color-select hide-mobile'><i className='fa fa-reply'></i> {lengthofComments}</div>
                                                        {/* <div className='tt-col-value2 hide-mobile'><i className='fa fa-eye' aria-hidden='true'></i> {Views}</div> */}
                                                        <div className='tt-col-value2 hide-mobile' style={{ width: '18%' }}><i className='fa fa-clock-o' aria-hidden='true'></i> {getDatePartsSecond(ThreadDetail.CREATED_ON).relativeTime}</div>
                                                    </div>
                                                </div>
                                                <div className='discussion-para'>
                                                    <p>{ThreadDetail.THREAD_DETAILS}</p>
                                                </div>

                                            </div>
                                        }
                                        <div className='comments-and-reply'>
                                            <div className='tt-topic-list details-dis-form'>
                                                {commentbyId && commentbyId.map((i) => (
                                                    <>
                                                        <div className='dis-hed-section dis-rply-section-bx'>
                                                            <div className='tt-item '>
                                                                <div className='tt-col-avatar'>
                                                                    <div className='tt-icon'>
                                                                        <h5>{i.CANDIDATE_NAME ? i.CANDIDATE_NAME.split('')[0] : 'D'}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className='tt-col-description'>
                                                                    <h6 className='tt-title'>Posted by: {i.CANDIDATE_NAME}</h6>

                                                                </div>
                                                                {this.state.commentlikeList?.map((item => item.COMMENT_ID))?.includes(i.FORUM_COMMENT_ID) ?
                                                                    <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.CommentLikeCount(i.FORUM_COMMENT_ID, 'U')}><i style={{ color: 'red' }} className='fa fa-thumbs-o-up'></i> {i.likeCount.total}</div>
                                                                    : <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.CommentLikeCount(i.FORUM_COMMENT_ID, 'A')}><i className='fa fa-thumbs-o-up'></i> {i.likeCount.total}</div>
                                                                }
                                                                <div className='tt-col-value1 tt-color-select hide-mobile' ><i className='fa fa-reply'></i> {i.Count.total}</div>
                                                                {/* <div className='tt-col-value hide-mobile'><i className='fa fa-eye' aria-hidden='true'></i> 0</div> */}
                                                                <div className='tt-col-value1 hide-mobile'><i className='fa fa-clock-o' aria-hidden='true'></i> {getDatePartsSecond(i.CREATED_ON).relativeTime}</div>

                                                            </div>
                                                            <div className='reaply-box-user'>
                                                                <p>{i.COMMENT}</p>
                                                                <div className='reply-text-btn'>
                                                                    <a href='javascript:void(0)' onClick={() => this.onMouseClick(0, i.FORUM_COMMENT_ID, i.COMMENT)}><i className="fa fa-reply" aria-hidden="true"></i> Reply & Quotes</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            commentReplyById && commentReplyById.map((j) => {
                                                                if (j.COMMENT_ID == i.FORUM_COMMENT_ID) {
                                                                    return (
                                                                        <div className='dis-hed-section dis-rply-section-bx reply-by-reply-bx'>
                                                                            <div className='tt-item '>
                                                                                <div className='tt-col-avatar'>
                                                                                    <div className='tt-icon'>
                                                                                        <h5>{i.CANDIDATE_NAME ? i.CANDIDATE_NAME.split('')[0] : 'D'}</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='tt-col-description'>
                                                                                    <h6 className='tt-title'>Posted by: {j.CANDIDATE_NAME}</h6>
                                                                                </div>
                                                                                {this.state.commentlikeList?.map((item => item.REPLY_ID))?.includes(j.COMMENT_REPLY_ID) ?
                                                                                    <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.CommentReplyLikeCount(j.COMMENT_REPLY_ID, 'U')}><i style={{ color: 'red' }} className='fa fa-thumbs-o-up'></i> {j.likeCount.total}</div>
                                                                                    : <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.CommentReplyLikeCount(j.COMMENT_REPLY_ID, 'A')}><i className='fa fa-thumbs-o-up'></i> {j.likeCount.total}</div>
                                                                                }
                                                                                <div className='tt-col-value tt-color-select hide-mobile'><i className='fa fa-reply'></i> {j.replyCount.total}</div>                                                                                {/* <div className='tt-col-value hide-mobile'><i className='fa fa-eye' aria-hidden='true'></i> 0</div> */}
                                                                                <div className='tt-col-value2 hide-mobile' ><i className='fa fa-clock-o' aria-hidden='true'></i> {getDatePartsSecond(j.CREATED_ON).relativeTime}</div>
                                                                            </div>
                                                                            <div className='reaply-box-user'>
                                                                                <p>{j.COMMENT}</p>
                                                                                <div className='reply-text-btn'>
                                                                                    <a href="javascript:void(0)" onClick={() => this.onMouseClick(j.COMMENT_REPLY_ID, i.FORUM_COMMENT_ID, j.COMMENT)}><i class="fa fa-reply" aria-hidden="true"></i> Reply & Quotes</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                else return null
                                                            })
                                                        }
                                                    </>
                                                ))}


                                            </div>

                                        </div>

                                        <div className='add-reply-section-bx'>
                                            <form className='courses-form' >
                                                <div className='form-group'>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                        value={inputChange ? inputChange : ''}
                                                        onChange={(e) => this.setState({ inputChange: e.target.value.trimStart(), check: false })}></textarea>
                                                    {!inputChange && check && <span style={{ color: 'red' }}>Comment Reply Can't be Empty</span>}
                                                </div>
                                                <button className='default-btn' onClick={(event) => {
                                                    event.preventDefault()
                                                    this.onCommentSubmit()
                                                }}>Add Reply</button>


                                            </form>
                                        </div>

                                    </div>

                                </div>
                                <div className='col-md-3'>
                                    <div className='left-sidebar'>
                                        <div className='active-topics-box'>
                                            <h5 className='active-topics-title'>Create new topic?</h5>
                                            <p>Click below to create new forum topic</p>
                                            <div className='create-topic-button' onClick={() => this.setState({ openModal2: true })}>
                                                <a style={{ color: 'white', cursor: 'pointer' }} className='crate-topuc-button'>Start a New Topic</a>
                                            </div>
                                        </div>
                                        <div className='active-topics-box'>
                                            <h5 className='active-topics-title'>Hot Discussions</h5>
                                            {list1 && list1.map((i, index) => {
                                                if (index < 4) {
                                                    return (
                                                        <>
                                                            <div className='tt-col-description'>
                                                                <Link href={{
                                                                    pathname: constant.component.discussionForumDetails.url.replace(':url', `${i.URL}-${i.DISCUSSION_THREAD_ID}`),
                                                                    state: { url: i.URL, id: i.DISCUSSION_THREAD_ID, Likes: i.likeCount.total, Views: i.VIEW_COUNT }
                                                                }}
                                                                >
                                                                    <h6 className='tt-title' style={{ textTransform: 'capitalize' }}><a className='rg-onMouseHover'>{i.THREAD_TITLE?.length > 34 ? Parser(i.THREAD_TITLE.slice(0, 34)) + '...' : Parser(i.THREAD_TITLE)}</a></h6>
                                                                </Link>
                                                                <div className='row align-items-center no-gutters right-topic-box'>
                                                                    <div className='tt-col-value hide-mobile'> <i className='fa fa-clock-o' aria-hidden='true'></i> {getDateParts(i.CREATED_ON).relativeTime}</div>
                                                                    <div className='tt-col-value3 tt-color-select hide-mobile'><i className='fa fa-eye'></i> {i.VIEW_COUNT}</div>

                                                                </div>
                                                            </div>
                                                            {index < 3 && <hr />}
                                                        </>
                                                    )
                                                }
                                                else return null
                                            })}

                                        </div>

                                        <div className='topics-discussio-forum'>
                                            <h5 className='active-topics-title'>Top Categories</h5>
                                            <div className='popular-topics-list'>
                                                <ul>
                                                    
                                                    {list2 && list2.map((item, index) => {
                                                        if (index < 5) {
                                                            return (
                                                                <li style={{ cursor: 'pointer' }} onClick={() => this.categoryWiseFilter(item.DISCUSSION_CATEGORY_ID, item.DISCUSSION_CATEGORY_TITLE)}>{item.DISCUSSION_CATEGORY_TITLE?.length > 26 ? Parser(item.DISCUSSION_CATEGORY_TITLE.slice(0, 26)) + '...' : Parser(item.DISCUSSION_CATEGORY_TITLE)}</li>
                                                            )
                                                        } else return null
                                                    })
                                                    }
                                                </ul>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.openModal}
                            style={{ content: { top: "10%", left: '33%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                            onRequestClose={this.onCloseModal}
                        >
                            <DiscussionForumModal
                                closeModal={this.onCloseModal}
                                THREAD_ID={id}
                                COMMENT_ID={FORUM_COMMENT_ID}
                                TITLE={ThreadDetail}
                                COMMENT={COMMENT}
                                history={this.props.history}
                                COMMENT_REPLY_ID={this.state.COMMENT_REPLY_ID}
                            />
                        </Modal>

                        {
                            <Modal
                                isOpen={this.state.openModal2}
                                style={{ content: { top: "10%", left: '33%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                                onRequestClose={this.onCloseModal2}
                            >
                                <DiscussionDetailModal router={this.props.router} closeModal={this.onCloseModal2} closeOnSubmit={this.closeOnSubmit} />
                            </Modal>
                        }
                    </div>
                </div >
            </main >
        )
    }
}
export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }
    }

}