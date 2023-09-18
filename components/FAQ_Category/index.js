import React, { Component } from 'react'

import { Accordion } from 'react-bootstrap'
import nl2br from 'react-nl2br'
import Link from 'next/link';
// import { FaqbyCategory } from '../../action/FAQAction';
import constant from 'constant';
import FaqBlog from 'components/FAQ_Blog/index'
// import FaqEnquiry from './faqEnquiryfrom'
import noSearchFound from 'src/assets/images/no-results.png'
import Shimmer from '../common/Shimmer';
import FaqEnquiryfrom from 'components/FAQ_Enquiry';

export default class FaqCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            data: this.props.data,
            faqSearchKeys: "",
            isSearch: false,
            isKey: false,
            showError: false,
            Search: true,

        }
    }
    searchList = (e) => {
        this.setState({
            isSearch: true,
            showError: true
        })
        this.props.keyword(this.state.faqSearchKeys)
        e.preventDefault()
    }


    render() {
        const { showQuickShimmer, showBrowseShimmer , FAQ_Blog_List} = this.props
        return (
            <React.Fragment>
                <main id="rg-main" className="rg-main rg-haslayout pt-0">
                    <div className="rg-sectionspace rg-haslayout pt-0">
                        <div className="rozgar-faqssearch">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                        <h4>Hi, how can we help you?</h4>
                                        <form className="rozgar-faqssearchbox">
                                            <div className="rozgar-formbox">
                                                <div className="rozgar-searchcontent">
                                                    <div className="form-group">
                                                        <i className="lnr lnr-magnifier"></i>
                                                        <input type="text"
                                                            name="keyword"
                                                            onChange={(e) => {
                                                                this.setState({ faqSearchKeys: e.target.value })
                                                            }}
                                                            className="form-control" placeholder="Search by keyword" />
                                                    </div>
                                                </div>
                                                <button className="rozgar-searchbtn" type="submit"
                                                    onClick={this.searchList}><a href="javascript:void(0)"><i className="lnr lnr-magnifier"></i></a></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rg-breadcrumbarea">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pt-10">
                                        <ol className="rg-breadcrumb">
                                            <li><Link href={constant.component.homepage.url}>Home</Link></li>
                                            <li><Link href={constant.component.faqs.url}>FAQS</Link></li>
                                            <li>
                                                {this.state.faqSearchKeys && this.state.isSearch ?
                                                    <h1 style={{ fontSize: '15px', marginTop: "13px" }}>Search Result for <span style={{ color: "blue" }}> <span>"</span> {this.state.faqSearchKeys}<span>"</span> </span></h1>
                                                    : <li>{this.props.list.list && this.props?.list?.list[0]?.CatName}</li>}</li>

                                        </ol>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rozgar-quciksolution">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        <div className="rozgar-createinnertopic">
                                            <React.Fragment>
                                                <ul className="autoheight" id="style-4">
                                                    {showQuickShimmer && !this.props.list.length && <Shimmer />}
                                                    {
                                                        this.state.Search == true && this.props.data.list && this.props.data.list.length > 0 ?
                                                            this.props.data.list.map((ele, index) => {

                                                                return <a
                                                                    target="_blank"
                                                                    href={constant.component.faqCategory.url.replace('[url]', ele.URL)} ><li >
                                                                        <i style={{ color: "red" }} className={ele.ICON}></i>
                                                                        <a style={{ color: "black" }}> {ele.CATEGORY}</a>
                                                                    </li>
                                                                </a>
                                                            }
                                                            )
                                                            :
                                                            !showQuickShimmer && <h5 className='text-center text-danger'>No FAQ Found</h5>
                                                    }
                                                </ul>
                                            </React.Fragment>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                        <React.Fragment>
                                            <div className="rozgar-quciksolutionbox">
                                                <ul >
                                                    {showBrowseShimmer && !this.props.list.length && <Shimmer />}
                                                    {
                                                        this.props.list.list && this.props.list.list.length > 0 ?
                                                            this.props.list.list.map((ele, index) => {

                                                                return <Accordion defaultActiveKey="1" >
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header>{ele.QUESTION}</Accordion.Header>
                                                                        <Accordion.Body >

                                                                            {nl2br(ele.ANSWER)}

                                                                        </Accordion.Body>

                                                                    </Accordion.Item>

                                                                </Accordion>
                                                            }
                                                            )
                                                            : !showBrowseShimmer && this.state.showError ? <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                                                <img src={noSearchFound}></img>
                                                                <h4>No Search Found.</h4>
                                                                <h6>Did you enter wrong spelling of any word?</h6>
                                                                <p>Only FAQs Question/Answer names are accepted in FAQs Search</p>


                                                            </div> : <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                                                <img src={noSearchFound}></img>
                                                                {/* <h4>No FAQs Found.</h4> */}
                                                                <h4>No FAQs Added in this category</h4>
                                                                <Link href={constant.component.faqs.url}>
                                                                    <p style={{ fontSize: "14px" }}>Find more FAQs</p>
                                                                </Link>
                                                            </div>




                                                    }
                                                </ul>
                                            </div>
                                        </React.Fragment>



                                    </div>

                                </div>
                            </div>
                        </div>

                        <FaqBlog  FAQ_Blog_List={ FAQ_Blog_List} />

                        <FaqEnquiryfrom />
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
