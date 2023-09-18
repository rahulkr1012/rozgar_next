import React, { Component } from 'react'
import swal from 'sweetalert'
import { PersonalRecruiterEnquiry } from 'src/action/jobsByActions'
import { onChange } from 'src/utils'
import collegeIcon from 'src/assets/images/collegeIcon.jpeg'
import Loader from '../../components/Loader'
export default class CareerEnquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: { name: 'name', value: '', error: '', isRequired: true },
            email: { name: 'email', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            designation: { name: 'designation', value: '', error: '', isRequired: true },
            message: { name: 'message', value: '', error: '', isRequired: true },
            error: {},
        }
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }

    componentDidMount() { }

    validateform = () => {
        let data = this.state
        let error = {}
        let isValid = true
        if (!data['name'].value) {
            let name = data['name']
            name.error = "Please Enter your name"
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
        if (!data['designation'].value) {
            let designation = data['designation']
            designation.error = "Please Enter designation"
            isValid = false
            this.setState({
                designation: designation
            })
        }
        // if (!data['message'].value) {
        //     let message = data['message']
        //     message.error = "Please Enter message"
        //     isValid = false
        //     this.setState({
        //         message: message
        //     })
        // }
        this.setState({ error: error })
        return isValid
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { COLLEGE_ID } = this.props.data[0]
        let status = this.validateform()
        if (status) {
            const { name, email, mobile, message, designation } = this.state
            const model = {
                NAME: name.value,
                EMAIL: email.value,
                CONTACT_NUMBER: mobile.value,
                COURSE: designation.value,
                TYPES: 'Claim college',
                COLLEGE_ID: COLLEGE_ID,
                DESCRIPTION: message.value,

            }
            PersonalRecruiterEnquiry(model).then((res) => {
                if (res.status) {
                    swal({
                        icon: 'success',
                        text: res.result.message,
                        timer: 5000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    })
                    window.location.reload()
                }
                else {
                    swal({
                        icon: 'error',
                        text: res.error,
                        timer: 5000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    })
                }
            }).catch((err) => {
                alert(err)
            })
        }
    }
    render() {
        const { name, email, mobile, message, designation } = this.state
        return (
            <>
                <div id='applycolnow' className=''>
                    <div className='applyboxform'>
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input type="text"
                                            className="form-control"
                                            name={name.name}
                                            value={name.value}
                                            onChange={this.handleChange}
                                            placeholder="Full Name *"
                                        />
                                        {name.error.length > 0 && !name.value && <span className='text-danger ml-1'>{name.error}</span>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email Address *"
                                            name={email.name}
                                            value={email.value}
                                            onChange={this.handleChange}
                                        />
                                        {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mobile Number *"
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
                                            }
                                        />
                                        {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Designation*"
                                            name={designation.name}
                                            value={designation.value}
                                            onChange={this.handleChange}
                                        />
                                        {designation.error.length > 0 && !designation.value && <span className='text-danger ml-1'>{designation.error}</span>}
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <textarea className='form-control'
                                            name={message.name}
                                            value={message.value}
                                            onChange={this.handleChange}
                                            placeholder='Your Message'>

                                        </textarea>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group text-right">
                                <button className="conapplynow" onClick={(e) => { this.onSubmit(e) }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
