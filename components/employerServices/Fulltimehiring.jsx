import React, { Component } from 'react'
import SC2 from 'src/assets/images/SC2.png'
import EA2 from 'src/assets/images/EA2.png'
import tm from 'src/assets/images/tm.png'
import faqs2 from 'src/assets/images/faqs2.jpg'
import OfferedYou5 from 'src/assets/images/offered-you5.jpg'
import Image from 'next/image'
import dynamic from 'next/dynamic'

let SendEnquiry  = dynamic(import('components/Enquiry/SendEnquiry') , {
    ssr:false 
}) 

export default class Fulltimehiring extends Component {

    render() {

        return (
            <React.Fragment>
                <div id='rg-innerbannervtwo' className='rg-enquiryrvtworep rg-hed-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8">
                                <div className='page-header-section'>
                                    <div className='page-header-content'>
                                        <h1>Full-Time Hiring</h1>
                                        <p>Enrich Company Productivity Through The Finest Talent</p>
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
                                                <h2>Our Distinguish Skills</h2>
                                                <div className='feature-line'>
                                                    <span className='animate-bar'></span>
                                                </div>
                                            </div>
                                            <div className='usp-main-item'>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={SC2} /></div>
                                                    <h4>Complete Access</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar'></span>
                                                    </div>
                                                    <p>Enjoy the advantage of our 14 years of experience and the talented experts in the recruitment industry.</p>
                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={EA2} /></div>
                                                    <h4>Cost-Effective</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-1-0s'></span>
                                                    </div>
                                                    <p>We provide the best talent at a minimum price per hire, only the best for your team and company.</p>
                                                </div>
                                                <div className='usp-item-box'>
                                                    <div className='icon-img'><Image src={tm} /></div>
                                                    <h4>Streamlined Analysis & Solution</h4>
                                                    <div className='feature-line'>
                                                        <span className='animate-bar delay-2-0s'></span>
                                                    </div>
                                                    <p>There are a lot of things to consider when hiring an experienced employee. We take care of all the problems, match all the requirements and deliver the best skill in minimum time. </p>
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
                                            <Image src={OfferedYou5} className='img-fluid' />
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
                                            <p>Rozgar.com has built a massive name in the recruitment world. Using full-time hiring services in India, we have made a prominent relationship with employers and employees. We are the best and most-prominent name in the recruitment industry due to our multinational presence.</p>
                                            <ul className='list-offer'>
                                                <li>We look at the requirements of the business and find the ideal candidate as per the needs.</li>
                                                <li>Providing employees with unparalleled career opportunities.</li>
                                                <li>Immediate hiring after comprehending the company's necessities, culture, business domain, and technological environment.</li>
                                                <li>Constructing an employee value proposition to allow the company to have a competitive edge.</li>
                                                <li>Full-time employee retention support.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='cmt-row about-section clearfix fill-time-hr-section'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h2 className='title'>What Is The Need For Full-Time Hiring?</h2>
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
                                                    <h3>Business Growth</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Accelerate your business growth and profitability with a team of skilled, passionate and experienced full-time employees.</p>
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
                                                    <h3>Keeping Up With The Change</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>To bring new and accentuated ideas to the table you need to bring creativity, passion, productivity and innovation into the team and that is what makes a business grow.</p>
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
                                                    <h3>Focusing On The Pivotal Points</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>By concentrating on your company's objectives and vision, you can increase bandwidth with more time and resources.</p>
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
                                                    <h3>Enhanced Productivity</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Full-time employees who are dedicated and consistent are the key to building a business name and productivity.</p>
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
                                                    <h3>Brand Recognition</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Enhance the value of the brand with the assistance of refined value proposals and compensation structures.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='cmt-row about-section clearfix secrtion-bg-gray fill-time-hr-section'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-xl-12 col-md-12'>
                                        <div className='section-title style2 res-991-pb-15 text-center'>
                                            <div className='title-header'>
                                                <h2 className='title'>Why Choose Rozgar.com For Full-Time Hiring?</h2>
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
                                                    <h3>Speedy Turnaround</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We promise to quickly provide your business with dependable, compatible, and skilled full-time employees.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>100% Customer Satisfaction</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Our goal is to make you happy, and we won't stop you from getting what you want. We will rectify any issue with our consistent and dedicated effort.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Team Of Expert</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>We have the most seasoned recruiters in the business to ensure that you get only the best and ideal candidates.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 offset-2'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>24*7 Support</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Our experts are always available to assist and support you no matter the time or day. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6'>
                                        <div className='featured-icon-box icon-align-before-content style4 staffing-height'>
                                            <div className='featured-content'>
                                                <div className='featured-title'>
                                                    <h3>Client-Focused Approach</h3>
                                                </div>
                                                <div className='featured-desc'>
                                                    <p>Do you have any particular candidate requirements? Our customer-centric approach will take of all your needs. We are the best on the market due to our guaranteed outcome.</p>
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
                                                        Which recruitment firm is the best in India?
                                                    </label>
                                                    <div className='answers'>
                                                        <p>Although there are a lot of companies in the recruitment industry, Rozgar.com stands out from the rest gratitude for its full-time hiring services in Noida. We guarantee immediate hiring for full-time positions thanks to our industry-focused and experienced approach.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question2' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question2' className='question'>
                                                        What does hiring service mean?
                                                    </label>
                                                    <div class="answers">
                                                        <p>Simply put, hiring services are the process of identifying, sourcing, evaluating, and recruiting professional employees who are skilled and competent. Contact us right away if you're looking for dependable full-time jobs hiring services. We have a team of experienced recruiters who are committed to providing the required assistance.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question3' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question3' className='question'>
                                                        What full-time hiring means?
                                                    </label>
                                                    <div class="answers">
                                                        <p>A full-time direct hire process is one in which a company offers a job to a candidate for a permanent position without using a third party. Direct hire guarantees the candidate's stability and productivity.</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <input type='checkbox' id='question4' name='q' className='questions' />
                                                    <div className='plus'>+</div>
                                                    <label for='question4' className='question'>
                                                        What is the difference between recruitment and hiring?
                                                    </label>
                                                    <div class="answers">
                                                        <p>Finding, evaluating, and employing a candidate to fill a particular position within the company is known as hiring. The ongoing search for a company's ideal workforce entails recruitment. Rozgar.com is India's leading employment agency, providing comprehensive assistance in locating suitable full-time remote work-from-home positions.</p>
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
