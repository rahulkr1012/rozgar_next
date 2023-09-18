import moment from 'moment';
import Multiselect from 'multiselect-react-dropdown';
import React, { Component } from 'react'
import { getMasterSkillsList, getNoticePeriod } from '@/action/CandidateAction';
import constant from 'constant';
import { getCookie } from 'cookies-next';

export default class EditEmploymentModal extends Component {
    constructor(props) {
        super(props);
        const employmentDetails = this.props.employmentDetails

        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            skillList: [],
            selectedSkills: [],
            selected: employmentDetails.SKILL_USED && employmentDetails.SKILL_USED.split(',') || [],
            noticePeriodList: [],
            searchKey: false,
            // currentSalaryInLac:employmentDetails && employmentDetails.CURRENT_ANNUAL_SALARY ? Math.floor((parseInt(employmentDetails.CURRENT_ANNUAL_SALARY_LACS)/100000)) :'',
            // currentSalaryInThousand:employmentDetails && employmentDetails.CURRENT_ANNUAL_SALARY ? (parseInt(employmentDetails.CURRENT_ANNUAL_SALARY_THOUSANDS) / 1000) :'',
            job_profile: employmentDetails && employmentDetails.JOB_PROFILE ? employmentDetails.JOB_PROFILE : '',
            currentCompany: employmentDetails && employmentDetails.CURRENT_COMPANY ? employmentDetails.CURRENT_COMPANY : '',
            currentDesignation: employmentDetails && employmentDetails.CURRENT_DESIGNATION ? employmentDetails.CURRENT_DESIGNATION : '',
            CurrentCurrency: 'INR',
            joiningDateMonth: employmentDetails && employmentDetails.JOINING_DATE_MONTH ? employmentDetails.JOINING_DATE_MONTH : '',
            joiningDateYear: employmentDetails && employmentDetails.JOINING_DATE_YEAR ? employmentDetails.JOINING_DATE_YEAR : '',
            workingDateYear: employmentDetails && employmentDetails.WORKING_TILL_DATE_YEAR ? employmentDetails.WORKING_TILL_DATE_YEAR : '',
            workingDateMonth: employmentDetails && employmentDetails.WORKING_TILL_DATE_MONTH ? employmentDetails.WORKING_TILL_DATE_MONTH : '',
            expectedLastWorkingDate: '',
            // skills_used:employmentDetails,
            np: employmentDetails && employmentDetails.NOTICE_PERIOD_ID ? employmentDetails.NOTICE_PERIOD_ID : '',
            OfferedSalary: employmentDetails && employmentDetails.OFFERED_SALARY ? employmentDetails.OFFERED_SALARY : '',
            OfferedSalaryCurrency: employmentDetails && employmentDetails.OFFERED_SALARY_CURRENCY ? employmentDetails.OFFERED_SALARY_CURRENCY : 'INR',
            OfferedDesignation: employmentDetails && employmentDetails.OFFERED_DESIGNATION ? employmentDetails.OFFERED_DESIGNATION : '',
            NextEmployer: employmentDetails && employmentDetails.NEXT_EMPLOYER ? employmentDetails.NEXT_EMPLOYER : '',
            IsThisYourCurrentCompany: employmentDetails && employmentDetails.IS_THIS_YOUR_CURRENT_COMPANY ? employmentDetails.IS_THIS_YOUR_CURRENT_COMPANY : '',
            haveOffer: employmentDetails && employmentDetails.OFFERED_SALARY && employmentDetails.OFFERED_DESIGNATION && employmentDetails.NEXT_EMPLOYER ? 'Y' : 'N',
            CANDIDATE_EMPLOYER_ID: employmentDetails && employmentDetails.CANDIDATE_EMPLOYER_ID ? employmentDetails.CANDIDATE_EMPLOYER_ID : '',
            CurrentAnnualSalaryThousands: employmentDetails && employmentDetails.CURRENT_ANNUAL_SALARY_THOUSANDS?.toString() ? employmentDetails.CURRENT_ANNUAL_SALARY_THOUSANDS?.toString() / 1000 : '',
            CurrentAnnualSalaryLacs: employmentDetails && employmentDetails.CURRENT_ANNUAL_SALARY_LACS?.toString() ? employmentDetails.CURRENT_ANNUAL_SALARY_LACS?.toString() / 100000 : '',
            ExpectedLastWorkingDayYear: employmentDetails && employmentDetails.EXPECTED_LAST_WORKING_DAY_YEAR ? employmentDetails.EXPECTED_LAST_WORKING_DAY_YEAR : '',
            ExpectedLastWorkingDayMonth: employmentDetails && employmentDetails.EXPECTED_LAST_WORKING_DAY_MONTH ? employmentDetails.EXPECTED_LAST_WORKING_DAY_MONTH : '',
            ExpectedLastWorkingDayDay: employmentDetails && employmentDetails.EXPECTED_LAST_WORKING_DAY_DAY ? employmentDetails.EXPECTED_LAST_WORKING_DAY_DAY : '',
        }
    }

    componentDidMount() {
        this.NoticePeriodList()
        if (this.props.type == "UPDATE") {
            if (this.state.workingDateYear) {
                let date = this.getDateParts(this.state.workingDateYear)
                this.setState({ workingDateYear: date.year })
            }
        }
    }


    getMasterSkillsList = (KEYWORD) => {
        if (KEYWORD && KEYWORD.length > 1) {
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

    NoticePeriodList = () => {
        getNoticePeriod().then((res) => {
            if (res.status) {
                this.setState({
                    noticePeriodList: res.result
                })
            }
        });
    }

    getDateParts = (input) => {
        const mDate = moment(input);
        return {
            date: mDate.format("DD"),
            month: mDate.format("MM"),
            monthName: mDate.format("MMM"),
            year: mDate.format("YYYY"),
            hour: mDate.format("h"),
            minute: mDate.format("mm"),
            seconds: mDate.format("ss"),
            amOrpm: mDate.format("A"),
            relativeTime: mDate.fromNow()
        };
    };

    onSubmit = (e) => {
        e.preventDefault()
        const { job_profile, currentCompany, currentDesignation, CurrentCurrency,
            joiningDateMonth, joiningDateYear, workingDateYear, workingDateMonth, selected,
            skills_used, np, OfferedSalary, OfferedSalaryCurrency, OfferedDesignation, NextEmployer,
            IsThisYourCurrentCompany, CANDIDATE_EMPLOYER_ID, CurrentAnnualSalaryLacs, CurrentAnnualSalaryThousands, ExpectedLastWorkingDayDay,
            ExpectedLastWorkingDayMonth,
            ExpectedLastWorkingDayYear,
        } = this.state
        let skills = this.state.selectedSkills && this.state.selectedSkills.length > 0 ? this.state.selectedSkills[0].map((data, index) => {
            return data.SKILL
        }) : [];

        skills = [...skills, ...selected]
        if (this.props.type == "ADD") {

            // let joiningDate = this.getDateParts(joiningDateYear)

            let model = {
                CurrentDesignation: currentDesignation,
                CurrentCompany: currentCompany,
                IsThisYourCurrentCompany: IsThisYourCurrentCompany,
                JoiningDateYear: joiningDateYear,
                JoiningDateMonth: joiningDateMonth,
                WorkingTillDateYear: workingDateYear,
                WorkingTillDateMonth: workingDateMonth,
                // CurrentAnnualSalary:parseInt(currentSalaryInLac)+parseInt(currentSalaryInThousand),
                CurrentAnnualSalaryLacs: CurrentAnnualSalaryLacs ? parseInt(CurrentAnnualSalaryLacs) * 100000 : 0,
                CurrentAnnualSalaryThousands: CurrentAnnualSalaryThousands ? parseInt(CurrentAnnualSalaryThousands) * 1000 : 0,
                CurrentCurrency: CurrentCurrency,
                Skills: skills,
                JobProfile: job_profile,
                NoticePeriod: np,
                ExpectedLastWorkingDayDay: ExpectedLastWorkingDayDay,
                ExpectedLastWorkingDayMonth: ExpectedLastWorkingDayMonth,
                ExpectedLastWorkingDayYear: ExpectedLastWorkingDayYear,
                OfferedSalary: OfferedSalary,
                OfferedSalaryCurrency: OfferedSalaryCurrency,
                OfferedDesignation: OfferedDesignation,
                NextEmployer: NextEmployer,


                type: 'ADD'
            }
            this.props.onSubmit(model)
        } else {
            let joiningDate = this.getDateParts(joiningDateYear)
            let model = {
                CurrentDesignation: currentDesignation,
                CurrentCompany: currentCompany,
                IsThisYourCurrentCompany: IsThisYourCurrentCompany,
                JoiningDateYear: joiningDateYear,
                JoiningDateMonth: joiningDateMonth,
                WorkingTillDateYear: workingDateYear,
                WorkingTillDateMonth: workingDateMonth,
                // CurrentAnnualSalary:parseInt(currentSalaryInLac)+parseInt(currentSalaryInThousand),
                CurrentAnnualSalaryLacs: CurrentAnnualSalaryLacs ? parseInt(CurrentAnnualSalaryLacs) * 100000 : 0,
                CurrentAnnualSalaryThousands: CurrentAnnualSalaryThousands ? parseInt(CurrentAnnualSalaryThousands) * 1000 : 0,
                CurrentCurrency: CurrentCurrency,
                Skills: skills,
                JobProfile: job_profile,
                NoticePeriod: np,
                ExpectedLastWorkingDayDay: ExpectedLastWorkingDayDay,
                ExpectedLastWorkingDayMonth: ExpectedLastWorkingDayMonth,
                ExpectedLastWorkingDayYear: ExpectedLastWorkingDayYear,
                OfferedSalary: OfferedSalary,
                OfferedSalaryCurrency: OfferedSalaryCurrency,
                OfferedDesignation: OfferedDesignation,
                NextEmployer: NextEmployer,
                CANDIDATE_EMPLOYER_ID: CANDIDATE_EMPLOYER_ID,
                type: "UPDATE"
            }
            this.props.onSubmit(model)
        }

    }

    onCancel = () => {
        this.props.onCancel()

    }

    removeList(data) {
        const { selected } = this.state
        this.setState({ selected: selected.filter(_data => data !== _data) })
    }

    render() {
        const { skillList, selectedSkills, selected } = this.state
        const date = moment().format('Y') == this.state.workingDateYear ? moment().format('M') : moment().format('Y')
        return (
            <React.Fragment>
                <form className='edit-profile-form'>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Designation <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Designation" name="name" value={this.state.currentDesignation} onChange={(e) => {
                                    this.setState({
                                        currentDesignation: e.target.value
                                    })
                                }} />
                                {
                                    this.props.error && !this.state.currentDesignation && <span className="text-danger ml-1">{this.props.error.CurrentDesignation}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label> Company Name <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" id="name" value={this.state.currentCompany} onChange={(e) => {
                                    this.setState({
                                        currentCompany: e.target.value
                                    })
                                }} placeholder="Enter Company Name" name="name" />
                                {
                                    this.props.error && !this.state.currentCompany && <span className="text-danger ml-1">{this.props.error.CurrentCompany}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Is this  your current company <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.IsThisYourCurrentCompany}
                                    onChange={(e) => { this.setState({ IsThisYourCurrentCompany: e.target.value, workingDateMonth: '', workingDateYear: '', np: "" }) }}>
                                    <option value="">--Please select--</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                </select>
                                {
                                    this.props.error && !this.state.IsThisYourCurrentCompany && <span className="text-danger ml-1">{this.props.error.IsThisYourCurrentCompany}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Joining Date Year <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.joiningDateYear} onChange={(e) => { this.setState({ joiningDateYear: e.target.value }) }}
                                >
                                    <option value="" >--Please Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.joiningDateYear && <span className="text-danger ml-1">{this.props.error.JoiningDateYear}</span>
                                }

                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Joining Month <span className='text-danger'>*</span></label>
                                <span className='rg-select'>
                                    <select className="form-control"
                                        value={this.state.joiningDateMonth}
                                        onChange={(e) => { this.setState({ joiningDateMonth: e.target.value }) }}>
                                        <option value=''>--Select Month--</option>
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
                                        this.props.error && !this.state.joiningDateMonth && <span className="text-danger ml-1">{this.props.error.JoiningDateMonth}</span>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.IsThisYourCurrentCompany == 'N'
                        &&
                        <div className='row'>
                            <div class="col-12 col-md-6">
                                <div className='form-group'>
                                    <label>Working Till Year <span className='text-danger'>*</span></label>
                                    <select className="form-control"
                                        value={this.state.workingDateYear} onChange={(e) => { this.setState({ workingDateYear: e.target.value }) }}                                >
                                        <option value="">--Please Select Year--</option>
                                        {
                                            Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                        }
                                    </select>
                                    {
                                        this.props.error && <span className="text-danger ml-1">{this.props.error.WorkingTillDateYear}</span>
                                    }
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div className='form-group'>
                                    <label>Working Till Month <span className='text-danger'>*</span></label>
                                    <span className='rg-select'>
                                        <select className="form-control"
                                            value={this.state.workingDateMonth}
                                            onChange={(e) => { this.setState({ workingDateMonth: e.target.value }) }}>
                                            <option value="">--Select Month--</option>
                                            {date >= 1 ? <option value="1">January</option> : null}
                                            {date >= 2 ? <option value="2">February</option> : null}
                                            {date >= 3 ? <option value="3">March</option> : null}
                                            {date >= 4 ? <option value="4">April</option> : null}
                                            {date >= 5 ? <option value="5">May</option> : null}
                                            {date >= 6 ? <option value="6">June</option> : null}
                                            {date >= 7 ? <option value="7">July</option> : null}
                                            {date >= 8 ? <option value="8">August</option> : null}
                                            {date >= 9 ? <option value="9">September</option> : null}
                                            {date >= 10 ? <option value="10">October</option> : null}
                                            {date >= 11 ? <option value="11">November</option> : null}
                                            {date >= 12 ? <option value="12">December</option> : null}
                                        </select>
                                        {
                                            this.props.error && <span className="text-danger ml-1">{this.props.error.WorkingTillDateMonth}</span>
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    }

                    {/* <div className='row'>
                        <div class="col-6">
                            <div className='form-group'>
                                <label>Total Experience Year <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.TotalExperienceYear} onChange={(e) => { this.setState({ TotalExperienceYear: e.target.value }) }}>
                                    <option value="">--Experience In Years--</option>
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
                                <label>Total Experience Month <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.TotalExperienceMonth}
                                    onChange={(e) => { this.setState({ TotalExperienceMonth: e.target.value }) }}
                                >
                                    <option value="">--Experience In Months--</option>
                                    {
                                        Array.from({ length: 12 }, (_, i) => <option value={i}>{i}  months </option>)
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.TotalExperienceMonth && <span className="text-danger ml-1">{this.props.error.TotalExperienceMonth}</span>
                                }
                            </div>
                        </div>
                    </div> */}



                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>Current Annual Salary <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.CurrentAnnualSalaryLacs} onChange={(e) => { this.setState({ CurrentAnnualSalaryLacs: e.target.value }) }}
                                >
                                    <option value="">--Salary In Lacs--</option>
                                    {
                                        Array.from({ length: 120 }, (_, i) => <option value={i + 0}>{i + 0} Lacs </option>)
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.CurrentAnnualSalaryLacs && <span className="text-danger ml-1">{this.props.error.CurrentAnnualSalaryLacs}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label>&nbsp;</label>
                                <select className="form-control"
                                    value={this.state.CurrentAnnualSalaryThousands} onChange={(e) => { this.setState({ CurrentAnnualSalaryThousands: e.target.value }) }}                                    >
                                    <option selected>--Salary In Thousands--</option>
                                    {
                                        Array.from({ length: 100 }, (_, i) => <option value={i + 0}>{i + 0} Thousands </option>)
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.CurrentAnnualSalaryThousands && <span className="text-danger ml-1">{this.props.error.CurrentAnnualSalaryThousands}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            {
                                selected && selected.length > 0 &&
                                <div className='form-group'>
                                    <label>Previous Selected</label>
                                    <ul>
                                        {
                                            selected && selected.length > 0 && selected.map((data, index) => {
                                                return <li className='key-skills-box' key={index}>{data} &nbsp; &nbsp;<span style={{ cursor: "pointer", color: "#333333", fontSize: "16px" }} onClick={(e) => this.removeList(data)}>x</span></li>

                                            })
                                        }
                                    </ul>


                                </div>

                            }

                            <div className='form-group'>
                                <label>Skills <span className='text-danger'>*</span></label>
                                <Multiselect
                                    options={skillList}
                                    onSelect={(selectedValue) => {
                                        this.setState({ selectedSkills: [...selectedSkills, selectedValue] })
                                    }}
                                    onSearch={e => {
                                        this.getMasterSkillsList(e)
                                    }}
                                    displayValue={"SKILL"}
                                    name={"SKILL_ID"}
                                    placeholder='Select skills'
                                    style={{
                                        optionContainer:
                                            this.state.searchKey ? { display: 'block' } : { display: 'none' }

                                    }}
                                />
                                {
                                    this.props.error && !this.state.selectedSkills[0] && <span className="text-danger ml-1">{this.props.error.SkillsUsed}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label>Job Profile <span className='text-danger'>*</span></label>
                                <textarea placeholder='Start writing from here...' value={this.state.job_profile} onChange={(e) => { this.setState({ job_profile: e.target.value }) }}>

                                </textarea>
                                {
                                    this.props.error && !this.state.job_profile && <span className="text-danger ml-1">{this.props.error.JobProfile}</span>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.IsThisYourCurrentCompany == 'Y'
                        &&
                        <div className='row'>
                            <div class="col-12">
                                <div className='form-group'>
                                    <label>Notice Period <span className='text-danger'>*</span></label>
                                    <select className="form-control"
                                        value={this.state.np}
                                        onChange={(e) => { this.setState({ np: e.target.value, ExpectedLastWorkingDayDay: '', ExpectedLastWorkingDayMonth: '', ExpectedLastWorkingDayYear: '', OfferedSalary: '', OfferedDesignation: '', NextEmployer: '' }) }}>
                                        {
                                            <>
                                                <option >--Please Select Notice Period--</option>
                                                {this.state.noticePeriodList && this.state.noticePeriodList.map((data, index) => {
                                                    return <option value={data.NOTICE_PERIOD_ID}>{data.NOTICE_PERIOD}</option>
                                                })}
                                            </>

                                        }
                                    </select>
                                    {
                                        this.props.error && !this.state.np && <span className="text-danger ml-1">{this.props.error.NoticePeriod}</span>
                                    }
                                </div>
                            </div>
                        </div>}

                    {/* <div className='row'>
                        <div class="col-6">
                            <div className='form-group'>
                                <label>Do you have any offer ?</label>
                                <select className="form-control"
                                    value={this.state.haveOffer}
                                    onChange={(e) => { this.setState({ haveOffer: e.target.value }) }}>
                                    <option value="Y">YES</option>
                                    <option value="N">NO</option>
                                </select>
                            </div>
                        </div>
                    </div> */}

                    {
                        this.state.IsThisYourCurrentCompany == 'Y'
                        &&
                        this.state.np == '5'
                        &&
                        <>
                            <div className='row'>
                                <div class="col-12">
                                    <div className='form-group'>
                                        <label>Expected Last Working Date</label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div className='form-group'>
                                        <label>Day <span className='text-danger'>*</span></label>
                                        <select
                                            className="form-control"
                                            value={this.state.ExpectedLastWorkingDayDay} onChange={(e) => { this.setState({ ExpectedLastWorkingDayDay: e.target.value }) }}>
                                            <option value="">--Select Day--</option>
                                            {
                                                Array.from({ length: 31 }, (_, i) => <option value={i + 1}>{i + 1}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div className='form-group'>
                                        <label>Month <span className='text-danger'>*</span></label>
                                        <select className="form-control"
                                            value={this.state.ExpectedLastWorkingDayMonth}
                                            onChange={(e) => { this.setState({ ExpectedLastWorkingDayMonth: e.target.value }) }}>
                                            <option value="">--Select Month--</option>
                                            <option value="01">January</option>
                                            <option value="02">February</option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>

                                    </div>

                                </div>
                                <div class="col-4">
                                    <div className='form-group'>
                                        <label>Year <span className='text-danger'>*</span></label>
                                        <select
                                            className="form-control"
                                            value={this.state.ExpectedLastWorkingDayYear} onChange={(e) => { this.setState({ ExpectedLastWorkingDayYear: e.target.value }) }}
                                        >
                                            <option value="">--Select Year--</option>
                                            {
                                                Array.from({ length: 2 }, (_, i) => <option value={2023 - i}>{2023 - i}</option>)
                                            }
                                        </select>

                                    </div>

                                </div>
                                {
                                    this.props.error && !this.state.Year && !this.state.Month && !this.state.Day && <span className="text-danger ml-1">{this.props.error.ExpectedLastWorkingDay}</span>
                                }
                            </div>

                            <div className='row'>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Offered Salary</label>
                                        <input type="text" className='form-control' value={this.state.OfferedSalary} onChange={(e) => { this.setState({ OfferedSalary: e.target.value }) }} placeholder="E.g- 4,50,000" />
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Offered Designation</label>
                                        <input type="text" className='form-control' value={this.state.OfferedDesignation} onChange={(e) => { this.setState({ OfferedDesignation: e.target.value }) }} placeholder="Enter Designation Salary" />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div class="col-6">
                                    <div className='form-group'>
                                        <label>Next Employer</label>
                                        <input type="text" className='form-control' value={this.state.NextEmployer} onChange={(e) => { this.setState({ NextEmployer: e.target.value }) }} placeholder="Enter Next Employer Name" />
                                    </div>
                                </div>
                            </div>
                        </>
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
