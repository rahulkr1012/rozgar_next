import React from 'react'
import constant from 'constant'
import careerReport1 from 'src/assets/images/career-report-year1.jpg'
import Image from 'next/image'
import CareerAstrologyRightSection from './CareerAstrologyRightSection'

export default function CareerReport1Year() {
  return (
    <React.Fragment>
   


    <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
        <div className='breadcrumb-banner-area header-inner-astrology'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Career Report 1 Year</h1>
                            <ol className='breadcrumb-list-bx'>
                                <li><a href={constant.component.homepage.url}>Home</a></li>
                                <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                <li><a href=''>Career Report 1 Year</a></li>
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
                            <div className='asto-images-bx'><Image src={careerReport1} alt='Image' /></div>
                            <h4>Growth and Success With Comprehensive Career Predictions.</h4>
                            <h5>Rewarding Professional Career Report 1 Year</h5>
                            <p>Want to see growth and success in your chosen career? Well, Career Horoscope Report, career astrology report, and Comprehensive Career Predictions are designed to ensure that your chosen endeavors in professional area get success and desired growth. Our Career Horoscope report consists of planetary information related to cosmic energies, celestial bodies and their relative impacts on your career. This further explains as to why growth in your chosen career doesn’t happen. With comprehensive career solution offered by our educated astrologer, you can make an inroad to your career’s success. We offer trusted and composite Career Report 1 Year containing guidance and effective remedial measures to succeed your career.</p>
                            <p>Our renowned astrologer is the solution in the form of Remedial Solution for Career, Strength Reading For Career, Career Ask 1 Question so that you can get covered solutions for your career related problems. Get your questions answered and find the direction of how to choose a right career or make the one growth-centric for you.</p>


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
