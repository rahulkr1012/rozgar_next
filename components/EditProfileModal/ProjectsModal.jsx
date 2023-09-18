import moment from 'moment';
import React, { Component } from 'react'
import { employmentTypeLists, employmerLists, getProjectRole } from '@/action/CandidateAction';
import constant from 'constant';
import { getCookie } from 'cookies-next';


export default class EditProjectsModal extends Component {
    constructor(props) {
        super(props);
        const projectDetail = this.props.projectDetails
         
        this.state = {
            details: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            projectRoleList: [],
            Role: projectDetail ?  projectDetail.PROJECT_ROLE==null?"":  projectDetail.PROJECT_ROLE.PROJECT_ROLE_ID:"",
            ProjectTitle: projectDetail ? projectDetail.PROJECT_TITLE : '',
            employerList: [],
            EmployerId: projectDetail ? projectDetail.CANDIDATE_EMPLOYER_ID : '',
            ProjectStaus: projectDetail ? projectDetail.PROJECT_STATUS : '',
            WorkedFromYear: projectDetail && projectDetail.WORKED_FROM_YEAR ? projectDetail.WORKED_FROM_YEAR : '',
            WorkFromMonth: projectDetail ? projectDetail.WORKED_FROM_MONTH : '',
            WorkTillYear: projectDetail && projectDetail.WORKED_TILL_YEAR ? projectDetail.WORKED_TILL_YEAR : '',
            WorkTillMonth: projectDetail ? projectDetail.WORKED_TILL_MONTH : '',
            ProjectDetails: projectDetail ? projectDetail.PROJECT_DETAILS : '',
            ProjectLocation: projectDetail ? projectDetail.PROJECT_LOCATION : '',
            ProjectSite: projectDetail ? projectDetail.PROJECT_SITE : '',
            NatureOfEmployement: projectDetail ? projectDetail.NATURE_OF_EMOLOYEMENT : '',
            TeamSize: projectDetail ? projectDetail.TEAM_SIZE : '',
            RoleDetails: projectDetail ? projectDetail.ROLE_DETAILS : '',
            SkillsUsed: projectDetail ? projectDetail.SKILLS_USED : '',
            PROJECT_ID: projectDetail ? projectDetail.PROJECT_ID : '',
            employmentTypeList: [],
            addMoreDetails: false
        }
    }


    componentDidMount() {
        this.getProjectRoleList()
        this.getEmploymentTypeList()
        this.getEmployerList()
    }

    getEmployerList = () => {
        employmerLists()
            .then((res) => {
                if (res.status) {
                    this.setState({ employerList: res.result });
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    getEmploymentTypeList = () => {
        employmentTypeLists()
            .then((res) => {
                if (res.status) {
                    this.setState({ employmentTypeList: res.result });
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    getProjectRoleList = () => {
        getProjectRole()
            .then((res) => {
                if (res.status) {
                    let d = res.result.map((data, index) => {
                        return {
                            PROJECT_ROLE_ID: data.PROJECT_ROLE_ID,
                            PROJECT_ROLE: data.PROJECT_ROLE,
                            label: data.PROJECT_ROLE,
                        };
                    })
                    this.setState({
                        projectRoleList: d
                    })
                }
            })
            .catch((err) => {
                alert(err);
            });
    };


    onSubmit = (e) => {
        e.preventDefault()
        const { SkillsUsed, projectRoleList, EmployerId, ProjectTitle, ProjectStaus, WorkedFromYear, WorkFromMonth, WorkTillYear, addMoreDetails,
            WorkTillMonth, ProjectDetails, ProjectLocation, NatureOfEmployement, TeamSize, Role, RoleDetails, PROJECT_ID, ProjectSite } = this.state
        if (this.props.type == "ADD") {
            let model = {
                ProjectTitle: ProjectTitle,
                EmployerId: EmployerId,
                ProjectStaus: ProjectStaus,
                WorkedFromYear: WorkedFromYear,
                WorkFromMonth: WorkFromMonth,
                WorkTillYear: WorkTillYear,
                WorkTillMonth: WorkTillMonth,
                ProjectDetails: ProjectDetails,
                ProjectLocation: ProjectLocation,
                ProjectSite: ProjectSite,
                NatureOfEmployement: NatureOfEmployement,
                TeamSize: TeamSize,
                Role: Role,
                RoleDetails: RoleDetails,
                SkillsUsed: SkillsUsed,
                addMoreDetails: addMoreDetails,
                type: 'ADD'
            }
            this.props.onSubmit(model)
        } else {

            let model = {
                ProjectTitle: ProjectTitle,
                EmployerId: EmployerId,
                ProjectStaus: ProjectStaus,
                WorkedFromYear: WorkedFromYear,
                WorkFromMonth: WorkFromMonth,
                WorkTillYear: WorkTillYear,
                WorkTillMonth: WorkTillMonth,
                ProjectDetails: ProjectDetails,
                ProjectLocation: ProjectLocation,
                ProjectSite: ProjectSite,
                NatureOfEmployement: NatureOfEmployement,
                TeamSize: TeamSize,
                Role: Role,
                RoleDetails: RoleDetails,
                SkillsUsed: SkillsUsed,
                PROJECT_ID: PROJECT_ID,
                addMoreDetails: addMoreDetails,
                type: "UPDATE"
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()
        this.setState({ProjectTitle:'',Role:'',EmployerId:'',NatureOfEmployement:'',
        RoleDetails:'',ProjectStaus:'',WorkedFromYear:'',WorkFromMonth:'',WorkTillYear:'',
        WorkTillMonth:'',ProjectDetails:''})
    }

    render() {
        const { addMoreDetails } = this.state
        const date = moment().format('Y')== this.state.WorkTillYear?moment().format('M'):moment().format('Y')
        return (
            <React.Fragment>
                <form className='edit-profile-form'>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Project Title <span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.ProjectTitle}
                                    onChange={(e) => { this.setState({ ProjectTitle: e.target.value }) }}
                                    id="name"
                                    placeholder="Enter Project Title"
                                    name="name"
                                />
                                {
                                    this.props.error && !this.state.ProjectTitle && <span className="text-danger ml-1">{this.props.error.ProjectTitle}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Project Role <span className='text-danger'>*</span></label>
                                <select
                                    className="form-control"
                                    value={this.state.Role}
                                    onChange={(e) => { this.setState({ Role: e.target.value }) }}                                >
                                    <option value="">Select Project Role</option>
                                    {
                                        this.state.projectRoleList && this.state.projectRoleList.map((data, index) => {

                                            return <option value={data.PROJECT_ROLE_ID}>{data.PROJECT_ROLE}</option>
                                        })
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.Role && <span className="text-danger ml-1">{this.props.error.Role}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Employer</label>
                                <select
                                    className="form-control"
                                    value={this.state.EmployerId}
                                    onChange={(e) => { this.setState({ EmployerId: e.target.value }) }}
                                >
                                    <option value="0">Select Employer</option>
                                    {
                                        this.state.employerList && this.state.employerList.map((data, index) => {
                                            return <option value={data.CANDIDATE_EMPLOYER_ID}>{data.CURRENT_COMPANY}</option>
                                        })
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.EmployerId && <span className="text-danger ml-1">{this.props.error.EmployerId}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Nature Of Employment <span className='text-danger'>*</span></label>
                                <select
                                    className="form-control"
                                    value={this.state.NatureOfEmployement}
                                    onChange={(e) => { this.setState({ NatureOfEmployement: e.target.value }) }}>
                                    <option value="">Select Project Role</option>
                                    {
                                        this.state.employmentTypeList && this.state.employmentTypeList.map((data, index) => {
      
                                            return <option value={data.EMPLOYMENT_TYPE_ID}>{data.EMPLOYMENT_TYPE}</option>
                                        })
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.NatureOfEmployement && <span className="text-danger ml-1">{this.props.error.NatureOfEmployement}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Role Details <span className='text-danger'>*</span></label>
                                <textarea name="" id="" cols="30" rows="10" className='form-control' placeholder='Type here...' value={this.state.RoleDetails} onChange={(e) => { this.setState({ RoleDetails: e.target.value }) }}>
                                </textarea>
                                {
                                    this.props.error && !this.state.RoleDetails && <span className="text-danger ml-1">{this.props.error.RoleDetails}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row radio-btn-box'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Project Status <span className='text-danger'>*</span></label>
                                <div className='d-flex justify-content-between'>
                                    <div class="form-check">
                                        {this.state.ProjectStaus == "I" ? <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"I"} onChange={(e) => { this.setState({ ProjectStaus: "I" ,WorkTillYear:'',WorkTillMonth:''}) }} checked /> : <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"I"} onChange={(e) => { this.setState({ ProjectStaus: "I" ,WorkTillYear:'',WorkTillMonth:'' }) }} />}
                                        <label class="form-check-label" for="flexRadioDefault1">In Progress</label>
                                    </div>
                                    <div class="form-check">
                                        {this.state.ProjectStaus == "C" ? <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"C"} onChange={(e) => { this.setState({ ProjectStaus: "C" }) }} checked /> : <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"C"} onChange={(e) => { this.setState({ ProjectStaus: "C" }) }} />}
                                        <label class="form-check-label" for="flexRadioDefault2">Finished</label>
                                    </div>
                                </div>
                                {
                                    this.props.error && !this.state.ProjectStaus && <span className="text-danger ml-1">{this.props.error.ProjectStaus}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Worked from <span className='text-danger'>*</span></label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <select
                                    className="form-control"
                                    value={this.state.WorkedFromYear}
                                    onChange={(e) => { this.setState({ WorkedFromYear: e.target.value }) }}
                                >
                                    <option value="">--Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={(new Date().getFullYear()) - i}>{(new Date().getFullYear()) - i}</option>)
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.WorkedFromYear && <span className="text-danger ml-1">{this.props.error.WorkedFromYear}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <span className='rg-select'>
                                    <select className="form-control"
                                        value={this.state.WorkFromMonth}
                                        onChange={(e) => { this.setState({ WorkFromMonth: e.target.value }) }}>
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
                                        this.props.error && !this.state.WorkFromMonth && <span className="text-danger ml-1">{this.props.error.WorkFromMonth}</span>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.ProjectStaus == "C"
                        &&
                        <div className='row'>
                            <div class="col-12">
                                <div className='form-group'>
                                    <label>Worked Till <span className='text-danger'>*</span></label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div className='form-group'>
                                    <select
                                        className="form-control"
                                        value={this.state.WorkTillYear}
                                        onChange={(e) => { this.setState({ WorkTillYear: e.target.value }) }}
                                    >
                                        <option value="">--Select Year--</option>
                                        {
                                            Array.from({ length: 50 }, (_, i) => <option value={(new Date().getFullYear()) - i}>{(new Date().getFullYear()) - i}</option>)
                                        }
                                    </select>
                                    {
                                        this.props.error && <span className="text-danger ml-1">{this.props.error.WorkTillYear}</span>
                                    }
                                </div>
                            </div>
                            <div class="col-6">
                                <div className='form-group'>
                                    <span className='rg-select'>
                                        
                                        <select className="form-control"
                                            value={this.state.WorkTillMonth}
                                            onChange={(e) => { this.setState({ WorkTillMonth: e.target.value }) }}>
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
                                        }
                                        {
                                            this.props.error  && <span className="text-danger ml-1">{this.props.error.WorkTillMonth}</span>
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    }

                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Details of Project <span className='text-danger'>*</span></label>
                                <textarea
                                    ProjectDetailField
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="10"
                                    placeholder='Type here...'
                                    value={this.state.ProjectDetails}
                                    onChange={(e) => { this.setState({ ProjectDetails: e.target.value }) }}
                                    className="form-control">
                                </textarea>
                                {
                                    this.props.error && !this.state.ProjectDetails && <span className="text-danger ml-1">{this.props.error.ProjectDetails}</span>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        addMoreDetails
                            ?
                            <div className='row'>
                                <div class="col-6">
                                    <span onClick={(e) => {
                                        this.setState({
                                            addMoreDetails: false
                                        })
                                    }} style={{ color: '#85B4EB',cursor:'pointer' }}>Show Less</span>
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <div class="col-6">
                                    <span onClick={(e) => {
                                        this.setState({
                                            addMoreDetails: true
                                        })
                                    }} style={{ color: '#85B4EB' ,cursor:'pointer'}}>Add More Details</span>
                                </div>
                            </div>

                    }


                    {
                        addMoreDetails
                        &&
                        <>
                            <div className='row'>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Project Location <span className='text-danger'>*</span></label>

                                        <input type="text" className="form-control" value={this.state.ProjectLocation} onChange={(e) => { this.setState({ ProjectLocation: e.target.value }) }} />
                                        {
                                            this.props.error && !this.state.ProjectLocation && <span className="text-danger ml-1">{this.props.error.ProjectLocation}</span>
                                        }
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Team Size <span className='text-danger'>*</span></label>

                                        <input type="number" min="1" max="500" step="1" className="form-control" value={this.state.TeamSize} onChange={(e) => { this.setState({ TeamSize: e.target.value }) }} />
                                        {
                                            this.props.error && !this.state.TeamSize && <span className="text-danger ml-1">{this.props.error.TeamSize}</span>
                                        }
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Project Site <span className='text-danger'>*</span></label>
                                        <select className="form-control"
                                            value={this.state.ProjectSite}
                                            onChange={(e) => { this.setState({ ProjectSite: e.target.value }) }}>
                                            <option value="">--Select Project Site--</option>
                                            <option value="ON">On-Site</option>
                                            <option value="OFF">Off-Site</option>
                                        </select>
                                        {
                                            this.props.error && !this.state.ProjectSite && <span className="text-danger ml-1">{this.props.error.ProjectSite}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div class="col-12">
                                    <div className='form-group'>
                                        <label>Skills Used <span className='text-danger'>*</span></label>
                                        <textarea name="" id="" cols="30" rows="10" placeholder='Type here...' value={this.state.SkillsUsed} onChange={(e) => { this.setState({ SkillsUsed: e.target.value }) }}>

                                        </textarea>
                                        {
                                            this.props.error && !this.state.SkillsUsed && <span className="text-danger ml-1">{this.props.error.SkillsUsed}</span>
                                        }
                                    </div>
                                </div>
                            </div></>
                    }

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
