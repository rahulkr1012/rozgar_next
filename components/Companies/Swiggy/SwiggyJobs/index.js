import React, { Component } from 'react'
import swiggylogoapp from 'src/assets/images/swiggy-logo-app.png';
import smallswiggylogo from 'src/assets/images/small-swiggy-logo.jpg';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel'
import constant from 'constant';
import { ToSeoUrl } from 'utils';
import Parser from 'html-react-parser';
import adds04 from 'src/assets/images/swiggy/swiggy-adds-04.jpg'
import Image from 'next/image';
export default class SwiggyJob extends Component {
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
                                        <li><Link href={constant.component.SwiggyJobs.url} className='active'>Jobs</Link></li>
                                        <li><Link href={constant.component.SwiggyAboutUs.url}>About Us</Link></li>
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
                                        <div className="jobs-at-swiggy-box">
                                            <div className="swiggy-boxshow pt-2">
                                                <div className="row">
                                                    <div className="pb-2">
                                                        <h3>Jobs at Swiggy</h3>
                                                    </div>
                                                    <div className="rg-featurejobs">
                                                        {swiggy?.jobs?.list.map((item) => {
                                                            const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
                                                            const dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                            return (
                                                                <div class="rg-featurejob">
                                                                    <div class="rg-companycontent">
                                                                        <figure class="roz-companydetaillogo">
                                                                            <a href="#">
                                                                                {item.COMPANY_LOGO === 'NA' ? <h3>{nameInitial}</h3> : <a href={dynamicURL} target='_blank'><Image
                                                                                    height={1000}
                                                                                    width={1000}
                                                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt="image description" /></a>}
                                                                            </a>
                                                                        </figure>
                                                                        {/* <div class="rg-companyhead">
                                                            <div class="rg-rightarea"><a class="rg-tagfeature" href="javascript:void(0);"><i class="fa fa-bookmark"></i> Save</a></div>
                                                        </div> */}
                                                                        <div class="rg-detailopensjobs">
                                                                            <h3><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h3>
                                                                            <h6 style={{ fontSize: '13px' }}>{item.COMPANY_NAME}</h6>
                                                                            <div class="jobcompanyreviewbox"><a href="#"></a><span class="reviewnumber">
                                                                                <i class="fa fa-star"></i></span><a href="#"><span class="reviewlink">({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} Reviews)Reviews)</span></a></div>
                                                                        </div>
                                                                        <ul class="jobcompanyhiringdetails" >
                                                                            <li><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</li>
                                                                            <li><i class="fa fa-rupee"></i> {item?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.CTC_MIN + '-' + item?.CTC_MAX}</li>
                                                                            <li><i class="lnr lnr-map-marker"></i> {item.CITY?.length > 18 ? Parser(item.CITY.slice(0, 18)) + '...' : Parser(item.CITY)}</li>
                                                                        </ul>
                                                                        <div class="roz-companyjobtans">
                                                                            <div class="ellipsis"><i class="lnr lnr-file-empty"></i>{item.JOB_DETAILS?.length > 64 ? Parser(item.JOB_DETAILS.slice(0, 64)) + '...' : Parser(item.JOB_DETAILS)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div class="view-all-openings pb-1 text-right">
                                                        <a href="/search-job?keyword=swiggy">View All Openings</a>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        height={1000}
                                                        width={1000}
                                                        src={swiggylogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <a href=''>Apply to jobs</a>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <Image
                                                            height={1000}
                                                            width={1000}
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
                                                        <a href="/search-job?keyword=swiggy">View All Openings</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <Image
                                                            height={1000}
                                                            width={1000}
                                                            src={adds04}
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
