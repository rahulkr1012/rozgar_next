import React, { Component } from 'react'
import MultiRangeSlider from "components/common/MultiRangeSlider/MultiRangeSlider"
import { onChange, setOptions } from 'utils'
import queryString from 'query-string'
import Headerloader from 'components/common/HeaderLoader/index'
import { AddBannerAnalytics, premiumCityList, selectCountry } from '../../src/action/jobsByActions'
import { withRouter } from 'next/router'
import Link from 'next/link'
class filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                { value: [30, 999], range: '30+ Years' },

                ], error: '', checked: [], isRequired: false
            },
            SALARY: {
                name: 'SALARY', value: [], options: [{ value: [0, 500000], range: '0-5 Lacs' },
                { value: [500000, 1000000], range: '5-10 Lacs' },
                { value: [1000000, 1500000], range: '10-15 Lacs' },
                { value: [1500000, 2000000], range: '15-20 Lacs' },
                { value: [2000000, 2500000], range: '20-25 Lacs' },
                { value: [2500000, 3000000], range: '25-30 Lacs' },
                { value: [3000000, 4000000], range: '30-40 Lacs' },
                { value: [4000000, 5000000], range: '40-50 Lacs' },
                { value: [5000000, 6000000], range: '50-60 Lacs' },
                { value: [6000000, 7000000], range: '60-70 Lacs' },
                { value: [7000000, 8000000], range: '70-80 Lacs' },
                { value: [8000000, 9000000], range: '80-90 Lacs' },
                { value: [9000000, 10000000], range: '90-100 Lacs' },
                { value: [10000000, 99999999999999], range: '1 Cr+' }], error: '', isRequired: false
            },
            POSTED_BY: {
                name: 'POSTED_BY', value: [], options: [{ value: 'COMPANY', name: 'Company Jobs' },
                { value: 'CONSULTANT', name: 'Cosultant Jobs' }], error: '', isRequired: false
            },
            LOCATION: {
                name: 'LOCATION', value: [], options: [], error: '', isRequired: false
            },
            showAllSalaryFilterOptions: false,
            showAllExperienceFilterOptions: false,
            showAllLocationFilterOptions: false,
            WORK_FROM_HOME: {
                name: 'WORK_FROM_HOME', value: [], options: [{ value: 'WFHDC', name: 'WFH During Covid' },], error: '', isRequired: false
            },
            locations:'',
            count:0
        }

    }



    locationFilter = (input) => {

        let array = this.state.LOCATION.value
        const index = array.indexOf(input.URL);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        else {
            const str = input.URL
            array.push(str)
        }
        onChange(this, 'LOCATION', array)
        this.sendFilterData()
    }

    handleInput = (e) => {
        let array = []
        array.push([e.minValue, e.maxValue])
        onChange(this, 'EXPERIENCE', array, () => {
            this.sendFilterData()
        })

    }

    BannerCilck = (e,item,type) => {
        const model = {
          BANNER_ID:e.BANNER_ID,
          BANNER_CLICKS:type,
          LONGT: item.longitude,
          LATT:item.latitude,
          IP_ADDRRESS:item.IPv4,
          CITY:item.city
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

    experienceFilter = (input) => {
        let array = []

        array.push(input.value)
        // }
        if (input.value === this.state.EXPERIENCE.value[0]) {
            onChange(this, 'EXPERIENCE', [], () => {
                this.sendFilterData()
            })

        }
        else {
            onChange(this, 'EXPERIENCE', array, () => {
                this.sendFilterData()
            })

        }


    }

    salaryFilter = (input) => {

        let array = []

        array.push(input.value)
        if (input.value === this.state.SALARY.value[0]) {
            onChange(this, 'SALARY', [], () => {
                this.sendFilterData()
            })



        }
        else {
            onChange(this, 'SALARY', array, () => {
                this.sendFilterData()
            })


        }
    }
    componentDidMount() {
        selectCountry().then((res) => {
            this.setState({locations:res})
          })
        premiumCityList().then(res => {
            if (res.status) {
                setOptions(this, this.state.LOCATION.name, res.result.city)

            }
            else {
                console.log(res.error)
            }
        }).catch(err => {
            alert(err)
        })

        let array = []
        const qParam = queryString.parse(this.props.location?.search)
        if (qParam.length) {
            let EXP = qParam?.exp?.split('-')
            if (EXP.length) {
                EXP[0] = +EXP[0]
                EXP[1] = +EXP[1]
            }

            array.push(EXP)
            onChange(this, 'EXPERIENCE', array, () => {
            })

        }

    }
    sendFilterData = () => {
        const { EXPERIENCE, SALARY, POSTED_BY, WORK_FROM_HOME, LOCATION } = this.state;
        const filterModel = {
            EXPERIENCE: EXPERIENCE.value,
            SALARY: SALARY.value,
            POSTED_BY: POSTED_BY.value,
            WORK_FROM_HOME: WORK_FROM_HOME.value,
            LOCATION: LOCATION.value
        }
        this.props.getFilterData(filterModel)
    }
    render() {
        const { hideExperience ,JOB_COUNT,} = this.props
        const { EXPERIENCE, SALARY, LOCATION, showAllSalaryFilterOptions, showAllLocationFilterOptions, showAllExperienceFilterOptions,count,locations } = this.state;

        return (
            <React.Fragment>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 float-left">
                    <aside id="rg-sidebar" className="rg-sidebar rg-sidebarcol">
                        <div className="rg-widget rg-widgetsearch rg-widgetjobalert mb-10">
                            {JOB_COUNT===undefined?<Headerloader/>:
                            <div className="filterbox">
                                <div className="filtericon">
                                    <i className="fa fa-filter" aria-hidden="true"></i>
                                </div>
                                <div className="filtername">
                                    <span className="filtername">All Filters</span>
                                </div>

                            </div>}
                        </div>
                        {JOB_COUNT===undefined?<Headerloader/>:
                        <div id="rg-narrowsearchcollapse" className="rg-themecollapse rg-narrowsearchcollapse">

                            {!hideExperience && <div className="rg-widget rg-themecollapsetitle">
                                <div className="rg-widgettitle">
                                    <h3>Experience</h3>
                                    <span className="fa fa-chevron-right"></span>
                                </div>
                            </div>}
                            {!hideExperience && <div className="rg-widget rg-themecollapsecontent">
                                <div className="rg-checkboxgroup">
                                    <MultiRangeSlider
                                        preventWheel={false}
                                        minValue={EXPERIENCE.value.length > 0 ? EXPERIENCE.value[0][0] : 0}
                                        maxValue={EXPERIENCE.value.length > 0 ? EXPERIENCE.value[0][1] : 50}
                                        ruler={false}
                                        min={0}
                                        max={50}
                                        label={true}
                                        step={1}
                                        onInput={(e) => {
                                            this.handleInput(e);
                                        }}
                                    />

                                </div>
                            </div>}
                            <div className="rg-widget rg-themecollapsetitle">
                                <div className="rg-widgettitle">
                                    <h2>Salary</h2>
                                    <span className="fa fa-chevron-right"></span>
                                </div>
                            </div>
                            <div className="rg-widget rg-themecollapsecontent">
                                <div className="rg-checkboxgroup">
                                    {SALARY.options.map((item, index) => {
                                        if (index < 5 && !showAllSalaryFilterOptions) {
                                            return (
                                                <span
                                                    className="rg-checkbox"
                                                    onClick={() => this.salaryFilter(item)}
                                                >
                                                    <input type="checkbox"
                                                        checked={SALARY.value.includes(item.value)} />
                                                    <label for="rg-fresh">
                                                        <span>{item.range}
                                                            {/* (5850) */}
                                                        </span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                        else if (showAllSalaryFilterOptions) {
                                            return (
                                                <span
                                                    className="rg-checkbox"
                                                    onClick={() => this.salaryFilter(item)}
                                                >
                                                    <input type="checkbox"
                                                        checked={SALARY.value.includes(item.value)} />
                                                    <label for="rg-fresh">
                                                        <span>{item.range}
                                                            {/* (5850) */}
                                                        </span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                    })}
                                    {!showAllSalaryFilterOptions && <a onClick={() => { this.setState({ showAllSalaryFilterOptions: !showAllSalaryFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View More</a>}
                                    {showAllSalaryFilterOptions && <a onClick={() => { this.setState({ showAllSalaryFilterOptions: !showAllSalaryFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View Less</a>}


                                </div>
                            </div>

                            <div className="rg-widget rg-themecollapsetitle">
                                <div className="rg-widgettitle">
                                    <h2>Location</h2>
                                    <span className="fa fa-chevron-right"></span>
                                </div>
                            </div>
                            <div className="rg-widget rg-themecollapsecontent">
                                <div className="rg-checkboxgroup">

                                    {LOCATION.options && LOCATION.options.map((item, index) => {
                                        if (index < 7 && !showAllLocationFilterOptions) {
                                            return (
                                                < span
                                                    onClick={() => this.locationFilter(item)}
                                                    className="rg-checkbox">
                                                    <input type="checkbox"
                                                        checked={LOCATION.value.includes(item.URL)}
                                                    />
                                                    <label for="rg-internstudent">
                                                        <span>{item.CITY} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )

                                        }
                                        else if (showAllLocationFilterOptions) {
                                            return (
                                                < span
                                                    onClick={() => this.locationFilter(item)}
                                                    className="rg-checkbox">
                                                    <input type="checkbox"
                                                        checked={LOCATION.value.includes(item.URL)}
                                                    />
                                                    <label for="rg-internstudent">
                                                        <span>{item.CITY} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                    })}
                                    {!showAllLocationFilterOptions && <a onClick={() => { this.setState({ showAllLocationFilterOptions: !showAllLocationFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View More</a>}
                                    {showAllLocationFilterOptions && <a onClick={() => { this.setState({ showAllLocationFilterOptions: !showAllLocationFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View Less</a>}

                                </div>
                            </div>
                        </div>}
                        {JOB_COUNT===undefined?<Headerloader/>:
                        <div className="rg-adds rg-jobsearchadd mb-20 mt-20">
                          {this.props.BannerSkill&&  this.props.BannerSkill.map((item)=>{
                                 if(item&&item.POSITION=="LEFT"){
                                 return(  <Link onClick={(e)=>this.BannerCilck(item,locations,count+1)} target='_blank' href={item.LINK} title="">
                                 <figure>
                                     <a>
                                        {item==undefined?"":
                                        <img src={`${"https://s3rozgar.s3.ap-south-1.amazonaws.com/component/page_header/images/"}${item&&item.BANNER_FILE}`} alt="img description" />}</a>
                                     <span>Ad</span>
                                 </figure>
                             </Link>
                                 )}
                          })}
                          
                        </div>}
                       
                    </aside>
                </div >
            </React.Fragment >
        )
    }
}

export default withRouter(filter)
