import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { Component } from "react";
import ReactToPrint from "react-to-print";

import { ToastContainer, toast } from 'react-toastify';
import success from '../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';

import userImage from "src/assets/img/test-img/1.jpg";
import emailIcon from "src/assets/img/test-img/email-white.png";
import mobileIcon from "src/assets/img/test-img/mobile-white01.png";
import locationIcon from "src/assets/img/test-img/location-white.png";
import linkedIcon from "src/assets/img/test-img/linkedin-white.png";
import instagramIcon from "src/assets/img/test-img/instagram-white.png";
import facebookIcon from "src/assets/img/test-img/facebook-white.png";
import twitterIcon from "src/assets/img/test-img/twitter-white.png";
import globeIcon from "src/assets/img/test-img/globe-white.png";
import gitIcon from "src/assets/img/test-img/git-white.png";
import Image from "next/image";
import appTempone from "src/assets/img/demos/demo-1.png";

export default class ResumeViewOne extends Component {

  printPDF2 = () => {
   
    const detail = this.props.candidateLists;
    let cd_name = detail.firstName + " " + detail.secondName;

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
            margin:[ 10, 0 , 10, 0],
            html2canvas: {  },
          })
          )
                         
              } );
                  
              toast.promise(
                  resolveAfter3Sec,
                          {
                           pending: 'Processing request',
                           success: {
                              render({data}){
                                  doc.save(cd_name);
                                  return `succesfully download`
                              },
                              // other options
                              icon: <Image src={success} /> ,
                            },
                          error: 'Promise rejected 🤯'
                          }
                      )
                      






    };

  
  render() {

    const detail = this.props.candidateLists;


    return (
      <React.Fragment>
        <article
          className="resume-wrapper text-center position-relative"
          style={{ paddingTop: "90px" }}
        >
          <button
            style={{
              display: "block",
              margin: "10px auto",
              padding: "12px",
              borderRadius: "5px",
              color: "#fff",
              backgroundColor: "red",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => {
              this.printPDF2();
            }}
          >
            Download Resume
          </button>

          {!this.props.mobileView && (
            <div>
              <div
                className="resume-wrapper-inner mx-auto text-start bg-white"
                ref={(el) => (this.componentRef = el)}
                id={"resume1"}
              >
                <div className="resume-header pt-md-0 container">
                  <div className="row media575">
                    {
                      <div className="col-lg-3 col-md-3 col-sm-2 p-0 mediaWidth25 profile-bg1">
                        {detail && detail.PROFILE_IMAGE == null ? (
                          <Image
                            className="picture"
                            src={userImage}
                            alt=""
                            width={1000}
                            height={1000}
                          />
                        ) : detail.PROFILE_IMAGE == undefined ? (
                          <Image
                            width={1000}
                            height={1000}
                            className="picture"
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`}
                            alt=""
                          />
                        ) : (
                          <Image
                            width={1000}
                            height={1000}
                            className="picture"
                            src={
                              detail.PROFILE_IMAGE.includes("blob")
                                ? detail.PROFILE_IMAGE
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`
                            }
                            alt=""
                          />
                        )}
                      </div>
                    }

                    <div className="col-lg-9 col-md-9 col-sm-10 px-left-0 mediaWidth75">
                      <div className="row py-2">
                        <div className="primary-info col-md-12 col-sm-10 mediaContent90">
                          <h1 className="name mt-0 mb-1 text-white text-uppercase resume-hd-one">
                            {detail.firstName + " " + detail.secondName}
                          </h1>
                          <div className="title title-skils-bx">
                            {detail.JobTitle}
                          </div>
                          <div className="row">
                            <div class="col-md-5">
                              <ul className="list-unstyled">
                                <li className="mb-21">
                                  <a className="text-link" href="#">
                                    <Image
                                      src={emailIcon}
                                      alt=""
                                      //  style={{ width: '20px' }}
                                      width={20}
                                      height={20}
                                      className="mr-1"
                                    />
                                    {detail.EmailId}
                                  </a>
                                </li>

                                <li className="">
                                  {" "}
                                  <a className="text-link" href="#">
                                    <Image
                                      src={mobileIcon}
                                      alt=""
                                      width={20}
                                      height={20}
                                      style={{ width: "20px" }}
                                      className="mr-1"
                                    />
                                    {detail.MobileNo}{" "}
                                  </a>{" "}
                                </li>
                              </ul>
                            </div>

                            <div class="col-md-7">
                              <ul className="resume-social list-unstyled">
                                {detail.SocialProfile &&
                                  detail.SocialProfile.map((item) => {
                                    if (item.SOCIAL_NAME == "L") {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              src={linkedIcon}
                                              width={18}
                                              height={18}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    } else if (item.SOCIAL_NAME == "T") {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={twitterIcon}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    } else if (item.SOCIAL_NAME == "I") {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={instagramIcon}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    } else if (item.SOCIAL_NAME == "G") {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={gitIcon}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    } else if (item.SOCIAL_NAME == "F") {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={facebookIcon}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    } else {
                                      return (
                                        <li className="mb-21">
                                          <a
                                            className="text-link"
                                            href={item.SOCIAL_LINK}
                                          >
                                            <Image
                                              width={18}
                                              height={18}
                                              src={globeIcon}
                                              alt=""
                                            />

                                            {item.SOCIAL_LINK}
                                          </a>
                                        </li>
                                      );
                                    }
                                  })}

                                {/* <li className="mb-2"><a className="text-link" href="#"><span className="fa-container text-center me-2"><i className="fab fa-linkedin-in fa-fw"></i></span>linkedin.com/in/stevedoe</a></li>
													<li className="mb-2"><a className="text-link" href="#"><span className="fa-container text-center me-2"><i className="fab fa-github-alt fa-fw"></i></span>github.com/username</a></li>
													<li className="mb-2"><a className="text-link" href="#"><span className="fa-container text-center me-2"><i className="fab fa-codepen fa-fw"></i></span>codepen.io/username/</a></li>
													<li><a className="text-link" href="#"><span className="fa-container text-center me-2"><i className="fas fa-globe"></i></span>yourwebsite.com</a></li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="resume-body px-5 pt-4">
                  <section className="resume-section summary-section pb-3">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Career <span>Summary</span>
                    </h2>
                    <div className="resume-section-content">
                      <p
                        className="mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {detail.Bio}
                      </p>
                    </div>
                  </section>

                  <div className="row">
                    <div className="col-lg-9 col-sm-9 pdfwidth70">
                      <section className="resume-section experience-section mb-5">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Work <span>Experience</span>
                        </h2>
                        <div className="resume-section-content">
                          <div className="resume-timeline position-relative">
                            {detail.Experience &&
                              detail.Experience.map((item) => {
                                return (
                                  <>
                                    <article className="resume-timeline-item position-relative pb-2">
                                      <div className="resume-timeline-item-header mb-2">
                                        <div className="d-flex flex-column flex-md-row">
                                          <h3
                                            className="resume-position-title font-weight-bold mb-1"
                                            style={{
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item.EXPERIENCE_TITLE}
                                          </h3>
                                          <div
                                            className="resume-company-name ms-auto"
                                            style={{
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item.EXPERIENCE_COMPANY}
                                          </div>
                                        </div>
                                        <div className="resume-position-time">
                                          {" "}
                                          {item.EXPERIENCE_FROM_YEAR} -{" "}
                                          {item.CURRENT_COMPANY == "N"
                                            ? item.EXPERIENCE_TO_YEAR
                                            : "Present"}
                                        </div>
                                      </div>
                                      <div className="resume-timeline-item-desc">
                                        <p
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.EXPERIENCE_DESCRIPTION}
                                        </p>
                                      </div>
                                    </article>
                                  </>
                                );
                              })}

                            {/* <article className="resume-timeline-item position-relative pb-5">

														<div className="resume-timeline-item-header mb-2">
															<div className="d-flex flex-column flex-md-row">
																<h3 className="resume-position-title font-weight-bold mb-1" style={{ textTransform: "capitalize" }}>Full stack developer</h3>
																<div className="resume-company-name ms-auto" style={{ textTransform: "capitalize" }}>google</div>
															</div>
															<div className="resume-position-time">2020 - 2022</div>
														</div>
														<div className="resume-timeline-item-desc">
															<p style={{ textTransform: "capitalize" }}>Lorem Ipsum is simply dummy
																text of the printing and typesetting industry.
																Lorem Ipsum has been the industry's standard dummy
																text ever since the 1500s, when an unknown printer
																took a galley of type and scrambled it to make a
																type specimen book. It has survived not only five centuries,
																but also the leap into electronic typesetting, remaining essentially unchanged.

															</p>
														</div>

													</article>
													<article className="resume-timeline-item position-relative pb-5">

														<div className="resume-timeline-item-header mb-2">
															<div className="d-flex flex-column flex-md-row">
																<h3 className="resume-position-title font-weight-bold mb-1" style={{ textTransform: "capitalize" }}>Full stack developer</h3>
																<div className="resume-company-name ms-auto" style={{ textTransform: "capitalize" }}>google</div>
															</div>
															<div className="resume-position-time">2020 - 2022</div>
														</div>
														<div className="resume-timeline-item-desc">
															<p style={{ textTransform: "capitalize" }}>Lorem Ipsum is simply dummy
																text of the printing and typesetting industry.
																Lorem Ipsum has been the industry's standard dummy
																text ever since the 1500s, when an unknown printer
																took a galley of type and scrambled it to make a
																type specimen book. It has survived not only five centuries,
																but also the leap into electronic typesetting, remaining essentially unchanged.

															</p>
														</div>

													</article>
													<article className="resume-timeline-item position-relative pb-5">

														<div className="resume-timeline-item-header mb-2">
															<div className="d-flex flex-column flex-md-row">
																<h3 className="resume-position-title font-weight-bold mb-1" style={{ textTransform: "capitalize" }}>Full stack developer</h3>
																<div className="resume-company-name ms-auto" style={{ textTransform: "capitalize" }}>google</div>
															</div>
															<div className="resume-position-time">2020 - 2022</div>
														</div>
														<div className="resume-timeline-item-desc">
															<p style={{ textTransform: "capitalize" }}>Lorem Ipsum is simply dummy
																text of the printing and typesetting industry.
																Lorem Ipsum has been the industry's standard dummy
																text ever since the 1500s, when an unknown printer
																took a galley of type and scrambled it to make a
																type specimen book. It has survived not only five centuries,
																but also the leap into electronic typesetting, remaining essentially unchanged.

															</p>
														</div>

													</article>
													<article className="resume-timeline-item position-relative pb-5">

														<div className="resume-timeline-item-header mb-2">
															<div className="d-flex flex-column flex-md-row">
																<h3 className="resume-position-title font-weight-bold mb-1" style={{ textTransform: "capitalize" }}>Full stack developer</h3>
																<div className="resume-company-name ms-auto" style={{ textTransform: "capitalize" }}>google</div>
															</div>
															<div className="resume-position-time">2020 - 2022</div>
														</div>
														<div className="resume-timeline-item-desc">
															<p style={{ textTransform: "capitalize" }}>Lorem Ipsum is simply dummy
																text of the printing and typesetting industry.
																Lorem Ipsum has been the industry's standard dummy
																text ever since the 1500s, when an unknown printer
																took a galley of type and scrambled it to make a
																type specimen book. It has survived not only five centuries,
																but also the leap into electronic typesetting, remaining essentially unchanged.

															</p>
														</div>

													</article> */}
                          </div>
                        </div>
                      </section>

                      <section className="resume-section experience-section mb-5 mt-4">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Project
                        </h2>
                        <div className="resume-section-content">
                          <div className="resume-timeline position-relative">
                            {detail.PROJECT &&
                              detail.PROJECT.map((item) => {
                                return (
                                  <>
                                    <article className="resume-timeline-item position-relative pb-2">
                                      <div className="resume-timeline-item-header mb-2">
                                        <div className="d-flex flex-column flex-md-row">
                                          <h3
                                            className="resume-position-title font-weight-bold mb-1"
                                            style={{
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item.PROJECT_NAME}
                                          </h3>
                                          {/* <div className="resume-company-name ms-auto" style={{ textTransform: "capitalize" }}>{item.CURRENT_COMPANY}</div> */}
                                        </div>
                                        {/* <div className="resume-position-time">{item.JOINING_DATE_YEAR} - {item.IS_THIS_YOUR_CURRENT_COMPANY == "N" ? item.WORKING_TILL_DATE_YEAR : 'Present'}</div> */}
                                      </div>
                                      <div className="resume-timeline-item-desc">
                                        <p
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.PROJECT_DESCRIPTION}
                                        </p>
                                      </div>
                                    </article>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="col-lg-3 col-sm-3 pdfwidth30">
                      <section className="resume-section skills-section mb-5">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Skills <span>&amp;</span> Tools
                        </h2>
                        <div className="resume-section-content">
                          <div className="resume-skill-item">
                            {/* <h4 className="resume-skills-cat font-weight-bold">Frontend</h4> */}
                            <ul className="list-unstyled mb-4">
                              {detail.Skills &&
                                detail.Skills.map((item) => {
                                  if (item.SKILL_LEVEL == "Beginner") {
                                    return (
                                      <li className="mb-2">
                                        <div
                                          className="resume-skill-name"
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.SKILL_NAME}
                                        </div>
                                        <div className="progresss resume-progress">
                                          <div
                                            className="progresss-bar theme-progress-bar-dark"
                                            role="progressbar"
                                            style={{ width: "35%" }}
                                          ></div>
                                        </div>
                                      </li>
                                    );
                                  } else if (
                                    item.SKILL_LEVEL == "Intermidiate"
                                  ) {
                                    return (
                                      <li className="mb-2">
                                        <div
                                          className="resume-skill-name"
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.SKILL_NAME}
                                        </div>
                                        <div className="progresss resume-progress">
                                          <div
                                            className="progresss-bar theme-progress-bar-dark"
                                            role="progressbar"
                                            style={{ width: "75%" }}
                                          ></div>
                                        </div>
                                      </li>
                                    );
                                  } else if (item.SKILL_LEVEL == "Proficient") {
                                    return (
                                      <li className="mb-2">
                                        <div
                                          className="resume-skill-name"
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.SKILL_NAME}
                                        </div>
                                        <div className="progresss resume-progress">
                                          <div
                                            className="progresss-bar theme-progress-bar-dark"
                                            role="progressbar"
                                            style={{ width: "99%" }}
                                          ></div>
                                        </div>
                                      </li>
                                    );
                                  } else {
                                    return (
                                      <li className="mb-2">
                                        <div
                                          className="resume-skill-name"
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {item.SKILL_NAME}
                                        </div>
                                        <div className="progresss resume-progress">
                                          <div
                                            className="progresss-bar theme-progress-bar-dark"
                                            role="progressbar"
                                            style={{ width: "99%" }}
                                          ></div>
                                        </div>
                                      </li>
                                    );
                                  }
                                  // return (
                                  // 	<li className="mb-2">
                                  // 		<div className="resume-skill-name" style={{ textTransform: "capitalize" }}>{item.SKILL}</div>
                                  // 		{/* <div className="progresss resume-progress">
                                  // 			<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '35%' }}></div>
                                  // 		</div> */}
                                  // 	</li>
                                  // )
                                  // else if (item.SKILL_LEVEL == "Intermidiate") {
                                  // 	return (
                                  // 		<li className="mb-2">
                                  // 			<div className="resume-skill-name" style={{ textTransform: "capitalize" }}>{item.SKILL_NAME}</div>
                                  // 			<div className="progresss resume-progress">
                                  // 				<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '75%' }}></div>
                                  // 			</div>
                                  // 		</li>
                                  // 	)
                                  // }
                                  // else if (item.SKILL_LEVEL == "Proficient") {
                                  // 	return (
                                  // 		<li className="mb-2">
                                  // 			<div className="resume-skill-name" style={{ textTransform: "capitalize" }}>{item.SKILL_NAME}</div>
                                  // 			<div className="progresss resume-progress">
                                  // 				<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '98%' }}></div>
                                  // 			</div>
                                  // 		</li>
                                  // 	)
                                  // }
                                })}
                              {/* <li className="mb-2">
															<div className="resume-skill-name">Angular</div>
															<div className="progresss resume-progress">
																<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '98%' }}></div>
															</div>
														</li>
														<li className="mb-2">
															<div className="resume-skill-name">React</div>
															<div className="progresss resume-progress">
																<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '96%' }}></div>
															</div>
														</li>
														<li className="mb-2">
															<div className="resume-skill-name">JavaScript</div>
															<div className="progresss resume-progress">
																<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '90%' }}></div>
															</div>
														</li>

														<li className="mb-2">
															<div className="resume-skill-name">Node.js</div>
															<div className="progresss resume-progress">
																<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '98%' }}></div>
															</div>
														</li>
														<li className="mb-2">
															<div className="resume-skill-name">HTML/CSS/SASS/LESS</div>
															<div className="progresss resume-progress">
																<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '85%' }}></div>
															</div>
														</li> */}
                            </ul>
                          </div>

                          {/* <div className="resume-skill-item">
												<h4 className="resume-skills-cat font-weight-bold">Backend</h4>
												<ul className="list-unstyled">
													<li className="mb-2">
														<div className="resume-skill-name">Python/Django</div>
														<div className="progresss resume-progress">
															<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '90%' }}></div>
														</div>
													</li>
													<li className="mb-2">
														<div className="resume-skill-name">Ruby/Rails</div>
														<div className="progresss resume-progress">
															<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '80%' }}></div>
														</div>
													</li>
													<li className="mb-2">
														<div className="resume-skill-name">PHP</div>
														<div className="progresss resume-progress">
															<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '98%' }}></div>
														</div>
													</li>
													<li className="mb-2">
														<div className="resume-skill-name">WordPress/Shopify</div>
														<div className="progresss resume-progress">
															<div className="progresss-bar theme-progress-bar-dark" role="progressbar" style={{ width: '98%' }}></div>
														</div>
													</li>
												</ul>
											</div> */}

                          {/* <div className="resume-skill-item">
												<h4 className="resume-skills-cat font-weight-bold">Others</h4>
												<ul className="list-inline">
													<li className="list-inline-item"><span className="badge badge-light">DevOps</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Code Review</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Git</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Unit Testing</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Wireframing</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Sketch</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Balsamiq</span></li>
													<li className="list-inline-item"><span className="badge badge-light">WordPress</span></li>
													<li className="list-inline-item"><span className="badge badge-light">Shopify</span></li>
												</ul>
											</div> */}
                        </div>
                      </section>
                      <section className="resume-section education-section pb-4">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Education
                        </h2>
                        <div className="resume-section-content">
                          <ul className="list-unstyled">
                            {detail.Education &&
                              detail.Education.map((item) => {
                                return (
                                  <>
                                    <li className="mb-2">
                                      <div className="resume-degree font-weight-bold">
                                        {item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in{" "}
                                        {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}
                                      </div>
                                      <div className="resume-degree-org">
                                        {item.SCHOOL}
                                      </div>
                                      <div className="resume-degree-time">
                                        {item.EDUCATION_FROM_YEAR} -{" "}
                                        {item.EDUCATION_TO_YEAR}
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                          </ul>
                        </div>
                      </section>
                      <section className="resume-section language-section pb-4">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Language
                        </h2>
                        <div className="resume-section-content">
                          <ul className="list-unstyled resume-lang-list">
                            {detail.Languages &&
                              detail.Languages.map((item) => {
                                return (
                                  <>
                                    <li
                                      className="mb-2"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      <span className="resume-lang-name font-weight-bold">
                                        {item.LANGUAGE_NAME}
                                      </span>{" "}
                                      <small className="text-muted font-weight-normal">
                                        ({item.LANGUAGE_LEVEL})
                                      </small>
                                    </li>
                                  </>
                                );
                              })}
                          </ul>
                        </div>
                      </section>

                      <section className="resume-section interests-section mb-5">
                        <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                          Interests
                        </h2>
                        <div className="resume-section-content">
                          <ul className="list-unstyled">
                            {detail.Interest &&
                              detail.Interest.map((item) => {
                                return (
                                  <>
                                    <li
                                      className="mb-1"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item.INTRESTS_NAME}
                                    </li>
                                  </>
                                );
                              })}
                          </ul>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {this.props.mobileView && (
            <div className="app-resume-view01">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="Apptemp01">
                      <Image src={appTempone} alt="Resume Templet" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>

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


      </React.Fragment>
    );
  }
}
