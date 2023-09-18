import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function StudyAbroadScholarship() {
  return (
    <React.Fragment>
         <main id="rg-main" className="rg-haslayout pt-0">
           <div className='breadcrumb-banner-area studyabrodbg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Scholarship Application Assistance</h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                        
                                        <li><a href=''>Scholarship Application Assistance</a></li>
                                    </ol>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             <section className='main-section-box'>
                 <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='content-main-box'>
                                <h4>Scholarship Application Assistance</h4>
                                <p>Studying abroad can be an expensive affair, and while many are disheartened when they come to know about how much they will have to spend, you do not need to worry. Because we at Rozgar are here to help you find the right sources of funding for your studies.</p>
                                <p>Scholarships are the most common source of funding your education. And while many do not even know about the existence of scholarships for studying abroad, we are here to provide you all the possible scholarship assistance that you require while preparing for your studies.</p>
                                <p>There are a number of scholarships to study abroad, and while some of them are open to students from all countries (international scholarships), others are country specific. It is these scholarships that can prove to be really helpful to deserving and high performing students. Like for other countries, there are a number of scholarships for Indian students to which only Indians can apply. These international scholarships for Indian students include funding for your tuition, accommodation costs, travel expenses and sometimes even a stipend. Applications to these scholarships should therefore be considered very important as a successful application can save you a lot of money.</p>
                                <p>All these higher education scholarships have different requirements. But there are some things that are common to applications to all of these. These include</p>
                                <ul className='study-list-bx'>
                                    <li>timely preparation of documents,</li>
                                    <li>a good academic record,</li>
                                    <li>Proof of capability to deserve the stipend and</li>
                                    <li>A strong application.</li>
                                    
                                </ul>
                              
                                <p>We at Rozgar will help you with all these and at every stage of the application. So there is nothing to fret about and nothing to worry at all!</p>
                                <p>Besides, there are some scholarships that are awarded based on merit. There are others that are awarded based on demonstration of a particular ability, for example essay writing. There are also some that are awarded on the basis of proficiency in a specific field, for example sports or the arts. Then there are still others that are awarded on the basis of academic and scholarly writing. And then there are others that are awarded simply on the basis of performance in a test.</p>
                                <p>We at Rozgar will help you navigate through all these, help you choose the best scholarship based on your record and the course that you will be applying to, and help you prepare a strong application- one that will be very hard for the authorities to reject!</p>
                                <p>There are a number of scholarships to which you can apply in different countries. For example, scholarships available for study in Australia include</p>
                                <ul className='study-list-bx'>
                                    <li>Australian Government Research and Training Program (AGRTP)</li>
                                    <li>Australia Awards</li>
                                    <li>John Allwright Fellowship (JAF)</li>
                         
                                    
                                </ul>


                                <h4>Scholarships Available In Canada Include</h4>
                                <ul className='study-list-bx'>
                                    <li>Shastri Indo-Canadian Institute</li>
                                    <li>Canadian Commonwealth Scholarship and Fellowship Plan</li>
                                    <li>Ontario Graduate Scholarship Program</li>
                                    <li>National Research Council of Canada (NRCC)</li>
                                    <li>Partnership Grants by Social Sciences and Humanities Research Council of Canada</li>
                         
                                    
                                </ul>
                                <h4>Scholarships In USA Include</h4>
                                <ul className='study-list-bx'>
                                    <li>Fulbright- Nehru Fellowships</li>
                                    <li>Hubert Humphrey Fellowship Program</li>
                                    <li>#YouAreWelcomeHere Scholarship and the</li>
                                    <li>AAUW International Fellowships</li>
                         
                                    
                                </ul>
                                <h4>Scholarships Available For Study In UK Include</h4>
                                <ul className='study-list-bx'>
                                    <li>Chevening Scholarship</li>
                                    <li>Commonwealth Scholarship and Fellowship</li>
                                    <li>GREAT Scholarships</li>
                                    <li>Charles Wallace India Trust Scholarships</li>
                         
                                    
                                </ul>
                                <p>Besides all these, there are still more scholarships for Indian students to study abroad. So there are a lot of options to choose from, depending upon your course and the place of your study.</p>
                               
                            </div>

                        </div>
                        {<StudyAbroadRightSection/>}
                    </div>
                 </div>
            </section>   
            {<StudyInDestinationsCountry/>}
        </main>
        </React.Fragment>
    )
}
