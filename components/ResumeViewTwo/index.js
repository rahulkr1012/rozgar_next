import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { Component } from 'react'
import { withRouter } from 'next/router';
import { capFirstLetterInSentence } from 'utils';
// import ReactToPrint from 'react-to-print'
// import '../../../../src/assets/css/rmaking/orbit-1.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';
import Head from 'next/head';
import userImage from 'src/assets/img/test-img/1.jpg'
import userIcon from 'src/assets/img/test-img/user-white.png'
import expIcon from 'src/assets/img/test-img/suitcase-white.png'
import projectIcon from 'src/assets/img/test-img/project-white.png'
import emailIcon from 'src/assets/img/test-img/email-white.png'
import mobileIcon from 'src/assets/img/test-img//mobile-white01.png'
import locationIcon from 'src/assets/img/test-img/location-white.png'
import linkedIcon from 'src/assets/img/test-img/linkedin-white.png'
import instagramIcon from 'src/assets/img/test-img/instagram-white.png'
import facebookIcon from 'src/assets/img/test-img/facebook-white.png'
import twitterIcon from 'src/assets/img/test-img/twitter-white.png'
import globeIcon from 'src/assets/img/test-img/globe-white.png'
import gitIcon from 'src/assets/img/test-img/git-white.png'
import appTempone from 'src/assets/img/demos/demo-2.png'
import { purchaseResume, saveResumePaymentDetail } from '@/action/personalRecruiter';
import { getCookie } from 'cookies-next';
import ResumePayment from 'components/common/resumePayment';
import Modal from "react-modal";
import constant from 'constant';
import Loader from 'components/spinner';

// import WaterMark from "src/assets/images/rozgar-watermark.png"

const ref = React.createRef();

export default withRouter(class ResumeViewTwo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //   details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
            showModal: false,
            showLoader:false
        }
    }


    printPDF2 = async () => {


        const detail = this.props.candidateLists
        let cd_name = detail.firstName + " " + detail.secondName

        window.html2canvas = html2canvas;
        var doc = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4",
        });

        var content = document.getElementById("resume2");
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
                                doc.html(content, {
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

                                            var content = document.getElementById("resume2");
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
        const cd_list = this.props.cd_list

        return (
            <React.Fragment>

                <Head >


                    {<title title={" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}>{" Create Free CV - " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "-Rozgar.com"}</title>}
                    <meta name="HandheldFriendly" content="True" />
                    <meta name="Keywords" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + " Create a CV in Minutes, Free CV Builder, Free CV Templates, Free Online CV Generator, Create Free Resume Online, Rozgar CV"}></meta>
                    <meta name="description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
                    <link rel="canonical" href={this.props.router.asPath} />
                    <meta name="referrer" content="no-referrer-when-downgrade" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* og meta tag */}
                    <meta property="og:site_name" content="Rozgar.com" />
                    <meta property="og:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta property="og:description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
                    <meta property="og:url" content={"https://rozgar.com" + this.props.router.asPath} />
                    <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta property="og:image:width" content="4000" />
                    <meta property="og:image:height" content="6000" />

                    {/* Twitter Meta Tag */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' '))} />
                    <meta name="twitter:description" content={" Create your Free CV Online - Use " + capFirstLetterInSentence(this.props.router.asPath.replace('/', '').split('/').pop().split('-').join(' ')) + "for Free Online CV maker, allows you to create a perfect Resume in less than 5 minutes. See how easy it is to write a professional resume. Focus on building a career, not your CV. Create CV now!"} />
                    <meta name="twitter:url" content={"https://rozgar.com" + this.props.router.asPath} />
                    <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                    <meta name="twitter:label1" content="Written by" />
                    <meta name="twitter:data1" content="Smita Nag" />
                    <meta name="twitter:label2" content="Filed under" />
                    <meta name="twitter:data2" content="Career Advice, Career Insights" />
                    <meta name="twitter:site" content="@rozgar_india" />
                </Head>
                {this.state.showLoader && <Loader/>}

                <div className='rowresumeview' style={{ paddingTop: "0" }}>


                    {  /* <ReactToPrint
                        trigger={() => {
                            return <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }}>Download Resume</button>
                        }}
                        content={() => this.componentRef}
                    /> */ }

                    <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => {
                        this.onOpenModal()
                    }}>Unlock CV Download Without Watermark</button>

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
                            <div class="wrappercv page-break"
                                ref={el => (this.componentRef = el)}
                                id={'resume2'}
                            >

                                <div className="main-wrapper pdftemp2width75">
                                    {detail.Bio.length > 0 ?
                                        <section class="section summary-section">
                                            <h2 class="section-title"><span class="icon-holder">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={userIcon} alt="" style={{ marginTop: "5px" }} />
                                                {/* <i class="fa fa-user" style={{fontSize:"20px",marginTop:"5px"}}></i> */}
                                            </span>Career Profile</h2>
                                            <div class="summary">
                                                <p>{detail.Bio}</p>
                                            </div>
                                        </section> : ""}
                                    {detail.Experience.length > 0 ?
                                        <section class="section experiences-section">
                                            <h2 class="section-title"><span class="icon-holder">
                                                <Image src={expIcon} alt=""
                                                    width={20}
                                                    height={20}
                                                    style={{ marginTop: "5px" }} />
                                                {/* <i class="fa fa-briefcase" style={{fontSize:"18px",marginTop:"7px"}}></i> */}
                                            </span>Experiences</h2>

                                            {
                                                detail.Experience && detail.Experience.map((item) => {
                                                    return (
                                                        <React.Fragment>
                                                            <div class="item" >
                                                                <div class="meta">
                                                                    <div class="upper-row">
                                                                        <h3 class="job-title" style={{ textTransform: "capitalize", lineHeight: "29px" }}>{item.EXPERIENCE_TITLE}</h3>

                                                                    </div>
                                                                    <div class="company" style={{ textTransform: "capitalize" }}>{item.EXPERIENCE_COMPANY}</div>
                                                                    <div class="time">{item.EXPERIENCE_FROM_YEAR} - {item.CURRENT_COMPANY == 'Y' ? 'Present' : item.EXPERIENCE_TO_YEAR}
                                                                        {/* {moment(item.EXPERIENCE_FROM_YEAR).format('MMM YYYY')} - {item.IS_CURRENT_COMPANY == 'Y' ? 'Present' : moment(item.EXPERIENCE_TO_YEAR).format('MMM YYYY')} */}
                                                                    </div>
                                                                </div>
                                                                <div class="details">
                                                                    <p style={{ textTransform: "capitalize" }}>{item.EXPERIENCE_DESCRIPTION}</p>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </section> : ''}
                                    {detail.PROJECT.length > 0 ?
                                        <section class="section projects-section">
                                            <h2 class="section-title"><span class="icon-holder">
                                                <Image src={projectIcon} alt=""
                                                    width={20}
                                                    height={20}
                                                    style={{ marginTop: "5px" }} />
                                                {/* <i class="fa fa-desktop" style={{fontSize:"18px",marginTop:"7px"}}></i> */}
                                            </span>Projects</h2>
                                            {
                                                detail.PROJECT && detail.PROJECT.map((item) => {
                                                    return (
                                                        <React.Fragment>
                                                            <div class="item" >
                                                                <span class="project-title"><a href="#" target="_blank" style={{ textTransform: "capitalize" }}>{item.PROJECT_NAME}</a></span> - <span class="project-tagline" style={{ textTransform: "capitalize" }}>{item.PROJECT_DESCRIPTION}</span>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                        </section> : ''}
                                    {detail.Skills.length > 0 ?
                                        <section class="skills-section section">

                                            <h2 class="section-title"><span class="icon-holder">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={projectIcon} alt="" style={{ marginTop: "5px" }} />
                                                {/* <i class="fa fa-cogs" style={{fontSize:"18px",marginTop:"7px"}}></i> */}

                                            </span>Skills &amp; Proficiency</h2>

                                            <div class="skillset">
                                                {

                                                    detail.Skills && detail.Skills.map((item) => {
                                                        console.log(item, "skill");
                                                        if (item.SKILL_LEVEL == "Beginner") {
                                                            return (
                                                                <React.Fragment>
                                                                    <div class="item">
                                                                        <h3 class="level-title">{item.SKILL_NAME}</h3>
                                                                        <div class="progress level-bar">
                                                                            <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '35%' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                        else if (item.SKILL_LEVEL == "Intermidiate") {
                                                            return (
                                                                <React.Fragment>
                                                                    <div class="item">
                                                                        <h3 class="level-title">{item.SKILL_NAME}</h3>
                                                                        <div class="progress level-bar">
                                                                            <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                        else if (item.SKILL_LEVEL == "Proficient") {
                                                            return (
                                                                <React.Fragment>
                                                                    <div class="item">
                                                                        <h3 class="level-title">{item.SKILL_NAME}</h3>
                                                                        <div class="progress level-bar">
                                                                            <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '99%' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <React.Fragment>
                                                                    <div class="item">
                                                                        <h3 class="level-title">{item.SKILL_NAME}</h3>
                                                                        <div class="progress level-bar">
                                                                            <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '99%' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    })
                                                }


                                            </div>
                                        </section> : ''}

                                </div>
                                <div class="sidebar-wrapper pdftemp2width25" >
                                    <div class="" style={{
                                        padding: "30px 15px 0px 15px",
                                        // background: "rgba(0, 0, 0, 0.2)",
                                        textAlign: "center",
                                        color: "#fff"
                                    }}>



                                        {detail && detail.PROFILE_IMAGE == null ?
                                            <Image
                                                className="picture" src={userImage} alt=""
                                                width={20}
                                                height={20}
                                            /> :
                                            detail.PROFILE_IMAGE == undefined ?
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    className="picture" src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
                                                :
                                                <Image
                                                    width={150}
                                                    height={150}
                                                    className="picture picture-resume-02" src={detail.PROFILE_IMAGE.includes('blob') ? detail.PROFILE_IMAGE : `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
                                        }



                                        <h1 className="name user-name-hd" style={{ textTransform: "capitalize", lineHeight: "30px", marginTop: "15px" }}>{detail.firstName + " " + detail.secondName}</h1>
                                        <h3 class="tagline" style={{ textTransform: "capitalize", marginTop: '5px' }}>{detail.JobTitle}</h3>
                                    </div>

                                    <div class="contact-container container-block right-sidebar-social">
                                        <ul class="list-unstyled contact-list">
                                            <li class="email">

                                                <Image
                                                    width={16}
                                                    height={16}
                                                    src={emailIcon} alt="" />

                                                <a href="#">{detail.EmailId}</a></li>
                                            <li class="phone">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={mobileIcon} alt="" />

                                                <a href="#">{detail.MobileNo}</a></li>
                                            <li class="location">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={locationIcon} alt="" />
                                                <a href='#'>{detail.PermanentAddress}</a></li>
                                            {
                                                detail.SocialProfile && detail.SocialProfile.map((item, index) => {
                                                    if (item.SOCIAL_NAME == 'L') {
                                                        return (
                                                            <li class="website">
                                                                <Image src={linkedIcon}
                                                                    width={14}
                                                                    height={14}
                                                                    alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )
                                                    }
                                                    else if (item.SOCIAL_NAME == 'T') {
                                                        return (
                                                            <li class="website">
                                                                <Image src={twitterIcon}
                                                                    width={12}
                                                                    height={12}
                                                                    alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )
                                                    }
                                                    else if (item.SOCIAL_NAME == 'F') {
                                                        return (
                                                            <li class="website">
                                                                <Image
                                                                    width={14}
                                                                    height={14}
                                                                    src={facebookIcon} alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )
                                                    }
                                                    else if (item.SOCIAL_NAME == 'G') {
                                                        return (
                                                            <li class="website">
                                                                <Image src={gitIcon}
                                                                    width={14}
                                                                    height={14}
                                                                    alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )
                                                    }
                                                    else if (item.SOCIAL_NAME == 'I') {
                                                        return (
                                                            <li class="website">
                                                                <Image src={instagramIcon}
                                                                    width={12}
                                                                    height={14}
                                                                    alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <li class="website">
                                                                <Image src={globeIcon}
                                                                    width={14}
                                                                    height={14}
                                                                    alt="" />

                                                                <a href={item.SOCIAL_LINK} target="_blank">{item.SOCIAL_LINK}</a>
                                                            </li>
                                                        )

                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                    {detail.Education.length > 0 ?
                                        <div class="education-container container-block">
                                            <h2 class="container-block-title">Education</h2>
                                            {
                                                detail.Education && detail.Education.map((item) => {
                                                    return (
                                                        <React.Fragment>
                                                            <div class="item"  >
                                                                <h4 class="degree" style={{ textTransform: "capitalize" }}>{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}</h4>
                                                                <h5 class="meta" style={{ textTransform: "capitalize" }}>{item.SCHOOL}</h5>
                                                                <div class="time">{item.EDUCATION_TO_YEAR == "" ? ` ${item.EDUCATION_FROM_YEAR} - Present ` : `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}`}
                                                                    {/* {moment(item.EDUCATION_FROM_YEAR).format('MMM YYYY')} - {moment(item.EDUCATION_TO_YEAR).format('MMM YYYY')} */}
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }


                                        </div> : ''}
                                    {detail.Languages.length > 0 ?
                                        <div class="languages-container container-block">
                                            <h2 class="container-block-title">Languages</h2>
                                            <ul class="list-unstyled interests-list">
                                                {
                                                    detail.Languages && detail.Languages.map((item) => {
                                                        return (
                                                            <React.Fragment>
                                                                <li style={{ textTransform: "capitalize" }}>{item.LANGUAGE_NAME} <span class="lang-desc" style={{ textTransform: "capitalize" }}>({item.LANGUAGE_LEVEL})</span></li>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div> : ''}

                                    {detail.Interest.length > 0 ?
                                        <div class="interests-container container-block">
                                            <h2 class="container-block-title">Interests</h2>
                                            <ul class="list-unstyled interests-list">
                                                {
                                                    detail.Interest && detail.Interest.map((item) => {
                                                        return (
                                                            <React.Fragment>
                                                                <li style={{ textTransform: "capitalize" }}>{item.INTRESTS_NAME}</li>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }


                                            </ul>
                                        </div> : ''}

                                </div>
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
})
