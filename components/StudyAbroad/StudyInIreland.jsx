import React from 'react'
import canUniversity1 from 'src/assets/images/can-university1.jpg'
import canUniversity2 from 'src/assets/images/can-university2.jpg'
import canUniversity3 from 'src/assets/images/can-university3.jpg'
import canUniversity4 from 'src/assets/images/can-university4.jpg'
import canUniversity5 from 'src/assets/images/can-university5.jpg'
import canUniversity6 from 'src/assets/images/can-university6.jpg'
import canUniversity7 from 'src/assets/images/can-university7.jpg'
import canUniversity8 from 'src/assets/images/can-university8.jpg'
import canUniversity9 from 'src/assets/images/can-university9.jpg'
import canUniversity10 from 'src/assets/images/can-university10.jpg'
import StudyAbroadDestinationSetion from './StudyAbroadDestinationSetion'
import WhatWeOfferSection from './WhatWeOfferSection'
import constant from 'constant'
import Image from 'next/image'
export default function StudyInIreland() {
    return (
        <React.Fragment>
            <main id="rg-main" className="rg-haslayout pt-0">
                <div className='breadcrumb-banner-area ireland-bg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='breadcrumb-text'>
                                    <h1 className='text-center'>Study In Ireland</h1>
                                    <ol className='breadcrumb-list-bx'>
                                        <li><a href={constant.component.homepage.url}>Home</a></li>

                                        <li><a href={constant.component.studyAbroad.url}>Study Abroad</a></li>
                                        <li><a href=''>Study In Ireland</a></li>
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
                                    <h4>Study In Ireland</h4>
                                    <p>Ireland is a sovereign country on the island of Ireland, with its neighbour Northern Ireland being a part of the United Kingdom. Ireland is among the top ten wealthiest countries in the world in terms of GDP per capita. It is also the tenth most prosperous country in the world and the third most developed country in the world by the United Nations Human Development Index. It is therefore a small but a successful country.</p>

                                    <p>A large number of Indian students study in Ireland. Study in Ireland for Indian students is therefore a highly enjoyable and exciting experience. The Ireland education system can go a long way to turning your life into a success story. The efficiency of the education system in Ireland is evident from the fact that 37 percent of Ireland's population has a university or college degree, which is among the highest percentages in the world. For international students, Ireland education system is particularly welcoming because of the affordable and top-quality services provided. Studying in Ireland is therefore a great career choice to make.</p>
                                    <h4>Why Study In Ireland?</h4>
                                    <p>Ireland is one of the most educated countries in the world. Studying in Ireland has another incentive- it is not very expensive. Ireland also invests heavily in its education sector. Besides, another one of the many benefits of studying in Ireland is the fact that as a service based economy with a well performing economy, there are plenty of jobs in the country. Irelanders or the Irish, as the people of Ireland are known, are also very friendly and welcoming.</p>
                                    <h4>Popular Cities To Study In Ireland</h4>
                                    <p>The universities in Ireland are known for their high academic standards. The people and the cities in Ireland are also known for their beauty and historic significance. The top universities in Ireland offer excellent education and cater to a large number of students from all over the world.</p>
                                    <ol className='orderlist-box'>
                                        <li>Dublin - It is the capital and the largest city in Ireland and is one of the most historically significant places in Europe. It was inhabited in the 7th century AD and is now listed among the top 30 cities of the world. It is a beautiful city and has some of the best universities in Ireland which include the Trinity College Dublin, University College Dublin and Dublin City University.</li>
                                        <li>Limerick- It is a beautiful city in the province of Munster. It is home to a prestigious university called the Limerick Institute of Technology.</li>
                                        <li>Cork- It is the second largest city in Ireland and has a rich historic past. Top universities in Cork include University College Cork and Cork Institute of Technology.</li>
                                        <li>Galway- - It is another historic city in Ireland and is known for its intelligentsia and for its numerous festivals. It has a diverse cultural heritage, and has excellent universities like National University of Ireland and GMIT.</li>
                                        <li>Waterford- It is the oldest city in Ireland and is the centre of Ireland arts and crafts industry. The city is also home to one of the premier universities in Ireland- the Waterford Institute of Technology.</li>
                                    </ol>
                                    <h4>Student Visa Ireland Requirements</h4>
                                    <p>Ireland student visa is of two- C and D study visa. The kind that you require will depend on the type of study you are planning to undertake and the duration of the study. As an Indian student, the most commonly required Ireland study visa is the D Study visa.</p>
                                    <p>The applications cost of an Ireland student visa comes to around 30,000 rupees.</p>
                                    <p>Before applying for studies in Ireland, you should apply for and obtain a good scale in IELTS which are English language exams. You should also check the respective institutional website for other eligibility related information.</p>
                                    <h4>Scholarship In Ireland For Indian Students</h4>
                                    <p>A large number of universities in Ireland are publicly funded, so the cost of studying is quite affordable. But foreign education can still be expensive, and the expenses can be taken care of by the many scholarships to study in Ireland. Some of these are the Walsh Fellowship The Government of Ireland International Education Scholarship and Government of Ireland Postgraduate Scholarship. For information on independent bodies providing scholarships in Ireland, visit the individual university websites.</p>
                                    <h4>Jobs After Studying In Ireland</h4>

                                    <p>Ireland is a small country. But the economy of the country is in excellent shape and demand for jobs is high. This makes it easy to find and secure jobs in Ireland. Applying for an Ireland work visa is also easy. You can apply for an Ireland post study work visa on this website</p>
                                    <h4>How Much Does It Cost To Study In Ireland?</h4>
                                    <p>Ireland is part of the EU, so its currency is the Euro. The cost of study in Ireland for Indian students varies- for an undergraduate program it is €9,850 to €25,500 annually, for postgraduate master's degree it is €9,500 to €34,500 annually and for doctoral degree it is €9,500 to €34,500 annually . Visit the institution website for further information. Average annual cost of living in Ireland comes to about 70,000 rupees.</p>


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
                                    <h4>Top Colleges in Ireland</h4>
                                    <div className='Marquee-countary'>
                                        <div className='Marquee-content'>
                                            <div className='Marquee-tag'><Image src={canUniversity1} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity2} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity3} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity4} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity5} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity6} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity7} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity8} alt='Image' /></div>
                                            <div className='Marquee-tag'><Image src={canUniversity9} alt='Image' /></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}
