import React, { Component } from 'react'
import TravelGuidance from 'components/StudyAbroad/TravelGuidance'
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head'

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ud: props.ud

    }
  }
  render() {
    return (
<React.Fragment>
  <Head>
    <title>Travel Assistance - Rozgar.com</title>
  <link rel="canonical" href={"https://rozgar.com/travel-guidance"} />

  </Head>
  <FilteredHeader ud={this.state.ud} />
<TravelGuidance/>
    </React.Fragment>    )
  }
}
