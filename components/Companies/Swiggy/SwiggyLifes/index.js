import React, { Component } from 'react'
import swiggylogoapp from 'src/assets/images/swiggy-logo-app.png';
import smallswiggylogo from 'src/assets/images/small-swiggy-logo.jpg';
import swiggylife1pic from 'src/assets/images/swiggy/swiggy-life-pic01.jpg'
import swiggylife2pic from 'src/assets/images/swiggy/swiggy-life-pic02.jpg'
import swiggylife3pic from 'src/assets/images/swiggy/swiggy-life-pic03.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel'
import Parser from 'html-react-parser';
import add04 from 'src/assets/images/swiggy/swiggy-adds-04.jpg'
import Link from 'next/link';
import constant from 'constant';
import { ToSeoUrl } from '@/utils';
import Image from 'next/image';

export default class SwiggyLifes extends Component {
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
                <div id="rg-innerbannervtwo" class="rg-swiggy-life-bgbanner"></div>
                <div className='swiggynavbg'>
                    <div className="container">
                        <div className="row">
                            <div className="col md 12">
                                <div className='d-flex justify-content-between'>
                                    <ul className='swiggynav'>
                                        <li><Link href={constant.component.Swiggy.url}>Home</Link></li>
                                        <li><Link href={constant.component.SwiggyJobs.url}>Jobs</Link></li>
                                        <li><Link href={constant.component.SwiggyAboutUs.url}>About Us</Link></li>
                                        <li><Link href={constant.component.SwiggyLife.url} className='active'>The Swiggy Life</Link></li>
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

                                        <div className='worklife-swiggy'>
                                            <h1 className='worklife-swiggy-head'>Work and Life @ Swiggy</h1>
                                            <div className="d-flex worklife-mobile-d-block">
                                                <div className='worklife-swiggy-box'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={swiggylife1pic} />
                                                        <h3>It's The Goda Doreswamy Ramakumar Show!</h3>
                                                        <p>Whether Goda is innovating within the field of data science or breaking barriers for women in technology - one thing is certain, she sure does pack a punch! Read on for her inspiring experience at Swiggy.</p>
                                                    </div>
                                                </div>
                                                <div className='worklife-swiggy-box px-4'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={swiggylife2pic} />
                                                        <h3>It's The Goda Doreswamy Ramakumar Show!</h3>
                                                        <p>Whether Goda is innovating within the field of data science or breaking barriers for women in technology - one thing is certain, she sure does pack a punch! Read on for her inspiring experience at Swiggy.</p>
                                                    </div>
                                                </div>
                                                <div className='worklife-swiggy-box'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={swiggylife3pic} />
                                                        <h3>It's The Goda Doreswamy Ramakumar Show!</h3>
                                                        <p>Whether Goda is innovating within the field of data science or breaking barriers for women in technology - one thing is certain, she sure does pack a punch! Read on for her inspiring experience at Swiggy.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swiggy-our-benefits-box">
                                            <div className='swiggy-ben-ser-head'>Our Benefits</div>
                                            <div className='swiggy-ben-ser-text'>Swiggy is an equal-opportunity employer that offers a variety of employee-centric benefits such as competitive salaries, comprehensive health benefits, and exciting equity opportunities. With this in practice, we like to empower and motivate our employees to boost their efforts towards realizing Swiggy’s vision, ‘To elevate the quality of life for the urban consumer with unparalleled convenience.’</div>

                                            <ul className='swiggy-benefites-number'>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-toggle-on"></i></div>
                                                        <p>Group Personal Accident Insurance</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-plus-square"></i></div>
                                                        <p>Group Medical Insurance</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-coffee"></i></div>
                                                        <p>Pre-loaded Food Card</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-mobile"></i></div>
                                                        <p>Mobile allowance</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-heart"></i></div>
                                                        <p>Paternity and adoption leave policy</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-tree"></i></div>
                                                        <p>Free assistance on tax and investment planning</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-car"></i></div>
                                                        <p>Car Lease</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-sliders"></i></div>
                                                        <p>Flexi Benefit Component Policy</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><i class="fa fa-umbrella"></i></div>
                                                        <p>Parental Insurance</p>
                                                    </div>
                                                </li>
                                            </ul>
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
                                                    <Image src={swiggylogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <Link href={constant.component.SwiggyJobs.url}>Apply to jobs</Link>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <Image src={smallswiggylogo} />
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
                                                        <a href="/search-job?keyword=swiggy">View All Openings</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <Image
                                                            src={add04}
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
