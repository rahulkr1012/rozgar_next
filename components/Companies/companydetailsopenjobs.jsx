import React, { Component } from 'react'
import { ToSeoUrl } from 'utils';
import Shimmer from 'components/common/HeaderLoader/index'
import Parser from 'html-react-parser';
import constant from 'constant';
import noRecordImg from 'src/assets/images/no-results.png'
import Image from 'next/image';
import img02 from '@/assets/images/img-02.jpg'
import img08 from '@/assets/images/blogdetail/img-08.jpg'
import Link from 'next/link';

export default class companydetailsopenjobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { detail, jobs } = this.props
        return (
            <React.Fragment>
                <div class="rg-tabcontent tab-content">

                    <div class="rg-jobdetails rg-tabpane tab-pane fade active show" id="openjobs">
                        {detail &&
                            <div class="rg-jobdetaildescription">
                                <div class="rg-title">
                                    {jobs.count != 0 && <h2>{jobs.count} {detail.COMPANY_NAME}</h2>}
                                    <Link href={constant.component.joblist.url.replace(':url', `${detail.URL}-jobs`)} target='_blank' className="rg-btn viewAllJobsCompany">View All Jobs</Link>

                                </div>
                                {
                                    jobs.count == 0 && jobs.list.length == 0 &&
                                    <div className="text-danger" style={{ textAlign: 'center' }}>
                                        <Image src={noRecordImg} alt="null image " height={200} width={300} />
                                        <h4>No jobs posted by {detail.COMPANY_NAME}</h4>
                                        <p style={{ color: 'black' }}><Link className='text-danger' href={constant.component.homepage.url}>click here</Link> to search jobs by Keywords, Desigation, Roles etc.</p>
                                        <p> You can browse jobs by <Link href={constant.component.jobsByCategory.url}>Functional Area, Industry</Link>, <Link href={constant.component.jobsByCompany.url}>Company</Link>, <Link href={constant.component.jobsBySkill.url}> Skills </Link> and <Link href={constant.component.jobsByDesignation.url}>Designations</Link> </p>
                                        <Link href={constant.component.login.url} class="rg-btn rg-active btn-primary mb-20" id="showtoast"><span className='text-white'>Browse More Jobs</span></Link>

                                    </div>
                                }
                                <div class="rg-featurejobs">

                                    {detail === undefined ? <Shimmer /> :

                                        jobs && jobs.list.length > 0 && jobs.list.map((item, index) => {
                                            const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
                                            const dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                            //     ToSeoUrl(item.JOB_TITLE) +
                                            //     "-" +
                                            //     ToSeoUrl(item.COMPANY_NAME) +
                                            //     "-" +
                                            //     item.CITY?.toLowerCase().split(",").join("-") +
                                            //     "-" +
                                            //     item.JOB_ID;
                                            return (
                                                <div class="rg-featurejob">
                                                    <div class="rg-companycontent">
                                                        <figure class="roz-companydetaillogo">
                                                            <a href="#">
                                                                {item.COMPANY_LOGO === 'NA' ? <h3>{nameInitial}</h3> : <a href={dynamicURL} target='_blank'><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt="image description" width={100} height={100} /></a>}
                                                            </a>
                                                        </figure>

                                                        <div class="rg-detailopensjobs">
                                                            <h3><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h3>
                                                            <h6 style={{ fontSize: '13px' }}>{item.COMPANY_NAME}</h6>
                                                            <div class="jobcompanyreviewbox"><a href="#"></a><span class="reviewnumber">
                                                                <i class="fa fa-star"></i></span><a href="#"><span class="reviewlink">({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} Reviews)</span></a></div>
                                                        </div>
                                                        <ul class="jobcompanyhiringdetails" style={{ fontSize: "12px" }}>
                                                            <li><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</li>
                                                            <li><i class="fa fa-rupee"></i> {item?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.CTC_MIN + '-' + item?.CTC_MAX}</li>
                                                            <li><i class="lnr lnr-map-marker"></i> {item.CITY?.length > 18 ? Parser(item.CITY.slice(0, 18)) + '...' : Parser(item.CITY)}</li>
                                                        </ul>
                                                        <div class="roz-companyjobtans">
                                                            <div class="ellipsis"><i class="lnr lnr-file-empty"></i> {item.JOB_DETAILS?.length > 64 ? Parser(item.JOB_DETAILS.slice(0, 64)) + '...' : Parser(item.JOB_DETAILS)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                </div>
                            </div>}
                    </div>
                    <div class="rg-jobdetails rg-qapolicys tab-pane fade" id="qa">
                        <div class="rg-jobdetaildescription">
                            <div class="rg-qapolicy"><span>Consectetur adipisicing elit sed do eiusmod tempor incididunt utaena lokate labore et dolore <a href="javascript:void(0);">Privacy Policy</a></span></div>
                            <div class="rg-title">
                                <h2>Ask Your Question</h2>
                            </div>
                            <form class="rg-formtheme rg-askjobform">
                                <fieldset>
                                    <div class="form-group rg-inputwithicon"><i class="lnr lnr-bubble"></i><input type="text" name="fullname" class="form-control" placeholder="Add a Question Title Here" /></div>
                                    <div class="rg-selectholder rg-inputwithicon">
                                        <i class="lnr lnr-layers"></i>
                                        <span class="rg-select">
                                            <select data-placeholder="All" name="Select Category">
                                                <option value="hamilton">Select Category</option>
                                                <option value="leeds">Leeds</option>
                                                <option value="leicester">Leicester</option>
                                                <option value="liverpool">Liverpool</option>
                                                <option value="london">London</option>
                                                <option value="louisville">Louisville</option>
                                                <option value="manchester">Manchester</option>
                                                <option value="sheffield">Sheffield</option>
                                            </select>
                                        </span>
                                    </div>
                                    <div class="form-group rg-inputwithicon"><i class="lnr lnr-bubble"></i><textarea name="message" class="form-control" placeholder="What Would You Like To Ask?"></textarea></div>
                                    <div class="form-group"><button class="rg-btn rg-active" type="button">Submit</button></div>
                                </fieldset>
                            </form>
                            <div class="rg-questions">
                                <div class="rg-title">
                                    <h2>2,534,304 Questions</h2>
                                    <div class="rg-questionslect">
                                        <span>Sort by:</span>
                                        <span class="rg-select">
                                            <select data-placeholder="All" name="Select Category">
                                                <option value="hamilton">Interviews</option>
                                                <option value="leeds">Leeds</option>
                                                <option value="leicester">Leicester</option>
                                                <option value="liverpool">Liverpool</option>
                                                <option value="london">London</option>
                                                <option value="louisville">Louisville</option>
                                                <option value="manchester">Manchester</option>
                                                <option value="sheffield">Sheffield</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <div class="rg-title">
                                        <h2><a href="javascript:void(0);">What is the interview process like?</a></h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div class="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div class="rg-btns"><a href="employersdetailsans.html" class="rg-btn">Submit Your Answer</a><a href="employersdetailsans.html">View All Answers</a><span class="rg-reportbar"><i class="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span></div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <div class="rg-title">
                                        <h2><a href="javascript:void(0);">Do you get paid during training?</a></h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div class="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div class="rg-btns"><a href="javascript:void(0);" class="rg-btn">Submit Your Answer</a><a href="javascript:void(0);">View All Answers</a><span class="rg-reportbar"><i class="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span></div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <div class="rg-title">
                                        <h2><a href="javascript:void(0);">Is it worth it ? Specifically, Job tasks &amp; paycheque?</a></h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div class="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div class="rg-btns"><a href="javascript:void(0);" class="rg-btn">Submit Your Answer</a><a href="javascript:void(0);">View All Answers</a><span class="rg-reportbar"><i class="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span></div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <div class="rg-title">
                                        <h2><a href="javascript:void(0);">When do they get paid daily basis or bi-daily?</a></h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div class="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div class="rg-btns"><a href="javascript:void(0);" class="rg-btn">Submit Your Answer</a><a href="javascript:void(0);">View All Answers</a><span class="rg-reportbar"><i class="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span></div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <div class="rg-title">
                                        <h2><a href="javascript:void(0);">What is the minimum wage how much fo you get paid an hour?</a></h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div class="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div class="rg-btns"><a href="javascript:void(0);" class="rg-btn">Submit Your Answer</a><a href="javascript:void(0);">View All Answers</a><span class="rg-reportbar"><i class="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span></div>
                                </div>
                                <div class="rg-interviewprocess">
                                    <nav class="rg-pagination">
                                        <ul>
                                            <li class="rg-prevpage"><a href="javascript:void(0);"><i class="fa fa-angle-left"></i> Previous</a></li>
                                            <li class="rg-active"><a href="#">01</a></li>
                                            <li><a href="javascript:void(0);">02</a></li>
                                            <li><a href="javascript:void(0);">03</a></li>
                                            <li><a href="javascript:void(0);">04</a></li>
                                            <li><a href="javascript:void(0);">05</a></li>
                                            <li><a href="javascript:void(0);"></a></li>
                                            <li class="rg-nextpage"><a href="javascript:void(0);">Next <i class="fa fa-angle-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rg-jobdetails rg-ourlocation em-tabpane tab-pane fade" id="contact">
                        <div class="rg-jobdetaildescription">
                            <div class="rg-title">
                                <h2>Our Locations</h2>
                            </div>
                            <div class="rg-ourlocations">
                                <div class="row">
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div class="rg-locationdetails">
                                            <div id="rg-thememap" class="rg-thememap"></div>
                                            <div class="rg-locationcontant">
                                                <div class="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul class="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div class="rg-locationdetails">
                                            <div id="rg-thememapvtwo" class="rg-thememap"></div>
                                            <div class="rg-locationcontant">
                                                <div class="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul class="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div class="rg-locationdetails">
                                            <div id="rg-thememapvthree" class="rg-thememap"></div>
                                            <div class="rg-locationcontant">
                                                <div class="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul class="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="rg-contactformarea">
                                <div class="rg-title">
                                    <h2>Contact Us</h2>
                                </div>
                                <form class="rg-formtheme rg-formcontactus">
                                    <fieldset>
                                        <div class="form-group rg-inputwithicon"><i class="lnr lnr-user"></i><input type="text" name="fullname" class="form-control" placeholder="Full Name" /></div>
                                        <div class="form-group rg-inputwithicon"><i class="lnr lnr-envelope"></i><input type="email" name="emailid" class="form-control" placeholder="Email ID" /></div>
                                        <div class="form-group rg-inputwithicon"><i class="lnr lnr-tag"></i><input type="text" name="phone" class="form-control" placeholder="Phone" /></div>
                                        <div class="form-group rg-inputwithicon"><i class="lnr lnr-apartment"></i><input type="text" name="subject" class="form-control" placeholder="Subject" /></div>
                                        <div class="form-group rg-inputwithicon"><i class="lnr lnr-bubble"></i><textarea name="message" class="form-control" placeholder="Message"></textarea></div>
                                        <div class="form-group"><button class="rg-btn rg-active" type="button">Submit</button></div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
