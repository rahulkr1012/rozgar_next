import React from 'react'
import Link from 'next/link'
import constant from 'constant'
import Image from 'next/image'
import { Accordion } from 'react-bootstrap'
import Parser from "html-react-parser"
 

function index(props) {
      const { details , qaFAQList , courseDetail  }  = props 
      
       
  return (
    <React.Fragment>


    <div className="rg-breadcrumbarea">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <ol className="rg-breadcrumb">
                        <li><Link href={constant.component.homepage.url}>Home</Link></li>
                        <li>Learning Hub</li>
                        <li>Programming Courses</li>
                        <li>{details?.COURSE_TITLE}</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section className="rg-haslayout rg-sectionspace">
        <div className="container">
            <div className="row">
                <div className='col-md-4'>
                     {details && <div className='rozgarlarninghead'>
                        <div className='learningjava'>

                            <Image src={`${details?.COURSE_IMAGE}`} alt="something" height={60} width={"1000"} />
                        </div>
                        <p className='course-title-bx'>{details?.COURSE_SHORT_TITLE}</p>
                        <div className='feebox'>
                            <span className='feetext' style={{ fontSize: "18px" }}>Fee :</span> <span style={{ fontSize: "16px" }}><i class="fa fa-inr" aria-hidden="true"></i> {details?.COURSE_FEE}</span>
                        </div>


                        <h4>Course eligibility</h4>
                        <ul className='couserlist'>
                            <li>{details?.ELIGIBILITY}</li>
                            {/* <li>Prior exposure to object-oriented programming concepts is not required, but beneficial</li> */}
                        </ul>
                        <div className='buynowbtn'>
                            <Link target="_blank" href={details != undefined ? constant.component.buyCourse.url.replace(':url', details.URL.includes(' ') ? details.URL.split(' ').join('-') : details.URL) : constant.component.buyCourse.url}>Buy Now</Link>
                        </div>
                    </div>
                    } 
                 
                </div>
                <div className='col-md-8'>
                    <div className='rozgarlarning'>

                        <p className='course-title-bx'>{details?.COURSE_SHORT_TITLE}</p>



                        <p>{details?.COURSE_DESCRIPTION}</p>
                        <div class="rg-rozgarlarning">
                            <ul>
                                <li><em className='certificatbtn'>Certification</em></li>


                                <li><i className='lnr lnr-laptop' style={{ marginRight: "4px" }}></i>{details?.MODE_OF_TRANING}</li>




                                <li><i className='lnr lnr-laptop' style={{ marginRight: "4px" }}></i>{details?.COURSE_DURATION}</li>


                                <li><i className='lnr lnr-laptop' style={{ marginRight: "4px" }}></i>{details?.SKILL_LEVEL}</li>

                            </ul>
                        </div>

                        <div className='learninghubtab'>
                            <ul>
                                <li className='active' ><a href=''>Highlights</a></li>
                                <li onClick={e => document.getElementById('ovr').scrollIntoView()} >  <Link  href="/" >Overview  </Link>  </li>
                                <li onClick={e => document.getElementById('curriculam').scrollIntoView()} >  <Link href="/"  >Curriculam  </Link> </li>
                                <li onClick={e => document.getElementById('courseProv').scrollIntoView()} >  <Link  href="/" >Course Provider </Link></li>
                                <li><a href=''>Ratings & Reviews</a></li>
                                <li onClick={e => document.getElementById('FAQ').scrollIntoView()} >  <Link  href="/" >FAQs</Link></li>
                            </ul>
                        </div>

                        <div className='hilightaera'>
                            <h4>Course Highlights</h4>
                            <ul>
                                <span> {details?.KEY_HIGHLIGHT && Parser(details?.KEY_HIGHLIGHT)}</span>
                            </ul>
                        </div>

                        <div className='Overviewarea' id="ovr" >
                            <h4>Overview</h4>
                            <h5>Who should do this course?</h5>


                            <ul>
                                {/* <li>This course is designed for professionals aspiring to become:</li> */}
                                <span>{details?.COURSE_OVERVIEW}</span>
                                {/* <li>Programmers</li>
                                <li>Web Developers</li>
                                <li>Web Designers</li>
                                <li>Programming Hobbyists</li>
                                <li>Database Administrators</li>
                                <li>Youngsters who want to kick-start their career are the key beneficiaries of this course</li> */}
                            </ul>


                            {/* <h5 className='mt-4'>What are the course deliverables?</h5>
                            <ul>
                                <li>During the Java course, you will be trained by our expert instructors to:</li>
                                <li>Develop the code with various Java data types, conditions, and loops</li>
                                <li>Implement arrays, functions and string handling techniques Understand object-oriented programming through Java using Classes, Objects and various Java concepts like Abstract, Final etc.</li>
                                <li>Implement multi-threading and exception handling Use parse XML files using DOM and SAX in Java</li>
                                <li>Write a code in JDBC to communicate with Database</li>
                                <li>Develop web applications and JSP pages</li>
                                <li>Interact with the database using hibernate framework</li>
                                <li>Write code with spring framework components like Dependency Injection and Auto Wiring</li>
                                <li>Implement SOA using web services</li>
                            </ul> */}

                            {/* <h5 className='mt-4'>More about this course</h5>
                            <ul>
                                <li>Advanced Java Certification Training is designed for students and professionals who want to be a Java Developer</li>
                                <li>This training encompasses comprehensive knowledge on basic and advanced concepts of core Java & J2EE along with popular frameworks like Hibernate, Spring, & SOA</li>
                                <li>In this course, you will gain expertise in concepts like Java Array, Java OOPs, Java Function, Java Loops, Java Collections, Java Thread, Java Servlet, and Web Services using industry use-cases</li>
                            </ul> */}

                            {/* <h5 className='mt-4'>Course Eligibility</h5>
                            <ul>
                                <li>There is no pre-requisite for this course</li>
                                <li>Prior exposure to object-oriented programming concepts is not required, but beneficial</li>
                            </ul> */}
                        </div>

                        <div className='course-curriculum' id="curriculam">
                            <h4>Course Curriculum</h4>
                            <ul>


                                {courseDetail && courseDetail.length > 0 ? courseDetail.map((item, index) => {
                                    return (

                                        <li>{item.CONTENT_TITLE}</li>
                                    )
                                }) : ""
                                }                                            {/* <li>Data Handling and Functions</li>
                                <li>Object Oriented Programming in Java</li>
                                <li>Packages and Multi Threading</li>
                                <li>Java Collections</li> */}
                            </ul>
                        </div>

                        <div className='course-provider' id="courseProv">
                            <h4>About Course Provider</h4>
                            <h6>About Pentagon</h6>
                            <p>Pentagon Space would be the focal point for the people who want to master the future with niche technologies and the clients who are in search of resources can be deployed from the first day of work.</p>

                            <h4>Courses Offered in</h4>
                            <ul className='courselist'>
                                <li><a href=''>Cloud Technologies</a></li>
                                <li><a href=''>Data Science Basics</a></li>
                                <li><a href=''>QA and Testing</a></li>
                                <li><a href=''>Web Development</a></li>
                                <li><a href=''>Machine Learning</a></li>
                            </ul>
                        </div>

                        <div className='learningfaqs' id="FAQ">
                            <h3>Frequently Asked Questions</h3>

                            {qaFAQList && qaFAQList.length > 0 ? qaFAQList.map((item, index) => {
                                return (
                                    <Accordion defaultActiveKey="1">
                                        <Accordion.Item eventKey="0">

                                            <Accordion.Header>{item.QUESTION}</Accordion.Header>
                                            <Accordion.Body>
                                                <p>{item.ANSWER}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                )
                            }) : ""
                            }
                            {/* <Accordion.Item eventKey="1">
                                    <Accordion.Header>Is this course provided by Rozgar Learning?</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Naukri Learning simply lists the course details. The course is provided by the course provider as mentioned on the page.</p>
                                    </Accordion.Body>
                                </Accordion.Item> */}
                            {/* <Accordion.Item eventKey="2">
                                    <Accordion.Header>What is Rozgar Learning?</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Naukri Learning is an online platform dedicated to providing information and reviews of best online upskilling courses and certifications. We have collected top courses for top skills to help you find the best courses for your career. To start these courses, you'll have to visit the course provider's website.</p>
                                    </Accordion.Body>
                                </Accordion.Item> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</React.Fragment>

  )
}

export default index
