import React, { Component } from 'react'
import moment from 'moment'
import { LoiList } from '@/action/CandidateAction'
import { getStorage } from '../../utils';
import constant from 'constant';
import Image from 'next/image';
export default class LoiPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // detail: getStorage(constant.keys.cd),
            listLoi: '',
            OfferId: ''
        }
    }

    componentDidMount() {
        // this.getLoilist(this.props.JOB_ID)
    }

    getLoilist = (JOB_ID) => {
      
        LoiList(JOB_ID).then((res) => {
            if (res.status) {
                this.setState({ listLoi: res.result })
              
                this.props.getOfferId(res.result.OFFER_ID)
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        const { listLoi } = this.props
        return (
            <React.Fragment>
                <div className='col-md-9'>
                    <div className='' style={{ border: "2px solid #ddd", padding: '20px', borderRadius: '4px' }}>
                        <table style={{ width: '100%', marginTop: "10px", textAlign: 'center' }} id="offerletter">
                            <tbody>

                                <tr>
                                    <td colSpan={2} style={{ textAlign: "right" }} >
                                        <Image src={process.env.NEXT_PUBLIC_BASE_URL + `/company/logo/${listLoi?.COMPANY_LOGO}`} style={{ width: "100px", textAlign: "center" }} /></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ height: "4px" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ textAlign: "center" }} >
                                        <h4><strong>Letter of Intent</strong></h4>
                                    </td>
                                </tr>

                                <tr>
                                    <td width="397">Dear <strong>{listLoi?.CANDIDATE_NAME}</strong></td>
                                    <td width="397" style={{ textAlign: "right", align: "right" }} ><strong>Date: </strong>
                                        {/* {this.state.listLoi?.CREATED_ON} */}
                                        {moment(listLoi?.CREATED_ON).format('Do MMM YYYY')}
                                    </td>

                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>Thank you for the keen interest you have shown in our organization. Consequent to your application and the subsequent discussions you had with us, we are pleased  to offer you a career with us at CTC of Rs<strong>.{listLoi?.CTC} LPA.</strong></td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>We welcome your decision to join our organization as <strong>{listLoi?.DESIGNATION} </strong>We are sure that together we will preserve the Core Values  that we stand for and work towards  a mutually beneficial relationship.</td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>You are requested to contact to take  on your assignment on or before <strong>{moment(listLoi?.DOJ).format('Do MMM YYYY')}</strong> at the following Address:  </td>
                                </tr>

                                <tr>
                                    <td colSpan={2}> <strong>{listLoi?.COMPANY_NAME}<br />
                                        {listLoi?.ADDRESS}<br />
                                        {listLoi?.CITY}  {listLoi?.STATE}  {listLoi?.COUNTRY}
                                    </strong></td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>A formal letter of appointment including the service terms  and conditions will be issued to you on your joining. However, it is clarified  that initially you shall be on probation of six months, which shall be extendable, and you shall not be deemed to be confirmed till you are confirmed in writing. The contract  will be terminable by giving <strong>{listLoi?.NOTICE_PERIOD} &rsquo; notice </strong>or without any notice upon performance / fitment / attitude  issues or any breach of terms.</td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>If your services  are found satisfactory during the probation period, you will be confirmed in the present position. After confirmation your services may be terminated by giving notice  in writing for Two month or payment of Two month&rsquo;s salary in  lieu thereof.</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>In case you need any further clarification / assistance,  please get in touch with the undersigned.</td>
                                </tr>
                                {/* <tr>
                                    <td colSpan={2}  style={{ textAlign: "right" }} >
                                        <img src={process.env.NEXT_PUBLIC_BASE_URL + `/company/logo/${listLoi?.COMPANY_LOGO}`} style={{ width: "100px", textAlign: "center" }} /></td>
                                </tr> */}
                                <tr>
                                    <td colSpan={2}>You are supposed to bring  submit the copy for the list  of documents as mentioned in Annexure 1, enclosed with this offer letter.</td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>You are being offered on the presumption that the  particulars furnished by you in your Application and/or Resume are correct. In  case the said particulars are found to be incorrect or that you have concealed  or withheld some other relevant facts, your offer with the company shall stand  Terminated/Cancelled without any notice.</td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ lineHeight: "20px" }}>Please sign and return to us the duplicate copy of this  letter as a token of your acceptance. I hope that your tenure with us would  bring about prosperity and mutually fruitful relationships. This offer is  subject to your joining us on or before <strong>{moment(listLoi?.DOJ).format('Do MMM YYYY')}.</strong></td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>Looking forward to you joining the {listLoi?.COMPANY_NAME} team.</td>
                                </tr>

                                <tr>
                                    <td style={{ lineHeight: '1' }}>Best wishes,<br />
                                        <strong>For</strong><br />
                                        <strong>{listLoi?.COMPANY_NAME}</strong></td>
                                    <td style={{ width: "397px", lineHeight: '1' }}>I accept this offer<br /><br />
                                        <hr style={{ borderTop: "2px dotted #444444" }} /><br />
                                        Signature of the candidate</td>
                                </tr>

                                <tr>
                                    <td colSpan={2}><strong>Encl.:</strong><br />
                                        <strong style={{ marginLeft: '20px' }}>1. </strong>List of Documents to be submitted <strong>(Annexure1)</strong>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ textAlign: "center" }} ><strong>Annexure  1</strong></td>
                                </tr>

                                <tr>
                                    <td colSpan={2}><p style={{ textAlign: "center" }}><strong><u>List of Documents to be submitted at  the time of Joining</u></strong><strong> </strong></p></td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>On the date of joining, it is  mandatory for you to submit the photocopies of the following documents (Please  do bring the original testimonials for verification purpose):-</td>
                                </tr>

                                <tr>
                                    <td colSpan={2}>
                                        <ol style={{ marginLeft: '20px' }}>
                                            <li>Relieving  Letter/Certificate from the previous Employer.</li>
                                            <li>Proof  of last salary drawn salary (copy of salary certificate/salary slip).</li>
                                            <li>Experience  Certificate from the previous employer.</li>
                                            <li>Educational  Certificates &amp; mark sheets (Class 10th/12th/equivalent onwards)</li>
                                            <li>Copy  of Driving License/Passport/Photo I.D Proof.</li>
                                            <li>Passport  Size photographs (4 in nos.)</li>
                                            <li>Cancelled Cheque</li>
                                            <li>Vaccination Certificate</li>
                                        </ol></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                </tr>
                                {(listLoi?.MEDICLAIM || listLoi?.ACCIDENTAL_INSURANCE) && <tr>
                                    <td colSpan={2}>Medical Benefits:</td>
                                </tr>}
                                <tr>
                                    <td colSpan={2} style={{ height: "0px" }}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <ol style={{ marginLeft: '20px' }}>
                                            {listLoi?.MEDICLAIM && <li>Mediclaim  – {listLoi?.MEDICLAIM}</li>}
                                            {listLoi?.ACCIDENTAL_INSURANCE && <li>Accidental  insurance – {listLoi?.ACCIDENTAL_INSURANCE}</li>}
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
