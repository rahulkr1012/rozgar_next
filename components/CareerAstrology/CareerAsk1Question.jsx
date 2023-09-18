import React, { Component } from 'react'
import constant from 'constant'
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import careerQuestion from 'src/assets/images/career-ask-question.jpg'
import Image from 'next/image'

export default class CareerAsk1Question extends Component {
    render() {
        return (
            <React.Fragment>

                <main id="rg-main" className="rg-main rg-haslayout pt-0 ">
                    <div className='breadcrumb-banner-area header-inner-astrology'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='breadcrumb-text'>
                                        <h1 className='text-center'>Career Ask 1 Question</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Career Ask 1 Question</a></li>
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
                                        <div className='asto-images-bx'><Image src={careerQuestion} alt='Image' /></div>
                                        <h4>Career Ask 1 Question For Answer To Remove Career Confusion And Doubts</h4>
                                        <h5>Ask Career Question Paving The Path For Glorious Success</h5>
                                        <p>Career Ask 1 Question and its answer given by expert astrologer, Pt. Umesh Chandra Pant will open the various avenues for growth, promotion and success in your chosen career endeavor. Question related to what underscores the problematic point of your professional activity can be asked to our astrologer. The answer of the same will be given to you after proper analysis of your horoscope keeping astrological factors in mind. Get career Ask 1 Question report.</p>
                                        <p>Career Report 5 Years, Business Ask 1 Question, Business Ask 3 Question are some of the services that we offer to make sure your questions are answered or you get astrological report containing fine solutions for your life’s varying issues. Solutions that you get from our astrologer aim at solving the root cause of your life’s problems, thus heling you attain good fortune, and other accomplishments in life.</p>


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
