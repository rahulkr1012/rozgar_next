import React, { Component } from 'react'
import Link from 'next/link';
import constant from 'constant';
import { onChange } from '@/utils';
// import Shimmer from '../common/Shimmer';

export default class designation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DESIGNATION_LIST: [],
            KEYWORD: { name: 'KEYWORD', value: '' }

        }
    }
    componentDidMount() {
        this.setState({ DESIGNATION_LIST: this.props.DesignationList })
    }



    render() {
        const { DESIGNATION_LIST, KEYWORD } = this.state;
        const { DESIGNATION_LIST_COUNT } = this.props
        return (
            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
                    <div className='jobbycomsearch'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h6>Browse Jobs by Designations / Job Titles</h6>
                            </div>
                            <div className='col-md-6'>
                                <div className="jobComwrap">

                                    <div className="jobComsearch">

                                        <form className='jobComsearch' onSubmit={(e) => (this.onSearch(e))}>

                                            <input
                                                type="text"
                                                class="jobComsearchTerm"
                                                placeholder="Search for a  Designation / Job Title"
                                                name={KEYWORD.name}
                                                value={KEYWORD.value}
                                                onChange={this.onChange}

                                            />
                                        </form >

                                        <button type="submit" onClick={(e) => (this.onSearch(e))} class="jobComsearchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={DESIGNATION_LIST && DESIGNATION_LIST.length > 0 ? 'jobsbylocationColumn colCount_four' : 'jobsbylocationColumn'}>
                        {DESIGNATION_LIST_COUNT !== undefined && DESIGNATION_LIST.length > 0 ? DESIGNATION_LIST.map((item, index) => {
                            return (
                                <Link href={
                                    constant.component.interviewQuestionByDesignationId.url.replace(':id', item.URL)
                                }>{item.DESIGNATION}</Link>)
                        }) : <span>No results found for your search criteria. Please check for any misspelling or try a new search</span>}

                    </div>
                </div>


            </React.Fragment>
        )
    }

    onSearch = (e) => {
        e.preventDefault()
        const { value } = this.state.KEYWORD;
        if (value.length) {
            const filtered = (this.props.DesignationList.filter(entry => entry.DESIGNATION.toLowerCase().includes(value.toLowerCase())))
            this.setState({ DESIGNATION_LIST: filtered })
        }
        else {
            this.setState({ DESIGNATION_LIST: this.props.DESIGNATION_LIST.slice(0, 799) })
        }

    }

    onChange = (e) => {
        const { name, value } = e.target;
        onChange(this, name, value);
    }
}
