import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URLS from "../API_URLS.json";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  return document.cookie.includes("isLoggedIn=Yes") ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
}

export default PublicRoute;
