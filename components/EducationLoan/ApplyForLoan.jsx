import React, { Component } from 'react'
import { clearForm, onChange, validateForm } from 'utils'
import { inquiryForm, kreditBeeLoanEnquiry } from '@/actions/jobsByAction'
import swal from 'sweetalert'
import NumericFormat from 'react-number-format';
import Image from 'next/image';
// import enquirypic2 from '../../src/assets/images/enquirypic2.jpg'
import Creditbee from '../../src/assets/images/creditbee.png'
import moment from 'moment';
import Link from 'next/link';
import { setError } from '@/utils';
export default class ApplyForLoan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: { name: "firstName", error: "", value: "", isRequired: true },
            lastName: { name: "lastName", error: "", value: "", isRequired: true },
            mobile: { name: "mobile", error: "", value: "", isRequired: true },
            email: { name: "email", error: "", value: "", isRequired: true },
            gender: { name: "gender", error: "", value: "", isRequired: true },
            dob: { name: "dob", error: "", value: "", isRequired: true },
            pan: { name: "pan", error: "", value: "", isRequired: true },
            zipCode: { name: "zipCode", error: "", value: "", isRequired: true },
            profession: { name: "profession", error: "", value: "", isRequired: true },
            salary: { name: "salary", error: "", value: "", isRequired: true },
            whatsappAlert: { name: "whatsappAlert", error: "", value: true, isRequired: false },
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleChange(e) {

        let name = e.target.name
        let value = e.target.value
        var regpan = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/;
        if (name == 'pan') {
            
            value = value.toUpperCase();
            // var regex = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/;
            if (value.length == 0) {
                this.setState({
                    [name]: { ...this.state[name], value: value, error: 'Enter PAN Numer' },
                })
            }
            else if (!regpan.test(value)) {
                this.setState({
                    [name]: { ...this.state[name], value: value, error: 'Enter Correct PAN Numer' },
                })
            } else {
                this.setState({
                    [name]: { ...this.state[name], value: value, error: '' },
                })
            }
        }
        else {
            onChange(this, name, value)
        }
    }

    handleSubmit() {
        const { firstName, lastName, mobile, email, gender, dob, pan, zipCode, profession, salary, whatsappAlert } = this.state

        let model = {
            firstName: firstName.value,
            lastName: lastName.value,
            mobile: mobile.value,
            email: email.value,
            gender: gender.value,
            dob: moment(dob.value).format('YYYY-MM-DD'),
            pan: pan.value,
            zipCode: zipCode.value,
            profession: profession.value,
            salary: salary.value,
            whatsappAlert: whatsappAlert.value
        }
        if (validateForm(this) && pan.error.length == 0) {

            kreditBeeLoanEnquiry(model).then(res => {
                if (res.status) {
                    if (res.kreditBee == 200) {
                        window.open('https://a.krdt.be/02Je/rgpl', '_blank');
                        this.setState({ showSuccessMessage: true })
                    }
                    else {
                        window.open('https://a.krdt.be/02Je/rgpl', '_blank')
                        this.setState({ showSuccessMessage: true })

                    }
                }
                else {
                    console.log(res.error)
                }

            }).catch(err => {
                console.log(err)
            })

        }

    }

    render() {
        const { firstName, lastName, mobile, email, gender, dob, pan, zipCode, profession, salary, whatsappAlert, showSuccessMessage } = this.state

        return (
            <React.Fragment>
                <section className="enquiry-form-area">
                    <div className="inner-enquiry-form-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-enquiry-form-area">
                                        <h2>Apply For a Loan</h2>
                                        {showSuccessMessage && <h3 className='text-success'>Thank you for submitting your loan query form. We will review your application and provide a prompt response.</h3>}
                                        <div className="form-col-2 form-col-2-loan-box">
                                            <div className="enquiry-input-box enquiry-loan-box">
                                                <div className="form-group">
                                                    <input
                                                        className={firstName.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        type="text"
                                                        name={firstName.name}
                                                        onChange={this.handleChange}
                                                        placeholder="First Name"
                                                        value={firstName.value}
                                                    />
                                                    {firstName.error.length > 0
                                                        ? <span className="text-danger ">Enter First Name</span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <input type="text"
                                                        name={lastName.name}
                                                        className={lastName.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Last Name"
                                                        value={lastName.value}
                                                    />
                                                    {lastName.error.length > 0
                                                        ? <span className="text-danger ">Enter Last Name</span> : ""}
                                                </div>
                                                <div className="form-group">

                                                    <NumericFormat
                                                        type="phone"
                                                        maxLength={10}
                                                        name={mobile.name}
                                                        className={mobile.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"} onChange={this.handleChange} placeholder="Mobile Number"

                                                        value={mobile.value}
                                                    />
                                                    {mobile.error.length > 0
                                                        ? <span className="text-danger ">Enter Mobile</span> : ""}
                                                </div>

                                                <div className="form-group">
                                                    <input type="text"
                                                        name={email.name}
                                                        className={email.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Email ID"
                                                        value={email.value}
                                                    />
                                                    {email.error.length > 0
                                                        ? <span className="text-danger ">Enter Email ID</span> : ""}
                                                </div>


                                                <div className="form-group">
                                                    <select
                                                        name={gender.name}
                                                        className={gender.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange}
                                                        value={gender.value}
                                                    >
                                                        <option value="">Your Gender</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>

                                                    </select>
                                                    {gender.error.length > 0
                                                        ? <span className="text-danger ">Choose Gender</span> : ""}
                                                </div>

                                                <div className="form-group">
                                                    <input type="date"
                                                        name={dob.name}
                                                        min={moment().subtract(60, 'years').format('YYYY-MM-DD')}
                                                        max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
                                                        className={dob.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Date of Birth"
                                                        value={dob.value}
                                                    />
                                                    {dob.error.length > 0
                                                        ? <span className="text-danger ">Select Date of Birth</span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <input type="text"
                                                        maxLength={10}
                                                        name={pan.name}
                                                        className={pan.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="PAN Number"
                                                        value={pan.value}
                                                    />
                                                    {pan.error.length > 0
                                                        ? <span className="text-danger ">{pan.error === 'This Field is Required' ? 'Enter PAN Number' : pan.error}</span> : ""}
                                                </div>


                                                <div className="form-group">
                                                    <NumericFormat
                                                        maxLength={6}
                                                        name={zipCode.name}
                                                        className={zipCode.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Zip Code"
                                                        value={zipCode.value}
                                                    />
                                                    {zipCode.error.length > 0
                                                        ? <span className="text-danger ">Enter Zip Code</span> : ""}
                                                </div>



                                                <div className="form-group">
                                                    <select
                                                        name={profession.name}
                                                        className={profession.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Profession"
                                                        value={profession.value}
                                                    >
                                                        <option value=''>Profession</option>
                                                        <option value='Salaried'>Salaried</option>
                                                        <option value='Self Employed'>Self Employed</option>
                                                        <option value='Student'>Student</option>
                                                        <option value='Retired'>Retired</option>
                                                        <option value='Housewife'>Housewife</option>

                                                    </select>
                                                    {profession.error.length > 0
                                                        ? <span className="text-danger ">Enter Profession</span> : ""}
                                                </div>


                                                <div className="form-group">
                                                    <NumericFormat
                                                        maxLength={6}
                                                        name={salary.name}
                                                        className={salary.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Salary"
                                                        value={salary.value}
                                                    />
                                                    {salary.error.length > 0
                                                        ? <span className="text-danger ">Enter Salary</span> : ""}
                                                </div>
                                                <div className="form-group form-group-last">
                                                    <div className='apply-loan-bx'>
                                                        <button onClick={() => this.handleSubmit()} className='apply-loan-button'>Apply</button>
                                                    </div>

                                                </div>
                                                <div className="form-group creditbe-logo-box">
                                                    <div className='creditbe-logo'>
                                                        <h6>Powered by</h6>
                                                        <Image src={Creditbee} alt="Credit Bee Logo" />
                                                    </div>

                                                </div>


                                            </div>






                                        </div>

                                        <div className={whatsappAlert.value ? "sendmeimfo" : "sendmeimfouncheck"} >
                                            <input
                                                name={whatsappAlert.name}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state, [e.target.name]: {
                                                            ...this.state.whatsappAlert,
                                                            value: !this.state.whatsappAlert.value
                                                        }
                                                    })
                                                }}
                                                value={whatsappAlert.value}
                                                type="checkbox" />
                                            By continuing, I agree to KreditBee's <a href='https://www.kreditbee.in/privacy-policy' target='_blank'>Privacy Policy </a> and <a href='https://www.kreditbee.in/terms-and-conditions' target='_blank'>Terms & Conditions</a> and receive communication from KreditBee via SMS, E-mail and WhatsApp
                                            {/* Send me important updates on <span><i className="fa fa-whatsapp"></i> WhatsApp</span>*/}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
