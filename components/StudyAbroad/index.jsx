import React, { Component } from 'react'
import NumericFormat from 'react-number-format';
import ReCAPTCHA from 'react-google-recaptcha';
import countries from 'src/assets/images/1.png'
import Universities from 'src/assets/images/3.png'
import Scholarships from 'src/assets/images/2.png'
import StudentGirl from 'src/assets/images/student-girls.png'
import EducationImg2 from 'src/assets/images/education-img-2.jpg'
import EducationImg3 from 'src/assets/images/education-img-3.jpg'
import EducationImg4 from 'src/assets/images/education-img-4.jpg'
import EducationShape1   from 'src/assets/images/education-shape-1.jpg'
import EducationShape2 from 'src/assets/images/education-shape-2.png'
import AddmissionAssistance from 'src/assets/images/admission-assistance.jpg'
import AbroadScholarship from 'src/assets/images/abroad-scholarship.jpg'
import TestPreparation from 'src/assets/images/test-preparation.jpg'
import TravelGuidance from 'src/assets/images/travel-guidance.jpg'
import VisaApplication from   'src/assets/images/visa-application.jpg'
import coursesAdviceGuidance from 'src/assets/images/courses-advice.jpg'
import studyCounselling from 'src/assets/images/study-counselling.jpg'
import VisaCoverLetter from 'src/assets/images/visa-cover-letter.jpg'
import Australia from 'src/assets/images/australia.jpg'
import Canada from 'src/assets/images/canada.jpg'
import UK from 'src/assets/images/uk.jpg'
import USA from 'src/assets/images/usa.jpg'
import italy from 'src/assets/images/italy.jpg'
import ireland from 'src/assets/images/ireland.jpg'
import NewZealand from 'src/assets/images/new-zealand.jpg'
import Singapore from 'src/assets/images/singapore.jpg'
import constant from 'constant'
import Image from 'next/image';
import SendEnquiry from 'components/Enquiry/SendEnquiry';
import { PersonalRecruiterEnquiry } from '@/actions/jobsByAction';
import { onChange } from '@/utils';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: false,
      firstName: { name: 'firstName', value: '', error: '', isRequired: true },
      lastName: { name: 'lastName', value: '', error: '', isRequired: true },
      email: { name: 'email', value: '', error: '', isRequired: true },
      mobile: { name: 'mobile', value: '', error: '', isRequired: true },
      comment: { name: 'comment', value: '', error: '', isRequired: true },
      prefferedStudyDestination: { name: 'prefferedStudyDestination', value: '', error: '', isRequired: true },
      courses: { name: 'courses', value: '', error: '', isRequired: true },

    }


    this.handleChange = this.handleChange.bind(this)

    this.handleSubmit = this.onSubmit.bind(this)

  }

  recaptchaHandler = (value) => {

    if (value) {
      this.setState({
        captcha: true
      })
    } else {
      this.setState({
        captcha: false
      })
    }
  }


  handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    onChange(this, name, value)
  }

  validateEnquiryForm = () => {

    let data = this.state
    let error = {}
    let isValid = true

    if (!data['firstName'].value) {
      let firstName = data['firstName']
      firstName.error = "Please Enter First Name"
      isValid = false
      this.setState({
        firstName: firstName
      })
    }

    if (!data['lastName'].value) {
      let lastName = data['lastName']
      lastName.error = "Please Enter Last Name"
      isValid = false
      this.setState({
        lastName: lastName
      })
    }

    if (!data['email'].value) {
      let email = data['email']
      email.error = "Please Enter Email"
      isValid = false
      this.setState({
        email: email
      })
    }

    if (data['email'].value) {
      let re = /\S+@\S+\.\S+/
      if (re.test(data['email'].value)) { } else {
        let email = data['email']
        email.error = "Please Enter Valid Email"
        isValid = false
        this.setState({
          email: email
        })
      }
    }
    if (!data['mobile'].value) {
      let mobile = data['mobile']
      mobile.error = "Please Enter Mobile"
      isValid = false
      this.setState({
        mobile: mobile
      })
    }

    if (data["mobile"] != "") {
      const regexExp = /^[6789][0-9]{9}/
      if (regexExp.test(data.mobile.value)) { } else {
        let mobile = data['mobile']
        mobile.error = "Please Enter Valid Mobile Number";
        isValid = false;
      }
    }

    if (!data['comment'].value) {
      let comment = data['comment']
      comment.error = "Please Enter Comment"
      isValid = false
      this.setState({
        comment: comment
      })
    }
    if (!data['prefferedStudyDestination'].value) {
      let prefferedStudyDestination = data['prefferedStudyDestination']
      prefferedStudyDestination.error = "Please Enter Study Destination"
      isValid = false
      this.setState({
        prefferedStudyDestination: prefferedStudyDestination
      })
    }
    if (!data['courses'].value) {
      let courses = data['courses']
      courses.error = "Please Enter Course"
      isValid = false
      this.setState({
        courses: courses
      })
    }

    this.setState({
      error: error
    })

    return isValid
  }



  onSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, email, mobile, comment, prefferedStudyDestination, courses } = this.state


    const model = {
      NAME: firstName.value,
      LASTNAME: lastName.value,
      EMAIL: email.value,
      CONTACT_NUMBER: mobile.value,
      DESCRIPTION: comment.value,
      PREFFERED_STUDY_DESTINATION: prefferedStudyDestination.value,
      COURSE: courses.value,
      TYPES: "Study Abroad"
    }

    if (this.validateEnquiryForm() && this.state.captcha) {
      PersonalRecruiterEnquiry(model).then((res) => {
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
    const { firstName, lastName, email, mobile, comment, prefferedStudyDestination, courses } = this.state
    return (
      <React.Fragment>
      <main id="rg-main" className="rg-main rg-haslayout pt-0">



        <section data-anim-wrap='' className='masthead  -type-5 animated'>


          <div className='masthead__container'>

            <div className='row y-gap-50 items-center'>
              <div className='col-lg-8'>
                <div className='masthead__content'>

                  <h1 data-anim-child='slide-up delay-2' className='masthead__title is-in-view mb-0'>
                    Discover the perfect university for you
                  </h1>
                  <p data-anim-child='slide-up delay-3' className='mt-5 is-in-view'>
                    We make it simple to find, apply & Enroll at universities abroad
                  </p>
                  {/* <div data-anim-child='slide-up delay-4' className='row items-center x-gap-20 y-gap-20 pt-20 is-in-view pb-4'>
                    <div className='col-auto'>
                      <a href='#enquery-form' className='button -md -orange-1 text-white'>Talk to us</a>
                    </div>

                  </div> */}

                  <div data-anim-child='slide-up delay-5' className='row x-gap-20 mobile-section-banner y-gap-20 items-center pt-50 pb-20 lg:pt-30 is-in-view'>

                    <div className='col-xl-2 col-auto'>
                      <div className='text-dark-1'>
                        <div className='mr-10'>
                          <Image src={countries} alt='icon' style={{ width: "33px" }} />
                        </div>
                        <div className='fw-600 lh-11 mt-10'>18 <br /> Countries</div>
                      </div>
                    </div>
                    <div className='col-xl-2 col-auto'>
                      <div className='text-dark-1'>
                        <div className='mr-10'>
                          <Image src={Universities} alt='icon' style={{ width: "33px" }} />
                        </div>
                        <div className='fw-600 lh-11 mt-10'>168 <br />  Universities</div>
                      </div>
                    </div>

                    <div className='col-xl-3 col-auto'>
                      <div className='text-dark-1'>
                        <div className='mr-10'>
                          <Image src={Scholarships} alt='icon' style={{ width: "33px" }} />
                        </div>
                        <div className='fw-600 lh-11 mt-10'>2,358 <br /> Scholarships</div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='hero-img student-hero-img'>
                  <Image src={StudentGirl} className='hero' alt='Hero' />


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
                <h2 data-anim-child='slide-up delay-1' className='text-dark-1'>Best Overseas Education <span className='text-purple-1'>Consultants in India</span></h2>

                <p className='mt-5 text-dark-1 mt-20 is-in-view'>There is nothing more important than a good education in a world like ours where the competition is cutthroat and careers can be made or broken by just a bad choice. So while everyone wants a good education for themselves, for those who want even better, getting an overseas education is the way to secure the best jobs and a comfortable life. And while many may look towards study abroad consultants for help, most of them quickly realise that for most of them it is just a business. But at Rozgar.com, we do not just help you find a place for your education; we also walk the distance with you until you have settled in at whichever place you choose to study at.</p>

                <h3>Why Study Abroad?</h3>
                <p>Many of you may ask this question, and it is a perfectly logical one to ask. But if we tell you that students who study abroad have a better chance of securing jobs in reputable companies, get to meet a diverse group of people and experience a new culture, and have a great chance at securing citizenships in other countries and become pioneers, would that make you feel better about going abroad to study? An overseas education gives you all this and much more- there are people to meet and places to see and opportunities to be had. The benefits of studying abroad are too many to be listed here. So don’t wait anymore, contact us and let us help you.</p>
                <a href='tel:+91-8800277577' className='readmore-about-btn'>Get in Touch</a>
              </div>

              <div className='col-lg-5 order-1 education-area-two '>
                <div className='education-img-wrap'>
                  <div className='education-img-2'>
                    <Image src={EducationImg2} alt='Image' />
                  </div>
                  <div className='education-img-3'>
                    <Image src={EducationImg3} alt='Image' />
                  </div>
                  <div className='education-img-4'>
                    <Image src={EducationImg4} alt='Image' />
                  </div>
                  <div className='education-shape-1'>
                    <Image src={EducationShape1} alt='Image' />
                  </div>
                  <div className='education-shape-2'>
                    <Image src={EducationShape2} alt='Image' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='what-we-offer-section'>
          <div className='container'>
            <div className=''>  <div className='section-title'>

              <h2>What We Offer</h2>

            </div></div>
            <div className='row'>
              <div className='col-md-3'>
                <a href={constant.component.admissionAssistance.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={AddmissionAssistance} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Admission Assistance</h4></div>
                </div> </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.studyAbroadScholarship.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={AbroadScholarship} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Study Abroad Scholarship</h4></div>
                </div> </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.testPreparation.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={TestPreparation} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Test Preparation</h4></div>
                </div> </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.travelGuidance.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={TravelGuidance} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Travel Guidance</h4></div>
                </div>  </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.visaApplicationAssistance.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={VisaApplication} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Visa application assistance</h4></div>
                </div> </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.coursesAdviceGuidance.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={coursesAdviceGuidance} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Courses Advice Guidance</h4></div>
                </div> </a>
              </div>
              <div className='col-md-3'>
                <a href={constant.component.studyAbroadCounselling.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={studyCounselling} alt='Image' /></div>
                  <div className='we-offer-content'><h4>Study Abroad Counselling</h4></div>
                </div>  </a>
              </div>

              <div className='col-md-3'>
                <a href={constant.component.visaCoverLetter.url}><div className='we-offer-item'>
                  <div className='we-offer-images'><Image src={VisaCoverLetter} alt='Image' /></div>
                  <div className='we-offer-content'><h4> Visa Cover Letter</h4></div>
                </div> </a>
              </div>

            </div>

          </div>
        </section>
        <section className='categories-area'>
          <div className='container'>
            <div className='section-title'>

              <h2>Top Study Abroad Destination</h2>

            </div>
            <div className='row'>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInAustralia.url}><div className='single-categories'>
                  <Image src={Australia} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in Australia</h3>


                    </div>
                  </div>
                </div></a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInCanada.url}><div className='single-categories'>
                  <Image src={Canada} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in Canada</h3>


                    </div>
                  </div>
                </div> </a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInUk.url}><div className='single-categories'>
                  <Image src={UK} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in UK</h3>


                    </div>
                  </div>
                </div> </a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInUsa.url}><div className='single-categories'>
                  <Image src={USA} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in USA</h3>


                    </div>
                  </div>
                </div> </a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInItaly.url}><div className='single-categories'>
                  <Image src={italy} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in Italy</h3>


                    </div>
                  </div>
                </div></a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInIreland.url}><div className='single-categories'>
                  <Image src={ireland} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in Ireland</h3>


                    </div>
                  </div>
                </div></a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInNewZealand.url}><div className='single-categories'>
                  <Image src={NewZealand} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in New Zealand</h3>


                    </div>
                  </div>
                </div></a>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <a href={constant.component.studyInSingapore.url}><div className='single-categories'>
                  <Image src={Singapore} alt='Image' />
                  <div className='categories-content-wrap'>
                    <div className='categories-content'>

                      <h3>Study in Singapore</h3>


                    </div>
                  </div>
                </div> </a>
              </div>

            </div>
          </div>
        </section>


        <section className='education-area education-area-why-us ebeef5-bg-color' id='EXE_MAIN'>
          <div className='container p-0'>
            <div className='row'>

              <div className='col-lg-6'>
                <div className='education-content '>
                  <h2>Why Choose  <span>Us</span>?</h2>
                  <ul>
                    <li>
                      <i className='fa fa-check'></i>
                      Universities /Colleges Identification
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Assistance in Documentation for Admission
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Assistance in securing student scholarship from the respective <br />Universities/Colleges
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Assistance in Filling of Applicants
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Regular Follow-up with Universities/Colleges
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      100% visa Assistance
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Assistance in Educational Loan
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Orientation for Pre-departure
                    </li>
                    <li>
                      <i className='fa fa-check'></i>
                      Accommodation Assistance
                    </li>
                  </ul>

                </div>
              </div>
              <div className='col-lg-6 '>
                <div className='education-enquery-form' id='enquery-form'>
                  <div className='enroll-wrap'>

                    <h3>Book Your Consultation Now</h3>
                    <div class="title-shape"></div>
                    <form className='courses-form' >
                      <div className='form-group col-md-6'>
                        <input type='text'
                          className={firstName.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                          //  id='Name'
                          name={firstName.name}
                          value={firstName.value}
                          onChange={this.handleChange}
                          placeholder='Enter Your First Name' />
                        {firstName.error.length > 0 && !firstName.value && <span className='text-danger'>{firstName.error}</span>}
                      </div>
                      <div className='form-group col-md-6'>
                        <input type='text'
                          className={lastName.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                          //  id='Name' 
                          name={lastName.name}
                          value={lastName.value}
                          onChange={this.handleChange}
                          placeholder='Enter Your Last Name' />
                        {lastName.error.length > 0 && !lastName.value && <span className='text-danger'>{lastName.error}</span>}

                      </div>
                      <div className='form-group col-md-6'>
                        <input type='email'
                          className={email.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                          name={email.name}
                          value={email.value}
                          onChange={this.handleChange}
                          // id='email'
                          placeholder='Enter Your Email Id' />
                        {email.error.length > 0 && !email.value && <span className='text-danger '>{email.error}</span>}

                      </div>
                      <div className='form-group col-md-6'>
                        <NumericFormat type='phone'
                          className={mobile.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                          name={mobile.name}
                          // value={mobile.value} 
                          maxLength={10}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              const regexExp = /^[6789][0-9]{9}/
                              if (regexExp.test(e.target.value)) {
                                let mobile = this.state.mobile
                                mobile.value = e.target.value
                                this.setState({ mobile: mobile });
                              } else {
                                let mobile = this.state.mobile
                                mobile.value = ''
                                this.setState({ mobile: mobile });
                              }
                            }
                          }
                          }
                          placeholder='Enter Your Contact Number' />
                        {mobile.error.length > 0 && !mobile.value && <span className='text-danger'>{mobile.error}</span>}

                      </div>
                      <div className='form-group col-md-6'>
                        <select
                          name={prefferedStudyDestination.name}
                          value={prefferedStudyDestination.value}
                          onChange={this.handleChange}
                        >
                          <option selected>Preferred Study Destination</option>
                          <option value="Australia">Australia</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Italy">Italy</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Singapore">Singapore</option>
                        </select>
                        {prefferedStudyDestination.error.length > 0 && !prefferedStudyDestination.value && <span className='text-danger'>{prefferedStudyDestination.error}</span>}
                      </div>
                      <div className='form-group col-md-6'>
                        <select
                          name={courses.name}
                          value={courses.value}
                          onChange={this.handleChange}
                        >
                          <option selected>Courses Interested In</option>
                          <option value='MBA fresher'>MBA fresher</option>
                          <option value='MBA 3 plus years exp'>MBA 3 plus years exp</option>
                          <option value='Engineering/Computer Science'>Engineering/Computer Science</option>
                          <option value='Life Sciences'>Life Sciences</option>
                          <option value='Sports and Physical exercises'>Sports and Physical exercises</option>
                          <option value='Art and Design-Architecture'>Art and Design-Architecture</option>
                          <option value='Hospitality and Tourism'>Hospitality and Tourism</option>
                          <option value='Business'>Business</option>
                          <option value='Education'>Education</option>
                          <option value='GRE'>GRE</option>
                          <option value='IELTS'>IELTS</option>
                          <option value='GMAT'>GMAT</option>
                          <option value='TOFEL'>TOFEL</option>
                          <option value='Diploma'>Diploma</option>
                          <option value='Bachelor'>Bachelor</option>
                          <option value='PG Diploma'>PG Diploma</option>
                          <option value='Master'>Master</option>
                          <option value='PHD'>PHD</option>

                        </select>
                        {courses.error.length > 0 && !courses.value && <span className='text-danger'>{courses.error}</span>}
                      </div>
                      <div className='form-group col-md-12'>
                        <textarea
                          rows='3'
                          name={comment.name}
                          value={comment.value}
                          onChange={this.handleChange}
                          placeholder='Your Comment:'></textarea>
                        {comment.error.length > 0 && !comment.value && <span className='text-danger' >{comment.error}</span>}

                      </div>
                      <div className='CaptchaCom ml-3' style={{transform:"scale(0.85)", transformOrigin:"0 0"}}>
                        <ReCAPTCHA
                          sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
                          onChange={this.recaptchaHandler}
                          theme='light'
                        />
                      </div>
                      <button type="button" className='default-btn' style={{ marginLeft: "48px" }} onClick={e => this.onSubmit(e)}>Submit</button>
                    </form>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='testimonials-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='testimonials-title-box'>
                  <h2>Testimonials</h2>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='testimonials-item-box'>
                  
                  <iframe width="300" height="350" src="https://www.youtube.com/embed/ocZKh2p1J7U" title="2019 Study Abroad Student Testimonials" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='testimonials-item-box'>
                  <iframe width="300" height="350" src="https://www.youtube.com/embed/HMOPAstubN0" title="Studying abroad — more than education | Zhanna Lagunova | TEDxTomskStateUniversity" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='testimonials-item-box'>
                  <iframe width="300" height="350" src="https://www.youtube.com/embed/ocZKh2p1J7U" title="2019 Study Abroad Student Testimonials" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </React.Fragment>    )
  }
}
