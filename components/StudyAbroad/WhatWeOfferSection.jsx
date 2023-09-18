import React from 'react'
import constant from 'constant'
export default function WhatWeOfferSection() {
  return (
<React.Fragment>
          <section className='what-we-offer-section abroad-city-section'>
                <div className='container'>
                   <div className=''>  <div className='section-title'>
                   
                   <h2>What We Offer</h2>
                  
                 </div></div>
                   <div className='row'>
                   <div className='col-md-3'>
                       <a href={constant.component.admissionAssistance.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/admission-assistance.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Admission Assistance</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyAbroadScholarship.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/abroad-scholarship.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study Abroad Scholarship</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.testPreparation.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/test-preparation.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Test Preparation</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.travelGuidance.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/travel-guidance.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Travel Guidance</h4></div>
                          </div>  </a>
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.visaApplicationAssistance.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/visa-application.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Visa application assistance</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.coursesAdviceGuidance.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/courses-advice.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Courses Advice Guidance</h4></div>
                          </div> </a>  
                       </div>
                       <div className='col-md-3'>
                          <a href={constant.component.studyAbroadCounselling.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/study-counselling.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study Abroad Counselling</h4></div>
                          </div>  </a>
                       </div>
                      
                       <div className='col-md-3'>
                       <a href={constant.component.visaCoverLetter.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/visa-cover-letter.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4> Visa Cover Letter</h4></div>
                          </div> </a> 
                       </div>
                       
                   </div>

                </div>
              </section> 
      </React.Fragment>
    )
}
