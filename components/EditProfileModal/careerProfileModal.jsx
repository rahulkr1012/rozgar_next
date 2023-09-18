import React, { Component } from 'react'
import { CityListDropdown, EmploymentTypeDropdown, FunctionalAreaDropdown, JobIndustryDropdown, JobTypeDropdown, RoleDropdown } from '@/action/CandidateAction';
import constant from 'constant';

import Multiselect from 'multiselect-react-dropdown';
import { getCookie } from 'cookies-next';

export default class EditCareerProfileModal extends Component {
    constructor(props) {
        super(props);
        let careerProfileDetails = this.props.careerProfileDetails
        this.state = {
            cityList: undefined,
            jobTypeList: undefined,
            employmentTypeList: undefined,
            functionalList: undefined,
            roleList: undefined,
            jobIndustry: undefined,
            workLocationInput: '',
            check: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            CurrentIndustry: careerProfileDetails && careerProfileDetails?.CURRENT_INDUSTRY ? careerProfileDetails?.CURRENT_INDUSTRY : '',
            RoleCategory: careerProfileDetails && careerProfileDetails.ROLE_CATEGORY ? careerProfileDetails?.ROLE_CATEGORY : '',
            Role: careerProfileDetails && careerProfileDetails.ROLE_ID ? careerProfileDetails.ROLE_ID : '',
            PreferredShift: careerProfileDetails && careerProfileDetails?.PREFERRED_SHIFT ? careerProfileDetails?.PREFERRED_SHIFT : '',
            ExpectedSalaryCurrency: careerProfileDetails && careerProfileDetails?.EXPECTED_SALARY_CURRENCY ? careerProfileDetails.EXPECTED_SALARY_CURRENCY : '',
            ExpectedSalaryLacs: careerProfileDetails && careerProfileDetails?.EXPECTED_SALARY_LACS ?.toString() ?careerProfileDetails.EXPECTED_SALARY_LACS ?.toString() : '',
            ExpectedSalaryThousands: careerProfileDetails && careerProfileDetails?.EXPECTED_SALARY_THOUSANDS?.toString() ? careerProfileDetails.EXPECTED_SALARY_THOUSANDS?.toString() : '',
            DesiredJobTypes: careerProfileDetails && careerProfileDetails?.DesiredJobTypes ? careerProfileDetails?.DesiredJobTypes?.map((d, i) => {
                return d.JOB_TYPE_ID
            }) : [],
            DesiredJob: [],
            DesiredEmployementTypes: careerProfileDetails && careerProfileDetails.DesiredEmployementTypes ? careerProfileDetails.DesiredEmployementTypes : [],
            PreferredWorkLocations: careerProfileDetails && careerProfileDetails.PreferredWorkLocations ? careerProfileDetails.PreferredWorkLocations : [],
            TotalExperienceYear: careerProfileDetails && careerProfileDetails?.TOTAL_EXP_YEAR ? careerProfileDetails.TOTAL_EXP_YEAR : [],
            TotalExperienceMonth: careerProfileDetails && careerProfileDetails?.TOTAL_EXP_MONTH?.toString() ? careerProfileDetails.TOTAL_EXP_MONTH?.toString() : [],

        }
    }

    componentDidMount() {
        this.getCityListDropdown()
        this.getJobTypeDropdown()
        this.getEmploymentType()
        this.getFunctionalArea()
        this.JobIndustry()

        if (this.props?.careerProfileDetails?.ROLE_CATEGORY) {
            RoleDropdown({ RoleCategory: this.props?.careerProfileDetails?.ROLE_CATEGORY }).then((res) => {

                if (res.status) {
                    this.setState({
                        roleList: res.result
                    })
                }
            });
        }
    }


    getCityListDropdown = () => {
        CityListDropdown().then((res) => {
            if (res.status) {
                let d = res.result && res.result.map((d, i) => {
                    return {
                        WORK_LOCATION_ID: d.CITY_ID,
                        WORK_LOCATION: d.CITY
                    }
                })
                this.setState({
                    cityList: d
                })
            }
        });
    }
    getJobTypeDropdown = () => {
        // const {CANDIDATE_ID}=this.state.detail
        JobTypeDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    jobTypeList: res.result
                })
            }
        });
    }

    getEmploymentType = () => {
        // const {CANDIDATE_ID}=this.state.detail
        EmploymentTypeDropdown().then((res) => {
            if (res.status) {
                let d = res.result && res.result.map((d, i) => {
                    return {
                        EMPLOYMENT_TYPE: d.EMPLOYMENT_TYPE,
                        EMPLOYMENT_TYPE_ID: d.EMPLOYMENT_TYPE_ID
                    }
                })
                this.setState({
                    employmentTypeList: d
                })
            }
        });
    }

    getFunctionalArea = () => {
        // const {CANDIDATE_ID}=this.state.detail
        FunctionalAreaDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    functionalList: res.result
                })
            }
            // this.getRole()
        });

    }

    getRole = (e) => {
        // const {CANDIDATE_ID}=this.state.detail
        this.setState({ RoleCategory: e.target.value })
        const RoleCategory = e.target.value
        RoleDropdown({ RoleCategory:RoleCategory }).then((res) => {
            if (res.status) {
                this.setState({
                    roleList: res.result
                })
            }
        });

    }

    JobIndustry = () => {
        // const {CANDIDATE_ID} = this.state.detail
        JobIndustryDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    jobIndustry: res.result
                })
            }
        })
    }


    onSubmit = (e) => {
        e.preventDefault()
        const { CurrentIndustry, DesiredJob, RoleCategory, Role, PreferredShift, ExpectedSalaryCurrency, ExpectedSalaryLacs, ExpectedSalaryThousands, DesiredJobTypes, DesiredEmployementTypes, PreferredWorkLocations, TotalExperienceYear, TotalExperienceMonth } = this.state
        let model = {
            CurrentIndustry: CurrentIndustry,
            RoleCategory: RoleCategory,
            Role: Role,
            PreferredShift: PreferredShift,
            ExpectedSalaryCurrency: ExpectedSalaryCurrency,
            ExpectedSalaryLacs: ExpectedSalaryLacs ? parseInt(ExpectedSalaryLacs) : "",
            ExpectedSalaryThousands: ExpectedSalaryThousands ? parseInt(ExpectedSalaryThousands) : "",
            DesiredJobTypes: DesiredJobTypes,
            TotalExperienceYear: TotalExperienceYear,
            TotalExperienceMonth: TotalExperienceMonth,
            DesiredEmployementTypes: DesiredEmployementTypes && DesiredEmployementTypes.length > 0 && DesiredEmployementTypes.map((d, i) => {
                return d.EMPLOYMENT_TYPE_ID
            }),
            PreferredWorkLocations: PreferredWorkLocations && PreferredWorkLocations.length > 0 && PreferredWorkLocations.map((d, i) => {
                return d.WORK_LOCATION_ID
            }),
        }
        this.props.onSubmit(model)
    }

    onSelectShift = (e) => {
        this.setState({ PreferredShift: e.target.value })
    }

    onCancel = () => {
        this.props.onCancel()
    }

    onClickChange = (id) => {
        if (this.state.DesiredJobTypes.includes(id)) {
            this.setState({
                DesiredJobTypes: this.state.DesiredJobTypes.filter((item) => (
                    item !== id
                ))
            })
        }
        else {
            this.setState({
                DesiredJobTypes: [...this.state.DesiredJobTypes, id]
            })
        }
    };


    render() {
        const { cityList, PreferredWorkLocations, jobIndustry, RoleCategory, check, DesiredJobTypes, Role, CurrentIndustry, DesiredEmployementTypes, roleList, functionalList, jobTypeList, workLocationInput, employmentTypeList } = this.state

        return (
            <React.Fragment>
                <form className='edit-profile-form'>
                    <div className='row'>
                        <div class="col-12">
                            <p>Fill in details about your current job to help us know your desired job profile. This information will assist us to personalize your job recommendations.</p>
                            <div className='form-group '>
                                <label>Current Industry <span className='text-danger'>*</span></label>
                                <select className="form-control" value={CurrentIndustry} onChange={(e) => this.setState({ CurrentIndustry: e.target.value })}>
                                    <option value="" >Select Current Industry</option>
                                    {

                                        jobIndustry && jobIndustry.map((i) => {
                                            return (
                                                <option value={i.INDUSTRY_ID}>{i.INDUSTRY}</option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.CurrentIndustry && <span className="text-danger ml-1">{this.props.error.CurrentIndustry}</span>
                                }
                            </div>
                        </div>

                        <div class="col-12">
                            <div className='form-group'>
                                <label>Role Category  <span className='text-danger'>*</span></label>
                                <select className="form-control" name='RoleCategory' value={RoleCategory} onChange={(e)=>this.getRole(e)}>
                                    <option value="">Select Role Category</option>
                                    {
                                        functionalList && functionalList.map((i) => {
                                            return (
                                                <option value={i.FUNCTIONAL_AREA_ID}>{i.FUNCTIONAL_AREA}</option>
                                            )
                                        })
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.RoleCategory && <span className="text-danger ml-1">{this.props.error.RoleCategory}</span>
                                }
                            </div>
                        </div>

                        <div class="col-6">
                            <div className='form-group'>
                                <label>Total Experience in Year <span className='text-danger'>*</span></label>
                                <select className="form-control" name='RoleCategory' value={this.state.TotalExperienceYear} onChange={(e) => { this.setState({ TotalExperienceYear: e.target.value }) }}>
                                    <option value="">--Experience in Years--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={i + 1}>{i + 1}  years </option>)
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.TotalExperienceYear && <span className="text-danger ml-1">{this.props.error.TotalExperienceYear}</span>
                                }
                            </div>
                        </div>

                        <div class="col-6">
                            <div className='form-group'>
                                <label>Total Experience in Months <span className='text-danger'>*</span></label>
                                <select className="form-control" name='RoleCategory' value={this.state.TotalExperienceMonth} onChange={(e) => { this.setState({ TotalExperienceMonth: e.target.value }) }}>
                                    <option value="">--Experience in Month--</option>
                                    {
                                        Array.from({ length: 12 }, (_, i) => <option value={i}>{i}  months </option>)
                                    }

                                </select>
                                {
                                    this.props.error && !this.state.TotalExperienceMonth && <span className="text-danger ml-1">{this.props.error.TotalExperienceMonth}</span>
                                }
                            </div>
                        </div>

                        <div class="col-12">
                            <div className='form-group'>
                                <label>Job Role  <span className='text-danger'>*</span></label>
                                <select className="form-control" value={Role} onChange={(e) => this.setState({ Role: e.target.value })}>
                                    <option >Select Job Role</option>
                                    {
                                        roleList && roleList.map((i) => {
                                            return (
                                                <option value={i.ROLE_ID}>{i.ROLE_NAME}</option>
                                            )
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.Role && <span className="text-danger ml-1">{this.props.error.Role}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Desired Employment Type</label>
                                <Multiselect
                                    options={employmentTypeList}
                                    onSelect={(selectedValue) => {
                                        this.setState({ DesiredEmployementTypes: selectedValue })
                                    }}
                                    selectedValues={DesiredEmployementTypes}
                                    name={"EMPLOYMENT_TYPE_ID"}
                                    placeholder='Select Employement'
                                    displayValue={"EMPLOYMENT_TYPE"}
                                    onRemove={(selectedValue) => {
                                        this.setState({ DesiredEmployementTypes: selectedValue })
                                    }}

                                />
                                {
                                    this.props.error && !this.state.DesiredEmployementTypes && <span className="text-danger ml-1">{this.props.error.DesiredEmployementTypes}</span>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Currency  <span className='text-danger'>*</span></label>
                                <select className="form-control" value={this.state.ExpectedSalaryCurrency} onChange={(e) => this.setState({ ExpectedSalaryCurrency: e.target.value })}>
                                    <option value=""> Select Currency</option>
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                </select>
                                {
                                    this.props.error && !this.state.ExpectedSalaryCurrency && <span className="text-danger ml-1">{this.props.error.ExpectedSalaryCurrency}</span>
                                }
                            </div>
                        </div>
                        <div class="col-6">
                            <div className='form-group'>
                                <label>Expected Annual Salary   <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.ExpectedSalaryLacs} onChange={(e) => { this.setState({ ExpectedSalaryLacs: e.target.value }) }}
                                >
                                    <option value="">--Salary In Lacs--</option>
                                    {
                                        Array.from({ length: 200 }, (_, i) => <option value={i+0}>{i+0} Lacs </option>)
                                    }
                                </select>
                                {/* <input type="text" className='form-control' value={this.state.ExpectedSalaryLacs} onChange={(e) => { this.setState({ ExpectedSalaryLacs: e.target.value }) }} placeholder="Enter Salary in Lakhs 100000, 500000" /> */}
                                {
                                    this.props.error && !this.state.ExpectedSalaryLacs && <span className="text-danger ml-1">{this.props.error.ExpectedSalaryLacs}</span>
                                }
                            </div>
                        </div>
                        <div class="col-6">
                            <div className='form-group'>
                                <label>&nbsp;</label>

                                <select className="form-control"
                                    value={this.state.ExpectedSalaryThousands} onChange={(e) => { this.setState({ ExpectedSalaryThousands: e.target.value }) }}                                    >
                                    <option value="">--Salary In Thousands--</option>
                                    {
                                        Array.from({ length: 100 }, (_, i) => <option value={i+0}>{i+0} Thousands </option>)
                                    }
                                </select>
                                {/* <input type="text" className='form-control' value={this.state.ExpectedSalaryThousands} onChange={(e) => { this.setState({ ExpectedSalaryThousands: e.target.value }) }} placeholder="Enter Salary In Thousands 1000, 20000" /> */}
                                {
                                    this.props.error && !this.state.ExpectedSalaryThousands && <span className="text-danger ml-1">{this.props.error.ExpectedSalaryThousands}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='form-group'>
                                <label>Preferred Shift Types <span className='text-danger'>*</span></label>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className='col-4 preferredinline'>
                                        <input type="radio" id="Day" name="shift" value="D" checked={this.state.PreferredShift == 'D' ? true : false} onChange={(e) => { this.setState({ PreferredShift: 'D' }) }} />
                                        <label for="Day">Day</label>
                                    </div>
                                    <div className='col-4 preferredinline'>
                                        <input type="radio" id="Night" name="shift" value="N" checked={this.state.PreferredShift == 'N' ? true : false} onChange={(e) => { this.setState({ PreferredShift: 'N' }) }} />
                                        <label for="Night">Night</label>
                                    </div>
                                    <div className='col-4 preferredinline'>
                                        <input type="radio" id="Flexible" name="shift" value="F" checked={this.state.PreferredShift == 'F' ? true : false} onChange={(e) => { this.setState({ PreferredShift: 'F' }) }} />
                                        <label for="Flexible">Flexible</label>
                                    </div>
                                    {
                                        this.props.error && !this.state.PreferredShift && <span className="text-danger">{this.props.error.PreferredShift}</span>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='form-group'>
                                <label>Desired Job Types</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    {
                                        jobTypeList && jobTypeList.map((i, index) => {
                                            return (
                                                <div class="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        key={index}
                                                        type="checkbox"
                                                        name={i.JOB_TYPE}
                                                        id={i.JOB_TYPE_ID}
                                                        value={i.JOB_TYPE_ID}
                                                        onChange={(e) => this.onClickChange(parseInt(e.target.id))}
                                                        checked={DesiredJobTypes.includes(i.JOB_TYPE_ID)}

                                                    />
                                                    <label className='font-weight-600' style={{ paddingLeft: '25px' }}>{i.JOB_TYPE}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* {
                                this.props.error && !this.state.PreferredShift && <span className="text-danger ml-1">{this.props.error.PreferredShift}</span>
                            } */}
                        </div>
                    </div>

                    <div className='row row-mobile'>
                        <div className="col-12">
                            <div className='form-group'>
                                <label>Preferred Work Location</label>
                                <Multiselect
                                    className='multiselectInput'
                                    options={cityList}
                                    onSelect={(selectedValue) => {
                                        this.setState({ PreferredWorkLocations: selectedValue })
                                    }}
                                    selectedValues={PreferredWorkLocations}
                                    name={"WORK_LOCATION_ID"}
                                    placeholder='Choose Location...'
                                    displayValue={"WORK_LOCATION"}
                                    onRemove={(selectedValue) => {
                                        this.setState({ PreferredWorkLocations: selectedValue })
                                    }}

                                />

                            </div>
                        </div>
                        {/* {
                            this.props.error && !this.state.PreferredWorkLocations && <span className="text-danger ml-1">{this.props.error.PreferredWorkLocations}</span>
                        } */}
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
