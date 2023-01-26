import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import image from "../ExamCohort.jpg";
import API_URLS from "../API_URLS.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Dynamic({ data, isEvaluator }) {
  return (
    <div className="effect">
      <Card className="shadow p-3 mb-5 rounded">
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title>{data.cohortName}</Card.Title>
          {/* <Card.Text>{data.cohortName}</Card.Text> */}

          <Button variant="outline-success">Enter</Button>
          {isEvaluator ? (
            <FontAwesomeIcon className="ps-3" icon={faUser}></FontAwesomeIcon>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
