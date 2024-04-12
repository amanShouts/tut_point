import { useEffect, useRef, useState } from "react"
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/db";
import ReactPlayer from 'react-player/lazy'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";

const S3PATH = 'https://aman7.s3.amazonaws.com/';

export default function ListCourse() {

  const [allVideos, setAllVideos] = useState([]);
  const [recentVids, setRecentVids] = useState([])
  const playerRef = useRef(null);
  const navigate = useNavigate()

  // const getVideos = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "s3videos"), {
  //       lastWatchedTime: "0:05",
  //       openedLast: new Date(),
  //       s3path: "/aman"
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  const getAllVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "s3videos"));
    console.log(querySnapshot, " query response")
    const res = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " id")
      const vid = doc.data();
      vid.id = doc.id;
      return vid;
    });
    setAllVideos(prev => res);
  }

  const getAllRecentlyWatched = async () => {
    console.log("start getAllRecentlyWatched")
    const videosRef = collection(db, "s3videos");
    console.log(videosRef)
    const q = query(videosRef, orderBy("openedLast", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    const res = querySnapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => => ", doc.data());
      return { ...doc.data(), id: doc.id }
    });
    setRecentVids(prev => res)
  }

  console.log(allVideos, " all videos", recentVids);

  useEffect(() => {
    // getVideos();
    getAllVideos();
    getAllRecentlyWatched();
  }, [])

  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <div className="w-full">
        <h3 className="text-left text-slate-300 text-2xl font-semibold">Recently Viewed</h3>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          {recentVids.length > 0 ?
            recentVids.map((vid, idx) => (
              <div className="w-1/4" key={idx}>
                <div className="relative rounded-md border-[1px] overflow-hidden border-slate-700">
                  <Link to='/video'
                    state={vid}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-200 opacity-45 flex justify-center items-center z-50">
                      <FaPlay className="text-6xl hover:border-white hover:border-1 hover:border hover:text-7xl transition-all duration-500" />
                    </div>
                    <ReactPlayer url={`${S3PATH}${vid.s3path}.mp4`}
                      controls={true}
                      style={{ borderRadius: '20px', border: '1px slate solid', zIndex: '10' }}
                      // ref={playerRef}
                      width={'100%'}
                      height={'100%'}
                    />
                  </Link>
                </div>
                <p className="text-center text-sm text-slate-500">{vid.s3path}</p>
              </div>))
            :
            <div className="text-sm text-slate-400 text-center mx-auto p-2">
              No Videos to Show
            </div>
          }
        </div>
      </div>

      <hr className="w-3/4 mx-auto h-[1px] border-slate-500 m-4"></hr>

      <div className="w-full">
        <h3 className="text-left text-slate-300 text-2xl font-semibold mb-4"> All Videos </h3>
        <div className="flex flex-wrap justify-center items-center gap-4 ">
          {allVideos.length > 0 ?
            allVideos.map((video, index) => (
              // Lazy load the YouTube player
              <div key={index} className="relative rounded-md border-[1px] overflow-hidden border-slate-700" >

                {<div className="absolute w-full h-full bg-slate-100 opacity-80 top-0 left-0 flex justify-center items-center gap-4 z-50">
                  <Link
                    to='/video'
                    state={video}
                  // to={`/video?search=${JSON.stringify(video)}`}
                  >
                    <button className="p-2 text-slate-100 bg-slate-500 rounded-md border-2 border-slate-800 !opacity-100 w-28"
                    >
                      Resume
                    </button>
                  </Link>
                  <Link
                    to='/video'
                    state={{ ...video, lastWatchedTime: 0 }}
                  // to={`/video?search=${JSON.stringify(video)}`}
                  >
                    <button className="p-2 text-slate-100 bg-slate-500 rounded-md border-2 border-slate-800 !opacity-100 w-28"
                    >
                      Start Afresh
                    </button>
                  </Link>
                </div>
                }
                <div className="z-10" >
                  <ReactPlayer url={`${S3PATH}${video.s3path}.mp4`}
                    controls={true}
                    style={{ borderRadius: '20px', border: '1px slate solid' }}
                    light={false}
                    ref={playerRef}
                  />
                </div>
              </div>
            ))
            : ''}
        </div>
      </div >
      {/* <video controls width={800}>
        <source src='https://aman7.s3.amazonaws.com/airplane.mp4' type="video/mp4" />
      </video>
      <video controls width={800}>
        <source src='https://aman7.s3.amazonaws.com/blades.mp4' type='video/mp4' />
      </video> */}
    </div >
  )
}