import React, { Component } from 'react';
import swiggylogoapp from '../../../assets/images/logo-grenlamp.png';
import smallswiggylogo from '../../../assets/images/small-swiggy-logo.jpg';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import constant from '../../../constant';
import cafeteriaIcon from '../../../assets/images/author/health-insurance.png'
import jobsTra1ningIcon from '../../../assets/images/author/job-training-g.png'
import freefood from '../../../assets/images/author/soft-skill-training.png'

import transporticon from '../../../assets/images/author/team-outings.png'
import transporticonFree from '../../../assets/images/author/transport-icon.png'
import educationAssistance from '../../../assets/images/author/education-assistance.png'
import workFromHome from '../../../assets/images/author/work-from-home.png'
import childCare from '../../../assets/images/author/child-care.png'
import gymnasium from '../../../assets/images/author/gymnasium.png'
import cafeteriaFIcon from '../../../assets/images/author/cafeteria-icon.png'
import foodFreeIcon from '../../../assets/images/author/free-food.png'
import relocation from '../../../assets/images/author/relocation.png'


import pic04 from '../../../assets/images/Greenlam/pics04.jpg'
import pic03 from '../../../assets/images/Greenlam/pics03.jpg'
import pic02 from '../../../assets/images/Greenlam/pics02.jpg'
import pic01 from '../../../assets/images/Greenlam/pics01.jpg'
import { ToSeoUrl } from '../../../utils';
import Parser from 'html-react-parser';
import add04 from '../../../assets/images/swiggy/swiggy-adds-04.jpg'

export default class Greenlamindustries extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        window.scroll(0, 0)
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
                                        <li><Link to={constant.component.Greenlamindustries.url} className='active'>Home</Link></li>
                                        <li><Link to={constant.component.GreenlamindustriesJobs.url}>Jobs</Link></li>
                                        <li><Link to={constant.component.GreenlamindustriesAboutUs.url}>About Us</Link></li>
                                        <li><Link to={constant.component.GreenlamindustriesLife.url}>Life @ Greenlam Industries</Link></li>
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
                                        <div className="swiggy-about-box">
                                            <h2>About Greenlam Industries</h2>
                                            <p>Greenlam is among the world’s top 3, Asia’s largest and India’s No. 1 surfacing solutions brand. With its presence in over 100 countries, Greenlam has focused on developing quality products with great passion for innovation. It offers end to end surfacing solutions spread across laminates, compacts, Interior and exterior cladding, restroom cubicles & locker solutions, decorative veneers, engineered wooden floors and engineered wooden doors & frames to choose from. With two state-of-the-art manufacturing facilities in the country, it is the first choice of architects, interior designers and home owners when it comes to transforming living spaces.</p>
                                            <p>We work in harmony with our environment. Greenlam thinks and acts to save and preserve nature in its pristine form by ethical sourcing of its raw materials from the world over. Coupled with this, the products are FSC®-C100034, Greenguard, NSF certified and are Anti-bacterial, thereby ensuring they are environment friendly and safe to use. With robust team of over 14,000 distributors and dealers along with more than 500 sales professionals, Greenlam is just a call away to give your spaces a new look.</p>
                                        </div>

                                        <div className='swiggy-benefits-box mb-3'>
                                            <div className="swiggy-benefits-head">
                                                <h3>Benefits reported by employees</h3>
                                            </div>
                                            <div className="rg-feature-full-width px-4">
                                                <Slider {...featuredsettings}>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={cafeteriaIcon} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Health Insurance</h3>
                                                                        {/* <span> (20)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={jobsTra1ningIcon} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Job Training</h3>
                                                                        {/* <span> (20)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={freefood} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Soft Skill Training</h3>
                                                                        {/* <span> (50)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={transporticon} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Team Outings</h3>
                                                                        {/* <span> (18)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={transporticonFree} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Free Transport</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={childCare} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Child care</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={workFromHome} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Work From Home</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={educationAssistance} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Education Assistance</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={gymnasium} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Gymnasium</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={cafeteriaFIcon} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Cafeteria</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={foodFreeIcon} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>Free Food</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15">
                                                                <div className="rg-companycontent text-center">
                                                                    <img className='swiggy-facility-icon' src={relocation} />
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <h3 className='m-0 swiggy-facility-size'>International Relocation</h3>
                                                                        {/* <span> (65)</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                </Slider>
                                            </div>
                                        </div>


                                        <div className='swiggy-com-info my-2  mb-4'>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <h3 className='pb-2'>More Information</h3>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-6">
                                                            <div className="roz-more-informaiton swiggy-more-info-text">
                                                                <span>Type:</span>
                                                                <span>Private</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-6">
                                                            <div className="roz-more-informaiton swiggy-more-info-text">
                                                                <span>Company Size:</span>
                                                                <span>1000-5000</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-6">
                                                            <div className="roz-more-informaiton swiggy-more-info-text">
                                                                <span>Founded</span>
                                                                <span>2013 (10 yrs old)</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-6">
                                                            <div className="roz-more-informaiton swiggy-more-info-text">
                                                                <span>Headquarters</span>
                                                                <span>Delhi/NCR, Delhi, India</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='swiggy-benefits-box mb-3'>
                                            <div className="swiggy-benefits-head">
                                                <h3>Life at Greenlam Industries</h3>
                                            </div>
                                            <div className="rg-feature-full-width green-slider px-4">
                                                <Slider {...featuredsettings}>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15 p-0">
                                                                <div className="rg-companycontent text-center p-0">
                                                                    <img className='swiggy-facility-icon' src={pic04} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15 p-0">
                                                                <div className="rg-companycontent text-center p-0">
                                                                    <img className='swiggy-facility-icon' src={pic03} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15 p-0">
                                                                <div className="rg-companycontent text-center p-0">
                                                                    <img className='swiggy-facility-icon' src={pic02} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        <div className='col-md-12 mob-pad-0'>
                                                            <div className="rg-featurejob job-slice mb-15 p-0">
                                                                <div className="rg-companycontent text-center p-0">
                                                                    <img className='swiggy-facility-icon' src={pic01} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                </Slider>
                                            </div>
                                        </div>

                                        <div className="jobs-at-swiggy-box">
                                            <div className="swiggy-boxshow pt-2">
                                                <div className="row">
                                                    <div className="pb-2">
                                                        <h3>Jobs at Greenlam Industries</h3>
                                                    </div>

                                                    <div className="rg-featurejobs">
                                                        {swiggy?.jobs?.list.map((item, index) => {
                                                            const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
                                                            const dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                            if (index <= 3) {
                                                                return (
                                                                    <div class="rg-featurejob">
                                                                        <div class="rg-companycontent">
                                                                            <figure class="roz-companydetaillogo">
                                                                                <a href="#">
                                                                                    {item.COMPANY_LOGO === 'NA' ? <h3>{nameInitial}</h3> : <a href={dynamicURL} target='_blank'><img src={`${process.env.REACT_APP_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt="image description" /></a>}
                                                                                </a>
                                                                            </figure>
                                                                            {/* <div class="rg-companyhead">
                                                            <div class="rg-rightarea"><a class="rg-tagfeature" href="javascript:void(0);"><i class="fa fa-bookmark"></i> Save</a></div>
                                                        </div> */}
                                                                            <div class="rg-detailopensjobs">
                                                                                <h3><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h3>
                                                                                <h6 style={{ fontSize: '13px' }}>{item.COMPANY_NAME}</h6>
                                                                                <div class="jobcompanyreviewbox"><a href="#"></a><span class="reviewnumber">
                                                                                    <i class="fa fa-star"></i></span><a href="#"><span class="reviewlink">(
                                                                                        0 {" "}
                                                                                        Reviews)</span></a></div>
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
                                                            }

                                                        })}
                                                    </div>
                                                    <div class="view-all-openings pb-1 text-right">
                                                        <Link to={constant.component.GreenlamindustriesJobs.url}>View All Openings</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swiggyon-web">
                                            <div className="swiggyon-web-head">Greenlam Industries on the web</div>
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
                                            <div className="swiggy-tech-stack-head">Greenlam Industrie's Tech Stack</div>
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
                                                    <h3>Want to work at Greenlam Industries?</h3>
                                                    <img style={{ maxWidth: "150px" }} src={swiggylogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <Link to={constant.component.GreenlamindustriesJobs.url}>Apply to jobs</Link>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <img src={swiggylogoapp} />
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
                                                        <Link to={constant.component.GreenlamindustriesJobs.url}>View All Openings</Link>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <img
                                                            src={add04}
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
