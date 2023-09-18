import React, { Component, useEffect, useRef } from 'react'
import constant from 'constant';

import { getITMasterSkills, getMasterSkillsList } from '@/action/CandidateAction';
import { Typeahead } from 'react-bootstrap-typeahead';
import { getCookie } from 'cookies-next';



export default class EditItSkillsModal extends Component {
    constructor(props) {
        super(props);
        
        const itSkillsDetails = this.props.itSkills
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            ITSkills: itSkillsDetails ? [{ SKILL_ID: itSkillsDetails.IT_SKILLS_ID, SKILL: itSkillsDetails.IT_SKILLS, label: itSkillsDetails.IT_SKILLS }] : [],
            SKILL_ID: itSkillsDetails ? itSkillsDetails.SKILL_ID : '',
            Version: itSkillsDetails ? itSkillsDetails.SOFTWARE_VERSION : '',
            LastUsed: itSkillsDetails ? itSkillsDetails.LAST_USED : '',
            ExperienceYear: itSkillsDetails ? itSkillsDetails.EXP_YEAR : '',
            ExperienceMonth: itSkillsDetails ? itSkillsDetails.EXP_MONTH : '',
            ITSkillsList: [],
            IT_SKILLS_ID: itSkillsDetails ? itSkillsDetails.IT_SKILLS_ID : '',
        }
        
    }

   
    getITSkillsList = (KEYWORD) => {
        if (KEYWORD && KEYWORD.length > 1) {
        getITMasterSkills({ KEYWORD: KEYWORD }).then((res) => {
            if (res.status) {
                let d = res.result && res.result.map((data, index) => {
                    return {
                        SKILL_ID: data.SKILL_ID,
                        SKILL: data.SKILL,
                        label: data.SKILL
                    }
                })
                this.setState({
                    ITSkillsList: d || []
                })
            }
        });
    }else{
        this.setState({
            ITSkillsList:[]
        })
        
    }
    
    }

  

    onSubmit = (e) => {
        e.preventDefault()
        const { ITSkills, Version, SKILL_ID, LastUsed, ExperienceMonth, ExperienceYear } = this.state
        if (this.props.type == "ADD") {
            let model = {
                ITSkills: ITSkills && ITSkills.map((data, index) => {
                    return data.SKILL
                }),
                SKILL_ID: SKILL_ID,
                Version: Version,
                LastUsed: LastUsed,
                ExperienceYear: ExperienceYear,
                ExperienceMonth: ExperienceMonth,
                type: "ADD"
            }
            this.props.onSubmit(model)

        } else {
            let model = {
                ITSkills: ITSkills && ITSkills.map((data, index) => {
                    return data.SKILL
                }),
                SKILL_ID: SKILL_ID,
                Version: Version,
                LastUsed: LastUsed,
                ExperienceYear: ExperienceYear,
                ExperienceMonth: ExperienceMonth,
                IT_SKILLS_ID: this.state.IT_SKILLS_ID,
                type: 'UPDATE'
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()
    }

    render() {
        const { ITSkillsList, ITSkills } = this.state
        return (
            <React.Fragment>
                <form className='edit-profile-form'>
                    <div className='row'>
                        <div className='col-12'>
                            <p>Specify details about programming languages (such as Java, Python, C/C++, Oracle, SQL etc), softwares (Microsoft Word, Excel, Tally etc) or any other software related knowledge.</p>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Skill / Software Name <span className='text-danger'>*</span></label>

                                <Typeahead
                                    id="ITSkills"
                                    
                                    options={ITSkillsList}
                                    onChange={(selectedValue) => {
                                        this.setState({ ITSkills: selectedValue })
                                    }}
                                    onInputChange={(e) => {
                                        this.getITSkillsList(e)
                                    }}
                                    placeholder="Skill / Software Name"
                                    selected={ITSkills}
                                    defaultSelected={ITSkills}
                                    emptyLabel
                                    inputProps={{
                                        // className: 'my-custom-classname',
                                        style: {
                                            paddingLeft: '1em'
                                        }
                                    }}
                                    
                                />
                                {
                                    this.props.error && !this.state.ITSkills.length && <span className="text-danger ml-1 mt-2">{this.props.error.ITSkills}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Software Version</label>
                                <input type="text" className="form-control" id="name" placeholder="Software Version" name="name"
                                    value={this.state.Version} onChange={(e) => {
                                        this.setState({
                                            Version: e.target.value
                                        })
                                    }} />
                                {/* {
                                    this.props.error && !this.state.Version && <span className="text-danger ml-1">{this.props.error.Version}</span>
                                } */}
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Last Used</label>
                                 
                                <select className="form-control"
                                    value={this.state.LastUsed} onChange={(e) => {
                                        this.setState({
                                            LastUsed: e.target.value
                                        })
                                    }}>
                                     
                                    <option value="">--Last Used--</option>
                                     
                                    {
                                        Array.from( {length: 50}, (_ , i) => <option value={ (new Date()).getFullYear() - i}  > {(new Date()).getFullYear() - i} </option>)
                                    }
                                     
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Experience</label>
                                <select className="form-control"
                                    value={this.state.ExperienceYear} onChange={(e) => {
                                        this.setState({
                                            ExperienceYear: e.target.value
                                        })
                                    }}>
                                    <option value="">--Experience in Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={i + 0}>{i + 0}  years </option>)
                                    }
                                </select>
                                {/* {
                                    this.props.error && !this.state.ExperienceYear && <span className="text-danger ml-1">{this.props.error.ExperienceYear}</span>
                                } */}
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>&nbsp;</label>
                                <select className="form-control"
                                    value={this.state.ExperienceMonth} onChange={(e) => {
                                        this.setState({
                                            ExperienceMonth: e.target.value
                                        })
                                    }}>
                                    <option value="">--Experience in Month--</option>
                                    {
                                        Array.from({ length: 12 }, (_, i) => <option value={i}>{i} Months</option>)
                                    }
                                </select>
                                {/* {
                                    this.props.error && !this.state.ExperienceMonth && <span className="text-danger ml-1">{this.props.error.ExperienceMonth}</span>
                                } */}
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
