
 

import React, { Component } from 'react'
import Link from 'next/link'
import constant from 'constant'
import logo from "src/assets/images/logo.png"
import { courseList } from '@/action/CandidateAction'
import { getCandidateDetail } from '@/action/CandidateAction'
import { getProfilePic } from '@/action/CandidateAction'
import { getGlobalSetting } from '@/action/dashboard'

// import Pic from 'src/assets/images/profilePic/secondary.jfif"
 
export default class index extends Component {
     
     constructor(props) {
         
        super(props)
           
            this.state = {
            token:props.token, 
            data: undefined ,
            MasterData: undefined ,
            detail: props.ud ,
            getFile: undefined  ,
            candidateDetail: {},
        }
        
    }
          
    componentDidMount() {
         const {token}  = this.state 
      
        this.state.detail && this.getCandidateDetail()
          
        this.state.detail && this.onGetFileChange()
         
        courseList().then((res)=> {
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
        const {token}  = this.state 
        getProfilePic({ CANDIDATE_ID: '' } , token ).then((res) => {
            this.setState({ getFile: res.result })
        })
    }
    
    getCandidateDetail = () => {
        const {token}  = this.state 
        getCandidateDetail({ CANDIDATE_ID: '' } , token ).then((res) => {
            if (res.status) {
                this.setState({
                    candidateDetail: res.result
                })
            }
        });
    }


    render() {
        const { data, MasterData, detail, getFile,candidateDetail } = this.state
     
        const { CANDIDATE_ID } = this.state.detail
         
        return (
            <React.Fragment>

                <header id="rg-header" className="rg-header rg-haslayout" style={{ overflowX: "clip" }}>
                    <div className="rg-navigationlogoarea">
                    <div className='top-menu top-menu-new'>
                                <div className='container'>
                                    <div className='col-md-12 text-right pr-0'>
                                        <ul>
                                            <li><i className='lnr lnr-phone-handset'></i> {MasterData?MasterData.PHONE_NUMBER:""}</li>
                                            <li><i className='lnr lnr-envelope'></i> {MasterData?MasterData.EMAIL_ID:""}</li>
                                            <li className='socialmediaicon'>
                                                <a target='_blank' href={MasterData?MasterData.TWITTER_URL:""}><i className='fa fa-twitter'></i></a>
                                                <a target='_blank' href={MasterData?MasterData.FACEBOOK_URL:""}><i className='fa fa-facebook'></i></a>
                                                <a target='_blank' href={MasterData?MasterData.YOUTUBE_URL:""}><i className='fa fa-youtube'></i></a>
                                                <a target='_blank' href={MasterData?MasterData.LINKEDIN_URL:""}><i className='fa fa-linkedin'></i></a>
                                            </li>
                                            <li><a target='_blank' href={`https://wa.me/${MasterData?MasterData.WHATSAPP_NUMBER:""}?text=Please%20use%20the%20below%20number%20for%20Drop%20your%20CV%20feature.`} className='dropyourcv'>Drop your CV<i class="fa fa-whatsapp"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <strong className="rg-logo"><Link href="/"><img src={logo} alt="Rozgar.com" title={constant.build.version} /></Link></strong>
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
                                                                    {/* <li className="menhead spacehide">&nbsp;</li> */}
                                                                    <li className="menhead">Explore jobs</li>
                                                                    <li><Link href="" target='_blank' to={constant.component.jobsBySkill.url}>Jobs by skill</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.jobsByDesignation.url}>Jobs by designation</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.jobsByCompany.url}>Jobs by company</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.jobsByCategory.url}>Jobs by category</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.jobsByLocation.url}>Jobs by location</Link></li>
                                                                    <li><Link href="" target='_blank' to={{
                                                                        pathname: constant.component.CreateJobAlert.url

                                                                    }}>Create a Free Job Alert</Link></li>
                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Jobs in demand</li>
                                                                    <li><a target='_blank' href={constant.component.latestfresherjob.url}>Fresher jobs</a></li>
                                                               
                                                                    {/* <li><a target='_blank'  href={constant.component.MNCjobs.url}>MNC jobs</a></li> */}
                                                                    <li><a target='_blank' href={constant.component.RemoteJobs.url}>Remote jobs</a></li>
                                                                    <li><a target='_blank' href={constant.component.WorkFromHomeJobs.url}>Work from home jobs</a></li>
                                                                    <li><a target='_blank'href={constant.component.WalkInJobs.url}>Walk-in jobs</a></li>
                                                                    <li><a target='_blank' href={constant.component.PartTimeJobs.url}>Part-time jobs</a></li>

                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Video JDs</li>
                                                                    <li><a target='_blank' href={constant.component.MostPopularVideoJdJob.url}>Most Popular</a></li>
                                                               
                                                                    <li><a target='_blank' href={constant.component.HotSectorVideoJdJob.url}>Hot Sectors</a></li>
                                                                    <li><a target='_blank' href={constant.component.MostLikedVideoJdJob.url}>Most Liked</a></li>
                                                                   

                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Freshers jobs</li>
                                                                    <li><a target='_blank' href={constant.component.latestfresherjob.url}>Latest fresher jobs</a></li>
                                                                    <li><a target='_blank' href='https://campus.rozgar.com/'>Students</a></li>
                                                                    <li><a target='_blank' href='https://campus.rozgar.com/'>Institution</a></li>
                                                                    <li><a  target='_blank'href={constant.component.jobsByCompany.url}>Hiring Company</a></li>
                                                                    <li><a target='_blank' href='https://campus.rozgar.com/'>Internships</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* <li className="menu-item-has-children page_item_has_children">
                                            <a href="javascript:void(0);">Government Jobs</a>
                                        </li> */}
                                                    <li className="menu-item-has-children page_item_has_children">
                                                        <Link href={constant.component.companieslist.url}>Companies</Link>
                                                        <ul className="sub-menu">
                                                            <li><a target='_blank' href={constant.component.companieslist.url}>Browse all companies</a></li>
                                                            <li><a target='_blank' href={constant.component.topcompanieslist.url}>Top companies</a></li>
                                                            <li><a target='_blank' href='https://recruit.rozgar.com/recruit/client-registration-form'>Register/Claim Company</a></li>
                                                            {/* <li><a href="javascript:void(0)">Company reviews</a></li> */}
                                                            {/* <li><a href="javascript:void(0)">Interview questions</a></li> */}
                                                        </ul>
                                                    </li>
                                                    <li className="menu-item-has-children page_item_has_children">
                                                        <a href="javascript:void(0);">Services</a>
                                                        <div className="mega-menu Sc2">
                                                            <div className="mega-menu-row br-radiu-mega-menu">
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Candidate Services</li>
                                                                    <li><Link href="" target='_blank' to={constant.component.ResumeMaking.url}>Resume Making</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.UpgradeSkills.url}>Upgrade Skills</Link></li>
                                                                     <li><Link href="" target='_blank' to={{
                                                                        pathname: constant.component.studyAbroad.url
                                                                    }}>Study Abroad</Link></li>
                                                                    <li><Link href=""  target='_blank' to={{
                                                                        pathname: constant.component.internationalWorkVisas.url.replace(":Enquiry", 'international-work-visa'),
                                                                        state: { title: 'International work Visas' }
                                                                    }}> Work Abroad</Link></li>
                                                                    <li><Link href="" target='_blank' to={{
                                                                        pathname: constant.component.StudentsExplorer.url.replace(":Enquiry", 'Career-explorer'),
                                                                        state: { title: 'Career Explorer' }
                                                                    }}>Career Explorer</Link></li>
                                                                    <li><Link href="" target='_blank' to={{
                                                                        pathname: constant.component.careerAstrology.url.replace(":Enquiry", 'career-astrology'),
                                                                        state: { title: 'Career Astrology' }
                                                                    }}>Career Astrology</Link></li>
                                                                     <li><Link href="" target='_blank' to={{
                                                                        pathname: constant.component.educationLoan.url.replace(":Enquiry", 'education-loan'),
                                                                        state: { title: 'Education Loan' }
                                                                    }}>Loans & Advances </Link></li>
                                                                    
                                                                </ul>
                                                                
                                                               <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Employer Services</li>
                                                                    <li><Link href="" target='_blank' to={constant.component.contracttualstaffing.url}>Contractual Staffing</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.hrmanagementsystem.url}>HR Management System</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.payrollautomation.url}>Payroll Automation</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.marketingtechnology.url}>Marketing Technology Solution</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.startupincubation.url}>Startup Incubation</Link></li>
                                                                    <li><Link href="" target='_blank' to={constant.component.fulltimehiring.url}>Full Time Hiring</Link></li>
                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Campus Services</li>
                                                                    <li><a  target='_blank' href="https://campus.rozgar.com/">Register University / Institution</a></li>
                                                               
                                                                    <li><a target='_blank' href="https://campus.rozgar.com/">Campus Jobs</a></li>
                                                                    <li><a  target='_blank' href={constant.component.blog.url}>Campus Update</a></li>
                                                                    <li><a target='_blank' href="https://campus.rozgar.com/">Internships</a></li>
                                                                    <li><a target='_blank' href="https://campus.rozgar.com/">Internal Exchange Programs</a></li>
                                                                   

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
                                                                    <li><Link to={{
                                                                        pathname: constant.component.AllJobs.url,
                                                                    }}>Explore cities</Link></li>
                                                                    <li><Link to={{
                                                                        pathname: constant.component.homepage.url
                                                                    }}>Smart search</Link></li>
                                                                    <li><Link to={constant.component.discussionForum.url}>Discussion forum</Link></li>

                                                                    <li className="menhead">Let's begin your search</li>
                                                                    <li><a href="javascript:void(0)">Explore cities</a></li>
                                                                    <li><a href="javascript:void(0)">Smart search</a></li>
                                                                    <li><a href="javascript:void(0)">Discussion forum</a></li>
                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Resource centre</li>
                                                                    <li><a href="javascript:void(0)">Resume samples</a></li>
                                                                    <li className="menhead">Resource centre</li>
                                                                    <li><Link target='_blank' to={constant.component.aboutUs.url}>About Us</Link></li>
                                                                    <li><Link target='_blank' to={constant.component.blog.url}>Blog</Link></li>
                                                                    <li><Link target='_blank' to={constant.component.faqs.url}>FAQs</Link></li>
                                                                    <li><Link to={constant.component.interviewQuestion.url}>Interview questions</Link></li>

                                                                </ul>
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li className="menhead">Learning Hub</li>
                                                                    {this.state.data !== undefined && this.state.data.map((item, index) => {
                                                                        return (

                                                                            <li><a target="_blank" href={constant.component.courseDetailById.url.replace(':url/:COURSE_ID', item.URL + '/' + item.COURSE_ID)}>{item.COURSE_TITLE}</a></li>

                                                                        )
                                                                    })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li> */}
                                                    <li class="menu-item-has-children mobhidearrow">
                                                        <a target='_blank' href={'https://recruit.rozgar.com/job-post'} className="fw-normal post-jobs"><strong>Post a job</strong></a>
                                                    </li>
                                                     
                                                     {/* <li className="menu-item-has-children prologinpd">
                                                        <Link className="loginhome" to={constant.component.logout.url}> Logout <i className="ti-power-off"></i></Link>
                                                    </li> */}
                                                     
                                                    <li className="menu-item-has-children my-rozgar profileli page_item_has_children rg-web-dash-had">
                                                         

                                                        <a href="javascript:void(0);" className="rg-menubar-ez">
                                                            <div className='profileheader'>
                                                                
                                                            {getFile != undefined && getFile.PROFILE_IMAGE ?
                                                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/pic/${CANDIDATE_ID}/${getFile.PROFILE_IMAGE}`} /> :
                                                                    <img  alt="default profile image " /> 
                                                                }
                                                                <span className='profile-name'>{candidateDetail.CANDIDATE_NAME &&  candidateDetail.CANDIDATE_NAME.length > 18 ? `${candidateDetail.CANDIDATE_NAME.slice(0, 15)}...`: candidateDetail.CANDIDATE_NAME}</span> 
                                                                <i class="fas fa-chevron-down ml-2"></i>
                                                            </div>
                                                        </a>


                                                        <div className= {"mega-menu c3" } >
                                                            <div className="mega-menu-row br-radiu-mega-menu rg-EmployeeHeaderHover">
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li><Link href={constant.component.myRozgar.url}> My Rozgar</Link></li>
                                                                    <li><Link href={constant.component.editProfile.url}>Edit Profile</Link></li>
                                                                    <li><Link href={constant.component.recommendedJobs.url}>Recommended Jobs</Link></li>
                                                                    <li><Link href={constant.component.ProfilePerformance.url}>Profile Performance</Link></li>
                                                                    <li><Link href={constant.component.InboxMessage.url}>Recruiter Messages</Link></li>
                                                                    <li><Link href={constant.component.applicationStatus.url}> Application Status </Link></li>
                                                                    <li><a href="#">Manage Alerts</a></li>
                                                                </ul>
                                                                 
                                                                <ul className="mega-menu-col mega-menu-group">
                                                                    <li><Link href={constant.component.savedJobs.url}>Saved Jobs</Link></li>
                                                                    {/* <li><a href="#">Settings</a></li>
                                                                    <li><a href="#">Boost My Profile</a></li> */}
                                                                    <li><Link href={constant.component.changePassword.url}>Change Password</Link></li>
                                                                    <li><a href="#">Rewards</a></li>
                                                                    <li><Link href={constant.component.premiumJobs.url}>Premium Jobs</Link></li>
                                                                    <li><Link href={constant.component.featuredJobs.url}>Featured Jobs</Link></li>
                                                                    <li><Link href={constant.component.logout.url}>Logout</Link></li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>

                                                     
                                                    <li class="menu-item-has-children p-0">
                                                        <ul className='rg-langnotification m-0'>
                                                            <li>
                                                                <a class="rg-notification" href="javascript:void(0);">
                                                                    <span class="rg-notificationtag">0</span>
                                                                    <i class="lnr lnr-alarm"></i>
                                                                </a>
                                                                <ul class="rg-dropdownmenu">
                                                                    <li><Link
                                                                     href=""
                                                                    // to={{
                                                                    //         pathname: constant.component.Enquiry.url.replace(":Enquiry", 'update-job-profile'),
                                                                    //         state: { title: 'Update Job Profile' }
                                                                    //     }}
                                                                    >No Notifications</Link></li>
                                                                    {/* <li><Link to={{
                                                                        pathname: constant.component.Enquiry.url.replace(":Enquiry", 'job-recommendation'),
                                                                        state: { title: 'Job Recommendation' }
                                                                    }}>Job Recommendations</Link></li>
                                                                    <li><Link to={{
                                                                        pathname: constant.component.Enquiry.url.replace(":Enquiry", 'update-job-profile'),
                                                                        state: { title: 'Update Job Profile' }
                                                                    }}>Pending Actions03<em>- Update Job Profile</em></Link></li>
                                                                    <li><Link to={{
                                                                        pathname: constant.component.Enquiry.url.replace(":Enquiry", 'recruiter-searches'),
                                                                        state: { title: 'Recruiter Seaches' }
                                                                    }}>Recruiter Searches</Link></li> */}
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
}

