import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import image from "../Assessment.jpg";
import API_URLS from "../API_URLS.json";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Dynamic({ examCohort, isEvaluator }) {
  //https://nba-players.herokuapp.com/players-stats

  const [cohortData, setCohortData] = useState([]);
  //const [assessmentId, setAssessmentId] = useState([]);
  //const [assessmentName, setAssesmentName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        id: examCohort,
      };
      axios
        .post(
          API_URLS[isEvaluator ? "assessment" : "assessment_candidate"],
          requestData,
          { withCredentials: true }
        )
        .then((response) => {
          setCohortData(response.data);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="g-4">
        {cohortData.map((cohortData) => (
          <Col key={cohortData.id} xs={12} md={4} lg={3}>
            <div className="effect">
              <Link
                to={`${cohortData.id}`}
                style={{ textDecoration: "none", color: "#ff7363" }}
              >
                <Card className="shadow p-3 mb-5 rounded">
                  <Card.Img src={image} />
                  <Card.Body>
                    <Card.Title>{cohortData.assessmentName}</Card.Title>
                    {/* <Card.Text>{cohortData.assessmentName}</Card.Text> */}
                    <div className="text-center">
                      <Button className="button-style">Enter</Button>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Start:{" "}
                    {new Date(cohortData.availableDateTime).toLocaleString()}
                    <br />
                    End: {new Date(cohortData.dueDateTime).toLocaleString()}
                  </Card.Footer>
                </Card>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
