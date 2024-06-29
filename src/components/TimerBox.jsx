import React from "react";
import { useStopwatch } from "react-timer-hook";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const TimerBox = ({ onVideo }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();
  return (
    <div style={{ textAlign: "center" }}>
      {/* {isRunning ? <Button variant="contained">TEST</Button> : <></>} */}
      <div className="text-8xl mt-8 mb-8">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      {!isRunning ? (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#3da9fc",
            borderRadius: 1,
            fontSize: 22,
            fontWeight: 800,
            width: 300,
            paddingY: 1,
            boxShadow: 5,
            ":hover": {
              bgcolor: "#90b4ce",
            },
          }}
          onClick={() => {
            start();
            onVideo();
          }}
        >
          Start Session
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            pause();
            onVideo();
          }}
          sx={{
            bgcolor: "#3da9fc",
            borderRadius: 0.5,
            fontSize: 22,
            fontWeight: 800,
            width: 200,
            paddingY: 1,
            boxShadow: 5,
            ":hover": {
              bgcolor: "#90b4ce",
            },
          }}
        >
          Pause
        </Button>
      )}
      {/* <RestartAltIcon sx={{ fontSize: 60 }}></RestartAltIcon> */}
    </div>
  );
};

export default TimerBox;
