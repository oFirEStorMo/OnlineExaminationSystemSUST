import React, { Component } from "react";
import LoginWithGoogle from "../LoginWithGoogle";
import Header from "../Header";
import Footer from "../Footer";
import { Container, Col, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import image from "../../Online Exam.jpg";

function Home() {
  return (
    <div>
       <Header isLoggedIn={false}/>
        <div className="py-5">
          <Container>
            <Row>
              <Col md={12} lg={6}>
                <h2>Welcome to</h2>
                <h1>Online Examination System</h1>
                <br />
                <h4>Assessment Made Easy</h4>
                <br />
                <p>Is preparing an assessment a hassle for you?</p>
                <p>
                  Not any more! OES is a user-friendly app that makes easier for
                  you to prepare assessment and its automatic evaluation feature
                  saves you from the monotonous task of going through ample of
                  scripts.
                </p>
                <p>To explore more about this app...</p>
              </Col>
              <Col md={12} lg={6}>
                <img
                  src={image}
                  width="100%"
                  height="100%"
                  className="d-inline-block align-top"
                  alt="Online Exam Picture"
                />
              </Col>
            </Row>
          </Container>
          <Container className="py-1">
            <div className="d-inline-flex pt-3">
              <LoginWithGoogle />
            </div>
          </Container>
        </div>
        <Footer />
    </div>
  )
}

export default Home
