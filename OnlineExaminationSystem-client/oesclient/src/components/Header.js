import React, { Component, useState } from "react";
import logo from "../OES-logos_white.png";
import { Navbar, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import LogoutButton from "./LogoutButton";

function Header({ isLoggedIn = true }) {
  return (
    <Navbar className="nav-color" variant="dark">
      <Container>
        <Navbar.Brand className="nav-text" href="/">
          <img
            alt="logo"
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top"
          />{" "}
          Online Examination System
        </Navbar.Brand>
        <Navbar.Text>{isLoggedIn && <LogoutButton />}</Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Header;
