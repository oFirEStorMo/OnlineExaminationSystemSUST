import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URLS from "../../API_URLS.json";
import PublishAssessment from "./PublishAssessment";
import RunningAssessmentScreen from "./RunningAssessmentScreen";
import ViewSubmission from "./ViewSubmission";

function AssessmentScreen() {
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
        .post(API_URLS["single_assessment"], data, {
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
        .catch((error) => {
          console.log(error);
        });
      /* */
    };
    fetchData();
    console.log(refresh);
  }, [refresh, isRunning, isFinished]);
  return (
    <div>
      {assessment.isPublished || (!isStarted && <PublishAssessment />)}
      {isRunning && <RunningAssessmentScreen />}
      {isFinished && <ViewSubmission />}
    </div>
  );
}

export default AssessmentScreen;
