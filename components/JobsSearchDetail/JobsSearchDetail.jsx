import React, { Component, Suspense } from 'react'
import { capFirstLetterInSentence, getDateParts, ToSeoUrl } from '../../utils';
import Shimmer from '../common/Shimmer';
import Parser from 'html-react-parser';
import Carousel from 'react-bootstrap/Carousel'
import constant from '../../constant';
import { onChange } from '../../utils';
import swal from 'sweetalert';
import { CandidateHiringEnquiryForm } from '@/actions/jobsByAction';
export default class JobsSearchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiredPeople: { name: 'hiredPeople', value: '', error: '', isRequired: false },
            companySize: { name: 'companySize', value: '', error: '', isRequired: false },
            mobile: { name: 'mobile', value: '', error: '', isRequired: false },
            email: { name: 'email', value: '', error: '', isRequired: false },
            role: { name: 'role', value: '', error: '', isRequired: false },
        }

        this.handleChange = this.handleChange.bind(this)

        this.handleSubmit = this.onSubmit.bind(this)

    }


    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }

    validateEnquiryForm = () => {

        let data = this.state
        let error = {}
        let isValid = true

        if (!data['hiredPeople'].value) {
            let hiredPeople = data['hiredPeople']
            hiredPeople.error = "Please Enter How Many People Hired"
            isValid = false
            this.setState({
                hiredPeople: hiredPeople
            })
        }

        if (!data['companySize'].value) {
            let companySize = data['companySize']
            companySize.error = "Please Enter Company Size"
            isValid = false
            this.setState({
                companySize: companySize
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
        if (!data['role'].value) {
            let role = data['role']
            role.error = "Please Enter Role"
            isValid = false
            this.setState({
                role: role
            })
        }
        return isValid
    }


    onSubmit(e) {
        e.preventDefault();

        const { hiredPeople, companySize, mobile, email, role } = this.state


        const model = {
            NUMBER_OF_EMPLOYEE: hiredPeople.value,
            COMPANY_SIZE: companySize.value,
            CONTACT_NUMBER: mobile.value,
            EMAIL: email.value,
            ROLE: role.value,
            TYPES: "Looking for candidates hiring"
        }

        if (this.validateEnquiryForm()) {
            CandidateHiringEnquiryForm(model).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: "Enquiry Submitted successfully ",
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

    render() {
        //console.log("cityDetail", this.props.localities);
        const { hiredPeople, companySize, mobile, email, role } = this.state
        const { cityDetail, jobsCount, localities, jobs, showShimmer, jobslist } = this.props
        return (
            <React.Fragment>
                {/* <!--************************************
				Banner start
		*************************************--> */}
                <div id="rg-innerbannercity" className="rg-innerbannercity">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="rg-innerbannercontent">
                                    {showShimmer && <h3><span><Shimmer /> </span>  <i className="lnr lnr-map-marker"></i></h3>}
                                    {!showShimmer && <h3><span>{capFirstLetterInSentence(cityDetail?.KEYWORD_NAME)}</span> <a className='jobsearchindiabutton' href='/'>Search Jobs</a></h3>}
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-right">
                                <div className="rg-innerbannercontent">
                                    <a href={constant.component.AllJobs.url} target='_blank' className="applyforjobs">View jobs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--************************************
				Banner End
		*************************************-->
		<!--************************************
				breadcrumbarea start
		*************************************--> */}
                <div className="rg-breadcrumbarea">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <ol className="rg-breadcrumb">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href={constant.component.JobSearchIndia.url}>Job Search India</a></li>
                                    <li>{cityDetail?.KEYWORD_NAME}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--************************************
				breadcrumbarea End
		*************************************-->

		<!--************************************
				Main Start
		*************************************--> */}
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-sectionspace rg-haslayout">
                        {/* <!--************************************
						Jobs in Noida Grid Start
				*************************************--> */}
                        <div className="rg-haslayout">
                            <div className="container">
                                <div className="row">
                                    <div id="rg-threecolumns" className="rg-threecolumns">
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 float-left">
                                            <aside id="rg-sidebar" className="rg-sidebar rg-sidebarcol">
                                                {/* <div className="rg-adds rg-jobsearchadd mb-20">
                                                    <figure>
                                                        <iframe src="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"></iframe>
                                                    </figure>
                                                </div> */}

                                                <div className="rozgorcitycreatejob">
                                                    <h2>Create your CV for <span>Jobs!</span></h2>
                                                    <p>List your jobs for free on our website. Reach millions worldwide.</p>
                                                    <a href={constant.component.signin.url} target='_blank' className="createyourcv">Upload your CV</a>
                                                </div>

                                                <div className="sendenquirybox mb-10">
                                                    <div className="sendenquiryhead">
                                                        <h2>Looking for candidates hiring?</h2>
                                                    </div>
                                                    <div className="sendenquirform">
                                                        <form className="rg-formtheme rg-formleavecomment">

                                                            <div className="form-group rg-inputwithiconno">
                                                                <label>No. of People to be Hired</label>
                                                                <input type="text"
                                                                    name={hiredPeople.name}
                                                                    value={hiredPeople.value}
                                                                    onChange={this.handleChange}
                                                                    className="form-control"
                                                                    placeholder="# of Employees" />
                                                                {hiredPeople.error.length > 0 && !hiredPeople.value && <span className='text-danger ml-1'>{hiredPeople.error}</span>}

                                                            </div>
                                                            <div className="form-group rg-inputwithiconno">
                                                                <label>How large is your company</label>
                                                                <select className="form-control"
                                                                    name={companySize.name}
                                                                    value={companySize.value}
                                                                    onChange={this.handleChange}

                                                                >
                                                                    <option selected>Select People</option>
                                                                    <option value="10-100 people">10-100 people</option>
                                                                    <option value="100-500 people">100-500 people</option>
                                                                    <option value="500-2000 people">500-2000 people</option>
                                                                    <option value="2000+">2000+</option>
                                                                </select>
                                                                {companySize.error.length > 0 && !companySize.value && <span className='text-danger ml-1'>{companySize.error}</span>}

                                                            </div>
                                                            <div className="form-group rg-inputwithiconno">
                                                                <label>Your Mobile</label>
                                                                <input type="text"
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
                                                                    }
                                                                    className="form-control"
                                                                    placeholder="Your Mobile" />
                                                                {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

                                                            </div>
                                                            <div className="form-group rg-inputwithiconno">
                                                                <label>Your Email</label>
                                                                <input type="email"
                                                                    name={email.name}
                                                                    value={email.value}
                                                                    onChange={this.handleChange}
                                                                    className="form-control"
                                                                    placeholder="Your Email" />
                                                                {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}

                                                            </div>

                                                            <div className="form-group rg-inputwithiconno">
                                                                <label>Your Role</label>
                                                                <select className="form-control"
                                                                    name={role.name}
                                                                    value={role.value}
                                                                    onChange={this.handleChange}
                                                                >
                                                                    <option selected>Select People</option>
                                                                    <option value="Leadership/ CEO/ Owner/ Director">Leadership/ CEO/ Owner/ Director</option>
                                                                    <option value="Human Resource function">Human Resource function</option>
                                                                    <option value="Finance/ Operations">Finance/ Operations</option>
                                                                </select>
                                                                {role.error.length > 0 && !role.value && <span className='text-danger ml-1'>{role.error}</span>}
                                                            </div>
                                                            <div className="form-group">
                                                                <a href={'https://recruit.rozgar.com'}>
                                                                    <button className="rg-btn rg-active" type="button" onClick={e => this.onSubmit(e)}>Submit</button>
                                                                </a>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>

                                                <div className="roz-near-facilities-box">
                                                    <div className="roz-near-facilities-heading">
                                                        <h4>Advertisement</h4>
                                                    </div>
                                                    <div className="roz-near-facilities-body">

                                                        <div className="roz-jobschedules">
                                                            <div className="roz-tabcontent tab-content">
                                                                <div className="roz-jobdetails roz-abouttab roz-tabpane">
                                                                    <div className="roz-jobdetaildescription">
                                                                        <div className="roz-near-locality-box">
                                                                            <div className="loccontentbox">
                                                                                <h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
                                                                                <p>Looking for an agency to design and develop an amazing website?</p>
                                                                                <span className="roz-locrating-star">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <span>3.0</span>
                                                                                </span>
                                                                                <div className="roz-callphone">
                                                                                    <i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
                                                                                </div>
                                                                                <div className="roz-callphone">
                                                                                    <i className="lnr lnr-phone"></i> +91-1800 274 4515
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="roz-jobdetaildescription">
                                                                        <div className="roz-near-locality-box">
                                                                            <div className="loccontentbox">
                                                                                <h4><span className="adbox">Ad</span> <a href="#">Tata The Indian Food Company, Sector 2, Noida - Zomato</a></h4>
                                                                                <p>Tata The Indian Food Company Noida; Tata The Indian Food Company.</p>
                                                                                <span className="roz-locrating-star">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <span>3.0</span>
                                                                                </span>
                                                                                <div className="roz-callphone">
                                                                                    <i className="fa fa-globe"></i> <a href="#">www.zomato.com</a>
                                                                                </div>
                                                                                <div className="roz-callphone">
                                                                                    <i className="lnr lnr-phone"></i> +91-1600 676 4514
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="roz-jobdetaildescription">
                                                                        <div className="roz-near-locality-box">
                                                                            <div className="loccontentbox">
                                                                                <h4><span className="adbox">Ad</span> <a href="#">Corporate Companies For Food Products - Noida Sector 62</a></h4>
                                                                                <p>Top Corporate Companies For Food Products in Noida Sector 62, Delhi.</p>
                                                                                <span className="roz-locrating-star">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <span>4.0</span>
                                                                                </span>
                                                                                <div className="roz-callphone">
                                                                                    <i className="fa fa-globe"></i> <a href="#">www.justdial.com</a>
                                                                                </div>
                                                                                <div className="roz-callphone">
                                                                                    <i className="lnr lnr-phone"></i> +91-1400 474 4516
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="roz-jobdetaildescription">
                                                                        <div className="roz-near-locality-box">
                                                                            <div className="loccontentbox">
                                                                                <h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
                                                                                <p>Looking for an agency to design and develop an amazing website?</p>
                                                                                <span className="roz-locrating-star">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <i className="fa fa-star-o"></i>
                                                                                    <span>3.0</span>
                                                                                </span>
                                                                                <div className="roz-callphone">
                                                                                    <i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
                                                                                </div>
                                                                                <div className="roz-callphone">
                                                                                    <i className="lnr lnr-phone"></i> +91-1800 274 4515
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="roz-postfreejob">
                                                                <a href="#">Place your ad here <i className="fa fa-angle-double-right"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 float-left">
                                            <div className='seo-list-link-section'>
                                                <div class="brows-by-locations-bx ">
                                                    <div class="by-locations-head">
                                                        <h2 class="small_title"><strong>{capFirstLetterInSentence(cityDetail?.KEYWORD_NAME)}</strong> - 11 Lakh+ Of Jobs on Rozgar. </h2>
                                                    </div>

                                                    <div className='seo-about-sec-bx'>

                                                        <p>Find the latest jobs vacancies in <strong>{capFirstLetterInSentence(cityDetail?.KEYWORD_NAME)}</strong>  ️<a href="https://rozgar.com/register">Register</a> now on Rozgar.com and get instant access to your dashboard and start applying on jobs. Track your application and communicate with Employer. Get Competitive Salary. Full-time, Temporary, and part-time jobs. Fast & Free. Start your new career right now!</p>
                                                        <p>Find Your Next Job Today, With One Easy Search On Rozgar. A better way to search - find your next Job in <strong>{capFirstLetterInSentence(cityDetail?.KEYWORD_NAME)}</strong> at Rozgar.com. New Job Postings Every hours. Quick Resume Upload. India's leading and Best Job Portal.</p>
                                                        <p>You can browse jobs by <a href="https://rozgar.com/jobs-by-category">Functional Area, Industry</a>, <a href="https://rozgar.com/jobs-by-company">Company</a>, <a href="https://rozgar.com/jobs-by-skill"> Skills </a> and <a href="https://rozgar.com/jobs-by-designation">Designations</a>.</p>
                                                        <p>Explore Rozgar Services - <a href="https://rozgar.com/resume-making">Create CV</a> | <a href="https://rozgar.com/study-abroad">Study Abroad</a> | <a href="https://rozgar.com/international-work-visas">International work Visas</a> | <a href="https://rozgar.com/career-explorer">Career Explorer</a> | <a href="https://rozgar.com/career-astrology">Career Astrology</a> | <a href="https://rozgar.com/education-loan">Education Loan</a></p>
                                                    </div>


                                                </div>

                                            </div>
                                            {jobslist && jobslist.list && jobslist.list.length > 0 && <div className="rg-similarjobs">
                                                <div className="rg-sectionhead">
                                                    <h2>Latest Jobs</h2>
                                                </div>
                                                <div className="rg-featuredjobs">
                                                    {jobslist && jobslist.list.length > 0 && jobslist.list.map((item, index) => {
                                                        const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
                                                        // const dynamicURL = ToSeoUrl(item.JOB_TITLE) + '_' + ToSeoUrl(item.JOB_DETAILS) + '_' + 'EXP' + '-' + ToSeoUrl(item.WORK_EXP_MIN) + '_' + ToSeoUrl(item.WORK_EXP_MAX) + '_' + item.CUSTOM_JOB_ID + '_' + ToSeoUrl(item.KEYWORDS) + '?src=SIMILAR_JOBS=' + item.JOB_ID
                                                        let dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                        dynamicURL = dynamicURL.replace(/ /g, '')
                                                        return (
                                                            <div className="rg-featurejobholder">
                                                                <div className="rg-featurejob">
                                                                    <figure className="rg-companyimg">
                                                                        {item.COMPANY_LOGO === 'NA' ? <h3>{nameInitial}</h3> : <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />}
                                                                    </figure>
                                                                    <div className="rg-companycontent">
                                                                        <div className="rg-companyhead">
                                                                            <div className="rg-rightarea">
                                                                                <span className="rg-tagfeature" ><i className="fa fa-clock mr-1"></i>{'' + getDateParts(item.CREATED_ON).relativeTime}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rg-similarcompanyname">
                                                                            <h3><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h3>
                                                                            <h6 style={{ fontSize: '13px' }}>{item.COMPANY_NAME}</h6>
                                                                            <div class="jobcompanyreviewbox"><a href="#"></a><span class="reviewnumber">
                                                                                {/* {(Math.round(item?.rating * 10) / 10) > 5 ? 5 : Math.round(item?.rating * 10) / 10} */}
                                                                                <i class="fa fa-star"></i></span><a href="#"><span class="reviewlink">(
                                                                                    {/* {item.reviewCount}  */}
                                                                                    0 {" "}
                                                                                    Reviews)</span></a>

                                                                            </div>
                                                                            <ul class="jobcompanyhiringdetails" >
                                                                                <li><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</li>
                                                                                <li><i class="fa fa-rupee"></i> {item?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.CTC_MIN + '-' + item?.CTC_MAX}</li>
                                                                                <li><i class="lnr lnr-map-marker"></i> {item.CITY?.length > 18 ? Parser(item.CITY.slice(0, 18)) + '...' : Parser(item.CITY)}</li>
                                                                            </ul>
                                                                            <div class="roz-companyjobtans">
                                                                                <div class="ellipsis"><i class="lnr lnr-file-empty"></i>{item.JOB_DETAILS?.length > 64 ? Parser(item.JOB_DETAILS.slice(0, 64)) + '...' : item.JOB_DETAILS}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rg-rightarea mt-10">
                                                                            <a className={item.LISTNING_TYPE == '1' ? 'rg-btnjobtag rg-internship mr-10' : item.LISTNING_TYPE == '2' ? 'rg-btnjobtag rg-parttimejob mr-10' : 'rg-fulltimejob rg-btnjobtag mr-10'} href="javascript:void(0);">
                                                                                <i className="ti-thumb-up"></i> {item.LISTNING_TYPE == '1' ? 'Regular' : item.LISTNING_TYPE == '2' ? 'Featured' : 'Premium'}
                                                                            </a>
                                                                            {/* <a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-star"></i> Save</a> */}
                                                                            <div className="rg-tagfeaturetemp"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )
                                                    })}

                                                </div>
                                            </div>}
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
