import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function TravelGuidance() {
    return (
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
        <div className='breadcrumb-banner-area studyabrodbg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Travel Assistance</h1>
                            <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                       
                                        <li><a href=''>Travel Assistance</a></li>
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
                            <h4>Travel Assistance</h4>
                            <p>After you have completed all the formalities of the application process, the final step in the admission process is to depart for your destination and finding accommodation for yourself in the new country. We at Rozgar are with you at this stage as well.</p>
                            <h4>Leaving Home</h4>
                            <p>Leaving home for even a day is tough, and we understand how difficult leaving your home to study in a foreign country for a number of years can be, not just for you, but for your loved ones as well. While you might be anxious about not just going to a foreign country with a foreign culture, it is understandable that you are also nervous about how you are going to travel. Our travel assistance counsellors will make sure that your travels are a pleasant experience for you. So worry not, at Rozgar, we make sure that you get the best travel assistance for your study abroad, and that you know well in advance about how your travel is going to be planned, so that you leave all your worries and anxieties behind and your loved ones are at peace with you being in safe hands.</p>
                            <p>Our travel assistance services will help you with planning your travel, as well as with flight bookings so that you find the best departure dates, routes and rates. We also help you with choosing airlines and services in such a way that hassles like excess baggage costs etc. are avoided.</p>
                            <h4>Finding A New Home</h4>
                            <p>Once we have gotten you safely to your destination, the first thing you would be looking for is a place to stay, an accommodation. Your accommodation during your study abroad is a home away from home for a couple of years, and we understand how important a home is for a student who is away from his country and his family. So rest easy, because our overseas student accommodation services will make you feel right at home.</p>
                            <p>There are different types of student accommodations that we can help you choose from, depending on your personal preferences as well as your budget.</p>
                            <ul className='study-list-bx'>
                                <li><strong>On-campus -</strong> On-campus accommodations are run by the university and lie within the campus area. These are preferred because of the proximity to your classes as well to other academic activities.</li>
                                <li><strong>Off-campus -</strong> Countries like Germany offer only this type of accommodation and these lie outside the campus. These are exciting and enjoyable because of the proximity to the local culture and the student community.</li>
                                <li><strong>Home stay Off-</strong> In countries such as Australia, Canada and the United States, international students can live with the local families. This not only provides a home-like feeling, but also helps you to get acquainted with local cultures and the people. So be assured that our accommodation and travel assistance services are designed to help you get to your destination, and be settled at your destination with ease.</li>

                            </ul>
                          

                        </div>

                    </div>
                    {<StudyAbroadRightSection/>}
                </div>
            </div>
        </section>
        {<StudyInDestinationsCountry/>}
    </main>
    )
}
