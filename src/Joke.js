import React from "react";
import "./Joke.css";


/** A single joke, along with vote up/down buttons. */

const Joke = ({ text, votes, vote }) => {
  
  return (
    <div className="Joke-main">
      <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={() => vote(1)} />
          <span>{votes}</span>
          <i className="fas fa-arrow-down" onClick={() => vote(-1)} />
      </div>
      <div className="Joke-text">{text}</div>
    </div>
  );
}


export default Joke;
