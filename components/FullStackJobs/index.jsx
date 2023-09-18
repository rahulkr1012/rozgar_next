import React, { Component } from 'react'
import constant from 'constant'
import Search from 'components/JobList/search'
import  AstrogolyAd from 'src/assets/images/astrogoly-ad.png'
import PostAJob  from 'src/assets/images/post-a-job.jpg'
import  StudyAbroadAdd  from 'src/assets/images/study-abroad-add.png'
import SwiggyBanners  from 'src/assets/images/swiggy-banners.jpg'
import AnnounceImg01  from 'src/assets/images/announce-img01.png'
import CVPic01    from 'src/assets/images/cv-pic01.png'
import CareerExplorer from 'src/assets/images/career-explorer.jpg'
import  swiggyjobs  from 'src/assets/images/swiggyjobs.jpg'
import  adds05 from 'src/assets/images/adds-05.jpg'
import Image from 'next/image'



export default class FullStackJobs extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
  render() {
    const { fullStackJobs } = this.props
    return (
       <React.Fragment>
           <main id="rg-main" className="rg-main rg-haslayout">
                     <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rg-successstorysbanner">
                            <div className="container">
                                <div className="row">
                                    <Search/>
                                </div>
                            </div>
                        </div>
                       </div>

                       <div className='seoKeyword-section'>
                       <div className="container">
                                <div className="row">
                                   <div className='col-md-3'>
                                    <aside>

                                      <div className='other-services-section'>
                                         <h4>Premium  Services</h4>
                                         <ul className='sec-other-links-bx'>
                                            <li><a href={constant.component.ResumeMaking.url}>Resume Making</a></li>
                                            <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                            <li><a href={constant.component.workabroad.url}>Work Abroad</a></li>
                                            <li><a href={constant.component.StudentsExplorer.url}>Career Explorer</a></li>
                                            <li><a href={constant.component.careerAstrology.url}>Career Astrology</a></li>
                                            <li><a href={constant.component.educationLoan.url}>Education Loan</a></li>
                                            
                                         </ul>

                                      </div>
                                       <div className='create-jobs-seo-box'>   
                                      <div className='create-free-job-alert'>
                                        <div className='create-free-job-box'>
                                            <h3>Create a Free Job Alert</h3>
                                            <p>Get an email on jobs matching your criteria</p>
                                            <span className='no-reg-r'>No registration required</span>
                                        </div>
                                        <div className='create-job-alert-btn'><a href={constant.component.CreateJobAlert.url}>CREATE JOB ALERT</a></div>
                                      </div>
                                      </div>
                                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                                        <a target='_blank' href='https://recruit.rozgar.com/job-post' title=''>
                                          <figure>
                                            <Image src={PostAJob} alt='img description' style={{padding: "0px" }} />
                                          </figure>
                                        </a>
                                       
                                      </div>
                                         <div className="rg-adds rg-jobsearchadd mb-20 mt-20">
                                              <a target='_blank' href={constant.component.careerAstrology.url} title="">
                                                  <figure>
                                                      <Image src={AstrogolyAd} alt="img description" />
                                                  </figure>
                                              </a>
                                              <span>Ad</span>
                                          </div>
                                          <div className="rg-adds rg-jobsearchadd mb-20 mt-20">
                                              <a target='_blank' href={constant.component.studyAbroad.url} title="">
                                                  <figure>
                                                      <Image src={StudyAbroadAdd} alt="img description" />
                                                  </figure>
                                              </a>
                                              <span>Ad</span>
                                          </div>
                                      </aside>
                                   </div>
                                   <div className='col-md-6'>
                                     
                                       <div className='rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree'>
                                           <div className='seo-list-link-section'>
                                                      <div class="brows-by-locations-bx ">
                                                        <div class="by-locations-head">
                                                          <h1 class="small_title">{fullStackJobs.KEYWORD_NAME} - 11 Lakh+ Of Jobs on Rozgar. </h1>
                                                        </div>
                                                        
                                                        <div className='seo-about-sec-bx'>
                                                        
                                                        <p>Find the latest jobs vacancies in <strong>{this.props.router.query.url}</strong>  ️<a href="https://rozgar.com/register">Register</a> now on Rozgar.com and get instant access to your dashboard and start applying on jobs. Track your application and communicate with Employer. Get Competitive Salary. Full-time, Temporary, and part-time jobs. Fast & Free. Start your new career right now!</p>
                                                        <p>Find Your Next Job Today, With One Easy Search On Rozgar. A better way to search - find your next Job in <strong>{this.props.router.query.url}</strong> at Rozgar.com. New Job Postings Every hours. Quick Resume Upload. India's leading and Best Job Portal.</p>
                                                        <p>You can browse jobs by <a href="https://rozgar.com/jobs-by-category">Functional Area, Industry</a>, <a href="https://rozgar.com/jobs-by-company">Company</a>, <a href="https://rozgar.com/jobs-by-skill"> Skills </a> and <a href="https://rozgar.com/jobs-by-designation">Designations</a>.</p>
                                                        <p>Explore Rozgar Services - <a href="https://rozgar.com/resume-making">Create CV</a> | <a href="https://rozgar.com/study-abroad">Study Abroad</a> | <a href="https://rozgar.com/international-work-visas">International work Visas</a> | <a href="https://rozgar.com/career-explorer">Career Explorer</a> | <a href="https://rozgar.com/career-astrology">Career Astrology</a> | <a href="https://rozgar.com/education-loan">Education Loan</a></p>
                                                        </div>
                                                        {/* <ul class="functional-area-list">
                                                          <li>
                                                            <a href="/jobs-in-bfsi-investments-and-trading">BFSI, Investments &amp; Trading</a>
                                                          </li>
                                                          <li>
                                                            <a href="/jobs-in-customer-success-service-and-operations">Customer Success, Service &amp; Operations</a>
                                                          </li>
                                                          <li>
                                                            <a href="/jobs-in-data-science-and-analytics-data">Data Science &amp; Analytics data</a>
                                                          </li>
                                                          <li>
                                                            <a href="/jobs-in-engineering-hardware-and-networks">Engineering - Hardware &amp; Networks</a>
                                                          </li>
                                                          <li>
                                                            <a href="/jobs-in-engineering-software-and-qa">Engineering - Software &amp; QA</a>
                                                          </li>
                                                          <li>
                                                            <a href="/jobs-in-finance-and-accounting">Finance &amp; Accounting</a>
                                                          </li>
                                                         
                                                        </ul> */}
                                                       
                                                      </div>

                                           </div>
                                           
                                        <div className='add-bootom-box'><a  target='_blank' href={constant.component.Swiggy.url}><Image src={SwiggyBanners} alt='img description' /></a></div>


                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656602805792.jpg"} alt='Zindgi Technologies' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='System Administrator (IT) - Hardware Network Engineer'>
                                                <a href='/jobs/system-administrator-it-hardware-network-engineer-zindgi-technologies-ahmedabad-279'>System Administrator (IT) - Hardware Network Engineer </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/zindgi-technologies-23'>Zindgi Technologies</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>Provide technical support for both hardware and software issues....</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>Hardware Networking</li> |
                                                </span>
                                                <span>
                                                  <li>Network Installation</li> |
                                                </span>
                                                <span>
                                                  <li>System administration</li> |
                                                </span>
                                                <span>
                                                  <li>WLAN</li> |
                                                </span>
                                                <span>
                                                  <li>Troubleshooting</li>
                                                </span>
                                                <span>
                                                  <li>Firewall</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>3-6 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>Not disclosed</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Ahmedabad'>Ahmedabad</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1660025018840.png"} alt='Mindtree ' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Mindtree is hiring Network Operation Manager (ITSM Networking)'>
                                                <a href='/jobs/mindtree-is-hiring-network-operation-manager-itsm-networking--mindtree--mumbai-bangalore-245'>Mindtree is hiring Network Operation Manager (ITSM Networking) </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/mindtree--16283'>Mindtree </a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>Lead a team of talented netops engineers and provide technical g...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>Client Management</li> |
                                                </span>
                                                <span>
                                                  <li>Networking</li> |
                                                </span>
                                                <span>
                                                  <li>Palo Alto firewall</li> |
                                                </span>
                                                <span>
                                                  <li>Cisco Certified</li> |
                                                </span>
                                                <span>
                                                  <li>Firewall Management</li>
                                                </span>... <span>
                                                  <li>Operations Planning</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>12-15 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>Not disclosed</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Mumbai, Bangalore '>Mumbai, Bangalore </span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1659956024772.png"} alt='Microsoft Inc.' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Principal Software Engineering Manager'>
                                                <a href='/jobs/principal-software-engineering-manager-microsoft-inc--bangalore-noida-212'>Principal Software Engineering Manager </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/microsoft-inc--16276'>Microsoft Inc.</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>Own and deliver complete features, including design, architectur...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>C++</li> |
                                                </span>
                                                <span>
                                                  <li>C C++</li> |
                                                </span>
                                                <span>
                                                  <li>Networking</li> |
                                                </span>
                                                <span>
                                                  <li>Coding</li> |
                                                </span>
                                                <span>
                                                  <li>Data Analysis</li>
                                                </span>... <span>
                                                  <li>Analysis</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>14-18 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>1500000-8000000</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Bangalore , Noida'>Bangalore , Noida</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1660025644222.png"} alt='Dell Technologies' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Lab Support Senior Engineer'>
                                                <a href='/jobs/lab-support-senior-engineer-dell-technologies-bangalore-210'>Lab Support Senior Engineer </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/dell-technologies-16281'>Dell Technologies</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>Join us to do the best work of your career and make a profound s...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>VMware</li> |
                                                </span>
                                                <span>
                                                  <li>SAN</li> |
                                                </span>
                                                <span>
                                                  <li>ServiceNow</li> |
                                                </span>
                                                <span>
                                                  <li>Networking</li> |
                                                </span>
                                                <span>
                                                  <li>Configuration Management</li>
                                                </span>... <span>
                                                  <li>Phyton</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>5-8 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>Not disclosed</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Bangalore '>Bangalore </span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1659956024772.png"} alt='Microsoft Inc.' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Technical Support Engineering IC3'>
                                                <a href='/job/technical-support-engineering-ic3-microsoft-inc--bangalore-delhi-209'>Technical Support Engineering IC3 </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/microsoft-inc--16276'>Microsoft Inc.</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>Responsible for the customer support experience with MicrosoftOw...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>Printing</li> |
                                                </span>
                                                <span>
                                                  <li>Automation</li> |
                                                </span>
                                                <span>
                                                  <li>Networking</li> |
                                                </span>
                                                <span>
                                                  <li>DNS</li> |
                                                </span>
                                                <span>
                                                  <li>windows</li>
                                                </span>... <span>
                                                  <li>IT technical support</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>6-10 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>50000-100000</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Bangalore , Delhi'>Bangalore , Delhi</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1659955160962.png"} alt='Ericsson Global' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Associate engineer Cloud'>
                                                <a href='/jobs/associate-engineer-cloud-ericsson-global-noida-ahmedabad-129'>Associate engineer Cloud </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/ericsson-global-16278'>Ericsson Global</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>What you will doTo work within well-defined system support guide...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>bidding</li> |
                                                </span>
                                                <span>
                                                  <li>Google Analytics</li> |
                                                </span>
                                                <span>
                                                  <li>Email Marketing</li> |
                                                </span>
                                                <span>
                                                  <li>data management</li> |
                                                </span>
                                                <span>
                                                  <li>Social networking</li>
                                                </span>... <span>
                                                  <li>CRM</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>2-5 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>Not disclosed</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Noida, Ahmedabad'>Noida, Ahmedabad</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='rg-featurejobholder'>
                                        <div className='rg-featurejob'>
                                          <figure className='rg-companyimg'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1659954089888.png"} alt='Reliance Industries' width={50} height={30}/>
                                          </figure>
                                          <div className='rg-companycontent'>
                                            <div className='rg-companyhead'>
                                              <div className='rg-rightarea'>
                                                <a className='rg-tagfeature' href='javascript:void(0);'>
                                                  <i className='fa fa-clock'></i> 3 days ago </a>
                                              </div>
                                            </div>
                                            <div className='rg-companyname'>
                                              <h3 title='Associate engineer Cloud'>
                                                <a href='/jobs/associate-engineer-cloud-reliance-industries-kolkata-noida-116'>Associate engineer Cloud </a>
                                              </h3>
                                              <h6>
                                                <a target='_blank' href='/company/reliance-industries-16277'>Reliance Industries</a>
                                              </h6>
                                              <div className='companyreviewbox'>
                                                <span className='reviewnumber'>
                                                  <i className='fa fa-star'></i>
                                                </span>
                                                <a href='#'>
                                                  <span className='reviewlink'>(0 Reviews)</span>
                                                </a>
                                              </div>
                                            </div>
                                            <div className='rg-description'>
                                              <p>What you will doTo work within well-defined system support guide...</p>
                                              <ul className='skilllist'>
                                                <span>
                                                  <li>bidding</li> |
                                                </span>
                                                <span>
                                                  <li>Google AdWords</li> |
                                                </span>
                                                <span>
                                                  <li>Google Analytics</li> |
                                                </span>
                                                <span>
                                                  <li>Email Marketing</li> |
                                                </span>
                                                <span>
                                                  <li>data management</li>
                                                </span>... <span>
                                                  <li>CRM</li>
                                                </span>
                                              </ul>
                                            </div>
                                            <div className='rg-rightarea'>
                                              <a className='rg-btnjobtag rg-fulltimejob mr-10' href='javascript:void(0);'>
                                                <i className='ti-crown'></i> REGULAR </a>
                                              <a className='rg-tagfeature' href='javascript:void(0);' >
                                                <i className='fa fa-star fa-sm'></i> Save </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='rg-professionalinfo'>
                                          <li>
                                            <i className='lnr lnr-briefcase'></i>
                                            <span>2-5 Yrs</span>
                                          </li>
                                          <li>
                                            <i className='fa fa-rupee'></i>
                                            <span>Not disclosed</span>
                                          </li>
                                          <li>
                                            <i className='lnr lnr-map-marker'></i>
                                            <span title='Kolkata, Noida'>Kolkata, Noida</span>
                                          </li>
                                        </ul>
                                      </div>
                                     

                                          

                                       </div>
                                   </div>
                                  
                                   <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left'>
                                    <aside id='rg-sidebarvtwo' className='rg-sidebar rg-sidebarvtwo'>
                                      <div className='roz-create-cv'>
                                        <div className='urgent-hiring-area'>
                                          <div className='hiring-img'>
                                            <a href='/fresher-jobs'>
                                            <Image src={AnnounceImg01} />
                                            </a>
                                          </div>
                                        </div>
                                        <a target='_blank' href='/resume-making'>
                                          
                                          <div className='create-cv-bg'>
                                          <div className='imgfree'>
                                            <Image src={CVPic01} />
                                          </div>
                                            <div className='create-text'>
                                              <div className='free-text'>Free</div>
                                              <h4>Create CV</h4>
                                            </div>
                                            <div className='btn-cv'>
                                              <i className='fa fa-angle-double-right'></i>
                                            </div>
                                          </div>
                                        </a>
                                      </div>

                                     
                                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                                        <a target='_blank' href={constant.component.StudentsExplorer.url} title=''>
                                          <figure>
                                            <Image src={CareerExplorer} alt='img description' style={{padding: "0px" }} />
                                          </figure>
                                        </a>
                                       
                                      </div>
                                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                                        <a target='_blank' href={constant.component.Swiggy.url} title=''>
                                          <figure>
                                            <Image src={swiggyjobs} alt='img description' />
                                          </figure>
                                        </a>
                                        <span>Ad</span>
                                      </div>
                                      <div className='roz-company-hiring mb-30'>
                                        <div className='company-hiring'>
                                          <div className='company-hiring-text'>
                                            <h3>Companies Hiring</h3>
                                          </div>
                                          <div className='company-hiring-view'>
                                            <a target='_blank' href='/jobs-by-company'>View All</a>
                                          </div>
                                        </div>
                                        <div className='company-hiring-logo'>
                                          <a href='/jobs-in-policybazaar-insurance-broking-private-limited' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1660117489096.png"} alt='POLICYBAZAAR INSURANCE BROKING PRIVATE LIMITED' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-byju-s' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656510288618.jpg"} alt='BYJU’S' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-itc-hotels' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656510261282.jpg"} alt='ITC Hotels' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-aditya-birla-housing-finance-limited' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656510227980.jpg"} alt='Aditya Birla Housing Finance Limited' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-className-plus' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656510593208.jpg"} alt='className Plus' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-gis-technologies-pvt-ltd-' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656601891661.jpg"} alt='GIS Technologies Pvt. Ltd.' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-health-assure-pvt-ltd-' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656602359635.jpg"} alt='Health Assure Pvt. Ltd.' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-zindgi-technologies' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656602805792.jpg"} alt='Zindgi Technologies' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-industry-buying' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656603286158.jpg"} alt='Industry Buying' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-lenden-club-techserve-private-limited' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656603945886.jpg"} alt='LENDEN CLUB TECHSERVE PRIVATE LIMITED' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-medcords-healthcare-solutions-pvt-ltd-' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656653969747.jpg"} alt='MedCords Healthcare Solutions Pvt Ltd.' width={50} height={30}/>
                                          </a>
                                          <a href='/jobs-in-vlink-inc-' target='_blank'>
                                            <Image src={process.env.NEXT_PUBLIC_BASE_URL+"/company/logo/1656654487576.jpg"} alt='Vlink Inc.' width={50} height={30}/>
                                          </a>
                                        </div>
                                      </div>
                                      <div className='rg-adds rg-jobsearchadd'>
                                        <a href='javascript:void(0);' title=''>
                                          <figure>
                                            <Image src={adds05} alt='img description' />
                                          </figure>
                                        </a>
                                        <span>Ad</span>
                                      </div>
                                    </aside>
                                  </div>
                                   
                                </div>
                            </div>    
                       </div>
              </main>          
       </React.Fragment>
    )
  }
}
