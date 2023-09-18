import React, { Component } from 'react'
import constant from 'constant'
import collegeImage from 'src/assets/images/JNU-Img.jpg'
import collegeIcon from 'src/assets/images/collegeIcon.jpeg'
import ModalWindow from '../../components/CareerExplorer/StudentExplorerModal'
import Shimmer from 'components/common/Shimmer'
import { onChange } from 'src/utils'
import Pic from 'src/assets/images/university.png'
import { PersonalRecruiterEnquiry } from 'src/action/jobsByActions';
import swal from 'sweetalert'
import addbanner from 'src/assets/images/adds-011.jpg';
import addFbanner from 'src/assets/images/fresher-jobs-ads.jpg';
import addscollege from 'src/assets/images/ads-college.jpg';
import CareerEnquiry from './CareerEnquiry'
import studentBanner from 'src/assets/images/studentexporer-banner.jpg'
import Parser from 'html-react-parser';
import CourseSummary from "src/assets/images/courseSummary.jpg"
import nl2br from 'react-nl2br'
import Link from 'next/link';
import Image from 'next/image'

export default class CareerExplorerDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ShowApplyNowPopUp: false,
      showData: {},
      showModal: false,
      firstName: { name: 'firstName', value: '', error: '', isRequired: true },
      lastName: { name: 'lastName', value: '', error: '', isRequired: true },
      email: { name: 'email', value: '', error: '', isRequired: true },
      mobile: { name: 'mobile', value: '', error: '', isRequired: true },
      city: { name: 'city', value: '', error: '', isRequired: true },
      course: { name: 'course', value: '', error: '', isRequired: true },
      error: {},
      ShowBrochure: false

    }
  }

  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    onChange(this, name, value,()=>{
    })
  }

  validateform = () => {
    let data = this.state
    let error = {}
    let isValid = true
    if (!data['firstName'].value) {
      let firstName = data['firstName']
      firstName.error = "Please Enter first name"
      isValid = false
      this.setState({
        firstName: firstName
      })
    }
    if (!data['lastName'].value) {
      let lastName = data['lastName']
      lastName.error = "Please Enter last name"
      isValid = false
      this.setState({
        lastName: lastName
      })
    }
    if (!data['email'].value) {
      let email = data['email']
      email.error = "Please Enter Email"
      isValid = false
      this.setState({
        email: email
      })
    }
    if (data['email'].value) {
      let re = /\S+@\S+\.\S+/
      if (re.test(data['email'].value)) { } else {
        let email = data['email']
        email.error = "Please Enter Valid Email"
        isValid = false
        this.setState({
          email: email
        })
      }
    }
    if (!data['mobile'].value) {
      let mobile = data['mobile']
      mobile.error = "Please Enter Mobile"
      isValid = false
      this.setState({
        mobile: mobile
      })
    }

    if (data["mobile"] != "") {
      const regexExp = /^[6789][0-9]{9}/
      if (regexExp.test(data.mobile.value)) { } else {
        let mobile = data['mobile']
        mobile.error = "Please Enter Valid Mobile Number";
        isValid = false;
      }
    }
    if (!data['city'].value) {
      let city = data['city']
      city.error = "Please Enter city"
      isValid = false
      this.setState({
        city: city
      })
    }
    if (!data['course'].value) {
      let course = data['course']
      course.error = "Please Enter course"
      isValid = false
      this.setState({
        course: course
      })
    }

    this.setState({ error: error })
    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { COLLEGE_ID } = this.props.detailList[0]
    let status = this.validateform()
    if (status) {
      const { firstName, lastName, email, mobile, course } = this.state
      const model = {
        NAME: firstName.value,
        LASTNAME: lastName.value,
        EMAIL: email.value,
        CONTACT_NUMBER: mobile.value,
        COURSE: course.value,
        TYPES: 'College carrer',
        COLLEGE_ID: COLLEGE_ID,

      }
      PersonalRecruiterEnquiry(model).then((res) => {
        if (res.status) {
          swal({
            icon: 'success',
            text: res.result.message,
            timer: 5000,
            showCancelButton: false,
            showConfirmButton: false,
          })
          window.location.reload()
        }
        else {
          swal({
            icon: 'error',
            text: res.error,
            timer: 5000,
            showCancelButton: false,
            showConfirmButton: false,
          })
        }
      }).catch((err) => {
        alert(err)
      })
    }
  }

  onhideModal = () => {
    this.setState({ ShowApplyNowPopUp: false })
  }

  onhideEnquiryModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const unismallpic = { width: '50px' }
    const { firstName, lastName, email, city, course, mobile, showData, ShowApplyNowPopUp, showModal } = this.state
    const { courseList, similarListData, detailList } = this.props
    return (
      <main id="rg-main" className="rg-main rg-haslayout pt-0">

        
        {this.props.detailList && this.props.detailList.map((item, index) => {
          return (
            <>
             
              < section className='studetsexplorer  -type-5' 

            //   style={{
            //       backgroundImage: `url(${!item.ENTITY_MAIN_IMAGE ? studentBanner :(` ${'http://localhost:5022'}/college/logo/${item.ENTITY_MAIN_IMAGE}`) }   )    `
            //      }}
              >
           
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-9'>
                      <div className='contentlistarea'>
                        <div className='onecolldetailbox'>
                          <div className='onecollogo'>

                            {/* <Image width={60} height={60} className='col-logo-md' alt="idk" src={!item.ENTITY_LOGO ? collegeIcon : (`http://localhost:5022/college/logo/${item.ENTITY_LOGO}`)} /> */}

                          </div>
                          <div className='onecolname'>
                            <h2 style={{ fontSize: "32px" }}>{item.ENTITY_NAME}, {item.ENTITY_LOCALITY}</h2>
                            <ul className='breadteam'>
                              <li><i class="lnr lnr-map-marker"></i> {item.STATE_NAME}</li>
                              <li><i class="lnr lnr-pushpin"></i> Estd {item.ENTITY_ESTD}</li>
                              <li><i class="lnr lnr-star"></i> {item.ENTITYTYPE_NAME ? `${item.ENTITYTYPE_NAME.slice(0, 1)}${item.ENTITYTYPE_NAME.slice(1, item.ENTITYTYPE_NAME.length).toLowerCase()}` : null}</li>
                              <li><i class="lnr lnr-pushpin"></i> {item.NAAC == "-" ? "NA" : item.NAAC}</li>
                              {
                                item.ACCREDIATION == null ? null :
                                  <li><i class="lnr lnr-bookmark"></i> {item.ACCREDIATION.map((item) => {
                                    return (
                                      item.ACCREDIATION_TITLE
                                    )
                                  }).join(', ')}</li>
                              }
                              {
                                item.AFFILIATION == null ? null :
                                  <li><i class="lnr lnr-bookmark"></i> {item.AFFILIATION.map((item) => {
                                    return (
                                      item.AFFILIATION_TITLE
                                    )
                                  }).join(', ')}</li>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3'>
                      <div className='contentlistarea'>
                        <div className='collegecontact'>
                          <Link href='javascript:void(0);' onClick={() => {
                            this.setState({ showData: item })
                            this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                          }}
                          >Apply Now</Link>
                          <Link href='javascript:void(0);' onClick={() => {
                            this.setState({ showData: item })
                            this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                          }}>Get contact details</Link>
                        </div>
                        <div className='claim-college' onClick={() => {
                          // this.setState({ showData: item })
                          this.setState({ showModal: !showModal })
                        }}>
                          <Link href='javascript:void(0);'><i class="lnr lnr-arrow-right"></i> Claim this college</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="header-sec-link"></div> */}
              </section>
            </>
          )
        })
        }

        {
          this.props.detailList && this.props.detailList.map((item, index) => {
            return (
              <>
                <section className='bg-gray'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12 mt-3'>
                        <ul className='breadsitemap'>
                          <li><Link href={constant.component.homepage.url}>Home</Link></li>
                          <li><Link href={constant.component.StudentsExplorer.url}>Career Explorer</Link></li>
                          <li>{`${item.ENTITYTYPE_NAME.slice(0, 1).toUpperCase()}${item.ENTITYTYPE_NAME.slice(1,).toLowerCase()}`}</li>
                          <li>{item.ENTITY_NAME}</li>
                        </ul>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12 text-right'>
                        <div className='aboutuniversityhead'>
                          <h1>About the {item.ENTITYTYPE_NAME ? `${item.ENTITYTYPE_NAME.slice(0, 1)}${item.ENTITYTYPE_NAME.slice(1, item.ENTITYTYPE_NAME.length).toLowerCase()}` : null}</h1>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      {/* <div className='col-md-4'>
                        <div className='univesitypic'>
                          <Image src={!item.ENTITY_MAIN_IMAGE ? collegeImage : (` https://rozgar.s3.ap-south-1.amazonaws.com/college/${item.ENTITY_MAIN_IMAGE}`)} style={{ width: "100%", height: "300px", objectFit: 'cover' }} />
                        </div>
                      </div> */}
                      <div className='col-md-8'>
                        <div className='aboutunivesitycon'>
                          <p>{item.ENTITY_DETAILS ? nl2br(item.ENTITY_DETAILS) : "Not Avaliable"}</p>
                          {/* <p>JNU campus is a microcosm of the Indian nation, drawing students from every nook and corner of the country and from every group and stratum of society. To make sure that this is so, annual admission tests are simultaneously held at centres in various parts of the country (and at one centre abroad in Kathmandu, Nepal) and special care is taken to draw students from the underprivileged castes and ethnic groups. International students form nearly 15% per cent of the annual intake and as of now come from approx. 30 - 35 countries across the continents.</p> */}
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='college-btn-apply'>
                          <div className='college-tow-btn-applybox'>
                            <Link className='apply-btn-mail' href='javascript:void(0);' onClick={() => {
                              this.setState({ showData: item })
                              this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                              this.setState({ header: 'Register Now To Apply' })
                            }}><span>Apply Now</span>
                              <i class="lnr lnr-envelope font-16"></i>
                            </Link>
                          </div>
                          <div className='college-tow-btn-dbbox'>
                            <Link className='download-btn-bro' href='javascript:void(0);'
                              onClick={() => {
                                this.setState({ showData: item })
                                this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                                this.setState({ header: 'Register Now To Download College Details' })
                              }}
                            ><span>Download Brochure</span>
                              <i class="ti-download font-16"></i>

                            </Link>
                          </div>
                          <div className='btn-askaquestion-box'>
                            <Image width={60} height={60} alt="idk"   src={Pic} style={unismallpic} />
                            <div className='coll-inter-text'>interested in this College ?</div>
                            <Link className='btn-askaquestion'  href='javascript:void(0);' onClick={() => {
                              this.setState({ showData: item })
                              this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                              this.setState({ header: 'Register Now To Consult A Counsellor' })
                            }}> Ask a Question
                              <i class="lnr lnr-users font-16"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )
          })
        }
        <section>
          <div className='container pt-4'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <Link target='_blank' href="https://www.mounttalent.com/"><Image className='img-responsive' src={addFbanner}  alt="idk"  /></Link>
              </div>
            </div>
          </div>
        </section>

        {
          this.props.detailList && this.props.detailList.map((item, index) => {
            return (
              <>
                <section className='aboutuniversityvideo' style={item.ENTITY_VIDEO == null ? { display: 'none' } : { display: 'block' }}>
                  <div className='container'>
                    <div className='row'>
                      {item?.ENTITY_VIDEO?.split('=').length > 1 &&
                        <div className='col-md-12'>
                          {<iframe width="100%" height="450"
                            frameborder="0" allowfullscreen
                            src={`https://www.youtube.com/embed/${item?.ENTITY_VIDEO.split('=')[1]}`}
                            title={item?.ENTITY_NAME}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          > </iframe>}
                        </div>
                      }
                    </div>
                  </div>
                </section>
              </>
            )
          })
        }

        {
          this.props.detailList && this.props.detailList.map((item, index) => {
            return (
              <>
                <section className='subcoursesarea'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12 text-center'>
                        <h4 className='submainhead' style={item.ENTITY_VIDEO == null ? { marginTop: '20px' } : { marginTop: '0' }}>Summary of Courses</h4>
                        <p className='submaintitle'>{item.ENTITY_NAME}</p>
                      </div>
                    </div>
                    <div className='row'>
                      {courseList.length > 0 ? courseList.map((item) => (
                        <div className='col-md-3'>
                          <div className='subcoursebox'>
                            <div className='subhead' style={{ height: "70px" }}>
                              <Link href="#" title={item.COURSE_TITLE}>
                                <h4>{item.COURSE_TITLE?.length > 47 ? Parser(item.COURSE_TITLE.slice(0, 47)) + '...' : Parser(item.COURSE_TITLE)}</h4>
                              </Link>
                            </div>
                            <div className='subname' style={{ height: "186px" }}>
                              <div className='annualfee'>Annual Fee:</div>
                              <div className='feerupees'>Rs. {item.COURSE_FEE_TOTAL}</div>
                              <div className='elitext'>Eligability:</div>
                              <div className='dugreetext' style={{ height: '5%' }}>
                                {
                                  item.COURSE_ELIGIBILITY_QUALIFICATION == '-' ? 'NA' : `${item.COURSE_ELIGIBILITY_QUALIFICATION} with ${item.COURSE_ELIGIBILITY_MARK}`
                                }
                                {/* {item.COURSE_ELIGIBILITY_QUALIFICATION} with {item.COURSE_ELIGIBILITY_MARK?.length > 40 ? Parser(item.COURSE_ELIGIBILITY_MARK.slice(0, 40)) + '...' : Parser(item.COURSE_ELIGIBILITY_MARK)}
                                {item.COURSE_ELIGIBILITY_MARK?.length > 40 && <Link style={{ cursor: "pointer" }} title={`${item.COURSE_ELIGIBILITY_QUALIFICATION} with ${item.COURSE_ELIGIBILITY_MARK}`}>read more</Link>} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontWeight: 'lighter', fontSize: '1.2em' }}>
                        <Image width={60} height={60} src={CourseSummary}   alt="idk"  />
                        <p style={{ color: 'rgb(230, 74, 74)' }}>Courses Updation in Progress.Check back soon. </p>
                      </div>
                      }
                    </div>
                  </div>
                </section>
              </>
            )
          })
        }

        <section>
          <div className='container pb-4'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <Link target='_blank' href="https://www.mounttalent.com/"><Image   alt="idk"  className='img-responsive' src={addscollege} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* <section className='facilityarea bg-gray'>
          <div class="ptf-spacer"></div>
          <div class="container">
            <div class="ptf-animated-block aos-init aos-animate pb-2" data-aos="fade" data-aos-delay="0">
              <h2 class="h1 has-secondary-font fw-normal text-center mb-0" style={{ fontSize: "32px" }}>Facilities</h2>
              <p className='text-center font-16'>Enjoy our onsite facilities</p>
            </div>
            <div class="ptf-spacer"></div>
            <div class="row">
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="0">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={labImage} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Computer Labs</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="100">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={sportsImage} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Sports Complex</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="200">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={gymImage} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Gym</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="300">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={medicalImage} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Medical</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="400">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={cafeIcon} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Cafeteria</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="500">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={laboratoryIcon} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Laboratory</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="500">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={libIcon} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Library</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3 col-lg-3">
                <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="500">
                  <div class="ptf-advantage-box">
                    <div class="ptf-advantage-box__content">
                      <div class="ptf-advantage-box__image">
                        <Image src={hostel} alt="Figma" loading="lazy" /></div>
                      <div class="ptf-advantage-box__value">Hostel</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ptf-spacer"></div>
        </section> */}


        {
          this.props.detailList && this.props.detailList.map((item) => {
            return (
              <>
                {
                  item.FACILITY == null ? '' :
                    <section className='facilityarea' >
                      <div class="ptf-spacer"></div>
                      <div class="container">
                        <div class="ptf-animated-block aos-init aos-animate pb-2" data-aos="fade" data-aos-delay="0">
                          <h2 class="h1 has-secondary-font fw-normal text-center mb-0" style={{ fontSize: "32px" }}>Facilities</h2>
                          <p className='text-center font-16'>Enjoy our onsite facilities</p>
                        </div>
                        <div class="ptf-spacer"></div>
                        <div class="row">
                          {
                            item.FACILITY.map((item) => {
                              return (
                                <>
                                  <div class="col-6 col-md-3 col-lg-3">
                                    <div class="ptf-animated-block aos-init aos-animate" data-aos="fade" data-aos-delay="0">
                                      <div class="ptf-advantage-box">
                                        <div class="ptf-advantage-box__content">
                                          <div class="ptf-advantage-box__image">
                                            <Image src={item.FACILITY_ICON} alt={item.FACILITY_TITLE} width={60} height={60}  /></div>
                                          <div class="ptf-advantage-box__value">{item.FACILITY_TITLE}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            })
                          }

                        </div>
                      </div>
                      <div class="ptf-spacer"></div>
                    </section>
                }

              </>
            )
          })
        }
        <section>
          <div className='container pt-4'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <Link target='_blank' href="https://www.mounttalent.com/"><Image width={60} height={60} className='img-responsive' src={addbanner}  alt="addbanner"   /></Link>
              </div>
            </div>
          </div>
        </section>


        {
          this.props.detailList && this.props.detailList.map((item, index) => {
            return (
              <>
                <section className='allcoldateevent'>
                  <div className='container'>
                    <div className='row mb-5'>
                      <div className='col-md-8 align-items-center'>
                        <span className='eventresult pb-4'>{item.ENTITY_NAME} <span>- Events</span></span>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <ul className='eventhead'>
                          <li style={{ width: '10%' }}>Serial No.</li>
                          <li>Event Name</li>
                          <li>Date</li>
                          <li>Time</li>
                        </ul>
                        {/* <ul className='eventheadtwo'>
                          <li style={{ width: '10%' }}>1</li>
                          <li>BHU UET Result</li>
                          <li>Aut 24 - Sep 25, 2022</li>
                          <li>10AM to 2PM</li>
                        </ul>
                        <ul className='eventheadthree'>
                          <li style={{ width: '10%' }}>2</li>
                          <li>MBA and MBA-IB Registration Begins</li>
                          <li>Aut 12 - Sep 12, 2022</li>
                          <li>10AM to 2PM</li>
                        </ul>
                        <ul className='eventheadtwo'>
                          <li style={{ width: '10%' }}>3</li>
                          <li>Entrance Exam for Ph.D./M.Phil.</li>
                          <li>Aut 20 - Sep 23, 2022</li>
                          <li>9AM to 4PM</li>
                        </ul>
                        <ul className='eventheadthree'>
                          <li style={{ width: '10%' }}>4</li>
                          <li>M.Com. Admission Dates</li>
                          <li>Aut 20 - Sep 23, 2022</li>
                          <li>9AM to 4PM</li>
                        </ul> */}

                        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'lighter', fontSize: '1.2em', color: '#e64a4a', margin: '1em 0' }}>Event Updation in Progress. Check back soon.</div>

                      </div>

                    </div>
                  </div>
                </section>
              </>
            )
          })
        }

        <section>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='studentshead pt-5'>
                  <h1>Popular Colleges</h1>
                </div>
              </div>
            </div>
            <div className='row'>
              {similarListData?.map((item, index) => {
                return (
                  <>
                    < div className='col-md-6'>
                      <div className='college-area'>
                        {this.props.showShimmer ? <Shimmer /> :
                          <div className='d-flex'>
                            <div className='collegeimg'>
                              <div className='h-100'>
                                <div className='imgarea'>
                                  {/* <Image width={60} height={60} alt="ENTITY_MAIN_IMAGE" className='imgmain' src={item.ENTITY_MAIN_IMAGE ? (` ${process.env.NEXT_PUBLIC_BASE_URL}/college/logo/${item.ENTITY_MAIN_IMAGE}`) : collegeImage} style={{ height: '200px' }} /> */}
                                  <div className='img-overlay'></div>
                                  <div className='justify-content-between'>
                                    <div className='d-flex'>
                                      <Link href="#" className='data-icon'><i class="fa fa-picture-o"></i> 0</Link>
                                      <Link href="#" className='data-icon'><i class="fa fa-play"></i> 0</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='flex-fill'>
                              <div className='jsx-college college-info d-flex flex-column h-100'>
                                <div className=''>
                                  <div className='d-flex'>
                                    <div className='listing-block-clg-info flex-fill'>
                                      <div className='bottom-block w-100 position-relative'>
                                        <div className='clg-head d-flex align-items-start mb-2'>
                                          <Link href="#" className='clg-logo'>
                                            {/* <Image width={60} height={60} alt="idk" className='col-logo' src={!item.ENTITY_LOGO ? collegeIcon : (` ${process.env.NEXT_PUBLIC_BASE_URL}/college/logo/${item.ENTITY_LOGO}`)} /> */}
                                          </Link>
                                          <div className='clg-name-address' style={{ textTransform: 'uppercase' }}>
                                             link 
                                            <Link href='/college-details/[url]' as={"/college-details/" + item.ENTITY_ALIAS }  passHref> {item.ENTITY_NAME}, <span>{item.ENTITY_REGION}  </span>  </Link>
                                            <div className='locationarea'>
                                              <span className='pr-1 location'>{item.ENTITY_LOCALITY}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className='p-0 list-unstyled w-100 d-flex overflow-hidden'>
                                          <li className='lr w-auto'>
                                            <Link href="#" className='pointer'>
                                              <span class="d-block font-weight-bold pricecolor">NA</span>
                                              <span class="d-block col-text-size">NA - first year fees</span>
                                            </Link>
                                          </li>
                                          <li className='lr w-auto'>
                                            <Link href="#"  className='pointer'>
                                              <span class="d-block font-weight-bold pricecolor">-</span>
                                              <span class="d-block col-text-size">Exam accepted</span>
                                            </Link>
                                          </li>
                                          <li className='lr w-auto'>
                                            <Link href="#"  className='pointer'>
                                              <span class="d-block font-weight-bold pricecolor">{item.NAAC == "-" ? 'NA' : item.NAAC}</span>
                                              <span class="d-block col-text-size">Global rating</span>
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className='cta-wrapper d-flex flex-column'>
                                      <Link href="#"  className='col-apply' style={{ cursor: 'pointer' }} onClick={() => {
                                        this.setState({ showData: item })
                                        this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })

                                      }}>Apply Now</Link>
                                    </div>
                                  </div>
                                  <div className='coladdfee w-100 d-flex align-items-center pt-3'>
                                    <Link href="#"><i class="lnr lnr-graduation-hat font-16"></i> {item.ENTITYTYPE_NAME ? `${item.ENTITYTYPE_NAME.slice(0, 1)}${item.ENTITYTYPE_NAME.slice(1, item.ENTITYTYPE_NAME.length).toLowerCase()}` : null}</Link>
                                    <Link href="#"><i class="lnr lnr-map-marker"></i> {item.ENTITY_REGION}</Link>
                                    <Link href="#"><i class="lnr lnr-briefcase"></i> Courses & Fees</Link>
                                  </div>
                                  <div class="jsx-2158881826 media-rank d-flex justify-content-between mt-15">
                                    <div class="jsx-2158881826">
                                      <span class="facilities-svg spirit-image2 svg-20 icon Comp Labs" title="Comp Labs"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Sports" title="Sports">
                                      </span><span class="facilities-svg spirit-image2 svg-20 icon Gym" title="Gym"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Medical" title="Medical"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Cafeteria" title="Cafeteria"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Library" title="Library"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Auditorium" title="Auditorium"></span>
                                      <span class="facilities-svg spirit-image2 svg-20 icon Hostel" title="Hostel"></span>
                                    </div>
                                    {/* <div className='rg-jobapplybtnlike'>
                                      <Link class="rg-btnlike rg-btnliked" href="javascript:void(0);"><i class="fa fa-heart-o"></i></Link>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>}
                      </div>
                    </div>
                  </>
                )
              })
              }

            </div>
            <div style={{ textAlign: 'right' }}>
              <Link href={constant.component.StudentsExplorer.url} style={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '16px',
                padding: '6px',
                fontWeight: '600'
              }}>View all</Link>
            </div>
          </div>
        </section>
        {
          ShowApplyNowPopUp && <ModalWindow toggleModal={this.onhideModal}
          >
            <div id='applycolnow' className='d-flex'>
              <div className='contentapplybox'>
                <h1>How Rozgar helps you in Admission</h1>
                <ul>
                  <li>Brochure Details</li>
                  <li>Check Detailed Fees</li>
                  <li>Shortlist & Apply</li>
                  <li>24/7 Counselling</li>
                  <li>Scholarships</li>
                  <li>Application Deadlines</li>
                </ul>
              </div>
              <div className='applyboxform'>
                <form>
                  <div class="form-group logotextbg">
                    <div className='colregisternow'>{this.state.header}</div>
                    <div className='d-flex pb-2'>
                      <div className='Unlogo'>
                        <Image width={60} height={60} className='col-logo' alt="idk"  src={collegeIcon} />
                      </div>
                      <div className='untext'>
                        {showData.ENTITY_NAME}, {showData.ENTITY_REGION}
                        <span className='font-12'>{showData.ENTITY_LOCALITY}</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <input type="text"
                          class="form-control"
                          name={firstName.name}
                          value={firstName.value}
                          onChange={this.handleChange}
                          placeholder="First Name *"
                        />
                        {firstName.error.length > 0 && !firstName.value && <span className='text-danger ml-1'>{firstName.error}</span>}
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name *"
                          name={lastName.name}
                          value={lastName.value}
                          onChange={this.handleChange}
                        />
                        {lastName.error.length > 0 && !lastName.value && <span className='text-danger ml-1'>{lastName.error}</span>}
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email Address *"
                          name={email.name}
                          value={email.value}
                          onChange={this.handleChange}
                        />
                        {email.error.length > 0 && !email.value && <span className='text-danger ml-1'>{email.error}</span>}
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Mobile Number *"
                          name={mobile.name}
                          // value={mobile.value}
                          maxLength={10}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              const regexExp = /^[6789][0-9]{9}/
                              if (regexExp.test(e.target.value)) {
                                let mobile = this.state.mobile
                                mobile.value = e.target.value
                                this.setState({ mobile: mobile });
                              } else {
                                let mobile = this.state.mobile
                                mobile.value = ''
                                this.setState({ mobile: mobile });
                              }
                            }
                          }
                          }
                        />
                        {mobile.error.length > 0 && !mobile.value && <span className='text-danger ml-1'>{mobile.error}</span>}
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="City You Live In *"
                          name={city.name}
                          value={city.value}
                          onChange={this.handleChange}
                        />
                        {city.error.length > 0 && !city.value && <span className='text-danger ml-1'>{city.error}</span>}
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Course Intrested In *"
                          name={course.name}
                          value={course.value}
                          onChange={this.handleChange}
                        />
                        {course.error.length > 0 && !course.value && <span className='text-danger ml-1'>{course.error}</span>}
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-right">
                    <button class="conapplynow" onClick={(e) => { this.onSubmit(e) }}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </ModalWindow>
        }
         
        {
          showModal && <ModalWindow toggleModal={this.onhideEnquiryModal}
            title={`${this.props.detailList[0].ENTITY_NAME} - Claim this college`}>
            <CareerEnquiry
              data={this.props.detailList}
              Heading={this.state.heading}
            />
          </ModalWindow>
        }
      </main >

    )
  }
}
