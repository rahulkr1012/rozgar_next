import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { Component } from 'react'
import EmailIcon from 'src/assets/img/test-img/email.png'
import mobileIcon from 'src/assets/img/test-img/mobile-black01.png'
import locationIcon from 'src/assets/img/test-img/location.png'
import moment from 'moment';
import Image from 'next/image';
import appTempone from 'src/assets/img/demos/demo-4.png'



import { ToastContainer, toast } from 'react-toastify';
import success from './../../public/icons/success.gif'
import 'react-toastify/dist/ReactToastify.css';




// import '../../assets/css/rmaking/orbit-1.css'

export default class ResumeTemplate2 extends Component {

    constructor(props) {
        super(props);
  
       }

    printPDF2 = () => {


		 const detail = this.props.candidateLists
         let cd_name= detail.firstName+" "+detail.secondName
 


        window.html2canvas = html2canvas;
        let doc = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4",
        });

        let content = document.getElementById("resume2");
        const width = doc.internal.pageSize.getWidth();


            
            const resolveAfter3Sec = new Promise(resolve => {
                resolve( doc.html(content, {
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

    componentDidMount() {
        // document.title = constant.title.resumeTemplate2
    }


    render() {
         
        const detail = this.props.candidateLists

        return (
            <React.Fragment>
                <div style={{ paddingTop: "100px" }}>
                    <button style={{ display: "block", margin: "10px auto", padding: "12px", borderRadius: "5px", color: "#fff", backgroundColor: "red", fontSize: "14px", fontWeight: "500" }} onClick={() => { this.printPDF2() }}>Download Resume</button>
                </div>
                {!this.props.mobileView && <section className="welcome_area demo2 flex align-items-center"
                    id={'resume2'}>
                    <div className="container">
                        <div className="row ">
                            <div className="col-12 col-lg-12 col-md-12">
                                <div className='resume-with-box' style={{ marginTop: "10px" }}>
                                     <div className='candidate-info-bx'>
                                            <div className='candidate-img-info' style={{ width: "93px" }}>
                                            
                                               {detail && detail.PROFILE_IMAGE == null ?
												     <Image 
                                                className="picture" src={userImage} alt="" 
                                                 width={1000}
                                                 height={1000}
                                                /> :
												detail.PROFILE_IMAGE==undefined?
												<Image 
                                                width={1000}
                                                height={1000}
                                                className="picture" src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
											 :
											 <Image 
											 width={115}
											 height={115}
											 className="picture" src={detail.PROFILE_IMAGE.includes('blob')?detail.PROFILE_IMAGE:`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${this.props.cd_id}/${detail.PROFILE_IMAGE}`} alt="" />
											}
                                            </div>
                                            <div className='candidate-name-info'>
                                                <h4 style={{ textTransform: 'capitalize' }}>{detail.firstName+" "+detail.secondName}</h4>
                                                <h5>{detail.JobTitle} </h5>
                                                {/* <p>Protfolio: <a href="">be.net/atishaygoyal</a></p> */}

                                            </div>

                                        </div>
                                    <div className='resume-second-bootam'>    
                                    <div className='resume-right-temp-two-bx'>
                                        
                                        <div className='about-profile-bx'>

                                            <h4>Me, at a glance</h4>
                                            <ul>
                                                <li> {detail.Bio}</li>
                                            </ul>
                                             
                                        </div>
                                         
                                       





                                        <div className='about-profile-bx'>
                                            <h4>Work Experiences</h4>

                                            {
                                                detail.Experience ? detail.Experience.map((item) => {
                                                    return (
                                                        <>
                                                            <div className='employment-history-box emp-history-border'>
                                                              <h6>{item.EXPERIENCE_COMPANY}</h6>
                                                                <h5>{item.EXPERIENCE_TITLE} <span className='duration-work-bx'>{moment(item.EXPERIENCE_FROM_MONTH).format('MMM')} {item.EXPERIENCE_FROM_YEAR} - {item.CURRENT_COMPANY == "N" ? `${moment(item.EXPERIENCE_FROM_MONTH).format('MMM')} ${item.EXPERIENCE_TO_YEAR}` : 'Present'}</span></h5>
                                                                
                                                                <ul>
                                                                    <li>{item.EXPERIENCE_DESCRIPTION}</li>
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )
                                                }) : "" }
                                            

                                        </div> 



                                        <div className='about-profile-bx'>
                                            <h4>Projects </h4>
                                        
                                        { detail.PROJECT &&  detail.PROJECT.length>0?
                                             detail.PROJECT.map((item) => {
                                                    return (
                                                        <>
                                                            <div className='employment-history-box emp-history-border'>
                                                             
                                                                <h6>{item.PROJECT_NAME}</h6>
                                                                <ul>
                                                                    <li>{item.PROJECT_DESCRIPTION}</li>
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                    :''}
                                                     
                                                    </div>








                                    </div>
                                    <div className='right-section-resume-two'>
                                        <div className='right-contact-bx'>
                                            <ul>
                                                <li style={{ wordBreak: "break-all", lineHeight: "23px" }}><Image
                                                    height={20}
                                                    width={20}
                                                    src={EmailIcon} alt="" /> {detail.EmailId}</li>
                                                <li style={{ wordBreak: "break-all", lineHeight: "23px" }}><Image
                                                    height={20}
                                                    width={20}
                                                    src={locationIcon} alt="" /> {detail.PermanentAddress}</li>
                                                <li style={{ wordBreak: "break-all", lineHeight: "23px" }}><Image
                                                    height={20}
                                                    width={20}
                                                    src={mobileIcon} alt="" /> {detail.MobileNo}  </li>
                                            </ul>

                                        </div>
                                        {detail.Skills.length>0?
                                        <div className='about-profile-bx'>
                                            <h4>Set Skills</h4>
                                            
                                            {
                                                detail.Skills && detail.Skills.map((item) => {
                                                    if (item.SKILL_LEVEL == 'Beginner') {
                                                        return (
                                                            <div className='skills-history-box'>
                                                                <div className='progress-bar-box'>
                                                                    <h5>{item.SKILL_NAME}</h5>
                                                                    <div class="progress level-bar">
                                                                        <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '35%', background: '#210f7e' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    else if (item.SKILL_LEVEL == 'Intermidiate') {
                                                        return (
                                                            <div className='skills-history-box'>
                                                                <div className='progress-bar-box'>
                                                                    <h5>{item.SKILL_NAME}</h5>
                                                                    <div class="progress level-bar">
                                                                        <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '75%', background: '#210f7e' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    else if (item.SKILL_LEVEL == 'Proficient') {
                                                        return (
                                                            <div className='skills-history-box'>
                                                                <div className='progress-bar-box'>
                                                                    <h5>{item.SKILL_NAME}</h5>
                                                                    <div class="progress level-bar">
                                                                        <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '99%', background: '#210f7e' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    }else{
                                                        return (
                                                            <div className='skills-history-box'>
                                                                <div className='progress-bar-box'>
                                                                    <h5>{item.SKILL_NAME}</h5>
                                                                    <div class="progress level-bar">
                                                                        <div class="progress-bar theme-progress-bar" role="progressbar" style={{ width: '99%', background: '#210f7e' }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    }
                                                })
                                            }


                                        </div>:''}
                                        { detail.Interest.length>0?
                                        <div className='about-profile-bx hobbies-profile'>
                                            <h4>Hobbies</h4>
                                            <ul>
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

                                            {/* <div className='imas-history-box'>

                                                <div className='one'>Visual <br />Designer</div>
                                                <div className='two'>Information Architect</div>
                                                <div className='three'>Business Analyst</div>
                                                <div className='four'>Interaction designer</div>

                                            </div> */}


                                        </div>:""}
                                        { detail.Education.length>0?
                                        <div className='about-profile-bx'>
                                            <h4>Education</h4>
                                            {
                                                detail.Education && detail.Education.map((item) => {
                                                   
                                                    return (
                                                        <>
                                                            <div className='employment-history-box'>
                                                                <h5>{item.DEGREE.DEGREE_VALUE}</h5>
                                                                <h5>{item.FIELD_OF_STUDY.FIELD_OF_STUDY_VALUE} in {item.COURSE_SPECIALIZATION.COURSE_SPECIALIZATION_VALUE} </h5>
                                                                <h6>{item.SCHOOL  }</h6>
                                                                <h6>{ item.EDUCATION_TO_YEAR == "" ?` ${item.EDUCATION_FROM_YEAR} - Present `: `${item.EDUCATION_FROM_YEAR} - ${item.EDUCATION_TO_YEAR}` }</h6>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }


                                        </div>:''}
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>}


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

            </React.Fragment>
        )
    }
}
