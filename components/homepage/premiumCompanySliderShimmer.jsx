
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
      <div className="latesjobshimmerhome ml-1">
     <  div class="wrapper">
            <div class="profilePic animate din"></div>
            <div class="comment br animate w80"></div>
            <div class="comment br animate"></div>
            <div class="comment br animate"></div>
          </div>

      </div>
       <div className="latesjobshimmerhome ml-1">
       <  div class="wrapper">
              <div class="profilePic animate din"></div>
              <div class="comment br animate w80"></div>
              <div class="comment br animate"></div>
              <div class="comment br animate"></div>
            </div>
  
        </div>
         <div className="latesjobshimmerhome ml-1">
         <  div class="wrapper">
                <div class="profilePic animate din"></div>
                <div class="comment br animate w80"></div>
                <div class="comment br animate"></div>
                <div class="comment br animate"></div>
              </div>
    
          </div>
          </React.Fragment>
    );
  }
}
 
export default injectSheet(StyleSheet)(App);