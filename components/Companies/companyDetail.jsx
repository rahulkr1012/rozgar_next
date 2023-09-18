import React, { Component } from 'react'
import Shimmer from '../common/companyDetailsLoader/Loader';

let OpenJobs   = dynamic(()=>import('./companydetailsopenjobs') ,{
    ssr:false,
    loading:()=> <h1> loading</h1>
} ) 
import Loaders from 'components/common/HeaderLoader/index'

import Overview from './companydetailsoverview'
import constant from 'constant';
import Modal from 'react-modal';
import { numberWithCommas } from 'utils';
import Announceimg01 from '@/assets/images/announce-img01.png'
// import SignInForApplyJobs from '../../pages/signin/SignInForApplyJobs';
import cvpico1 from '@/assets/images/cv-pic01.png'
import adds04 from '@/assets/images/adds-04.jpg'
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SignIn from 'components/signin/signIn';
import SignInForApplyJobs from 'components/signin/signInForApplyJobs';
export default class Companydetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'overview',
            showModal: false,
            leftBar: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : null,
        }
    }


    onCloseModal = () => {
        this.setState({ openModal: false, leftBar: true })
        window.location.reload()
    }

    onOpenModal = () => {
        const { CANDIDATE_ID } = this.state.detail ? this.state.detail : ""
        if (!CANDIDATE_ID) {
            this.setState({ openModal: true })
        }

    }

    makeActive = (tab) => {
        this.setState({ ...this.state, tab: tab })
    }

    onFollow = () => {
         
        const tk = getCookie(constant.keys.ctoken)
        if (tk) {
            this.props.follow(this.props.detail.EMPLOYER_ID)
        }

    }


    render() {
        const { detail, jobs, TOP_COMPANY_IMAGES } = this.props;
        const { tab } = this.state;
        const nameInitial = detail?.COMPANY_NAME?.split(' ')?.map((i) => i.substring(0, 1)).join('')
        const tk = getCookie(constant.keys.ctoken)

        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout">
                    <div className="rg-haslayout rg-sectionspace">
                        <div className="container">
                            <div className="row">
                                <div id="rg-twocolumns" className="rg-twocolumns">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">
                                        {/* {detail === undefined && <Shimmer />} */}
                                      
                                        <div className="rg-jobapplycenter rg-jobapplycentervtwo">
                                        {detail === undefined? <Shimmer />:
                                        detail&&
                                        <div>
                                            <figure className="rg-companyimg">
                                                {detail?.COMPANY_LOGO === 'NA' ? <h1>{nameInitial}</h1> : <a href="#"><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${detail?.COMPANY_LOGO}`} alt={detail?.COMPANY_NAME} /></a>}
                                            </figure>
                                            <div className="rg-companycontent">
                                                <div className="rg-jobapplydetails">
                                                    <div className="rg-companydetailsname">
                                                        <h3><a href="javascript:void(0);">{detail?.COMPANY_NAME}</a></h3>
                                                        <ul className="rg-postarticlemetavtwo">
                                                            <li>
                                                                <a href="javascript:void(0);">

                                                                    <i className="fa fa-star"></i>
                                                                    <span> {detail.REVIEW_COUNT?detail.REVIEW_COUNT:0} reviews</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <ul className="rg-employerjobs">
                                                            <li><a href="javascript:void(0);">{detail?.COMPANY_TYPE}</a></li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="rg-jobapplybtnlike">

                                                    <div className="rg-likebtnbox" style={{ cursor: 'pointer' }}>
                                                        {numberWithCommas(detail?.followers)} followers&nbsp;&nbsp;<a href="javascript:void(0);" onClick={() => {
                                                            this.onOpenModal()
                                                            this.onFollow()
                                                        }} className="rg-btn rg-active">{tk ? this.props.isFollowedByMe === 'true' ? 'Followed' : 'Follow' : 'Follow'} </a>
                                                    </div>
                                                </div>
                                            </div></div>}
                                        </div>
                                        <div className="rg-jobschedules">
                                            <ul className="rg-themenavtabs nav navbar-nav">
                                                <li className="nav-item">
                                                    <a onClick={() => { this.makeActive('overview') }} className={tab === 'overview' && "active"} id="home-tab" data-toggle="tab" href="#about">Overview</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a  onClick= {() => { this.makeActive('openjobs') }} className={tab === 'openjobs' && "active"} id="profile-tab" data-toggle="tab" href="#openjobs" >Open Jobs</a>
                                                </li>

                                            </ul>

                                            {tab === 'overview' && <Overview
                                                detail={detail}
                                                jobs={jobs}
                                            />}

                                            {tab === 'openjobs' && <OpenJobs
                                                detail={detail}
                                                jobs={jobs}
                                            />}
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
                                        <aside id="rg-sidebarvtwo" className="rg-sidebar rg-sidebarvtwo">
                                            <div className="roz-create-cv">
                                                { detail === undefined?<Loaders/>:
                                                <div className='urgent-hiring-area'>
                                                    <a href={constant.component.hiringfresherjob.url}   >
                                                        <div className='hiring-img'>
                                                            <Image src={Announceimg01} />
                                                        </div>
                                                    </a>
                                                </div>}
                                                { detail === undefined?<Loaders/>:
                                                <div className="roz-create-cv">
                                                    <a target='_blank' href={constant.component.ResumeMaking.url}>
                                                        <div className="create-cv-bg">
                                                            <div className="imgfree">
                                                                <Image src={cvpico1} />
                                                            </div>
                                                            <div className="create-text">
                                                                <div className="free-text">Free</div>
                                                                <h4>Create CV</h4>
                                                            </div>
                                                            <div className="d-flex btn-cv p-0">
                                                                <i className="fa fa-angle-double-right" ></i>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>}
                                            </div>
                                            <div className="roz-company-hiring mb-30">
                                          {  TOP_COMPANY_IMAGES === undefined?<Loaders/>:
                                          <div>
                                                <div className="company-hiring">
                                                    <div className="company-hiring-text">
                                                        <h3>Companies Hiring</h3>
                                                    </div>
                                                    <div className="company-hiring-view">
                                                        <a target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                                                    </div>
                                                </div>
                                                <div className="company-hiring-logo">
                                                    {TOP_COMPANY_IMAGES !== undefined && TOP_COMPANY_IMAGES.length > 0 && TOP_COMPANY_IMAGES.map((item, index) => {
                                                        return (
                                                            <a href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)} target='_blank'><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} /></a>
                                                        )
                                                    })}

                                                </div></div>}
                                            </div>
                                            <div className="rg-adds rg-jobsearchadd">
                                                {TOP_COMPANY_IMAGES === undefined?<Loaders/>:
                                                <a href="javascript:void(0);" title="">
                                                    <figure>
                                                        <Image src={adds04} alt="img description" />
                                                    </figure>
                                                </a>}
                                                <span>Ad</span>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Modal
                    isOpen={this.state.openModal}
                    style={{ content: { top: "5%", left: '30%', right: 'auto', bottom: 'auto' }, overlay: { backgroundColor: 'rgba(15,29,45,0.70)' } }}
                    onRequestClose={this.onCloseModal}
                 >
                    <SignInForApplyJobs
                        leftBar={this.state.leftBar}
                        history={this.props.history}
                        onCloseModal={this.onCloseModal}
                    />
                    
                </Modal>
            </React.Fragment>
        )
    }
}
