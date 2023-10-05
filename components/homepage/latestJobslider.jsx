import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import constant from "constant";
import { ToSeoUrl, randomIntFromInterval } from "@/utils";
import moment from 'moment';
import Parser from 'html-react-parser';



const MainSlider = (props) => {
    const { Jobs } = props;
    useEffect(() => {

        //  const element = document.getElementsByClassName('swiper-wrapper')

        // element[0].classList.add("featured")
        // element[1].classList.add("premium")

        //  element[0].classList.add("my-class",  "swiper-wrapper")

        //  return ()=>{
        //     let el2 = document.querySelector('.swiper-wrapper')
        //     el2.classList.remove('swiper-wrapper')
        //     el2.classList.add("custom-class" ,'swiper-wrapper' )
        //  }

        // let el2 = document.querySelector('.swiper-wrapper')
        //     el2.classList.remove('swiper-wrapper')
        //     el2.classList.add("custom-class" ,'swiper-wrapper' )

        // let doc =  document.querySelectorAll('.swiper-wrapper')
        // let all_arr = Array.from(doc)
        // all_arr[0].classList.remove('swiper-wrapper')
        // all_arr[0].classList.add("latest-job" ,'latest-job-section')

        // 
        // let doc =  document.querySelectorAll('.swiper-wrapper')
        // let all_arr = Array.from(doc)
        // all_arr[0].classList.remove('swiper-wrapper')
        // all_arr[0].classList.add("swiper-wrapper" ,'latest-job')

    }, [])
    return (

        <section className="rg-haslayout rg-sectionspace rg-bglight">
            <div className="container">
                <div className="latestjobbox">
                    <div className="lpfeatures-jobbox">
                        <h2>
                            <span className="latesttext">Latest Jobs</span>
                            <br />
                            <span>Premium & Featured<br />Jobs for you</span>
                        </h2>
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
                    freeMode={false}
                    loop={true}
                    mousewheel={true}
                    grabCursor={false}
                    lazyLoading={true}
                    // keyboard= {{ enabled: true}}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}

                >

                    {Jobs &&
                        Jobs.map((item) => {
                            var a = item.CREATED_ON
                                ? moment([
                                    parseInt(
                                        moment(item.CREATED_ON).format("YYYY")
                                    ),
                                    parseInt(
                                        moment(item.CREATED_ON).format("MM")
                                    ),
                                    parseInt(
                                        moment(item.CREATED_ON).format("DD")
                                    ),
                                ])
                                : "";
                            var b = moment([
                                parseInt(moment().format("YYYY")),
                                parseInt(moment().format("MM")),
                                parseInt(moment().format("DD")),
                            ]);
                            var days = b.diff(a, "days");
                            const URL = item.COMPANY_NAME
                                ? item.COMPANY_NAME + "-" + item.EMPLOYER_ID
                                : "rozgar" + "-" + item.EMPLOYER_ID;

                            let dynamicURLOne =ToSeoUrl(item.CITY?.trim().split(',')[0]) + '/' + ToSeoUrl(item.JOB_TITLE) + '-' + item.JOB_ID

                            dynamicURLOne = dynamicURLOne.replace(/ /g, "");

                            return (
                                <SwiperSlide>
                                    <div className="col-md-12 mob-pad-0">
                                        {/* <a data-interception='off' target='_blank' href={constant.component.jobdetails.url.replace(':url', dynamicURLOne)}> */}
                                        <div className="rozgar-latespremiu-featurejob-area job-slice mb-15">
                                            <div className="latespremiu-company-jobtitle">
                                                <h3>
                                                    {
                                                        <Link
                                                            data-interception="off"
                                                            target="_blank"
                                                            href={constant.component.jobdetails.url.replace(
                                                                ":url",
                                                                dynamicURLOne
                                                            )}
                                                        >
                                                            {item.JOB_TITLE.length > 25
                                                                ? `${item.JOB_TITLE.slice(
                                                                    0,
                                                                    20
                                                                )}...`
                                                                : item.JOB_TITLE}
                                                        </Link>
                                                    }
                                                </h3>
                                            </div>
                                            <div className="d-flex align-items-center align-items-start">
                                                <figure className="latespremiu-company-logo">
                                                    {item.COMPANY_LOGO == null ? (
                                                        <Image
                                                            src={Companylogo}
                                                            width={170}
                                                            height={95}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                                            alt={item.COMPANY_NAME}
                                                            //   style={{ maxWidth: "70px", height: "100px" }}
                                                            width={170}
                                                            height={95}
                                                        />
                                                    )}
                                                </figure>
                                                <div className="latespremiu-company-jobtitle">
                                                    <h5>
                                                        <Link
                                                            href={constant.component.companydetails.url.replace(
                                                                ":url",
                                                                URL
                                                            )}
                                                            target="_blank"
                                                        >
                                                            {item.COMPANY_NAME.length > 18
                                                                ? item.COMPANY_NAME.slice(0, 16) +
                                                                "...."
                                                                : item.COMPANY_NAME}
                                                        </Link>
                                                    </h5>
                                                    <div className="d-flex latespremiu-company-review">
                                                        <span className="star-r">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="main-2 rating">
                                                            {randomIntFromInterval(1, 5)}
                                                        </span>
                                                        <span className="main-2 reviews">
                                                            | &nbsp; reviews
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="latespremiu-company-job-area">
                                                <div className="latespremiu-company-job-para">
                                                    <p>
                                                        {" "}
                                                        <span>
                                                            {" "}
                                                            {item.JOB_DETAILS &&
                                                                item.JOB_DETAILS.length === 0
                                                                ? "No Discription Found"
                                                                : item.JOB_DETAILS.length > 60
                                                                    ? `${Parser(item.JOB_DETAILS.slice(0, 30))}...`
                                                                    : `${Parser(item.JOB_DETAILS.slice(0, 30))}...`}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="latespremiu-company-job-skills ">
                                                    {item.KEYWORDS.split(",").map(
                                                        (item, index) => {
                                                            if (index < 2) {
                                                                return (
                                                                    <a>
                                                                        {item.length > 20
                                                                            ? `${item.slice(0, 18)}...`
                                                                            : item}
                                                                    </a>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="latespremiu-company-allview">
                                                <span
                                                    style={{
                                                        flexGrow: "8",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    <a className="premiumbox">
                                                        <i className="ti-crown"></i>{" "}
                                                        {item.LISTNING_TYPE == 1
                                                            ? " REGULAR"
                                                            : item.LISTNING_TYPE == 2
                                                                ? " FEATURED"
                                                                : " PREMIUM"}
                                                    </a>
                                                </span>
                                                {/* {
                                !this.state.saveList.includes(item.JOB_ID)
                                  ?
                                  <a className="hartbtn" onClick={() => this.onClickSave(item.JOB_ID)} style={{ cursor: 'pointer', fontSize: '1em' }}><i className="fa fa-heart-o"></i></a>
                                  :
                                  <a className="hartbtn" onClick={() => this.onClickUnSave(item.JOB_ID)} style={{ cursor: 'pointer', fontSize: '1em', border: '1px solid #e81c28' }}><i className="fa fa-heart-o" style={{ color: '#e81c28' }}></i></a>
                              } */}

                                                <Link
                                                    href={constant.component.jobdetails.url.replace(
                                                        ":url",
                                                        dynamicURLOne
                                                    )}
                                                    target="_blank"
                                                    className="arrowclick"
                                                >
                                                    <i className="far fa-angle-right"></i>{" "}
                                                </Link>
                                            </div>
                                        </div>
                                        {/* </a> */}

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







