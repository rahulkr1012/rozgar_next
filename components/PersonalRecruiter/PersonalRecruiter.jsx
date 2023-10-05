import React, { Component } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import NumericFormat from 'react-number-format';
import swal from 'sweetalert';
import Modal from 'react-modal';
import { PersonalRecruiterEnquiry } from 'src/actions/jobsByAction';
import constant from '../../constant';
import { validateForm, onChange } from '../../utils';
import ModalWindow from 'components/common/common/ModalWindow';
import { getGlobalSetting } from "src/action/dashboard";
import ResumeWritingPC from 'src/assets/images/resume-writing-pc.png'
import Related2 from 'src/assets/images/related-2.png'
import Inkdinpro2 from 'src/assets/images/inkdinpro2.png'
import Astrogoly from 'src/assets/images/astrogoly.png'
import Blog1 from 'src/assets/images/blog1.jpg'
import UserImg from 'src/assets/images/user-img.jpg'
import checkTable from 'src/assets/images/author/check-icon.png'
import Image from 'next/image';
import Link from 'next/link';
import { PersonalRecruiterPackages, PersonalRecruiterServices, purchasePersonalRecruiterService, savePersonalRecruiterPaymentDetail } from '@/action/personalRecruiter';
import Shimmer from 'components/Loader/index';
import Swal from 'sweetalert2';
import SignInForApplyJobs from 'components/signin/signInForApplyJobs';
import { getCookie } from 'cookies-next';
import { withRouter } from 'next/router';
import Loader from 'components/spinner';
import FaqBlog from 'components/FAQ_Blog/index';



export default withRouter(class PersonalRecruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: false,
      MasterData: undefined,
      showEnquiryModel: false,
      isError: false,
      name: { name: 'name', value: '', error: '', isRequired: true },
      email: { name: 'email', value: '', error: '', isRequired: true },
      mobile: { name: 'mobile', value: '', error: '', isRequired: true },
      message: { name: 'message', value: '', error: '', isRequired: true },
      SERVICES: undefined,
      PACKAGES: undefined,
      PACKAGES_NAME: undefined,
      showShimmer: true,
      showLoginModal: false
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

    if (!data['name'].value) {
      let name = data['name']
      name.error = "Please Enter Name"
      isValid = false
      this.setState({
        name: name
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

    if (!data['message'].value) {
      let message = data['message']
      message.error = "Please Enter Your Message"
      isValid = false
    }

    this.setState({
      error: error
    })

    return isValid
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, mobile, message } = this.state

    const model = {
      NAME: name.value,
      EMAIL: email.value,
      CONTACT_NUMBER: mobile.value,
      DESCRIPTION: message.value
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

  onShowEnquiryModel = () => {
    this.setState({ showEnquiryModel: !this.state.showEnquiryModel })
  }


  componentDidMount() {
    getGlobalSetting().then(res => {
      if (res.status) {
        this.setState({ MasterData: res.result })
      }
      else {
        console.log(res.error)
      }
    })
    PersonalRecruiterServices().then(res => {
      if (res.status) {
        this.setState({ SERVICES: res.result }, () => {
          PersonalRecruiterPackages().then(res => {
            if (res.status) {
              this.setState({ PACKAGES: res.result.packages, PACKAGES_NAME: res.result.packageName, showShimmer: false })

            }
          })
        })

      }
    })
  }

  onPurchase = (data) => {
    debugger
    if (!getCookie(constant.keys.cd)) {
      window.location.href = constant.component.signin.url + `?personalRecruiter=true`
    }
    else {
      this.setState({ showLoader: true });
      const model = {
        PACKAGE_ID: data.PACKAGE_ID,
        AMOUNT: data.AMOUNT,
      }

      purchasePersonalRecruiterService(model).then((res) => {


        if (res.status) {

          const planAmount = model.AMOUNT;
          this.setState({ showLoader: false });

          const options = {
            key: process.env.NEXT_PUBLIC_RAZOR_KEY,
            amount: planAmount * 100,
            name: "Personal Recruiter Services",
            description: `${model.PACKAGE_NAME}`,
            order_id: res.result.ORDER_CREATION_ID,

            handler(razorResponse) {
              const paymentId = razorResponse.razorpay_payment_id;

              if (paymentId) {
                savePersonalRecruiterPaymentDetail({
                  orderCreationId: res.result.ORDER_CREATION_ID,
                  PAYMENT_ID: paymentId,
                  TXN_ID: res.result.TXN_ID,
                  razorpayOrderId: razorResponse.razorpay_order_id,
                  razorpaySignature: razorResponse.razorpay_signature,
                  TXN_STATUS: "SUCCESS",

                }).then((response) => {

                  if (response.status) {
                    window.location.href =
                      '/payment/success' + "?txn=" +
                      res.result;
                  }
                });
              }
            },
            theme: {
              color: "#464646",
            },
          };

          if (model.AMOUNT != 0) {
            const rzp1 = window.Razorpay(options);
            rzp1.open();
          } else {
            window.location.href =
              '/payment/success' + "?txn=" +
              res.result;
          }
        }
      });
    }
  };


  render() {
    const { MasterData, SERVICES, PACKAGES, PACKAGES_NAME, showShimmer, showLoginModal, showLoader } = this.state
    const { name, email, mobile, message } = this.state
    const { FAQ_Blog_List } = this.props
    const resumewritebg = {
      backgroundImage: 'url(assets/images/white-left-divider.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
    };
    const jobsearchebg = {
      backgroundImage: 'url(assets/images/blue-divider.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom',
    };
    const astrologyline = {
      backgroundImage: 'url(assets/images/white-divider.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom',
    };
    const { showEnquiryModel } = this.state;
    return (

      <React.Fragment>
        {showLoader && <Loader />}

        {showEnquiryModel && <ModalWindow
          toggleModal={() => { this.setState({ showEnquiryModel: false }) }}
          title="Get your own Personal Recruiter - Quick Contact">

          <form>
            <div className='row'>
              <div class="col-md-12">
                <div className='form-group'>
                  <input tepe="text"
                    name={name.name}
                    value={name.value}
                    className={name.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                    onChange={this.handleChange}
                    placeholder='Enter your name'
                  />
                  {name.error.length > 0 && !name.value && <span className='text-danger'>{name.error}</span>}

                </div>
              </div>
              <div class="col-md-12">
                <div className='form-group'>
                  <NumericFormat
                    type="phone"
                    name={mobile.name}
                    className={mobile.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                    placeholder='Enter mobile no'
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
                  />
                  {mobile.error.length > 0 && !mobile.value && <span className='text-danger'>{mobile.error}</span>}


                </div>
              </div>
              <div class="col-md-12">
                <div className='form-group'>
                  <input tepe="text"
                    name={email.name}
                    value={email.value}
                    onChange={this.handleChange}
                    className={email.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                    placeholder='Enter email id' />
                  {email.error.length > 0 && !email.value && <span className='text-danger'>{email.error}</span>}

                </div>
              </div>
              <div class="col-md-12">
                <div className='form-group'>
                  <textarea className={message.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                    name={message.name}
                    value={message.value}
                    onChange={this.handleChange}
                    placeholder='Your Message'>

                  </textarea>
                  {message.error.length > 0 && !message.value && <span className='text-danger'>{message.error}</span>}

                </div>
              </div>
              <div className='ml-3'>
                <ReCAPTCHA
                  sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
                  onChange={this.recaptchaHandler}
                  theme='light'
                />
              </div>
              <div class="col-12 text-right pb-3 pt-3">
                <button type='button' onClick={(e) => { this.onSubmit(e) }} className='rg-btn rg-active btn-primary mr-2'>SUBMIT</button>
              </div>
            </div>
          </form>

        </ModalWindow>}

        {showLoginModal && <Modal
          isOpen={this.state.openModal}
          style={{ content: { top: "5%", left: '30%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
          onRequestClose={() => { this.setState({ showLoginModal: false }) }}
        >
          <SignInForApplyJobs
            leftBar={false}
            history={this.props.history}
            onCloseModal={() => { this.setState({ showLoginModal: false }) }}
          />
        </Modal>}

        <section class="create-your-job-section" id="rozgar-recruiter-aboutus">
          <div className="container">

            <div className='row'>
              <div className="col-md-12 col-sm-12">
                <div className='own-personal-recruiter'>
                  <h4>Get your own Personal Recruiter</h4>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className="col-md-7 col-sm-7">
                <div className='own-personal-recruiter'>
                  <p>Your Rozgar Personal Recruiter offers premium services to create a professional presence on the web. You can access your profile, edit it, or build and maintain your own network of professional contacts. In the package you will get Resume Writing, Personal Job Search, Linked-In Profile Creation & One to One Astrology driven guidance and support throughout your career journey.</p>
                  <p>Rozgar Personal Recruiter is a premium service for professionals that helps enterprise recruiters find and engage candidates for your sourcing needs.</p>
                  <p className='packageoff'>Early Bird Discount on Personal Recruiter Package <span>64% OFF</span></p>
                </div>
              </div>
              <div className="col-md-5 col-sm-5">
                <ul className='own-personal-recruiter-price'>
                  <li><span><del><i class="fa fa-rupee"></i>{MasterData?.ACTUAL_PRICE}</del> <i class="fa fa-rupee"></i>{MasterData?.DISCOUNT_PRICE}</span></li>
                  <li><Link href="javascript:void(0)" onClick={() => { this.onShowEnquiryModel() }} className='rg-ruit-btn rg-active'>Enquiry Now</Link></li>
                </ul>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12' >
                <div className='table-price-hed'>
                  <h4>Premium Candidate Services - Be Employed</h4>
                </div>
                <div className='table-responsive'>
                  {showShimmer && <Shimmer />}
                  {!showShimmer && <table className='table table-pricing text-center table-striped'>
                    <thead>
                      <tr>
                        <th className='col' style={{ width: "400px" }}>Services</th>
                        {PACKAGES_NAME && PACKAGES_NAME.map(item => {
                          return (<th className='col' style={{ width: "200px" }}>{item.PACKAGE_NAME}</th>)
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICES && SERVICES.map((item, index) => {
                        return (<tr>
                          <th>{item.SERVICE_NAME}</th>
                          {PACKAGES && PACKAGES.map(packageItem => {
                            return (
                              <td>
                                {packageItem.map((available) => {
                                  if (available.SERVICE_ID === item.SERVICE_ID) {
                                    return (<Image src={checkTable} />)
                                  }
                                })}
                              </td>
                            )
                          })}
                        </tr>)
                      })}

                      <tr>
                        <th></th>
                        {PACKAGES_NAME && PACKAGES_NAME.map(item => {
                          return (<td><Link onClick={() => { this.onPurchase(item) }} className='buy-now-btn' href="javascript:void(0)">{item.PACKAGE_NAME}</Link></td>)
                        })}
                      </tr>
                    </tbody>

                  </table>}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-sm-3">
                <div className='resume-writing-box'>
                  <div className='resume-img-box'>
                    <Image src={ResumeWritingPC} alt="" />
                  </div>
                  <div className='resume-text-box'>
                    <h5>Resume Writing </h5>
                    {/* <Link href={constant.component.signin.url} className="btn-booknow">Create Resume</Link> */}
                  </div>

                </div>

              </div>
              <div className="col-md-3 col-sm-3">
                <div className='resume-writing-box personal-job-search-bx'>
                  <div className='resume-img-box'>
                    <Image src={Related2} alt="" />
                  </div>
                  <div className='resume-text-box'>
                    <h5>Personal Job Search </h5>
                    {/* <Link href={constant.component.signin.url} className="btn-booknowred">Create your job</Link> */}
                  </div>

                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className='resume-writing-box linkdin-profile'>
                  <div className='resume-img-box'>
                    <Image src={Inkdinpro2} alt="" />
                  </div>
                  <div className='resume-text-box'>
                    <h5>Linked-In Profile </h5>
                    {/* <Link href={constant.component.signin.url} className="btn-booknowblack">Create Linkdin Profile</Link> */}
                  </div>

                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className='resume-writing-box about-astrology-box'>
                  <div className='resume-img-box'>
                    <Image src={Astrogoly} alt="" />
                  </div>
                  <div className='resume-text-box'>
                    <h5>Astrology driven guidance</h5>
                    {/* <Link href={constant.component.signin.url} className="btn-astrology">Explore Astrology</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className='rozgar-recruiter-faq-section rozgar-quciksolution'>
          <div className='container'>

            <div className='row'>
              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <div className='rozgar-quciksolutionbox'>
                  <h2 className='headline'>Quick Solution</h2>
                  <ul className='autoheight' id='style-4'>
                    <li><span>Q.</span><Link href='/faq/do-i-need-a-valid-email-id-for-registration-'>Do I need a valid email id for registration?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-am-being-asked-some-more-questions-before-i-can-complete-my-application-to-a-job-match-why-is-so-'>I am being asked some more questions before I can complete my application to a job match. Why is so?</Link></li>
                    <li><span>Q.</span><Link href='/faq/can-i-apply-again-for-the-same-job-posting-'>Can I apply again for the same job posting?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-need-help-completing-my-rozgar-profile'>I need help completing my Rozgar profile</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-control-who-views-my-profile-on-rozgar-'>How can I control who views my profile on Rozgar?</Link></li>
                    <li><span>Q.</span><Link href='/faq/why-should-i-create-a-profile-on-rozgar-if-i-already-have-a-resume-'>Why should I create a profile on Rozgar if I already have a resume?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-searched-for-jobs-on-rozgar-but-i-could-not-find-one-matching-my-profile-what-should-i-do-'>I searched for jobs on Rozgar but I could not find one matching my profile. What should I do?</Link></li>
                    <li><span>Q.</span><Link href='/faq/can-i-contact-the-employer-regarding-my-application-'>Can I contact the employer regarding my application?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-many-jobs-can-i-apply-to-in-a-day-month-'>How many jobs can I apply to in a day / month?</Link></li>
                    <li><span>Q.</span><Link href='/faq/what-are-job-preferences-'>What are Job Preferences?</Link></li>
                    <li><span>Q.</span><Link href='/faq/why-are-there-no-views-for-my-profile-or-why-have-employers-not-viewed-my-cv-'>Why are there no views for my Profile? or Why have employers not viewed my CV?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-delete-my-rozgar-account-'>How can I delete my Rozgar account?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-deactivate-my-rozgar-account-'>How can I deactivate my Rozgar account?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-to-change-email-and-mobile-notification-settings-on-naukri-'>How to change email and mobile notification settings on Naukri?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-protect-myself-from-job-scams-'>How can I protect myself from job scams?</Link></li>
                    <li><span>Q.</span><Link href='/faq/what-are-job-scams-how-to-identify-job-scam-'>What are job scams? How to identify  job scam?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-am-having-trouble-uploading-my-cv-how-do-i-upload-'>I am having trouble uploading my CV. How do I upload ?</Link></li>
                    <li><span>Q.</span><Link href='/faq/when-i-try-to-apply-to-certain-jobs-i-am-re-directed-to-another-site-in-some-cases-why-'>When I try to apply to certain jobs, I am re-directed to another site in some cases. Why?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-got-a-call-email-from-recruiter-asking-for-money-what-should-i-do-'>I got a call/email from recruiter asking for money. What should I do?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-searched-for-jobs-rozgar-but-i-could-not-find-one-matching-my-profile-what-should-i-do-'>I searched for jobs  Rozgar but I could not find one matching my profile. What should I do?</Link></li>
                    <li><span>Q.</span><Link href='/faq/what-is-rozgar-database-or-rozgar-cv-database-'>What is Rozgar database or Rozgar CV database?</Link></li>
                    <li><span>Q.</span><Link href='/faq/what-is-rozgar-premium-'>What is Rozgar Premium?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-do-not-want-my-current-employer-to-have-access-to-my-profile-how-can-i-block-a-recruiter-'>I do not want my current employer to have access to my profile. How can I block a recruiter?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-update-the-email-id-and-phone-number-on-my-rozgar-account-'>How can I update the email id and phone number on my Rozgar account?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-change-the-password-to-my-account-'>How can I change the password to my account?</Link></li>
                    <li><span>Q.</span><Link href='/faq/i-deleted-my-rozgar-account-can-i-get-it-back-'>I deleted my Rozgar account. Can I get it back?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-make-my-profile-invisible-to-recruiters-on-rozgar-'>How can I make my profile invisible to recruiters on Rozgar?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-can-i-stop-getting-emails-from-rozgar-com-'>How can I stop getting emails from Rozgar.com?</Link></li>
                    <li><span>Q.</span><Link href='/faq/how-to-change-email-and-mobile-notification-settings-on-rozgar-com-'>How to change email and mobile notification settings on Rozgar.com?</Link></li>
                    <li><span>Q.</span><Link href='/faq/what-is-profile-performance-on-rozgar-com-'>What is Profile Performance on Rozgar.com?</Link></li>
                  </ul>
                </div>
              </div>
              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                <div className='rozgar-browsebytopic'>
                  <h2 className='headline'>Browse by topic</h2>
                  <ul className='autoheight' id='style-4'>
                    <Link href='/faq-category/create-rozgar-profile'>
                      <li><i className='lnr lnr-users' ></i>
                        <Link href="#" style={{ color: "#000000" }}> Create Rozgar Profile</Link></li></Link>
                    <Link href='/faq-category/search'>
                      <li><i className='lnr lnr-magnifier'></i>
                        <Link href="#" style={{ color: "#000000" }}> Search</Link></li></Link>
                    <Link href='/faq-category/apply'>
                      <li><i className='lnr lnr-hand' ></i>
                        <Link href="#" style={{ color: "#000000" }}> Apply</Link></li></Link>
                    <Link href='/faq-category/getting-around-rozgar'>
                      <li><i className='fa fa-refresh' ></i>
                        <Link href="#" style={{ color: "#000000" }}> Getting around Rozgar</Link></li></Link>
                    <Link href='/faq-category/setting'>
                      <li><i className='lnr lnr-cog'></i>
                        <Link href="#" style={{ color: "#000000" }}> Setting</Link></li></Link>
                    <Link href='/faq-category/security-advice'>
                      <li><i className='fa fa-shield' ></i>
                        <Link href="#" style={{ color: "#000000" }}> Security-advice</Link></li></Link>
                  </ul>
                </div>
              </div>
            </div>


          </div>

        </section>
        {/* <section class="rozgar-recruiter-blog-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="rozgar-section-blog-title">
                  <h4>Latest Blogs</h4>
                  <a target='_blank' className="rg-btnviewall" href={constant.component.blog.url}>View All</a>
                </div>

              </div>

            </div>
            <div className="row">
              <div className="post card-container col-lg-4 col-md-6 col-sm-6">
                <div className='blog-post blog-grid blog-style-recuiter'>
                  <div className='dez-post-media dez-img-effect radius-sm'> <Link href='https://rozgar.com/blog/resignation-letter-format'><Image src={Blog1} alt="" />
                  </Link> </div>
                  <div className='dez-info'>
                    <div class="dez-post-meta">
                      <ul class="d-flex align-items-center">
                        <li class="post-date"><Image src={UserImg} alt="" /> Rosy</li>

                      </ul>
                    </div>

                    <div className='dez-post-title'>
                      <h5 className='post-title font-20'><Link href='https://rozgar.com/blog/resignation-letter-format'>Writing a Resignation Letter......</Link></h5>
                    </div>
                    <div className='dez-post-text'>
                      <p>In this blog we will cover: Tips for Writing a Resignation Letter What to Include in Your Resignation Letter What Not to Include in Your Resignation Letter Resignation letter with sample FAQs Are you sure that you want to .....</p>
                    </div>
                    <div className='dez-post-readmore blog-share'>
                      <Link href='https://rozgar.com/blog/resignation-letter-format' title='READ MORE' rel='bookmark' className='site-button-link'><span className='fw6'>READ MORE</span></Link>
                    </div>
                  </div>
                </div>

              </div>
              <div className="post card-container col-lg-4 col-md-6 col-sm-6">
                <div className='blog-post blog-grid blog-style-recuiter'>
                  <div className='dez-post-media dez-img-effect radius-sm'> <Link href="https://rozgar.com/blog/top-hiring-trends-2022"><Image src={Blog1} alt="" />
                  </Link> </div>
                  <div className='dez-info'>
                    <div class="dez-post-meta">
                      <ul class="d-flex align-items-center">
                        <li class="post-date"><Image src={UserImg} alt="" /> Rosy</li>

                      </ul>
                    </div>

                    <div className='dez-post-title'>
                      <h5 className='post-title font-20'><Link href='https://rozgar.com/blog/top-hiring-trends-2022'>Top Hiring Trends for 2022</Link></h5>
                    </div>
                    <div className='dez-post-text'>
                      <p>In this blog we will cover: Emerging hiring trends Conclusion FAQs Without doubt the past two years were quite tough for the recruitment industry. The industry had to face a lot of challenges.In order to tackle these.....</p>
                    </div>
                    <div className='dez-post-readmore blog-share'>
                      <Link href='https://rozgar.com/blog/top-hiring-trends-2022' title='READ MORE' rel='bookmark' className='site-button-link'><span className='fw6'>READ MORE</span></Link>
                    </div>
                  </div>
                </div>

              </div>
              <div className="post card-container col-lg-4 col-md-6 col-sm-6">
                <div className='blog-post blog-grid blog-style-recuiter'>
                  <div className='dez-post-media dez-img-effect radius-sm'> <Link href='https://rozgar.com/blog/why-finding-passion-in-career-is-important'><Image src={Blog1} alt="" />
                  </Link> </div>
                  <div className='dez-info'>
                    <div class="dez-post-meta">
                      <ul class="d-flex align-items-center">
                        <li class="post-date"><Image src={UserImg} alt="" /> Rosy</li>

                      </ul>
                    </div>

                    <div className='dez-post-title'>
                      <h5 className='post-title font-20'><Link href='https://rozgar.com/blog/why-finding-passion-in-career-is-important'>Why Finding Passion in Career is .....</Link></h5>
                    </div>
                    <div className='dez-post-text'>
                      <p>In this blog we will cover: How to define “passion”? How to find passion in your career? Tips for Turning Your Passion Into a Job Conclusion FAQs How to find passion in your career? According to a recent report, about...</p>
                    </div>
                    <div className='dez-post-readmore blog-share'>
                      <Link href='https://rozgar.com/blog/why-finding-passion-in-career-is-important' title='READ MORE' rel='bookmark' className='site-button-link'><span className='fw6'>READ MORE</span></Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section> */}
        <section class="rozgar-recruiter-blog-section">
          <FaqBlog
            FAQ_Blog_List={FAQ_Blog_List}
          />
        </section>


      </React.Fragment>
    )
  }
}
)