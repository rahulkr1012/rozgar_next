import React, { Component } from 'react'
import Modal from "react-modal"
import DiscussionDetailModal from "components/DiscussionModal/DiscussionDetailsModal";
import Picss from 'src/assets/images/profilePic/secondary.jpg'
import moment from 'moment';
import { LikeCountThread, LikeList, QACreateThread, qaDiscussionThreadListView, qaDiscussionThreadlatestTopic } from '@/action/discussionFormAction';
import constant from 'constant';
import Link from 'next/link';
import Parser from 'html-react-parser';
import { getDateParts, getDatePartsSecond, getStorage } from '../../utils';
import swal from 'sweetalert';
import answerImage from 'src/assets/images/answer.png'
import { withRouter } from 'next/router';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

export default withRouter(class DiscussionForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      // onKeywordChange: this.props.history.location.state ? this.props.history.location.state.searchThreat : "",
      loader: undefined,
      path: undefined,
      detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
      likeList: undefined,
      list2: undefined
    }
  }


  componentDidMount() {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
    //  this.setState({onKeywordChange:this.props.router.asPath.state.searchThreat?this.props.router.asPath.state.searchThreat:""})
    this.DiscussionThreadList()
    this.setState({ path: window.location.href })

    this.props.router.push({ state: '' })

    this.LikeList()
    this.DiscussionSearchByInput1()
    const threadSubmitData = JSON.parse(sessionStorage.getItem('ThreadData'))
    if (threadSubmitData && CANDIDATE_ID) {
      this.CreateThread(threadSubmitData)
    }
  }
  LikeList = () => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
    LikeList(CANDIDATE_ID).then((res) => {
      this.setState({ likeList: res.result?.map(i => i.DISCUSSION_THREAD_ID) })
    }).catch((err) => {
      alert(err)
    })
  }
  LikeCountThread = (Id, status) => {
    
    const { onKeywordChange } = this.state
    const  {CANDIDATE_ID}  = this.state.detail
    const DISCUSSION_THREAD_ID = Id
    if(this.props.ud!=null){
      const model = {
        CANDIDATE_ID: CANDIDATE_ID,
        DISCUSSION_THREAD_ID: DISCUSSION_THREAD_ID,
        Status: status
      }
      LikeCountThread(model).then((res) => {
        
        this.props.DiscussionSearchByInput1(onKeywordChange)
        this.LikeList()
      }).catch((err) => {
  
      })
    }else{
      this.props.router.push(constant.component.discussionForumSignIn.url)
    }
   
  }
  onMouseClick = () => {
    this.setState({ openModal: true })
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
    // this.props.DiscussionList()
  }
  closeOnSubmit = () => {
    this.setState({ openModal: false })
    this.props.DiscussionList()
  }
  onInputChange = () => {
    const { onKeywordChange } = this.state
    this.setState({ newKeyword: onKeywordChange })
    this.props.DiscussionSearchByInput(onKeywordChange)
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
        this.closeOnSubmit()
      }
    }).catch((err) => {
      // swal({
      //     icon: "warning",
      //     text: err,
      //     timer: 2000,
      //     showCancelButton: false,
      //     showConfirmButton: false,
      // })
    })
    sessionStorage.removeItem("ThreadData")
  }

  categoryWiseFilter = (DISCUSSION_CATEGORY_ID, DISCUSSION_CATEGORY_TITLE) => {
    this.props.router.push({
      pathname: constant.component.discussionForumCategory.url.replace(":category", DISCUSSION_CATEGORY_TITLE),
      state: { DISCUSSION_CATEGORY_ID: DISCUSSION_CATEGORY_ID, DISCUSSION_CATEGORY_TITLE: DISCUSSION_CATEGORY_TITLE }
    })
  }
  onInputChangeEvent = (e) => {
    const Value = e.target.value
    this.setState({ onKeywordChange: e.target.value })
  }
  render() {
    const { List } = this.props
    const { onKeywordChange, list1, list2, likeList, newKeyword } = this.state

    if (this.props.router.asPath !== this.state.path) {
      this.setState({ path: this.props.router.asPath })
      if (onKeywordChange) {
        this.onInputChange()
      }
    }
    return (
      <React.Fragment>
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
                    <div className="rozgar-jobbylocsearchbox">
                      <div className="rozgar-formbox">
                        <div className="rozgar-jobbylocsearchcontent">
                          <div className="form-group" >
                            <i className="lnr lnr-magnifier"></i>
                            <input type="text" name="keyword" className="form-control" onKeyDown={(e) => {
                              if (e.key == 'Enter') {
                                this.onInputChange()
                              }
                            }}
                              placeholder="Search your topics here..." value={onKeywordChange ? onKeywordChange : ''} onChange={(e) => this.onInputChangeEvent(e)} />
                          </div>
                        </div>
                        <div className="rozgar-jobbylocsearchbtn" onClick={this.onInputChange}>
                          <a style={{ color: 'white', cursor: "pointer" }}><i className="lnr lnr-magnifier"></i></a>
                        </div>
                      </div>
                    </div>
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
                        <li className={newKeyword ? "" : "active"}><a href=''>Forum</a></li>
                        {newKeyword && <li className='active'> Search Result  <a href=''>"{newKeyword}"</a> </li>}
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

                      <div className='tt-topic-list'>
                        <div className='answer-action shadow'>
                          <div className='action-content'>
                            <div className='image-wrap'>
                              <Image src={answerImage} alt='answer action' />
                            </div>
                            <div className='content'>
                              <h2 className='ans-title'>Didn't find what you're looking for?</h2>
                              <p> How about starting a new conversation by creating a new post! </p>
                            </div>
                          </div>
                          <div className='action-button-container' onClick={this.onMouseClick}>
                            <a className='rg-onButtonHover' style={{ cursor: 'pointer' }}>Create a Thread</a>
                          </div>

                        </div>
                        <div className='tt-list-header'>
                          <div className='tt-col-topic'>Topic</div>
                          <div className='tt-col-value hide-mobile'>Likes</div>
                          <div className='tt-col-value hide-mobile'>Replies</div>
                          <div className='tt-col-value hide-mobile'>Views</div>
                          <div className='tt-col-value' style={{ paddingLeft: '0px', width: '11%' }}>Created On</div>
                        </div>
                        {!List?.length &&
                          <span className='col-12 col-sm-12' style={{ color: 'red', fontSize: '1.2em', marginLeft: "430px" }}>No Result Found </span>
                        }

                        {List && List?.map((i) => {
                          console.log(i,"item");
                          return (
                            <div className='tt-item tt-itemselect'>
                              <div className='tt-col-avatar'>
                                <React.Fragment className='tt-icon'>
                                  {/* <h5>H</h5> */}
                                  {i.PROFILE_IMAGE ?
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${i.CANDIDATE_ID}/${i.PROFILE_IMAGE}`} 
                                    style={{ borderRadius: '25px' }} width={60} height={40}/> :
                                    <Image src={Picss} style={{ borderRadius: '25px' }} />}
                                </React.Fragment>
                              </div>
                              <div className='tt-col-description'>
                                {/* style={{width:'51%'}} */}
                                <Link href={{
                                  pathname: constant.component.discussionForumDetails.url.replace(':url', `${i.URL}-${i.DISCUSSION_THREAD_ID}`),
                                  state: { url: i.URL, DISCUSSION_CATEGORY: i.DISCUSSION_CATEGORY, id: i.DISCUSSION_THREAD_ID, Likes: i.likeCount.total, Views: i.VIEW_COUNT }
                                }}
                                >
                                  <h6 className='tt-title' style={{ textTransform: 'capitalize' }}>
                                    <a className='rg-onMouseHover' style={{ fontWeight: '500', cursor: 'pointer' }}>
                                      {i.THREAD_TITLE?.length > 45 ? Parser(i.THREAD_TITLE.slice(0, 45)) + '...' : Parser(i.THREAD_TITLE)}
                                    </a>
                                  </h6>
                                </Link>
                                <div className='row align-items-center no-gutters'>
                                  <div className='col-11'>
                                    <p className='by-forum-update' style={{ fontSize: '13px', fontWeight: '400', marginBottom: '0px' }}>Posted by : <span style={{ fontWeight: '500' }}>{i.CANDIDATE_NAME}</span></p>
                                    <p className='fourm-cat-box' style={{ height: '0.6em' }}> {i?.DISCUSSION_CATEGORY_TITLE && <React.Fragment>Category: <span>{i.DISCUSSION_CATEGORY_TITLE}</span></React.Fragment>} </p>

                                  </div>

                                </div>
                              </div>

                              {likeList?.map((item => item))?.includes(i.DISCUSSION_THREAD_ID) ?
                                <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.LikeCountThread(i.DISCUSSION_THREAD_ID, 'U')}><i style={{ color: 'red' }} className='fa fa-thumbs-o-up'></i> {i.likeCount.total}</div>
                                : <div className='tt-col-value1 hide-mobile' style={{ cursor: 'pointer' }} onClick={() => this.LikeCountThread(i.DISCUSSION_THREAD_ID, 'A')}><i className='fa fa-thumbs-o-up'></i> {i.likeCount.total}</div>
                              }
                              <div className='tt-col-value1 tt-color-select hide-mobile'><i className='fa fa-reply'></i> {i.Count.total}</div>
                              <div className='tt-col-value1 hide-mobile'><i className='fa fa-eye' aria-hidden='true'></i> {i.VIEW_COUNT}</div>
                              <div className='tt-col-value1 hide-mobile' style={{ padding: '0px' }}><i className='fa fa-clock-o' aria-hidden='true'></i> {getDatePartsSecond(i.CREATED_ON).relativeTime}</div>
                              {/* style={{width:'179px'}} */}

                            </div>
                          )
                        })
                        }
                        {/* {!List?.length && <span className='col-12 col-sm-12' style={{ color: 'red', fontSize: '1.2em' }}>No Result Found </span>} */}

                      </div>
                      {/* <nav className='Page navigation example'>
                                                <ul className='pagination justify-content-center'>
                                                    <li className='page-item' style={{backgroundColor:'#f8f8f8',padding:'0 5px',borderRadius:'5px'}}><a className='' href='#' style={{color:'grey'}}><i className='arrow_carrot-left'></i> Previous</a></li>
                                                    <li className='page-item active'><a className='page-link' href='#'>1</a></li>
                                                    <li className='page-item'><a className='page-link' href='#'>2</a></li>
                                                    <li className='page-item'><a className='page-link' href='#'>3</a></li> 
                                                    <li className='page-item'><a className='page-link' href='#'>...</a></li>
                                                    <li className='page-item'><a className='page-link' href='#'>21</a></li>
                                                    <li className='page-item' style={{backgroundColor:'#f8f8f8',padding:'0 5px',borderRadius:'5px'}}><a className='' href='#' style={{color:'grey'}}>Next <i className='arrow_carrot-right'></i></a></li>
                                                </ul>
                                            </nav>    */}
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='left-sidebar'>
                      <div className='active-topics-box'>
                        <h5 className='active-topics-title'>Hot Discussions</h5>
                        {list1 && list1?.map((i, index) => {
                          let date = moment(i.CREATED_ON).toNow('yy').replace('a', 1);
                          if (index < 4) {
                            return (
                              <>
                                <div className='tt-col-description'>
                                  <Link href={{
                                    pathname: constant.component.discussionForumDetails.url.replace(':url',`${ i.URL}-${i.DISCUSSION_THREAD_ID}`),
                                    query: { url: i.URL, DISCUSSION_CATEGORY: i.DISCUSSION_CATEGORY, id: i.DISCUSSION_THREAD_ID, Likes: i.likeCount.total, Views: i.VIEW_COUNT }
                                  }}
                                  as={`/topic/${i.URL}-${i.DISCUSSION_THREAD_ID}`}
                                  >
                                    <h6 className='tt-title' style={{ textTransform: 'capitalize' }}><a className='rg-onMouseHover'>{i.THREAD_TITLE?.length > 34 ? Parser(i.THREAD_TITLE.slice(0, 34)) + '...' : Parser(i.THREAD_TITLE)}</a></h6>
                                  </Link>
                                  <div className='row align-items-center no-gutters right-topic-box'>
                                    <div className='tt-col-value hide-mobile'> <i className='fa fa-clock-o' aria-hidden='true'></i> {getDateParts(i.CREATED_ON).relativeTime}</div>

                                    <div className='tt-col-value3 tt-color-select hide-mobile'><i className='fa fa-eye'></i> {i.VIEW_COUNT}</div>

                                  </div>
                                  {/* <div className='tt-col-value hide-mobile'>0 Views</div>
                                                </div> */}
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
                            {list2 && list2?.map((item, index) => {
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
                <DiscussionDetailModal router={this.props.router} closeModal={this.onCloseModal} closeOnSubmit={this.closeOnSubmit} />
              </Modal>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}
)