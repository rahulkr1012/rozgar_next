import SendEnquiry from 'components/Enquiry/SendEnquiry'
import React, { Component } from 'react'
import SC2 from '../../src/assets/images/SC2.png'
import EA2 from '../../src/assets/images/EA2.png'
import tm from '../../src/assets/images/tm.png'
// import staffAugmentation2 from '../../assets/images/staff-augmentation2.jpg'
import faqs2 from '../../src/assets/images/faqs2.jpg'
import OfferedYou5 from '../../src/assets/images/offered-you5.jpg'
import Image from 'next/image'

export default class CompanyBrandings extends Component {
  render() {
    return (
     <React.Fragment>
         <div id='rg-innerbannervtwo' className='company-branding-banner rg-hed-section'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className='page-header-section'>
                            <div className='page-header-content'>
                                <h1>Company Branding Services</h1>
                                <p>Increasing Brand Value & Recognition</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SendEnquiry />
        <main id="rg-main" className="rg-main rg-haslayout pt-0 pb-0">
            <div className="rg-share-your-interview  rg-haslayout pt-0">
                <div className="rozgar-distinguishing-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className='usp-top-box'>
                                    <div className='main-head-box'>
                                        <h2>Our Distinguish Expertise</h2>
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
                                            <p>Growth in your brand recognition at globally competitive rates and no hidden costs.</p>
                                        </div>
                                        <div className='usp-item-box'>
                                            <div className='icon-img'><Image src={EA2} /></div>
                                            <h4>Flexible Branding Techniques</h4>
                                            <div className='feature-line'>
                                                <span className='animate-bar delay-1-0s'></span>
                                            </div>
                                            <p>Consistent ways to promote your company name as per the target audience.</p>
                                        </div>
                                        <div className='usp-item-box'>
                                            <div className='icon-img'><Image src={tm} /></div>
                                            <h4>Stable Brand Management</h4>
                                            <div className='feature-line'>
                                                <span className='animate-bar delay-2-0s'></span>
                                            </div>
                                            <p>Decreased turnover rates of industry-oriented professionals to rev your brand name.</p>
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
                                    <p className='pb-4'>We provide the best company branding solutions in India with the best team of talented professionals to boost your business name and recognition.</p>
                                    <ul className='list-offer'>
                                        <li>Banner Advertisement At Different Places.</li>
                                        <li>Microsites Management.</li>
                                        <li>Premium & Featured Job Posting</li>
                                        <li>Dedicated Customer Support</li>
                                        <li>Video-Based JD’s</li>
                                        <li>Social Media Marketing</li>
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
                                        <h2 className='title'>Why Choose Rozgar.com For Company Branding?</h2>
                                    </div>
                                    <div className='feature-line'>
                                        <span className='animate-bar'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb_15'>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                    <div className='featured-content'>
                                        <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                            <div className='cmt-num'><span className='number number-one'></span></div>
                                        </div>
                                        <div className='featured-title'>
                                            <h3>Years Of Experience</h3>
                                        </div>
                                        <div className='featured-desc'>
                                            <p>We are in this business for the past 14 years, and with our industry-oriented experience, we build company names and organisation values.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                    <div className='featured-content'>
                                        <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                            <div className='cmt-num'><span className='number number-two'></span></div>
                                        </div>
                                        <div className='featured-title'>
                                            <h3>Team Of Professionals</h3>
                                        </div>
                                        <div className='featured-desc'>
                                            <p>With our team of experts, we provide a comprehensive and detailed plan to bring your company name into focus.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                    <div className='featured-content'>
                                        <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                            <div className='cmt-num'><span className='number number-three'></span></div>
                                        </div>
                                        <div className='featured-title'>
                                            <h3>Affordable Service</h3>
                                        </div>
                                        <div className='featured-desc'>
                                            <p>Building a brand name is not an inexpensive job, but compared to other companies, Rozgar.com provide affordable brand management that you will not be disappointed with. We stand distinguished with our fast response and 100% satisfaction guarantee.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='featured-icon-box icon-align-before-content style4 benefits-box height-box'>
                                    <div className='featured-content'>
                                        <div className='cmt-icon cmt-icon_element-fill cmt-icon_element-style-rounded cmt-icon_element-color-white cmt-icon_element-size-lg'>
                                            <div className='cmt-num'><span className='number number-four'></span></div>
                                        </div>
                                        <div className='featured-title'>
                                            <h3>24*7 Support And Assistance</h3>
                                        </div>
                                        <div className='featured-desc'>
                                            <p>To give you the support and assistance you require, we are available around the clock. We devote a lot of energy to meeting all requirements to provide prompt and trouble-free solutions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
      
                        </div>
                    </div>
                </section>
                
                <section className='pddding-top-btm bg-white'>
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
                                        <h2>FAQs</h2>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                    </div>
                                    <div className='faqscontent'>
                                        <div>
                                            <input type='checkbox' id='question1' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question1' className='question'>What is company branding?</label>
                                            <div className='answers'>
                                                <p>Branding is the process of creating a different identity for a business or a company in the mind of the target audience and consumers. <b>Company branding services</b> are the process of communicating a unique selling proposition, or differential, that sets a product or service apart from the competition.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question2' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question2' className='question'>
                                                What is the need for company branding?
                                            </label>
                                            <div class="answers">
                                                <p><b>Branding services for companies</b> include selling their products, services, ideas or concept and making the company names distinguished to stand at the top in the competitive market. Branding is needed to create and disseminate the brand name, quantities, and personality</p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question3' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question3' className='question'>
                                                Is Brand Management important?
                                            </label>
                                            <div class="answers">
                                                <p><b>Branding company</b> is vital for every company, as it builds the name and audience of the company. It is important for customer engagement and revenue generation.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question4' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question4' className='question'>
                                                Which is the best brand management company in India?
                                            </label>
                                            <div class="answers">
                                                <p>There are various brand management companies in India for offline and <b>online company branding</b>. However, Rozgar.com provides the best company branding in the market, giving the best results at an effective price.</p>
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
