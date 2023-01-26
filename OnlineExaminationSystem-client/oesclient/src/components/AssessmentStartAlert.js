import React from 'react'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'

function AssessmentStartAlert() {
  return (
    <div>
      <Alert variant= "success">
            <FontAwesomeIcon icon={faHourglassStart}></FontAwesomeIcon>&nbsp;&nbsp;
            This assessment has started.
      </Alert>
    </div>
  )
}

export default AssessmentStartAlert
