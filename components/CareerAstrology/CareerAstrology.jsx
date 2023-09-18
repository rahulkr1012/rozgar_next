import React, { Component } from 'react'
import constant from 'constant'
import ModalWindow from 'components/common/ModalWindow/ModalWindow'
import zodiacImage from 'src/assets/images/zodiac.png'
import astrologyImage from 'src/assets/images/astrology-about.jpg'
import careerImage1 from 'src/assets/images/career1.jpg'
import careerImage2 from 'src/assets/images/career2.jpg'
import careerImage3 from 'src/assets/images/career3.jpg'
import careerImage4 from 'src/assets/images/career4.jpg'
import careerImage5 from 'src/assets/images/career5.jpg'
import careerImage6 from 'src/assets/images/career6.jpg'
import careerQuestionImage1 from 'src/assets/images/career-question.jpg'
import careerQuestionImage2 from 'src/assets/images/career-question2.jpg'
import shapesvgImage from 'src/assets/images/shape.svg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import serviceWrapper from 'src/assets/images/services-asto-bg.jpg' 

let SendEnquiry  = dynamic(()=>import('components/Enquiry/SendEnquiry') ,{
    ssrf:false ,
 
} )  
let  CallBackForm = dynamic(()=> import('./CallBackForm') , {
    ssr:false 
})  


export default class CareerAstrology extends Component {

     constructor(props) {
        super(props);
        this.state = {
            showModal: false ,
            whatsapp:{
                 name:'whatsapp' , error:false , required:false , value:false  
            }
        }
    }
    toggleModal = () => {
        this.setState({ showModal: false })
    }


    onhideModal = () => {
        this.setState({ showModal: false })
    }



    bgstyling = {
            position: "relative",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            paddingTop: "100px",
            paddingBottom: "100px" ,
            backgroundImage: `url(${serviceWrapper.src})`,
            backgroundRepeat: 'no-repeat' ,
            backgroundPosition: "center"

    }


    render() {
        const { showModal } = this.state
        return (
            <React.Fragment>
                
             
             {
                    showModal && <ModalWindow toggleModal={() => { this.toggleModal() }} className='CareerAstrologyModal' >
                        <CallBackForm 
                        onCancel={this.onhideModal}
                        />
                    </ModalWindow>

                }

                <main id="rg-main" className="rg-haslayout pt-0">
                    <section className='header-top-astrology'>
                        <div className='container'>
                            <div className='row top-main-banner-bx'>
                                <div className='col-md-6'>
                                    <div className='hero-astrology-content'>
                                        <div className='slide-title-sub'>
                                            <h5>India's No. 1 Online Astrology & Remedy Solution</h5>
                                        </div>
                                        <div className='slide-title'>
                                            <h1>Career Astrology Services</h1>
                                        </div>
                                        <div className='slide-text'>
                                            <p>Find Headway In The Career Of Your Preference With Career Astrology   Services</p>
                                          </div>
                                        <div className='quick-contact-box'>
                                            <span style={{ cursor: 'pointer' }} onClick={() => {
                                                this.setState({ showModal: true })
                                            }} className='quick-contact-btn'>Quick Call Back</span>


                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='right-astrology-bx'>
                                        <Image src={zodiacImage} alt='Image' />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                      <SendEnquiry />
                    <section className='layout-pt-lg layout-pb-lg'>
                        <div className='container'>
                            <div data-anim-wrap='' className='row y-gap-30 justify-between items-center animated'>
                                <div className='col-xl-7 col-lg-7 order-2 order-lg-1 about-abroad-section'>
                                    <h2 data-anim-child='slide-up delay-1' className='text-dark-1'>Career Astrology Services</h2>
                                    <h4>Find Headway In The Career Of Your Preference With Career Astrology Services</h4>

                                    <p className='mt-5 text-dark-1 mt-20 is-in-view'>If you are in pursuit of success or desired promotion or growth in your chosen professional activity or want to seek a job best suited to your personality type, then it’s high time you chose our accurate and perfectly analyzed career astrological solutions or career astrology services or career guidance meant for helping you find the most meaningful job conducive to your characteristic trait. Astrology Offer job astrological guidance and professional horoscope that combines accurate analysis of your horoscope and planetary factors so that most appropriate career solutions or career guidance or Career Astrology Services can be offered thus putting an end to your professional plight for good.</p>

                                    <p>Choose our premium services consisting of Personal Astrology Services, Finance Astrology Services, Education Astrology Services and so others made specifically for you to get the desired solution in life on the front of personal life, finance or academic pursuit. Trust the quality of solution that we offer through our services which are made available at the most competitive price.       </p>
                                    <div className='as_contact_expert'>
                                        <span className='as_icon'><i class="lnr lnr-phone-handset"></i></span>
                                        <div>
                                            <h5 className='as_black'>Contact Our Expert Astrologers</h5>
                                            <h1 className='as_orange'>+ (91)  8800277577</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-5 order-1 education-area-two '>
                                    <div className='education-Image-wrap'>
                                        <div className='education-Image-2 as_aboutImage'>
                                            <Image src={astrologyImage} alt='Image' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                     <section 
                     style={this.bgstyling}
                    className=' as_padderTop80 as_padderBottom80'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12 text-center'>
                                    <h2 className='as_heading as_heading_center'>Choose Career Guidance</h2>
                                    <p className='as_font14 as_padderBottom5'>Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore <br />etesde dolore magna aliquapspendisse and the gravida.</p>
                                </div>

                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage1} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Report 1 Year</h4>
                                        <p>Give yourself the benefit of a truly <br /> winsome astrological solution...</p>
                                        <a href={constant.component.careerReport1Year.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage2} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Remedial Solution For Career</h4>
                                        <p>Does your career take downward swing? Get remedial solutions for career…</p>
                                        <a href={constant.component.remedialSolutionForCareer.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage3} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Strength Reading For Career</h4>
                                        <p>Choose the career best-suited to your personality and education with…</p>
                                        <a href={constant.component.strengthReadingForCareer.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerQuestionImage1} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Ask 1 Question</h4>
                                        <p>Get the answer of your career question to find the desired growth….</p>
                                        <a href={constant.component.careerAsk1Question.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerQuestionImage2} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Ask 3 Question</h4>
                                        <p>Pick up any three questions underscoring your career problem for the best….</p>
                                        <a href={constant.component.careerAsk3Question.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage4} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Report 2 Year</h4>
                                        <p>Best career report 2 years, deluge of success, growth and get coveted….</p>
                                        <a href={constant.component.careerReport2Year.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage5} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Report 3 Year</h4>
                                        <p>Career report 3 years, year-wise guidance for 3 years of continual …</p>
                                        <a href={constant.component.careerReport3Year.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                    <div className='as_service_box text-center'>
                                        <span className='as_icon'>
                                            <Image src={careerImage6} alt='' />
                                        </span>

                                        <h4 className='as_subheading'>Career Report 5 Years</h4>
                                        <p>Career report 5 years, detailed guidance, proper suggestions, counseling for….</p>
                                        <a href={constant.component.careerReport5Years.url} className='as_link'>read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='as_whychoose_wrapper as_padderTop80 as_padderBottom50'>
                        <div className='container'>
                            <div className='row as_verticle_center'>
                                <div className='col-lg-12 col-md-12 text-center'>
                                    <h2 className='as_heading'>Why Trust?</h2>
                                    <h4>What Sets Our Astrologer Apart From Other Astrologers?</h4>
                                    <p className='as_font14 as_margin0'>With 21+ years of relevant experience, Pt. Umesh Ji is an astrologer of impeccable magnitude in his presentation of quality solutions for any problems connected to different astrological reasons that negatively impact a person’s life on a dimensional scale. He is an erudite professional trusted for an astrological solution you can rely upon based on its quality, affordability, and promptness.</p>
                                </div>
                                <div className='col-lg-12 col-md-12'>
                                    <div className='row'>

                                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                            <div className='as_whychoose_box text-center'>
                                                <span className='as_number'><span><span data-from='0' data-to='62' data-speed='5000'>62</span>+</span><Image src={shapesvgImage} alt='' /></span>
                                                <h4>Success Horoscope</h4>
                                            </div>
                                        </div>

                                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                            <div className='as_whychoose_box text-center'>
                                                <span className='as_number'><span><span data-from='0' data-to='452' data-speed='5000'>452</span>+</span><Image src={shapesvgImage} alt='' /></span>
                                                <h4>Trust by million clients</h4>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                            <div className='as_whychoose_box text-center'>
                                                <span className='as_number'><span><span data-from='0' data-to='12' data-speed='5000'>12</span>+</span><Image src={shapesvgImage} alt='' /></span>
                                                <h4>Year experience</h4>
                                            </div>
                                        </div>
                                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                                            <div className='as_whychoose_box text-center'>
                                                <span className='as_number'><span><span data-from='0' data-to='652' data-speed='5000'>652</span>+</span><Image src={shapesvgImage} alt='' /></span>
                                                <h4>Type of horoscopes</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </React.Fragment>
        )
    }
}




