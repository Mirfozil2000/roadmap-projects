interface ControlsProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
}

const Controls = ({ onStart, onStop, isRunning }: ControlsProps) => (
  <div className="mt-10 flex justify-center space-x-8">
    {!isRunning ? (
      <button
        onClick={onStart}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
      >
        Start
      </button>
    ) : (
      <button
        onClick={onStop}
        className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
      >
        Stop
      </button>
    )}
  </div>
);

export default Controls;
