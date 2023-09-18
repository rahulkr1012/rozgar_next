import React, { Component } from 'react'
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('components/Loader'), { ssr: false });
const TestPreparations = dynamic(() => import('components/StudyAbroad/TestPreparation'), { loading: () => <Loader />, ssr: true });
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
      <link rel="canonical" href={"https://rozgar.com/test-preparation"} />
      </Head>
      <FilteredHeader ud={this.state.ud} />
        <TestPreparations/>
    </React.Fragment>    )
  }
}
