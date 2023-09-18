import React, { useEffect } from "react";
import { gapi } from 'gapi-script';

import { styled, makeStyles } from "@material-ui/styles";

import GoogleLogin from "react-google-login";
import {
  Button as _Button,

} from "@material-ui/core";

export default function GoogleLoginPage(props) {
  const responseGoogle = response => {
    console.log(response);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '127069964067-ecs561pfupvs2entdh3dj66uj4nvae44.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <GoogleLogin
      clientId="127069964067-ecs561pfupvs2entdh3dj66uj4nvae44.apps.googleusercontent.com"
      style={{ width: '340px', fontSize: '40px' }}
      buttonText="Google"
      // isSignedIn={true}
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
