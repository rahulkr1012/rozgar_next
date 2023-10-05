import React, { Component } from 'react'
import Shimmer from '../common/Shimmer'
import constant from 'constant'
import announceImage01 from '../../src/assets/images/announce-img01.png'
import cvpic01 from '../../src/assets/images/cv-pic01.png'
import Image from 'next/image'
import { Accordion } from 'react-bootstrap'
import swal from 'sweetalert'
import nl2br from 'react-nl2br';
import { onChange } from '../../utils'
import Link from 'next/link'
import { AddBannerAnalytics, createJobAlert, selectCountry } from '@/action/jobsByActions'
import { withRouter } from 'next/router'
import Loader from '@/pages/loader'
// const Loader = dynamic(() => import("@/pages/loader"), {
//     ssr: false,
// });

const Search = dynamic(() => import("components/JobList/search"), {
    loading: () => <Loader />,
    ssr: false,
});
const Filter = dynamic(() => import("components/JobList/Filter"), {
    loading: () => <Loader />,
    ssr: false,
});

const SignInForSaveUnsave = dynamic(() => import("components/signin/SignInForSaveUnsave"), {
    loading: () => <Loader />,
    ssr: false,
});
const JobsByLoader = dynamic(() => import("components/common/HeaderLoader/index"), {
    loading: () => <Loader />,
    ssr: false,
});

import Modal from 'react-modal';
import { getProduct, getSaveJobList, SaveJobs } from '@/action/CandidateAction'
import noRecordImg from '../../public/assets/images/no-results.png'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { capFirstLetterInSentence, convertToPlain, getDateParts, ToSeoUrl } from '@/utils'
import dynamic from 'next/dynamic'
import NumberFormat from 'react-number-format'
import Pagination from 'react-js-pagination'

class JobLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            JOB_LIST: [],
            AllJobList: '',
            CURRENT_PAGE: 1,
            filterdata: {
                EXPERIENCE: [],
                SALARY: [],
                POSTED_BY: [],
                productList: [],
                WORK_FROM_HOME: [],
                LOCATION: [],
                jobStatus: [],

            },
            detail: getCookie(constant.keys.cd)
                ? JSON.parse(getCookie(constant.keys.cd))
                : {},
            openModal: false,
            saveList: [],
            reRender: false,
            unsaved: undefined,
            saveId: undefined,
            leftBar: false,
            alertName: { name: 'alertName', value: '', error: '', isRequired: false },
            mobile: { name: 'mobile', value: '', error: '', isRequired: false },
            email: { name: 'email', value: '', error: '', isRequired: false },
            showModal: false,
            location: '',
            count: 0

        }
        this.handleChange = this.handleChange.bind(this)

        this.handleSubmit = this.onSubmit.bind(this)
    }

    validateEnquiryForm = () => {

        let data = this.state
        let error = {}
        let isValid = true

        if (!data['alertName'].value) {
            let alertName = data['alertName']
            alertName.error = "Please Enter Name"
            isValid = false
            this.setState({
                alertName: alertName
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
        this.setState({
            error: error
        })

        return isValid
    }

    BannerCilck = (e, item, type) => {
        const model = {
            BANNER_ID: e.BANNER_ID,
            BANNER_CLICKS: type,
            LONGT: item.longitude,
            LATT: item.latitude,
            IP_ADDRRESS: item.IPv4,
            CITY: item.city
        };
        AddBannerAnalytics(model)
            .then((res) => {
                if (res.status) {
                } else {
                    alert(res.error);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };


    onSubmit(e) {
        e.preventDefault();
        const { email, mobile, alertName } = this.state
        const model = {
            EMAIL_ID: email.value,
            NAME: alertName.value,
            MOBILE: mobile.value,
            KEYWORDS: this.props.aboutJobName,
            TYPES: "AlertByJoblist"
        }

        if (this.validateEnquiryForm()) {
            createJobAlert(model).then((res) => {
                if (res.status) {
                    this.closeModal();
                    swal({
                        icon: "success",
                        text: "Job Alert Created Successfully",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                }
                else {
                    alert(res.error)
                }

            }).catch(err => {
                alert(err)
            })
        }
    }

    closeModal = () => {
        this.setState({ showModal: false });
        window.location.reload()
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
    }


    componentDidMount() {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        getProduct().then((ItemsResult) => {
            this.setState({
                productList: ItemsResult.ItemsResult.Items
            });
        }).catch((err) => {
            console.log(err)
        })
        const { JOB_ID } = getCookie("saveJobId") ? getCookie("saveJobId") : '';
        const unSaveJobId = getCookie("unSaveJobId")
        selectCountry().then((res) => {
            this.setState({ location: res })
        })

        if (this.state.reRender) {
            if (JOB_ID) {
                this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "save" })
                deleteCookie("saveJobId")
            } else if (unSaveJobId) {
                this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: unSaveJobId, ACTION: "unsave" })
                deleteCookie("unSaveJobId")
            }
        }
        this.savedJobsDetail()
    }
    handlePageChange = (pageNumber) => {
        this.setState({
            CURRENT_PAGE: pageNumber
        })
        this.props.joblist(pageNumber, this.state.filterdata)
    };

    filterData = (data) => {
        this.setState({ CURRENT_PAGE: 1, filterdata: data })
        this.props.filterData(data)
    }

    onClickSave = (JOB_ID) => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        if (CANDIDATE_ID) {
            this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "save" })
            this.setState({ saveList: [...this.state.saveList, JOB_ID] })
        } else {
            setCookie("saveJobId", { JOB_ID: JOB_ID })
            deleteCookie('addAndUpdate')
            this.setState({ openModal: true })
        }
    }


    onClickUnSave = (JOB_ID) => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        if (CANDIDATE_ID) {
            this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "unsave" })
            this.setState({ saveList: this.state.saveList?.filter((e) => e !== JOB_ID) })
        }
    }

    getSavedJobs = (model) => {
        SaveJobs(model).then((res) => {
            this.setState({ saveState: res.result })
        }).catch((err) => {
            alert(err)
        })
    }

    savedJobsDetail = (model) => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        getSaveJobList({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
            if (res.status) {
                this.setState({ saveList: res.result.list.map(i => i.JOB_ID) })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    onCloseModal = () => {
        this.setState({
            openModal: false, leftBar: true
        })
        this.setState({ reRender: true })
        const { JOB_ID } = getCookie("saveJobId") ? getCookie("saveJobId") : '';
        const unSaveJobId = getCookie("unSaveJobId")
        if (JOB_ID || unSaveJobId) {
            const { CANDIDATE_ID } = getCookie(constant.keys.cd)
            if (this.state.reRender) {
                if (JOB_ID) {
                    this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "save" })
                    this.setState({ saveList: [...this.state.saveList, JOB_ID] })
                    deleteCookie("saveJobId")
                } else if (unSaveJobId) {
                    this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: unSaveJobId, ACTION: "unsave" })
                    this.setState({ saveList: this.state.saveList?.filter((e) => e !== unSaveJobId) })
                    deleteCookie("unSaveJobId")
                }
            }
        }

    }

    render() {
        const { JOB_LIST, JOB_COUNT, aboutJobName, CITIES, LOCATION, locationJobName ,Job_FAQ_List} = this.props
        // console.log(Job_FAQ_List.map((item)=>{
        //  return item.ANSWER
        // }),"Job FAQ");
        const { filterdata, alertName, mobile, email, TOP_COMPANY_IMAGES, AllJobList, location, count, productList } = this.state
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rg-successstorysbanner">

                            <div className="container">
                                {JOB_COUNT === undefined ? <JobsByLoader /> :
                                    <div className="row">
                                        <Search />
                                    </div>}
                            </div>
                        </div>
                        {this.state.showModal && (
                            <div className="modal modal_outer right_modal fade" id="information_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" >
                                <div className="modal-dialog" role="document">
                                    <div id="get_quote_frm">
                                        <div className="modal-content ">
                                            <div className="modal-header">
                                                <h2 className="modal-title">Receive jobs for your search!</h2>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <p className='poptext'>We will send you jobs based on your search criteria as soon as they are posted</p>
                                            <div className="modal-body get_quote_view_modal_body">
                                                <p>You are saving alert for your search query <strong>{locationJobName == undefined ? aboutJobName == "Fresher Jobs" ? "Fresher Jobs" : aboutJobName == "MostPopular Video JD Jobs" ? "MostPopular Video JD Jobs" : aboutJobName == "HotSectors Video JD Jobs" ? "HotSectors Video JD Jobs" : aboutJobName == "PartTime Jobs" ? " Part Time Jobs" : aboutJobName == "Walk-in-jobs" ? "Walk-in-jobs" : aboutJobName == "Work-From-Home jobs" ? "Work-From-Home jobs" : aboutJobName == "Remote Jobs" ? "Remote Jobs" : `${aboutJobName} Jobs` : `Jobs In ${locationJobName}`}</strong></p>

                                                <form className='alertform-box'>
                                                    <div className="form-group">
                                                        <label className="create-job-alert-label">Alert Name</label>
                                                        <input type="text"
                                                            name={alertName.name}
                                                            value={alertName.value}
                                                            onChange={this.handleChange}
                                                            className="form-control"
                                                            placeholder="Alert Name" />
                                                        {alertName.error.length > 0 && !alertName.value && <span className='text-danger ml-1'>{alertName.error}</span>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="create-job-alert-label">Mobile No.</label>
                                                        <NumberFormat type="text"
                                                            name={mobile.name}
                                                            onChange={this.handleChange}
                                                            maxLength={10}
                                                            className="form-control"
                                                            placeholder="Enter your mobile no." />
                                                        {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}

                                                    </div>
                                                    <div className="form-group">
                                                        <label className="create-job-alert-label">Email ID</label>
                                                        <input type="text"
                                                            name={email.name}
                                                            value={email.value}
                                                            onChange={this.handleChange}
                                                            className="form-control"
                                                            placeholder="Enter your active Email ID" />
                                                        {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}

                                                    </div>
                                                </form>
                                                <p className='alert-help-text'> Help us send you relevant jobs by adding more details to your job alert preferences </p>
                                                <div className='alert-save-btn'>
                                                    <a href='' onClick={e => this.onSubmit(e)}>SAVE</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="rg-haslayout">

                            <div className="container">
                                <div className="row">
                                    <div id="rg-threecolumns" className="rg-threecolumns">
                                        {(JOB_COUNT != 0 || (filterdata.EXPERIENCE.length > 0 || filterdata.SALARY.length > 0 || filterdata.POSTED_BY.length > 0 || filterdata.WORK_FROM_HOME.length > 0 || filterdata.LOCATION.length > 0)) && <Filter BannerSkill={this.props.BannerSkill} JOB_COUNT={JOB_COUNT} hideExperience={this.props.hideExperience} getFilterData={(data) => this.filterData(data)} />}
                                        <div className={(JOB_COUNT != 0 || (filterdata?.EXPERIENCE.length > 0 || filterdata?.SALARY.length > 0 || filterdata.POSTED_BY?.length > 0 || filterdata?.WORK_FROM_HOME.length > 0 || filterdata?.LOCATION.length > 0)) ? "col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 float-left" : "col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 float-left"}>
                                            {JOB_COUNT === undefined ? <div class="comment br animate"></div> :
                                                <div className="rg-innersectionhead d-flex">
                                                    <div className="rg-title">
                                                        {this.props.searchResultTitle ? <h2>Search Result: " <a style={{ color: "red" }}>{this.props.searchResultTitle}</a> "</h2> : <h2>{(JOB_LIST == undefined ? `0 ${aboutJobName} Jobs` : '')}</h2>}
                                                    </div>

                                                    {!this.props?.location?.state?.hideJobAlert && <div className='sendme-jobs'>

                                                        <button type="button" className="mt-0" id="modal_view_right" data-toggle="modal" data-target="#information_modal" onClick={this.openModal}>Send me jobs like these</button>
                                                    </div>}
                                                </div>}
                                            {JOB_COUNT !== undefined && JOB_COUNT != 0 && < div className="rg-sortandview">
                                                <div className="rg-views d-flex">
                                                    {JOB_COUNT} &nbsp; <h1 style={{ fontSize: '13px', fontWeight: '600' }}>{locationJobName == undefined ? aboutJobName == "Fresher Jobs" ? "Fresher Jobs" : aboutJobName == "MostPopular Video JD Jobs" ? "MostPopular Video JD Jobs" : aboutJobName == "HotSectors Video JD Jobs" ? "HotSectors Video JD Jobs" : aboutJobName == "PartTime Jobs" ? " Part Time Jobs" : aboutJobName == "Walk-in-jobs" ? "Walk-in-jobs" : aboutJobName == "Work-From-Home jobs" ? "Work-From-Home jobs" : aboutJobName == "Remote Jobs" ? "Remote Jobs" : `${aboutJobName} Jobs` : `Jobs In ${locationJobName}`}</h1>
                                                </div>

                                            </div>}
                                            <div className="rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree">
                                                {JOB_COUNT === undefined && < Shimmer />}
                                                {JOB_COUNT !== undefined && JOB_LIST !== undefined && JOB_LIST?.length > 0 && JOB_LIST.map((item, index) => {
                                                    const URL = item.COMPANY_URL ? item.COMPANY_URL + '-' + item.EMPLOYER_ID : 'rozgar' + '-' + item.EMPLOYER_ID;
                                                    let COMPANY_NAME = item.COMPANY_NAME === null ||
                                                        item.COMPANY_NAME ==
                                                        "[object Object]"
                                                        ? item.COMPANY_URL === null ? "" : capitalizeWords(
                                                            item.COMPANY_URL.split("-")
                                                        ).join(" ")
                                                        : item.COMPANY_NAME
                                                    let dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                    dynamicURL = dynamicURL.replace(/ /g, '')
                                                    return (<>

                                                        <div className="rg-featurejobholder">
                                                            <div className="rg-featurejob">
                                                                <figure className="rg-companyimg">
                                                                    {item.COMPANY_LOGO === 'NA' ? <h3 className='logotext'>{item.COMPANY_NAME?.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />}
                                                                </figure>
                                                                <div className="rg-companycontent">
                                                                    <div className="rg-companyhead">
                                                                        <div className="rg-rightarea">
                                                                            <a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock"></i> {getDateParts(item.CREATED_ON).relativeTime.split(' ')[0] == 'a' ? '1 ' + getDateParts(item.CREATED_ON).relativeTime.split(' ').splice(1).join(' ') : getDateParts(item.CREATED_ON).relativeTime}</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rg-companyname">
                                                                        <h3 title={item.JOB_TITLE}><Link href={constant.component.jobdetails.url.replace(':url', dynamicURL)}>{item.JOB_TITLE} </Link></h3>
                                                                        <h6><Link href={constant.component.companydetails.url.replace(':url', URL)} target='_blank'>{item.COMPANY_NAME === null || item.COMPANY_NAME == "[object Object]" ? item.COMPANY_URL : item.COMPANY_NAME}</Link></h6>
                                                                        <div className="companyreviewbox">
                                                                        <span className="reviewnumber">
                                            <i className="fa fa-star"></i>
                                          </span>
                                            <span className="reviewlink">
                                              ({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} Reviews)
                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rg-description">
                                                                        <p>{item.JOB_DETAILS == null ? '' : item.JOB_DETAILS?.length > 64 ? convertToPlain(item.JOB_DETAILS.replace('Job description', '')).slice(0, 64).trim() + '...' : convertToPlain(item.JOB_DETAILS.replace('Job description', '')).slice(0, 64).trim()}</p>
                                                                        <ul className="skilllist">
                                                                            {item.KEYWORDS.split(',')?.length && item.KEYWORDS.split(',').map((i, index) => {
                                                                                if (item.KEYWORDS.split(',').length - 1 == index) {
                                                                                    return (
                                                                                        <span> <li>{i}</li>                                                                                                                                                                        </span>
                                                                                    )
                                                                                }
                                                                                else if (index <= 3) {
                                                                                    return (
                                                                                        <span> <li>{i}</li> |                                                                                                                                                                         </span>
                                                                                    )
                                                                                }
                                                                                else if (index == 4)
                                                                                    return (
                                                                                        <span> <li>{i}</li>                                                                                                                                                                          </span>
                                                                                    )
                                                                                else if (index == 5) {
                                                                                    return "..."
                                                                                }
                                                                            })}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="rg-rightarea">
                                                                        <a className="rg-btnjobtag rg-fulltimejob mr-10" href="javascript:void(0);">
                                                                            <i className="ti-crown"></i> {item.LISTNING_TYPE == 1 ? ' REGULAR' : item.LISTNING_TYPE == 2 ? ' FEATURED' : ' PREMIUM'}
                                                                        </a>

                                                                        {
                                                                            !this.state.saveList.includes(item.JOB_ID)
                                                                                ?
                                                                                <button className="rg-tagfeature" onClick={() => {
                                                                                    this.onClickSave(item.JOB_ID)

                                                                                }
                                                                                } style={{ cursor: 'pointer', fontSize: '1em' }}><i className="fa fa-star fa-sm"></i> Save </button>
                                                                                :
                                                                                <button className="rg-tagfeature" onClick={() => this.onClickUnSave(item.JOB_ID)} style={{ cursor: 'pointer', fontSize: '1em' }}><i className="fa fa-star fa-sm" style={{ color: '#eea21d' }}></i> saved</button>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul className="rg-professionalinfo">
                                                                <li><i className="lnr lnr-briefcase"></i><span>{item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</span></li>
                                                                <li><i className="fa fa-rupee"></i><span>{item.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : `${item.CTC_MIN >= 100000
                                                                                                            ? (item.CTC_MIN / 100000).toFixed(1).replace('.0', '')
                                                                                                            : item.CTC_MIN
                                                                                                        } - ${item.CTC_MAX >= 100000
                                                                                                            ? (item.CTC_MAX / 100000).toFixed(1).replace('.0', '') + " Lacs"
                                                                                                            : item.CTC_MAX
                                                                                                        } PA`}</span></li>
                                                                <li><i className="lnr lnr-map-marker"></i><span title={item.TYPE_OF_WORK_FROM_HOME === 'PRJ' ? 'Remote' : item.TYPE_OF_WORK_FROM_HOME === 'WFHDC' ? 'Temporary Work From Home' : item.CITY}>{item.TYPE_OF_WORK_FROM_HOME === 'PRJ' ? 'Remote' : item.TYPE_OF_WORK_FROM_HOME === 'WFHDC' ? 'Temporary Work From Home' : item.CITY?.length <= 25 ? item.CITY : (item.CITY?.slice(0, 25) + '...')}</span></li>

                                                            </ul>
                                                        </div>
                                                    </>
                                                    )

                                                })}
                                                {JOB_COUNT == 0 && <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                                    <Image src={noRecordImg} />
                                                    <h4>"Our apology! There are currently no job openings for the <strong>{this.props.aboutJobName}</strong>. We recommend you set up a job alert so you don't miss when new <strong>{this.props.aboutJobName}</strong> jobs are posted.
                                                    </h4>
                                                    <h6>Download the Rozgar app to receive customized daily alerts for job openings for <strong>{this.props.aboutJobName}</strong>."

                                                    </h6>
                                                    <p>Only cities/states/country names are accepted in location field</p>
                                                    <p> You can browse jobs by <Link href={constant.component.jobsByCategory.url}>Functional Area, Industry</Link>, <Link href={constant.component.jobsByCompany.url}>Company</Link>, <Link href={constant.component.jobsBySkill.url}> Skills </Link> and <Link href={constant.component.jobsByDesignation.url}>Designations</Link> </p>
                                                    <Link href={constant.component.login.url} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Jobs</span></Link>

                                                </div>}
                                                {this.props.showAllFresherJobs &&
                                                    <button type="submit" onClick={() => this.props.history.push(constant.component.latestfresherjob.url)} className="rg-btn rg-active btn-primary">
                                                        View All Freshers Job
                                                    </button>
                                                }
                                                {JOB_LIST !== undefined && < nav className="rg-pagination">

                                                    <ul>
                                                        <Pagination
                                                            activePage={this.state.CURRENT_PAGE}
                                                            itemsCountPerPage={25}
                                                            totalItemsCount={JOB_COUNT ? JOB_COUNT : 1}
                                                            pageRangeDisplayed={5}
                                                            onChange={this.handlePageChange}
                                                            itemClass="page-item"
                                                            linkClass="page-link"
                                                        />
                                                    </ul>
                                                </nav>}
                                                {JOB_LIST?.length > 0 &&Job_FAQ_List.length>0? <div style={{float:'left',marginTop:'25px' ,width:'100%'}}>
                                                        <h2 id='faq' style={{fontSize:'18px'}}>Frequently Asked Questions</h2>
                                                        <div className="rozgar-quciksolutionbox">

                                                            {Job_FAQ_List&&Job_FAQ_List.length>0&&Job_FAQ_List.map((item, index) => {
                                                                return (
                                                                    <Accordion defaultActiveKey="1" >
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header style={{ padding: '0px' }} >{item.QUESTION}</Accordion.Header>
                                                                            <Accordion.Body>

                                                                                {nl2br(item.ANSWER)}

                                                                            </Accordion.Body>

                                                                        </Accordion.Item>

                                                                    </Accordion>
                                                                )

                                                            })}
                                                        </div>

                                                    </div>:''}
                                            </div>
                                        </div>
                                       
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
                                            <aside id="rg-sidebarvtwo" className="rg-sidebar rg-sidebarvtwo">
                                                {
                                                    this.props.isLocation && <div className="jobscitypage mb-20">
                                                        <ul>
                                                            <li><a target='_blank' href={constant.component.CityOverview.url.replace(':city', `${this.props.isLocation.URL}`)}><i className="fa fa-caret-right"></i> {this.props.isLocation.CITY} - An Overview</a></li>
                                                            <li> <Link href={constant.component.topcompanieslist.url} ><i className="fa fa-caret-right"></i>Top Companies</Link></li>
                                                            <li> <Link href={constant.component.interviewQuestion.url} ><i className="fa fa-caret-right"></i>Interview Question</Link></li>
                                                            <li> <Link href={constant.component.studyAbroad.url} ><i className="fa fa-caret-right"></i>Study Abroad</Link></li>
                                                            {/* <li> <Link href={constant.component.internationalWorkVisas.url} ><i className="fa fa-caret-right"></i>International Work Visa</Link></li> */}
                                                            <li> <Link href={constant.component.StudentsExplorer.url} ><i className="fa fa-caret-right"></i>Career Explorer</Link></li>
                                                            <li> <Link href={constant.component.careerAstrology.url} ><i className="fa fa-caret-right"></i>Career Astrology</Link></li>
                                                            <li> <Link href={constant.component.ResumeMaking.url} ><i className="fa fa-caret-right"></i>Resume Making</Link></li>
                                                            <li> <Link href={constant.component.educationLoan.url} ><i className="fa fa-caret-right"></i>Education Loan</Link></li>


                                                        </ul>
                                                    </div>
                                                }
                                                <div className="roz-create-cv">
                                                    {JOB_COUNT === undefined ? <JobsByLoader /> :
                                                        <div className='urgent-hiring-area'>
                                                            <Link target='_blank' href={constant.component.hiringfresherjob.url}>
                                                                <div className='hiring-img'>
                                                                    <Image src={announceImage01} />
                                                                </div>
                                                            </Link>
                                                        </div>}
                                                    <div className="roz-create-cv">
                                                        {JOB_COUNT === undefined ? <JobsByLoader /> :
                                                            <a target='_blank' href={constant.component.ResumeMaking.url}>
                                                                <div className="create-cv-bg">
                                                                    <div className="imgfree">
                                                                        <Image src={cvpic01} />
                                                                    </div>
                                                                    <div className="create-text">
                                                                        <div className="free-text">Free</div>
                                                                        <h4>Create CV</h4>
                                                                    </div>
                                                                    <div className="d-flex btn-cv p-0">
                                                                        <i className="fa fa-angle-double-right" ></i>
                                                                    </div>
                                                                </div>
                                                            </a>}
                                                    </div>
                                                </div>
                                                {JOB_COUNT === undefined ? <JobsByLoader /> :
                                                    <div className="roz-company-hiring mb-30">
                                                        <div className="company-hiring">
                                                            <div className="company-hiring-text">
                                                                <h3>Companies Hiring</h3>
                                                            </div>
                                                            <div className="company-hiring-view">
                                                                <a target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                                                            </div>
                                                        </div>
                                                        <div className="company-hiring-logo">
                                                            {this.props.TOP_COMPANY_IMAGES && this.props.TOP_COMPANY_IMAGES.length > 0 && this.props.TOP_COMPANY_IMAGES.map((item, index) => {
                                                                return (
                                                                    <Link href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)} target='_blank'>
                                                                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />
                                                                    </Link>
                                                                )
                                                            })}

                                                        </div>
                                                    </div>}
                                                {JOB_COUNT === undefined ? <JobsByLoader /> :
                                                    <div className="rg-adds rg-jobsearchadd">
                                                        {this.props.BannerSkill && this.props.BannerSkill.map((item) => {
                                                            if (item && item.POSITION == "RIGHT") {
                                                                return (
                                                                    <Link onClick={(e) => this.BannerCilck(item, location, count + 1)} target='_blank' href={item.LINK} title="">
                                                                        <figure>
                                                                            {item == undefined ? "" :
                                                                                <Image
                                                                                    src={`${"https://s3rozgar.s3.ap-south-1.amazonaws.com/component/page_header/images/"}${item && item.BANNER_FILE}`} alt="img description"
                                                                                    width={"1000"}
                                                                                    height={"1000"}
                                                                                />}
                                                                            <span>Ad</span>

                                                                        </figure>
                                                                    </Link>
                                                                )
                                                            }
                                                        })}
                                                        {productList && productList.map((item) => {
                                                            return (
                                                                <Link target='_blank' href={item.DetailPageURL}>

                                                                    <div className='rozgarlarninghead' style={{ backgroundColor: '#ffffff', marginTop: '15px', border: "1px solid #eee" }} >

                                                                        <div className='learningjava'>

                                                                            <Image
                                                                                src={item.Images.Primary.Medium.URL} alt="img description"
                                                                                width={item.Images.Primary.Medium.Width}
                                                                                height={item.Images.Primary.Medium.Height}
                                                                            />
                                                                        </div>
                                                                        <p className='course-title-bx' title={item.ItemInfo.Title.DisplayValue} style={{ fontWeight: '500', fontSize: '14px', marginTop: '1px' }}>{item.ItemInfo.Title.DisplayValue.length > 65 ? item.ItemInfo.Title.DisplayValue.slice(0, 55) + '...' : item.ItemInfo.Title.DisplayValue}</p>





                                                                        <div className='buynowbtn' style={{ marginTop: "10px" }} >
                                                                            {item.Offers.Listings.map((ele) => {
                                                                                return (

                                                                                    <small style={{ fontSize: "18px", fontWeight: '800', color: 'black' }}><i style={{ fontSize: '15px' }} class="fa fa-inr" aria-hidden="true"></i><small></small>{ele.Price.Amount}  <small style={{ marginLeft: '5px' }}> <del><i style={{ fontWeight: '100', fontSize: '15px' }} class="fa fa-inr" aria-hidden="true"></i>{ele.Price.Amount + ele.Price.Savings.Amount}</del></small></small>
                                                                                )
                                                                            })}
                                                                            <Link style={{ display: 'inline-block', marginLeft: '47px', padding: ' 4px 20px', borderRadius: '1px' }} target='_blank' href={item.DetailPageURL} >Buy Now</Link></div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })}



                                                    </div>}
                                                {CITIES && CITIES.length > 0 && <div className="roz-aside-jobs-by-location">
                                                    <div className="roz-aside-jobs-by-location-box">
                                                        <h3>Jobs by location</h3>
                                                        <ul id="style-3">
                                                            {CITIES.map(item => {
                                                                return (
                                                                    <li><a target='_blank' href={constant.component.joblist.url.replace(':url', item.URL)}><i className="fa fa-angle-double-right"></i> Jobs in {item.CITY}</a></li>
                                                                )

                                                            })}

                                                        </ul>
                                                    </div>
                                                </div>}
                                            </aside>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.openModal}
                            style={{ content: { top: "5%", left: '30%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                            onRequestClose={this.onCloseModal}

                        >

                            <SignInForSaveUnsave
                                leftBar={this.state.leftBar}
                                history={this.props.router}
                                onCloseModal={this.onCloseModal}
                            />

                        </Modal>


                    </div>
                </main>
            </React.Fragment >
        )
    }
}

export default withRouter(JobLists);