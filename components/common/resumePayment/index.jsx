import { verifyCoupon } from '@/action/CandidateAction'
import React, { useState } from 'react'

const index = (props) => {

    const [code, setCode] = useState('')
    const [verifyRes, setVerifyRes] = useState({ type: '', message: '' })
    const [amount, setAmount] = useState(2000)
    const verify = () => {
        if (code.length > 0)
            verifyCoupon({ CODE: code }).then(res => {
                if (res.status) {
                    setVerifyRes({ type: 'success', message: res.result.message })
                    setAmount(amount - Number(res.result.amount))
                }
                else {
                    setVerifyRes({ type: 'error', message: JSON.stringify(res.error) })
                    setAmount(2000)

                }
            })
    }
    const startPayment = ({ code, amount }) => {
        debugger
        if (verifyRes.type == 'success') {
            props.onPurchase({ code, amount })
        }
        else {
            props.onPurchase({ code: '', amount })
        }
    }
    return (
        <React.Fragment>
            <div className=''>
                <h3>Make Your payment</h3>
            <h7>Don't Miss Out! Claim Your Coupon Code</h7>
                <div className='d-flex align-items-center'>
                    <div>
                        <input
                            className='form-control' style={{ width: "400px", margin: "10px", padding: "10px" }}
                            name='code'
                            placeholder='Enter Code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                    </div>
                    <button style={{
                        height: "41px", display: "block",
                        borderRadius: "5px",
                        color: "#fff",
                        backgroundColor: "red",
                        fontSize: "14px",
                        fontWeight: "500",
                    }} className='rg-btn btn-primary'
                        onClick={() => { verify() }}
                    >
                        Verify</button>

                </div>
                {verifyRes.type.length > 0 && verifyRes.message.length > 0 && <span style={{ display: "block", marginLeft: "10px", width:"400px" }} className={verifyRes.type == 'success' ? 'alert alert-success' : 'alert alert-danger'}>{verifyRes.message} </span>}
                <label style={{ marginLeft: "10px", fontWeight: "bold", color: "#433c3c",fontSize:"15px" }}>Amount:&nbsp; <i className='fa fa-inr' aria-hidden='true'></i>{amount}</label>
                <button className='' style={{
                    display: "block",
                    // margin: "10px auto",
                    padding: "12px",
                    borderRadius: "5px",
                    color: "#fff",
                    backgroundColor: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft:"9px"
                }} onClick={() => { startPayment({ code: code, amount: amount }) }}>Click Here to Pay</button>
            </div>

        </React.Fragment>
    )
}

export default index;
