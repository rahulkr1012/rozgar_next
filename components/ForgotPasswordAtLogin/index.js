import React, { Component } from 'react'
import swal from 'sweetalert'
import SuccessMessage from 'components/SuccessMessage/index' ;
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
import logo from 'src/assets/images/logo.png'
import Image from 'next/image';

export default class forgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		}
	}

	onSubmit = (e) => {
		e.preventDefault()
		if (this.state.email && this.state.email.trim() != "") {
			let data = {
				EmailId: this.state.email
			}
			this.setState({ email: '' })
			this.props.onSubmit(data)
		} else {
			swal({
				icon: "error",
				// title: 'Oops...',
				text: "Please Enter Email",
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
										<h4 className='pt-5'>Forgot Password</h4>
										{
											this.props.showMessage && <SuccessMessage message={this.props.message} />
										}
										<div class="fxt-form">
											<form method="POST" onSubmit={(e) => { this.onSubmit(e) }}>
												<div class="form-group pb-3">
													<label for="email" class="input-label pb-3">Email ID</label>
													<input type="email" id="email" class="form-control" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} name="email" placeholder="demo@gmail.com" required="required" />
												</div>
												<div class="form-group pb-5 pt-5">
													<button type="submit" class="fxt-btn-fill">Submit</button>
												</div>
											</form>
										</div>
										<div class="fxt-footer pb-5">
											<p>Don't have an account?<a href="/register" class="switcher-text2 inline-text pb-5">Register</a></p>
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
