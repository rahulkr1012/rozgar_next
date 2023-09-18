import React, { Component } from 'react'
import Coupons from 'components/rewards/index'
import Head from 'next/head'
import FilteredHeader from 'components/Filtered_Header'
import { getLoggedInUserData } from 'nextCookie'
import { Couponlist } from '@/action/jobsByActions'

export default class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    list:'',
    page:1
    }
  }


  render() {
    const { ud } = this.props
    return (
     <React.Fragment>
         <Head >


         <title >Rewards and Coupons For Job Seekers Available on Rozgar.com</title>
         <meta name="HandheldFriendly" content="True" />
         <meta name="description" content={"Get rewards and coupons for shopping and travelling by registering or downloading the Rozgar app and website. Get a chance of travelling and shopping."} />
         <meta name="referrer" content="no-referrer-when-downgrade" />
         <meta name="viewport" content="width=device-width, initial-scale=1"></meta>


         <meta property="og:site_name" content="Rozgar.com" />
         <meta property="og:title" content={"Rewards and Coupons For Job Seekers Available on Rozgar.com"} />
         <meta property="og:description" content={"RGet rewards and coupons for shopping and travelling by registering or downloading the Rozgar app and website. Get a chance of travelling and shopping."} />
         <meta property="og:url" content={"https://rozgar.com/rewards"} />
         <meta property="og:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
         <meta property="og:image:width" content="4000" />
         <meta property="og:image:height" content="6000" />

         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={"Rewards and Coupons For Job Seekers Available on Rozgar.com"} />
         <meta name="twitter:description" content={"Get rewards and coupons for shopping and travelling by registering or downloading the Rozgar app and website. Get a chance of travelling and shopping."} />
         <meta name="twitter:url" content={"https://rozgar.com/rewards"} />
         <meta name="twitter:image" content="https://rozgarlogo.s3.ap-south-1.amazonaws.com/download.png" />
         
         <link rel="canonical" href="https://rozgar.com/rewards" />


</Head>
<FilteredHeader ud={ud} />

      <Coupons />
     </React.Fragment>
    )
  }
}

export async function getServerSideProps({ req }) {
    let ud = getLoggedInUserData(req)

    return {
        props: {
            ud: ud
        }
    }

}