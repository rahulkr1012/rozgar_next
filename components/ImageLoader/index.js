import React ,{Component} from "react";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

class ImageLoader extends Component {

     render() {
    return (
      <React.Fragment>
        <ShimmerSimpleGallery imageType="circular" imageHeight={200} caption />
        // <ShimmerSimpleGallery card imageHeight={300} />
        <ShimmerSimpleGallery card imageHeight={300} caption />
      </React.Fragment>
    );
  }
}

export default ImageLoader