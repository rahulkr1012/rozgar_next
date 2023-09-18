import Head from 'next/head'
import React from 'react'
import blogRozgarImage from '../../assets/images/Blogo/rozgar.png'
import blogMtcImage from '../../assets/images/Blogo/mtc.png'
import blogVilImage from '../../assets/images/Blogo/vil.png'
import blogHrmsImage from '../../assets/images/Blogo/hrms.png'
import Image from 'next/image'
import FilteredHeader from "components/Filtered_Header";
import { getLoggedInUserData } from 'nextCookie'
    
export default function index(props) {
    const { ud } = props;
    return (
        <React.Fragment>
            <FilteredHeader ud={ud} />
            <Head>
                <title>About Us | Rozgar.com</title>
                <meta name="HandheldFriendly" content="True" />
                <meta name="description" content={"About-Us " + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
                <link rel="canonical" href={"https://rozgar.com/about-us"} />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta property="og:site_name" content="Rozgar.com" />
                <meta property="og:title" content={'About Us | Rozgar.com'} />
                <meta property="og:description" content={"About-Us" + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
                <meta property="og:url" content={"https://rozgar.com/about-us"} />
                <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                <meta property="og:image:width" content="4000" />
                <meta property="og:image:height" content="6000" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={'About Us | Rozgar.com'} />
                <meta name="twitter:description" content={"About-Us" + "- Search, find and apply to job opportunities at Rozgar.com - India's leading Job Portal. Bring your perception, imagination and healthy neglect for the impossible. For query call us at +91-8800277577 or email us at contact@rozgar.com"} />
                <meta name="twitter:url" content={"https://rozgar.com/about-us"} />
                <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Smita Nag" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content="Career Advice, Career Insights" />
                <meta name="twitter:site" content="@rozgar_india" />
            </Head>
            <div id="rg-innerbannervtwo" className="rg-innerbannervtwoabout">
            </div>
            <main id="rg-main" className="rg-main rg-haslayout">
                <div className="rg-haslayout rg-sectionspace">
                    <div className="container">
                        <div className="row">
                            <div className="rg-candidatesdetails">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 float-left">
                                    <div className="rg-jobapplycenter rg-jobapplycentervthree">
                                        <div className="rg-companycontent">
                                            <div className="rg-jobapplydetails">
                                                <div className="rg-companyname">
                                                    <h2>Welcome to Rozgar</h2>
                                                </div>
                                            </div>
                                            <div className="rg-jobapplybtnlike">
                                                <div className="rg-likebtnbox">
                                                    <h3>Our Businesses</h3>
                                                    <Image src={blogRozgarImage} alt={'Rozgar.com'}/>
                                                    <Image src={blogMtcImage} alt={'Rozgar.com'}/>
                                                    <Image src={blogVilImage}  alt={'Rozgar.com'}/>
                                                    <Image src={blogHrmsImage}  alt={'Rozgar.com'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='font-16 line-height-22px'>Rozgar.com is India’s most trusted job search platform, which is designed for job seekers to ease the process of searching and finding the best fit. We continuously update new job opportunities and provide freshers and job seekers with a better understanding of the labour market and the jobs they can feasibly get.​</p>

                                    <p className='font-16'>With a database of over 2 million jobs post and 9K active clients including renowned employers and prominent recruiters, we impart an in-depth understanding of specialized markets and help to deliver the best talent promptly. Our cutting-edge technology provides the most extensive reach and unmatched speed, enabling us to provide job seekers with the most accurate solutions for them.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({ req }) {

    let ud = getLoggedInUserData(req)
  
    return {
      props: {
        ud: ud
      }
    }
  
  
  }