import { KeywordSearch, LocationSearch } from '@/action/dashboard'
import { createJobAlert, FunctionalAreaList, IndustryList } from '@/action/jobsByActions'
import { onChange, setOptions } from '@/utils'
import constant from 'constant'
import Link from 'next/link'
import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import  NumericFormatBase  from 'react-number-format'
import swal from 'sweetalert'

export default class CreateJobAlert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // keyWords: { name: 'keyWords', value: '', error: '', isRequired: true },
            totalExperience: { name: 'totalExperience', value: '', error: '', isRequired: false },
            LOCATION: { name: 'LOCATION', value: [], options: [], error: '', isRequired: false },
            prefferedIndustry: { name: 'prefferedIndustry', value: '', error: '', isRequired: false },
            prefferedDepartment: { name: 'prefferedDepartment', value: '', error: '', isRequired: false },
            jobalertName: { name: 'jobalertName', value: '', error: '', isRequired: false },
            email: { name: 'email', value: '', error: '', isRequired: false },
            alertName: { name: 'alertName', value: '', error: '', isRequired: false },
            mobile: { name: 'mobile', value: '', error: '', isRequired: false },
            KEYWORD: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: false },
            FUNCTIONAL_AREA_LIST: [],
            INDUSTRY_LIST: []
        }
        this.handleChange = this.handleChange.bind(this)

        this.handleSubmit = this.onSubmit.bind(this)

    }

    onKeywordChange = (e) => {

        const val = e.map(item => {
            if (typeof item === 'object') {
                return item.label
            }
            else {
                return item
            }
        })

        onChange(this, this.state.KEYWORD.name, val)
    }
    onLocationChange = (e) => {
        const val = e.map(item => {
            if (typeof item === 'object') {
                return item.label
            }
            else {
                return item
            }
        })

        onChange(this, this.state.LOCATION.name, val)
    }

    onKeywordPress = (input, type) => {
        if (type === 'KEYWORD') {

            KeywordSearch(input).then(res => {
                if (res.status) {
                    setOptions(this, this.state.KEYWORD.name, res.result)
                }
                else {
                    alert(res.error)
                }
            }).catch(err => {
                alert(err)
            })

        }
        else {
            LocationSearch(input).then(res => {
                if (res.status) {
                    setOptions(this, this.state.LOCATION.name, res.result)
                }
                else {
                    alert(res.error)
                }
            }).catch(err => {
                alert(err)
            })

        }

    }

    componentDidMount() {
        FunctionalAreaList().then(res => {

            if (res.status) {
                this.setState({ FUNCTIONAL_AREA_LIST: res.result.list, })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        IndustryList().then(res => {
            if (res.status) {
                this.setState({ INDUSTRY_LIST: res.result.list, INDUSTRY_LIST_COUNT: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }
    validateEnquiryForm = () => {
        
        let data = this.state
        let error = {}
        let isValid = true

        if (data['KEYWORD'].value.length==0) {
            let KEYWORD = data['KEYWORD']
            KEYWORD.error = "Please Enter Keyword"
            isValid = false
            this.setState({
                KEYWORD: KEYWORD
            })
        }

        if (!data['totalExperience'].value) {
            let totalExperience = data['totalExperience']
            totalExperience.error = "Please Enter Total Experience"
            isValid = false
            this.setState({
                totalExperience: totalExperience
            })
        }

        if (!data['email'].value) {
            let email = data['email']
            email.error = "Please Enter Email"
            isValid = false
            this.setState({
                email: email
            })
        }

        if (data['email'].value) {
            let re = /\S+@\S+\.\S+/
            if (re.test(data['email'].value)) { } else {
                let email = data['email']
                email.error = "Please Enter Valid Email"
                isValid = false
                this.setState({
                    email: email
                })
            }
        }
        if (!data['mobile'].value) {
            let mobile = data['mobile']
            mobile.error = "Please Enter Mobile"
            isValid = false
            this.setState({
                mobile: mobile
            })
        }

        if (data["mobile"] != "") {
            const regexExp = /^[6789][0-9]{9}/
            if (regexExp.test(data.mobile.value)) { } else {
                let mobile = data['mobile']
                mobile.error = "Please Enter Valid Mobile Number";
                isValid = false;
            }
        }

        if (!data['LOCATION'].value) {
            let LOCATION = data['LOCATION']
            LOCATION.error = "Please Enter Location"
            isValid = false
            this.setState({
                LOCATION: LOCATION
            })
        }
        if (!data['prefferedIndustry'].value) {
            let prefferedIndustry = data['prefferedIndustry']
            prefferedIndustry.error = "Please Enter Preffered Industry"
            isValid = false
            this.setState({
                prefferedIndustry: prefferedIndustry
            })
        }
        if (!data['prefferedDepartment'].value) {
            let prefferedDepartment = data['prefferedDepartment']
            prefferedDepartment.error = "Please Enter Preffered Department"
            isValid = false
            this.setState({
                prefferedDepartment: prefferedDepartment
            })
        }
        if (!data['alertName'].value) {
            let alertName = data['alertName']
            alertName.error = "Please Enter  Name"
            isValid = false
            this.setState({
                alertName: alertName
            })
        }
        if (!data['jobalertName'].value) {
            let jobalertName = data['jobalertName']
            jobalertName.error = "Please Enter Job Alert Name"
            isValid = false
            this.setState({
                jobalertName: jobalertName
            })
        }

        this.setState({
            error: error
        })

        return isValid
    }


    onSubmit(e) {
        e.preventDefault();

        const { KEYWORD, LOCATION, email, mobile, totalExperience, prefferedIndustry, prefferedDepartment, alertName } = this.state


        const model = {
            EMAIL_ID: email.value,
            KEYWORDS: KEYWORD.value,
            PREFFERED_LOCATION: LOCATION.value,
            TOTAL_EXPERIENCE: totalExperience.value,
            PREFFERED_INDUSTRY: prefferedIndustry.value,
            PREFFERED_DEPARTMENT: prefferedDepartment.value,
            NAME: alertName.value,
            MOBILE: mobile.value,
            TYPES: "JobAlertByHomePage"
        }

        if (this.validateEnquiryForm()) {
            createJobAlert(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: "Job Alert Created Successfully",
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        window.location.reload()

                    }
                    else {
                        alert(res.error)
                    }

                }).catch(err => {
                    alert(err)
                })
        }
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }

  render() {
    const { KEYWORD, totalExperience, LOCATION, prefferedIndustry, prefferedDepartment, email, alertName, jobalertName, mobile } = this.state
  
    return (
     <React.Fragment>
        <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-sectionspace rg-haslayout pt-3">
                        <div className="container">
                            <div className="row">
                                <div className='col-md-12'>
                                    <div className='create-job-alert-head'>
                                        <h1>Create a Free Job Alert - {(new Date().getFullYear())}</h1>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='create-job-alert-left-box'>
                                        <ul className='create-job-alert-point'>
                                            <li className='alerttabs'><i class="font-b-30 lnr lnr-alarm"></i> Never miss a job with Rozgar's Free Job Alert</li>
                                            <li><i class="ti-package"></i> Get relevant jobs matching your profile and criteria straight in your inbox with our Free Job Alerts</li>
                                            <li><i class="font-b-28 lnr lnr-book"></i> Stay updated with latest opportunities</li>
                                            <li><i class="ti-pencil-alt"></i> Create up to 5 personalized job alerts</li>
                                        </ul>
                                        <div className='why-rozgar-job-alert'>
                                            <div className='why-rozgar-head'><i class="fa fa-lightbulb-o"></i> Why Rozgar Job Alert</div>
                                            <div className='why-rozgar-text'>Rozgar Job Alert 2022: An opportunity to apply for new jobs that match your profile. We collect the latest jobs basis the criteria you provide and deliver them right in your inbox.</div>
                                        </div>
                                    </div>
                                    <div className='new-to-rozgar'>
                                        <h4>NEW TO ROZGAR?</h4>
                                        <div className='re-freejob-alert'><Link href={constant.component.register.url}>REGISTER WITH US</Link></div>
                                        <div className='rfj-cv-line'><span>OR</span></div>
                                        <div className='freejob-alert-resume'>
                                            <Link href={constant.component.register.url}>
                                                <div className='head-resume'>UPLOAD RESUME</div>
                                                <div>We will create your profile</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='create-job-alert-form'>
                                        <div className='create-alert-form-head'>Create free job alerts and never miss out. Get most relevant jobs<br />directly in your inbox</div>
                                        <form class="rg-create-job-alert-form">
                                            <div className='towform'>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Keywords <span className='label-required'>*</span></label>
                                                    <Typeahead
                                                        className='form-control'
                                                        id='keyword'
                                                        style={{ paddingLeft: "10px" }}
                                                        useCache={false}
                                                        clearButton={false}
                                                        multiple
                                                        allowNew={true}
                                                        name={KEYWORD.name}
                                                        selected={KEYWORD.value}
                                                        options={KEYWORD.options}
                                                        inputProps={e => console.log("iput props ", e)}
                                                        // onKeyDown={(e) => this.onJobSearch(e)}
                                                        placeholder=" Enter Keywords"
                                                        onInputChange={(e) => { this.onKeywordPress(e, 'KEYWORD') }}
                                                        onChange={(e) => { this.onKeywordChange(e) }}
                                                        emptyLabel
                                                    // style={{paddingLeft:"10px"}}
                                                    />
                                                    {KEYWORD.error.length > 0 &&  <span className='text-danger ml-1'>{KEYWORD.error}</span>}
                                                </div>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Total Experience</label>
                                                    <span class="rg-select">
                                                        <select class="form-control"
                                                            name={totalExperience.name}
                                                            value={totalExperience.value}
                                                            onChange={this.handleChange}

                                                        >
                                                            <option selected>Total Experience</option>
                                                            <option value='0 Year'>0 Year</option>
                                                            <option value='1 Year'>1 Year</option>
                                                            <option value='2 Year'>2 Years</option>
                                                            <option value='3 Year'>3 Years</option>
                                                            <option value='4 Year'>4 Years</option>
                                                            <option value='5 Year'>5 Years</option>
                                                            <option value='6 Year'>6 Years</option>
                                                            <option value='7 Year'>7 Years</option>
                                                            <option value='8 Year'>8 Years</option>
                                                            <option value='9 Year'>9 Years</option>
                                                            <option value='10 Year'>10 Years</option>
                                                            <option value='11 Year'>11 Years</option>
                                                            <option value='12 Year'>12 Years</option>
                                                            <option value='13 Year'>13 Years</option>
                                                            <option value='14 Year'>14 Years</option>
                                                            <option value='15 Year'>15 Years</option>
                                                            <option value='16 Year'>16 Years</option>
                                                            <option value='17 Year'>17 Years</option>
                                                            <option value='18 Year'>18 Years</option>
                                                            <option value='19 Year'>19 Years</option>
                                                            <option value='20 Year'>20 Years</option>
                                                            <option value='21 Year'>21 Years</option>
                                                            <option value='22 Year'>22 Years</option>
                                                            <option value='23 Year'>23 Years</option>
                                                            <option value='24 Year'>24 Years</option>
                                                            <option value='25 Year'>25 Years</option>
                                                            <option value='26 Year'>26 Years</option>
                                                            <option value='27 Year'>27 Years</option>
                                                            <option value='28 Year'>28 Years</option>
                                                            <option value='29 Year'>29 Years</option>
                                                            <option value='30 Year'>30 Years</option>
                                                            <option value='31 Year'>31 Years</option>
                                                            <option value='32 Year'>32 Years</option>
                                                            <option value='33 Year'>33 Years</option>
                                                            <option value='34 Year'>34 Years</option>
                                                            <option value='35 Year'>35 Years</option>
                                                            <option value='36 Year'>36 Years</option>
                                                            <option value='37 Year'>37 Years</option>
                                                            <option value='38 Year'>38 Years</option>
                                                            <option value='39 Year'>39 Years</option>
                                                            <option value='40 Year'>40 Years</option>
                                                            <option value='41 Year'>41 Years</option>
                                                            <option value='42 Year'>42 Years</option>
                                                            <option value='43 Year'>43 Years</option>
                                                            <option value='44 Year'>44 Years</option>
                                                            <option value='45 Year'>45 Years</option>
                                                            <option value='46 Year'>46 Years</option>
                                                            <option value='48 Year'>48 Years</option>
                                                            <option value='49 Year'>49 Years</option>
                                                            <option value='50 Year'>50 Years</option>

                                                        </select>
                                                        {totalExperience.error.length > 0 && !totalExperience.value && <span className='text-danger ml-1'>{totalExperience.error}</span>}

                                                    </span>
                                                </div>
                                            </div>
                                            <div className='towform'>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Preferred Location</label>
                                                    <Typeahead
                                                        className='form-control'
                                                        id='location'
                                                        useCache={false}
                                                        clearButton={false}
                                                        maxResults={3}
                                                        multiple={true}
                                                        allowNew={true}
                                                        name={LOCATION.name}
                                                        selected={LOCATION.value}
                                                        options={LOCATION.options}
                                                        placeholder="Location"
                                                        // onKeyDown={(e) => this.onJobSearch(e)}
                                                        onInputChange={(e) => { this.onKeywordPress(e, 'LOCATION') }}
                                                        onChange={(e) => { this.onLocationChange(e) }}
                                                        emptyLabel
                                                        style={{ paddingLeft: "10px" }}
                                                    />
                                                    {LOCATION.error.length > 0 && !LOCATION.value && <span className='text-danger ml-1'>{LOCATION.error}</span>}
                                                </div>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Preferred Industry</label>
                                                    <span class="rg-select">
                                                        <select class="form-control"
                                                            name={prefferedIndustry.name}
                                                            value={prefferedIndustry.value}
                                                            onChange={this.handleChange}
                                                        >
                                                            <option selected>Select Preffered Industry</option>
                                                            {this.state.INDUSTRY_LIST && this.state.INDUSTRY_LIST.map((item, index) => (
                                                                <option value={item.INDUSTRY}>{item.INDUSTRY}</option>
                                                            ))
                                                            }
                                                        </select>
                                                        {prefferedIndustry.error.length > 0 && !prefferedIndustry.value && <span className='text-danger ml-1'>{prefferedIndustry.error}</span>}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='towform'>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Preferred Department/Function <span className='label-required'>*</span></label>
                                                    <span class="rg-select">
                                                        <select class="form-control"
                                                            name={prefferedDepartment.name}
                                                            value={prefferedDepartment.value}
                                                            onChange={this.handleChange}
                                                        >
                                                            <option selected>Select Preffered Department</option>
                                                            {this.state.FUNCTIONAL_AREA_LIST && this.state.FUNCTIONAL_AREA_LIST.map((item, index) => (
                                                                <option value={item.FUNCTIONAL_AREA}>{item.FUNCTIONAL_AREA}</option>
                                                            ))
                                                            }
                                                        </select>
                                                        {prefferedDepartment.error.length > 0 && !prefferedDepartment.value && <span className='text-danger ml-1'>{prefferedDepartment.error}</span>}
                                                    </span>
                                                </div>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Job Alert Name <span className='label-required'>*</span></label>
                                                    <input type="text"
                                                        name={jobalertName.name}
                                                        value={jobalertName.value}
                                                        onChange={this.handleChange}
                                                        class="form-control"
                                                        placeholder="Enter a name for this job alert" />
                                                    {jobalertName.error.length > 0 && !jobalertName.value && <span className='text-danger ml-1'>{jobalertName.error}</span>}
                                                </div>
                                            </div>
                                            <div className='towform'>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Email Id <span className='label-required'>*</span></label>
                                                    <input type="text"
                                                        name={email.name}
                                                        value={email.value}
                                                        onChange={this.handleChange}
                                                        class="form-control"
                                                        placeholder="Enter your email id"
                                                        style={{ paddingLeft: "10px" }}
                                                    />
                                                    {email.error.length > 0 && <span className='text-danger ml-1'>{email.error}</span>}
                                                </div>
                                                <div class="form-group">
                                                    <label className='create-job-alert-label'>Name <span className='label-required'>*</span></label>
                                                    <input type="text"
                                                        name={alertName.name}
                                                        value={alertName.value}
                                                        onChange={this.handleChange}
                                                        class="form-control"
                                                        placeholder="Enter your name"
                                                        style={{ paddingLeft: "10px" }}
                                                    />
                                                    {alertName.error.length > 0 && !alertName.value && <span className='text-danger ml-1'>{alertName.error}</span>}
                                                </div>
                                            </div>
                                            <div className='towform'>
                                                <div class="form-group" style={{ width: '48.5%' }}>
                                                    <label className='create-job-alert-label'>Mobile <span className='label-required'>*</span></label>
                                                    <NumericFormatBase type="phone"
                                                        name={mobile.name}
                                                        maxLength={10}

                                                        onChange={(e) => {
                                                            if (e.target.value !== "") {
                                                                const regexExp = /^[6789][0-9]{9}/
                                                                if (regexExp.test(e.target.value)) {
                                                                    let mobile = this.state.mobile
                                                                    mobile.value = e.target.value
                                                                    this.setState({ mobile: mobile });
                                                                } else {
                                                                    let mobile = this.state.mobile
                                                                    mobile.value = ''
                                                                    this.setState({ mobile: mobile });
                                                                }
                                                            }
                                                        }
                                                        } class="form-control"
                                                        placeholder="Enter your Mobile No"

                                                        style={{ paddingLeft: "10px" }}
                                                    />
                                                    {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}
                                                </div>
                                            </div>
                                            <div className='create-free-jobs-alert-btn'>
                                                <a href='' onClick={e => this.onSubmit(e)}>Create Free Job Alert</a>
                                            </div>
                                        </form>
                                        <div className='create-free-jobs-alert-content'>
                                            <div className='cfja-blog pb-0'>
                                                <h2>Free Job Alert {(new Date().getFullYear())}</h2>
                                                <p>Landing a job, you really love takes some time and effort. It needs a little introspection on what kind of role you are looking for and the kind of opportunity that matches both your skillset and passion.</p>
                                                <p>Another aspect to consider is the work culture of the organisation you plan to join, as a cultural connect is important for you to keep learning, and to grow into a leadership position.</p>
                                                <p>While all these factors demand some amount of research and investment of time, one way to ease the pressure during your search is to leverage the 'free job alert' feature on job search platforms like Rozgar.</p>
                                            </div>
                                            <div className='cfja-blog-content'>
                                                <div className='d-flex faqhead'>
                                                    What exactly are job alerts in {(new Date().getFullYear())}?
                                                </div>
                                                <div className='cfja-blog-para-box'>
                                                    <p>Job alerts in 2023 are all about using technology to make the life of job seekers much easier. By keying in important information related to your skill set, experience, location and a few other parameters, you can make the job search algorithms work for you and deliver relevant jobs to your inbox.</p>

                                                    <p>This simple feature reduces the amount of time you spend manually searching for a job while providing you automatic access to the newest job postings in various geographies, companies and job roles on the job search platform.</p>
                                                </div>

                                                <div className='d-flex faqhead'>
                                                    How can you effectively customise job alerts?
                                                </div>
                                                <div className='cfja-blog-para-box'>
                                                    <p>The key to customising job alerts is to choose important keywords connected to your profession. For instance, if you are looking to work in the field of data analytics, using important industry terms such as data scientist, data analysis, data science, will help improve the relevance of the jobs that come to your inbox. </p>

                                                    <p>Similarly, if you are seeking an engineering job, you ought to be specific about the industry, the domain, as well as the key technical skills that are needed for the same.</p>
                                                </div>

                                                <div className='d-flex faqhead'>
                                                    Why should you set up a job alert?
                                                </div>
                                                <div className='cfja-blog-para-box'>
                                                    <p>There are two key advantages to setting up job alerts. One advantage is that it promotes passive job searching - a practice that reduces the effort that goes into sifting to reams and reams of job listings, every day.</p>

                                                    <p>This saved time is much better spent making your job alert settings sharper, taking online programmes to enhance your skills, reading up on your domain, or networking with relevant people to improve your domain understanding and connections.</p>

                                                    <p>Another benefit of setting up job alerts is the first-mover advantage it offers you. As soon as you get the alert in your email inbox, you can apply for a job at the click of a button. In the post-pandemic economy, there is a need for speed when it comes to hunting for the best jobs in India.</p>
                                                </div>

                                                <div className='d-flex faqhead'>
                                                    How can you make the Best of your free job alerts?
                                                </div>
                                                <div className='cfja-blog-para-box'>
                                                    <p>You can make the best of free job alerts in the following ways:</p>

                                                    <p>Perhaps the most unique and useful feature of job alerts is the ability to follow companies on your dream job list. For example, if you want to work for a specific technology company, by including it in your job alert settings, you can be notified of every new job in your chosen domain in that organisation. How cool is that?</p>

                                                    <p>It's a good idea to create a separate, professional sounding email ID only for your job search. Using your real name in the email ID is a good idea. Of course, if you work in a less conventional field such as writing or design, using a cool pseudonym could also work in attracting the attention of potential employers, especially if you aim to work in the start-up domain or a business with contemporary culture.</p>

                                                    <p>It's a good idea to set up multiple job alerts that are targeted at specific companies, job roles, locations and skillsets. This will help you expand your options. Try to make your job alert as specific as possible so that you completely avoid receiving unrelated jobs. Here's where specific keywords and the terms related to your field really matter.</p>

                                                    <p>You can set the frequency of alerts as per your availability. For instance, if you already have a job, receiving them two to three times a week is a good frequency, since you might not have the bandwidth to check every day. But if you are in-between jobs, creating a daily job alert is a good idea, as it would help you with a first-mover advantage and also keep you very focused on your job search.</p>
                                                </div>

                                                <div className='d-flex faqhead'>
                                                    How to set up a free job alert?
                                                </div>
                                                <div className='cfja-blog-para-box'>
                                                    <p>The first field comprises the keywords related to your job search. These can include a mix of skill sets, designations, job roles and company names on your wish-list.</p>

                                                    <p>Clearly include the number of years of experience, as well as any specific geographies you wish to work in. Free job alerts also enable you to include two options industry-wise, function-wise, and your preferred roles. </p>

                                                    <p>You can differentiate the job alerts by giving them unique names. Add your email ID, and you're good to go!</p>

                                                    <p>Millions of people in India are looking for opportunities in their chosen field. But those who understand how to smartly leverage online tools for job search such as free job alerts are most likely to emerge successful. This is even more important in a post-pandemic world where jobs are going remote, and companies are seeking employees who understand the smart use of technology.</p>

                                                    <p>The best part about such tools is that you can always upgrade your preferences to make it more specific and in line with emerging trends and your own evolving interests.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
     </React.Fragment>
    )
  }
}
