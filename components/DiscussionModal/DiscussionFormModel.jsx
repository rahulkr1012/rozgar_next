import React, { Component } from 'react'
import swal from 'sweetalert'
import constant from '../../constant'
import Parser from 'html-react-parser';
import { QAsendThreadCommentReply } from '@/action/discussionFormAction';
import { getCookie } from 'cookies-next';
export default class discussionForumModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
            file: {},
            fileChange: undefined,
            getFile: undefined,
            categoryDropdown: undefined,
            categoryId: undefined,
            message: undefined,
            title: undefined,
            commentReply: undefined,
            commentReplyById: undefined,
            check: false,
        }
    }
    componentDidMount() {
        console.log("props", this.props);
    }
    ThreadCommentReply = (model) => {
        console.log(model,"model");
        QAsendThreadCommentReply(model).then((res) => {
            this.setState({ commentReply: res.result })
            if (res.result) {
                swal({
                    icon: "success",
                    text: "Success: Reply Sent.",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                })
                this.submitModalWindow()
            }
        }).catch((err) => {
            alert(err)
        })
    }

    onSubmit = () => {
        debugger
        this.setState({ check: true })
        const ThreadCommentReply = JSON.parse(sessionStorage.getItem("ThreadCommentReply"))
        const { title, message, categoryId, reply } = this.state
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        const { TITLE, COMMENT, COMMENT_ID, THREAD_ID } = this.props

        const { COMMENT_REPLY_ID } = this.props
        if (message && COMMENT_REPLY_ID != 0) {
            if (CANDIDATE_ID) {
                const st = {
                    COMMENT: message,
                    COMMENT_ID: COMMENT_ID,
                    CANDIDATE_ID: CANDIDATE_ID,
                    THREAD_ID: THREAD_ID,
                    COMMENT_REPLY_ID:COMMENT_REPLY_ID
                }
                this.ThreadCommentReply(st)
            }
            else {
                const st = {
                    COMMENT: message,
                    COMMENT_ID: COMMENT_ID,
                    CANDIDATE_ID: CANDIDATE_ID,
                    THREAD_ID: THREAD_ID,
                    COMMENT_REPLY_ID:COMMENT_REPLY_ID
                }
                window.sessionStorage.setItem("ThreadCommentReply", JSON.stringify(data))
                this.props.router.push({ pathname: constant.component.discussionForumSignIn.url })

            }
        }
        else if (message) {
            if (CANDIDATE_ID) {
                const st = {
                    COMMENT: message,
                    COMMENT_ID: COMMENT_ID,
                    CANDIDATE_ID: CANDIDATE_ID,
                    THREAD_ID: THREAD_ID
                }
                this.ThreadCommentReply(st)
            }
        }
    }
    submitModalWindow = () => {
        this.props.closeModal()
    }
    onDropdownClick = (id) => {
        this.setState({ categoryId: id })
    }
    render() {
        const { categoryDropdown, title, message, check } = this.state;
        const { TITLE, COMMENT } = this.props
        return (
            <React.Fragment>
                <p style={{ float: 'right', fontSize: '1.4em', color: 'grey', cursor: 'pointer', fontWeight: 'bold' }} onClick={this.submitModalWindow}>X</p>
                <div className='' style={{ margin: '2em', color: '#666', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: '500', fontSize: '20px', color: '#666', textTransform: 'capitalize', width: '22.5em' }}>
                            {TITLE.THREAD_TITLE?.length > 64 ? Parser(TITLE.THREAD_TITLE.slice(0, 64)) + '...' : Parser(TITLE.THREAD_TITLE)}
                        </p>

                        <div className='form-group' style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ width: '33em', textTransform: 'capitalize' }}>
                                {COMMENT?.length > 74 ? Parser(COMMENT.slice(0, 74)) + '...' : Parser(COMMENT)}
                            </p>
                            <textarea type="text" placeholder='Reply' className='mb-2 form-control' style={{ padding: '4px 10px', height: '9em' }} value={message ? message : ''} onChange={(e) => this.setState({ message: e.target.value.trimStart(), check: false })} />
                            {!message && check && <span style={{ color: 'red' }}>Comment Reply Cannot be Empty</span>}
                        </div>
                        <div>
                            <button className='rg-onButtonHover' style={{ display: 'flex', justifyContent: 'center', width: '6em' }} onClick={this.onSubmit}>
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

