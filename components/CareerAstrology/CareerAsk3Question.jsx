import React, { Component } from 'react'
import constant from 'constant';
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import CareerQuestion3 from 'src/assets/images/career-ask-question3.jpg'
import Image from 'next/image';

export default class CareerAsk3Question extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        document.title = constant.title.careerAsk3Question
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
                                        <h1 className='text-center'>Career Ask 3 Question</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Career Ask 3 Question</a></li>
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
                                        <div className='asto-images-bx'><Image src={CareerQuestion3} alt='Image' /></div>
                                        <h4>Career Ask 3 Questions For New Insights Into Your Chosen Profession</h4>
                                        <h5>Get The Answer Of Your Career Questions To Create Positive Headway</h5>
                                        <p>For questions related to any aspect of your professional activities, choose our Career Ask 3 Questions for the remedial answers which will work in your situation positively. The answers to your questions are based on our astrologer’s acute analysis of your current situation. Besides, you can choose your Ask 3 Question from the troubling aspect of your career.</p>
                                        <p>Career Report 1 Year, Remedial Solution for Career, Strength Reading For Career are some of the astrological services that we make available at the most affordable price. Each of these services has its respective benefits for you. Consult our astrologer to get recommended to a better option for you based on your life’s ongoing problems.  </p>


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
