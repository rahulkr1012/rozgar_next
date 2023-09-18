import React, { Component } from 'react'
import constant from 'constant';
import { getCookie } from 'cookies-next';


export default class EditAccomplishmentsModal extends Component {
    constructor(props) {
        super(props);
        const onlineProfileDetails = this.props.onlineProfileDetails
        this.state = {
            details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            SocialProfileName: onlineProfileDetails ? onlineProfileDetails.SOCIAL_PROFILE : '',
            URL: onlineProfileDetails ? onlineProfileDetails.URL : '',
            Description: onlineProfileDetails ? onlineProfileDetails.PROFILE_DESCRITION : '',
            SOCIAL_PROFILE_ID: onlineProfileDetails ? onlineProfileDetails.SOCIAL_PROFILE_ID : ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { SocialProfileName, URL, Description, SOCIAL_PROFILE_ID } = this.state
        if (this.props.type == "ADD") {
            let model = {
                SocialProfileName: SocialProfileName,
                URL: URL,
                Description: Description,
                type: 'ADD'
            }
            this.props.onSubmit(model)
        } else {

            let model = {
                SocialProfileName: SocialProfileName,
                URL: URL,
                Description: Description,
                SOCIAL_PROFILE_ID: SOCIAL_PROFILE_ID,
                type: "UPDATE"
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()
    }

    render() {
        return (
            <React.Fragment>
                <p style={{padding:'0 1.7em'}}>Add links to your social profiles (e.g. Linkedin profile, Facebook profile, etc.)</p>
                <form className='edit-profile-form'>

                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Social Profile <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" value={this.state.SocialProfileName} onChange={(e) => { this.setState({ SocialProfileName: e.target.value }) }} id="name" placeholder="Enter Social Profile Name" name="name" />
                                {
                                    this.props.error && !this.state.SocialProfileName && <span className="text-danger ml-1">{this.props.error.SocialProfileName}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>URL <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" id="name" value={this.state.URL} onChange={(e) => { this.setState({ URL: e.target.value }) }} placeholder="Enter Social Profile URL" name="name" />
                                {
                                    this.props.error && this.props.error.URL &&<span className="text-danger ml-1">{this.props.error.URL}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                        <div className='form-group'>
                            <label>Description</label>
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
            </React.Fragment>
        )
    }
}
