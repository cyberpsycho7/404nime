import React, { useEffect, useRef, useState } from 'react'
import MoreInfoBanner from '../Components/MoreInfoPage/MoreInfoBanner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import AnimeInfoOverview from '../Components/MoreInfoPage/AnimeInfoOverview'
import AnimeInfoRelations from '../Components/MoreInfoPage/AnimeInfoRelations'
import AnimeInfoEpisodes from '../Components/MoreInfoPage/AnimeInfoEpisodes'
import AnimeInfoNavTab from '../Components/MoreInfoPage/AnimeInfoNavTab'
import AnimeInfoCharacters from '../Components/MoreInfoPage/AnimeInfoCharacters'

const MoreInfoPage = ({currentWidth}) => {
  const {id} = useParams()
  // const navigate = useNavigate()
  
    const [animeTypes, setAnimeTypes] = useState(["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"])
    const [isManga, setIsManga] = useState(false)
    const [preloader, setPreloader] = useState(true)
    const [animeInfo, setAnimeInfo] = useState(null)
    const [characters, setCharacters] = useState(null)
    const [openedBlock, setOpenedBlock] = useState(0)
    const [secondOpenedBlock, setSecondOpenedBlock] = useState(0)
    const [episodeInfo, setEpisodeInfo] = useState(null)
    const [MALInfo, setMALInfo] = useState(null)
    const [moreText, setMoreText] = useState(false)
    const [fetchError, setFetchError] = useState(0)
    const [isLoaded, setIsLoaded] = useState(true)
    
    


  // useEffect(() => {
  //   if(!preloader) {
  //     se
  //   }
  // }, [preloader])


    // const horizThumb = useRef()
    // const horizThumb2 = useRef()
    // const openedBlock = useRef()

  const changeOpenedBlock = (num) => {
    // console.log(num);
    setOpenedBlock(num)
  }
  const changeSecondOpenedBlock = (num) => {
    // console.log(num);
    setSecondOpenedBlock(num)
  }

  const goToEpisodes = () => {
    console.log("eps");
    setOpenedBlock(1)
    location.hash=''
  }
  // useEffect(() => {
  //   if(openedBlock === 0 ) {
  //     setCurrentOpened
  //   }
  //   openedBlock === 1 
  //   openedBlock === 2 || (secondOpenedBlock === 0 && currentWidth <= 400)
  //   openedBlock === 3 || (secondOpenedBlock === 0 && currentWidth <= 400)
  // }, [currentWidth])

    // const changeLine = (num) => {
    //     // console.log(e);
        
    //     if(window.innerWidth <= 540 && window.innerWidth > 400) horizThumb.current.style.marginLeft = 90 * num + "px"
    //     else if(window.innerWidth <= 400) horizThumb.current.style.marginLeft = (window.innerHeight-20) * num + "px"
    //     else horizThumb.current.style.marginLeft = 120 * num + "px"
    //     setOpenedBlock(num)
    // }
    // const changeLine2 = (num) => {
    //     // console.log(e);
        
    //     horizThumb2.current.style.marginLeft = (window.innerHeight-20) * num + "px"
    //     setOpenedBlock2(num)
    // }
    const completeLoading = (state) => {
      setFetchError(state)
      setIsLoaded(false)
      setTimeout(() => {
        setPreloader(false)
      }, 300)
    }

    const fetchMangaInfo = () => {
      axios.get(`https://march-api1.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`)
      .then(resp => {
        let fixedMangaInfo = {...resp.data}
        let chaptersCopy = [...resp?.data?.chapters]
        let fixedChapters = chaptersCopy.filter(item => item?.pages !== 0)
        fixedMangaInfo.chapters = fixedChapters  
        setAnimeInfo(fixedMangaInfo)
        setEpisodeInfo(fixedChapters)
        console.log(resp.data, "MANHAAAAAAAAAA");
        completeLoading(false)
      })
      .catch(() => completeLoading(true))
    }

    const fetchEpisodesFromZoro = () => {
      axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=zoro`)
      .then(resp => {
        if(resp.data.episodes.length < 1) setEpisodeInfo(animeInfo?.episodes)
        else setEpisodeInfo(resp.data.episodes)
        console.log(resp.data.episodes);
        completeLoading(false)
      })
      .catch(() => {completeLoading(true); setEpisodeInfo(null)})
    }



    useEffect(() => {
        if(!id) return
        setPreloader(true)
        setIsLoaded(true)
        setEpisodeInfo(null)
        setFetchError(false)
        axios
          .get(
            `https://march-api1.vercel.app/meta/anilist/info/${id}?provider=gogoanime`,
          )
          .then((resp) => {
            console.log(resp);
            setAnimeInfo(resp.data);
            let isMangaLocal = false
            if(animeTypes.includes(resp.data.type)) {
              setIsManga(false);
              console.log("falseee");
              isMangaLocal = false
            }
            else {
              setIsManga(true);
              console.log("truuu");
              isMangaLocal = true
            }
            document.title = (resp.data?.title?.english ? resp.data?.title?.english : resp.data?.title?.romaji) + ` - ${isMangaLocal ? "Read" : "Watch"} online on 404NIME`
            // console.log(animeTypes);
            // console.log(animeTypes.includes(resp.data.type));
            axios.get(`https://api.jikan.moe/v4/${animeTypes.includes(resp.data.type) ? "anime" : "manga"}/${resp.data.malId}/full`)
            .then(resp => {
              console.log(resp.data.data)
              setMALInfo(resp.data.data)

              if(isMangaLocal) fetchMangaInfo()
              else fetchEpisodesFromZoro()
            })
            .catch((e) => {completeLoading(true); console.log(e);})         
          })
          .catch((e) => {completeLoading(true); console.log(e);})
    }, [id])


  if(preloader) return <PreloaderComponent isLoaded={isLoaded}/>
  else if(fetchError) return <div className='text-4xl text-white'>ERROR WHILE FETCHING TRY AGAIN LATER <button onClick={() => history.back()} className='btn-base'>BACK</button></div>
  else return (
    <div className={` opacity-0 animate-fadeInAnimate fill-mode-forward min-h-[200vh]`}>
      <MoreInfoBanner cover={animeInfo?.cover} image={animeInfo?.image} trailer={MALInfo?.trailer?.embed_url} isMusic={animeInfo?.type.toLowerCase() === "music" ? true : false}/>
      <div className='w-full flex justify-center flex-col items-center'>
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
                {/* <span
                  style={{
                    "--tw-gradient-from-position":
                      Math.round(animeInfo?.rating / 10) * 10 - 30 + "%",
                    "--tw-gradient-to-position":
                      Math.round(animeInfo?.rating / 10) * 10 - 30 + "%",
                  }}
                  className={`materialIcon text-2xl text-transparent bg-clip-text bg-gradient-to-t from-white from-0 to-white/30 to-0`}
                >
                  star
                </span>*/}
                <span
                  style={{
                    "--tw-gradient-from-position": Math.round(animeInfo?.rating / 10) * 10  + "%",
                    "--tw-gradient-to-position": Math.round(animeInfo?.rating / 10) * 10  + "%",
                  }}
                  className={`flex gap-1 w-[max-content] text-transparent bg-clip-text bg-gradient-to-r from-white from-80% to-white/30 to-80% 450res:gap-0`}
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
                  <a href='#forEpisodesBtn' className=" btn-base bg-def-gray text-white flex gap-2 items-center justify-center 700res:w-full" onClick={() => goToEpisodes()}>
                    <span>
                      <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12.4475 1.10557C12.1659 0.964809 11.8346 0.964809 11.553 1.10557L1.55303 6.10557C1.21425 6.27496 1.00024 6.62123 1.00024 7C1.00024 7.37877 1.21425 7.72504 1.55303 7.89443L11.553 12.8944C11.8346 13.0352 12.1659 13.0352 12.4475 12.8944L22.4475 7.89443C22.7862 7.72504 23.0002 7.37877 23.0002 7C23.0002 6.62123 22.7862 6.27496 22.4475 6.10557L12.4475 1.10557Z" fill="white"/>
                        <path d="M1.10579 16.5528C1.35278 16.0588 1.95345 15.8586 2.44743 16.1055L12.0002 20.8819L21.553 16.1055C22.047 15.8586 22.6477 16.0588 22.8946 16.5528C23.1416 17.0467 22.9414 17.6474 22.4474 17.8944L12.4474 22.8944C12.1659 23.0352 11.8345 23.0352 11.553 22.8944L1.55301 17.8944C1.05903 17.6474 0.858803 17.0467 1.10579 16.5528Z" fill="white"/>
                        <path d="M2.44743 11.1055C1.95345 10.8586 1.35278 11.0588 1.10579 11.5528C0.858803 12.0467 1.05903 12.6474 1.55301 12.8944L11.553 17.8944C11.8345 18.0352 12.1659 18.0352 12.4474 17.8944L22.4474 12.8944C22.9414 12.6474 23.1416 12.0467 22.8946 11.5528C22.6477 11.0588 22.047 10.8586 21.553 11.1055L12.0002 15.8819L2.44743 11.1055Z" fill="white"/>
                      </svg>
                    </span>
                    <p>{isManga ? "Chapters" : "Episodes"}</p>
                  </a>
                  <button className="btn-base bg-def-gray text-white flex gap-2 items-center justify-center 700res:w-full">
                    <span>
                      <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16.4481 1.50023C14.844 1.4862 13.3007 2.10727 12.15 3.22645L12.1351 3.24107L11.6464 3.7298C11.2559 4.12032 11.2559 4.75349 11.6464 5.14401L12.3535 5.85112C12.7441 6.24164 13.3772 6.24164 13.7677 5.85112L14.2484 5.37048C14.834 4.80437 15.6142 4.49305 16.4218 4.50012C17.2326 4.50721 18.0103 4.83463 18.5868 5.41517C19.1637 5.99606 19.4927 6.78402 19.4998 7.60991C19.5069 8.43176 19.1946 9.22174 18.633 9.81182L15.5209 12.9432C15.2056 13.2609 14.8269 13.5058 14.4107 13.6622C13.9945 13.8185 13.5501 13.8828 13.1076 13.8509C12.6651 13.8189 12.2341 13.6915 11.8438 13.4768C11.7456 13.4228 11.6504 13.3635 11.5588 13.2993C11.1066 12.9823 10.4859 12.8717 10.0425 13.201L9.23978 13.7973C8.79642 14.1266 8.69902 14.7603 9.09601 15.1443C9.48444 15.52 9.9219 15.8435 10.3977 16.1053C11.1664 16.5282 12.0171 16.78 12.8918 16.8431C13.7666 16.9062 14.6444 16.779 15.4656 16.4706C16.2868 16.1621 17.0317 15.6797 17.65 15.0568L20.7712 11.9162L20.7898 11.8971C21.9007 10.7389 22.5136 9.18987 22.4997 7.58402C22.4859 5.97817 21.8463 4.43996 20.7155 3.30127C19.5844 2.16225 18.0521 1.51427 16.4481 1.50023Z" fill="white"/>
                        <path d="M11.1082 7.15685C10.2334 7.09376 9.35555 7.22089 8.53436 7.52937C7.71347 7.83773 6.96821 8.32053 6.34994 8.94317L3.22873 12.0838L3.21011 12.1029C2.09928 13.261 1.48637 14.8101 1.50023 16.416C1.51409 18.0218 2.15365 19.56 3.28441 20.6987C4.41551 21.8377 5.94781 22.4857 7.55185 22.4997C9.15591 22.5138 10.6993 21.8927 11.85 20.7735L11.8648 20.7589L12.3536 20.2701C12.7441 19.8796 12.7441 19.2465 12.3536 18.8559L11.6464 18.1488C11.2559 17.7583 10.6228 17.7583 10.2322 18.1488L9.75155 18.6295C9.16598 19.1956 8.38576 19.5069 7.5781 19.4999C6.76732 19.4928 5.98963 19.1653 5.41313 18.5848C4.83629 18.0039 4.50725 17.216 4.50012 16.3901C4.49303 15.5682 4.80532 14.7782 5.36694 14.1881L8.47904 11.0567C8.79434 10.7391 9.1731 10.4941 9.58932 10.3378C10.0055 10.1814 10.4498 10.1172 10.8924 10.1491C11.3349 10.181 11.7659 10.3084 12.1561 10.5231C12.2544 10.5772 12.3495 10.6365 12.4411 10.7007C12.8934 11.0177 13.5141 11.1282 13.9574 10.7989L14.7602 10.2026C15.2036 9.87328 15.301 9.23958 14.904 8.85563C14.5155 8.47995 14.0781 8.15644 13.6022 7.89464C12.8335 7.47172 11.9829 7.21993 11.1082 7.15685Z" fill="white"/>
                      </svg>
                    </span>
                    <p>Similar</p>
                  </button>
                </div>
                  {(isManga ? episodeInfo.length > 0 : animeInfo?.episodes.length > 0) ? <Link
                    to={isManga ? `/read/${animeInfo?.id}?chapter=1` : `/watch/${animeInfo?.id}?ep=1`}
                    className="400res:w-full 400res:self-stretch"
                  >
                    <button className="btn-base bg-def-gray text-white w-full flex gap-2 justify-center items-center">
                      <span>
                        {isManga ?
                          <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                            <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" fill="white"/>
                          </svg>
                        :
                          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.5 4.5C21.5 3.94772 21.0523 3.5 20.5 3.5H19.5C18.9477 3.5 18.5 3.94772 18.5 4.5V19.5C18.5 20.0523 18.9477 20.5 19.5 20.5H20.5C21.0523 20.5 21.5 20.0523 21.5 19.5V4.5Z" fill="white"/>
                            <path d="M3 5.86854C3 4.27115 4.78029 3.31836 6.1094 4.20444L15.3066 10.3359C16.4941 11.1276 16.4941 12.8725 15.3066 13.6641L6.1094 19.7956C4.78029 20.6817 3 19.7289 3 18.1315V5.86854Z" fill="white"/>
                          </svg>
                        }
                      </span>
                      <p>{isManga ? "Read with the 1st chapter" : "Start with the 1st ep."}</p>
                    </button>
                  </Link> : <button className="cursor-not-allowed btn-base bg-def-gray text-white justify-center flex gap-2 items-center">
                    <span className="materialIcon text-3xl 800res:text-2xl">
                      <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5ZM15 10.5C15.8284 10.5 16.5 9.82843 16.5 9C16.5 8.17157 15.8284 7.5 15 7.5C14.1716 7.5 13.5 8.17157 13.5 9C13.5 9.82843 14.1716 10.5 15 10.5ZM8.79678 16.6041C8.4646 17.0423 7.84036 17.1303 7.39992 16.7999C6.96219 16.4716 6.87354 15.8336 7.20208 15.3971C7.30914 15.2557 7.42882 15.1234 7.55137 14.9955C7.76344 14.7742 8.07335 14.4828 8.47425 14.1912C9.27219 13.6109 10.4744 12.9999 11.9999 12.9999C13.5254 12.9999 14.7277 13.6109 15.5256 14.1912C15.9265 14.4828 16.2364 14.7742 16.4485 14.9955C16.5714 15.1238 16.6918 15.2565 16.7989 15.3986L16.7999 15.3999C17.1313 15.8418 17.0417 16.4686 16.5999 16.7999C16.1595 17.1303 15.5352 17.0423 15.2031 16.6041L15.1984 16.5982C15.1925 16.5907 15.1812 16.5766 15.1646 16.5569C15.1315 16.5174 15.0777 16.4558 15.0045 16.3793C14.8572 16.2256 14.6359 16.0171 14.3492 15.8087C13.7722 15.389 12.9744 14.9999 11.9999 14.9999C11.0254 14.9999 10.2277 15.389 9.65059 15.8087C9.36399 16.0171 9.14264 16.2256 8.99535 16.3793C8.92211 16.4558 8.86838 16.5174 8.83523 16.5569C8.81869 16.5766 8.80737 16.5907 8.80142 16.5982L8.79678 16.6041Z" fill="white"/>
                      </svg>
                    </span>
                    <p>{"Not avialable yet"}</p>
                  </button>
                }
                
              </div>
            </div>
          </div>
          <div className="w-def 1480res:w-full " id='forEpisodesBtn'>
            <AnimeInfoNavTab isManga={isManga} isFirstPart={true} full={currentWidth <= 400 ? false : true} changeOpenedBlock={changeOpenedBlock} currentWidth={currentWidth}/>

            <AnimeInfoOverview show={openedBlock === 0 ? true : false} animeInfo={animeInfo} MALInfo={MALInfo} isManga={isManga}/>
            <AnimeInfoEpisodes show={openedBlock === 1 ? true : false} episodeInfo={episodeInfo} currentWidth={currentWidth} id={animeInfo?.id} isManga={isManga}/>

            {currentWidth <= 400 ? 
              <AnimeInfoNavTab isFirstPart={false} full={currentWidth <= 400 ? false : true} changeOpenedBlock={changeSecondOpenedBlock} currentWidth={currentWidth}/>
            : null}
            
            
            {/* {openedBlock === 2 || (secondOpenedBlock === 0 && currentWidth <= 400) ? null : null} */}
            <AnimeInfoCharacters show={((openedBlock === 2 || (secondOpenedBlock === 0 && currentWidth <= 400)) ? true : false)} currentWidth={currentWidth} title={(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)} characters={animeInfo?.characters}/>
            <AnimeInfoRelations show={((openedBlock === 3 || (secondOpenedBlock === 1 && currentWidth <= 400)) ? true : false)} currentWidth={currentWidth} title={(animeInfo?.title?.english ? animeInfo?.title?.english : animeInfo?.title?.romaji)} relations={animeInfo?.relations}/>
            {/* <div className='flex-col 400res:w-full mt-10 hidden'>
              <div className='flex w-min 540res:text-sm 400res:w-full'>
                <button
                  className={`${openedBlock2 === 0 ? 'text-white' : 'text-text-gray'} 400res:w-full 400res:px-4 btn-base  540res:py-3 540res:px-0 540res:w-[90px] duration-200 w-[120px]`}
                  onClick={(e) => {changeLine2(0)}}
                >
                  Characters
                </button>
                <button
                  className={`${openedBlock2 === 1 ? 'text-white' : 'text-text-gray'} 400res:w-full 400res:px-4 btn-base  540res:py-3 540res:px-0 540res:w-[90px] duration-200 w-[120px]`}
                  onClick={(e) => {changeLine2(1)}}
                >
                  Relations
                </button>
              </div>
              <div className="bg-text-gray/50 h-[2px] w-[480px] 540res:w-[360px] mb-[52px] 400res:w-full">
                <div
                  className="bg-text-gray h-[2px] w-[120px] 540res:w-[90px] duration-300 400res:w-[50%]"
                  ref={horizThumb2}
                ></div>
              </div> */}
            {/* </div> */}
          </div>
      </div>
    </div>
  );
}

export default MoreInfoPage