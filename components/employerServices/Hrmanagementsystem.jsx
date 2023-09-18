import React, { Component } from 'react'
import SendEnquiry from '../Enquiry/SendEnquiry'
import SimpleHRWork from '../../src/assets/images/hr1.png'
import EmployeeCentricWorkplace from '../../src/assets/images/hr2.png'
import BusinessTransformationHRTech from '../../src/assets/images/tm (1).png'
import HRMSContentImg from '../../src/assets/images/hrms-content-img.jpg'
import faqs2 from '../../src/assets/images/faqs2.jpg'
import Image from 'next/image'

export default class Hrmanagementsystem extends Component {

    render() {
        return (
            <React.Fragment>
                <div id='rg-innerbannervtwo' className='rg-enquiryrvtworep rg-hed-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8">
                                <div className='page-header-section'>
                                    <div className='page-header-content'>
                                        <h1>HRMS</h1>
                                        <p>Best HR Services for Exceptional Employee Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SendEnquiry />
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-share-your-interview  rg-haslayout pt-0">
                        <section className='secrtion-bg-gray pddding-top-btm'>
                            <div className='container'>
                                <div className='row mt-5 is-active' id='slide01'>
                                    <div className='col-md-12 col-sm-4  mb-5'>
                                        <div className='content-page-box text-center'>
                                            <div className='main-head-box text-center'>
                                                <h2>HRMS</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <p>MTC's <b>cloud-based human resource management system</b> ensures agile and effective HR management. Simplify all the HR functions, retain talented employees, nurture employees, make quick adaptation to changes, enhance employee experience, build a performance-oriented workforce, etc., without any hassles or stress with our HRMS.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="rozgar-distinguishing-expertise">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">

                                        <div className='usp-top-box'>
                                            <div className='main-head-box'>
                                                <h2>Our Distinguishing Expertise</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <div className='usp-main-item'>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={SimpleHRWork} /></div>
                                                    <h4>Simplified HR Work</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar'></span>
                                                    </div>

                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={EmployeeCentricWorkplace} /></div>
                                                    <h4>Focus on Employee-Centric Workplace</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-1-0s'></span>
                                                    </div>

                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={BusinessTransformationHRTech} /></div>
                                                    <h4>Empower Business Transformation with HR Tech</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-2-0s'></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className='secrtion-bg-gray pddding-top-btm'>
                            <div className='container'>
                                <div className='row mt-5 is-active' id='slide01'>
                                    <div className='col-md-5 col-sm-4 mb-5'>
                                        <div className='one-side-image-bx'>
                                            <Image src={HRMSContentImg} className='img-fluid' />
                                        </div>
                                    </div>
                                    <div className='col-md-7 col-sm-4  mb-5'>
                                        <div className='content-page-box hrms-content-bx'>
                                            <div className='main-head-box'>
                                                <h2>Our Offered Services</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <p>Enjoy the seamless automation of the HR processes and functions with the award-winning <b>top human resources management system-</b> Rozgar HRMS. Our HRMS focuses on empowering the organization's relationship with the candidates. It also plays an important role in efficiently managing the employee lifecycle within the organization.</p>

                                            <h5>1. Lead Operations</h5>
                                            <p>HRMS aims at improving the hiring experience for both interviewers and candidates. The main focused area – Applicant Tracking System (ATS), Employee On-Boarding, Vendor Management System, and Referral Processing</p>
                                            <h5>2. HR Operations</h5>
                                            <p>Our <b>HR management system software</b> ensures effective management of employee performance. It includes all the tools required to enhance the employee experience with seamless functioning, such as – Leave &amp; Attendance, Asset Allocation, Help Desk, Business Communication, and Exit Workflow.</p>
                                            <h5>3. Productivity and Growth</h5>
                                            <p>Tracking the employee's performance becomes easy with our <b>HRMS software</b>. It supports GeoTag and Geo-Fence, managing the efficiency of your employees whether in the office or on the move.</p>
                                            <p>Enjoy several functionalities like – Task Allocation, Real-Time Tracking, Enterprise Groups, Voice &amp; Video Calling, Performance Management, and Analytics &amp; Insights.</p>
                                            <h5>4. Payroll &amp; Compensation</h5>
                                            <p>Our <b>cloud-based human resources management system software</b> is well-known for its flexibility and ability to handle any salary structure. It maintains 100% accuracy and seamless integration with the leave management system and attendance management system to ease HR's job and satisfy the employees.</p>
                                            <p>The offered functions include – Payroll, Compliances, Expense and Reimbursement, Loans and Advances, and Insurance.</p>
                                            <h5>5. Mobile ESS</h5>
                                            <p>Using the HRMS system with an inbuilt ESS option advances the employee's day-to-day experience with better employee retention and satisfaction. It includes the following functions – Analytics, Downloading &amp; Enabling, and Self-Service Menu.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='cmt-row about-section clearfix'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h2 className='title'>Benefits and Needs of HRMS</h2>
                                            </div>
                                            <div className='feature-line'>
                                                <span className='animate-bar'></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb_15'>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-one'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Centralized And Secure Data Management</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>The human resource management system offers a centralized and secured management of all the essential employee data to enhance the employee experience and organizational workflow.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-two'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Strategic And Systemic HR Process Execution</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>MTC's well-designed HRMS easily configure various policies with existing templates to ensure seamless functioning. Also, it is quite convenient to automate the required processes for maximum efficiency.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-three'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Employees Self-Service</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Thanks to the automation of several HR processes, employees can make the best benefits from self-services without any dependencies on the HRs for salary slips, attendance management, etc.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-four'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Detailed And Transparent Employee Analytics</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Trust the human resource management system software to keep detailed and transparent tracking and insights of the employee's performance. Take a sneak peek into workforce costs, employee retention rate, etc.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-five'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Mobile-Oriented</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Our HR software is evolved as mobile-first HRMS to offer handy employee self-service, fully functional HR solutions, and effective HR practices for the managers with ease of access.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-six'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Employee Information System</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>All the essential employee data can be recorded and maintained at a single place for easy access, resulting in fewer human errors.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='cmt-row about-section clearfix secrtion-bg-gray'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h2 className='title'>Why Choose MTC for Recruitment Management System</h2>
                                            </div>
                                            <div className='feature-line'>
                                                <span className='animate-bar'></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb_15'>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Cost-Efficiency And Fast Turnaround Time</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We ensure that we provide a consistent, relevant, and the best human resource management system for 85% cost-effectiveness and 75% faster turnaround time. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3><a href=''>100% Guaranteed Satisfaction And Accuracy</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Unless and until you are satisfied, we won't stop. We take all consistent efforts to ensure maximum accuracy and satisfaction.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Our Team Of Experts</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We have the best professional team of experts offering the best solutions from the integrated human resource management system with their industry-oriented experience and dedicated efforts.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3><a href=''>24*7 Support And Assistance</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Expect nothing other than 24*7 support and assistance from our experts. We make sure our human resources management system software is always available for you!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3><a href=''>Client-Focused Approach</a></h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Have specific HRMS needs? Don't worry; trust our client-focused approach!

                                                        We guarantee reliable results to let you count on our cloud-based HRMS services again and again.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='pddding-top-btm'>
                            <div className='container'>
                                <div className='row mt-5 ' id='slide01'>
                                    <div className='col-md-6 col-sm-4 mb-5'>
                                        <div className='one-side-image-bx'>
                                            <Image src={faqs2} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-sm-6  mb-5'>
                                        <div className='content-page-box'>
                                            <div className='main-head-box'>
                                                <h2>FAQs</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <div className='faqscontent'>
                                                <div>
                                                    <input type='checkbox' id='question1' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question1' className='question'>
                                                        What do you mean by human resources?
                                                    </label>
                                                    <div class="answers">
                                                        <p>HR is the business division concerning the finding, sourcing, recruiting, retaining, on-boarding, and training the employees. Thanks to the technical advancements, the <b>HR software system</b> ensures the automation of all these HR processes and functionalities without any hassles.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question2' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question2' className='question'>

                                                        What are the functions of HRMS?
                                                    </label>
                                                    <div class="answers">
                                                        <p>HRMS is designed to offer extended support for the <b>HR system</b> functions like payroll management, recruitment, employee data management, employee performance management, employee training, administration benefits, competency management, etc.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question3' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question3' className='question'>


                                                        What does HRMS mean?
                                                    </label>
                                                    <div class="answers">
                                                        <p>HRMS is popularly known as Human Resource Management System, and it is <b>human resource system</b> software used by many organizations to efficiently manage their internal HR functions and processes without any errors and hassles.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question4' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question4' className='question'>

                                                        What is the difference between HRMS and HRIS?
                                                    </label>
                                                    <div class="answers">
                                                        <p>HRMS and HRIS are popular as the <b>best human resource management system software</b> names. However, HRIS is more basic, focusing only on the essential details; on the other hand, HRMS focuses on detailed and complex tools and features.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question5' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question5' className='question'>

                                                        Why do organizations need a human resource management system?
                                                    </label>
                                                    <div class="answers">
                                                        <p>The <b>human resources management platforms</b> are important for every organization to seamlessly manage internal HR functions, improve recruitment quality, enhance workplace culture, retain deserving talented candidates, maintain healthy workplace culture, etc.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type='checkbox' id='question6' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question6' className='question'>

                                                        What is staffing?
                                                    </label>
                                                    <div class="answers">
                                                        <p>Staffing is the process of recruiting the right candidate with the desired right skills, qualifications, and experience for a specific job role and position. It evaluates their knowledge before offering them the role.</p>
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
