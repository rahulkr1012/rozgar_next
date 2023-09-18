import jobsByDesignation from '@/pages/jobs-by-designation'
import constant from 'constant'
import React, { Component, Fragment } from 'react'
export default class Sitemap extends Component {
render() {
return (
<Fragment>
   <main id="rg-main" className="rg-main rg-haslayout pt-0">
      <div className="rg-sectionspace rg-haslayout pt-0">
 
      <div className="breadcrumbs-section bg-breadcrumbs">
                        <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                  <div className="breadcrumbs-bx">
                                    <p id="breadcrumbs"><span><span><a href={constant.component.homepage.url}>Home</a> / <strong className="breadcrumb_last" aria-current="page">Sitemap</strong></span></span></p>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
         <div className='site-map-section'>
            <div className='container'>
               <div className='row'>
                  <div className='col-md-12'>
                     <div className='site-map-hd'>
                        <h4>Sitemap</h4>
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-md-3'>
                     <div className='site-map-list'>
                        <h4>Information</h4>
                        <ul>
                           <li><a href={constant.component.homepage.url}>Home</a></li>
                           <li><a href={constant.component.aboutUs.url}>About Us</a></li>
                           <li><a href={constant.component.blog.url}>Blog</a></li>
                           <li><a href={constant.component.faqs.url}>FAQs</a></li>
                           <li><a href={constant.component.reportIssue.url}>Report an issue</a></li>
                           <li><a href={constant.component.privacyPolicy.url}>Privacy policy</a></li>
                           <li><a href={constant.component.termsConditions.url}>Terms & conditions</a></li>
                        </ul>
                     </div>
                     <div className='site-map-list'>
                        <h4 className='rg-mt'>Government Jobs &  Result</h4>
                        <ul>
                           <li><a href={constant.component.GovernmentState.url}>Government Jobs</a></li>
                           <li><a href={constant.component.GovernmentResultState.url}>Government Result</a></li>
                           
                        </ul>
                     </div>
                  </div>
                  <div className='col-md-9'>
                     <div className='row'>
                        <div className='col-md-12'>
                           <div className='site-map-list'>
                              <h4>Jobs</h4>
                           </div>
                        </div>
                     </div>
                     <div className='row'>
                        <div className='col-md-3'>
                           <div className='site-map-list'>
                              <h5 className='rg-mt1'>Explore jobs</h5>
                              <ul>
                                 <li><a href={constant.component.jobsBySkill.url}>Jobs by skill</a></li>
                                 <li><a href={constant.component.jobsByDesignation.url}>Jobs by designation</a></li>
                                 <li><a href={constant.component.jobsByCompany.url}>Jobs by company</a></li>
                                 <li><a href={constant.component.jobsByCategory.url}>Jobs by category</a></li>
                                 <li><a href={constant.component.jobsByLocation.url}>Jobs by location</a></li>
                                 <li><a href={constant.component.CreateJobAlert.url}>Create a Free Job Alert</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className='col-md-3'>
                           <div className='site-map-list'>
                              <h5 className=''>Jobs in demand</h5>
                              <ul >
                                 <li><a href={constant.component.hiringfresherjob.url}>Fresher jobs</a></li>
                                 <li><a href={constant.component.RemoteJobs.url}>Remote jobs</a></li>
                                 <li><a href={constant.component.WorkFromHomeJobs.url}>Work from home jobs</a></li>
                                 <li><a href={constant.component.WalkInJobs.url}>Walk-in jobs</a></li>
                                 <li><a href={constant.component.PartTimeJobs.url}>Part-time jobs</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className='col-md-3'>
                           <div className='site-map-list'>
                              <h5 className=''>Video JDs</h5>
                              <ul >
                                 <li><a href={constant.component.MostPopularVideoJdJob.url}>Most Popular</a></li>
                                 <li><a href={constant.component.HotSectorVideoJdJob.url}>Hot Sectors</a></li>
                                 <li><a href={constant.component.MostLikedVideoJdJob.url}>Most Liked</a></li>
                              </ul>
                           </div>
                        </div>
                        <div className='col-md-3'>
                           <div className='site-map-list'>
                              <h5 className=''>Freshers jobs</h5>
                              <ul >
                                 <li><a href={constant.component.latestfresherjob.url}>Latest fresher jobs</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Students</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Institution</a></li>
                                 <li><a href={constant.component.jobsByCompany.url}>Hiring Company</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Internships</a></li>
                               
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className='row'>
                        <div className='col-md-3'>
                           <div className='site-map-list'>
                              <h4 className='rg-mt'>Companies</h4>
                              <ul >
                                 <li><a href={constant.component.companieslist.url}>Browse all companies</a></li>
                                 <li><a href={constant.component.topcompanieslist.url}>Top companies</a></li>
                                 <li><a href='https://recruit.rozgar.com/recruit/client-registration-form'>Register/Claim Company  </a></li>
                              </ul>
                           </div>
                        </div>
                        <div className='col-md-9'>
                        <div className='row'>
                            <div className='col-md-12'>
                              <div className='site-map-list'>
                                  <h4 className='rg-mt'>Services</h4>
                              </div>
                            </div>
                        </div> 
                          <div className='row'>
                          <div className='col-md-4'>
                              <div className='site-map-list'>
                                  <h5 className=''>Candidate Services</h5>
                                  <ul >
                                    <li><a href={constant.component.resumeMaking.url}>Resume Making</a></li>
                                    <li><a href={constant.component.UpgradeSkills.url}>Upgrade Skills</a></li>
                                    <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                    <li><a href={constant.component.workabroad.url}>Work Abroad</a></li>
                                    <li><a href=''>Career Explorer</a></li>
                                    <li><a href={constant.component.careerAstrology.url}>Career Astrology</a></li>
                                    <li><a href={constant.component.educationLoan.url}>Loans & Advances</a></li>
                                  </ul>
                            </div>
                          </div>
                          <div className='col-md-4'>
                          <div className='site-map-list'>
                              <h5 className=''>Employer Services</h5>
                              <ul >
                                 <li><a href={constant.component.CompanyBrandings.url}>Company Brandings</a></li>
                                 <li><a href={constant.component.SponsoredJDs.url}>Sponsored JDs</a></li>
                                 <li><a href={constant.component.contracttualstaffing.url}>Contract Staffing's</a></li>
                                 <li><a href={constant.component.hrmanagementsystem.url}>HRMS</a></li>
                                 <li><a href={constant.component.fulltimehiring.url}>Full Time Hiring's</a></li>
                                 <li><a href={constant.component.HrTechnologySolutions.url}>HR Tech Solutions</a></li>
                              </ul>
                           </div>
                          </div>
                          <div className='col-md-4'>
                          <div className='site-map-list'>
                              <h5 className=''>Campus Services</h5>
                              <ul >
                                 <li><a href='https://campus.rozgar.com/'>Register University / Institution</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Campus Jobs</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Campus Update</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Internships</a></li>
                                 <li><a href='https://campus.rozgar.com/'>Internal Exchange Programs</a></li>
                                
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
</Fragment>
)
}
}