import React from 'react'
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';

function Audioplayer() {

  return (
    <ReactAudioPlayer 
       src="/files/George_Gershwin_playing_Rhapsody_in_Blue.ogg"
       controls
    />
  )
}

export default Audioplayer

/*const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Audioplayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <Button onClick={toggle}>{playing ? "Pause" : "Play"}</Button>
    </div>
  );
};

export default Audioplayer;*/
