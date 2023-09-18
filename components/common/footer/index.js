import React, { Component } from "react";
import constant from "constant";
import Link from "next/link";
import { getCookie } from "cookies-next";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: getCookie(constant.keys.cd),
      MasterData: {
        SETTING_ID: 1,
        PHONE_NUMBER: "+91-8800277577",
        EMAIL_ID: "contact@rozgar.com",
        FACEBOOK_URL: "https://www.facebook.com/RozgarGlobal",
        TWITTER_URL: "https://twitter.com/rozgar_india?lang=en",
        YOUTUBE_URL: "https://www.youtube.com/channel/UCfTrm4NxEoY4U8cNIMyAuxw",
        LINKEDIN_URL:
          "https://www.linkedin.com/company/rozgar/?originalSubdomain=in",
        ACTUAL_PRICE: "14000",
        DISCOUNT_PRICE: "999",
        WHATSAPP_NUMBER: "+918800277577",
        MODIFIED_BY: 1,
        CREATED_ON: "2022-08-24T18:13:22.000Z",
        CREATED_BY: 1,
        MODIFIED_ON: "2022-08-24T12:43:22.000Z",
        USA_ADDRESS: "1123 Broadway, Suite 301, New York, NY 10010",
        JOBS_AND_COUNTING: "1,156,843",
        CLIENTS: "9,593",
        CANDIDATE: "12,333,676",
        RECRUITER: "98,653",
        SINGAPORE_ADDRESS: "68 Circular Road #02-01 Singapore (049422)",
        INDIA_ADDRESS: "Head office: A-51, Sector 16, Noida, U.P. - 201301",
        DUBAI_ADDRESS:
          "Office No. 301, Malak Ibrahim Muhammad Hussain Rai Business Bay, Dubai - 346-466",
      },

      readmoreText: false,
      readlessText: false,
      hideMoreText: true,
      hidelessText: false,
    };
  }

  readmoretext = () => {
    this.setState({
      readmoreText: !this.state.readmoreText,
      hideMoreText: !this.state.hideMoreText,
      hidelessText: true,
    });
  };

  readLessText = () => {
    this.setState({
      readlessText: !this.state.readlessText,
      hidelessText: !this.state.hidelessText,
      readmoreText: !this.state.readmoreText,
      hideMoreText: !this.state.hideMoreText,
    });
  };

  render() {
    const { MasterData, detail } = this.state;
    return (
      <React.Fragment>
        <footer
          id="rg-footer"
          className="rg-footer rg-haslayout "
        // style={
        //   window.location.pathname == "/resume-form"
        //     ? {
        //         marginTop: "400px",
        //       }
        //     : {}
        // }
        >
          <div className="rg-fourcolumns rg-bglight" id="mobilehide">
            <div className="container">
              <div className="row">
                <div className="rg-footercol rg-widgetjobarea">
                  <div className="rg-fwidgettitle">
                    <h3>Explore jobs</h3>
                  </div>
                  <div className="rg-widgetcontent">
                    <ul>
                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.jobsBySkill.url}
                        >
                          Jobs by skill
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.jobsByDesignation.url}
                        >
                          Jobs by designation
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.jobsByCompany.url}
                        >
                          Jobs by company
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.jobsByCategory.url}
                        >
                          Jobs by category
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.jobsByLocation.url}
                        >
                          Jobs by location
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={{
                            pathname: constant.component.CreateJobAlert.url,
                          }}
                        >
                          Create a Free Job Alert
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rg-footercol rg-widgetjobarea">
                  <div className="rg-fwidgettitle">
                    <h3>Jobs in demand</h3>
                  </div>
                  <div className="rg-widgetcontent">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href={'/fresher-jobs'}
                        >
                          Fresher jobs
                        </a>
                      </li>

                      <li>
                        <a
                          target="_blank"
                          href={constant.component.RemoteJobs.url}
                        >
                          Remote jobs
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.WorkFromHomeJobs.url}
                        >
                          Work from home jobs
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.WalkInJobs.url}
                        >
                          Walk-in jobs
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.PartTimeJobs.url}
                        >
                          Part-time jobs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rg-footercol rg-widgetusfulllinks">
                  <div className="rg-fwidgettitle">
                    <h3>Video JDs</h3>
                  </div>
                  <div className="rg-widgetcontent">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.MostPopularVideoJdJob.url}
                        >
                          Most Popular
                        </a>
                      </li>

                      <li>
                        <a
                          target="_blank"
                          href={constant.component.HotSectorVideoJdJob.url}
                        >
                          Hot Sectors
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.MostLikedVideoJdJob.url}
                        >
                          Most Liked
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rg-footercol rg-widgetjobarea">
                  <div className="rg-fwidgettitle">
                    <h3>Freshers Jobs</h3>
                  </div>
                  <div className="rg-widgetcontent">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.latestfresherjob.url}
                        >
                          Latest fresher jobs
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://campus.rozgar.com/">
                          Students
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://campus.rozgar.com/">
                          Institution
                        </a>
                      </li>
                      <li>
                        <a href={constant.component.jobsByCompany.url}>
                          Hiring company
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://campus.rozgar.com/">
                          Internships
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rg-footercol rg-widgetjobarea">
                  <div className="rg-fwidgettitle">
                    <h3>Companies</h3>
                  </div>
                  <div className="rg-widgetcontent">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.companieslist.url}
                        >
                          Browse all companies
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={constant.component.topcompanieslist.url}
                        >
                          Top companies
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://recruit.rozgar.com/recruit/client-registration-form"
                        >
                          Register/Claim Company
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rg-footeraboutus pt-4 pb-4" id="mobilehide">
            <div className="container">
              <div className="row">
                <div className="col-md-3 text-left">
                  <Link href={constant.component.homepage.url}>
                    <img
                      className="roz-logo"
                      src={'../../images/logo.png'}
                      alt="Rozgar.com"
                      title={constant.build.version} width={130}
                      height={85}
                    />
                  </Link>
                  <h3 className="headh3">Connect with us</h3>
                  <ul className="rg-socialiconssimple">
                    <li className="rg-facebook">
                      <Link target="_blank" href={MasterData?.FACEBOOK_URL}>
                        <i className="fa fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li className="rg-twitter">
                      <Link target="_blank" href={MasterData?.TWITTER_URL}>
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li className="rg-youtube">
                      <Link target="_blank" href={MasterData?.YOUTUBE_URL}>
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </li>
                    <li className="rg-linkedin">
                      <Link target="_blank" href={MasterData?.LINKEDIN_URL}>
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link target='_blank' href={'https://www.instagram.com/rozgarofficial/'}><i className='fa fa-instagram'></i> </Link>
                    </li>

                  </ul>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-3 text-left">
                      <h3 className="rozgar-footerbottomheadh4">Quick links</h3>
                      <ul className="rozgar-footerbottom-menu">
                        {
                        // detail ? <li>
                        //   <Link href={constant.component.myRozgar.url}>
                        //     My Account
                        //   </Link>
                        // </li>
                        //   :
                          <>
                            <li>
                              <Link href={constant.component.register.url}>
                                Register
                              </Link>
                            </li>
                            <li>
                              <Link href={constant.component.signin.url}>
                                Log In
                              </Link>
                            </li>

                          </>
                        }
                        <li>
                          <Link
                            target="_blank"
                            href={constant.component.companieslist.url}
                            className="last-child">
                            Companies
                          </Link>
                        </li>
                      </ul>
                      <h3 className="rozgar-footerbottomheadh4">
                        Resource centre
                      </h3>
                      <ul className="rozgar-footerbottom-menu">
                        <li>
                          <Link href={constant.component.aboutUs.url}>
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href={constant.component.blog.url}>Blog</Link>
                        </li>
                        <li>
                          <Link
                            href={constant.component.faqs.url}
                            className="last-child"
                          >
                            FAQs
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-9 text-left">
                      <h3 className="rozgar-footerbottomheadh4">
                        Let's begin your search
                      </h3>
                      <ul className="rozgar-footerbottom-menu">
                        <li>
                          <Link href={constant.component.AllJobs.url}>
                            Explore cities
                          </Link>
                        </li>
                        <li>
                          <Link href={constant.component.homepage.url}>
                            Smart search
                          </Link>
                        </li>
                        <li>
                          <Link href={constant.component.discussionForum.url}>
                            Discussion forum
                          </Link>
                        </li>
                        <li>
                          <Link href={constant.component.JobSearchIndia.url}>
                            Job Search India
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              constant.component.FullStackDeveloperJobsInIndia
                                .url
                            }
                            className="last-child"
                          >
                            Full Stack Jobs in India
                          </Link>
                        </li>
                      </ul>
                      <h3 className="rozgar-footerbottomheadh4">
                        Employer Zone
                      </h3>
                      <ul className="rozgar-footerbottom-menu">
                        <li>
                          <Link
                            href={"https://recruit.rozgar.com/job-post"}
                            target="_blank"
                          >
                            Post a Job
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"https://recruit.rozgar.com/subscriptions"}
                            target="_blank"
                          >
                            Buy online
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_blank"
                            href={"https://recruit.rozgar.com/"}
                            className="last-child"
                          >
                            Employer Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="discalaimerbox">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span>Disclaimer:</span> <Link href="/">Rozgar.com</Link> intended
                    only to serve as a preliminary medium of contact and
                    exchange of information for its users / members / visitors
                    who have a bona fide intention to contact and/or be
                    contacted for the purposes
                    { }{" "}
                    {this.state.hideMoreText && (
                      <Link
                        href="javascript:void();"
                        onClick={() => this.readmoretext()}
                      >
                        {" "}
                        Read More
                      </Link>
                    )}
                    {this.state.readmoreText && (
                      <span>
                        {" "}
                        related to genuine existing job vacancies and for other
                        career enhancement services. The site is a public site
                        with free access and Rozgar assumes no liability for the
                        quality and genuineness of responses.{" "}
                        <Link href="/">Rozgar.com</Link> Pte. LTD cannot monitor the
                        responses that a person may receive in response to
                        information he/she has displayed on the site. The
                        individual/company would have to conduct its own
                        background checks on the bonafide nature of all
                        response(s). We keep updating the portal so any queries
                        and concerns please report a problem or check back soon.
                      </span>
                    )}
                    {this.state.hidelessText && (
                      <Link
                        href="javascript:void();"
                        onClick={() => this.readLessText()}
                      >
                        {" "}
                        Less Read
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rg-footerbottom">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <p className="rg-copyrights">
                    Copyright © 2018-{new Date().getFullYear()} Rozgar.com. All
                    Rights Reserved. | Crafted with{" "}
                    <span className="text-red">&#10084;</span> by{" "}
                    <span>
                      <Link
                        target="_blank"
                        href="https://valueinnovationlabs.com/"
                        className="powercom"
                      >
                        Value Innovation Labs
                      </Link>
                    </span>
                  </p>
                  <nav className="rg-addnav">
                    <ul>

                      <li>
                        <Link
                          target="_blank"
                          href={constant.component.reportIssue.url}
                        >
                          Report an issue
                        </Link>
                      </li>
                      <li>
                        <Link href={constant.component.privacyPolicy.url}>
                          Privacy policy
                        </Link>
                      </li>
                      <li>
                        <Link href={constant.component.termsConditions.url}>
                          Terms &amp; conditions
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}


