import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 25, seconds: 0 });

  useEffect(() => {
    let intervalId;
    if (isRunning && (time.hours > 0 || time.minutes > 0 || time.seconds > 0)) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            return prevTime;
          }
          
          let newSeconds = prevTime.seconds - 1;
          let newMinutes = prevTime.minutes;
          let newHours = prevTime.hours;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }

          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  const adjustTime = (unit, amount) => {
    setTime(prevTime => {
      const newTime = { ...prevTime, [unit]: Math.max(0, prevTime[unit] + amount) };
      setInitialTime(newTime);
      return newTime;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-4xl font-bold">Timer</h2>
      
      <div className="flex font-bold space-x-8">
        {['hours', 'minutes', 'seconds'].map(unit => (
          <div key={unit} className="flex flex-col items-center">
            <button onClick={() => adjustTime(unit, 1)} className="text-2xl mb-2">
              <Plus />
            </button>
            <div className="text-6xl font-mono font-bold w-24 text-center">
              {String(time[unit]).padStart(2, '0')}
            </div>
            <button onClick={() => adjustTime(unit, -1)} className="text-2xl mt-2">
              <Minus />
            </button>
            <p className="text-sm mt-1 capitalize">{unit}</p>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={toggleTimer} 
          className={`p-4 rounded-full ${isRunning ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={resetTimer} 
          className="p-4 rounded-full bg-red-500 text-white"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;