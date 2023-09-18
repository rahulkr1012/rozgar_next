import React, { Component } from 'react'
import swiggylogoapp from '../../src/assets/images/logo-grenlamp.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Parser from 'html-react-parser';
import Link from 'next/link';
import constant from 'constant';
import { ToSeoUrl } from 'utils';
import Image from 'next/image';

export default class GreenlamindustriesAboutUs extends Component {
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
                <div id="rg-innerbannervtwo" class="rg-greenlam"></div>
                <div className='swiggynavbg greenlamnavbg'>
                    <div className="container">
                        <div className="row">
                            <div className="col md 12">
                                <div className='d-flex justify-content-between'>
                                    <ul className='swiggynav'>
                                        <li><Link href={constant.component.Greenlamindustries.url}>Home</Link></li>
                                        <li><Link href={constant.component.GreenlamindustriesJobs.url}>Jobs</Link></li>
                                        <li><Link href={constant.component.GreenlamindustriesAboutUs.url} className='active'>About Us</Link></li>
                                        <li><Link href={constant.component.GreenlamindustriesLife.url}>Life @ Greenlam Industries</Link></li>
                                    </ul>
                                    {/* <div className='swiggy-follow-box'>
                                        <span>+29,457 followers</span>
                                        <a href='' className='swiggy-follow-btn'>+ FOLLOW</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='swiggy-services-box'>
                        <ul className='bag-white-bx'>
                            <li>Digital Laminates Manufacturers</li>
                            <li>Laminate Suppliers</li>
                            <li>Best Laminate Brand</li>
                            <li>Laminate Company</li>

                        </ul>
                    </div>
                </div>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-haslayout rg-sectionspace">
                        <div className="container">
                            <div className="row">
                                <div id="rg-twocolumns" className="rg-twocolumns">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">

                                        <div className='swiggy-mission grernlam-mission'>
                                            <div className='mission-text'>
                                                Greenlam Industries is among the world's top three largest laminate manufacturing company. Acts as a renowned laminate supplier in India offering decorative & digital laminate sheets.
                                            </div>
                                        </div>

                                        <div className="swiggy-about-box swiggy-video-bg mb-4">
                                            <iframe width="100%" height="400" src="https://www.youtube.com/embed/_XXEQVQSsqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>

                                        <div className="swiggy-about-box pt-3">
                                            <h2>About Greenlam Industries</h2>
                                            <p>Greenlam is among the world’s top 3, Asia’s largest and India’s No. 1 surfacing solutions brand. With its presence in over 100 countries, Greenlam has focused on developing quality products with great passion for innovation. It offers end to end surfacing solutions spread across laminates, compacts, Interior and exterior cladding, restroom cubicles & locker solutions, decorative veneers, engineered wooden floors and engineered wooden doors & frames to choose from. With two state-of-the-art manufacturing facilities in the country, it is the first choice of architects, interior designers and home owners when it comes to transforming living spaces.</p>
                                            <p>We work in harmony with our environment. Greenlam thinks and acts to save and preserve nature in its pristine form by ethical sourcing of its raw materials from the world over. Coupled with this, the products are FSC®-C100034, Greenguard, NSF certified and are Anti-bacterial, thereby ensuring they are environment friendly and safe to use. With robust team of over 14,000 distributors and dealers along with more than 500 sales professionals, Greenlam is just a call away to give your spaces a new look.</p>
                                        </div>

                                        <div className="swiggyon-web">
                                            <div className="swiggyon-web-head">Benefits at Greenlam Industries</div>
                                            <p>Childcare & Parenthood Programs | Comprehensive Health Insurance Policies | Relocation Assistance | Mobile Reimbursement | Tax Savings Support | Free Mental • Physical • Legal • & Financial Wellness Consultations | Learning Wallet</p>
                                        </div>

                                        <div className="swiggyon-web">
                                            <div className="swiggyon-web-head">Green-indstries on the web</div>
                                            <div className="swiggyon-web-icons">
                                                <ul>
                                                    <li><a href='https://www.greenlamindustries.com/'><i class="fa fa-external-link"></i> Website</a></li>
                                                    <li><a href='https://www.linkedin.com/company/greenlam-industries-ltd'><i class="fa fa-linkedin-square"></i> LinkedIn</a></li>
                                                    <li><a href='https://twitter.com/greenlaminate?lang=en'><i class="fa fa-twitter-square"></i> Twitter</a></li>
                                                    <li><a href='https://www.instagram.com/greenlam_laminates/?hl=en'><i class="fa fa-instagram"></i> Instagram</a></li>
                                                    <li><a href='https://play.google.com/store/apps/details?id=com.mikasafloors.decowood&hl=en_IN&gl=US'><i class="fa fa-android"></i> Android App</a></li>
                                                    <li><a href='https://apps.apple.com/in/app/decowood-veneers/id1174720498'><i class="fa fa-apple"></i> iOS App</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="swiggy-tech-stack">
                                            <div className="swiggy-tech-stack-head">Greenlam Industrie 's Tech Stack</div>
                                            <ul className="swiggy-tech-point">
                                                <li>jQuery</li>
                                                <li>Font Awesome</li>
                                                <li>Bootstrap</li>
                                                <li>Select2</li>
                                                <li>Prototype</li>
                                                <li>React.js</li>
                                                <li>Android</li>
                                                <li>iOS</li>
                                                <li>JavaScript</li>
                                                <li>AWS</li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
                                        <aside id="rg-sidebarvtwo" className="rg-sidebar rg-sidebarvtwo">
                                            <div className="swiggy-apply-jobbox">
                                                <div className="swiggy-text-logo">
                                                    <h3>Want to work at greenlam industries?</h3>
                                                    <Image style={{ maxWidth: "150px" }} src={swiggylogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <Link href={constant.component.GreenlamindustriesJobs.url}>Apply to jobs</Link>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <Image src={swiggylogoapp} />
                                                    </div>
                                                    <div className='swiggy-job-opning'>
                                                        <h4>{count} job openings</h4>
                                                        <span className='swiggy-hiring-now'>Hiring now</span>
                                                    </div>
                                                </div>
                                                <div className="opning-jobs-swiggy">
                                                    {swiggy?.jobs?.list.map((item, index) => {
                                                        const dynamicURL =ToSeoUrl(item.CITY.trim().split(',')[0])+'/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                            
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
                                                        <Link href={constant.component.GreenlamindustriesJobs.url}>View All Openings</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <img
                                                            src={swiggyAdd04}
                                                            alt="img description"
                                                        />
                                                    </figure>
                                                </a>
                                                <span>Ad</span>
                                            </div> */}
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
