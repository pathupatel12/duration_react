import { useState, useRef } from "react";
import "./progressbar.css";

const ProgressBar = () => {
  const [duration, setDuration] = useState(5);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);

  const handleStart = () => {
    if (!duration || duration <= 0) return;

    setIsRunning(true);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();

    const total = duration * 1000;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current + elapsedRef.current;
      const newProgress = Math.min((elapsed / total) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    }, 100);
  };


  return (
    <div className="container">
      <h1>---1.5 Hours---</h1>

      <div className="input-group">
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={isRunning}
          placeholder="Enter duration in seconds"
        />
         <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: "#4caf50",
          }}
        ></div>
      </div>
      <p>{Math.round(progress)}%</p>
    </div>
  );
};

export default ProgressBar;
