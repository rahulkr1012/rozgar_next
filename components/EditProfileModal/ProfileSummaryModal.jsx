import React, { Component } from 'react'

export default class EditProfileSummaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            profileSummary:this.props.profileSummary
        }
    } 

    onSubmit=(e)=>{
        e.preventDefault()
        let model={
            profileSummary:this.state.profileSummary
        }
        this.props.onSubmit(model)
    }

    onCancel=()=>{
        this.props.onCancel()
    }

  render() {
    return (
        <React.Fragment>
        <p style={{padding:'0 1.7em'}}>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>
        <form className='edit-profile-summary'>
            
            <div className='row'>
                <div class="col-12">
                    <div className='form-group'>
                        <textarea 
                            value={this.state.profileSummary}
                            placeholder='Write here...'
                            onChange={(e)=>{
                                this.setState({
                                    profileSummary:e.target.value
                                })
                            }}>
                            </textarea>
                            {
                                this.props.error && !this.state.profileSummary && <span className="text-danger ml-1">{this.props.error.profileSummary}</span>
                            }
                    </div>
                </div>
            </div>
            
            <div className='row'>
                <div class="col-12 text-right pb-3 pt-3">
                    <button type='button'  className='rg-btn btn-primary mr-2' style={{border:'none', outline:'none'}} onClick={this.onCancel}>CANCEL</button>
                    <button type='button'  className='rg-btn rg-active btn-primary' style={{border:'none', outline:'none'}} onClick={(e)=>this.onSubmit(e)} >SAVE</button>
                </div>
            </div>
        </form>
    </React.Fragment>
    )
  }
}
