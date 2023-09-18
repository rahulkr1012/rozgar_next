import React, { Component, useEffect, useState } from 'react'
import Link from 'next/link';
import constant from 'constant'
import Pagination from 'react-js-pagination'
import moment from 'moment';
import noSearchFound from 'src/assets/images/no-results.png'
import authorimg from 'src/assets/images/picss.png'
import author from 'src/assets/images/author.png'
import Image from 'next/image';
import styleBdetail from "../../components/BlogDetails/styleBdetail.module.css";
import styleBlog from '../../components/blog_detail/styleBlog.module.css';
import { capFirstLetterInSentence } from 'utils';
import Modal from "react-modal";
import RatingReview from 'components/Rating-Review/index';
import { getCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import { getAuthorReview } from '@/action/CandidateAction';
import { FaStar } from 'react-icons/fa';
export function BlogDetail(props) {
    const [state, setState] = useState({
        currentPage: 1,
        blogSearchKeys: "",
    })

    const [reviewData, setreviewData] = useState()
    useEffect(() => {
        getReviewDetails()
    }, [])


    const getReviewDetails = () => {
        const { AUTHOR_ID } = authorDetail
        getAuthorReview(AUTHOR_ID).then((res) => {
            if (res.status) {
                setreviewData(res.result.list)
                // this.setState({ showModalReview: true, employmentDetails: data, type: type })
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    const handlePageChange = (pageNumber) => {
        const { currentPage } = state
        setState({
            currentPage: pageNumber
        })

        props.blogList(pageNumber)
    };
    const { showShimmer, blogList, count, authorDetail } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const detail = getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {}

    const openModal = () => {
        debugger
        if (detail.CANDIDATE_ID) {
            setIsModalOpen(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please login first',
            })
        }

    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (

        <React.Fragment>


            <section className={styleBdetail.bgbloghead} style={{ padding: '20px 0px' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-2 text-left' style={{ marginTop: '25px' }}>
                            <Image
                                className='profileblog_author'
                                height={200}
                                width={200}
                                src={authorDetail.PROFILE_IMAGE ? `${process.env.NEXT_PUBLIC_BASE_URL}/author-profile-image/${authorDetail.PROFILE_IMAGE}` : author} alt={authorDetail.PROFILE_IMAGE}
                            />


                            <div style={{ fontSize: '20px', maxWidth: '750px' }}>
                                <span style={{display:"flex",alignItems: "center"}}> <span style={{ color: "white",marginBottom: "15px", marginRight: "5px" }}>{authorDetail.RATING}</span>
                                    {[...Array(5)].map((item, i) => {
                                        const ratingValue = i + 1
                                        return (
                                            <>
                                                <label key={i} style={{ display: "inline-block", marginRight:"1px" }}>
                                                    <FaStar
                                                        style={{ transition: 'color 200ms',  width: '25px' }}
                                                        id='star'
                                                        className='star'
                                                        size={30}
                                                        color={ratingValue <= (authorDetail.RATING) ? "#ffc107" : "#e4e5e9"}
                                                    />
                                                </label>
                                            </>
                                        )
                                    })}
                                    
                                    <span  class="fa fa-pencil-square-o" onClick={openModal} style={{ cursor: 'pointer', color: 'white', marginLeft: "6px", marginBottom: "11px"}} aria-hidden="true"></span>

                                </span>
                            </div>
                        </div>
                        <div className='col-md-10 text-left' style={{ marginTop: '-4px' }}>

                            {
                                authorDetail != undefined ?
                                    <div style={{ textLeft: 'left' }}>
                                        <h1 className='details-hd text-white pt-4' style={{ fontSize: '30px', margin: '-2px auto' }}>{capFirstLetterInSentence(authorDetail.AUTHOR_NAME)}</h1>

                                    </div>
                                    : ''

                            }
                            <p style={{ margin: '10px 0px 20px', color: '#fff', fontSize: '18px', lineHeight: '25px' }}>{authorDetail.ABOUT}</p>


                        </div>
                        <div className='col-md-6 '>

                            <div className={styleBdetail.blogareahead} style={{ padding: '0px 0px' }}>
                                <div className={styleBdetail.blogbreadcrumbarea}>
                                    <ol className="rg-breadcrumb" style={{ textAlign: 'left' }}>
                                        <li><Link href={constant.component.homepage.url}>Home</Link></li>
                                        <li><Link href={constant.component.blog.url}>Blog</Link></li>
                                        <li><Link href="javascript:void(0);">{authorDetail.AUTHOR_NAME}</Link></li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="">
                                <ul className="rg-socialiconssimple" style={{ float: "right", width: 'auto', marginTop: '30px' }}>
                                    <li>
                                        <a target='_blank' href={`https://${authorDetail.INSTAGRAM_LINK}`}><i className='fa fa-instagram'></i> </a>
                                    </li>
                                    <li className="rg-twitter">
                                        <a target="_blank" href={`https://${authorDetail.TWITTER_LINK}`}>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>

                                    <li className="rg-linkedin">
                                        <a target="_blank" href={`https://${authorDetail.LINKEDIN_LINK}`}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <main id="rg-main" className="rg-main rg-haslayout">

                <div className="rg-sectionspace rg-haslayout" id={styleBlog.noblogpage}>
                    <div className="container">
                        <div className="row">

                            <div id="rg-twocolumns" className="rg-twocolumns">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-right">
                                    <div id="rg-content" className="rg-content">



                                        <React.Fragment>

                                            <div className="rg-posts rg-postsgrid">
                                                <div className="row">
                                                    {
                                                        blogList && blogList.length > 0 ? blogList.map((ele, index) => {

                                                            return (
                                                                <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                                                    <Link target='_blank' href={constant.component.blogDetail.url.replace(':url', ele.URL)}>
                                                                        <div className={styleBlog.blogmainbox}>
                                                                            <figure className={styleBlog.blogimg}>
                                                                                <Image
                                                                                    width={270}
                                                                                    height={190}
                                                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/Picture/${ele.BLOG_IMAGE}`} alt="" />
                                                                            </figure>
                                                                            <div className={styleBlog.blogcontentbox}>
                                                                                <div className={styleBlog.contentarea}>
                                                                                    <div className={styleBlog.blogh1}>
                                                                                        <h1>{ele.BLOG_TITLE}</h1>
                                                                                    </div>
                                                                                    <div className={styleBlog.blogdescription}>
                                                                                        <p>{ele.BLOG_DETAILS.length > 150 ? ele.BLOG_DETAILS.slice(0, 180) + '...' : ele.BLOG_DETAILS}<span className='text-primary'>read more</span></p>
                                                                                    </div>
                                                                                </div>
                                                                                <ul className={styleBlog.postarticleauthar}>
                                                                                    <li>
                                                                                        <span className={styleBlog.autharname}>
                                                                                            {<Link href={ele.AUTHOR_PROFIILE_URL ? constant.component.blogauthor.url.replace(':author-profile', `${ele.AUTHOR_PROFIILE_URL}`) : 'javascript:void:0'}>
                                                                                                <Image style={{ borderRadius: '50%' }} width={30} height={30} src={ele.AUTHOR_PIC ? `${process.env.NEXT_PUBLIC_BASE_URL}/author-profile-image/${ele.AUTHOR_PIC}` : authorimg} alt={ele.AUTHOR} /> {ele.AUTHOR}

                                                                                            </Link>}</span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span><i className="lnr lnr-calendar-full"></i> {moment(ele.CREATED_ON).format('DD MMM, YYYY')}</span>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )

                                                        }) :
                                                            !showShimmer &&
                                                            <div className="rg-featurejob text-danger pt-20" style={{ textAlign: 'center' }}>
                                                                <Image src={noSearchFound}
                                                                    title="job alert image title"
                                                                    width={200}
                                                                    height={200}
                                                                    alt="job alert image title"
                                                                />
                                                                <h4>No Blog Search Found.</h4>
                                                                <h6>Did you enter wrong spelling of any word?</h6>
                                                                <p>Only Blog names and title are accepted in Blog Search</p>
                                                            </div>
                                                    }
                                                </div>
                                            </div>

                                        </React.Fragment>


                                        <nav className="rg-pagination">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <ul className="pagination pagination-rounded justify-content-center mt-4">

                                                        <Pagination
                                                            activePage={state.currentPage}
                                                            itemsCountPerPage={6}
                                                            totalItemsCount={props.count}
                                                            pageRangeDisplayed={5}
                                                            onChange={handlePageChange}
                                                            itemClass="page-item"
                                                            linkClass="page-link"
                                                        />


                                                    </ul>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Modal
                isOpen={isModalOpen}
                toggleModal={closeModal}
                onRequestClose={closeModal}

                contentLabel="Review Modal"
                className="modal-content modal-width"
            // style={{width:"40%", marginLeft:"425px", marginTop:"100px", maxWidth:"400px"}}

            >
                <RatingReview
                    onCancel={closeModal}
                    authorDetail={authorDetail}
                    reviewData={reviewData}
                />
            </Modal>
        </React.Fragment>
    )
}

export default BlogDetail