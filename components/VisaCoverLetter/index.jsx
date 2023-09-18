import React, { Component } from 'react'
import constant from '../../constant'
import StudyAbroadRightSection from 'components/StudyAbroad/StudyAbroadRightSection'
import WhatWeOfferSection from 'components/StudyAbroad/WhatWeOfferSection'
import Img from 'src/assets/images/studyabrod-bg.jpg'


export default class VisaCoverLetter extends Component {
  render() {
    let rozgar_job_loc_search ={ 

        backgroundImage: `url('${Img.src}')`,
        
        }
    return (
        <main id="rg-main" className="rg-haslayout pt-0">
        <div className='breadcrumb-banner-area studyabrodbg' style={
            rozgar_job_loc_search 
           }>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='breadcrumb-text'>
                            <h1 className='text-center'>Cover Letter for Visa Application</h1>
                            <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                        
                                        <li><a href=''>Cover Letter for Visa Application</a></li>
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
                            <h4>Get Cover Letter For Your Visa Application From Rozgar</h4>
                            <p>A cover letter can be taken as an integral and vital part of your Visa application process, no matter what country you are traveling to. Its importance can be judged through the fact that a Visa application is incomplete without a proper and compelling cover letter.</p>
                            <p>Let’s get a deeper knowledge of what exactly is a cover letter for visa application? What significance does it hold? How to write a cover letter? And what are the best service providers for cover letter writing ?</p>
                            <h4>Cover Letter For Visa Application</h4>
                            <p>A Cover Letter complements your Visa application in a way that it clearly presents and describes the purpose of your visit to the officials of the country you are willing to go. Without a cover letter, your Visa application lacks purpose and the chances of its rejection are higher.</p>
                            <p>You write the Cover Letter for your Visa application addressed to the embassy of the Nation which basically states your purpose of visit and duration.</p>
                            <h4>How Important Is A Cover Letter For Your Visa Application?</h4>
                            <p>As already told, the cover letter clarifies your purpose of visit to the foreign embassy or consulate. Now, there are a number of purposes for which someone may need to visit a foreign country. Someone might need to visit Italy for education or someone may want to visit Australia or someone may be traveling to other country for some medical aid.</p>
                            <p>Depending on the purpose, the body issuing the cover letter for Visa also differs. The cover letter for student visa application may be written by the student himself or his study overseas consultant, cover letter for some medical treatment is issued by the concerned hospital whereas a cover letter for a business trip Visa application is issued by the MNC for their employees.</p>
                            <p>A cover letter adds weight to your Visa application by providing a solid reason supporting your visit. And the foreign nation permits you to enter their country, by providing you the Visa, only after they find the purpose of visit genuine and supported by relevant evidences.</p>
                            <h4>How To Write A Cover Letter?</h4>
                           <p>In order to get your Visa application cleared in the very first go, you need to have good consideration over a few things.</p>
                           <p>1. The purpose of your visit should be solid and presented in an effective way.</p>
                           <p>2. The cover letter must not be too stretched. It’s usually a one to two page long document and should contain only the relevant information.</p>
                           <p>3. It should have all the relevant documents of proof attested with it. For example, if you’re submitting the application for higher studies, you should attach your certificates and degree with the cover letter and Visa application.</p>
                           <p>4. Good grammar, punctuation and effective writing are a must when it comes to writing any professional or formal document.</p>
                           <p>Now, let’s see what should be the structure of a detailed cover letter for Visa. You should start the cover letter with addressing the embassy along with their address and date of submission. This forms the introduction part of your cover letter.</p>
                           <p>Now comes the main body or the descriptive part of your cover letter. This part is further divided into two sections. The first section is a formal writing in which you describe your purpose of visit in a highly professional manner. Mentioning the dates or duration of stay is a crucial step to take care of. And after that, in the second section, you are supposed to breakdown your stay into small fragments, thus, elaborating your complete stay in a tabular manner.</p>
                           <p>And, you can conclude the letter with a final note of the importance of the foreign visit and your name and address.</p>
                           <p>This is the most basic structure of a cover letter for Visa application which you should follow. The structure must be similar but the language and use of words should be effective and not too jargonized in the same time.</p>
                            <h4>Cover Letter For Student Visa Application</h4>

                            <p>One of the most frequent domains where having a good cover letter is highly imperative is in the student Visa application. Every year thousands of students from India apply for their studies in foreign Universities and a few unfortunate of those get rejected only because of an unimpressive cover letter.</p>
                            <p>But, you don’t need to worry about your student Visa application cover letter as long as Rozgar is there to assist you. We have our tie-ups in several reputed institutes across the globe. For the last whole decade, we have helped thousands of students get through their Visa application and interview through our excellent team of writers who prepare the best of cover letters for your Visa application.</p>
                            <p>Although, majority of our cover letter writing is occupied for student’s Visa application, we do not follow the standardized approach; we collect every individual’s data separately and curate a personal cover letter for him. This provides exclusivity to each and every student and thus, a touch of uniqueness to their Visa application.</p>
                            <p>Italy is one of the most preferred educational destinations for majority Indian students. The reason is the advancement of teaching methods and advent of practical knowledge in Italy. That’s why a great number of Indian students apply for their student Visa in Italian embassies.</p>
                            <p>Rozgar has good connections with some of the top institutes in Rome, Milan and other Italian cities. You may freely contact us for student Visa application cover letter for Italy as well, through our website.</p>
                            <p>For any other queries, submit your details on our website and get free expert guidance on the topic of foreign education.</p>

                        </div>

                    </div>
                    {<StudyAbroadRightSection/>}
                </div>
            </div>
        </section>
        {<WhatWeOfferSection/>}
    </main>
    )
  }
}
