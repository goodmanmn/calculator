import React from "react";

const Display = ({ resultDisplay, inputDisplay }) => {
  return (
    <div id="display">
      <p>{resultDisplay}</p>
      <p>{inputDisplay}</p>
    </div>
  );
};

export default Display;
