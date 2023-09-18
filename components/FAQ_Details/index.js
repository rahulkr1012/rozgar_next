import React, { useState } from 'react'
import Link from 'next/link'
import constant from 'constant'
import noSearchFound from 'src/assets/images/no-results.png'
import Image from 'next/image'
import { FAQList } from '@/action/FAQAction'
import dynamic from 'next/dynamic'
import Parser from 'html-react-parser';
import FAQBLOG from 'components/FAQ_Blog'
import authImage from 'src/assets/images/author/blogAuthor.png'
import ImageLoader from 'components/ImageLoader'
import FaqEnquiryfrom from 'components/FAQ_Enquiry'
import Loader from 'components/common/FAQLoader.js/Loader'

function index(props) {

    const [state, setState] = useState({
        list: props.list,
        data: props.data,
        FAQ_Blog_List: props.FAQ_Blog_List,
        blogSearchKeys: "",
        isSearch: false,
        dynamicURL: '',
        showError: false,
    });


    const searchList = (e) => {
        e.preventDefault()
         updateKeyword(state.blogSearchKeys)
    }

    const updateKeyword = (keyword) => {
        setState({ KEYWORD: keyword })
        getFAQlist(keyword)
        // getfaqbyCategory(keyword)

    }


    const getFAQlist = (keyword) => {
        FAQList({ KEYWORD: keyword }).then((res) => {
            setState({ ...state, list: res.result.list })
        }).catch((err) => {
            alert(err)
        })
    }

    // getfaqbyCategory = (keyword) => {
    //     const urlType = this.props.router.url
    //     if (urlType === constant.component.faqCategory.url) {
    //         const URL = this.props.match.params.URL
    //         FaqbyCategory(URL, { KEYWORD: keyword }).then((res) => {
    //             this.setState({ showBrowseShimmer: true })
    //             this.setState({ list: res.result })
    //             this.setState({ showBrowseShimmer: false })
    //             document.title = "FAQ - " + capitalizeWords(this.props.match.params.URL.split('-')).join(' ') + " - Rozgar.com"
    //         }).catch((err) => {
    //             alert(err)
    //         })
    //     }
    // }
    let { list, data, FAQ_Blog_List } = state


    return (
        <React.Fragment >
            <main id="rg-main" className="rg-main rg-haslayout pt-0">
                <div className="rg-sectionspace rg-haslayout pt-0">
                    <div className="rozgar-faqssearch">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 offset-2">
                                    <h4> Hi, how can we help you? </h4>
                                    <form className="rozgar-faqssearchbox">
                                        <div className="rozgar-formbox">
                                            <div className="rozgar-searchcontent">
                                                <div className="form-group">
                                                    <i className="lnr lnr-magnifier"></i>
                                                    <input type="search" name="search"

                                                        onChange={(e) => {
                                                            setState({ ...state, blogSearchKeys: e.target.value })
                                                            //this.searchList(e.target.value)

                                                        }}
                                                        className="form-control" placeholder="Search by keyword" />

                                                </div>
                                            </div>
                                            <button className="rozgar-searchbtn" type="submit"

                                                onClick={searchList}><a href="javascript:void(0)"><i className="lnr lnr-magnifier"></i></a></button>
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
                                        <li className="rg-active">FAQs</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rozgar-quciksolution">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">


                                    <div className="rozgar-quciksolutionbox">

                                        {/* this.state.blogSearchKeys && this.state.isSearch ?
                                        <h1 style={{ fontSize: '20px' }}>Search Result for <span style={{ color: "blue" }}> <span>"</span> {this.state.blogSearchKeys}<span>"</span> </span></h1>
                                                : <h2 className="headline">Quick Solution</h2>   */}


                                        <React.Fragment>
                                            {list===undefined?<Loader/>:
                                                state.list && state.list.length > 0 ?

                                                    <ul className="autoheight" id="style-4">
                                                        {
                                                            list && list.length > 0 &&
                                                            list.map((ele, index) => {
                                                                return (
                                                                    <li >
                                                                        <span>Q.</span>
                                                                        <Link href={constant.component.faqDetails.url.replace('[url]', ele.URL)}   >
                                                                            {ele.QUESTION}
                                                                        </Link>

                                                                    </li>)
                                                            }
                                                            )
                                                        }
                                                    </ul>

                                                    :
                                                    <ul id="style-4">
                                                        <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                                            <Image src={noSearchFound} alt=" no search found  " height={60} width={1000} style={{ maxHeight: "75px" }} />
                                                            <h4>No Search Found.</h4>
                                                            <h6>Did you enter wrong spelling of any word?</h6>
                                                            <p>Only FAQs Question/Answer names are accepted in FAQs Search</p>


                                                        </div>
                                                    </ul>
                                            }
                                        </React.Fragment>

                                    </div>



                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="rozgar-browsebytopic">
                                        <h2 className="headline">Browse by topic</h2>

                                        <React.Fragment>
                                            <ul className="autoheight" id="style-4">
                                                {data === undefined && <Loader /> }

                                                {
                                                    data && data.length > 0 &&
                                                    data.map((ele, index) => {
                                                        return <Link href={constant.component.faqCategory.url.replace('[url]', ele.URL)} > <li >
                                                            <i style={{ color: "red" }} className={ele.ICON}></i>
                                                            <a style={{ color: "black" }}>	{ele.CATEGORY}</a>
                                                        </li>
                                                        </Link>
                                                    }
                                                    )

                                                }
                                                {/* {!showBrowseShimmer && <h5 className='text-center text-danger'>No FAQ Found</h5>} */}

                                            </ul>
                                        </React.Fragment>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <React.Fragment>
                        <section className="rg-haslayout rg-sectionspace">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="rg-sectionhead pb-4">
                                            <h2 className="blogheadline">Latest Blogs</h2>
                                            <a target='_blank' className="rg-btnviewall" href={constant.component.blog.url}>View All</a>
                                        </div>
                                    </div>
                                    <div className="rg-topcompaniesholder">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <div className="rg-topcompaniesslider rg-topcompanies blogheighbox">
                                                {
                                                    FAQ_Blog_List ?
                                                        FAQ_Blog_List.map((item, index) => {
                                                            return (
                                                                <div className="rg-faqsourblog linefix item col-md-4 p-0 m-1">
                                                                    <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                                        <Image width={200} height={100} src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/Picture/${item.BLOG_IMAGE}`} alt="image description" />
                                                                    </a>
                                                                    <div className='p-4'>
                                                                        <div target='_blank' className="rg-bglight blogtihead" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                                            <h3 className=''>
                                                                                <Link href={constant.component.blogDetail.url.replace(':url', item.URL)}>{item.BLOG_TITLE}</Link>
                                                                            </h3>
                                                                        </div>
                                                                        <div className="rg-bglight">
                                                                            <p className='pb-5' style={{ textAlign: "left" }}>{Parser(item.BLOG_DETAILS.slice(0, 250))}...
                                                                                <span style={{ color: "#55acee" }}><a href={constant.component.blogDetail.url.replace(':url', item.URL)}>Read More</a></span></p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='autharname'>
                                                                        <div className='authimag pl-4'>
                                                                            <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                                                <Image width={36} height={36} style={{ borderRadius: "50%", objectFit: "contain" }} src={authImage} />
                                                                            </a>
                                                                        </div>


                                                                        <div className='authorname-p'>

                                                                            <a target='_blank' className="rg-bglight" href={constant.component.blogDetail.url.replace(':url', item.URL)}>
                                                                                <p style={{ fontWeight: "500", padding: "10px 20px" }}>{item.AUTHOR}</p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        ) : 'no blog '
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>




                                            {/* <FaqBlog /> */}
                {/* <FAQBLOG FAQ_Blog_List={FAQ_Blog_List}  />  */}
                                            <FaqEnquiryfrom />  

                </div>
            </main>
        </React.Fragment >


    )
}

export default index
