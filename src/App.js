import React, { useState } from "react";
import "./App.css";

function App() {
  const [lengths, setLengths] = useState({
    breakLength: 5,
    sessionLength: 25,
    displayTime: `25:00`,
    isPlaying: false,
  });

  const handlePlay = (prevTime = null) => {
    let time = prevTime
      ? parseInt(prevTime.split(":")[0], 10)
      : lengths.sessionLength;

    let seconds = prevTime ? parseInt(prevTime.split(":")[1], 10) : 0;

    if (!window.sessionTimer) {
      setLengths({ ...lengths, isPlaying: true });
      window.sessionTimer = setInterval(() => {
        if (seconds === 0) {
          seconds = 59;
          time--;
          if (time < 0) {
            clearInterval(window.sessionTimer);
            handleBreak();
          } else {
            setLengths({
              ...lengths,
              sessionLength: time,
              displayTime: `${time}:${seconds > 9 ? seconds : `0${seconds}`}`,
              isPlaying: true,
            });
            window.currentTime = `${time}:${
              seconds > 9 ? seconds : `0${seconds}`
            }`;
          }
        } else {
          seconds -= 1;
          setLengths({
            ...lengths,
            displayTime: `${time}:${seconds > 9 ? seconds : `0${seconds}`}`,
            isPlaying: true,
          });
          window.currentTime = `${time}:${
            seconds > 9 ? seconds : `0${seconds}`
          }`;
        }
      }, 1000);
    }

    const handleBreak = (prevTime = null) => {
      let time = prevTime
        ? parseInt(prevTime.split(":")[0], 10)
        : lengths.breakLength;

      let seconds = prevTime ? parseInt(prevTime.split(":")[1], 10) : 0;
      setLengths({
        ...lengths,
        isPlaying: true,
      });
      window.breakTimer = setInterval(() => {
        if (seconds === 0) {
          seconds = 59;
          time--;
          if (time < 0) {
            clearInterval(window.breakTimer);
          } else {
            setLengths({
              ...lengths,
              breakLength: time,
              displayTime: `${time}:${seconds > 9 ? seconds : `0${seconds}`}`,
              isPlaying: true,
            });
            window.currentTime = `${time}:${
              seconds > 9 ? seconds : `0${seconds}`
            }`;
          }
        } else {
          seconds -= 1;
          setLengths({
            ...lengths,
            displayTime: `${time}:${seconds > 9 ? seconds : `0${seconds}`}`,
            isPlaying: true,
          });
          window.currentTime = `${time}:${
            seconds > 9 ? seconds : `0${seconds}`
          }`;
        }
      }, 1000);
    };
  };
  const handleReset = () => {
    clearInterval(window.sessionTimer);
    clearInterval(window.breakTimer);
    window.sessionTimer = null;
    window.breakTimer = null;
    window.currentTime = null;
    setLengths({
      ...lengths,
      sessionLength: 25,
      breakLength: 5,
      displayTime: `25:00`,
      isPlaying: false,
    });
  };
  return (
    <div className="App">
      <div className="app-title">
        <h1 className="text-center">25 + 5 Clock</h1>
      </div>
      <div className="break-length">
        <div>
          <h3 id="break-label" className="text-center">
            Break Length
          </h3>
          <div>
            <button
              id="break-decrement"
              onClick={() =>
                setLengths({
                  ...lengths,
                  breakLength:
                    lengths.breakLength <= 1 ? 1 : lengths.breakLength - 1,
                })
              }
              className="btn"
            >
              -
            </button>
            <span
              id="break-length"
              style={{ padding: "0 1rem", fontSize: "1.2rem" }}
            >
              {lengths.breakLength}
            </span>
            <button
              id="break-increment"
              onClick={() =>
                setLengths({ ...lengths, breakLength: lengths.breakLength + 1 })
              }
              className="btn"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="session-length">
        <div>
          <h3 id="session-label" className="text-center">
            Session Length
          </h3>
          <div>
            <button
              id="session-decrement"
              onClick={() =>
                setLengths({
                  ...lengths,
                  sessionLength:
                    lengths.sessionLength === 1 ? 1 : lengths.sessionLength - 1,
                  displayTime:
                    lengths.sessionLength === 1
                      ? `${lengths.sessionLength}:00`
                      : `${lengths.sessionLength - 1}:00`,
                })
              }
              className="btn"
            >
              -
            </button>
            <span
              id="session-length"
              style={{ padding: "0 1rem", fontSize: "1.2rem" }}
            >
              {lengths.sessionLength}
            </span>
            <button
              id="session-increment"
              onClick={() =>
                setLengths({
                  ...lengths,
                  sessionLength: lengths.sessionLength + 1,
                  displayTime: `${lengths.sessionLength + 1}:00`,
                })
              }
              className="btn"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="clock">
        <div className="sub-clock">
          <h3 id="timer-label" className="text-center">
            Session
          </h3>
          <p id="time-left" style={{ fontSize: "2.2rem" }}>
            {lengths.displayTime}
          </p>
        </div>
        <div
          style={{
            marginTop: "20px",
            width: "10%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {lengths.isPlaying ? (
            <button
              id="start_stop"
              onClick={() => {
                clearInterval(window.sessionTimer);
                clearInterval(window.breakTimer);
                window.sessionTimer = null;
                window.breakTimer = null;
                setLengths({ ...lengths, isPlaying: false });
              }}
              className="btn"
            >
              <i className="fa fa-pause"></i>
            </button>
          ) : (
            <button
              disabled={window.sessionTimer}
              id="start_stop"
              onClick={() => {
                window.currentTime
                  ? handlePlay(window.currentTime)
                  : handlePlay();
              }}
              className="btn"
            >
              <i className="fa fa-play"></i>
            </button>
          )}
          <button id="reset" onClick={() => handleReset()} className="btn">
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
