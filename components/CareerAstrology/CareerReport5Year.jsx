import React, { Component } from 'react'
import constant from 'constant';
import CareerAstrologyRightSection from './CareerAstrologyRightSection'
import careerReport5 from 'src/assets/images/career-report-year5.jpg'
import Image from 'next/image';

export default class CareerReport5Years extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        document.title = constant.title.careerReport5Years
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
                                        <h1 className='text-center'>Career Report 5 Years</h1>
                                        <ol className='breadcrumb-list-bx'>
                                            <li><a href={constant.component.homepage.url}>Home</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology Services</a></li>


                                            <li><a href=''>Career Report 5 Years</a></li>
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
                                        <div className='asto-images-bx'><Image src={careerReport5} alt='Image' /></div>
                                        <h4>Get Rewarding Career Solutions For Five Years With Career Report 5 Years,</h4>
                                        <h5>Detailed Solutions With Career Report 5 Years</h5>
                                        <p>Career Report 5 Year is a perfect report for those looking forward for planning & preparing strategy in their career based on the favourable & unfavourable periods for the next 5 years along with accurate Astrological Guidance and predictions.</p>
                                        <p>Business Report 1 Year, Remedial Solution for Business, Strength Reading for Business are our astrological solutions offered to you when you consult our famous astrologer. Astrological report consists of useful answers, guidance and reading to improve your understanding of situations around you and prompt you how to get success through remedial measures as described in the report.</p>


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
