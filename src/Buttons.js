import React from "react";

const Buttons = ({ buttons, handleButton }) => {
  const displayButtons = buttons.map(item => (
    <button className="button" id={item.id} onClick={() => handleButton(item)}>
      {item.html}
    </button>
  ));
  return <div className="buttons">{displayButtons}</div>;
};

export default Buttons;
