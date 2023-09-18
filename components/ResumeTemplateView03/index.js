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


export default class ResumeTemplateView03 extends Component {
     


     printPDF2 = () => {

        const detail = this.props.candidateLists
		let cd_name= detail.firstName+" "+detail.secondName


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
                    margin:[ 10, 0 , 10, 0],
                    html2canvas: {  },
                }))            
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
                      
         }


     render() {
        const detail = this.props.candidateLists
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => { this.printPDF2() }}>Download Resume</button>

                    {!this.props.mobileView && <div className="rg-haslayout rg-sectionspace" id={'resume3'}>
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
												detail.PROFILE_IMAGE==undefined?
												<Image 
                                                width={1000}
                                                height={1000}
                                                className="picture picture-resume-02" src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
											 :
											 <Image 
											 width={1000}
											 height={1000}
											 className="picture picture-resume-02" src={detail.PROFILE_IMAGE.includes('blob')?detail.PROFILE_IMAGE:`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
											}


                                                
                                                <h3 className='text-white cand-name' style={{ textTransform: "capitalize" }}>{detail.firstName+" "+detail.secondName}</h3>
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
                                                    <div className='address-cv-text' style={{wordBreak:"break-all",lineHeight:"20px"}}>
                                                        <span style={{ fontWeight: "600" }}>Email Id:</span> {detail.EmailId}
                                                    </div>
                                                </div>
                                                { detail.Skills.length>0?
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
                                                            else{
                                                                  return (
                                                                    <div className='skill-progress'>
                                                                        <div className='proress-bar' style={{ width: '99%', background: '#fff' }}></div>
                                                                        <div className='progress-text'>{item.SKILL_NAME}</div>
                                                                    </div>
                                                                )
                                                                 
                                                            }


                                                        })
                                                    }
                                                </div>:''}
                                                { detail.SocialProfile.length>0?
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

                                                </div>:''}
                                            </div>
                                        </div>
                                        <div className='cv-right-details'>
                                            {detail.Bio.length>0?
                                            <div className='pro-details-cv'>
                                                <h2>Profile</h2>
                                                <p>{detail.Bio}</p>
                                            </div>:''}
                                            { detail.Experience.length>0?
                                            <div className='project-cv-details'>
                                                <h2>Employment History</h2>

                                                
                                                {
                                                    detail.Experience && detail.Experience.map( (item)=> {
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
                                                 
                                            </div>:''}
                                             
                                            { detail.Education.length>0?
                                             
                                             <div className='project-cv-details'>
                                                <h2>Education</h2>
                                                {
                                                    detail.Education && detail.Education.map((item) => {
                                                        return <>
                                                            <div className='project-cv-onebyone'>
                                                                <div className='project-cv-name'>{item.DEGREE.DEGREE_VALUE}, {item.SCHOOL}</div>
                                                                <div className='project-start-end'>{ item.EDUCATION_TO_YEAR == "" ?` ${item.EDUCATION_FROM_YEAR} - Present `: `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}` }</div>
                                                                <ul className='project-line-manage'>
                                                                    <li>{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE}</li>
                                                                </ul>
                                                            </div>
                                                        </>
                                                    })
                                                }
                                            </div>:''}





                                            { detail.PROJECT.length>0?
                                             
                                             <div className='project-cv-details'>
                                                <h2>Projects </h2>
                                                {
                                                    detail.PROJECT && detail.PROJECT.map((item) => {
                                                        return <>
                                                            <div className='project-cv-onebyone'>
                                                                <div className='project-start-end'>{ item.PROJECT_NAME }</div>
                                                                <p className='project-line-manage'>
                                                                     {item.PROJECT_DESCRIPTION}
                                                                </p>
                                                            </div>
                                                        </>
                                                    })
                                                }
                                            </div>:''}





                                            {detail.Interest.length>0?
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
                                            </div>:''}

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
                    </div>}

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
