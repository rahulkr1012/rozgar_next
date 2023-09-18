import React from 'react'
import StudyAbroadRightSection from './StudyAbroadRightSection'
import StudyInDestinationsCountry from './StudyDestinationCountry'
import constant from 'constant'
export default function TestPreparation() {
  return (
<React.Fragment>
            <main id="rg-main" className="rg-main rg-haslayout pt-0">
                <div className='breadcrumb-banner-area studyabrodbg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Test Preparation</h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                       
                                        <li><a href=''>Test Preparation</a></li>
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
                                    <h4>Test Preparation</h4>
                                    <p>Going abroad for studies is an opportunity of a lifetime, and one has to work hard to get it. This means not only planning your studies well in advance and doing good in your academics, but it also involves preparing for certain exams that are necessary to secure your admission in a prestigious foreign university.</p>
                                    <h4>Every Step Of The Way</h4>
                                    <p>We at Rozgar understand the importance of preparing strongly for these examinations, and we also understand that every student and aspirant has to be prepared accoding to his or her own needs and preferences. Therefore, we have tailored our test preparation services according to the needs of every aspirant. We at Rozgar guide every student by planning their studies, helping them devise schedules and putting them through mock tests to best prepare them for these exams.</p>
                                    <p>Some of these tests that you have to appear for foreign studies are-</p>
                                    <ul className='study-list-bx'>
                                        <li>IELTS- The International English Language Testing System, is a test to assess the English language ability of candidates who intend to study or work in a foreign country. IELTS is recognised by universities and employers in a number of countries including Australia, Canada, New Zealand, the UK and the USA. The test has 4 sections- Listening, Speaking, Reading and Writing.</li>
                                        <li>TOEFL- The Test of English as Foreign Language test is another test to evaluate the English language proficiency of people who are non-native English speakers. Besides university admissions, the results of this test are also important in securing scholarships and grants. Like IELTS, this test also has 4 sections- Listening, Speaking, Reading, Writing.</li>
                                        <li>SAT- Scholastic Aptitude Test is a general test of verbal and quantitative reasoning mostly required for admissions to undergraduate programs in U. S. colleges.</li>
                                        <li>GRE- The Graduate Record Examination (GRE) is a computer or paper-based test that is used to evaluate graduate school applicants. The GRE has sections consisting of questions based on Verbal Reasoning, Quantitative Reasoning, and Analytical Writing ability.</li>
                                        <li>GMAT- The Graduate Management Admissions Test is a test that many English-speaking business schools require applicants to take. The GMAT has three different sections: Essays, Quantitative, and Verbal.</li>
                                        <li>PTE- The Pearson Tests of English is a computer-based academic English language test. It also has sections that test Reading, Writing, Listening and Speaking ability. This test also has a written paper and an interview.</li>

                                    </ul>
                                    <h4>Every Need Taken Care Of</h4>

                                    <p>At Rozgar, we realise that all these tests may be a little overwhelming for students who have no idea about all these requirements for studying abroad. But there is nothing to worry about, as we have the best mentors and teachers who will not only help you with preparing for these tests, but also with choosing and knowing the test that you have to appear in, completing the formalities regarding the test, and ultimately with getting the best scores in any test that you appear in.</p>
                                    <p>Our mentors and teachers have the knowledge and the expertise of the paper pattern of these tests, as well as the know-how of how to deal with interviews and tricky sections of these tests like the Speaking tests in IELTS or TOEFL, where you not only need to be fluent in English, but also have to be audible and comprehensible. Our well-trained staff will guide you so you never feel underconfident or overwhelmed by these tests. So leave it to us to prepare you for all these tests!</p>

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
