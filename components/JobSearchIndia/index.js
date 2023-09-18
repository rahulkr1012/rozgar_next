import React, { Component } from 'react'
import constant from 'constant'
import Link from 'next/link'
import announce01 from 'src/assets/images/announce-img01.png'
import cv01 from 'src/assets/images/cv-pic01.png'
import postjobpic from 'src/assets/images/post-a-job.jpg'
import careerExplorerPic from 'src/assets/images/career-explorer.jpg'
import swiggyjobpic from 'src/assets/images/swiggyjobs.jpg'
import add05 from 'src/assets/images/adds-05.jpg'
import Image from 'next/image'


export default class JobsearchIndia extends Component {

  state = {
    detail: this.props
  }

  componentDidMount() {
    window.scroll(0, 0);
    // this.props.getAllJobSearchIndia()
  }

  render() {
    const { List } = this.props
    return (
      <React.Fragment>
        <main id="rg-main" className="rg-main rg-haslayout pt-0">
          <div className="rg-sectionspace rg-haslayout pt-0">
            <div className="rozgar-jobbylocsearch">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">

                    <h4 style={{ fontSize: '35px', color: 'white', textAlign: 'center', width: '100%' }}>Job Search India</h4>

                  </div>
                </div>
              </div>
            </div>

            <div className='rozgar-profile-main-content'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-9' >
                    <ul>{List?.map((item, index) => {
                      return (<li style={{ width: '33%', float: 'left' }}><Link style={{ color: '#333333' }} href={constant.component.jobsearchIndiaDetail.url.replace(':KEYWORD_URL', item.KEYWORD_URL)}>{item.KEYWORD_NAME}</Link></li>)
                    })}</ul>










                  </div>
                  <div className='col-md-3'>
                    <div className='rightform1'>


                      <div className='roz-create-cv'>
                        <div className='urgent-hiring-area'>
                          <div className='hiring-img'>
                            <Link href='/fresher-jobs'>
                              <Image src={announce01} />
                            </Link>
                          </div>
                        </div>
                        <Link target='_blank' href='/resume-making'>
                          <div className='imgfree'>
                            <Image src={cv01} />
                          </div>
                          <div className='create-cv-bg'>
                            <div className='create-text'>
                              <div className='free-text'>Free</div>
                              <h4>Create CV</h4>
                            </div>
                            <div className='btn-cv'>
                              <i className='fa fa-angle-double-right'></i>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className='create-free-job-alert new-create-free'>
                        <div className='create-free-job-box'>
                          <h3>Create a Free Job Alert</h3>
                          <p>Get an email on jobs matching your criteria</p>
                          <span className='no-reg-r'>No registration required</span>
                        </div>
                        <div className='create-job-alert-btn'><Link href={constant.component.CreateJobAlert.url}>CREATE JOB ALERT</Link></div>
                      </div>
                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                        <Link target='_blank' href='https://recruit.rozgar.com/job-post' title=''>
                          <figure>
                            <Image src={postjobpic} alt='img description' style={{ padding: "0px" }} />
                          </figure>
                        </Link>

                      </div>
                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx'>
                        <Link target='_blank' href={constant.component.StudentsExplorer.url} title=''>
                          <figure>
                            <Image src={careerExplorerPic} alt='img description' style={{ padding: "0px" }} />
                          </figure>
                        </Link>

                      </div>

                      <div className='rg-adds rg-jobsearchadd swiggyjobs-bx mb'>
                        <Link href='javascript:void(0);' title=''>
                          <figure>
                            <Image src={swiggyjobpic} alt='img description' />
                          </figure>
                        </Link>
                        <span>Ad</span>
                      </div>

                      <div className='rg-adds rg-jobsearchadd'>
                        <Link href='javascript:void(0);' title=''>
                          <figure>
                            <Image src={add05} alt='img description' />
                          </figure>
                        </Link>
                        <span>Ad</span>
                      </div>
                    </div>
                    <div className='rightform'>
                      <h3>Popular Searches</h3>
                      <ul className='popuraljobIncity'>
                        <li><Link href='https://rozgar.com/search-job?keyword=PHP%20Developer&location=Noida'>Latest PHP Jobs in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=noida">Full Stack Developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=React%20JS&location=noida">React Js Developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=JavaScript&location=noida">JavaScript Developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=UI%20Developer&location=noida">UI developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=mern%20developer&location=noida">Mern Developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=cloud%20computing&location=noida">Cloud Computing in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=IT&location=Noida">IT Jobs in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Python&location=noida">Python Developer in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=React%20JS&location=delhi">React Js Developer in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=JavaScript&location=delhi">JavaScript Developer in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=UI%20Developer&location=delhi">UI developer in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=cloud%20computing&location=delhi">Cloud Computing in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=delhi">Latest PHP Jobs in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=delhi">Full Stack Developer in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=IT&location=delhi">IT Jobs in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Python&location=delhi">Python Developer in Delhi</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=JavaScript&location=pune">JavaScript Developer in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=UI%20Developer&location=pune">UI developer in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=cloud%20computing&location=pune">Cloud Computing in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=pune">Latest PHP Jobs in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=pune">Full Stack Developer in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=pune">IT Jobs in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Python&location=pune">Python Developer in Pune</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=JavaScript&location=gurugram">JavaScript Developer in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=UI%20Developer&location=gurugram">UI developer in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=cloud%20computing&location=gurugram">Cloud Computing in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=PHP%20Developer&location=gurugram">Latest PHP Jobs in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=full%20stack%20developer&location=gurugram">Full Stack Developer in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=IT&location=gurugram">IT Jobs in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Python&location=gurugram">Python Developer in Gurugram</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=aws&location=noida">AWS in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Machine%20Learning&location=noida">Machine Learning in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=blockchain&location=noida">BlockChain in Noida</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=Java">Java Developer</Link></li>
                        <li><Link href="https://rozgar.com/search-job?keyword=NLP">Natural Language Processing</Link></li>
                      </ul>
                    </div>
                    {/* Sponsered Add */}
                    {/* <div class="rg-adds rg-jobsearchadd mb-20 mt-20">
                                            <Link href="javascript:void(0);" title="">
                                                <figure>
                                                    <Image src="./assets/images/adds-05.jpg" alt="img description" />
                                                </figure>
                                            </Link>
                                            <span>Ad</span>
                                        </div> */}
                    {/* Sponsered Add */}
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
