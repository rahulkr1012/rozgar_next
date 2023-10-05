import React, { Component } from "react";
import { capitalizeWords, getDateParts, ToSeoUrl } from "../../utils";
import { capFirstLetterInSentence } from "@/utils";
import nl2br from "react-nl2br";
import constant from "constant";
import Parser from "html-react-parser";
import CVPic01 from "src/assets/images/cv-pic01.png";
import Shimmer from "../common/Shimmer";
import { JobApppliedStatus, SaveJobStatus } from "@/action/jobDetail";
import { AddBannerAnalytics, createJobAlert, selectCountry } from "@/action/jobsByActions";
import swal from "sweetalert";
import { onChange } from "../../utils";
import NumericFormatBase from "react-number-format";
import AnnounceImg01 from "../../src/assets/images/announce-img01.png";
import adds05 from "../../src/assets/images/adds-05.jpg";
import adds03 from "../../src/assets/images/adds-03.jpg";
import Shimmers from "../../components/JobDetailsLoader/Shimmer"
import Simmer from "../../components/JobDetailsLoader/Simmers"
import HeaderLoader from "../../components/common/HeaderLoader/index"
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  TelegramIcon,
  TumblrIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WorkplaceIcon,
  EmailShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  TelegramShareButton,
  TumblrShareButton,
  ViberShareButton,
  VKShareButton,
  WorkplaceShareButton,
} from "react-share";
import Link from "next/link";
import { withRouter } from "next/router";
import Image from "next/image";
import ReactModal from "react-modal";
import SignInForSaveUnsave from "components/signin/SignInForSaveUnsave";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { SaveJobs } from "@/action/CandidateAction";

class jobdetails extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mod1 = React.createRef();
    this.state = {
      saveJobIcon: undefined,
      detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : {},
      savedJobList: [],
      openModal: false,
      isJobApplied: false,
      JOB_ID: "",
      leftBar: false,
      alertName: { name: "alertName", value: "", error: "", isRequired: false },
      mobile: { name: "mobile", value: "", error: "", isRequired: false },
      email: { name: "email", value: "", error: "", isRequired: false },
      jobStatus: false,
      location: '',
      count: 0
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.onSubmit.bind(this);
  }




  validateEnquiryForm = () => {
    let data = this.state;
    let error = {};
    let isValid = true;

    if (!data["alertName"].value) {
      let alertName = data["alertName"];
      alertName.error = "Please Enter Name";
      isValid = false;
      this.setState({
        alertName: alertName,
      });
    }
    if (!data["email"].value) {
      let email = data["email"];
      email.error = "Please Enter Email";
      isValid = false;
      this.setState({
        email: email,
      });
    }

    if (data["email"].value) {
      let re = /\S+@\S+\.\S+/;
      if (re.test(data["email"].value)) {
      } else {
        let email = data["email"];
        email.error = "Please Enter Valid Email";
        isValid = false;
        this.setState({
          email: email,
        });
      }
    }
    if (!data["mobile"].value) {
      let mobile = data["mobile"];
      mobile.error = "Please Enter Mobile";
      isValid = false;
      this.setState({
        mobile: mobile,
      });
    }

    if (data["mobile"] != "") {
      const regexExp = /^[6789][0-9]{9}/;
      if (regexExp.test(data.mobile.value)) {
      } else {
        let mobile = data["mobile"];
        mobile.error = "Please Enter Valid Mobile Number";
        isValid = false;
      }
    }
    this.setState({
      error: error,
    });

    return isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, mobile, alertName } = this.state;
    const model = {
      NAME: alertName.value,
      EMAIL_ID: email.value,
      MOBILE: mobile.value,
      TYPES: "AlertByJobDetails",
    };

    if (this.validateEnquiryForm()) {
      createJobAlert(model)
        .then((res) => {
          if (res.status) {
            swal({
              icon: "success",
              text: "Job Alert Created Succesfully ",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false,
            });
            window.location.reload()
            this.setState({
              jobStatus: false,
            });
          } else {
            alert(res.error);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    onChange(this, name, value);
  }

  componentDidMount() {
    // window.scrollTo(0, 0)
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";

    selectCountry().then((res) => {
      this.setState({ location: res })
    })

    if (CANDIDATE_ID) {
      this.saveJobsStatus(this.state.JOB_ID, CANDIDATE_ID);
      this.getStatus(CANDIDATE_ID);
    }
  }

  getStatus = (CANDIDATE_ID) => {
    if (this.props.props) {
      let key = this.props.props.asPath;
      let jobDetail = key ? key.match(/-(\d+)$/)[1] : null;
      const body = {
        JOB_ID: jobDetail ? parseInt(jobDetail) : null,
        CANDIDATE_ID: CANDIDATE_ID,
      };
      
      JobApppliedStatus(body)
        .then((res) => {
          
          if (res.status) {
            this.setState({ isJobApplied: res.result.status });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  BannerCilck = (e, item, type) => {
    const model = {
      BANNER_ID: e.BANNER_ID,
      BANNER_CLICKS: type,
      LONGT: item.longitude,
      LATT: item.latitude,
      IP_ADDRRESS: item.IPv4,
      CITY: item.city
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


  onStatusChange = () => {
    this.props.ApplyJobs();
  };

  onSaveJobStatusChange = () => {
    this.props.saveJobs();
  };

  onClickSave = (JOB_ID) => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    if (CANDIDATE_ID) {
      this.getSavedJobs({
        CANDIDATE_ID: CANDIDATE_ID,
        JOB_ID: JOB_ID,
        ACTION: "save",
      });
    } else {
      setCookie("saveJobId", { JOB_ID: JOB_ID });
      deleteCookie("addAndUpdate");
      this.setState({ openModal: true });
    }
  };

  onClickUnSave = (JOB_ID) => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    if (CANDIDATE_ID) {
      this.getSavedJobs({
        CANDIDATE_ID: CANDIDATE_ID,
        JOB_ID: JOB_ID,
        ACTION: "unsave",
      });
    }
  };

  getSavedJobs = (model) => {
    SaveJobs(model)
      .then((res) => {
        if (res.status) {
          this.props.getSaveJobLists();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveJobsStatus = (JOB_Id) => {
    const body = {
      JOB_ID: JOB_Id,
    };
    SaveJobStatus(body)
      .then((res) => {
        if (res.status) {
          this.setState({ saveJobIcon: res.result.status });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onCloseModal = () => {
    this.setState({
      openModal: false,
      leftBar: true,
    });
  };


  render() {
    const { location, count } = this.state
    const {
      detail,
      cities,
      companyDetail,
      similarJobList,
      TOP_COMPANY_IMAGES,
    } = this.props;

    const { mobile, email, alertName } = this.state;

    let savedJobList =
      this.props &&
      this.props.list &&
      this.props.list.length > 0 &&
      this.props.detail &&
      this.props.list.filter((d, i) => {
        return d.JOB_ID == this.props.detail.JOB_ID ? d : "";
      });

    let share_job = {
      border: "none",
      color: "black",
      padding: " 1px 1px",
      textAlign: "center",
      fontSize: "16px",
      margin: "2px 2px",
      transition: "0.3s",
      transitionDelay: "1sec",
      transform: "translateY(-10px)",
    };

    let sharable_link = {
      url: "https://rozgar.com" + this.props.router.asPath,
      style: share_job,
      title: capFirstLetterInSentence(this.props.router.asPath)
    };

    return (
      <React.Fragment>
        <main id="rg-main" className="rg-main rg-haslayout">
          {/* <ReactModal
            ref={this.mod1}
            isOpen={this.state.jobStatus}
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel2"
            id="bgcoltran"
          > */}
          <div className="modal modal_outer right_modal fade" id="information_modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" >
            <div className="modal-dialog" role="document">
              <div id="get_quote_frm">
                <div className="modal-content ">
                  <div className="modal-header">
                    <strong className="modal-title ">
                      Enter your Email Id to get Job Alerts

                    </strong>

                    <button
                      type="button"
                      onClick={() => this.setState({ jobStatus: false })}
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body get_quote_view_modal_body pt-5">
                    <form className="alertform-box">
                      <div className="form-group">
                        <label className="create-job-alert-label">Name <span className='label-required'>*</span></label>
                        <input
                          type="text"
                          name={alertName.name}
                          value={alertName.value}
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder="Enter your Name"
                        />
                        {alertName.error.length > 0 && !alertName.value && (
                          <span className="text-danger ml-1">
                            {alertName.error}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="create-job-alert-label">
                          Mobile No. <span className='label-required'>*</span>
                        </label>
                        <NumericFormatBase
                          type="phone"
                          name={mobile.name}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              const regexExp = /^[6789][0-9]{9}/;
                              if (regexExp.test(e.target.value)) {
                                let mobile = this.state.mobile;
                                mobile.value = e.target.value;
                                this.setState({ mobile: mobile });
                              } else {
                                let mobile = this.state.mobile;
                                mobile.value = "";
                                this.setState({ mobile: mobile });
                              }
                            }
                          }}
                          className="form-control"
                          placeholder="Enter your mobile no."
                        />
                        {mobile.error.length > 0 && !mobile.value && (
                          <span className="text-danger ml-1">
                            {mobile.error}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="create-job-alert-label">
                          Email ID <span className='label-required'>*</span>
                        </label>
                        <input
                          type="text"
                          name={email.name}
                          value={email.value}
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder="Enter your active Email ID"
                        />
                        {email.error.length > 0 && !email.value && (
                          <span className="text-danger ml-1">
                            {email.error}
                          </span>
                        )}
                      </div>
                    </form>
                    <div className="alert-save-btn pt-3">

                      <a href="" onClick={(e) => this.onSubmit(e)}>
                        Create Job Alert
                      </a>


                      <a
                        href=""
                        onClick={() => this.onCloseModal()}
                        className="alert-btnsave ml-3"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </ReactModal> */}
          <div className="rg-haslayout rg-sectionspace">
            <div className="container">
              <div className="row">
                <div id="rg-twocolumns" className="rg-twocolumns">
                  {
                    !detail &&
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">
                      <div className="rg-jobapplycenter rg-jobapplycentervfour">
                        <Shimmers />
                        {/* <h1>sdfdsf</h1> */}
                      </div>
                    </div>


                  }

                  {/* {detail && detail !== undefined && 
                  ( */}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 float-left">
                    {detail && detail !== undefined &&
                      <div className="rg-jobapplycenter rg-jobapplycentervfour">
                        {/* <Shimmers/> */}
                        <figure className="rg-companyimg">
                          {detail ? (
                            detail.COMPANY_LOGO === "NA" ? (
                              <h3 className="logotext">
                                {detail.COMPANY_NAME.split(" ")
                                  .map((i) => i.substring(0, 1))
                                  .join("")}
                              </h3>
                            ) : (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL
                                  }/company/logo/${detail ? detail.COMPANY_LOGO : ""
                                  }`}
                                alt={detail ? detail.COMPANY_NAME : ""}
                                width={"1000"}
                                height={"1000"}
                              />
                            )
                          ) : (
                            ""
                          )}
                        </figure>
                        <div className="rg-companycontent">
                          <div className="rg-jobapplydetails">
                            <div className="rg-companyname jobdetails">
                              <h1>
                                <span style={{ color: "#414141" }}>
                                  {detail ? detail.JOB_TITLE : ""}
                                </span>
                              </h1>

                              <Link
                                href={constant.component.companydetails.url.replace(
                                  ":url",
                                  detail.COMPANY_NAME + "-" + detail.EMPLOYER_ID
                                )}
                                target="_blank"
                              >
                                {" "}
                                {detail.COMPANY_NAME}{" "}
                              </Link>

                              <div className="companyreviewbox">
                                <span className="reviewnumber">
                                  <i className="fa fa-star"></i>
                                </span>
                                <a href="#">
                                  <span className="reviewlink">
                                    ({detail.REVIEW_COUNT ? detail.REVIEW_COUNT : 0} Reviews)
                                  </span>
                                </a>
                              </div>
                              <ul className="rg-postarticlemetavthree">
                                <li>
                                  <div className="job_exp">
                                    <i className="lnr lnr-briefcase"></i>
                                    <span>
                                      {detail ? detail.WORK_EXP_MIN : ""}-
                                      {detail ? detail.WORK_EXP_MAX : ""} years
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="job_exp">
                                    <i className="fa fa-rupee"></i>
                                    <span>
                                      {detail?.IS_HIDE_SALARY_FROM_CANDIDATE === 'Y' ? 'Not disclosed' : `${detail.CTC_MIN >= 100000
                                        ? (detail.CTC_MIN / 100000).toFixed(1).replace('.0', '')
                                        : detail.CTC_MIN
                                        } - ${detail.CTC_MAX >= 100000
                                          ? (detail.CTC_MAX / 100000).toFixed(1).replace('.0', '') + " Lacs"
                                          : detail.CTC_MAX
                                        } PA`}
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="job_exp">
                                    <i className="lnr lnr-clock"></i>
                                    <span>
                                      Posted:{" "}
                                      {
                                        getDateParts(detail ? detail.CREATED_ON : "")
                                          .relativeTime
                                      }
                                    </span>
                                  </div>
                                </li>
                              </ul>
                              <ul className="rg-postarticlemetavone">
                                <li>
                                  <div className="job_exp">
                                    <i className="lnr lnr-map-marker"></i>
                                    <span>
                                      {capitalizeWords(detail ? detail.CITY.split(",") : "")
                                        .toString()
                                        .replace(/,/g, ", ")}
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="rg-jobapplybtnlike">

                            {this.state.isJobApplied ? (
                              <div className="rg-likebtnbox">
                                <button
                                  className="rg-applied-btn rg-active"
                                  style={{ cursor: "default" }}
                                >
                                  Applied
                                </button>
                              </div>
                            ) : (
                              <div className="rg-likebtnbox">
                                <button
                                  className="rg-btn rg-active"
                                  onClick={this.onStatusChange}
                                >
                                  Apply Now
                                </button>
                              </div>
                            )}


                            <ul className="rg-socialiconssimple">
                              <div className="rg-rightarea">
                                <button
                                  className="rg-btnjobtag rg-fulltimejob mr-10"
                                  style={{ outline: "none" }}
                                >
                                  <i className="ti-crown"></i>{" "}
                                  {detail.LISTNING_TYPE == 1
                                    ? " REGULAR"
                                    : detail.LISTNING_TYPE == 2
                                      ? " FEATURED"
                                      : " PREMIUM"}
                                </button>

                                {savedJobList && savedJobList.length > 0 ? (
                                  <button
                                    className="rg-tagfeature"
                                    onClick={() =>
                                      this.onClickUnSave(detail.JOB_ID)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "1em",
                                      outline: "none",
                                    }}
                                  >
                                    <i
                                      className="fa fa-star fa-sm"
                                      style={{ color: "#eea21d" }}
                                    ></i>{" "}
                                    Saved
                                  </button>
                                ) : (
                                  <button
                                    className="rg-tagfeature"
                                    onClick={() =>
                                      this.onClickSave(detail.JOB_ID)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "1em",
                                      outline: "none",
                                    }}
                                  >
                                    <i className="fa fa-star fa-sm"></i> Save
                                  </button>
                                )}
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div className="postedjobapply">
                          <div className="postjobdays">
                            Posted:{" "}
                            <span>
                              {getDateParts(detail.CREATED_ON).relativeTime}
                            </span>
                          </div>
                          <div className="postjobnum">
                            Job Applicants:{" "}
                            <span>
                              {detail.ApplicationCount.total}
                            </span>
                          </div>
                          <div className="postjobsend"></div>

                          <div>
                            <button
                              type="button"
                              className="sendme-jobslike"
                              ref={this.myRef}
                              id="modal_view_right"
                              data-toggle="modal"
                              data-target="#information_modal2"
                            // onClick={(e) => {
                            //   this.setState({ jobStatus: true });
                            // }}
                            >
                              Send me jobs like these
                            </button>
                          </div>
                        </div>
                      </div>
                    }

                    {
                      !detail &&
                      <div className="rg-jobdetails">
                        <div className="rg-jobdetaildescription">
                          <div className="rg-title">
                            <HeaderLoader />
                            {/* <h1>sdfdasdsf</h1> */}
                          </div>
                        </div>
                      </div>
                    }

                    {
                      detail &&
                      <div className="rg-jobdetails">
                        <div className="rg-jobdetaildescription">
                          <div className="rg-title">
                            <h2>Job Description</h2>
                          </div>

                          <div className="rg-jobdescription">
                            <p>{nl2br(Parser(detail ? detail.JOB_DETAILS : ""))}</p>
                          </div>

                          {detail?.POSITION_DETAIL_URL?.split("=").length >
                            1 && (
                              <div className="rg-video rg-videovtwo">
                                {
                                  <iframe
                                    width="998"
                                    height="527"
                                    src={`https://www.youtube.com/embed/${detail?.POSITION_DETAIL_URL.split("=")[1]
                                      }`}
                                    title={detail?.JOB_TITLE}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                  ></iframe>
                                }
                              </div>
                            )}

                        </div>
                        <div className="rg-jobdetailinfo">
                          <div className="rg-title">
                            <h2>Job Requirment</h2>
                          </div>
                          <ul>
                            <li>
                              <span>Role:</span>
                              <em>
                                {detail?.ROLE_NAME ? detail?.ROLE_NAME : "NA"}
                              </em>
                            </li>
                            <li>
                              <span>Industry Type:</span>
                              <em>{detail?.INDUSTRY}</em>
                            </li>
                            <li>
                              <span>Functional Area:</span>
                              <em>
                                {detail?.FUNCTIONAL_AREA
                                  ? detail?.FUNCTIONAL_AREA
                                  : "NA"}
                              </em>
                            </li>
                            <li>
                              <span>Employment Type:</span>
                              <em>
                                {detail?.EMPLOYMENT_TYPE
                                  ? detail?.EMPLOYMENT_TYPE
                                  : "NA"}
                              </em>
                            </li>

                            <li>
                              <span>Education</span>
                              <em></em>
                            </li>
                            <li>
                              <span>{detail?.QUALIFICATION_NAME}:</span>
                              <em>
                                {detail?.COURSE_STREAM
                                  ? detail?.COURSE_STREAM
                                  : "Any"}
                              </em>
                            </li>
                          </ul>
                        </div>
                        <div className="rg-jobbenefits">
                          <div className="rg-title">
                            <h2>Key Skills</h2>
                          </div>
                          <div className="rg-tagvtwo rg-withicon">
                            {detail?.KEYWORDS.split(",").length &&
                              capitalizeWords(detail?.KEYWORDS.split(",")).map(
                                (item, index) => {
                                  return <span>{item}</span>;
                                }
                              )}
                          </div>
                        </div>
                        <div className="rg-jobapply">
                          <div className="rg-jobapplynowbtn">
                            {this.state.isJobApplied ? (
                              <div className="rg-likebtnbox">
                                <button
                                  className="rg-applied-btn rg-active"
                                  style={{ cursor: "default" }}
                                >
                                  Applied
                                </button>
                              </div>
                            ) : (
                              <div className="rg-likebtnbox">
                                <button
                                  className="rg-btn rg-active"
                                  onClick={this.onStatusChange}
                                >
                                  Apply Now
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className="alert "
                          role="alert"
                          style={{
                            display: "flex",
                          }}
                        >
                          <div>
                            {" "}
                            <h5> share jobs</h5>{" "}
                          </div>

                          <div>
                            <FacebookShareButton {...sharable_link}>
                              <FacebookIcon size={30} round={true} />
                            </FacebookShareButton>

                            <TwitterShareButton {...sharable_link}>
                              <TwitterIcon size={30} round={true} />
                            </TwitterShareButton>

                            <LinkedinShareButton {...sharable_link}>
                              <LinkedinIcon size={30} round={true} />
                            </LinkedinShareButton>

                            <RedditShareButton {...sharable_link}>
                              <RedditIcon size={30} round={true} />
                            </RedditShareButton>

                            <WhatsappShareButton {...sharable_link}>
                              <WhatsappIcon size={30} round={true} />
                            </WhatsappShareButton>

                            <EmailShareButton {...sharable_link}>
                              <EmailIcon size={30} round={true} />
                            </EmailShareButton>

                            <InstapaperShareButton {...sharable_link}>
                              <InstapaperIcon size={30} round={true} />
                            </InstapaperShareButton>
                          </div>
                        </div>
                      </div>
                    }
                    <div className="rg-adds rg-addmargin">
                      {this.props.banner && this.props.banner.map((item) => {
                        if (item.PAGE_LOCATION == "Job_Details") {
                          if (item.POSITION == "MIDDLE CENTRE") {
                            return (
                              <Link target="_blank" href={item.LINK} title="">
                                <figure>
                                  <Image
                                    onClick={(e) => this.BannerCilck(item, location, this.count + 1)}
                                    src={`${"https://s3rozgar.s3.ap-south-1.amazonaws.com/component/page_header/images/"}${item.BANNER_FILE}`} alt="img description"
                                    width={"1000"}
                                    height={"1000"}
                                  />
                                  <span>Ad</span>
                                </figure>

                              </Link>

                            )

                          }
                        }
                      })}
                    </div>
                    {/* {!companyDetail && <Shimmers />} */}
                    {companyDetail && (
                      <div className="rg-aboutcompany">
                        <div className="rg-sectionhead">
                          <h2>About Company</h2>
                        </div>
                        <div className="rg-aboutcompanybox">
                          <figure className="rg-aboutimg">
                            {companyDetail?.COMPANY_LOGO === "NA" ? (
                              <h2 className="logotext">
                                {companyDetail?.COMPANY_NAME.split(" ")
                                  .map((i) => i.substring(0, 1))
                                  .join("")}
                              </h2>
                            ) : (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${companyDetail?.COMPANY_LOGO}`}
                                width={"1000"}
                                height={"1000"}
                                alt={companyDetail?.COMPANY_NAME}
                              />
                            )}
                          </figure>
                          <div className="rg-aboutdetails">
                            <h4>
                              <span className="comname">
                                {companyDetail?.COMPANY_NAME}
                              </span>
                              <span>0 Reviews</span>
                            </h4>
                            <ul className="rg-employerjobs">
                              <li>
                                <span>{companyDetail?.COMPANY_TYPE}</span>
                              </li>
                            </ul>
                            <a
                              href={constant.component.joblist.url.replace(
                                ":url",
                                `${companyDetail.URL}-jobs`
                              )}
                              target="_blank"
                              className="rg-btn"
                            >
                              View Jobs
                            </a>
                          </div>
                          <div className="rg-description">
                            <p>
                              <strong>{companyDetail?.COMPANY_NAME}</strong>
                              <br />
                              {Parser(companyDetail?.ABOUT_COMPANY ? companyDetail?.ABOUT_COMPANY : '')}
                            </p>
                          </div>
                          <div className="rg-comaboutdetails">
                            <h4>Company Info</h4>
                            <p>
                              <strong>Address:</strong>{" "}
                              {companyDetail?.ADDRESS}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {similarJobList.length > 0 && (
                      <div className="rg-similarjobs">
                        <div className="rg-sectionhead">
                          <h2>Similar Jobs</h2>
                          <button
                            className="rg-btnviewall"
                            onClick={(e) => {
                              e.preventDefault();
                              this.props.router.back();
                            }}
                          >
                            View All
                          </button>
                        </div>

                        <div className="rg-featuredjobs">
                          {similarJobList.map((item, index) => {
                            const URL = item.COMPANY_URL ? item.COMPANY_URL + '-' + item.EMPLOYER_ID : 'rozgar' + '-' + item.EMPLOYER_ID;

                            let dynamicURL = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                            dynamicURL = dynamicURL.replace(/ /g, "");
                            return (
                              <div className="rg-featurejobholder">
                                <div className="rg-featurejob">
                                  <figure className="rg-companyimg">
                                    {item.COMPANY_LOGO === "NA" ? (
                                      <h3 className="logotext">
                                        {item.COMPANY_NAME.split(" ")
                                          .map((i) => i.substring(0, 1))
                                          .join("")}
                                      </h3>
                                    ) : (
                                      <Image
                                        width={"1000"}
                                        height={"1000"}
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                        alt={item.COMPANY_NAME}
                                      />
                                    )}
                                  </figure>
                                  <div className="rg-companycontent">
                                    <div className="rg-companyhead">
                                      <div className="rg-rightarea">
                                        <span className="rg-tagfeature">
                                          <i className="fa fa-clock mr-1"></i>
                                          {"" +
                                            getDateParts(item.CREATED_ON)
                                              .relativeTime}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="rg-similarcompanyname">
                                      <h3>
                                        <a
                                          target="_blank"
                                          href={constant.component.jobdetails.url.replace(
                                            ":url",
                                            dynamicURL
                                          )}
                                        >
                                          {item.JOB_TITLE}
                                        </a>
                                      </h3>
                                      <h6>
                                        <Link href={constant.component.companydetails.url.replace(":url", URL)}>
                                          {item.COMPANY_NAME}
                                        </Link>
                                      </h6>
                                      <div className="companyreviewbox">
                                        <span className="reviewnumber">
                                          {" "}
                                          <i className="fa fa-star"></i>
                                        </span>
                                        <a href="#">
                                          <span className="reviewlink">
                                            ( 0 Reviews)
                                          </span>
                                        </a>
                                      </div>
                                      <span>
                                        {item.JOB_DETAILS.length > 64
                                          ? Parser(item.JOB_DETAILS ?
                                            item.JOB_DETAILS.slice(0, 64) : ''
                                          ) + "..."
                                          : Parser(item.JOB_DETAILS ? item.JOB_DETAILS : '')}
                                      </span>
                                    </div>
                                    <div className="rg-rightarea mt-10">
                                      <a
                                        className={
                                          item.LISTNING_TYPE == "1"
                                            ? "rg-btnjobtag rg-internship mr-10"
                                            : item.LISTNING_TYPE == "2"
                                              ? "rg-btnjobtag rg-parttimejob mr-10"
                                              : "rg-fulltimejob rg-btnjobtag mr-10"
                                        }
                                        href="javascript:void(0);"
                                      >
                                        <i className="ti-thumb-up"></i>{" "}
                                        {item.LISTNING_TYPE == "1"
                                          ? "Regular"
                                          : item.LISTNING_TYPE == "2"
                                            ? "Featured"
                                            : "Premium"}
                                      </a>
                                      <div className="rg-tagfeaturetemp"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* )
                  } */}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 float-left">
                    <aside
                      id="rg-sidebarvtwo"
                      className="rg-sidebar rg-sidebarvtwo"
                    >
                      <div className="roz-create-cv">
                        <div className="urgent-hiring-area">
                          <Link href={constant.component.hiringfresherjob.url}>
                            <div className="hiring-img">
                              <Image
                                src={AnnounceImg01}
                                alt="hiring Image"
                                width={"1000"}
                                height={"1000"}
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="roz-create-cv">
                        <a
                          target="_blank"
                          href={constant.component.ResumeMaking.url}
                        >
                          <div className="create-cv-bg">
                            <div className="imgfree">
                              <Image
                                src={CVPic01}
                                alt="hiring Image"
                                width={"1000"}
                                height={"1000"}
                              />
                            </div>
                            <div className="create-text">
                              <div className="free-text">Free</div>
                              <h4>Create CV</h4>
                            </div>
                            <div className="d-flex btn-cv p-0">
                              <i className="fa fa-angle-double-right"></i>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div className="roz-company-hiring pm-roz-company-hiring">
                        <div className="company-hiring mb-3">
                          <div className="company-hiring-text">
                            <h3>Companies Hiring</h3>
                          </div>
                          <div className="company-hiring-view">
                            <a
                              data-interception="off"
                              target="_blank"
                              href={constant.component.jobsByCompany.url}
                            >
                              View All
                            </a>
                          </div>
                        </div>
                        <div className="company-hiring-logo inner-company-logo">
                          {TOP_COMPANY_IMAGES &&
                            TOP_COMPANY_IMAGES.length > 0 &&
                            TOP_COMPANY_IMAGES.map((item, index) => {

                              if (index < 6) {
                                return (
                                  <a
                                    href={constant.component.joblist.url.replace(
                                      ":url",
                                      `${item.URL}-jobs`
                                    )}
                                    target="_blank"
                                  >
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                      alt={item.COMPANY_NAME}
                                      width={1000}
                                      height={1000}
                                    />
                                  </a>
                                );
                              }
                            })}
                        </div>
                      </div>

                      <div className="rg-adds rg-jobsearchadd mt-2">
                        {this.props.banner && this.props.banner.map((item) => {
                          if (item.PAGE_LOCATION == "Job_Details") {
                            if (item.POSITION == "RIGHT") {
                              return (
                                <Link onClick={(e) => this.BannerCilck(item, location, count + 1)} target="_blank" href={item.LINK} title="">
                                  <figure>
                                    <Image
                                      src={`${"https://s3rozgar.s3.ap-south-1.amazonaws.com/component/page_header/images/"}${item.BANNER_FILE}`} alt="img description"
                                      width={"1000"}
                                      height={"1000"}
                                    />
                                    <span>Ad</span>
                                  </figure>

                                </Link>

                              )

                            }
                          }
                        })}


                      </div>
                      {
                        <div className="roz-aside-jobs-by-location">
                          <div className="roz-aside-jobs-by-location-box">
                            <h3>Jobs by Locality</h3>
                            {cities === undefined && (
                              <ul id="style-3">
                                <li>
                                  <i className="fa fa-angle-double-right">
                                    <Shimmers />
                                  </i>
                                </li>
                                <li>
                                  <i className="fa fa-angle-double-right">
                                    <Shimmers />
                                  </i>
                                </li>
                                <li>
                                  <i className="fa fa-angle-double-right">
                                    <Shimmers />
                                  </i>
                                </li>
                                <li>
                                  <i className="fa fa-angle-double-right">
                                    <Shimmers />
                                  </i>
                                </li>
                              </ul>
                            )}
                            <ul id="style-3">
                              {cities &&
                                cities.map((item) => {
                                  return (
                                    <li>
                                      <a
                                        target="_blank"
                                        href={constant.component.joblist.url.replace(
                                          ":url",
                                          `jobs-in-${item.URL}`
                                        )}
                                      >
                                        <i className="fa fa-angle-double-right"></i>{" "}
                                        Jobs in {item.CITY}
                                      </a>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      }
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ReactModal
            isOpen={this.state.openModal}
            style={{
              content: {
                top: "5%",
                left: "30%",
                right: "auto",
                bottom: "auto",
              },
              overlay: { backgroundColor: "rgba(15,29,45,0.70)" },
            }}
            onRequestClose={this.onCloseModal}
            backdrop="static"
          >
            <SignInForSaveUnsave
              leftBar={this.state.leftBar}
              history={this.props.router}
              onCloseModal={this.onCloseModal}
            />
          </ReactModal>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(jobdetails);
