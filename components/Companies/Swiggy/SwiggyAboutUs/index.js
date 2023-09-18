import React, { Component } from 'react'
import swiggylogoapp from 'src/assets/images/swiggy-logo-app.png';
import smallswiggylogo from 'src/assets/images/small-swiggy-logo.jpg';
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel'
import constant from 'constant';
import { ToSeoUrl } from 'utils';
import Parser from 'html-react-parser';
import Image from 'next/image';
import swiggyAdd04 from 'src/assets/images/swiggy/swiggy-adds-04.jpg'

export default class SwiggyAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        const { swiggy, count } = this.props
        const featuredsettings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                        dots: false,
                        arrows: false
                    }
                },

                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        arrows: false
                    }
                }
            ]

        };
        return (
            <React.Fragment>
                <div id="rg-innerbannervtwo" class="rg-swiggybgbanner"></div>
                <div className='swiggynavbg'>
                    <div className="container">
                        <div className="row">
                            <div className="col md 12">
                                <div className='d-flex justify-content-between'>
                                    <ul className='swiggynav'>
                                        <li><Link href={constant.component.Swiggy.url}>Home</Link></li>
                                        <li><Link href={constant.component.SwiggyJobs.url}>Jobs</Link></li>
                                        <li><Link href={constant.component.SwiggyAboutUs.url} className='active'>About Us</Link></li>
                                        <li><Link href={constant.component.SwiggyLife.url}>The Swiggy Life</Link></li>
                                    </ul>
                                    <div className='swiggy-follow-box'>
                                        <span>4.2K followers</span>
                                        <a href='' className='swiggy-follow-btn'>+ FOLLOW</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='swiggy-services-box'>
                        <ul>
                            <li>Internet</li>
                            <li>Courier / Logistics</li>
                            <li>Startup</li>
                            <li>B2C</li>
                            <li>B2B</li>
                            <li>Unicorn</li>
                        </ul>
                    </div>
                </div>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-haslayout rg-sectionspace">
                        <div className="container">
                            <div className="row">
                                <div id="rg-twocolumns" className="rg-twocolumns">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">

                                        <div className='swiggy-mission'>
                                            <div className='mission-text'>
                                                Our mission is to elevate the quality of life for the urban consumer with unparalleled convenience. Convenience is what makes us tick. It's what makes us get out of bed and say, "Let's do this."
                                            </div>
                                        </div>

                                        <div className="swiggy-about-box swiggy-video-bg mb-4">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/fLz2fgU_x1Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>

                                        <div className="swiggy-about-box pt-3">
                                            <h2>About Swiggy</h2>
                                            <p>Our mission is to elevate the quality of life for the urban consumer by offering unparalleled convenience. From starting out as a hyperlocal food delivery service in 2014 to becoming a logistics hub that also covers instant grocery deliveries, as well as concierge services; our capabilities result not only in lightning-fast deliveries for our customers, but also in providing our people with a productive and fulfilling career.</p>

                                            <p>Swiggy is now India's leading convenience commerce platform, with a tech-first approach to logistics and a solution-first approach to consumer demands. Built on the back of robust ML technology and fuelled by terabytes of data processed everyday, Swiggy offers a fast, seamless, and reliable delivery experience for millions of customers.</p>

                                            <p>With a presence in over 500 cities across India, partnerships with over 150K restaurants, an employee base of 5000+, and a 2.6L+ strong independent fleet of Delivery Executives; Swiggy is driven to elevate the quality of life for urban consumers by delivering unparalleled convenience.</p>

                                            <p>With Swiggy's recent new business launches of Swiggy Instamart, Swiggy Genie, and Health Hub, we are consistently making waves by reimagining convenience in India, while growing the opportunities we offer our employees.</p>

                                            <p>Customer experience remains our primary focus and if you're excited about solving problems that you face as a customer, come join us on this amazing ride!</p>

                                            <p>We are an equal opportunity employer and all qualified applicants will receive consideration for employment without regard to race, colour, religion, sex, disability status, or any other characteristic protected by the law.</p>
                                        </div>

                                        <div className="swiggyon-web">
                                            <div className="swiggyon-web-head">Benefits at Swiggy</div>
                                            <p>Childcare & Parenthood Programs | Comprehensive Health Insurance Policies | Relocation Assistance | Mobile Reimbursement | Tax Savings Support | Free Mental • Physical • Legal • & Financial Wellness Consultations | Learning Wallet</p>
                                        </div>

                                        <div className="swiggyon-web">
                                            <div className="swiggyon-web-head">Swiggy on the web</div>
                                            <div className="swiggyon-web-icons">
                                                <ul>
                                                    <li><a href=''><i class="fa fa-external-link"></i> Website</a></li>
                                                    <li><a href=''><i class="fa fa-linkedin-square"></i> LinkedIn</a></li>
                                                    <li><a href=''><i class="fa fa-twitter-square"></i> Twitter</a></li>
                                                    <li><a href=''><i class="fa fa-instagram"></i> Instagram</a></li>
                                                    <li><a href=''><i class="fa fa-android"></i> Android App</a></li>
                                                    <li><a href=''><i class="fa fa-apple"></i> iOS App</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="swiggy-tech-stack">
                                            <div className="swiggy-tech-stack-head">Swiggy's Tech Stack</div>
                                            <ul className="swiggy-tech-point">
                                                <li>Java</li>
                                                <li>Golang</li>
                                                <li>Big Data</li>
                                                <li>Microservices</li>
                                                <li>Machine Learning</li>
                                                <li>React.js</li>
                                                <li>Android</li>
                                                <li>iOS</li>
                                                <li>React Native</li>
                                                <li>AWS</li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
                                        <aside id="rg-sidebarvtwo" className="rg-sidebar rg-sidebarvtwo">
                                            <div className="swiggy-apply-jobbox">
                                                <div className="swiggy-text-logo">
                                                    <h3>Want to work at Swiggy?</h3>
                                                    <Image
                                                        width={1000}
                                                        height={1000}
                                                        src={swiggylogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <Link href={constant.component.SwiggyJobs.url}>Apply to jobs</Link>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <Image
                                                            width={1000}
                                                            height={1000}
                                                            src={smallswiggylogo} />
                                                    </div>
                                                    <div className='swiggy-job-opning'>
                                                        <h4>{count} job openings</h4>
                                                        <span className='swiggy-hiring-now'>Hiring now</span>
                                                    </div>
                                                </div>
                                                <div className="opning-jobs-swiggy">
                                                    {swiggy?.jobs?.list.map((item, index) => {
                                                        const dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                        if (index <= 1) {
                                                            return (
                                                                <ul>
                                                                    <li>
                                                                        <a href=''>
                                                                            <h4><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h4>
                                                                            <div className='d-flex swiggy-yearlocation'>
                                                                                <span><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</span>
                                                                                <span><li><i class="lnr lnr-map-marker"></i> {item.CITY?.length > 18 ? Parser(item.CITY.slice(0, 18)) + '...' : Parser(item.CITY)}</li></span>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            )
                                                        }


                                                    })}
                                                    <div className='view-all-openings'>
                                                        <Link href={constant.component.SwiggyJobs.url}>View All Openings</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <img
                                                            src={swiggyAdd04}
                                                            alt="img description"
                                                        />
                                                    </figure>
                                                </a>
                                                <span>Ad</span>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
