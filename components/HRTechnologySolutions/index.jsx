import React, { Component } from 'react'
import SendEnquiry from "components/Enquiry/SendEnquiry"
import faqs2 from 'src/assets/images/faqs2.jpg'
import hrmspic from 'src/assets/images/hrmspic01.jpg'
import lmspic from 'src/assets/images/lmspic01.jpg'
import rmspic from 'src/assets/images/rmspic.jpg'
import mspic from 'src/assets/images/mspic.jpg'
import Image from 'next/image'
// import OfferedYou5 from 'src/assets/images/offered-you5.jpg'
export default class HrTechnologySolutions extends Component {
  render() {
    return (
        <React.Fragment>
        <div id='rg-innerbannervtwo' className='rg-enquiryrvtworep rg-hed-section'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className='page-header-section'>
                            <div className='page-header-content'>
                                <h1>HR Technology Solutions</h1>
                                <p>Millions of job seekers trust Rozgar.com to find their ideal job.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SendEnquiry />
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
            <div className="rg-share-your-interview  rg-haslayout pt-0">
                <div className="rozgar-distinguishing-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className='usp-top-box'>
                                    <div className='main-head-box'>
                                        <h3>HR Technology Solutions</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16'>Rozgar.com delivers various forms of HR Tech Solutions to enhance business growth and productivity. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-4">
                                <Image className='img-radius20' src={hrmspic}/>
                            </div>
                            <div className="col-12 col-sm-8 col-md-8">
                                <div className='usp-top-box'>
                                    <div className='main-head-box text-left'>
                                        <h3>HRMS</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16 lheight24'>A cloud-based human resource management system by Rozgar is the best HR management software that simplifies and streamlines all HR-related operations. Through HRMS, you can do employee retention, employee nurturing, adaptation to changes, enhance employee experience, develop a performance-oriented workforce and more.<br/>HRMS makes all HR functioning easier and hassle-free.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-7 col-md-7">
                                <div className='usp-top-box'>
                                    <div className='main-head-box text-right'>
                                        <h3>Learning Management System</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16 lheight24'>Also known as LMS, Learning Management System is a premium web-based e-learning and management solution. Its job is to effectively handle all the institution's training requirements, making us the best learning management system provider. One can cater to all their online learning needs, be it for individuals or corporate, through our learning management system. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-5 col-md-5">
                                <Image className='img-radius20' src={lmspic}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-4">
                                <Image className='img-radius20' src={rmspic}/>
                            </div>
                            <div className="col-12 col-sm-8 col-md-8">
                                <div className='usp-top-box'>
                                    <div className='main-head-box text-left'>
                                        <h3>Recruitment Management System</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16 lheight24'>Our recruitment management system is a set of various smart integrations and features to automate the hiring process and accelerate and intensify the recruitment process. Our RMS is a reliable tool that enables you to publish different types of job postings, candidate management, sourcing channel search, schedule interviews, and so much more.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-8 col-md-8">
                                <div className='usp-top-box'>
                                    <div className='main-head-box text-right'>
                                        <h3>Managed Services</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16 lheight24'>A tool to enhance your business brandwidth and grow your brand value, with 14 years of experience, our team at Rozgar.com has evolved as one of the largest enterprise service management names with its evolved and managed services. Via our managed services you can enjoy benefits like updating, migrating, and customising business applications on-premises, virtual or hybrid models.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4 col-md-4">
                                <Image className='img-radius20' src={mspic}/>
                            </div>
                        </div>
                    </div>
                </div>                
                
                <section className='pddding-top-btm'>
                    <div className='container'>
                        <div className='row mt-5 ' id='slide01'>
                            <div className='col-md-5 col-sm-4 mb-5'>
                                <div className='one-side-image-bx'>
                                    <Image src={faqs2} style={{maxWidth:'350px'}} />
                                </div>
                            </div>
                            <div className='col-md-7 col-sm-6  mb-5'>
                                <div className='content-page-box'>
                                    <div className='main-head-box'>
                                        <h3>FAQs</h3>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                    </div>
                                    <div className='faqscontent'>
                                        <div>
                                            <input type='checkbox' id='question1' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question1' className='question'>
                                            What are HR Tech Solutions?
                                            </label>
                                            <div className='answers'>
                                                <p>HR Tech Solutions are services that help enhance, simplify and streamline all of the functions related to human resources.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question2' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question2' className='question'>
                                            What services makeup HR Tech Solutions?
                                            </label>
                                            <div class="answers">
                                                <p>Services like HRMS, LMS, RMS, Small Companies HR, Managed Services, and so much more make HR Tech Solutions. 
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question3' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question3' className='question'>
                                            Which company provides the best HR services?
                                            </label>
                                            <div class="answers">
                                                <p>There are so many companies that present some of the prominent HR services, however, Rozgar.com provide an integration of all smart HR Tech services that enable a company to grow. </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </React.Fragment>
    )
  }
}
