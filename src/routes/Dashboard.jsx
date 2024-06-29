import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import * as faceapi from "@vladmandic/face-api";
import TimerBox from "../components/TimerBox";
import slouching from "../assets/Slouching-8.svg";
import perfect from "../assets/Slouching-14.svg";
import close from "../assets/Slouching-15.svg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import bell from "../assets/big bell.mp3";
import correct from "../assets/correct.mp3";
import { endSession } from "../firebase-config";

function Dashboard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [posture, setPosture] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [expression, setExpression] = useState("");
  const [prevPosture, setPrevPosture] = useState("");
  const [postureCount, setPostureCount] = useState(0);
  const [currentPosition, setCurrentPosition] = useState("");
  const [badPostureCount, setBadPostureCount] = useState(0);
  const [lockin, setLockin] = useState(false);
  const [tick, setTick] = useState(1000);
  const navigate = useNavigate();

  const modelPath = "../model/";
  const minScore = 0.2;
  const maxResults = 5;
  let optionsSSDMobileNet;

  const playAudio = (sound) => {
    const audio = new Audio(sound); // Path to your audio file in the public folder
    audio.play();
  };

  const reset = () => {
    setPosture("");
    setExpression("");
    setPrevPosture("");
    setPostureCount(0);
    setTick(1000);
    endSession(badPostureCount);
    setBadPostureCount(0);
  };

  const getPostureSVG = () => {
    switch (currentPosition) {
      case "normal":
        return <img src={perfect} alt="Normal Posture" />;
      case "slouching":
        return <img src={slouching} alt="Slouching Posture" />;
      case "faceClose":
        return <img src={close} alt="Face Close Posture" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, proceed with setup
        setup();
      } else {
        // User is signed out, redirect to login page
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const setup = async () => {
    await setupFaceAPI();
    await setupCamera();
  };

  const checkPosture = async () => {
    if (isPlaying) {
      if (prevPosture !== posture) {
        setPrevPosture(posture);
        setPostureCount(0);
      } else {
        setPostureCount((prevCount) => prevCount + 1);
        if (postureCount >= 2) {
          setCurrentPosition(posture);
          if (posture == "slouching" || posture == "faceClose") {
            setBadPostureCount((prevCount) => prevCount + 1);
          }
          console.log("bad posture count: " + badPostureCount);
          console.log("Maintained posture: " + posture + " for 3 seconds");
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkPosture, tick);
    return () => clearInterval(interval);
  }, [isPlaying, posture, prevPosture, postureCount]);

  // helper function to pretty-print json object to string
  function str(json) {
    let text = '<font color="lightblue">';
    text += json
      ? JSON.stringify(json)
          .replace(/{|}|"|\[|\]/g, "")
          .replace(/,/g, ", ")
      : "";
    text += "</font>";
    return text;
  }

  // helper function to print strings to html document as a log
  function log(...txt) {
    console.log(...txt); // eslint-disable-line no-console
  }

  const detectPosture = (person) => {
    if (
      person.angle.roll >= -3 &&
      person.angle.roll <= 1 &&
      person.angle.pitch >= -5 &&
      person.angle.pitch <= 13
    ) {
      console.log("normal");
      setPosture("normal");
    } else if (
      person.angle.roll >= -3 &&
      person.angle.roll <= 0 &&
      person.angle.pitch <= -5
    ) {
      console.log("slouching");
      setPosture("slouching");
    }
  };

  // helper function to draw detected faces
  function drawFaces(canvas, data, fps) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw title
    ctx.font = 'small-caps 20px "Segoe UI"';
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, 10, 25);
    for (const person of data) {
      // draw box around each face
      ctx.lineWidth = 3;
      ctx.strokeStyle = "deepskyblue";
      ctx.fillStyle = "deepskyblue";
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.rect(
        person.detection.box.x,
        person.detection.box.y,
        person.detection.box.width,
        person.detection.box.height
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
      // draw text labels
      detectPosture(person);
      const expression = Object.entries(person.expressions).sort(
        (a, b) => b[1] - a[1]
      );
      setExpression(expression[0][0]);
    }
  }

  async function detectVideo(video, canvas) {
    if (!video || video.paused) return false;
    const t0 = performance.now();
    try {
      const result = await faceapi
        .detectAllFaces(video, optionsSSDMobileNet)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const fps = 1000 / (performance.now() - t0);
      drawFaces(canvas, result, fps.toLocaleString());
      requestAnimationFrame(() => detectVideo(video, canvas));
      return true;
    } catch (err) {
      log(`Detect Error: ${str(err)}`);
      return false;
    }
  }

  // just initialize everything and call main function
  async function setupCamera() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    log("Setting up camera");
    if (!navigator.mediaDevices) {
      log("Camera Error: access not supported");
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user", resizeMode: "crop-and-scale" },
      });

      if (stream) {
        video.srcObject = stream;
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        log(`Camera active: ${track.label}`);
        log(`Camera settings: ${str(settings)}`);

        video.onloadeddata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          detectVideo(video, canvas);
        };
      }
    } catch (err) {
      log(`Camera Error: ${err.message || err}`);
    }
  }

  async function setupFaceAPI() {
    await faceapi.nets.ssdMobilenetv1.load(modelPath);
    await faceapi.nets.ageGenderNet.load(modelPath);
    await faceapi.nets.faceLandmark68Net.load(modelPath);
    await faceapi.nets.faceRecognitionNet.load(modelPath);
    await faceapi.nets.faceExpressionNet.load(modelPath);
    optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      minConfidence: minScore,
      maxResults,
    });
    log(`Models loaded: ${str(faceapi.tf.engine().state.numTensors)} tensors`);
  }

  const togglePlayPause = async () => {
    const video = videoRef.current;
    console.log(isPlaying);
    if (video) {
      if (isPlaying) {
        video.pause();
        log("video paused");
      } else {
        video.play();
        log("video started");
        detectVideo(video, canvasRef.current);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar></Navbar>
      <div
        className={`${
          tick === 10 ? "bg-red-600" : "bg-gray-100"
        } min-h-screen flex flex-col`}
      >
        <div className="flex h-full p-8 justify-between gap-4 px-14">
          <div className="border-4 border-border-color w-6/12 rounded-lg p-6 mt-4 bg-white shadow-xl ">
            <TimerBox
              onVideo={togglePlayPause}
              onReset={reset}
              setTick={setTick}
            ></TimerBox>
          </div>
          <div className="flex flex-col border-4 border-border-color w-6/12 rounded-lg p-6 mt-4 bg-white shadow-xl">
            <h1
              className={`text-4xl font-semibold text-center ${
                tick === 10 ? "font-metal" : ""
              }`}
            >
              Your Current Position:
            </h1>
            {getPostureSVG()}
          </div>
        </div>
        <div className="px-14">
          <div className="flex flex-col  border-4 border-border-color w-full rounded-lg p-6 bg-white shadow-xl">
            <h1 className="text-4xl font-semibold text-center">
              Your Current Expression:
            </h1>
            <h1 className="text-4xl font-bold text-center">{expression}</h1>
          </div>
        </div>
        <div className="appvideo hidden">
          <video crossOrigin="anonymous" ref={videoRef}></video>
        </div>
        <canvas
          ref={canvasRef}
          width="940"
          height="650"
          className="appcanvas hidden"
          onClick={togglePlayPause}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
