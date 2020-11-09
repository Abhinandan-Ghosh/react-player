// this component displays each song in the library component

import React from "react";

const LibrarySong = ({ songs, song, setCurrentSong, setSongs, id }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    //add active state
    const newSongs = songs.map((eachSong) => {
      if (eachSong.id === id) {
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
    console.log(newSongs);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
