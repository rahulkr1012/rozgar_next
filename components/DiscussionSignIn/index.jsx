import React, { Component } from 'react'
import Link from 'next/link'
import ModalWindow from 'components/ModalWindow/index'
import Otp from '../OTP/Otp'
import constant from 'constant'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react'
import logo from 'src/assets/images/logo.png'
import Image from 'next/image'
import LinkedInPage from 'components/common/linkedIn';


export default class DiscussionFormsign extends Component {
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
				<main id="rg-main" class="rg-main rg-haslayout ptb-0">
					<section class="fxt-template-animation fxt-template-layout4">
						<div class="container-fluid">

							<div class="row">
								<div class="col-md-6 col-12 fxt-bg-wrap">
									<div class="fxt-bg-img" data-bg-image={'./assets/images/bg4-r.jpg'} style={{
										background: "#ffffff url(" + "./assets/images/bg4-r.jpg" + ")",
										backgroundPosition: 'bottom -80px center',
										backgroundSize: '40%',
										backgroundRepeat: 'no-repeat'
									}}>
										<div class="fxt-header">
											<div class="fxt-transformY-50 fxt-transition-delay-1">
												<a href="/" class="fxt-logo"><Image src={logo} alt="Logo" /></a>
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

								<div class="col-md-6 col-12 fxt-bg-color">
									<div class="fxt-content pt-5 pb-5">
										<div className='employer-login-link'>
											<a target='_blank' href={'https://recruit.rozgar.com/'}>Employer Login</a>
										</div>

										<h4>Login</h4>
										<div class="fxt-form">
											<form onSubmit={(e) => { this.onSubmit(e) }}>
												<div class="form-group">
													<label for="email" class="input-label">Email ID / Username</label>
													<input type="email" id="email" class="form-control" onChange={this.onChange} name="email" placeholder="demo@gmail.com" />
													{error && !email &&
														(
															<span className="text-danger ml-1">
																{error.email}
															</span>
														)
													}
												</div>
												<div class="form-group" id='eyepassicon'>
													<label for="password" class="input-label" >Password</label>
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

												<div class="form-group">
													<div class="fxt-checkbox-area">
														<div class="checkbox">
															{/* <input id="checkbox1" type="checkbox" name="remember" onChange={this.onChange} />
															<label for="checkbox1">Keep me logged in</label> */}
														</div>
														<Link href={constant.component.forgotPassword.url} class="switcher-text">Forgot Password</Link>
													</div>
												</div>
												<div class="form-group">
													<button type="submit" class="fxt-btn-fill">Log in</button>
												</div>
											</form>
											<div class="fxt-style-line">
												<div class="fxt-transformY-50 fxt-transition-delay-5">
													<h3>Or Login With</h3>
												</div>
											</div>
											<ul class="fxt-socials pl-4">
												<li class="fxt-google">
													<GoogleOAuthProvider clientId="127069964067-ecs561pfupvs2entdh3dj66uj4nvae44.apps.googleusercontent.com">
														<GoogleLogin
															onSuccess={this.handleLogin}
															onError={this.handleFailure}
														/>
													</GoogleOAuthProvider>
												</li>
												<LinkedInPage/>
												{/* <li class="fxt-facebook">
													<div class="fxt-transformY-50 fxt-transition-delay-5">
														<Link to='' title="Facebook" className='regfacebook'>
															<img src={'./assets/images/f-icon.png'} width="30px" />
															<span>Sign in with Facebook</span>
														</Link>
													</div>
												</li> */}
											</ul>
										</div>
										<div class="fxt-footer">
											<p>Don't have an account?<a href="/register" class="switcher-text2 inline-text">Register</a></p>
											{/* <p><Link onClick={() => { this.onShowModal() }} class="switcher-text2 inline-text">OTP</Link></p> */}
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
