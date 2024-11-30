import { useEffect, useState } from 'react';

interface TimerProps {
  initialMinutes: number;
  onSessionEnd: () => void;
  sessionType: string;
  isRunning: boolean;
  onReset?: () => void;
}

const Timer = ({ initialMinutes, onSessionEnd, sessionType, isRunning }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    setTimeLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            onSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onSessionEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 to-blue-500 text-white">
      <div className="bg-white bg-opacity-20 p-12 rounded-xl shadow-2xl backdrop-blur-lg text-center">
        <h1 className="text-5xl font-bold uppercase mb-6 tracking-wide text-yellow-200">{sessionType} Timer</h1>
        <h2 className="text-9xl font-mono mb-6 animate-bounce">
          {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </h2>
      </div>
    </div>
  );
};

export default Timer;
