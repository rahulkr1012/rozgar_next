import React, { Component } from 'react'
import constant from '../../constant'
import StudyAbroadRightSection from 'components/StudyAbroad/StudyAbroadRightSection'
import StudyInDestinationsCountry from 'components/StudyAbroad/StudyDestinationCountry'
import Img from 'src/assets/images/studyabrod-bg.jpg'

export default class ResumeWritingServices extends Component {
  render() {
    let rozgar_job_loc_search ={ 

        backgroundImage: `url('${Img.src}')`,
        
        }
    return (
      <React.Fragment>
        <main id="rg-main" className="rg-haslayout pt-0">
           <div className='breadcrumb-banner-area studyabrodbg' style={
            rozgar_job_loc_search 
           }>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Professional Resume Writing Services</h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>
                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Services</a></li>
                                      
                                        <li><a href=''>Professional Resume Writing Services</a></li>
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
                                <h4>Best Resume Writing Service In India</h4>
                                <p>Have you ever wondered how companies sort out just a handful of candidates from lakhs of applications, even before a personal interview or call discussion? The answer is a good Resume and CV.</p>
                                <p>A well-written and informative resume acts as the best medium through which you can highlight your whole professional and academic career, so as to make a good impression on the employer. So, let’s dig deeper into what is a Resume? What is a CV? How to write an effective resume and the best resume writing services in India?</p>
                                <h4>What Exactly Is A Resume?</h4>
                                <p>A resume is a one or hardly two page long professional and formal document that contains only the key points and highlights of one’s qualifications and achievements throughout his/her career. The job seeker has to submit his resume to the company along with all his academic certificates and qualification documents.</p>
                                <p>You don’t need to elaborate each and every aspect of your career in your resume, you should mention or highlight only those qualities which help in making you suitable for the given job and thus, making you stands out of the crowd. For ex., if you are applying for the role of a business manager then you should mention those skills in your resume which depict your managing qualities and behavior.</p>
                                <h4>What Is A CV And How Does It Differ From A Resume ?</h4>
                                <p>CV is the abbreviation to the Latin word Curriculum Vitae which basically means ‘The Course of Life’. As the name clearly suggests, you’ve to include all the milestones of your professional journey in your CV. It is usually two to four pages long, depending on the length of your career. A fresher might lack experience and thus, carry a shorter CV whereas a professional job seeker must have some good years of experience and have a relatively longer CV.</p>
                                <p>Now, you might be thinking what exactly is the difference both these professional documents? If you summarize in the simplest words, then ‘A resume acts as an introduction to your CV’. You mention only your relevant skills and qualifications in your resume whereas your CV contains all of your academic achievements till date. Thus, a CV needs to be updated for every new job and MUST be customized accordingly.</p>
                                <p>The key difference is that a resume is a compulsory submission and every company, whether technical, non-technical or research based, will definitely ask for your resume to get a glance on your qualifications and achievements. But, a CV is mostly required for those positions where experience is a critical and vital requirement for the employer and thus, you need to mention your professional career in an elaborative way in your CV. Research based jobs, PhD programs, teaching positions etcetera need a CV to look into your skills as well as past experiences.</p>
                                <h4>Resume Writing Services</h4>
                              
                                <p>Now, it should be clear to you that your resume is the first interaction with the employer and he/she can clearly judge you on its basis. Thus, it becomes highly imperative for you to have a sound, effective and to the point resume.</p>
                                <p>Getting through the resume shortlisting is a tough task to accomplish in itself. You might also think that it’s a game of luck to get your resume selected. It’s completely false. The resume selectors in these companies have years of experience of hiring people and know what qualities or skills are required by them and thus, they select only the best candidates for further rounds.</p>

                                <p>And this is the exact reason why you should have the best resume writing service in India to assist you with your resume writing. Rozgar provide the best professional resume writing services in India to help you get selected in your dream company. With years of experience in the field, our resume writing services have got thousands of job seekers their dream job through our excellent services.</p>
                                <h4>Best CV Writing Service In India</h4>
                                <p>Describing your job experience to the employer is as important as telling your academic qualifications to him and thus, a CV carries equal importance as a resume. It gives a more detailed sight to your professional career and gives you an upper edge over the fresher in the field.</p>
                                <p>Your CV is a clear depiction that along with theoretical and formal education, you carry a good professional experience as well. And to showcase your experience in an attractive and detailed manner, it is necessary to have the best CV writing service by your side.</p>
                                <p>Rozgar is there to help you build an impressive and effective CV using their CV writing service. Your years of experience and training in a particular field will go all in vein if you are not able to present it to the employer in a concise way through your CV. And that’s what Rozgar is very well known for.</p>
                               


                                <h4>How Rozgar Support You Shine In The Crowd?</h4>
                               
                                <p>Your resume or CV must follow a proper format, as it is professional and formal document, and must contain all the bullet points through which your contact information, expertise, qualifications, qualities etcetera are depicted.</p>
                                <p>Your resume must contain your Name, Contact Information, Your education in chronological order, Awards, Achievements, Your motivation to serve the company etcetera.</p>
                                <p>And the CV should be able to brief these points out along with the motive of describing your professional career.</p>
                                <p>Now, having all this information and format with you is a different thing and presenting them in a structured manner through your resume or CV is a whole new skilled task to finish. And Rozgar is always there to do the job for you.</p>
                                <p>You can freely visit our website to contact us and find resume writing services near you. With our offices in cities like Delhi, Gurgaon, Kolkata, Jaipur and Lucknow, we are now a nationally recognized name and will surely help you get your dream job in your dream company.</p>
                               
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
}
