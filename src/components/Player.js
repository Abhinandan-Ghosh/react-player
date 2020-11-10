//This component contains the player.
//Like the time, play progress slider, play pause buttons etc to control the songs

import React, { useRef } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  setCurrentSong,
  songInfo,
  setSongInfo,
}) => {
  const audioRef = useRef(null);

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((eachSong) => {
      if (eachSong.id === nextPrev.id) {
        return {
          ...eachSong,
          active: true,
        };
      } else {
        return {
          ...eachSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  //Event Handlers
  const playSongHandler = () => {
    // console.log(audioRef.current);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    // console.log(animationPercentage);
    setSongInfo({
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentage,
    });
    // console.log(e.target.pause, isPlaying);
    //check if the current song is playing and if the target is pause then play the next song clicked
    if (e.target.pause && isPlaying) {
      audioRef.current.play();
    }
  };

  //function to handle dragging of slider
  const dragHandler = (e) => {
    // console.log(e.target.value);
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //function to skip song forward or backwards using arrow icons
  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex - 1 === -1) {
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[currentIndex - 1]);
      activeLibraryHandler(songs[currentIndex - 1]);
    }
  };

  //function to format the time displayed.
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);

    // console.log("song ended");
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          size="30"
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
        />
        {isPlaying ? (
          <FaPause onClick={playSongHandler} size="30" className="play" />
        ) : (
          <FaPlay onClick={playSongHandler} size="30" className="play" />
        )}
        <FaAngleRight
          size="30"
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
