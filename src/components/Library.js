import React, { useState } from 'react'

const Library = ({ open, songs, setCurrentSongIndex }) => {
  return (
    <div className={open ? `library show-back` : `library`}>
      <h1 className='library-heading'>Library</h1>
      <ul className='song-list'>
        {songs.map((song, index) => {
          return (
            <li
              className='song'
              key={index}
              onClick={() => {
                setCurrentSongIndex(index)
              }}
            >
              <img src='https://source.unsplash.com/1600x900/?music' />
              <div className='song-info'>
                <h4 className='song-name'>{song.title}</h4>
                <p className='singer-name'>{song.artist}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Library
