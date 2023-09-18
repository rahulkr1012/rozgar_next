import React, { Component } from 'react'
import constant from '../../constant'
import moment from 'moment'
import { capFirstLetterInSentence, getDateParts, numbertoWord, ToSeoUrl } from '@/utils'
import Pagination from 'react-js-pagination'
import { getSaveJobList, SaveJobs } from '@/action/CandidateAction'
import Shimmer from '../common/Shimmer'
import add05 from 'src/assets/images/adds-05.jpg'
import { getCookie } from 'cookies-next'
import Image from 'next/image'

export default class AllRecommendedJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            saveState: "",
            likedJobListData: [],
            saveList: [],
            detail: getCookie(constant.keys.cd)
        }
    }

    componentDidMount() {
        this.getSavedJobs()
        this.likedJobsList()
    }

    handlePageChange = (pageNumber) => {
        this.state.currentPage = (pageNumber);
        this.setState({
            currentPage: pageNumber
        })
        this.props.recommendedJobList(pageNumber)
    };

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


    setLiked = (JOB_ID) => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "save" })
        this.likedJobsList({ CANDIDATE_ID: CANDIDATE_ID })
        this.setState({ likedJobListData: [...this.state.likedJobListData, JOB_ID] })

    }

    setDisLike = (JOB_ID) => {
        this.getSavedJobs({ CANDIDATE_ID: CANDIDATE_ID, JOB_ID: JOB_ID, ACTION: "unsave" })
        this.setState({ likedJobList: this.state.likedJobListData?.filter((e) => e !== JOB_ID) })

    }


    render() {
        // let candidateId = JSON.parse(localStorage.getItem("cd.rozgar.com")).CANDIDATE_ID
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-profilesearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                        <form className="rozgar-profilesearchbox">
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
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rozgar-profile-main-content'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='profileside'>
                                            <div className='profileside-head'>
                                                <h3>Rozgar Services you might be interested in</h3>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <div className='texthead'>Be a Priority Applicant</div>
                                                <p>Increase your chances of getting shortlisted for the applied jobs and receiving calls from recruiters.</p>
                                                <a href='#' className='proknowmore'>Know More</a>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <div className='texthead'>Increase your visibility by up to 3 times</div>
                                                <p>Get your profile marked as 'Featured' and get a higher rank when recruiters search for resumes.</p>
                                                <a href='#' className='proknowmore'>Know More</a>
                                            </div>
                                            <div className='calltext'>Call +91-8800277577 now! (Toll-free)</div>
                                        </div>
                                        <div className='profileside'>
                                            <div className='profileside-head'>
                                                <h3>FAQs</h3>
                                            </div>
                                            <div className='profilesideinnner'>
                                                <p><a href='#'>Click here</a> for frequently asked questions.</p>
                                            </div>
                                        </div>
                                        <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <a href="javascript:void(0);" title="">
                                                <figure>
                                                    <Image style={{ width: "100%" }} src={add05} alt="img description" />
                                                </figure>
                                            </a>
                                            <span>Ad</span>
                                        </div>
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='profilerightside'>
                                            <div className='profilerightside-head' style={{ borderBotton: "none !important" }}>
                                                <h3><a href='#'> All Recommended Job(s)</a></h3>
                                            </div>
                                            {
                                                this.props.list?.map((item, index) => {
                                                    var a = moment([parseInt(moment(item.CREATED_ON).format('YYYY')), parseInt(moment(item.CREATED_ON).format('MM')), parseInt(moment(item.CREATED_ON).format('DD'))])
                                                    var b = moment([parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment().format('DD'))])
                                                    var days = b.diff(a, 'days')
                                                    let dynamicURLOne = ToSeoUrl(item.CITY.trim().split(',')[0])+'/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                    dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                    return (
                                                        <React.Fragment>
                                                            {this.props.showShimmer ? <Shimmer /> :
                                                                <div className='profilerightsideinner bb-01' key={index}>
                                                                    <div className='posttime'>Posted {getDateParts(item.CREATED_ON).relativeTime}
                                                                    </div>
                                                                    <div className='newrjobs'>
                                                                        <div className='procomlogo' style={{ height: "35px", width: "35px", backgroundColor: "rgb(61 63 67 / 6%)", display: "flex", justifyContent: "center", alignItems: "center", padding: "0", marginRight: "10px", borderRadius: "4px" }}>
                                                                            {item.COMPANY_LOGO === 'NA' ? <h6 style={{ marginBottom: "0" }}>{item.COMPANY_NAME.split(' ').length === 1 ? item.COMPANY_NAME.slice(0, 1) : item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('').slice(0, 3)}</h6> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={50} height={30} />}

                                                                        </div>
                                                                        <div className='procomtext'>
                                                                            <a href='#'>
                                                                                <div className='logtext'>
                                                                                    <a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>{item.JOB_TITLE}</a>
                                                                                </div>
                                                                                <div className='comtext'>{item.COMPANY_NAME}</div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className='pro-job-details'>
                                                                        <a href='#'>
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
                                                                                    {item.CTC_MIN === "" && item.CTC_MAX === "" ? "Not Disclosed" : `${capFirstLetterInSentence(numbertoWord(item.CTC_MIN)) + " - " + capFirstLetterInSentence(numbertoWord(item.CTC_MAX))}`}
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        <div className='pro-new-save'>
                                                                            <div className='pro-new-sec' style={{ visibility: days <= 7 ? "visible" : "hidden" }}>
                                                                                <a href='#'>New</a>
                                                                            </div>
                                                                            <div className='pro-save-sec'>
                                                                                {!this.state.likedJobListData?.includes(item.JOB_ID) ? <a href="javascript:void(0)"><i className="fa fa-star" onClick={() => { this.setLiked(item.JOB_ID) }}></i></a> :
                                                                                    <a href="javascript:void(0)"><i className="fa fa-star" onClick={() => { this.setDisLike(item.JOB_ID) }} style={{ color: "red" }} ></i></a>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <nav className="rg-pagination">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <ul className="pagination pagination-rounded justify-content-center mt-4">
                                                    <Pagination
                                                        activePage={this.state.currentPage}
                                                        totalItemsCount={this.props.count}
                                                        itemsCountPerPage={20}
                                                        pageRangeDisplayed={5}
                                                        onChange={this.handlePageChange}
                                                        itemClass="page-item"
                                                        linkClass="page-link"
                                                    />
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </React.Fragment>
        )
    }
}
