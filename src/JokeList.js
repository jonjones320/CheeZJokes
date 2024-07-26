import {useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";


const JokeList = ({numJokesToGet = 5}) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getJokes = async() => {
      try {
        // load jokes one at a time, adding not-yet-seen jokes
        let jokes = [];
        let seenJokes = new Set();
    
        while (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let jokeData = res.data;
        
          // Check the structure of jokeData
          if (typeof jokeData.joke === 'string' && !seenJokes.has(jokeData.id)) {
            seenJokes.add(jokeData.id);
            jokes.push({ ...jokeData, votes: 0 });
          } else {
            console.log("Duplicate or invalid joke found!");
          }
        }  
        setJokes(jokes);
        setLoading(false);
      } catch (err) {
        console.error(err);
      };
    };

    getJokes();
  }, [numJokesToGet]); // Re-run the effect if numJokesToGet changes //


  /* empty joke list, set to loading state, and then call getJokes */

  const generateNewJokes = () => {
    setLoading(true);
    setJokes([]);
  };
  
  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    setJokes(jokes => 
      jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  };


  /* render: either loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  return (
    <div className="JokeList-main">
      <button 
        className="JokeList-getmore" 
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={delta => vote(j.id, delta)}
        />
      ))}
    </div>
  );
}


export default JokeList;
