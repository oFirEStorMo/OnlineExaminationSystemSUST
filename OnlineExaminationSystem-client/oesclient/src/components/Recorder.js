import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneLinesSlash } from "@fortawesome/free-solid-svg-icons";
import { type } from "@testing-library/user-event/dist/type";

function Recorder({ updateURL }) {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      let blob = new Blob([e.data]);
      updateURL(blob);
      setAudioURL(URL.createObjectURL(blob));
      console.log(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  return (
    <Container>
      <Row>
        <Col>
          <audio src={audioURL} controls />
        </Col>
        <Col className="pt-2">
          <Button
            onClick={startRecording}
            disabled={isRecording}
            variant="outline-success"
          >
            <FontAwesomeIcon icon={faMicrophoneLines}></FontAwesomeIcon>
          </Button>
          &nbsp;
          <Button
            onClick={stopRecording}
            disabled={!isRecording}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={faMicrophoneLinesSlash}></FontAwesomeIcon>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Recorder;
