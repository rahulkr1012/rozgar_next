import React, { Component } from 'react'
import swal from 'sweetalert'
import logo from 'src/assets/images/logo.png'
import Image from 'next/image';
import LoadingOverlay from 'react-loading-overlay';
import Link from 'next/link';
import { SpinnerCircular } from 'spinners-react';

export default class forgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			cpassword: ''
		}
	}

	onSubmit = (e) => {
        
		e.preventDefault()
		if (this.state.password && this.state.password.trim() !== "" && this.state.cpassword && this.state.cpassword.trim() !== "" && this.state.password == this.state.cpassword) {
			this.props.onSubmit({ NewPassword: this.state.cpassword })
		} else {
			swal({
				icon: "error",
				// title: 'Oops...',
				text: "Password and Confirm Password must be same & cannot be empty",
				timer: 2000,
				showCancelButton: false,
				showConfirmButton: false,
			});
		}

	}

	render() {
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
												<Link href="/" class="fxt-logo"><Image src={logo} alt="Logo" width={100} height={80}/></Link>
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
										<h4 className='pt-5'>Reset Password</h4>
										<div class="fxt-form">
											<form method="POST" onSubmit={(e) => { this.onSubmit(e) }}>
												<div class="form-group pb-3">
													<label for="password" class="input-label pb-3">Password</label>
													<input type="password" id="password" class="form-control" onChange={(e) => { this.setState({ password: e.target.value }) }} name="password" placeholder="********" required="required" />
												</div>
												<div class="form-group pb-3">
													<label for="cpassword" class="input-label pb-3">Confirm Password</label>
													<input type="password" id="cpassword" class="form-control" onChange={(e) => { this.setState({ cpassword: e.target.value }) }} name="cpassword" placeholder="********" required="required" />
												</div>
												<div class="form-group pb-5">
													<button type="submit" class="fxt-btn-fill">Submit</button>
												</div>
											</form>
										</div>
										<div class="fxt-footer pb-5">
											<p>Do you have an account?<a href="/signin" class="switcher-text2 inline-text pb-5">Signin</a></p>
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
