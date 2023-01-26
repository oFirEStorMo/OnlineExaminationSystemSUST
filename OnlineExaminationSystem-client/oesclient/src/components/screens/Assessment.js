import React, { useEffect } from "react";
import Header from "../Header";
import Popup from "../Popup";
import AssessmentCard from "../AssessmentCard";
import { Container, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import API_URLS from "../../API_URLS.json";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axios from "axios";
import swal from "sweetalert";
import Table from "../table";

function Assessment({ isEvaluator }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonViewPopup, setButtonViewPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const { id } = useParams();
  console.log(id);

  const onChange = (selectedUsers) => {
    setSelectedUser(selectedUsers || []);
  };

  const onSearch = (searchTerm) => {
    setSelectedUser(searchTerm);
    // our api to search result
    console.log("search", searchTerm);
  };

  const loadOptions = (inputText, callback) => {
    const data = {
      id: id,
      pattern: inputText,
    };
    axios
      .post(API_URLS["search_user"], data, { withCredentials: true })
      .then((response) => {
        callback(
          response.data.map((user) => ({
            label: user.email,
            value: user.email,
          }))
        );
      });
  };

  const handleAddCandidate = () => {
    console.log(selectedUser);
    selectedUser.map((user) => {
      const data = {
        id: id,
        email: user.value,
      };
      axios
        .post(API_URLS["add_user"], data, { withCredentials: true })
        .then(() => {
          setButtonPopup(false);
          swal({
            title: "Candidate(s) added",
            text: `You have successfully added candidate(s)`,
            icon: "success",
            button: "Ok",
          });
          setSelectedUser([]);
        });
    });
  };

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
    isEvaluator && fetchCandidates();
  }, [buttonViewPopup]);

  const column = [
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
  ];

  return (
    <div>
      <Header />
      <Container>
        {isEvaluator && (
          <div className="d-flex flex-row-reverse pt-5">
            <Link to={`/dashboard/${id}/create`}>
              <Button className="sticky-md-top button-type">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </Button>
            </Link>
          </div>
        )}
        {isEvaluator && (
          <div className="py-2">
            <Button
              onClick={() => {
                setButtonPopup(true);
              }}
              className="button-style"
              type="save"
            >
              Add Candidates
            </Button>
          </div>
        )}
        {isEvaluator && (
          <div className="py-2">
            <Button
              onClick={() => setButtonViewPopup(true)}
              className="button-style"
              type="save"
            >
              List of Candidates
            </Button>
          </div>
        )}
        <div className="py-5">
          <AssessmentCard examCohort={id} isEvaluator={isEvaluator} />
        </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Container className="py-5">
            <div className="pb-2">
              <strong>Add user as candidate(s)</strong>
            </div>
            <AsyncSelect
              isMulti
              value={selectedUser}
              onChange={onChange}
              placeholder={"Enter email address"}
              loadOptions={loadOptions}
            ></AsyncSelect>
            <div className="d-flex flex-row-reverse pt-5">
              <Button onClick={handleAddCandidate} variant="outline-success">
                Submit
              </Button>
            </div>
          </Container>
        </Popup>

        <Popup trigger={buttonViewPopup} setTrigger={setButtonViewPopup}>
          <Container className="py-5">
            <Table data={candidates} column={column} />
          </Container>
        </Popup>
      </Container>
    </div>
  );
}

export default Assessment;
