import React from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";

class Loader extends React.Component {
  render() {
    return (
      
        <React.Fragment>
        <div style={{padding:"0px 100px" }}>
        <ShimmerSocialPost type="image" />
        <ShimmerSocialPost type="both" />
        <ShimmerSocialPost type="text" />
        <ShimmerSocialPost type="text" title />
        
          </div>
   
      </React.Fragment>
    )
  }
}

export default Loader