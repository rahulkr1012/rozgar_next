import React, { useEffect, useState } from "react";
import constant from "constant";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Loader from 'components/Loader'

const Dashboard = dynamic( () => import('components/Dashboard/Dashboard'), { loading:()=><Loader /> ,   ssr: false });

function index(props) {
  useEffect(() => {
    document.title = constant.title.AllJobs;
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <React.Fragment>
     
          <Dashboard props={props.router}/>
    
           </React.Fragment>
  );
}

export default withRouter(index);
