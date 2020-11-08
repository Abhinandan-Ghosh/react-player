//This component contains the player.
//Like the time, play progress slider, play pause buttons etc to control the songs

import React from "react";
import { FaPlay, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Player = () => {
  return (
    <div className="player">
      <div className="time-control">
        <p>Start time</p>
        <input type="range" name="" id="" />
        <p>End time</p>
      </div>
      <div className="play-control">
        <FaAngleLeft size="30" className="skip-back" />
        <FaPlay size="30" className="play" />
        <FaAngleRight size="30" className="skip-forward" />
      </div>
    </div>
  );
};

export default Player;
