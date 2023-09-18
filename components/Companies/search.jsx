import { companykeyword } from '@/action/companyAction';
import { onChange, setOptions, validateForm } from '@/utils';
import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead';

export default class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KEYWORD: { name: 'KEYWORD', value: [], options: [], error: '', isRequired: true },
            selectedKeyword: [],

        }
    }

    onKeywordChange = (e) => {

        const val = e.map(item => {
            if (typeof item === 'object') {
                return item.label
            }
            else {
                return item
            }
        })

        onChange(this, this.state.KEYWORD.name, val)
    }
    onLocationChange = (e) => {
        const val = e.map(item => {
            if (typeof item === 'object') {
                return item.label
            }
            else {
                return item
            }
        })

        onChange(this, this.state.LOCATION.name, val)
    }

    onKeywordPress = (input) => {
        companykeyword(input).then(res => {
            if (res.status) {
                setOptions(this, this.state.KEYWORD.name, res.result)
            }
            else {
                alert(res.error)
            }
        }).catch(err => {
            alert(err)
        })
    }




    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value)
    }



    onSubmit = (e) => {
        
        e.preventDefault();
        const { KEYWORD } = this.state;
        if (validateForm(this)) {
            this.props.setKeyword(KEYWORD.value)

        }
    }

  render() {
    const { KEYWORD } = this.state;
    return (
     <React.Fragment>
 <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <form onSubmit={(e) => { this.onSubmit(e) }} className="rg-formtheme rg-formbannersearch rg-formbannersearchinner">
                        <fieldset className="rg-searcharea" style={{ border: KEYWORD.error.length && '1px solid #e81c28' }}>
                            <div className="rg-searchholder" style={{ width: '97.5%' }}>
                                <div className="form-group rg-inputwithicon">
                                    <i className="lnr lnr-magnifier"></i>
                                    {
                                        <Typeahead
                                            className={KEYWORD.error.length ? 'form-control is-invalid ' : 'form-control srchjob'}
                                            id='keyword'
                                            useCache={false}
                                            clearButton={false}
                                            multiple={true}
                                            allowNew={true}
                                            name={KEYWORD.name}
                                            selected={KEYWORD.value}
                                            options={KEYWORD.options}
                                            placeholder="Company"
                                            onInputChange={(e) => { this.onKeywordPress(e) }}
                                            onChange={(e) => { this.onKeywordChange(e) }}
                                            emptyLabel
                                        />
                                    }
                                </div>
                            </div>
                            <div className="rg-searchbtn" >
                                <button type="submit" onClick={(e) => this.onSubmit(e)} className="rg-btn rg-active btn-primary float-right">Search</button>
                            </div>
                        </fieldset>
                        {KEYWORD.error.length > 0 && <span style={{ marginLeft: '50px' }} className='text-danger'>Please enter keywords to search relevant company</span>}
                    </form>
                </div>
     </React.Fragment>
    )
  }
}
