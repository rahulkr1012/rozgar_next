import Loader from 'components/Loader/index'
import React, { Component } from 'react'

export default class JobsByLoader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='jobsbylocationColumnBox'>
                   <Loader />
                </div>
            </React.Fragment>
        )
    }
}
