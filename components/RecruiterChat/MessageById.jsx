import React, { Component } from 'react'
import constant from '../../constant';
import { getStorage } from '@/utils';
import { onChange } from '@/utils';
import moment from 'moment';
import image from 'src/assets/images/no-message.png'
import NoAvatarPic from 'src/assets/images/no-avatar-pic.png'
import { getMessage } from '@/action/CandidateAction';
import Image from 'next/image';
export default class MessageById extends Component {

    constructor(props) {
        super(props)
        this.state = {

            message: { name: 'message', value: "", error: "" },
            communicationList: undefined,
            // cd: getStorage(constant.keys.cd),
            msgBody: [],
            employer_data: ""

        }
    }

    componentDidMount() {

    }



    componentDidUpdate(prevProps, prevState, snapshot) {



        //  this.setState({employer_data:this.props.data} , ()=>{
        //  })           
        //  if(prevState.employer_data.EMPLOYER_ID!=this.state.employer_data.EMPLOYER_ID) {

        //     let model = {
        //        EMPLOYER_ID: this.state.employer_data.EMPLOYER_ID,
        //        CANDIDATE_ID:this.state.cd.CANDIDATE_ID
        //       } 

        //       getMessage(model).then(res=>{
        //        if(res.status){
        //            console.log("messages " , res.result);
        //             this.setState({msgBody:res.result})

        //        }
        //     }).catch(err=>{
        //        window.alert(err)
        //     })
        // }

        if (this.props.updatedMsg != prevProps.updatedMsg) {
            this.setState({ msgBody: this.props.updatedMsg })
        } else {



            if (this.props.data != prevProps.data) {

                this.setState({ employer_data: this.props.data })
                let model = {
                    EMPLOYER_ID: this.props.data.EMPLOYER_ID,
                    CANDIDATE_ID: this.state.cd.CANDIDATE_ID,
                    JOB_ID: this.props.data.JOB_ID
                }

                getMessage(model,this.props.token).then(res => {
                    if (res.status) {
                        this.setState({ msgBody: res.result })

                    }
                }).catch(err => {
                    window.alert(err)
                })


            }

        }



    }

    onChange = (e) => {
        const { name, value } = e.target;
        // let fms = message.value + e.key
        onChange(this, name, value);

    };



    sendMsg(e) {
        e.preventDefault();
        this.props.onAddMessage({ type: "candidate_msg", data: this.state, emp_data: this.state.employer_data })
        onChange(this, "message", "")

    }

    render() {
        const { message, msgBody, cd } = this.state
        return (
            <React.Fragment>


                <div className='col-md-8'>
                    <div className='recruiter-messagebox'>
                        <div className='recruiter-message-chat'>
                            <div className='d-flex align-items-end'>
                                <div className='persionchatimg'>
                                    <Image  src={!this.state.employer_data.COMPANY_LOGO ? NoAvatarPic :`https://cp-api.rozgar.com/company/logo/${this.state.employer_data.COMPANY_LOGO}`} />
                                </div>
                                <div className='persionchatmsg'>
                                    {this.state.employer_data != undefined ?
                                        <h3 style={{ paddingBottom: "24px" }}>{this.state.employer_data.COMPANY_NAME}</h3> : ""
                                    }
                                    {/* <p className='persionchat-name'>Commdex LLP</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='recruiter-message-write'>
                            {this.state.msgBody == 0 ?
                                <Image src={image} style={{ marginLeft: "150px" }} />
                                : ""
                            }
                            <ul className='chat-conversation'>




                                {msgBody.length > 0 &&
                                    msgBody.map((item, index) => {
                                        return (
                                            <React.Fragment>

                                                {(item.EMPLOYER_STATUS == "S" && this.props.data.EMPLOYER_ID == item.EMPLOYER_ID) ?
                                                    <li>
                                                        <div className='conversation-list'>
                                                            <div className='user-chat-content'>
                                                                <div className='ctext-wrap'>
                                                                    <div className='ctext-wrap-content'>
                                                                        <p class="mb-0"> {item.MESSAGE}  </p>
                                                                        <p class="chat-time mb-0"><i class="fa fa-clock align-middle"></i> <span class="align-middle">{moment(item.SEND_ON).format("YYYY-MM-DD HH:mm")}</span></p>
                                                                    </div>
                                                                </div>
                                                                {/* <div class="conversation-name"> Doris Brown </div> */}
                                                            </div>
                                                        </div>
                                                    </li> : ""}

                                                {
                                                    (item.CANDIDATE_STATUS == "S" && cd.CANDIDATE_ID == item.CANDIDATE_ID) ? <li className='right'>
                                                        <p className='chat-date-year text-right'>{moment(item.SEND_ON).format("YYYY-MM-DD")}</p>
                                                        <div className='conversation-list'>
                                                            <div className='user-chat-content'>
                                                                <div className='ctext-wrap'>
                                                                    <div className='ctext-wrap-content'>
                                                                        <p className="mb-0">{item.MESSAGE}</p>
                                                                        <p className="chat-time mb-0"> <i className="fa fa-clock align-middle"></i> <span class="align-middle">{moment(item.SEND_ON).format("HH:mm")}</span></p>

                                                                    </div>
                                                                </div>
                                                                <div className="conversation-name">
                                                                    {/* Patricia Smith */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li> : ""
                                                }


                                            </React.Fragment>
                                        )
                                    })
                                }





                            </ul>

                        </div>
                        <form onClick={(e) => this.sendMsg(e)}>
                            <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
                                <div className="row g-0">
                                    <div className="col">
                                        <input type="text"
                                            id="msg"
                                            className="form-control form-control-lg bg-light border-light chat-send-box"
                                            name={message.name}
                                            value={message.value}
                                            onChange={e => this.onChange(e)}
                                            placeholder="Enter Message..." />
                                    </div>
                                    <div className="col-auto">
                                        <div className="chat-input-links ms-md-2 me-md-0">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item">
                                                    <button type="submit" onClick={(e) => this.sendMsg(e)} className="btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                                                        <i className="fa fa-send"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>




            </React.Fragment>
        )
    }
}
