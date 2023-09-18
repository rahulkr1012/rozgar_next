import Link from 'next/link';
import React, { Component } from 'react'
import constant from 'constant';
import { onChange } from '../../utils';
import { withRouter } from 'next/router';

export default withRouter ( class Company extends Component {

    constructor(props) {
        super(props)
        this.state = {
            COMPANY_LIST: [],
            KEYWORD: { name: 'KEYWORD', value: '' }

        }
    }
    componentDidMount() {
        window.scroll(0, 0)
        this.setState({ COMPANY_LIST: this.props.COMPANY_LIST.slice(0, 799) })
    }
    render() {

          
        let arraytag = this.props.router.asPath.split('-')
        let finalTag = arraytag[arraytag.length-1]
        let finalUrl =  ':url-jobs'




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
                                <div className="jobComwrap">
                                    <div className="jobComsearch">
                                        <form className='jobComsearch' onSubmit={(e) => (this.onSearch(e))}>

                                            <input
                                                type="text"
                                                className="jobComsearchTerm"
                                                placeholder="Search Companies By Company Name"
                                                name={KEYWORD.name}
                                                value={KEYWORD.value}
                                                onChange={this.onChange}

                                            />
                                        </form >

                                        <button type="submit" onClick={(e) => (this.onSearch(e))} className="jobComsearchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={COMPANY_LIST.length ? 'jobsbylocationColumn colCount_four' : 'jobsbylocationColumn'}>

                        {COMPANY_LIST.length > 0 ? COMPANY_LIST.map((item, index) => {
                            return (<Link
                                target="_blank"
                                href={{
                                    pathname: finalUrl.replace(':url', item.URL),
                                    state: { hideJobAlert: true }
                                }}
                            >
                                {item.COMPANY_NAME}
                            </Link>)
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
})
