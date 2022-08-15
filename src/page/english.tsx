import React from "react";

const english = () => {
  const textToSpeech = () => {
    const to_speak = new SpeechSynthesisUtterance("Hello world!");
    window.speechSynthesis.speak(to_speak);

    //document.

    window.addEventListener("mousedown", () => {
      setTimeout(() => {
        console.log("test1");
        alert("Hello world! from load event1");
      }, 1000);
    });

    document.addEventListener("mousedown", () => {
      setTimeout(() => {
        console.log("test");
        alert("Hello world! from load event");
      }, 2000);
    });
  };

  return (
    <div className="h-screen grid grid-cols-6  container">
      <div className="grid col-start-2 col-span-4">
        <button onClick={() => textToSpeech()}> clicks here</button>
      </div>
    </div>
  );
};

const EnglishPage = english;

export default EnglishPage;
