import React, { Component } from 'react'
import { EnquirySubmit } from '@/action/FAQAction';
import { clearForm, onChange, validateForm } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import NumericFormat from 'react-number-format';
import ReCAPTCHA from "react-google-recaptcha";

export default class faqEnquiryfrom extends Component {



    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                name: 'name',
                error: '',
                isRequired: true,
            },
            email: {
                value: '',
                name: 'email',
                error: '',
                isRequired: true,
            },
            phone: {
                value: '',
                name: 'phone',
                error: '',
                isRequired: true,
            },
            area: {
                value: '',
                name: 'area',
                error: '',
                isRequired: true,
                options: [],
            },
            feedback: {
                value: '',
                name: 'feedback',
                error: '',
                isRequired: true,
            },
            captch: false,
        }
    }

    recaptchaHandler = (value) => {

        if (value) {
            this.setState({
                captch: true
            })
        } else {
            this.setState({
                captch: false
            })
        }
    }

    onSubmit = (e) => {
        
        e.preventDefault();
        if (validateForm(this) && this.state.captch) {
            const { name, email, phone, feedback, area, captch } = this.state;
            const model = {
                NAME: name.value,
                EMAIL: email.value,
                MOBILE: phone.value,
                MESSAGE: feedback.value,
                AREA_OF_CONCERN: area.value,
            }
            EnquirySubmit(model).then((res) => {
                if (res.result) {
                    clearForm(this)
                    toast(res.messageCode);
                    window.location.reload()

                }
                else {
                    toast(res.error)
                }
            }).catch((err) => {
                toast(err)
            });
        }

    }

    onChange = (e) => {
        const { name, value } = e.target;
        onChange(this, name, value)
    }



    render() {
        const {
            name, email, phone, area, feedback, captch
        } = this.state


        return (
            <React.Fragment>
                <ToastContainer position="top-center" autoClose={5000} />
                <section className="rozgarfast-services">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6 rozgarfastcentent-center">
                                <div className="rozgarfast-content">
                                    <h2>Rozgar Recruiter Services</h2>
                                    <p><i className="lnr lnr-phone"></i> Toll Free Number: 1800-102-5557 , 1800-572-5557</p>
                                    <p><i className="lnr lnr-clock"></i> Work Timings: 9.30 AM to 6.30 PM</p>
                                    <p><i className="lnr lnr-calendar-full"></i> Working Days: (Monday to Saturday)</p>
                                    <p><i className="lnr lnr-envelope"></i> Email Id: service@rozgar.com</p>
                                    <p>International Clients: +91 120 4021100 (9.30 AM to 6.00 PM IST)</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="problemform">
                                    <h2>Report a Problem/Need Assistance</h2>
                                    <form onSubmit={(e) => { this.onSubmit(e) }} className="rg-formtheme rg-formlogin">
                                        <fieldset>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name={name.name}
                                                    value={name.value}
                                                    onChange={this.onChange}
                                                    className='form-control'
                                                    placeholder="Your Name"
                                                />
                                                {name.error.length > 0 && !name.value && <span className='text-danger ml-1'>{name.error}</span>}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name={email.name}
                                                    value={email.value}
                                                    onChange={this.onChange}
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                />
                                                {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}
                                            </div>
                                            <div className="form-group">
                                                <NumericFormat
                                                    type="text"
                                                    name={phone.name}
                                                    value={phone.value}
                                                    onChange={this.onChange}
                                                    maxLength={10}
                                                    minLength={10}
                                                    className='form-control'
                                                    placeholder="Mobile Number"
                                                />
                                                {phone.error.length > 0 && !phone.value && <span className='text-danger ml-1'>{phone.error}</span>}

                                            </div>
                                            <div className="form-group">
                                                <select
                                                    name={area.name}
                                                    value={area.value}
                                                    onChange={this.onChange}
                                                    className='form-control'>
                                                    <option value='' disabled selected>Select Area of Concern</option>
                                                    <option value='Create Rozgar Profile'> Create Rozgar Profile</option>
                                                    <option value='Search'> Search</option>
                                                    <option value='Apply'> Apply</option>
                                                    <option value='Getting around Rozgar'> Getting around Rozgar</option>
                                                    <option value='Setting'> Settings</option>
                                                </select>
                                                {area.error.length > 0 && !area.value && <span className='text-danger ml-1'>{area.error}</span>}
                                            </div>

                                            <div className="form-group">
                                                <textarea
                                                    style={{padding:"11px 10px"}}
                                                    name={feedback.name}
                                                    value={feedback.value}
                                                    onChange={this.onChange}
                                                    className="form-control"
                                                    placeholder="Write your Feedback"
                                                > </textarea>
                                                {feedback.error.length > 0 && !feedback.value && <span className='text-danger ml-1'>{feedback.error}</span>}
                                            </div>

                                            <div className='form-group'>
                                                <ReCAPTCHA
                                                    sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
                                                    onChange={this.recaptchaHandler}
                                                    theme='light'
                                                />
                                            </div>
                                            <div className="form-group rg-btnsarea">
                                                <button type="submit" className="rg-btn rg-active btn-primary" id="showtoast">Submit</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
