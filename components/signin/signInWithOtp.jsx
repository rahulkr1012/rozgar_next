import React, { Component } from 'react'
import constant from 'constant'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react'
import swal from 'sweetalert'
import logo from '@/assets/images/logo.png'
import { withRouter } from 'next/router';
import { LoginMobileOtpVerify, LoginwithMobile } from '@/action/CandidateAction';
import Link from 'next/link';
import Image from 'next/image';
import LinkedInPage from 'components/common/linkedIn';
import GoogleLoginPage from 'components/common/googlelogin';
import { timers } from 'jquery';
class Signinwithotp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: 25,
            otp: '',
            email: '',
            password: '',
            remember: false,
            error: {},
            showModal: false,
            passwordShow: false,
            mobile: ''
        }
    }

    componentDidMount() {
        this.startTimer();
      }
    
      componentWillUnmount() {
        this.clearTimer();
      }

      startTimer = () => {
        this.timerInterval = setInterval(() => {
          this.setState((prevState) => ({
            timer: prevState.timer - 1,
          }), () => {
            if (this.state.timer === 0) {
              this.clearTimer();
            }
          });
        }, 1000);
      };
    
      clearTimer = () => {
        clearInterval(this.timerInterval);
      };


      formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${seconds}`;
      };
    
    onChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= 10) {
            this.setState({
                [name]: value
            })
            if (value.length == 10) {
                let data = this.state
                let error = {}
                let isValid = true
                var pattern = new RegExp("^[0-9]{10}$");
                if (!pattern.test(value)) {
                    error.mobile = "Please enter a valid mobile number"
                }

                this.setState({
                    error: error
                })


            }
            else {
                let error = {}
                error.mobile = ''
                this.setState({
                    error: error
                })
            }
        }



    }


    handleLogin = (googleData) => {
        this.props.googleLoginHandler(googleData)
    }

    onVerifyOtp = (e) => {
        e.preventDefault();
        const { otp, mobile } = this.state
        if (otp.length == 6) {
            const model = {
                MobileNo: '+91' + mobile,
                mob_otp: otp
            }
            this.setState({ showLoader: true })

            LoginMobileOtpVerify(model).then((res) => {
                this.setState({ showLoader: false })
                if (res.status) {
                    this.setState({ showLoader: false })
                    swal({
                        icon: "success",
                        text: "You have Successfully Logged In",
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                    
                    const qParam = this.props.router.query
                    if (qParam.personalRecruiter) {
                        this.props.router.push(constant.component.PersonalRecruiter.url)
                    }
                    else {
                        this.props.router.push(constant.component.editProfile.url)

                    }
                } else {
                    this.setState({ showLoader: false })
                    swal({
                        icon: "error",
                        text: res.error,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                }
            });

        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { error, mobile,timer } = this.state;
        if (!error?.mobile?.length || !mobile.length != 10) {
            this.setState({ showLoader: true, showModal: true })
            const model = { MobileNo: '+91' + mobile }
            LoginwithMobile(model).then((res) => {
                this.setState({ showLoader: false })
                
             
            });
       this.clearTimer()
       this.setState({ timer: 25 })
       this.startTimer(timer)
       

        }

    }



    render() {
        const { showModal, error, mobile, otp, showLoader, time ,timer} = this.state

        return (
            <React.Fragment>

                {showLoader &&
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
                        </LoadingOverlay></div>}
                <main id="rg-main" class="rg-main rg-haslayout ptb-0">
                    <section class="fxt-template-animation fxt-template-layout4">
                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-12 push-md-5 col-md-7 fxt-bg-color">
                                    <div class="fxt-content topbom">
                                        <div className='employer-login-link'>
                                            <a target='_blank' href={'https://recruit.rozgar.com/'}>Employer Login</a>
                                        </div>
                                        <div className="fxt-transformY-50 fxt-transition-delay-1">
                                            <a href="/" className="mobile-Lfxt-logo"><Image src={logo} alt="Logo" /></a>
                                        </div>
                                        <h4>Login</h4>
                                        <div class="fxt-form">
                                            <form onSubmit={(e) => { this.onSubmit(e) }} className="allfloatleft">
                                                <div class="form-group">
                                                    <label for="mobile" class="input-label">Mobile Number</label>
                                                    <input type="phone" disabled={showModal} id="mobile" value={mobile} class="form-control" onChange={this.onChange} name="mobile" placeholder="Enter-your 10 digit mobile number" />
                                                    {!error?.mobile?.length ? <span>
                                                        You will receive an OTP on this number
                                                    </span> : <span className="text-danger ml-1">
                                                        {error.mobile}
                                                    </span>}

                                                </div>


                                                {!showModal && <div class="form-group pt-4">
                                                    <button type="submit"
                                                        disabled={error?.mobile?.length || mobile.length != 10 ? true : false} className="fxt-btn-fill" style={error?.mobile?.length || mobile.length != 10 ? { 'cursor': 'no-drop', 'backgroundColor': '#ffa1a1' } : {}}>Get OTP</button>
                                                </div>}

                                            </form>
                                            {showModal &&
                                                <form onClick={(e) => this.onVerifyOtp(e)}>
                                                    <div class="form-group">
                                                        <label for="otp" class="input-label">OTP</label>
                                                        <input type="number" id="otp" value={otp} class="form-control" onChange={(e) => {
                                                            if (e.target.value.length <= 6) {
                                                                this.setState({
                                                                    [e.target.name]: e.target.value
                                                                })
                                                            }
                                                        }} name="otp" placeholder="Enter OTP sent on your mobile number" />
                                                        {/* {time > 0 && <span>Your OTP should arrive in {time} Seconds</span>} */}
                                                        <div className='mt-2'>

                                                        {timer === 0 ?
                                                       <div> <span>Didn't receive an OTP?
                                                            <Link className='text-primary' style={{ cursor: 'pointer' }} href="#" onClick={(e) => (this.onSubmit(e))} > RESEND OTP </Link>
                                                        </span></div>:<div><span> Your OTP should arrive in  {this.formatTime(timer)} Seconds </span></div>}
                                                        <br /><span className='fs-18'>An OTP has been sent to {mobile}. You may not receive the OTP if the number is not registered with Rozgar.</span>

                                                      
                                                        </div>
                                                      
                                                    </div>
                                                    <div class="form-group">
                                                        <button type="submit"
                                                            disabled={error?.otp?.length || otp.length != 6 ? true : false} className="fxt-btn-fill" style={error?.otp?.length || otp.length != 6 ? { 'cursor': 'no-drop', 'backgroundColor': '#aaa7a7' } : {}}>Login</button>
                                                    </div>
                                                </form>}
                                            <div className='loginwithotp-btn'>
                                                <div onClick={() => { this.props.changeTab('EMAIL') }} className="text-center">
                                                    <span className='loginwithotp'>Login with Email</span>
                                                </div>
                                            </div>
                                            <div class="fxt-style-line allfloatleft">
                                                <div class="fxt-transformY-50 fxt-transition-delay-5">
                                                    <h3>Or</h3>
                                                </div>
                                            </div>
                                            <ul class="fxt-socials pl-1">
                                                <li class="fxt-google">
                                                <GoogleLoginPage/>
                                                </li>
                                                <li className="fxt-facebook">
												 <LinkedInPage/>
												</li> 
                                            </ul>
                                        </div>
                                        <div class="fxt-footer pl-1">
                                            <p>Don't have an account?<a href="/register" class="switcher-text2 inline-text">Register</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 pull-md-7 col-md-5 fxt-bg-wrap">
                                    <div class="fxt-bg-img"
                                        data-bg-image={'./assets/images/bg4-r.jpg'}
                                        style={{
                                            background: "#ffffff url(" + "./assets/images/bg4-r.jpg" + ")",
                                            backgroundPosition: 'bottom -80px center',
                                            backgroundSize: '40%',
                                            backgroundRepeat: 'no-repeat'
                                        }}>
                                        <div class="fxt-header">
                                            <div class="fxt-transformY-50 fxt-transition-delay-1">
                                                <a href="/" class="Lfxt-logo"><Image src={logo} alt="Logo" /></a>
                                            </div>
                                            <div class="fxt-transformY-50 fxt-transition-delay-2">
                                                <h1>Are you a new user?</h1>
                                            </div>
                                            <div class="fxt-transformY-50 fxt-transition-delay-3">
                                                <ul className='registerList'>
                                                    <li class="rlist">India's Leading Portal for Emerging Careers</li>
                                                    <li class="rlist">5,00,000+ Jobs & Career Opportunities</li>
                                                    <li class="rlist">500+ Career Counselors</li>
                                                    <li class="rlist">100+ Linked International University/Colleges for Study Abroad</li>
                                                    <li class="rlist">Astrology Services for Better Career Plan</li>
                                                    <li class="rlist">Resume Builders & Students Benefits</li>
                                                    <li class="rlist">Explore your City for Better Job Opportunities Near your Home Area</li>
                                                    <li class="rlist">10,000+ Interview Questions</li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>


            </React.Fragment >
        )

    }
}
export default withRouter(Signinwithotp)