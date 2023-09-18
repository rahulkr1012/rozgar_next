import React, { Component } from 'react'
import constant from 'constant';
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import remedialImage from 'src/assets/images/remedial-solution-career.jpg'
import Head from 'next/head';
import Image from 'next/image';

export default class RemedialSolutionForCareer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    
    componentDidMount() {
        document.title = constant.title.remedialSolutionForCareer
    }
     
     

    render() {
        return (
            <React.Fragment>
             
                <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
                    <div className='breadcrumb-banner-area header-inner-astrology'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='breadcrumb-text'>
                                        <h1 className='text-center'>Remedial Solution for Career</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Remedial Solution for Career</a></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className='main-section-box '>
                        <div className='container'>
                            <div className='row'>

                                <div className='col-md-8'>
                                    <div className='content-main-box'>
                                        <div className='asto-images-bx'><Image src={remedialImage} alt='Image' /></div>
                                        <h4>The Ultimate And Trusted Remedial Solution For Career For You</h4>
                                        <h5>Remedial Solution For Career Using Best Gemstone You Should Wear.</h5>
                                        <p>Get remedial solution for career or career problem solutions based on your astrological chart. Career remedies offered by Astrologer Umesh can be deemed potentially useful for your chosen career, in terms of bringing desired growth in it and helping you experience promotion and growth in salary and designation etc. Our Remedial Solutions for Career or Career Remedies involve deep study of your planets and their transits, plus consideration of other factors as per Vedic Astrology principles. Based on study and result thereafter, recommendation about career Gemstone you should wear, and other effective astrological tips for career growth will be given to you.</p>
                                        <p>Our famous astrologer offers constructive solutions through services such as Career Ask 3 Question, Business Report 1 Year, Remedial Solution for Business. Problem originating from any source of your life, our astrologer can address the same with efficient remedial measure. Consult for more details and guidance.</p>


                                    </div>

                                </div>

                                {<CareerAstrologyRightSection />}

                            </div>
                        </div>
                    </section>

                </main>
            </React.Fragment>
        )
    }
}
