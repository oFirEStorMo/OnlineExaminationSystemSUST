import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Popup from "../Popup";
import axios from "axios";
import API_URLS from "../../API_URLS.json";
import SubmitMCQ from "../SubmitMCQ";
import SubmitMV from "../SubmitMV";
import StartingSoon from "../StartingSoon";
import Header from "../Header";
import AssessmentScoreC from "./AssessmentScoreC";

export default function ExamScreen() {
  const { id, assessmentId } = useParams();
  const [question, setQuestion] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [assessment, setAssessment] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        id: id,
        assessmentId: assessmentId,
      };
      axios
        .post(API_URLS["single_assessment_candidate"], data, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setAssessment(response.data);
          let availableDateTime = new Date(response.data[0].availableDateTime);
          let dueDateTime = new Date(response.data[0].dueDateTime);
          let now = new Date();
          setIsRunning(
            availableDateTime <= now && dueDateTime > now ? true : false
          );
          console.log(availableDateTime, now);
          setIsStarted(availableDateTime <= now ? true : false);
          setIsFinished(dueDateTime <= now ? true : false);
        })
        .then(() => {
          isRunning && fetchQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
      /* */
    };
    fetchData();
    console.log("Refresh: " + refresh);
  }, [refresh, isRunning, isFinished]);

  const fetchQuestions = async () => {
    let data = {
      assessmentId: assessmentId,
    };
    axios
      .post(API_URLS["get_question"], data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setQuestion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    /* */
  };

  return (
    <div>
      <Header />
      {console.log(isStarted)}
      {!isStarted && (
        <StartingSoon
          availableDateTime={new Date(assessment[0].availableDateTime)}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {console.log(isRunning, !!question.id, !!question.MCQQuestion, question)}
      {isRunning &&
        !!!question.isFinished &&
        !!question.id &&
        !!question.MCQQuestion && (
          <SubmitMCQ
            id={id}
            question={question}
            assessmentId={assessmentId}
            dueDateTime={new Date(assessment[0].dueDateTime)}
          />
        )}
      {isRunning &&
        !!!question.isFinished &&
        !!question.id &&
        !!!question.MCQQuestion && (
          <SubmitMV
            id={id}
            question={question}
            assessmentId={assessmentId}
            dueDateTime={new Date(assessment[0].dueDateTime)}
          />
        )}
      {(isFinished || !!question.isFinished) && (
        <AssessmentScoreC id={id} assessmentId={assessmentId} />
      )}
    </div>
  );
}
