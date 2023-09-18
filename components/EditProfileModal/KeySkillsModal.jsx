import React, { Component } from 'react'
import Multiselect from 'multiselect-react-dropdown'

import constant from 'constant';
import { getMasterSkillsList } from '@/action/CandidateAction';
import { getCookie } from 'cookies-next';



export default class EditKeySkillsModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            skillList: [],
            selectedSkills: [],
            selected: this.props.skills || [],
            KEYWORD: '',
            searchKey: false
        }
    }

    getMasterSkillsList = (KEYWORD) => {
        if (KEYWORD && KEYWORD.length > 1 ) {
            getMasterSkillsList({ KEYWORD: KEYWORD }).then((res) => {
                if (res.status) {
                    let d = res.result && res.result.map((data, index) => {
                        return {
                            SKILL_ID: data.SKILL_ID,
                            SKILL: data.SKILL,
                            label: data.SKILL
                        }
                    })
                    this.setState({
                        skillList: d || [],
                        searchKey: true
                    })
                }
            });
        } else {
            this.setState({
                skillList: [],
                searchKey: false
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        let selectedId = this.state.selectedSkills && this.state.selectedSkills.length > 0 && this.state.selectedSkills[0].map((data, index) => {
            return data.SKILL_ID
        })
        this.props.onSubmit(selectedId)
    }

    onCancel = () => {
        this.props.onCancel()
    }

    render() {
        const { skillList, selectedSkills, selected } = this.state
        return (
            <React.Fragment>
                
                <p >Tell recruiters what you know or what you are known for e.g. Direct Marketing, Oracle, Java etc. We will send you job recommendations based on these skills. Each skill is separated by a comma.</p>
                   
                    <div className='row'>
                        <div class="col-12">
                            {
                                selected && selected.length > 0 &&
                                <div className='form-group'>
                                    <label>Previous Selected</label>
                                    {
                                        selected && selected.length > 0 && selected.map((data, index) => {
                                            return <span className='key-skills-box'>{data.SKILL}</span>
                                        })
                                    }
                                </div>

                            }
                            <div className='form-group'>
                                <label>Skills<span className='text-danger'>*</span></label>
                                
                                 <Multiselect
                                    placeholder='Select Key Skills'
                                    
                                    style={{
                                        optionContainer:
                                            this.state.searchKey ? { display: 'block' } : { display: 'none' }
                                    }}
                                    options={skillList}
                                    
                                     // onSelect={(selectedValue) => {
                                    //     this.setState({ selectedSkills: [...selectedSkills, selectedValue] })
                                    // }}

                                    // onSelect={(selectedValue) => {
                                    //     this.setState({ selectedSkills: [...selectedSkills, selectedValue] })
                                    // }}

                                    onSelect={(selectedValue) => {
                                        this.setState({ selectedSkills: [...selectedSkills, selectedValue] })
                                    }}
                                    onSearch={(e) => {
                                        this.getMasterSkillsList(e)
                                    }
                                    }
                                    selectedValues={selected ? selected : []}
                                    displayValue={"SKILL"}
                                    name={"SKILL_ID"}
                                />
                                 {
                                this.props.error.selectedSkills && !this.state.selectedSkills.length && <span className="text-danger ml-1">{this.props.error.selectedSkills}</span>
                            }
                            </div>
                           
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-12 text-right pb-3 pt-3">
                            <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel}>CANCEL</button>
                            <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >SAVE</button>

                        </div>
                    </div>
            </React.Fragment>
        )
    }
}
