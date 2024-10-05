import Stopwatch from './components/stopwatch';
import Timer from './components/timer';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, Timer as TimerIcon, Watch } from 'lucide-react';

const ClockDisplay = ({ time, size = 'small' }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`text-center ${size === 'large' ? 'mb-8' : ''}`}>
      <p className={size === 'large' ? "text-8xl font-extrabold mb-4" : "text-2xl font-bold"}>{formatTime(time)}</p>
      <p className={size === 'large' ? "text-4xl font-semibold" : "text-sm"}>{formatDate(time)}</p>
    </div>
  );
};

const App = () => {
  const [time, setTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeComponent, setActiveComponent] = useState('clock');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
       
      

      <div className="flex justify-between items-start p-4">
        <div className="flex space-x-2">
          
          <button 
            onClick={() => setActiveComponent('clock')}
            className={`p-2 rounded-full ${activeComponent === 'clock' ? 'bg-blue-500' : isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <Clock size={24} />
          </button>
          <button 
            onClick={() => setActiveComponent('stopwatch')}
            className={`p-2 rounded-full ${activeComponent === 'stopwatch' ? 'bg-blue-500' : isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <Watch size={24} />
          </button>
          <button 
            onClick={() => setActiveComponent('timer')}
            className={`p-2 rounded-full ${activeComponent === 'timer' ? 'bg-blue-500' : isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            <TimerIcon size={24} />
          </button>
        </div>
        <h1 className="text-6xl text center font-bold">Clock App</h1>
       
        
          <div className="flex flex-col items-end">
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full mb-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {activeComponent !== 'clock' && (
            <ClockDisplay time={time} />
          )}
          </div>
      
      </div>

    
      <div className="flex-grow flex items-center justify-center">
        {activeComponent === 'clock' && (
          <div className="text-center">
            <ClockDisplay time={time} size="large" />
          </div>
        )}
        {activeComponent === 'stopwatch' && <Stopwatch />}
        {activeComponent === 'timer' && <Timer />}
      </div>
    </div>
  );
};

export default App;
