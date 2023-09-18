import React, { Component } from 'react'
import reward from "../../src/assets/images/rewards.png"
import Image from 'next/image'
import ModalWindow from 'components/common/ModalWindow/ModalWindow'
import { Couponlist } from '@/action/jobsByActions'
import Pagination from 'react-js-pagination'
import nl2br from 'react-nl2br'
import Loader from 'components/common/rewardsLoader/Loader'
import SideLoader from 'components/common/RecomendedJobsLoader/SideLoader'
export default class Coupon extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      showModal: false,
      page: 1,
      list: '',
      CouponCandition: '',
      count: 0,
      ShowLoader:false

    }
  }
  componentDidMount() {
    this.getrewards()

  }

  getrewards = () => {
    this.setState({ShowLoader:true})
    Couponlist(this.state.page).then((res) => {
      this.setState({ShowLoader:false})
      this.setState({ list: res.result.list, count: res.result.count })
    }).catch((err) => {
      alert(err)
    })
  }

  handlePageChange = (page) => {
    this.setState({
      page: page
    })
    this.getrewards(page)
  };
  onshowModal = () => {
    this.setState({ showModal: true })
  };

  toggleModal = () => {
    this.setState({ showModal: false })
  }
  onhideModal = () => {
    this.setState({ showModal: false })
  }
  render() {
    const { list } = this.state
    const { showModal, CouponCandition,ShowLoader } = this.state

    return (
      <React.Fragment>
        {
          showModal && <ModalWindow title='Terms and Conditions' toggleModal={() => { this.toggleModal() }} >
            <p>{nl2br(CouponCandition)}</p>
          </ModalWindow>

        }
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <div className="rg-sectionspace rg-haslayout pt-0">
            <div className="rozgar-jobbylocsearch pt-2 pb-2">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="rg-title">
                      <h3 className="text-white">Coupons for You</h3>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="numofsavejob">
                      <span className="font-20">
                        Your Rewards & Coupons
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rg-haslayout mt-4">

              <div className="container">
                <div className="row">
                  <div id="rg-threecolumns" className="rg-threecolumns">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left">
                      <div className="rg-featuredjobs rg-featuredjobsvtwo rg-featuredjobsvthree">
                        <div className="row">
                          <div className="col-md-8">
{                      ShowLoader&&    <Loader/>
}
                            <div className="row">

                              <div className="col-md-12">
                                {list && list.map((item, index) => {
                                  return (
                                    <div className="rg-rewardCoupon-item">
                                      <div className='coupon-img-bx'>
                                        <img className='coupon-img' src={item.COMPANY_IMAGE} />
                                        {/* <Image className='coupon-img' width={1000} height={200} src={item.COMPANY_IMAGE} /> */}
                                        <div className='coupon-company-img'>
                                          <img className='coupon-img-logo' src={item.COMPANY_LOGO} />
                                          {/* <Image className='coupon-img-logo' src={pic05} />  */}
                                        </div>
                                      </div>
                                      <div className='coupon-info-box'>
                                        <h4>{item.COMPANY_NAME}</h4>
                                        <h5>{item.COUPON_TITLE}</h5>
                                        {/* <p><i class="ti-view-list-alt"></i> {item.COUPON_VALIDITY_TYPE}</p> */}
                                        <div className="redeem-button-bx pt-3"><a target='_blank' href={item.OPT_IN_WEB_URL}>Collect Now</a></div>
                                        <div className='coupon-date-box'>Valid till {item.COUPON_VALIDITY_TYPE == "LIFETIME" ? "Lifetime" : item.COUPON_END_DATE}</div>
                                        <div className='terms-date-box'><a style={{ cursor: "pointer" }} onClick={() => this.onshowModal(
                                          this.setState(
                                            { CouponCandition: item.COUPON_TERMS_AND_CONDITION }
                                          )
                                        )
                                        } > Terms and Conditions</a></div>


                                      </div>
                                    </div>
                                  )
                                })}
                                < nav className="rg-pagination">
                                  <ul className='pagination-rew'>
                                    <Pagination
                                      activePage={this.state.page}
                                      itemsCountPerPage={20}
                                      totalItemsCount={this.state.count}
                                      pageRangeDisplayed={5}
                                      onChange={this.handlePageChange}
                                      itemClass="page-item"
                                      linkClass="page-link"
                                    />
                                  </ul>
                                </nav>
                              </div>

                            </div>
                          </div>

                          <div className="col-md-4">

                            <div className="savejobs-aside rewards-category-list">
                            {ShowLoader?<SideLoader/>:
                              <div>
                              <h4>Rewards Category</h4>
                              <ul>
                                <li>

                                  <a href="/recommended-jobs">
                                    <i class="ti-bookmark"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      Recommended Job
                                    </span>{" "}
                                  </a>
                                </li>
                                <li>

                                  <a href="/featured-jobs">
                                    <i class="lnr lnr-bullhorn"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      Featured Job
                                    </span>{" "}
                                  </a>
                                </li>
                                <li>

                                  <a href="/interview-questions">
                                    <i className="ti-crown"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      Interview Question
                                    </span>{" "}
                                  </a>
                                </li>
                                <li>

                                  <a href="/top-companies">
                                    <i class="lnr lnr-apartment"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      Top Companies
                                    </span>{" "}
                                  </a>
                                </li>
                                <li>

                                  <a href="/fresher-jobs">
                                    <i className="lnr lnr-graduation-hat"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      Freshers Jobs
                                    </span>{" "}
                                  </a>
                                </li>
                                <li>

                                  <a href="/browse-jobs">
                                    <i class="lnr lnr-checkmark-circle"></i>
                                    <span style={{ color: "rgb(0, 0, 0)" }}>
                                      All Jobs
                                    </span>{" "}
                                  </a>
                                </li>
                                {/* <li>
                                <a href="/international-jobs">
                                 
                                  <span style={{ color: "rgb(0, 0, 0)" }}>
                                  Wealth Management
                                  </span>{" "}
                                </a>
                              </li> */}
                                <li>

                                  <a href="/rewards">
                                    <Image src={reward} className='imgrewards' />
                                    <span className='p-2' style={{ color: "rgb(0, 0, 0)" }}>
                                      Rewards
                                    </span>{" "}
                                  </a>
                                </li>
                              </ul></div>}
                            </div>

                          </div>
                        </div>
                      </div>
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
}
