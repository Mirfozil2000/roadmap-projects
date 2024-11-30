'use client';
import { useState } from 'react';
import Timer from '../components/Timer';
import Controls from '../components/Controls';

const Home = () => {
  const [sessionType, setSessionType] = useState<'Work' | 'Short Break' | 'Long Break'>('Work');
  const [isRunning, setIsRunning] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);

  const handleSessionEnd = () => {
    let nextSessionType: 'Work' | 'Short Break' | 'Long Break';

    if (sessionType === 'Work') {
      setWorkSessions((prev) => prev + 1);
      nextSessionType = workSessions % 4 === 0 ? 'Long Break' : 'Short Break';
    } else {
      nextSessionType = 'Work';
    }

    setSessionType(nextSessionType);
    setIsRunning(false);
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  const getInitialMinutes = () => {
    switch (sessionType) {
      case 'Work':
        return 25;
      case 'Short Break':
        return 5;
      case 'Long Break':
        return 15;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Timer
        initialMinutes={getInitialMinutes()}
        onSessionEnd={handleSessionEnd}
        sessionType={sessionType}
        isRunning={isRunning}
      />
      <Controls onStart={startTimer} onStop={stopTimer} isRunning={isRunning} />
    </div>
  );
};

export default Home;
