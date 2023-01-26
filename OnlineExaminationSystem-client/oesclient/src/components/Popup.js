import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
           <Button className="close-btn" variant="outline-danger" onClick={() => props.setTrigger(false)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></Button>
           { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup
