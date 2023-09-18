import React, { Component } from 'react'
import constant from 'constant';
import { onChange, setError, validateField } from '../../utils';
import logo from 'src/assets/images/logo.png'
import Image from 'next/image';
import dynamic from 'next/dynamic';
let Spinner =   dynamic(()=> import('components/spinner') , {ssr:false} )

export default class ChanPassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Current_Password: { name: 'Current_Password', value: '', error: '', isRequired: true },
			New_Password: { name: 'New_Password', value: '', error: '', isRequired: true },
			Confirm_Password: { name: 'Confirm_Password', value: '', error: '', isRequired: true },
			CurrentpasswordShow: false,
			NewpasswordShow: false,
			ConfirmpasswordShow: false,
			confPass: false,
		}
	}

	componentDidMount() {
		document.title = constant.title.changePassword
	}

	onSubmit = (e) => {
		e.preventDefault()
		const { Current_Password, New_Password, Confirm_Password } = this.state;
		if (validateField(this)) {
			const st = this.state;
			if (New_Password.value != Confirm_Password.value) {
				setError(this, st.Confirm_Password.name, "Password and confirm password does not match.")
				return;
			}


			let model = {
				OldPassword: st.Current_Password.value,
				NewPassword: st.New_Password.value,
				//Confirm_Password:Confirm_Password
			}
			// console.log(model,'model');
			this.props.onSubmit(model)
		}
	}
	onChange = (e) => {
		const { name, value } = e.target;
		onChange(this, name, value)
	}

	toggleCurrentPasswordVisiblity = (e) => {
		this.setState({ CurrentpasswordShow: !this.state.CurrentpasswordShow })
	}
	toggleNewPasswordVisiblity = (e) => {
		this.setState({ NewpasswordShow: !this.state.NewpasswordShow })
	}

	toggleConfirmPasswordVisiblity = (e) => {
		this.setState({ ConfirmpasswordShow: !this.state.ConfirmpasswordShow })
	}

	render() {
		const {showLoader} = this.props
		const { NewPassword, ConfirmPassword, CurrentPassword } = this.state;
		return (
			<React.Fragment>
				 { showLoader && <Spinner />  }
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
											<div class="fxt-transformY-50 fxt-transition-delay-1 class-logo-change">
												<a href="/" class="fxt-logo"><Image src={logo} alt="Logo" /></a>
											</div>
											<div class="fxt-transformY-50 fxt-transition-delay-2">
												<h1>Are you a new user?</h1>
											</div>
											<div class="fxt-transformY-50 fxt-transition-delay-3">
												<ul className='registerList'>
													<li class="rlist">India's Leading Portal for Emerging Careers</li>
													<li class="rlist">5,00,000+ Jobs & Career Opportunities</li>
													<li class="rlist">500+ Career Counsellors</li>
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
										<h4 className='pt-5'>Change Password</h4>
										<div class="fxt-form">
											<form method="POST" onSubmit={(e) => { this.onSubmit(e) }}>
												<div class="form-group pb-3" id='eyepassicon' >
													<label for="password" class="input-label pb-3">Current password </label>
													<input
														type={(this.state.CurrentpasswordShow) ? "text" : "password"}
														id="password" className={this.state.Current_Password.error.length > 0 ? 'form-control is-invalid' : 'form-control'} value={this.state.Current_Password.value.trim()} name={this.state.Current_Password.name} onChange={this.onChange} placeholder="********" />
													<i className={(this.state.CurrentpasswordShow) ? "fa fa-fw fa-eye toggle-password eyeicon" : "fa fa-fw fa-eye-slash toggle-password eyeicon"} onClick={(e) => this.toggleCurrentPasswordVisiblity(e)}></i>
													<span className='error text-danger'>{this.state.Current_Password.error.length > 0 ? this.state.Current_Password.error : ""}</span>

												</div>
												<div class="form-group pb-3" id='eyepassicon'>
													<label for="password" class="input-label pb-3">New Password</label>
													<input
														type={(this.state.NewpasswordShow) ? "text" : "password"}
														id="password" className={this.state.New_Password.error.length > 0 ? 'form-control is-invalid' : 'form-control'} value={this.state.New_Password.value.trim()} name={this.state.New_Password.name} onChange={this.onChange} placeholder="********" />
													<i className={(this.state.NewpasswordShow) ? "fa fa-fw fa-eye toggle-password eyeicon" : "fa fa-fw fa-eye-slash toggle-password eyeicon"} onClick={(e) => this.toggleNewPasswordVisiblity(e)}></i>
													<span className='error text-danger'>{this.state.New_Password.error.length > 0 ? this.state.New_Password.error : ''}</span>
												</div>
												<div class="form-group pb-3" id='eyepassicon'>
													<label for="cpassword" class="input-label pb-3">Confirm Password</label>
													<input
														type={(this.state.ConfirmpasswordShow) ? "text" : "password"}
														id="cpassword" className={this.state.Confirm_Password.error.length > 0 ? 'form-control is-invalid' : 'form-control'} value={this.state.Confirm_Password.value.trim()} name={this.state.Confirm_Password.name} onChange={this.onChange} placeholder="********" />
													<i className={(this.state.ConfirmpasswordShow) ? "fa fa-fw fa-eye toggle-password eyeicon" : "fa fa-fw fa-eye-slash toggle-password eyeicon"} onClick={(e) => this.toggleConfirmPasswordVisiblity(e)}></i>
													<span className='error text-danger'>{this.state.Confirm_Password.error.length > 0 ? this.state.Confirm_Password.error : ""}</span>
													{/* {this.state.Confirm_Password.value!= '' ?this.state.confPass || this.state.New_Password.value!=this.state.Confirm_Password.value &&<span className='text-danger'>New Password and Confirm Password Must be same</span>:''} */}
												</div>
												<div class="form-group pb-5">
													<button type="submit" class="fxt-btn-fill">Submit</button>
												</div>
											</form>
										</div>

									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</React.Fragment>
		)
	}
}
