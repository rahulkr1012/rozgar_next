import React, { Component } from 'react'
import { InternationalEnquiryForm } from 'src/actions/jobsByAction';
import { onChange } from '@/utils';
import constant from 'constant';
import swal from 'sweetalert';
import NumericFormat from 'react-number-format';

export default class CallBackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: false,
            firstName: { name: 'firstName', value: '', error: '', isRequired: true },
            lastName: { name: 'lastName', value: '', error: '', isRequired: true },
            gender: { name: 'gender', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            comment: { name: 'comment', value: '', error: '', isRequired: true },
            CareerAstrologyServices: { name: 'CareerAstrologyServices', value: '', error: '', isRequired: true },
            DOB: { name: 'DOB', value: '', error: '', isRequired: true },
            DOT: { name: 'DOT', value: '', error: '', isRequired: true },
            village: { name: 'village', value: '', error: '', isRequired: true },
            city: { name: 'city', value: '', error: '', isRequired: true },
            state: { name: 'state', value: '', error: '', isRequired: true },
            pinCode: { name: 'pinCode', value: '', error: '', isRequired: true },
            country: { name: 'country', value: '', error: '', isRequired: true },

        }


         this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.onSubmit.bind(this)

    }

    handleChange(e) {
        ;
        let name = e.target.name
        let value = e.target.value
            this.setState({
                ...this.state ,[name]:{...this.state[name] ,  value:value }  
            })

            // onChange(this, name, value)
   
    }

    // recaptchaHandler = (value) => {

    //     if (value) {
    //         this.setState({
    //             captcha: true
    //         })
    //     } else {
    //         this.setState({
    //             captcha: false
    //         })
    //     }
    // }

    // handleChange(e) {
    //     
    //     let name = e.target.name
    //     let value = e.target.value
    //     onChange(this, name, value)
    // }

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
            comment.error = "Please Enter Your Question"
            isValid = false
            this.setState({
                comment: comment
            })
        }
        if (!data['CareerAstrologyServices'].value) {
            let CareerAstrologyServices = data['CareerAstrologyServices']
            CareerAstrologyServices.error = "Please Enter Career Astrology"
            isValid = false
            this.setState({
                CareerAstrologyServices: CareerAstrologyServices
            })
        }

        if (!data['DOB'].value) {
            let DOB = data['DOB']
            DOB.error = "Please Enter Date Of Birth"
            isValid = false
            this.setState({
                DOB: DOB
            })
        }
        if (!data['DOT'].value) {
            let DOT = data['DOT']
            DOT.error = "Please Enter Your Birth Time"
            isValid = false
            this.setState({
                DOT: DOT
            })
        }
        if (!data['village'].value) {
            let village = data['village']
            village.error = "Please Enter Your Village"
            isValid = false
            this.setState({
                village: village
            })
        }
        if (!data['city'].value) {
            let city = data['city']
            city.error = "Please Enter your city"
            isValid = false
            this.setState({
                city: city
            })
        }
        if (!data['state'].value) {
            let state = data['state']
            state.error = "Please Enter your state"
            isValid = false
            this.setState({
                state: state
            })
        }
        if (!data['pinCode'].value) {
            let pinCode = data['pinCode']
            pinCode.error = "Please Enter Your PinCode"
            isValid = false
            this.setState({
                pinCode: pinCode
            })
        }

        if (!data['country'].value) {
            let country = data['country']
            country.error = "Please Enter Your Country"
            isValid = false
            this.setState({
                country: country
            })
        }
        if (!data['gender'].value) {
            let gender = data['gender']
            gender.error = "Please Select Your gender"
            isValid = false
            this.setState({
                gender: gender
            })
        }
        this.setState({
            error: error
        })

        return isValid
    }

    onSubmit(e) {
         
        e.preventDefault();
        const { firstName, lastName, mobile, comment, CareerAstrologyServices, DOB, DOT, city, state, pinCode, village, country, gender } = this.state

        const model = {
            NAME: firstName.value,
            LASTNAME: lastName.value,
            GENDER: gender.value,
            CONTACT_NUMBER: mobile.value,
            DESCRIPTION: comment.value,
            SERVICES: CareerAstrologyServices.value,
            DOB: DOB.value,
            DOT: DOT.value,
            VILLAGE_DIST: village.value,
            CITY: city.value,
            STATE: state.value,
            COUNTRY: country.value,
            PINCODE: pinCode.value,
            TYPES: "Carrer Astrology",

        }

        if (this.validateEnquiryForm()) {
            InternationalEnquiryForm(model).then((res) => {
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
    const { firstName, lastName, mobile, comment, CareerAstrologyServices, DOB, DOT, city, state, pinCode, village, country, gender } = this.state

    return (
      <React.Fragment>
          <div className='quik-call-back-bx'>
              <h4>Career Astrology - Quick Contact</h4>
              <form>
                   <div className='row'>  
                    <div className='col-md-6'>
                        <div className='form-group'>
                        <label>First Name</label>
                        <input className={firstName.error.length > 0 ? "form-control is-invalid" :'form-control' }
                        name={firstName.name}
                        value={firstName.value}
                        onChange={this.handleChange}
                         type='text'
                         placeholder='First Name' />
                         {firstName.error.length > 0 && !firstName.value && <span className='text-danger ml-1'>{firstName.error}</span>}

                    </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                        <label>Last Name</label>
                        <input className={lastName.error.length > 0 ? "form-control is-invalid" :'form-control' }
                        name={lastName.name}
                        value={lastName.value}
                        onChange={this.handleChange}
                         type='text'
                         placeholder='Last Name' />
                          {lastName.error.length > 0 && !lastName.value && <span className='text-danger ml-1'>{lastName.error}</span>}
                    </div>
                    </div>
                    </div>
                    <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                        <label>Gender</label>
                        <select
                        name={gender.name}
                        value={gender.value}
                        onChange={this.handleChange}
                        
                        >
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {gender.error.length > 0 && !gender.value && <span className='text-danger ml-1'>{gender.error}</span>}

                    </div>
                    </div> 
                    <div className='col-md-6'>
                        <div className='form-group'>
                        <label>Career Astrology Services</label>
                        <select
                        name={CareerAstrologyServices.name}
                        value={CareerAstrologyServices.value}
                        onChange={this.handleChange}
                        >
                            <option value="Career Report 1 Year">Career Report 1 Year</option>
                            <option value="Career Report 2 Year">Career Report 2 Year</option>
                            <option  value="Career Report 3 Year">Career Report 3 Year</option>
                            <option  value="Career Report 4 Year">Career Report 4 Year</option>
                            <option  value="Remedial Solution For Career">Remedial Solution For Career</option>
                            <option  value="Strength Reading For Career">Strength Reading For Career</option>
                            <option  value="Career Ask 1 Question">Career Ask 1 Question</option>
                            <option  value="Career Ask 2 Question">Career Ask 2 Question</option>
                            <option  value="Career Ask 3 Question">Career Ask 3 Question</option>
                            <option  value="other">other</option>
                        </select>
                        {CareerAstrologyServices.error.length > 0 && !CareerAstrologyServices.value && <span className='text-danger ml-1'>{CareerAstrologyServices.error}</span>}

                    </div>
                    </div> 

                    </div>
                    <div className='row'>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label>Date of Birth / Birth Time </label>
                            <input className={DOB.error.length > 0 ? "form-control is-invalid" :'form-control' }
                             type='date'
                             name={DOB.name}
                             value={DOB.value}
                             onChange={this.handleChange}
                              placeholder='DD/MM/YYYY' />
                             {DOB.error.length > 0 && !DOB.value && <span className='text-danger ml-1'>{DOB.error}</span>}
                        </div>
                    </div>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label className='sr-only'>Birth Time </label>
                            <input className={DOT.error.length > 0 ? "form-control is-invalid time-input-form" :'form-control time-input-form' }
                            name={DOT.name}
                            value={DOT.value}
                            onChange={this.handleChange}
                             type='time'
                             placeholder='00:00 AM/PM' />
                             {DOT.error.length > 0 && !DOT.value && <span className='text-danger ml-1'>{DOT.error}</span>}

                        </div>
                    </div>

                    </div>
                    <div className='row'>
                    <div className='col-md-12'>
                         
                         <div className='form-group'>
                            <label>Village/Dist </label>
                            <input className={DOT.error.length > 0 ? "form-control is-invalid" :'form-control' }
                             type='text'
                             name={village.name}
                             value={village.value}
                             onChange={this.handleChange}
                             placeholder='Village/Dist' />
                             {village.error.length > 0 && !village.value && <span className='text-danger ml-1'>{village.error}</span>}

                        </div>
                    </div>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label className='sr-only'>city </label>
                            <input className={city.error.length > 0 ? "form-control is-invalid" :'form-control' }
                             type='text'
                             name={city.name}
                             value={city.value}
                             onChange={this.handleChange}
                             placeholder='City' />
                             {city.error.length > 0 && !city.value && <span className='text-danger ml-1'>{city.error}</span>}

                        </div>
                    </div>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label className='sr-only'>State</label>
                            <input className={state.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                            name={state.name}
                            value={state.value}
                            onChange={this.handleChange}
                            type='text' 
                            placeholder='State' />
                            {state.error.length > 0 && !state.value && <span className='text-danger ml-1'>{state.error}</span>}

                        </div>
                    </div>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label className='sr-only'>Pincode</label>
                            <input className={pinCode.error.length > 0 ? "form-control is-invalid" : 'form-control'}
                            name={pinCode.name}
                            value={pinCode.value}
                            onChange={this.handleChange}
                             type='text' 
                             placeholder='Pincode' />
                             {pinCode.error.length > 0 && !pinCode.value && <span className='text-danger ml-1'>{pinCode.error}</span>}

                        </div>
                    </div>
                    <div className='col-md-6'>
                         
                         <div className='form-group'>
                            <label className='sr-only'>Country </label>
                            <input className={country.error.length > 0 ? "form-control is-invalid" :'form-control' }
                            name={country.name}
                            value={country.value}
                            onChange= {this.handleChange}
                            type='text' placeholder='Country' />
                            {country.error.length > 0 && !country.value && <span className='text-danger ml-1'>{country.error}</span>}

                        </div>
                    </div>

                    </div>


                    <div className='row'>  
                    <div className='col-md-12'>
                        <div className='form-group'>
                        <label>Phone </label>
                        <NumericFormat className={mobile.error.length > 0 ? "form-control is-invalid" :'form-control' }
                        type='text'
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
                        placeholder='Phone' />
                        {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

                    </div>
                    </div>
                    </div>


                    <div className='row'>  
                    <div className='col-md-12'>
                        <div className='form-group'>
                        <label>Ask Question </label>
                        <textarea 
                        name={comment.name}
                        value={comment.value}
                        onChange={this.handleChange}
                        placeholder='Question'>

                        </textarea>
                        {comment.error.length > 0 && !comment.value && <span className='text-danger ml-1'>{comment.error}</span>}

                    </div>
                    </div>
                    </div>


                    <div className='row'>  
                    <div className='col-md-12'>
                        <div className='form-group'>
                       <button type='submit' onClick={e => this.onSubmit(e)}>Submit</button>
                    </div>
                    </div>
                    </div>

                                    
              </form>

          </div>
      </React.Fragment>
    )
  }
}
