import React from "react";
import { Button } from "react-bootstrap";
import API_URLS from "../API_URLS.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function LogoutButton() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  function handleCallbackOnClick() {
    swal({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You are logged out!", {
          icon: "success",
        });
        axios
          .post(API_URLS["logout"], "", { withCredentials: true })
          .then(() => {
            routeChange();
          });
      } else {
        swal("Feel free to browse");
      }
    });
  }

  return (
    <Button
      onClick={() => {
        handleCallbackOnClick();
      }}
      variant="outline-dark"
    >
      Logout
    </Button>
  );
}
