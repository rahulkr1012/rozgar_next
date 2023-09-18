import React, { Component } from 'react'
import bannerpic from '@/assets/images/careerExplorerBanner.png';
import addbanner from '@/assets/images/adds-011.jpg';
import addFbanner from '@/assets/images/fresher-jobs-ads.jpg';

import constant from 'constant';
import ModalWindow from '../../components/StudentsExplorer/StudentsExplorerModal'
import { getCollegeList } from '@/action/CandidateAction';
import Pagination from 'react-js-pagination'
import collegeImage from '@/assets/images/collegeImage.jpeg'
import collegeIcon from '@/assets/images/collegeIcon.jpeg'
import Shimmer from '../common/Shimmer';
import CollegeListLoader from 'components/common/CollegeList/Loader'
import { AddBannerAnalytics, PersonalRecruiterEnquiry, selectCountry } from '@/action/jobsByActions';
import swal from 'sweetalert';
import { onChange } from '@/utils';
import noRecordImg from '@/assets/images/no-results.png'
import studentBanner from 'src/assets/images/studentexporer-banner.jpg'
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"
import Link from 'next/link';
import Image from 'next/image';



const images = [
    `${process.env.NEXT_PUBLIC_BASE_URL}/college/logo/1665644639116.jpg`,
    studentBanner,
];

export default class StudentsExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ShowApplyNowPopUp: false,
            dataList: [],
            currentPage: 1,
            count: 0,
            pageNumber: 1,
            keyword: '',
            showLoader: false,
            showShimmer: true,
            showData: {},
            firstName: { name: 'firstName', value: '', error: '', isRequired: true },
            lastName: { name: 'lastName', value: '', error: '', isRequired: true },
            email: { name: 'email', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            city: { name: 'city', value: '', error: '', isRequired: true },
            course: { name: 'course', value: '', error: '', isRequired: true },
            error: {},
            open: false,
            photoIndex: 0,
            location:'',
            count:0
        }
    }
    BannerCilck = (e,item,type) => {
        const model = {
          BANNER_ID:e.BANNER_ID,
          BANNER_CLICKS:type,
          LONGT: item.longitude,
          LATT:item.latitude,
          IP_ADDRRESS:item.IPv4,
          CITY:item.city
        };  
        AddBannerAnalytics(model)
            .then((res) => {
              if (res.status) {
                // swal({
                //   icon: "success",
                //   text: "Banner track Successfully",
                //   timer: 2000,
                //   showCancelButton: false,
                //   showConfirmButton: false,
                // });
              } else {
                alert(res.error);
              }
            })
            .catch((err) => {
              alert(err);
            });
      };

    handlePageChange = (pageNumber) => {
        this.setState({ pageNumber: pageNumber })
        this.getCollegeLists(pageNumber)
        window.scrollTo(0, 0)
    }

    componentDidMount() {
        this.getCollegeLists(this.state.pageNumber)
        selectCountry().then((res) => {
            this.setState({location:res})
          })
    }

    onhideModal = () => {
        this.setState({ ShowApplyNowPopUp: false })
    }


    getCollegeLists = (pageNumber) => {
        this.setState({ showShimmer: true })

        getCollegeList(pageNumber, this.state.keyword).then((res) => {
            this.setState({ showShimmer: true })

            if (res.status) {
                setTimeout(() => {
                    this.setState({ showShimmer: false })
                }, 1000)
                this.setState({ dataList: res.result.list, count: res.result.count })
            }
            else {
                alert(res.error)
            }
        }).catch((err) => {
            alert(err)
        })
    }

    searchList = () => {
        this.getCollegeLists(this.state.pageNumber)
    }

    topscroll = () => {
        window.scroll(0, 0)
    }

    handleMorColleges = () => {
        console.log(window.location.reload())
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        onChange(this, name, value)
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
        let status = this.validateform()
        const { COLLEGE_ID } = this.state.dataList[0]
        if (status) {
            const { firstName, lastName, email, mobile, course } = this.state
            const model = {
                NAME: firstName.value,
                LASTNAME: lastName.value,
                EMAIL: email.value,
                CONTACT_NUMBER: mobile.value,
                COURSE: course.value,
                TYPES: 'College carrer',
                COLLEGE_ID: COLLEGE_ID
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
    
     
    bgStyle = {
           backgroundImage: `url(${studentBanner.src})`,
        }



    
    render() {
        const { ShowApplyNowPopUp, dataList, showData, firstName, lastName, mobile, email, course, city, open, photoIndex,location,count } = this.state
        return (
            <React.Fragment>
                {open && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ open: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length
                            })
                        }
                    />
                )}
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <section className='studetsexplorer  -type-5'
                         style={this.bgStyle}
                     >
                        <div className='container'>
                            <div className='row items-center'>
                                <div className='col-lg-4 text-center'><Image className='col-banerimg' src={bannerpic} width={100} height={80} />
                                </div>
                                <div className='col-lg-8'>
                                    <div className='contentarea'>
                                        <h1>Career Explorer</h1>
                                        <h2>Be inspired, College, educated, and inspired to your personalised career.</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-12 mt-3'>
                                    <ul className='breadsitemap'>
                                        <li><Link href={constant.component.homepage.url}>Home</Link></li>
                                        <li>Career Explorer</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='colstu-searcharea'>
                                        <div class="wrap-search">
                                            <div class="searchcol">
                                                <input type="text" onChange={(e) => { this.setState({ keyword: e.target.value }) }} onKeyDown={(e) => {
                                                    if (e.key == 'Enter') {
                                                        this.searchList()
                                                    }
                                                }} class="searchTerm" placeholder="Search colleges by name and location..." />
                                                <button class="searchButton" type='submit' onClick={(e) => {
                                                    e.preventDefault()
                                                    this.searchList()
                                                }}>
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 text-center'>
                                    {this.props.BannerSkill.map((item)=>{
                                        if(item&&item.POSITION=="TOP"){
                                            return(
                                                <Link onClick={(e)=>this.BannerCilck(item,location,count+1)} target='_blank' href={item.LINK}>
                                                <Image className='img-responsiveadd' 
                                                src={`${"https://s3rozgar.s3.ap-south-1.amazonaws.com/component/page_header/images/"}${item&&item.BANNER_FILE}`} 
                                                 width={1000} height={1000}/></Link>

                                            )
                                        }
                                    })}
                                   
                                </div>
                            </div>
                          
                                {  this.state.showShimmer?  <CollegeListLoader/> :
                            <div className='row'>
                            
                            {       
                          
                                                dataList && dataList.map((item, index) => {
                                    return (
                                        <>
                                            < div className='col-md-6' key={index}>
                                                <div className='college-area'>
                                                                                  
                                                        <div className='d-flex college-area-item'>
                                                            <div className='collegeimg'>
                                                                <div className='h-100'>
                                                                    <div className='imgarea'>
                                                                        <Image className='imgmain' src={!item.ENTITY_MAIN_IMAGE ? collegeImage : (`${process.env.NEXT_PUBLIC_BASE_URL}/college/logo/${item.ENTITY_MAIN_IMAGE}`)} width={100} height={80} />
                                                                        <div className='img-overlay'></div>
                                                                        <div className='justify-content-between'>
                                                                            <div className='d-flex'>
                                                                                <a onClick={() => this.setState({ open: true })} className='data-icon'><i class="fa fa-picture-o"></i> 2</a>
                                                                                <a href='' className='data-icon'><i class="fa fa-play"></i> 0</a>
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
                                                                                        <Link href={constant.component.CareerExplorerDetail.url.replace(':url', item.ENTITY_ALIAS)} onClick={this.topscroll} className='clg-logo'>
                                                                                            <img className='col-logo' src={!item.ENTITY_LOGO ? collegeIcon : (` ${process.env.NEXT_PUBLIC_BASE_URL}/college/logo/${item.ENTITY_LOGO}`)} />
                                                                                        </Link>
                                                                                        <div className='clg-name-address' style={{ textTransform: 'uppercase', width: '100%' }}>
                                                                                            <Link href={constant.component.CareerExplorerDetail.url.replace(':url', item.ENTITY_ALIAS)}>{item.ENTITY_NAME}, <span style={{ textTransform: "uppercase" }}>{item.STATE_NAME}</span></Link>
                                                                                            <div className='locationarea'>
                                                                                                <span className='pr-1 location'>{item.ENTITY_LOCALITY}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <ul className='p-0 list-unstyled w-100 d-flex overflow-hidden'>
                                                                                        <li className='lr w-auto'>
                                                                                            <a className='pointer'>
                                                                                                <span class="d-block font-weight-bold pricecolor"> NA </span>
                                                                                                <span class="d-block col-text-size"> NA - first year fees</span>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className='lr w-auto'>
                                                                                            <a className='pointer'>
                                                                                                <span class="d-block font-weight-bold pricecolor">-</span>
                                                                                                <span class="d-block col-text-size">Exam accepted</span>
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className='lr w-auto'>
                                                                                            <a className='pointer'>
                                                                                                <span class="d-block font-weight-bold pricecolor">{item.NAAC}</span>
                                                                                                <span class="d-block col-text-size">Global rating</span>
                                                                                            </a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className='cta-wrapper d-flex flex-column' style={{ cursor: "pointer" }}>
                                                                                <a href='javascript:void(0)'
                                                                                    className='col-apply' onClick={() => {
                                                                                        this.setState({ showData: item })
                                                                                        this.setState({ ShowApplyNowPopUp: !ShowApplyNowPopUp })
                                                                                    }}>Apply Now</a>
                                                                            </div>
                                                                        </div>
                                                                        <div className='coladdfee w-100 d-flex align-items-center pt-3'>
                                                                            <Link href={constant.component.CareerExplorerDetail.url.replace(':url', item.ENTITY_ALIAS)} onClick={this.topscroll}><i class="lnr lnr-graduation-hat font-16"></i>{item.ENTITYTYPE_NAME ? `${item.ENTITYTYPE_NAME.slice(0, 1)}${item.ENTITYTYPE_NAME.slice(1, item.ENTITYTYPE_NAME.length).toLowerCase()}` : null}</Link>
                                                                            <Link href={constant.component.CareerExplorerDetail.url.replace(':url', item.ENTITY_ALIAS)} onClick={this.topscroll}><i class="lnr lnr-map-marker"></i> {item.STATE_NAME}</Link>
                                                                            <Link href={constant.component.CareerExplorerDetail.url.replace(':url', item.ENTITY_ALIAS)} onClick={this.topscroll}><i class="lnr lnr-briefcase"></i> Courses & Fees</Link>

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
                                                                                <a class="rg-btnlike rg-btnliked" href="javascript:void(0);"><i class="fa fa-heart-o"></i></a>
                                                                            </div> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                </div>


                                            </div>
                                            </>
                                                        )
                                })}
                            </div>}
                            {dataList.length == 0 && this.state.showShimmer == false && <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                <img src={noRecordImg}></img>
                                <h4>We could not find colleges matching your search criteria.</h4>
                                <h6>Did you enter wrong spelling of any word?</h6>
                                <Link href={constant.component.StudentsExplorer.url} onClick={this.handleMorColleges} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Colleges</span></Link>
                            </div>}
                            <div className='row'>
                                <div className='col-md-12'>
                                    <nav className="rg-pagination">
                                          
                                     <ul>
                                            <Pagination

                                          
                                                activePage={this.state.pageNumber}
                                                itemsCountPerPage={10}
                                                totalItemsCount={this.state.count}
                                                pageRangeDisplayed={4}
                                                onChange={this.handlePageChange}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </section>
                </main>
                {
                    ShowApplyNowPopUp && <ModalWindow toggleModal={this.onhideModal}>
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
                                        <div className='colregisternow'>Register Now To Apply</div>
                                        <div className='d-flex pb-2'>
                                            <div className='Unlogo'>
                                                <img className='col-logo' src={collegeIcon} />
                                            </div>
                                            <div className='untext'>
                                                {showData.ENTITY_NAME}, {showData.STATE_NAME}
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
            </React.Fragment >
        )
    }
}
