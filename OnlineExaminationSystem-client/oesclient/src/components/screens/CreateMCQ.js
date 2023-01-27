import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MCQForm from "../MCQForm";
import swal from "sweetalert";
import Popup from "../Popup";
import axios from "axios";
import API_URLS from "../../API_URLS.json";
import { useNavigate } from "react-router-dom";

function CreateMCQ({ id, assessmentId, groupId }) {
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleFormSubmit = (data) => {
    const submitData = async () => {
      let submissionData = {
        questionGroup: groupId,
        assessmentId: assessmentId,
        mcqQuestion: data.mcqQuestion,
        choiceList: data.mcqChoice,
        time: data.mcqTime,
        mcqMarks: data.mcqMarks,
        correctAnswer: data.correctChoice,
      };
      axios
        .post(API_URLS["create_mcq"], submissionData, { withCredentials: true })
        .then((response) => {
          setButtonPopup(false);
          swal({
            title: "MCQ Question Created",
            text: `You have successfully created an MCQ question`,
            icon: "success",
            button: "Ok",
          });
        })
        .catch((error) => {
          swal({
            title: "Cannot Create MCQ Question",
            text: error.response.data.detail,
            icon: "warning",
            button: "Ok",
          });
        });
      /* */
    };
    console.log(data);
    if (data.correctChoice === "") {
      swal({
        title: "Cannot Create MCQ Question",
        text: `Please select your correct answer`,
        icon: "warning",
        button: "Ok",
      });
    } else {
      submitData();
    }
  };
  return (
    <div>
      {console.log(groupId)}
      <Button onClick={() => setButtonPopup(true)} variant="outline-success">
        Add MCQ
      </Button>
      <Modal
        backdrop="static"
        keyboard={false}
        show={buttonPopup}
        onHide={() => {
          setButtonPopup(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new MCQ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <MCQForm handleFormSubmit={handleFormSubmit} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateMCQ;
