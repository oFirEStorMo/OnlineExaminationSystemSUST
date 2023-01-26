import React from 'react'
import { useEffect, useState } from "react";

function Countdown() {
    const [time, setTime] = useState(3600);

    useEffect(() => {
        let timer = setInterval(() => {
        setTime((time) => {
            if (time === 0) {
            clearInterval(timer);
            return 0;
            } else return time - 1;
        });
        }, 1000);
    }, []);

  return (
     <p>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </p>
  )
}

export default Countdown
