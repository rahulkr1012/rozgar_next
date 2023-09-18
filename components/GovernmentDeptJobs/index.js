import React, { Component } from 'react'
import pic01 from '../../src/assets/images/central-government.jpg'
import pic02 from '../../src/assets/images/up-gov.jpg'
import pic03 from '../../src/assets/images/hp-gov.jpg'
import pic04 from '../../src/assets/images/up-gov-logo.jpg'
import noRecordImg from '../../public/assets/images/no-results.png'


import Image from 'next/image';
import constant from 'constant'
import moment from 'moment'
import { ToSeoUrl, capFirstLetterInSentence } from 'utils'
import { getCookie } from 'cookies-next'
import GovernmentSearch from 'components/JobList/GovernmentSearch'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { toSeoUrl } from '@/utils'
class index extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
}

  render() {
    const JobList=this.props.stateJobList
    const DeptList =this.props.deptList
    const JobLists = this.props.joblist
    const state =this.props.router.query.state
    const stateURLList=this.props.stateURLList
    const departmentName=this.props.router.query.url.replace(/-/g, ' ')
    const joburl = capFirstLetterInSentence(`${state}`)
    const deptUrl=capFirstLetterInSentence(`${departmentName}`)

    return (
      <React.Fragment>
         <main id="rg-main" className="rg-main rg-haslayout pt-0">
        <div className="rg-sectionspace rg-haslayout pt-0">
        <GovernmentSearch JobList={JobList[0]} joburl={joburl}/>
        <div className='breadcrumbs-section'>
          <div className='container'>
             <div className='row'>
                 <div className='col-md-12'>
                      <div className='breadcrumbs-bx'>
                     
                              <p d="breadcrumbs"> <span><span><a href={'/'}>Home</a>  / 
                              <a href={constant.component.GovernmentState.url}> Government Jobs</a> / 
                              <a href={constant.component.GovernmentStatesJobs.url.replace(':url',state=="central"?"central-government-jobs":state)}> {capFirstLetterInSentence(state)}</a> /
                              <a href=""> Department</a> /
                              <strong style={{color:"#e81c28", fontWeight:'500'}} className="breadcrumb_last"> {deptUrl}  </strong>
                             
                             
                             
                           </span></span> </p>
                             
                          
                      </div>
                 </div>
             </div>
          </div>
          </div>
          <div className="rozgar-browseJobs">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                    <div className="brows-by-locations-gob-bx">
                      <div className="by-locations-head">
                      
                              <h2 style={{fontSize:'15px',fontWeight:'bold'}} className="small_title">Browse {joburl} Government Jobs</h2>
                            
                           
                      </div>
                      
                      <div className="hoz-location-bx hoz-gov-location-bx">
                        {JobList&&JobList.length>0?JobList.map((item,index)=>{

                          let STATE=item.STATE==null?'':item.STATE.toLowerCase()+'-'+'government-jobs'
                       let GovtUrl=  ToSeoUrl(item.JOB_TITLE)  +  STATE +  '?src-LIST-' + item.GOVT_JOB_ID
                         return(
                          <div className='government-jobs-item'>
                          <div className="rg-featurejob">
                             <figure className="rg-companyimg">
                                <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/job/${item.LOGO}`} alt="sabedorsoftware" />
                              </figure>
 
                             <div className="rg-companycontent">
                                 <div className="rg-companyhead">
                                   <div className="rg-rightarea"><a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock" /> {moment(item.CREATED_ON).format("Do MMMM YYYY")}</a></div>
                                 </div>
                                 <div className="rg-companyname rg-gov-depart-name">
                                    <h2><a href={constant.component.GovernmentJobsDetails.url.replace(':url',GovtUrl)}>{item.JOB_TITLE}</a></h2>
                                   <h3 title="Human Resourse Manager "><a >{item.DEPARTMENT}</a></h3>
                                 {item.CATEGORY=="CENTRAL"?"":  <h6><a target="_blank" href="">{item.LOCATION} , {item.STATE}</a></h6>}
                                
                                 </div>
                                 <div className="rg-description">
                                   <p>{item.DESCRIPTION.length>180?item.DESCRIPTION.slice(0, 25):item.DESCRIPTION} </p>
                           
                                 </div>
                                 <div className="rg-description-time">
                                   <p><i className="lnr lnr-briefcase"></i> {item.EMPLOYMENT_TYPE} </p>
                           
                                 </div>
                             
                                 <div className='gove-read-more'>
                                   <a href={constant.component.GovernmentJobsDetails.url.replace(':url',GovtUrl)} className='button-job'>View Details</a>
                                 </div>
                                 <div className='save-jobsicon-box'>
                                    <i className='fa fa-bookmark-o' />
                                 </div>
                             </div>
                           </div>
 
                          </div>
                         )

                        }):<div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                        <Image src={noRecordImg}/>
                        <h4>We could not find jobs matching your search criteria.</h4>
                        <h6>Did you enter wrong spelling of any word?</h6>
                        <p>Only Title/Description/Department names are accepted in Search field</p>
                        <Link href={constant.component.governmentJobs.url} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Government Jobs</span></Link>

                    </div>}
                       
                      </div>
                    </div>
                   
                    
                  
                  </div>
                  <div className='col-md-4'>
                  <div className="savejobs-aside gov-jobs-aside">
                 <h3 style={{fontSize:'15px',fontWeight:'bold'}}> {capFirstLetterInSentence(state)} Government Departments </h3>                            
                            
                      <ul>
                        {DeptList&&DeptList.length>0?DeptList.map((item)=>{
                           const stateurl=item.CATEGORY=="CENTRAL"?"central":toSeoUrl(item.STATE)
                          return(
                            <li>
                            
                            <a href={constant.component.GovtDeptJobs.url.replace(':state/:department/:url/:id',  stateurl + "/" + "department"+ "/" +  item.DEPARTMENT_URL + "/" + item.DEPARTMENT_ID)}>
                              <span style={{color: 'rgb(0, 0, 0)'}}>{item.DEPARTMENT} ({item.statejobpost})</span> 
                            
                            </a>
                            <div className='visit-site'><a target='_blank' href={item.DEPARTMENT_WEBSITE}>Visit official website <i class="fa fa-external-link" aria-hidden="true"></i></a></div>
                          
                          </li> 
                          )
                        }):stateURLList&&stateURLList.map((item,index)=>{
                          const stateurl=item.CATEGORY=="CENTRAL"?"central":toSeoUrl(item.STATE)
                          return(
                            <li>
                            
                            <a href={constant.component.GovtDeptJobs.url.replace(':state/:department/:url/:id',  stateurl+ "/" + "department"+ "/" +  item.DEPARTMENT_URL + "/" + item.DEPARTMENT_ID)}>
                              <span style={{color: 'rgb(0, 0, 0)'}}>{item.DEPARTMENT} ({item.statejobpost})</span> 
                            
                            </a>
                            <div className='visit-site'><a target='_blank' href={item.DEPARTMENT_WEBSITE}>Visit official website <i class="fa fa-external-link" aria-hidden="true"></i></a></div>
                          
                          </li> 
                          )
                        })}
                     
                       
                      </ul>
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

export default withRouter(index)