import moment from 'moment';
import React, { Component } from 'react';
import { acceptLetter, getapplicantsCount, getRecommendedJobs, getSimilarJobs, LoiList, myApplicationStatus } from '@/action/CandidateAction';
import constant from '../../constant';
import { capFirstLetterInSentence, getCandidateAuthHeader, getDateParts, getStorage } from '../../utils';
import { ToSeoUrl } from '../../utils'
import Pagination from 'react-js-pagination'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import ReactToPrint from 'react-to-print';
import FileSaver from 'file-saver';
import DataComponent from './LoiPreview';
import swal from 'sweetalert';
import ModalWindow from 'components/common/ModalWindow/ModalWindow';
import DocumentUpload from './DocumentsUpload';
import Head from 'next/head';
import Image from 'next/image';


export default class ApplicationStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: getStorage(constant.keys.cd),
            data: undefined,
            Preview: false,
            recommendedList: [],
            list: [],
            job_applicants: 0,
            pageNumber: 1,
            ApplicationPageNumber: 1,
            applicationList: [],
            application_updates: 0,
            count: 0,
            JOB_ID: '',
            error: {},
            IS_ACCEPTED: false,
            offerList: [],
            StatusName: [],
            COMPANY_NAME: [],
            CANDIDATE_ID: '',
            OFFER_ID: "",
            showModal: false,
            checkTermsAndCondition: false,
            listLoi: null,
            APPLICATION_ID: [],
            DOC_FILE_NAME: [],
            APPLICATION_VIEWED_COUNT: 0
        }
    }

    componentDidMount() {
        this.myStatus(this.state.ApplicationPageNumber)
        this.getSimilarJobs(this.state.pageNumber)
    }




    myStatus = (ApplicationPageNumber) => {
        const { CANDIDATE_ID } = this.props.ud
        const model = {
            ApplicationPageNumber: ApplicationPageNumber,
            CANDIDATE_ID: CANDIDATE_ID,
        }
        myApplicationStatus(model).then((res) => {
            if (res.status) {
                this.setState({
                    list: res.result.list,
                    application_updates: res.result.application_updates[0].total,
                    count: res.result.count[0].total,

                })
            }
        });
    }
    // getOfferID = (OFFER_ID) => {
    //     this.setState({ OFFER_ID: OFFER_ID })
    // }

    validateForm = () => {
        let data = this.state
        let error = {}
        let isValid = true
        if (!data['checkTermsAndCondition']) {
            error.checkTermsAndCondition = "Please select Terms And Conditions"
            swal({
                // title: "Are you sure?",
                text: "Please select Terms And Condition",
                icon: "error",
                dangerMode: true,
                timer: 2000,
            });
            isValid = false
        }
        this.setState({
            error: error
        })

        return isValid
    }




    onSubmit = (e) => {
        e.preventDefault();
        const { OFFER_ID } = this.state;
        let status = this.validateForm()
        if (status) {
            acceptLetter(OFFER_ID).then((res) => {
                this.getLoilist(this.state.JOB_ID)
                if (res.result) {
                    swal({
                        icon: "success",
                        text: res.result.message,
                        timer: 2000,
                    });
                }
                else {
                    swal({
                        icon: "error",
                        text: res.error,
                        timer: 2000,
                    });
                }

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    onShowModal = (data, e, type) => {
        const st = this.state
        this.setState({ showModal: true })
    }


    onhideModal = () => {
        this.setState({ showModal: false, error: {} })
    }

    saveFile = (model, filename) => {
        const { DOC_FILE_NAME } = model
        const { CANDIDATE_ID } = this.props.ud
        FileSaver.saveAs(
            `${process.env.NEXT_PUBLIC_BASE_URL}/candidate-doc-file/${CANDIDATE_ID}/${DOC_FILE_NAME}`,
            DOC_FILE_NAME
        );
    }


    getSimilarJobs = (pageNumber) => {
        getSimilarJobs({ pageNumber: pageNumber }).then((res) => {
            if (res.status) {
                setTimeout(() => {
                    this.setState({ showShimmer: false })
                }, 1000)
            }
            this.setState({ recommendedList: res.result })

        }).catch((err) => {
            console.log(err)
        })
    }

    getLoilist = (JOB_ID) => {
        LoiList(JOB_ID).then((res) => {
            if (res.status) {
                this.setState({ listLoi: res.result, OFFER_ID: res.result.OFFER_ID })
            }

        }).catch((err) => {
            console.log(err)
        })
    }


    getJobApplicants = (JOB_ID) => {
        this.getLoilist(JOB_ID)

        getapplicantsCount({ JOB_ID: JOB_ID }).then((res) => {
            if (res.status) {

                this.setState({
                    job_applicants: res.result.count.total_applicants, APPLICATION_ID: res.result.APPLICATION_ID, applicationList: res.result.list, DOC_FILE_NAME: res.result.DOC_FILE, JOB_ID: JOB_ID, APPLICATION_VIEWED_COUNT: res.result.viewed, offerList: res.result.list && res.result.list.filter((data, index) => {
                        return data.STATUS_NAME == "Offers & Joining - Offered" ? data : ''
                    })

                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    handlePageChange = (ApplicationPageNumber) => {
        this.setState({
            ApplicationPageNumber: ApplicationPageNumber
        })
        this.myStatus(ApplicationPageNumber)
    };


    render() {
        const { showModal, DOC_FILE_NAME } = this.state
        const { list, applicationList, offerList, application_updates, JOB_ID, StatusName, COMPANYNAME, APPLICATION_ID,count } = this.state
        let isavailable = applicationList && applicationList.lastIndexOf(offerList ? offerList[0] : {})
        const { CANDIDATE_ID } = this.props.ud
        let model = {
            DOC_FILE_NAME: DOC_FILE_NAME,
            CANDIDATE_ID: CANDIDATE_ID
        }
        return (
            <React.Fragment>

                {showModal && <ModalWindow
                    title="Upload Document"
                    backdrop="static"
                    toggleModal={this.onhideModal}>


                    <DocumentUpload
                        APPLICATION_ID={this.state.APPLICATION_ID}
                        onCancel={this.onhideModal}
                        getJobApplicant={() => this.getJobApplicants(JOB_ID)}
                    />
                </ModalWindow>}
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-jobbylocsearch pt-2 pb-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="rg-title text-center">
                                            <h3 className='text-white'>Job Application Status</h3>
                                        </div>
                                    </div>
                                    <div className='col-12 text-center'>
                                        <div className='numofsavejob'>
                                            {/* <p className='font-18 mb-0'>Job </p> */}
                                            {/* <span className='font-15'>Not getting views on your CV? <Link to=''>Highlight your application</Link>  to get recruiter's attention</span> */}
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
                        <div className="rg-haslayout ">
                            <div className="container">
                                <div className='row'>
                                    <div className='col-md-6 offset-3'>
                                        <div className='totalapplied'>
                                            <ul>
                                                <li>
                                                    <h1>
                                                   <span className='totaltext'> {count} Total Applies</span></h1> 
                                                </li>
                                                {/* <li>
                                                    <span className='totalnum'>{application_updates}</span>
                                                    <span className='totaltext'>Application<br />Updates</span>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="rg-application-status">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left">
                                            <div className='row'>
                                                <div class="pagesappstatus">
                                                    <div class="nesttabs">
                                                        <div class="container">
                                                            <div class="row">
                                                                <div class="col-12 col-md-4">
                                                                    <div className='recruiterapply'>
                                                                        <ul>
                                                                            <li>Recruiter Actions (0)</li>
                                                                            <li>Applies on Rozgar ({count})</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                                        {/* <a class="nav-link active show" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">
                                                                            <div class="descrip">
                                                                                <h5 className="mb-1">Web Developer</h5>
                                                                                <p>Pratham Vision Private Limited</p>
                                                                                <dl className="row">
                                                                                    <dt className="col-6">
                                                                                        <span><i class="ti-check"></i> Applied 1 Day ago</span>
                                                                                    </dt>
                                                                                    <dd className="col-5">
                                                                                        <img src={'./assets/images/pratham.jpg'} />
                                                                                    </dd>
                                                                                </dl>
                                                                            </div>
                                                                        </a> */}
                                                                        {list && list.length > 0 ? list.map((i, index) => {

                                                                            const appliedOn = moment(i.MODIFIED_ON, "YYYYMMDD").fromNow();
                                                                            // var a = moment([2007, 0, 29]); 
                                                                            // var b = moment([2007, 0, 28]);
                                                                            // a.diff(b, 'days') 
                                                                            return (
                                                                                <a className="nav-link mt-1" id="v-pills-profile-tab" style={{ cursor: 'pointer' }} data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false" >
                                                                                    <div className="descrip" onClick={() => this.getJobApplicants(i.JOB_ID)}>
                                                                                        <h5 className="mb-1">{i.JOB_TITLE}</h5>
                                                                                        <p>{i.COMPANY_NAME}</p>
                                                                                        <dl className="row">
                                                                                            <dt className="col-6">
                                                                                                <span><i className="ti-check"></i> {getDateParts(i.APPLIED_DATE).relativeTime}</span>
                                                                                            </dt>
                                                                                            <dd className="col-5">
                                                                                                <figure style={{ width: "45px", float: "left", minHeight: " 45px", margin: "-12px 10px 0px 89px", background: "#ffff", alignItems: "center", display: "flex", justifyContent: "center", border: "1px solid #ebebeb", padding: "4px", borderRadius: "4px" }} >

                                                                                                    {i.COMPANY_LOGO === 'NA' ? <h6 style={{ marginBottom: "0" }}>{i.COMPANY_NAME.split(' ').length === 1 ? i.COMPANY_NAME.slice(0, 1) : i.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('').slice(0, 3)}</h6> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${i.COMPANY_LOGO}`} alt={i.COMPANY_NAME} width={50} height={30} />}
                                                                                                </figure>
                                                                                            </dd>
                                                                                        </dl>
                                                                                    </div>

                                                                                </a>

                                                                            )
                                                                        })

                                                                            : null
                                                                        }


                                                                        {/* <a className="nav-link" id="v-pills-messages-tab" i-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                                                            <div className="descrip">
                                                                                <h5 className="mb-1">Web Developer</h5>
                                                                                <p>Pratham Vision Private Limited</p>
                                                                                <dl className="row">
                                                                                    <dt className="col-6">
                                                                                        <span><i className="ti-check"></i> Applied 1 Day ago</span>
                                                                                    </dt>
                                                                                    <dd className="col-5">
                                                                                        <img src={'./assets/images/pratham.jpg'} />
                                                                                    </dd>
                                                                                </dl>
                                                                            </div>
                                                                        </a> */}
                                                                    </div>
                                                                    {list.length > 0 ?
                                                                        <Pagination
                                                                            activePage={this.state.ApplicationPageNumber}
                                                                            itemsCountPerPage={10}
                                                                            totalItemsCount={this.state.count}  
                                                                            pageRangeDisplayed={5}
                                                                            onChange={this.handlePageChange}
                                                                            itemClass="page-item"
                                                                            linkClass="page-link"
                                                                        /> : ""}
                                                                </div>
                                                                <div className="col-12 col-md-8 nesttabscontent">
                                                                    <div className="tab-content" id="v-pills-tabContent">
                                                                        <div className="tab-pane fade active show" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                                            <div className='row'>
                                                                                <div className='col-md-12'>
                                                                                    <h4 className='text-center'>Activity on this Job</h4>
                                                                                    <div className='totalapplied02'>
                                                                                        <ul>
                                                                                            <li>
                                                                                                <span className='totalnum02'>{this.state.job_applicants}</span>
                                                                                                <span className='totaltext02'>Total<br />Applications</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span className='totalnum02'>{this.state.APPLICATION_VIEWED_COUNT}</span>
                                                                                                <span className='totaltext02'>Application<br />Viewed by Recruiter</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                {
                                                                                    this.state.applicationList && this.state.applicationList.length > 0 &&
                                                                                    <div className='col-md-12 app-status-bx'>
                                                                                        <strong className="font-18 fw500">Application Status</strong>
                                                                                        <div className="statusCont mt-20">
                                                                                            <ul className="statebar ml-20" >
                                                                                                {
                                                                                                    this.state.applicationList && this.state.applicationList.map((d, i) => {

                                                                                                        return (
                                                                                                            <li className="status lh16 status_1 CircleTick" >
                                                                                                                <em className="rozgaricon-CircleTick ti-check" style={{ marginTop: "17px" }}></em><div><span class="fs12 fw500">{d.STATUS_NAME == "Offers & Joining - Offered" ? "Offered" : d.STATUS_NAME == "Offers & Joining - Joined" ? "Joined" : d.STATUS_NAME}</span> <span class="fs10 grey-text">{getDateParts(d.CREATED_ON).date} {getDateParts(d.CREATED_ON).monthName}` {getDateParts(d.CREATED_ON).year}</span></div>
                                                                                                            </li>)

                                                                                                    })
                                                                                                }
                                                                                                {this.state.applicationList && this.state.applicationList.length == 1 && <li className="status lh16 status_awaiting "><em style={{ marginBottom: '-13px' }}></em><div><span class="fs12 fw500" style={{ marginTop: "15px" }}>Awaiting Recruiter Action</span> <br /> <span class="fs10 grey-text"></span>
                                                                                                </div>
                                                                                                </li>}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    isavailable > 0 && <div className='col-md-12 ml-3 pl-0 pr-4 pt-3'>
                                                                                        {
                                                                                            <div className='appstatusofferbox'>

                                                                                                <h5><span className='contratetext'>Congratulations!</span> We Welcome you to Join
                                                                                                    {applicationList && applicationList.length > 0 && <span> {applicationList[applicationList.length - 1].COMPANY_NAME} </span>}
                                                                                                    and are happy to roll out an offer to employment<br />
                                                                                                    {/* <a style={{ color: "#e74c3c", textDecoration: 'underline' }} onClick={this.printDocument}> Click here  </a> */}
                                                                                                    {/* <div> */}
                                                                                                    <ReactToPrint
                                                                                                        content={() => this.componentRef}
                                                                                                        onBeforePrint={() => document.title = capFirstLetterInSentence((this.state.listLoi.CANDIDATE_NAME + '_').concat(this.state.listLoi.DESIGNATION + '_') + 'OfferLetter').replace(/\s+/g, '_')}
                                                                                                        trigger={() => <a className='appstatusclick' onClick={this.printDocument}> Click here  </a>}
                                                                                                    />
                                                                                                    <div style={{ display: 'none' }}>
                                                                                                        <DataComponent
                                                                                                            listLoi={this.state.listLoi}
                                                                                                            // getOfferId={(input) => { this.getOfferId(input) }} 
                                                                                                            JOB_ID={this.state?.JOB_ID} ref={(response) => (this.componentRef = response)} />

                                                                                                        {/* </div> */}
                                                                                                    </div>
                                                                                                    to print the offer letter.</h5>
                                                                                                {!this.state?.listLoi?.IS_ACCEPTED == 1 &&
                                                                                                    <>
                                                                                                        <h5 className='clickcheckbox'><input id="checkbox1" type="checkbox" name="checkTermsAndCondition" onChange={(e) => { this.setState({ checkTermsAndCondition: e.target.checked }) }} /> &nbsp; By clicking you agree to accept the offer and Terms and Conditions of Employement. </h5>
                                                                                                        <a className='appstatusbtn' onClick={(e) => { this.onSubmit(e) }}>ACCEPT</a>
                                                                                                    </>}
                                                                                                {this.state?.listLoi?.IS_ACCEPTED == 1 &&
                                                                                                    <>
                                                                                                        <a className='appstatusbtn' style={{ backgroundColor: '#4a9d37' }} >ACCEPTED</a>
                                                                                                        <a className='appstatusbtn  ml-3' style={{ backgroundColor: '#4a9d37' }} onClick={(e) => { this.onShowModal(e) }}>Upload Document</a>
                                                                                                        {this.state.DOC_FILE_NAME == null ? "" : <span className="ml-3 documentdownload">{this.state.DOC_FILE_NAME}  <span><a className=' ml-2' style={{ fontSize: '14px' }} onClick={(e) => { this.saveFile(model, this.state.DOC_FILE_NAME) }}> <i className="fa fa-download" style={{ cursor: "pointer" }} aria-hidden="true"></i></a></span> </span>}


                                                                                                    </>}
                                                                                            </div>

                                                                                        }
                                                                                    </div>

                                                                                }
                                                                            </div>

                                                                            <div className='row borbt mt-4'>
                                                                                <div className='col-md-12'>
                                                                                    <div className='similarjobshead'>
                                                                                        <h4>Similar Jobs</h4>
                                                                                        <p>You might be interested in</p>
                                                                                    </div>
                                                                                </div>

                                                                                {
                                                                                    this.state.recommendedList && this.state.recommendedList.list && this.state.recommendedList.list.map((data) => {
                                                                                        // const dynamicURLOne = ToSeoUrl(data.JOB_TITLE) + '_' + ToSeoUrl(data.JOB_DETAILS) + '_' + 'EXP' + '-' + ToSeoUrl(data.WORK_EXP_MIN) + '_' + ToSeoUrl(data.WORK_EXP_MAX) + '_' + data.CUSTOM_JOB_ID + '_' + ToSeoUrl(data.KEYWORDS) + '?src=SIMILAR_JOBS=' + data.JOB_ID
                                                                                        let dynamicURLOne = ToSeoUrl(data.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(data.JOB_TITLE) + '-' + data.JOB_ID
                                                                                        dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                                                        return (
                                                                                            <div className='col-md-6' style={{ cursor: 'pointer' }}>
                                                                                                <div className='similarjobs'>
                                                                                                    <h4><a target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>{capFirstLetterInSentence(data?.JOB_TITLE?.toLowerCase().slice(0, 30))}</a></h4>
                                                                                                    <p>{data.COMPANY_NAME}</p>
                                                                                                    <ul>
                                                                                                        <li><i className="lnr lnr-briefcase"></i> {data.WORK_EXP_MAX <= 1 ? `${data.WORK_EXP_MIN} - ${data.WORK_EXP_MAX} Year` : `${data.WORK_EXP_MIN} - ${data.WORK_EXP_MAX} Years`}</li>
                                                                                                        <li><i className="lnr lnr-map-marker"></i> {data.LOCATIONS[0]?.CITY}</li>
                                                                                                        <li><i className="lnr lnr-clock"></i>{getDateParts(data.CREATED_ON).relativeTime}</li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }

                                                                            </div>


                                                                        </div>
                                                                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                                            <div className='row'>
                                                                                <div className='col-md-6'>
                                                                                    <strong className="font-18 fw500">Application Status</strong>
                                                                                    <div className="statusCont mt-20">
                                                                                        <ul className="statebar ml-20">
                                                                                            <li className="status lh16 status_1 CircleTick">
                                                                                                <em className="rozgaricon-CircleTick ti-check"></em><div><span class="fs12 fw500">Applied</span> <span class="fs10 grey-text">30 May '22</span></div></li>
                                                                                            <li className="status lh16 status_awaiting "><em></em><div><span class="fs12 fw500">Awaiting Recruiter Action</span> <br /> <span class="fs10 grey-text"></span>
                                                                                            </div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <h4>Activity on this Job</h4>
                                                                                    <div className='totalapplied02'>
                                                                                        <ul>
                                                                                            <li>
                                                                                                <span className='totalnum02'>{this.state.job_applicants}</span>
                                                                                                <span className='totaltext02'>Total<br />Applications</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span className='totalnum02'>00</span>
                                                                                                <span className='totaltext02'>Application<br />Viewed by Recruiter</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>  
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className='row borbt'>
                                                                                <div className='col-md-12'>
                                                                                    <div className='similarjobshead'>
                                                                                        <h4>Similar Jobs</h4>
                                                                                        <p>You might be interested in</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                                                            <div className='row'>
                                                                                <div className='col-md-6'>
                                                                                    <strong className="font-18 fw500">Application Status</strong>
                                                                                    <div className="statusCont mt-20">
                                                                                        <ul className="statebar ml-20">
                                                                                            <li className="status lh16 status_1 CircleTick">
                                                                                                <em className="rozgaricon-CircleTick ti-check"></em><div><span class="fs12 fw500">Applied</span> <span class="fs10 grey-text">30 May '22</span></div></li>
                                                                                            <li className="status lh16 status_awaiting "><em></em><div><span class="fs12 fw500">Awaiting Recruiter Action</span> <br /> <span class="fs10 grey-text"></span>
                                                                                            </div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <h4>Activity on this Job</h4>
                                                                                    <div className='totalapplied02'>
                                                                                        <ul>
                                                                                            <li>
                                                                                                <span className='totalnum02'>60</span>
                                                                                                <span className='totaltext02'>Total<br />Applications</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span className='totalnum02'>00</span>
                                                                                                <span className='totaltext02'>Application<br />Viewed by Recruiter</span>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className='row borbt'>
                                                                                <div className='col-md-12'>
                                                                                    <div className='similarjobshead'>
                                                                                        <h4>Similar Jobs</h4>
                                                                                        <p>You might be interested in</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-md-6'>
                                                                                    <div className='similarjobs'>
                                                                                        <h4>Web Designer</h4>
                                                                                        <p>SPIN ON WEB PRIVATE LIMITED</p>
                                                                                        <ul>
                                                                                            <li><i className="lnr lnr-briefcase"></i> 14 Years</li>
                                                                                            <li><i className="lnr lnr-map-marker"></i> Ghaziabad...</li>
                                                                                            <li><i className="lnr lnr-clock"></i>24 days ago</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div> */}
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
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
            </React.Fragment>
        )
    }


    printDocument() {

        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            });
    }
}
