
import React, { Component } from "react";
// import Shimmer from "react-shimmer-effect";
import injectSheet from "react-jss";
 
const StyleSheet = {
  container: {
    border: "0px solid rgba(255, 255, 255, 1)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, .1)",
    borderRadius: "4px",
    background:'#f9f9f9',
    // display: "flex",
    padding: "16px",
    width: "100%"
  },
   
  circle: {
    height: "56px",
    width: "56px",
    borderRadius: "50%"
  },
   
  line : {
    width: "100%",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px"
  }
};
 
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className="row">
         < div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

< div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

</div>
<div className="row">
         < div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

< div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

</div>
<div className="row">
         < div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

< div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

</div>
<div className="row">
         < div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

< div className='col-md-6' >
         <div className='college-area'>
        <div className='d-flex college-area-item'>
      <div className="flex">
<div id="div">
  <div id="square" className="shimmer"></div>
  <div id="content">
    <div id="title" className="shimmer"></div>
    <div id="desc">
      <div className="line shimmer"></div>
    </div>
  </div>
</div>
</div></div>
</div>
</div>

</div>
          </React.Fragment>
    );
  }
}
 
export default injectSheet(StyleSheet)(App);