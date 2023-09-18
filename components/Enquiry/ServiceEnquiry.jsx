import React, { Component } from 'react'
import { clearForm, onChange, validateForm} from '../../utils'
import { inquiryForm } from '../../action/jobsByActions'
import swal from 'sweetalert'
import NumericFormat from 'react-number-format'
import enquirypic2   from '../../assets/images/enquirypic2.jpg'

export default class ServiceEnquiry extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: { name: "name", error: "", value: "", isRequired: true },
            email: { name: "email", error: "", value: "", isRequired: true },
            number: { name: "number", error: "", value: "", isRequired: true },
            discription: { name: "discription", error: "", value: "", isRequired: false}
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
           
      if(validateForm(this)){        
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

     render () {
        const { name, email, number, discription } = this.state
        return (
            <React.Fragment>

                <main id="rg-main" className="rg-main rg-haslayout">

                    <div className="rg-haslayout rg-sectionspace">
                        <div className="container">
                            <div className="row">
                                <div className="rg-candidatesdetails">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="rg-jobapplycenter rg-jobapplycentervthree">
                                            <div className="rg-companycontent pb-5">
                                                <h3>{this.props.title ? this.props.title : 'Enquiry'}</h3>
                                                <div class="feature-line"><span class="animate-bar"></span></div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-12 col-sm-6 col-md-6 col-lg-6 text-center'>

                                                    <img style={{ maxWidth: '90%', textAlign: 'center' }} src={enquirypic2} />

                                                </div>

                                                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <form className="rg-formtheme repostproblembox" >
                                                        <fieldset >
                                                            <div className=" form-group rg-reportIssue ">
                                                                <i className="lnr lnr-users"></i>
                                                                <input
                                                                    className={name.error.length > 0
                                                                        ? "form-control is-invalid"
                                                                        : "form-control"}
                                                                    type="text"
                                                                    name={this.state.name.name}
                                                                    onChange={this.handleChange}
                                                                    placeholder="Your Name:"
                                                                    value={name.value}
                                                                />
                                                                {name.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your name </span> : ""}

                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-envelope"></i>
                                                                <input type="email"
                                                                    name={this.state.email.name}
                                                                    className={email.error.length > 0
                                                                        ? "form-control is-invalid"
                                                                        : "form-control"}
                                                                    onChange={this.handleChange} placeholder="Email Address:"
                                                                    value={email.value}
                                                                />
                                                                {email.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your email </span> : ""}

                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-phone"></i>
                                                                <NumericFormat
                                                                 type="phone" name={this.state.number.name} className={number.error.length > 0
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"} onChange={this.handleChange} placeholder="Mobile Number"

                                                                    value={number.value}
                                                                />
                                                                {number.error.length > 0
                                                                    ? <span className="text-danger ">  Enter your mobile number </span> : ""}

                                                            </div>

                                                            <div className="form-group rg-reportIssue">
                                                                <i className="lnr lnr-bubble"></i>

                                                                
                                                                <textarea className={discription.error.length > 3
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"} name={this.state.discription.name} onChange={this.handleChange} placeholder='Description' style={{ height: '150px' }}

                                                                    value={discription.value}
                                                                >
                                                                </textarea>

                                                            </div>

                                                            <div className="rg-btnarea text-right pt-1">
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
