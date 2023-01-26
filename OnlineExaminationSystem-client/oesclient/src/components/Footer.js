import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="fixed-bottom">
      <FooterContainer className="main-footer">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3 ol-sm-6">
                <h4>Contact Us</h4>
                <ul className="list-unstyled">
                  <li>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    &nbsp;&nbsp;+88 01980054583
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    &nbsp;&nbsp;contact@oes.edu
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="text-center">
                &copy;{new Date().getFullYear()} Online Examination App - All
                Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </FooterContainer>
    </footer>
  );
}

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--mainOrange);
    padding-top: 1rem;
    color: var(--mainWhite);
  }

  .footer-bottom {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;
