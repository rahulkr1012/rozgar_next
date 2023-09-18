import React, { Component } from 'react'

import GreenlamindustriesAboutUs from 'components/Companies/GreenlamindustriesAboutUs';
import { rozgarcompanydetail } from '@/actions/jobsByAction';
import FilteredHeader from 'components/Filtered_Header'
import Head from 'next/head';
import { getLoggedInUserData } from 'nextCookie';

export default class index extends Component {
  constructor(props){
    super(props);
    this.state = {
     swiggy:"",
     count:'',
     ud:this.props.ud
    }
}



componentDidMount() {
  this.rozgarcompanydetails()
 }

 rozgarcompanydetails = () => {
   rozgarcompanydetail({ LINK: "greenlam-industries-limited-24354"}).then(res => {
       if (res.status) {
           this.setState({ swiggy:res.result ,count:res.result.jobs.count})
       }
       else {
           console.log(res.error)
       }

   }).catch(err => {
     console.log(err)
   })
}

  render() {
    const {count}=this.state
    return (
      <React.Fragment>
           <Head>

</Head>
<FilteredHeader ud={this.state.ud} />
        <GreenlamindustriesAboutUs
                 swiggy={this.state.swiggy}
                 count={count}
        />
      </React.Fragment>
    )
  }
}
export async function getServerSideProps(index){
  const {req}  = index
let ud = getLoggedInUserData(req) 

   return {
     props:{ud}
 }
 }