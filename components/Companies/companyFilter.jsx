import { companyFilterData } from '@/action/companyAction';
import { onChange } from '@/utils';
import Shimmer from 'components/common/HeaderLoader/index';
import React, { Component } from 'react'

 


export default class companyFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CURRENT_PAGE: 1,
            filterData: undefined,
            COMPANY_TYPE: {
                name: 'COMPANY_TYPE', value: [], error: '', checked: [], isRequired: false
            },
            LOCATION: {
                name: 'LOCATION', value: [], options: [], error: '', isRequired: false
            },
            CATEGORY: {
                name: 'CATEGORY', value: [], options: [], error: '', isRequired: false
            },
            showAllLocationFilterOptions: false,
            showAllCategoryFilterOptions: false
        }
    }

    componentDidMount() {
        companyFilterData().then(res => {
            if (res.status) {
                this.setState({ filterData: res.result })
            }
        })
    }
    companyTypeFilter = (input) => {
        let array = this.state.COMPANY_TYPE.value
        const index = array.indexOf(input.COMPANY_TYPE_ID);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        else {
            const str = input.COMPANY_TYPE_ID
            array.push(str)
        }
        onChange(this, 'COMPANY_TYPE', array)
        this.sendFilterData()
    }

    locationFilter = (input) => {
        let array = this.state.LOCATION.value
        const index = array.indexOf(input.STATE_ID);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        else {
            const str = input.STATE_ID
            array.push(str)
        }
        onChange(this, 'LOCATION', array)
        this.sendFilterData()
    }

    categoryFilter = (input) => {

        let array = this.state.CATEGORY.value
        const index = array.indexOf(input.EMPLOYER_INDUSTRY_ID);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        else {
            const str = input.EMPLOYER_INDUSTRY_ID
            array.push(str)
        }
        onChange(this, 'CATEGORY', array)
        this.sendFilterData()
    }

    sendFilterData = () => {
        const { COMPANY_TYPE, LOCATION, CATEGORY } = this.state;
        const filterModel = {
            COMPANY_TYPE: COMPANY_TYPE.value,
            CATEGORY: CATEGORY.value,
            LOCATION: LOCATION.value
        }
        this.props.getFilterData(filterModel)
    }
  render() {
    const { filterData, showAllLocationFilterOptions, LOCATION, CATEGORY, COMPANY_TYPE, showAllCategoryFilterOptions } = this.state
    
    return (
      <React.Fragment>
       
         { filterData === undefined &&
                    <aside id="rg-sidebar" className="rg-sidebar rg-sidebarcol">
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </aside>}
                {
                    filterData !== undefined &&
                    <aside id="rg-sidebar" className="rg-sidebar rg-sidebarcol">
                        <div className="rg-widget rg-widgetsearch rg-widgetjobalert mb-10">
                            <div className="filterbox-com">
                                <div className="filtericon">
                                    <i className="fa fa-filter" aria-hidden="true"></i> <b>All Filters</b>
                                </div>
                            </div>
                        </div>
                        <div id="rg-narrowsearchcollapse" className="rg-themecollapse rg-narrowsearchcollapse">
                            <div className="rg-widget rg-themecollapsetitle">
                                <div className="rg-widgettitle">
                                    <h2>Company type</h2>
                                    <span className="fa fa-chevron-right"></span>
                                </div>
                            </div>
                            <div className="rg-widget rg-themecollapsecontent">
                                <div className="rg-checkboxgroup">
                                    {filterData !== undefined && filterData.companyType.map(item => {
                                        return (
                                            <span
                                                onClick={() => this.companyTypeFilter(item)}
                                                className="rg-checkbox">
                                                <input type="checkbox"
                                                    checked={COMPANY_TYPE.value.includes(item.COMPANY_TYPE_ID)}
                                                />
                                                <label for="rg-salesexecutive">
                                                    <span>{item.COMPANY_TYPE}<span className="price"></span></span>
                                                </label>
                                             </span>
                                         )
                                    })
                                    }

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
                                    {filterData !== undefined && filterData.location.map((item, index) => {
                                        if (index < 7 && !showAllLocationFilterOptions) {
                                            return (
                                                < span
                                                    onClick={() => this.locationFilter(item)}
                                                    className="rg-checkbox">
                                                    <input type="checkbox"
                                                        checked={LOCATION.value.includes(item.STATE_ID)}
                                                    />
                                                    <label for="rg-internstudent">
                                                        <span>{item.STATE} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )

                                        }
                                        else if (showAllLocationFilterOptions) {
                                            return (
                                                <span
                                                    onClick={() => this.locationFilter(item)}
                                                    className="rg-checkbox">
                                                    <input type="checkbox"
                                                        checked={LOCATION.value.includes(item.STATE_ID)}
                                                    />
                                                    <label for="rg-internstudent">
                                                        <span>{item.STATE} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                    })}
                                    {!showAllLocationFilterOptions && <a onClick={() => { this.setState({ showAllLocationFilterOptions: !showAllLocationFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View More</a>}
                                    {showAllLocationFilterOptions && <a onClick={() => { this.setState({ showAllLocationFilterOptions: !showAllLocationFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View Less</a>}
                                </div>
                            </div>
                            <div className="rg-widget rg-themecollapsetitle">
                                <div className="rg-widgettitle">
                                    <h2>Industry</h2>
                                    <span className="fa fa-chevron-right"></span>
                                </div>
                            </div>
                            <div className="rg-widget rg-themecollapsecontent">
                                <div className="rg-checkboxgroup">
                                    {filterData !== undefined && filterData.category.map((item,index) => {
                                        if (index < 7 && !showAllCategoryFilterOptions) {
                                            return (
                                                <span className="rg-checkbox"
                                                    onClick={() => this.categoryFilter(item)}>
                                                    <input type="checkbox"
                                                        checked={CATEGORY.value.includes(item.EMPLOYER_INDUSTRY_ID)}
                                                    />
                                                    <label for="rg-armagh">
                                                        <span>{item.INDUSTRY} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                        else if (showAllCategoryFilterOptions) {
                                            return (
                                                <span className="rg-checkbox"
                                                    onClick={() => this.categoryFilter(item)}>
                                                    <input type="checkbox"
                                                        checked={CATEGORY.value.includes(item.EMPLOYER_INDUSTRY_ID)}
                                                    />
                                                    <label for="rg-armagh">
                                                        <span>{item.INDUSTRY} <span className="price"></span></span>
                                                    </label>
                                                </span>
                                            )
                                        }
                                    })}
                                    {!showAllCategoryFilterOptions && <a onClick={() => { this.setState({ showAllCategoryFilterOptions: !showAllCategoryFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View More</a>}
                                    {showAllCategoryFilterOptions && <a onClick={() => { this.setState({ showAllCategoryFilterOptions: !showAllCategoryFilterOptions }) }} className='text-primary' style={{ cursor: 'pointer' }}>View Less</a>}

                                </div>
                            </div>
                            {/* <div className="rg-widget rg-themecollapsetitle">
                            <div className="rg-widgettitle">
                                <h3>Department</h3>
                                <span className="fa fa-chevron-right"></span>
                            </div>
                        </div> */}
                            {/* <div className="rg-widget rg-themecollapsecontent">
                            <div className="rg-checkboxgroup">
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-fresh" name="bycondition" value="" />
                                    <label for="rg-fresh">
                                        <span>Engineering - Software & QA <span className="price">(1349)</span></span>
                                    </label>
                                </span>
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-lessthan" name="bycondition" value="" />
                                    <label for="rg-lessthan">
                                        <span>Sales & Business Development <span className="price">(838)</span></span>
                                    </label>
                                </span>
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-1year" name="bycondition" value="" />
                                    <label for="rg-1year">
                                        <span>Human Resources <span className="price">(784)</span></span>
                                    </label>
                                </span>
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-2years" name="bycondition" value="" />
                                    <label for="rg-2years">
                                        <span>Finance & Accounting <span className="price">(696)</span></span>
                                    </label>
                                </span>
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-3years" name="bycondition" value="" />
                                    <label for="rg-3years">
                                        <span>IT & Information Security <span className="price">(582)</span></span>
                                    </label>
                                </span>
                                <span className="rg-checkbox">
                                    <input type="checkbox" id="rg-3years" name="bycondition" value="" />
                                    <label for="rg-3years">
                                        <span>Other <span className="price">(582)</span></span>
                                    </label>
                                </span>
                            </div>
                        </div> */}
                        </div>
                        <div className="roz-near-facilities-box">
                            <div className="roz-near-facilities-heading">
                                <h2>Advertisement</h2>
                            </div>
                            <div className="roz-near-facilities-body">

                                <div className="roz-jobschedules">
                                    <div className="roz-tabcontent tab-content">
                                        <div className="roz-jobdetails roz-abouttab roz-tabpane">
                                            <div className="roz-jobdetaildescription">
                                                <div className="roz-near-locality-box">
                                                    <div className="loccontentbox">
                                                        <h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
                                                        <p>Looking for an agency to design and develop an amazing website?</p>
                                                        <span className="roz-locrating-star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <span>3.0</span>
                                                        </span>
                                                        <div className="roz-callphone">
                                                            <i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
                                                        </div>
                                                        <div className="roz-callphone">
                                                            <i className="lnr lnr-phone"></i> +91-1800 274 4515
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="roz-jobdetaildescription">
                                                <div className="roz-near-locality-box">
                                                    <div className="loccontentbox">
                                                        <h4><span className="adbox">Ad</span> <a href="#">Tata The Indian Food Company, Sector 2, Noida - Zomato</a></h4>
                                                        <p>Tata The Indian Food Company Noida; Tata The Indian Food Company.</p>
                                                        <span className="roz-locrating-star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <span>3.0</span>
                                                        </span>
                                                        <div className="roz-callphone">
                                                            <i className="fa fa-globe"></i> <a href="#">www.zomato.com</a>
                                                        </div>
                                                        <div className="roz-callphone">
                                                            <i className="lnr lnr-phone"></i> +91-1600 676 4514
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="roz-jobdetaildescription">
                                                <div className="roz-near-locality-box">
                                                    <div className="loccontentbox">
                                                        <h4><span className="adbox">Ad</span> <a href="#">Corporate Companies For Food Products - Noida Sector 62</a></h4>
                                                        <p>Top Corporate Companies For Food Products in Noida Sector 62, Delhi.</p>
                                                        <span className="roz-locrating-star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <span>4.0</span>
                                                        </span>
                                                        <div className="roz-callphone">
                                                            <i className="fa fa-globe"></i> <a href="#">www.justdial.com</a>
                                                        </div>
                                                        <div className="roz-callphone">
                                                            <i className="lnr lnr-phone"></i> +91-1400 474 4516
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="roz-jobdetaildescription">
                                                <div className="roz-near-locality-box">
                                                    <div className="loccontentbox">
                                                        <h4><span className="adbox">Ad</span> <a href="#">Web Design & Development - Web Design Agency in Delhi NCR</a></h4>
                                                        <p>Looking for an agency to design and develop an amazing website?</p>
                                                        <span className="roz-locrating-star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <i className="fa fa-star-o"></i>
                                                            <span>3.0</span>
                                                        </span>
                                                        <div className="roz-callphone">
                                                            <i className="fa fa-globe"></i> <a href="#">www.webimpetus.com</a>
                                                        </div>
                                                        <div className="roz-callphone">
                                                            <i className="lnr lnr-phone"></i> +91-1800 274 4515
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="roz-postfreejob">
                                        <a href="#">Place your ad here <i className="fa fa-angle-double-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>}
      </React.Fragment>
    )
  }
}
