import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  KeywordSearch,
  LocationSearch,
} from "@/action/dashboard";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  numberWithCommas,
} from "@/utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import stylehome from "../../components/homepage/stylehome.module.css";
import constant from "constant";
import bg from "src/assets/images/top-had-img.webp";
import LoanIcon from '../../src/assets/images/loan-icon.png'
import axios from "axios";
// import Loader from "components/Loader";
import dynamic from "next/dynamic";
import { getCookie, setCookie } from "cookies-next";
const Loader = dynamic(() => import('components/Loader'), { ssr: false });

const PremiumCompanySlider = dynamic(() => import('./premiumCompanySlider'), { loading: () => <Loader />, ssr: false });
const LatestJobSlider = dynamic(() => import('./latestJobslider'), { loading: () => <Loader />, ssr: false });
const FeaturedAndSponsoredCompanies = dynamic(() => import('./featuredAndSponsoredCompanies'), { loading: () => <Loader />, ssr: false });


const homepage = (props) => {

  const [tempKeyword, setTempKeyword] = useState("")
  const [keyword_list, set_keyword_list] = useState([])
  const [tempLocation, setTempLocation] = useState("")
  const [tempSkill, setTempSkill] = useState("")
  const [mobile, setMobile] = useState({ value: '', error: '', success: '' });

  const [QIdSkillCount, SetQIdSkillCount] = useState(props.data.QIdSkillCount);
  const [QIdCompanyCount, SetQIdCompanyCount] = useState(
    props.data.QIdCompanyCount
  );
  const [TOP_COMPANY_IMAGES, SET_TOP_COMPANY_IMAGES] = useState(
    props.data.topCompanyImagesRes.images
  );
  const [LOCATION_LIST, SET_LOCATION_LIST] = useState(
    props.data.premiumCityListRes
  );
  const [CITY_LIST, SET_CITY_LIST] = useState(
    props.data.premiumCityListRes.city
  );
  const [FEATURED_COMPANIES, SET_FEATURED_COMPANIES] = useState(
    props.data.topPremiumFeaturedCompanyListRes.featured
  );
  const [PREMIUM_COMPANIES, SET_PREMIUM_COMPANIES] = useState(
    props.data.topPremiumFeaturedCompanyListRes.premium
  );
  const [JOB_COUNT_BY_TOP_CATEGORY, SET_JOB_COUNT_BY_TOP_CATEGORY] = useState(
    props.data.jobCountByTopCategoryRes
  );
  const [Jobs, SetJobs] = useState(props.data.PremiumFeaturedJobs);
  const [QIdRoleCount, SetQIdRoleCount] = useState(props.data.QIdRoleCountData);
  const [keyWordSuggestion, SetkeyWordSuggestion] = useState([]);
  const [LocationSuggestion, setLocationSuggestion] = useState([]);
  const [popularVideoJdJobs, setPopularVideoJdJobs] = useState(
    props.data.popularVideoJdJobs
  );
  const [KEYWORD, setKEYWORD] = useState({
    value: [],
    error: "",
  });
  const [LOCATION, setLOCATION] = useState([]);
  const [EXPERIENCE, setEXPERIENCE] = useState([]);
  const [SALARY, setSALARY] = useState([]);
  // const [showModal, setshowModal] = useState(false);
  const [POSITIONURL, setPOSITIONURL] = useState("");
  const onSearchClick = () => {
    const url = constant.component.MobileSearch.url
    props.props.push(url)
  }


  const TopRozgarMedia = {
    dots: false, arrows: true, infinite: true, speed: 500, autoplay: true,
    slidesToShow: 7, slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
          arrows: false
        }
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: false
        }
      }
    ]
  };

  const latestvideojds = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
          arrows: false,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const TopCompanyHiring = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
          arrows: false,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };


  const onKeywordPress = (input, TYPE) => {
    if (TYPE === "KEYWORD") {
      KeywordSearch(input)
        .then((res) => {
          if (res.status) {
            SetkeyWordSuggestion(res.result);
          } else {
            alert(res.error);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (TYPE === "LOCATION") {
      LocationSearch(input)
        .then((res) => {
          if (res.status) {
            setLocationSuggestion(res.result);
          } else {
            alert(res.error);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const onKeywordChange = (selectedItems) => {
    const val = selectedItems.map((item) => {
      if (typeof item === "object") {
        return item.label;
      } else {
        return item;
      }
    });

    setKEYWORD({ ...KEYWORD, value: val });
  };
  

  const onLocationChange = (e) => {
    const val = e.map((item) => {
      if (typeof item === "object") {
        return item.label;
      } else {
        return item;
      }
    });

    setLOCATION(val);
  };
  const sendLink = async () => {

    if (mobile.value.length >= 10) {
      const res = await axios.post(`https://sms.rozgar.com/send-app-download-link`, { mobile: mobile.value })
      if (res.data.type === 'success') {
        setMobile({...mobile, value: '', success: `We have successfully sent App Download link to ${mobile.value}`, error: '' })
        setTimeout(() => {
          setMobile({ ...mobile,value: '', success: '',error: '' })
        }, 2000);
        
      }
      
    }
    else {
      setMobile({ ...mobile, error: `Please enter a valid mobile number` })

    }
  }

  const onSearch = (e) => {
    e.preventDefault();

    if (KEYWORD.value.length > 0) {
      let MINEXP = "";
      let MAXEXP = "";
      if (EXPERIENCE.length) {
        let exp = EXPERIENCE.split(",");
        if (exp && exp.length > 0) {
          MINEXP = exp[0];
          MAXEXP = exp[1];
        }
      }

      let MINSALARY = "";
      let MAXSALARY = "";
      if (SALARY.length) {
        let sal = SALARY.split(",");
        if (sal && sal.length > 0) {
          MINSALARY = sal[0];
          MAXSALARY = sal[1];
        }
      }
      let url = "";
      if (KEYWORD.value.length) {
        url = constant.component.searchjob.url + `?keyword=${KEYWORD.value}`;
      }

      if (LOCATION.length) {
        url = url + `&location=` + LOCATION;
      }
      if (EXPERIENCE.length) {
        url = url + `&exp=` + MINEXP + "-" + MAXEXP;
      }
      if (SALARY.length) {
        url = url + `&sal=` + MINSALARY + "-" + MAXSALARY;
      }
      let searchArr = []
      if (getCookie('s_data')) {
        searchArr = JSON.parse(getCookie('s_data'))
      }
      const { value: keyword_list } = KEYWORD
      if (keyword_list && keyword_list.length) {
        let data = {
          url: url,
          keyword: keyword_list
        }
        searchArr.push(data)
        searchArr = searchArr.reverse()
        searchArr = searchArr.filter((item, index) => {
          if (index <= 3) {
            return item
          }
        })
      }
      set_keyword_list(searchArr)
      setCookie('s_data', JSON.stringify(searchArr))
      window.location.href = url;
    } else {
      setKEYWORD({
        ...KEYWORD,
        error: "Please enter keywords to search relevant jobs",
      });
    }
  };

  const styling = {
    backgroundImage: `url(${bg.src})`,
  };

  // const onshowModal = () => {
  //   setshowModal(true);
  // };

  // const toggleModal = () => {
  //   setshowModal(false);
  // };

  function onJobSearch(e) {
    let keyword = e.target.value
    // let { KEYWORD, LOCATION } = state
    if (e.target.placeholder == "Location") {
      let location = e.target.value
      setTempLocation(location)
      if (e.code == "Enter") {
        if (tempKeyword != "" || KEYWORD.value.length > 0) {
          let LocationUrl;
          if (tempSkill != "") {

            LocationUrl = `${constant.component.searchjob.url}?location=${keyword}&keyword=${tempSkill}`
          }
          else if (KEYWORD.value.length > 0) {
            let [first] = KEYWORD.value
            LocationUrl = `${constant.component.searchjob.url}?location=${keyword}&keyword=${first}`
          }

          window.location.href = LocationUrl
          //  window.open(LocationUrl ,"_blank")
        } else {
          if (KEYWORD.value.length == 0)
            setKEYWORD({ ...KEYWORD, error: " " })
        }
      }
      return
    }

    if (e.target.placeholder.trim() == "Enter Skill, Company, Designation") {
      let url = ""
      setTempSkill(keyword)
      setKEYWORD({ ...KEYWORD, error: "" })
      if (tempLocation != "" && keyword && e.code == "Enter") {
        let LocationUrl = `${constant.component.searchjob.url}?location=${tempLocation}&keyword=${keyword}`
        window.location.href = LocationUrl
      }
      else if (keyword && e.code == "Enter" && tempLocation == "") {
        let url = constant.component.searchjob.url + `?keyword=${keyword}`
        window.location.href = url
        // window.location.reload()
      }
    }

    else if (KEYWORD.value.length > 0) {
      let keywords = []
      let LocationUrl = ""

      if (e.code == "Enter") {
        if (KEYWORD.value.length > 1) {
          Promise.all(KEYWORD.value.map(ele => keywords.push(ele)))
          LocationUrl = LocationUrl + `${constant.component.searchjob.url}?keyword=${keywords}`

        } else if (KEYWORD.value.length === 1) {
          if (LOCATION.value.length == 0) {
            let [first] = this.state.KEYWORD.value
            LocationUrl = LocationUrl + `${constant.component.searchjob.url}?keyword=${first}`
            window.location.href = LocationUrl
          } else {
            let [firstLocation] = this.state.LOCATION.value
            let [first] = this.state.KEYWORD.value

            LocationUrl = LocationUrl + `${constant.component.searchjob.url}?keyword=${first}&location=${firstLocation}`
            window.location.href = LocationUrl

          }

        }

        else if (LOCATION.value.length > 0) {
          if (e.type = "Enter") {
            if (KEYWORD.value.length == 0) {
              setKEYWORD({ ...KEYWORD, error: " " })
            }
          }
        }

      }
    }
  }
  useEffect(() => {
    if (getCookie('s_data')) {
      set_keyword_list(JSON.parse(getCookie('s_data')))
    } else {
      set_keyword_list([])
    }
  }, [])
console.log(KEYWORD.value,"KEYWORD");
  return (
    <React.Fragment>
      {/* {showModal && (
        <ModalWindow
          toggleModal={() => {
            toggleModal();
          }}
          className="CareerAstrologyModal">
          <VideoJds popularVideoJdJobs={POSITIONURL} />
        </ModalWindow>
      )} */}

      <div className="rg-sliderholder rg-sliderholder-sparkrle banner-search-mob-hidden homepage_loader"
        style={styling}>
        <div className="rg-slidercontentholder">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-10 push-lg-1">
                <div className="rg-slidercontent">
                  <h1>Looking for a Job?</h1>
                  <div className="rg-description">
                    <p>4 lakh+ Jobs for you to explore</p>
                  </div>
                  <form
                    onSubmit={onSearch}
                    className="rg-formtheme rg-formbannersearch home-search-bar-main pb-4">
                    <fieldset className="rg-searcharea">
                      <div className="rg-searchholder">
                        <div className="form-group rg-inputwithicon w-200">
                          <i className="lnr lnr-magnifier fw-bold"></i>
                          <Typeahead
                            className={
                              KEYWORD.error.length
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="keyword"
                            // style={{ height: "0px !important" }}
                            useCache={false}
                            clearButton={false}
                            multiple
                            allowNew={true}
                            name={"KEYWORD"}
                            selected={KEYWORD.value}
                            options={keyWordSuggestion}
                            placeholder=" Enter Skill, Company, Designation"
                            inputProps={e => console.log("iput props ", e)}
                            onKeyDown={(e) => onJobSearch(e)}
                            onInputChange={(e) => {
                              onKeywordPress(e, "KEYWORD");
                            }}
                            onChange={onKeywordChange}
                            emptyLabel
                          />
                        </div>
                      </div>
                      <div className="rg-searchholder pl-0"
                        style={{ width: "20%" }} >
                        <div className="form-group rg-inputwithicon">
                          <i className="ti-location-pin"></i>
                          <Typeahead
                            className="form-control"
                            id="location"
                            useCache={false}
                            clearButton={false}
                            maxResults={3}
                            multiple={true}
                            allowNew={true}
                            name={"LOCATION"}
                            selected={LOCATION}
                            options={LocationSuggestion}
                            placeholder="Location"
                            onKeyDown={(e) => onJobSearch(e)}
                            onInputChange={(e) => {
                              onKeywordPress(e, "LOCATION");
                            }}

                            onChange={(e) => {
                              onLocationChange(e);
                            }}
                            emptyLabel
                            style={{ height: "auto" }}
                          />
                        </div>
                      </div>

                      <div
                        className="rg-searchholder"
                        style={{ width: "25%", padding: "0px 10px" }}>
                        <span className="rg-select d-flex align-items-center">
                          <i className="lnr lnr-calendar-full"></i>
                          <select
                            name={EXPERIENCE.name}
                            value={EXPERIENCE.value}
                            onChange={(e) => {
                              setEXPERIENCE(e.target.value)
                            }}
                            data-placeholder="All"
                            style={{ padding: '10px', border: "none" }}
                          // className="chosen-select locations"

                          >
                            <option value="">Experience (in years)</option>
                            {[
                              { value: [0, 1], range: "0-1 Year" },
                              { value: [1, 3], range: "1-3 Years" },
                              { value: [3, 5], range: "3-5 Years" },
                              { value: [5, 7], range: "5-7 Years" },
                              { value: [7, 10], range: "7-10 Years" },
                              { value: [10, 12], range: "10-12 Years" },
                              { value: [12, 14], range: "12-14 Years" },
                              { value: [14, 16], range: "14-16 Years" },
                              { value: [16, 18], range: "16-18 Years" },
                              { value: [18, 20], range: "18-20 Years" },
                              { value: [20, 25], range: "20-25 Years" },
                              { value: [25, 30], range: "25-30 Years" },
                              { value: [30, undefined], range: "30+ Years" },
                            ].map((item) => {
                              return (
                                <option value={item.value}>{item.range}</option>
                              );
                            })}
                          </select>
                        </span>
                      </div>
                      <div
                        className="rg-searchholder"
                        style={{ width: "20%", padding: "0px 10px" }}
                      >
                        <span className="rg-select d-flex align-items-center">
                          <i className="fa fa-rupee"></i>
                          <select
                            name={"SALARY"}
                            value={SALARY}
                            onChange={(e) => setSALARY(e.target.value)}
                            data-placeholder="All"
                            style={{ padding: '10px', border: "none" }}
                          // className="chosen-select locations"
                          >
                            <option value="">Salary (in lacs)</option>
                            {[
                              { value: [0, 500000], range: "0-5 Lacs" },
                              { value: [500000, 1000000], range: "5-10 Lacs" },
                              {
                                value: [1000000, 15000000],
                                range: "10-15 Lacs",
                              },
                              {
                                value: [15000000, 2000000],
                                range: "15-20 Lacs",
                              },
                              {
                                value: [2000000, 25000000],
                                range: "20-25 Lacs",
                              },
                              {
                                value: [25000000, 3000000],
                                range: "25-30 Lacs",
                              },
                              {
                                value: [3000000, 4000000],
                                range: "30-40 Lacs",
                              },
                              {
                                value: [4000000, 5000000],
                                range: "40-50 Lacs",
                              },
                              {
                                value: [5000000, 6000000],
                                range: "50-60 Lacs",
                              },
                              {
                                value: [6000000, 7000000],
                                range: "60-70 Lacs",
                              },
                              {
                                value: [7000000, 8000000],
                                range: "70-80 Lacs",
                              },
                              {
                                value: [8000000, 9000000],
                                range: "80-90 Lacs",
                              },
                              {
                                value: [9000000, 10000000],
                                range: "90-100 Lacs",
                              },
                              { value: [10000000, undefined], range: "1 Cr+" },
                            ].map((item) => {
                              return (
                                <option value={item.value}>{item.range}</option>
                              );
                            })}
                          </select>
                        </span>
                      </div>
                      <div className="rg-searchbtn">
                        <button
                          type="submit"
                          className="rg-btn "
                          id="showtoast"
                        >
                          <i className="lnr lnr-magnifier fw-bold"></i>
                        </button>
                      </div>
                    </fieldset>
                    {KEYWORD.error.length > 0 && (
                      <span
                        className="text-danger"
                        style={{
                          textAlign: "center",
                          float: "left",
                          paddingLeft: "3px",
                        }}
                      >
                        {" "}
                        Please enter keywords to search relevant jobs{" "}
                      </span>
                    )}
                    <p className="searchjobview">
                      {keyword_list && keyword_list.map((item) => {
                        return (
                          <span className="searchlist"><Link target="_blank" href={item.url}><i className="fa fa-undo"></i> {item.keyword.join(',')}</Link></span>
                        )
                      })

                      }
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="companytoplogo">
        <div className="rozgarmela-resume-box">
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-center w-100">
                <Link
                  target="_blank"
                  href={constant.component.resumeMaking.url}
                  className="createCV-btn"
                >
                  <i className="ti-pencil-alt"></i> Create CV
                </Link>
                <Link
                  target="_blank"
                  href={constant.component.CreateJobAlert.url}
                  className="createalterjob-btn"
                >
                  <i className="ti-announcement"></i> Create a free Job Alert
                </Link>
                <Link
                  target="_blank"
                  href={constant.component.GovernmentState.url}
                  className="pmrozgar-btn"
                >
                  <i className="lnr lnr-briefcase"></i> Government Jobs
                </Link>
                <Link
                  target="_blank"
                  href={constant.component.educationLoan.url}
                  className="pmrozgar-btn"
                >
                  <Image className="loan-icon-bx" src={LoanIcon} alt="Loan Icon" /> Financial Support
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="comtop-pr-box top-comtop-pr-box">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rg-sectionhead pb-3">
                  <h2>Companies Hiring</h2>
                  <Link
                    data-interception="off"
                    className="rg-btnviewall mr-1"
                    target="_blank"
                    href={constant.component.jobsByCompany.url}
                  >
                    View All
                  </Link>
                </div>
                <div className="rg-top-companies-hiring">
                  <ul className="rg-btn-top-companies-hiring">
                    <Slider {...TopCompanyHiring}>
                      {TOP_COMPANY_IMAGES !== null &&
                        TOP_COMPANY_IMAGES.length > 0 &&
                        TOP_COMPANY_IMAGES.map((item, index) => {
                          return (
                            <li>
                              <Link
                                className="rg-top-companies-hiring"
                                href={constant.component.joblist.url.replace(
                                  ":url",
                                  `${item.URL}-jobs`
                                )}
                                target="_blank"
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                  alt={item.COMPANY_NAME}
                                  width={170}
                                  height={95}
                                />
                              </Link>
                            </li>
                          );
                        })}
                    </Slider>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comtop-pr-box personal-recruiter-box">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                {/* <Link
                  target="_blank"
                  href={constant.component.PersonalRecruiter.url}
                > */}
                <div className="rg-btnsjobstags">
                  <div className="own-personal-recruiter-head">
                    <span>Get your own Personal Recruiter</span>
                    <span>
                      <del className="pr-rupees-del">
                        <i className="fa fa-rupee pr-rupees"></i>14000
                      </del>{" "}
                      <i className="fa fa-rupee pr-rupees"></i>999
                    </span>
                  </div>
                  <ul className="rg-btnjobtags getprbox">
                    <li>
                      <Link
                        target="_blank"
                        className="rg-btnjobtag rg-fulltimejob"
                        href={constant.component.PersonalRecruiter.url}
                      >
                        <i className="fa fa-file-text pr-resume-bg"></i>{" "}
                        Resume Writing
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="rg-btnjobtag rg-fulltimejob"
                        href={constant.component.PersonalRecruiter.url}
                      >
                        <i className="fa fa-search pr-jsearch-bg"></i>{" "}
                        Personal Job Search
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="rg-btnjobtag rg-fulltimejob"
                        href={constant.component.PersonalRecruiter.url}
                      >
                        <i className="fa fa-linkedin-in"></i> Linked-In
                        Profile/ Other Job - site profiles
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="rg-btnjobtag rg-fulltimejob"
                        href={constant.component.PersonalRecruiter.url}
                      >
                        <i className="fa fa-snowflake-o pr-astro-bg"></i>{" "}
                        Astrology Driven Guidance
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main id="rg-main" className="rg-main rg-haslayout homemainSection">
        <section className="mobilehView">
          <div className="mobilehide full-screen">
            <div className="rg-wrapper">
              <div className="rg-search mobsearch">
                <input
                  type="button"
                  value="Enter Skill, Company, Designation"
                  onClick={onSearchClick}
                />
                <div className="icon">
                  <i className="lnr lnr-magnifier"></i>
                </div>
              </div>
            </div>

            <div className="rg-heading">
              <h2>
                Most Preferred
                <br />
                Job Search Partner
              </h2>
              <p>Access 4 Lakh + Jobs</p>
            </div>

            <div className="rg-mobietext">
              <Link className="btnlogin" href={constant.component.signin.url}>
                Login
              </Link>
              <Link
                className="btnregisternow"
                href={constant.component.register.url}
              >
                Register Now
              </Link>
            </div>


          </div>
        </section>


        <div className="mobilehView-comtop comtop-pr-box top-comtop-pr-box">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rg-sectionhead pb-3">
                  <h2>Companies Hiring</h2>
                  <Link
                    data-interception="off"
                    className="rg-btnviewall mr-1"
                    target="_blank"
                    href={constant.component.jobsByCompany.url}
                  >
                    View All
                  </Link>
                </div>
                <div className="rg-top-companies-hiring">
                  <ul className="rg-btn-top-companies-hiring">
                    {/* <Slider {...TopCompanyHiring}>
                      {TOP_COMPANY_IMAGES !== null &&
                        TOP_COMPANY_IMAGES.length > 0 &&
                        TOP_COMPANY_IMAGES.map((item, index) => {
                          return (
                            <li>
                              <Link
                                className="rg-top-companies-hiring"
                                href={constant.component.joblist.url.replace(
                                  ":url",
                                  item.URL
                                )}
                                target="_blank"
                              >
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                  alt={item.COMPANY_NAME}
                                  width={170}
                                  height={95}
                                />
                              </Link>
                            </li>
                          );
                        })}
                    </Slider> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LatestJobSlider
          Jobs={Jobs}
        />

        <PremiumCompanySlider
          PREMIUM_COMPANIES={PREMIUM_COMPANIES}
        />

        <section className="rg-haslayout rg-sectionspace" id="section3">
          <div className="container" id="container3">
            <div className="row" id="row3">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                <Link href={constant.component.jobsByCategory.url} target="_blank">
                  <div className="job-popular-box">
                    <Image
                      src={'https://d2apjlzdwu53ds.cloudfront.net/images/jop-popular.webp'}
                      alt="Popular Categories"
                      width={500}
                      height={500}
                    />
                    <span
                      data-interception="off"
                      className="btn-tpcategories"
                      target="_blank"
                    // href={constant.component.jobsByCategory.url}
                    >
                      VIEW ALL
                    </span>
                  </div>
                </Link>
              </div>
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 pl-0 pr-0">
                <div className="rg-ourprofessionals mobilefield">
                  {/* {JOB_COUNT_BY_TOP_CATEGORY === null && <Shimmer />} */}
                  {JOB_COUNT_BY_TOP_CATEGORY !== null &&
                    JOB_COUNT_BY_TOP_CATEGORY.length > 0 &&
                    JOB_COUNT_BY_TOP_CATEGORY.map((item, index) => {
                      if (index < 10) {
                        for (const [key, value] of Object.entries(item)) {
                          return (
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 float-left">
                              <Link
                                href={`${value.url}-jobs`}
                                target="_blank"
                              >
                                <div className="rg-ourprofessional height100 d-flex align-items-center">
                                  <div className="rg-professionaldetail">
                                    <div className="rg-popular-caregoriescontent">
                                      <div className="rg-popular-caregories-text">
                                        <h5>{key}</h5>
                                      </div>
                                      <div className="rg-popular-caregories-job">
                                        <h3 className="showalljob font-weight-600 mb-0">
                                          <span>{value.totalJobs}</span>
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        }
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section
          id="campusrogar"
          className="wow fadeInRight"
          data-wow-duration="1.4s"
        >
          <div className="container" id="container4">
            <div className="row m-0" id="row4">
              <div className="accelerate-your-job row m-0">
                <div className="col-12 col-sm-12 col-md-3 col-lg-2 text-center">
                  <div className="roz-sectionimg">
                    <Image src={'https://d2apjlzdwu53ds.cloudfront.net/images/acc-your-job-search.webp'} width={170} height={95} />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-8">
                  <div className="roz-sectiontext">
                    <h2>
                      Fresher Solutions : Trusted portal for employers and
                      universities
                    </h2>
                    <p>
                      One-stop solution for universities and employers for
                      quick recruitment.
                    </p>
                    <ul className="camp-key-ponts">
                      <li>
                        <p className="card-text sub-heading text-black">
                          14,000+ Placements
                        </p>
                      </li>
                      <li>
                        <p className="card-text sub-heading text-black">
                          Partnership with Top Companies
                        </p>
                      </li>
                      <li>
                        <p className="card-text sub-heading text-black">
                          18000+ University / Institution
                        </p>
                      </li>
                    </ul>
                    <div className="roz-cam-ban-bx">
                      <h3 className="com-icon-bx">
                        Campus Rozgar Suitable for:{" "}
                      </h3>
                      <ul>
                        <li>University</li>
                        <li> Institute</li>
                        <li>Recruiter</li>
                        <li>Employer</li>
                        <li>Candidate</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                  <div className="roz-section-by-rozgar text-right">
                    <Link
                      data-interception="off"
                      className="roz-btn-more"
                      target="_blank"
                      href="https://campus.rozgar.com/"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section
          id="counter-stats"
          className="wow fadeInRight"
          data-wow-duration="1.4s"
        >
          <div className="container" id="container5">
            <div className="row" id="row5">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rg-sectionhead mb-10">
                  <h2>Rozgar Statistics</h2>
                </div>
              </div>
              <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                <div className="services-block-three">
                  <a href="javascript:void(0)">
                    <div className="padding-15px-bottom">
                      <Image src={'https://d2apjlzdwu53ds.cloudfront.net/public/assets/images/icons/jobcount.png'} width={170} height={95} />
                    </div>
                    <div className="counting">{numberWithCommas(1156843)}</div>
                    <p className="xs-font-size13 xs-line-height-22">
                      Jobs & Counting
                    </p>
                  </a>
                </div>
              </div>

              <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                <div className="services-block-three">
                  <a href="javascript:void(0)">
                    <div className="padding-15px-bottom">
                      <Image src={'https://d2apjlzdwu53ds.cloudfront.net/public/assets/images/icons/clients.png'} width={170} height={95} />
                    </div>
                    <div className="counting">{numberWithCommas(9593)}</div>
                    <p className="xs-font-size13 xs-line-height-22">Clients</p>
                  </a>
                </div>
              </div>

              <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                <div className="services-block-three">
                  <a href="javascript:void(0)">
                    <div className="padding-15px-bottom">
                      <Image src={'https://d2apjlzdwu53ds.cloudfront.net/public/assets/images/icons/job-search.png'} width={170} height={95} />
                    </div>
                    <div className="counting">{numberWithCommas(12333676)}</div>
                    <p className="xs-font-size13 xs-line-height-22">
                      Candidates
                    </p>
                  </a>
                </div>
              </div>

              <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                <div className="services-block-three">
                  <a href="javascript:void(0)">
                    <div className="padding-15px-bottom">
                      <Image src={'https://d2apjlzdwu53ds.cloudfront.net/public/assets/images/icons/recruitment.png'} width={170} height={95} />
                    </div>
                    <div className="counting">{numberWithCommas(98653)}</div>
                    <p className="xs-font-size13 xs-line-height-22">
                      Recruiters
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedAndSponsoredCompanies
          FEATURED_COMPANIES={FEATURED_COMPANIES}
        />
        <section className="rg-haslayout rg-sectionspace" id="section7">
          <div className="container" id="container7">
            <div className="worried-about-box" id="worried1">
              <div className="row" id="row7">
                <div className="col-md-3">

                  <Image
                    src={'https://d2apjlzdwu53ds.cloudfront.net/images/next-interview.png'} width={436} height={189}
                  />

                </div>
                <div className="col-md-9">
                  <div className="nextinterview">
                    Worried about your Next Interview?
                    <br />
                    <span>
                      Start Preparing here with more than <strong>50K</strong>{" "}
                      Interview Questions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 plr-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead" id="rg-sectionhead">
                    <h2>Interview Questions by Role</h2>
                    <Link
                      target="_blank"
                      data-interception="off"
                      className="rg-btnviewall"
                      href={
                        constant.component.interviewQuestionByDesignation.url
                      }
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="rg-ourprofessionals">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 float-left">
                    <div className="rg-interview-questions-role-area">
                      <ul className="ulbox">
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionByDesignationId.url.replace(
                                  ":id",
                                  "software-engineer"
                                ),
                              state: {
                                DESIGNATION_ID: 2272,
                                DESIGNATION: "Software Engineer",
                              },
                            }}
                          >
                            <div className="rg-interview-questions-role-textarea">
                              <h3>
                                {/* <a data-interception="off"> */}
                                Software Engineer
                                {/* </a> */}
                              </h3>
                              <span>
                                {QIdRoleCount && QIdRoleCount.length > 3
                                  ? QIdRoleCount[0].designation
                                  : 0}{" "}
                                questions
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionByDesignationId.url.replace(
                                  ":id",
                                  "machine-learning-engineer"
                                ),
                              state: {
                                DESIGNATION_ID: 171,
                                DESIGNATION: "Machine Learning",
                              },
                            }}
                          >
                            <div className="rg-interview-questions-role-textarea">
                              <h3>
                                {/* <a data-interception="off"> */}
                                Machine Learning
                                {/* </a> */}
                              </h3>
                              <span>
                                {QIdRoleCount && QIdRoleCount.length > 3
                                  ? QIdRoleCount[1].designation
                                  : 0}{" "}
                                questions
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionByDesignationId.url.replace(
                                  ":id",
                                  "devops-manager"
                                ),
                              state: {
                                DESIGNATION_ID: 226,
                                DESIGNATION: "DevOps Manager",
                              },
                            }}
                          >
                            <div className="rg-interview-questions-role-textarea">
                              <h3>
                                {/* <a data-interception="off"> */}
                                DevOps Manager
                                {/* </a> */}
                              </h3>
                              <span>
                                {QIdRoleCount && QIdRoleCount.length > 3
                                  ? QIdRoleCount[2].designation
                                  : 0}{" "}
                                questions
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionByDesignationId.url.replace(
                                  ":id",
                                  "front-end-developer"
                                ),
                              state: {
                                DESIGNATION_ID: 262,
                                DESIGNATION: "Front End Developer",
                              },
                            }}
                          >
                            <div className="rg-interview-questions-role-textarea">
                              <h3>
                                {/* <a data-interception="off"> */}
                                Front End Developer
                                {/* </a> */}
                              </h3>
                              <span>
                                {QIdRoleCount && QIdRoleCount.length > 3
                                  ? QIdRoleCount[3].designation
                                  : 0}{" "}
                                questions
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 plr-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead" id="rg-sectionhead">
                    <h2>Interview Questions by Skills</h2>
                    <Link
                      target="_blank"
                      data-interception="off"
                      className="rg-btnviewall"
                      href={constant.component.interviewQuestionBySkills.url}
                    >
                      View All
                    </Link>
                  </div>
                </div>

                <div className="rg-ourprofessionals questions-skills-mobile ">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 float-left">
                    <div className="rg-interview-questions-skills-area">
                      <ul className="ulbox">
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionBySkillsId.url.replace(
                                  ":id",
                                  "java"
                                ),
                              state: { skillId: 13 },
                            }}
                          >
                            <div className="iq-skills-imagebox">
                              <Image
                                src={'https://d2apjlzdwu53ds.cloudfront.net/images/java-logo.jpg'}
                                alt="image description"
                                width={170}
                                height={95}
                              />
                              <div className="iq-skills-imagebox-textarea">
                                <h3>
                                  {/* <a data-interception="off"> */}
                                  JAVA
                                  {/* </a> */}
                                </h3>
                                <span>
                                  {QIdSkillCount && QIdSkillCount.length > 3
                                    ? QIdSkillCount[0].skill
                                    : 0}{" "}
                                  questions
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionBySkillsId.url.replace(
                                  ":id",
                                  "python"
                                ),
                              state: { skillId: 58 },
                            }}
                          >
                            <div className="iq-skills-imagebox">
                              <Image
                                src={'https://d2apjlzdwu53ds.cloudfront.net/images/python-logo.jpg'}
                                alt="image description"
                                width={170}
                                height={95}
                              />
                              <div className="iq-skills-imagebox-textarea">
                                <h3>
                                  {/* <a data-interception="off"> */}
                                  Python
                                  {/* </a> */}
                                </h3>
                                <span>
                                  {QIdSkillCount && QIdSkillCount.length > 3
                                    ? QIdSkillCount[1].skill
                                    : 0}{" "}
                                  questions
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionBySkillsId.url.replace(
                                  ":id",
                                  "php"
                                ),
                              state: { skillId: 11 },
                            }}
                          >
                            <div className="iq-skills-imagebox">
                              <Image
                                src={'https://d2apjlzdwu53ds.cloudfront.net/images/php-logo.jpg'}
                                alt="image description"
                                width={170}
                                height={95}
                              />
                              <div className="iq-skills-imagebox-textarea">
                                <h3>
                                  {/* <a
                              data-interception="off"
                              className="rg-onMouseHover"
                            > */}
                                  PHP
                                  {/* </a> */}
                                </h3>
                                <span>
                                  {QIdSkillCount && QIdSkillCount.length > 3
                                    ? QIdSkillCount[2].skill
                                    : 0}{" "}
                                  questions
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={{
                              pathname:
                                constant.component.interviewQuestionBySkillsId.url.replace(
                                  ":id",
                                  "networking"
                                ),
                              state: { skillId: 1 },
                            }}
                          >
                            <div className="iq-skills-imagebox">
                              <Image
                                src={'https://d2apjlzdwu53ds.cloudfront.net/images/Networking.jpg'}
                                alt="image description"
                                style={{ maxWidth: "35px" }}
                                width={35}
                                height={95}
                              />
                              <div className="iq-skills-imagebox-textarea">
                                <h3>
                                  {/* <a data-interception="off"> */}
                                  Networking
                                  {/* </a> */}
                                </h3>
                                <span>
                                  {QIdSkillCount && QIdSkillCount.length > 3
                                    ? QIdSkillCount[3].skill
                                    : 0}{" "}
                                  questions
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 plr-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead" id="rg-sectionhead">
                    <h2>Interview Questions by Company</h2>
                    <Link
                      target="_blank"
                      data-interception="off"
                      className="rg-btnviewall"
                      href={constant.component.interviewQuestionByCompany.url}
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="rg-ourprofessionals">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 float-left">
                    <div className="rg-interview-questions-com-area questions-company-mobile">
                      <ul className="ulbox">
                        {QIdCompanyCount.map((i) => {

                          return (
                            <li>
                              <Link
                                target="_blank"
                                href={{
                                  pathname:
                                    constant.component.interviewQuestionByCompanyId.url.replace(
                                      ":id",
                                      i.companydetails.URL
                                    ),
                                }}
                              >
                                <div className="iq-com-imagebox">
                                  <Image
                                    className="incombylogo"
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${i.companydetails.COMPANY_LOGO}`}
                                    alt="image description"
                                    width={170}
                                    height={95}
                                  />
                                  <div className="iq-com-imagebox-textarea">
                                    <h3>
                                      {/* <a
                                  data-interception="off"
                                  className="rg-onMouseHover"
                                > */}
                                      {i.companydetails.COMPANY_NAME.length >
                                        16
                                        ? i.companydetails.COMPANY_NAME.slice(
                                          0,
                                          16
                                        )
                                        : i.companydetails.COMPANY_NAME}
                                      {/* </a> */}
                                    </h3>
                                    <span>{i.company} Questions</span>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="section8">
          <div className="container" id="container8">
            <div className="mobileappbg" id="mobile1">
              <div className="row" id="row8">
                <div className="col-xs-12 col-sm-12 col-md-5">
                  <h3>Get Rozgar app link on your mobile</h3>
                  <p>Available for both Android and iOS apps</p>
                  <div className="appsearch">
                    <input className={mobile.error.length > 0 && mobile.value.length < 10 && "error"} type="text" name={'mobile'} value={mobile.value} onChange={(e) => {
                      if (e.target.value.length <= 10 && !isNaN(e.target.value)) {
                        setMobile({ ...mobile, value: e.target.value })
                      }
                    }} placeholder="Enter mobile number..." />

                    <div className="button-src"
                      onClick={() => { sendLink() }}
                    >
                      <span
                        title="Get Rozgar app link on your mobile"
                      >
                        <button>Get&nbsp;link</button>
                      </span>
                    </div>
                  </div>

                  {(mobile.success.length > 0 && <span className="text-success">{mobile.success}</span>) ||

                  (mobile.error.length > 0 && mobile.value.length < 10 && <span className="text-danger">{mobile.error}</span>)}
                </div>
                <div className="col-md-4 d-flex align-items-center">
                  <strong className="applogo">
                    <Link target="_blank" href='https://play.google.com/store/apps/details?id=com.app.rozgar' data-interception="off">
                      <Image
                        src={'https://d2apjlzdwu53ds.cloudfront.net/images/android-img.webp'}
                        alt="Android Logo"
                        width={130}
                        height={32}
                      />
                    </Link>{" "}
                    &nbsp;
                    <Link target="_blank" href='https://apps.apple.com/app/id6445827267' data-interception="off">
                      <Image
                        src={'https://d2apjlzdwu53ds.cloudfront.net/images/apple-img.webp'}
                        alt="Apply Logo"
                        width={130}
                        height={32}
                      />
                    </Link>
                  </strong>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 text-left">
                  <div className="appdeveloper-vector">
                    <Image
                      src={'https://d2apjlzdwu53ds.cloudfront.net/images/appdev.webp'}
                      alt="App Development"
                      width={190}
                      height={100}
                    />
                  </div>
                </div>
              </div>
              <div className="appshaperight">
                <Image
                  src={'https://d2apjlzdwu53ds.cloudfront.net/images/app-shape-right.webp'}
                  alt="App Shape"
                  width={170}
                  height={95}
                />
              </div>
            </div>
          </div>
        </section>


        <section className="rg-location-section rg-haslayout" id="section9">
          <div className="container" id="container9">
            <div className="row" id="row9">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-10">
                <div className="rg-sectionhead">
                  <h2 className="pb-2">Jobs by Location</h2>
                  <Link
                    data-interception="off"
                    className="rg-btnviewall"
                    target="_blank"
                    href={constant.component.jobsByLocation.url}
                  >
                    View All
                  </Link>
                </div>

                <div className="roz-jobbylocation">
                  <ul>
                    {/* {LOCATION_LIST === null && <Shimmer />} */}
                    {LOCATION_LIST !== null &&
                      CITY_LIST !== null &&
                      CITY_LIST.length > 0 &&
                      CITY_LIST.map((item, index) => {
                        if (index < 30) {
                          return (
                            <li>
                              <i className="lnr lnr-map-marker"></i>{" "}
                              <Link
                                data-interception="off"
                                target="_blank"
                                href={constant.component.joblist.url.replace(
                                  ":url",
                                  `jobs-in-${item.URL}`
                                )}
                              >
                                {" "}
                                Jobs in{" "}
                                {item.CITY.length > 15
                                  ? item.CITY.substring(0, 13) + ".."
                                  : item.CITY}
                              </Link>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>




        <section className="rozgar-media-section comtop-pr-box top-comtop-pr-box">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rg-sectionhead rozgar-media-section pb-3">
                  <h2>Rozgar in Media</h2>
                </div>
                <div className="rg-top-companies-hiring">
                  <ul className="rg-btn-top-companies-hiring">
                    <Slider {...TopRozgarMedia}>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/sahara-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/dainikJ-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/nbtimes-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/news18-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/newsX-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/indiaahead-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/insa-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/dailyH-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/panjabK-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                      <li>
                        <a className="rg-top-companies-hiring">
                          <Image
                            src={'https://d2apjlzdwu53ds.cloudfront.net/images/ACN-logo.jpg'}
                            width={170}
                            height={95}
                          />
                        </a>
                      </li>
                    </Slider>


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={`${stylehome["rg_fab_container__22WmJ"]} ${stylehome["rg_FixedActionButton_slideUp__10w8J"]}`}>
          <button className={`${stylehome["FixedActionButton_btn_container__1bJDw"]}`}>
            <span className={`${stylehome["FixedActionButton_btn_content__6kVvO"]}`}><Image src={'https://d2apjlzdwu53ds.cloudfront.net/images/explore.png'} width={58} height={116} style={{ maxWidth: '16%', height: 'auto', marginRight: "10px", transform: "rotate(-38deg)" }} /> Explore in app</span>
            <div id='section07' className={stylehome.FixedActionButton_arrowAnimtion__zhciW}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </main>


    </React.Fragment >
  );
};

export default homepage;
