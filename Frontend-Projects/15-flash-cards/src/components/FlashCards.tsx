import React from "react";

interface FlashCardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ question, answer, isFlipped, onFlip }) => {
  return (
    <div className="flashcard" onClick={onFlip}>
      {isFlipped ? (
        <div className="answer">{answer}</div>
      ) : (
        <div className="question">{question}</div>
      )}
    </div>
  );
};
