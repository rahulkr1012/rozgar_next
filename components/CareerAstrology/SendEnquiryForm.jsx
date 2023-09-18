import React, { Component } from 'react'
import { clearForm, onChange, validateForm } from 'utils'
import { inquiryForm } from '@/action/jobsByActions'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format'
import enquirypic2 from 'src/assets/images/enquirypic2.jpg'

export default class SendEnquiry extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: { name: "name", error: "", value: "", isRequired: true },
            email: { name: "email", error: "", value: "", isRequired: true },
            number: { name: "number", error: "", value: "", isRequired: true },
            discription: { name: "discription", error: "", value: "", isRequired: false }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }


    handleSubmit(event) {

        const { name, email, number, discription } = this.state

        let model = {
            NAME: name.value,
            EMAIL: email.value,
            MOBILE: number.value,
            MESSAGE: discription.value
        }

        if (validateForm(this)) {
            inquiryForm(model).then(res => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Enquiry Submitted successfully ",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    clearForm(this)
                }
                else {
                    alert(res.error)
                }

            }).catch(err => {
                alert(err)
            })

        }



        if (validateForm(this)) {
            inquiryForm(model).then(res => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Enquiry Submitted successfully ",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });

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
        const { name, email, number, discription } = this.state
        return (
            <React.Fragment>

                <section className="enquiry-form-area">
                    <div className="inner-enquiry-form-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-enquiry-form-area">
                                        <h2>Enquire Now</h2>
                                        <div className="form-col-2">
                                            <div className="enquiry-input-box">
                                                <div className="form-group">
                                                    <input
                                                        className={name.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        type="text"
                                                        name={this.state.name.name}
                                                        onChange={this.handleChange}
                                                        placeholder="Your Name"
                                                        value={name.value}
                                                    />
                                                    {name.error.length > 0
                                                        ? <span className="text-danger ">  Enter your name </span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <input type="email"
                                                        name={this.state.email.name}
                                                        className={email.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={this.handleChange} placeholder="Email Address"
                                                        value={email.value}
                                                    />
                                                    {email.error.length > 0
                                                        ? <span className="text-danger ">  Enter your email </span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <NumberFormat
                                                        type="phone" name={this.state.number.name} className={number.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"} onChange={this.handleChange} placeholder="Mobile Number"

                                                        value={number.value}
                                                    />
                                                    {number.error.length > 0
                                                        ? <span className="text-danger ">  Enter your mobile number </span> : ""}
                                                </div>
                                            </div>
                                            <div className="enquiry-textarea-box">
                                                <textarea className={discription.error.length > 3
                                                    ? "form-control is-invalid"
                                                    : "form-control"} name={this.state.discription.name} onChange={this.handleChange} placeholder='Description' style={{ height: '150px' }}

                                                    value={discription.value}
                                                >
                                                </textarea>
                                                <button style={{ backgroundColor: "red", color: "white" }} className="rg-btn" type='button' onClick={this.handleSubmit} >Submit</button>
                                            </div>
                                            
                                        </div>
                                        <div className="sendmeimfo"><input type="checkbox" />Send me important updates on <span><i className="fa fa-whatsapp"></i> WhatsApp</span></div>
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
