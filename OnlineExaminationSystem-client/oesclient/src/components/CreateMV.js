import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import Header from "./Header";
import Popup from "./Popup";
import Recorder from "./Recorder";
import Countdown from "./Countdown";
import { useState } from "react";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import axios from "axios";
import API_URLS from "../API_URLS.json";
import Modal from "react-bootstrap/Modal";

function CreateMV({ id, assessmentId }) {
  const [buttonViewPopup, setButtonViewPopup] = useState(false);
  const [audioURL1, setAudioURL1] = useState(new Blob());
  const [audioURL2, setAudioURL2] = useState(new Blob());

  const schema = Yup.object().shape({
    mark: Yup.number("Must be a number")
      .integer("Must be an Integer")
      .positive("Must be a positive integer")
      .required("You must enter marks for Micro Viva"),
    time: Yup.number("Must be a number")
      .integer("Must be an Integer")
      .positive("Must be a positive integer")
      .required("You must enter time for Micro Viva"),
  });

  const handleFormSubmit = (data) => {
    const submitData = async () => {
      console.log(audioURL1);
      let submissionData = new FormData();
      submissionData.append("assessmentId", assessmentId);
      submissionData.append("time", data.time);
      submissionData.append("mvMarks", data.mark);
      submissionData.append("mvQuestionAudio", audioURL1, "question.webm");
      submissionData.append("evaluatorsAnswerAudio", audioURL2, "answer.webm");
      if (audioURL1.size === 0) {
        swal({
          title: "Cannot Create Micro Viva",
          text: `Please record Micro Viva Question`,
          icon: "warning",
          button: "Ok",
        });
      } else if (audioURL2.size === 0) {
        swal({
          title: "Cannot Create Micro Viva",
          text: `Please record Micro Viva Answer`,
          icon: "warning",
          button: "Ok",
        });
      } else {
        axios
          .post(API_URLS["create_mv"], submissionData, {
            withCredentials: true,
          })
          .then((response) => {
            setButtonViewPopup(false);
            swal({
              title: "MicroViva Question Created",
              text: `You have successfully created an MicroViva question`,
              icon: "success",
              button: "Ok",
            });
          })
          .catch((error) => {
            console.log(error);
            swal({
              title: "Cannot Create MicroViva Question",
              text: error.response.data.detail,
              icon: "warning",
              button: "Ok",
            });
          });
        /* */
      }
    };
    console.log(data);
    submitData();
  };

  return (
    <div>
      <Button
        onClick={() => setButtonViewPopup(true)}
        variant="outline-success"
      >
        Add Micro-Viva
      </Button>
      <Modal
        backdrop="static"
        keyboard={false}
        show={buttonViewPopup}
        onHide={() => {
          setButtonViewPopup(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Micro Viva
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <Formik
              validationSchema={schema}
              onSubmit={handleFormSubmit}
              initialValues={{
                time: "",
                mark: "",
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
                  <div>
                    <p>Record the question</p>
                    <Recorder updateURL={setAudioURL1} />
                  </div>
                  <div>
                    <p>Record the correct answer</p>
                    <Recorder updateURL={setAudioURL2} />
                  </div>
                  <Form.Group className="mb-3" controlId="validationFormik01">
                    <Form.Label>Time in seconds</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Submission Time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      isInvalid={!!errors.time}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik02">
                    <Form.Label>Mark</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Mark"
                      name="mark"
                      value={values.mark}
                      onChange={handleChange}
                      isInvalid={!!errors.mark}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mark}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-success">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
      {/* <Popup trigger={buttonViewPopup} setTrigger={setButtonViewPopup}>
        <Formik
          validationSchema={schema}
          onSubmit={handleFormSubmit}
          initialValues={{
            time: "",
            mark: "",
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
              <div>
                <p>Record the question</p>
                <Recorder updateURL={setAudioURL1} />
              </div>
              <div>
                <p>Record the correct answer</p>
                <Recorder updateURL={setAudioURL2} />
              </div>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Time in seconds</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Submission Time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  isInvalid={!!errors.time}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.time}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik02">
                <Form.Label>Mark</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mark"
                  name="mark"
                  value={values.mark}
                  onChange={handleChange}
                  isInvalid={!!errors.mark}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mark}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-success">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Popup> */}
    </div>
  );
}

export default CreateMV;
