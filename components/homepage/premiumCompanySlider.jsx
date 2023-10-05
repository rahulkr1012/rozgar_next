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
import { ToSeoUrl, randomIntFromInterval } from "@/utils";

const MainSlider = (props) => {
    const { PREMIUM_COMPANIES } = props
    useEffect(() => {

        //const element = document.getElementsByClassName('swiper-wrapper')
        //element[0].classList.add("my-class")

        // let el2 = document.getElementsByClassName('swiper-wrapper')
        
        // ele3  =Array.from(el2)[1].classList.remove('swiper-wrapper')
        // Array.from(el2)[1].classList.add("custom-class" ,'swiper-wrapper' )



        let doc =  document.querySelectorAll('.swiper-wrapper')
        let all_arr = Array.from(doc)
        all_arr[1]?.classList.remove('swiper-wrapper')
        all_arr[1]?.classList.add("custom-class" ,'swiper-wrapper' )
        
    }, [])

    return (
        <section className="rg-haslayout rg-sectionspace rg-bglight">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="rg-sectionhead">
                            <h2>Premium Companies Hirings</h2>
                            <Link
                                className="rg-btnviewall"
                                target="_blank"
                                href={constant.component.jobsByCompany.url}
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
                <Swiper
                    // install Swiper modules
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
                            slidesPerView: 3.6,
                            spaceBetween: 20,
                        },
                    }}

                    modules={[Navigation, Pagination]}
                    centeredSlides={false}
                    freeMode={true}
                    loop={true}
                    mousewheel={true}
                    grabCursor={false}
                    lazyLoading={true}
                    keyboard={{ enabled: false }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}

                >


                    {PREMIUM_COMPANIES !== null &&
                        PREMIUM_COMPANIES.map((item, index) => {
                            const URL = item.URL
                                ? item.URL + "-" + item.EMPLOYER_ID
                                : "rozgar" + "-" + item.EMPLOYER_ID;

                            return (
                                <SwiperSlide>
                                    <div className="col-md-12 mob-pad-0">
                                        <Link
                                            href={constant.component.companydetails.url.replace(
                                                ":url",
                                                URL
                                            )}
                                            target="_blank"
                                        >
                                            <div className="rozgar-premium-companies-hirings-area job-slice mb-15">
                                                <div className="d-flex align-items-center">
                                                    <figure className="premium-companies-hirings-logo">
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
                                                    <div className="premium-companies-hirings-head ">
                                                        <h3 >
                                                            <Link

                                                                href={constant.component.companydetails.url.replace(
                                                                    ":url",
                                                                    URL
                                                                )}
                                                                target="_blank"
                                                            >
                                                                {item.COMPANY_NAME}
                                                            </Link>
                                                        </h3>
                                                        <div className="d-flex premium-companies-hirings-review">
                                                            <span className="star-r">
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                            <span className="main-2 rating">
                                                                {randomIntFromInterval(1, 5)}
                                                            </span>
                                                            {/* <span className="main-2 reviews">
                                                                | &nbsp; reviews
                                                            </span> */}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="premium-companies-hirings-job-area">
                                                    <div className="premium-companies-hirings-job-para w-wrap ">
                                                        <span
                                                            title={
                                                                item.ABOUT_COMPANY == null
                                                                    ? "NA.."
                                                                    : item.ABOUT_COMPANY
                                                            }
                                                        >
                                                            {item.ABOUT_COMPANY == null
                                                                ? "NA.." : item.ABOUT_COMPANY.length ? item.ABOUT_COMPANY : "NA"}
                                                        </span>
                                                    </div>
                                                    <div className="premium-companies-hirings-job-skills">
                                                        {item.INDUSTRY.split("/").map(
                                                            (item, index) => {
                                                                if (index < 2) {
                                                                    return (
                                                                        <a>
                                                                            {item.length > 25
                                                                                ? `${item.slice(0, 20)}...`
                                                                                : item}
                                                                        </a>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="premium-companies-hirings-allview">
                                                    <Link
                                                        data-interception="off"
                                                        target="_blank"
                                                        href={constant.component.joblist.url.replace(
                                                            ":url",
                                                           `${item.URL}-jobs`
                                                        )}
                                                    >
                                                        View Jobs
                                                    </Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}

                    {/* <SwiperSlide className="bg-color1">
                        <div className="container-lg">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <img
                                        className="img-fluid"
                                        src="https://static.wixstatic.com/media/2c0034_5916d66c114c4a3fb055fd0fff15f402~mv2.png"
                                        alt=""
                                    />
                                </div>
                                <div className="col-md-6 text-center text-md-left d-md-flex justify-content-md-center flex-md-column">
                                    <h1 className="h1">Valencia Orange</h1>
                                    <p className="paragraph mb-2">
                                        Valencia Orange is a juice which is really a wonderful and will give you a Orange taste and nothing else.
                                    </p>
                                    <a href="" className="btn btn-black align-self-md-start">
                                        Shop
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> */}

                </Swiper>
            </div>
        </section>

    );
};

export default MainSlider;

















