// this component has a list of songs in it.

import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, setSongs }) => {
  return (
    <div className="library">
      <h2>Library</h2>

      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            key={song.id}
            id={song.id}
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
