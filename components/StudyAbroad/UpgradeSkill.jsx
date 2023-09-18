import { courseList } from '@/action/CandidateAction'
import Link from 'next/link'
import constant from 'constant'
import React, { Component } from 'react'
import Shimmer from 'components/common/upgradeSkillsLoader/Shimmer'

export default class UpgradeSkill extends Component {
    constructor() {
        super()
        this.state = {
            data: undefined,
            showLoader : false
        }
    }

    componentDidMount() {
        this.setState({ showLoader: true })
        courseList().then((res) => {
            if (res.status) {
                this.setState({ showLoader: false })
                this.setState({ data: res.result })
            }
        })

    }
    render() {
        const {data} = this.state
        return (
            <React.Fragment>
                { !data && 
                    <main id="rg-main" className="rg-main rg-haslayout pt-0">
                        <Shimmer/>
                    </main>}
                    <section className='main-section-box upgrade-sec'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='skills-had-update'>
                                        <h1>Upgrade Your Skills</h1>
                                        <p>Find courses that are best for your career and improve your skills...</p>
                                    </div>


                                </div>
                            </div>
                            
                            <div className='row'>
                                {this.state.data !== undefined && this.state.data.map((item, index) => {
                                    return (
                                        <div className='col-md-4'>
                                            <Link target="_blank" href={constant.component.courseDetailById.url.replace(':url/:COURSE_ID', item.URL + '/' + item.COURSE_ID)}>
                                                <div className='Upgrade-Skill-box'>
                                                    <div className='upgrade-skills-img'>
                                                        <img src={item.COURSE_IMAGE} />
                                                    </div>
                                                    <div class="skills-text-box"><h2>{item.COURSE_TITLE}</h2></div>
                                                </div>
                                            </Link>
                                        </div>

                                    )
                                })
                                }


                            </div>
                        </div>
                    </section>

                {/* </main> */}
            </React.Fragment>
        )
    }
}
