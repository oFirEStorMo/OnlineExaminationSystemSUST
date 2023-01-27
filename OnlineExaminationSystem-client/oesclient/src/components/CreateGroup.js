import Popup from "./Popup";
import Header from "./Header";
import CohortCard from "./CohortCard";
import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URLS from "../API_URLS.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

function CreateGroup({ assessmentId, id }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const schema = Yup.object().shape({
    name: Yup.string().max(32).required("You must enter a name"),
  });
  const handleFormSubmit = (data) => {
    data["assessment"] = assessmentId;
    data["id"] = id;
    const submitData = async () => {
      axios.post(API_URLS["create_group"], data, { withCredentials: true });
      /* */
    };
    submitData();
    setButtonPopup(false);
    swal({
      title: "Question Group Created",
      text: `You have successfully created an Question Group named \'${data.name}\'`,
      icon: "success",
      button: "Ok",
    });
  };
  return (
    <div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormSubmit}
          initialValues={{
            name: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Question Group Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="outline-success" type="save">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Popup>
      <Button onClick={() => setButtonPopup(true)}>Add group</Button>
    </div>
  );
}

export default CreateGroup;
