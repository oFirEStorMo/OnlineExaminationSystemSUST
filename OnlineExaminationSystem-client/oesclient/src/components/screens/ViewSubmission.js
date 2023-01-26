import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URLS from "../../API_URLS.json";
import axios from "axios";
import Header from "../Header";
import { Button, Container, ListGroup } from "react-bootstrap";

function ViewSubmission() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const fetchCandidates = async () => {
      console.log("here");
      const data = {
        id: id,
      };
      axios
        .post(API_URLS["view_user"], data, { withCredentials: true })
        .then((response) => {
          setCandidates(response.data);
          console.log(candidates);
        });
    };
    fetchCandidates();
  }, []);
  return (
    <div>
      <Header isLoggedIn={true} />
      <Container>
        <div className="center-headings">
          <h4>Assessment Ended</h4>
          <h6>View submissions from the candidates</h6>
        </div>
        <ListGroup as="ol" numbered>
          {candidates.map((candidate, index) => (
            <ListGroup.Item
              key={index}
              action
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{candidate.name}</div>
                {candidate.email}
              </div>
              <div className="d-flex flex-row-reverse">
                <Link to={`${candidate.id}`}>
                  <Button variant="outline-success">View</Button>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default ViewSubmission;
