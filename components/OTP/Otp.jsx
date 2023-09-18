import React, { Component } from 'react'
import constant from 'constant';
import OtpInput from 'react-otp-input';
// import { getsessionStorage } from '../../utils';
import { getCookie } from 'cookies-next';

export default class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            addUpdate: getCookie(constant.keys.addAndUpdate)
            ? JSON.parse(getCookie(constant.keys.addAndUpdate))
            : '',
            data: getCookie('saveJobId') ? JSON.parse(getCookie('saveJobId')) :''
        }
    }

    componentDidMount=()=>{
        let au= getCookie(constant.keys.addAndUpdate)
        ? JSON.parse(getCookie(constant.keys.addAndUpdate))
        : '';
        let data=getCookie('saveJobId') ? JSON.parse(getCookie('saveJobId')) :'';
        this.setState({addUpdate:au, data:data})
    }

    verifyOTP = () => {
        //   const {first, second, third, fourth, five, sixth}=this.state
        //   let mob_otp=first.toString()+second.toString()+third.toString()+fourth.toString()+five.toString()+sixth.toString()
        //   console.log(mob_otp,'otp');
        this.props.verifyOTP(this.state.otp)
    }

    reSendOTP = () => {
        this.props.reSendOTP()
    }

    handleChange = (otp) => {
        this.setState({ otp })
    }

    skipHandler = (e) => {
        e.preventDefault()
        const { JOB_ID } = this.state.addUpdate ? this.state.addUpdate : ''
        if (JOB_ID) {
            this.props.history.push(constant.component.recommendedJobs.url)
        } else if (this.state.data) {
            this.props.history.push(constant.component.savedJobs.url)
        }
        else {
            this.props.history.push(constant.component.editProfile.url)
        }
    }

    render() {
        return (
            <React.Fragment>
                <form>

                    <div className='row'>
                        <div className='col-12'>
                            <div className='otpimg'>
                                <img src={'../../assets/images/touch.png'} alt="OTP"/>
                            </div>
                            <h3>Verification</h3>
                            <p>You will receive an OTP via Mobile</p>
                        </div>
                        <div class="col-12 justify-content-center">

                            <OtpInput
                                value={this.state.otp}
                                onChange={this.handleChange}
                                numInputs={6}
                                isInputNum={true}
                                separator={<span style={{ visibility: 'hidden' }}>-</span>}
                                inputStyle={{ width: '40px', padding: '3px' }}
                                containerStyle={{ justifyContent: 'center' }}
                            />
                            {/* <div className='form-group'>
                                <NumericFormat className='otpnum' name='first'
                                    maxLength="1" onChange={(e)=>this.setState({first:e.target.value})}
                                />
                                <NumericFormat className='otpnum' name='second'  maxLength="1" onChange={(e)=>{this.setState({second:e.target.value})}}/>
                                <NumericFormat className='otpnum' name='third'  maxLength="1" onChange={(e)=>{this.setState({third:e.target.value})}}/>
                                <NumericFormat className='otpnum' name='fourth'  maxLength="1" onChange={(e)=>{this.setState({fourth:e.target.value})}}/>
                                <NumericFormat className='otpnum' name='five'  maxLength="1" onChange={(e)=>{this.setState({five:e.target.value})}}/>
                                <NumericFormat className='otpnum' name='sixth'  maxLength="1" onChange={(e)=>{this.setState({sixth:e.target.value})}}/>
                            </div> */}
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-12 text-center pb-3 pt-3">
                            <button type='button' className='rg-btn rg-active btn-primary mr-2' onClick={this.verifyOTP}>VERIFY</button>
                        </div>
                        {<p  style={{ color: '#EE5A63', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}><div onClick={(e) => this.skipHandler(e)}>skip</div></p>}
                        <p>Didn't receive the verification OTP?<span style={{ color: '#e81c28', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.reSendOTP}> Resend again</span></p>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

