import React from "react";
import { FlashCardContainer } from "./components/FlashCardContainer";
// @ts-ignore
import './index.css'

const App: React.FC = () => {
  return (
    <>
      <main>
        <h1>Flash Cards: JavaScript</h1>
        <FlashCardContainer />
      </main>
      <footer>Made by Mirfozil20</footer>
    </>
  );
};  

export default App;
