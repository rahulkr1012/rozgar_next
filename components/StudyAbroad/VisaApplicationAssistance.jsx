import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function VisaApplicationAssistance() {
    return (
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
        <div className='breadcrumb-banner-area studyabrodbg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Visa Application Assistance</h1>
                            <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                       
                                        <li><a href=''>Visa Application Assistance</a></li>
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
                            <h4>The Next Big Step</h4>
                            <p>After you have decided on a course, chosen a country and secured an admission at the university, the formalities begin. The next big step in this process is securing a student visa for the country you are going to. Securing a visa may look easy on paper, but this process often becomes tiring and cumbersome. So while you prepare for your departure, let us at Rozgar take care of these formalities. The very basic requirements that we ask of you at this stage is</p>
                            <ul className='study-list-bx'>
                                <li>To keep your documents ready- your passport, your transcripts from your qualifying exams.</li>
                                <li>To get your certificates verified and handy and check and cross-check all of them for any discrepancies. Some countries for example require that your qualifying certificates be verifies from the ministry of Human Resources and Development. We will take care of all of this.</li>
                                <li>To secure a good score in language proficiency tests like International English Language Testing System (IELTS) or the Test of English as a Foreign Language (TOEFL), depending upon the country you are applying in.</li>
                                <li>To be ready to provide a proof of ability to cover the expenses of your study and residence abroad.</li>

                            </ul>

                            <h4>Timing Is Important</h4>
                            <p>The time of applying for a student visa is also very crucial. This is because if you apply too early, you will lose out on precious time on your visa, if you apply too late, you might lose out on the admission completely. So let us help you here too, and guide you about when to apply for the visa.</p>
                     
                            
                            <h4>Funding Oportunities</h4>

                            <p>If you are planning to find an external source of funding for your studies, for example a scholarship or a grant or a fellowship, it becomes even more important to apply for a visa at the right time. This is because the process of securing a visa may sometimes be a little drawn out, or perhaps your scholarship may even cover the costs of your visa application fees. We at Rozgar will take care of all these complications and provide you with a hassle-free experience of preparing for your departure.</p>
                            <h4>Pointing You In The Right Direction</h4>
                            <p>During the process of securing a visa, you have to meet certain officials and fill certain forms. We at Rozgar will point you in the right direction so that you do not have to waste crucial time running from door to door about all these formalities.</p>

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
