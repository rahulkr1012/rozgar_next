import React from 'react'
import constant from 'constant'
import  NumericFormat  from 'react-number-format'
import ReCAPTCHA from 'react-google-recaptcha'
export default function StudyAbroadDestinationSetion() {
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
                            className= 'form-control'
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
                            id='Name'
                            placeholder='Enter Your First Name' />
                        {/* {firstName.error.length > 0 && !firstName.value && <span className='text-danger ml-1'>{firstName.error}</span>} */}

                    </div>

                    <div className='form-group'>
                        <input type='text'
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
                            className= 'form-control'
                            id='Name'
                            placeholder='Enter Your Last Name' />
                        {/* {lastName.error.length > 0 && !lastName.value && <span className='text-danger ml-1'>{lastName.error}</span>} */}

                    </div>
                    <div className='form-group'>
                        <input type='email'
                            className= 'form-control'
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
                            id='email'
                            placeholder='Enter Your Email Id' />
                    </div>
                    <div className='form-group'>
                        <NumericFormat type='phone'
                            className= 'form-control'
                            name={""}
                            maxLength={10}
                            // onChange={(e) => {
                            //     if (e.target.value !== "") {
                            //         const regexExp = /^[6789][0-9]{9}/
                            //         if (regexExp.test(e.target.value)) {
                            //             let mobile = this.state.mobile
                            //             mobile.value = e.target.value
                            //             this.setState({ mobile: mobile });
                            //         } else {
                            //             let mobile = this.state.mobile
                            //             mobile.value = ''
                            //             this.setState({ mobile: mobile });
                            //         }
                            //     }
                            // }
                            // }
                            id='Number'
                            placeholder='Enter Your Contact Number' />
                        {/* {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>} */}

                    </div>
                    <div className='form-group'>
                        <select
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
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
                        {/* {prefferedStudyDestination.error.length > 0 && !prefferedStudyDestination.value && <span className='text-danger ml-1'>{prefferedStudyDestination.error}</span>} */}
                    </div>
                    <div className='form-group'>
                        <select
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
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
                        {/* {courses.error.length > 0 && !courses.value && <span className='text-danger ml-1'>{courses.error}</span>} */}
                    </div>
                    <div className='form-group'>
                        <textarea rows='3'
                            className= 'form-group'
                            name={""}
                            value={""}
                            // onChange={this.handleChange}
                            placeholder='Your Comment:'>
                        </textarea>
                        {/* {courses.error.length > 0 && !courses.value && <span className='text-danger ml-1'>{courses.error}</span>} */}
                    </div>
                    <ReCAPTCHA
                        sitekey={`6LduKmsgAAAAAGNLTjeYypXIHBOnN-P0U3ETBklE`}
                        // onChange={this.recaptchaHandler}
                        theme='light'
                    />
                    <button type="submit" className='default-btn' style={{marginTop:"5px"}} onClick={e => this.onSubmit(e)}>Submit</button>


                </form>
            </div>
            <div className='what-we-offer'>
                <h3>Other Destinations Similar to Country</h3>
                <ul id='style-3' className='list-sidebar-right'>
                    <li><a href={constant.component.studyInAustralia.url}><i className='fa fa-angle-double-right'></i> Study in Australia</a></li>
                    <li><a href={constant.component.studyInCanada.url}><i className='fa fa-angle-double-right'></i> Study in Canada</a> </li>
                    <li><a href={constant.component.studyInUk.url}><i className='fa fa-angle-double-right'></i> Study in UK</a></li>
                    <li><a href={constant.component.studyInUsa.url}><i className='fa fa-angle-double-right'></i> Study in USA</a></li>
                    <li><a href={constant.component.studyInItaly.url}><i className='fa fa-angle-double-right'></i> Study in Italy</a></li>
                    <li><a href={constant.component.studyInIreland.url}><i className='fa fa-angle-double-right'></i> Study in Ireland</a></li>
                    <li><a href={constant.component.studyInNewZealand.url}><i className='fa fa-angle-double-right'></i>Study in New Zealand</a></li>
                    <li><a href={constant.component.studyInSingapore.url}><i className='fa fa-angle-double-right'></i>  Study in Singapore</a></li>


                </ul>

            </div>

        </div>
    </div>
</React.Fragment>

    )
}
