import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import ExamScreen from "./screens/ExamScreen";

function StartingSoon({ availableDateTime, refresh, setRefresh }) {
  const [now, setNow] = useState(Date.now());

  let timedelta = availableDateTime - now;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      window.location.reload(true);
      return;
    } else {
      let percentage = (100 * (availableDateTime - Date.now())) / timedelta;
      // Render a countdown
      return (
        <CircularProgressbar
          value={percentage}
          text={`${hours}:${minutes}:${seconds}`}
          styles={buildStyles({
            pathColor: "#ff7363",
            textColor: "#ff7363",
          })}
        />
      );
    }
  };
  return (
    <div>
      <Container>
        <div className="center-text">
          <h3>Starting soon</h3>
        </div>
        <div className="center progress-bar">
          <Countdown date={availableDateTime} renderer={renderer}></Countdown>
        </div>
      </Container>
    </div>
  );
}

export default StartingSoon;
