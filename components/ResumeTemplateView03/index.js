import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment'
import React, { Component } from 'react'
import emailIcon from 'src/assets/img/test-img/email-white.png'
import mobileIcon from 'src/assets/img/test-img/mobile-white01.png'
import locationIcon from 'src/assets/img/test-img/location-white.png'
import linkedIcon from 'src/assets/img/test-img/linkedin-white.png'
import instagramIcon from 'src/assets/img/test-img/instagram-white.png'
import facebookIcon from 'src/assets/img/test-img/facebook-white.png'
import twitterIcon from 'src/assets/img/test-img/twitter-white.png'
import globeIcon from 'src/assets/img/test-img/globe-white.png'
import gitIcon from 'src/assets/img/test-img/git-white.png'
import authorImage from 'src/assets/images/author/img-01.jpg'
import appTempone from 'src/assets/img/demos/demo-5.png'
import Image from 'next/image';

import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';
import { purchaseResume, saveResumePaymentDetail } from '@/action/personalRecruiter';
import constant from 'constant';
import { getCookie } from 'cookies-next';
// import WaterMark from "src/assets/images/rozgar-watermark.png"

import ResumePayment from 'components/common/resumePayment';
import Modal from "react-modal";
import Loader from 'components/spinner';
export default class ResumeTemplateView03 extends Component {

    constructor(props) {
        super(props)
        this.state = {
        //   details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
          showModal: false,
          showLoader:false

        }
      }

    printPDF2 = () => {

        const detail = this.props.candidateLists
        let cd_name = detail.firstName + " " + detail.secondName


        window.html2canvas = html2canvas;
        let doc = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4",
        });

        let content = document.getElementById("resume3");
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

                <main id="rg-main" className="rg-main rg-haslayout">
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
                        <div className='watermarks'>
                            {/* <div className="waterimg">
                                <Image src={WaterMark} width={650} height={650} />
                            </div> */}
                            <div className="rg-haslayout rg-sectionspace"
                                id={'resume3'}>
                                <div className="container">
                                    <div className="row">
                                        <div className='col-md-12'>
                                            <div className='d-flex cvboxshadow'>
                                                <div className='cv-left-details'>
                                                    <div className='text-center'>


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



                                                        <h3 className='text-white cand-name' style={{ textTransform: "capitalize" }}>{detail.firstName + " " + detail.secondName}</h3>
                                                        <div className='line20pix'></div>
                                                        <div className='per-degination'>
                                                            <h5 style={{ color: "#fff" }}>{detail.JobTitle}</h5>
                                                        </div>
                                                        <div className='detailscv'>
                                                            <h2>Details</h2>
                                                            <div className='address-cv-text'>
                                                                <span style={{ fontWeight: "600" }}>Address:</span> {detail.PermanentAddress}
                                                            </div>
                                                            <div className='address-cv-text'>
                                                                <span>Phone:</span> {detail.MobileNo}
                                                            </div>
                                                            <div className='address-cv-text' style={{ wordBreak: "break-all", lineHeight: "20px" }}>
                                                                <span style={{ fontWeight: "600" }}>Email Id:</span> {detail.EmailId}
                                                            </div>
                                                        </div>
                                                        {detail.Skills.length > 0 ?
                                                            <div className='skills-cvp'>
                                                                <h2>Skills</h2>
                                                                {
                                                                    detail.Skills && detail.Skills.map((item) => {
                                                                        if (item.SKILL_LEVEL == 'Beginner') {
                                                                            return (
                                                                                <div className='skill-progress'>
                                                                                    <div className='proress-bar' style={{ width: '35%', background: '#fff' }}></div>
                                                                                    <div className='progress-text'>{item.SKILL_NAME}</div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        else if (item.SKILL_LEVEL == 'Intermidiate') {
                                                                            return (
                                                                                <div className='skill-progress'>
                                                                                    <div className='proress-bar' style={{ width: '75%', background: '#fff' }}></div>
                                                                                    <div className='progress-text'>{item.SKILL_NAME}</div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        else if (item.SKILL_LEVEL == 'Proficient') {
                                                                            return (
                                                                                <div className='skill-progress'>
                                                                                    <div className='proress-bar' style={{ width: '99%', background: '#fff' }}></div>
                                                                                    <div className='progress-text'>{item.SKILL_NAME}</div>
                                                                                </div>
                                                                            )

                                                                        }
                                                                        else {
                                                                            return (
                                                                                <div className='skill-progress'>
                                                                                    <div className='proress-bar' style={{ width: '99%', background: '#fff' }}></div>
                                                                                    <div className='progress-text'>{item.SKILL_NAME}</div>
                                                                                </div>
                                                                            )

                                                                        }


                                                                    })
                                                                }
                                                            </div> : ''}
                                                        {detail.SocialProfile.length > 0 ?
                                                            <div className='detailscv' style={{ marginTop: "20px" }}>
                                                                <h2>Join Me</h2>

                                                                {
                                                                    detail.SocialProfile && detail.SocialProfile.map((item) => {
                                                                        if (item.SOCIAL_NAME == "L") {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Linkedin:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        } else if (item.SOCIAL_NAME == "T") {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Twitter:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        } else if (item.SOCIAL_NAME == "I") {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Instagram:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        } else if (item.SOCIAL_NAME == "G") {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Git:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        }
                                                                        else if (item.SOCIAL_NAME == "F") {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Facebook:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        }
                                                                        else {
                                                                            return (
                                                                                <div className='address-cv-text join-Me-section'>
                                                                                    <span>Other:</span> <a href="">{item.SOCIAL_LINK}</a>
                                                                                </div>
                                                                            )

                                                                        }
                                                                    })
                                                                }

                                                            </div> : ''}
                                                    </div>
                                                </div>
                                                <div className='cv-right-details'>
                                                    {detail.Bio.length > 0 ?
                                                        <div className='pro-details-cv'>
                                                            <h2>Profile</h2>
                                                            <p>{detail.Bio}</p>
                                                        </div> : ''}
                                                    {detail.Experience.length > 0 ?
                                                        <div className='project-cv-details'>
                                                            <h2>Employment History</h2>


                                                            {
                                                                detail.Experience && detail.Experience.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <div className='project-cv-onebyone'>
                                                                                <div className='project-cv-name' style={{ textTransform: "capitalize" }}>{item.EXPERIENCE_TITLE}</div>
                                                                                <div className='project-start-end'>{moment(item.EXPERIENCE_FROM_MONTH).format('MMM')} {item.EXPERIENCE_FROM_YEAR} - {item.CURRENT_COMPANY == "N" ? `${moment(item.EXPERIENCE_TO_MONTH).format('MMM')} ${item.EXPERIENCE_TO_YEAR}` : 'Present'}</div>
                                                                                <ul className='project-line-manage'>
                                                                                    <li>{item.EXPERIENCE_DESCRIPTION}</li>
                                                                                </ul>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            {/* <div className='project-cv-onebyone'>
                                                    <div className='project-cv-name'>Branch Customer Service Representative</div>
                                                    <div className='project-start-end'>April,12,2010 to March 29 2019</div>
                                                    <ul className='project-line-manage'>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                    </ul>
                                                </div>
                                                <div className='project-cv-onebyone'>
                                                    <div className='project-cv-name'>Branch Customer Service Representative</div>
                                                    <div className='project-start-end'>April,12,2010 to March 29 2019</div>
                                                    <ul className='project-line-manage'>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                        <li>Maintained up to date knowledge of products and services</li>
                                                    </ul>
                                                </div> */}

                                                        </div> : ''}

                                                    {detail.Education.length > 0 ?

                                                        <div className='project-cv-details'>
                                                            <h2>Education</h2>
                                                            {
                                                                detail.Education && detail.Education.map((item) => {
                                                                    return <>
                                                                        <div className='project-cv-onebyone'>
                                                                            <div className='project-cv-name'>{item.DEGREE.DEGREE_VALUE}, {item.SCHOOL}</div>
                                                                            <div className='project-start-end'>{item.EDUCATION_TO_YEAR == "" ? ` ${item.EDUCATION_FROM_YEAR} - Present ` : `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}`}</div>
                                                                            <ul className='project-line-manage'>
                                                                                <li>{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </>
                                                                })
                                                            }
                                                        </div> : ''}





                                                    {detail.PROJECT.length > 0 ?

                                                        <div className='project-cv-details'>
                                                            <h2>Projects </h2>
                                                            {
                                                                detail.PROJECT && detail.PROJECT.map((item) => {
                                                                    return <>
                                                                        <div className='project-cv-onebyone'>
                                                                            <div className='project-start-end'>{item.PROJECT_NAME}</div>
                                                                            <p className='project-line-manage'>
                                                                                {item.PROJECT_DESCRIPTION}
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                })
                                                            }
                                                        </div> : ''}





                                                    {detail.Interest.length > 0 ?
                                                        <div className='project-cv-details'>
                                                            <h2>Interest</h2>
                                                            <div className='project-cv-onebyone'>
                                                                <ul className='project-line-manage'>
                                                                    {
                                                                        detail.Interest && detail.Interest.map((item) => {
                                                                            return <>
                                                                                <>
                                                                                    <li style={{ textTransform: "capitalize" }}>{item.INTRESTS_NAME}</li>
                                                                                </>
                                                                            </>
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div> : ''}

                                                    {/* <div className='project-cv-details'>
                                                <h2>Interest</h2>
                                                <ul>
                                                    {
                                                        detail.Interest && detail.Interest.map((item) => {
                                                            return <>
                                                                <>
                                                                    <li style={{ textTransform: "capitalize" }}>{item.INTEREST}</li>
                                                                </>
                                                            </>
                                                        })
                                                    }
                                                </ul>

                                            </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                </main>

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

        )
    }
}
