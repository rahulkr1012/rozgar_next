import React, { Component } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import NumericFormat from 'react-number-format'
import constant from 'constant';
export default class StudyAbroadRightSection extends Component {
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

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
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


    validateEnquiryForm = () => {

        let data = this.state
        let error = {}
        let isValid = true

        if (!data['firstName'].value) {
            let firstName = data['firstName']
            firstName.error = "Please Enter FirstName"
            isValid = false
            this.setState({
                firstName: firstName
            })
        }

        if (!data['lastName'].value) {
            let lastName = data['lastName']
            lastName.error = "Please Enter LastName"
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
            prefferedStudyDestination.error = "Please Enter Preffered Study Destination"
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
            COURSE: courses.value
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

        <div className='col-md-4 right-aside-study-abroad'>
            <div className='education-enquery-form' id='enquery-form'>
                <div className='enroll-wrap'>

                    <h3>Book Your Consultation Now</h3>
                    <div class="title-shape"></div>
                    <form className='courses-form'>

                        <div className='form-group'>
                            <input type='text'
                                className={firstName.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                                name={firstName.name}
                                value={firstName.value}
                                onChange={this.handleChange}
                                id='Name'
                                placeholder='Enter Your First Name' />
                            {firstName.error.length > 0 && !firstName.value && <span className='text-danger ml-1'>{firstName.error}</span>}

                        </div>
                        <div className='form-group'>
                            <input type='text'
                                className={lastName.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                                name={lastName.name}
                                value={lastName.value}
                                onChange={this.handleChange}
                                id='Name'
                                placeholder='Enter Your Last Name' />
                            {lastName.error.length > 0 && !lastName.value && <span className='text-danger ml-1'>{lastName.error}</span>}

                        </div>
                        <div className='form-group'>
                            <input type='email'
                                className={email.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                                name={email.name}
                                value={email.value}
                                onChange={this.handleChange}
                                id='email'
                                placeholder='Enter Your Email Id' />
                            {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}

                        </div>
                        <div className='form-group'>
                            <NumericFormat type='phone'
                                className={mobile.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                                name={mobile.name}
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
                                id='Number'
                                placeholder='Enter Your Contact Number' />
                            {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

                        </div>
                        <div className='form-group'>
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
                            {prefferedStudyDestination.error.length > 0 && !prefferedStudyDestination.value && <span className='text-danger ml-1'>{prefferedStudyDestination.error}</span>}

                        </div>
                        <div className='form-group'>
                            <select
                                name={courses.name}
                                value={courses.value}
                                onChange={this.handleChange}
                            >
                                <option selected>Courses Interested In</option>
                                <option value="MBA fresher">MBA fresher</option>
                                <option value="MBA 3 plus years exp">MBA 3 plus years exp</option>
                                <option value="Engineering/Computer Science">Engineering/Computer Science</option>
                                <option value="Life Sciences">Life Sciences</option>
                                <option value="Sports and Physical exercises">Sports and Physical exercises</option>
                                <option value="Art and Design-Architecture">Art and Design-Architecture</option>
                                <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="GRE">GRE</option>
                                <option value="IELTS">IELTS</option>
                                <option value="GMAT">GMAT</option>
                                <option value="TOFEL">TOFEL</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="PG Diploma">PG Diploma</option>
                                <option value="Master">Master</option>
                                <option value="PHD">PHD</option>

                            </select>
                            {courses.error.length > 0 && !courses.value && <span className='text-danger ml-1'>{courses.error}</span>}

                        </div>
                        <div className='form-group'>
                            <textarea rows='3'
                                name={comment.name}
                                value={comment.value}
                                onChange={this.handleChange}
                                placeholder='Your Comment:'></textarea>
                            {comment.error.length > 0 && !comment.value && <span className='text-danger ml-1'>{comment.error}</span>}

                        </div>
                        <ReCAPTCHA
                            sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
                            onChange={this.recaptchaHandler}
                            theme='light'
                        />
                        <button type="button" className='default-btn' onClick={e => this.onSubmit(e)}>Submit</button>


                    </form>
                </div>
                <div className='what-we-offer'>
                    <h3>What We Offer</h3>
                    <ul id='style-3' className='list-sidebar-right'>
                        <li><a href={constant.component.admissionAssistance.url}><i className='fa fa-angle-double-right'></i> Admission Assistance</a></li>
                        <li><a href={constant.component.coursesAdviceGuidance.url}><i className='fa fa-angle-double-right'></i> Courses Advice Guidance</a> </li>
                        <li><a href={constant.component.studyAbroadCounselling.url}><i className='fa fa-angle-double-right'></i> Study Abroad Counselling</a></li>
                        <li><a href={constant.component.studyAbroadScholarship.url}><i className='fa fa-angle-double-right'></i> Study Abroad Scholarship</a></li>
                        <li><a href={constant.component.testPreparation.url}><i className='fa fa-angle-double-right'></i> Test Preparation</a></li>
                        <li><a href={constant.component.travelGuidance.url}><i className='fa fa-angle-double-right'></i> Travel Guidance</a></li>
                        <li><a href={constant.component.visaApplicationAssistance.url}><i className='fa fa-angle-double-right'></i> Visa application assistance</a></li>
                        <li><a href={constant.component.visaCoverLetter.url}><i className='fa fa-angle-double-right'></i>  Visa Cover Letter</a></li>
                        <li><a href={constant.component.sopWritingServices.url}><i className='fa fa-angle-double-right'></i> SOP Writing Services</a></li>

                        <li><a href={constant.component.lorWritingServices.url}><i className='fa fa-angle-double-right'></i> LOR Writing Services</a></li>

                        <li><a href={constant.component.resumeWritingServices.url}><i className='fa fa-angle-double-right'></i> Resume Writing Services</a></li>

                    </ul>

                </div>

            </div>
        </div>
    </React.Fragment>    )
  }
}
