import React from 'react'
import constant from 'constant'
import sinUniversity1 from 'src/assets/images/sin-university1.jpg'
import sinUniversity2 from 'src/assets/images/sin-university2.jpg'
import sinUniversity3 from 'src/assets/images/sin-university3.jpg'
import sinUniversity4 from 'src/assets/images/sin-university4.jpg'
import sinUniversity5 from 'src/assets/images/sin-university5.jpg'
import sinUniversity6 from 'src/assets/images/sin-university6.jpg'
import sinUniversity7 from 'src/assets/images/sin-university7.jpg'
import sinUniversity8 from 'src/assets/images/sin-university8.jpg'
import sinUniversity9 from 'src/assets/images/sin-university9.jpg'
import sinUniversity10 from 'src/assets/images/sin-university10.jpg'
import StudyAbroadDestinationSetion from './StudyAbroadDestinationSetion'
import WhatWeOfferSection from './WhatWeOfferSection'
import Image from 'next/image'
export default function StudyInSingapore() {
    return (
        <React.Fragment>
            <main id="rg-main" className="rg-haslayout pt-0">
                <div className='breadcrumb-banner-area singapore-bg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Study in Singapore </h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>

                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Study in Singapore </a></li>
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
                                    <h4>Study in Singapore </h4>
                                    <p>Singapore is made up of one main island with 63 surrounding isels , and the main island having total area of 682 sq km. There are 4 official languages in Singapore i.e Malays, Mandarin , Tamil & English  . Now in the 21st century , education has become more critical in shaping country’s future where the knowledge – based eaconomy plays a vital role in global community . In Singapore Society , education has always been the key in the growth and development of society particulary when it became the independent republic. Education has become the most important factor towards shaping the country’s future . As we all know for every individual through education his/her full potential can benefit the community , nation and lead a fulfilling life .</p>
                                    <p>Currency : The Currency of Singapore is Singapore Dollars.</p>
                                    <h4>Why study in Singapore</h4>

                                    <p>Singapore Education is driven by excellence where institutions offer a broad-based curriculum and global perspective to equip the students with their relevant qualifications and training them to succeed in a competitive environment. Studying in Singapore is a good platform for a brighter future. Hence, educational institutions here offer the latest and best educational tools and  technology. Singapore is a small island with tropical and pleasant weather throughout the year .Studying in Singapore is a wonderful experience.</p>
                                    <p>Accommodation in Singapore is offered with a wide variety which suits according to different needs and budgets .) There are home stays, flats, landed property.</p>
                                    <p>Home stay : Families in Singapore open up their homes to students and welcome them as part of the family</p>
                                    <p>Boarding House : Good lodging service providing single or shared accommodation with room cleaning, meals, laundry and monthly outdoor activities.</p>
                                    <p>Hub for Educational Excellence- Singapore, a Global Schoolhouse Over the years, Singapore has evolved from its traditional British-based education system to one that endeavors to meet the needs of individuals and seeks to nurture talents. </p>
                                    <h4>University/College list</h4>
                                    <ul className='study-list-bx'>

                                        <li>S P Jain School of Global Management</li>
                                        <li>SIM Global Education, Singapore</li>
                                        <li>Curtin University of Technology, Singapore</li>
                                        <li>James Cook University</li>
                                        <li>PSB Academy</li>
                                        <li>Raffles Design Institute, Singapore</li>
                                        <li>East Asia Institute of Management, Singapore</li>
                                        <li>Kaplan Higher Education Academy</li>
                                        <li>Nanyang Institute of Management</li>
                                        <li>Amity Global Business School</li>
                                        <li>Dimension International College</li>
                                        <li>London School of Business &amp; Finance</li>

                                    </ul>



                                </div>

                            </div>
                            {<StudyAbroadDestinationSetion />}
                        </div>

                    </div>
                </section>
                {<WhatWeOfferSection />}
                <section className='top-colleges-countary-section'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='colleges-countary-box'>
                                    <h4>Top Colleges in Study in Singapore</h4>
                                    <div className='Marquee-countary'>
                                        <div className='Marquee-content'>
                                            <div className='Marquee-tag'><Image src={sinUniversity1} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity2} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity3} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity4} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity5} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity6} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity7} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity8} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity9} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={sinUniversity10} alt='Image' /></div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>)
}
