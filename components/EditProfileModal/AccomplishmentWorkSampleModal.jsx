import moment from 'moment';
import React, { Component } from 'react'
import constant from 'constant';
import { getCookie } from 'cookies-next';


export default class EditAccomplishmentsWorkSampleModal extends Component {
    constructor(props) {
        super(props);
        const workSample = this.props.workSample
        this.state = {
            details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            WorkTitle: workSample ? workSample.WORK_SAMPLE_TITLE : '',
            DurationFromYear: workSample ? workSample.DURATION_FROM_YEAR : '',
            DurationFromMonth: workSample ? workSample.DURATION_FROM_MONTH : '',
            IsCurrentlyWorkingOnThisWork: workSample ? workSample.IS_CURRENTLY_WORKING_ON_THIS_WORK : '',
            DurationToMonth: workSample ? workSample.DURATION_TO_MONTH : '',
            DurationToYear: workSample ? workSample.DURATION_TO_YEAR : '',
            WorkDetails: workSample ? workSample.WORK_DETAILS : '',
            URL: workSample ? workSample.URL : '',
            WORK_SAMPLE_ID: workSample ? workSample.WORK_SAMPLE_ID : '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { WorkTitle, DurationFromYear, DurationFromMonth, IsCurrentlyWorkingOnThisWork, DurationToMonth, DurationToYear, WorkDetails, URL, WORK_SAMPLE_ID } = this.state
        if (this.props.type == "ADD") {
            let model = {
                WorkTitle: WorkTitle,
                URL: URL,
                DurationFromYear: DurationFromYear,
                DurationFromMonth: DurationFromMonth,
                IsCurrentlyWorkingOnThisWork: IsCurrentlyWorkingOnThisWork,
                DurationToMonth: DurationToMonth,
                DurationToYear: DurationToYear,
                WorkDetails: WorkDetails,
                type: 'ADD'
            }
            this.props.onSubmit(model)
        } else {

            let model = {
                WorkTitle: WorkTitle,
                URL: URL,
                DurationFromYear: DurationFromYear,
                DurationFromMonth: DurationFromMonth,
                IsCurrentlyWorkingOnThisWork: IsCurrentlyWorkingOnThisWork,
                DurationToMonth: DurationToMonth,
                DurationToYear: DurationToYear,
                WorkDetails: WorkDetails,
                WORK_SAMPLE_ID: WORK_SAMPLE_ID,
                type: "UPDATE"
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()
    }

    render() {
        const date = moment().format('Y')== this.state.DurationToYear?moment().format('M'):moment().format('Y')
        return (
            <React.Fragment>
                <p style={{padding:'0 1.7em'}}>Add work Sample to get noticed by recruiter faster </p>
                <form>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group edit-accomplishment-form'>
                                <label>Work Title <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" value={this.state.WorkTitle} onChange={(e) => { this.setState({ WorkTitle: e.target.value }) }} id="name" placeholder="Enter Work Title" name="name" />
                                {
                                    this.props.error && !this.state.WorkTitle && <span className="text-danger ml-1">{this.props.error.WorkTitle}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>URL <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" id="name" value={this.state.URL} onChange={(e) => { this.setState({ URL: e.target.value }) }} placeholder="Enter Social Profile URL" name="name" />
                                {
                                    this.props.error  && !this.state.URL &&  <span className="text-danger ml-1">{this.props.error.URL}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Work Sample Start Date Year <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.DurationFromYear} onChange={(e) => { this.setState({ DurationFromYear: e.target.value }) }}
                                >
                                    <option value="">--Please Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)
                                    }
                                </select>
                                {/* <input type="number" min="1900" max="2099" step="1" className="form-control" value={this.state.DurationFromYear} onChange={(e)=>{this.setState({DurationFromYear:e.target.value})}}/> */}
                                {
                                    this.props.error && !this.state.DurationFromYear && <span className="text-danger ml-1">{this.props.error.DurationFromYear}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Work Sample Start Date Month <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.DurationFromMonth}
                                    onChange={(e) => { this.setState({ DurationFromMonth: e.target.value }) }}>
                                    <option value="">--Select Month--</option>
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
                                    this.props.error && !this.state.DurationFromMonth && <span className="text-danger ml-1">{this.props.error.DurationFromMonth}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Currently Working On This Work Sample <span className='text-danger'>*</span></label>
                                <span className='rg-select'>
                                    <select className="form-control"
                                        value={this.state.IsCurrentlyWorkingOnThisWork}
                                        onChange={(e) => { this.setState({ IsCurrentlyWorkingOnThisWork: e.target.value,DurationToYear:'', DurationToMonth:''}) }}>
                                        <option value="">--Select Current Status--</option>
                                        <option value="Y">YES</option>
                                        <option value="N">NO</option>
                                    </select>
                                    {
                                        this.props.error && !this.state.IsCurrentlyWorkingOnThisWork && <span className="text-danger ml-1">{this.props.error.IsCurrentlyWorkingOnThisWork}</span>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.IsCurrentlyWorkingOnThisWork == 'N'
                            ?
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Work Sample End Date Year <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.DurationToYear} onChange={(e) => { this.setState({ DurationToYear: e.target.value }) }}
                                >
                                    <option value={""} >--Please Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                    }
                                </select>
                                {/* <input type="number" min="1900" max="2099" step="1" className="form-control" value={this.state.DurationToYear} onChange={(e) => { this.setState({ DurationToYear: e.target.value }) }} /> */}
                                {
                                    this.props.error  && <span className="text-danger ml-1">{this.props.error.DurationToYear}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Work Sample End Date Month <span className='text-danger'>*</span></label>
                                <span className='rg-select'>
                                    <select className="form-control"
                                        value={this.state.DurationToMonth}
                                        onChange={(e) => { this.setState({ DurationToMonth: e.target.value }) }}>
                                        <option value={""} >--Select Month--</option>
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
                                        this.props.error &&  <span className="text-danger ml-1">{this.props.error.DurationToMonth}</span>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>:''}
                    <div className='row'>
                        <div className='form-group'>
                            <div class="col-12">
                                <label>Work Details</label>
                                <div className='form-group'>
                                    <textarea placeholder='Write here...' value={this.state.WorkDetails} onChange={(e) => { this.setState({ WorkDetails: e.target.value }) }}>

                                    </textarea>

                                </div>
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
            </React.Fragment>
        )
    }
}
