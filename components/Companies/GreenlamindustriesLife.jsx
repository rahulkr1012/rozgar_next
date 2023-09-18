import React, { Component } from 'react'
import greenlamlife1pic from '../../src/assets/images/Greenlam/greenlamlife1pic.jpg'
import boardofdirectors from '../../src/assets/images/Greenlam/board-of-directors.jpg'
import greenlamlogoapp from '../../src/assets/images/logo-grenlamp.png';

import values from '../../src/assets/images/Greenlam/values.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Parser from 'html-react-parser';

import healthinsurance from '../../src/assets/images/author/health-insurance.png'
import jobsTra1ningIcon from '../../src/assets/images/author/job-training-g.png'
import softskilltraining from '../../src/assets/images/author/soft-skill-training.png'

import teamoutings from '../../src/assets/images/author/team-outings.png'
import transporticonFree from '../../src/assets/images/author/transport-icon.png'
import educationAssistance from '../../src/assets/images/author/education-assistance.png'
import workFromHome from '../../src/assets/images/author/work-from-home.png'
import childCare from '../../src/assets/images/author/child-care.png'
import gymnasium from '../../src/assets/images/author/gymnasium.png'
import cafeteriaFIcon from '../../src/assets/images/author/cafeteria-icon.png'
import foodFreeIcon from '../../src/assets/images/author/free-food.png'
import relocation from '../../src/assets/images/author/relocation.png'
import Link from 'next/link';
import constant from 'constant';
import { ToSeoUrl } from 'utils';
import Image from 'next/image';

export default class GreenlamindustriesLife extends Component {
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
                                        <li><Link href={constant.component.GreenlamindustriesAboutUs.url}>About Us</Link></li>
                                        <li><Link href={constant.component.GreenlamindustriesLife.url} className='active'>Life @ Greenlam Industries</Link></li>
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

                                        <div className='worklife-swiggy'>
                                            <h1 className='worklife-swiggy-head'>Work and Life @ Greenlam Industries</h1>
                                            <div className="d-flex worklife-mobile-d-block">
                                                <div className='worklife-swiggy-box'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={greenlamlife1pic} />
                                                        <h3>About Greenlam</h3>
                                                        <p>Our success does not lie in how vast our world is; it lies in how well we have been beautifying the interiors, transforming spaces and enriching lives.

                                                            Greenlam Industries Limited has been beautifying spaces for years by infusing creativity into every piece
                                                            of work and turning it into sheer pieces of beauty and brilliance. </p>
                                                    </div>
                                                </div>
                                                <div className='worklife-swiggy-box px-4'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={boardofdirectors} />
                                                        <h3>Board of Directors </h3>

                                                        <p>Board of Directors at Greenlam Industries Ltd. Mr. Shiv Prakash Mittal(Chairman) | Mr. Saurabh Mittal(Managing Director & CEO) | Parul Mittal (Whole-Time Director) | Mr. Sandip Das(Independent Director) | Ms.Matangi Gowrishankar(Independent Director) | Mr. Yogesh Kapur
                                                            (Independent Director)</p>
                                                    </div>
                                                </div>
                                                <div className='worklife-swiggy-box'>
                                                    <div className='worklife-swiggy-pix-box'>
                                                        <Image src={values} />
                                                        <h3>Values</h3>
                                                        <p>Values that drive us at Greenlam Industries Our Core Values
                                                            To be practiced in the context of all stakeholders including employees, investors, bankers, channel partners, vendors & suppliers, the state, society at large and the environment. We value performance across products, people and process.Trust people to be reliable and responsible</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swiggy-our-benefits-box">
                                            <div className='swiggy-ben-ser-head'>Our Benefits</div>
                                            <div className='swiggy-ben-ser-text'>Job Training | Comprehensive Health Insurance Policies | Relocation Assistance | Soft Skill Training | Team Outings | Free Transport | Child care | Work From Home | Education Assistance</div>

                                            <ul className='swiggy-benefites-number'>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'> <Image className='swiggy-facility-icon' src={jobsTra1ningIcon} /></div>
                                                        <p> Job Training</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={healthinsurance} /></div>
                                                        <p>Health Insurance</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={softskilltraining} /></div>
                                                        <p>Soft Skill Training</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={teamoutings} /></div>
                                                        <p>Team Outings</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={transporticonFree} /></div>
                                                        <p>Free Transport</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={childCare} /></div>
                                                        <p>Child care</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={workFromHome} /></div>
                                                        <p>Work From Home</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={educationAssistance} /></div>
                                                        <p>Education Assistance</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={gymnasium} /></div>
                                                        <p>Gymnasium</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={cafeteriaFIcon} /></div>
                                                        <p>Cafeteria</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={foodFreeIcon} /></div>
                                                        <p>Free Food</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='sb-icons-box bgco'>
                                                        <div className='sb-icons'><Image className='swiggy-facility-icon' src={relocation} /></div>
                                                        <p>International Relocation</p>
                                                    </div>
                                                </li>
                                            </ul>
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
                                                    <h3>Want to work at Greenlam industries?</h3>
                                                    <Image style={{ maxWidth: "150px" }} src={greenlamlogoapp} />
                                                </div>
                                                <div className="swiggyjobapply">
                                                    <Link href={constant.component.Greenlamindustries.url}>Apply to jobs</Link>
                                                </div>
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className='small-swiggy-logo'>
                                                        <Image src={greenlamlogoapp} />
                                                    </div>
                                                    <div className='swiggy-job-opning'>
                                                        <h4>{count} job openings</h4>
                                                        <span className='swiggy-hiring-now'>Hiring now</span>
                                                    </div>
                                                </div>
                                                <div className="opning-jobs-swiggy">
                                                    {swiggy?.jobs?.list.map((item, index) => {
                                                        const dynamicURL =
                                                        ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
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
                                                        <a href={constant.component.GreenlamindustriesJobs.url}>View All Openings</a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="rg-adds rg-jobsearchadd">
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <Image
                                                            src={add04}
                                                            alt="Image description"
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
