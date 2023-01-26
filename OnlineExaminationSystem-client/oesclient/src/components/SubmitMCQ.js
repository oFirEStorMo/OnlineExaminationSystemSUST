import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import API_URLS from "../API_URLS.json";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Button,
} from "react-bootstrap";
import Countdown from "react-countdown";

export default function SubmitMCQ({ id, question, assessmentId, dueDateTime }) {
  const [choiceList, setChoiceList] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});
  const [submittedAnswer, setSubmittedAnswer] = useState(-1);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        id: id,
        assessmentId: assessmentId,
        questionId: question.id,
      };
      // console.log(data);
      axios
        .post(API_URLS["get_choice"], data, { withCredentials: true })
        .then(async (response) => {
          let tempChoiceList = response.data.choiceList;
          let tempSubAnswer = tempChoiceList.find(elem => elem.choice === '5a72c3f196603e351736f4ffdd5985cc');
          // console.log(tempChoiceList);
          // console.log(tempSubAnswer);
          setSubmittedAnswer(tempSubAnswer.id);
          tempChoiceList = await tempChoiceList.filter(elem => elem.choice !== '5a72c3f196603e351736f4ffdd5985cc');
          setChoiceList(tempChoiceList);
          console.log(submittedAnswer);
          axios
            .post(API_URLS["start_mcq"], data, { withCredentials: true })
            .then((response) => {
              setRemainingTime(now + response.data.remainingTime * 1000);
              console.log(response.data);
            });
        })
        .catch((error) => { });
      /* */
    };
    fetchData();
  }, []);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return;
    } else {
      //   let percentage = (100 * (availableDateTime - Date.now())) / timedelta;
      // Render a countdown
      return (
        <p className="time-color">
          Remaining Time : {hours}:{minutes}:{seconds}
        </p>
      );
    }
  };

  const dueRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return;
    } else {
      //   let percentage = (100 * (availableDateTime - Date.now())) / timedelta;
      // Render a countdown
      return (
        <p className="time-color d-flex flex-row-reverse">
          Remaining Due Time : {hours}:{minutes}:{seconds}
        </p>
      );
    }
  };

  const handleSubmit = () => {
    const submitMCQ = async () => {
      let data = {
        id: id,
        assessmentId: assessmentId,
        questionId: question.id,
        choiceId: submittedAnswer,
      };
      console.log(data);
      axios
        .post(API_URLS["submit_mcq"], data, { withCredentials: true })
        .then((response) => {
          setInterval(() => {
            window.location.reload();
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
      /* */
    };
    submitMCQ();
  };

  return (
    <div className="center-form py-5">
      {console.log(remainingTime)}
      <Container>
        <Row>
          <Col>
            <Countdown
              date={remainingTime}
              renderer={renderer}
              onComplete={handleSubmit}
            />
          </Col>
          <Col>
            <Countdown
              date={dueDateTime}
              renderer={dueRenderer}
              onComplete={handleSubmit}
            />
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{question.MCQQuestion}</Form.Label>
              {!!choiceList &&
                choiceList.map((choice, index) => (
                  <InputGroup key={index} className="mb-3">
                    <InputGroup.Radio
                      name="upload_answer"
                      checked={submittedAnswer === `${choice.id}`}
                      value={choice.id}
                      onChange={(e) => {
                        setSubmittedAnswer(e.target.value);
                      }}
                    />
                    <Form.Control
                      type="text"
                      placeholder={choice.choice}
                      disabled
                      readOnly
                    />
                  </InputGroup>
                ))}
              <div className="d-flex flex-row-reverse">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Next
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
