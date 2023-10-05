import React, { Component, Suspense } from 'react'
import { getDateParts, ToSeoUrl } from '../../utils';
import Shimmer from '../common/Shimmer';
import Parser from 'html-react-parser';
// const Carousel = React.lazy(() => import('react-bootstrap/Carousel'));
import Carousel from 'react-bootstrap/Carousel'
import constant from '../../constant';
import { onChange } from '../../utils';
import swal from 'sweetalert';
import adds07 from '../../src/assets/images/adds-07.jpg'
import Trendsgraphs from  '../../src/assets/images/trendsgraphs.png'
import img03  from '../../src/assets/images/img-03.jpg'
import { CandidateHiringEnquiryForm } from '@/actions/jobsByAction';
import Image from 'next/image';
export default class jobsInNoida extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hiredPeople: { name: 'hiredPeople', value: '', error: '', isRequired: false },
			companySize: { name: 'companySize', value: '', error: '', isRequired: false },
			mobile: { name: 'mobile', value: '', error: '', isRequired: false },
			email: { name: 'email', value: '', error: '', isRequired: false },
			role: { name: 'role', value: '', error: '', isRequired: false },
		}


		this.handleChange = this.handleChange.bind(this)

		this.handleSubmit = this.onSubmit.bind(this)

	}

	handleChange(e) {
		let name = e.target.name
		let value = e.target.value
		onChange(this, name, value)
	}

	validateEnquiryForm = () => {

		let data = this.state
		let error = {}
		let isValid = true

		if (!data['hiredPeople'].value) {
			let hiredPeople = data['hiredPeople']
			hiredPeople.error = "Please Enter How Many People Hired"
			isValid = false
			this.setState({
				hiredPeople: hiredPeople
			})
		}

		if (!data['companySize'].value) {
			let companySize = data['companySize']
			companySize.error = "Please Enter Company Size"
			isValid = false
			this.setState({
				companySize: companySize
			})
		}

		if (!data['email'].value) {
			let email = data['email']
			email.error = "Please Enter Email"
			isValid = false
			this.setState({
				email: email
			})
		}

		if (data['email'].value) {
			let re = /\S+@\S+\.\S+/
			if (re.test(data['email'].value)) { } else {
				let email = data['email']
				email.error = "Please Enter Valid Email"
				isValid = false
				this.setState({
					email: email
				})
			}
		}

		if (!data['mobile'].value) {
			let mobile = data['mobile']
			mobile.error = "Please Enter Mobile"
			isValid = false
			this.setState({
				mobile: mobile
			})
		}

		if (data["mobile"] != "") {
			const regexExp = /^[6789][0-9]{9}/
			if (regexExp.test(data.mobile.value)) { } else {
				let mobile = data['mobile']
				mobile.error = "Please Enter Valid Mobile Number";
				isValid = false;
			}
		}
		if (!data['role'].value) {
			let role = data['role']
			role.error = "Please Enter Role"
			isValid = false
			this.setState({
				role: role
			})
		}
		return isValid
	}


	onSubmit(e) {
		e.preventDefault();

		const { hiredPeople, companySize, mobile, email, role } = this.state


		const model = {
			NUMBER_OF_EMPLOYEE: hiredPeople.value,
			COMPANY_SIZE: companySize.value,
			CONTACT_NUMBER: mobile.value,
			EMAIL: email.value,
			ROLE: role.value,
			TYPES: "Looking for candidates hiring"
		}

		if (this.validateEnquiryForm()) {
			CandidateHiringEnquiryForm(model).then((res) => {
				
				if (res.status) {
					swal({
						icon: "success",
						text: "Enquiry Submitted successfully ",
						timer: 2000,
						showCancelButton: false,
						showConfirmButton: false,
					});
					window.location.reload()

				}
				else {
					alert(res.error)
				}

			}).catch(err => {
				alert(err)
			})
		}
	}

	render() {
		console.log("cityDetail", this.props.localities);
		const { hiredPeople, companySize, mobile, email, role } = this.state
		const { cityDetail, jobsCount, localities, jobs, showShimmer } = this.props
		console.log(jobs,"jobs");
		return (
			<React.Fragment>
				{/* <!--************************************
				Banner start
		*************************************--> */}
				<div id="rg-innerbannercity" className="rg-innerbannercity">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div className="rg-innerbannercontent">
									{showShimmer && <h3><span><Shimmer /> </span>  <i className="lnr lnr-map-marker"></i></h3>}
									{!showShimmer && <h3><span>{jobsCount} Jobs found in {cityDetail?.CITY}</span>  <i className="lnr lnr-map-marker"></i> {cityDetail?.CITY}, India</h3>}
								</div>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-right">
								<div className="rg-innerbannercontent">
									<a href={constant.component.joblist.url.replace(':url', `jobs-in-${cityDetail?.URL}`)} target='_blank' className="applyforjobs">View jobs</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--************************************
				Banner End
		*************************************-->
		<!--************************************
				breadcrumbarea start
		*************************************--> */}
				<div className="rg-breadcrumbarea">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<ol className="rg-breadcrumb">
									<li><a href="index.html">Home</a></li>
									<li><a href="javascript:void(0);">City</a></li>
									<li>Jobs in {cityDetail?.CITY}</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				{/* <!--************************************
				breadcrumbarea End
		*************************************-->

		<!--************************************
				Main Start
		*************************************--> */}
				<main id="rg-main" className="rg-main rg-haslayout">
					<div className="rg-sectionspace rg-haslayout">
						{/* <!--************************************
						Jobs in Noida Grid Start
				*************************************--> */}
						<div className="rg-haslayout">
							<div className="container">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 float-left">
										<aside id="rg-sidebar" className="rg-sidebar rg-sidebarcol">
											<div className="rg-adds rg-jobsearchadd mb-20">
												<figure>
													<iframe src="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"></iframe>
												</figure>
											</div>

											<div className="rozgorcitycreatejob">
												<h2>Create your CV for <span>Jobs!</span></h2>
												<p>List your jobs for free on our website. Reach millions worldwide.</p>
												<a href={constant.component.signin.url} target='_blank' className="createyourcv">Upload your CV</a>
											</div>

											<div className="sendenquirybox mb-10">
												<div className="sendenquiryhead">
													<h2>Looking for candidates hiring?</h2>
												</div>
												<div className="sendenquirform">
													<form className="rg-formtheme rg-formleavecomment">

														<div className="form-group rg-inputwithiconno">
															<label>No. of People to be Hired</label>
															<input type="text"
																name={hiredPeople.name}
																value={hiredPeople.value}
																onChange={this.handleChange}
																className="form-control"
																placeholder="# of Employees" />
															{hiredPeople.error.length > 0 && !hiredPeople.value && <span className='text-danger ml-1'>{hiredPeople.error}</span>}

														</div>
														<div className="form-group rg-inputwithiconno">
															<label>How large is your company</label>
															<select className="form-control"
																name={companySize.name}
																value={companySize.value}
																onChange={this.handleChange}

															>
																<option selected>Select People</option>
																<option value="10-100 people">10-100 people</option>
																<option value="100-500 people">100-500 people</option>
																<option value="500-2000 people">500-2000 people</option>
																<option value="2000+">2000+</option>
															</select>
															{companySize.error.length > 0 && !companySize.value && <span className='text-danger ml-1'>{companySize.error}</span>}

														</div>
														<div className="form-group rg-inputwithiconno">
															<label>Your Mobile</label>
															<input type="text"
																name={mobile.name}
																maxLength={10}
																onChange={(e) => {
																	if (e.target.value !== "") {
																		const regexExp = /^[6789][0-9]{9}/
																		if (regexExp.test(e.target.value)) {
																			let mobile = this.state.mobile
																			mobile.value = e.target.value
																			this.setState({ mobile: mobile });
																		} else {
																			let mobile = this.state.mobile
																			mobile.value = ''
																			this.setState({ mobile: mobile });
																		}
																	}
																}
																}
																className="form-control"
																placeholder="Your Mobile" />
															{mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

														</div>
														<div className="form-group rg-inputwithiconno">
															<label>Your Email</label>
															<input type="email"
																name={email.name}
																value={email.value}
																onChange={this.handleChange}
																className="form-control"
																placeholder="Your Email" />
															{email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}

														</div>

														<div className="form-group rg-inputwithiconno">
															<label>Your Role</label>
															<select className="form-control"
																name={role.name}
																value={role.value}
																onChange={this.handleChange}
															>
																<option selected>Select People</option>
																<option value="Leadership/ CEO/ Owner/ Director">Leadership/ CEO/ Owner/ Director</option>
																<option value="Human Resource function">Human Resource function</option>
																<option value="Finance/ Operations">Finance/ Operations</option>
															</select>
															{role.error.length > 0 && !role.value && <span className='text-danger ml-1'>{role.error}</span>}
														</div>
														<div className="form-group">
															<a href={'https://recruit.rozgar.com'}>
																<button className="rg-btn rg-active" type="button" onClick={e => this.onSubmit(e)}>Submit</button>
															</a>
														</div>

													</form>
												</div>
											</div>

											<div className="roz-near-facilities-box">
												<div className="roz-near-facilities-heading">
													<h4>Advertisement</h4>
												</div>
												<div className="roz-near-facilities-body">

													<div className="roz-jobschedules">
														<div className="roz-tabcontent tab-content">
															<div className="roz-jobdetails roz-abouttab roz-tabpane">
																<div className="roz-jobdetaildescription">
																	<div className="roz-near-locality-box">
																		<div className="loccontentbox">
																			<h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
																			<p>Looking for an agency to design and develop an amazing website?</p>
																			<span className="roz-locrating-star">
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star-o"></i>
																				<i className="fa fa-star-o"></i>
																				<span>3.0</span>
																			</span>
																			<div className="roz-callphone">
																				<i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
																			</div>
																			<div className="roz-callphone">
																				<i className="lnr lnr-phone"></i> +91-1800 274 4515
																			</div>
																		</div>
																	</div>

																</div>
																<div className="roz-jobdetaildescription">
																	<div className="roz-near-locality-box">
																		<div className="loccontentbox">
																			<h4><span className="adbox">Ad</span> <a href="#">Tata The Indian Food Company, Sector 2, Noida - Zomato</a></h4>
																			<p>Tata The Indian Food Company Noida; Tata The Indian Food Company.</p>
																			<span className="roz-locrating-star">
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star-o"></i>
																				<i className="fa fa-star-o"></i>
																				<span>3.0</span>
																			</span>
																			<div className="roz-callphone">
																				<i className="fa fa-globe"></i> <a href="#">www.zomato.com</a>
																			</div>
																			<div className="roz-callphone">
																				<i className="lnr lnr-phone"></i> +91-1600 676 4514
																			</div>
																		</div>
																	</div>
																</div>
																<div className="roz-jobdetaildescription">
																	<div className="roz-near-locality-box">
																		<div className="loccontentbox">
																			<h4><span className="adbox">Ad</span> <a href="#">Corporate Companies For Food Products - Noida Sector 62</a></h4>
																			<p>Top Corporate Companies For Food Products in Noida Sector 62, Delhi.</p>
																			<span className="roz-locrating-star">
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star-o"></i>
																				<span>4.0</span>
																			</span>
																			<div className="roz-callphone">
																				<i className="fa fa-globe"></i> <a href="#">www.justdial.com</a>
																			</div>
																			<div className="roz-callphone">
																				<i className="lnr lnr-phone"></i> +91-1400 474 4516
																			</div>
																		</div>
																	</div>
																</div>
																<div className="roz-jobdetaildescription">
																	<div className="roz-near-locality-box">
																		<div className="loccontentbox">
																			<h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
																			<p>Looking for an agency to design and develop an amazing website?</p>
																			<span className="roz-locrating-star">
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star"></i>
																				<i className="fa fa-star-o"></i>
																				<i className="fa fa-star-o"></i>
																				<span>3.0</span>
																			</span>
																			<div className="roz-callphone">
																				<i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
																			</div>
																			<div className="roz-callphone">
																				<i className="lnr lnr-phone"></i> +91-1800 274 4515
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="roz-postfreejob">
															<a href="#">Place your ad here <i className="fa fa-angle-double-right"></i></a>
														</div>
													</div>
												</div>
											</div>
										</aside>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 float-left">
										<div className="rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree">
											<div className="rozgar-cityjobabout">
												<div className="rozgar-cityjobaboutbox">
													<div className="cityjob-aboutcontent">
														<h2>Future Work Trends</h2>
														<h4>The new reality of work is here. Learn how to chart your course to success.</h4>
														<p>Our world is transforming. From shifting industries and remote work to social unrest and economic uncertainty, it’s time to plan for what the future holds for your business—and for your most valuable asset, your workers. Deloitte and ServiceNow are helping re-architect work, with human focus at the forefront, so you can thrive today and for years to come.</p>
													</div>
													<div className="cityjob-aboutimg">
														<Image src={img03} />
													</div>
												</div>
											</div>
											
											{jobs.length > 0 ?
											 <div className="cityjobcompanybox p-2">
												<div className="rg-haslayout rg-sectionspace pb-0">
													<div className="row">
														<div className="col-12 col-sm-12 col-md-12 col-lg-12">
															<div className="rg-sectionhead">
																<h2>Jobs</h2>
																<a className="rg-btnviewall" href={constant.component.joblist.url.replace(':url', `jobs-in-${cityDetail?.URL}`)} target='_blank'>View All</a>
															</div>
														</div>
														<div className="rg-featuredjobs">

															<div className="rg-topcompaniesslider rg-topcompanies ">

																		{jobs.map((item, index) => {
																		let dynamicURLOne = ToSeoUrl(item.one.JOB_TITLE) + '-' + ToSeoUrl(item.one.COMPANY_NAME) + '-'  + ToSeoUrl(item.one.WORK_EXP_MIN) + '-' + 'to' + '-' + ToSeoUrl(item.one.WORK_EXP_MAX) + '-' + 'years' + '-' + item.one.CUSTOM_JOB_ID.slice(4) + '?src-LIST-' + item.one.JOB_ID
																		let dynamicURLTwo = ToSeoUrl(item.two.JOB_TITLE) + '-' + ToSeoUrl(item.two.COMPANY_NAME) +  '-' + ToSeoUrl(item.two.WORK_EXP_MIN) + '-' + 'to' + '-' + ToSeoUrl(item.two.WORK_EXP_MAX) + '-' + 'years' + '-' + item.two.CUSTOM_JOB_ID.slice(4) + '?src-LIST-' + item.two.JOB_ID
																		dynamicURLOne = dynamicURLOne.replace(/ /g, '')
																		dynamicURLTwo = dynamicURLTwo.replace(/ /g, '')
																		
																		return (
																				<div className="rg-feature-full-width mr-2 ml-2">
																					<div className='row'>
																						<div className="col-md-12 rg-featurejobholder">
																							<div className="rg-featurejob">
																								<figure className="rg-companyimg">
																									{item.one.COMPANY_LOGO === 'NA' ? <h3>{item.one.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.one.COMPANY_LOGO}`} alt={item.one.COMPANY_NAME} />}
																								</figure>
																								<div className="rg-companycontent">
																									<div className="rg-companyhead">
																										<div className="rg-rightarea">
																											<a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock"></i> {getDateParts(item?.one?.CREATED_ON).relativeTime}</a>
																										</div>
																									</div>
																									<div className="rg-companyname">
																										<h3><a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>{item.one.JOB_TITLE}</a></h3>
																										<h6>{item.one.COMPANY_NAME}</h6>
																										<div className="companyreviewbox">
																											<span className="main-2 rating"></span>|
																											<span className="main-2 reviews">{0} reviews</span>
																										</div>
																									</div>
																									<div className="rg-description">
																										<p>{item.one.JOB_DETAILS?.length > 64 ? Parser(item.one.JOB_DETAILS.slice(0, 64)) + '...' : Parser(item.one.JOB_DETAILS)}</p>
																										<ul className="skilllist">
																											{item.one.KEYWORDS.split(',').length && item.one.KEYWORDS.split(',').map((ele, index) => {
																												if (item.one.KEYWORDS.split(',').length == 1 && index == 1) {
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)

																												}
																												if (item.one.KEYWORDS.split(',').length == 2 && index == 2) {
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)
																												}
																												else if (index <= 3) {
																													return (
																														<span> <li>{ele}</li> |                                                                                                                                                                         </span>
																													)
																												}
																												else if (index == 4)
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)
																												else if (index == 5) {
																													return "..."
																												}
																											})}

																										</ul>
																									</div>
																									<div className="rg-rightarea">
																										<a className={item?.one?.LISTNING_TYPE == '1' ? 'rg-btnjobtag rg-internship mr-10' : item?.one?.LISTNING_TYPE == '2' ? 'rg-btnjobtag rg-parttimejob mr-10' : 'rg-fulltimejob rg-btnjobtag mr-10'} href="javascript:void(0);">
																											<i className="ti-thumb-up"></i> {item?.one?.LISTNING_TYPE == '1' ? 'Regular' : item?.one?.LISTNING_TYPE == '2' ? 'Featured' : 'Premium'}
																										</a>
																										<a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-star"></i> Save</a>
																									</div>
																								</div>
																							</div>
																							<ul className="rg-professionalinfo">
																								<li><i className="lnr lnr-briefcase"></i><span>{item?.one?.WORK_EXP_MIN}-{item?.one?.WORK_EXP_MAX} Yrs</span></li>
																								<li><i className="fa fa-rupee"></i><span>{item?.one?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.one?.CTC_MIN + '-' + item?.one?.CTC_MAX}</span></li>
																								<li><i className="lnr lnr-map-marker"></i><span>{item?.one?.STATE}</span></li>
																							</ul>
																						</div>
																						<div className="col-md-12 rg-featurejobholder">
																							<div className="rg-featurejob">
																								<figure className="rg-companyimg">
																									{item.two.COMPANY_LOGO === 'NA' ? <h3>{item.two.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.two.COMPANY_LOGO}`} alt={item.two.COMPANY_NAME} />}
																								</figure>
																								<div className="rg-companycontent">
																									<div className="rg-companyhead">
																										<div className="rg-rightarea">
																											<a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock"></i> {getDateParts(item?.two?.CREATED_ON).relativeTime}</a>
																										</div>
																									</div>
																									<div className="rg-companyname">
																										<h3><a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLTwo)}>{item.two.JOB_TITLE}</a></h3>
																										<h6>{item.two.COMPANY_NAME}</h6>
																										<div className="companyreviewbox">
																											<span className="main-2 rating">{(Math.round(item.two.rating * 10) / 10) > 5 ? 5 : Math.round(item.two.rating * 10) / 10}</span>|<span className="main-2 reviews">{item.two.reviewCount} reviews</span>
																										</div>
																									</div>
																									<div className="rg-description">
																										<p>{item.two.JOB_DETAILS?.length > 64 ? Parser(item.two.JOB_DETAILS.slice(0, 64)) + '...' : Parser(item.two.JOB_DETAILS)}</p>
																										<ul className="skilllist">
																											{item.two.KEYWORDS.split(',').length && item.two.KEYWORDS.split(',').map((ele, index) => {
																												if (item.two.KEYWORDS.split(',').length == 1 && index == 1) {
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)

																												}
																												if (item.two.KEYWORDS.split(',').length == 2 && index == 2) {
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)
																												}
																												else if (index <= 3) {
																													return (
																														<span> <li>{ele}</li> |                                                                                                                                                                         </span>
																													)
																												}
																												else if (index == 4)
																													return (
																														<span> <li>{ele}</li>                                                                                                                                                                          </span>
																													)
																												else if (index == 5) {
																													return "..."
																												}
																											})}

																										</ul>
																									</div>
																									<div className="rg-rightarea">
																										<a className={item?.two?.LISTNING_TYPE == '1' ? 'rg-btnjobtag rg-internship mr-10' : item?.two?.LISTNING_TYPE == '2' ? 'rg-btnjobtag rg-parttimejob mr-10' : 'rg-fulltimejob rg-btnjobtag mr-10'} href="javascript:void(0);">
																											<i className="ti-thumb-up"></i> {item?.two?.LISTNING_TYPE == '1' ? 'Regular' : item?.two?.LISTNING_TYPE == '2' ? 'Featured' : 'Premium'}
																										</a>
																										<a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-star"></i> Save</a>
																									</div>
																								</div>
																							</div>
																							<ul className="rg-professionalinfo">
																								<li><i className="lnr lnr-briefcase"></i><span>{item?.two?.WORK_EXP_MIN}-{item?.two?.WORK_EXP_MAX} Yrs</span></li>
																								<li><i className="fa fa-rupee"></i><span>{item?.two?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.two?.CTC_MIN + '-' + item?.two?.CTC_MAX}</span></li>
																								<li><i className="lnr lnr-map-marker"></i><span>{item?.two?.STATE}</span></li>
																							</ul>
																						</div>
																					</div>
																				</div>
																		)

																	})}


															</div>
														</div>
													</div>
												</div>
											</div>
											:''}
											<div className="rg-adds rg-featurejobholder">
												<a href={constant.component.homepage.url} title="">
													<figure>
														<Image src={adds07 } alt="img description" />
													</figure>
												</a>
												<span>Ad</span>
											</div>

											<div className="citytredsjobbox">
												<div className="rg-title">
													<h2>Job Trends</h2>
													<p>This Job Study is a holistic analysis of the Indian Analytics and Data Science jobs and skills landscape. This study/report covers the top job trends in the analytics space, specifically open jobs at a given point in time. It provides a detailed break-up and analysis of jobs by certain criteria, such as cities, industries, experience levels, technologies/tools, and salary hierarchies. The report provides details and analysis of the types of companies that are recruiting key talent in the data science domain.  The report identifies reasons for significant shifts or changes in hiring trends across the criteria defined above.</p>
												</div>
												<h6>Open Data Science Jobs Trend (April 2014 to June 2021)</h6>
												<Image src={Trendsgraphs} />
											</div>

											{localities.length > 0 && <div className="rozgar-cityjobslocaitonbox mt-20">
												<div className="rozgar-cityjobslocaiton">
													<h3>Featured Destinations</h3>
													<ul>
														{
															localities.length > 0 && localities.map((item, index) => {
																return (
																	<li title={item.LOCALITY} ><a href={constant.component.joblist.url.replace(':url',`jobs-in-${item.URL}`)} target='_blank'><i className="fa fa-angle-double-right"></i> Jobs in {item.LOCALITY.length > 16 ? item.LOCALITY.slice(0, 16) + '...' : item.LOCALITY}</a></li>
																)
															})
														}
													</ul>
												</div>
											</div>}

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}
