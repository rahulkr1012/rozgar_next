import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function CourseAdviceGuidance() {
    return (
        <main id="rg-main" className="rg-haslayout pt-0">
        <div className='breadcrumb-banner-area studyabrodbg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Course Advice Guidance</h1>
                            <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                        
                                        <li><a href=''>Course Advice Guidance</a></li>
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
                            <h4>Find What Is Best For You</h4>
                            <p>Once you have decided to pursue your studies outside India, it sometimes becomes difficult to make a choice among the so many different countries and universities that offer so many different courses, all of which have the potential to transform your career into a successful one. Many students are caught in such dillemas. We at Rozgar recognise this conundrum, so we are here to help you find the courses best suited for your professional and personal needs. Our counsellors help you choose the perfect course for a perfect career, so you can leave all the hassles to us and focus on what you do best- study and work hard.</p>
                            <h4>The University To Be At</h4>
                            <p>Once you have decided on a course, it is our pleasure at Rozgar to help you find the best and the most affordable universities and colleges to complete the courses at. This is also a very important part of this process, because if not chosen carefully, you can end up at a mediocre place. Leave it to us to make sure you get the best education at the best place.</p>
                            <h4>Choose Your Destination</h4>
                            <p>An exciting stage of studying abroad is to choose where to study among the many amazing countries of the world. This is also to be done carefully according to your needs. We help you with this decision by counseling and guiding you about the countries you are applying for by keeping in view your academic record as well as the course you are going to study. This is because in certain countries certain specific industries and professions are more preferred and better developed, and so there is a better chance for you to find jobs in those countries based on which course you are going to study.</p>
                            <h4>Budgets And Sessions</h4>
                            <p>Once you have decided on the course, university and country of your study, it is also important to know the approximate expenses you are going to incur for your studies, for example how much the tuition fees are, how much the accomodation is going to cost etc. These are also important while choosing your place of study. We at Rozgar will help you with this by guiding you about your budget and expenses.</p>
                            <p>While going to study abroad, it is also important to carefully selecting which academic session you would be applying to. In some countries, universities accept admissions year round for certain courses, in others admissions are accepted once, some accept twice and some thrice. We at Rozgar will counsel you and help you apply at the right time to the right place.</p>
                            
                          

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
