import React from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../Header";
import Popup from "../Popup";
import Recorder from "../Recorder";
import Countdown from "../Countdown";
import CreateGroup from "../CreateGroup";
import { useEffect, useState, useMemo } from "react";
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
import CreateMCQ from "./CreateMCQ";
import CreateMV from "../CreateMV";

function PublishAssessment() {
  const { id, assessmentId } = useParams();
  const [deleteCount, setDeleteCount] = useState(0);
  const [name, setName] = useState("");
  const [availableDateTime, setAvailableDateTime] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");

  const [mcqList, setMcqList] = useState([]);
  const [mvList, setMvList] = useState([]);

  const schema = Yup.object().shape({
    assessmentName: Yup.string()
      .max(32, "At max 32 characters")
      .required("You must enter a name"),
  });

  let navigate = useNavigate();
  const routeChange = (assessmentId) => {
    let path = `dashboard/${id}/${assessmentId}`;
    navigate(path);
  };

  useMemo(() => {
    const fetchAssessment = async () => {
      console.log("here");
      const data = {
        id: id,
        assessmentId: assessmentId,
      };
      axios
        .post(API_URLS["single_assessment"], data, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          let dateTime1 = new Date(response.data[0].availableDateTime);
          let dateTime2 = new Date(response.data[0].dueDateTime);

          setAvailableDateTime(
            // response.data[0].availableDateTime.substring(
            //   0,
            //   response.data[0].availableDateTime.length - 4
            // )
            `${dateTime1.getFullYear()}-${dateTime1.getMonth() < 9 ? "0" : ""}${
              dateTime1.getMonth() + 1
            }-${dateTime1.getDate() < 10 ? "0" : ""}${dateTime1.getDate()}T${
              dateTime1.getHours() < 10 ? "0" : ""
            }${dateTime1.getHours()}:${
              dateTime1.getMinutes() < 10 ? "0" : ""
            }${dateTime1.getMinutes()}`
          );
          setDueDateTime(
            // response.data[0].dueDateTime.substring(
            //   0,
            //   response.data[0].dueDateTime.length - 4
            // )
            `${dateTime2.getFullYear()}-${dateTime2.getMonth() < 9 ? "0" : ""}${
              dateTime2.getMonth() + 1
            }-${dateTime2.getDate() < 10 ? "0" : ""}${dateTime2.getDate()}T${
              dateTime2.getHours() < 10 ? "0" : ""
            }${dateTime2.getHours()}:${
              dateTime2.getMinutes() < 10 ? "0" : ""
            }${dateTime2.getMinutes()}`
          );
          setName(response.data[0].assessmentName);
        });
    };
    fetchAssessment();
  }, []);

  useMemo(() => {
    const fetchQuestions = async () => {
      console.log("here");
      const data = {
        id: id,
        assessmentId: assessmentId,
      };
      axios
        .post(API_URLS["get_all_question"], data, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          setMcqList(response.data.mcqList);
          setMvList(response.data.mvList);
        });
    };
    fetchQuestions();
  }, [deleteCount]);

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

  const handlePublishAssessment = (formData) => {
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
      console.log(convertTimezone(formData.dueDateTime));
      const data = {
        id: id,
        assessmentId: assessmentId,
        name: formData.assessmentName,
        availableDateTime: convertTimezone(formData.availableDateTime),
        dueDateTime: convertTimezone(formData.dueDateTime),
      };
      axios
        .post(API_URLS["publish_assessment"], data, { withCredentials: true })
        .then((response) => {
          swal({
            title: "Assessment Published",
            text: `You have successfully published an Assessment`,
            icon: "success",
            button: "Ok",
          });
          routeChange(assessmentId);
        })
        .catch((error) => {
          console.log(error);
          swal({
            title: "Cannot Publish Assessment",
            text: `${error.response.data.detail}`,
            icon: "warning",
            button: "Ok",
          });
        });
    }
  };

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

  return (
    <div>
      <Header />
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={handlePublishAssessment}
          initialValues={{
            assessmentName: name,
            availableDateTime: availableDateTime,
            dueDateTime: dueDateTime,
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
                  value={name}
                  onChange={(e) => {
                    values.assessmentName = e.target.value;
                    setName(e.target.value);
                  }}
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
                  value={availableDateTime}
                  onChange={(e) => {
                    values.availableDateTime = e.target.value;
                    setAvailableDateTime(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Due Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dueDateTime"
                  value={dueDateTime}
                  onChange={(e) => {
                    values.dueDateTime = e.target.value;
                    setDueDateTime(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="py-2">
                <Button
                  variant="outline-success"
                  type="save"
                  onClick={() => {
                    values.assessmentName = name;
                    values.availableDateTime = availableDateTime;
                    values.dueDateTime = dueDateTime;
                  }}
                >
                  Publish
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="py-2">
          <div>Single Questions</div>
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
            <CreateGroup assessmentId={assessmentId} id={id} />
            {/* <CreateMCQ id={id} assessmentId={assessmentId} /> */}
          </div>
          
        </div>
        <div className="py-2">
          <div>Group Questions</div>
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
            <CreateMV id={id} assessmentId={assessmentId} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PublishAssessment;

/* 
  

*/
