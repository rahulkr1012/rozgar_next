import React, { useState } from 'react'
import Link from 'next/link'
import constant from 'constant'
import Image from 'next/image'
export default function Header() {
    return (
        <React.Fragment>
            <header id="rg-header" className="rg-header rg-haslayout">
                <div className="rg-navigationlogoarea">
                    <div className='top-menu top-menu-new' style={{
                        backgroundImage: `url('https://s3rozgar.s3.ap-south-1.amazonaws.com/assets/images/top-had-img')`,
                        backgroundRepeat: 'repeat-x',

                    }} >
                        <div className='container'>
                            <div className='col-md-12 text-right pr-0'>
                                <ul>
                                    <li><Link href={'tel: +91-9560482266'}><i className='lnr lnr-phone-handset' ></i> {constant.MasterData.PHONE_NUMBER}</Link></li>
                                    <li><Link href={'mailto:contact@rozgar.com'}><i className='lnr lnr-envelope'></i> {constant.MasterData.EMAIL_ID}</Link></li>
                                    <li className='socialmediaicon' >
                                        <Link target='_blank' href={'https://www.facebook.com/RozgarGlobal'}><i className='fa fa-facebook'></i> </Link>
                                        <Link target='_blank' href={'https://twitter.com/rozgar_india?lang=en'}><i className='fa fa-twitter'></i></Link>
                                        <Link target='_blank' href={'https://www.youtube.com/channel/UCfTrm4NxEoY4U8cNIMyAuxw'}><i className='fa fa-youtube'></i> </Link>
                                        <Link target='_blank' href={'https://www.linkedin.com/company/rozgar/?originalSubdomain=in'}><i className='fa fa-linkedin'></i></Link>
                                        <Link target='_blank' href={'https://www.instagram.com/rozgarofficial/'}><i className='fa fa-instagram'></i> </Link>
                                    </li>
                                    <li><Link target='_blank' href={`https://wa.me/${constant.MasterData.WHATSAPP_NUMBER}?text=Please%20use%20the%20below%20number%20for%20Drop%20your%20CV%20feature.`} className='dropyourcv'>Drop your CV<i className="fa fa-whatsapp"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <strong className="rg-logo">
                                    <Image src={'https://d2apjlzdwu53ds.cloudfront.net/images/logo.png'}
                                        alt="Rozgar.com" onClick={() => {
                                            window.location.href = "/"
                                        }} title={constant.build.version}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        width={165}
                                        height={85}
                                    />
                                </strong>
                                <div className="rg-rightarea">
                                    <nav id="rg-nav" className="rg-nav navbar-expand-lg navbar-toggleable-sm">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <i className="lnr lnr-menu"></i>
                                        </button>

                                        <div className="collapse navbar-collapse rg-navigation in" id="navbarNav">
                                            <ul  >
                                                <li className="menu-item-has-children page_item_has_children">
                                                    <Link href={constant.component.AllJobs.url} >Jobs</Link>
                                                    <div className="mega-menu c1">
                                                        <div className="mega-menu-row br-radiu-mega-menu">
                                                            <ul className="mega-menu-col mega-menu-group">
                                                                <li className="menhead">Explore jobs</li>
                                                                <li><Link target='_blank' href={constant.component.jobsBySkill.url}>Jobs by skill</Link></li>
                                                                <li><Link target='_blank' href={constant.component.jobsByDesignation.url}>Jobs by designation</Link></li>
                                                                <li><Link target='_blank' href={constant.component.jobsByCompany.url}>Jobs by company</Link></li>
                                                                <li><Link target='_blank' href={constant.component.jobsByCategory.url}>Jobs by category</Link></li>
                                                                <li><Link target='_blank' href={constant.component.jobsByLocation.url}>Jobs by location</Link></li>
                                                                <li><Link target='_blank' href={constant.component.CreateJobAlert.url}>Create a Free Job Alert</Link></li>
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
                                                    <Link href="javascript:void(0);">Services</Link>
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
                                                                {<li><Link target='_blank' href={constant.component.HrTechnologySolutions.url}>HR Tech Solutions</Link></li>}
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

                                                <li className="menu-item-has-children mobhidearrow">
                                                    <Link target='_blank' href={'https://recruit.rozgar.com/job-post'} className="fw-normal"><strong>Post a job</strong></Link>
                                                </li>
                                                <li className="menu-item-has-children loginpd">
                                                    <div className='loginhome'>
                                                        <span>
                                                            <Link target='_blank' href={constant.component.register.url}>Register</Link> / <Link target='_blank' href={constant.component.signin.url}>Sign In</Link>
                                                        </span>
                                                    </div>
                                                </li>


                                                <li className="menu-item-has-children employezone p-0">
                                                    <Link href="javascript:void(0);" className="rg-menubar-ez"><i className="lnr lnr-apartment"></i> Employer Zone <i className="lnr lnr-chevron-right"></i></Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href={'https://recruit.rozgar.com/subscriptions'} target='_blank'>Buy online</Link></li>
                                                        <li><Link href={'https://recruit.rozgar.com/job-post'} target='_blank'>Post a Job</Link></li>

                                                        <li className="menu-item-has-children">
                                                            <Link target='_blank' href={'https://recruit.rozgar.com/'}>Employer Login</Link>
                                                        </li>
                                                        <li><Link href={'https://recruit.rozgar.com/SalesEnquiry'} target='_blank'>Sales Enquiry</Link></li>
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







