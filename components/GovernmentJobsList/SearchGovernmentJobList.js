import { ToSeoUrl, capFirstLetterInSentence } from '@/utils'
import GovernmentSearch from 'components/JobList/GovernmentSearch'
import constant from 'constant'
import { withRouter } from 'next/router'
import React, { Component } from 'react'
import noRecordImg from '../../public/assets/images/no-results.png'
import Image from 'next/image'
import Link from 'next/link'
import { makeTitle } from 'utils'


 class SearchGovernmentJobList extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }

}

  render() {
    const url=this.props.router.query.keyword.split('=')[1]
    const urlKeyword=capFirstLetterInSentence(url)
    const  gorvList=this.props.gorvList
    const searchjob=this.props.searchjob
    const count=this.props.count
    return (
     <React.Fragment>
           <main id="rg-main" className="rg-main rg-haslayout pt-0">
        <div className="rg-sectionspace rg-haslayout pt-0">
        <GovernmentSearch url={urlKeyword}
            onSearch={(keyword, wholeUlr)=> this.props.searchResults(keyword, wholeUlr) }

         />
        <div className='breadcrumbs-section'>
          <div className='container'>
             <div className='row'>
                 <div className='col-md-12'>
                      <div className='breadcrumbs-bx'>
                              <p d="breadcrumbs"> <span><span><a href={'/'}>Home</a> / 
                              <a href={constant.component.GovernmentState.url}>Government Jobs</a> / 
                           
                              <strong style={{color:"#e81c28", fontWeight:'500'}} className="breadcrumb_last">    {(urlKeyword)} </strong>
                            
                             
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
                     
                              <h2 className="small_title">Search for "{(urlKeyword)}" </h2>

                      </div>
                      
                      <div className="hoz-location-bx hoz-gov-location-bx">
                     {searchjob&&searchjob.length>0? searchjob.map((item)=>{
                      let STATE=item.STATE==null?'':item.STATE.toLowerCase()+'-'+'government-jobs'
                      let GovtUrl=  ToSeoUrl(item.JOB_TITLE) + '-' +  STATE +  '?src-LIST-' + item.GOVT_JOB_ID
                      return(
                        <div className='government-jobs-item'>
                        <div className="rg-featurejob">
                           <figure className="rg-companyimg">
                              <img src={`https://s3rozgar.s3.ap-south-1.amazonaws.com/job/${item.LOGO}`} alt="sabedorsoftware" />
                            </figure>
 
                           <div className="rg-companycontent">
                               <div className="rg-companyhead">
                                 <div className="rg-rightarea"><a className="rg-tagfeature" href="javascript:void(0);"><i className="fa fa-clock" /> 21 ago</a></div>
                               </div>
                               <div className="rg-companyname rg-gov-depart-name">
                                  <h2><a href={constant.component.GovernmentJobsDetails.url.replace(':url',GovtUrl)}>{item.JOB_TITLE}</a></h2>
                                 <h3 title="Human Resourse Manager "><a >{item.DEPARTMENT}</a></h3>
                                <h6><a target="_blank" href="">{item.LOCATION==null?item.STATE:item.STATE==null?item.LOCATION:item.STATE==null&&item.LOCATION==null?"":(item.LOCATION,item.STATE)}</a></h6>
                              
                               </div>
                               <div className="rg-description">
                                 <p>{item.DESCRIPTION.length>180?item.DESCRIPTION.slice(0, 25):item.DESCRIPTION} </p>
                         
                               </div>
                               <div className="rg-description-time">
                                 <p><i className="lnr lnr-briefcase"></i> {item.EMPLOYMENT_TYPE}</p>
                         
                               </div>
                           
                               <div className='gove-read-more'>
                                 <a href={constant.component.GovernmentJobsDetails.url.replace(':url',GovtUrl)} className='button-job'>View Details</a>
                               </div>
                               {/* <div className='save-jobsicon-box'>
                                  <i className='fa fa-bookmark-o' />
                               </div> */}
                           </div>
                         </div>
 
                        </div>
                      )


                     }):<div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                     <Image src={noRecordImg}/>
                     <h4>We could not find jobs matching your search criteria.</h4>
                     <h6>Did you enter wrong spelling of any word?</h6>
                     <p>Only Title/Description/Department names are accepted in location field</p>
                     <Link href={constant.component.governmentJobs.url} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Jobs</span></Link>

                 </div>}
                         
                          
                      </div>
                     
                    </div>
                  
                    
                  
                  </div>
                  <div className='col-md-4'>
                
                  <div className="savejobs-aside gov-jobs-aside">
                 
                  <h3 style={{fontSize:'15px',fontWeight:'bold'}}>  Browse Central Government Jobs</h3>                            
                                            
                                         
                                        <ul>
                                        <li>
                                              
                                              <a href={constant.component.GovernmentStatesJobs.url.replace('url','central-government-jobs')}>
                                                <span style={{color: 'rgb(0, 0, 0)'}}> Central Government Jobs({count})</span> 
                                              
                                              </a>
                                              
                                            
                                            </li> 
                                        {gorvList&&gorvList.map((item)=>{
                                           if(item.STATE_UT=="1"){
                 return(
                                              <li>
                                              
                                              <a href={constant.component.GovernmentStatesJobs.url.replace('url',item.URL)}>
                                                <span style={{color: 'rgb(0, 0, 0)'}}> {item.STATE} ({item.statejobpost})</span> 
                                              
                                              </a>
                                              
                                            
                                            </li> 
                                              )
                                            }})}
                                              
                                         
                  
                                         
                                        </ul>
                                      </div>
                                      <div className="savejobs-aside gov-jobs-aside">
                 
                              <h3 style={{fontSize:'15px',fontWeight:'bold'}}>   Browse States Government Jobs</h3>                            
                                           
                                        
                                       <ul>
                                       {gorvList&&gorvList.map((item)=>{
                                         if(item.STATE_UT=="0"){
                return(
                                             <li>
                                             
                                             <a href={constant.component.GovernmentStatesJobs.url.replace('url',item.URL)}>
                                               <span style={{color: 'rgb(0, 0, 0)'}}> {item.STATE} ({item.statejobpost})</span> 
                                             
                                             </a>
                                             
                                           
                                           </li> 
                                             )
                                           }})}
                                             
                                        
                 
                                        
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
export default withRouter (SearchGovernmentJobList)