import React, { Component } from 'react'
import swal from 'sweetalert'
// import { deleteProfilePic, getProfilePic, uploadProfilePic } from '../../action/CandidateAction'
import constant from '../../constant'
import { getStorage } from '../../utils'
// import Pic from "../../assets/images/profilePic/secondary.jfif"
// import { border } from '@mui/system'
import { QACreateThread, qaDiscussionForumCategory } from '@/action/discussionFormAction'
import { getCookie } from 'cookies-next'
export default class discussionDetailsModal extends Component {
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
            goforSignIn: false

        }
    }
    componentDidMount() {
        this.DiscussionForumCategory()
    }

    DiscussionForumCategory = () => {
        qaDiscussionForumCategory().then((res) => {
            this.setState({ categoryDropdown: res.result })
        }).catch((err) => {
            alert(err);
        })
    }
    CreateThread = (modal) => {
        QACreateThread(modal).then((res) => {
            if (res.status) {
                swal({
                    icon: "success",
                    text: `  ${res.messageCode}`,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                })
                this.submitModalWindow()
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
    }
    onSubmit = () => {
        const { title, message, categoryId } = this.state
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        const data = {
            DISCUSSION_CATEGORY: categoryId,
            THREAD_TITLE: title,
            THREAD_DETAILS: message,
            CREATED_BY: CANDIDATE_ID
        }
        if (data.DISCUSSION_CATEGORY && data.THREAD_TITLE && data.THREAD_DETAILS && data.CREATED_BY) {
            this.CreateThread(data)
        }
        // else if (!data?.CREATED_BY) {
        //     this.props.history.push({ pathname: constant.component.discussionForumSignIn })
        // }
        else if (!data.DISCUSSION_CATEGORY || !data.THREAD_TITLE || !data.THREAD_DETAILS) {
            swal({
                icon: "warning",
                text: "Please fill all required details",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
            })
        }
        else if (!data.CREATED_BY) {
             window.sessionStorage.setItem("ThreadData", JSON.stringify(data))
            this.props.router.push({ pathname: constant.component.discussionForumSignIn.url })
        }
    }
    closeModalWindow = () => {
        this.props.closeModal()
    }
    submitModalWindow = () => {
        this.props.closeOnSubmit()
    }
    onDropdownClick = (id) => {
        this.setState({ categoryId: id })
    }
    render() {
        const { categoryDropdown, title, message } = this.state;
        return (
            <React.Fragment>
                <p style={{ float: 'right', fontSize: '1.4em', color: 'grey', cursor: 'pointer', fontWeight: 'bold' }} onClick={this.closeModalWindow}>X</p>
                <div className='' style={{ margin: '2em', color: '#666', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '2em', color: '#666' }}>Start a New Topic</p>

                        <div className='form-group' style={{ display: 'flex', flexDirection: 'column' }}>

                            <input type="text" placeholder='Title' className='mb-2 form-control' style={{ padding: '0px 10px' }} value={title ? title : ''} onChange={(e) => this.setState({ title: e.target.value })} />

                            <select className='mb-2 form-control' onChange={(event) => this.onDropdownClick(event.target.value)} style={{ padding: '0px 10px' }}>
                                <option value="">Select a Category</option>
                                {categoryDropdown && categoryDropdown.map((item, index) => (
                                    <option value={item.DISCUSSION_CATEGORY_ID}>{item.DISCUSSION_CATEGORY_TITLE}</option>
                                ))
                                }
                            </select>
                            <textarea type="text" placeholder='Topic Details' className='mb-2 form-control' style={{ padding: '4px 10px', height: '9em' }} value={message ? message : ''} onChange={(e) => this.setState({ message: e.target.value })} />
                        </div>
                        <div>
                            <button className='rg-onButtonHover' style={{ display: 'flex', justifyContent: 'center', width: '389px' }} onClick={this.onSubmit}>
                                Create New Discussion
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

