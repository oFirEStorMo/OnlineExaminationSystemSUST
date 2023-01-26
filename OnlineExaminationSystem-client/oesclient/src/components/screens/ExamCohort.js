import Popup from "../Popup";
import Header from "../Header";
import CohortCard from "../CohortCard";
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
import API_URLS from "../../API_URLS.json";
import Assessment from "./Assessment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);

  //https://nba-players.herokuapp.com/players-stats

  const [evaluatorData, setEvaluatorData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  const [cohortCreated, setCohortCreated] = useState(0);

  //const [cohortId, setCohortId] = useState([]);
  //const [cohortName, setCohortName] = useState([]);

  const schema = Yup.object().shape({
    cohortName: Yup.string().max(32).required("You must enter a name"),
  });

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(API_URLS["dashboard_e"], { withCredentials: true })
        .then((response) => {
          setEvaluatorData(response.data);
        });

      axios
        .get(API_URLS["dashboard_c"], { withCredentials: true })
        .then((response) => {
          setCandidateData(response.data);
        });
      /* */
    };
    fetchData();
  }, [cohortCreated]);

  const handleFormSubmit = (data) => {
    const submitData = async () => {
      axios
        .post(API_URLS["create_cohort"], data, { withCredentials: true })
        .then((response) => {
          setCohortCreated(cohortCreated + 1);
        });
      /* */
    };
    submitData();
    setButtonPopup(false);
    swal({
      title: "Exam Cohort Created",
      text: `You have successfully created an Exam Cohort named \'${data.cohortName}\'`,
      icon: "success",
      button: "Ok",
    });
  };

  return (
    <div>
      <Header />
      <Container>
        <div className="d-flex flex-row-reverse">
          <Button
            onClick={() => setButtonPopup(true)}
            className="sticky-md-top button-type"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </Button>
        </div>
        <div className="py-5">
          <Container>
            <Row className="g-4">
              {evaluatorData.map((evaluatorData) => (
                <Col key={evaluatorData.id} xs={12} md={4} lg={3}>
                  <Link
                    to={`/dashboard/${evaluatorData.id}`}
                    style={{ textDecoration: "none", color: "#ff7363" }}
                  >
                    <CohortCard data={evaluatorData} isEvaluator={true} />
                  </Link>
                </Col>
              ))}
              {candidateData.map((candidateData) => (
                <Col key={candidateData.id} xs={12} md={4} lg={3}>
                  <Link
                    to={`view/${candidateData.id}`}
                    style={{ textDecoration: "none", color: "#ff7363" }}
                  >
                    <CohortCard data={candidateData} isEvaluator={false} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Formik
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
              cohortName: "",
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
                  <Form.Label>Exam Cohort Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cohortName"
                    value={values.cohortName}
                    onChange={handleChange}
                    isInvalid={!!errors.cohortName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.cohortName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-success" type="save">
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Popup>
      </Container>
    </div>
  );
}

export default App;
