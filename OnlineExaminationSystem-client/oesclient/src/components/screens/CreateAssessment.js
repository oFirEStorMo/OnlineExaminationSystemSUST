import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import Header from "../Header";
import Popup from "../Popup";
import Recorder from "../Recorder";
import Countdown from "../Countdown";
import { useState } from "react";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import MCQCard from "../MCQCard";
import MVCard from "../MVCard";
import axios from "axios";
import API_URLS from "../../API_URLS.json";
import { useNavigate } from "react-router-dom";

function CreateAssessment() {
  const { id } = useParams();
  const schema = Yup.object().shape({
    assessmentName: Yup.string()
      .max(32, "At max 32 characters")
      .required("You must enter a name"),
  });

  let navigate = useNavigate();
  const routeChange = (assessmentId) => {
    let path = `/dashboard/${id}/${assessmentId}`;
    navigate(path);
  };

  const convertTimezone = (dateTime) => {
    let date = new Date();
    let offset = date.getTimezoneOffset();
    let hour = Math.floor(Math.abs(offset) / 60);
    let minute = Math.abs(offset) % 60;
    dateTime = `${dateTime}:00${offset < 0 ? "+" : "-"}${
      hour < 10 ? "0" : ""
    }${hour}${minute < 10 ? "0" : ""}${minute}`;
    return dateTime;
  };

  const handleCreateAssessment = (formData) => {
    let date1 = Date.parse(formData.availableDateTime);
    let date2 = Date.parse(formData.dueDateTime);
    if (isNaN(date1)) {
      swal({
        title: "Cannot Create Assessment",
        text: `Please enter Available Date Time`,
        icon: "warning",
        button: "Ok",
      });
    } else if (isNaN(date2)) {
      swal({
        title: "Cannot Create Assessment",
        text: `Please enter Due Date Time`,
        icon: "warning",
        button: "Ok",
      });
    } else {
      console.log(typeof formData.availableDateTime);
      const data = {
        id: id,
        name: formData.assessmentName,
        availableDateTime: convertTimezone(formData.availableDateTime),
        dueDateTime: convertTimezone(formData.dueDateTime),
      };
      axios
        .post(API_URLS["create_assessment"], data, { withCredentials: true })
        .then((response) => {
          swal({
            title: "Assessment Created",
            text: `You have successfully created an Assessment`,
            icon: "success",
            button: "Ok",
          });
          console.log(response.data.id);
          routeChange(response.data.id);
        })
        .catch((error) => {
          swal({
            title: "Cannot Create Assessment",
            text: `${error.response.data.detail}`,
            icon: "warning",
            button: "Ok",
          });
        });
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={handleCreateAssessment}
          initialValues={{
            assessmentName: "",
            availableDateTime: "",
            dueDateTime: "",
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
            <Form className="py-5" noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Assessment Name</Form.Label>
                <Form.Control
                  type="assessment"
                  placeholder="Enter Assessment Name"
                  name="assessmentName"
                  value={values.assessmentName}
                  onChange={handleChange}
                  isInvalid={!!errors.assessmentName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.assessmentName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik02">
                <Form.Label>Available Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="availableDateTime"
                  value={values.availableDateTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Due Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dueDateTime"
                  value={values.dueDateTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="py-2">
                <Button variant="outline-success" type="save">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default CreateAssessment;

/* 
  

*/
