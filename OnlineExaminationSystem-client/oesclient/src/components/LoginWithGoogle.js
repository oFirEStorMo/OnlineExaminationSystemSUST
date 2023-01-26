import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import API_URLS from "../API_URLS.json";
import { useNavigate } from "react-router-dom";

export default function LoginWithGoogle() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/dashboard`;
    navigate(path);
  };
  function handleCallbackOnSuccess(credentialResponse) {
    const data = {
      token: credentialResponse.credential,
    };
    axios.post(API_URLS["login"], data, { withCredentials: true }).then(() => {
      routeChange();
    });
    console.log(credentialResponse.credential);
  }
  function handleCallbackOnFailure() {
    console.log("Login failed!");
  }
  return (
    <GoogleOAuthProvider clientId="405859311003-h78v02m4e3t2bpbksovtfapl6uc27uof.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleCallbackOnSuccess(credentialResponse);
        }}
        text="continue_with"
        theme="filled_blue"
        locale="en-GB"
        shape="pill"
        // onSuccess={(credentialResponse) => {
        //   console.log(credentialResponse);
        // }}
      />
    </GoogleOAuthProvider>
  );
}
