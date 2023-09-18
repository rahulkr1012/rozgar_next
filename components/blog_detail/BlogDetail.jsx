import React, { Component, useState } from 'react'
import Link from 'next/link';
import constant from 'constant'
import Pagination from 'react-js-pagination'
import moment from 'moment';
import noSearchFound from 'src/assets/images/no-results.png'
import authorimg from 'src/assets/images/picss.png'
import blogpic from 'src/assets/images/blogpic.jpg'
import adds05 from 'src/assets/images/adds-05.jpg'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import Router from 'next/router'
import logo from 'src/assets/images/logo.png'
import Head from 'next/head';
import styleBlog from '../../components/blog_detail/styleBlog.module.css';

export function BlogDetail(props) {

	let router = useRouter()

	const [state, setState] = useState({
		currentPage: 1,
		blogSearchKeys: ""
	})


	const getBlogLists = (page) => {
		//  if (state.keyword.trim().length != 0 || '' || state.keyword == "" ) {

		blogList({ KEYWORD: state.keyword, page: page }).then((res) => {

			let finalTag = []
			res.result.list.map((ele, index) => {
				if (ele.TAG.includes(",")) {
					let arr = ele.TAG.split(",")
					arr.map((tg) => {
						if (tg != "") {
							finalTag.push(tg)
						}
					})
				}
				else {
					finalTag.push(ele.TAG)
				}
			})
			finalTag = [...new Set(finalTag)]
			setState({ ...state, list: res.result.list, count: res.result.count, finalTag })
		}).catch((err) => {
			alert(err)
		})
		//  }
	}

	const handlePageChange = (pageNumber) => {
		const { currentPage } = state
		//  currentPage(pageNumber)

		setState({
			currentPage: pageNumber
		})

		props.blogLists(pageNumber)
	};

	const searchList = () => {
		// this.props.keyword(this.state.blogSearchKeys)
		this.props.blogLists(this.state.currentPage)
	}

	const { showShimmer, category, list, tags, recentList, blogCategory, count, currentPage } = props
	return (

		<React.Fragment>


			<section className={styleBlog.bgbloghead}>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className={styleBlog.blogareahead}>
								<h1>Latest Blogs &amp; News</h1>
								<span>Stay Updated With Our Latest News</span>
								<div className={styleBlog.blogbreadcrumbarea}>
									<ol className="rg-breadcrumb">
										<li><Link href={constant.component.homepage.url}>Home</Link></li>
										{
											router.pathname == '/blog'
												?
												<li>Blog</li>

												:
												<li>Blog</li>
										}
									</ol>
								</div>
							</div>
						</div>
						<div className={styleBlog.blognav}>
							<ul className={styleBlog.blognavarea}>

								{blogCategory && blogCategory.length > 0 && blogCategory.map((item) => {
									if (item.POPULAR == 1) {
										return (
											<li><Link target='_blank' href={'/blog/category/:url'.replace(':url', item.URL)}>{item.CATEGORY}</Link></li>
										)
									}
								})}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<main id="rg-main" className="rg-main rg-haslayout">

				<div className="rg-sectionspace rg-haslayout" id={styleBlog.noblogpage}>
					<div className="container">
						<div className="row">

							{/* {list && list.length > 0 ? < div className={styleBlog.firstblogbox}>
								<Link target='_blank' href={constant.component.blogDetail.url.replace(':url', list[0].URL)}>
									<div className={styleBlog.firstblogarea}>
										<div className={styleBlog.blogfullimg}>
											<Image width={600}
												height={190}
												src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/Picture/${list[0].BLOG_IMAGE}`} />
										</div>
										<div className={styleBlog.blogfullcontent}>
											<p className={styleBlog.postname}>{list[0].CATEGORY}</p>
											<h1><Link target='_blank' href={constant.component.blogDetail.url.replace(':url', list[0].URL)}>{list[0].BLOG_TITLE}</Link></h1>
											<p className={styleBlog.postcontent}>{list[0].BLOG_DETAILS.length > 250 ? list[0].BLOG_DETAILS.slice(0, 320) + '...' : list[0].BLOG_DETAILS}<span className='text-primary'>read more</span></p>
											<p className={styleBlog.authnamepost}><span><Image width={30} height={30} src={authorimg} /> {list[0].AUTHOR}</span> <span style={{ color: 'rgb(160 160 160)', fontSize: '13px' }}><i className="lnr lnr-calendar-full"></i> {moment(list[0].CREATED_ON).format('DD MMM, YYYY')}</span></p>
										</div>
									</div>
								</Link>
							</div> : ''} */}
							<div id="rg-twocolumns" className="rg-twocolumns">
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-right">
									<div id="rg-content" className="rg-content">



										<React.Fragment>

											<div className="rg-posts rg-postsgrid">
												<div className="row">
													{
														list && list.length > 0 ? list.map((ele, index) => {

															return (
																<div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
																	<Link target='_blank' href={constant.component.blogDetail.url.replace(':url', ele.URL)}>
																		<article className={styleBlog.blogmainbox}>
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
																		</article>
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

		</React.Fragment>
	)
}

export default BlogDetail