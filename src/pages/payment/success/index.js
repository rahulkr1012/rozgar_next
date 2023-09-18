import React, { Component } from 'react'
import thankyouPic from '../../../assets/images/thankyou.png'
import { PaymentDetail } from '@/action/personalRecruiter'
import Image from 'next/image'
import Link from 'next/link'

export default class ThankYou extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentDetail: undefined
        }
    }
    componentDidMount() {
        const key = new URLSearchParams(window.location.search).get("txn")
        PaymentDetail(key).then((res) => {
            if (res.status) {
                this.setState({ courseDetails: res.result })
            }
        })
    }
    render() {
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className='rg-breadcrumbarea'>
                        <div className='thankyou-page'>
                            <div className='_header'>
                                <div className='logo'>
                                    <Image src={thankyouPic} alt='' />
                                </div>
                                <h1>Thank You!</h1>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='thankyou-page'>

                                        <div className='_body'>
                                            <div className='_box'>
                                                <h2>
                                                    Thank you ! we have successfully received your aplication
                                                </h2>
                                                <p>
                                                    Our counselor will get back to you within 24 hours
                                                </p>
                                            </div>
                                        </div>
                                        <div className='_footer'>
                                            <p>Having trouble? <Link href=''>Contact us</Link> </p>
                                            <Link className='btn' href='/'>Back to homepage</Link>
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
