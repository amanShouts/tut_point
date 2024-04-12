import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useLocation, useSearchParams } from 'react-router-dom';
import { db } from '../firebase/db';
import { doc, updateDoc } from "firebase/firestore";

const S3PATH = 'https://aman7.s3.amazonaws.com/';

export default function VideoPage() {
  // const [currentTime, setCurrentTime] = useState(video.lastWatchedTime)
  const playerRef = useRef(null)
  const location = useLocation();
  const currentTimeRef = useRef(null);
  const delayRef = useRef(null);
  const { openedLast, s3path, lastWatchedTime, id } = location.state;
  console.log(openedLast, s3path, lastWatchedTime, id, "lovation")

  const updateOpenedLast = async(docID) => {
    const videoObject = doc(db, "s3videos", docID);
    const res = await updateDoc(videoObject, {
      openedLast: new Date(),
    });
  }

  useEffect(() => {
    playerRef.current.seekTo(lastWatchedTime)
    // update openedLast when this page loads for the first time 
    updateOpenedLast(id)

    return () => {
      clearInterval(delayRef.current)
    }
  }, [])

  const saveCurrentTime = async () => {
    // console.log("save current time", id);
    const videoObject = doc(db, "s3videos", id);

    const res = await updateDoc(videoObject, {
      lastWatchedTime: currentTimeRef.current
    });
  }

  return (
    <div className='flex flex-col justify-center items-start'>
      <p className='text-3xl text-slate-300 text-left mb-2'>{s3path}</p>
      <p className='text-md text-slate-400 text-left mb-4'>Previous Time : {parseFloat(lastWatchedTime).toFixed(2)}</p>
      <ReactPlayer url={`${S3PATH}${s3path}.mp4`}
        controls={true}
        style={{ borderRadius: '20px', border: '1px slate solid' }}
        ref={playerRef}
        // loop={true}
        onProgress={(obj) => {
          currentTimeRef.current = obj.playedSeconds;
          if (delayRef.current) {
            clearTimeout(delayRef.current)
            console.log("notttttttttt call", delayRef.current)
          }
          delayRef.current = setTimeout(() => {
            saveCurrentTime()
          }, 700);
        }}
        onEnded={saveCurrentTime}
        onPause={saveCurrentTime}
      />
    </div >
  )
}