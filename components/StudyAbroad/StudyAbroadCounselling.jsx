import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function StudyAbroadCounselling() {
    return (
        <main id="rg-main" className="rg-haslayout pt-0">
        <div className='breadcrumb-banner-area studyabrodbg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Study Abroad Counselling</h1>
                            <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                       
                                        <li><a href=''>Study Abroad Counselling</a></li>
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
                            <h4>Trust Our Expertise</h4>
                            <p>We at Rozgar pride ourselves in the fact that we are tied-up with more than 1100 top universities offering over 62000 courses in more than 30 countries worldwide. Our extensive and exhaustive approach towards student guidance and counselling is one that will not let you down because we take care of everything and our counselors will not rest until all your questions have been answered and all your needs have been satisfies. In fact, at Rozgar, we do not just help you find a place for your education, we also walk the distance with you until you have settled in at whichever place you choose to study at. So you can be assured that we will not abandon you at any stage of the process and we will hold your hand until you have found what you are looking for.</p>
                            <h4>Just A Good Talk</h4>
                            <p>Sometimes, all you need is someone to just talk to. Someone who can listen and understand and advice you about the best possible move to make for the best possible future. That is what we are here for. We at Rozgar do not just take care of the whole process, but we also provide good old counselling about studying abroad. We will listen to you patiently, understand your needs and then advice you accordingly. Our counseling sessions are designed to provide you with a tailor-made plan for a successful future.</p>
                            <h4>Choose Your Destination</h4>
                            <p>An exciting stage of studying abroad is to choose where to study among the many amazing countries of the world. This is also to be done carefully according to your needs. We help you with this decision by counseling and guiding you about the countries you are applying for by keeping in view your academic record as well as the course you are going to study. This is because in certain countries certain specific industries and professions are more preferred and better developed, and so there is a better chance for you to find jobs in those countries based on which course you are going to study.</p>
                            <h4>Ask Us Anything</h4>
                            <p>We understand that there are many questions that you would like to ask us, and we are here to answer all of them. Do not hesitate to ask us anything, and do not think that any question is a wrong question. All our counsellors are not only professionals, but also very approachable. And we at Rozgar also understand that studying abroad is a big step, and the best we can do is to help you out of all confusions and dillemas. So ask away!</p>
                           
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
