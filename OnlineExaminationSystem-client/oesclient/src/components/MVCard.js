import React from 'react'
import Audioplayer from "./Audioplayer";
import Recorder from "./Recorder";

function MVCard() {
  return (
    <div className="mv-card">
       <div className="mv-text">
            <p>Press the play button to listen to the question</p>
            <Audioplayer />
        </div>
        <div className="mv-text">
            <p>Press the microphone to record your answer</p>
            <Recorder />
        </div>
    </div>
  )
}

export default MVCard
