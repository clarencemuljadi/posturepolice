import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import * as faceapi from "@vladmandic/face-api";
import TimerBox from "../components/TimerBox";

function Dashboard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const modelPath = "../model/";
  const minScore = 0.2;
  const maxResults = 5;
  let optionsSSDMobileNet;

  useEffect(() => {
    const setup = async () => {
      await setupFaceAPI();
      setupCamera();
    };

    setup();
  }, []);

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
      if (person.angle.pitch < -10) {
        console.log("slouching");
      } else if (person.angle.yaw < -40) {
        console.log("face too close");
      }
      const expression = Object.entries(person.expressions).sort(
        (a, b) => b[1] - a[1]
      );
      ctx.fillStyle = "black";
      ctx.fillText(
        `gender: ${Math.round(100 * person.genderProbability)}% ${
          person.gender
        }`,
        person.detection.box.x,
        person.detection.box.y - 59
      );
      ctx.fillText(
        `expression: ${Math.round(100 * expression[0][1])}% ${
          expression[0][0]
        }`,
        person.detection.box.x,
        person.detection.box.y - 41
      );
      ctx.fillText(
        `age: ${Math.round(person.age)} years`,
        person.detection.box.x,
        person.detection.box.y - 23
      );
      ctx.fillText(
        `roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`,
        person.detection.box.x,
        person.detection.box.y - 5
      );
      ctx.fillStyle = "lightblue";
      ctx.fillText(
        `gender: ${Math.round(100 * person.genderProbability)}% ${
          person.gender
        }`,
        person.detection.box.x,
        person.detection.box.y - 60
      );
      ctx.fillText(
        `expression: ${Math.round(100 * expression[0][1])}% ${
          expression[0][0]
        }`,
        person.detection.box.x,
        person.detection.box.y - 42
      );
      ctx.fillText(
        `age: ${Math.round(person.age)} years`,
        person.detection.box.x,
        person.detection.box.y - 24
      );
      ctx.fillText(
        `roll:${person.angle.roll}° pitch:${person.angle.pitch}° yaw:${person.angle.yaw}°`,
        person.detection.box.x,
        person.detection.box.y - 6
      );
      // draw face points for each face
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "lightblue";
      const pointSize = 2;
      for (let i = 0; i < person.landmarks.positions.length; i++) {
        ctx.beginPath();
        ctx.arc(
          person.landmarks.positions[i].x,
          person.landmarks.positions[i].y,
          pointSize,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
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
      <div className="flex h-full p-8 justify-between gap-4 px-14">
        <div className="border-4 border-border-color w-6/12 rounded-lg p-6 mt-4 ">
          <TimerBox onVideo={togglePlayPause}></TimerBox>
        </div>
        <div className="flex flex-col border-4 border-border-color w-6/12 rounded-lg p-6 mt-4">
          <h1 className="text-4xl font-semibold">Your Current Position:</h1>
        </div>
      </div>
      <div className="appvideo hidden">
        <video crossOrigin="anonymous" ref={videoRef}></video>
      </div>
      {/* <canvas
        ref={canvasRef}
        width="940"
        height="650"
        className="appcanvas"
        onClick={togglePlayPause}
      /> */}
    </div>
  );
}

export default Dashboard;
