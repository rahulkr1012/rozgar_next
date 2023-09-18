import React, { Component } from 'react'
import pic01 from '../../src/assets/images/central-government.jpg'
import pic02 from '../../src/assets/images/up-gov.jpg'
import pic03 from '../../src/assets/images/hp-gov.jpg'
import pic04 from '../../src/assets/images/up-gov-logo.jpg'

import Image from 'next/image';
import moment from 'moment'
import constant from 'constant'
import { toSeoUrl } from '@/utils'
import GovernmentSearch from 'components/JobList/GovernmentSearch'

export default class GovernmentJobsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }


  render() {
    const GovtJobDetails = this.props.GovtJobDetails
    const joburl=this.props.GovtJobDetails.STATE?this.props.GovtJobDetails.STATE:"Central"
    const deptList = this.props.deptList
    const JobList=this.props.GovtJobDetails
    const GovtJobSJobTITLE = this.props.GovtJobDetails.JOB_TITLE
    return (
      <React.Fragment>
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <div className="rg-sectionspace rg-haslayout pt-0">
            <GovernmentSearch
              joburl={joburl}
              JobList={JobList}
            />
            <div className='breadcrumbs-section'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='breadcrumbs-bx'>
                      <p id="breadcrumbs"><span><span><a href="">Home</a> / 
                      <a href={constant.component.GovernmentStatesJobs.url.replace(':url', toSeoUrl(GovtJobDetails.STATE == null ? 'Central Government Jobs' :  GovtJobDetails.STATE))}> 
                      {GovtJobDetails.STATE == null ? 'Central Government Jobs' :  GovtJobDetails.STATE + " Government Jobs"}</a> /
                       <strong style={{color:"#e81c28", fontWeight:'500'}} className="breadcrumb_last" aria-current="page"> {GovtJobDetails.JOB_TITLE} </strong></span></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rozgar-browseJobs">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                    <div className="brows-by-locations-gob-bx  gov-job-details-section">
                      <div className="hoz-location-bx hoz-gov-location-bx">
                        <div className='government-jobs-item'>
                          <div className="rg-featurejob">
                            <figure className="rg-companyimg">
                              <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/job/${GovtJobDetails.LOGO}`} alt="sabedorsoftware" />

                            </figure>

                            <div className="rg-companycontent gov-details-bx">
                              <div className="rg-companyhead">
                                <div className="rg-rightarea"><a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock" /> {moment(GovtJobDetails.CREATED_ON).format("Do MMMM YYYY")}</a></div>
                              </div>
                              <div className="rg-companyname rg-gov-depart-name">
                                <h2>{GovtJobDetails.JOB_TITLE}</h2>
                                <h3 title="Human Resourse Manager "><a href="">{GovtJobDetails.DEPARTMENT}</a></h3>
                                <h6><a target="_blank" href="">{GovtJobDetails.location==null?"":GovtJobDetails.STATE==null?"":(GovtJobDetails.location,GovtJobDetails.STATE)}</a></h6>
                              </div>
                              <div className="rg-description-time">
                                <p><i className="lnr lnr-briefcase"></i> {GovtJobDetails.EMPLOYMENT_TYPE}</p>
                              </div>
                              <div className='gove-read-more  gov-details-button'>
                                <a target='_blank' href={GovtJobDetails.APPLY_JOB_URL} className='button-job'>Apply Now</a>
                              </div>
                              <div className='gov-Visit-websit-bx'>
                                <a target='_blank' href={GovtJobDetails.REFERENCE_BY}>Visit official website <i class="fa fa-external-link" aria-hidden="true"></i></a>
                              </div>

                              {/* <div className='save-jobsicon-box save-jobsicon-button'>
                                    <i className='fa fa-bookmark-o' />
                                   </div> */}
                            </div>
                          </div>
                          <div className='rg-jobdetails'>
                            <div className="rg-jobdetaildescription">
                              <div className="rg-title">
                                <h2>Job Description</h2>
                              </div>
                              <div className="rg-jobdescription">
                                <p>{GovtJobDetails.DESCRIPTION}</p>
                                <ul className='jobdescription-list'>
                                  <li>Eligibility : <span>{GovtJobDetails.COURSE_STREAM}</span></li>
                                  {/* <li>Total  Post : <span>325  Post</span></li> */}
                                  <li>Last Date for Apply Online : <span>{GovtJobDetails.LAST_DATE == "" ? "NA" :
                                   GovtJobDetails.LAST_DATE==''?"NA":moment(GovtJobDetails.LAST_DATE).format('D/MM/YYYY')}</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className="savejobs-aside gov-jobs-aside">
                      <h3 style={{fontSize:'18px',fontWeight:'bold'}}>{GovtJobDetails.STATE == null ? ' Central Government ' : GovtJobDetails.STATE + ' Government'} Departments </h3>
                      <ul>
                        {deptList && deptList.map((item) => {
                          const stateurl=item.CATEGORY=="CENTRAL"?"central":toSeoUrl(item.STATE)
                          return (
                            <li>
                            
                            <a href={constant.component.GovtDeptJobs.url.replace(':state/:department/:url/:id', stateurl + "/" + "department"+ "/" +  item.DEPARTMENT_URL + "/" + item.DEPARTMENT_ID )}>
                              <span style={{color: 'rgb(0, 0, 0)'}}>{item.DEPARTMENT} ({item.statejobpost})</span> 
                            
                            </a>
                            <div className='visit-site'><a target='_blank' href={item.DEPARTMENT_WEBSITE}>Visit official website <i class="fa fa-external-link" aria-hidden="true"></i></a></div>
                          
                          </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div></div>
            </div>
          </div>
        </main>
      </React.Fragment>

    )
  }
}
