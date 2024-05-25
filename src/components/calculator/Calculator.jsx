import React, { useState} from "react";
import "./calculator.scss";
import { toast } from "react-toastify";
const Calculator = (props) => {
  const buttons = [
    "C",
    "X",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
    "percent",
  ];
  const [displayValue, setDisplayValue] = useState("");
  /* eslint no-eval: 0 */
  const valueChangeHandler = (e) => {
    const value = e.target.innerText;
    switch (value) {
      case "=":
        try {
          setDisplayValue(eval(displayValue));
        } catch (error) {
          toast.error("Please check your expression");
        }
        return;
      case "C":
        setDisplayValue("");
        return;
      case "X":
        setDisplayValue((displayValue) =>
          displayValue.slice(0, displayValue.length - 1)
        );
        return;
      case "percent":
        setDisplayValue((displayValue) => displayValue / 100);
        return;
      default:
        const display = displayValue ? displayValue + value : value;
        setDisplayValue(display);
    }
  };

  return (
    <>
      <div className="calculator-container">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-sm-2"></div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="mainDiv">
              <div className={"calculator"}>
                <input
                  value={displayValue}
                  className={"display"}
                  onChange={(e) => setDisplayValue(e.target.value)}
                />
                <div className={"btns"}>
                  {buttons.map((b) => (
                    <button id={b} key={b} onClick={valueChangeHandler}>
                      <b>{b}</b>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-2"></div>
        </div>
      </div>
    </>
  );
};
export default Calculator;
