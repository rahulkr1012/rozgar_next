import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import constant from 'constant';
import { setOptions, ToSeoUrl } from 'utils';
import Shimmer from 'components/Loader';
import Search from '../Companies/search'
import CompanyFilter from '../Companies/companyFilter';
import noSearchFound from 'src/assets/images/no-results.png'
import Image from 'next/image';
import CompanyListLoader from 'components/common/companyListLoader/Loader'


export default class CompanyList extends Component {

 	constructor(props) {
		super(props);
		this.state = {
			CURRENT_PAGE: 1,
			LOCATION: { name: 'LOCATION', value: [], options: [] },
			filterdata: {
				LOCATION: [],
				CATEGORY: [],
				COMPANY_TYPE: []
			},
			KEYWORD: ''
		}
		 
	}

  filterData = (data) => {
		this.setState({ CURRENT_PAGE: 1, filterdata: data })
		this.props.filterData(data)
	}

	handlePageChange = (pageNumber) => {
		this.setState({
			CURRENT_PAGE: pageNumber
		})
		this.props.list(pageNumber, this.state.filterdata)
	};

	setKeyword = (input) => {
		this.setState({ KEYWORD: input })
		this.props.onSearch(this.state.CURRENT_PAGE, this.state.filterdata, input)
	}
  render() {
    const { COMPANY_LIST, COUNT } = this.props
    return (
     <React.Fragment>
<main id="rg-main" className="rg-main rg-haslayout">
					<div className="rg-sectionspace rg-haslayout pt-0">
						<div className="rg-successstorysbanner">
							<div className="container">
								<div className="row">
									<Search
										setKeyword={(input) => {
											this.setKeyword(input)
										}}
									/>
								</div>
							</div>
						</div>
						<div className='rg-successstorysbanner'>
							<div className="container">
								<div className="row">
									<div id="rg-threecolumns" className="rg-threecolumns">
										<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 float-left">
											<CompanyFilter
												getFilterData={(data) => this.filterData(data)}
											/>

										</div>
										{!COMPANY_LIST && <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9 float-left">
											<CompanyListLoader />
										</div>}
										{COMPANY_LIST && COMPANY_LIST.length > 0 && <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9 float-left">
											<div className="rg-innersectionhead">
												<div className="rg-title">
													<h1>Showing {COUNT} companies</h1>
												</div>
											</div>

											<div className="rg-employergrids">
												<div className="row">
													{COMPANY_LIST.map((item, index) => {
														const nameInitial = item.COMPANY_NAME.split(' ').map((i) => i.substring(0, 1)).join('')
														const URL = item.URL + '-' + item.EMPLOYER_ID;


														return (

															<div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
																<a target='_blank' href={constant.component.companydetails.url.replace(':url', URL)} >
																	<div className="rg-widget">
																		<div className="rg-angrycreative">
																			<figure className="rg-companyimg">
																				{item.COMPANY_LOGO === "NA" ? (
																					<h6 style={{ marginBottom: "0" }}>
																						{item.COMPANY_NAME.split(" ")
																							.length === 1
																							? item.COMPANY_NAME.slice(
																								0,
																								1
																							)
																							: item.COMPANY_NAME.split(" ")
																								.map((i) =>
																									i.substring(0, 1)
																								)
																								.join("")
																								.slice(0, 3)}
																					</h6>
																				) : (
																					<img
																						src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
																						alt={item.COMPANY_NAME}
																					/>
																				)}
																			</figure>
																		</div>
																		<div className="rg-employerdetails">
																			<h3>{item.COMPANY_NAME}</h3>
																			<h4 className="reviewbox">
																				<span><i className="fa fa-star"></i>| <small className="reviewtext">({item.REVIEW_COUNT ? item.REVIEW_COUNT : 0} reviews)</small></span>

																			</h4>
																			<p className="empo-text">{item.INDUSTRY && item.INDUSTRY.split('/').map((i, j) => {
																				if (j == 0) {
																					return i + '/'
																				}
																				else if (j == 1) {
																					return i
																				}
																			})}</p>
																			<ul className="rg-employerjobs">
																				<li><a href="javascript:void(0);">{item.COMPANY_TYPE}</a></li>
																				{/* <li><a href="javascript:void(0);">Acadecraft</a></li> */}
																				{/* <li><a href="javascript:void(0);">B2B</a></li> */}
																			</ul>
																			<a href={constant.component.joblist.url.replace(':url',`${item.URL}-jobs`)} target='_blank' className="rg-btn">View Jobs</a>
																		</div>
																	</div>
																</a>
															</div>)
													})}
												</div>
											</div>
											<nav className="rg-pagination">
												{COUNT != 0 && < nav className="rg-pagination">
													<ul>
														<Pagination
															activePage={this.state.CURRENT_PAGE}
															itemsCountPerPage={30}
															totalItemsCount={COUNT ? COUNT : 1}
															pageRangeDisplayed={5}
															onChange={this.handlePageChange}
															itemClass="page-item"
															linkClass="page-link"
														/>
													</ul>
												</nav>}
											</nav>
										</div>}
										{COMPANY_LIST && COMPANY_LIST.length == 0 &&
											<div>

												<h4 className='text-danger text-center'>
													<Image src={noSearchFound}></Image>
												</h4>
												<h4 className='text-danger text-center'>No Record Found.</h4>
											</div>

										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
     </React.Fragment>
    )
  }
}

