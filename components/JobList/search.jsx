import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead';
import constant from 'constant';
import { onChange, setOptions, validateForm } from '@/utils';
import { KeywordSearch, LocationSearch } from '../../src/action/dashboard';
import queryString from 'query-string'
import { setError } from '@/utils';
import { withRouter } from 'next/router';

class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KEYWORD: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: true },
            LOCATION: { name: 'LOCATION', value: [], options: [], error: '', isRequired: false },
            tempKeyword: "",
            tempLocation: "",
            tempSkill: "",
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



    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value)
    }

    componentDidMount() {
        const q = '?' + document.location.href.split('?')[1]
        // const qParam = queryString.parse(this.props.location.search)
        const qParam = queryString.parse(q)
        // const qParam = queryString.parse(this.props.location.search)
        const KEYWORDS = qParam?.keyword?.split(',')
        onChange(this, 'KEYWORD', KEYWORDS)
        const LOCATION = qParam?.location?.split(',')
        onChange(this, 'LOCATION', LOCATION ? LOCATION : [])
        const EXP = qParam?.exp?.split('-')
        onChange(this, 'EXPERIENCE', EXP ? EXP : [])


    }

    onSubmit = (e) => {
        if (e) {
            e.preventDefault();

        }
        const { KEYWORD, LOCATION, EXPERIENCE, SALARY } = this.state;
        if (validateForm(this)) {
            let MINEXP = ''
            let MAXEXP = ''
            if (EXPERIENCE.value.length) {
                let exp = ''
                if (typeof (EXPERIENCE.value) == 'string') {
                    exp = EXPERIENCE.value.split(',')
                }
                else {
                    exp = EXPERIENCE.value

                }
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
                    //  window.open(LocationUrl ,"_blank")
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
                            setError(this, this.state.KEYWORD.name, " ")
                        }
                    }
                }

            }
        }








    }

    render() {

        const { KEYWORD, LOCATION, EXPERIENCE, SALARY } = this.state;

        return (
            <React.Fragment>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <form onSubmit={(e) => { this.onSubmit(e) }} className="rg-formtheme rg-formbannersearch rg-formbannersearchinner home-search-bar-main">
                        <fieldset className="rg-searcharea" style={{ border: KEYWORD.error.length && '1px solid #e81c28' }}>
                            <div className="rg-searchholder">
                                <div className="form-group rg-inputwithicon">
                                    <i className="lnr lnr-magnifier"></i>
                                    {
                                        <Typeahead
                                            className={KEYWORD.error.length ? 'form-control is-invalid ' : 'form-control srchjob'}
                                            id='keyword'
                                            useCache={false}
                                            clearButton={false}
                                            multiple={true}
                                            allowNew={true}
                                            // maxResults={3}
                                            name={KEYWORD.name}
                                            selected={KEYWORD.value}
                                            options={KEYWORD.options}
                                            onKeyDown={(e) => this.onJobSearch(e)}
                                            placeholder="Enter Skill, Company, Designation"
                                            onInputChange={(e) => { this.onKeywordPress(e, 'KEYWORD') }}
                                            onChange={(e) => { this.onKeywordChange(e) }}
                                            emptyLabel
                                        />

                                    }


                                </div>
                            </div>
                            <div className="rg-searchholder loc-bx">
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
                                        onKeyDown={(e) => this.onJobSearch(e)}
                                        placeholder="Location"
                                        onInputChange={(e) => { this.onKeywordPress(e, 'LOCATION') }}
                                        onChange={(e) => { this.onLocationChange(e) }}
                                        emptyLabel
                                    />
                                </div>
                            </div>

                            <div className="rg-searchholder bl-0">
                                <i className="lnr lnr-calendar-full"></i>
                                <span className="rg-select padleft">
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
                            <div className="rg-searchbtn" >
                                <button type="submit" onClick={() => this.onSubmit()} className="rg-btn rg-active btn-primary float-right">
                                    <i className="lnr lnr-magnifier"></i> Search</button>
                            </div>
                        </fieldset>
                        {KEYWORD.error.length > 0 && <span style={{ marginLeft: '50px' }} className='text-danger'>Please enter keywords to search relevant jobs</span>}
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(search)