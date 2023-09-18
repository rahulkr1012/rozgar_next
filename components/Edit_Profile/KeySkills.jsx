import React, { Component } from 'react'
import { addKeySkills, deleteKeySkills, keySkillsList } from '@/action/CandidateAction';
import swal from 'sweetalert';
import constant from 'constant';
import noSearchFound from '@/assets/images/no-results.png'
import Link from 'next/link';
import ModalWindow from 'components/common/common/ModalWindow';
import EditKeySkillsModel from 'components/EditProfileModal/KeySkillsModal';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { withRouter } from 'next/router';
import Loader from 'components/common/EditProfileLoader/KeySkillLoader'

 class KeySkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            selectedSkills: [],
            error: {},
            showLoader:false
        }
    }

    componentDidMount() {
        this.getCandidateKeySkillsList()
    }

    getCandidateKeySkillsList = () => {
        this.setState({showLoader:true})
        keySkillsList().then((res) => {
            this.setState({showLoader:true})
            if (res.status) {
                this.setState({showLoader:false})
                let d = res.result && res.result.map((data, index) => {
                    return {
                        SKILL_ID: data.SKILL_ID,
                        SKILL: data.SKILL,
                        label: data.SKILL
                    }
                })
                this.setState({
                    selectedSkills: d
                })
            }
        });
    }

    validateForm = (skills) => {
        
        // let data = this.state
        let data = skills
        let error = {}
        let isValid = true

        // if (!data["selectedSkills"]) {
        //     error["selectedSkills"] = "Please select skills"
        //     isValid = false
        // }
        if(!data[0] && this.state.selectedSkills.length==0 ){
            error["selectedSkills"] = "Please select skills"
            isValid = false
        }

        this.setState({
            error: error
        })

        return isValid
    }

    AddUpdateKeySkills = (skills) => {
        const { selectedSkills } = this.state
        let status = this.validateForm(skills)
        if (status) {
            addKeySkills({ Skills: skills }).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.messageCode,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    this.onhideModal()
                    this.getCandidateKeySkillsList()
                    this.props.getCandidateKeySkillsList()
                    this.props.getCandidateDetail()
                } else {
                    swal({
                        icon: "error",
                        text: "Something went wrong!!",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                }
            });
        }
    }

    removeSkills = (data, e) => {
        deleteKeySkills({ SKILL_ID: data.SKILL_ID }).then((res) => {
            if (res.status) {
                this.getCandidateKeySkillsList()
                this.props.getCandidateKeySkillsList()
                this.props.getCandidateDetail()

            }
        })
    }

    onShowModal = () => {
        // const st = this.state
        this.setState({ ...this.state,  showModal: true })
    }


    onhideModal = () => {
        this.setState({ showModal: false ,error:{}})
    }
    render() {
        const { showModal, selectedSkills,showLoader } = this.state
        return (
            <React.Fragment>
                <div className='edprofilerightside'>
                    <div className='edprojobtext'>Key Skills <Link href='' className='pofileupdatetext'
                     onClick={() => this.onShowModal() }>ADD KEY SKILLS</Link></div>
                  
                    <div className='edprofilerightsideinner bb-01'>
                        <div className='pro-job-details'>
                            <div className='grid03'>
                         
                            
                                {showLoader?<Loader/>:
                                    selectedSkills && selectedSkills.length > 0 ? selectedSkills.map((data, index) => {
                                        return <span className='key-skills-box'>{data.SKILL} <i class="fa fa-times" onClick={(e) => { this.removeSkills(data, e) }} aria-hidden="true"></i>
                                        </span>
                                    }) : <div>

                                        <Image src={noSearchFound} style={{ display: "block", margin: "0 auto" }} />
                                        <h6 className='text-center text-danger'>No Key Skills Added</h6>
                                        <p style={{ textAlign: "center" }}>
                                         <Link href={''} style={{ color: "#222222", textDecoration: "none", background: "#ffdede", display: "inline-block", borderRadius: "4px", fontSize: "13px", marginTop: "10px", padding: "6px 20px", marginLeft: "12px" }} onClick={() => { this.onShowModal() }} > Please Add Key Skill  <i style={{ marginLeft: '4px' }} className="fa fa-plus"></i></Link>
                                          </p>
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>

                {showModal && <ModalWindow
                className = "upd-title-mod"
                    title="Key Skills"
                    backdrop="static"
                    toggleModal={this.onhideModal}>

                    <EditKeySkillsModel
                        error={this.state.error}
                        onSubmit={this.AddUpdateKeySkills}
                        onCancel={this.onhideModal}
                        skills={this.state.selectedSkills}
                        props={this.props.router}
                    />
                     
                </ModalWindow>}
            </React.Fragment>
        )
    }
}

export default withRouter(KeySkills)