import React from "react";
import './Square.css';

export function Square(props) {
      return(
        <button className="square" 
           onClick={props.onClick}>
          {props.value}
        </button>
      );
}
