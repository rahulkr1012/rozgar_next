import React, { Component } from 'react'
import FilteredHeader from 'components/Filtered_Header'
import Sitemap from 'components/sitemap'
import { getLoggedInUserData } from 'nextCookie'

export default class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            ud:this.props.ud

        }
    }
  render() {
    return (
<React.Fragment>
<FilteredHeader ud={this.state.ud} />
     <Sitemap/>
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