import React from "react";
import { useStopwatch } from "react-timer-hook";
import Button from "@mui/material/Button";
import StopIcon from "@mui/icons-material/Stop";
import Switch from "@mui/material/Switch";
import giga from "../assets/g3oxem - GigaChad Theme (Phonk House Version).mp3";
import { startSession } from "../firebase-config";
const TimerBox = ({ onVideo, onReset, setTick }) => {
  const playAudio = (sound) => {
    const audio = new Audio(sound); // Path to your audio file in the public folder
    audio.play();
  };
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
      <div className="flex gap-4">
        <Button
          sx={{
            bgcolor: "red",
            ":hover": {
              bgcolor: "black",
            },
          }}
          variant="contained"
          onClick={() => {
            setTick(10), playAudio(giga);
          }}
        >
          <span className="font-metal text-xl">LOCK IN MODE</span>
        </Button>
      </div>
      <h1 className="text-4xl font-semibold mt-4">Your Current Time:</h1>
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
