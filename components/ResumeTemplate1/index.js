import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { Component } from 'react'
import linkedIcon from 'src/assets/img/test-img/linkedin.png'
import instagramIcon from 'src/assets/img/test-img/instagram.png'
import facebookIcon from 'src/assets/img/test-img/facebook.png'
import twitterIcon from 'src/assets/img/test-img/twitter.png'
import globeIcon from 'src/assets/img/test-img/globe.png'
import gitIcon from 'src/assets/img/test-img/git.png'
import Image from 'next/image';
import r1Image from 'src/assets/images/r1-img.png'
import r2Image from 'src/assets/images/r2-img.png'
import r5Image from 'src/assets/images/r5-img.png'
import getInResume from 'src/assets/images/get-in-resume.png'
import ntwrkpng from 'src/assets/images/network-icon.png'
import r3Image from 'src/assets/images/r3-img.png'
import resumePng from 'src/assets/images/resume-awards.png'
import r4Image from 'src/assets/images/r4-img.png'
import r6Image from 'src/assets/images/r6-img.png'
import resumeUser from 'src/assets/images/resume-user.png'
import aei from 'src/assets/images/aei.png'
import ai from 'src/assets/images/ai.png'
import ps from 'src/assets/images/ps.png'
import diamond from 'src/assets/images/dimand.png'
import micon from 'src/assets/images/micon.png'
import html from 'src/assets/images/html.png'
import css from 'src/assets/images/css.png'
import dim from 'src/assets/images/dim.png'
import resumeScanCode from 'src/assets/images/resume-scancode.png'
import appTempone from 'src/assets/img/demos/demo-7.png'
// import WaterMark from "src/assets/images/rozgar-watermark.png"




import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';
import { purchaseResume, saveResumePaymentDetail } from '@/action/personalRecruiter';
import constant from 'constant';
import { getCookie } from 'cookies-next';
import ResumePayment from 'components/common/resumePayment';
import Modal from "react-modal";
import Loader from 'components/spinner';





export default class ResumeTemplate1 extends Component {



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
        var doc = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4",
        });

        var content = document.getElementById("resume1");
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

                <div style={{ paddingTop: '100px' }}>
                    <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => { this.onOpenModal() }}>Unlock CV Download Without Watermark</button>
                </div>

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
                        <section className="welcome_area demo2 flex align-items-center">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-12 col-lg-12 col-md-12">
                                        <div className='resume-template-one' id={'resume1'} style={{ padding: "0 0 0 20px", margin: "0px auto", border: "none" }}>
                                            <div className='top-header-resume'>
                                                <h4>Resume</h4>
                                            </div>
                                            <div className='body-resume-bx'>
                                                <div className='body-resume-right-section'>
                                                    <div className='user-name'>
                                                        <h5 style={{ textTransform: "capitalize" }}>{detail.firstName + " " + detail.secondName}</h5>
                                                        <h3 style={{ textTransform: "capitalize" }}>{detail.JobTitle}</h3>
                                                        <p style={{ textTransform: "capitalize" }}>{detail.Bio}</p>
                                                    </div>

                                                    {detail.Experience.length > 0 ?
                                                        detail.Experience && detail.Experience.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className='main-head-section'>
                                                                        <div className='topoic-head-section'>
                                                                            <div className='div-year-bx'>{item.EXPERIENCE_FROM_YEAR} - {item.CURRENT_COMPANY == "N" ? item.EXPERIENCE_TO_YEAR : 'Present'}</div>
                                                                            <div className='div-img-bx'><Image
                                                                                width={1000}
                                                                                height={1000}
                                                                                src={r1Image} alt='Image' /></div>
                                                                            <div className='div-hd-bx'>
                                                                                <h4>{item.EXPERIENCE_TITLE}</h4>

                                                                            </div>
                                                                        </div>
                                                                        <div className='topoic-about-section topoic-about-com' style={{
                                                                            alignItems: 'flex-start',
                                                                            minHeight: '40px',
                                                                            marginBottom: "10px"
                                                                        }}>
                                                                            <p className='com-exp-bx'>{item.EXPERIENCE_COMPANY}</p>
                                                                            <ul>
                                                                                <li>
                                                                                    {item.EXPERIENCE_DESCRIPTION}
                                                                                </li>
                                                                            </ul>

                                                                        </div>

                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        : ''}

                                                    {detail.PROJECT.length > 0 ?
                                                        detail.PROJECT && detail.PROJECT.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className='main-head-section'>
                                                                        <div className='topoic-head-section'>
                                                                            <div className='div-year-bx'>Project</div>
                                                                            <div className='div-img-bx'><Image
                                                                                width={1000}
                                                                                height={1000}
                                                                                src={r2Image} alt='Image' /></div>
                                                                            <div className='div-hd-bx'>
                                                                                <h4>{item.PROJECT_NAME}</h4>
                                                                            </div>
                                                                        </div>

                                                                        <div className='topoic-about-section' style={{
                                                                            alignItems: 'flex-start',
                                                                            minHeight: '40px'
                                                                        }}>
                                                                            <ul>
                                                                                <li>
                                                                                    {item.PROJECT_DESCRIPTION}
                                                                                </li>
                                                                            </ul>

                                                                        </div>

                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        : ''}


                                                    {detail.Education.length > 0 ?
                                                        detail.Education && detail.Education.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className='main-head-section mb-2 mt-2'>
                                                                        <div className='topoic-head-section'>
                                                                            <div className='div-year-bx'>{item.EDUCATION_TO_YEAR == "" ? ` ${item.EDUCATION_FROM_YEAR} - Present ` : `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}`}</div>
                                                                            <div className='div-img-bx'><Image
                                                                                height={1000}
                                                                                width={1000}
                                                                                src={r5Image} alt='Image' /></div>
                                                                            <div className='div-hd-bx'>
                                                                                <h4>{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} - <span>{item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}</span></h4>

                                                                            </div>

                                                                        </div>
                                                                        <div className='education-edit'> <p>{item.SCHOOL}</p></div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        : ''}
                                                </div>
                                                <div className='body-resume-left-section'>
                                                    <div className='resume-user-img'>
                                                        {detail && detail.PROFILE_IMAGE == null ?
                                                            <Image
                                                                className="picture" src={userImage} alt=""
                                                                width={1000}
                                                                height={1000}
                                                            /> :
                                                            detail.PROFILE_IMAGE == undefined ?
                                                                <Image
                                                                    width={1000}
                                                                    height={1000}
                                                                    className="picture" src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
                                                                :
                                                                <Image
                                                                    width={1000}
                                                                    height={1000}
                                                                    className="picture" src={detail.PROFILE_IMAGE.includes('blob') ? detail.PROFILE_IMAGE : `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
                                                        }

                                                    </div>
                                                    {detail.Skills.length > 0 ?
                                                        <div>
                                                            <div className='right-title-hd'>
                                                                <h4>Skills &amp; Tools</h4>
                                                            </div>
                                                            <div className='i-love-filed-bx'>
                                                                <ul className='love-filed-list-bx'>
                                                                    {
                                                                        detail.Skills && detail.Skills.map((item) => {
                                                                            return (
                                                                                <>
                                                                                    <li style={{ textTransform: "capitalize" }}>{item.SKILL_NAME}</li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }

                                                                </ul>
                                                            </div></div> : ''}
                                                    {detail.Interest.length > 0 ?
                                                        <div>
                                                            <div className='right-title-hd'>
                                                                <h4>I Love</h4>
                                                            </div>
                                                            <div className='i-love-filed-bx'>
                                                                <ul className='love-filed-list-bx'>
                                                                    {
                                                                        detail.Interest && detail.Interest.map((item) => {
                                                                            return (
                                                                                <>
                                                                                    <li style={{ textTransform: "capitalize" }}>{item.INTRESTS_NAME}</li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }

                                                                </ul>

                                                            </div></div> : ''}
                                                    <div className='right-title-hd'>
                                                        <h4>Get in Touch</h4>
                                                    </div>
                                                    <div className='get-in-resume-bx'>
                                                        <div className='get-resume-img-bx'>
                                                            <Image
                                                                height={1000}
                                                                width={1000}
                                                                src={getInResume} alt='Image' />
                                                        </div>
                                                        <div className='get-resume-text-bx'>
                                                            <p className='email-bx'>{detail.EmailId}</p>
                                                            <p className='email-bx'>{detail.MobileNo}</p>
                                                        </div>

                                                    </div>
                                                    {detail.SocialProfile.length > 0 ?
                                                        <div className='social-icons-box'>
                                                            <div className='social-left-bx' style={{ width: "100%" }}>
                                                                <ul className='social-list-box'>
                                                                    {
                                                                        detail.SocialProfile && detail.SocialProfile.map((item) => {
                                                                            if (item.SOCIAL_NAME == "L") {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{

                                                                                        lineHeight: '18px'
                                                                                    }}>
                                                                                            <Image
                                                                                                height={20}
                                                                                                width={20}
                                                                                                src={linkedIcon} alt=""
                                                                                                style={{
                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            } else if (item.SOCIAL_NAME == "T") {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{

                                                                                        lineHeight: '18px'
                                                                                    }}><Image
                                                                                                width={20}
                                                                                                height={20}
                                                                                                src={twitterIcon} alt="" style={{
                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            } else if (item.SOCIAL_NAME == "I") {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{

                                                                                        lineHeight: '18px'
                                                                                    }}><Image
                                                                                                width={20}
                                                                                                height={20}
                                                                                                src={instagramIcon} alt="" style={{
                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            } else if (item.SOCIAL_NAME == "G") {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{

                                                                                        lineHeight: '18px'
                                                                                    }}><Image
                                                                                                width={20}
                                                                                                height={20}
                                                                                                src={gitIcon} alt="" style={{
                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            }
                                                                            else if (item.SOCIAL_NAME == "F") {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{
                                                                                        lineHeight: '18px'
                                                                                    }}><Image
                                                                                                width={21}
                                                                                                height={21}
                                                                                                src={facebookIcon} alt="" style={{

                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            }
                                                                            else {
                                                                                return (
                                                                                    <li style={{
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        alignContent: 'space-around',
                                                                                        lineHeight: '21px',
                                                                                        justifyContent: 'flex-start',
                                                                                    }}><span style={{
                                                                                        lineHeight: '18px'
                                                                                    }}><Image
                                                                                                width={20}
                                                                                                height={20}
                                                                                                src={globeIcon} alt="" style={{

                                                                                                    padding: '2px',
                                                                                                    maxWidth: '30px',

                                                                                                }} /></span> <small style={{
                                                                                                    fontSize: '100%',
                                                                                                    marginLeft: '10px'
                                                                                                }}>{item.SOCIAL_LINK}</small></li>
                                                                                )

                                                                            }
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div> : ''}

                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
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
