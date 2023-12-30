import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PreloaderComponent from '../Components/Other/PreloaderComponent';
import PlayerComponent from '../Components/Other/PlayerComponent';
import AnimeCard from '../Components/Other/AnimeCard';
import ErrorPage from './ErrorPage';


const WatchPage = ({currentWidth}) => {
    const {id} = useParams()
    const epListRef = useRef()
    const player = useRef()
    const search = useLocation().search
    const initEp = Number(new URLSearchParams(search).get("ep"))
    const initTimeSearch = Number(new URLSearchParams(search).get("time"))

    useLocation().search = ""

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
    const [animeHistory, setAnimeHistory] = useState(JSON.parse(localStorage.getItem("animeHistory")))
    const [currentTime, setCurrentTime] = useState(initTimeSearch)
    const [initTime, setInitTime] = useState(initTimeSearch)
    const [watchBefore, setWatchBefore] = useState(false)
    const [historyEpisode, setHistoryEpisode] = useState(null)
    const [historyTime, setHistoryTime] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [episodeInfo, setEpisodeInfo] = useState(null)

    const timeRef = useRef()
    const animeInfoRef = useRef()
    const animeHistoryRef = useRef()
    const episodeRef = useRef()

    const changeStorage = () => {
      console.log(timeRef.current);
      console.log(animeInfoRef.current);
      console.log(animeHistoryRef.current);
      console.log(episodeRef.current);
      if(!animeInfoRef.current) return
      if(!animeHistoryRef.current) {
        console.log("create anime hiistory");
        localStorage.setItem("animeHistory", JSON.stringify([{
          ...animeInfoRef.current, lastTime: timeRef.current, lastWatchEpisode: episodeRef.current
        }]))
      } else {
        const index = animeHistoryRef.current.findIndex(item => item?.id === id)
        if(index === -1) {
          console.log("add new anime to history");
          let newHistory = [{...animeInfoRef.current, lastTime: timeRef.current, lastWatchEpisode: episodeRef.current}, ...animeHistoryRef.current]
          console.log(newHistory);
          localStorage.setItem("animeHistory", JSON.stringify(newHistory))
        } else {
          if(timeRef.current === 0 && episodeRef.current === 1) return
          console.log("update anime history");
          // let newHistory = animeHistoryRef.current[index].lastTime = timeRef.current
          let newHistory = [...animeHistoryRef.current]
          newHistory[index].lastTime = timeRef.current
          newHistory[index].lastWatchEpisode = episodeRef.current
          console.log(newHistory,"before");
          const updatedAnimeObj = newHistory[index]
          newHistory = newHistory.filter(item => item?.id !== id)
          newHistory.unshift(updatedAnimeObj)
          console.log(newHistory, "after");
          localStorage.setItem("animeHistory", JSON.stringify(newHistory))
        }
      }
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
      console.log(historyTime);
      setCurrentEpNum(historyEpisode)
      setInitTime(historyTime)
      setWatchBefore(false)
    }

    useEffect(() => {
      if(!animeHistory) return
      let index = animeHistory.findIndex(item => item?.id === id)
      if(index !== -1) {
        setWatchBefore(true)
        setHistoryEpisode(animeHistory[index].lastWatchEpisode)
        setHistoryTime(animeHistory[index].lastTime)
        console.log("wathced");
      } 
    }, [animeHistory])

    useEffect(() => {
      console.log(isPlaying);
    }, [isPlaying])
    
    useEffect(() => {
      timeRef.current = currentTime
      animeInfoRef.current = animeInfo
      animeHistoryRef.current = animeHistory
      episodeRef.current = currentEpNum
    }, [currentTime, animeInfo, animeHistory, currentEpNum])

    useEffect(() => {
      console.log(episodeInfo);
    }, [episodeInfo])
    
    
    useEffect(() => {
      setPreloader(true)
      setIsLoaded(true)
      if(!id) return
      axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}`)
      .then(resp => {
        setAnimeInfo(resp.data)
        axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=zoro`)
        .then(zoroResp => {
          // setEpisodeInfo(resp.data.episodes)
          if(zoroResp.data.episodes.length < 1) setEpisodeInfo(resp.data.episodes)
          else setEpisodeInfo(zoroResp.data.episodes)
          console.log(zoroResp.data.episodes);
        })
        .catch((e) => {
          setEpisodeInfo(resp.data.episodes)
        })
      }).catch((e) => {
        completeLoading(true)
        setErrorObj(e)
      })
    }, [id])
    
    useEffect(() => {
      console.log(animeInfo);
        if(!animeInfo) return
        setVideoPreloader(true)
        document.title = (animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji) + " - Episode " + currentEpNum + " - Watch online on 404NIME"
        // setPreloader(true)
          axios.get(`https://march-api1.vercel.app/meta/anilist/watch/${animeInfo?.episodes[currentEpNum-1].id}`)
          .then(resp => {
            let sources = resp.data.sources
            let defaultSource = sources.filter(item => item?.quality === "default")[0].url
            console.log(defaultSource);
            setCurrentActiveUrl(defaultSource)
          }).finally(() => {
            // setIsLoaded(false)
            // setVideoPreloader(false)
            // setTimeout(() => {
            //   setPreloader(false)
            // }, 300)
            completeLoading(false)
          }).catch((e) => {
            completeLoading(true)
            setErrorObj(e)
          })
        
      }, [currentEpNum, animeInfo, id])
      
      // header.title = "haha"
      // const changeEpisodeNumber = ()
      
      useEffect(() => {
        const interval = setInterval(() => {
          changeStorage()
          console.log("changed storage interval");
        }, 30000)
        return () => {
          changeStorage()
          clearInterval(interval)
          console.log("unmount");
        }
      }, [])

  if(preloader) return <PreloaderComponent isLoaded={isLoaded} />;
  if(fetchError) return <ErrorPage errorObj={errorObj}/>
  return (
    <div className="w-full h-[200vh] flex justify-center animate-fadeInAnimate opacity-0 fill-mode-forward relative">
      <div className="w-[1440px] flex gap-[20px] mx-5 mt-5">
        <div className="w-full h-min">
          <div>
            {/* <Player
              ref={player}
              currentPoster={`${animeInfo?.episodes[currentEpNum-1].image}`}
              >
              <Hls version="latest">
                <source
                  data-src={`${currentActiveUrl}`}
                  type="application/x-mpegURL"
                />
              </Hls>
              <DefaultUi noControls>
                <Spinner />
                <DefaultControls hideOnMouseLeave activeDuration={2000} />
                <Controls
                  pin="center"
                  align="center"
                  justify="center"
                  style={{ "--vm-control-scale": 1.7 }}
                >
                  <PlaybackControl />
                </Controls>
              </DefaultUi>
              <Skeleton/>
            </Player> */}
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
                  episodeInfo[currentEpNum - 1]?.title === null
                    ? "No title"
                    : episodeInfo[currentEpNum - 1]?.title
                }`}
                src={currentActiveUrl}
                poster={animeInfo?.episodes[currentEpNum - 1]?.image}
                setCurrentTime={setCurrentTime}
                initTime={initTime}
                setIsPlaying={setIsPlaying}
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
                  } catch {}

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
                      <option className="bg-white/30" value={item.number}>
                        {item.number} - Episode
                      </option>
                    ))}
                    {/* <option val></option> */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <Link to={`/more-info/${animeInfo?.id}`} className='max-w-max'>
              <h4 className="text-text-gray mb-4 text-xl 500res:text-base 500res:mb-2 400res:text-sm ">
                {(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)}
              </h4>
            </Link>
            <h2 className="text-3xl mb-10 700res:text-2xl 500res:text-lg 400res:text-base">{`Episode ${currentEpNum} - ${
              episodeInfo?.[currentEpNum - 1].title === null
                ? "No title"
                : episodeInfo?.[currentEpNum - 1].title
            }`}</h2>
            {/* [&>a>div]:w-[calc(100%-75%-40px)] */}
            <div
              className={`border-t-2 border-t-white/30 pt-12 w-full 
              `}
            >
              {/* <SwiperComponent currentWidth={currentWidth} type={"anime"} items={animeInfo?.recommendations}/> */}
              {/* <div style={{backgroundImage: `url(${animeInfo?.image})`}} className='w-[200px] h-[300px] bg-center bg-no-repeat bg-cover rounded-lg'></div> */}
              {/* <Swiper
                spaceBetween={20}
                slidesPerView={4}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {animeInfo?.recommendations.map(item => 
                <SwiperSlide>
                  <AnimeCard info={item} type={"anime"} />
                </SwiperSlide>)}
              </Swiper> */}
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
                  {/* <div className='text-xs text-text-gray'>{item.createdAt.slice(0, 10)}</div> */}
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