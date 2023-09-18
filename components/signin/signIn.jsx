import React, { Component } from 'react'
import Otp from '../OTP/Otp'
import constant from 'constant'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import LoadingOverlay from 'react-loading-overlay';
import logo from '@/assets/images/logo.png'
import { SpinnerCircular } from 'spinners-react'
import Link from 'next/link'
import Image from 'next/image';
import LinkedInPage from 'components/common/linkedIn';
import GoogleLoginPage from 'components/common/googlelogin';
// import GoogleLoginPage from 'components/common/googlelogin';
export default class SignIn extends Component {


	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			remember: false,
			error: {},
			showModal: false,
			passwordShow: false
		}
	}


	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		let { email, password, remember } = this.state
		let status = this.validateForm()
		if (status) {
			let model = {
				EmailId: email,
				Password: password,
				Remember: remember == 'on' ? true : false
			}

			this.props.onSubmit(model)
		}
	}



	validateForm = () => {
		let data = this.state
		let error = {}
		let isValid = true

		if (!data['email']) {
			error.email = "Please enter email"
			isValid = false
		}
		if (data['email']) {
			let re = /\S+@\S+\.\S+/
			if (re.test(data['email'])) { } else {
				error.email = "Please enter valid email"
				isValid = false
			}
		}
		if (!data['password']) {
			error.password = "Please enter password"
			isValid = false
		}

		this.setState({
			error: error
		})

		return isValid
	}

	onShowModal = () => {
		const st = this.state
		this.setState({ showModal: true })
	}


	onhideModal = () => {
		this.setState({ showModal: false })
	}

	togglePasswordVisiblity = (e) => {
		this.setState({ passwordShow: !this.state.passwordShow })
	}

	handleFailure = (result) => {
		console.log(result);
	}

	handleLogin = (googleData) => {
		this.props.googleLoginHandler(googleData)
	}

	handleLogout = () => {
		localStorage.removeItem('loginData')
		this.setState({
			loginData: null
		})
	}

	render() {
		const { showModal, error, email, password } = this.state
		return (
			<React.Fragment>

				{this.props.showLoader &&
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
				<main id="rg-main" className="rg-main rg-haslayout ptb-0">
					<section className="fxt-template-animation fxt-template-layout4">
						<div className="container-fluid">

							<div className="row">
								<div className="col-12 push-md-5 col-md-7 fxt-bg-color">
									<div className="fxt-content pt-5 pb-5">
										<div className="fxt-transformY-50 fxt-transition-delay-1">
											<a href="/" className="mobile-Lfxt-logo"><Image src={logo} alt="Logo" /></a>
										</div>
										<div className='employer-login-link'>
											<a target='_blank' href={'https://recruit.rozgar.com/'}>Employer Login</a>
										</div>

										<h4>Login</h4>
										<div className="fxt-form edit-profile-form login-forms">
											<form onSubmit={(e) => { this.onSubmit(e) }} className="allfloatleft">
												<div className="form-group">
													<label for="email" className="input-label">Email ID / Username</label>
													<input type="email" id="email" className="form-control" onChange={this.onChange} name="email" placeholder="demo@gmail.com" />
													{error && !email &&
														(
															<span className="text-danger ml-1">
																{error.email}
															</span>
														)
													}
												</div>
												<div className="form-group" id='eyepassicon'>
													<label for="password" className="input-label" >Password</label>
													<input id="password" type={(this.state.passwordShow) ? "text" : "password"} className="form-control" name="password" onChange={this.onChange} placeholder="********" />
													<i className={(this.state.passwordShow) ? "fa fa-fw fa-eye toggle-password field-icon" : "fa fa-fw fa-eye-slash toggle-password field-icon"} onClick={(e) => this.togglePasswordVisiblity(e)}></i>
													<span style={{ display: 'block', height: '0' }}>

														{error && !password &&
															(
																<span className="text-danger ml-1" >
																	{error.password}
																</span>
															)
														}
													</span>
												</div>

												<div className="form-group pb-0 mb-1">
													<div className="fxt-checkbox-area">
														<div className="checkbox">
															{/* <input id="checkbox1" type="checkbox" name="remember" onChange={this.onChange} />
															<label for="checkbox1">Keep me logged in</label> */}
														</div>
														<Link href={constant.component.forgotPassword.url} className="switcher-text">Forgot Password</Link>
													</div>
												</div>
												<div className="form-group">
													<button type="submit" className="fxt-btn-fill">Log in</button>
												</div>
											</form>
											<div className='loginwithotp-btn'>
												<div onClick={() => { this.props.changeTab('PHONE') }} className="text-center">
													<span className='loginwithotp'>Login with OTP</span>
												</div>
											</div>
											<div className="fxt-style-line allfloatleft ml-2">
												<div className="fxt-transformY-50 fxt-transition-delay-5">
													<h3 style={{marginLeft:'30px'}}>Or</h3>
												</div>
											</div>
											<ul className="fxt-socials pl-1">
												<li className="fxt-google">
													{/* <GoogleOAuthProvider clientId="127069964067-ecs561pfupvs2entdh3dj66uj4nvae44.apps.googleusercontent.com" style={{ width: '200px' }}>
															 	<GoogleLogin
																	onSuccess={this.handleLogin}
																	onError={this.handleFailure}
																/>
															</GoogleOAuthProvider> */}
													<GoogleLoginPage
														onSuccess={(googleData) => this.handleLogin({ credential: googleData.tokenId })}
														onFailure={(result) => this.handleFailure(result)}
													/>

												</li>
												<li className="fxt-facebook">
													<LinkedInPage />
												</li>

											</ul>
										</div>
										<div className="fxt-footer pl-3">
											<p>Don't have an account?<a href="/register" className="switcher-text2 inline-text">Register</a></p>
											{/* <p><Link onClick={() => { this.onShowModal() }} className="switcher-text2 inline-text">OTP</Link></p> */}
										</div>
									</div>
								</div>
								<div className="col-12 pull-md-7 col-md-5 fxt-bg-wrap">
									<div className="fxt-bg-img" data-bg-image={'./assets/images/bg4-r.jpg'} style={{
										background: "#ffffff url(" + "./assets/images/bg4-r.jpg" + ")",
										backgroundPosition: 'bottom -80px center',
										backgroundSize: '50%',
										backgroundRepeat: 'no-repeat'
									}}>
										<div className="fxt-header">
											<div className="fxt-transformY-50 fxt-transition-delay-1">
												<a href="/" className="Lfxt-logo"><Image src={logo} alt="Logo" /></a>
											</div>
											<div className="fxt-transformY-50 fxt-transition-delay-2">
												<h1>Are you a new user?</h1>
											</div>
											<div className="fxt-transformY-50 fxt-transition-delay-3 pb-4">
												<ul className='registerList'>
													<li className="rlist">India's Leading Portal for Emerging Careers</li>
													<li className="rlist">5,00,000+ Jobs & Career Opportunities</li>
													<li className="rlist">500+ Career Counselors</li>
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
				</main>

				{showModal && this.props.showLoader && <ModalWindow
					title="OTP"
					className='toppoup'
					headerClassName='opthead'
					backdrop="static"
					toggleModal={this.onhideModal}>
					<Otp
						onCancel={this.onhideModal}
					/>
				</ModalWindow>}

			</React.Fragment>
		)

	}
}
