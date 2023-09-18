import React, { Component } from 'react'
import constant from 'constant'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'

export default class AdmissionAssistance extends Component {
  render() {
    return (
      <React.Fragment>
        <main id="rg-main" className="rg-haslayout pt-0">
           <div className='breadcrumb-banner-area studyabrodbg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Admission Assistance</h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                       
                                        <li><a href=''>Admission Assistance</a></li>
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
                                <h4>A Strong Application</h4>
                                <p>The application process for studying in a university abroad is a tricky process. It is not difficult, and we have no intention of discouraging you. But because you are not present physically during the admission process, and because it is a matter of applying for studies to a different country where the education system is completely different right from the primary level to the tertiary level, with different styles of teaching, different methods of evaluating students’ capabilities and different standards of judging students, the university or college that you are applying to requires that your application be strong and well structured. This can be done by proper application counselling, with the help of which you can build and create an application that is very difficult to reject!</p>
                                <h4>Every Step Of The Way</h4>
                                <p>At Rozgar Overseas Help, we start at right the beginning of it all. From helping you with choosing a course and a university, we then help you and guide with how to prepare a great application for the admission. This is done by our counsellors through</p>
                                <ul className='study-list-bx'>
                                    <li>Helping you with preparing your documents, which include passports, transcripts and verification of certificates.</li>
                                    <li>Guiding you through test preparations. Almost all foreign universities require that you have a good grade in English language proficiency tests. Some also require that you appear in some other tests like GRE. Our counsellors will help you with not just getting to know which exams and tests to appear in, but also with your preparations for these exams so that you secure a good score.</li>
                                    <li>Helping you prepare strong documents like Statements of Purpose or Research proposals or cover letters. These are also very important in determining whether you will be able to secure the admission.</li>
                                    <li>Helping you prepare a strong application. There are often some confusions in the applications processes. Our counsellors will take care of it all.</li>
                                    <li>Preparing you for impressive interviews.</li>
                                </ul>
                                <h4>Every Need Taken Care Of</h4>
                                <p>Overseas admissions to foreign universities are a dream for many, and we understand the passion with which you apply to these dream universities. We at Rozgar will provide with every kind of admission assistance that you need. Our highly qualified college admissions counsellors are experienced and approachable, and they can answer all your queries. From choosing a course to leaving for the country of your choosing, you can be assured that we have your back.</p>
                            </div>

                        </div>
                        {<StudyAbroadRightSection/>}
                    </div>
                 </div>
            </section>
            {/* {<StudyInDestinationsCountry/>}    */}
        </main>
       



      </React.Fragment>
    )
  }
}
