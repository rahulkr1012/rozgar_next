import React, { Component } from 'react'
import { getSaveJobList, SaveJobs } from '@/action/CandidateAction';
import constant from 'constant';
import { getDateParts, getsessionStorage, getStorage, ToSeoUrl } from '../../utils';
import moment from 'moment'
import Parser from 'html-react-parser';
import Shimmer from '../common/Shimmer';
import swal from 'sweetalert';
import Link from "next/link";
import { deleteCookie, getCookie } from 'cookies-next';

export default class SavedJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            saveJobId: getCookie(constant.keys.saveJobId) ? JSON.parse(getCookie(constant.keys.saveJobId)) : {},
            list: null,
            totalCount: "",
            showShimmer: true,
        }
    }

    componentDidMount() {
        document.title = constant.title.SavedJobs
        const { JOB_ID } = this.state.saveJobId ? this.state.saveJobId : ''
        if (JOB_ID) {
            this.saveJobs(JOB_ID)
        }
        this.getSaveJobLists()
    }

    saveJobs = (JOB_ID) => {
        const { CANDIDATE_ID } = this.props.ud ? this.props.ud : ''
        const model = {
            CANDIDATE_ID: CANDIDATE_ID,
            JOB_ID: JOB_ID,
            ACTION: "save"
        }

        SaveJobs(model).then((res) => {
            if (res.status) {
                this.setState({ saveState: res.result, toastContent: true })
                deleteCookie('saveJobId')
                this.getSaveJobLists()
            } else {
                swal({
                    icon: "error",
                    text: res.error,
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getSaveJobLists = () => {
        const { CANDIDATE_ID } = this.props.ud
        getSaveJobList({ CANDIDATE_ID: CANDIDATE_ID }).then((res) => {
            if (res.status) {
                setTimeout(() => {
                    this.setState({ showShimmer: false })
                }, 1000)
            }
            this.setState({ totalCount: res.result.count })
            this.setState({ list: res.result.list })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-jobbylocsearch pt-2 pb-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="rg-title">
                                            <h3 className='text-white'>Jobs saved by you</h3>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='numofsavejob'>
                                            {
                                                this.state.list
                                                    ?
                                                    <span className='font-20'>{`${this.state.totalCount} Jobs based on Your Desired Preferences`}</span>
                                                    :
                                                    ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--************************************
                        Search Area end
                *************************************-->
                <!--************************************
                        Blog Grid Start
                *************************************--> */}
                        <div className="rg-haslayout mt-4">
                            <div className="container">
                                <div className="row">
                                    <div id="rg-threecolumns" className="rg-threecolumns">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left">
                                            <div className="rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree">
                                                <div className='row'>
                                                    <div className='col-md-8'>
                                                        {this.state.toastContent &&
                                                            <div className='' style={{ padding: "18px 24px", borderLeft: '4px solid #6bcf38', boxShadow: '4px 3px #e4e4e4', margin: '2px' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <p style={{ fontSize: '1.4em', alignItems: 'center' }}>
                                                                        Job Saved SuccessFully
                                                                    </p>
                                                                    {/* <Link href=''>Send Me Jobs Like This</Link> */}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className='row'>
                                                            {
                                                                this.state.list?.map((item, index) => {
                                                                    var a = moment([parseInt(moment(item.CREATED_ON).format('YYYY')), parseInt(moment(item.CREATED_ON).format('MM')), parseInt(moment(item.CREATED_ON).format('DD'))])
                                                                    var b = moment([parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment().format('DD'))])
                                                                    var days = b.diff(a, 'days')
                                                                    // const dynamicURLOne = ToSeoUrl(item.JOB_TITLE) + '_' + ToSeoUrl(item.JOB_DETAILS) + '_' + 'EXP' + '-' + ToSeoUrl(item.WORK_EXP_MIN) + '_' + ToSeoUrl(item.WORK_EXP_MAX) + '_' + item.CUSTOM_JOB_ID + '_' + ToSeoUrl(item.KEYWORDS) + '?src=SIMILAR_JOBS=' + item.JOB_ID
                                                                    let dynamicURLOne = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                                    dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                                    return (
                                                                        <div className='col-md-12'>
                                                                            {this.state.showShimmer ? <Shimmer /> : <div className="rg-featurejobholder">
                                                                                <div className="rg-featurejob">
                                                                                    <figure className="rg-companyimg">
                                                                                        {item.COMPANY_LOGO === 'NA' ? <h2 style={{ marginBottom: "0" }}>{item.COMPANY_NAME.split(' ').length === 1 ? item.COMPANY_NAME.slice(0, 1) : item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('').slice(0, 3)}</h2> : <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />}
                                                                                    </figure>
                                                                                    <div className="rg-companycontent">
                                                                                        <div className="rg-companyname">
                                                                                            <h3><a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>{item.JOB_TITLE}</a></h3>
                                                                                            <h6>{item.COMPANY_NAME}</h6>
                                                                                            <div className="companyreviewbox">
                                                                                                {/* <a href="#"><span>{item.COMPANY_NAME} - </span></a> */}
                                                                                                <span className="reviewnumber">{
                                                                                                    // (Math.round(item.rating * 10) / 10) > 5 ? 5 : Math.round(item.rating * 10) / 10
                                                                                                } <i className="fa fa-star"></i></span>
                                                                                                <a href="#"><span className="reviewlink">({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} Reviews)</span></a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="rg-description">
                                                                                            <p>{item.JOB_DETAILS.length > 78 ? Parser(item.JOB_DETAILS.slice(0, 78)) + '...' : Parser(item.JOB_DETAILS)}</p>
                                                                                            <ul className="skilllist">
                                                                                                {item.KEYWORDS.split(',').length && item.KEYWORDS.split(',').map((item, index) => {
                                                                                                    if (index <= 3) {
                                                                                                        return (
                                                                                                            <span> <li>{item}</li> |                                                                                                                                                                         </span>
                                                                                                        )
                                                                                                    }
                                                                                                    else if (index == 4)
                                                                                                        return (
                                                                                                            <span> <li>{item}</li>                                                                                                                                                                          </span>
                                                                                                        )
                                                                                                    else if (index == 5) {
                                                                                                        return "..."
                                                                                                    }
                                                                                                })}
                                                                                                {/* <li>{item.KEYWORDS.length > 60 ? `${item.KEYWORDS.slice(0, 60)}...` : item.KEYWORDS}</li> */}
                                                                                                {/* <li>CSS</li>
                                                                                                <li>HTML</li>
                                                                                                <li>IT Skills</li>
                                                                                                <li>MVC Framework</li>
                                                                                                <li>Programming</li>
                                                                                                <li>JQuery</li>
                                                                                                <li>Web Designing</li> */}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="rg-rightarea">
                                                                                            <a className="rg-btnjobtag rg-fulltimejob mr-10 mt-1" href="javascript:void(0);">
                                                                                                Posted {getDateParts(item.CREATED_ON).relativeTime}
                                                                                            </a>
                                                                                            <a className="rg-savejobs" href="javascript:void(0);" onClick={() => this.onClickUnSave(item.JOB_ID)} ><i className="fa fa-star font-20" style={{ color: "#eea21d" }}></i></a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <ul className="rg-professionalinfo">
                                                                                    <li><i className="lnr lnr-briefcase"></i><span>{item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</span></li>
                                                                                    <li><i className="fa fa-rupee"></i><span> {item.CTC_MIN === "" && item.CTC_MAX === "" ? "Not Disclosed" : `${item.CTC_MIN >= 100000
                                                                                        ? (item.CTC_MIN / 100000).toFixed(1).replace('.0', '')
                                                                                        : item.CTC_MIN
                                                                                        } - ${item.CTC_MAX >= 100000
                                                                                            ? (item.CTC_MAX / 100000).toFixed(1).replace('.0', '') + " Lacs"
                                                                                            : item.CTC_MAX
                                                                                        } PA`}</span></li>
                                                                                    <li><i className="lnr lnr-map-marker"></i><span>{item.IS_WORK_FROM_HOME === "N" ? item.location : "Remote"}</span></li>
                                                                                </ul>
                                                                            </div>}
                                                                        </div>

                                                                    )
                                                                })

                                                            }
                                                            {/* <div className='col-md-12'>
                                                                <div className="rg-featurejobholder">
                                                                    <div className="rg-featurejob">
                                                                        <figure className="rg-companyimg">
                                                                            <img src={'./assets/images/topcompanies/img-01.png'} alt="image description" />
                                                                        </figure>
                                                                        <div className="rg-companycontent">
                                                                            <div className="rg-companyname">
                                                                                <h3><a href="javascript:void(0);">ServiceNow IT Service Management Application Developer</a></h3>
                                                                                <h6>AXIS BANK</h6>
                                                                                <div className="companyreviewbox">
                                                                                    <a href="#"><span>Accenture - </span></a>
                                                                                    <span className="reviewnumber">4.5 <i className="fa fa-star"></i></span>
                                                                                    <a href="#"><span className="reviewlink">(22835 Reviews)</span></a>
                                                                                </div>
                                                                            </div>
                                                                            <div className="rg-description">
                                                                                <p>We are looking for 6 months experienced candidate who must have sound background and basic knowledge</p>
                                                                                <ul className="skilllist">
                                                                                    <li>CSS</li>
                                                                                    <li>HTML</li>
                                                                                    <li>IT Skills</li>
                                                                                    <li>MVC Framework</li>
                                                                                    <li>Programming</li>
                                                                                    <li>JQuery</li>
                                                                                    <li>Web Designing</li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="rg-rightarea">
                                                                                <a className="rg-btnjobtag rg-fulltimejob mr-10 mt-1" href="javascript:void(0);">
                                                                                    Posted 12 days ago
                                                                                </a>
                                                                                <a className="rg-savejobs" href="javascript:void(0);"><i className="fa fa-star font-20"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul className="rg-professionalinfo">
                                                                        <li><i className="lnr lnr-briefcase"></i><span>6-8 Yrs</span></li>
                                                                        <li><i className="fa fa-rupee"></i><span>Not disclosed</span></li>
                                                                        <li><i className="lnr lnr-map-marker"></i><span>Bangalore/Bengaluru</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='savejobs-aside'>
                                                            <ul>
                                                                <ul>
                                                                    <li ><Link href="/featured-jobs"><i class="ti-bookmark"></i><span style={{ color: '#000' }}>Featured Job</span> </Link></li>
                                                                    <li><Link href="/premium-jobs"><i class="lnr lnr-bullhorn"></i><span style={{ color: '#000' }}>Premium Job</span> </Link></li>
                                                                    <li><Link href="/interview-questions"><i className="ti-crown"></i><span style={{ color: '#000' }}>Interview Question</span> </Link></li>
                                                                    <li><Link href="/top-companies"><i class="lnr lnr-bug"></i> <span style={{ color: '#000' }}>Top Companies</span> </Link></li>
                                                                    <li><Link href="/fresher-jobs"><i className="ti-hand-point-right"></i><span style={{ color: '#000' }}>Freshers Jobs</span> </Link></li>
                                                                    <li><Link href="/jobs-by-location"><i class="ti ti-image"></i><span style={{ color: '#000' }}>All Jobs</span> </Link></li>
                                                                    {/* <li><Link href="/"><i class="lnr lnr-laptop"></i><span style={{color:'#000'}}>Government Jobs</span> </Link></li> */}
                                                                    <li><Link href="/"><i class="lnr lnr-laptop"></i><span style={{ color: '#000' }}>International Jobs</span> </Link></li>
                                                                </ul>
                                                            </ul>
                                                        </div>
                                                    </div>
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


    getSavedJobs = (model) => {
        SaveJobs(model).then((res) => {
            if (res.status) {
                this.getSaveJobLists()
            }
        }).catch((err) => {
            alert(err)
        })
    }

    onClickUnSave = (JOB_ID) => {
        const { CANDIDATE_ID } = this.props.ud ? this.props.ud : ""
        if (CANDIDATE_ID) {
            this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "unsave" })
            this.getSaveJobLists()
        }
    }
}
