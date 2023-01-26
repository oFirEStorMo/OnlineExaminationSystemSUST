import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URLS from "../API_URLS.json";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  return document.cookie.includes("isLoggedIn=Yes") ? (
    children
  ) : (
    <Navigate to="/" exact />
  );
}

export default AuthRoute;
