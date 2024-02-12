import Buttons from "./Buttons";
import Display from "./Display";
import { useState, useEffect } from "react";

function App() {
  const [resultDisplay, setResultDisplay] = useState("");
  const [inputDisplay, setInputDisplay] = useState("0");
  const buttons = [
    { html: "AC", id: "clear" },
    { html: "C", id: "display-clear" },
    { html: "=", id: "equals" },
    { html: "+", id: "add" },
    { html: "-", id: "subtract" },
    { html: "*", id: "multiply" },
    { html: "/", id: "divide" },
    { html: ".", id: "decimal" },
    { html: "0", id: "zero" },
    { html: "1", id: "one" },
    { html: "2", id: "two" },
    { html: "3", id: "three" },
    { html: "4", id: "four" },
    { html: "5", id: "five" },
    { html: "6", id: "six" },
    { html: "7", id: "seven" },
    { html: "8", id: "eight" },
    { html: "9", id: "nine" },
  ];
  const handleKeyDown = e => {
    if (e.key.match(/=|Enter/)) {
      handleEquals();
    } else if (e.key.match(/\*|-|\+|\/|%/)) {
      handleOperator(e.key);
    } else if (e.key.match(/\./)) {
      handleDecimal();
    } else if (e.key.match(/[0-9]/) && e.key.length === 1) {
      handleNumber(e.key);
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key === "Delete") {
      handleClear(e.key);
    }
  };
  const handleButton = item => {
    if (item.html.match(/AC|C/)) {
      handleClear(item.html);
    } else if (item.html.match(/=/)) {
      handleEquals();
    } else if (item.html.match(/\*|-|\+|\//)) {
      handleOperator(item.html);
    } else if (item.html.match(/\./)) {
      handleDecimal();
    } else if (item.html.match(/[0-9]/)) {
      handleNumber(item.html);
    }
  };
  const handleBackspace = () => {
    if (inputDisplay.length > 0) {
      let newInput = inputDisplay.slice(0, -1);
      setInputDisplay(newInput);
    }
  };
  const handleEquals = () => {
    if (!resultDisplay) {
      if (inputDisplay.match(/\.$/)) {
        setResultDisplay(inputDisplay.slice(0, -1));
        setInputDisplay("");
      } else if (inputDisplay) {
        setResultDisplay(inputDisplay);
        setInputDisplay("");
      }
    } else if (!inputDisplay) {
      if (/\/|\+|\-|\*$/.test(resultDisplay)) {
        try {
          let result = resultDisplay.slice(0, -1);
          let adjustedResult = result.replace(/\-\-/g, "+");
          setResultDisplay(eval(adjustedResult).toFixed(4) * 1).toString();
        } catch (error) {
          console.error(error);
        }
      }
    } else if (/\/|\+|\-|\*$/.test(resultDisplay)) {
      try {
        console.log(resultDisplay);
        console.log(inputDisplay);
        let result = resultDisplay + inputDisplay;
        let adjustedResult = result.replace(/\-\-/g, "+");
        console.log(adjustedResult);
        setResultDisplay((eval(adjustedResult).toFixed(4) * 1).toString());
        setInputDisplay("");
      } catch (error) {
        console.error(error);
      }
    } else if (/[0-9]$/.test(resultDisplay)) {
      if (/\.$/.test(inputDisplay)) {
        setResultDisplay(inputDisplay.slice(0, -1));
        setInputDisplay("");
      } else {
        setResultDisplay(inputDisplay);
        setInputDisplay("");
      }
    }
  };

  const handleClear = input => {
    if (input === "AC") {
      setInputDisplay("0");
      setResultDisplay("");
    } else if (input === "C") {
      setInputDisplay("0");
    } else if (input === "Delete") {
      setInputDisplay("0");
      setResultDisplay("");
    }
  };
  const handleDecimal = () => {
    if (inputDisplay.length === 0) {
      setInputDisplay("0.");
    } else if (!inputDisplay.match(/\./)) {
      setInputDisplay(inputDisplay + ".");
    }
  };
  const handleOperator = input => {
    if (!resultDisplay) {
      if (/[1-9]*[0-9]$/.test(inputDisplay)) {
        setResultDisplay(inputDisplay + input);
        setInputDisplay("");
      } else if (/\.$/.test(inputDisplay)) {
        setResultDisplay(inputDisplay.slice(0, -1) + input);
        setInputDisplay("");
      } else if (input === "-") {
        setInputDisplay(input);
      }
    } else if (/[0-9]$/.test(resultDisplay)) {
      if ((inputDisplay === "0") | (inputDisplay === "")) {
        setResultDisplay(resultDisplay + input);
      } else if (/[0-9]$/.test(inputDisplay)) {
        setResultDisplay(resultDisplay + input + inputDisplay);
        setInputDisplay("0");
      } else if (/\.$/.test(inputDisplay)) {
        setResultDisplay(resultDisplay + inputDisplay.slice(0, -1) + input);
        setInputDisplay("0");
      }
    } else if (/[0-9]+[\+|\*|\/|\-]$/.test(resultDisplay)) {
      if (/[0-9]$/.test(inputDisplay)) {
        setResultDisplay(resultDisplay + inputDisplay + input);
        setInputDisplay("0");
      } else if (input === "-") {
        setResultDisplay(resultDisplay + input);
      } else {
        setResultDisplay(resultDisplay.slice(0, -1) + input);
      }
    } else if (/[0-9][\+|\*|\/|\-][\-]$/.test(resultDisplay)) {
      setResultDisplay(resultDisplay.slice(0, -2) + input);
    }
  };

  const handleNumber = input => {
    if (inputDisplay[0] === "0" && inputDisplay.length === 1) {
      if (input !== "0") {
        setInputDisplay(input);
      }
    } else {
      setInputDisplay(inputDisplay + input);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="calculator">
      <Display resultDisplay={resultDisplay} inputDisplay={inputDisplay} />
      <Buttons buttons={buttons} handleButton={handleButton} />
    </div>
  );
}

export default App;
