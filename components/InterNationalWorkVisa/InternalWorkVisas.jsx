import React, { Component } from 'react'
import constant from 'constant'
import International1 from 'src/assets/images/international1.png'
import SkilledVisa from 'src/assets/images/skilled-visa.png'
import SkilledVisa2 from 'src/assets/images/skilled-visa2.png'
import ImmigrationVisa from 'src/assets/images/immigration-visa.png'
import ImmigrationVisaW from 'src/assets/images/immigration-visa-w.png'
import GreenCard from 'src/assets/images/green-card.png'
import GreenCardW from 'src/assets/images/green-card-w.png'
import StudentVisa from 'src/assets/images/student-visa.png'

import StudentVisaW from 'src/assets/images/student-visa-w.png'
import WorkPermit from 'src/assets/images/work-permit.png'
import WorkPermitW from 'src/assets/images/work-permit-w.png'
import Visitorvisa from 'src/assets/images/visitor-visa.png'
import VisitorVisaW from 'src/assets/images/visitor-visa-w.png'
import Austratlia from 'src/assets/images/australia.jpg'
import Canada from 'src/assets/images/canada.jpg'
import UK from 'src/assets/images/uk.jpg'
import USA from 'src/assets/images/usa.jpg'
import italy from 'src/assets/images/italy.jpg'
import ireland from 'src/assets/images/ireland.jpg'
import NewZealand from 'src/assets/images/new-zealand.jpg'
import Singapore from 'src/assets/images/singapore.jpg'
import Image from 'next/image'
import { clearForm, onChange, validateForm } from '@/utils'
import { WorkEnquiryForm } from '@/actions/jobsByAction'
import swal from 'sweetalert'
import bg4r from 'src/assets/images/call-back-footer-bg.png'
 



let work_abroad_search ={ 

    backgroundImage: `url('${bg4r.src}')`,

    
}
 class InternalWorkVisas extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Name: { name: 'Name', value: '', error: '', isRequired: true },
            Mobile: { name: 'Mobile', value: '', error: '', isRequired: true },
            Country: { name: 'Country', value: '', error: '', isRequired: true },
            Email: { name: 'Email', value: '', error: '', isRequired: true },
            VisaService: { name: 'VisaService', value: '', error: '', isRequired: true },
            Comment: { name: 'Comment', value: '', error: '', isRequired: true },

        }


        this.handleChange = this.handleChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }
    handleSubmit(e) {
        
        const { Name, Email, Mobile, Country, VisaService, Comment } = this.state


        let model = {
            NAME: Name.value,
            EMAIL: Email.value,
            CONTACT_NUMBER: Mobile.value, 
            DESCRIPTION: Comment.value,
            SERVICES: VisaService.value,
            COUNTRY: Country.value,
        }

        if (validateForm(this)) {
            WorkEnquiryForm(model).then(res => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Enquiry Submitted successfully ",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    window.location.reload()
                }
                else {
                    alert(res.error)
                }

            }).catch(err => {
                alert(err)
            })
        }
    }




    render() {
        const { Name, Email, Mobile, Comment, VisaService, Country } = this.state
        return (
            <React.Fragment>


                <main id="rg-main" className="rg-haslayout pt-0">

                    <section className='static-hero-s3'>
                        <div className='hero-container'>
                            <div className='hero-inner'>
                                <div className='container'>
                                    <div className='hero-content'>
                                        <div className='slide-title-sub'>
                                            <h5>An Effortless Immigration Process</h5>
                                        </div>
                                        <div className='slide-title'>
                                            <h1>Work  <b><span>Abroad</span></b></h1>
                                            <p>Our best experts in your Service.</p>
                                        </div>
                                        <div className='slide-text'>
                                            <p>Study, Job, Immigration & Visa</p>
                                        </div>
                                        <div className='clearfix'></div>
                                        {/* <div className='btns'>
                            <a href='#' className='theme-btn' onClick={e => this.onSubmit(e)}>Book a consultation!</a>
                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section className="enquiry-form-area">
                        <div className="inner-enquiry-form-box">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="inner-enquiry-form-area">
                                            <h2>Get Free Consultation</h2>
                                            <div className="form-col-2">
                                                <div className="enquiry-input-visa-box">
                                                    <div className="form-group">
                                                        <div className="pb-visa">
                                                            <input className={Name.error.length > 0
                                                                ? "form-control is-invalid"
                                                                : "form-control"}
                                                                type="text" name={Name.name}
                                                                onChange={this.handleChange}
                                                                placeholder="Your Name"
                                                                value={Name.value} />
                                                            {Name.error.length > 0
                                                                ? <span className="text-danger ">  Enter your name </span> : ""}
                                                        </div>
                                                        <div className="pb0-visa">
                                                            <input type="email"
                                                                name={Email.name}
                                                                onChange={this.handleChange}
                                                                className={Email.error.length > 0
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                placeholder="Email Address"
                                                                value={Email.value} />
                                                            {Email.error.length > 0
                                                                ? <span className="text-danger ">  Enter your Email </span> : ""}                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="pb-visa">
                                                            <input name={Mobile.name}
                                                                className={Mobile.error.length > 0
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                placeholder="Mobile Number"
                                                                type="phone"
                                                                maxLength={10}
                                                                onChange={this.handleChange}
                                                                value={Mobile.value}
                                                                inputmode="numeric" />
                                                            {Mobile.error.length > 0
                                                                ? <span className="text-danger ">  Enter your Mobile </span> : ""}                                                        </div>
                                                        <div className="pb0-visa">
                                                            <div className="enquiry-select-box">
                                                                <select
                                                                    className={VisaService.error.length > 0
                                                                        ? "form-control is-invalid"
                                                                        : "form-control"}
                                                                    name={VisaService.name}
                                                                    onChange={this.handleChange}
                                                                    value={VisaService.value}>
                                                                    <option>Are you willing to Pay for Visa Services</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                                {VisaService.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your VisaService </span> : ""}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form-group">
                                                        <div className="enquiry-select-box mb-2">
                                                            <select
                                                                className={Country.error.length > 0
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                name={Country.name}
                                                                onChange={this.handleChange}
                                                                value={Country.value}>
                                                                <option>Which country do you want to move</option>
                                                                <option value="Australia">Australia</option>
                                                                <option value="Austria">Austria</option>
                                                                <option value="The USA">The USA</option>
                                                                <option value="The UK">The UK</option>
                                                                <option value="Canada">Canada</option>
                                                                <option value="Malaysia">Malaysia</option>
                                                                <option value="Hong Kong">Hong Kong</option>
                                                                <option value="Ireland">Ireland</option>
                                                                <option value="South Africa">South Africa</option>
                                                                <option value="UAE">UAE</option>
                                                                <option value="JAPAN">JAPAN</option>
                                                                <option value="Belgium">Belgium</option>
                                                                <option value="Switzerland">Switzerland</option>
                                                                <option value="Finland">Finland</option>
                                                                <option value="Germany">Germany</option>
                                                                <option value="New Zealand">New Zealand</option>
                                                                <option value="Others">Others</option>
                                                            </select>
                                                            {Country.error.length > 0
                                                                ? <span className="text-danger ">  Enter your Country </span> : ""}

                                                        </div>
                                                        <div className="enquiry-textarea-visa-box">
                                                            <textarea className={Comment.error.length > 0
                                                                ? "form-control is-invalid"
                                                                : "form-control"}
                                                                name={Comment.name}
                                                                value={Comment.value}
                                                                onChange={this.handleChange}
                                                                placeholder="Description">

                                                            </textarea>

                                                        </div>
                                                        {Comment.error.length > 0
                                                            ? <span className="text-danger ">  Enter your Comment </span> : ""}
                                                    
                                                </div>
                                                <button className="rg-btn"
                                                 onClick={this.handleSubmit}
                                                 type="button">Submit</button>
                                            </div>

                                        </div>
                                        <div className="sendmeimfo"><input type="checkbox" />Send me important updates on <span><i className="fa fa-whatsapp"></i> WhatsApp</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='layout-pt-lg layout-pb-lg'>
                    <div className='container'>
                        <div data-anim-wrap='' className='row y-gap-30 justify-between items-center animated'>
                            <div className='col-xl-7 col-lg-7 order-2 order-lg-1 about-abroad-section'>
                                <h2 data-anim-child='slide-up delay-1' className='text-dark-1'>Work & Settle Abroad With Your Family </h2>

                                <p className='mt-5 text-dark-1 mt-20 is-in-view'>Do you want to build a career and life abroad? As one of the world’s leading overseas career specialists and a leading work visa agent, Rozgar has helped thousands of individuals and families settle in the world’s most liveable countries. We’ve seen firsthand how moving abroad can dramatically improve not just the migrant’s life but that of their family and parents. With our comprehensive overseas career solutions, we are the #1 choice for professionals seeking to work abroad.</p>

                                <h4>End To End Job Search Services</h4>
                                <p>Rozgar has streamlined the steps involved in working abroad to make your journey smoother. Our process is aimed at making your profile more accessible, attractive and engaging. Our services begin with helping you create a resume that meets international standards and help you craft an engaging LinkedIn profile. We then market your profile in the countries of your choice and work to get you interview calls. A dedicated Job Search consultant will work with you on your international career, guiding you through the process.</p>
                                <h4>Our job search services* include the following:</h4>
                                <ul className='international-list-bx'>
                                    <li><span>Job Search Strategy Report:</span> With the help of experts, we create a comprehensive report based on your profile and decide on positioning it in your target country</li>
                                    <li><span>Opportunity Research:</span> We identify industry trends and job sources to get you more job offers. We help you modify your profile to present it on different platforms</li>
                                    <li><span>Job Applications:</span> We register your profile on various portals and job sites and even apply to relevant job postings on your behalf</li>
                                </ul>
                            </div>

                            <div className='col-lg-5 order-1 education-area-two '>
                                <div className='education-img-wrap'>
                                    <div className='education-img-2'>
                                        <Image 
                                         src={International1} 
                                         alt='Image' />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='serivce-section international-serivce-section bg-silver-light pdt-105 pdb-80'>
                    <div className='section-title'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='section-title-left-part mrb-sm-30'>
                                        <div className='section-left-sub-title'>
                                            <h5 className='sub-title text-primary-color'>what we do</h5>
                                        </div>
                                        <h2 className='title'>We Provide Experts Create Great <span> Visa Categories</span></h2>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='section-content'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon'>
                                            <Image className='icon-black-img' src={SkilledVisa} alt='Image' />
                                            <Image className='icon-white-hov' src={SkilledVisa2} alt='Image' />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Skilled Worker Visa</h3>
                                            </div>
                                            <div className='para'>
                                                <p>For the persons whose jobs require a minimum work experience that are not temporary or seasonal.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon'>
                                            <Image className='icon-black-img' src={ImmigrationVisa} alt='Image' />
                                            <Image className='icon-white-hov' src={ImmigrationVisaW} alt='Image' />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Business Immigration Visa</h3>
                                            </div>
                                            <div className='para'>
                                                <p>People who want to invest in, or start businesses abroad. Expected to support the development.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon' style={{ marginBottom: "10px" }} >
                                            <Image className='icon-black-img' src={GreenCard} alt='Image' style={{ width: "70px" }} />
                                            <Image className='icon-white-hov' src={GreenCardW} alt='Image' style={{ width: "70px" }} />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Green card</h3>
                                            </div>
                                            <div className='para'>
                                                <p>We consult for the permanent residents visa documents issued to immigrants under the Immigration.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon' style={{ marginBottom: "10px" }}>
                                            <Image className='icon-black-img' src={StudentVisa} alt='Image' style={{ width: "70px" }} />
                                            <Image className='icon-white-hov' src={StudentVisaW} alt='Image' style={{ width: "70px" }} />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Student Visa</h3>
                                            </div>
                                            <div className='para'>
                                                <p>We guide our clients for the perception & better career opportunities for the students, Overseas services</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon' style={{ marginBottom: "10px" }}>
                                            <Image className='icon-black-img' src={WorkPermit} alt='Image' style={{ width: "70px" }} />
                                            <Image className='icon-white-hov' src={WorkPermitW} alt='Image' style={{ width: "70px" }} />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Work Permit</h3>
                                            </div>
                                            <div className='para'>
                                                <p>Permit To Work refers to management systems used to ensure that work is done safely and efficiently.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6 col-xl-4'>
                                    <div className='service-box'>
                                        <div className='service-icon' style={{ marginBottom: "20px" }}>
                                            <Image className='icon-black-img' src={Visitorvisa} alt='Image' style={{ width: "60px" }} />
                                            <Image className='icon-white-hov' src={VisitorVisaW} alt='Image' style={{ width: "60px" }} />
                                        </div>
                                        <div className='service-content'>
                                            <div className='title'>
                                                <h3>Visitor Visa</h3>
                                            </div>
                                            <div className='para'>
                                                <p>Visas for the people who want to travel to and enter as a visitor for up to 6 months. We help with visitor visa.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className='education-area education-area-why-us why-work-abroad-section ebeef5-bg-color' id='EXE_MAIN'>
                    <div className='container p-0'>
                        <div className='row'>

                            <div className='col-lg-6'>
                                <div className='education-content why-work-abroad-box'>
                                    <h2>Why Work Abroad?</h2>
                                    <p>Working abroad can dramatically transform your life and career. Working in a foreign country would surely require you to acquire new abilities. You will learn new soft skills, such as communication and networking, as well as new technical skills at your new career abroad. After all, navigating a new location './assets/images/work-permit-w.png'without knowing the language requires resourcefulness, and working in an international team will improve your communication skills.</p>
                                    <p>Working overseas also gives you the opportunity to learn a foreign language. This will not only help you in your work but also make living abroad easier for you. Besides this, your new language skills will have a positive impact on your career.</p>
                                    <p>Working in a foreign country is a fantastic way to broaden your personal and professional network. Working in another country exposes you to fresh opportunities because you will be collaborating with locals and expats from other countries. You will also develop friendships with people from various walks of life, some of which will last a lifetime.</p>
                                    <p>Having an international assignment on your resume may help you find work in the future. In recruiting, talent mobility is a hot topic, and an increasing proportion of future professions will necessitate foreign travel. Working overseas will demonstrate your flexibility and independence, as well as make your resume stand out from the crowd. Additionally, any other talents you acquire while abroad, such as language skills, will enhance your resumé.</p>


                                </div>
                            </div>
                            <div className='col-lg-6 '>
                                <div className='education-content why-work-abroad-box'>
                                    <h2>Working abroad is the perfect option for you if you plan to:</h2>

                                    <ul>
                                        <li>

                                            Grow your career and have international mobility
                                        </li>
                                        <li>

                                            Earn dollar salaries leading to higher saving
                                        </li>
                                        <li>

                                            Live in well-developed countries
                                        </li>
                                        <li>

                                            Have access to world-class education & healthcare
                                        </li>
                                        <li>

                                            Gain access to citizen benefits
                                        </li>
                                        <li>

                                            Get a powerful passport that facilitates international travel
                                        </li>
                                        <li>

                                            Transform your family’s life
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='call-section-bx'  style={
          work_abroad_search}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='call-confirm-bx'>
                                    <h4>Are You Looking For Visa Applications Just Call Us!</h4>
                                    <p>Need a consultation? Call us today +91-8800277577 or Email us: contact@rozgar.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className='categories-area destination-top-categories'>
                    <div className='container'>

                        <div className='section-title'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='section-title-left-part mrb-sm-30'>
                                            <div className='section-left-sub-title'>
                                                <h5 className='sub-title text-primary-color'>Top Work Favourite  Destination</h5>
                                            </div>
                                            <h2 className='title'>For The Immigration, Choose<span> Country!</span></h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinAustralia.url}><div className='single-categories'>
                                    <Image src={Austratlia} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in Australia</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinCanada.url}><div className='single-categories'>
                                    <Image src={Canada} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in Canada</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinUK.url}><div className='single-categories'>
                                    <Image src={UK} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in UK</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinUSA.url}> <div className='single-categories'>
                                    <Image src={USA} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in USA</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinMalaysia.url}><div className='single-categories'>
                                    <Image src={italy} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in Malaysia</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinIreland.url}><div className='single-categories'>
                                    <Image src={ireland} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in Ireland</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinNewZealand.url}><div className='single-categories'>
                                    <Image src={NewZealand} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in New Zealand</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>
                            <div className='col-lg-3 col-sm-6'>
                                <a href={constant.component.workinSingapore.url}><div className='single-categories'>
                                    <Image src={Singapore} alt='Image' />
                                    <div className='categories-content-wrap'>
                                        <div className='categories-content'>

                                            <h3>Work in Singapore</h3>


                                        </div>
                                    </div>
                                </div></a>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            </React.Fragment >
        )
    }
}

export default InternalWorkVisas