import React, { Component } from 'react'
import Link from 'next/link';
import Shimmer from '../common/Shimmer';
import OpenJobs from './companydetailsopenjobs'
import Overview from './companydetailsoverview'
import constant from 'constant';
import CVPIC from '../../assets/images/cv-pic.jpg'
import ModalWindow from '../common/ModalWindow'
import Modal from 'react-modal';
import { getStorage, numberWithCommas } from 'utils';
import Announceimg01 from 'src/assets/images/announce-img01.png'
import SignInForApplyJobs from 'src/pages/signin/SignInForApplyJobs';
import  cvpico1  from 'src/assets/images/cv-pic01.png'
import  adds04    from 'src/assets/images/adds-04.jpg'

let OpenJobs   = dynamic(()=>import('./companydetailsopenjobs') ,{
    ssr:false,
    loading:()=> <h1> loading</h1>
} ) 


export default class Companydetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'overview',
			showModal: false,
			leftBar: false,
			detail: getStorage(constant.keys.cd)
		}
	}

	onCloseModal = () => {
		this.setState({ openModal: false, leftBar: true })
		window.location.reload()
	}

	onOpenModal = () => {
		const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
		if (!CANDIDATE_ID) {
			this.setState({ openModal: true })
		}

	}

	makeActive = (tab) => {
		this.setState({ tab: tab })
	}

	onFollow = () => {
		const tk = getStorage(constant.keys.ctoken)
		if (tk) {
			this.props.follow(this.props.detail.EMPLOYER_ID)
		}
		// else {
		// 	window.location.href = constant.component.signin.url
		// }
	}

	render() {
		const { detail, jobs, TOP_COMPANY_IMAGES } = this.props;
		const { tab, showModal } = this.state;
		const nameInitial = detail?.COMPANY_NAME?.split(' ')?.map((i) => i.substring(0, 1)).join('')
		const tk = getStorage(constant.keys.ctoken)
	
		return (
			<React.Fragment>
				<main id="rg-main" className="rg-main rg-haslayout">
					<div className="rg-haslayout rg-sectionspace">
						<div className="container">
							<div className="row">
								<div id="rg-twocolumns" className="rg-twocolumns">
									<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">
										{detail === undefined && <Shimmer />}
										{detail && <div className="rg-jobapplycenter rg-jobapplycentervtwo">
											<figure className="rg-companyimg">
												{detail?.COMPANY_LOGO === 'NA' ? <h1>{nameInitial}</h1> : <a href="#"><img src={`${process.env.REACT_APP_BASE_URL}/company/logo/${detail?.COMPANY_LOGO}`} alt={detail?.COMPANY_NAME} /></a>}
											</figure>
											<div className="rg-companycontent">
												<div className="rg-jobapplydetails">
													<div className="rg-companydetailsname">
														<h3><a href="javascript:void(0);">{detail?.COMPANY_NAME}</a></h3>
														<ul className="rg-postarticlemetavtwo">
															<li>
																<a href="javascript:void(0);">
																	
																	{/* {(Math.round(detail?.rating * 10) / 10) > 5 ? 5 : Math.round(detail?.rating * 10) / 10} */}
																	 <i className="fa fa-star"></i>
																	<span> {0} reviews</span>
																</a>
															</li>
														</ul>
														{/* <p>Unfold your brand story</p> */}
														<ul className="rg-employerjobs">
															<li><a href="javascript:void(0);">{detail?.COMPANY_TYPE}</a></li>
															{/* <li><a href="javascript:void(0);">Consulting</a></li> */}
															{/* <li><a href="javascript:void(0);">Indian MNC</a></li> */}
															{/* <li><a href="javascript:void(0);">B2B</a></li> */}
														</ul>
													</div>
												</div>
												<div className="rg-jobapplybtnlike">
													{/* <div className="rg-likebtnbox" style={{ cursor: 'pointer' }}><a href="javascript:void(0);" onClick={() => {
														this.onOpenModal()
														this.onFollow()
													}} className="rg-btn rg-active">{tk ? this.props.isFollowedByMe ? 'Followed' : 'Follow' : 'Follow'} </a>
													</div> */}
													<div className="rg-likebtnbox" style={{ cursor: 'pointer' }}>
														{numberWithCommas(detail?.followers)} followers&nbsp;&nbsp;<a href="javascript:void(0);" onClick={() => {
															this.onOpenModal()
															this.onFollow()
														}} className="rg-btn rg-active">{tk ? this.props.isFollowedByMe ? 'Followed' : 'Follow' : 'Follow'} </a>
													</div>
												</div>
											</div>
										</div>}
										<div className="rg-jobschedules">
											<ul className="rg-themenavtabs nav navbar-nav">
												<li className="nav-item">
													<a onClick={() => { this.makeActive('overview') }} className={tab === 'overview' && "active"} id="home-tab" data-toggle="tab" href="#about">Overview</a>
												</li>
												<li className="nav-item">
													<a onClick={() => { this.makeActive('openjobs') }} className={tab === 'openjobs' && "active"} id="profile-tab" data-toggle="tab" href="#openjobs">Open Jobs</a>
												</li>
												{/* <!-- <li className="nav-item">
											<a id="settings-tab" data-toggle="tab" href="#qa">Why Join Us</a>
										</li>
										<li className="nav-item">
											<a id="contact-tab" data-toggle="tab" href="#contact">Contact Us</a>
										</li> --> */}
											</ul>

											{tab === 'overview' && <Overview
												detail={detail}
												jobs={jobs}
											/>}
											{tab === 'openjobs' && <OpenJobs
												detail={detail}
												jobs={jobs}

											/>}
										</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
										<aside id="rg-sidebarvtwo" className="rg-sidebar rg-sidebarvtwo">
											<div className="roz-create-cv">
												<div className='urgent-hiring-area'>
													<Link to={constant.component.hiringfresherjob.url}>
														<div className='hiring-img'>
															<img src={Announceimg01}/>
														</div>
													</Link>
												</div>
												<div className="roz-create-cv">
													<a target='_blank' href={constant.component.ResumeMaking.url}>
														<div className="create-cv-bg">
															<div className="imgfree">
																<img src={cvpico1} />
															</div>
															<div className="create-text">
																<div className="free-text">Free</div>
																<h4>Create CV</h4>
															</div>
															<div className="d-flex btn-cv p-0">
																<i className="fa fa-angle-double-right" ></i>
															</div>
														</div>
													</a>
												</div>
											</div>
											<div className="roz-company-hiring mb-30">
												<div className="company-hiring">
													<div className="company-hiring-text">
														<h3>Companies Hiring</h3>
													</div>
													<div className="company-hiring-view">
														<a target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
													</div>
												</div>
												<div className="company-hiring-logo">
													{TOP_COMPANY_IMAGES !== undefined && TOP_COMPANY_IMAGES.length > 0 && TOP_COMPANY_IMAGES.map((item, index) => {
														return (
															<a href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)} target='_blank'><img src={`${process.env.REACT_APP_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} /></a>
														)
													})}

												</div>
											</div>
											<div className="rg-adds rg-jobsearchadd">
												<a href="javascript:void(0);" title="">
													<figure>
														<img src={adds04} alt="img description" />
													</figure>
												</a>
												<span>Ad</span>
											</div>
											{/* <div className="roz-aside-review">
												<div className="roz-aside-review-box">
													<h3>Reviews by Job Profile</h3>
												</div>
												<div className="roz-aside-reviewpoints-box">
													<ul>
														<li><a href="javascript:void(0);"><i className="fa fa-star"></i> <span className="pno">4.4 </span> System Analyst <span>(14)</span></a></li>
														<li><a href="javascript:void(0);"><i className="fa fa-star"></i> <span className="pno">3.8 </span> Software Engineer (25)</a></li>
														<li><a href="javascript:void(0);"><i className="fa fa-star"></i> <span className="pno">3.8 </span> Transaction Processing Analyst (9)</a></li>
														<li><a href="javascript:void(0);"><i className="fa fa-star"></i> <span className="pno">2.6 </span> Technical Support Engineer(12)</a></li>
													</ul>
													<a href="#" className="viewall">View all</a>
												</div>
											</div> */}

											{/* <div className="roz-aside-awards">
												<div className="roz-aside-awards-box">
													<h3>Awards & Recognitions</h3>
												</div>
												<div className="roz-aside-awardspoints-box">

													<div className="awardsyears-list">
														<div className="awardsyears">
															2020
														</div>
														<div className="item">
															<div className="desc">
																<div className="title">Microsoft Partner of the Year Awards</div>
															</div>
														</div>
													</div>
													<div className="awardsyears-list">
														<div className="awardsyears">
															2021
														</div>
														<div className="item">
															<div className="desc">
																<div className="title">Business Transformation Symposium Awards</div>
															</div>
														</div>
													</div>
													<div className="awardsyears-list">
														<div className="awardsyears">
															2021
														</div>
														<div className="item">
															<div className="desc">
																<div className="title">Manufacturing Leadership Awards Winners</div>
															</div>
														</div>
													</div>

												</div>
											</div> */}

										</aside>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				<Modal
					isOpen={this.state.openModal}
					style={{ content: { top: "5%", left: '30%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
					onRequestClose={this.onCloseModal}
				>
					<SignInForApplyJobs
						leftBar={this.state.leftBar}
						history={this.props.history}
						onCloseModal={this.onCloseModal}
					/>
				</Modal>
			</React.Fragment>
		)
	}
}
