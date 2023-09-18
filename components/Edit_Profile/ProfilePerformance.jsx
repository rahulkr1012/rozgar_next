import moment from 'moment/moment'
import React, { Component } from 'react'
import { getDatePartsSecond, getStorage } from '../../utils'
import { LineCharts } from '../common/lineChart';
import constant from '../../constant';
import { ActionsPerformed, mostApplyJobs } from '@/action/profilePreviewAction';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { getCookie } from 'cookies-next';
export default class ProfilePerformance extends Component {
    state = {
        dateForChart: [],
        list: undefined,
        Counts: undefined,
        applyJobs: undefined
    };
    componentDidMount() {
        this.onClickChange()
        this.AllCount()
        this.ApplyJobs()
    }

    onClickChange = (Value = "All Actions") => {
        const { CANDIDATE_ID } = getCookie(constant.keys.cd);
        if (CANDIDATE_ID) {
            ActionsPerformed(CANDIDATE_ID)
                .then((res) => {
                    res.result.res = res.result.res.map((i => {
                        i.ReadMore = false
                        return i
                    }))
                    if (Value == "All Actions") {
                        this.setState({ list: res.result.res })
                    } else {
                        this.setState({ list: res.result.res.filter(item => item.APPLICATION_STATUS == Value) });
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    ApplyJobs = () => {
        const { CANDIDATE_ID } = getCookie(constant.keys.cd);
        if (CANDIDATE_ID) {
            mostApplyJobs(CANDIDATE_ID)
                .then((res) => {
                    this.setState({ applyJobs: res.result.res })
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    readMoreReadLess = (i) => {
        let list = this.state.list.map((item, index) => {
            if (index == i) {
                // item.ReadMore = item.ReadMore == false ? true : false
                item.ReadMore = !item.ReadMore
            }
            return item
        })

        this.setState({ list: list })
    }
    AllCount = () => {
        const { CANDIDATE_ID } = getCookie(constant.keys.cd);
        if (CANDIDATE_ID) {
            ActionsPerformed(CANDIDATE_ID)
                .then((res) => {
                    this.setState({ Counts: res.result.res })
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }
    render() {
        const { List1, List } = this.props
        const { applyJobs } = this.state
        // const Viewed = List?.filter((item)=>{
        //     if(item.STATUS_Name ==('Application Viewed' || 'Resume Viewed') ){
        //         return item
        //     }
        // })
        // const ShortList = List?.filter((item)=>{
        //     if(item.STATUS_Name == 'Shortlisted'){
        //         return item
        //     }
        // })
        // const InterviewRound = List?.filter((item)=>{
        //     if(item.STATUS_Name == ('Interview Round - 1'||'Interview Round - 2' || 'Interview Round - 3')){
        //         return item
        //     }
        // })
        // const OfferAccepted = List?.filter((item)=>{
        //     if(item.STATUS_Name == 'Offer Accepted'){
        //         return item
        //     }
        // })
        // const OfferJoining= List?.filter((item)=>{
        //     if(item.STATUS_Name == 'Offers & Joining - Joined'){
        //         return item
        //     }
        // })
        // const ApplicationSent = List?.filter((item)=>{
        //     if(item.STATUS_Name =='Application Sent'){
        //         return item
        //     }
        // })
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-profilesearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className='profile-performance-head'>
                                            <h2 className='ppheadtext'>Profile Performance</h2>
                                            <p className='ppheadpara'>Summary of how your profile performed in searches by the recruiter</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pptopminushead'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <div className='pptoparea'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='pptopnum-text'>{this.props?.Count} <span>Total Jobs Appearances</span></div>
                                                <div className='pptopnum-text'>{this.props?.Status} <span>Recruiter Actions</span></div>
                                                <div className='pptopnum-text'><span>Summary of last {moment().format("MM")} months</span></div>
                                            </div>
                                        </div>
                                        <div className='pptopareaone'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='pptopareaonehead'>{this.props?.Count} Jobs Applied in Last {moment().format("MM")} Months</div>
                                            </div>
                                            <div className='pptopareaflow'>
                                                <div className='pptskillsflow'>
                                                    {/* <h4>You have been search by recruiters by these keywords on Locations</h4> */}
                                                    <h4>Most Apply Jobs on this Location</h4>
                                                    <ul className='ppskills d-flex'>
                                                        {applyJobs?.map((k) => {
                                                            return (
                                                                <li>
                                                                    <div>{k.CITY}</div>
                                                                    <p>{k.CITY_COUNT} times</p>
                                                                </li>
                                                            )
                                                        })}
                                                       
                                                    </ul>
                                                </div>
                                                    <LineCharts />
                                            </div>
                                        </div>
                                        <div className='pptopareatwo pb-5'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='pptopareatwohead'>{this.props?.Status} Recruiter Actions on Your Profile</div>
                                            </div>
                                            <div className='pptrecuiternum'>
                                                <ul className='pptrecuiternumli d-flex'>
                                                    <li style={{ cursor: 'pointer' }} onClick={() => this.onClickChange('All Actions')}>All Actions {this.state.Counts?.length}</li>
                                                    <li style={{ cursor: 'pointer' }} onClick={() => this.onClickChange('2')}>Application Sent {this.state.Counts?.filter(i => i.APPLICATION_STATUS == '2').length}</li>
                                                    {/* <li  style={{cursor:'pointer'}} onClick = {()=>this.onClickChange('4')}>Profile Viewed {this.state.Counts?.filter(i=>i.APPLICATION_STATUS=='4').length} </li> */}
                                                    <li style={{ cursor: 'pointer' }} onClick={() => this.onClickChange('6')}>Resume ShortListed {this.state.Counts?.filter(i => i.APPLICATION_STATUS == '6').length}</li>
                                                    <li style={{ cursor: 'pointer' }} onClick={() => this.onClickChange('7')}>Interview Scheduled {this.state.Counts?.filter(i => i.APPLICATION_STATUS == '7').length}</li>
                                                    <li style={{ cursor: 'pointer' }} onClick={() => this.onClickChange('11')}>Offers & Joining {this.state.Counts?.filter(i => i.APPLICATION_STATUS == '11').length}</li>

                                                </ul>
                                            </div>
                                            <div className='row'>
                                                {this.state.list?.map((item, index) => (
                                                    <div className='col-md-6'>
                                                        <div className='concomdetail' style={{ minHeight: '250px' }}>
                                                            <div className='d-flex pb-4'>
                                                                <div className='recruiter-img'>
                                                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} />
                                                                </div>
                                                                <div className='recruiter-name'>{item.COMPANY_NAME}
                                                                    <span>
                                                                        <ReactReadMoreReadLess
                                                                            charLimit={100}
                                                                            readMoreText={<a href="javascript: void(0);" className="text-primary">  Read more   <i className="mdi mdi-arrow-right" /></a>}
                                                                            readLessText={<a href="javascript: void(0);" className="text-primary"> <i className="mdi mdi-arrow-left" /> Read Less   </a>}
                                                                            readMoreClassName="read-more-less--more"
                                                                            readLessClassName="read-more-less--less"
                                                                        >{item.CLIENT_DETAILS?.length > 0 ? item.CLIENT_DETAILS.trim() : ''}
                                                                        </ReactReadMoreReadLess>
                                                                        {/* {item.CLIENT_DETAILS.length > 98 ? !item.ReadMore ? nl2br(item.CLIENT_DETAILS.slice(0, 108)) + '...' : nl2br(item.CLIENT_DETAILS) : nl2br(item.CLIENT_DETAILS)} */}
                                                                    </span>
                                                                    {/* {item.CLIENT_DETAILS.length > 98 && (!item.ReadMore ? <span className={'text-primary'} style={{ cursor: 'pointer' }} onClick={() => { this.readMoreReadLess(index) }}>Read more</span> : <span style={{ cursor: 'pointer' }} className={'text-primary'} onClick={() => { this.readMoreReadLess(index) }}>Read less</span>)} */}

                                                                </div>
                                                            </div>
                                                            <div className='recruiter-locaton'>{item.LOCATION ? (item.LOCATION.charAt(0).toUpperCase() + item.LOCATION.slice(1)) : null}<span>{item.ADDRESS}</span></div>
                                                            <div className='recruiter-by-email'> <a href={`mailto:${item.EMAIL}`}>{item.EMAIL}</a></div>
                                                            <div className='recruiter-by-date'>{getDatePartsSecond(item.MODIFIED_ON).relativeTime}</div>
                                                        </div>
                                                    </div>
                                                ))}



                                                {/* <div className='col-md-6'>
                                            <div className='concomdetail'>
                                                <div className='d-flex pb-4'>
                                                    <div className='recruiter-img'><img src={'./assets/images/no-avatar-pic.png'}/></div>
                                                    <div className='recruiter-name'>Abhi Mathur
                                                    <span>Vice President at RAISSO GLOBAL PRIVATE LIMITED</span>
                                                    </div>
                                                </div>
                                                <div className='recruiter-locaton'>Noida <span>Not Specified</span></div>
                                                <div className='recruiter-by-email'>Contacted by Email</div>
                                                <div className='recruiter-by-date'>A week ago</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='concomdetail'>
                                                <div className='d-flex pb-4'>
                                                    <div className='recruiter-img'><img src={'./assets/images/no-avatar-pic.png'}/></div>
                                                    <div className='recruiter-name'>Preeti Malhotra
                                                    <span>Manager Human Resources at Wizni Software Pvt. Ltd.</span>
                                                    </div>
                                                </div>
                                                <div className='recruiter-locaton'>Gurgaon <span>Not Specified</span></div>
                                                <div className='recruiter-by-email'>Contacted by Email</div>
                                                <div className='recruiter-by-date'>A week ago</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='concomdetail'>
                                                <div className='d-flex pb-4'>
                                                    <div className='recruiter-img'><img src={'./assets/images/no-avatar-pic.png'}/></div>
                                                    <div className='recruiter-name'>Anjana Jha
                                                    <span>Recruitment Consultant at Orbis Hospitality Services Pvt. Ltd</span>
                                                    </div>
                                                </div>
                                                <div className='recruiter-locaton'>Delhi <span>Not Specified</span></div>
                                                <div className='recruiter-by-email'>Contacted by Email</div>
                                                <div className='recruiter-by-date'>A week ago</div>
                                            </div>
                                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='pptoparea'>
                                            <h4 className='pb-4'>Activity Level</h4>
                                            <div className='progresss'>
                                                <div class="progress-bar text-center" role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                    aria-valuemax="100" style={{ width: '70%', lineHeight: '16px' }}>70%</div>
                                            </div>
                                            <div className='progressmidium'>
                                                <div className='midiutext'>MEDIUM</div>
                                                <p>High activity level gets you more attention<br />from recruiters</p>
                                            </div>
                                            <div className='tipsimprovebox'>
                                                <div className='tipsimprovetext'>Tips to improve your activity level</div>
                                                <ul className='recruiterpoints'>
                                                    <li>
                                                        <span>Respond to recruiter mails & messages</span>
                                                        <span className='reccheckbox'><a href=''>Check Inbox</a></span>
                                                    </li>
                                                    <li>
                                                        <span>Keep your Rozgar Profile Updated</span>
                                                        <span className='recproupdate'><a href='/edit-profile'>Update Profile</a></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='recruiterrgservice'>
                                            <div className='recruiterrghead'>Rozgar Services you might be interested in</div>
                                            <div className='recruiterrgtext'>
                                                <h5>Discover The Perfect University For You</h5>
                                                <p>At Rozgar.com, we do not just help you find a place for your education; we also walk the distance with you until you have settled in at whichever place you choose to study at.</p>
                                                <a href='#' className='proknowmore'>Know More</a>
                                            </div>
                                            <div className='recruiterrgtext'>
                                                <h5>Find Headway In The Career Of Your Preference</h5>
                                                <p>Choose our premium services consisting of Personal Astrology Services, Finance Astrology Services, Education Astrology Services and so others made specifically for you to get the desired solution in life on the front of personal life, finance or academic pursuit</p>
                                                <a href='#' className='proknowmore'>Know More</a>
                                            </div>

                                            <div className='recruiterrghead pt-4'>Education Loan</div>
                                            <div className='recruiterrgtext'>
                                                <h5>Make your Dreams a Reality!</h5>
                                                <p>With education loans, your family's finances remain intact. So, they do not have to worry about managing medical emergencies or saving for retirement after paying for your education.</p>
                                                <a href='#' className='proknowmore'>Know More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </React.Fragment >
        )
    }
}
