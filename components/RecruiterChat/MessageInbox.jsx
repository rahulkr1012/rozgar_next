import React, { Component } from 'react'
import { capFirstLetterInSentence, clearForm, getStorage, onChange } from '../../utils'
import MessageById from './MessageById'
import constant from 'constant'
import avtar from 'src/assets/images/no-avatar-pic.png'
import { CandidateMessage, CandidateToRecruiterMessage, CommunicationListByJob, getMessage } from '@/action/CandidateAction'
import Head from 'next/head'
import { getCookie } from 'cookies-next'


export default class InboxMessage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: { name: 'message', value: "", error: "" },
            msgData: null,
            communicationList: undefined,
            updatedMsg: [],
            cd:this.props.ud.CANDIDATE_ID ,
            token:this.props.ud.token 
        }
    }

    onAddMessage = (action) => {
           const  {token}  = this.state 
        if (action.type == "candidate_msg") {

            const { data } = action
            const { message } = data
            const { EMPLOYER_ID } = action.emp_data
            const { JOB_ID } = action.emp_data

            const model = {
                MESSAGE: message.value,
                USER_TYPE: "CANDIDATE",
                EMPLOYER_ID: EMPLOYER_ID,
                JOB_ID: JOB_ID
            }

            if (model.MESSAGE.length > 0) {

                CandidateToRecruiterMessage(model , token ).then((res) => {
                    
                    if (res.status) {
                        let model = {
                            EMPLOYER_ID: this.state.msgData.EMPLOYER_ID,
                            CANDIDATE_ID: this.state.cd.CANDIDATE_ID,
                            JOB_ID: this.state.msgData.JOB_ID
                        }

                        getMessage(model , token ).then(res => {
                            if (res.status) {
                                this.setState({ updatedMsg: res.result })
                            }
                        }).catch(err => {
                            router.alert(err)
                        })

                    } else {
                        // alert(res.error)
                    }
                })

            }

        }


        else {
            const { message } = this.state
            const model = {
                MESSAGE: message.value,
            }
            if (message.value.length > 0) {


                CandidateMessage(model , token).then((res) => {
                    if (res.status) {
                    }
                })
            }

        }


    }

    componentDidMount() {

        const  {token}  = this.state 

        CommunicationListByJob({ CANDIDATE_ID: this.state.cd.CANDIDATE_ID, JOB_ID: this.props.JOB_ID } , token).then((res) => {
            if (res.status) {
                this.setState({ communicationList: res.result.list })
                res.result.list.length && this.getData(res.result.list[0])
            }
        })

    }





    getData(empData) {
        this.setState({ msgData: empData })


    }


    render() {
        const { message, communicationList } = this.state
         
        return (
            <React.Fragment>
               
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-profilesearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className='profile-performance-head'>
                                            <h2 className='chat-headtext'>Recruiter Communication</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className='pptopminushead'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='recruiter-messagebox'>
                                            <div className='recruiter-messagebox-head'>Message</div>
                                            <ul className='recruiter-messagebox-tabs'>

                                                {communicationList && communicationList.length > 0 ? communicationList.map((item, index) => {
                                                    return (
                                                        <li onClick={() => this.getData(item)}  >
                                                            <a className='active '  >
                                                                <div className='d-flex p-2'>
                                                                    <div className='persionimg'><img src={!item.COMPANY_LOGO ? avtar :`https://cp-api.rozgar.com/company/logo/${item.COMPANY_LOGO}`} /></div>
                                                                    <div className='chatpersion-name'>
                                                                        <h3>{item.COMPANY_NAME}</h3>
                                                                        <p>Company Recruiter at Company</p>
                                                                        <p>{item.JOB_TITLE}</p>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <span className='chat-message-text'>Hi</span>
                                                                            <span className='chat-message-text'>6:20 pm</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                }) : <h5 className='text-danger' style={{ marginTop: "20px", marginLeft: "20px" }}>There is no recruiter message</h5>
                                                }


                                            </ul>
                                            <div className='py-4'></div>
                                        </div>
                                    </div>


                                   <MessageById updatedMsg={this.state.updatedMsg} data={this.state.msgData} onAddMessage={this.onAddMessage} token={this.state.token}/>



                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
