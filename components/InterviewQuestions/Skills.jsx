import React, { Component } from 'react'
import Link from 'next/link';
import constant from 'constant';
import Shimmer from '../common/Shimmer';

export default class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IT_SKILL_SHOW: false,
            NON_IT_SKILL_SHOW: false

        }
    }
    render() {
        const { IT_SKILL_LIST, IT_SKILL_LIST_COUNT, NON_IT_SKILL_LIST, NON_IT_SKILL_LIST_COUNT } = this.props;
        const { NON_IT_SKILL_SHOW, IT_SKILL_SHOW } = this.state;
        return (
            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
                    <div className='headtext'>Browse Interview Questions by Skills</div>
                    <div className='jobsbylocationColumn colCount_four'>
                        {IT_SKILL_LIST_COUNT === undefined && <Shimmer />}
                        {IT_SKILL_LIST_COUNT !== undefined && IT_SKILL_LIST.length > 0 ? IT_SKILL_LIST.map((item, index) => {

                            if (IT_SKILL_SHOW) {
                                return (
                                <Link href={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', item.URL),
                                    state:{skillId:item.SKILL_ID}
                                }}>{item.SKILL}</Link>)
                            }
                            else if (index < 50) {
                                return (<Link href={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', item.URL),
                                    state:{skillId:item.SKILL_ID}
                                }}>{item.SKILL} </Link>)
                            }


                        }) : ''}

                    </div>
                    <div className='text-right pr-2 pb-1'>
                        <Link href="#" onClick={(e) => this.showITSkills(e)} className='proknowmore'>{IT_SKILL_SHOW ? 'Collapse' : 'View All'}</Link>
                    </div>
                </div>

                <div className='jobsbylocationColumnBox'>
                    <div className='headtext'>Browse Interview Questions By Non-IT Skills</div>
                    <div className='jobsbylocationColumn colCount_four'>
                        {NON_IT_SKILL_LIST_COUNT === undefined && <Shimmer />}
                        {NON_IT_SKILL_LIST_COUNT !== undefined && NON_IT_SKILL_LIST.length > 0 ? NON_IT_SKILL_LIST.map((item, index) => {
                            if (NON_IT_SKILL_SHOW) {
                                return (<Link href={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', item.URL),
                                    state:{skillId:item.SKILL_ID}
                                }}>{item.SKILL}</Link>)
                            }
                            else if (index < 50) {
                                return (<Link href={{ 
                                    pathname:constant.component.interviewQuestionBySkillsId.url.replace(':id', item.URL),
                                    state:{skillId:item.SKILL_ID}
                                }}>{item.SKILL}</Link>)
                            }
                        }) : <Shimmer />}
                    </div><div className='text-right pr-2 pb-1'>
                        <Link href="#" onClick={(e) => { this.showNonITSkills(e) }} className='proknowmore'>{NON_IT_SKILL_SHOW ? 'Collapse' : 'View All'}</Link>
                    </div>
                </div>


            </React.Fragment >
        )
    }
    showNonITSkills = (e) => {
        e.preventDefault();
        const { NON_IT_SKILL_SHOW } = this.state;
        this.setState({ NON_IT_SKILL_SHOW: !NON_IT_SKILL_SHOW })
    }


    showITSkills = (e) => {
        e.preventDefault()
        const { IT_SKILL_SHOW } = this.state;
        this.setState({ IT_SKILL_SHOW: !IT_SKILL_SHOW })
    }
}
