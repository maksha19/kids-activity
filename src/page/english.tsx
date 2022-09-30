import React, {useEffect, useState} from "react";
import _lodash from "lodash";
import Speaker from './../speaker.svg'
import Arrow from './../arrow.svg'
import classNames from "classnames";

const words = [
  "accidentally",
  "familiar",
  "hurried",
]
const EnglishPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  const [currentWord, setCurrentWord] = useState<any[]>([])
  const [checkWord, setCheckWord] = useState<any[]>([])

  const [nextDisabled, setNextDisabled] = useState<boolean>(false)
  const [previousDisabled, setPreviousDisabled] = useState<boolean>(true)


  useEffect(() => {
    setWord(0)
  }, [])

  const setWord = (index: number) => {
    let checkWord = []
    const initWord = words[index]
    for (let i = 0; i < initWord.length; i++) {
      checkWord.push({
        char: initWord[i],
        isShow: false
      })
    }
    setCheckWord(checkWord)

    const shuffledWord = _lodash.shuffle(initWord)
    let currentWord = []

    for (let i = 0; i < shuffledWord.length; i++) {
      currentWord.push({
        char: shuffledWord[i],
        isShow: true
      })
    }
    setCurrentWord(currentWord)
    setCurrentCharIndex(0)
  }

  const clickChar = (clickedChar: string, index: number) => {

    let previousCheckWord = checkWord;
    let previousCurrentWord = currentWord

    const currentItem = checkWord[currentCharIndex]
    if (currentItem.char === clickedChar) {
      textToSpeech(clickedChar)
      previousCheckWord[currentCharIndex].isShow = true
      previousCurrentWord[index].isShow = false
      setCurrentCharIndex(currentCharIndex + 1)
      setCheckWord([...previousCheckWord])
      setCurrentWord([...previousCurrentWord])

      let isWordComplete = true
      previousCheckWord.forEach((item) => isWordComplete = item.isShow)
      if(isWordComplete){
        textToSpeech(words[currentWordIndex])
      }
    }
  }

  const textToSpeech = (word: string) => {
    const to_speak = new SpeechSynthesisUtterance(word);
    to_speak.rate = 0.75
    to_speak.pitch = 0.75
    window.speechSynthesis.speak(to_speak);
  };

  const changeCurrentWord = (condition: boolean) => {

    let wordIndex = currentWordIndex
    const wordLength = words.length - 1
    if (condition) {
      wordIndex = currentWordIndex + 1;
    } else {
      wordIndex = currentWordIndex - 1;
    }

    // for next button
    if (wordIndex >= 0 && wordIndex <= wordLength) {
      setCurrentWordIndex(wordIndex);
      setWord(wordIndex)
      if (nextDisabled) {
        setNextDisabled(false);
      }
      if (wordIndex === wordLength) {
        setNextDisabled(true);
      }
    } else {
      setNextDisabled(true);
    }

    // for pervious button
    if (wordIndex === 0) {
      setPreviousDisabled(true);
    } else {
      if (previousDisabled) {
        setPreviousDisabled(false);
      }
    }
  }




  return (
    <div className="h-screen grid grid-cols-6 container">
      <div className="grid col-span-full mx-5 content-center">
        <div className="flex  flex-col space-y-10">
          <div className="grid grid-flow-col">
            <div>
              <button className={classNames(previousDisabled ? "disabled disabled:opacity-75" : "cursor-pointer")} disabled={previousDisabled} onClick={() => changeCurrentWord(false)}>
                <img src={Arrow} className="App-logo rotate-180" alt="logo" />
              </button>
            </div>
            <div className="grid justify-items-center">
              <img src={Speaker} className="App-logo grid justify-center cursor-pointer" alt="logo" onClick={() => textToSpeech(words[currentWordIndex])} />
            </div>
            <div className="grid justify-items-end">
              <button className={classNames(nextDisabled ? "disabled disabled:opacity-75" : "cursor-pointer")} disabled={nextDisabled} onClick={() => changeCurrentWord(true)}>
                <img src={Arrow} className="App-logo" alt="logo" />
              </button>
            </div>
          </div>
          <div className="grid grid-flow-col justify-items-center h-20">
            {checkWord.map((item, index) => {
              return (
                <div key={index} className="uppercase grid content-center w-5/6">
                  <span className={classNames("grid text-2xl font-black justify-items-center", item.isShow ? "" : "hidden")}>{item.char}</span>
                  <span className="border-b-2 border-indigo-600" />
                </div>
              )
            })}
          </div>
          <div className="grid grid-flow-col justify-items-center h-20">
            {currentWord.map((item, index) => {
              return <button key={index} className={classNames("uppercase text-2xl font-black grid content-center justify-items-center h-full w-5/6 bg-yellow-300 border-2 border-indigo-600",
                item.isShow ? "cursor-pointer" : "disabled disabled:opacity-75")}
                disabled={!item.isShow} onClick={() => clickChar(item.char, index)}>{item.char}
              </button>
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnglishPage;
