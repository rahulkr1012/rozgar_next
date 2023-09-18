import React, { Component } from 'react'
import Shimmer from '../common/HeaderLoader/index'
import Parser from 'html-react-parser';
import Shimmers from '../common/companyDetailsLoader/Loader';
import constant from 'constant';
import { ToSeoUrl } from 'utils';
import Image from 'next/image';
export default class companydetailsoverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { detail, jobs } = this.props

        return (
            <React.Fragment>
                <div className="rg-tabcontent tab-content">
                    <div className="rg-jobdetails rg-abouttab rg-tabpane tab-pane active fade show" id="about">
                        <div className="rg-jobdetaildescription">
                            {detail !== undefined ?

                                <div>
                                    <div className="rg-title">
                                        <h2>About {detail?.COMPANY_NAME}</h2>
                                    </div>
                                    <div className="rg-description">





                                        <p>{Parser(detail.ABOUT_COMPANY?.replaceAll('\n', '<br>'))}</p>


                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h4 style={{ marginTop: "6px" }}>More Information</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="roz-more-informaiton">
                                                        <span>Type:</span>
                                                        <span>{detail?.COMPANY_TYPE === '' ? 'NA' : detail?.COMPANY_TYPE}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="roz-more-informaiton">
                                                        <span>Founded:</span>
                                                        <span>{detail?.FOUNDED === '' || detail?.FOUNDED === null ? 'NA' : detail?.FOUNDED} {detail?.FOUNDED === '' || detail?.FOUNDED === null ? '' : (new Date(new Date() - new Date('01-01-' + detail?.FOUNDED)).getFullYear() - 1970 + 'yrs old')}  </span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="roz-more-informaiton">
                                                        <span>Company Size:</span>
                                                        <span>{detail?.COMPANY_SIZE == '' || detail?.COMPANY_SIZE == null || detail?.COMPANY_SIZE == -199 ? 'NA' : detail?.COMPANY_SIZE + '+'}</span>

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="roz-more-informaiton">
                                                        <span>Website:</span>
                                                        {detail?.WEBSITE == 'https://something.com' || detail?.WEBSITE == '' ? 'NA' : <span><a href={detail?.WEBSITE} target='_blank'>{detail?.WEBSITE.slice(0, 30)}</a></span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div> : <Shimmer />}
                        </div>
                        {<div className="jobintrested-box">
                            <div className="boxshow">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4>Jobs you might be interested in</h4>
                                    </div>
                                    <div class="rg-featurejobs">

                                        {


                                            jobs && jobs.list && jobs.list.length > 0 && jobs.list.map((item, index) => {
                                                const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
                                                const dynamicURL =ToSeoUrl(item.CITY.trim().split(',')[0])+'/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                    // ToSeoUrl(item.JOB_TITLE) +
                                                    // "-" +
                                                    // ToSeoUrl(item.COMPANY_NAME) +
                                                    // "-" +
                                                    // item.CITY?.toLowerCase().split(",").join("-") +
                                                    // "-" +
                                                    // item.JOB_ID;

                                                return (
                                                    <div class="rg-featurejob">
                                                        <div class="rg-companycontent">
                                                            <figure class="roz-companydetaillogo">
                                                                <a href="#">
                                                                    {item.COMPANY_LOGO === 'NA' ? <h3>{nameInitial}</h3> : <a href={dynamicURL} target='_blank'><Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt="image description" width={100} height={100} /></a>}
                                                                </a>
                                                            </figure>

                                                            <div class="rg-detailopensjobs">
                                                                <h3><a href={constant.component.jobdetails.url.replace(":url", dynamicURL)} target='_blank'>{item.JOB_TITLE}</a></h3>
                                                                <h6 style={{ fontSize: '13px' }}>{item.COMPANY_NAME}</h6>
                                                                <div class="jobcompanyreviewbox"><a href="#"></a><span class="reviewnumber">
                                                                    <i class="fa fa-star"></i></span><a href="#"><span class="reviewlink">({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} Reviews)</span></a></div>
                                                            </div>
                                                            <ul class="jobcompanyhiringdetails" >
                                                                <li><i class="lnr lnr-briefcase"></i> {item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} Yrs</li>
                                                                <li><i class="fa fa-rupee"></i> {item?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : item?.CTC_MIN + '-' + item?.CTC_MAX}</li>
                                                                <li><i class="lnr lnr-map-marker"></i> {item.CITY?.length > 18 ? Parser(item.CITY.slice(0, 18)) + '...' : Parser(item.CITY)}</li>
                                                            </ul>
                                                            <div class="roz-companyjobtans">
                                                                <div class="ellipsis"><i class="lnr lnr-file-empty"></i>{item.JOB_DETAILS?.length > 64 ? Parser(item.JOB_DETAILS.slice(0, 64)) + '...' : Parser(item.JOB_DETAILS)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="jobintrested-box">
                            <ul className="rg-socialiconssimple">

                                {detail?.FB_URL == '' || detail?.TWITTER_URL == '' || detail?.LINKEDIN_URL == '' || detail?.FB_URL == null || detail?.TWITTER_URL == null || detail?.LINKEDIN_URL == null ? '' : <li className="rg-sharejob"><span className="font-weight-bold">Connect with {detail?.COMPANY_NAME}</span></li>}
                                {detail?.FB_URL == '' || detail?.FB_URL == null ? '' : <li className="rg-facebook"><a href={detail?.FB_URL} target='_blank'><i className="fa fa-facebook-f"></i></a></li>}

                                {detail?.TWITTER_URL == '' || detail?.TWITTER_URL == null ? '' : <li className="rg-twitter"><a href={detail?.TWITTER_URL} target='_blank'><i className="fab fa-twitter"></i></a></li>}

                                {detail?.LINKEDIN_URL == '' || detail?.LINKEDIN_URL == null ? '' : <li className="rg-linkedin"><a href={detail?.LINKEDIN_URL} target='_blank'><i className="fab fa-linkedin-in"></i></a></li>}
                            </ul>
                        </div>
                    </div>

                    <div className="rg-jobdetails rg-qapolicys tab-pane fade" id="qa">
                        <div className="rg-jobdetaildescription">
                            <div className="rg-qapolicy">
                                <span>Consectetur adipisicing elit sed do eiusmod tempor incididunt utaena lokate labore et dolore <a href="javascript:void(0);">Privacy Policy</a></span>
                            </div>
                            <div className="rg-title">
                                <h2>Ask Your Question</h2>
                            </div>
                            <form className="rg-formtheme rg-askjobform">
                                <fieldset>
                                    <div className="form-group rg-inputwithicon">
                                        <i className="lnr lnr-bubble"></i>
                                        <input type="text" name="fullname" className="form-control" placeholder="Add a Question Title Here" />
                                    </div>
                                    <div className="rg-selectholder rg-inputwithicon">
                                        <i className="lnr lnr-layers"></i>
                                        <span className="rg-select">
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
                                    <div className="form-group rg-inputwithicon">
                                        <i className="lnr lnr-bubble"></i>
                                        <textarea name="message" className="form-control" placeholder="What Would You Like To Ask?"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button className="rg-btn rg-active" type="button">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="rg-questions">
                                <div className="rg-title">
                                    <h2>2,534,304 Questions</h2>
                                    <div className="rg-questionslect">
                                        <span>Sort by:</span>
                                        <span className="rg-select">
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
                                <div className="rg-interviewprocess">
                                    <div className="rg-title">
                                        <h2>
                                            <a href="javascript:void(0);">What is the interview process like?</a>
                                        </h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div className="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div className="rg-btns">
                                        <a href="employersdetailsans.html" className="rg-btn">Submit Your Answer</a>
                                        <a href="employersdetailsans.html">View All Answers</a>
                                        <span className="rg-reportbar"><i className="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span>
                                    </div>
                                </div>
                                <div className="rg-interviewprocess">
                                    <div className="rg-title">
                                        <h2>
                                            <a href="javascript:void(0);">Do you get paid during training?</a>
                                        </h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div className="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div className="rg-btns">
                                        <a href="javascript:void(0);" className="rg-btn">Submit Your Answer</a>
                                        <a href="javascript:void(0);">View All Answers</a>
                                        <span className="rg-reportbar"><i className="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span>
                                    </div>
                                </div>
                                <div className="rg-interviewprocess">
                                    <div className="rg-title">
                                        <h2>
                                            <a href="javascript:void(0);">Is it worth it ? Specifically, Job tasks &amp; paycheque?</a>
                                        </h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div className="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div className="rg-btns">
                                        <a href="javascript:void(0);" className="rg-btn">Submit Your Answer</a>
                                        <a href="javascript:void(0);">View All Answers</a>
                                        <span className="rg-reportbar"><i className="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span>
                                    </div>
                                </div>
                                <div className="rg-interviewprocess">
                                    <div className="rg-title">
                                        <h2>
                                            <a href="javascript:void(0);">When do they get paid daily basis or bi-daily?</a>
                                        </h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div className="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div className="rg-btns">
                                        <a href="javascript:void(0);" className="rg-btn">Submit Your Answer</a>
                                        <a href="javascript:void(0);">View All Answers</a>
                                        <span className="rg-reportbar"><i className="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span>
                                    </div>
                                </div>
                                <div className="rg-interviewprocess">
                                    <div className="rg-title">
                                        <h2>
                                            <a href="javascript:void(0);">What is the minimum wage how much fo you get paid an hour?</a>
                                        </h2>
                                        <span>June 27, 2019</span>
                                    </div>
                                    <div className="rg-description">
                                        <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut laboreat dolore magna aliqua enim ad coaido consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                    <div className="rg-btns">
                                        <a href="javascript:void(0);" className="rg-btn">Submit Your Answer</a>
                                        <a href="javascript:void(0);">View All Answers</a>
                                        <span className="rg-reportbar"><i className="lnr lnr-bug"></i><a href="javascript:void(0);">Report Question</a></span>
                                    </div>
                                </div>
                                <div className="rg-interviewprocess">
                                    <nav className="rg-pagination">
                                        <ul>
                                            <li className="rg-prevpage"><a href="javascript:void(0);"><i className="fa fa-angle-left"></i> Previous</a></li>
                                            <li className="rg-active"><a href="#">01</a></li>
                                            <li><a href="javascript:void(0);">02</a></li>
                                            <li><a href="javascript:void(0);">03</a></li>
                                            <li><a href="javascript:void(0);">04</a></li>
                                            <li><a href="javascript:void(0);">05</a></li>
                                            <li><a href="javascript:void(0);"></a></li>
                                            <li className="rg-nextpage"><a href="javascript:void(0);">Next <i className="fa fa-angle-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rg-jobdetails rg-ourlocation em-tabpane tab-pane fade" id="contact">
                        <div className="rg-jobdetaildescription">
                            <div className="rg-title">
                                <h2>Our Locations</h2>
                            </div>
                            <div className="rg-ourlocations">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div className="rg-locationdetails">
                                            <div id="rg-thememap" className="rg-thememap"></div>
                                            <div className="rg-locationcontant">
                                                <div className="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul className="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div className="rg-locationdetails">
                                            <div id="rg-thememapvtwo" className="rg-thememap"></div>
                                            <div className="rg-locationcontant">
                                                <div className="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul className="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 float-left">
                                        <div className="rg-locationdetails">
                                            <div id="rg-thememapvthree" className="rg-thememap"></div>
                                            <div className="rg-locationcontant">
                                                <div className="rg-title">
                                                    <h2>VAV of Oceans, Chicago</h2>
                                                    <span>Office 33 - 37, 27 New Colmore Row Chicago, USA</span>
                                                </div>
                                                <ul className="rg-direction">
                                                    <li><a href="javascript:void(0);">Get Directions</a></li>
                                                    <li><a href="javascript:void(0);">Share Location</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rg-contactformarea">
                                <div className="rg-title">
                                    <h2>Contact Us</h2>
                                </div>
                                <form className="rg-formtheme rg-formcontactus">
                                    <fieldset>
                                        <div className="form-group rg-inputwithicon">
                                            <i className="lnr lnr-user"></i>
                                            <input type="text" name="fullname" className="form-control" placeholder="Full Name" />
                                        </div>
                                        <div className="form-group rg-inputwithicon">
                                            <i className="lnr lnr-envelope"></i>
                                            <input type="email" name="emailid" className="form-control" placeholder="Email ID" />
                                        </div>
                                        <div className="form-group rg-inputwithicon">
                                            <i className="lnr lnr-tag"></i>
                                            <input type="text" name="phone" className="form-control" placeholder="Phone" />
                                        </div>
                                        <div className="form-group rg-inputwithicon">
                                            <i className="lnr lnr-apartment"></i>
                                            <input type="text" name="subject" className="form-control" placeholder="Subject" />
                                        </div>
                                        <div className="form-group rg-inputwithicon">
                                            <i className="lnr lnr-bubble"></i>
                                            <textarea name="message" className="form-control" placeholder="Message"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button className="rg-btn rg-active" type="button">Submit</button>
                                        </div>
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
