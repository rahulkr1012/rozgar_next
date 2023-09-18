import Link from 'next/link'
import React, { Component } from 'react'
import constant from 'constant'
import { withRouter } from 'next/router'

export default withRouter(class Location extends Component {
     constructor(props) {
        super(props)
        this.state = {
            STATE_LIST: this.props.LOCATION_LIST.state,
            CITY_LIST: this.props.LOCATION_LIST.city
        }

    }
    componentDidMount() {
        window.scroll(0, 0)
    }

    render() {
        const { STATE_LIST, CITY_LIST } = this.state
        const { LOCATION_LIST, TOP_LOCATION } = this.props

        let arraytag = this.props.router.asPath.split('-')
        let finalTag = arraytag[arraytag.length-1]
        let finlaUrl =  'jobs-in-:location'



        return (
            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
                    <div className='headtext'> Browse Jobs by Top States </div>
                    {/* { STATE_LIST.length > 0 && STATE_LIST.map((item)=>{
                    return(
                        <div>
                            {`https://rozgar.com/jobs/${item.URL}`}
                        </div>
                    )

                   })} */}
                        
                    <div className='jobsbylocationColumn colCount_four'>
                  {STATE_LIST.length > 0 && STATE_LIST.map((item, index) => {
                            return (
                          
                            
                            <Link 
                                target="_blank"
                                href={constant.component.joblist.url.replace(':url',`jobs-in-${item.URL}`)}
                            
                            > Jobs in {item.STATE}  </Link>)
                        })}
                      
                    </div>
                  
                </div>
            


                <div className='jobsbylocationColumnBox'>

                    <div className='headtext'>Browse Jobs by Top Localities</div>
                    
                    <div className='jobsbylocationColumn colCount_four'>
                        {TOP_LOCATION.length > 0 && TOP_LOCATION.map((item, index) => {
                            return (<Link 
                                target="_blank"
                                    href={constant.component.joblist.url.replace(':url',`jobs-in-${item.URL}`)}
                                   
                            >  Jobs in {item.CITY}   </Link>)
                        })}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <h6>Jobs in States / Union Territories and Cities across India</h6>
                    </div>
                </div>
                <div className='row'>
                    {/* <div className='col-md-4'> */}
                    {CITY_LIST.length > 0 && CITY_LIST.map((item, index) => {
                        for (const [key, value] of Object.entries(item)) {
                            return (<div className='col-md-12'>
                                <div className='jobsbylocation1ColumnBox'>
                                    <div className='headtext'>Jobs in {key}</div>
                                    <div className='jobsbylocationColumn colCount_four'>
                                        {value.length && value.map((item, index) => {
                                            return (
                                                <Link
                                                href={constant.component.joblist.url.replace(':url',`jobs-in-${item.URL}`)}
                                              
                                            > Jobs in {item.CITY} </Link>)
                                        })}

                                    </div>
                                </div>
                            </div>)
                        }
                    })}
                </div>
            </React.Fragment >
        )
    }
})
