import React, { Component } from 'react'
import constant from 'constant'
import { courseList } from '@/action/CandidateAction'
import { getCandidateDetail } from '@/action/CandidateAction'
import { getProfilePic } from '@/action/CandidateAction'
import { getGlobalSetting } from '@/action/dashboard'
import { deleteCookie, getCookie } from 'cookies-next'
import LoadingOverlay from 'react-loading-overlay'
import { SpinnerCircular } from 'spinners-react'
import Image from 'next/image'
import logo from 'src/assets/images/logo.png'
import Link from 'next/link'
import {  withRouter } from 'next/router'

export default withRouter(class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
            token: getCookie(constant.keys.ctoken),
            data: undefined,
            MasterData: undefined,
            getFile: undefined,
            candidateDetail: {},
            logoutStatus: false

        }
    }

    componentDidMount() {
        this.state.detail && this.getCandidateDetail()
        this.state.detail && this.onGetFileChange()
        courseList().then((res) => {
            if (res.status) {
                this.setState({ data: res.result })
            }
        })

        getGlobalSetting().then(res => {
            if (res.status) {
                this.setState({ MasterData: res.result })
            }
            else {
                console.log(res.error)
            }
        })
    }


    onGetFileChange = () => {
        const { token } = this.state
        getProfilePic({ CANDIDATE_ID: '' }, token).then((res) => {
            this.setState({ getFile: res.result })
        })
    }

    getCandidateDetail = () => {
        const { token } = this.state
        getCandidateDetail({ CANDIDATE_ID: '' }, token).then((res) => {
            if (res.status) {
                this.setState({
                    candidateDetail: res.result
                })
            }
        });
    }


    removeCookie = () => {

        this.setState({
            ...this.state, logoutStatus: true
        })

        deleteCookie(constant.keys.ctoken);
        deleteCookie(constant.keys.cd)
        window.location.href = '/'

    }


    render() {
        const { MasterData, getFile, candidateDetail, logoutStatus } = this.state
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ''

       

        return (
            <React.Fragment>


                {logoutStatus &&
                    <div style={{
                        position: "fixed",
                        zIndex: "999",
                        left: "0",
                        top: " 0",
                        width: " 100%",
                        height: " 100%",
                        overflow: "auto",
                        padding: "210px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}>
                        <LoadingOverlay
                            active={true}
                            spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay>
                    </div>
                }

                <header id="rg-header" className="rg-header rg-haslayout" style={{ overflowX: "clip" }}>
                    <div className="rg-navigationlogoarea">
                        <div className='top-menu top-menu-new '
                            style={{
                                backgroundImage: `url('https://s3rozgar.s3.ap-south-1.amazonaws.com/assets/images/top-had-img')`,
                                backgroundRepeat: 'repeat-x',
                                backgroundSize: 'cover',
                            }}>
                            <div className='container'>
                                <div className='col-md-12 text-right pr-0'>
                                    <ul>
                                        <li><i className='lnr lnr-phone-handset'></i> {MasterData ? MasterData.PHONE_NUMBER : ""}</li>
                                        <li><i className='lnr lnr-envelope'></i> {MasterData ? MasterData.EMAIL_ID : ""}</li>
                                        <li className='socialmediaicon'>
                                            <Link href={MasterData ? MasterData.TWITTER_URL : ""} target='_blank' >   <i className='fa fa-twitter'></i> </Link>
                                            <Link target='_blank' href={MasterData ? MasterData.FACEBOOK_URL : ""} >   <i className='fa fa-facebook'></i>  </Link>
                                            <Link target='_blank' href={MasterData ? MasterData.YOUTUBE_URL : ""} > <i className='fa fa-youtube'></i> </Link>
                                            <Link target='_blank' href={MasterData ? MasterData.LINKEDIN_URL : ""} >  <i className='fa fa-linkedin'></i></Link>
                                            <a target='_blank' href={'https://www.instagram.com/rozgarofficial/'}><i className='fa fa-instagram'></i> </a>
                                        </li>
                                        <li><Link target='_blank' href={`https://wa.me/${MasterData ? MasterData.WHATSAPP_NUMBER : ""}?text=Please%20use%20the%20below%20number%20for%20Drop%20your%20CV%20feature.`} className="dropyourcv"> Drop your CV<i class="fa fa-whatsapp"></i> </Link> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <strong className="rg-logo"><Image src={logo} alt={constant.build.version}
                                        onClick={() => {
                                            window.location.href = "/"
                                        }}
                                        width={165}
                                        height={85}
                                        title={constant.build.version}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                    </strong>

                                    <div className="rg-rightarea" id="rg-nav-user">
                                        <nav id="rg-nav" className="rg-nav navbar-expand-lg navbar-toggleable-sm">
                                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                                <i className="lnr lnr-menu"></i>
                                            </button>
                                            <div className="collapse navbar-collapse rg-navigation" id="navbarNav">
                                                <ul>
                                                    <li className="menu-item-has-children page_item_has_children">
                                                        <Link href={constant.component.AllJobs.url}>Jobs</Link>
                                                        <div className="mega-menu c1">
                                                            <div className="mega-menu-row br-radiu-mega-menu">
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Explore jobs</li>
                                                                    <li><Link target='_blank' href={constant.component.jobsBySkill.url}>Jobs by skill</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.jobsByDesignation.url}>Jobs by designation</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.jobsByCompany.url}>Jobs by company</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.jobsByCategory.url}>Jobs by category</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.jobsByLocation.url}>Jobs by location</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.CreateJobAlert.url}>Create a Free Job Alert</Link> </li>

                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">

                                                                    <li className="menhead">Jobs in demand</li>
                                                                    <li><Link target='_blank' href={'/fresher-jobs'}>Fresher jobs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.RemoteJobs.url}>Remote jobs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.WorkFromHomeJobs.url}>Work from home jobs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.WalkInJobs.url}>Walk-in jobs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.PartTimeJobs.url}>Part-time jobs</Link></li>

                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">

                                                                    <li className="menhead">Video JDs</li>
                                                                    <li><Link target='_blank' href={constant.component.MostPopularVideoJdJob.url}>Most Popular</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.HotSectorVideoJdJob.url}>Hot Sectors</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.MostLikedVideoJdJob.url}>Most Liked</Link></li>

                                                                </ul>

                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Freshers jobs</li>
                                                                    <li><Link target='_blank' href={constant.component.latestfresherjob.url}>Latest fresher jobs</Link></li>
                                                                    <li><Link target='_blank' href='https://campus.rozgar.com/'>Students</Link></li>
                                                                    <li><Link target='_blank' href='https://campus.rozgar.com/'>Institution</Link></li>
                                                                    <li><Link href={constant.component.jobsByCompany.url}>Hiring Company</Link></li>
                                                                    <li><Link target='_blank' href='https://campus.rozgar.com/'>Internships</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="menu-item-has-children page_item_has_children">
                                                        <Link href={constant.component.companieslist.url}>Companies</Link>
                                                        <ul className="sub-menu">
                                                            <li><Link target='_blank' href={constant.component.companieslist.url}>Browse all companies</Link></li>
                                                            <li><Link target='_blank' href={constant.component.topcompanieslist.url}>Top companies</Link></li>
                                                            <li><Link target='_blank' href='https://recruit.rozgar.com/recruit/client-registration-form'>Register/Claim Company  </Link></li>

                                                        </ul>
                                                    </li>
                                                    <li className="menu-item-has-children page_item_has_children">
                                                        <a href="javascript:void(0);">Services</a>
                                                        <div className="mega-menu Sc2">
                                                            <div className="mega-menu-row br-radiu-mega-menu">
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Candidate Services</li>
                                                                    <li><Link target='_blank' href={constant.component.ResumeMaking.url}>Resume Making</Link></li>
                                                                    <li><Link target='_blank' href={
                                                                        constant.component.UpgradeSkills.url
                                                                    }>Upgrade Skills</Link></li>
                                                                    <li><Link target='_blank' href={{
                                                                        pathname: constant.component.studyAbroad.url
                                                                    }}>Study Abroad</Link></li>
                                                                    <li><Link target='_blank' href={
                                                                        constant.component.workabroad.url.replace(":Enquiry", 'work-abroad')
                                                                    }>Work Abroad</Link></li>
                                                                    <li><Link target='_blank' href={
                                                                        constant.component.StudentsExplorer.url.replace(":Enquiry", 'Career-explorer')
                                                                    }>Career Explorer</Link></li>
                                                                    <li><Link target='_blank' href={
                                                                        constant.component.careerAstrology.url.replace(":Enquiry", 'career-astrology')
                                                                    }>Career Astrology</Link></li>
                                                                    <li><Link target='_blank' href={
                                                                        constant.component.educationLoan.url.replace(":Enquiry", 'education-loan')
                                                                    }>Loans & Advances</Link></li>
                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Employer Services</li>
                                                                    <li><Link target='_blank' href={constant.component.CompanyBrandings.url}>Company Brandings</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.SponsoredJDs.url}>Sponsored JDs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.contracttualstaffing.url}>Contract Staffing's</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.hrmanagementsystem.url}>HRMS</Link></li>

                                                                    <li><Link target='_blank' href={constant.component.fulltimehiring.url}>Full Time Hiring's</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.HrTechnologySolutions.url}>HR Tech Solutions</Link></li>
                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Campus Services</li>
                                                                    <li><Link target='_blank' href="https://campus.rozgar.com/">Register University / Institution</Link></li>

                                                                    <li><Link target='_blank' href="https://campus.rozgar.com/">Campus Jobs</Link></li>
                                                                    <li><Link target='_blank' href={constant.component.blog.url}>Campus Update</Link></li>
                                                                    <li><Link target='_blank' href="https://campus.rozgar.com/">Internships</Link></li>
                                                                    <li><Link target='_blank' href="https://campus.rozgar.com/">Internal Exchange Programs</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>



                                                    {/* <li className="menu-item-has-children page_item_has_children">
                                                <a href="javascript:void(0);">Resources</a>
                                                <div className="mega-menu c2">
                                                    <div className="mega-menu-row br-radiu-mega-menu">
                                                        <ul className="mega-menu-col mega-menu-group">
                                                            <li className="menhead">Let's begin your search</li>
                                                            <li><Link href={
                                                                constant.component.AllJobs.url
                                                            }>Explore cities</Link></li>
                                                            <li><Link href={
                                                                constant.component.homepage.url
                                                            }>Smart search</Link></li>
                                                            <li><Link href={constant.component.discussionForum.url}>Discussion forum</Link></li>

                                                            
                                                        </ul>
                                                        <ul className="mega-menu-col mega-menu-group">
                                                            
                                                            <li className="menhead">Resource centre</li>
                                                            <li><Link target='_blank' href={constant.component.aboutUs.url}>About Us</Link></li>
                                                            <li><Link target='_blank' href={constant.component.blog.url}>Blog</Link></li>
                                                            <li><Link target='_blank' href={constant.component.faqs.url}>FAQs</Link></li>
                                                            <li><Link href={constant.component.interviewQuestion.url}>Interview questions</Link></li>

                                                        </ul>

                                                        <ul className="mega-menu-col mega-menu-group">
                                                            <li className="menhead">Learning Hub</li>

                                                            {/* constant.course_list.map((item, index) => {
                                                                return (
                                                                    <li key={index} ><a target="_blank" href={constant.component.courseDetailById.url.replace(':url/:COURSE_ID', item.URL + '/' + item.COURSE_ID)}>{item.COURSE_TITLE}</a></li>
                                                                )
                                                            })

                                                        </ul>
                                                    </div>
                                                </div>
                                                    </li> */}




                                                    <li className="menu-item-has-children mobhidearrow">
                                                        <a target='_blank' href={'https://recruit.rozgar.com/job-post'} className="fw-normal"><strong>Post a job</strong></a>
                                                    </li>
                                                    <li className='menu-item-has-children mobhidearrow'>
                                                        <a href={constant.component.coupon.url}>Rewards</a>
                                                    </li>

                                                    {/* <li className="menu-item-has-children prologinpd">
                                                        <Link className="loginhome" to={constant.component.logout.url}> Logout <i className="ti-power-off"></i></Link>
                                                    </li> */}

                                                    <li className="menu-item-has-children my-rozgar profileli page_item_has_children rg-web-dash-had">


                                                        <a href="javascript:void(0);" className="rg-menubar-ez">
                                                            <div className='profileheader'>

                                                                {getFile != undefined && getFile.PROFILE_IMAGE ?
                                                                    <Image
                                                                        height={1000}
                                                                        width={1000}
                                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${CANDIDATE_ID}/${getFile.PROFILE_IMAGE}`}
                                                                        alt="user profile pic " /> :
                                                                    <Image
                                                                        height={1000}
                                                                        width={1000}
                                                                        alt="default profile image "
                                                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA70lEQVR4nO3UQUrDQBSH8R8umqVdWrrWK+hJxEPYHsNuRPFAurR1ZfEAuinVlUUUXVYGJiCCdNJObCn54A8heeGbl8wbGjaUAn2M8BETrnvxWS10Mcb8j9zHmqwUC6Q/5Vk77ydIy5zmFN9VEA9zit8riENtNuYVs5aO37biH/fWtauLOKMpc9ySme4CeS0nV0krfsph3HAht/Fe9k4b/pUdHGGAGzzjK2aKa5zhMNauTAcXeKkwx2FR59hbRtjGFT6XOKfLhHcvsZsqPcDTCsLfecR+ivgho7TMOEU8rUE8SRGfYJZR+orjFHHDdvENyZP0ibBvoI8AAAAASUVORK5CYII=" />
                                                                }
                                                                <span className='profile-name'>{candidateDetail.FIRST_NAME} </span>
                                                                <i class="fas fa-chevron-down ml-2"></i>
                                                            </div>
                                                        </a>

                                                        <div className={"mega-menu c3"}>
                                                            <div className="mega-menu-row br-radiu-mega-menu rg-EmployeeHeaderHover">
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li><Link href={constant.component.myRozgar.url}> My Rozgar</Link></li>
                                                                    <li><Link href={constant.component.editProfile.url}>Edit Profile</Link></li>
                                                                    <li><Link href={constant.component.recommendedJobs.url}>Recommended Jobs</Link></li>
                                                                    <li><Link href={constant.component.ProfilePerformance.url}>Profile Performance</Link></li>
                                                                    <li><Link href={constant.component.InboxMessage.url}>Recruiter Messages</Link></li>
                                                                    <li><Link href={constant.component.applicationStatus.url}> Application Status </Link></li>
                                                                    <li><a href={constant.component.faqs.url}>Help & FAQs</a></li>
                                                                </ul>

                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li><Link href={constant.component.savedJobs.url}>Saved Jobs</Link></li>
                                                                    {/* <li><a href="#">Settings</a></li>
                                                                    <li><a href="#">Boost My Profile</a></li> */}
                                                                    <li><Link href={constant.component.changePassword.url}>Change Password</Link></li>
                                                                    {/* <li><a href={constant.component.coupon.url}>Rewards</a></li> */}
                                                                    <li><Link href={constant.component.premiumJobs.url}>Premium Jobs</Link></li>
                                                                    <li><Link href={constant.component.featuredJobs.url}>Featured Jobs</Link></li>
                                                                    <li><Link href={'javascript:void(0)'} onClick={this.removeCookie} > <a > </a>  Logout</Link> </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>


                                                    <li class="menu-item-has-children p-0">
                                                        <ul className='rg-langnotification m-0'>
                                                            <li className='notification-bar'>
                                                                <a class="rg-notification" href="javascript:void(0);">
                                                                    <span class="rg-notificationtag">05</span>
                                                                    <i class="lnr lnr-alarm"></i>
                                                                </a>
                                                                <ul class="rg-dropdownmenu notification-bar" style={{ borderRadius: "10px", paddingRight: "13px" }}>
                                                                    {/* <li><Link
                                                                        href=""
                                                                    // to={{
                                                                    //         pathname: constant.component.Enquiry.url.replace(":Enquiry", 'update-job-profile'),
                                                                    //         state: { title: 'Update Job Profile' }
                                                                    //     }}
                                                                    >No Notifications</Link></li> */}
                                                                    <li><Link href='/'
                                                                    >Job Recommendations <em> Latest Jobs Recommendation</em></Link>
                                                                        <span className='notification-centre'><a href={constant.component.recommendedJobs.url}>View Jobs</a></span>
                                                                    </li>
                                                                    <li><Link href='/' >Application Status <em> Check Recruiter Responses</em></Link>
                                                                        <span className='notification-centre'><a href={constant.component.applicationStatus.url}>Check Status</a></span>
                                                                    </li>
                                                                    <li><Link href='/'>Pending Actions<em>Complete Your Profile Now</em></Link>
                                                                        <span className='notification-centre'><a href={constant.component.editProfile.url
                                                                        }>Edit Profile</a></span>
                                                                    </li>
                                                                    <li><Link href='/'>Rewards <em>Check The Latest Rewards </em></Link>
                                                                        <span className='notification-centre'><a href={constant.component.coupon.url
                                                                        }>7 Offer</a></span>
                                                                    </li>
                                                                    <li><Link href='/'>Loan & Advances  <em>Fullfil Your Dream Now </em></Link>
                                                                        <span className='notification-centre'><a href={constant.component.educationLoan.url}>Apply Now</a></span>

                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

            </React.Fragment>
        )
    }
})



