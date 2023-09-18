import React, { Component } from 'react'

import { Accordion } from 'react-bootstrap'
import nl2br from 'react-nl2br'
import Link from 'next/link';
import { FaqbyCategory } from '@/action/FAQAction';
import constant from 'constant';
import FaqBlog from 'components/FAQ_Blog/index';
import FaqEnquiryfrom from 'components/FAQ_Enquiry/index';
import Shimmer from 'components/Loader';
//import noSearchFound from '../../assets/images/NoSearchFound.png'
import noSearchFound from 'src/assets/images/no-results.png'
import Image from 'next/image';
 

export default class faqDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            data: this.props.data,
            faqDetailSearchKeys: "",
            keywordList: this.props.keywordList.length > 0 ? this.props.keywordList : [],
            Search: false,
            isSearch: false,
            showError: false

        }

    }



    searchList = (e) => {
        e.preventDefault()

        this.setState({
            isSearch: true
        })

        this.setState({
            Search: true,
            showError: true
        })



        this.props.keyword(this.state.faqDetailSearchKeys)

    }




    render() {

        const { showQuickShimmer, showURLShimmer, showFAQShimmer ,FAQ_Blog_List} = this.props
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
                                                            onChange={(e) => {

                                                                this.setState({ faqDetailSearchKeys: e.target.value })
                                                                //this.searchList(e.target.value)

                                                            }}

                                                            name="keyword" className="form-control" placeholder="Search by keyword" />

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
                                            <li><Link href={constant.component.faqs.url}>FAQs</Link></li>

                                            <li>
                                                {this.state.faqDetailSearchKeys && this.state.isSearch ?
                                                    <h1 style={{ fontSize: '15px', marginTop: "13px" }}>Search Result for <span style={{ color: "blue" }}> 
                                                    <span>"</span> {this.state.faqDetailSearchKeys}<span>"</span> </span></h1>
                                                    : <li className="rg-active">{this.props.list.QUESTION}</li>}
                                            </li>
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
                                        
                                            {showQuickShimmer && !this.props.list.length && <Shimmer />}
                                            {
                                                this.props.data.list && this.props.data.list.length > 0 &&
                                                this.props.data.list.map((ele, index) => {

                                                    return <a target="_blank"
                                                           key={index}
                                                        href={constant.component.faqCategory.url.replace('[url]', ele.URL)} ><li >
                                                            <i style={{ color: "red" }} className={ele.ICON}></i>
                                                            <a style={{ color: "black" }}> {ele.CATEGORY}</a>
                                                        </li>
                                                    </a>
                                                }
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                        {showFAQShimmer && !this.props.list.length && <Shimmer />}

                                        {

                                            this.state.Search == true && this.props.keywordList.list && this.props.keywordList.list.length > 0 ? this.props.keywordList.list.map((item , index) => {
                                                return (
                                                    <div key={index} className="rozgar-quciksolutionbox">
                                                        {/* <h2 className="headline1">Search Result for <span>"</span>{this.props.list.QUESTION}<span>?"</span></h2> */}
                                                        <Accordion defaultActiveKey="1">
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header>{item.QUESTION}</Accordion.Header>
                                                                <Accordion.Body>

                                                                    {nl2br(item.ANSWER)}

                                                                </Accordion.Body>

                                                            </Accordion.Item>

                                                        </Accordion>

                                                    </div>)

                                            }) : this.state.showError ? <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                             
                                             <Image
                                              width={200}
                                              height={200} 
                                             src={noSearchFound}
                                               />
                                              
                                             <h4>No Search Found.</h4>
                                             <h6>Did you enter wrong spelling of any word?</h6>
                                             <p>Only FAQs Question/Answer names are accepted in FAQs Search</p>
                                            </div> : ""
                                        }
                                        {showURLShimmer && !this.props.list.length && <Shimmer />}

                                        {
                                            this.state.showError == false && this.props.list ?

                                                <div className="rozgar-quciksolutionbox">
                                                    {/* <h2 className="headline1">Search Result for <span>"</span>{this.props.list.QUESTION}<span>?"</span></h2> */}
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>{this.props.list.QUESTION}</Accordion.Header>
                                                            <Accordion.Body className='faqansheight'>

                                                                {nl2br(this.props.list.ANSWER)}

                                                            </Accordion.Body>

                                                        </Accordion.Item>

                                                    </Accordion>

                                                </div>

                                                :
                                                ""
                                        }




                                    </div>



                                </div>
                            </div>
                        </div>
                         
                        <FaqBlog 
                        FAQ_Blog_List={FAQ_Blog_List}
                         />
                                    <FaqEnquiryfrom />

                    </div>
                </main>
            </React.Fragment>
        )
    }
} 