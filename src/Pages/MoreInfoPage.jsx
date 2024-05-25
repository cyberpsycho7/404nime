import React, { useEffect, useState } from 'react'
import MoreInfoBanner from '../Components/MoreInfoPage/MoreInfoBanner'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import AnimeInfoOverview from '../Components/MoreInfoPage/AnimeInfoOverview'
import AnimeInfoRelations from '../Components/MoreInfoPage/AnimeInfoRelations'
import AnimeInfoEpisodes from '../Components/MoreInfoPage/AnimeInfoEpisodes'
import AnimeInfoNavTab from '../Components/MoreInfoPage/AnimeInfoNavTab'
import AnimeInfoCharacters from '../Components/MoreInfoPage/AnimeInfoCharacters'
import ErrorPage from './ErrorPage'
import SwiperComponent from '../Components/Other/SwiperComponent'

const MoreInfoPage = ({currentWidth}) => {
  const {id} = useParams()
  
    const [animeTypes, setAnimeTypes] = useState(["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"])
    const [isManga, setIsManga] = useState(false)
    const [preloader, setPreloader] = useState(true)
    const [animeInfo, setAnimeInfo] = useState(null)
    const [openedBlock, setOpenedBlock] = useState(0)
    const [secondOpenedBlock, setSecondOpenedBlock] = useState(0)
    const [episodeInfo, setEpisodeInfo] = useState(null)
    const [MALInfo, setMALInfo] = useState(null)
    const [moreText, setMoreText] = useState(false)
    const [fetchError, setFetchError] = useState(0)
    const [isLoaded, setIsLoaded] = useState(true)
    const [errorObj, setErrorObj] = useState(null)
    const [postInListLoading, setPostInListLoading] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState(false)
    
    const completeLoading = (state) => {
      setFetchError(state)
      setIsLoaded(false)
      setTimeout(() => {
        setPreloader(false)
      }, 300)
    }

    const throwNotification = (msg) => {
      setNotificationMessage(msg ? msg : "Unexpected Error")
      setTimeout(() => setNotificationMessage(null), 3000)
    }

    const fetchMangaInfo = async() => {
      return axios.get(`https://march-api1.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`)
      .then(resp => {
        let fixedMangaInfo = {...resp.data}
        let chaptersCopy = [...resp?.data?.chapters]
        let fixedChapters = chaptersCopy.filter(item => item?.pages !== 0)
        fixedMangaInfo.chapters = fixedChapters  
        setAnimeInfo(fixedMangaInfo)
        setEpisodeInfo(fixedChapters)
        completeLoading(false)
      })
      .catch((e) => {completeLoading(true); setErrorObj(e)})
    }

    const fetchEpisodesFromZoro = async(episodes) => {
      return axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=zoro`)
      .then(resp => {
        if(episodes.length === resp.data.episodes.length) setEpisodeInfo(resp.data.episodes)
        else setEpisodeInfo([])
        completeLoading(false)
      })
      .catch((e) => {completeLoading(true); setEpisodeInfo(null); setErrorObj(e)} )
    }

    const fetchInfoFromMAL = async(MALId, type) => {
      if(!MALId) return
      return axios.get(`https://api.jikan.moe/v4/${animeTypes.includes(type) ? "anime" : "manga"}/${MALId}/full`)
      .then(resp => {
        setMALInfo(resp.data.data)
      })
      .catch((e) => {console.log(e)})   
    }

    const addAnimeToList = (route) => {
      setPostInListLoading(true)
      axios.post(`https://four04nime.onrender.com/users/me/${route}`, {
        animeId: animeInfo?.id,
        image: animeInfo?.image,
        cover: animeInfo?.cover,
        releaseDate: animeInfo?.releaseDate,
        genres: animeInfo?.genres,
        title: animeInfo?.title,
        type: animeInfo?.type
      }, {headers: {"Authorization": `Bearer ${localStorage.getItem("JWTAccess")}`}})
      .then(() => throwNotification("Successfully added!"))
      .catch(err => {
        if(err?.response?.status === 401) throwNotification("Log In to manage anime list")
        else throwNotification(err.response.data.message)
      })
      .finally(() => setPostInListLoading(false))
    }

    useEffect(() => {
        if(!id) return
        setPreloader(true)
        setIsLoaded(true)
        setEpisodeInfo(null)
        setFetchError(false)
        setMALInfo(null)
        axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=gogoanime`)
        .then((resp) => {
          setAnimeInfo(resp.data);
          let isMangaLocal = false
          if(animeTypes.includes(resp.data.type)) isMangaLocal = false
          else isMangaLocal = true
          setIsManga(isMangaLocal)
          document.title = (resp.data?.title?.english ? resp.data?.title?.english : resp.data?.title?.romaji) + ` - ${isMangaLocal ? "Read" : "Watch"} online on 404NIME`
          fetchInfoFromMAL(resp.data.malId, resp.data.type)
          .then(() => {
            if(isMangaLocal) fetchMangaInfo()
            else fetchEpisodesFromZoro(resp.data.episodes)
          })
        })
        .catch((e) => {completeLoading(true); console.log(e); setErrorObj(e)})
    }, [id])


  if(preloader) return <PreloaderComponent isLoaded={isLoaded}/>
  else if(fetchError) return <ErrorPage errorObj={errorObj}/>
  else return (
    <div className={` opacity-0 animate-fadeInAnimate fill-mode-forward min-h-full`}>
      <MoreInfoBanner cover={animeInfo?.cover} image={animeInfo?.image} trailer={MALInfo?.trailer?.embed_url}/>
      <div className='w-full flex justify-center flex-col items-center relative'>
        <div className={`${notificationMessage ? "opacity-100" : "opacity-0"} ${notificationMessage === "Successfully added!" ? "bg-green-500" : "bg-red-500"}
        pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 p-4 rounded-xl z-50 duration-300`}>{notificationMessage}</div>
        <div className="w-[1440px] 700res:block flex gap-24 900res:gap-12 1480res:px-5 1480res:w-full z-10">
          <div
            style={{ backgroundImage: `url(${animeInfo?.image})` }}
            className="w-[350px] h-[500px] bg-cover bg-center bg-no-repeat -mt-[100px] rounded-xl flex-shrink-0 700res:hidden"
          ></div>
          <div className="flex flex-col mt-12 flex-grow 1480res:flex-grow-0">
            <div className='relative 900res:text-3xl 400res:text-2xl text-5xl'>
              <h2 className={`${moreText ? "opacity-0" : 'opacity-100'} cursor-pointer duration-200 font-medium w-full line-clamp-2 `} onMouseLeave={() => setMoreText(false)} onMouseEnter={() => setMoreText(true)}>{(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)}</h2>
              <div className={`${moreText ? 'opacity-100' : `opacity-0`} duration-200 absolute -top-[18px] left-0 p-3 rounded-xl h-min font-medium pointer-events-none bg-def-gray`}>{(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)}</div>
            </div>
            <span className="flex gap-1 items-center mb-12 mt-3">
              <span
                style={{
                  "--tw-gradient-from-position": animeInfo?.rating / 10 * 10  + "%",
                }}
                className={`flex gap-1 w-[max-content] text-transparent bg-clip-text bg-gradient-to-r from-white from-0% to-white/30 to-0% 450res:gap-0`}
              >
                <span className="materialIcon !text-3xl 450res:!text-2xl">star</span>
                <span className="materialIcon !text-3xl 450res:!text-2xl">star</span>
                <span className="materialIcon !text-3xl 450res:!text-2xl">star</span>
                <span className="materialIcon !text-3xl 450res:!text-2xl">star</span>
                <span className="materialIcon !text-3xl 450res:!text-2xl">star</span>
              </span>
              <p className="text-lg">{animeInfo?.rating / 10}</p> 
            </span>
            <div className="700res:items-stretch flex 800res:text-sm justify-between 1480res:flex-col 1480res:justify-start 1480res:items-start 1480res:gap-4 400res:gap-2">
              <div className='flex gap-4 400res:gap-2 400res:w-full 400res:justify-stretch'>
                <button onClick={() => addAnimeToList("watched")}
                href='#forEpisodesBtn'
                  className={`${postInListLoading ? "animate-pulse pointer-events-none" : ""} btn-base bg-def-gray text-white flex gap-2 items-center justify-center 700res:w-full`}>
                  <span>
                    <svg className='w-5 h-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_405_1637)">
                      <path d="M7.74919 20.6625C7.06793 20.6628 6.41457 20.392 5.93325 19.9099L0.443061 14.4217C-0.147687 13.8308 -0.147687 12.8729 0.443061 12.282C1.034 11.6912 1.99191 11.6912 2.58284 12.282L7.74919 17.4483L21.4172 3.78034C22.0081 3.18959 22.966 3.18959 23.5569 3.78034C24.1477 4.37128 24.1477 5.32919 23.5569 5.92012L9.56513 19.9099C9.08381 20.392 8.43045 20.6628 7.74919 20.6625Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_405_1637">
                      <rect width="24" height="24" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <p>Watched</p>
                </button>
                <button onClick={() => addAnimeToList("to-watch")}
                  className={`${postInListLoading ? "animate-pulse pointer-events-none" : ""} btn-base bg-def-gray text-white flex gap-2 items-center justify-center 700res:w-full`}>
                  <span>
                    <svg className='w-5 h-5' width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.4998 0H5.49985C4.04173 0.00185226 2.64385 0.58191 1.61281 1.61296C0.581757 2.64401 0.00169967 4.04188 -0.000152588 5.5V20.472C0.000599453 21.1724 0.21145 21.8564 0.605134 22.4356C0.998817 23.0149 1.55723 23.4627 2.20815 23.7212C2.85907 23.9796 3.57257 24.0369 4.25638 23.8855C4.94018 23.7341 5.56285 23.3811 6.04385 22.872L10.9558 17.672L15.9688 22.922C16.4514 23.4272 17.0741 23.7764 17.7567 23.9248C18.4394 24.0731 19.1509 24.0137 19.7995 23.7543C20.4482 23.4949 21.0044 23.0473 21.3965 22.4691C21.7886 21.8909 21.9988 21.2086 21.9998 20.51V5.5C21.998 4.04188 21.4179 2.64401 20.3869 1.61296C19.3558 0.58191 17.958 0.00185226 16.4998 0V0ZM18.9998 20.51C18.9997 20.6097 18.9697 20.7071 18.9137 20.7896C18.8577 20.8722 18.7784 20.9361 18.6858 20.9732C18.5933 21.0103 18.4917 21.0188 18.3943 20.9978C18.2968 20.9767 18.2078 20.927 18.1388 20.855L12.0388 14.464C11.8983 14.3168 11.7293 14.1998 11.5421 14.12C11.3548 14.0403 11.1533 13.9994 10.9498 14C10.7464 14.0006 10.5452 14.0426 10.3585 14.1234C10.1718 14.2042 10.0035 14.3221 9.86385 14.47L3.86385 20.815C3.79689 20.8906 3.70774 20.9431 3.60914 20.9651C3.51054 20.987 3.40753 20.9771 3.31485 20.937C3.21937 20.9036 3.13719 20.8403 3.08045 20.7566C3.02372 20.6728 2.99546 20.5731 2.99985 20.472V5.5C2.99985 4.83696 3.26324 4.20107 3.73208 3.73223C4.20092 3.26339 4.83681 3 5.49985 3H16.4998C17.1629 3 17.7988 3.26339 18.2676 3.73223C18.7365 4.20107 18.9998 4.83696 18.9998 5.5V20.51Z" fill="white"/>
                    </svg>
                  </span>
                  <p>To Watch</p>
                </button>
              </div>
              <button onClick={() => addAnimeToList("favorites")}
                className={`${postInListLoading ? "animate-pulse pointer-events-none" : ""} 700res:w-full 400res:self-stretch btn-base bg-def-gray text-white w-max flex gap-2 justify-center items-center`}>
                <span>
                  <svg className='w-5 h-5' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_405_1496)">
                    <path d="M17.25 1.85071C16.2243 1.86063 15.2152 2.11065 14.3035 2.58073C13.3918 3.05081 12.6029 3.72788 12 4.55771C11.397 3.72788 10.6081 3.05081 9.69644 2.58073C8.78476 2.11065 7.77565 1.86063 6.74996 1.85071C4.89173 1.92491 3.13848 2.73189 1.87358 4.09517C0.608672 5.45846 -0.0649657 7.26713 -4.03235e-05 9.12571C-4.03235e-05 13.6777 4.67396 18.5507 8.59996 21.8377C9.55329 22.6393 10.7589 23.0788 12.0045 23.0788C13.25 23.0788 14.4556 22.6393 15.409 21.8377C19.331 18.5507 24.009 13.6777 24.009 9.12571C24.0738 7.26563 23.399 5.45564 22.1322 4.0921C20.8653 2.72856 19.1098 1.9226 17.25 1.85071ZM13.477 19.5387C13.0634 19.8869 12.5401 20.0779 11.9995 20.0779C11.4588 20.0779 10.9355 19.8869 10.522 19.5387C5.74196 15.5307 2.99996 11.7357 2.99996 9.12571C2.9362 8.06292 3.29424 7.01789 3.99634 6.21749C4.69844 5.4171 5.68793 4.92596 6.74996 4.85071C7.81199 4.92596 8.80148 5.4171 9.50358 6.21749C10.2057 7.01789 10.5637 8.06292 10.5 9.12571C10.5 9.52353 10.658 9.90506 10.9393 10.1864C11.2206 10.4677 11.6021 10.6257 12 10.6257C12.3978 10.6257 12.7793 10.4677 13.0606 10.1864C13.3419 9.90506 13.5 9.52353 13.5 9.12571C13.4362 8.06292 13.7942 7.01789 14.4963 6.21749C15.1984 5.4171 16.1879 4.92596 17.25 4.85071C18.312 4.92596 19.3015 5.4171 20.0036 6.21749C20.7057 7.01789 21.0637 8.06292 21 9.12571C21 11.7357 18.258 15.5307 13.477 19.5387Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_405_1496">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </span>
                <p>Add to Fovarite</p>
              </button>
            </div>
          </div>
        </div>
        <div className="w-def 1480res:w-full " id='forEpisodesBtn'>
          <AnimeInfoNavTab isManga={isManga} isFirstPart={true} full={currentWidth <= 400 ? false : true} changeOpenedBlock={setOpenedBlock} currentWidth={currentWidth}/>
          <AnimeInfoOverview show={openedBlock === 0 ? true : false} animeInfo={animeInfo} MALInfo={MALInfo} isManga={isManga}/>
          <AnimeInfoEpisodes show={openedBlock === 1 ? true : false} episodeInfo={episodeInfo} currentWidth={currentWidth} id={animeInfo?.id} isManga={isManga}/>
          {currentWidth <= 400 ? 
            <AnimeInfoNavTab isFirstPart={false} full={currentWidth <= 400 ? false : true} changeOpenedBlock={setSecondOpenedBlock} currentWidth={currentWidth}/>
          : null}
          <AnimeInfoCharacters show={((openedBlock === 2 || (secondOpenedBlock === 0 && currentWidth <= 400)) ? true : false)} currentWidth={currentWidth} title={(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)} characters={animeInfo?.characters}/>
          <AnimeInfoRelations show={((openedBlock === 3 || (secondOpenedBlock === 1 && currentWidth <= 400)) ? true : false)} currentWidth={currentWidth} title={(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)} relations={animeInfo?.relations}/>
          <h3 id='similar' className={`${animeInfo?.recommendations.length < 1 ? "hidden" : ""} text-2xl font-medium mt-20 mb-10 mx-auto w-max`}>{isManga ? "Similar Manga" : "Similar Anime"}</h3>
          <SwiperComponent currentWidth={currentWidth} items={animeInfo?.recommendations} type={isManga ? "manga" : "recomm"}/>
        </div>
      </div>
    </div>
  );
}

export default MoreInfoPage