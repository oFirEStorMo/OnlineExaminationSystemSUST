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
import ReactAudioPlayer from "react-audio-player";
import Recorder from "./Recorder";

export default function SubmitMV({ id, question, assessmentId, dueDateTime }) {
  const [microVivaQuestion, setMicroVivaQuestion] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState(new Blob());
  const [remainingTime, setRemainingTime] = useState({});
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    console.log(microVivaQuestion);
  }, [microVivaQuestion]);

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        id: id,
        assessmentId: assessmentId,
        questionId: question.id,
      };
      console.log(data);
      axios
        .post(API_URLS["get_mv_question"], data, {
          withCredentials: true,
          responseType: "arraybuffer",
        })
        .then((response) => {
          setMicroVivaQuestion(
            URL.createObjectURL(
              new Blob([response.data], { type: "audio/webm", codecs: "opus" })
            )
          );
          axios
            .post(API_URLS["start_mv"], data, { withCredentials: true })
            .then((response) => {
              console.log(`remaining time: ${response.data.remainingTime}`);
              setRemainingTime(now + response.data.remainingTime * 1000);
              console.log(response.data.remainingTime);
            })
            .then(() => {
              console.log(microVivaQuestion, remainingTime);
            });
        })
        .catch((error) => {});
      /* */
    };
    fetchData();
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return;
    } else {
      //   let percentage = (100 * (availableDateTime - Date.now())) / timedelta;
      // Render a countdown
      return (
        <p className="time-color">
          Remaining Time : {days * 24 + hours}:{minutes}:{seconds}
        </p>
      );
    }
  };

  const dueRenderer = (props) => {
    if (props.completed) {
      return;
    } else {
      //   let percentage = (100 * (availableDateTime - Date.now())) / timedelta;
      // Render a countdown
      return (
        <p className="time-color d-flex flex-row-reverse">
          Remaining Due Time : {props.days * 24 + props.hours}:{props.minutes}:
          {props.seconds}
        </p>
      );
    }
  };

  const handleSubmit = () => {
    const submitMCQ = async () => {
      let data = new FormData();
      data.append("id", id);
      data.append("assessmentId", assessmentId);
      data.append("questionId", question.id);
      data.append("mvAnswer", submittedAnswer, "answer.webm");
      console.log(data);
      axios
        .post(API_URLS["submit_mv"], data, { withCredentials: true })
        .then((respnse) => {
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
            {console.log(dueDateTime)}
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
              <div className="py-2">
                <Form.Label>Question</Form.Label>
              </div>
              <div className="py-2 px-4">
                <audio src={microVivaQuestion} controls />
              </div>
              <div className="py-2">
                <Form.Label>Record your Answer</Form.Label>
              </div>
              <div className="py-2">
                <Recorder updateURL={setSubmittedAnswer}></Recorder>
              </div>
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
