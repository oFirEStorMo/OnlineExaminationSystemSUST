import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URLS from "../../API_URLS.json";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../Header";
import swal from "sweetalert";

function EditMarks() {
  let submissionData = {};
  const { id, assessmentId, candidateId } = useParams();
  const [mcqSubmissionList, setMcqSubmissionList] = useState([]);
  const [mvSubmissionList, setMvSubmissionList] = useState([]);
  const [mvQuestionAudioList, setMvQuestionAudioList] = useState([]);
  const [mvAnswerAudioList, setMvAnswerAudioList] = useState([]);
  const [mvEvaluatorAnswerAudioList, setMvEvaluatorAnswerAudioList] = useState(
    []
  );
  const [mvList, setMvList] = useState([]);
  const [mcqList, setMcqList] = useState([]);
  const [myInterval, setMyInterval] = useState();
  const [done, setDone] = useState(false);

  const [totalMarks, setTotalMarks] = useState(0);
  const [obtainedMarks, setObtainedMarks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        id: id,
        assessmentId: assessmentId,
        candidateId: candidateId,
      };
      axios
        .post(API_URLS["get_submission"], data, { with_credentials: true })
        .then((response) => {
          setMcqSubmissionList(response.data.mcqSubmissionList);
          setMvSubmissionList(response.data.mvSubmissionList);
          setTotalMarks(response.data.totalMarks);
          setObtainedMarks(response.data.obtainedMarks);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(mcqList);
  }, [mcqList]);

  const updateMCQ = async (data) => {
    swal({
      title: "Are you sure?",
      text: "Do you really wanna change verdict?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Verdict changed!", {
          icon: "success",
        });
        axios
          .post(API_URLS["update_mcq"], data, { withCredentials: true })
          .then(() => {
            window.location.reload();
          });
      } else {
        swal("Feel free to browse");
      }
    });
  };

  const updateMV = async (data) => {
    swal({
      title: "Are you sure?",
      text: "Do you really wanna change verdict?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Verdict changed!", {
          icon: "success",
        });
        axios
          .post(API_URLS["update_mv"], data, { withCredentials: true })
          .then(() => {
            window.location.reload();
          });
      } else {
        swal("Feel free to browse");
      }
    });
  };

  return (
    <div>
      <Header />
      {
        <Container className="py-5">
          <Row className="py-2">
            <div>
              {" "}
              <h4>
                Obtained Marks : {obtainedMarks}/{totalMarks}
              </h4>
            </div>
          </Row>
          <Row className="py-2">
            <div>
              {" "}
              <h4>MCQ Submissions:</h4>
            </div>
          </Row>
          <Row>
            {mcqSubmissionList.map((mcqSubmission, index) => (
              <div key={index} className="py-2">
                <Row>
                  <p>
                    {" "}
                    {index + 1}. {mcqSubmission.mcqQuestion[0].MCQQuestion}
                  </p>
                </Row>
                {mcqSubmission.mcqChoiceList.map((choice, index2) => (
                  <Row key={index2} className="mx-2">
                    <p>
                      {index2 + 1}. {choice.choice}
                    </p>
                  </Row>
                ))}
                <Row>
                  <p>
                    Correct Answer:{" "}
                    {mcqSubmission.mcqQuestion[0].evaluatorsAnswer}
                  </p>
                </Row>
                <Row>
                  <p>Candidate's Answer: {mcqSubmission.candidatesAnswer}</p>
                </Row>
                <Row>
                  <p>
                    Verdict:{" "}
                    {mcqSubmission.obtainedMarks > 0 ? "Correct" : "Wrong"}
                  </p>
                </Row>
                <Row>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      updateMCQ({
                        id: id,
                        assessmentId: assessmentId,
                        candidateId: candidateId,
                        mcqSubmissionId: mcqSubmission.id,
                        totalMarks: mcqSubmission.mcqQuestion[0].totalMarks,
                      });
                    }}
                  >
                    Change Verdict?
                  </Button>
                </Row>
              </div>
            ))}
          </Row>
          <Row className="py-2">
            <div>
              {" "}
              <h4>MicroViva Submissions:</h4>
            </div>
          </Row>
          {mvSubmissionList.map(
            (mvSubmission, index) =>
              mvSubmission && (
                <Row key={index} className="py-2">
                  <Row>
                    <h5>
                      <strong>Question {index + 1}:</strong>
                    </h5>
                  </Row>
                  <Row>
                    <div className="py-2 px-4">
                      <audio
                        src={`http://localhost:8000/${mvSubmission.mvQuestion[0].mvQuestionAudio}`}
                        controls
                      />
                    </div>
                  </Row>
                  <Row>
                    <strong>Expected Answer: </strong>
                  </Row>
                  <Row>
                    <div className="py-2 px-4">
                      <audio
                        src={`http://localhost:8000/${mvSubmission.mvQuestion[0].evaluatorsAnswerAudio}`}
                        controls
                      />
                    </div>
                  </Row>
                  <Row>
                    <strong>Candidate's Answer: </strong>
                  </Row>
                  <Row>
                    <div className="py-2 px-4">
                      <audio
                        src={`http://localhost:8000/${mvSubmission.submittedAnswerAudio}`}
                        controls
                      />
                    </div>
                  </Row>
                  <Row>
                    <p>
                      Verdict:{" "}
                      {mvSubmission.obtainedMarks > 0 ? "Correct" : "Wrong"}
                    </p>
                  </Row>
                  <Row>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        updateMV({
                          id: id,
                          assessmentId: assessmentId,
                          candidateId: candidateId,
                          mvSubmissionId: mvSubmission.id,
                          totalMarks: mvSubmission.mvQuestion[0].totalMarks,
                        });
                      }}
                    >
                      Change Verdict?
                    </Button>
                  </Row>
                </Row>
              )
          )}
        </Container>
      }
    </div>
  );
}

export default EditMarks;
