import React, { Component } from 'react'
import { CastCategoryDropdown, CityListDropdown, CountryListDropdown, GenderDropdown, MaritalStatusDropdown, WorkPermitUSADropdown } from '@/action/CandidateAction';
import constant from 'constant';
import Multiselect from 'multiselect-react-dropdown';
import NumericFormat from 'react-number-format';
import { Typeahead } from "react-bootstrap-typeahead";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { getCookie } from 'cookies-next';




export default class EditPersonalDetailsModal extends Component {
    constructor(props) {
        super(props);
        let personalDetails = this.props.personalDetails
        this.state = {
            showModal: false,
            LanguageShow: false,
            FirstName: personalDetails ? personalDetails.FIRST_NAME : '',
            SecondName: personalDetails ? personalDetails.SECOND_NAME : '',
            detail: getCookie(constant.keys.cd) ? JSON.parse(getCookie(constant.keys.cd)) : {},
            personalDetails: {},
            personalData: [],
            cityList: [],
            EmailId: personalDetails ? personalDetails.EMAIL_ID : '',
            MobileNo: personalDetails ? personalDetails.PHONENO : '',
            CurrentLocation: personalDetails && personalDetails.CURRENT_LOCATION ? personalDetails.CURRENT_LOCATION : '',
            genderList: [],
            Gender: personalDetails ? personalDetails.GENDER_ID : '',
            martialStatusList: [],
            MaritalStatus: personalDetails ? personalDetails.MARITAL_STATUS_ID : '',
            castCategoryList: [],
            Category: personalDetails ? personalDetails.CAST_CATEGORY_ID : '',
            workPermitList: [],
            WorkPermitForUSA: personalDetails ? personalDetails.WORK_PERMIT_USA_ID : '',
            countryList: [],
            WorkPermitForOtherCountries: personalDetails && personalDetails.WorkPermitForOtherCountries ? personalDetails.WorkPermitForOtherCountries : [],
            Languages: personalDetails && personalDetails.Language && personalDetails.Language.length !== 0 ? personalDetails.Language.map((d, i) => {
                return {
                    Language: d.LANGUAGE,
                    Proficiency: d.PROFICIENCY,
                    Read: d.READ_SKILL,
                    Write: d.WRITE_SKILL,
                    Speak: d.SPEAK_SKILL
                }

            }) : [{ Language: '', Proficiency: '', Read: 'N', Write: 'N', Speak: 'N' }],
            DifferentlyAbled: personalDetails ? personalDetails.DIFFERENTLY_ABLED : '',
            Pincode: personalDetails ? personalDetails.PINCODE : '',
            HomeTown: personalDetails ? personalDetails.HOME_TOWN : '',
            PermanentAddress: personalDetails ? personalDetails.PERMANENT_ADDRESS : '',
            DOB: personalDetails ? personalDetails.DOB : '',
            Year: personalDetails && personalDetails.DOB ? personalDetails.DOB.split('-')[0] : '',
            Month: personalDetails && personalDetails.DOB ? personalDetails.DOB.split('-')[1] : '',
            Day: personalDetails && personalDetails.DOB ? personalDetails.DOB.split('-')[2].split('')[0] == '0' ? personalDetails.DOB.split('-')[2].split('')[1] : personalDetails.DOB.split('-')[2] : '',
        }
    }



    componentDidMount() {
        this.getGender()
        this.getMartialStatus()
        this.getCityListDropdown()
        this.getCastCategory()
        this.getWorkPermit()
        this.getCountryList()

    }

    getCountryList = () => {
        CountryListDropdown().then((res) => {

            if (res.status) {
                let d = res.result && res.result.map((d, i) => {
                    return {
                        COUNTRY: d.COUNTRY,
                        COUNTRY_ID: d.COUNTRY_ID,
                        label: d.COUNTRY
                    }
                })
                this.setState({
                    countryList: d
                })
            }
        });
    }

    getCityListDropdown = () => {
        CityListDropdown()
            .then((res) => {

                if (res.status) {
                    let d = res.result.map((data, index) => {
                        return {
                            CREATED_BY: data.CREATED_BY,
                            CREATED_ON: data.CREATED_ON,
                            MODIFIED_BY: data.MODIFIED_BY,
                            MODIFIED_ON: data.MODIFIED_ON,
                            CITY: data.CITY,

                            SORT_NUMBER: data.SORT_NUMBER,
                            label: data.CITY,
                        };
                    });
                    this.setState({
                        cityList: d
                    })
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    getGender = () => {
        GenderDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    genderList: res.result
                })
            }
        });
    }

    getMartialStatus = () => {
        MaritalStatusDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    martialStatusList: res.result
                })
            }
        });
    }

    getCastCategory = () => {
        CastCategoryDropdown().then((res) => {
            if (res.status) {
                this.setState({
                    castCategoryList: res.result
                })
            }
        });
    }

    getWorkPermit = () => {
        WorkPermitUSADropdown().then((res) => {
            if (res.status) {
                this.setState({
                    workPermitList: res.result
                })
            }
        });
    }


    onSubmit = (e) => {
        e.preventDefault()
       const { MaritalStatus, EmailId, FirstName, SecondName, CurrentLocation, MobileNo, Gender, Category, WorkPermitForUSA, WorkPermitForOtherCountries, Languages, DifferentlyAbled, Pincode, HomeTown, PermanentAddress, Year, Month, Day } = this.state
        let isValid = true;
        Languages && Languages.map((data, index) => {
            if ((data.Read == 'Y' || data.Write == 'Y' || data.Speak == 'Y') && data.Language.length == 0) {
                isValid = false
            }
        })
        Languages && Languages.map((data, index) => {
            if (data.Language.length > 0 && data.Proficiency.length == 0) {
                isValid = false
            }
        })
        
       
            let model = {
                Gender: Gender,
                FirstName: FirstName,
                SecondName: SecondName,
                MaritalStatus: MaritalStatus,
                CurrentLocation: CurrentLocation,
                EmailId: EmailId,
                Category: Category,
                WorkPermitForUSA: WorkPermitForUSA,
                MobileNo: MobileNo,
                WorkPermitForOtherCountries: WorkPermitForOtherCountries && WorkPermitForOtherCountries.length > 0 ? WorkPermitForOtherCountries.map((data, index) => {
                    return data.COUNTRY_ID
                }) : [],
                Languages: Languages,
                DifferentlyAbled: DifferentlyAbled,
                Pincode: Pincode,
                HomeTown: HomeTown,
                PermanentAddress: PermanentAddress,
                DOB: Year && Month && Day ? `${Year}-${Month}-${Day}` : '',
            }
            this.props.onSubmit(model)
        
    }


    

    onCancel = () => {
        this.props.onCancel()

    }

    AddLanguage = () => {
        let Languages = this.state.Languages;
        Languages.push({ Language: '', Proficiency: '', Read: 'N', Write: 'N', Speak: 'N' })
        this.setState({
            Languages: Languages
        })
    }

    RemoveLanguage = (index) => {
        let Languages = this.state.Languages;
        Languages.splice(index, 1)
        this.setState({
            Languages: Languages
        })
    }

    handleLanguage = (index, e) => {

        let Languages = this.state.Languages;
        if (e.target.name !== "Read" && e.target.name !== "Write" && e.target.name !== "Speak") {
            Languages[index][e.target.name] = e.target.value
            this.setState({
                Languages: Languages
            })
        } else {
            if (e.target.checked) {
                Languages[index][e.target.name] = 'Y'
            } else {
                Languages[index][e.target.name] = 'N'
            }
            this.setState({
                Languages: Languages

            })
        }
    }
    render() {
        const { Gender, cityList, MobileNo, genderList, martialStatusList, Languages, countryList, MaritalStatus, workPermitList, WorkPermitForOtherCountries, castCategoryList, Category, HomeTown, Pincode,
        } = this.state
        console.log(Languages,"Languages");
        return (
            <React.Fragment>
                <form className='form-group edit-profile-form'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='form-group'>
                                <label >First Name <span className='text-danger'>*</span></label>
                                <input type="text" id="firstName" value={this.state.FirstName}
                                    onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                                    className="form-control" name="firstName" placeholder="First Name" />
                                {
                                    this.props.error && !this.state.FirstName && <span className="text-danger ml-1">{this.props.error.FirstName}</span>
                                }
                            </div>

                        </div>
                        <div className='col-6'>
                            <div className='form-group'>
                                <label >Last Name <span className='text-danger'>*</span></label>
                                <input type="text" id="secondName" value={this.state.SecondName}
                                    onChange={(e) => { this.setState({ SecondName: e.target.value }) }}
                                    className="form-control" name="secondName" placeholder="Last Name" />
                                {
                                    this.props.error && !this.state.SecondName && <span className="text-danger ml-1">{this.props.error.SecondName}</span>
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className='row'>
                         <div className='col-md-12'>
                             <div className='form-group'>
                             <label>DOB <span className='text-danger'>*</span></label>
                             </div>
                        </div> 
                        <div class="col-4">
                            <div className='form-group'>
                                <select
                                    className="form-control"
                                    value={this.state.Day} onChange={(e) => { this.setState({ Day: e.target.value }) }}>
                                    <option value="">--Select Day--</option>
                                    {
                                        Array.from({ length: 31 }, (_, i) => <option value={i + 1}>{i + 1}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <div className='form-group'>
                                {/* <label>Month <span className='text-danger'>*</span></label> */}
                                <select className="form-control"
                                    value={this.state.Month}
                                    onChange={(e) => { this.setState({ Month: e.target.value }) }}>
                                    <option value="">--Select Month--</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <div className='form-group'>
                                {/* <label>Year <span className='text-danger'>*</span></label> */}
                                <select
                                    className="form-control"
                                    value={this.state.Year} onChange={(e) => { this.setState({ Year: e.target.value }) }}
                                >
                                    <option value="">--Select Year--</option>
                                    {
                                        Array.from({ length: 50 }, (_, i) => <option value={2022 - i}>{2022 - i}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        {
                            this.props.error && !this.state.Year && !this.state.Month && !this.state.Day && <span className="text-danger ml-1">{this.props.error.DOB}</span>
                        }

                    </div>
                    <div className='row'>
                        <div class="col-12 col-md-6">
                            <div className='form-group'>
                                <label >Gender <span className='text-danger'>*</span></label>
                                <select className="form-control"
                                    value={this.state.Gender}
                                    onChange={(e) => { this.setState({ Gender: e.target.value }) }}>
                                    <option value="">--Select Gender--</option>
                                    {
                                        genderList && genderList.map((data, index) => {
                                            return <option value={data.GENDER_ID}>{data.GENDER}</option>
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.Gender && <span className="text-danger ml-1">{this.props.error.Gender}</span>
                                }
                            </div>
                        </div>


                        <div class="col-12 col-md-6" id="react-phn-input">
                            <div className='form-group'>
                                <label >Mobile Number <span className='text-danger'>*</span></label>
                                <PhoneInput
                                    country={'in'}
                                    value={MobileNo}
                                    placeholder="Enter Mobile Number"
                                    onChange={MobileNo => this.setState({ MobileNo })}
                                    name="MobileNo"
                                />
                                {
                                    this.props.error && !this.state.MobileNo && <span className="text-danger ml-1">{this.props.error.MobileNo}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                           
                            <div class="form-group">
                            <label >Email <span className='text-danger'>*</span></label>
                                <input
                                    class="form-control"
                                    value={this.state.EmailId}
                                    onChange={(e) => { this.setState({ EmailId: e.target.value }) }}
                                    type="text"
                                    name="EmailId"
                                    placeholder="Enter Your Email"
                                />
                                {
                                    this.props.error && !this.state.EmailId && <span className="text-danger ml-1">{this.props.error.EmailId}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            
                            <div class="form-group">
                            <label >Permanent Address <span className='text-danger'>*</span></label>
                                <input
                                    class="form-control"
                                    value={this.state.PermanentAddress}
                                    onChange={(e) => { this.setState({ PermanentAddress: e.target.value }) }}
                                    type="text"
                                    name="PermanentAddress"
                                    placeholder="Enter Your Address"
                                />
                                {
                                    this.props.error && !this.state.PermanentAddress && <span className="text-danger ml-1">{this.props.error.PermanentAddress}</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-12">
                            
                            <div class="form-group">
                            <label >Hometown <span className='text-danger'>*</span></label>
                                <input
                                    class="form-control"
                                    type="text"
                                    value={this.state.HomeTown}
                                    onChange={(e) => { this.setState({ HomeTown: e.target.value }) }}
                                    name="HomeTown"
                                    id="HomeTown"
                                    placeholder='Enter HomeTown Location'
                                />
                                {
                                    this.props.error && !this.state.HomeTown && <span className="text-danger ml-1">{this.props.error.HomeTown}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                           
                            <div class="form-group">
                            <label >Pincode <span className='text-danger'>*</span></label>
                                <NumericFormat
                                    class="form-control"
                                    type="text"
                                    maxLength={"6"}
                                    value={this.state.Pincode}
                                    onChange={(e) => { this.setState({ Pincode: e.target.value }) }}
                                    name="Pincode"
                                    id="Pincode"
                                    placeholder="Enter Your Pincode"
                                />
                                {
                                    this.props.error && !this.state.Pincode && <span className="text-danger ml-1">{this.props.error.Pincode}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                            
                            <div class="form-group">
                            <label >Current Location <span className='text-danger'>*</span> </label>
                                <Typeahead
                                      useCache={false}
                                      clearButton={false}
                                      allowNew={true}
                                    onChange={(e) => {
                                        if (e && e.length > 0) {
                                            this.setState({
                                                CurrentLocation: e[0].CITY
                                            })
                                            this.getCityListDropdown(e[0].CITY)
                                        }
                                    }}
                                    options={cityList}
                                    name="CurrentLocation"
                                    placeholder="Choose a Current Location..."
                                    defaultInputValue={this.state.CurrentLocation}
                                />
                                {
                                    this.props.error && !this.state.CurrentLocation && <span className="text-danger ml-1">{this.props.error.CurrentLocation}</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div class="col-12">
                            <div className='form-group'>
                                <label >Marital Status <span className='text-danger'>*</span></label>
                                <select className="form-control" value={this.state.MaritalStatus} onChange={(e) => { this.setState({ MaritalStatus: e.target.value }) }}>
                                    <option value="">Select Marital Status</option>
                                    {
                                        martialStatusList && martialStatusList.map((data, index) => {
                                            return <option value={data.MARITAL_STATUS_ID}>{data.MARITAL_STATUS}</option>
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.MaritalStatus && <span className="text-danger ml-1">{this.props.error.MaritalStatus}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label >Category <span className='text-danger'>*</span></label>
                                <select className="form-control" value={this.state.Category} onChange={(e) => { this.setState({ Category: e.target.value }) }}>
                                    <option value="">Select Category</option>
                                    {
                                        castCategoryList && castCategoryList.map((data, index) => {
                                            return <option value={data.CAST_CATEGORY_ID}>{data.CAST_CATEGORY}</option>
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.Category && <span className="text-danger ml-1">{this.props.error.Category}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group multi-select-inp'>
                                <label >Work Permit For Other Country</label>
                                <Multiselect
                                    options={countryList}
                                    onSelect={(selectedValue) => {
                                        this.setState({ WorkPermitForOtherCountries: selectedValue })
                                    }}
                                    selectedValues={WorkPermitForOtherCountries}
                                    name={"Work_permit"}
                                    placeholder='Select Country'
                                    displayValue={"COUNTRY"}
                                    onRemove={(selectedValue) => {
                                        this.setState({ WorkPermitForOtherCountries: selectedValue })
                                    }}

                                />
                                {
                                    this.props.error && !this.state.WorkPermitForOtherCountries && <span className="text-danger ml-1">{this.props.error.WorkPermitForOtherCountries}</span>
                                }
                            </div>
                        </div>
                        <div class="col-12">
                            <div className='form-group'>
                                <label >Work Permit For USA </label>
                                <select className="form-control" value={this.state.WorkPermitForUSA} onChange={(e) => { this.setState({ WorkPermitForUSA: e.target.value }) }}>
                                    <option value="">Select Category</option>
                                    {
                                        workPermitList && workPermitList.map((data, index) => {
                                            return <option value={data.WORK_PERMIT_USA_ID}>{data.WORK_PERMIT_USA}</option>
                                        })
                                    }
                                </select>
                                {
                                    this.props.error && !this.state.WorkPermitForUSA && <span className="text-danger ml-1">{this.props.error.WorkPermitForUSA}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="col-12">
                           
                            <div class="col-md-6 form-group pd-left-0">
                            <label >Are you Differently Abled? <span className='text-danger'>*</span></label>
                                <div className='d-flex justify-content-between'>
                                    <div className='preferredinline'>
                                        {this.state.DifferentlyAbled == "Y" ? <input className="form-group-input" type="radio" name="Y" id="Y" value="Y" onChange={(e) => { this.setState({ DifferentlyAbled: e.target.value }) }} checked /> : <input className="form-group-input" type="radio" name="Y" id="Y" value="Y" onChange={(e) => { this.setState({ DifferentlyAbled: e.target.value }) }} />}

                                        <label className='form-group-label'>Yes</label>
                                    </div>
                                    <div className='preferredinline'>
                                        {this.state.DifferentlyAbled == "N" ? <input className="form-group-input" type="radio" name="Y" id="N" value="N" onChange={(e) => { this.setState({ DifferentlyAbled: e.target.value }) }} checked /> : <input className="form-group-input" type="radio" name="Y" id="N" value="N" onChange={(e) => { this.setState({ DifferentlyAbled: e.target.value }) }} />}

                                        <label className='form-group-label'>No</label>
                                    </div>
                                </div>
                                <div className='col-md-12' style={{ marginLeft: "-10px", padding: "0" }}>
                                    {
                                        this.props.error && !this.state.DifferentlyAbled && <span className="text-danger">{this.props.error.DifferentlyAbled}</span>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                    {

                        Languages && Languages.map((data, index) => {
                            return (
                                <>
                                    <div className='row mt-1'>
                                        <div class="col-12">
                                            <h6 style={{ color: "#091e42", fontSize: "13px", fontWeight: "550", lineHeight: "16px",marginBottom: "7px" }} className='pull-left'>Language - {index + 1}</h6>
                                            <i class="ti-trash font-weight-500 font-15 pull-right" onClick={(e) => { this.RemoveLanguage(index, e) }}></i>
                                        </div>
                                    </div>
                                    <div className='row'>


                                        <div class="col-6">
                                            <div className='form-group'>
                                                <label >Language</label>
                                                <input
                                                    class={(data.Read == 'Y' || data.Write == 'Y' || data.Speak == 'Y') && data.Language.length == 0 ? "form-control is-invalid" : 'form-control'}
                                                    type="text"
                                                    value={data.Language}
                                                    onChange={(e) => { this.handleLanguage(index, e) }}
                                                    name="Language"
                                                    id="Language"
                                                    placeholder='Language'
                                                />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div className='form-group'>
                                                <label >Proficiency</label>
                                                <select className={data.Language.length > 0 && data.Proficiency.length == 0 ? "form-control is-invalid" : "form-control"}
                                                    name="Proficiency"
                                                    value={data.Proficiency}
                                                    onChange={(e) => { this.handleLanguage(index, e) }}>
                                                    <option>Please select Proficiency level</option>
                                                    <option value={"Beginner"}>Beginner</option>
                                                    <option selected value={"Proficient"}>Proficient </option>
                                                    <option value={"Expert"}>Expert</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div class="col-3">
                                            <div class="form-group edit-form-input">
                                                {data.Read == 'Y' ? <input class="form-group-input" value={data.Read} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Read" id="flexRadioDefault1" checked /> : <input class="form-group-input" value={data.Read} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Read" id="flexRadioDefault1" />}
                                                <label class="form-group-label" for="flexRadioDefault1">Read</label>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="form-group edit-form-input">
                                                {data.Write == "Y" ? <input class="form-group-input" value={data.Write} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Write" id="flexRadioDefault1" checked /> : <input class="form-group-input" value={data.Write} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Write" id="flexRadioDefault1" />}
                                                <label class="form-group-label" for="flexRadioDefault1">Write</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group edit-form-input">
                                                {data.Speak == "Y" ? <input class="form-group-input" value={data.Speak} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Speak" id="flexRadioDefault1" checked /> : <input class="form-group-input" value={data.Speak} onChange={(e) => { this.handleLanguage(index, e) }} type="checkbox" name="Speak" id="flexRadioDefault1" />}
                                                <label class="form-group-label" for="flexRadioDefault1">Speak</label>
                                            </div>
                                        </div>
                                        {/* {
                                            this.props.error && !this.state.Languages && <span className="text-danger ml-1">{this.props.error.Languages}</span>
                                        } */}
                                    </div>

                                </>
                            )
                        })

                    }
                    <div className='row'>
                        <div className='col-12'>
                            <div onClick={this.AddLanguage} className="pull-right" style={{ color: '#009BC8', textDecoration: 'none' ,cursor:'pointer'}}>+ Add More Language</div>
                        </div>
                    </div>


                    <div className='row'>
                        <div class="col-12 text-right pb-3 pt-3">
                            <button type='button' className='rg-btn btn-primary mr-2' style={{ border: 'none', outline: 'none' }} onClick={this.onCancel}>CANCEL</button>
                            <button type='button' className='rg-btn rg-active btn-primary' style={{ border: 'none', outline: 'none' }} onClick={(e) => this.onSubmit(e)} >SAVE</button>

                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
