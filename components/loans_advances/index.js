import React , { Component } from 'react'
import dynamic from 'next/dynamic';
import constant from 'constant';
let ModalWindow =  dynamic (()=> import( 'components/ModalWindow' ))
import { EducationLoanEnquiry } from '@/action/jobsByActions';
import { capFirstLetterInSentence, onChange } from 'utils';
import swal from 'sweetalert'; 

import IndianLoans  from 'src/assets/images/india-loans.png'
import  AbroadLoans    from 'src/assets/images/abroad-loans.png'
import ExecutiveEducation  from 'src/assets/images/executive-education.png'
import    StudentRefinancing   from'src/assets/images/student-refinancing.png'
import EducationAboutLoan2   from 'src/assets/images/education-about-loan2.png'
import  EducationLoan3 from 'src/assets/images/education-lone3.png'
import finance100  from 'src/assets/images/finance-100.png'
import  CustomisedLoans  from 'src/assets/images/customised-loans.png'
import FlexibleRepayment  from 'src/assets/images/flexible-repayment.png'
import fastTrackLoans   from 'src/assets/images/fast-track-loans.png'
import  EndToEndSupport  from 'src/assets/images/end-to-end-support.png'
import  QuickApplications   from 'src/assets/images/quick-applications.png'
import   EligibleEducation    from 'src/assets/images/eligible-education.png'
import  StudentLoanFaq from 'src/assets/images/student-loan-faq.png'
import Image from 'next/image';
import LoadingOverlay from 'react-loading-overlay';
import { SpinnerCircular } from 'spinners-react';
 
let SendEnquiry  = dynamic(()=>import('components/Enquiry/SendEnquiry') ,{
  ssrf:false ,

} )


export default class index extends Component {

  constructor(props) {  
    super(props);
    this.state = {
      showModal: false,
      firstName: { name: 'firstName', value: '', error: '', isRequired: false },
      lastName: { name: 'lastName', value: '', error: '', isRequired: false },
      mobile: { name: 'mobile', value: '', error: '', isRequired: false },
      email: { name: 'email', value: '', error: '', isRequired: false },
      tOS: { name: 'tOS', value: '', error: '', isRequired: false },
      placOfStudy: { name: 'placOfStudy', value: '', error: '', isRequired: false },
      loanAmount: { name: 'loanAmount', value: '', error: '', isRequired: false },
      admissionStatus: { name: 'admissionStatus', value: '', error: '', isRequired: false },
      Loader:false
    }


    this.handleChange = this.handleChange.bind(this)

    this.handleSubmit = this.onSubmit.bind(this)

  }
  componentDidMount() {
    // document.title = constant.title.educationLoan
    window.scrollTo(0, 0)
  }

  handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    onChange(this, name, value)
  }
  onshowModal=()=>{
    this.setState({showModal:true})
    }
toggleModal = () => {
    this.setState({ showModal: false })
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

    if (!data['tOS'].value) {
      let tOS = data['tOS']
      tOS.error = "Please Enter Time Of Study"
      isValid = false
      this.setState({
        tOS: tOS
      })

    }

    if (!data['placOfStudy'].value) {
      let placOfStudy = data['placOfStudy']
      placOfStudy.error = "Please Enter Place of Study"
      isValid = false
      this.setState({
        placOfStudy: placOfStudy
      })
    }

    if (!data['loanAmount'].value) {
      let loanAmount = data['loanAmount']
      loanAmount.error = "Please Enter Loan Amount"
      isValid = false
      this.setState({
        loanAmount: loanAmount
      })
    }

    if (!data['admissionStatus'].value) {
      let admissionStatus = data['admissionStatus']
      admissionStatus.error = "Please Enter Admission Status"
      isValid = false
      this.setState({
        admissionStatus: admissionStatus
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
    return isValid
  }

    onSubmit(e) {
      
      e.preventDefault();

      const { firstName, lastName, mobile, email, tOS, placOfStudy,loanAmount,admissionStatus } = this.state


      const model = {
        FIRST_NAME: firstName.value,
        LAST_NAME: lastName.value,
        CONTACT_NUMBER: mobile.value,
        EMAIL: email.value,
        TIME_OF_STUDY: tOS.value,
        PLACE_OF_STUDY: placOfStudy.value,
        LOAN_AMOUNT: loanAmount.value,
        ADMISSION_STATUS: admissionStatus.value,
      }

      if (this.validateEnquiryForm()) {
        EducationLoanEnquiry(model).then((res) => {
          this.setState({Loader:true})
          if (res.status) {
            this.setState({Loader:false})
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
    const { firstName,showModal, lastName, mobile, email, tOS, placOfStudy,loanAmount,admissionStatus, ShowModal,Loader } = this.state



    return (
      <React.Fragment>
        <main id="rg-main" className="rg-haslayout pt-0 ">    
        
        <div style={{
                        position: "fixed",
                        zIndex: "999",
                        left: "0",
                        top: " 0",
                        width: " 100%",
                        height: " 100%",
                        overflow: "auto",
                        padding: "210px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}>
                        <LoadingOverlay
                            active={true}
                            spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay>
                    </div>
        { showModal && <ModalWindow toggleModal={() => { this.toggleModal() }}
                    className='education-loans-title' title="Apply for a Loan!" >
                        <div className='apply-for-loan-modal'>
              <form>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'><label>First Name</label>
                      <input className='form-control'
                        name={firstName.name}
                        value={firstName.value}
                        onChange={this.handleChange}
                        type='text'
                        placeholder='First Name' />
                         {firstName.error.length > 0 && !firstName.value && <span className='text-danger ml-1'>{firstName.error}</span>}

                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Last Name</label>
                      <input className='form-control'
                        name={lastName.name}
                        value={lastName.value}
                        onChange={this.handleChange}
                        type='text'
                        placeholder='Last Name'
                         />
                         {lastName.error.length > 0 && !lastName.value && <span className='text-danger ml-1'>{lastName.error}</span>}

                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Contact Number</label>
                      <input className='form-control'
                        phone='contactNumber'
                        name={mobile.name}
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
                        }                        type='number'
                        placeholder='Contact Number'
                         />
                         {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'><label>E-mail ID</label>
                      <input className='form-control'
                        name={email.name}
                        value={email.value}
                        onChange={this.handleChange}
                        type='email'
                        placeholder='E-mail ID'
                         />
                        {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}

                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Time Of Study</label>
                      <input className='form-control'
                        name={tOS.name}
                        value={tOS.value}
                        onChange={this.handleChange}
                        type='month'
                        placeholder='Time Of Study'
                         />
                         {tOS.error.length > 0 && !tOS.value && <span className='text-danger ml-1'>{tOS.error}</span>}

                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Place of Study</label>
                      <select
                      name={placOfStudy.name}
                      value={placOfStudy.value}
                      onChange={this.handleChange}
                      
                      >
                        <option>Enter Place of Study </option>
                        <option>Place Of Study</option>

                        <option value='Australia'>Australia</option>
                        <option value='Canada'>Canada</option>
                        <option value='France'> France</option>
                        <option value='Germany'> Germany</option>
                        <option value='India'> India</option>
                        <option value='New Zealand'> New Zealand</option>
                        <option value='Singapore'> Singapore</option>
                        <option value='UK'> UK</option>
                        <option value='USA'> USA</option>
                        <option value='UAE'> UAE</option>
                        <option value='Others'> Others</option>
                      </select>
                      {placOfStudy.error.length > 0 && !placOfStudy.value && <span className='text-danger ml-1'>{placOfStudy.error}</span>}

                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Loan Amount</label>
                      <select
                      name={loanAmount.name}
                      value={loanAmount.value}
                      onChange={this.handleChange}                      
                      >

                        <option>Select Loan Amount</option>

                        <option value='500000'>Below 5 Lacs</option>
                        <option value='1000000'>5 Lacs to 15 Lacs</option>
                        <option value='1500000'> 15 Lacs to 25 Lacs</option>
                        <option value='2500000'> Above 25 Lacs</option>

                      </select>
                      {loanAmount.error.length > 0 && !loanAmount.value && <span className='text-danger ml-1'>{loanAmount.error}</span>}

                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'><label>Admission Status</label>
                      <select
                      name={admissionStatus.name}
                      value={admissionStatus.value}
                      onChange={this.handleChange}
                      
                      >

                        <option>Admission Status</option>

                        <option value='Confirmed'>Confirmed</option>
                        <option value='Not Applied'>Not Applied</option>
                        <option value='Applied'> Applied</option>

                      </select>
                      {admissionStatus.error.length > 0 && !admissionStatus.value && <span className='text-danger ml-1'>{admissionStatus.error}</span>}

                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <button type="submit" onClick={e => this.onSubmit(e)}>Submit</button>
                    </div>
                  </div>

                </div>
              </form>
            </div>
                    </ModalWindow>

                    
                }


 
         
          <section className='new-main-banner-wrap-area  education-lons-main-hd'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-8 col-md-12'>
                  <div className='new-main-banner-wrap-content'>
                    <span className='sub-title '>Make your Dreams <span>a Reality!</span></span>
                    <h1 className=''  >Loans & <span>Advances </span></h1>
                    <p className='' >With Loans & Advances , your family's finances remain intact. So, they do not have to <br/>worry about managing medical emergencies or saving for retirement after paying for your education.</p>
                    {/* <div className='btn-box '>
                      <a href='javascript:void(0)'
                        onClick={() => { this.setState({ ShowModal: true }) }}
                        className='default-btn-with-radius'>Apply for a Loan!</a>

                    </div> */}
                  </div>
                </div>

                <div className='col-lg-4 col-md-12'>

                </div>
              </div>
            </div>

          </section>
           
          
         {/* <SendEnquiry/>   */ }


         <SendEnquiry />

          <section className='type-study-loans-section'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='title-loans-section'>
                    <h3>Get the Funds You Need to Achieve Your Academic Aspirations!</h3>

                  </div>

                </div>
              </div>
              <div className='row'>
                <div className='col-md-3'>
                  <div className='loans-box'>

                    <div className='loans-box-img'> <Image src={IndianLoans} alt='images' /></div>
                    <div className='loans-box-text'>
                      <h5>Study in India Loans</h5>
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='loans-box'>

                    <div className='loans-box-img'> <Image src={AbroadLoans} alt='images' /></div>
                    <div className='loans-box-text'>
                      <h5>Study Abroad Loans</h5>
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='loans-box'>

                    <div className='loans-box-img'> <Image src={ExecutiveEducation} alt='images' /></div>
                    <div className='loans-box-text'>
                      <h5>Executive Education Loans</h5>
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='loans-box'>

                    <div className='loans-box-img'> <Image src={StudentRefinancing} alt='images' /></div>
                    <div className='loans-box-text'>
                      <h5>Student Loan Refinancing</h5>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section className='best-marketing'>
            <div className='container'>
              <div className='row d-flex align-items-center'>
                <div className='col-xl-6 text-xl-left text-center mt-xl-0 mt-md-0 mt-5'>
                  <Image src={EducationAboutLoan2} className='img-fluid' alt='demo-img' />
                </div>
                <div className='col-xl-6'>
                  <div className='pt-section-title-1 '>
                    <h3 className='pt-section-title'> <span className='imp-word'>Loans </span>  & Advances
                    </h3>
                    <h4>- The Answer to All Your Education Expenses</h4>
                    <p className='pt-section-description'>"You have to dream before your dreams can come true. - A. P. J. Abdul Kalam</p>
                    <p>You've done almost all the hard work to turn your dream into reality. We can help you cross the finish line. With an Rozgar education loan in India, you can focus on your course in the institute of your dreams and we'll take care of all the finances. From college tuition to living expenses, we'll help you deal with all the costs!</p>
                    <p>We've made the education loan application process super smooth. Start your educational loan application with a few easy clicks and we'll have a loan consultant call you to guide you through the education loan process. Should you require a face-to-face meeting, we'll have an executive come over with all the paperwork you need. Remember, we're more than just education loan providers - we're your education financing partner for the future!</p>
                    <div className='btn-box '>
                      <a href='javascript:void(0)'
                      onClick={()=>this.onshowModal()}
                      
                       className='default-about-btn'>Apply for a Loan!</a>

                    </div>
                  </div>



                </div>

              </div>
            </div>
          </section>
          <section className='best-marketing why-loans-choose-section '>
            <div className='container'>

              <div className='row d-flex align-items-center'>
                <div className='col-xl-7'>
                  <div className='pt-section-title-1 '>
                    <h3 className='pt-section-title'>Why do you need <span className='imp-word'> loans?</span>
                    </h3>
                    <p className='pt-section-description'>Looking for financing options for your higher education can seem like an overwhelming decision.</p>
                    <p className='pt-section-description'>If you're not sure why you should opt for an education loan, here are a few good reasons to convince you:</p>
                  </div>

                  <div className='row  mt-4'>
                    <div className='col-xl-12'>
                      <div className='pt-best-marketing'>

                        <div className='pt-icon-box-content'>
                          <h6 className='pt-icon-box-title'>
                            <span>Better Financial Planning</span>
                          </h6>
                          <p className='pt-icon-box-description'>With education loans, your family's finances remain intact. So, they do not have to worry about managing medical emergencies or saving for retirement after paying for your education.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row '>
                    <div className='col-xl-12'>
                      <div className='pt-best-marketing'>

                        <div className='pt-icon-box-content'>
                          <h6 className='pt-icon-box-title'>
                            <span>Earn the Self-made Badge</span>
                          </h6>
                          <p className='pt-icon-box-description'>With an education loan for students in India, you manage the expenses independently. You can pride yourself on being 100% self-made!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='pt-best-marketing'>

                        <div className='pt-icon-box-content'>
                          <h6 className='pt-icon-box-title'>
                            <span>Better Credit Score</span>
                          </h6>
                          <p className='pt-icon-box-description'>An education loan allows you to build a credit score right from the time you turn 18. With a good credit score, you can secure the best deals on future loans.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='pt-best-marketing'>

                        <div className='pt-icon-box-content'>
                          <h6 className='pt-icon-box-title'>
                            <span>Proof of Funds</span>
                          </h6>
                          <p className='pt-icon-box-description'>Your education loan allows you to show your college the proof of funds. It also helps you pay for living and travel expenses without breaking the bank.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='pt-best-marketing'>

                        <div className='pt-icon-box-content'>
                          <h6 className='pt-icon-box-title'>
                            <span>Easy Repayment</span>
                          </h6>
                          <p className='pt-icon-box-description'>You get more than enough time to secure employment before you need to start repaying your education loan!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='col-xl-5 text-xl-left text-center mt-xl-0 mt-md-0 mt-5'>
                  <Image src={EducationLoan3} className='img-fluid' alt='demo-img' />
                </div>

              </div>
            </div>
          </section>

          <section className='service service-loans-bx pt-bg-light'>
            <div className='container'>
              <div className='pt-section-title-1 text-center'>
                <h2 className='pt-section-title pt-text-dark'>Why Choose <span className='imp-word'>Us?</span></h2>

              </div>
              <div className='row'>
                <div className='col-xl-4 col-md-6 mt-xl-0'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={finance100} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>100% Finance</h4>
                      <p className='pt-iconbox-description mb-0'>Our education loans cover your course fee, the cost of books, housing, travel and even your college laptop! You don't have to worry about anything except getting your degree.</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4  col-md-6 mt-xl-0 mt-md-0 mt-5'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={CustomisedLoans} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>Customised Loans</h4>
                      <p className='pt-iconbox-description mb-0'>Every student, course and university is different. So, we provide tailored educational loans to meet your unique needs.</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4  col-md-6 mt-xl-0 mt-5'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={FlexibleRepayment} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>Flexible Repayment Options</h4>
                      <p className='pt-iconbox-description mb-0'>We offer repayment options that you can customise based on your financial needs. With Rozgar, you're on your way to financial independence.</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4  col-md-6 mt-xl-0 mt-5'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={fastTrackLoans} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>Fast-track Loans</h4>
                      <p className='pt-iconbox-description mb-0 text-center'>Sometimes, you need to show proof of funds before you can secure your admission and apply for a visa. We process your educational loan paperwork with lightning speed, so you have everything you need to start your higher studies.</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4  col-md-6 mt-xl-0 mt-5'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={EndToEndSupport} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>End-to-End Support</h4>
                      <p className='pt-iconbox-description mb-0 text-center'>Students need more than money to turn their dreams into reality. We also offer financial guidance and several other resources to help you make informed decisions.</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4  col-md-6 mt-xl-0 mt-5'>
                  <div className='pt-icon-box-style-06 text-center'>
                    <div className='pt-icon-media'>
                      <Image src={QuickApplications} alt='iconbox' />
                    </div>
                    <div className='pt-iconbox-info'>
                      <h4 className='pt-icon-box-title'>Quick Applications</h4>
                      <p className='pt-iconbox-description mb-0 text-center'>You can complete the education loan process from the comfort of your home when you apply for an education loan online. Our executives provide doorstep services, ensuring your online education loan application is ready on time!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='talk-us'>
              <div className='container'>
                <h4>Are you wondering how to apply for an education loan?</h4>
                <a href='javascript:void(0)'
               onClick={()=>this.onshowModal()}
                   className='btn btn-custom'>Apply for a Loan!</a>
              </div>
            </div>
          </section>


          <section className='factors-section-bx'>
            <div className='container'>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='pt-section-title-1'>
                    <h2 className='pt-section-title pt-text-dark'>Factors to Consider Before Applying for an <span className='imp-word'>Education Loan</span></h2>
                    <p>Many students may have a question - how to get an education loan? You have to consider a few things before applying for an education loan in India. Let's take a look at what they are:</p>

                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='Factors-text-box'>
                    <h4>Find the Right Course and Institute</h4>
                    <p>When the time comes to pick a career, you need to be sure of what you're doing. Education loans are long-term commitments, so you must ensure that you're headed in the right direction. Once you know what you want to do, check if you can get an educational loan to help finance your future. Most financiers provide education loans for certified courses at reputed institutes. You need to check whether your course and institute meet the minimum requirements.</p>
                    <hr />
                    <h4>Understand Your Eligibility</h4>
                    <p>Your education loan eligibility also depends on your co-borrower's financial background to some extent. Your current financial standing and your family's annual income will be considered during your loan application evaluation. When you opt for an education loan without collateral, your eligibility will help the lender understand the best loan amount for you and your needs. It's a good idea to consult an education loan expert and understand your eligibility before you apply for an education loan.</p>
                    <hr />
                    <h4>Maintain a Good Academic Record</h4>
                    <p>If you think you'd like to apply for an education loan for your higher education, you need to maintain a good academic record. If you've consistently performed well in school, we can offer you better rates and loan amounts for your educational loan. If you want to know how to get an education loan easily, let us tell you that with a good record, you can improve your chances of getting the education loan sanctioned.</p>
                    <hr />
                    <h4>Get Your Documents in Order</h4>
                    <p>Before you can apply for an education loan, you should know what documents you need to submit along with the application. When you get your papers in order, you can benefit from instant education loan approvals. If you do not have some education loan documents, your educational loan application can get delayed.</p>
                    <hr />
                    <h4>Consider the Processing Time</h4>
                    <p>At Rozgar, we can do our best to complete the education loan procedure as quickly as possible. But you must allow us enough time to complete all our loan approval processes. We require a few days to check all your paperwork and disburse the amount to you. If you require the funds urgently, you can apply for fast-track education loans, but even that could take a couple of days. So, you must apply for education loans in advance to avoid delays.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='best-marketing'>
            <div className='container'>
              <div className='row d-flex align-items-center'>

                <div className='col-xl-6'>
                  <div className='pt-section-title-1 '>
                    <h3 className='pt-section-title'> <span className='imp-word'>Who Is Eligible for</span> Loans?
                    </h3>

                    <p className='pt-section-description'>Individuals who want financial help with their higher studies can apply for education loans if they:</p>
                    <ul className='eligible-lone-list'>
                      <li>Are Indian citizens who are 18 or older</li>
                      <li>Have a confirmed admission before the final disbursal</li>

                      <li>Have a co-borrower who earns in India</li>

                    </ul>
                    <p className='pt-section-description'>Co-borrowers also need to meet the following education loan criteria:</p>
                    <ul className='eligible-lone-list'>
                      <li>Must be an Indian citizen and should be a parent, legal guardian, sibling or other blood relative</li>
                      <li>Must have a bank account in India that allows them to sign cheques</li>

                      <li>Must be the primary debtor</li>

                    </ul>

                  </div>
                </div>
                <div className='col-xl-6 text-xl-left text-center mt-xl-0 mt-md-0 mt-5'>
                  <Image src={EligibleEducation} className='img-fluid' alt='demo-img' />
                </div>

              </div>
            </div>
          </section>
          <section className='faq-section'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='faq-title text-center pb-3'>
                    <h2>Frequently Asked Questions</h2>
                    <p>It's okay to have questions, because we've got answers!</p>
                  </div>
                </div>
              </div>
              <div className='row'>

                <div className='col-xl-6 text-xl-left text-center mt-xl-0 mt-md-0 mt-5'>
                  <Image src={StudentLoanFaq} className='img-fluid' alt='demo-img' />
                </div>
                <div className='col-md-6'>

                  <div className='faq' id='accordion'>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-1'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-1' data-aria-expanded='true' data-aria-controls='faqCollapse-1'>
                            <span className='badge'>1</span>What criteria must I meet to apply for an Rozgar Education Loan?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-1' className='collapse' aria-labelledby='faqHeading-1' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>To benefit from an Rozgar Education Loan, you must be an Indian citizen over the age of 18, have a confirmed seat at your preferred institute and should have cleared your 10th standard exams. </p>
                          <p>It will greatly benefit your application if you have a good academic record and your co-borrower has a steady source of income. To enhance your higher education, you should find institutions that have a good rating.</p>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-2'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-2' data-aria-expanded='false' data-aria-controls='faqCollapse-2'>
                            <span className='badge'>2</span> When is the ideal time to apply for an Rozgar Education Loan?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-2' className='collapse' aria-labelledby='faqHeading-2' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>There's no such thing as a bad time when it comes to applying for an education loan. Ideally, you should start the process roughly 8 months before your course is scheduled to start. Having said that, you must understand that we can only release the funds once the institution confirms your admission. If you require emergency funds, you can apply for a Pre-Admission Loan (PAL).</p>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-3'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-3' data-aria-expanded='false' data-aria-controls='faqCollapse-3'>
                            <span className='badge'>3</span>What is the Rozgar pre-approved education loan? Will it work for me?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-3' className='collapse' aria-labelledby='faqHeading-3' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>A pre-approved education loan lets your institution know that you have the funds required to complete the course abroad. It works as a proof of funds certificate, something that many higher education institutes abroad require.</p>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-4'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-4' data-aria-expanded='false' data-aria-controls='faqCollapse-4'>
                            <span className='badge'>4</span> I want to ensure my course fee is paid on time. So, how early should I apply for the loan?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-4' className='collapse' aria-labelledby='faqHeading-4' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>At Rozgar, we believe that the early bird gets the education loan. You should start applying for a loan as soon as you have an idea of which institute you want to attend and what the fees will likely be for the year. We may take between 6 to 8 weeks to disburse the fees to the institute, so you can plan accordingly.</p>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-5'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-5' data-aria-expanded='false' data-aria-controls='faqCollapse-5'>
                            <span className='badge'>5</span> Many banks also offer education loans. What makes Rozgar different?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-5' className='collapse' aria-labelledby='faqHeading-5' data-parent='#accordion'>
                        <div className='card-body'>
                          <p> At Rozgar, we specialise in education loans and nothing else. We will walk you through the entire loan process and ensure that you have no stress at all while preparing for your higher studies. We also provide:</p>
                          <ul>
                            <li>Bridge loans</li>
                            <li>Score-based benefits</li>
                            <li>Pre-admission loans</li>
                            <li>Fast-track loans</li>
                            <li>Funds availability certificate</li>

                          </ul>
                          <p>You also benefit from:</p>
                          <ul>
                            <li>100% financing</li>
                            <li>Flexible repayment options</li>
                            <li>Quick sanctions</li>
                            <li>Customisable loans</li>
                            <li>Door-step service</li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-6'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-6' data-aria-expanded='false' data-aria-controls='faqCollapse-6'>
                            <span className='badge'>6</span> What documents do I need to apply for an Rozgar education loan?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-6' className='collapse' aria-labelledby='faqHeading-6' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>To complete your application, you will have to provide the following documents:</p>
                          <ul>
                            <li>Student KYC and educational documents</li>
                            <li>Details regarding the course and fees</li>
                            <li>Co-borrower KYC and income details</li>
                            <li>Collateral documents</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='card'>
                      <div className='card-header' id='faqHeading-7'>
                        <div className='mb-0'>
                          <h5 className='faq-title' data-toggle='collapse' data-target='#faqCollapse-7' data-aria-expanded='false' data-aria-controls='faqCollapse-7'>
                            <span className='badge'>7</span> Are there any processing charges for my loan?
                          </h5>
                        </div>
                      </div>
                      <div id='faqCollapse-7' className='collapse' aria-labelledby='faqHeading-7' data-parent='#accordion'>
                        <div className='card-body'>
                          <p>At Rozgar, we charge a one-time processing fee that amounts to around 1-2% of your total loan amount.</p>
                        </div>
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
