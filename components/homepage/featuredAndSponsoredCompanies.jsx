import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import constant from "constant";

const MainSlider = (props) => {
    const { FEATURED_COMPANIES } = props
    useEffect(() => {
    //     const element = document.getElementsByClassName('swiper-wrapper')
    //     // element[0].classList.add("featured")
    //     element[1].classList.add("premium")
    //     element[2].classList.add("latestjob")

        let doc =  document.querySelectorAll('.swiper-wrapper')
        let all_arr = Array.from(doc)
        all_arr[1]?.classList.remove('swiper-wrapper')
        all_arr[1]?.classList.add("feature-company" ,'swiper-wrapper' )

    }, [])
    return (
        <section className="rg-haslayout rg-sectionspace rg-bglight">
            <div className="container">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                       <div className="rg-sectionhead">
                         <h2>Featured Sponsored Companies</h2>
                            <a
                                data-interception="off"
                                className="rg-btnviewall"
                                target="_blank"
                                href={constant.component.jobsByCompany.url}
                            >
                                View All
                            </a>
                        </div>
                    </div>
                </div>
                <Swiper
                    breakpoints={{
                        480: {
                            width: 480,
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        600: {
                            width: 600,
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            width: 1024,
                            slidesPerView:3.6,
                            spaceBetween:20,
                        },
                    }}

                    modules={[Navigation, Pagination]}
                    centeredSlides={false}
                    freeMode={true}
                    loop={true}
                    mousewheel={true}
                    grabCursor={true}
                    lazyLoading={true}
                    keyboard= {{ enabled: false}}
                    autoplay={{ delay: 3000, disableOnInteraction: false}}
                    navigation
                   

                >
                    {FEATURED_COMPANIES !== null &&
                        FEATURED_COMPANIES.map((item, index) => {
                            const URL = item.URL
                                ? item.URL + "-" + item.EMPLOYER_ID
                                : "rozgar" + "-" + item.EMPLOYER_ID;
                            return (
                                <SwiperSlide>
                                    <div className="col-md-12 p-0">
                                        <Link
                                            href={constant.component.companydetails.url.replace(
                                                ":url",
                                                URL
                                            )}
                                            target="_blank"
                                            passHref
                                        >
                                            <div className="rozgar-featured-spon-companies-area job-slice">
                                                <div className="d-flex align-items-center">
                                                    <figure className="featured-spon-companies-logo">
                                                        {item.COMPANY_LOGO === "NA" ? (
                                                            <h3>
                                                                {item.COMPANY_NAME.split(" ")
                                                                    .map((i) => i.substring(0, 1))
                                                                    .join("")}
                                                            </h3>
                                                        ) : (
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                                                alt={item.COMPANY_NAME}
                                                                width={170}
                                                                height={95}
                                                            />
                                                        )}
                                                    </figure>
                                                    <div className="featured-spon-companies-head">
                                                        <h3>
                                                            {" "}
                                                            <Link
                                                                href={constant.component.companydetails.url.replace(
                                                                    ":url",
                                                                    URL
                                                                )}
                                                                target="_blank"
                                                            >
                                                                {item.COMPANY_NAME.length > 26
                                                                    ? item.COMPANY_NAME.slice(0, 18) +
                                                                    "...."
                                                                    : item.COMPANY_NAME}
                                                            </Link>
                                                        </h3>
                                                        <div className="d-flex featured-spon-companies-review">
                                                            <span className="star-r">
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                            
                                                            <span className="main-2 reviews">
                                                                | &nbsp; reviews
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="featured-spon-companies-job-area">
                                                    <div className="featured-spon-companies-job-para w-wrap">
                                                        <span
                                                            title={
                                                                item.ABOUT_COMPANY
                                                                    ? item.ABOUT_COMPANY.replace(
                                                                        "<p>",
                                                                        ""
                                                                    )
                                                                    : ""
                                                            }
                                                        >
                                                            {item.ABOUT_COMPANY == null
                                                                ? "NA..."
                                                                : item.ABOUT_COMPANY}
                                                        </span>
                                                    </div>
                                                    <div className="featured-spon-companies-job-skills">
                                                        {item.INDUSTRY.split("/").map(
                                                            (item, index) => {
                                                                if (index < 2) {
                                                                    return (
                                                                        <a>
                                                                            {item.length > 18
                                                                                ? `${item.slice(0, 16)}...`
                                                                                : item}
                                                                        </a>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="featured-spon-companies-allview">
                                                    <a
                                                        data-interception="off"
                                                        target="_blank"
                                                        href={constant.component.joblist.url.replace(
                                                            ":url",
                                                           `${item.URL}-jobs`
                                                        )}
                                                    >
                                                        View Jobs
                                                    </a>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
               

                </Swiper>
            </div>
        </section>

    );
};

export default MainSlider;


// import constant from 'constant';
// import React from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from 'next/link';
// import { randomIntFromInterval } from "@/utils";
// import Image from 'next/image';


// const featuredAndSponsoredCompanies = (props) => {

//     const { FEATURED_COMPANIES } = props
//     const featuredsettings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         autoplay: false,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: false,
//                     arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 2,
//                     initialSlide: 2,
//                     dots: false,
//                     arrows: false,
//                 },
//             },

//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     dots: false,
//                     arrows: false,
//                 },
//             },
//         ],
//     };
//     return (

//         <section
//             className="rg-haslayout rg-sectionspace rg-bglight"
//             id="section6"
//         >
//             <div className="container" id="container6">
//                 <div className="row" id="row6">
//                     <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                         <div className="rg-sectionhead">
//                             <h2>Featured Sponsored Companies</h2>
//                             <a
//                                 data-interception="off"
//                                 className="rg-btnviewall"
//                                 target="_blank"
//                                 href={constant.component.jobsByCompany.url}
//                             >
//                                 View All
//                             </a>
//                         </div>
//                     </div>
//                     <div className="rg-featuredjobs p-1 m-0">

//                         <div className="row">
//                             <div className="rg-feature-full-width">
//                                 <Slider {...featuredsettings}>
//                                     {FEATURED_COMPANIES !== null &&
//                                         FEATURED_COMPANIES.map((item, index) => {
//                                             const URL = item.URL
//                                                 ? item.URL + "-" + item.EMPLOYER_ID
//                                                 : "rozgar" + "-" + item.EMPLOYER_ID;
//                                             return (
//                                                 <React.Fragment>
//                                                     <div className="col-md-12">
//                                                         <Link
//                                                             href={constant.component.companydetails.url.replace(
//                                                                 ":url",
//                                                                 URL
//                                                             )}
//                                                             target="_blank"
//                                                             passHref
//                                                         >
//                                                             <div className="rozgar-featured-spon-companies-area job-slice">
//                                                                 <div className="d-flex align-items-center">
//                                                                     <figure className="featured-spon-companies-logo">
//                                                                         {item.COMPANY_LOGO === "NA" ? (
//                                                                             <h3>
//                                                                                 {item.COMPANY_NAME.split(" ")
//                                                                                     .map((i) => i.substring(0, 1))
//                                                                                     .join("")}
//                                                                             </h3>
//                                                                         ) : (
//                                                                             <Image
//                                                                                 src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
//                                                                                 alt={item.COMPANY_NAME}
//                                                                                 width={170}
//                                                                                 height={95}
//                                                                             />
//                                                                         )}
//                                                                     </figure>
//                                                                     <div className="featured-spon-companies-head">
//                                                                         <h3>
//                                                                             {" "}
//                                                                             <Link
//                                                                                 href={constant.component.companydetails.url.replace(
//                                                                                     ":url",
//                                                                                     URL
//                                                                                 )}
//                                                                                 target="_blank"
//                                                                             >
//                                                                                 {item.COMPANY_NAME.length > 26
//                                                                                     ? item.COMPANY_NAME.slice(0, 18) +
//                                                                                     "...."
//                                                                                     : item.COMPANY_NAME}
//                                                                             </Link>
//                                                                         </h3>
//                                                                         <div className="d-flex featured-spon-companies-review">
//                                                                             <span className="star-r">
//                                                                                 <i className="fa fa-star"></i>
//                                                                             </span>
//                                                                             <span className="main-2 rating">
//                                                                                 {randomIntFromInterval(1, 5)}
//                                                                             </span>
//                                                                             <span className="main-2 reviews">
//                                                                                 | &nbsp; reviews
//                                                                             </span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="featured-spon-companies-job-area">
//                                                                     <div className="featured-spon-companies-job-para w-wrap">
//                                                                         <span
//                                                                             title={
//                                                                                 item.ABOUT_COMPANY
//                                                                                     ? item.ABOUT_COMPANY.replace(
//                                                                                         "<p>",
//                                                                                         ""
//                                                                                     )
//                                                                                     : ""
//                                                                             }
//                                                                         >
//                                                                             {item.ABOUT_COMPANY == null
//                                                                                 ? "NA..."
//                                                                                 : item.ABOUT_COMPANY}
//                                                                         </span>
//                                                                     </div>
//                                                                     <div className="featured-spon-companies-job-skills">
//                                                                         {item.INDUSTRY.split("/").map(
//                                                                             (item, index) => {
//                                                                                 if (index < 2) {
//                                                                                     return (
//                                                                                         <a>
//                                                                                             {item.length > 20
//                                                                                                 ? `${item.slice(0, 18)}...`
//                                                                                                 : item}
//                                                                                         </a>
//                                                                                     );
//                                                                                 }
//                                                                             }
//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="featured-spon-companies-allview">
//                                                                     <a
//                                                                         data-interception="off"
//                                                                         target="_blank"
//                                                                         href={constant.component.joblist.url.replace(
//                                                                             ":url",
//                                                                             item.URL
//                                                                         )}
//                                                                     >
//                                                                         View Jobs
//                                                                     </a>
//                                                                 </div>
//                                                             </div>
//                                                         </Link>
//                                                     </div>
//                                                 </React.Fragment>
//                                             );
//                                         })}
//                                 </Slider>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default featuredAndSponsoredCompanies