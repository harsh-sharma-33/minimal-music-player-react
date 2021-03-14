import './App.css'
import FastAverrageColor from 'fast-average-color'
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Library from './components/Library'
import { useState, useRef, useEffect } from 'react'

// IMPORTING SONGS
import { songs } from './songs'

function App() {
  // STATES -------------
  const [play, setPlay] = useState(false)
  const [progress, setProgress] = useState(0)
  const [songCurrentTime, setSongCurrentTime] = useState('')
  const [songLength, setSongLength] = useState('')
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [song, setSong] = useState(songs[0])
  const [img, setImg] = useState('https://source.unsplash.com/300x300/?nature')
  //--------------------//

  // REFERING TO THE <audio> TAG IN THE DOM ----------
  const audioElement = useRef(null)
  // ------------------- //

  // CODE TO FIND THE AVERAGE  COLOR FROM THE THUMBNAIL -------
  const fac = new FastAverrageColor()
  const color = fac.getColor(document.querySelector('.cover-img')).hex
  //----------------------//

  // FOR PLAY/PAUSE ON HITTING SPACEBAR ----------
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      setPlay(!play)
    }
  })
  //---------------------//

  useEffect(() => {
    if (play) {
      audioElement.current.play()
    } else {
      audioElement.current.pause()
    }
  }, [play, currentSongIndex])

  useEffect(() => {
    setSong(songs[currentSongIndex])
    setPlay(false)
    setProgress(0)
    setSongCurrentTime('0:00')
    setSongLength('0:00')
  }, [currentSongIndex])

  const handleTimeUpdate = (e) => {
    const { currentTime, duration } = e.target
    setProgress(() => {
      return (currentTime / duration) * 100
    })

    setSongLength(() => {
      const min = Math.floor(duration / 60)
      const sec = Math.floor(duration % 60)
      return `${min}:${sec}`
    })

    setSongCurrentTime(() => {
      const min = Math.floor(currentTime / 60)
      const sec = Math.floor(currentTime % 60)
      return `${min}:${sec}`
    })
  }

  return (
    <div className='wrapper'>
      <Library
        open={libraryOpen}
        songs={songs}
        setCurrentSongIndex={setCurrentSongIndex}
      />

      <div className='App'>
        <audio
          onTimeUpdate={handleTimeUpdate}
          ref={audioElement}
          src={song.src}
        ></audio>
        <nav>
          <h1 className='brand'>Music</h1>
          <button
            className='library-btn'
            onClick={() => {
              setLibraryOpen(!libraryOpen)
            }}
          >
            Library
          </button>
        </nav>
        <section className='img-section'>
          <img
            className={play ? 'cover-img rotate' : 'cover-img'}
            src={img}
            alt='cover_image'
          />
        </section>

        <section className='info-section'>
          <h3 className='name'>{song.title}</h3>
          <h4 className='singer'>{song.artist}</h4>
          <div className='progress-bar'>
            <div
              className='progress'
              style={{ width: `${progress}%`, backgroundColor: color }}
            ></div>
            <p className='start'>{songCurrentTime}</p>
            <p className='end'>{songLength}</p>
          </div>
        </section>
        <section className='btn-section'>
          <div className='btn-wrap'>
            <IoIosArrowBack
              size='2.5em'
              name='previous'
              className='previous-btn'
              onClick={() => {
                if (currentSongIndex === 0) {
                  setCurrentSongIndex(songs.length - 1)
                } else {
                  setCurrentSongIndex((pre) => pre - 1)
                }
              }}
            />

            {play ? (
              <AiOutlinePauseCircle
                size='3.5em'
                className='play-btn'
                onClick={() => {
                  setPlay(!play)
                }}
              />
            ) : (
              <AiOutlinePlayCircle
                size='3.5em'
                className='play-btn'
                onClick={() => {
                  setPlay(!play)
                }}
              />
            )}
            <IoIosArrowForward
              size='2.5em'
              name='next'
              className='next-btn'
              onClick={() => {
                console.log('next')
                if (currentSongIndex === songs.length - 1) {
                  setCurrentSongIndex(0)
                } else {
                  setCurrentSongIndex((pre) => pre + 1)
                }
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
