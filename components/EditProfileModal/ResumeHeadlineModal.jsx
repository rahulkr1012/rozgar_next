import React, { Component } from 'react'

export default class EditResumeHeadlineModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            headLine:this.props.headline,
            
        }
    } 

    onSubmit=(e)=>{
        e.preventDefault()
        let model={
            resumeHeadLine:this.state.headLine
        }
        this.props.onSubmit(model)
    }

    onCancel=()=>{
        this.props.onCancel()
    }

  render() {
    return (
        <React.Fragment>

        <p className='' style={{padding:'0 1.7em'}}>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.</p>
        <form className='edit-profile-form' onSubmit={(e)=>this.onSubmit(e)} method="post">
            
            <div className='row'>
                <div class="col-12">
                    <div className='form-group'>
                        <label>Resume Headline<span className='text-danger'>*</span></label>
                        <textarea 
                        value={this.state.headLine}
                        placeholder='Start writing from here...' 
                        maxLength={250}
                        rows={5}
                        onChange={(e)=>{
                            
                            this.setState({
                                headLine:e.target.value
                            })
                        }}>
                        </textarea>
                        {
                            this.props.error && !this.state.headLine && <span className="text-danger ml-1">{this.props.error.resumeHeadLine}</span>
                        }
                        {
                        // this.state.headLine && <p style={{textAlign: "end"}}>{this.state.headLine.length}/250 Character(s) Left</p>
                            <p style={{textAlign: "end"}}>{this.state.headLine ? this.state.headLine.length : 0}/250 Character(s) Left</p>
                        }
                        
                    </div>
                </div>
            </div>
            
            <div className='row'>
                <div class="col-12 text-right pb-3 pt-3">
                    <button type='button'  className='rg-btn btn-primary mr-2' style={{border:'none', outline:'none'}} onClick={this.onCancel}>CANCEL</button>
                    <button  type='button' className='rg-btn rg-active btn-primary' style={{border:'none', outline:'none'}} onClick={(e)=>this.onSubmit(e)} >SAVE</button>
                </div>
            </div>
        </form>
    </React.Fragment>
    )
  }
}
