import React, { Component } from 'react'
import Link from 'next/link';
import constant from 'constant';
import { onChange } from '@/utils';

export default class company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            COMPANY_LIST: [],
            KEYWORD: { name: 'KEYWORD', value: '' }

        }
    }
    componentDidMount() {
        this.setState({ COMPANY_LIST: this.props.COMPANY_LIST })
    }
    render() {
        const { COMPANY_LIST, KEYWORD } = this.state;
        return (
            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
                    <div className='jobbycomsearch'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h6>Browse Jobs by Companies</h6>
                            </div>
                            <div className='col-md-6'>
                                <div class="jobComwrap">
                                    <div class="jobComsearch">
                                        <form className='jobComsearch' onSubmit={(e) => (this.onSearch(e))}>

                                            <input
                                                type="text"
                                                class="jobComsearchTerm"
                                                placeholder="Search Companies By Company Name"
                                                name={KEYWORD.name}
                                                value={KEYWORD.value}
                                                onChange={this.onChange}

                                            />
                                        </form >

                                        <button type="submit" onClick={(e) => (this.onSearch(e))} class="jobComsearchButton">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={COMPANY_LIST && COMPANY_LIST.length ? 'jobsbylocationColumn colCount_four' : 'jobsbylocationColumn'}>
                        {COMPANY_LIST && COMPANY_LIST.length > 0 ? COMPANY_LIST.map((item, index) => {
                            return (
                            <Link 
                            href={{
                               pathname:constant.component.interviewQuestionByCompanyId.url.replace(':id', item.URL),
                               state:{EMPLOYER_ID:item.EMPLOYER_ID,EMPLOYER_NAME:item.COMPANY_NAME}
                            }}
                            >{item.COMPANY_NAME}</Link>)
                        }) : <span>No results found for your search criteria. Please check for any misspelling or try a new search</span>}

                    </div>
                </div>

                {/* <nav className="rg-pagination">
                        <ul>
                            <li className="rg-prevpage"><a href="#"><i className="fa fa-angle-left"></i> Previous</a></li>
                            <li className="rg-active"><a href="#">01</a></li>
                            <li><a href="#">02</a></li>
                            <li><a href="#">03</a></li>
                            <li><a href="#">04</a></li>
                            <li><a href="#">05</a></li>
                            <li><a href="#"></a></li>
                            <li className="rg-nextpage"><a href="#">Next <i className="fa fa-angle-right"></i></a></li>
                        </ul>
                    </nav> */}
            </React.Fragment>
        )
    }

    onSearch = (e) => {
        e.preventDefault()
        const { value } = this.state.KEYWORD;
        if (value.length) {
            const filtered = (this.props.COMPANY_LIST.filter(entry => entry.COMPANY_NAME.toLowerCase().includes(value.toLowerCase())))
            this.setState({ COMPANY_LIST: filtered })
        }
        else {
            this.setState({ COMPANY_LIST: this.props.COMPANY_LIST.slice(0, 799) })
        }

    }

    onChange = (e) => {

        const { name, value } = e.target;
        onChange(this, name, value);
    }
}
