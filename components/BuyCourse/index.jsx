import React, { Component } from 'react'
import Link from 'next/link'
import constant from '../../constant'
import NumericFormat from 'react-number-format'
import { onChange, setError, setOptions, validateField, validateForm } from '../../utils'
import { cityList, savePaymentDetail, startcoursetransaction, stateList } from '@/action/CandidateAction'
import Shimmer from '../common/Shimmer'
export default class BuyCourse extends Component {
    details = this.props.details

    constructor(props) {
        super(props)
        this.state = {
            NAME: { name: 'NAME', value: '', error: '', isRequired: true },
            EMAIL: { name: 'EMAIL', value: '', error: '', isRequired: true },
            MOBILE: { name: 'MOBILE', value: '', error: '', isRequired: true },
            COLLEGE: { name: 'COLLEGE', value: '', error: '', isRequired: true },
            YEAR_PASS_OUT: { name: 'YEAR_PASS_OUT', value: '', error: '', isRequired: false },
            STREAM: { name: 'STREAM', value: '', error: '', isRequired: false },
            STATE: { name: 'STATE', value: '', options: [], error: '', isRequired: true },
            CITY: { name: 'CITY', value: '', options: [], error: '', isRequired: true },
            PIN_CODE: { name: 'PIN_CODE', value: '', error: '', isRequired: true },
            ADDRESS: { name: 'ADDRESS', value: '', error: '', isRequired: true }
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'STATE') {
            cityList(value).then(res => {
                if (res.status) {
                    setOptions(this, 'CITY', res.result)

                }
            })
        }
        onChange(this, name, value)
    }
    componentDidMount() {
        stateList(102).then(res => {
            if (res.status) {
                setOptions(this, 'STATE', res.result)
            }
        })
    }

    startSubscription = (e) => {
        e.preventDefault();
        const st = this.state;
        if (validateField(this)) {
            let regex = /^[6789][0-9]{9}/;
            if (!regex.test(st.MOBILE.value)) {
                setError(this, st.MOBILE.name, 'Please enter valid Mobile Number');
                return false;

            }
            const model = {
                AMOUNT: parseInt(e.target.dataset.planPrice, 10) * 100,
                COURSE_ID: this.props?.details?.COURSE_ID,
                NAME: st.NAME.value,
                EMAIL: st.EMAIL.value,
                MOBILE: st.MOBILE.value,
                COLLEGE: st.COLLEGE.value,
                YEAR_PASS_OUT: st.YEAR_PASS_OUT.value,
                STREAM: st.STREAM.value,
                STATE_ID: st.STATE.value,
                CITY_ID: st.CITY.value,
                PIN_CODE: st.PIN_CODE.value,
                ADDRESS: st.ADDRESS.value,
            }

            startcoursetransaction(model).then(res => {
                if (res.status) {
                    const planAmount = parseInt(e.target.dataset.planPrice, 10);
                    const options = {
                        key: process.env.REACT_APP_RAZOR_KEY,
                        amount: planAmount * 100,
                        name: 'Subscription Payment',
                        description: `Payment for ${this.props?.details?.COURSE_TITLE}`,

                        handler(razorResponse) {
                            const paymentId = razorResponse.razorpay_payment_id;
                            savePaymentDetail({ PURCHASE_ID: res.result, PAYMENT_ID: paymentId, TXN_STATUS: 'SUCCESS' }).then((response => {
                                if (response.status) {
                                    // sendMail('Plan subscription', JSON.stringify(response));
                                    window.location.href = constant.component.thankYou.url + '?txn=' + `${response.result}`
                                    // this.props.history.push(constant.component.thankYou.url);
                                    // }, (error) => {
                                    //     alert(error);
                                    // });        
                                }
                            }))

                        },
                        theme: {
                            color: '#0d47a1',
                        },
                    };

                    const rzp1 = (window).Razorpay(options);
                    rzp1.open();
                }
            })
        }


    }

    render() {
        const { details } = this.props
        const { NAME, EMAIL, MOBILE, COLLEGE, YEAR_PASS_OUT, STREAM, STATE, CITY, PIN_CODE, ADDRESS } = this.state
        return (

            <React.Fragment>

                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className='rg-breadcrumbarea'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <ol className='rg-breadcrumb'>
                                        <li><Link href={constant.component.homepage.url}>Home</Link></li>
                                        <li>Learning Hub</li>
                                        <li><a href={constant.component.courseDetailById.url.replace('/:url/:COURSE_ID', "/" + details?.URL + "/" + details?.COURSE_ID)} >{details?.URL}</a></li>
                                        <li>Buy Now</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className='container'>
                            <div className='row'>

                                <div className='col-12 col-sm-12 col-md-5 col-lg-4'>
                                    {details && !details.length ? <div className='rozgarlarninghead'>
                                        <div className='learningjava'><img  src={`${details?.COURSE_IMAGE}`} /></div>
                                        <p className='course-title-bx'>{details?.COURSE_TITLE}</p>
                                        {/* <div className='learningrating'><span><i className='fa fa-star'></i><i className='fa fa-star'></i><i className='fa fa-star'></i><i className='fa fa-star'></i><i className='fa fa-star-half'></i></span><span className='raningnum'>4.5</span> <span>(2 Ratings)</span></div> */}
                                        <div className='feebox'><span className='feetext' style={{ fontSize: "18px" }}>Fee :</span> <span style={{ fontSize: "16px" }}><i className='fa fa-inr' aria-hidden='true'></i> {details?.COURSE_FEE}</span> </div>
                                        <h4>Course eligibility</h4>
                                        <ul className='couserlist'>
                                            <li>{details?.ELIGIBILITY}</li>
                                        </ul>
                                        <div className='description'>
                                            <p>{details?.COURSE_DESCRIPTION}</p>
                                        </div>
                                    </div> : <Shimmer />}

                                </div>
                                <div className='col-12 col-sm-12 col-md-7 col-lg-8'>
                                    <div className='byCourseSection'>
                                        <div className='buy-now-course-title'>
                                            <h5>Buy Course</h5>
                                        </div>
                                        <form>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <input type="text" name={NAME.name} value={NAME.value} className={NAME.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Enter Full Name...' />
                                                        <span className='error text-danger'>{NAME.error.length > 0 ? NAME.error : ""}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <input type="text" name={EMAIL.name} value={EMAIL.value} className={EMAIL.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Enter email id...' />
                                                        <span className='error text-danger'>{EMAIL.error.length > 0 ? EMAIL.error : ""}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <NumericFormat maxLength={10} name={MOBILE.name} value={MOBILE.value} className={MOBILE.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Enter mobile no...' />
                                                        <span className='error text-danger'>{MOBILE.error.length > 0 ? MOBILE.error : ""}</span>
                                                    </div>
                                                </div>


                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <input type="text" name={COLLEGE.name} value={COLLEGE.value} className={COLLEGE.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Enter College/University/Institute Name...' />
                                                        <span className='error text-danger'>{COLLEGE.error.length > 0 ? COLLEGE.error : ""}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <NumericFormat maxLength={4} name={YEAR_PASS_OUT.name} value={YEAR_PASS_OUT.value} className={YEAR_PASS_OUT.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder=' Enter Year of Passout...e.g-(2018)' />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <input type="text" name={STREAM.name} value={STREAM.value} className={STREAM.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Stream...' />
                                                    </div>
                                                </div>




                                                {/* <div className='col-12 col-sm-12 col-md-7 col-lg-8'> */}

                                                {/* </div> */}
                                            </div>
                                        </form>

                                    </div>
                                    <div className='byCourseSection' style={{ marginTop: "20px" }}>
                                        <div className='buy-now-course-title' >
                                            <h5>Billing Address</h5>
                                        </div>
                                        <form>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <input type="text" name={ADDRESS.name} value={ADDRESS.value} className={ADDRESS.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Address' />
                                                        <span className='error text-danger'>{ADDRESS.error.length > 0 ? ADDRESS.error : ""}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <span className="rg-select">
                                                            <select
                                                                style={{ height: "45px" }}
                                                                className={STATE.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                                name={STATE.name}
                                                                value={STATE.value}
                                                                onChange={this.onChange}
                                                            >
                                                                <option value=''>State...</option>
                                                                {STATE.options.map((item, index) => {
                                                                    return (<option value={item.STATE_ID}>{item.STATE}</option>)

                                                                })}
                                                            </select>
                                                            <span className='error text-danger'>{STATE.error.length > 0 ? STATE.error : ""}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <span className="rg-select">
                                                            <select
                                                                style={{ height: "45px" }}
                                                                className={CITY.error.length > 0 ? 'form-control is-invalid' : 'form-control'}
                                                                name={CITY.name}
                                                                value={CITY.value}
                                                                onChange={this.onChange}
                                                            >
                                                                <option value=''>City....</option>
                                                                {CITY.options.map((item, index) => {
                                                                    return (<option value={item.CITY_ID}>{item.CITY}</option>)

                                                                })}


                                                            </select>
                                                            <span className='error text-danger'>{CITY.error.length > 0 ? CITY.error : ""}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div className='form-group'>
                                                        <NumericFormat maxLength={6} name={PIN_CODE.name} value={PIN_CODE.value} className={PIN_CODE.error.length > 0 ? 'form-control is-invalid' : 'form-control'} onChange={this.onChange} placeholder='Pin Code' />
                                                        <span className='error text-danger'>{PIN_CODE.error.length > 0 ? PIN_CODE.error : ""}</span>
                                                    </div>
                                                </div>

                                                <div class="col-12 text-right pb-3 pt-3">
                                                    <button type='button' onClick={(e) => this.startSubscription(e)} data-plan-price={details?.COURSE_FEE} className='rg-btn rg-active btn-primary mr-2'>Pay Now</button>
                                                </div>
                                            </div>
                                        </form>

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
