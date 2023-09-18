import React, { Component } from 'react'
import constant from 'constant'
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import careerReport2 from 'src/assets/images/career-report-year2.jpg'
import Head from 'next/head'
import Image from 'next/image'

export default class CareerReport2Year extends Component {
    render() {
        return (
            <React.Fragment>
              
                <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
                    <div className='breadcrumb-banner-area header-inner-astrology'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='breadcrumb-text'>
                                        <h1 className='text-center'>Career Report 2 Year</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Career Report 2 Year</a></li>
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
                                        <div className='asto-images-bx'><Image src={careerReport2} alt='Image' /></div>
                                        <h4>Career Report 2 Year For Best Results And Success In Chosen Career</h4>
                                        <h5>Get Accurate Career Report 2 Years</h5>
                                        <p>Are you looking forward your career scenarios/planning for the next 2 years? You can order our Career Report 2 Year Astrology Services, wherein you would be assisted with the favourable and unfavourable periods on quarterly basis to plan things accordingly along with the apt astrological remedial measures & suggestion to have good rewards, promotion and increment in your income for the next 2 years.</p>
                                        <p>Business Ask 3 Question, Career Report 1 Year, Remedial Solution for Career are astrological solutions meant to address your life’s problems on the front of business or career or anything else. Astrological report or answers given by our famous astrologer lead you to a better understanding of your situation by improving your conscience, turning bad situations in your favor and giving the coveted success.</p>


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
