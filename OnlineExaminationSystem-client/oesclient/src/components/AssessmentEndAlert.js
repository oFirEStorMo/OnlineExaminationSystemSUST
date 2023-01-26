import React from 'react'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons'

function AssessmentEndAlert() {
  return (
    <div>
      <Alert variant= "success">
            <FontAwesomeIcon icon={faHourglassEnd}></FontAwesomeIcon>&nbsp;&nbsp;
            This assessment has ended.
      </Alert>
    </div>
  )
}

export default AssessmentEndAlert
