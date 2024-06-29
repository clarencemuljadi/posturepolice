import React from "react";
import { useStopwatch } from "react-timer-hook";
import Button from "@mui/material/Button";
import StopIcon from "@mui/icons-material/Stop";
import { startSession } from "../firebase-config";
const TimerBox = ({ onVideo, onReset }) => {
  const onRestart = () => {
    onReset();
    if (isRunning) {
      onVideo();
    }
    reset();
    pause();
  };
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
    <div
      style={{ textAlign: "center" }}
      className="flex flex-col justify-between h-full"
    >
      {/* {isRunning ? <Button variant="contained">TEST</Button> : <></>} */}
      <h1 className="text-4xl font-semibold">Your Current Time:</h1>
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
            alignSelf: "center",
          }}
          onClick={() => {
            start();
            onVideo();
            startSession();
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
            alignSelf: "center",
          }}
        >
          Pause
        </Button>
      )}
      <StopIcon
        sx={{
          fontSize: 60,
          ":hover": {
            color: "red",
          },
        }}
        onClick={onRestart}
      ></StopIcon>
      <div></div>
    </div>
  );
};

export default TimerBox;
