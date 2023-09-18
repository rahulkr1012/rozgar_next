import React, { Component } from "react";
import swal from "sweetalert";
import { applyJobs } from "@/action/dashboard";
import constant from "constant";
import moment from "moment";
import { getDateParts, ToSeoUrl } from "@/utils";
import {
  getPremiumJobs,
  getSaveJobList,
  SaveJobs,
} from "@/action/CandidateAction";
import noRecordImg from "@/assets/images/noresult.jpg";
import reward from "../../assets/images/rewards.png";
import Pagination from "react-js-pagination";
import LoadingOverlay from "react-loading-overlay";
import { SpinnerCircular } from "spinners-react";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import FilteredHeader from "components/Filtered_Header";
import { getLoggedInUserData } from "nextCookie";
import Image from "next/image";
import Loader from 'components/common/rewardsLoader/Loader'
import SideLoader from 'components/common/RecomendedJobsLoader/SideLoader'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      detail: getCookie(constant.keys.cd)
        ? JSON.parse(getCookie(constant.keys.cd))
        : {},
      addUpdate: getCookie(constant.keys.addAndUpdate)
        ? JSON.parse(getCookie(constant.keys.addAndUpdate))
        : {},
      showShimmer: true,
      toastContent: false,
      count: 0,
      pageNumber: 1,
      saveList: [],
      showLoader: false,
      ud: this.props.ud,
    };
  }

  componentDidMount() {
    const { JOB_ID } = this.state.addUpdate ? this.state.addUpdate : "";
    if (JOB_ID) {
      this.applyJobs(JOB_ID);
    }
    this.PremiumJobsList(this.state.pageNumber);
    this.savedJobsDetail();
  }

  savedJobsDetail = () => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    getSaveJobList({ CANDIDATE_ID: CANDIDATE_ID })
      .then((res) => {
        if (res.status) {
          this.setState({ saveList: res.result.list.map((i) => i.JOB_ID) });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSavedJobs = (model) => {
    SaveJobs(model)
      .then((res) => {
        this.setState({ saveState: res.result });
      })
      .catch((err) => {
        alert(err);
      });
  };

  onClickSave = (JOB_ID) => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    if (CANDIDATE_ID) {
      this.getSavedJobs({
        CANDIDATE_ID: CANDIDATE_ID,
        JOB_ID: JOB_ID,
        ACTION: "save",
      });
      this.setState({ saveList: [...this.state.saveList, JOB_ID] });
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
      this.setState({
        saveList: this.state.saveList?.filter((e) => e !== JOB_ID),
      });
    }
  };

  applyJobs = (JOB_ID) => {
    const { CANDIDATE_ID } = this.state.detail ? this.state.detail : "";
    const model = {
      CANDIDATE_ID: CANDIDATE_ID,
      JOB_ID: JOB_ID,
    };
    applyJobs(model)
      .then((res) => {
        if (res.status) {
          this.setState({ toastContent: true });
          sessionStorage.removeItem("addAndUpdate");
        } else {
          swal({
            icon: "error",
            text: res.error,
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  PremiumJobsList = (pageNumber) => {
    this.setState({ showLoader: true });
    getPremiumJobs({ pageNumber: pageNumber })
      .then((res) => {
        if (res.status) {
          this.setState({ showLoader: false });
          setTimeout(() => {
            this.setState({ showShimmer: false });
          }, 1000);
          this.setState({
            list: res.result.premiumJobList,
            count: res.result.count.total,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ showLoader: false });
      });
  };

  handlePageChange = (pageNumber) => {
    this.setState({
      pageNumber: pageNumber,
    });
    this.PremiumJobsList(pageNumber);
  };

  render() {
    const { ud } = this.props;
    const { showLoader } = this.state

    return (
      <React.Fragment>
        <Head>
          <title title={"Premium Jobs | Rozgar.com"}>
            {"Premium Jobs | Rozgar.com"}
          </title>
          <meta name="HandheldFriendly" content="True" />
          <meta
            name="description"
            content={"Premium Jobs " + constant.metaDescription}
          />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:site_name" content="Rozgar.com" />
          <meta property="og:title" content={"Premium Jobs "} />
          <meta
            property="og:description"
            content={"Premium Jobs " + constant.metaDescription}
          />
          <meta property="og:url" content={"https://rozgar.com/Premium-jobs"} />
          <meta
            property="og:image"
            content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
          />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Premium Jobs | Rozgar.com"} />
          <meta
            name="twitter:description"
            content={"Premium Jobs " + constant.metaDescription}
          />
          <meta
            name="twitter:url"
            content={"https://rozgar.com/Premium-jobs"}
          />
          <meta
            name="twitter:image"
            content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png"
          />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
        </Head>
        <FilteredHeader ud={this.state.ud} />

        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <div className="rg-sectionspace rg-haslayout pt-0">
            <div className="rozgar-jobbylocsearch pt-2 pb-2">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="rg-title">
                      <h3 className="text-white">Premium Jobs for You</h3>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="numofsavejob">
                      {this.state.list ? (
                        <span className="font-20">{`${this.state.list.length} Jobs based on Your Desired Preferences`}</span>
                      ) : (
                        ""
                      )}
                      {/* <small className='pl-10'>Noida <Link href=''><i class="ti-pencil"></i></Link></small> */}
                      {/* <span className='recjobapply-box font-16'>
                        You can select upto 5 jobs to apply <Link href='' className='recjobapply'>Apply</Link>
                        </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--************************************
Search Area end
*************************************-->
<!--************************************
Blog Grid Start
*************************************--> */}
            <div className="rg-haslayout mt-4">
              <div className="container">
                <div className="row">
                  <div id="rg-threecolumns" className="rg-threecolumns">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left">
                      <div className="rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree">
                        <div className="row">

                          <div className="col-md-8">
                            {this.state.toastContent && (
                              <div
                                className=""
                                style={{
                                  padding: "18px 24px",
                                  borderLeft: "4px solid #6bcf38",
                                  boxShadow: "4px 3px #e4e4e4",
                                  margin: "2px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "1.4em",
                                      alignItems: "center",
                                    }}
                                  >
                                    Job Applied Successfully
                                  </p>
                                  {/* <Link href=''>Send Me Jobs Like This</Link> */}
                                </div>
                              </div>
                            )}

                            {this.state.list && this.state.list == 0 && (
                              <div
                                className="rg-featurejob text-danger pt-20"
                                style={{ textAlign: "center" }}
                              >
                                <img
                                  src={noRecordImg}
                                  style={{ maxWidth: "30%" }}
                                ></img>
                                <h4>
                                  You have not completed your profile yet.
                                </h4>
                                <h6>
                                  <Link
                                    href={constant.component.editProfile.url}
                                    style={{ color: "#EE6828" }}
                                  >
                                    Click here
                                  </Link>{" "}
                                  to complete your profile and start getting
                                  recommended jobs
                                </h6>
                                {/* <p>Only cities/states/country names are accepted in location field</p> */}
                                <p>
                                  {" "}
                                  You can browse jobs by{" "}
                                  <Link
                                    href={constant.component.jobsByCategory.url}
                                  >
                                    Functional Area, Industry
                                  </Link>
                                  ,{" "}
                                  <Link
                                    href={constant.component.jobsByCompany.url}
                                  >
                                    Company
                                  </Link>
                                  ,{" "}
                                  <Link
                                    href={constant.component.jobsBySkill.url}
                                  >
                                    {" "}
                                    Skills{" "}
                                  </Link>{" "}
                                  and{" "}
                                  <Link
                                    href={
                                      constant.component.jobsByDesignation.url
                                    }
                                  >
                                    Designations
                                  </Link>{" "}
                                </p>
                                <Link
                                  href={constant.component.login.url}
                                  class="rg-btn rg-active btn-primary mb-20"
                                  id="showtoast"
                                >
                                  <span className="text-white">
                                    Complete your profile
                                  </span>
                                </Link>
                              </div>
                            )}
                            {showLoader ? <Loader /> :
                              <div className="row">
                                <div className="col-md-12">
                                  {this.state.list &&
                                    this.state.list.map((data) => {
                                      var a = data.CREATED_ON
                                        ? moment([
                                          parseInt(
                                            moment(data.CREATED_ON).format(
                                              "YYYY"
                                            )
                                          ),
                                          parseInt(
                                            moment(data.CREATED_ON).format("MM")
                                          ),
                                          parseInt(
                                            moment(data.CREATED_ON).format("DD")
                                          ),
                                        ])
                                        : "";
                                      var b = moment([
                                        parseInt(moment().format("YYYY")),
                                        parseInt(moment().format("MM")),
                                        parseInt(moment().format("DD")),
                                      ]);
                                      var days = b.diff(a, "days");
                                      // const dynamicURLOne = ToSeoUrl(data.JOB_TITLE) + '_' + ToSeoUrl(data.JOB_DETAILS) + '_' + 'EXP' + '-' + ToSeoUrl(data.WORK_EXP_MIN) + '_' + ToSeoUrl(data.WORK_EXP_MAX) + '_' + data.CUSTOM_JOB_ID + '_' + ToSeoUrl(data.KEYWORDS) + '?src=SIMILAR_JOBS=' + data.JOB_ID
                                      let dynamicURLOne =ToSeoUrl(data.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(data.JOB_TITLE) + '-' + data.JOB_ID
                                      dynamicURLOne = dynamicURLOne.replace(
                                        / /g,
                                        ""
                                      );
                                      return (
                                        <div className="rg-featurejobholder">
                                          <div className="rg-featurejob">
                                            <figure className="rg-companyimg">
                                              {data.COMPANY_LOGO === "NA" ? (
                                                <h6 style={{ marginBottom: "0" }}>
                                                  {data.COMPANY_NAME &&
                                                    data.COMPANY_NAME.split(" ")
                                                      .length === 1
                                                    ? data.COMPANY_NAME.slice(
                                                      0,
                                                      1
                                                    )
                                                    : data.COMPANY_NAME.split(" ")
                                                      .map((i) =>
                                                        i.substring(0, 1)
                                                      )
                                                      .join("")
                                                      .slice(0, 3)}
                                                </h6>
                                              ) : (
                                                <img
                                                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${data.COMPANY_LOGO}`}
                                                  alt={data.COMPANY_NAME}
                                                  width={138}
                                                  height={78}
                                                />
                                              )}
                                            </figure>
                                            {/* <input className='checkapply'  type='checkbox'/> */}
                                            <div className="rg-companycontent">
                                              <div className="rg-companyhead">
                                                <div className="rg-rightarea">
                                                  <a
                                                    className="rg-tagfeature"
                                                    href="javascript:void(0);"
                                                  >
                                                    <i className="fa fa-clock"></i>{" "}
                                                    Posted{" "}
                                                    {
                                                      getDateParts(
                                                        data.CREATED_ON
                                                      ).relativeTime
                                                    }
                                                  </a>
                                                </div>
                                              </div>
                                              <div className="rg-companyname">
                                                <h3>
                                                  <a
                                                    target="_blank"
                                                    href={constant.component.jobdetails.url.replace(
                                                      ":url",
                                                      dynamicURLOne
                                                    )}
                                                  >
                                                    {data.JOB_TITLE}
                                                  </a>
                                                </h3>
                                                <h6>{data.COMPANY_NAME}</h6>
                                                <div className="companyreviewbox">
                                                 
                                                  <span className="reviewnumber">
                                                    <i className="fa fa-star"></i>
                                                  </span>
                                                  <a href="#">
                                                    <span className="reviewlink">
                                                    ({data.REVIEW_COUNT ? data.REVIEW_COUNT : 0} Reviews)
                                                    </span>
                                                  </a>
                                                </div>
                                              </div>
                                              <div className="rg-description">
                                                <p>
                                                  {" "}
                                                  <span>
                                                    {" "}
                                                    {data.JOB_DETAILS &&
                                                      data.JOB_DETAILS.length === 0
                                                      ? "No Discription Found"
                                                      : data.JOB_DETAILS.length >
                                                        116
                                                        ? `${data.JOB_DETAILS.slice(
                                                          0,
                                                          116
                                                        )}...`
                                                        : data.JOB_DETAILS}
                                                  </span>
                                                </p>
                                                <ul className="skilllist">
                                                  <span>
                                                    {" "}
                                                    {data.KEYWORDS.length > 60
                                                      ? `${data.KEYWORDS.slice(
                                                        0,
                                                        60
                                                      )}...`
                                                      : data.KEYWORDS}
                                                  </span>
                                                </ul>
                                              </div>
                                              <div className="rg-rightarea">
                                                <a
                                                  className="rg-btnjobtag rg-fulltimejob mr-10 mt-1"
                                                  href="javascript:void(0);"
                                                >
                                                  <i className="ti-crown"></i>{" "}
                                                  {data.LISTNING_TYPE == 1
                                                    ? " REGULAR"
                                                    : data.LISTNING_TYPE == 2
                                                      ? " FEATURED"
                                                      : " PREMIUM"}
                                                </a>
                                                {!this.state.saveList.includes(
                                                  data.JOB_ID
                                                ) ? (
                                                  <a
                                                    className="rg-tagfeature"
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      this.onClickSave(
                                                        data.JOB_ID
                                                      )
                                                    }
                                                    style={{
                                                      cursor: "pointer",
                                                      fontSize: "1em",
                                                    }}
                                                  >
                                                    <i className="fa fa-star fa-sm"></i>{" "}
                                                    Save
                                                  </a>
                                                ) : (
                                                  <a
                                                    className="rg-tagfeature"
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      this.onClickUnSave(
                                                        data.JOB_ID
                                                      )
                                                    }
                                                    style={{
                                                      cursor: "pointer",
                                                      fontSize: "1em",
                                                    }}
                                                  >
                                                    <i
                                                      className="fa fa-star fa-sm"
                                                      style={{ color: "#eea21d" }}
                                                    ></i>{" "}
                                                    Saved
                                                  </a>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          <ul className="rg-professionalinfo">
                                            <li>
                                              <i className="lnr lnr-briefcase"></i>
                                              <span className="pr-10">
                                                {" "}
                                                {data.WORK_EXP_MAX <= 1
                                                  ? `${data.WORK_EXP_MIN} - ${data.WORK_EXP_MAX} Year`
                                                  : `${data.WORK_EXP_MIN} - ${data.WORK_EXP_MAX} Years`}
                                              </span>
                                            </li>
                                            <li>
                                              <i className="fa fa-rupee"></i>
                                              <span>
                                                {" "}
                                                {data.CTC_MIN === "" &&
                                                  data.CTC_MAX === ""
                                                  ? "Not Disclosed"
                                                  : `${data.CTC_MIN} - ${data.CTC_MAX}`}
                                              </span>
                                            </li>
                                            <li>
                                              <i className="lnr lnr-map-marker"></i>
                                              <span>
                                                {data.IS_WORK_FROM_HOME === "N"
                                                  ? data.STATE
                                                  : "Remote"}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      );
                                    })}
                                </div>
                                {
                                  <nav className="rg-pagination">
                                    <ul>
                                      <Pagination
                                        activePage={this.state.pageNumber}
                                        itemsCountPerPage={20}
                                        totalItemsCount={this.state.count}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                      />
                                    </ul>
                                  </nav>
                                }
                              </div>}
                          </div>
                          <div className="col-md-4">
                            {showLoader ? <SideLoader /> :

                              <div className="savejobs-aside">
                                <ul>
                                  <li>
                                    <Link href="/recommended-jobs">
                                      <i class="ti-bookmark"></i>
                                      <span style={{ color: "#000" }}>
                                        Recommended Job
                                      </span>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/featured-jobs">
                                      <i class="lnr lnr-bullhorn"></i>
                                      <span style={{ color: "#000" }}>
                                        Featured Job
                                      </span>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/interview-questions">
                                      <i className="ti-crown"></i>
                                      <span style={{ color: "#000" }}>
                                        Interview Question
                                      </span>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/top-companies">
                                      <i class="lnr lnr-apartment"></i>{" "}
                                      <span
                                        style={{
                                          color: "#000",
                                          marginLeft: "-6px",
                                        }}
                                      >
                                        Top Companies
                                      </span>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/fresher-jobs">
                                      <i className="lnr lnr-graduation-hat"></i>
                                      <span style={{ color: "#000" }}>
                                        Freshers Jobs
                                      </span>{" "}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/browse-jobs">
                                      <i class="lnr lnr-checkmark-circle"></i>
                                      <span style={{ color: "#000" }}>
                                        All Jobs
                                      </span>{" "}
                                    </Link>
                                  </li>

                                  {/* <li><Link href="/government-jobs"><i class="lnr lnr-laptop"></i><span style={{ color: '#000' }}>Government Jobs</span> </Link></li> */}
                                  {/* <li><Link href="/international-jobs"><i class="fa fa-plane"></i><span style={{ color: '#000' }}>International Jobs</span> </Link></li> */}
                                  <li>
                                    <Link href="/rewards">
                                      <Image
                                        className="imgrewards"
                                        src={reward}
                                      />
                                      <span
                                        style={{
                                          color: "#000",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        Rewards
                                      </span>{" "}
                                    </Link>
                                  </li>
                                </ul>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps({ req }) {
  let ud = getLoggedInUserData(req);

  if (ud == null) {
    return {
      redirect: {
        destination: "/?alert=true",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ud: ud,
    },
  };
}
