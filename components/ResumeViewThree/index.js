import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
import React, { Component } from 'react'
import { NavItem } from 'react-bootstrap';
import ReactToPrint from 'react-to-print'
import pic01 from 'src/assets/img/test-img/1.jpg'
import emailIcon from 'src/assets/img/test-img/email.png'
import mobileIcon from 'src/assets/img/test-img/mobile-black01.png'
import locationIcon from 'src/assets/img/test-img/location.png'
import linkedIcon from 'src/assets/img/test-img/linkedin.png'
import instagramIcon from 'src/assets/img/test-img/instagram.png'
import facebookIcon from 'src/assets/img/test-img/facebook.png'
import twitterIcon from 'src/assets/img/test-img/twitter.png'
import globeIcon from 'src/assets/img/test-img/globe.png'
import gitIcon from 'src/assets/img/test-img/git.png'
import Image from 'next/image';
import appTempone from 'src/assets/img/demos/demo-3.png'
import WaterMark from "src/assets/images/rozgar-watermark.png"
import { purchaseResume, saveResumePaymentDetail } from '@/action/personalRecruiter';
import constant from 'constant';
import { getCookie } from 'cookies-next';
import Modal from "react-modal";
import ResumePayment from 'components/common/resumePayment';
import Loader from 'components/spinner';

const ref = React.createRef();


export default class ResumeViewThree extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
            showLoader:false


		}
	}

	printPDF2 = () => {
		const detail = this.props.candidateLists
		let cd_name = detail.firstName + " " + detail.secondName

		window.html2canvas = html2canvas;
		var doc = new jsPDF({
			orientation: "p",
			unit: "px",
			format: "a4",
		});

		var content = document.getElementById("resume3");
		const width = doc.internal.pageSize.getWidth();


		const resolveAfter3Sec = new Promise(resolve => {
			resolve(doc.html(content, {
				x: 0,
				y: 0,
				width: width,
				autoPaging: 'text',
				windowWidth: 794,
				margin: [10, 0, 10, 0],
				html2canvas: {},
			}))
		});

		toast.promise(
			resolveAfter3Sec,
			{
				pending: 'Processing request',
				success: {
					render({ data }) {
						doc.save(cd_name);
						return `succesfully download`
					},
					// other options
					icon: <Image src={success} />,
				},
				error: 'Promise rejected 🤯'
			}
		)



	}

	componentDidMount() {

	}



	onPurchase = (data) => {
		const { code, amount } = data
		this.setState({ showModal: false, showLoader: true })
		if (!getCookie(constant.keys.cd)) {
			window.location.href = constant.component.signin.url
		}
		else {
			
			const model = {
				AMOUNT: amount < 0 && isNaN(amount) ? 0 : amount,
				CODE: code
			}
			purchaseResume(model).then((res) => {
				this.setState({ showLoader: false })
				if (res.status) {
					if (amount == 0) {
						const detail = this.props?.candidateLists;
						let cd_name = detail?.firstName + " " + detail?.secondName;

						window.html2canvas = html2canvas;
						var doc = new jsPDF({
							orientation: "p",
							unit: "px",
							format: "a4",
						});

						var content = document.getElementById("resume1");
						const width = doc.internal.pageSize.getWidth();

						const resolveAfter3Sec = new Promise(resolve => {
							resolve(
								doc
									.html(content, {
										x: 0,
										y: 0,
										width: width,
										autoPaging: "text",
										windowWidth: 794,
										margin: [10, 0, 10, 0],
										html2canvas: {},
									})
							)

						});

						toast.promise(
							resolveAfter3Sec,
							{
								pending: 'Processing request',
								success: {
									render({ data }) {
										doc.save(cd_name);
										return `succesfully download`
									},
									// other options
									icon: <Image src={success} />,
								},
								error: 'Promise rejected 🤯'
							}
						)
					}
					else {
						const planAmount = model.AMOUNT;
						this.setState({ showLoader: false });

						const options = {
							key: process.env.NEXT_PUBLIC_RAZOR_KEY,
							amount: planAmount * 100,
							name: "Resume Services",
							order_id: res.result.ORDER_CREATION_ID,

							handler(razorResponse) {
								const paymentId = razorResponse.razorpay_payment_id;

								if (paymentId) {
									saveResumePaymentDetail({
										orderCreationId: res.result.ORDER_CREATION_ID,
										PAYMENT_ID: paymentId,
										TXN_ID: res.result.TXN_ID,
										razorpayOrderId: razorResponse.razorpay_order_id,
										razorpaySignature: razorResponse.razorpay_signature,
										TXN_STATUS: "SUCCESS",

									}).then((response) => {

										if (response.status) {

											const detail = this.props?.candidateLists;
											let cd_name = detail?.firstName + " " + detail?.secondName;

											window.html2canvas = html2canvas;
											var doc = new jsPDF({
												orientation: "p",
												unit: "px",
												format: "a4",
											});

											var content = document.getElementById("resume3");
											const width = doc.internal.pageSize.getWidth();

											const resolveAfter3Sec = new Promise(resolve => {
												resolve(
													doc
														.html(content, {
															x: 0,
															y: 0,
															width: width,
															autoPaging: "text",
															windowWidth: 794,
															margin: [10, 0, 10, 0],
															html2canvas: {},
														})
												)

											});

											toast.promise(
												resolveAfter3Sec,
												{
													pending: 'Processing request',
													success: {
														render({ data }) {
															doc.save(cd_name);
															return `succesfully download`
														},
														// other options
														icon: <Image src={success} />,
													},
													error: 'Promise rejected 🤯'
												}
											)

										}
									});
								}
							},
							theme: {
								color: "#464646",
							},
						};

						if (model.AMOUNT != 0) {
							const rzp1 = window.Razorpay(options);
							rzp1.open();
						} else {
							window.location.href =
								'/payment/success' + "?txn=" +
								res.result;
						}
						// this.printPDF2();
					}
				}
			});
		}
	};



	onOpenModal = () => {
		this.setState({ showModal: true })

	}


	onCloseModal = () => {
		this.setState({ showModal: false })
	}




	render() {

		const detail = this.props.candidateLists

		return (

			<React.Fragment>
        {this.state.showLoader && <Loader/>}



				<div class="main-wrapper03" style={{ paddingTop: "90px" }} >

					<button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => { this.onOpenModal() }}>Unlock CV Download Without Watermark</button>


					<div className="">
						{this.state.showModal &&
							<Modal
								isOpen={this.state.showModal}
								toggleModal={this.onCloseModal}
								onRequestClose={this.onCloseModal}

								contentLabel="Review Modal"
								className="modal-content modal-width">
								{/* // toggleModal={() => { this.setState({ showModal: false }); }}> */}
								<ResumePayment
									onPurchase={(data) => { this.onPurchase(data) }}
								/>
							</Modal>}
					</div>

					{!this.props.mobileView &&
						<div className="watermarks">
							{/* <div className="waterimg">
                                <Image src={WaterMark} width={650} height={650} />
                            </div> */}
							<div class="container px-3 px-lg-5">
								<article class="resume-wrapper resume-3rd-view mx-auto theme-bg-light px-5 pt-4 pb-2  shadow-lg" ref={el => (this.componentRef = el)}
									id={'resume3'}
								>
									<div class="resume-header03">
										<div class="row">
											<div class="resume-title col-12 col-md-6 col-lg-8  col-xl-9 col-sm-8 pdftemp3width75">
												<h2 class="resume-name mb-0 text-uppercase font-weight-600" >{detail.firstName + " " + detail.secondName}</h2>
												<div class="resume-tagline-title mb-3 mb-md-0" style={{ textTransform: "capitalize" }}>{detail.JobTitle}</div>
											</div>
											<div class="resume-contact col-12 col-md-6 col-lg-4 col-xl-3 col-sm-4 socail-pading-man pdftemp3width25">
												<ul class="list-unstyled mb-0">
													<li class="mb-0">
														<Image
															height={20}
															width={20}
															src={mobileIcon} alt="" />

														<a class="resume-link" href="tel:#">{detail.MobileNo}</a></li>
													<li class="mb-0">
														<Image
															height={16}
															width={16}
															src={emailIcon} alt="" className="mr-1" />

														<a class="resume-link" href="mailto:#">{detail.EmailId}</a></li>
													{/* <li class="mb-0"><i class="fa fa-globe fa-fw fa-lg me-2"></i><a class="resume-link" href="#">www.yourwebsite.com</a></li> */}
													<li class="mb-0" style={{ textTransform: "capitalize" }}>
														<Image
															height={20}
															width={20}
															src={locationIcon} alt="" />
														{detail.PermanentAddress}</li>
												</ul>
											</div>
										</div>

									</div>
									<hr />
									<div class="resume-intro py-0">
										<div class="row align-items-center">
											<div class="col-12 col-md-3 col-xl-3 col-sm-4 pdftemp3width25  width-flex1" >

												{detail && detail.PROFILE_IMAGE == null ?
													<Image
														className="picture picture-resume-02" src={userImage} alt=""
														width={1000}
														height={1000}
													/> :
													detail.PROFILE_IMAGE == undefined ?
														<Image
															width={1000}
															height={1000}
															className="picture picture-resume-02" src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
														:
														<Image
															width={1000}
															height={1000}
															className="picture picture-resume-02" src={detail.PROFILE_IMAGE.includes('blob') ? detail.PROFILE_IMAGE : `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
												}
											</div>
											<div class="col text-start col-sm-8 pdftemp3width75 width-flex2">
												<p class="mb-0" style={{ textTransform: "capitalize" }}>{detail.Bio}</p>
											</div>
										</div>
									</div>
									<hr />
									<div class="resume-body">
										<div class="row">
											<div class="resume-main resume-body-main col-12 col-lg-8 col-xl-9 pe-0 pe-lg-5 col-sm-8 pdftemp3width75">
												{detail.Experience.length > 0 ?
													<section class="work-section p-2">
														<h3 class="text-uppercase resume-section-heading mb-4">Work Experiences</h3>
														{
															detail.Experience && detail.Experience.map((item) => {
																return (
																	<>
																		<div class="item mb-3">
																			<div class="item-heading row align-items-center mb-2">
																				<h4 class="item-title col-12 col-md-12 col-lg-12 mb-2 mb-md-0" style={{ textTransform: "capitalize" }}>{item.EXPERIENCE_TITLE}</h4>
																				<div class="item-meta col-12 col-md-12 col-lg-12 text-muted text-start com-bold" style={{ textTransform: "capitalize" }}>{item.EXPERIENCE_COMPANY} | {item.EXPERIENCE_FROM_YEAR} - {item.CURRENT_COMPANY == "N" ? item.EXPERIENCE_TO_YEAR : 'Present'}</div>

																			</div>
																			<div class="item-content" style={{ textTransform: "capitalize" }}>
																				{item.EXPERIENCE_DESCRIPTION}
																				{/* <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>
																	<ul class="resume-list">
																		<li>Lorem ipsum dolor sit amet, consectetuer.</li>
																		<li>Aenean commodo ligula eget dolor.</li>
																		<li>Etiam ultricies nisi vel augue.</li>
																	</ul> */}
																			</div>
																		</div>
																	</>
																)
															})
														}

														{/* <div class="item mb-3">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Software Engineer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Google | 2019 - Present</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>
													<ul class="resume-list">
														<li>Lorem ipsum dolor sit amet, consectetuer.</li>
														<li>Aenean commodo ligula eget dolor.</li>
														<li>Etiam ultricies nisi vel augue.</li>
													</ul>
												</div>
											</div>
											<div class="item mb-3">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Lead Software Developer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Apple | 2016 - 2019</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel.</p>
													<ul class="resume-list">
														<li>Lorem ipsum dolor sit amet, consectetuer.</li>
														<li>Aenean commodo ligula eget dolor.</li>
													</ul>
												</div>
											</div>
											<div class="item mb-3">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Software Developer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Dropbox | 2014 - 2016</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
												</div>
											</div> */}
														{/* <div class="item">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Developer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Uber | 2013 - 2014</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
												</div>
											</div>
											<div class="item">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Backend Developer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Amazon | 2014 - 2016</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
												</div>
											</div>
											<div class="item">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Frontend Developer</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Startup | 2013 - 2014</div>

												</div>
												<div class="item-content">
													<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
												</div>
											</div> */}

													</section> : ''}

												{detail.PROJECT.length > 0 ?
													<section class="project-section p-2">
														<h3 class="text-uppercase resume-section-heading mb-4">Projects</h3>
														{
															detail.PROJECT && detail.PROJECT.map((item) => {
																return (
																	<>
																		<div class="item mb-3">
																			<div class="item-heading row align-items-center mb-2">
																				<h4 class="item-title col-12 col-md-12 col-lg-12 mb-2 mb-md-0" style={{ textTransform: "capitalize" }}>{item.PROJECT_NAME}</h4>
																			</div>
																			<div class="item-content" style={{ textTransform: "capitalize" }}>
																				<p>{item.PROJECT_DESCRIPTION}</p>
																			</div>
																		</div>
																	</>
																)
															})
														}

														{/* <div class="item mb-3">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Lorem Ipsum</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>

												</div>
												<div class="item-content">
													<p>You can use this section for your side projects. You can <a href="#" class="theme-link">provide a project link here</a> as well. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>


												</div>
											</div>
											<div class="item">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Sed Fringilla</h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>

												</div>
												<div class="item-content">
													<p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>

												</div>
											</div>
											<div class="item">
												<div class="item-heading row align-items-center mb-2">
													<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Praesent </h4>
													<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>

												</div>
												<div class="item-content">
													<p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>

												</div>
											</div> */}
													</section> : ''}
											</div>
											<aside class="resume-aside col-12 col-lg-4 col-xl-3 px-lg-4 pb-lg-4 col-sm-4 pdftemp3width25" style={{ borderLeft: "1px solid rgb(0 0 0 / 10%)" }}>
												{detail.Skills.length > 0 ?
													<section class="skills-section py-3">
														<h3 class="text-uppercase resume-section-heading mb-4">Skills</h3>
														<div class="item">
															{/* <h4 class="item-title">Technical</h4> */}
															<ul class="list-unstyled resume-skills-list">
																{
																	detail.Skills && detail.Skills.map((item) => {
																		return (
																			<>
																				<li class="mb-0" style={{ textTransform: "capitalize" }}>{item.SKILL_NAME}</li>
																			</>
																		)
																	})
																}


																{/* <li class="mb-0">JavaScript/Angular/React/Vue</li>
													<li class="mb-0">Python/Ruby/PHP</li>
													<li class="mb-0">Node.js/ASP.NET</li>
													<li class="mb-0">PostgreSQL/MySQL</li>
													<li class="mb-0">Object-oriented design</li>
													<li class="mb-0">Design and implement database structures</li>
													<li>Lead and deliver complex software systems</li> */}
															</ul>
														</div>
														{/* <div class="item">
												<h4 class="item-title">Professional</h4>
												<ul class="list-unstyled resume-skills-list">
													<li class="mb-0">Effective communication</li>
													<li class="mb-0">Team player</li>
													<li class="mb-0">Strong problem solver</li>
													<li>Good time management</li>
												</ul>
											</div> */}
													</section> : ''}
												{detail.Education.length > 0 ?
													<section class="education-section py-3">
														<h3 class="text-uppercase resume-section-heading mb-4">Education</h3>
														<ul class="list-unstyled resume-education-list">
															{detail.Education && detail.Education.map((item) => {
																return (
																	<>
																		<li class="mb-1">
																			<div className="resume-degree font-weight-bold">{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}</div>
																			<div className="resume-degree-org text-muted">{item.SCHOOL}</div>
																			<div className="resume-degree-time text-muted">{item.EDUCATION_TO_YEAR == "" ? ` ${item.EDUCATION_FROM_YEAR} - Present ` : `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}`}</div>
																		</li>
																	</>
																)
															})

															}

															{/* <li class="mb-1">
													<div class="resume-degree font-weight-bold">MSc in Computer Science</div>
													<div class="resume-degree-org text-muted">University College London</div>
													<div class="resume-degree-time text-muted">2010 - 2011</div>
												</li>
												<li>
													<div class="resume-degree font-weight-bold">BSc Maths and Physics</div>
													<div class="resume-degree-org text-muted">Imperial College London</div>
													<div class="resume-degree-time text-muted">2007 - 2010</div>
												</li> */}
														</ul>
													</section> : ''}
												{/* <section class="education-section py-3">
											<h3 class="text-uppercase resume-section-heading mb-4">Awards</h3>
											<ul class="list-unstyled resume-awards-list">
												<li class="mb-1">
													<div class="font-weight-bold">Award Lorem Ipsum</div>
													<div class="text-muted">Microsoft lorem ipsum (2019)</div>
												</li>
												<li>
													<div class="font-weight-bold">Award Donec Sodales</div>
													<div class="text-muted">Oracle Aenean (2017)</div>
												</li>
											</ul>
										</section> */}
												{detail.Languages.length > 0 ?
													<section class="skills-section py-3">
														<h3 class="text-uppercase resume-section-heading mb-4">Languages</h3>
														<ul class="list-unstyled resume-lang-list">
															{
																detail.Languages && detail.Languages.map((item) => {
																	return (
																		<>
																			<li class="mb-0">{item.LANGUAGE_NAME} <span class="text-muted">({item.LANGUAGE_LEVEL})</span></li>
																		</>
																	)
																})
															}

															{/* <li class="mb-0">English <span class="text-muted">(Native)</span></li>
												<li>Spanish <span class="text-muted">(Professional)</span></li> */}
														</ul>
													</section> : ''}

												{detail.Interest.length > 0 ?
													<section class="skills-section py-3">
														<h3 class="text-uppercase resume-section-heading mb-4">Interests</h3>
														<ul class="list-unstyled resume-interests-list mb-0">
															{
																detail.Interest && detail.Interest.map((item) => {
																	return (
																		<>
																			<li class="mb-0">{item.INTRESTS_NAME}</li>
																		</>
																	)
																})
															}
															{/* <li class="mb-0">Climbing</li>
												<li class="mb-0">Snowboarding</li>
												<li class="mb-0">Photography</li>
												<li>Travelling</li> */}
														</ul>
													</section> : ''}

											</aside>
										</div>
									</div>
									<hr />
									<div class="resume-footer text-center">
										<ul class="resume-social-list list-inline mx-auto mb-0">
											{
												detail.OnlineProfile && detail.OnlineProfile.map((item) => {

													if (item.SOCIAL_PROFILE == "L") {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image
																	height={20}
																	width={20}
																	src={linkedIcon} alt="" style={{ marginRight: "5px" }} />
																{/* <Image
															width={20}
															height={40}
															style={{ backgroundColor: "white", borderRadius: "2px" }}
															className="mx-2"
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABz0lEQVRoge2avU7DMBRGTxFC0ImxLWLgGeiCxMjWbgwMMLIhtlIeoEgIiTeA12AsiBnYmBgYEEwwUX4XypAbUdImcZy4NshHurLkutffl+Q2TW/B4/Ho0gS6wAvQtxw90dLIamLPAfFx0VE10ZQ3fAAtoJr1KBigCuwQaOqjeGZOZXHLnC5t2gTauiqLe7K4YlKRJhUCbc8qi8Nr0VVG6puwIMQI3ohr2DCyABwC1wQ321fgDjgHDoBloFTERiaLfRN4I/2md1OEPlNG1oAviWOgDpSBKYKP1RWCM5W2v1Ujs8CT5N3Oub9VI1uS86yA/a0aOZGc65H5MrAP3DJcO7n1mTByLzkXIvNH/BbvvJF3yTkdmX+Q+SVgRjGXVSNxOXX28t+1dFG53ketDWO+KAFF5UkyFFfoj1n1jePSKg1E0mslYFXmL7Nu4lqNLMr4543UZbwqIpkLNZJU6GO/j+gaSSr0WH2TeZSmMFjcaQcm94OUazWijTfiGt6Ia3gjruGNuMa/NtKT0YWWW5Q5GYcaPaOMXMi4YUyOPqEmpeeVBj/N0DZQK0BA3l9RasAu8CnrldvUHeKfFWyHcns6pEHQPQ2bozZD+w8DHo8n4Bt69EZ7bl4vtAAAAABJRU5ErkJggg=="
														/> */}
																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													} else if (item.SOCIAL_PROFILE == "T") {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image
																	height={20}
																	width={20}
																	src={twitterIcon} alt="" style={{ marginRight: "5px" }} />
																{/* <Image
															width={20}
															height={40}
															style={{ backgroundColor: "white", borderRadius: "2px" }}
															className="mx-2"
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABz0lEQVRoge2avU7DMBRGTxFC0ImxLWLgGeiCxMjWbgwMMLIhtlIeoEgIiTeA12AsiBnYmBgYEEwwUX4XypAbUdImcZy4NshHurLkutffl+Q2TW/B4/Ho0gS6wAvQtxw90dLIamLPAfFx0VE10ZQ3fAAtoJr1KBigCuwQaOqjeGZOZXHLnC5t2gTauiqLe7K4YlKRJhUCbc8qi8Nr0VVG6puwIMQI3ohr2DCyABwC1wQ321fgDjgHDoBloFTERiaLfRN4I/2md1OEPlNG1oAviWOgDpSBKYKP1RWCM5W2v1Ujs8CT5N3Oub9VI1uS86yA/a0aOZGc65H5MrAP3DJcO7n1mTByLzkXIvNH/BbvvJF3yTkdmX+Q+SVgRjGXVSNxOXX28t+1dFG53ketDWO+KAFF5UkyFFfoj1n1jePSKg1E0mslYFXmL7Nu4lqNLMr4543UZbwqIpkLNZJU6GO/j+gaSSr0WH2TeZSmMFjcaQcm94OUazWijTfiGt6Ia3gjruGNuMa/NtKT0YWWW5Q5GYcaPaOMXMi4YUyOPqEmpeeVBj/N0DZQK0BA3l9RasAu8CnrldvUHeKfFWyHcns6pEHQPQ2bozZD+w8DHo8n4Bt69EZ7bl4vtAAAAABJRU5ErkJggg=="
														/> */}
																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													} else if (item.SOCIAL_PROFILE == "I") {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image src={instagramIcon} alt=""
																	height={20}
																	width={20}
																	style={{ marginRight: "5px" }} />

																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													} else if (item.SOCIAL_PROFILE == "G") {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image
																	height={20}
																	width={20}
																	src={gitIcon} alt="" style={{ marginRight: "5px" }} />
																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													}
													else if (item.SOCIAL_PROFILE == "F") {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image src={facebookIcon} alt=""
																	height={20}
																	width={20}
																	style={{ marginRight: "5px" }} />
																{/* <Image
															width={20}
															height={40}
															style={{ backgroundColor: "white", borderRadius: "2px" }}
															className="mx-2"
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABz0lEQVRoge2avU7DMBRGTxFC0ImxLWLgGeiCxMjWbgwMMLIhtlIeoEgIiTeA12AsiBnYmBgYEEwwUX4XypAbUdImcZy4NshHurLkutffl+Q2TW/B4/Ho0gS6wAvQtxw90dLIamLPAfFx0VE10ZQ3fAAtoJr1KBigCuwQaOqjeGZOZXHLnC5t2gTauiqLe7K4YlKRJhUCbc8qi8Nr0VVG6puwIMQI3ohr2DCyABwC1wQ321fgDjgHDoBloFTERiaLfRN4I/2md1OEPlNG1oAviWOgDpSBKYKP1RWCM5W2v1Ujs8CT5N3Oub9VI1uS86yA/a0aOZGc65H5MrAP3DJcO7n1mTByLzkXIvNH/BbvvJF3yTkdmX+Q+SVgRjGXVSNxOXX28t+1dFG53ketDWO+KAFF5UkyFFfoj1n1jePSKg1E0mslYFXmL7Nu4lqNLMr4543UZbwqIpkLNZJU6GO/j+gaSSr0WH2TeZSmMFjcaQcm94OUazWijTfiGt6Ia3gjruGNuMa/NtKT0YWWW5Q5GYcaPaOMXMi4YUyOPqEmpeeVBj/N0DZQK0BA3l9RasAu8CnrldvUHeKfFWyHcns6pEHQPQ2bozZD+w8DHo8n4Bt69EZ7bl4vtAAAAABJRU5ErkJggg=="
														/> */}
																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													}
													else {
														return (
															<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href={item.URL}>
																<Image
																	height={20}
																	width={20}
																	src={globeIcon} alt="" style={{ marginRight: "5px" }} />

																<span class="d-lg-inline-block text-muted">{item.URL}</span></a></li>
														)

													}
												}
												)
											}
											{/* <li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href="#"><i class="fab fa-github-square fa-2x me-2" data-fa-transform="down-4"></i><span class="d-none d-lg-inline-block text-muted">github.com/username</span></a></li>
									<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href="#"><i class="fab fa-linkedin fa-2x me-2" data-fa-transform="down-4"></i><span class="d-none d-lg-inline-block text-muted">linkedin.com/in/username</span></a></li>
									<li class="list-inline-item mb-lg-0 me-lg-3"><a class="resume-link" href="#"><i class="fab fa-twitter-square fa-2x me-2" data-fa-transform="down-4"></i><span class="d-none d-lg-inline-block text-muted">@twittername</span></a></li> */}
										</ul>
									</div>
								</article>

							</div>
						</div>
					}

					{this.props.mobileView && <div className='app-resume-view01'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<div className='Apptemp01'>

										<Image src={appTempone} alt='Resume Templet' />
									</div>
								</div>
							</div>

						</div>

					</div>}
				</div>


				<ToastContainer
					position="top-right"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				{/* Same as */}
				<ToastContainer />
			</React.Fragment >
		)
	}
}
