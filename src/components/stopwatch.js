import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    const lapTime = time - (laps.length > 0 ? laps[0].totalTime : 0);
    setLaps([{ lapTime, totalTime: time }, ...laps]);
  };

  return (
    <div className="flex flex-col items-center font-bold justify-center space-y-8">
      <h2 className="text-4xl font-bold">Stopwatch</h2>
      
      <div className="text-6xl font-mono">
        {formatTime(time)}
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={toggleStopwatch} 
          className={`p-4 rounded-full ${isRunning ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={resetStopwatch} 
          className="p-4 rounded-full bg-red-500 text-white"
        >
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={recordLap} 
          className="p-4 rounded-full bg-blue-500 text-white"
          disabled={!isRunning}
        >
          <Flag size={24} />
        </button>
      </div>

      {laps.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-semibold mb-2">Laps</h3>
          <div className="overflow-y-auto max-h-60">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Lap</th>
                  <th className="px-4 py-2">Lap Time</th>
                  <th className="px-4 py-2">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="px-4 py-2 text-center">{laps.length - index}</td>
                    <td className="px-4 py-2 text-center">{formatTime(lap.lapTime)}</td>
                    <td className="px-4 py-2 text-center">{formatTime(lap.totalTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;