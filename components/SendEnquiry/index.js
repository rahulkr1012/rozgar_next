import React, { Component } from 'react'
import { clearForm, onChange, validateForm } from 'utils'
import { inquiryForm } from '@/action/jobsByActions'
import swal from 'sweetalert'
import NumericFormat from 'react-number-format'
  
export default function index (){

      const [state, setstate] = React.useState( 
        {
            name: { name: "name", error: "", value: "", isRequired: true },
            email: { name: "email", error: "", value: "", isRequired: true },
            number: { name: "number", error: "", value: "", isRequired: true },
            discription: { name: "discription", error: "", value: "", isRequired: false }
        }
      );
    

       
    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
         setstate({
             ...state,[name] :value 
         })
     }

      

    function handleSubmit(event) {
        const { name, email, number, discription } = state

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

     const { name, email, number, discription } = state


        return (
            <React.Fragment>
                <section className="enquiry-form-area">
                    <div className="inner-enquiry-form-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-enquiry-form-area">
                                        <h2>Enquiry Now</h2>
                                        <div className="form-col-2">
                                            <div className="enquiry-input-box">
                                                <div className="form-group">
                                                    <input
                                                        className={name.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        type="text"
                                                        name={state.name.name}
                                                        onChange={handleChange}
                                                        placeholder="Your Name"
                                                        value={name.value}
                                                    />
                                                    {name.error.length > 0
                                                        ? <span className="text-danger ">  Enter your name </span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <input type="email"
                                                        name={state.email.name}
                                                        className={email.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"}
                                                        onChange={handleChange} placeholder="Email Address"
                                                        value={email.value}
                                                    />
                                                    {email.error.length > 0
                                                        ? <span className="text-danger ">  Enter your email </span> : ""}
                                                </div>
                                                <div className="form-group">
                                                    <NumericFormat
                                                        type="phone" name={state.number.name} className={number.error.length > 0
                                                            ? "form-control is-invalid"
                                                            : "form-control"} onChange={handleChange} placeholder="Mobile Number"

                                                        value={number.value}
                                                    />
                                                    {number.error.length > 0
                                                        ? <span className="text-danger ">  Enter your mobile number </span> : ""}
                                                </div>
                                            </div>
                                            <div className="enquiry-textarea-box">
                                                <textarea className={discription.error.length > 3
                                                    ? "form-control is-invalid"
                                                    : "form-control"} name={state.discription.name} onChange={handleChange} placeholder='Description' style={{ height: '150px' }}

                                                    value={discription.value}
                                                >
                                                </textarea>
                                                <button style={{ backgroundColor: "red", color: "white" }} className="rg-btn" type='button' onClick={handleSubmit} >Submit</button>
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


