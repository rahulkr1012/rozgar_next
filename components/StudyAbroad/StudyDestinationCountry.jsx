import React, { Component } from 'react'
import constant from 'constant'

 const StudyInDestinationsCountry = () =>{
 
    return (
      <React.Fragment>
        <section className='what-we-offer-section abroad-city-section'>
                <div className='container'>
                   <div className=''>  <div className='section-title'>
                   
                   <h2>Top Study Abroad Destination</h2>
                  
                 </div></div>
                   <div className='row'>
                   <div className='col-md-3'>
                       <a href={constant.component.studyInAustralia.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/australia.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in Australia</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyInCanada.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/canada.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in Canada</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyInUk.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/uk.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in UK</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyInUsa.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/usa.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in USA</h4></div>
                          </div>  </a>
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyInItaly.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/italy.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in Italy</h4></div>
                          </div> </a> 
                       </div>
                       <div className='col-md-3'>
                       <a href={constant.component.studyInIreland.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/ireland.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in Ireland</h4></div>
                          </div> </a>  
                       </div>
                       <div className='col-md-3'>
                          <a href={constant.component.studyInNewZealand.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/new-zealand.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4>Study in New Zealand</h4></div>
                          </div>  </a>
                       </div>
                      
                       <div className='col-md-3'>
                       <a href={constant.component.studyInSingapore.url}><div className='we-offer-item'>
                             <div className='we-offer-images'><img src={'./assets/images/singapore.jpg'} alt='Image'/></div>
                             <div className='we-offer-content'><h4> Study in Singapore</h4></div>
                          </div> </a> 
                       </div>
                       
                   </div>

                </div>
              </section> 
      </React.Fragment>
    )
  }
export default StudyInDestinationsCountry