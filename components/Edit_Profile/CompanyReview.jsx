import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import swal from 'sweetalert';
import { AddEmployerReview, updateEmployerReview } from '@/action/CandidateAction';
import constant from 'constant';
import { getCookie } from 'cookies-next';
import Image from 'next/image';


export default class CompanyReview extends Component {

    constructor(props) {
        super(props);
        const review = this.props.reviewDetail
        this.state = {
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            overAllRating: review ? review.OVERALL_RATING : '',
            overAllRatingHover: review ? review.OVERALL_RATING : 'null',
            workLifeRating: review ? review.WORK_LIFE_BALANCE : '',
            workLifeRatingHover: review ? review.WORK_LIFE_BALANCE : 'null',
            salaryRating: review ? review.SALARY_BENEFITS : '',
            salaryRatingHover: review ? review.SALARY_BENEFITS : 'null',
            promotionRating: review ? review.PROMOTIONS_APPRAISAL : '',
            promotionRatingHover: review ? review.PROMOTIONS_APPRAISAL : 'null',
            jobSecurityRating: review ? review.JOB_SECURITY : '',
            jobSecurityHover: review ? review.JOB_SECURITY : 'null',
            skillDevelopmentRating: review ? review.SKILL_DEVELOPMENT : '',
            skillDevelopmentHover: review ? review.SKILL_DEVELOPMENT : 'null',
            workSatisfactionRating: review ? review.WORK_SATISFACTION : '',
            workSatisfactionHover: review ? review.WORK_SATISFACTION : 'null',
            companyCultureRating: review ? review.COMPANY_CULTURE : '',
            companyCultureHover: review ? review.COMPANY_CULTURE : 'null',
            like: review ? review.WHAT_DO_YOU_LIKE : '',
            disLike: review ? review.WHAT_DO_YOU_DISLIKE : '',
            error: false,
        }
    }


    onSubmit = (e) => {
        e.preventDefault()      
        const review = this.props.reviewDetail
        const { overAllRating, workLifeRating, salaryRating, promotionRating, jobSecurityRating, skillDevelopmentRating, workSatisfactionRating, companyCultureRating, like, disLike } = this.state
        if (overAllRating.length == 0 || workLifeRating.length == 0 || salaryRating.length == 0 || promotionRating.length == 0 || jobSecurityRating.length == 0 || skillDevelopmentRating.length == 0 || workSatisfactionRating.length == 0 || companyCultureRating.length == 0 || like.length == 0 || disLike.length == 0) {
            this.setState({ error: true })
        }
        else {
            const model = {
                EMPLOYER_REVIEW_ID: review ? review.EMPLOYER_REVIEW_ID : '',
                CANDIDATE_EMPLOYER_ID: this.props.employmentDetails.CANDIDATE_EMPLOYER_ID,
                OVERALL_RATING: overAllRating,
                WORK_LIFE_BALANCE: workLifeRating,
                SALARY_BENEFITS: salaryRating,
                PROMOTIONS_APPRAISAL: promotionRating,
                COMPANY_CULTURE: companyCultureRating,
                WORK_SATISFACTION: workSatisfactionRating,
                SKILL_DEVELOPMENT: skillDevelopmentRating,
                JOB_SECURITY: jobSecurityRating,
                WHAT_DO_YOU_LIKE: like,
                WHAT_DO_YOU_DISLIKE: disLike,
            }
            if (this.props.type == 'ADD') {
                AddEmployerReview(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.props.onCancel()
                        this.props.getEmploymentList()

                    } else {
                        swal({
                            icon: "error",
                            text: res.error,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                    }
                });
            } else {
                updateEmployerReview(model).then((res) => {
                    if (res.status) {
                        swal({
                            icon: "success",
                            text: res.messageCode,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                        this.props.onCancel()
                        this.props.getEmploymentList()

                    } else {
                        swal({
                            icon: "error",
                            text: res.error,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                        });
                    }
                })
            }
        }

    }


    onCancel = () => {
        this.props.onCancel()

    }



    render() {
        const { overAllRating, workLifeRating, salaryRating, promotionRating, jobSecurityRating, skillDevelopmentRating, workSatisfactionRating, companyCultureRating, like, disLike, overAllRatingHover, workLifeRatingHover, salaryRatingHover, promotionRatingHover, jobSecurityHover, skillDevelopmentHover, workSatisfactionHover, companyCultureHover, error } = this.state

        return (
            <>
                <form action="">
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Rate {this.props.employmentDetails.CURRENT_COMPANY} on the following criteria <img src={"https://static.ambitionbox.com/static/icons/forms/backhand-down.png"} width={50} height={30} /></h4>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Overall Rating</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <>
                                    <label key={i}>
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
                                            style={{ transition: 'color 200ms', marginRight: '5px', width:'25px'}}
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

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Work-Life balance</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ workLifeRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px', width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ workLifeRatingHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ workLifeRatingHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (workLifeRatingHover || workLifeRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && workLifeRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Work-Life balance</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Salary & Benefits</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ salaryRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px', width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ salaryRatingHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ salaryRatingHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (salaryRatingHover || salaryRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && salaryRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Salary & Benefits Rating</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Promotions or Appraisal</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ promotionRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px', width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ promotionRatingHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ promotionRatingHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (promotionRatingHover || promotionRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && promotionRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Promotions or Appraisal Rating</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Job Security</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ jobSecurityRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px',width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ jobSecurityHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ jobSecurityHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (jobSecurityHover || jobSecurityRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && jobSecurityRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Job Security Rating</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Skill Development / Learning </p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ skillDevelopmentRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px' , width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ skillDevelopmentHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ skillDevelopmentHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (skillDevelopmentHover || skillDevelopmentRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && skillDevelopmentRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Skill Development / Learning Rating</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}> Work Satisfaction</p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ workSatisfactionRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px' , width:'25px'}}
                                        id='star'
                                        onMouseEnter={() => this.setState({ workSatisfactionHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ workSatisfactionHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (workSatisfactionHover || workSatisfactionRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && workSatisfactionRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Work Satisfaction Rating</label> : ''}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '400' }}>Company Culture </p>
                        {[...Array(5)].map((item, i) => {
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name='rating'
                                        id='star'
                                        value={ratingValue}
                                        onClick={() => this.setState({ companyCultureRating: ratingValue })}
                                    />
                                    <FaStar
                                        style={{ transition: 'color 200ms', marginRight: '5px' , width:'25px' }}
                                        id='star'
                                        onMouseEnter={() => this.setState({ companyCultureHover: ratingValue })}
                                        onMouseLeave={() => this.setState({ companyCultureHover: null })}
                                        className='star'
                                        size={30}
                                        cursor='pointer'
                                        color={ratingValue <= (companyCultureHover || companyCultureRating) ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            )
                        })}

                    </div>
                    {error && companyCultureRating.length == 0 ? <label style={{ color: "red", marginTop: "-20px" }}>Please select Company Culture  Rating</label> : ''}

                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>What do you like about working at {this.props.employmentDetails.CURRENT_COMPANY}?</h4>
                            <textarea
                                className='form-control'
                                value={like}
                                onChange={(e) => this.setState({ like: e.target.value })}
                                name="" id="" cols="30" rows="10"></textarea>
                            {error && like.length == 0 ? <label style={{ color: "red" }}>Please enter what you like</label> : ''}
                        </div>
                        <div className='col-md-12'>
                            <h4>What do you dislike about working at {this.props.employmentDetails.CURRENT_COMPANY}?</h4>
                            <textarea
                                className='form-control'
                                value={disLike}
                                onChange={(e) => this.setState({ disLike: e.target.value })}
                                name="" id="" cols="30" rows="10"></textarea>
                            {error && disLike.length == 0 ? <label style={{ color: "red" }}>Please enter what you dislike</label> : ''}
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12 text-right pb-3 pt-3">
                            <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel} >CANCEL</button>
                            <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >SAVE</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
