import React, { Component } from 'react'
import Link from 'next/link'
import constant from 'constant'
import Pagination from 'react-js-pagination'
import AnnounceImg01 from 'src/assets/images/announce-img01.png'
import CVpic01 from 'src/assets/images/cv-pic01.png'
import PostAJob from 'src/assets/images/post-a-job.jpg'
import CareerExplorer from 'src/assets/images/career-explorer.jpg'
import SwiggyJobs from 'src/assets/images/swiggyjobs.jpg'
import adds05 from 'src/assets/images/adds-05.jpg'
import Image from 'next/image'

export default class JobsinIndia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detail: this.props,
      currentPage: 1

    }
  }
  componentDidMount() {
    window.scroll(0, 0);
    // this.props.getAllJobSearchIndia()
  }

  handlePageChange = (pageNumber) => {
    // this.state.currentPage = (pageNumber);
    this.setState({
      currentPage: pageNumber
    })
    this.props.getAllJobInIndia(pageNumber)
  };


  render() {
    const { List } = this.props
    return (
      <React.Fragment>
        <main id='rg-main' className='rg-main rg-haslayout pt-0'>
          <div className='rg-sectionspace rg-haslayout pt-0'>
            <div className='rozgar-jobbylocsearch'>
              <div className='container'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-10 col-lg-10 offset-1'>
                    <h4 style={{ fontSize: "24px", color: "white", textAlign: "center", width: "80%", marginLeft: "auto", marginRight: "auto" }}>Full Stack Developer Jobs In India - Search & Apply Premimum Full Stack Developer Jobs at Rozgar </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='rozgar-profile-main-content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-9'>

                    <ul className='jobs-name-section'>

                      {List?.map((item, index) => {
                        return (<li style={{ width: '33%', float: 'left' }}><Link style={{ color: '#333333' }} href={constant.component.FullStackJobs.url.replace(':KEYWORD_URL', item.KEYWORD_URL)}>{item.KEYWORD_NAME}</Link></li>)
                      })}
                    </ul>
                  </div>
                  <div className='col-md-3'>
                    <div className='rightform1'>


                      <div className='roz-create-cv'>
                        <div className='urgent-hiring-area'>
                          <div className='hiring-img'>
                            <a href='/fresher-jobs'>
                              <Image src={AnnounceImg01} />
                            </a>
                          </div>
                        </div>
                        <a target='_blank' href='/resume-making'>
                         
                          <div className='create-cv-bg'>
                          <div className='imgfree'>
                            <Image src={CVpic01} />
                          </div>
                            <div className='create-text'>
                              <div className='free-text'>Free</div>
                              <h4>Create CV</h4>
                            </div>
                            <div className='btn-cv'>
                              <i className='fa fa-angle-double-right'></i>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div className='create-free-job-alert new-create-free'>
                        <div className='create-free-job-box'>
                          <h3>Create a Free Job Alert</h3>
                          <p>Get an email on jobs matching your criteria</p>
                          <span className='no-reg-r'>No registration required</span>
                        </div>
                        <div className='create-job-alert-btn'><a href={constant.component.CreateJobAlert.url}>CREATE JOB ALERT</a></div>
                      </div>
                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                        <a target='_blank' href='https://recruit.rozgar.com/job-post' title=''>
                          <figure>
                            <Image src={PostAJob} alt='img description' style={{ padding: "0px" }} />
                          </figure>
                        </a>

                      </div>
                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                        <a target='_blank' href={constant.component.StudentsExplorer.url} title=''>
                          <figure>
                            <Image src={CareerExplorer} alt='img description' style={{ padding: "0px" }} />
                          </figure>
                        </a>

                      </div>

                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx mb'>
                        <a href='javascript:void(0);' title=''>
                          <figure>
                            <Image src={SwiggyJobs} alt='img description' />
                          </figure>
                        </a>
                        <span>Ad</span>
                      </div>

                      <div className='rg-adds rg-jobsearchadd'>
                        <a href='javascript:void(0);' title=''>
                          <figure>
                            <Image src={adds05} alt='img description' />
                          </figure>
                        </a>
                        <span>Ad</span>
                      </div>
                    </div>
                    <div className='rightform rightform-right'>
                      <h3>Popular Searches</h3>
                      <ul className='popuraljobIncity'>
                        <li><a href='https://rozgar.com/search-job?keyword=PHP%20Developer&amp;location=Noida'>Latest PHP Jobs in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=full%20stack%20developer&amp;location=noida'>Full Stack Developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=React%20JS&amp;location=noida'>React Js Developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=JavaScript&amp;location=noida'>JavaScript Developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=UI%20Developer&amp;location=noida'>UI developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=mern%20developer&amp;location=noida'>Mern Developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=cloud%20computing&amp;location=noida'>Cloud Computing in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=IT&amp;location=Noida'>IT Jobs in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Python&amp;location=noida'>Python Developer in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=React%20JS&amp;location=delhi'>React Js Developer in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=JavaScript&amp;location=delhi'>JavaScript Developer in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=UI%20Developer&amp;location=delhi'>UI developer in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=cloud%20computing&amp;location=delhi'>Cloud Computing in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=PHP%20Developer&amp;location=delhi'>Latest PHP Jobs in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=full%20stack%20developer&amp;location=delhi'>Full Stack Developer in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=IT&amp;location=delhi'>IT Jobs in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Python&amp;location=delhi'>Python Developer in Delhi</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=JavaScript&amp;location=pune'>JavaScript Developer in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=UI%20Developer&amp;location=pune'>UI developer in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=cloud%20computing&amp;location=pune'>Cloud Computing in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=PHP%20Developer&amp;location=pune'>Latest PHP Jobs in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=full%20stack%20developer&amp;location=pune'>Full Stack Developer in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=full%20stack%20developer&amp;location=pune'>IT Jobs in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Python&amp;location=pune'>Python Developer in Pune</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=JavaScript&amp;location=gurugram'>JavaScript Developer in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=UI%20Developer&amp;location=gurugram'>UI developer in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=cloud%20computing&amp;location=gurugram'>Cloud Computing in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=PHP%20Developer&amp;location=gurugram'>Latest PHP Jobs in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=full%20stack%20developer&amp;location=gurugram'>Full Stack Developer in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=IT&amp;location=gurugram'>IT Jobs in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Python&amp;location=gurugram'>Python Developer in Gurugram</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=aws&amp;location=noida'>AWS in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Machine%20Learning&amp;location=noida'>Machine Learning in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=blockchain&amp;location=noida'>BlockChain in Noida</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=Java'>Java Developer</a></li>
                        <li><a href='https://rozgar.com/search-job?keyword=NLP'>Natural Language Processing</a></li>
                      </ul>
                    </div>
                  </div>
                  <nav className="rg-pagination">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="pagination pagination-rounded justify-content-center mt-4">
                          <Pagination
                            activePage={this.state.currentPage}
                            totalItemsCount={this.props.count}
                            itemsCountPerPage={200}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange}
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
        </main>
      </React.Fragment>
    )
  }
}
