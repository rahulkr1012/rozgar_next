import React, { Component } from 'react'
import constant from 'constant'
import { getDateParts, ToSeoUrl } from '../../utils'
import moment from 'moment'
import { SaveJobs, getSaveJobList, getProfilePic, appliedJobCount } from '@/action/CandidateAction'
import { getCandidateDetail } from '@/action/CandidateAction'
import Pic from '../../public/assets/images/secondary.jpg'
import Modal from 'react-modal';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import VerifyEmailMobile from 'components/EditProfileModal/VerifyEmailMobile'
import Link from 'next/link'
import Shimmer from 'components/common/Shimmer'
import ProfilePicture from './ProfilePicture'
import SearchBar from 'components/common/common/searchbar'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Add05 from '../../public/assets/images/adds-05.jpg'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saveState: "",
            likedJobListData: [],
            openModal: false,
            saveList: [],
            detail: getCookie(constant.keys.cd)
                ? JSON.parse(getCookie(constant.keys.cd))
                : null,
            candidateDetail: {},
            getFile: undefined,
            list: [],
            totalCount: 0,
            applied_job_count: 0
        }
    }

    componentDidMount() {
        this.getSavedJobs()
        this.likedJobsList()
        this.state.detail && this.getCandidateDetail()
        this.state.detail && this.onGetFileChange()
        this.getSaveJobLists()
        this.getAppliedJobsCount()
    }

    getAppliedJobsCount = () => {
        appliedJobCount().then((res) => {
            if (res.status) {
                this.setState({ applied_job_count: res.result.cnt })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getSaveJobLists = () => {
        const { CANDIDATE_ID } = this.state.detail
        getSaveJobList({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
            if (res.status) {
                this.setState({ totalCount: res.result.count })
                this.setState({ list: res.result.list })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getSavedJobs = (model) => {
        SaveJobs(model).then((res) => {
            this.setState({ saveState: res.result })
            this.likedJobsList({ CANDIDATE_ID: this.candidateId })
        }).catch((err) => {
            console.log(err)
        })
    }

    likedJobsList = (model) => {
        getSaveJobList(model).then((res) => {
            if (res.status) {
                this.setState({ saveList: res.result.list })
                this.setState({ likedJobListData: res.result.list?.map((item) => item.JOB_ID) })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getCandidateDetail = () => {

        getCandidateDetail({ CANDIDATE_ID: '' }).then((res) => {
            if (res.status) {
                // if (res.result.ProfileWeigh < 60) {
                // this.props.history.push(constant.component.editProfile.url);
                //     this.props.onProgress()
                // }
                this.setState({
                    candidateDetail: res.result
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    candidateId = getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd)).CANDIDATE_ID
        : {}


    setLiked = (JOB_ID) => {
        this.getSavedJobs({ CANDIDATE_ID: this.candidateId, JOB_ID: JOB_ID, ACTION: "save" })
        this.likedJobsList({ CANDIDATE_ID: this.candidateId })
        this.setState({ likedJobListData: [...this.state.likedJobListData, JOB_ID] })
    }

    setDisLike = (JOB_ID) => {
        this.getSavedJobs({ CANDIDATE_ID: this.candidateId, JOB_ID: JOB_ID, ACTION: "unsave" })
        this.setState({ likedJobList: this.state.likedJobListData?.filter((e) => e !== JOB_ID) })
    }

    onGetFileChange = () => {
        getProfilePic({ CANDIDATE_ID: '' }).then((res) => {
            this.setState({ getFile: res.result })
        })
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
        this.onGetFileChange()
    }
    onOpenModal = () => {
        this.setState({ openModal: true })
    }

    handleClick = () => {
        this.setState({})
    }

    render() {
        const { candidateDetail, getFile } = this.state
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ''
        const profilePreviewURL = candidateDetail.CANDIDATE_NAME ? candidateDetail.CANDIDATE_NAME.replace(" ", "-").split(" ").join("-") : ""
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <VerifyEmailMobile getCandidateDetail={this.getCandidateDetail} />
                        <div className="rozgar-profilesearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                        <SearchBar />
                                        {/* <form className="rozgar-profilesearchbox">
                                            <div className="rozgar-formbox">
                                                <div className="rozgar-profilesearchcontent">
                                                    <div className="form-group">
                                                        <i className="lnr lnr-magnifier"></i>
                                                        <input type="text" name="keyword" className="form-control" placeholder="Search jobs by Skills, Designation, Companies" />
                                                    </div>
                                                </div>
                                                <div className="rozgar-profilesearchbtn">
                                                    <a href="javascript:void(0)"><i className="lnr lnr-magnifier"></i></a>
                                                </div>
                                            </div>
                                        </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rozgar-profileimgarea">
                            <div className="container">
                                <div className="row">
                                    <div className='col-md-2'>
                                        <div className='profilepic'>
                                            {/* <Image src={'./assets/images/author/profile_icon.jpg'} alt="image description" /> */}
                                            {getFile != undefined && getFile.PROFILE_IMAGE ?
                                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${CANDIDATE_ID}/${getFile.PROFILE_IMAGE}`} width={100} height={70} alt='' /> :
                                                <Image src={Pic} width={100} height={70} />
                                            }
                                            <div className='proimgedit' onClick={this.onOpenModal}>
                                                <i class="fa fa-camera"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-7'>
                                        <div className='proqaucontent'>
                                            <h3 className=''>{candidateDetail.CANDIDATE_NAME}</h3>
                                            <h5>{candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_COMPANY : 'Not Available'}</h5>
                                            <div className='profiledetails'>
                                                <div className='row'>
                                                    <div className='col-md-8'>
                                                        <ul>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-map-marker"></i></span>
                                                                <span>INDIA</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-phone"></i></span>
                                                                <span>{candidateDetail.PHONENO == null || undefined ? "Not Available " : candidateDetail.PHONENO}</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-briefcase"></i></span>
                                                                <span>{candidateDetail.TOTAL_EXP_YEAR == null || undefined ? "" : candidateDetail.TOTAL_EXP_YEAR + ' ' + 'Years'} {candidateDetail.TOTAL_EXP_MONTH == null || undefined ? "Not Available" : candidateDetail.TOTAL_EXP_MONTH + ' ' + 'Months'}</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-envelope"></i></span>
                                                                <span>{candidateDetail.EMAIL_ID == null || undefined ? "Not Available" : candidateDetail.EMAIL_ID}</span>
                                                            </li>
                                                            <li>
                                                                <span className='allicon'><i class="lnr lnr-layers"></i></span>
                                                                <span>{candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_ANNUAL_SALARY_LACS / 100000 + ' ' + 'Lakhs' : "Not Available"} {candidateDetail.CurrentEmp ? candidateDetail.CurrentEmp.CURRENT_ANNUAL_SALARY_THOUSANDS / 1000 + ' ' + 'Thousands' : ""}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='btnverifid'>
                                                            <ul>
                                                                <li><i
                                                                    className={candidateDetail.IS_PHONE_VERIFIED == "Y" ? 'epiconverified ti-check' : 'epiconnotverified ti-check'}
                                                                ></i></li>
                                                                <li><span className={candidateDetail.IS_EMAIL_VERIFIED == "Y" ? 'btnepverifyjob' : 'btnepnotverifyjob'}>{candidateDetail.IS_EMAIL_VERIFIED == "Y" ? 'Verified' : 'Verify'}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {<p className='pt-2 pb-0'>Profile Strength ({candidateDetail.ProfileWeigh}% Completed)</p>}

                                            <div class="progress profile">
                                                {/* <div class="progress-done" data-done="60" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                                                  {candidateDetail.Profilewighage}  60%
                                                </div> */}

                                                <progress max="100" value={candidateDetail.ProfileWeigh} style={{ width: '100%' }} ><span>{candidateDetail.ProfileWeigh}</span></progress>


                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-md-3 posrel'>
                                        <div className='profileupdate'>
                                            <div><Link href={constant.component.editProfile.url}>Update Profile</Link></div>
                                            <div className='profilepreview' style={{ padding: '4px 0px' }}>
                                                <Link href={constant.component.profilePreview.url.replace(':URL', profilePreviewURL)}>Profile Preview</Link>
                                            </div>
                                            <div className='awardbtnbox'>
                                                <i class="fa fa-trophy" aria-hidden="true"></i>
                                                <span className='nubtext'>
                                                    <small>{candidateDetail.reward_points}</small> Rewards
                                                </span>
                                                <span className='use-reward'>Use Reward Points</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rozgar-profile-main-content'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className='profileside'>
                                            <div className='profileside-head'>
                                                <h3>Rozgar Services you might be interested in</h3>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <div className='texthead'>Discover The Perfect University For You</div>
                                                <p>
                                                    At Rozgar.com, we do not just help you find a place for your education; we also walk the distance with you until you have settled in at whichever place you choose to study at.                                                    </p>
                                                <a href="/study-abroad" target="_blank" className='proknowmore'>Know More</a>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <div className='texthead'>Find Headway In The Career Of Your Preference</div>
                                                <p>Choose our premium services consisting of Personal Astrology Services, Finance Astrology Services, Education Astrology Services and so others made specifically for you to get the desired solution in life on the front of personal life, finance or academic pursuit</p>
                                                <a href="/career-astrology" target="_blank" className='proknowmore'>Know More</a>
                                            </div>
                                            <div className='calltext'>Call +91-8800277577 now! (Toll-free)</div>
                                        </div>
                                        <div className='profileside'>
                                            <div className='profileside-head'>
                                                <h3>FAQs</h3>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <p><Link href={constant.component.faqs.url}>Click here</Link> for frequently asked questions.</p>
                                            </div>
                                        </div>
                                        <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <a href="javascript:void(0);" title="">
                                                <figure>
                                                    <Image src={Add05} alt="img description" />
                                                </figure>
                                            </a>
                                            <span>Ad</span>
                                        </div>
                                    </div>
                                    <div className='col-md-9'>
                                        <div className='profilerightside'>
                                            <div className='projobtext'>Recommended Jobs</div>
                                            <div className='profilerightside-head'>
                                                <h3><span className="badge badge-danger">{this.props.totalCount}</span><a href="javascript:void(0)"> New Recommended Job(s)</a></h3>
                                            </div>
                                            {
                                                this.props.list?.map((item, index) => {
                                                    var a = moment([parseInt(moment(item.CREATED_ON).format('YYYY')), parseInt(moment(item.CREATED_ON).format('MM')), parseInt(moment(item.CREATED_ON).format('DD'))])
                                                    var b = moment([parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment().format('DD'))])
                                                    var days = b.diff(a, 'days')
                                                    // const dynamicURLOne = ToSeoUrl(item.JOB_TITLE) + '_' + ToSeoUrl(item.JOB_DETAILS) + '_' + 'EXP' + '-' + ToSeoUrl(item.WORK_EXP_MIN) + '_' + ToSeoUrl(item.WORK_EXP_MAX) + '_' + item.CUSTOM_JOB_ID + '_' + ToSeoUrl(item.KEYWORDS) + '?src=SIMILAR_JOBS=' + item.JOB_ID
                                                    let dynamicURLOne = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                    item.JOB_ID;
                                                    dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                    return (
                                                        <React.Fragment>
                                                            {
                                                                this.props.showShimmer ? <Shimmer /> :
                                                                    <div className='profilerightsideinner bb-01' key={index} >
                                                                        <div className='posttime'>Posted {getDateParts(item.CREATED_ON).relativeTime}
                                                                            {/* {days > 1 ? `Posted ${days} days ago` : `Posted ${days} day ago`} */}
                                                                        </div>
                                                                        <div className='newrjobs'>
                                                                            <div className='procomlogo' style={{ height: "35px", width: "35px", backgroundColor: "rgb(61 63 67 / 6%)", display: "flex", justifyContent: "center", alignItems: "center", padding: "0", marginRight: "10px", borderRadius: "4px" }}>
                                                                                {item.COMPANY_LOGO === 'NA' ? <h6 style={{ marginBottom: "0" }}>{item.COMPANY_NAME?.split(' ').length === 1 ? item.COMPANY_NAME?.slice(0, 1) : item.COMPANY_NAME?.split(' ').map((i) => i.substring(0, 1)).join('').slice(0, 3)}</h6> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={100} height={100} />}

                                                                            </div>
                                                                            <div className='procomtext'>
                                                                                <a href="javascript:void(0)">
                                                                                    <div className='logtext'>
                                                                                        <a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>{item.JOB_TITLE}</a>
                                                                                        {/* {item.JOB_TITLE} */}
                                                                                    </div>
                                                                                    <div className='comtext'>{item.COMPANY_NAME}</div>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className='pro-job-details'>
                                                                            <a href="javascript:void(0)">
                                                                                <div className='grid03'>
                                                                                    <span className='pr-10'><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MAX <= 1 ? `${item.WORK_EXP_MIN} - ${item.WORK_EXP_MAX} Year` : `${item.WORK_EXP_MIN} - ${item.WORK_EXP_MAX} Years`}</span>
                                                                                    <span><i class="lnr lnr-map-marker"></i> {item.IS_WORK_FROM_HOME === "N" ? item.STATE : "Remote"}</span>
                                                                                </div>
                                                                                <div className='grid03'>
                                                                                    <span><i class="lnr lnr-pencil"></i> {item.KEYWORDS.length > 60 ? `${item.KEYWORDS.slice(0, 60)}...` : item.KEYWORDS}</span>
                                                                                </div>
                                                                                <div className='grid03'>
                                                                                    <span><i class="lnr lnr-file-empty"></i> {item.JOB_DETAILS.length === 0 ? "No Discription Found" : item.JOB_DETAILS.length > 116 ? `${item.JOB_DETAILS.slice(0, 116)}...` : item.JOB_DETAILS}</span>
                                                                                </div>
                                                                                <div className='grid03'>
                                                                                    <span><i class="fa fa-rupee pr-1"></i>
                                                                                        {item.CTC_MIN === "" && item.CTC_MAX === "" ? "Not Disclosed" : `${item?.CTC_MIN >= 100000
                                                                                            ? (item?.CTC_MIN / 100000).toFixed(1).replace('.0', '')
                                                                                            : item?.CTC_MIN
                                                                                            } - ${item?.CTC_MAX >= 100000
                                                                                                ? (item?.CTC_MAX / 100000).toFixed(1).replace('.0', '') + " Lacs"
                                                                                                : item?.CTC_MAX
                                                                                            } PA`}
                                                                                    </span>
                                                                                </div>
                                                                            </a>
                                                                            <div className='pro-new-save'>
                                                                                <div className='pro-new-sec' style={{ visibility: days <= 7 ? "visible" : "hidden" }}>
                                                                                    <a href="javascript:void(0)">New</a>
                                                                                </div>
                                                                                <div className='pro-save-sec'>
                                                                                    {!this.state.likedJobListData?.includes(item.JOB_ID) ? <a href="javascript:void(0)"><i className="fa fa-star " onClick={() => { this.setLiked(item.JOB_ID) }}></i></a> :
                                                                                        <a href="javascript:void(0)"><i className="fa fa-star" onClick={() => { this.setDisLike(item.JOB_ID) }} style={{ color: "red" }} ></i></a>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.props.list.length - 1 === index ? <div className='text-right'>
                                                                                <Link href={constant.component.allRecommendedJobsList.url} className='proknowmore'>VIEW ALL JOBS</Link>
                                                                            </div> : ""
                                                                        }
                                                                    </div>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </div>



                                        <section>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                <div className="rg-sectionhead">
                                                    <h2>Featured Companies Hirings</h2>
                                                    <a className="rg-btnviewall" target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                {
                                                    this.props.featuredList?.map((item, index) => {
                                                        return (
                                                            <div className='col-md-6'>
                                                                <div className="rg-featurejob job-slice mb-15">
                                                                    <figure className="rg-companyimg">
                                                                        {item.COMPANY_LOGO === 'NA' ? <h3>{item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={100} height={100} />}
                                                                    </figure>
                                                                    <div className="rg-companycontent">
                                                                        <div className="rg-companyname">
                                                                            <h3><a target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>{item.COMPANY_NAME}</a></h3>
                                                                            <span title={item.ABOUT_COMPANY}>{item.ABOUT_COMPANY.length > 25 ? item.ABOUT_COMPANY.substring(0, 25) + '...' : item.ABOUT_COMPANY}</span>
                                                                        </div>
                                                                        <div className="rg-companyhead">
                                                                            <div className="rg-btnjobtag rg-homefulltimejobreviews">
                                                                                <span className="star">
                                                                                    <i className="fa fa-star"></i>
                                                                                </span>
                                                                                <span className="main-2 rating">
                                                                                    {/* {(Math.round(item.rating * 10) / 10) > 5 ? 5 : Math.round(item.rating * 10) / 10} */}
                                                                                </span> |
                                                                                <span className="main-2 reviews">
                                                                                    {/* {item.reviewCount} */}
                                                                                    0 {" "}
                                                                                    reviews</span>
                                                                            </div>
                                                                            <div className="rg-rightarea">
                                                                                <a className="rg-hiringfeature rg-tagfeatured" target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>View Jobs</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </section>





                                        <div className='row row-mobile'>
                                            <div className='col-md-6 col-md-6-mobile'>
                                                <div className='profilerightside'>
                                                    <div className='profilerightside-head'>
                                                        <h3>Application Summary</h3>
                                                    </div>
                                                    <p className='proap-text pb-0 pt-2'>Monthly Limit of Job Application: 1800</p>
                                                    <p className='proap-text pb-0 pt-1'>Used Limit of Job Application: {this.state.applied_job_count ? this.state.applied_job_count : 0}</p>
                                                    <p className='proap-text pb-3 pt-1'>Remaing Limit of Job Application: {!isNaN(this.state.applied_job_count) ? 1800 - this.state.applied_job_count : 0}</p>
                                                </div>
                                            </div>
                                            <div className='col-md-6 col-md-6-mobile'>
                                                <div className='profilerightside'>
                                                    <div className='profilerightside-head'>
                                                        <h3>Saved Job(s)</h3>
                                                    </div>
                                                    <p className='proap-text pb-3'> You have {this.state.totalCount ? this.state.totalCount : 0} saved jobs till now.</p>
                                                    <div className='text-right pr-15'>
                                                        <a href="/saved-jobs" target={"_blank"} className='proknowmore'>VIEW ALL JOBS</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='row row-mobile'>
                                            <div className='col-md-12 col-md-12-mobile'>
                                                <div className='profilerightside'>
                                                    <div className='projobtext'>Recruiters</div>
                                                    <div className='profilerightside-head'>
                                                        <h3><span className="badge badge-danger">16</span> New Recruiter Messages</h3>
                                                    </div>
                                                    <h4 className='pl-15 pt-20'>eClerx Services Ltd.</h4>
                                                    <div className='com-total-job-box'>
                                                        <a href="javascript:void(0)">
                                                            <p className='proap-text pt-0 pb-0 font-weight-500'>Job | Job Opportunity with eClerx for Web /Sr Web Developer
                                                                <span>New</span></p>
                                                        </a>
                                                    </div>
                                                    <div className='com-total-job-box'>
                                                        <a href="javascript:void(0)">
                                                            <p className='proap-text pt-0 pb-0'>Job | Job Opportunity with eClerx for Laravel Developer
                                                            </p>
                                                        </a>
                                                    </div>
                                                    <div className='com-total-job-box'>
                                                        <a href="javascript:void(0)">
                                                            <p className='proap-text pt-0 pb-0'>Job | Job Opportunity with eClerx for React Developer
                                                            </p>
                                                        </a>
                                                    </div>
                                                    <div className='text-right pr-15 pb-10'>
                                                        <a href="javascript:void(0)" className='proknowmore'>VIEW ALL MESSAGES</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Modal
                            isOpen={this.state.openModal}
                            style={{ content: { top: "20%", left: '20%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                            onRequestClose={this.onCloseModal}
                        >
                            <ProfilePicture closeModal={this.onCloseModal} />
                        </Modal>
                    </div>
                </main>

            </React.Fragment >
        )
    }
}
