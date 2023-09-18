import React, { Component } from 'react'
import constant from 'constant'
import { clearForm, onChange, validateForm } from '../../utils'
import { inquiryForm } from '../../action/jobsByActions'
import swal from 'sweetalert'
import NumericFormat from 'react-number-format'
import EnquiryPic from '../../assets/images/enquirypic.jpg'
import Link from 'next/link'

export default class Enquiry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: { name: "name", error: "", value: "", isRequired: true },
            email: { name: "email", error: "", value: "", isRequired: true },
            yyy_number: { name: "yyy_number", error: "", value: "", isRequired: true },
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
        const { name, email, yyy_number, discription } = this.state


        let model = {
            NAME: name.value,
            EMAIL: email.value,
            MOBILE: yyy_number.value,
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
    }

    componentDidMount() {
        window.scroll(0, 0)
    }

    render() {
        const { name, email, yyy_number, discription } = this.state
        return (
            <React.Fragment>
                <div id="rg-innerbannervtwo" class="rg-enquiryrvtworep">
                </div>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-haslayout rg-sectionspace">
                        <div className="container">
                            <div className="row">
                                <div className="rg-candidatesdetails">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="rg-jobapplycenter rg-jobapplycentervthree">
                                            <div className="rg-companycontent pb-5">
                                                <h3>{this.props.title ? this.props.title : 'This Page is Under Maintainance'}</h3>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12 col-sm-6 col-md-6 col-lg-6 text-center'>
                                                    {/* <div className='reporproblem'>
                                            <h3><span>Call us toll free at</span> +91-8800277577</h3>
                                        </div> */}
                                                    <img style={{ maxWidth: '90%', textAlign: 'center' }} src={EnquiryPic} />
                                                    <div className='comingsoon'>
                                                        <h3 className='text-center'>Check back soon</h3>
                                                        <p className='text-center'>We are working on this.<br />You can browse jobs by <Link href={constant.component.jobsByCategory.url}>Functional Area, Industry,</Link> <Link href={constant.component.jobsByCompany.url}>Company</Link>, <Link href={constant.component.jobsBySkill.url}>Skills</Link> and <Link href={constant.component.jobsByDesignation.url}>Designations.</Link></p>
                                                    </div>
                                                    <div class="rg-btnarea text-center pt-1">
                                                        <a class="rg-btn" href={constant.component.signin.url}>Job Seeker Login</a>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <form className="rg-formtheme repostproblembox"  >
                                                        <fieldset>
                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-users"></i>
                                                                <input type="text" name={this.state.name.name} className={name.error.length > 0
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"} onChange={this.handleChange}
                                                                    value={name.value} placeholder="Your Name:"
                                                                />
                                                                {name.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your name </span> : ""}
                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-envelope"></i>
                                                                <input type="email" name={this.state.email.name}
                                                                    className={email.error.length > 0
                                                                        ? "form-control is-invalid"
                                                                        : "form-control"} onChange={this.handleChange}
                                                                    value={email.value} placeholder="Email Address:"
                                                                />
                                                                {email.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your email </span> : ""}
                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-phone"></i>
                                                                <NumericFormat
                                                                    type="phone"
                                                                    name={this.state.yyy_number.name}
                                                                    className={yyy_number.error.length > 0
                                                                        ? "form-control is-invalid"
                                                                        : "form-control"} onChange={this.handleChange}
                                                                    value={yyy_number.value} placeholder="Mobile Number"
                                                                />
                                                                {yyy_number.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your mobile number </span> : ""}
                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-bubble"></i>
                                                                <textarea className={discription.error.length > 50 ? "form-control is-invalid" : "form-control"} placeholder='Description' name={this.state.discription.name} style={{ height: '150px' }}
                                                                    onChange={this.handleChange} value={discription.value}>

                                                                </textarea>
                                                            </div>

                                                            <div class="rg-btnarea text-right pt-1">
                                                                <button style={{ backgroundColor: "red", color: "white" }} className="rg-btn" type='button' onClick={this.handleSubmit} >Submit</button>
                                                            </div>

                                                        </fieldset>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
