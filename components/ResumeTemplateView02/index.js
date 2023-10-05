import jsPDF from 'jspdf';
import React, { Component } from 'react'
import userImage from 'src/assets/img/test-img/1.jpg'
import html2canvas from 'html2canvas';
import Image from 'next/image';
import appTempone from 'src/assets/img/demos/demo-6.png'
import checkIcin from 'src/assets/images/check-icon.png'


import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';
import { purchaseResume, saveResumePaymentDetail } from '@/action/personalRecruiter';
import { getCookie } from 'cookies-next';
import constant from 'constant';
// import WaterMark from "src/assets/images/rozgar-watermark.png"
import ResumePayment from 'components/common/resumePayment';
import Modal from "react-modal";
import Loader from 'components/spinner';

export default class ResumeTemplateView02 extends Component {

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
                margin: [10, 0, -10, 0],
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
        debugger
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

                <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => { this.onOpenModal() }}>Unlock CV Download Without Watermark</button>

                <div>


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
                            <div className="resume-wrapper-inner1 mx-auto text-start bg-white"
                                ref={el => (this.componentRef = el)}
                                id={'resume1'}
                            >
                                <main id="rg-main" className="rg-main rg-haslayout">
                                    <div className="rg-haslayout rg-sectionspace">
                                        <div className="container">
                                            <div className="row">
                                                <div className='col-md-12'>
                                                    <div className='resume-sample2-box'>
                                                        <div className='d-flex resume-header-box bor-b'>
                                                            <div className='d-flex top-section-resume'>
                                                                {
                                                                    <div className='resume-sample2-img'>


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
                                                                }
                                                                <div className='resume-sample2-name-details'>
                                                                    <h3>{detail.firstName + " " + detail.secondName}</h3>
                                                                    <p>Phone: {detail.MobileNo}</p>
                                                                    <p>Email : {detail.EmailId}</p>
                                                                    {/* <p>Website : <span className='resume-web'>www.sitarashah.com</span></p> */}

                                                                    {detail.Education && detail.Education.map((item, index) => {

                                                                        return (
                                                                            <p>Education : {item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE} from {item.SCHOOL} ({item.EDUCATION_TO_YEAR == "" ? ` ${item.EDUCATION_FROM_YEAR} - Present ` : `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}`})</p>
                                                                        )
                                                                    })
                                                                    }                                        </div>
                                                            </div>

                                                        </div>

                                                        <div className='row'>
                                                            {detail.Bio.length > 0 ?
                                                                <div className='objective-content-one ml-auto col-md-12'>
                                                                    <h3>OBJECTIVE</h3>
                                                                    <p>{detail.Bio}</p>
                                                                </div> : ''}
                                                        </div>
                                                        {detail.PROJECT.length > 0 ?
                                                            <div className='row'>

                                                                <div className='col-md-12 rsume02-project-hd'>PROJECTS</div>
                                                                {
                                                                    detail.PROJECT && detail.PROJECT.map((item, index) => {
                                                                        return (
                                                                            <div className='col-md-6'>

                                                                                <div className='project-oned'>
                                                                                    <h4>{item.PROJECT_NAME} </h4>
                                                                                    <p>{item.PROJECT_DESCRIPTION}</p>
                                                                                </div>

                                                                                {/* <div className='project-oned'>
                                            <h4>Exploration of Mumbai Heritage | <span>Informative portal</span></h4>
                                            <p>Designing a flow for users to understand and learn different architectural styles found in Mumbai.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>Hola Chef’s Blue Print | <span>Service design</span></h4>
                                            <p>Studying and creating the blue print of their current service (food ordering and selling platform). Also creating a revised and improved blue print after understanding the pain points.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>Binee | <span>Augmented Reality App</span></h4>
                                            <p>A concept app to promote clean India, which locates dustbins with phone cameras using AR.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>HDFC Red | <span>Real estate</span></h4>
                                            <p>Information architecture and interface design of the mobile site for users to buy properties.</p>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='project-oned'>
                                            <h4>Sounds of Indian streets | <span>Sound design</span></h4>
                                            <p>Documentation of various sounds of Crawford market and designing an audio clip to bring out the true essence of the place.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>Data visualisation | <span>3D Visualisation</span></h4>
                                            <p>3D Visualisation to find out interesting insights about the educational background of students who get admission in IDC’s Masters Programme and identifying interesting patterns.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>#Loyalty | <span>Loyalty program</span></h4>
                                            <p>Loyalty program designed for multiple platforms for customers and merchants (admin) to offer rewards at different business outlets.</p>
                                        </div>
                                        <div className='project-oned'>
                                            <h4>Glyph Diaries | <span>Devanagari glyph resource</span></h4>
                                            <p>An online portal designed to showcase various visual forms found in the Devanagari script. This collection has been in the form of physical diaries with documented visual form and the context of use.</p>
                                        </div> */}
                                                                            </div>

                                                                        )
                                                                    })
                                                                }
                                                            </div> : ''}

                                                        <div className='row'>
                                                            {detail.Experience.length > 0 ?
                                                                <div className='col-md-8'>
                                                                    <div className=' rsume02-project-hd'>WORK EXPERIENCE</div>
                                                                    {detail.Experience && detail.Experience.map((item, index) => {
                                                                        return (

                                                                            <div className='project-oned'>
                                                                                <h4>{item.EXPERIENCE_COMPANY}</h4>
                                                                                {/* <p className='mb-0 text-italic'>Internship under Prof. Sudhir Bhatia | May-June 2015</p> */}
                                                                                <p>{item.EXPERIENCE_DESCRIPTION}</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    }
                                                                    {/* <div className='project-oned'>
                                                    <h4>Genii technologies</h4>
                                                    <p className='mb-0 text-italic'>User Experience Designer | August 2012 - July 2014</p>
                                                    <p>Conceptualising, making user journey, information architecture, creating high fidelity wire-frames, Interface designs for mobile and desktop.</p>
                                                </div>
                                                <div className='project-oned'>
                                                    <h4>UTV Production</h4>
                                                    <p className='mb-0 text-italic'>Assistant Producer and Graphic Designer | April - July 2012</p>
                                                    <p>Ideation and story building for upcoming shows, Designing campaigns and sets for reality shows.</p>
                                                </div>
                                                <div className='project-oned'>
                                                    <h4>Argus Communication</h4>
                                                    <p className='mb-0 text-italic'>Visualiser | September - October 2011</p>
                                                    <p>Branding and advertising for various products, Graphics and illustrations for entertainment parks and tourism.</p>
                                                </div>
                                                <div className='project-oned'>
                                                    <h4>Hindustan Times</h4>
                                                    <p className='mb-0 text-italic'>Internship - Graphic Designer | March - May 2011</p>
                                                    <p>Everyday graphics, icons and illustration for news articles.</p>
                                                </div> */}
                                                                </div> : ''}
                                                            <div className='col-md-4'>
                                                                {detail.Interest.length > 0 ?
                                                                    <div className='project-twod'>
                                                                        <div className=' rsume02-project-hd pb-3 '>INTEREST</div>
                                                                        {detail.Interest && detail.Interest.map((item, index) => {
                                                                            return (


                                                                                <ul className='exp-resume-two'>
                                                                                    <li><Image src={checkIcin} /> {item.INTRESTS_NAME}</li>
                                                                                </ul>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div> : ''}
                                                                {detail.Skills.length > 0 ?
                                                                    <div className='project-twod pt-4'>
                                                                        <div className=' rsume02-project-hd pb-3 '>SKILLS</div>
                                                                        {detail.Skills && detail.Skills.map((item) => {
                                                                            return (
                                                                                <ul className='exp-resume-two'>
                                                                                    <li><Image src={checkIcin} /> {item.SKILL_NAME}</li>
                                                                                </ul>
                                                                            )
                                                                        })
                                                                        }

                                                                    </div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
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


            </React.Fragment>
        )
    }
}




