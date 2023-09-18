import { data } from 'jquery';
import moment from 'moment';
import React, { Component } from 'react'
import constant from 'constant';
import { getCookie } from 'cookies-next';



export default class EditAccomplishmentsCertificateModal extends Component {
    constructor(props) {
        super(props);
        const certificateDetails = this.props.certificateDetails
        this.state = {
            details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            CertifictionName: certificateDetails ? certificateDetails.CERTIFICATION_TITLE : '',
            CertifictionID: certificateDetails ? certificateDetails.CERTIFICATION_ISSUED_ORG_ID : '',
            ValidFromYear: certificateDetails ? certificateDetails.VALID_FROM_YEAR : '',
            ValidFromMonth: certificateDetails ? certificateDetails.VALID_FROM_MONTH : '',
            IsNotExpired: certificateDetails ? certificateDetails.IS_NOT_EXPIRED : 'N',
            ValidToMonth: certificateDetails ? certificateDetails.VALID_TO_MONTH : '',
            ValidToYear: certificateDetails ? certificateDetails.VALID_TO_YEAR : '',
            Description: certificateDetails ? certificateDetails.DESCRIPTION : '',
            CertificationURL: certificateDetails ? certificateDetails.CERTIFICATION_URL : '',
            CERTIFICATION_ID: certificateDetails ? certificateDetails.CERTIFICATION_ID : '',
            isChecked: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { CertifictionName, CertifictionID, ValidFromYear, ValidFromMonth, IsNotExpired, ValidToMonth, ValidToYear, Description, CertificationURL, CERTIFICATION_ID } = this.state
        if (this.props.type == "ADD") {
            let model = {
                CertifictionName: CertifictionName,
                CertifictionID: CertifictionID,
                ValidFromYear: ValidFromYear,
                ValidFromMonth: ValidFromMonth,
                IsNotExpired: IsNotExpired,
                ValidToMonth: ValidToMonth,
                ValidToYear: ValidToYear,
                Description: Description,
                CertificationURL: CertificationURL,
                type: 'ADD'
            }
            this.props.onSubmit(model)
        } else {
            let model = {
                CERTIFICATION_ID: CERTIFICATION_ID,
                CertifictionName: CertifictionName,
                CertifictionID: CertifictionID,
                ValidFromYear: ValidFromYear,
                ValidFromMonth: ValidFromMonth,
                IsNotExpired: IsNotExpired,
                ValidToMonth: ValidToMonth,
                ValidToYear: ValidToYear,
                Description: Description,
                CertificationURL: CertificationURL,
                type: "UPDATE"
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()
    }

    render() {
        const date = moment().format('Y')== this.state.ValidToYear?moment().format('M'):moment().format('Y')
        return (
            <React.Fragment>
                <p style={{padding:'0 1.7em'}}>Add work Sample to get noticed by recruiter faster </p>
                <form className='edit-profile-form'>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group '>
                                <label>Certificate Name <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" value={this.state.CertifictionName} onChange={(e) => { this.setState({ CertifictionName: e.target.value }) }} id="name" placeholder="Enter Certificate Name" name="name" />
                                {
                                    this.props.error && !this.state.CertifictionName && <span className="text-danger ml-1">{this.props.error.CertifictionName}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Certificate URL </label>
                                <input type="text" className="form-control" id="name" value={this.state.CertificationURL} onChange={(e) => { this.setState({ CertificationURL: e.target.value }) }} placeholder="Enter Certificate URL" name="name" />
                                {
                                    this.props.error && !this.state.CertificationURL && <span className="text-danger ml-1">{this.props.error.CertificationURL}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Certificate Start Date Year <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.ValidFromYear} onChange={(e) => { this.setState({ ValidFromYear: e.target.value }) }}
                                >
                                    <option value="">--Please Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)
                                    }
                                </select>

                                {/* <input type="number" min="1900" max="2099" step="1" className="form-control" value={this.state.ValidFromYear} onChange={(e)=>{this.setState({ValidFromYear:e.target.value})}}/> */}
                                {
                                    this.props.error && !this.state.ValidFromYear && <span className="text-danger ml-1">{this.props.error.ValidFromYear}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Certificate Start Date Month <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.ValidFromMonth}
                                    onChange={(e) => { this.setState({ ValidFromMonth: e.target.value }) }}>
                                    <option selected>--Select Month--</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                {
                                    this.props.error && !this.state.ValidFromMonth && <span className="text-danger ml-1">{this.props.error.ValidFromMonth}</span>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.IsNotExpired == 'N'
                            ?
                            < div className='row'>
                                <div class="col-12 col-md-6">
                                    <div className='form-group'>
                                        <label>Certificate End Date Year <span className='text-danger'>*</span> </label>
                                        <select className="form-control"
                                            value={this.state.ValidToYear} onChange={(e) => { this.setState({ ValidToYear: e.target.value }) }}
                                        >
                                            <option >--Please Select Year--</option>
                                            {
                                                Array.from({ length: 50 }, (_, i) => <option value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)
                                            }
                                        </select>
                                        {
                                    this.props.error &&  <span className="text-danger ml-1">{this.props.error.ValidToYear}</span>
                                }
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div className='form-group'>
                                        <label>Certificate End Date Month <span className='text-danger'>*</span></label>
                                        <span className='rg-select'>
                                            <select className="form-control"
                                                value={this.state.ValidToMonth}
                                                onChange={(e) => { this.setState({ ValidToMonth: e.target.value }) }}>
                                                <option value="">--Select Month--</option>
                                                 {date>=1 ? <option value="1">January</option>:null}
                                            {date>=2 ? <option value="2">February</option>:null}
                                            {date>=3 ? <option value="3">March</option>:null}
                                            {date>=4 ? <option value="4">April</option>:null}
                                            {date>=5 ? <option value="5">May</option>:null}
                                            {date>=6 ? <option value="6">June</option>:null}
                                            {date>=7 ? <option value="7">July</option>:null}
                                            {date>=8 ? <option value="8">August</option>:null}
                                            {date>=9 ? <option value="9">September</option>:null}
                                            {date>=10 ? <option value="10">October</option>:null}
                                            {date>=11 ? <option value="11">November</option>:null}
                                            {date>=12 ? <option value="12">December</option>:null}
                                            </select>
                                            {
                                    this.props.error  && <span className="text-danger ml-1">{this.props.error.ValidToMonth}</span>
                                }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                    }
                    <div className='row'>
                        <div class="col-12">
                            <div class="form-check">
                                <input
                                    className="form-check-input"
                                    key=""
                                    type="checkbox"
                                    name=""
                                    id=""
                                    value={this.state.IsNotExpired}
                                    checked={this.state.IsNotExpired == 'Y' ? true : false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            this.setState({ IsNotExpired: 'Y' })
                                            // remove Certificate End Date Year and Certificate End Date Month
                                            this.setState({ValidToYear:''})
                                            this.setState({ValidToMonth:''})
                                        } else {
                                            this.setState({ IsNotExpired: 'N' })
                                        }
                                    }}


                                />
                                <label className='font-weight-600' style={{ paddingLeft: '25px' }}>This certification does not expire</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <label>Description</label>
                            <div className='form-group'>
                                <textarea placeholder='Write here...' value={this.state.Description} onChange={(e) => { this.setState({ Description: e.target.value }) }}>
                                </textarea>

                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-12 text-right pb-3 pt-3">
                            <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel}>CANCEL</button>
                            <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >SAVE</button>

                        </div>
                    </div>
                </form>
            </React.Fragment >
        )
    }
}
