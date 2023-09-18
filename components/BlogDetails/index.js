import React, { useState } from 'react'
import Parser from 'html-react-parser';
import { Accordion } from 'react-bootstrap'
import constant from 'constant';
import Link from 'next/link';
import jobalert from '../../src/assets/images/jobalert.png';
import Image from 'next/image';
import moment from 'moment';
import authImage from 'src/assets/images/author/blogAuthor.png'
import styleBdetail from "../../components/BlogDetails/styleBdetail.module.css";
import {
    FacebookShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,

} from 'react-share'
import { useRouter } from 'next/router';
import { addBlogComment } from '@/action/BlogAction';
import Swal from 'sweetalert2';
import nl2br from 'react-nl2br';
import { ToSeoUrl } from 'utils';

function index(props) {
    let { blogCommentList, blogCategory, recentList, blog, relatedBlogs, FeaturedJob, jobListOne, jobListTwo } = props

    let router = useRouter()
    const [error, setError] = useState(false)

    const [state, setState] = React.useState({
        data: props.blog,
        thumbnail: "",
        recentList: undefined,
        name: { name: 'name', value: '', error: '', isRequired: true },
        email: { name: 'email', value: '', error: '', isRequired: true },
        message: { name: 'message', value: '', error: '', isRequired: true },
        blogCommentList: undefined,
        captcha: false,
        blogCategory: undefined,
        showShimmer: true,
        showBlogDetailShimmer: false,
        keyword: { name: 'keyword', value: '', error: '', isRequired: false },
    });

    let share_blog = {
        border: "none",
        color: "black",
        padding: " 2px 2px",
        textAlign: "center",
        fontSize: "16px",
        margin: "4px 2px",
        transition: '0.3s',
        transitionDelay: "1sec",
        transform: "translateY(-10px)"
    }

    let sharable_link = { url: `https://rozgar.com/${router.asPath}`, style: share_blog }

    const onAddComment = (e) => {

        const st = state;
        e.preventDefault();
        if (state.name.value.length == 0 || state.email.value.length == 0 || state.message.value.length == 0) {
            setError(true);
        }
        else {
            const { name, email, message } = st
            const model = {
                NAME: name.value,
                EMAIL: email.value,
                MESSAGE: message.value,
                BLOG_ID: state.data.BLOG_ID
            }
            addBlogComment(model).then((res) => {
                if (res.status) {
                    Swal.fire({
                        icon: 'success',
                        text: res.messageCode,
                        timer: 1500,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    window.location.reload()
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: "Undefined",
                        timer: 1500,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                }

            })
        }
    }
    console.log(FeaturedJob, 'FeaturedJob');
    return (
        <React.Fragment>
            <section className={styleBdetail.bgbloghead} style={{ padding: '10px 0px' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            {
                                blog != undefined ?
                                    <h1 className='details-hd text-white pt-4' style={{ fontSize: '30px', maxWidth: '750px', margin: '0 auto' }}>{blog.BLOG_TITLE}</h1> : ""
                            }
                            <ul className={styleBdetail.Blogpostarticlemetavtwo}>
                                <li>
                                    <a href="javascript:void(0);">
                                        <i className="lnr lnr-calendar-full"></i>
                                        <span>{moment(blog.CREATED_ON).format('DD MMM, YYYY')}</span>
                                    </a>
                                </li>
                                <li>

                                    <a href={blog.AUTHOR_PROFIILE_URL ? constant.component.blogauthor.url.replace(':author-profile', `${blog.AUTHOR_PROFIILE_URL}`) : 'javascript:void:0'}>
                                        <i className="lnr lnr-user"></i>
                                        <span>{blog.AUTHOR}</span>
                                    </a>
                                </li>


                            </ul>

                            <div className={styleBdetail.blogareahead} style={{ padding: '0px 0px' }}>
                                <div className={styleBdetail.blogbreadcrumbarea}>
                                    <ol className="rg-breadcrumb" style={{ textAlign: 'left' }}>
                                        <li><Link href={constant.component.homepage.url}>Home</Link></li>
                                        <li><Link href={constant.component.blog.url}>Blog</Link></li>
                                        <li><Link href="javascript:void(0);">{blog.META_TITLE}</Link></li>
                                    </ol>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <div className="wrapper">
            </div>
            <main id="rg-main" className="rg-main rg-haslayout" >
                <div className="rg-sectionspace rg-haslayout">
                    <div className="container">
                        <div className="row">
                            <div id="rg-twocolumns" className="rg-twocolumns">
                                {
                                    blog != undefined &&
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 ">
                                        <div id="rg-content" className="rg-content rg-blogdetail">
                                            <div className=''>
                                                <div className="rg-description" id={styleBdetail.blogContent}>
                                                    <figure className="rg-blogdetailimgvtwo">
                                                        <Image
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{ width: '100%', height: 'auto', objectFit: "cover", display: "inline-block" }}
                                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/Picture/${blog.PICTURE}`} alt="image description" />
                                                    </figure>
                                                    <p>{blog?.ABOUT}</p>
                                                    {blog?.toc && blog?.toc.length > 0 && <div className={styleBdetail.blogaside} style={{ width: '100%', position: 'inherit' }}>
                                                        <div className={styleBdetail.contentmenu}>
                                                            <h4>Table of Contents</h4>


                                                            {blog?.toc.map(item => {
                                                                if (item.tagName === 'h2') {
                                                                    return (

                                                                        <h2><Link href={item.id ? '#' + item.id : 'javascript:void:0'}>
                                                                            {item.text}
                                                                        </Link></h2>
                                                                    )
                                                                }
                                                                if (item.tagName === 'h3') {
                                                                    return (

                                                                        <h3><Link href={item.id ? '#' + item.id : 'javascript:void:0'}>
                                                                            {item.text}
                                                                        </Link></h3>
                                                                    )
                                                                }


                                                            })}
                                                        </div>
                                                    </div>}
                                                    {jobListOne.length > 0 && <div className="table-responsive" >
                                                        <table

                                                            className="table align-middle table-nowrap table-hover job-information-table">
                                                            <thead className="table-light">
                                                                <tr >
                                                                    <th colSpan='3' scope="col" style={{ fontSize: "18px" }}>Latest  Jobs</th>
                                                                </tr>
                                                                <tr>
                                                                    <th className='text-left'>Job Information</th>
                                                                    <th>Company Name</th>
                                                                    <th>Apply Job</th>

                                                                </tr>
                                                            </thead>

                                                            <tbody style={{ border: "2px solid #eceeef" }}>
                                                                {jobListOne.map((item, index) => {
                                                                    var a = moment([parseInt(moment(item.CREATED_ON).format('YYYY')), parseInt(moment(item.CREATED_ON).format('MM')), parseInt(moment(item.CREATED_ON).format('DD'))])
                                                                    var b = moment([parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment().format('DD'))])
                                                                    var days = b.diff(a, 'days')

                                                                    let dynamicURLOne = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                                    dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                                    if (index < 6) {
                                                                        return (
                                                                            <tr style={{ textDecoration: ' none', fontSize: "14px", color: "#e81c28", fontWeight: '600' }}>
                                                                                <td className='text-left'><h4>{item.JOB_TITLE}
                                                                                    <small style={{ color: "#676767", marginLeft: '5px', fontWeight: '600' }}>
                                                                                        ({item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} years)</small></h4>

                                                                                    {/* <p>{item.COMPANY_NAME}</p> */}

                                                                                </td>
                                                                                <td style={{ color: "rgb(103, 103, 103)" }}>{item.COMPANY_NAME}</td>
                                                                                <td>  <div className="rg-likebtnbox"><button className="rg-btn rg-active" style={{ padding: '0px 10px' }}>
                                                                                    <a style={{ color: '#ffff' }} target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>Apply Now</a>
                                                                                </button></div></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })}
                                                            </tbody>

                                                        </table>
                                                    </div>}

                                                    <div style={{ width: '100%' }}>
                                                        {Parser(blog.BLOG_DETAILS)}
                                                    </div>

                                                    {jobListTwo.length > 0 && <div className="table-responsive" >
                                                        <table

                                                            className="table align-middle table-nowrap table-hover job-information-table">
                                                            <thead className="table-light">
                                                                <tr >
                                                                    <th colSpan='3' scope="col" style={{ fontSize: "18px" }}>Latest  Jobs</th>
                                                                </tr>
                                                                <tr>
                                                                    <th className='text-left'>Job Information</th>
                                                                    <th>Company Name</th>
                                                                    <th>Apply Job</th>

                                                                </tr>
                                                            </thead>

                                                            <tbody style={{ border: "2px solid #eceeef" }}>
                                                                {jobListTwo.map((item, index) => {
                                                                    var a = moment([parseInt(moment(item.CREATED_ON).format('YYYY')), parseInt(moment(item.CREATED_ON).format('MM')), parseInt(moment(item.CREATED_ON).format('DD'))])
                                                                    var b = moment([parseInt(moment().format('YYYY')), parseInt(moment().format('MM')), parseInt(moment().format('DD'))])
                                                                    var days = b.diff(a, 'days')

                                                                    let dynamicURLOne = ToSeoUrl(item.CITY.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID
                                                                    dynamicURLOne = dynamicURLOne.replace(/ /g, '')
                                                                    if (index < 6) {
                                                                        return (
                                                                            <tr style={{ textDecoration: ' none', fontSize: "14px", color: "#e81c28", fontWeight: '600' }}>
                                                                                <td className='text-left'><h4>{item.JOB_TITLE}
                                                                                    <small style={{ color: "#676767", marginLeft: '5px', fontWeight: '600' }}>
                                                                                        ({item.WORK_EXP_MIN}-{item.WORK_EXP_MAX} years)</small></h4>

                                                                                    {/* <p>{item.COMPANY_NAME}</p> */}

                                                                                </td>
                                                                                <td style={{ color: "rgb(103, 103, 103)" }}>{item.COMPANY_NAME}</td>
                                                                                <td>  <div className="rg-likebtnbox"><button className="rg-btn rg-active" style={{ padding: '0px 10px' }}>
                                                                                    <a style={{ color: '#ffff' }} target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}>Apply Now</a>
                                                                                </button></div></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })}
                                                            </tbody>

                                                        </table>
                                                    </div>}


                                                    <div>
                                                        {blog.CONCLUSION && blog.CONCLUSION.length > 0 ? Parser(`<h3>Conclusion</h3><p>${blog.CONCLUSION}</p>`)
                                                            : ''}

                                                    </div>

                                                    {blog.FAQ && JSON.parse(blog.FAQ).length > 0 && <div>
                                                        <h3>Frequently Asked Questions</h3>
                                                        <div className="rozgar-quciksolutionbox">

                                                            {(JSON.parse(blog.FAQ)).map((item, index) => {
                                                                return (
                                                                    <Accordion defaultActiveKey="1" >
                                                                        <Accordion.Item eventKey="0">
                                                                            <Accordion.Header style={{ padding: '0px' }} >{item.Question}</Accordion.Header>
                                                                            <Accordion.Body>

                                                                                {nl2br(item.Answer)}

                                                                            </Accordion.Body>

                                                                        </Accordion.Item>

                                                                    </Accordion>
                                                                )

                                                            })}
                                                        </div>

                                                    </div>}
                                                </div>
                                            </div>
                                            <ul className="rg-socialiconssimple rg-blogsocialicons d-flex" style={{ marginTop: '12px' }}>
                                                <div>
                                                    <p className='mr-2 mt-1' style={{ fontWeight: "500", justifyContent: "center", alignItems: "center" }}>Share Blogs</p>
                                                </div>
                                                <div>
                                                    <FacebookShareButton {...sharable_link}  >
                                                        <FacebookIcon size={30} round={true} />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton {...sharable_link} >
                                                        <TwitterIcon size={30} round={true} />
                                                    </TwitterShareButton>
                                                    <LinkedinShareButton {...sharable_link}   >
                                                        <LinkedinIcon size={30} round={true} />
                                                    </LinkedinShareButton>
                                                    <WhatsappShareButton {...sharable_link} >
                                                        <WhatsappIcon size={30} round={true} />
                                                    </WhatsappShareButton>
                                                </div>


                                            </ul>
                                            <div className={styleBdetail.blogtagarea}>
                                                <div className={styleBdetail.blogtagbox}>
                                                    <span className='pt-0'>Tags:</span>
                                                    {blog.TAG.split(',').length && blog.TAG.split(',').map((item, index) => {
                                                        if (item.length) {
                                                            return (
                                                                <a href="javascript:void(0);">{item}</a>
                                                            )
                                                        }
                                                    })}

                                                </div>

                                            </div>


                                            {
                                                blogCommentList.length > 0 && blogCommentList.map((ele, index) => {
                                                    return (
                                                        <div className="rg-author">
                                                            <div className="rg-authordetails">

                                                                <div className="rg-authorcontent">
                                                                    <div className="rg-authorhead">
                                                                        <div className="rg-boxleft">
                                                                            <h3><a href="javascript:void(0);">{ele.NAME}</a></h3>
                                                                            <span>Author Since: {moment(ele.CREATED_ON).format('DD MMM, YYYY')}</span>
                                                                        </div>

                                                                    </div>

                                                                    <div className="rg-description">

                                                                        <React.Fragment>
                                                                            <p>{ele.MESSAGE}</p>
                                                                        </React.Fragment>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })

                                            }



                                            <div className={styleBdetail.BlogCreateJobAlert}>
                                                <h2>Create Your Free Job Alert</h2>
                                                <form onSubmit={onAddComment} className="rg-formtheme rg-formleavecomment">
                                                    <fieldset className='d-flex' id={styleBdetail.BlogCreateicons}>
                                                        <div className="form-group">
                                                            <input type="text"
                                                                style={{ marginBottom: '8px' }}
                                                                name={state.name.name}
                                                                value={state.name.value}
                                                                className={error && !state.name.value ? "form-control is-invalid" : "form-control"}
                                                                onChange={(e) => setState({ ...state, name: { ...state.name, value: e.target.value } })}
                                                                placeholder="Alert Name" />
                                                            {state.name.error && state.name.length <= 0 ? <span className='text-danger ml-1'> This field is required</span> : ''}


                                                            <input type="email"
                                                                style={{ marginBottom: '8px' }}
                                                                name={state.email.name}
                                                                value={state.email.value}
                                                                className={error && !state.email.value ? "form-control is-invalid" : "form-control formBorder"}
                                                                placeholder="Your Email"
                                                                onChange={(e) => setState({ ...state, email: { ...state.email, value: e.target.value } })}
                                                            />
                                                            {state.email.error && state.email.length <= 0 ? <span className='text-danger ml-1'> This field is required</span> : ''}


                                                            <input name={state.message.name}
                                                                style={{ marginBottom: '12px' }}
                                                                value={state.message.value}
                                                                className={error && !state.message.value ? "form-control is-invalid" : "form-control"}
                                                                placeholder="Enter Your Mobile No."
                                                                onChange={(e) => setState({ ...state, message: { ...state.message, value: e.target.value } })}
                                                            />
                                                            {state.message.error && state.message.length <= 0 ? <span className='text-danger ml-1'> This field is required</span> : ''}
                                                        </div>

                                                        <div className='text-right pl-3'>
                                                            <Image className='img-blog' src={jobalert} width={250} height={108} alt='' />
                                                        </div>



                                                    </fieldset>
                                                    <div className="form-group">
                                                        <button className={styleBdetail.blogsubbtn} type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                }

                                <section className="rg-haslayout rg-sectionspace">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                <div className="rg-sectionhead pb-4">
                                                    <h2 className="blogheadline">Related Posts</h2>
                                                    <a target='_blank' className="rg-btnviewall" href={constant.component.blog.url}>View All</a>
                                                </div>
                                            </div>
                                            <div className="rg-topcompaniesholder">
                                                <div className="col-12 col-sm-12 col-md-9 col-lg-12">
                                                    <div className="rg-topcompaniesslider rg-topcompanies blogheighbox">
                                                        {
                                                            relatedBlogs ?
                                                                relatedBlogs.map((item, index) => {
                                                                    if (index < 3) {
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
                                                                                        <p className='pb-5' style={{ textAlign: "left" }}>{item.ABOUT ? item.ABOUT.slice(0, 250) : Parser(item.BLOG_DETAILS.slice(0, 250))}...
                                                                                            <span style={{ color: "#55acee" }}><a href={constant.component.blogDetail.url.replace(':url', item.URL)}>Read More</a></span></p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='autharname'>
                                                                                    <div className='authimag pl-4'>
                                                                                        <a target='_blank' className="rg-bglight" href={item.AUTHOR_PROFIILE_URL ? constant.component.blogauthor.url.replace(':author-profile', `${item.AUTHOR_PROFIILE_URL}`) : 'javascript:void:0'}>
                                                                                            <Image width={36} height={36} style={{ borderRadius: "50%", objectFit: "contain" }} src={authImage} />
                                                                                        </a>
                                                                                    </div>


                                                                                    <div className='authorname-p'>

                                                                                        <a target='_blank' className="rg-bglight" href={item.AUTHOR_PROFIILE_URL ? constant.component.blogauthor.url.replace(':author-profile', `${item.AUTHOR_PROFIILE_URL}`) : 'javascript:void:0'}>
                                                                                            <p style={{ fontWeight: "500", padding: "10px 20px" }}>{item.AUTHOR}</p>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                                ) : 'no blog '
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>


                                {/* <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 float-left">
                                    <aside id="rg-sidebar" className="rg-sidebar">

                                        <div className="rg-widget rg-categories">
                                            <div className="rg-widgettitle">
                                                <h3>Categories</h3>

                                            </div>

                                            <div>
                                                <ul className='blogcategoryscroll'>
                                                    {
                                                        blogCategory.length > 0 ? blogCategory.map((ele, index) => {
                                                            return (

                                                                <li style={{ listStyleType: "none" }}>
                                                                    <a target='_blank' href={constant.component.blogCategory.url.replace(':url', ele.URL)} style={{ color: "#000", fontWeight: "500", marginBottom: "10px" }}>{ele.CATEGORY}</a>
                                                                </li>


                                                            )
                                                        }) : <h1> <Shimmer /> </h1>
                                                    }
                                                </ul>
                                            </div>

                                        </div>





                                        <div className="rg-widget rg-widgetsearch">
                                            <div className="rg-widgettitle">
                                                <h3>Get career tips to your inbox</h3>
                                            </div>
                                            <div className="rg-widgetcontent">
                                                <form className="rg-formtheme">
                                                    <fieldset>
                                                        <div className="form-group rg-inputwithicon">
                                                            <input
                                                                //name={state.keyword.name}
                                                                // onChange={(e) => setState({ ...state, keyword: { ...state.keyword, value: e.target.value } })}
                                                                className="form-control"
                                                                style={{ paddingLeft: '10px' }}
                                                                // value={state.keyword.value}
                                                                placeholder="Enter your email address" />
                                                        </div>
                                                        <button className={styleBdetail.blogsubbtn}  >Subscribe</button>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <a href="javascript:void(0);" title="">
                                                <figure>
                                                    <Image src={adds05} width={1000} height={200} alt="img description" />
                                                </figure>
                                            </a>
                                            <span>Ad</span>
                                        </div>
                                    </aside>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--************************************
    Blog Detail End
*************************************--> */}
            </main>
        </React.Fragment>
    )
}

export default index
