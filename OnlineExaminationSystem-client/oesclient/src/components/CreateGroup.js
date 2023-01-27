import Popup from "./Popup";
import Header from "./Header";
import CohortCard from "./CohortCard";
import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URLS from "../API_URLS.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import CreateMCQ from "./screens/CreateMCQ";
import CreateMV from "./CreateMV";

function CreateGroup({ assessmentId, id }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [addPage, setAddPage] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [mcqList, setMcqList] = useState([]);
  const [mvList, setMvList] = useState([]);
  const [groupId, setGroupId] = useState(-1);
  const schema = Yup.object().shape({
    name: Yup.string().max(32).required("You must enter a name"),
  });

  const handleDeleteMCQ = (mcq) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const data = {
          id: id,
          assessmentId: assessmentId,
          questionId: mcq.id,
        };
        axios
          .post(API_URLS[mcq.MCQQuestion ? "delete_mcq" : "delete_mv"], data, {
            withCredentials: true,
          })
          .then((response) => {
            swal("Question has been deleted!", {
              icon: "success",
            });
            //routeChange(response.data.id);
            setDeleteCount(deleteCount + 1);
          })
          .catch((error) => {
            console.log(error);
            swal({
              title: "Cannot Delete Question",
              text: `${error.response.data.detail}`,
              icon: "warning",
              button: "Ok",
            });
          });
      } else {
        swal("Question is not deleted!");
      }
    });
  };

  const handleFormSubmit = (data) => {
    data["assessment"] = assessmentId;
    data["id"] = id;
    const submitData = async () => {
      axios.post(API_URLS["create_group"], data, { withCredentials: true }).then(response => {
        // console.log(response.data);
        setGroupId(response.data.id);
        setAddPage(true);
      })
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

  useMemo(() => {
    const fetchQuestions = async () => {
      console.log("here");
      const data = {
        id: id,
        assessmentId: assessmentId,
      };
      axios
        .post(API_URLS["get_all_question"], data, { withCredentials: true })
        .then(async (response) => {
          let tempList = await response.data.mcqList.filter(e => e.groupId == groupId);
          setMcqList(tempList);
          tempList = await response.data.mvList.filter(e => e.groupId == groupId);
          setMvList(tempList);
          setAdded(!added);
        });
    };
    fetchQuestions();
  }, [deleteCount]);

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

      <Popup trigger={addPage} setTrigger={setAddPage}>
      <div className="py-2">
          <div>MCQ Questions</div>
          <ListGroup as="ol">
            {mcqList.map((mcq) => (
              <Row key={mcq.id}>
                <Col>
                  <ListGroup.Item as="li">{mcq.MCQQuestion}</ListGroup.Item>
                </Col>
                <Col>
                  <div className="pt-1">
                    <Button
                      variant="outline-danger"
                      onClick={(event) => handleDeleteMCQ(mcq)}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
          </ListGroup>
          <div className="py-2">
            <CreateMCQ id={id} assessmentId={assessmentId} groupId={groupId} />
          </div>
          
        </div>
        <div className="py-2">
          <div>Micro Viva Questions</div>
          <ListGroup as="ol">
            {mvList.map((mv, index) => (
              <Row key={mv.id}>
                <Col>
                  <ListGroup.Item as="li">{`Question ${
                    index + 1
                  }`}</ListGroup.Item>
                </Col>
                <Col>
                  <div className="pt-1">
                    <Button
                      variant="outline-danger"
                      onClick={(event) => handleDeleteMCQ(mv)}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
          </ListGroup>
          <div className="py-2">
            <CreateMV id={id} assessmentId={assessmentId} groupId={groupId} />
          </div>
        </div>
      </Popup>
      <Button variant="outline-success" onClick={() => setButtonPopup(true)}>Add group</Button>
    </div>
  );
}

export default CreateGroup;
