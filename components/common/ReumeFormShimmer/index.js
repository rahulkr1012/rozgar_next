import React from "react";
import { ShimmerCircularImage ,ShimmerSectionHeader ,ShimmerContentBlock  ,ShimmerSocialPost ,ShimmerTitle} from "react-shimmer-effects";

class index extends React.Component {
  render() {
    return (
     <React.Fragment>
         <div style={{
  width: "778px", }} >
 
    <ShimmerSocialPost type="both" />
      
    <ShimmerTitle line={2} gap={10} variant="primary" />;
    <ShimmerTitle line={2} gap={10} variant="primary" />;
              <ShimmerSectionHeader center />

         </div>

     </React.Fragment>
    );
  }
}

export default index