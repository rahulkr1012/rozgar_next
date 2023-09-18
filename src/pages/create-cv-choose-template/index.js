
import React, { Component } from 'react'
import Link from 'next/link';
import Slider from "react-slick";
import Head from 'next/head';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'; 
import resume01 from 'src/assets/img/demos/demo-1.png';
import resume02 from 'src/assets/img/demos/demo-2.png';
import resume03 from 'src/assets/img/demos/demo-3.png';
import resume04 from 'src/assets/img/demos/demo-4.png';
import resume05 from 'src/assets/img/demos/demo-5.png';
import resume06 from 'src/assets/img/demos/demo-6.png';
import resume07 from 'src/assets/img/demos/demo-7.png';
import { capFirstLetterInSentence } from 'utils';
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
import FilteredHeader from 'components/Filtered_Header'

import checkright from 'src/assets/img/icons/check.png';
import resumecv from 'src/assets/img/core-img/cv.png';
import custmoricon from 'src/assets/img/core-img/custom.png';

import testimonal01 from 'src/assets/img/test-img/1.jpg';
import testimonal02 from 'src/assets/img/test-img/2.jpg';
import testimonal03 from 'src/assets/img/test-img/3.jpg';
import constant from 'constant';
import { getStorage } from 'utils';
import { getLoggedInUserData } from 'nextCookie';
import { withRouter } from 'next/router';


class ResumeChooseTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
             ud:this.props.ud ,
            candidateID: this.props.ud!=null?JSON.parse(this.props.ud[constant.keys.cd]) : '',
        }
    }

  render() {
     
    const lpFeaturedJobs = {
        dots: false , infinite: true , speed: 500 , autoplay: false ,
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

    };

    const { candidateID } = this.state

    return (
      <React.Fragment>
 
      <Head>
      <title
  >
    Choose Resume Templates - Create Free CV - Rozgar.com 
  </title>
  <meta name="HandheldFriendly" content="True" />
 
  <meta
    name="description"
    content={
      " Choose the best templates for your resume at Rozgar.com. Edit your resume with the best resume templates. Get best resume templates for your CV."
    }
  />
   {/*   <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} /> */ } 
  <meta name="referrer" content="no-referrer-when-downgrade" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* og meta tag */}
  <meta property="og:site_name" content="Rozgar.com" />
  <meta
    property="og:title"
    content={"Choose Resume Templates - Rozgar.com"}
  />
  <meta
    property="og:description"
    content={
      " Choose the best templates for your resume at Rozgar.com. Edit your resume with the best resume templates. Get best resume templates for your CV"
    }
  />
  <meta property="og:url" content={"https://rozgar.com"+this.props.router.asPath} />
  <meta
    property="og:image"
    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
  />
  <meta property="og:image:width" content="4000" />
  <meta property="og:image:height" content="6000" />

  {/* Twitter Meta Tag */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content={"Choose Resume Templates - Rozgar.com"}
  />
  <meta
    name="twitter:description"
    content={
      " Choose the best templates for your resume at Rozgar.com. Edit your resume with the best resume templates. Get best resume templates for your CV."
    }
  />
  <meta name="twitter:url" content={"https://rozgar.com"+this.props.router.asPath} />
  <meta
    name="twitter:image"
    content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
  />
  <meta name="twitter:label1" content="Written by" />
  <meta name="twitter:data1" content="Smita Nag" />
  <meta name="twitter:label2" content="Filed under" />
  <meta name="twitter:data2" content="Career Advice, Career Insights" />
  <meta name="twitter:site" content="@rozgar_india" />
  <link rel="canonical" href={"https://rozgar.com"+this.props.router.asPath} />
    
    </Head> 


       
       <FilteredHeader  ud={this.state.ud} />


     {   <section className="demo section-padding-50 pb-10 ring-bg" id='createtemplate'>
                      <div className='container'>
                            <div className="section-heading text-center" style={{marginTop:"100px"}}>
                                <div className="dream-dots justify-content-center">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </div>
                                <h2 className="bold">Our Creative Templates</h2>
                                <p>Pick a resume template, fill it out, and format. Create a professional resume in a few clicks. Just choose one of 18+ resume templates below, add ready-made content, download, and get the job.</p>
                            </div> 
                             
                            <div className='resume-slider-section' style={{marginBottom:"50px"}}>
                               <Slider {...lpFeaturedJobs} > 
                                    <div className="col slider-item">
                                        <div className="demo-item">
                                            <Link href="" >
                                            <Image src={resume01}
                                             alt="demo"
                                              className="img-responsive"
                                               />
                                               </Link>
                                            <div className="preview-btn-wrapper text-center">
                                                <Link href={constant.component.ResumeViewOne.url}
                                                 className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                     
                                    <div className="col slider-item"> 
                                        <div className="demo-item">
                                            <a href=""><Image src={resume02} alt="demo" className="img-responsive" /></a>
                                            <div className="preview-btn-wrapper text-center">
                                                <Link href={constant.component.ResumeViewTwo.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                     
                                    <div className="col slider-item">
                                        <div className="demo-item">
                                            <a href=""><Image src={resume03} alt="demo" className="img-responsive" /></a>
                                            <div className="preview-btn-wrapper text-center">
                                              
                                            <Link href={constant.component.ResumeViewThree.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col slider-item">
                                            <div className="demo-item">
                                                <Link href=""><Image src={resume04} alt="demo" className="img-responsive" /></Link>
                                                <div className="preview-btn-wrapper text-center">
                                                 
                                                    <Link href={constant.component.resumeTemplate2.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <a href=""><Image src={resume05} alt="demo" className="img-responsive" /></a>
                                                <div className="preview-btn-wrapper text-center">
                                                    
                                                    <Link href={constant.component.ResumeTemplateView03.url} 
                                                    className="preview-demo v2"
                                                     style={{ padding: "8px 10px" }}> Use template
                                                      <i className="fa fa-long-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <a href=""><Image src={resume06} alt="demo" className="img-responsive" /></a>
                                                <div className="preview-btn-wrapper text-center">
                                                    <Link href={constant.component.ResumeTemplateView02.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col slider-item">
                                            <div className="demo-item">
                                                <Link href="">
                                                  <Image src={resume07} alt="demo" className="img-responsive" />
                                                </Link>
                                                <div className="preview-btn-wrapper text-center">
                                                    <Link href={constant.component.resumeTemplate1.url} className="preview-demo v2" style={{ padding: "8px 10px" }}>Use template <i className="fa fa-long-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>    
                            
                            </div> 
                      </div>
    </section> }
     

      </React.Fragment>
    )
  }
}



export default  withRouter(ResumeChooseTemplate)






export async function getServerSideProps(context) {
    let {req} = context
    let ud =  getLoggedInUserData(req)
    
    return {
         props:{
             ud
         }
    }

}

