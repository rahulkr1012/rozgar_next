import React, { Component } from 'react'
import constant from 'constant'
import ReCAPTCHA from "react-google-recaptcha";
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import queryString from 'query-string'
import Link from 'next/link';
import ModalWindow from 'components/common/common/ModalWindow';
import Otp from 'components/OTP/Otp';
import { withRouter } from 'next/router';
import logo from '@/assets/images/logo.png'
import bg4 from 'src/assets/images/bg4-l.jpg'
import Image from 'next/image';
import GoogleLoginPage from 'components/common/googlelogin';
import LinkedInPage from 'components/common/linkedIn';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

let register_img = {

	// background: `url('${bg4.src}')`,
	background: " #ffffff url(" + `${bg4.src}` + ")",
	backgroundPosition: 'bottom -80px center',
	backgroundSize: '55%',
	backgroundRepeat: 'no-repeat'

}

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			captcha: false,
			password: '',
			work_status: '',
			resume: null,
			checkTermsAndCondition: false,
			error: {},
			passwordShow: false,
			showModal: this.props.showModal,
			mob_otp: '',
			isMobValid: false,
			isSpaceNotAllow: false,
			WHATSAPP_UPDATES: { name: "WHATSAPP_UPDATES", error: "", value: true, isRequired: false }

			// loginData: localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null,

		}
	}

	recaptchaHandler = (value) => {
		if (value) {
			this.setState({
				captcha: true
			})
		}
	}

	verifyOTP = (otp) => {
		this.setState({
			mob_otp: otp
		})
		this.props.phoneVerification(otp)
	}

	onChange = (e) => {
		let value = e.target.value
		this.setState({
			[e.target.name]: value.trim()
		})
	}

	uploadResume = (e) => {
		let files = e.target.files
		if(files){
            this.setState({resume:files[0]}); 
        }   
	}

	validateForm = () => {
		let data = this.state
		let error = {}
		let isValid = true
		if(this.state.resume==null){
			isValid = true
		}else{
			if (!data['resume'].name.match(/\.(pdf|doc|docx)$/)) {
				swal({
							icon: "error",
							text:"Please select PDF/DOC/DOCX file",
							timer: 2000,
							showCancelButton: false,
							showConfirmButton: false,
						  });
				isValid = false
			}
			if (data['resume'].size > 2e6) {
				swal({
					icon: "error",
					text:"Please upload a file smaller than 2 MB",
					timer: 2000,
					showCancelButton: false,
					showConfirmButton: false,
				  });
				  isValid=false
			  }
		}
		
		if (!data['firstName']) {
			error.firstName = "Please enter first name"
			isValid = false
		}

		if (!data['secondName']) {
			error.secondName = "Please enter last name"
			isValid = false
		}

		if (!data['email']) {
			error.email = "Please enter email"
			isValid = false
		}

		if (data['email']) {
			let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (re.test(data['email'])) { } else {
				error.email = "Please enter valid email"
				isValid = false
			}
		}

		if (!data['phone']) {
			error.phone = "Please enter mobile number"
			isValid = false
		}
		if (data["phone"] !== "") {
			const regexExp = /^[6789][0-9]{9}/
			if (regexExp.test(data.phone)) { } else {
				error["phone"] = "Please enter valid Mobile Number";
				isValid = false;
			}
		}

		// if (data["phone"] !== "") {
		// 	const regexExp = /^[6789][0-9]{9}/
		// 	if (regexExp.test(data.phone)) { } else {
		// 		error["phone"] = "Please enter valid Mobile Number";
		// 		isValid = false;
		// 	}
		// }

		// if (!data['work_status']) {
		// 	error.work_status = "Please select work status"
		// 	isValid = false
		// }
		// if (!data["resume"].name.match(/\.(pdf|doc|docx)$/)) {
        //     swal({
        //         icon: "error",
        //         text:"Please select PDF/DOC/DOCX file",
        //         timer: 2000,
        //         showCancelButton: false,
        //         showConfirmButton: false,
        //       });
        //       isValid=false
        //   }

		// if (!data['resume']) {
		// 	error.resume = "Please upload resume"
		// 	isValid = false
		// }
		if (!data['password']) {
			error.password = "Please enter password"
			isValid = false
		}
		if (data['password']) {
			let regexp = /(?!\s)/;
			if (regexp.test(data['password'])) { } else {
				error.password = "Spaces are not allowed"
				isValid = false
			}
		}
		if (data['email'] && data['phone'] && data['password']) {
			// const qParam = queryString.parse(this.props.router.asPath)
			// if (!(qParam.PassCode==21788)) {
			// 	if (!data['captcha']) {
			// 		isValid = false
			// 		swal({
			// 			// title: "Are you sure?",
			// 			text: "Please select ReCaptcha",
			// 			icon: "error",
			// 			dangerMode: true,
			// 		});
			// 	}

			// }

			if (!data['checkTermsAndCondition']) {
				error.checkTermsAndCondition = "Please select Terms And Conditions"
				swal({
					// title: "Are you sure?",
					text: "Please select Terms And Condition",
					icon: "error",
					dangerMode: true,
					width:'330px',
				});
				isValid = false
			}
		}

		this.setState({
			error: error
		})

		return isValid
	}

	onSubmit = (e) => {
		e.preventDefault()
		const { firstName, secondName, email, phone, captcha, checkTermsAndCondition, resume, work_status, password, showModal, WHATSAPP_UPDATES } = this.state
		let status = this.validateForm()
		let PassCode = this.props.router.asPath ? this.props.router.asPath.split('=')[1] : null
		if (status) {

			const formData = new FormData();
			formData.append('PassCode', PassCode);
			formData.append('firstName', firstName);
			formData.append('secondName', secondName);
			formData.append(WHATSAPP_UPDATES.name, WHATSAPP_UPDATES.value ? 'YES' : 'NO');
			formData.append('EmailId', email);
			formData.append('MobileNo', '+' + phone);
			formData.append('Password', password);
			formData.append('WorkStatus', work_status || 'F');
			formData.append('AcceptTnC', checkTermsAndCondition ? 'Y' : '');
			formData.append('ResumeFileName', resume || null );
			// console.log(formData,'formData');
			this.props.onSubmit(formData)

		}
	}


	togglePasswordVisiblity = (e) => {
		this.setState({ passwordShow: !this.state.passwordShow })
	}

	onShowModal = () => {
		this.props.setShowModel(true)
	}


	onhideModal = () => {
		this.props.setShowModel(false)
	}

	handleFailure = (result) => {
		// swal({
		// 	// title: "Are you sure?",
		// 	text: result ? result :"Something went wrong.",
		// 	icon: "error",
		// 	dangerMode: true,
		//   });
	}

	handleLogin = (googleData) => {
		this.props.googleLoginHandler(googleData)
	}

	handleLogout = () => {
		// localStorage.removeItem('loginData')
		// this.setState({
		// 	loginData: null
		// })
	}



	render() {
		let { firstName, secondName, email, phone, checkTermsAndCondition, password, work_status, resume, error, isMobValid, isSpaceNotAllow } = this.state
		let toggle = error.password && !password.length > 0 ? "20px" : "0px"
		return (
			<React.Fragment>
				<main id="rg-main" className="rg-main rg-haslayout ptb-0">
					<section className="fxt-template-animation fxt-template-layout4">
						<div className="container">
							<div className="row reg-updt">
								<div className="col-12 push-md-5 col-md-7 fxt-bg-color regi-form-fx">
									<div className="fxt-content-reg ">
										<div className="fxt-transformY-50 fxt-transition-delay-1">
											<a href="/" className="mobile-Rfxt-logo"><Image src={logo} alt="Logo" /></a>
										</div>
										<h1>Register</h1>
										<div className="fxt-form edit-profile-form reg-form">
											<form onSubmit={(e) => { this.onSubmit(e) }} method="POST">
												<div className='row'>
													<div className="form-group col-md-6 mb-12">
														<label for="firstName" className="input-label">First Name</label>
														<input type="text" id="firstName" className="form-control" name="firstName" onChange={this.onChange} placeholder="First Name" />
														{error && !firstName &&
															(
																<span className="text-danger ml-1">
																	{error.firstName}
																</span>
															)
														}
													</div>
													<div className="form-group col-md-6 pl-2 mb-12">
														<label for="secondName" className="input-label">Last Name</label>
														<input type="text" id="secondName" className="form-control" name="secondName" onChange={this.onChange} placeholder="Last Name" />
														{error && !secondName &&
															(
																<span className="text-danger ml-1">
																	{error.secondName}
																</span>
															)
														}
													</div>
													<div className="form-group col-md-6 mb-12">
														<label for="email" className="input-label">Email ID</label>
														<input type="email" id="email" className="form-control" name="email" onChange={this.onChange} placeholder="demo@gmail.com" />
														{error && !email &&
															(
																<span className="text-danger ml-1">
																	{error.email}
																</span>
															)
														}
													</div>

													<div className="form-group col-md-6 pr-1 pl-2 mb-12" id="react-tel-input" >
														<label for="phone" className="input-label">Your Mobile No.</label>
														<PhoneInput
															country={'in'}
															value={this.state.phone}
															onChange={phone => this.setState({ phone: phone })}
															placeholder='Mobile Number'
														/>
														{/* <NumericFormat type="text" id="phone" className="form-control" name="phone" maxLength={10} minLength={10} onChange={this.onChange} placeholder="Mobile Number" /> */}

														{error && !phone &&
															(
																<span className="text-danger ml-1">
																	{error.phone}
																</span>
															)
														}

													</div>

													<div className="form-group mb-12" id='eyepassicon' style={{ marginBottom: toggle }}>
														<label for="password" className="input-label">Password</label>
														<input id="password" minLength={4} type={(this.state.passwordShow) ? "text" : "password"} className="form-control" name="password" value={password.trim()} onChange={this.onChange} placeholder="********" minlength="4" />
														<i className={(this.state.passwordShow) ? "fa fa-fw fa-eye toggle-password field-icon" : "fa fa-fw fa-eye-slash toggle-password field-icon"} onClick={(e) => this.togglePasswordVisiblity(e)}></i>
														<span style={{ display: 'block', height: '0' }}>

															{error && !password &&
																(
																	<span className="text-danger errotextspace ml-1">
																		{error.password}
																	</span>
																)
															}

														</span>
													</div>

													<div className='form-group mb-12'>
														<label for="password" className="input-label mt-2">Work Status</label>
														<select className='form-control'
															name='work_status'
															onChange={this.onChange}>
															<option selected>--Select Work Status--</option>
															<option value="E">I'm Experienced</option>
															<option value="F">I'm a Fresher</option>
														</select>
														{error && !work_status &&
															(
																<span className="text-danger ml-1">
																	{error.work_status}
																</span>
															)
														}
													</div>
													<div className='form-group mb-12'>
														<label for="password" className="input-label">Resume</label>
														<input id="file" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="form-control" name="resume" onChange={this.uploadResume} style={{ lineHeight: '25px' }} />
														{error && !resume &&
															(
																<span className="text-danger ml-1">
																	{error.resume}
																</span>
															)
														}
													</div>
													<div className="form-group mb-12">
														<div className="fxt-checkbox-area">
															<div className="checkbox reg-label send-me-wht">
																<input id="checkbox1" type="checkbox" name="checkTermsAndCondition" onChange={(e) => { this.setState({ checkTermsAndCondition: e.target.checked }) }} />
																<label for="checkbox1" style={{ fontSize: '11px', paddingTop: '4px' }}>By clicking Register, you agree to the <a href="/terms-conditions" target="_blank">Terms and Conditions</a> & <a href="/privacy-policy" target="_blank">Privacy Policy</a> of Rozgar.com</label>
															</div>
														</div>
													</div>
													<div className='whatsapp-update' >
														<input
															name={this.state.WHATSAPP_UPDATES.name}
															defaultChecked={true}
															onChange={(e) => {
																this.setState({
																	...this.state, [e.target.name]: {
																		...this.state.WHATSAPP_UPDATES,
																		value: !this.state.WHATSAPP_UPDATES.value
																	}
																})
															}}
															value={this.state.WHATSAPP_UPDATES.value}
															type="checkbox" />
														<span className='pl-2'>Send me important updates on</span>
														<span className='pl-1'><i className="fa fa-whatsapp" style={{ color: '#159a0b', fontWeight: "900" }}></i> WhatsApp</span></div>
													{/* <div className="form-group mb-12">
													<div className="fxt-checkbox-area">
														<ReCAPTCHA
															sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
															onChange={this.recaptchaHandler}
															theme='light'
														/>
													</div>
												</div> */}
													<div className="form-group mb-0 pt-2">
														<button type="submit" className="fxt-btn-fill">Register Now</button>
													</div>
												</div>
											</form>
											<div className='row'>
												<div className='col-md-12'>
													<div className="fxt-style-line">
														<div className="fxt-transformY-50 fxt-transition-delay-5">
															<h4>Or</h4>
														</div>
													</div>
												</div>
											</div>

											<div className='row'>
												<div className='col-md-12 pl-2'>
													<ul className="fxt-socials mb-0">
														<li className="fxt-google pl-0">
															{/* <GoogleLogin
													clientId="985996320461-uglbmf9qusfsu5semmaf61eu79iqd899.apps.googleusercontent.com"
													
													buttonText="Sign in with Google"
													onSuccess={this.handleLogin}
													onFailure={this.handleFailure}
													cookiePolicy={'single_host_origin'}
													></GoogleLogin> */}
															{/* <GoogleOAuthProvider clientId="127069964067-ecs561pfupvs2entdh3dj66uj4nvae44.apps.googleusercontent.com" style={{ width: '200px' }}>
															 	<GoogleLogin
																	onSuccess={this.handleLogin}
																	onError={this.handleFailure}
																/>
															</GoogleOAuthProvider> */}
															<GoogleLoginPage
																onSuccess={(googleData) => this.handleLogin({credential:googleData.tokenId})}
																onFailure={(result) => this.handleFailure(result)}
															/>

															{/* <div className="fxt-transformY-50 fxt-transition-delay-6">
														<Link href='' title="Google">
															<img src={'./assets/images/g-icons.png'}/>
															<span>Sign in with Google</span>
														</Link>
													</div> */}
														</li>
														<li class="fxt-facebook">
															<LinkedInPage />
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="fxt-footer pt-2">
											{/* <p><Link onClick={this.onShowModal} class="switcher-text2 inline-text">OTP</Link></p> */}
											<p className='pr-4'>Have an account?<Link href={constant.component.signin.url} className="switcher-text2 inline-text">Login</Link></p>
										</div>
									</div>
								</div>
								<div className="col-12 pull-md-7 col-md-5 fxt-bg-wrap-reg reg-wrap-fx">
									<div className="fxt-bg-img"
										style={
											register_img

										}
									>
										<div className="fxt-header">
											<div className="fxt-transformY-50 fxt-transition-delay-1">
												<a href="/" className="Rfxt-logo"><Image src={logo} alt="Logo" /></a>
											</div>
											<div className="fxt-transformY-50 fxt-transition-delay-2">
												<h1>Sign up and get access to:</h1>
											</div>
											<div className="fxt-transformY-50 fxt-transition-delay-3">
												<ul className='registerList'>
													<li className="rlist">India's Leading Portal for Emerging Careers</li>
													<li className="rlist">5,00,000+ Jobs & Career Opportunities</li>
													<li className="rlist">500+ Career Counsellors</li>
													<li className="rlist">100+ Linked International University/Colleges for Study Abroad</li>
													<li className="rlist">Astrology Services for Better Career Plan</li>
													<li className="rlist">Resume Builders & Students Benefits</li>
													<li className="rlist">Explore your City for Better Job Opportunities Near your Home Area</li>
													<li className="rlist">10,000+ Interview Questions</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{this.props.showModal && <ModalWindow
						title="OTP"
						className='toppoup btn-close'
						headerClassName='opthead'
						backdrop="static"
						toggleModal={this.onhideModal}>
						<Otp
							reSendOTP={this.props.reSendOTP}
							verifyOTP={this.verifyOTP}
							onCancel={this.onhideModal}
							history={this.props.history}
						/>
					</ModalWindow>}

					{
						this.props.showLoader &&
						<div style={{
							position: "fixed",
							zIndex: "999",
							left: "0",
							top: " 0",
							width: " 100%",
							height: " 100%",
							overflow: "auto",
							padding: "100px",
							backgroundColor: "rgba(0, 0, 0, 0.4)"
						}}>
							<LoadingOverlay
								active={true}
								spinner={<SpinnerCircular color={'rgba(230,46,45,0.6)'} />}
							>
							</LoadingOverlay>
						</div>
					}
				</main >
			</React.Fragment >
		)
	}
}

export default withRouter(Register)