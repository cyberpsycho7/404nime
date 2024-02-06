import axios from 'axios';
import React, {  useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import PreloaderComponent from '../Components/Other/PreloaderComponent';
import PlayerComponent from '../Components/Other/PlayerComponent';
import AnimeCard from '../Components/Other/AnimeCard';
import ErrorPage from './ErrorPage';
import UserContext from '../Context/UserContext';


const WatchPage = () => {
  const {user} = useContext(UserContext)
  const {id} = useParams()
  const epListRef = useRef()
  const timeRef = useRef()
  const animeInfoRef = useRef()
  const animeHistoryRef = useRef()
  const episodeRef = useRef()
  const search = useLocation().search
  const initEp = Number(new URLSearchParams(search).get("ep"))
  const initTimeSearch = Number(new URLSearchParams(search).get("time"))

  const [animeInfo, setAnimeInfo] = useState(null)
  const [preloader, setPreloader] = useState(true)
  const [fetchError, setFetchError] = useState(false)
  const [errorObj, setErrorObj] = useState({
    message: "Unexpected Error",
    response: {
      data: {
        message: "Refresh page or try again later."
      }
    }
  })
  const [videoPreloader, setVideoPreloader] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentEpNum, setCurrentEpNum] = useState(initEp === 0 ? 1 : initEp)
  const [currentActiveUrl, setCurrentActiveUrl] = useState(null)
  const [animeHistory, setAnimeHistory] = useState(null)
  const [currentTime, setCurrentTime] = useState(initTimeSearch)
  const [initTime, setInitTime] = useState(initTimeSearch)
  const [watchBefore, setWatchBefore] = useState(false)
  const [historyEpisode, setHistoryEpisode] = useState(null)
  const [historyTime, setHistoryTime] = useState(null)
  const [episodeInfo, setEpisodeInfo] = useState([])
  const [isAnimeInHistory, setIsAnimeInHistory] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [intervalTime, setIntervalTime] = useState(false)

  const postAnimeToHistory = () => {
    setIntervalTime(false)
    if(isAnimeInHistory) {
      patchAnimeHistory()
      return
    }
    axios.post(`https://four04nime.onrender.com/users/me/anime-history`, {
      userId: user._id,
      animeId: id,
      title: animeInfo?.title,
      releaseDate: animeInfo?.releaseDate,
      genres: animeInfo?.genres,
      type: animeInfo?.type,
      cover: animeInfo?.cover,
      image: animeInfo?.image,
      lastEpisode: currentEpNum,
      time: currentTime
    }, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
    .then((res) => setIsAnimeInHistory(true))
    .catch((err) => console.log(err))

  }

  const patchAnimeHistory = () => {
    if(watchBefore) return
    axios.patch(`https://four04nime.onrender.com/users/me/anime-history/${animeInfo?.id}`, {
      lastEpisode: episodeRef.current,
      time: timeRef.current
    }, {headers: {"Authorization" : `Bearer ${localStorage.getItem("JWTAccess")}`}})
    .catch(err => console.log(err))
  }

  const completeLoading = (state) => {
    setFetchError(state)
    setIsLoaded(false)
    setVideoPreloader(false)
    setTimeout(() => {
      setPreloader(false)
    }, 300)
  }

  const setEpisodeFromHistory = () => {
    if(!watchBefore) return
    setCurrentEpNum(historyEpisode)
    setInitTime(historyTime)
    setWatchBefore(false)
  }

  //CHECK IF ANIME WAS WATCH BEFORE
  useEffect(() => {
    if(!animeHistory) return
    let index = animeHistory.findIndex(item => item?.animeId === id)
    if(index !== -1) {
      setWatchBefore(true)
      setIsAnimeInHistory(true)
      setHistoryEpisode(animeHistory[index].lastEpisode)
      setHistoryTime(animeHistory[index].time)
    } else setIsAnimeInHistory(false)
  }, [animeHistory])

  //FETCH USERS ANIME HISTORY
  useEffect(() => {
    if(!user.isValid) return
    axios.get(`https://four04nime.onrender.com/users/${user._id}/anime-history`)
    .then(res => setAnimeHistory(res.data))
    .catch(err => console.log(err))
  }, [user])
  
  //SET REFS (BCS WHILE UNMOUNT STATES ARE NULL)
  useEffect(() => {
    timeRef.current = currentTime
    animeInfoRef.current = animeInfo
    animeHistoryRef.current = animeHistory
    episodeRef.current = currentEpNum
  }, [currentTime, animeInfo, animeHistory, currentEpNum])
  
  //FETCH ANIME INFO
  useEffect(() => {
    setPreloader(true)
    setIsLoaded(true)
    if(!id) return
    axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}`)
    .then(resp => {
      setAnimeInfo(resp.data)
      axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=zoro`)
      .then(zoroResp => {
        if(zoroResp.data.episodes.length === resp.data.episodes.length) setEpisodeInfo(zoroResp.data.episodes)
        else setEpisodeInfo(resp.data.episodes)
      })
      .catch((e) => setEpisodeInfo(resp.data.episodes))
    }).catch((e) => {
      setErrorObj(e)
      completeLoading(true)
    })
  }, [id])
  
  //FETCH CURRENT VIDEO URL
  useEffect(() => {
    if(!animeInfo) return
    setVideoPreloader(true)
    document.title = (animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji) + " - Episode " + currentEpNum + " - Watch online on 404NIME"
      axios.get(`https://march-api1.vercel.app/meta/anilist/watch/${animeInfo?.episodes[currentEpNum-1].id}`)
      .then(resp => {
        let sources = resp.data.sources
        let defaultSource = sources.filter(item => item?.quality === "default")[0].url
        setCurrentActiveUrl(defaultSource)
        completeLoading(false)
      }).catch((e) => {
        setErrorObj(e)
        completeLoading(true)
      }).finally(() => setSearchParams([]))
    
  }, [currentEpNum, animeInfo, id])
        
  //INTERVAL HISTORY EVERY 30 SECONDS
  useEffect(() => {
    if(!user?.isValid || !animeInfo) return
    const interval = setInterval(() => setIntervalTime(true), 30000)
    return () => clearInterval(interval)
  }, [user, animeInfo])

  useEffect(() => {
    if(!intervalTime) return
    postAnimeToHistory()
  }, [intervalTime])

  if(preloader) return <PreloaderComponent isLoaded={isLoaded} />;
  if(fetchError) return <ErrorPage errorObj={errorObj}/>
  return (
    <div className="w-full h-[200vh] flex justify-center animate-fadeInAnimate opacity-0 fill-mode-forward relative">
      <div className="w-[1440px] flex gap-[20px] mx-5 mt-5">
        <div className="w-full h-min">
          <div>
            <div className={`relative`}>
              <div
                className={`${
                  videoPreloader ? "opacity-100" : "opacity-0"
                } flex items-center flex-col z-20 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <div className="loadingio-spinner-pulse-q546hrr845 -mt-[30px]">
                  <div className="ldio-lm0a0msd0s9">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  watchBefore ? "!flex" : ""
                } hidden bg-black/50 backdrop-blur-xl gap-3 z-10 absolute top-3 left-1/2 w-max -translate-x-1/2 p-5 items-center rounded-xl flex-col `}
              >
                <div className="flex gap-3 font-medium">
                  <p className="text-xl font-medium flex-shrink-0">You stop at:</p>
                  <p className="text-xl font-medium flex gap-2">
                    {historyEpisode}
                    <p>Episode</p>
                  </p>
                  <p className="text-xl font-medium">
                    {(historyTime / 60).toFixed(0)
                      .length <= 1
                      ? `0${(historyTime / 60).toFixed(0)}`
                      : (historyTime / 60).toFixed(0)}
                    :
                    {(historyTime % 60).toFixed(0)
                      .length <= 1
                      ? `0${(historyTime % 60).toFixed(0)}`
                      : (historyTime % 60).toFixed(0)}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="text-xl font-medium">Continue?</p>
                  <button className="btn-base bg-white text-black !py-2" onClick={setEpisodeFromHistory}>
                    Yes
                  </button>
                  <button
                    className="btn-base bg-def-gray text-white !py-2"
                    onClick={() => setWatchBefore(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
              <PlayerComponent
                title={`Episode ${currentEpNum} - ${
                  episodeInfo?.[currentEpNum - 1]?.title === null
                    ? "No title"
                    : episodeInfo?.[currentEpNum - 1]?.title
                }`}
                src={currentActiveUrl}
                poster={animeInfo?.episodes[currentEpNum - 1]?.image}
                setCurrentTime={setCurrentTime}
                initTime={initTime}
              />
            </div>
            <div className="hidden 1000res:flex h-14  mt-3 rounded-md  items-center justify-start w-full bg-def-gray px-3">
              <div className="flex items-center h-full">
                <p>Ep. № </p>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  console.log(e.target[0].value);
                  try {
                    if (
                      Number(e.target[0].value) > 0 &&
                      Number(e.target[0].value) <= animeInfo?.episodes.length
                    )
                      setCurrentEpNum(Number(e.target[0].value));
                  } catch(err) {console.log(err)}
                }}>
                  <input
                    placeholder={`1 - ${animeInfo?.totalEpisodes}`}
                    maxLength={4}
                    type="text"
                    className=" w-[3.7rem] bg-white outline-none text-text-gray rounded-sm ml-2 p-1 flex-shrink-0"
                  />
                </form>
                <div className="ml-3 pl-3 border-l-[2px] border-l-white/30 h-full flex items-center">
                  <select
                    name="episode"
                    className="bg-white text-text-gray p-1 outline-none rounded-sm"
                    value={currentEpNum}
                    onChange={(e) => {
                      setCurrentEpNum(e.target.value);
                    }}
                  >
                    {animeInfo?.episodes?.map((item) => (
                      <option className="bg-white/30" value={item.number} key={item?.number}>
                        {item.number} - Episode
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <div className='text-text-gray mb-4 text-lg 500res:text-base 500res:mb-2 400res:text-sm [&>*]:duration-200'>
              <Link to={`/`} className='hover:text-white'>Home</Link>
              <span> / </span>
              <Link to={`/more-info/${animeInfo?.id}`} className='max-w-max hover:text-white'>
                  {(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)}
              </Link>
              <span> / </span>
              <span>{`Ep. ${currentEpNum}`}</span>
            </div>
            <h2 className="text-3xl mb-10 700res:text-2xl 500res:text-lg 400res:text-base">{`Episode ${currentEpNum} - ${
              episodeInfo?.[currentEpNum - 1]?.title === null
                ? "No title"
                : episodeInfo?.[currentEpNum - 1]?.title
            }`}</h2>
            <div
              className={`border-t-2 border-t-white/30 pt-12 w-full 
              `}
            >
              <h3 className="text-3xl mb-8">You'll also like it</h3>
              <div
                className="w-full relative flex flex-wrap gap-5
              [&>a]:w-[calc(50%-10px)] [&>a>div]:h-[300px] [&>a>div]:1100res:h-[230px] [&>a>div]:w-full"
              >
                {animeInfo?.recommendations.map((item, i) => {
                  if (i >= 4) return null;
                  else return <AnimeCard info={item} type={"recomm"} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[45%] 1200res:w-[55%] 1000res:hidden">
          <div className="flex gap-1 items-center">
            <p>Episode number:</p>
            <form onSubmit={(e) => {
              e.preventDefault()
              console.log(e.target[0].value);
              try {
                epListRef.current.childNodes[
                  Number(e.target[0].value) - 1
                ].scrollIntoView({ block: "center", behavior: "smooth" });
              } catch {}
            }}>
              
              <input
                placeholder={`1 - ${animeInfo?.totalEpisodes}`}
                maxLength={4}
                type="text"
                className=" w-[3.7rem] bg-white/30 outline-none rounded-sm p-1"
              />
            </form>
          </div>
          <div
            ref={epListRef}
            className="[&::-webkit-scrollbar]:w-[1px] w-full flex flex-col gap-5 max-h-[calc(100vh-165px)] overflow-y-scroll scrollbar-thin scrollbar-track-white/10 scrollbar-track-rounded-full"
          >
            {episodeInfo?.map((item) => (
              <div
                id={`${item.number}`}
                key={item.id}
                className="flex gap-2 h-[90px] flex-shrink-0 cursor-pointer [&_div:first-child]:hover:opacity-100"
                onClick={() => setCurrentEpNum(item?.number)}
              >
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  className={`bg-center bg-no-repeat bg-cover w-[168px] h-full rounded-md
            flex-shrink-0 flex justify-center items-center `}
                >
                  <div
                    className={`${
                      item.number === currentEpNum ? "opacity-100" : "opacity-0"
                    } bg-black/40 rounded-md w-full h-full flex justify-center items-center duration-200`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7.50632 3.14928C6.1753 2.29363 4.4248 3.24931 4.4248 4.83164V19.1683C4.4248 20.7506 6.1753 21.7063 7.50632 20.8507L18.6571 13.6823C19.8817 12.8951 19.8817 11.1049 18.6571 10.3176L7.50632 3.14928Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[60%]">
                  <div className="line-clamp-2 overflow-hidden text-sm">
                    {item.title === null ? "No title" : item.title}
                  </div>
                  <div className="text-sm text-text-gray">
                    Episode {item?.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPage