import { AddAuthorReview, updateAuthorReview } from "@/action/CandidateAction";
import { capFirstLetterInSentence } from "@/utils";
import constant from "constant";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import swal from "sweetalert";
import authorimg from 'src/assets/images/picss.png'

// import "./RatingReview.css";

class RatingReview extends Component {
    constructor(props) {
        super(props);
        const review = this.props.reviewData
        this.state = {
            Review: review ? review.REVIEW : '',
            overAllRating: review ? review.OVERALL_RATING : '',
            overAllRatingHover: review ? review.OVERALL_RATING : 'null',
            error: false,
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
        };
    }



    onSubmit = (e) => {
        debugger
        e.preventDefault()
        // const review = this.props.reviewDetail
        const { AUTHOR_ID } = this.props.authorDetail
        const { CANDIDATE_ID } = this.state.detail
        const { overAllRating, Review } = this.state
        if (overAllRating.length == 0 || Review.length == 0) {
            this.setState({ error: true })
            return
        }
        else {
            const model = {
                CANDIDATE_ID: CANDIDATE_ID,
                OVERALL_RATING: overAllRating,
                REVIEW: Review,
                AUTHOR_ID: AUTHOR_ID
            }

            updateAuthorReview(model).then((res) => {
                if (res.status) {
                    swal({
                        icon: "success",
                        text: res.result.message,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    window.location.reload()


                } else {
                    swal({
                        icon: "error",
                        text: res.result.error,
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                }
            })

        }
    }




    onCancel = () => {
        this.props?.onCancel()

    }



    render() {
        console.log("detaillll", this.props.reviewData);
        const { AUTHOR_NAME } = this.props.authorDetail
        const { overAllRatingHover, overAllRating, error, Review } = this.state;

        return (

            <form action="">
                <div className='row'>
                    <div className='col-md-12'>
                        <h4 style={{ textAlign: "center", marginBottom: "40px", fontSize: "30px" }}>{capFirstLetterInSentence(AUTHOR_NAME)} </h4>
                    </div>
                </div>




                <div className="rating-review">
                    <img
                        alt=""
                        className="xvVSEe"
                        src="https://lh3.googleusercontent.com/a/ACg8ocInQ-CB9_-eldm9ivWrKRpcr2sqsrqX96Mys-kZ6A8dgA=s40-cc-mo"
                        data-iml="957.6999998092651"
                    />
                    <div className="UDcEj" style={{ display: "inline-table" }}>
                        <div className="Af21Ie" style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "600px", color: "rgb(60,64,67)" }}>{capFirstLetterInSentence(AUTHOR_NAME)}</div>
                        <div className="Rgwf9b">
                            <span style={{ marginLeft: "9px", color: "#70757a", fontSize: "14px", fontWeight: "400px" }}>Posting publicly</span>
                            <span className="jwzVle" data-callout-id="ucc-0">
                                <span className="VfPpkd-suEOdc-sM5MNb-OWXEXe-nzrxxc">
                                </span>
                            </span>
                        </div>
                    </div>
                </div>




                <div style={{ marginLeft: "auto", marginRight: "auto", width: "20%" }}>
                    {/* <h4 style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Overall Rating</h4> */}
                    {[...Array(5)].map((item, i) => {
                        const ratingValue = i + 1
                        return (
                            <>
                                <label key={i} style={{ display: "inline-block" }}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        checked={true}
                                        value={ratingValue}
                                        onClick={() => this.setState({ overAllRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px', width: '25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ overAllRatingHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ overAllRatingHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (overAllRatingHover || overAllRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            </>
                        )
                    })}
                </div>
                {error && overAllRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Overall Rating</label> : ''}
                {/* {error && overAllRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Overall Rating</label> : ''} */}




                <div className='row'>
                    <div className='col-md-12'>
                        <h4>Write your review </h4>
                        <textarea
                            className={error && Review.length == 0 ? 'form-control is-invalid' : 'form-control'}
                            value={Review}
                            onChange={(e) => this.setState({ Review: e.target.value })}
                            name="" id="" cols="30" rows="10"></textarea>
                        {error && Review.length == 0 ? <label style={{ color: "red" }}>Please enter your review</label> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div class="col-12 text-right pb-3 pt-3">
                        <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel} >Cancel</button>
                        <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >Post</button>
                    </div>
                </div>
            </form>
            //   <div className="rating-review">
            //     <div className="rating">
            //       <h2>Rate this product</h2>
            //       <div className="stars">
            //         {[1, 2, 3, 4, 5].map((star) => (
            //           <span
            //             key={star}
            //             className={`star ${star <= rating ? "filled" : ""}`}
            //             onClick={() => this.handleRatingChange(star)}
            //           >
            //             ★
            //           </span>
            //         ))}
            //       </div>
            //       <p>You rated this product: {rating} stars</p>
            //     </div>
            //     <div className="review">
            //       <h2>Write a Review</h2>
            //       <textarea
            //         className="review-input"
            //         placeholder="Write your review here..."
            //         value={review}
            //         onChange={this.handleReviewChange}
            //       ></textarea>
            //       <button className="submit-button" onClick={this.handleSubmit}>
            //         Submit
            //       </button>
            //     </div>
            //     <div className="reviews">
            //       <h2>Reviews</h2>
            //       <ul className="review-list">
            //         {reviews.map((r, index) => (
            //           <li className="review-item" key={index}>
            //             <p>{r.review}</p>
            //             <p className="review-rating">Rating: {r.rating} stars</p>
            //           </li>
            //         ))}
            //       </ul>
            //     </div>
            //   </div>
        );
    }
}

export default RatingReview;
