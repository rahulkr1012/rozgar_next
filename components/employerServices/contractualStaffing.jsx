import React, { Component } from 'react'
import SendEnquiry from '../Enquiry/SendEnquiry'
import SC2 from '../../src/assets/images/SC2.png'
import EA2 from '../../src/assets/images/EA2.png'
import tm from '../../src/assets/images/tm.png'
import staffAugmentation2 from '../../src/assets/images/staff-augmentation2.jpg'
import faqs2 from '../../src/assets/images/faqs2.jpg'
import Image from 'next/image'

export default class ContractualStaffing extends Component {
    render() {
        return (

            <React.Fragment>
                <div id='rg-innerbannervtwo' className='contract-staffing-banner rg-hed-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8">
                                <div className='page-header-section'>
                                    <div className='page-header-content'>
                                        <h1>Contract Staffing's</h1>
                                        <p>World-Class Talent For Your Excellent Workforce</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SendEnquiry/>


                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-share-your-interview  rg-haslayout pt-0">
                        <div className="rozgar-distinguishing-expertise">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">

                                        <div className='usp-top-box'>
                                            <div className='main-head-box'>
                                                <h2>Our Distinguish Skills</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <div className='usp-main-item'>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={SC2} /></div>
                                                    <h4>Cost-Effective</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar'></span>
                                                    </div>
                                                    <p>Benefit from cost-free new employee training and flexible hiring at rates that are competitive with those in the market.</p>
                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={EA2} /></div>
                                                    <h4>Flexible Professional Hiring</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-1-0s'></span>
                                                    </div>
                                                    <p>We provide the most consistent candidates with great expertise and skills for every domain.</p>
                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={tm} /></div>
                                                    <h4>Excellent Team Management</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-2-0s'></span>
                                                    </div>
                                                    <p>Reduced turnover rates to boost project output and productivity.</p>
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
                                    <div className='col-md-6 col-sm-4 mb-5'>
                                        <div className='one-side-image-bx'>
                                            <Image src={staffAugmentation2} className='img-fluid' />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-sm-4  mb-5'>
                                        <div className='content-page-box'>
                                            <div className='main-head-box'>
                                                <h2>Services We Offer</h2>
                                                <div className='feature-line'>
                                                      <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <p className="pb-2">Rozgar.com is a well-known provider of staffing solutions. We put a strong emphasis on providing the best talent to boost your business's productivity, growth, and evolution.</p>
                                            <ul className='list-offer'>
                                                <li>Recruiting and hiring experienced candidates.</li>
                                                <li>Providing candidates who are well-suited to your project's requirements.</li>
                                                <li>Retaining the best employees.</li>
                                                <li>Supplying the appropriate skills to meet your company's needs.</li>
                                                <li>Screening, identifying, and recruiting the right candidate with the perfect blend of experience, skills, and required expertise.</li>
                                            </ul>
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
                                                <h2 className='title'>What Is The Need for Contract Staffing?</h2>
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
                                                    <h3>Time Efficiency</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Contract staffing reduces the impending stress of finding a full-time candidate.</p>
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
                                                    <h3>Selection Of The Master Candidate</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>A business can focus on business-centric needs with the assistance of contract staffing and complete the project within the allotted time frames.</p>
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
                                                    <h3>Ascendible</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>This service brings high-quality solutions to the day-to-day needs of a specialised workforce without any long-term commitment.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 offset-2'>
                                        <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                            <div className='featured-content'>
                                                <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                                    <div className='cmt-num'><span className='number number-four'></span></div>
                                                </div>
                                                <div className='featured-title'>
                                                    <h3>Cost-Effective</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We provide you with a team of experienced professionals for your consistent workflow by shortening the lengthy and complicated process of the traditional hiring system with our individualised technology.</p>
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
                                                    <h3>Endless Support</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Transparent communication and ongoing resource flow make it possible to maintain uninterrupted command and support for development projects.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>




                      {/*  <section className='cmt-row about-section clearfix'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h4 className='title'>Benefits and needs of staff augmentation services</h4>
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
                                                    <h3>Time-Efficiency</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Staff augmentation reduces the stress of meeting the deadlines of delivering qualified talents. It opens the gate to a larger pool of experienced and qualified experts in specific areas</p>
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
                                                    <h3>Ace Selection of An Expert</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>With the augmented staffing services, you can focus on core business needs and deliver more projects within the defined deadlines</p>
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
                                                    <h3>Scalability</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>The staff augmentation process is a reliable, scalable, and easy way to enhance your chances of hiring experts. The services bring top-notch solutions to your every need of a specialised workforce without any long-term commitment.</p>
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
                                                    <h3>Cost-Efficient</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>With our strategic staff augmented process, you only pay for the services you need. We cut short the lengthy complications of traditional hiring methods to provide you with a team of experts to increase your consistent workflow.</p>
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
                                                    <h3>Continuous Support</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>On-going resource flow with transparent communication with the resource to enjoy uninterrupted control and support for the development projects</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </section>  */}






                        
                       {/* <section className='cmt-row about-section clearfix secrtion-bg-gray'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h4 className='title'>Why choose mount talent for staff augmentation services?</h4>
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
                                                    <h3>Years of experience</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Mount Talent leads its way with its extensive industry-oriented experience to deliver qualified, professional, and highly-trained professionals anytime. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Dedicated Professional Team</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We have a team of experienced and expert recruiters and HR professionals to provide you with the best talents you deserve.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Ease of Scalability</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Whether for your one-time project need or a continuous need, Mount Talent will leave no stone unturned to walk that extra mile for you. With our passion and determination, we are the leading staffing solution provider for a compatible companionship to deliver the workforce you need</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Affordable Service Plans</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>You won't be disappointed with our affordable staff augmentation services. We stand distinguished with our quick turnaround time and 100% assured satisfaction</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>24*7 Support</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We offer 24*7 availability to provide you the support and assistance you need. We work on all the requirements very passionately to deliver on-time solutions without any hassles</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    </section> */}










    <section className='cmt-row about-section clearfix secrtion-bg-gray'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h2 className='title'>Why Choose Rozgar.com For Contract Staffing?</h2>
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
                                                    <h3>Years of Expertise</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Due to its market-oriented experience in providing skilled, trained, and experienced working professionals, Rozgar.com is the industry leader.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Team Of Professionals</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Rozgar.com has the best HR professionals and experienced recruiters in the business to provide you with a team of the best talent.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Reasonable Service</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>You won't believe it, but our cost-effective contract staffing services won't let you down. Our quick turnaround time and 100% guarantee of satisfaction set us apart.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 offset-4'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>24*7 Assistance</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We are online 24*7, so any problems, concerns or queries you may have we will assist you no matter the time or place. </p>
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
                                                        What is staff augmentation?
                                                    </label>
                                                    <div className='answers'>
                                                        <p>Staff augmentation is outsourcing <b>staffing services</b> to recruit compatible talent for a specific project to fulfill the business objectives. It evaluates the existing staff and determines the additional skills required.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question2' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question2' className='question'>
                                                        Why do you need staff augmentation?
                                                    </label>
                                                    <div className='answers'>
                                                        <p>The main requirement of staff augmentation is to add flexibility to the existing workforce. The process ensures fulfilling the staffing needs for short-term projects. It is also time-saving and cost-effective.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question3' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question3' className='question'>
                                                        What is the difference between staff augmentation and managed services?
                                                    </label>
                                                    <div className='answers'>
                                                        <p><b>Staff augmentation services</b> focus on outsourcing specific tasks, functions, and needs of the organization. On the other hand, managed services focus on outsourcing the entire problem and its solutions.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question4' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question4' className='question'>
                                                        Is staff augmentation important?
                                                    </label>
                                                    <div className='answers'>
                                                        <p>Yes. It ensures better control to the organizations on their projects by recruiting a temporary yet best team of talents. It can assure timely delivery of projects without burdening the existing workforce.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question5' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question5' className='question'>
                                                        Who uses staff augmentation?
                                                    </label>
                                                    <div className='answers'>
                                                        <p>Staff augmentation services are mainly used by organizations where in-house specialists and experts are unavailable for certain projects. Coming from a reliable <b>staffing solution provider</b>, staff augmentation fulfills the need quickly.</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type='checkbox' id='question6' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question6' className='question'>
                                                        What is staffing?
                                                    </label>
                                                    <div className='answers'>
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
