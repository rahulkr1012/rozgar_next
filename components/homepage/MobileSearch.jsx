import React, { Component } from 'react'
import { IQTotalCompanyById,  IQTotalDesignationById, IQTotalSkillById, jobCountByTopCategory, KeywordSearch, LocationSearch,  topCompanyImages,topPremiumFeaturedCompanyList } from '@/action/dashboard';
import constant from 'constant';
import { Typeahead } from 'react-bootstrap-typeahead';
import {  numberWithCommas, onChange, setError, setOptions, validateForm, ToSeoUrl, randomIntFromInterval } from '@/utils';
import Companylogo from '@/assets/images/COMPANY_LOGO.png'
import { premiumCityList } from '@/action/jobsByActions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from 'components/Loader'
import networkinglogo from 'src/assets/images/Networking.jpg'
import moment from 'moment';
import JobPopular from '@/assets/images/jop-popular.jpg'
import AccYourJobSearch from '@/assets/images/acc-your-job-search.jpg'
import NextInterView from '@/assets/images/next-interview.png'
import JavaLogo from '@/assets/images/java-logo.jpg'
import PythonLogo from '@/assets/images/python-logo.jpg'
import PHPLogo from '@/assets/images/php-logo.jpg'
import AndroidImg from '@/assets/images/android-img.png'
import AppleImg from '@/assets/images/apple-img.png'
import Appdev from '@/assets/images/appdev.png'
import AppShapeRight from '@/assets/images/app-shape-right.png'
import { getPrmiumJobsandfe } from '@/action/CandidateAction';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Shimmer from 'components/common/Shimmer';
import saharaNews from '../../src/assets/images/sahara-logo.jpg'
import dainikJNews from '../../src/assets/images/dainikJ-logo.jpg'
import nbtimesNews from '../../src/assets/images/nbtimes-logo.jpg'
import news18News from '../../src/assets/images/news18-logo.jpg'
import newsXNews from '../../src/assets/images/newsX-logo.jpg'
import indiaaheadNews from '../../src/assets/images/indiaahead-logo.jpg'
import insaNews from '../../src/assets/images/insa-logo.jpg'
import dailyHNews from '../../src/assets/images/dailyH-logo.jpg'
import panjabKNews from '../../src/assets/images/panjabK-logo.jpg'
import ACNNews from '../../src/assets/images/ACN-logo.jpg'

export default class MobileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompanies: false,
      premiumService: false,
      employerService: false,
      CITY_LIST: null,
      list: null,
      clientCount: 0,
      detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
      tempKeyword: "",
      tempLocation: "",
      LOCATION_LIST: {},
      jobCount: 0,
      candidatesCount: 0,
      recruiterCount: 0,
      setclientCount: 0,
      setjobCount: 0,
      setcandidatesCount: 0,
      setrecruiterCount: 0,
      JOB_COUNT_BY_TOP_CATEGORY: this.props?.JOB_COUNT_BY_TOP_CATEGORY ? this.props?.JOB_COUNT_BY_TOP_CATEGORY : null,
      
      FEATURED_COMPANIES: this.props?.FEATURED_COMPANIES ? this.props?.FEATURED_COMPANIES : null,
      PREMIUM_COMPANIES: this.props?.PREMIUM_COMPANIES ? this.props?.PREMIUM_COMPANIES : null,
      premium: [],
      TOP_COMPANY_IMAGES: [],
      KEYWORD: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: true },
      LOCATION: { name: 'LOCATION', value: [], options: [], error: '', isRequired: false },
      EXPERIENCE: {
        name: 'EXPERIENCE', value: [], options: [{ value: [0, 1], range: '0-1 Year' },
        { value: [1, 3], range: '1-3 Years' },
        { value: [3, 5], range: '3-5 Years' },
        { value: [5, 7], range: '5-7 Years' },
        { value: [7, 10], range: '7-10 Years' },
        { value: [10, 12], range: '10-12 Years' },
        { value: [12, 14], range: '12-14 Years' },
        { value: [14, 16], range: '14-16 Years' },
        { value: [16, 18], range: '16-18 Years' },
        { value: [18, 20], range: '18-20 Years' },
        { value: [20, 25], range: '20-25 Years' },
        { value: [25, 30], range: '25-30 Years' },
        { value: [30, undefined], range: '30+ Years' },

        ], error: '', isRequired: false
      },
      SALARY: {
        name: 'SALARY', value: [], options: [{ value: [0, 500000], range: '0-5 Lacs' },
        { value: [500000, 1000000], range: '5-10 Lacs' },
        { value: [1000000, 15000000], range: '10-15 Lacs' },
        { value: [15000000, 2000000], range: '15-20 Lacs' },
        { value: [2000000, 25000000], range: '20-25 Lacs' },
        { value: [25000000, 3000000], range: '25-30 Lacs' },
        { value: [3000000, 4000000], range: '30-40 Lacs' },
        { value: [4000000, 5000000], range: '40-50 Lacs' },
        { value: [5000000, 6000000], range: '50-60 Lacs' },
        { value: [6000000, 7000000], range: '60-70 Lacs' },
        { value: [7000000, 8000000], range: '70-80 Lacs' },
        { value: [8000000, 9000000], range: '80-90 Lacs' },
        { value: [9000000, 10000000], range: '90-100 Lacs' },
        { value: [10000000, undefined], range: '1 Cr+' }], error: '', isRequired: false
      },
      selectedKeyword: [],
      error: {},
      QuestionDetails: [13, 58, 11, 1],
      CompanyQuestionDetails: [6, 8, 17, 1, 16284],
      RolesQuestionDetails: [2272, 171, 226, 262],
      QIdSkillCount: [],
      QIdCompanyCount: [],
      QIdRoleCount: [],
      showLoader: false
    }


  }

  toggleCompanies = () => {
    const { showCompanies } = this.state;
    this.setState({ showCompanies: !showCompanies })
  }
  togglePremiumService = () => {
    const { premiumService } = this.state;
    this.setState({ premiumService: !premiumService })
  }
  toggleEmployerService = () => {
    const { employerService } = this.state;
    this.setState({ employerService: !employerService })
  }

  componentDidMount() {
    this.setState({ jobCount: 1156843, clientCount: 9593, candidatesCount: 12333676, recruiterCount: 98653 })
    let counter = setInterval(this.counter, 1000)
    clearInterval(counter)
    this.getPremiumCityList()
    this.getTopCompanyImages()
    this.PremiumJobsList()

    this.InterQuestionSkillById()
    this.InterQuestionCompanyById()
    this.InterQuestionDesignationById()
    jobCountByTopCategory().then(res => {
      if (res.status) {
        this.setState({ JOB_COUNT_BY_TOP_CATEGORY: res.result })
      }
      else {
        alert(res.error)
      }
    }).catch(err => {
      alert(err)
    })
    topPremiumFeaturedCompanyList().then(res => {
      if (res.status) {
        this.setState({ FEATURED_COMPANIES: res.result.featured, PREMIUM_COMPANIES: res.result.premium })
      }
      else {
        alert(res.error)
      }
    }).catch(err => {
      alert(err)
    })
    
  }
  InterQuestionSkillById = async () => {
    try {
      const { QuestionDetails } = this.state
    

      for (let i = 0; i < QuestionDetails.length; i++) {

        const modal = {
          SKILL_ID: QuestionDetails[i]
        }
        let res = await IQTotalSkillById(modal)
        
        if (res.result.length > 0) {
          this.setState({ QIdSkillCount: [...this.state.QIdSkillCount, ...res.result] })
        }
      }
    } catch (err) {
      console.log("err", err);
    }


  }

  InterQuestionDesignationById = async () => {
    try {
      const { RolesQuestionDetails } = this.state
  
      for (let i = 0; i < RolesQuestionDetails.length; i++) {
        const modal = {
          ROLES: RolesQuestionDetails[i]
        }
        let res = await IQTotalDesignationById(modal)
        
        if (res.result.length > 0) {
          this.setState({ QIdRoleCount: [...this.state.QIdRoleCount, ...res.result] })
        }
      }
    } catch (err) {
      console.log("err", err)
    }

  }

  InterQuestionCompanyById = async () => {

    try {

      const { CompanyQuestionDetails } = this.state

      for (let i = 0; i < CompanyQuestionDetails.length; i++) {

        const modal = {
          COMPANIES: CompanyQuestionDetails[i]
        }

        let res = await IQTotalCompanyById(modal)
        if (res.result.length > 0) {
          this.setState({ QIdCompanyCount: [...this.state.QIdCompanyCount, ...res.result] })
        }
      }


    } catch (err) {
      console.log("err", err)
    }
    
  }
  PremiumJobsList = () => {
    this.setState({ showLoader: true })
    getPrmiumJobsandfe().then(res => {
      if (res.status) {
        this.setState({ showLoader: false })
        setTimeout(() => {
          this.setState({ showShimmer: false })
        }, 1000)
        this.setState({ list: res.result.premiumJobList })
      }
      else {
        alert(res.error)
      }
    }).catch(err => {
      alert(err)
    })
  }
  getTopCompanyImages = () => {
    topCompanyImages().then(res => {
      if (res.status) {
        this.setState({ TOP_COMPANY_IMAGES: res.result.images })
      }
      else {
        alert(res.error)
      }
    }).catch(err => {
      alert(err)
    })
  }

  getPremiumCityList = () => {
    premiumCityList().then(res => {
      if (res.status) {
        this.setState({ LOCATION_LIST: res.result, CITY_LIST: res.result ? res.result.city : null })
      }
      else {
        alert(res.error)
      }
    }).catch(err => {
      alert(err)
    })
  }

  counter = () => {
    const { setclientCount, setjobCount, setcandidatesCount, setrecruiterCount, jobCount, clientCount, candidatesCount,
      recruiterCount } = this.state
    if (setclientCount < clientCount) {
      this.setState({ setclientCount: setclientCount + 575 })
    }
    if (setjobCount < jobCount) {
      this.setState({ setjobCount: setjobCount + 9543 })
    }
    if (setcandidatesCount < candidatesCount) {
      this.setState({ setcandidatesCount: setcandidatesCount + 3458 })
    }
    if (setrecruiterCount < recruiterCount) {
      this.setState({ setrecruiterCount: setrecruiterCount + 9956 })
    }
  }

  onKeywordChange = (e) => {

    const val = e.map(item => {
      if (typeof item === 'object') {
        return item.label
      }
      else {
        return item
      }
    })

    onChange(this, this.state.KEYWORD.name, val)
  }
  onLocationChange = (e) => {
    const val = e.map(item => {
      if (typeof item === 'object') {
        return item.label
      }
      else {
        return item
      }
    })

    onChange(this, this.state.LOCATION.name, val)
  }

  onKeywordPress = (input, TYPE) => {
    if (TYPE === 'KEYWORD') {
      KeywordSearch(input).then(res => {
        if (res.status) {
          setOptions(this, this.state.KEYWORD.name, res.result)
        }
        else {
          alert(res.error)
        }
      }).catch(err => {
        alert(err)
      })
    }
    if (TYPE === 'LOCATION') {
      LocationSearch(input).then(res => {
        if (res.status) {
          setOptions(this, this.state.LOCATION.name, res.result)
        }
        else {
          alert(res.error)
        }
      }).catch(err => {
        alert(err)
      })
    }
  }

  typeaheadOnChange = (e) => {
    let { value, name } = e.target
    if (e.length > 0 && e[0].customOption) {
      value = [{ name: e[0].name }];
    }
    onChange(this, name, value);
    this.onKeywordPress(e)

  }


  // onKeywordInputChange(e) {
  //     this.setState({
  //         customKeyword: e
  //     });
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps == nextState) {
      return false;
    } else {
      return true
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm(this)) {

      const st = this.state;
      const model = {
        KEYWORD: st.KEYWORD.value.split(','),
        LOCATION: st.LOCATION.value.split(','),
        EXPERIENCE: {
          MIN: '',
          MAX: '',
        },
        SALARY: {
          MIN: '',
          MAX: ''
        }
      }
    }
  }

  validateKeyForm = () => {
    let data = this.state
    let error = {}
    let isValid = true

    if (!data['keyword']) {
      error.KEYWORD = "Please enter valid keyword"
      isValid = false

      this.setState({
        error: error
      })

      return isValid
    }
  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onChange(this, name, value)
  }

  onSearch = (e) => {

    e.preventDefault()
    const { KEYWORD, LOCATION, EXPERIENCE, SALARY } = this.state;
    if (validateForm(this)) {
      let MINEXP = ''
      let MAXEXP = ''
      if (EXPERIENCE.value.length) {
        let exp = EXPERIENCE.value.split(',')
        if (exp && exp.length > 0) {
          MINEXP = exp[0]
          MAXEXP = exp[1]
        }
      }

      let MINSALARY = ''
      let MAXSALARY = ''
      if (SALARY.value.length) {
        let sal = SALARY.value.split(',')
        if (sal && sal.length > 0) {
          MINSALARY = sal[0]
          MAXSALARY = sal[1]
        }
      }
      let url = ''
      if (KEYWORD.value.length) {

        url = constant.component.searchjob.url + `?keyword=${KEYWORD.value}`

      }

      if (LOCATION.value.length) {
        url = url + `&location=` + LOCATION.value
      }
      if (EXPERIENCE.value.length) {
        url = url + `&exp=` + MINEXP + '-' + MAXEXP

      }
      if (SALARY.value.length) {
        url = url + `&sal=` + MINSALARY + '-' + MAXSALARY

      }

      window.location.href = url

    }


  }
  onClickSkill = (id, data) => {

    // localStorage.setItem("setSkillId",id)
    // this.props.history.push(constant.component.interviewQuestionBySkillsId.url.replace(":id",data))
  }

  onJobSearch(e) {

    let keyword = e.target.value
    let { KEYWORD, LOCATION } = this.state

    if (e.target.placeholder == "Location") {

      let location = e.target.value
      this.setState({ tempLocation: location })
      if (e.code == "Enter") {
        if (this.state.tempKeyword != "" || this.state.KEYWORD.value.length > 0) {
          let LocationUrl;
          if (this.state.tempSkill != "") {

            LocationUrl = `${constant.component.searchjob.url}?location=${keyword}&keyword=${this.state.tempSkill}`
          }
          else if (this.state.KEYWORD.value.length > 0) {
            let [first] = this.state.KEYWORD.value
            LocationUrl = `${constant.component.searchjob.url}?location=${keyword}&keyword=${first}`
          }

          window.location.href = LocationUrl
        } else {
          if (this.state.KEYWORD.value.length == 0)
            setError(this, this.state.KEYWORD.name, " ")
        }
      }
      return
    }

    if (e.target.placeholder.trim() == "Enter Skill, Company, Designation") {
      let url = ""
      this.setState({ tempSkill: keyword })
      setError(this, this.state.KEYWORD.name, "")
      if (this.state.tempLocation != "" && keyword && e.code == "Enter") {
        let LocationUrl = `${constant.component.searchjob.url}?location=${this.state.tempLocation}&keyword=${keyword}`
        window.location.href = LocationUrl
      }
      else if (keyword && e.code == "Enter" && this.state.tempLocation == "") {
        let url = constant.component.searchjob.url + `?keyword=${keyword}`
        window.location.href = url
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
              setError(this, this.state.KEYWORD.name, " ")
            }
          }
        }

      }
    }



  }


  render() {

    const { KEYWORD, LOCATION, EXPERIENCE, SALARY, error, QIdSkillCount, QIdRoleCount, QIdCompanyCount: QIdCompanyCountTemp, detail } = this.state;
    const { showCompanies, employerService, premiumService, setclientCount, setjobCount, setcandidatesCount, setrecruiterCount,
      JOB_COUNT_BY_TOP_CATEGORY, FEATURED_COMPANIES, PREMIUM_COMPANIES, premium, TOP_COMPANY_IMAGES, CITY_LIST, list, showLoader } = this.state;
    const { LOCATION_LIST } = this.props;

    let QIdCompanyCount = [...new Map(QIdCompanyCountTemp.map((item) => [item['company'], item])).values()];



    const featuredsettings = {
      dots: false, infinite: true, speed: 500, autoplay: false,
      slidesToShow: 4, slidesToScroll: 1,
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
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false
          }
        }
      ]

    };
    const TopCompanyHiring = {
      dots: false, arrows: false, infinite: true, speed: 500, autoplay: true,
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
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false
          }
        }
      ]

    };

    const lpFeaturedJobs = {
      dots: false, infinite: true, speed: 500, autoplay: false,
      slidesToShow: 3, slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false,
            arrows: false
          }
        },

        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false
          }
        }
      ]

    };
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
    const premiumsettings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false
          }
        }
      ]
    };

    return (
      <React.Fragment>
        <Head>


          <title > Jobs - Recruitment - Job Search -  Employment - Job Vacancies - Rozgar.com</title>
          <meta name="HandheldFriendly" content="True" />

          <meta name="description" content={"Jobs - Recruitment - Job Search -  Employment - Job Vacancies" + " - Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
          <link href={"https://rozgar.com"} />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

          <meta property="og:site_name" content="Rozgar Official Blog" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={"Jobs - Recruitment - Job Search -  Employment - Job Vacancies - Rozgar.com"} />
          <meta property="og:description" content={"Jobs - Recruitment - Job Search -  Employment - Job Vacancies" + " - Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
          <meta property="og:url" content={"https://rozgar.com"} />
          <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />


          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"Jobs - Recruitment - Job Search -  Employment - Job Vacancies - Rozgar.com"} />
          <meta name="twitter:description" content={"Jobs - Recruitment - Job Search -  Employment - Job Vacancies" + " - Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
          <meta name="twitter:url" content={"https://rozgar.com"} />
          <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content="Smita Nag" />
          <meta name="twitter:label2" content="Filed under" />
          <meta name="twitter:data2" content="Career Advice, Career Insights" />
          <meta name="twitter:site" content="@rozgar_india" />
          <meta property="og:image:width" content="4000" />
          <meta property="og:image:height" content="6000" />
        </Head>
        <div className="rg-sliderholder rg-sliderholder-sparkrle banner-search-mob-hidden">
          <div className="rg-slidercontentholder">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-10 push-lg-1">
                  <div className="rg-slidercontent">
                    <h1>Looking for a Corporate Job?</h1>
                    <div className="rg-description">
                      <p>4 lakh+ jobs for you to explore</p>
                    </div>
                    <form onSubmit={this.onSearch} className="rg-formtheme rg-formbannersearch home-search-bar-main pb-4">
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
                              style={{ height: "0px !important" }}
                              useCache={false}
                              clearButton={false}
                              multiple
                              allowNew={true}
                              name={KEYWORD.name}
                              selected={KEYWORD.value}
                              options={KEYWORD.options}
                              placeholder=" Enter Skill, Company, Designation"
                              inputProps={e => console.log("iput props ", e)}
                              onKeyDown={(e) => this.onJobSearch(e)}
                              onInputChange={(e) => { this.onKeywordPress(e, 'KEYWORD') }}
                              onChange={(e) => { this.onKeywordChange(e) }}
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
                              name={LOCATION.name}
                              selected={LOCATION.value}
                              options={LOCATION.options}
                              placeholder="Location"
                              onKeyDown={(e) => this.onJobSearch(e)}
                              onInputChange={(e) => { this.onKeywordPress(e, 'LOCATION') }}
                              onChange={(e) => { this.onLocationChange(e) }}
                              emptyLabel
                              style={{ height: "auto" }}
                            />
                          </div>
                        </div>

                        <div className="rg-searchholder"
                          style={{ width: "25%", padding: "0px 10px" }}>
                          <span className="rg-select d-flex align-items-center">
                            <i className="lnr lnr-calendar-full"></i>
                            <select
                              name={EXPERIENCE.name}
                              value={EXPERIENCE.value}
                              onChange={(e) => setEXPERIENCE(e.target.value)}
                              data-placeholder="All"
                              className="chosen-select locations"
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
                              name={SALARY.name}
                              value={SALARY.value}
                              onChange={this.onChange}
                              data-placeholder="All"
                              className="chosen-select locations"
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
                     
                      {KEYWORD.error.length > 0 && <span className='text-danger' style={{ textAlign: 'center', float: 'left', paddingLeft: '3px' }} > Please enter keywords to search relevant jobs </span>}
                      <p className='searchjobview'>Search <span>252,723</span> new jobs - <span>15,422</span> added in the last 24 hours</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div className='companytoplogo'>
          <div className='rozgarmela-resume-box'>
            <div className='container'>
              <div className="row">
                <div className="d-flex justify-content-center w-100">
                  <Link
                    target="_blank"
                    href={constant.component.resumeMaking.url}
                    className="createCV-btn"
                  >
                    <i className="ti-pencil-alt"></i> Create a free CV
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
                    href={constant.component.GovernmentResultState.url}
                    className="pmrozgar-btn"
                  >
                    <i className="lnr lnr-graduation-hat"></i> Government Jobs Result
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='comtop-pr-box top-comtop-pr-box'>
            <div className='container'>
              <div className='row'>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead pb-3">
                    <h2>Companies Hiring</h2>
                    <a data-interception='off' className="rg-btnviewall mr-1" target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                  </div>
                  <div className="rg-top-companies-hiring">
                    <ul className="rg-btn-top-companies-hiring">
                      {TOP_COMPANY_IMAGES === null && < Shimmer />}
                      <Slider {...TopCompanyHiring} >
                        {TOP_COMPANY_IMAGES !== null && TOP_COMPANY_IMAGES.length > 0 && TOP_COMPANY_IMAGES.map((item, index) => {

                          return (
                            <li>
                              <a className="rg-top-companies-hiring" href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)} target='_blank'>
                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME}
                                  width={170} height={95} />
                              </a>
                            </li>
                          )
                        }
                        )}
                      </Slider>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <section className='mobilehViewMobile-search'>
            <div className='mobilehide full-screen mt-0'>
              <div className="rg-wrapper-mobile">
                <div className="roz-search-job">
                  <div className="search-form-area">
                    <form onSubmit={this.onSearch} className="rg-formtheme rg-formbasicinfo">
                      <fieldset>
                        <div className="form-group rg-inputwithicon">
                          <i className="lnr lnr-magnifier"></i>
                          <Typeahead
                            className={KEYWORD.error.length ? 'form-control is-invalid' : 'form-control'}
                            id='keyword'
                            style={{ height: '0px !important' }}
                            useCache={false}
                            clearButton={false}
                            multiple
                            allowNew={true}
                            name={KEYWORD.name}
                            selected={KEYWORD.value}
                            options={KEYWORD.options}
                            inputProps={e => console.log("iput props ", e)}
                            onKeyDown={(e) => this.onJobSearch(e)}
                            placeholder=" Enter Skill, Company, Designation"
                            onInputChange={(e) => { this.onKeywordPress(e, 'KEYWORD') }}
                            onChange={(e) => { this.onKeywordChange(e) }}
                            emptyLabel
                          />
                          {KEYWORD.error.length > 0 && <span className='text-danger' > Please enter keywords to search relevant jobs </span>}
                        </div>
                        <div className="form-group rg-inputwithicon">
                          <i className="ti-location-pin"></i>
                          <Typeahead
                            className='form-control'
                            id='location'
                            useCache={false}
                            clearButton={false}
                            maxResults={3}
                            multiple={true}
                            allowNew={true}
                            name={LOCATION.name}
                            selected={LOCATION.value}
                            options={LOCATION.options}
                            placeholder="Location"
                            onKeyDown={(e) => this.onJobSearch(e)}
                            onInputChange={(e) => { this.onKeywordPress(e, 'LOCATION') }}
                            onChange={(e) => { this.onLocationChange(e) }}
                            emptyLabel
                            style={{ height: "auto" }}
                          />
                        </div>
                        <div className="form-group col-lg-6 rg-inputwithicon pl-0">
                          <i className="lnr lnr-calendar-full"></i>
                          <span className="rg-select">

                            <select
                              className="form-control "
                              name={EXPERIENCE.name}
                              value={EXPERIENCE.value}
                              onChange={this.onChange}
                            >
                              <option value=''>Experience (in years)</option>
                              {
                                EXPERIENCE.options.map(item => {
                                  return (<option value={item.value}>{item.range}</option>)
                                })
                              }
                            </select>
                          </span>
                        </div>

                        <div className="form-group col-lg-6 rg-inputwithicon pr-0">
                          <i className="fa fa-rupee"></i>
                          <span className="rg-select">
                            <select
                              className="form-control "
                              name={SALARY.name}
                              value={SALARY.value}
                              onChange={this.onChange}


                            >
                              <option value=''>Salary (in lacs)</option>
                              {
                                SALARY.options.map(item => {
                                  return (<option value={item.value}>{item.range}</option>)
                                })
                              }
                            </select>
                          </span>
                        </div>
                        <div className="form-group rg-btnsarea mb-0">
                          <button type="submit" className="rg-btn rg-active btn-primary float-right" id="showtoast">Search</button>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="rg-haslayout rg-sectionspace rg-bglight"
            id="section2"
          >
            <div className="container" id="container2">
              <div className="row" id="row2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead lpf-job-pt">
                    {/* {detail?.CANDIDATE_ID == null ?
                    <a data-interception='off' className="rg-btnviewall" target='_blank' href={constant.component.signin.url}>View All</a> : <a data-interception='off' className="rg-btnviewall" target='_blank' href={constant.component.premiumJobs.url}>View All</a>} */}
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-3 col-lg-3">
                  <div className="lpfeatures-jobbox">
                    <h2>
                      <span className="latesttext">Latest Jobs</span>
                      <br />
                      <span>Premium & Featured<br />Jobs for you</span>
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-sm-9 col-md-9 col-lg-9">
                  <div className="rg-featuredjobs pr-2">
                    {showLoader && <Loading />}
                    <div className="row">
                      <div className="rg-feature-full-width p-0">
                        <Slider {...lpFeaturedJobs}>
                          {list &&
                            list.map((item) => {
                              var a = item.CREATED_ON
                                ? moment([
                                  parseInt(
                                    moment(item.CREATED_ON).format("YYYY")
                                  ),
                                  parseInt(
                                    moment(item.CREATED_ON).format("MM")
                                  ),
                                  parseInt(
                                    moment(item.CREATED_ON).format("DD")
                                  ),
                                ])
                                : "";
                              var b = moment([
                                parseInt(moment().format("YYYY")),
                                parseInt(moment().format("MM")),
                                parseInt(moment().format("DD")),
                              ]);
                              const URL = item.COMPANY_NAME
                                ? item.COMPANY_NAME + "-" + item.EMPLOYER_ID
                                : "rozgar" + "-" + item.EMPLOYER_ID;

                              let dynamicURLOne =ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID

                              dynamicURLOne = dynamicURLOne.replace(/ /g, "");
                              return (
                                <div className="col-md-12 mob-pad-0">
                                  <div className="rozgar-latespremiu-featurejob-area job-slice mb-15">
                                    <div className="latespremiu-company-jobtitle">
                                      <h3>
                                        {
                                          <Link
                                            data-interception="off"
                                            target="_blank"
                                            href={constant.component.jobdetails.url.replace(
                                              ":url",
                                              dynamicURLOne
                                            )}
                                          >
                                            {item.JOB_TITLE.length > 35
                                              ? `${item.JOB_TITLE.slice(
                                                0,
                                                31
                                              )}...`
                                              : item.JOB_TITLE}
                                          </Link>
                                        }
                                      </h3>
                                    </div>
                                    <div className="d-flex align-items-center align-items-start">
                                      <figure className="latespremiu-company-logo">
                                        {item.COMPANY_LOGO == null ? (
                                          <Image
                                            src={Companylogo}
                                            width={170}
                                            height={95}
                                          />
                                        ) : (
                                          <Image
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                            alt={item.COMPANY_NAME}
                                            width={170}
                                            height={95}
                                          />
                                        )}
                                      </figure>
                                      <div className="latespremiu-company-jobtitle">
                                        <h5>
                                          <Link
                                            href={constant.component.companydetails.url.replace(
                                              ":url",
                                              URL
                                            )}
                                            target="_blank"
                                          >
                                            {item.COMPANY_NAME?.length > 30
                                              ? item.COMPANY_NAME?.slice(0, 18) +
                                              "...."
                                              : item.COMPANY_NAME}
                                          </Link>
                                        </h5>
                                        <div className="d-flex latespremiu-company-review">
                                          <span className="star-r">
                                            <i className="fa fa-star"></i>
                                          </span>
                                          <span className="main-2 rating">
                                            {randomIntFromInterval(1, 5)}
                                          </span>
                                          <span className="main-2 reviews">
                                            | &nbsp; reviews
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="latespremiu-company-job-area">
                                      <div className="latespremiu-company-job-para">
                                        <p>
                                          {" "}
                                          <span>
                                            {" "}
                                            {item.JOB_DETAILS &&
                                              item.JOB_DETAILS.length === 0
                                              ? "No Discription Found"
                                              : item.JOB_DETAILS.length > 60
                                                ? `${item.JOB_DETAILS.slice(
                                                  0,
                                                  30
                                                )}...`
                                                : `${item.JOB_DETAILS.slice(
                                                  0,
                                                  30
                                                )}...`}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="latespremiu-company-job-skills ">
                                        {item.KEYWORDS.split(",").map(
                                          (item, index) => {
                                            if (index < 2) {
                                              return (
                                                <a>
                                                  {item.length > 20
                                                    ? `${item.slice(0, 18)}...`
                                                    : item}
                                                </a>
                                              );
                                            }
                                          }
                                        )}
                                      </div>
                                    </div>
                                    <div className="latespremiu-company-allview">
                                      <span
                                        style={{
                                          flexGrow: "8",
                                          textAlign: "left",
                                        }}
                                      >
                                        <a className="premiumbox">
                                          <i className="ti-crown"></i>{" "}
                                          {item.LISTNING_TYPE == 1
                                            ? " REGULAR"
                                            : item.LISTNING_TYPE == 2
                                              ? " FEATURED"
                                              : " PREMIUM"}
                                        </a>
                                      </span>

                                      <Link
                                        href={constant.component.jobdetails.url.replace(
                                          ":url",
                                          dynamicURLOne
                                        )}
                                        target="_blank"
                                        className="arrowclick"
                                      >
                                        <i className="far fa-angle-right"></i>{" "}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rg-haslayout rg-sectionspace rg-bglight" id="section2">
            <div className="container" id="container2">
              <div className="row" id="row2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead">
                    <h2>Premium Companies Hirings</h2>
                    <a data-interception='off' className="rg-btnviewall" target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                  </div>
                </div>
                <div className="rg-featuredjobs pr-2">
                  {PREMIUM_COMPANIES === null && <Shimmer />}
                  <div className='row'>
                    <div className="rg-feature-full-width">
                      <Slider {...featuredsettings} >
                        {PREMIUM_COMPANIES !== null && PREMIUM_COMPANIES.map((item, index) => {
                          return (
                            <React.Fragment>
                              <div className='col-md-12 mob-pad-0'>
                                <div className="rozgar-premium-companies-hirings-area job-slice mb-15">
                                  <div className='d-flex align-items-center'>
                                    <figure className="premium-companies-hirings-logo">
                                      {item.COMPANY_LOGO === 'NA' ? <h3>{item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={170}
                                        height={95} />}
                                    </figure>
                                    <div className='premium-companies-hirings-head'>
                                      <h3><a data-interception='off' target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>{item.COMPANY_NAME}</a></h3>
                                      <div className='d-flex premium-companies-hirings-review'>
                                        <span className="star-r">
                                          <i className="fa fa-star"></i>
                                        </span>
                                        <span className="main-2 rating">{4.3}</span>
                                        <span className="main-2 reviews">| &nbsp; reviews</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='premium-companies-hirings-job-area'>
                                    <div className='premium-companies-hirings-job-para'>
                                      <span title={item.ABOUT_COMPANY ? item.ABOUT_COMPANY.replace('<p>', '') : ""}>{item.ABOUT_COMPANY ? item.ABOUT_COMPANY.length > 30 ? item.ABOUT_COMPANY.substring(0, 30).replace('<p>', '') + '...' : item.ABOUT_COMPANY.replace('<p>', '') : ""}</span>
                                    </div>
                                    <div className='premium-companies-hirings-job-skills'>
                                      {item.INDUSTRY.length > 60 ? `${item.INDUSTRY.slice(0, 60)}...` : item.INDUSTRY.split('/').map((item, index) => {
                                        if (index < 2) {
                                          return (
                                            <a href=''>{item.length > 30 ? `${item.slice(0, 25)}...` : item}</a>
                                          )
                                        }
                                      })}
                                    </div>
                                  </div>
                                  <div className="premium-companies-hirings-allview">
                                    <a data-interception='off' target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>View Jobs</a>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        })}
                      </Slider>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </section>
          <section className="rg-haslayout rg-sectionspace" id="section3">
            <div className="container" id="container3">
              <div className="row" id="row3">
                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                  <a href={constant.component.jobsByCategory.url} target="_blank">
                    <div className="job-popular-box">
                      <Image
                        src={JobPopular}
                        alt="Popular Categories"
                        width={500}
                        height={500}
                      />
                      <a
                        data-interception="off"
                        className="btn-tpcategories"
                        target="_blank"
                        href={constant.component.jobsByCategory.url}
                      >
                        VIEW ALL
                      </a>
                    </div>
                  </a>
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 pl-0 pr-0">
                  <div className="rg-ourprofessionals mobilefield">
                    {JOB_COUNT_BY_TOP_CATEGORY !== null &&
                      JOB_COUNT_BY_TOP_CATEGORY.length > 0 &&
                      JOB_COUNT_BY_TOP_CATEGORY.map((item, index) => {
                        if (index < 10) {
                          for (const [key, value] of Object.entries(item)) {
                            return (
                              <div className="col-12 col-sm-12 col-md-6 col-lg-6 float-left">
                                <Link
                                  legacyBehavior
                                  href={`jobs/${value.url}`}
                                  target="_blank"
                                  passHref
                                >
                                  <a>
                                    <div className="rg-ourprofessional height70 d-flex align-items-center">
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
                                  </a>
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


          <section id="campusrogar" className="wow fadeInRight" data-wow-duration="1.4s">
            <div className="container" id="container4">
              <div className="row" id="row4">
                <div className="accelerate-your-job row">
                  <div className="col-12 col-sm-12 col-md-3 col-lg-2 text-center">
                    <div className="roz-sectionimg">
                      <Image src={AccYourJobSearch} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-8">
                    <div className="roz-sectiontext">
                      <h2>Fresher Solutions : Trusted portal for employers and universities</h2>
                      <p>One-stop solution for universities and employers for quick recruitment.</p>
                      <ul className='camp-key-ponts'>
                        <li><p className="card-text sub-heading text-black">14,000+ Placements</p></li>
                        <li><p className="card-text sub-heading text-black">Partnership with Top Companies</p></li>
                        <li><p className="card-text sub-heading text-black">18000+ University / Institution</p></li>
                      </ul>
                      <div className='roz-cam-ban-bx'>
                        <h3 className='com-icon-bx'>Campus Rozgar Suitable for: </h3>
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
                      <a data-interception='off' className="roz-btn-more" target='_blank' href='https://campus.rozgar.com/'>Explore</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="counter-stats" className="wow fadeInRight" data-wow-duration="1.4s">
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
                        <i className="lnr lnr-briefcase" aria-hidden="true"></i>
                      </div>
                      <div className="counting" >{numberWithCommas(1156843)}</div>
                      <p className="xs-font-size13 xs-line-height-22">Jobs & Counting</p>
                    </a>
                  </div>
                </div>

                <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                  <div className="services-block-three">
                    <a href="javascript:void(0)">
                      <div className="padding-15px-bottom">
                        <i className="lnr lnr-user" aria-hidden="true"></i>
                      </div>
                      <div className="counting" >{numberWithCommas(9593)}</div>
                      <p className="xs-font-size13 xs-line-height-22">Clients</p>
                    </a>
                  </div>
                </div>

                <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                  <div className="services-block-three">
                    <a href="javascript:void(0)">
                      <div className="padding-15px-bottom">
                        <i className="lnr lnr-users" aria-hidden="true"></i>
                      </div>
                      <div className="counting" >{numberWithCommas(12333676)}</div>
                      <p className="xs-font-size13 xs-line-height-22">Candidates</p>
                    </a>
                  </div>
                </div>

                <div className="col-6 col-lg-3 margin-30px-bottom xs-margin-20px-bottom">
                  <div className="services-block-three">
                    <a href="javascript:void(0)">
                      <div className="padding-15px-bottom">
                        <i className="lnr lnr-magnifier" aria-hidden="true"></i>
                      </div>
                      <div className="counting" >{numberWithCommas(98653)}</div>
                      <p className="xs-font-size13 xs-line-height-22">Recruiters</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>


          <section className="rg-haslayout rg-sectionspace rg-bglight" id="section6">
            <div className="container" id="container6">
              <div className="row" id="row6">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="rg-sectionhead">
                    <h2>Featured Sponsored Companies</h2>
                    <a data-interception='off' className="rg-btnviewall" target='_blank' href={constant.component.jobsByCompany.url}>View All</a>
                  </div>
                </div>
                <div className="rg-featuredjobs pr-2">
                  {FEATURED_COMPANIES === null && <Shimmer />}
                  <div className='row'>
                    <div className="rg-feature-full-width">
                      <Slider {...featuredsettings} >
                        {FEATURED_COMPANIES !== null && FEATURED_COMPANIES.map((item, index) => {
                          return (
                            <React.Fragment>
                              <div className='col-md-12'>
                                <div className="rozgar-featured-spon-companies-area job-slice">
                                  <div className='d-flex align-items-center'>
                                    <figure className="featured-spon-companies-logo">
                                      {item.COMPANY_LOGO === 'NA' ? <h3>{item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')}</h3> : <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`} alt={item.COMPANY_NAME} width={170}
                                        height={95} />}
                                    </figure>
                                    <div className='featured-spon-companies-head'>
                                      <h3><a data-interception='off' target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>{item.COMPANY_NAME.slice(0, 15)}</a></h3>
                                      <div className='d-flex featured-spon-companies-review'>
                                        <span className="star-r">
                                          <i className="fa fa-star"></i>
                                        </span>
                                        <span className="main-2 rating">{4.3}</span>
                                        <span className="main-2 reviews">| &nbsp; reviews</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='featured-spon-companies-job-area'>
                                    <div className='featured-spon-companies-job-para'>
                                      <span title={item.ABOUT_COMPANY ? item.ABOUT_COMPANY.replace('<p>', '') : ""}>{item.ABOUT_COMPANY ? item.ABOUT_COMPANY.length > 32 ? item.ABOUT_COMPANY.substring(0, 32).replace('<p>', '') + '...' : item.ABOUT_COMPANY.replace('<p>', '') : ""}</span>
                                    </div>
                                    <div className='featured-spon-companies-job-skills'>

                                      {item.INDUSTRY.length > 60 ? `${item.INDUSTRY.slice(0, 50)}...` : item.INDUSTRY.split('/').map((item, index) => {
                                        if (index < 2) {
                                          return (
                                            <a href=''>{item}</a>
                                          )
                                        }
                                      })}
                                    </div>
                                  </div>
                                  <div className="featured-spon-companies-allview">
                                    <a data-interception='off' target='_blank' href={constant.component.joblist.url.replace(':url', `${item.URL}-jobs`)}>View Jobs</a>
                                  </div>

                                </div>
                              </div>
                            </React.Fragment>
                          )
                        })}
                      </Slider>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
          
          <section className="rg-haslayout rg-sectionspace" id="section7">
            <div className="container" id="container7">
              <div className="worried-about-box" id="worried1">
                <div className="row" id="row7">
                  <div className="col-md-3">

                    <Image
                      src={NextInterView}
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
                      <a
                        data-interception="off"
                        className="rg-btnviewall"
                        href={
                          constant.component.interviewQuestionByDesignation.url
                        }
                      >
                        View All
                      </a>
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
                                  <a data-interception="off">Software Engineer</a>
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
                                  <a data-interception="off">Machine Learning</a>
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
                                  <a data-interception="off">DevOps Manager</a>
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
                                  <a data-interception="off">
                                    Front End Developer
                                  </a>
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
                      <a
                        data-interception="off"
                        className="rg-btnviewall"
                        href={constant.component.interviewQuestionBySkills.url}
                      >
                        View All
                      </a>
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
                                  src={JavaLogo}
                                  alt="image description"
                                  width={170}
                                  height={95}
                                />
                                <div className="iq-skills-imagebox-textarea">
                                  <h3>
                                    <a data-interception="off">JAVA</a>
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
                                  src={PythonLogo}
                                  alt="image description"
                                  width={170}
                                  height={95}
                                />
                                <div className="iq-skills-imagebox-textarea">
                                  <h3>
                                    <a data-interception="off">Python</a>
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
                                  src={PHPLogo}
                                  alt="image description"
                                  width={170}
                                  height={95}
                                />
                                <div className="iq-skills-imagebox-textarea">
                                  <h3>
                                    <a
                                      data-interception="off"
                                      className="rg-onMouseHover"
                                    >
                                      PHP
                                    </a>
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
                                  src={networkinglogo}
                                  alt="image description"
                                  style={{ maxWidth: "35px" }}
                                  width="35px"
                                  height={95}
                                />
                                <div className="iq-skills-imagebox-textarea">
                                  <h3>
                                    <a data-interception="off">Networking</a>
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
                      <a
                        data-interception="off"
                        className="rg-btnviewall"
                        href={constant.component.interviewQuestionByCompany.url}
                      >
                        View All
                      </a>
                    </div>
                  </div>
                  <div className="rg-ourprofessionals">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 float-left">
                      <div className="rg-interview-questions-com-area questions-company-mobile">
                        <ul className="ulbox">




                          {[...new Set(QIdCompanyCount.slice(0, 4))].map((i) => {
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
                                        <a
                                          data-interception="off"
                                          className="rg-onMouseHover"
                                        >

                                          {i.companydetails.COMPANY_NAME.length >
                                            16
                                            ? i.companydetails.COMPANY_NAME.slice(
                                              0,
                                              3
                                            )
                                            : i.companydetails.COMPANY_NAME}
                                        </a>
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
              <div className='mobileappbg' id="mobile1">
                <div className="row" id="row8">
                  <div className="col-xs-12 col-sm-12 col-md-5">
                    <h3>Get Rozgar app link on your mobile</h3>
                    <p>Available for both Android and iOS apps</p>
                    <div className="appsearch">
                      <input type="text" placeholder="Enter mobile number..." />
                      <div className="button-src">
                        <Link href={{
                          pathname: constant.component.Enquiry.url.replace(":Enquiry", 'Get Rozgar app link on your mobile'),
                          state: { title: 'Get Rozgar app link on your mobile' }
                        }}><button>Get&nbsp;link</button></Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 d-flex align-items-center'>
                    <strong className="applogo">
                      <a data-interception='off'>
                        
                        <Image src={AndroidImg} alt="Android Logo" />


                      </a> &nbsp;
                      <a data-interception='off'>
                        
                        <Image src={AppleImg} alt="Android Logo" />
                      </a>
                    </strong>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 text-left">
                    <div className='appdeveloper-vector'>
                      <Image src={Appdev} alt="App Development" />
                    </div>
                  </div>
                </div>
                <div className='appshaperight'>
                  <Image src={AppShapeRight} />
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
                              src={saharaNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={dainikJNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={nbtimesNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={news18News}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={newsXNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={indiaaheadNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={insaNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={dailyHNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={panjabKNews}
                              maxWidth={170}
                              height={95}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="rg-top-companies-hiring">
                            <Image
                              src={ACNNews}
                              maxWidth={170}
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
          <section className="rg-location-section rg-haslayout" id="section9">
            <div className="container" id="container9">
              <div className="row" id="row9">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-10">
                  <div className="rg-sectionhead">
                    <h2 className='pb-2'>Jobs by Location</h2>
                    <a data-interception='off' className="rg-btnviewall" target='_blank' href={constant.component.jobsByLocation.url}>View All</a>
                  </div>

                  <div className="roz-jobbylocation">
                    <ul>

                      {LOCATION_LIST === null && <Shimmer />}
                      {
                        LOCATION_LIST !== null &&
                        CITY_LIST !== null && CITY_LIST.length > 0 && CITY_LIST.map((item, index) => {
                          if (index < 30) {
                            return (
                              <li><i className="lnr lnr-map-marker"></i> <a data-interception='off' target='_blank' href={constant.component.joblist.url.replace(':url', `jobs-in-${item.URL}`)}> Jobs in {item.CITY.length > 15 ? item.CITY.substring(0, 13) + '..' : item.CITY}</a></li>

                            )
                          }
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </main>
      </React.Fragment>
    )
  }
}
