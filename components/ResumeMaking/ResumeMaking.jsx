import React from 'react'
import constant from 'constant'
 import styles from '@/styles/resume.module.css';

import resume01 from 'src/assets/img/demos/demo-1.png'
import resume02 from 'src/assets/img/demos/demo-2.png'
import resume03 from 'src/assets/img/demos/demo-3.png'
import resume04 from 'src/assets/img/demos/demo-4.png'
import resume05 from 'src/assets/img/demos/demo-5.png'
import resume06 from 'src/assets/img/demos/demo-6.png'
import resume07 from 'src/assets/img/demos/demo-7.png'

import servicepic01 from 'src/assets/img/icons/f1.png';
import servicepic02 from 'src/assets/img/icons/f2.png';
import servicepic03 from 'src/assets/img/icons/f3.png';
import servicepic04 from 'src/assets/img/icons/f4.png';
import servicepic05 from 'src/assets/img/icons/f5.png';
import servicepic06 from 'src/assets/img/icons/f6.png';
import dollarsys from 'src/assets/img/svg/img-dollar.svg';
import bannerrm from 'src/assets/img/core-img/banner2.png';

import easyonline from 'src/assets/img/icons/easyonline.png';
import stepbystep from 'src/assets/img/icons/stepbystep.png';
import recruitera from 'src/assets/img/icons/recruitera.png';
import checkright from 'src/assets/img/icons/check.png';
import resumecv from 'src/assets/img/core-img/cv.png';
import custmoricon from 'src/assets/img/core-img/custom.png';

import testimonal01 from 'src/assets/img/test-img/1.jpg';
// import testimonal02 from 'src/assets/img/test-img/2.jpg';
// import testimonal03 from 'src/assets/img/test-img/3.jpg';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
  
export default function ResumeMaking(props) {
    const [state, setstate] = React.useState({
        ud:props.ud
   });

   const lpFeaturedJobs = {
        dots: false, infinite: true, speed: 500, autoplay: false,
        slidesToShow: 3, slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
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

    }
    
     let candidateID = undefined
     if( state.ud!==null ) {
         candidateID  = state.ud.candidateID
     } 
    
     
  return (
    <React.Fragment>
    <section className={`${styles['welcome_area']} ${styles["demo2"]} ${styles["align-items-center"]} flex "`}>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6 col-md-12">
                    <div className={`${styles["welcome-content"]} ${styles["v2"]}`}>
                        <div className={styles["promo-section"]}>
                            <div className={`${styles["integration-link"]} ${styles["light"]}`}>
                                <span className={styles["integration-icon"]}>
                                    <Image
                                     width={24}
                                     height={24}
                                     src={dollarsys}  alt="" />
                                </span>
                                <span className={styles["integration-text"]}>Discover The Easiest ways to Build Your CV!</span>
                            </div>
                        </div>
                        <h1 className="wow fadeInUp" data-wow-delay="0.2s">Online <span style={{ color: '#e81c28' }}>Resume Maker</span> With Creative Templates.</h1>
                        <p className="wow fadeInUp" data-wow-delay="0.3s">Our Perfect resume maker takes the hassle out of resume writing for a better opportunity. Choose from several templates and follow easy prompts to create the perfect job-ready resume for both experienced and fresher candidates. Easy to customise, feedback options, templates for every domain, and so much more can be offered with an online resume maker. </p>                        
                        <div
                        className="dream-btn-group wow fadeInUp"
                        data-wow-delay="0.4s" >
                        <Link
                          href={constant.component.ResumeForm.url}
                          className={`${styles['dream-btn']} ${styles["green-btn"]} ${styles["mr-3"]} "`}
                        >
                          Create CV
                        </Link>
                        {/* <Link to={constant.component.register.url}>Sign Up</Link> */}
                        {/* <a href={constant.component.register.url} className="dream-btn green-btn"> Sign up</a> */}
                      </div>



                    </div>
                </div>
                <div className="col-12 col-lg-6 col-md-12">
                    <div className={styles["banner-box"]}>
                        <Image
                         width={1000}
                         height={1000}
                         src={bannerrm} alt=""    
                         />
                    </div>
                </div>

            </div>
        </div>
    </section>

    <div className="clearfix"></div>

    <section className={`${styles["demo-video"]} ${styles["feat"]} ${styles["section-padding-50"]} ${styles["bub-left"]}`}>
        <div className="container">

            <div className="row align-items-center">

                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className={styles["services-block-four"]}>
                        <div className={styles["inner-box"]}>
                            <div className={styles["icon-img-box"]}>
                                <Image
                                
                                src={easyonline} alt="" />
                            </div>
                            <h3><a href="javascript:vioid();">Easy Online Resume Builder</a></h3>
                            <div className="text">Create a professional resume with the Rozgar resume builder online in 3 steps. Browse our templates, then easily build and share your resume.</div>
                        </div>
                    </div>
                    <div className={styles["services-block-four"]}>
                        <div className={styles["inner-box"]}>
                            <div className={styles["icon-img-box"]}>
                                <Image
                                 
                                 src={stepbystep} alt="" />
                            </div>
                            <h3><a href="javascript:vioid();">Step By Step Expert Tips</a></h3>
                            <div className="text">Our Expert tips on tailoring your resume for your specific industry. Get recognized by premium employers.</div>
                        </div>
                    </div>
                    <div className={styles["services-block-four"]}>
                        <div className={styles["inner-box"]}>
                            <div className={styles["icon-img-box"]}>
                                <Image
                                
                                 src={recruitera} alt="" />
                            </div>
                            <h3><a href="javascript:vioid();">Free Download from Dashboard</a></h3>
                            <div className="text">That's right: Free. No catch, No paywall when its time to download your resume. It will be available in your Rozgar account.</div>

                        </div>
                    </div>

                </div>
                <div className="col-12 col-lg-6">
                    <div className={`${styles["who-we-contant"]} mt-s`}>
                        <div className={styles["dream-dots"]}>
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <h2>Why Choose Our Platform?</h2>
                        <p>The Rozgar.com resume builder stands out from the rest, but not only because we’re the only truly free resume builder out there. We also offer:</p>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>Access to dozens of professional and creative resume templates.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>Editing tools you can use directly on our platform.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>Ability to download and print resumes instantly.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>Downloads available in PDF, Word, RTF, and plain text formatting.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>Unlimited sharing over email and social media.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles["side-feature-list-item"]}>
                                <Image
                                 width={25}
                                 height={20}
                                 src={checkright} className={styles["check-mark-icon"]} alt="" />
                                <div className={styles["foot-c-info"]}>24/7/365 access to your resume through your resume.com account.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className={`${styles["about-us-area"]} ${styles["section-padding-50"]} ${styles["clearfix"]}`}>
        <div className="container">
            <div className="row align-items-center">

                <div className="col-12 col-lg-6">
                    <div className={styles["who-we-contant"]}>
                        <div className={styles["dream-dots"]}>
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <h2 className="bold">We Deliver The Best</h2>
                        <div className="list-wrap align-items-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Proven CV Templates to increase Hiring Chance</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Creative and Clean Templates Design</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Easy and Intuitive Online CV Builder</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Free to use. Developed by hiring professionals.</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Fast Easy CV and Resume Formatting</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles["side-feature-list-item"]}>
                                        <Image
                                         width={25}
                                         height={20}
                                         src={checkright} className={styles["check-mark-icon"]} alt="" />
                                        <div className={styles["foot-c-info"]}>Recruiter Approved Phrases.</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class={`${styles["welcome-meter"]} ${styles["wow"]} ${styles["fadeInUp"]}`} mt-s data-wow-delay="0.3s">
                        <Image
                       
                         src={resumecv} class="center-block" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="clearfix"></div>

    <section className={`container ${styles["section-padding-0-100"]}`}>
        <div className={styles["subscribe"]}>
            <div className="row align-items-center relative">
                <div className="col-lg-3 col-lg-offset-3 col-md-9 col-xs-12">
                    <Image
                    
                     src={custmoricon} alt="" className={styles["custom"]} />
                </div>
                <div className="col-lg-6 col-lg-offset-3 col-md-9 col-xs-12">
                    <h2 className="bold mb-0">Free Resume Templates - Create a Resume in Minutes</h2>
                    <p>Jump Start Your Job Search w/ India's Leading <b>Resume Builder.</b> Make a Free <b>Resume</b> Now! Make a Job-Winning <b>Resume in Minutes.</b> No Writing Experience Required.</p>
                </div>
                <div className="col-lg-3 col-lg-offset-1 col-md-3 col-sm-12 text-center">
                    <a href="/resume-form"  className={`${styles["button"]} mt-s"`}>Get Started Now!</a>
                </div>

            </div>
        </div>
    </section>
   
    <section className={`${styles["demo"]} ${styles["section-padding-50"]} pb-10 ${styles["ring-bg"]} id='createtemplate'`}>
        <div className="container">
            <div className={`${styles["section-heading"]} text-center`}>
                <div className={`${styles["dream-dots"]} justify-content-center`}>
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <h2 className="bold">Our Creative Templates</h2>
                <p>Pick a resume template, fill it out, and format. Create a professional resume in a few clicks. Just choose one of 18+ resume templates below, add ready-made content, download, and get the job.</p>
            </div>
            <div className='resume-slider-section'>
                            <Slider {...lpFeaturedJobs} > 
                                    <div className="col slider-item">
                                        <div className="demo-item">
                                            <Link href=""><Image 
                                            src={resume01} alt="demo" className="img-responsive" /></Link>
                                            {/* <div className="preview-btn-wrapper text-center" >
                                                <Link href={constant.component.TemplatePreview.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></Link>
                                                { <Link href={candidateID ? constant.component.updateTemplate01.url : constant.component.TemplateEdit.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col slider-item">
                                        <div className="demo-item">
                                            <a href=""><Image
                                             src={resume02} alt="demo" className="img-responsive" /></a>
                                            {/* <div className="preview-btn-wrapper text-center">
                                                <Link href={constant.component.TemplatePreview01.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></Link>
                                             
                                                { <Link href={candidateID ? constant.component.updateTemplate02.url : constant.component.TemplateEdit01.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                                 
                                           
                                                 </div> */}
                                        </div>
                                    </div>
                                    <div className="col slider-item">
                                        <div className="demo-item">
                                            <a href=""><Image
                                             src={resume03} alt="demo" className="img-responsive" /></a>
                                            {/* <div className="preview-btn-wrapper text-center">
                                                <a href={constant.component.TemplatePreview02.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></a>
                                                { <Link href={candidateID ? constant.component.updateTemplate03.url : constant.component.TemplateEdit02.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col slider-item">
                                            <div className="demo-item">
                                                <Link href=""><Image src={resume04} alt="demo" className="img-responsive" /></Link>
                                                {/* <div className="preview-btn-wrapper text-center">
                                                    <a href={constant.component.TemplatePreview04.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></a>
                                                    { <Link href={candidateID ? constant.component.updateTemplate04.url : constant.component.TemplateEdit04.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <a href=""><Image src={resume05} alt="demo" className="img-responsive" /></a>
                                                {/* <div className="preview-btn-wrapper text-center">
                                                    <a href={constant.component.TemplatePreview05.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></a>
                                                    { <Link href={candidateID ? constant.component.updateTemplate05.url : constant.component.TemplateEdit05.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <a href=""><Image src={resume06} alt="demo" className="img-responsive" /></a>
                                                {/* <div className="preview-btn-wrapper text-center">
                                                    <a href={constant.component.TemplatePreview06.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></a>
                                                    { <Link href={candidateID ? constant.component.updateTemplate06.url : constant.component.TemplateEdit06.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <Link href=""><Image src={resume07} alt="demo" className="img-responsive" /></Link>
                                                {/* <div className="preview-btn-wrapper text-center">
                                                    <a href={constant.component.TemplatePreview07.url} className={styles["preview-demo"]}>See template <i className="fa fa-long-arrow-right"></i></a>
                                                    { <Link href={candidateID ? constant.component.updateTemplate07.url : constant.component.TemplateEdit07.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link> }
                                                </div> */}
                                            </div>
                                        </div>
                                    </Slider>    
                            
                            </div>

           
        </div>
    </section>

    <section className="our_services_area section-padding-100-70" id="services">
        <div className="container">

            <div className={`${styles["section-heading"]} text-center`}>
                <div className="dream-dots justify-content-center wow fadeInUp" data-wow-delay="0.2s">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <h2 className="wow fadeInUp" data-wow-delay="0.3s">Our Main Features</h2>
                <p className="wow fadeInUp" data-wow-delay="0.4s">Start building your resume today, land your dream job tomorrow</p>
            </div>


            <div className="row">
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className={`${styles["service_single_content"]} text-center mb-100 wow fadeInUp`} data-wow-delay="0.2s">

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190}
                             src={servicepic01} alt="" />
                        </div>
                        <h6>Proven CV Templates to increase<br />Hiring Chance</h6>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">

                    <div className={`${styles["service_single_content"]} text-center mb-100 wow wow fadeInUp data-wow-delay="0.3s"`}>

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190}
                             src={servicepic02} alt="" />
                        </div>
                        <h6>Creative, Modern and Clean<br />Templates Design</h6>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">

                    <div className={`${styles["service_single_content"]} text-center mb-100 wow fadeInUp" data-wow-delay="0.4s"`}>

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190}
                             src={servicepic03} alt="" />
                        </div>
                        <h6>Easy and Intuitive Online CV<br />and Resume Builder </h6>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">

                    <div className={`${styles.service_single_content} text-center mb-100 wow fadeInUp data-wow-delay="0.5s"`}>

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190}
                             src={servicepic04} alt="" />
                        </div>
                        <h6>It's Fast and Easy to Use. Download<br />with a single click. Land that dream job.</h6>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">

                    <div className={`${styles["service_single_content"]} text-center mb-100 wow fadeInUp`} data-wow-delay="0.6s">

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190} 
                             src={servicepic05} alt="" />
                        </div>
                        <h6>Recruiter Approved Phrases with<br />Module Notification</h6>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">

                    <div className={`${styles["service_single_content"]} text-center mb-100 wow fadeInUp" data-wow-delay="0.7s"`}>

                        <div className={styles["service_icon"]}>
                            <Image
                            //  width={270}
                            //  height={190}
                             src={servicepic06} alt="" />
                        </div>
                        <h6>Fast Easy CV and Resume<br />Formatting</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className={`${styles["section-padding-0-70"]} clients_testimonials_area`}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={`${styles["section-heading"]} text-center`}>
                        <div className={`${styles["dream-dots"]} justify-content-center`}>
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <h2>Your Success, Our Inspiration</h2>
                        <p>Don't just take it from us, let our users do the talking!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">

                    <div className={`${styles["single-testimonial"]} text-center"`}>
                        <div className={styles["icon_wrapper"]}>
                            <i className="fa fa-quote-right"></i>
                        </div>

                        <div className={styles["testimonial_image"]}>
                            <Image
                             width={270}
                             height={190}
                             src={testimonal01} alt="" />
                        </div>

                        <div className={styles["testimonial-description"]}>
                            <div className={styles["testimonial_text"]}>
                                <p>Excellent service and many templates are available at Rozgar Create CV. very user <br />friendly to write and edit resumes. great experience. I liked it. Highly recommended to every professional.
                                    <br /><br /></p>
                            </div>


                            <div className={styles["admin_text"]}>
                                <h5>Ajay Mehra</h5>
                                <p>Full Stack Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">

                    <div className={`${styles["single-testimonial"]} text-center"`}>
                        <div className={styles["icon_wrapper"]}>
                            <i className="fa fa-quote-right"></i>
                        </div>

                        <div className={styles["testimonial_image"]}>
                            <Image
                             width={270}
                             height={190}
                             src={testimonal01} alt="" />
                        </div>

                        <div className={styles["testimonial-description"]}>
                            <div className={styles["testimonial_text"]}>
                                <p>It was a great, interactive and easy to use tool. Helped me a lot with my CV to easily create and download. Also i became a member on rozgar.com which is amazing and getting lots of jobs to apply.... great integrated online portal with all at one place.</p>
                            </div>

                            <div className={styles["admin_text"]}>
                                <h5>Suchi Gupta</h5>
                                <p>HR Manager</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${styles["single-testimonial"]} text-center`}>
                        <div className={styles["icon_wrapper"]}>
                            <i className="fa fa-quote-right"></i>
                        </div>

                        <div className={styles["testimonial_image"]}>
                            <Image
                             width={270}
                             height={190}
                             src={testimonal01} alt="" />
                        </div>
                        <div className={styles["testimonial-description"]}>
                            <div className={styles["testimonial_text"]}>
                                <p>There are extremely helpful articles and extremely naive sites also for resume and Curriculum Vitae building,<br /> but Rozgar was the MOON shining among the STARS so I chose it. Thank you for helping me out.</p>
                            </div>
                            <div className={styles["admin_text"]}>
                                <h5>Puneet Srivastava</h5>
                                <p>Sales Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</React.Fragment>

    )
}
