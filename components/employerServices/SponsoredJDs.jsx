import SendEnquiry from 'components/Enquiry/SendEnquiry'
import React, { Component } from 'react'
import faqs2 from '../../src/assets/images/faqs2.jpg'
import OfferedYou5 from '../../src/assets/images/offered-you5.jpg'
import Image from 'next/image'

export default class SponsoredJDs extends Component {
  render() {
    return (
     <React.Fragment>
         <div id='rg-innerbannervtwo' className='sponsored-JDs-banner rg-hed-section'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className='page-header-section'>
                            <div className='page-header-content'>
                                <h1>Sponsored JDs</h1>
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
                                        <h2>Sponsored Job Descriptions</h2>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16'>Millions of job seekers trust Rozgar.com to find their ideal job. That is why sponsoring a job is a reasonable and effective way<br/>to get the engagement you need for your company's job posting among the pool of jobs that exist on Rozgar.com. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className='usp-top-box'>
                                    <div className='main-head-box'>
                                        <h2>What Are Sponsered Job Descriptions</h2>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16'>Sponsored jobs are paid listings that display more suitable search results for an extended period.<br/>In contrast to the free listings, they do not decline throughout search rankings.</p>
                                        <p className='font-16'>Compared to free listings, sponsored jobs are more reliable due to their increased and continuous<br/> visibility over time and their ability to deliver more quality applicants.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rozgar-distinguishing-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className='usp-top-box'>
                                    <div className='main-head-box'>
                                        <h2>How Do Sponsered Jobs Work?</h2>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                        <p className='font-16'>On Rozgar.com you will get an option to sponsor your job depending upon the service and expanse.<br/> The higher the budget, the more applicants will the job attract.</p>
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
                                        <h2>Why Choose MTC For Sponsored JDs?</h2>
                                        <div className='feature-line'>
                                            <span className='animate-bar'></span>
                                        </div>
                                    </div>
                                    <p>With our vast industry experience, we deliver more qualified candidates suitable for your job.</p>
                                    <ul className='list-offer'>
                                        <li>We provide sponsored ‘Premium, Featured and Video’ JDs. So, you can pick the one suiting your needs the best.</li>
                                        <li>We have a dedicated team of industry experts recruiters, and HR professionals, so leave it to us to find you the skilled talent.</li>
                                        <li>Our affordable services will not let you down. Our quick turnaround time and 100% guarantee of satisfaction set us apart.</li>
                                        <li>We are available around the clock to give you the support and assistance you require. We devote a lot of energy to meeting all requirements to provide prompt and trouble-free solutions.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                
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
                                            What Is Sponsored JDs?
                                            </label>
                                            <div className='answers'>
                                                <p>Sponsored JDs are a way to promote your job posting by paying the job portal.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question2' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question2' className='question'>
                                                What Is The Need For Sponsored JDs?
                                            </label>
                                            <div class="answers">
                                                <p>Sponsored Job Description is an effective way to get the right visibility for a job posting among the thousands of jobs present in the market.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <input type='checkbox' id='question3' name='q' className='questions' />
                                            <div className='plus'>+</div>
                                            <label for='question3' className='question'>
                                            Which Job Portal Is the Best For Sponsored JDs?
                                            </label>
                                            <div class="answers">
                                                <p>There is various job portal in the market, but Rozgar.com have made a special trust among job seekers. Rozgar.com have a bank of lakhs of candidates, which is why sponsoring your job posting here will give you the best result. </p>
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
