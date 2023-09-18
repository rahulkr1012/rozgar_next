import React, { Component } from 'react'
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import careerReport3 from 'src/assets/images/career-report-year3.jpg'
import constant from 'constant';
import Image from 'next/image';

export default class CareerReport3Year extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        document.title = constant.title.careerReport3Year
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
                                        <h1 className='text-center'>Career Report 3 Year</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Career Report 3 Year</a></li>
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
                                        <div className='asto-images-bx'><Image src={careerReport3} alt='Image' /></div>
                                        <h4>Career Report 3 Year For Most Accurate Career Solutions For Three Years</h4>
                                        <h5>A Complete Solution Package – Career Report 3 Years</h5>
                                        <p>Want to know your career scenarios for the next 3 years? Find the solution here with our Career Report 3 Year, you would be guided with the best astrological suggestions and predictions for the next 3 years on quarterly basis regarding the favourable & unfavourable outcomes along with the apt Remedies to improve career scenarios or reduce the hindrances.</p>
                                        <p>Achieve success with our services consisting of Strength Reading For Career, Career Ask 1 Question, Career Ask 3 Question etc. Choose the one that suits your life’s purpose of obtaining remedial solutions for anything troublesome or upsetting, on the front of career, business, relationship or others.</p>


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
