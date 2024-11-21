import React, { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { FlashCard } from "./FlashCards";
import flashcardsData from "../data/data-flashcards.json";

interface FlashCardData {
  question: string;
  answer: string;
}

export const FlashCardContainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <>
      <ProgressBar currentIndex={currentIndex} totalCards={flashcardsData.length} />
      <div className="flashcard-section">
        <FlashCard
          question={flashcardsData[currentIndex].question}
          answer={flashcardsData[currentIndex].answer}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
        <div className="controls">
          <div className="previous-next" onClick={handlePrevious}>
            <p>&lt; Previous</p>
          </div>
          <button className="show-hide-answer" onClick={handleFlip}>
            {isFlipped ? "Hide Answer" : "Show Answer"}
          </button>
          <div className="previous-next" onClick={handleNext}>
            <p>Next &gt;</p>
          </div>
        </div>
      </div>
    </>
  );
};
